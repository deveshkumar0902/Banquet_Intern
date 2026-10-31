import ExcelJS from 'exceljs';
import pino from 'pino';
import { enquirySchema } from '@banquet/shared';
import { createMailService } from '../src/services/mailService.js';
import request from 'supertest';
import { describe, expect, it, vi } from 'vitest';
import { ADMIN_TOKEN, setup, validContact, validEnquiry } from './helpers.js';

describe('GET /api/health', () => {
  it('reports ok with the database reachable', async () => {
    const { app } = setup();
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ status: 'ok', db: 'ok' });
    expect(typeof res.body.uptime).toBe('number');
  });
});

describe('POST /api/enquiries', () => {
  it('stores the enquiry, responds 201 and emails customer and owner', async () => {
    const { app, db, mailer } = setup();
    const res = await request(app).post('/api/enquiries').send(validEnquiry());
    expect(res.status).toBe(201);
    expect(res.body.id).toBeGreaterThan(0);

    await app.locals.flush();
    const row = db.prepare('SELECT * FROM enquiries WHERE id = ?').get(res.body.id);
    expect(row).toMatchObject({
      name: 'Asha Verma',
      event_type: 'Wedding',
      guests: 250,
      source_page: '/',
      email_status: 'sent',
    });
    expect(row.ip_hash).toMatch(/^[0-9a-f]{64}$/);
    const recipients = mailer.sendMail.mock.calls.map(([m]) => m.to);
    expect(recipients).toEqual(['asha@example.com', 'owner@example.com']);
  });

  it('without an email address, stores the row and only notifies the owner', async () => {
    const { app, db, mailer } = setup();
    const res = await request(app)
      .post('/api/enquiries')
      .send(validEnquiry({ email: '' }));
    expect(res.status).toBe(201);
    await app.locals.flush();
    expect(db.prepare('SELECT email FROM enquiries').get().email).toBeNull();
    expect(mailer.sendMail).toHaveBeenCalledTimes(1);
    expect(mailer.sendMail.mock.calls[0][0].to).toBe('owner@example.com');
  });

  // Regression for audit bug #1
  it('rejects the legacy payload (eventName, no eventDate) with field errors', async () => {
    const { app, db } = setup();
    const { eventDate: _d, ...rest } = validEnquiry();
    const res = await request(app)
      .post('/api/enquiries')
      .send({ ...rest, eventName: 'Wedding' });
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
    expect(res.body.error.fields).toHaveProperty('eventDate');
    expect(res.body.error.fields).toHaveProperty('eventName');
    expect(db.prepare('SELECT COUNT(*) AS n FROM enquiries').get().n).toBe(0);
  });

  // Regression for audit bug #7
  it('escapes user input in the email HTML', async () => {
    const { app, mailer } = setup();
    await request(app)
      .post('/api/enquiries')
      .send(validEnquiry({ name: '<img src=x onerror=alert(1)>' }));
    await app.locals.flush();
    for (const [msg] of mailer.sendMail.mock.calls) {
      expect(msg.html).toContain('&lt;img src=x onerror=alert(1)&gt;');
      expect(msg.html).not.toContain('<img src=x');
    }
  });

  // Regression for audit bug #6
  it('renders {{placeholders}} with real values and leaves none behind', async () => {
    const { app, mailer } = setup();
    await request(app).post('/api/enquiries').send(validEnquiry());
    await app.locals.flush();
    const [customer] = mailer.sendMail.mock.calls[0];
    expect(customer.html).toContain('Thank you, Asha Verma!');
    expect(customer.text).toContain('Thank you, Asha Verma!');
    for (const [msg] of mailer.sendMail.mock.calls) {
      expect(msg.html).not.toMatch(/\{\{|\}\}/);
      expect(msg.text).not.toMatch(/\{\{|\}\}/);
    }
  });

  // Regression for audit bug #8
  it('still responds 201 when the mailer fails, and records email_status=failed', async () => {
    const mailer = { sendMail: vi.fn().mockRejectedValue(new Error('SMTP down')) };
    const { app, db } = setup({ mailer });
    const res = await request(app).post('/api/enquiries').send(validEnquiry());
    expect(res.status).toBe(201);
    await app.locals.flush();
    expect(db.prepare('SELECT email_status FROM enquiries').get().email_status).toBe('failed');
  });

  it('marks email_status=skipped when there is nobody to email', async () => {
    const mailer = { sendMail: vi.fn() };
    const mail = createMailService({
      transport: mailer,
      config: { ...setup().config, OWNER_EMAIL: undefined },
      logger: pino({ level: 'silent' }),
    });
    const data = enquirySchema.parse(validEnquiry({ email: '' }));
    expect(await mail.sendEnquiryEmails(1, data)).toBe('skipped');
    expect(mailer.sendMail).not.toHaveBeenCalled();
  });

  it('accepts a filled honeypot with 201 but stores nothing', async () => {
    const { app, db, mailer } = setup();
    const res = await request(app)
      .post('/api/enquiries')
      .send(validEnquiry({ website: 'http://spam.example' }));
    expect(res.status).toBe(201);
    await app.locals.flush();
    expect(db.prepare('SELECT COUNT(*) AS n FROM enquiries').get().n).toBe(0);
    expect(mailer.sendMail).not.toHaveBeenCalled();
  });

  it('returns a JSON 400 for malformed JSON', async () => {
    const { app } = setup();
    const res = await request(app)
      .post('/api/enquiries')
      .set('content-type', 'application/json')
      .send('{"name": ');
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('INVALID_JSON');
  });

  it('rate limits the 6th request in 15 minutes', async () => {
    const { app } = setup();
    for (let i = 0; i < 5; i++) {
      const ok = await request(app).post('/api/enquiries').send(validEnquiry());
      expect(ok.status).toBe(201);
    }
    const res = await request(app).post('/api/enquiries').send(validEnquiry());
    expect(res.status).toBe(429);
    expect(res.body.error.code).toBe('RATE_LIMITED');
    expect(res.headers).toHaveProperty('ratelimit-limit', '5');
  });
});

