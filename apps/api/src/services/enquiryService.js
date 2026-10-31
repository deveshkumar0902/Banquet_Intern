/**
 * @param {{ db: import('better-sqlite3').Database, mail: ReturnType<typeof import('./mailService.js').createMailService> }} deps
 */
export function createEnquiryService({ db, mail }) {
  const insert = db.prepare(`
    INSERT INTO enquiries (name, phone, email, event_type, event_date, guests, venue, message, source_page, ip_hash)
    VALUES (@name, @phone, @email, @eventType, @eventDate, @guests, @venue, @message, @sourcePage, @ipHash)
  `);
  const setStatus = db.prepare('UPDATE enquiries SET email_status = ? WHERE id = ?');

  return {
    /** Stores a validated enquiry and returns its id. */
    create(data, { ipHash }) {
      const row = {
        email: null,
        venue: null,
        message: null,
        sourcePage: null,
        ...data,
        ipHash,
      };
      return Number(insert.run(row).lastInsertRowid);
    },
    /** Sends the emails and records the outcome. Meant to run after the response is sent. */
    async notify(id, data) {
      setStatus.run(await mail.sendEnquiryEmails(id, data), id);
    },
  };
}