describe('POST /api/contact', () => {
  it('stores the message and emails customer and owner', async () => {
    const { app, db, mailer } = setup();
    const res = await request(app).post('/api/contact').send(validContact());
    expect(res.status).toBe(201);
    await app.locals.flush();
    const row = db.prepare('SELECT * FROM contacts').get();
    expect(row).toMatchObject({ phone: '+919876543210', email_status: 'sent' });
    expect(mailer.sendMail.mock.calls.map(([m]) => m.to)).toEqual([
      'ravi@example.com',
      'owner@example.com',
    ]);
  });

  it('requires an email address', async () => {
    const { app } = setup();
    const res = await request(app)
      .post('/api/contact')
      .send(validContact({ email: '' }));
    expect(res.status).toBe(400);
    expect(res.body.error.fields).toHaveProperty('email');
  });
});

describe('CORS', () => {
  it('sends Access-Control-Allow-Origin to an allowed origin', async () => {
    const { app } = setup();
    const res = await request(app).get('/api/health').set('Origin', 'http://localhost:5173');
    expect(res.headers['access-control-allow-origin']).toBe('http://localhost:5173');
  });

  it('sends no CORS headers to an unknown origin', async () => {
    const { app } = setup();
    const res = await request(app).get('/api/health').set('Origin', 'https://evil.example');
    expect(res.headers).not.toHaveProperty('access-control-allow-origin');
  });
});

describe('admin export', () => {
  const seeded = async () => {
    const ctx = setup();
    await request(ctx.app).post('/api/enquiries').send(validEnquiry());
    await request(ctx.app).post('/api/contact').send(validContact());
    await ctx.app.locals.flush();
    return ctx;
  };

  it('rejects requests without a token', async () => {
    const { app } = setup();
    const res = await request(app).get('/api/admin/enquiries');
    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe('UNAUTHORIZED');
  });

  it('rejects a wrong token', async () => {
    const { app } = setup();
    const res = await request(app).get('/api/admin/enquiries').set('Authorization', 'Bearer nope');
    expect(res.status).toBe(401);
  });

  it('returns JSON with the right token', async () => {
    const { app } = await seeded();
    const res = await request(app)
      .get('/api/admin/enquiries')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);
    expect(res.status).toBe(200);
    expect(res.body.count).toBe(1);
    expect(res.body.items[0]).toMatchObject({ name: 'Asha Verma', event_type: 'Wedding' });
  });

  it('filters by IST date range', async () => {
    const { app } = await seeded();
    const res = await request(app)
      .get('/api/admin/contacts?from=2000-01-01&to=2000-01-02')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);
    expect(res.body.count).toBe(0);
  });

  it('rejects a bad date in the query', async () => {
    const { app } = setup();
    const res = await request(app)
      .get('/api/admin/contacts?from=yesterday')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);
    expect(res.status).toBe(400);
    expect(res.body.error.fields).toHaveProperty('from');
  });

  it('exports a valid xlsx', async () => {
    const { app } = await seeded();
    const res = await request(app)
      .get('/api/admin/contacts?format=xlsx')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .buffer(true)
      .parse((r, cb) => {
        const chunks = [];
        r.on('data', (c) => chunks.push(c));
        r.on('end', () => cb(null, Buffer.concat(chunks)));
      });
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain(
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    expect(res.headers['content-disposition']).toMatch(
      /attachment; filename="?contacts-\d{4}-\d{2}-\d{2}\.xlsx"?/,
    );
    const wb = new ExcelJS.Workbook();
    await wb.xlsx.load(res.body);
    const ws = wb.worksheets[0];
    expect(ws.getRow(1).getCell(3).value).toBe('Name');
    expect(ws.getRow(1).font.bold).toBe(true);
    expect(ws.getRow(2).getCell(3).value).toBe('Ravi Kumar');
    expect(ws.getRow(2).getCell(2).value).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/);
  });
});

describe('unknown routes', () => {
  it('return a JSON 404', async () => {
    const { app } = setup();
    const res = await request(app).get('/api/nope');
    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe('NOT_FOUND');
  });
});
