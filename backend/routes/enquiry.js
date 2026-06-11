const express = require('express');
const router = express.Router();
const Joi = require('joi');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const { Mutex } = require('async-mutex');
const transporter = require('../mail');

// ---------- Validation Schema ----------
const enquirySchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^[0-9+\-() *]{7,20}$/).required(),
  eventType: Joi.string().required(),
  eventDate: Joi.date().iso().required(),
  guests: Joi.number().integer().min(1).required(),
  message: Joi.string().allow('', null)
});

// ---------- Excel handling ----------
const excelPath = path.join(__dirname, '..', 'data', 'enquiries.xlsx');
const mutex = new Mutex();

async function saveEnquiryToExcel(enquiry) {
  return mutex.runExclusive(() => {
    let workbook, sheet;
    if (fs.existsSync(excelPath)) {
      workbook = xlsx.readFile(excelPath);
      sheet = workbook.Sheets['Enquiries'];
    } else {
      workbook = xlsx.utils.book_new();
      sheet = xlsx.utils.aoa_to_sheet([
        ['Timestamp', 'Name', 'Email', 'Phone', 'Event Type', 'Event Date', 'Guests', 'Message']
      ]);
      xlsx.utils.book_append_sheet(workbook, sheet, 'Enquiries');
    }

    const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 });
    const timestamp = new Date().toISOString();
    rows.push([
      timestamp,
      enquiry.name,
      enquiry.email,
      enquiry.phone,
      enquiry.eventType,
      enquiry.eventDate,
      enquiry.guests,
      enquiry.message || ''
    ]);

    const newSheet = xlsx.utils.aoa_to_sheet(rows);
    workbook.Sheets['Enquiries'] = newSheet;
    xlsx.writeFile(workbook, excelPath);
    return true;
  });
}

// ---------- Simple HTML template renderer ----------
function renderTemplate(templatePath, vars) {
  let tmpl = fs.readFileSync(templatePath, 'utf8');
  for (const [key, value] of Object.entries(vars)) {
    tmpl = tmpl.split(`{{${key}}}`).join(value);
  }
  return tmpl;
}

// ---------- POST / ----------
router.post('/', async (req, res) => {
  const { error, value } = enquirySchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      details: error.details.map(d => d.message)
    });
  }

  try {
    await saveEnquiryToExcel(value);

    const html = renderTemplate(
      path.join(__dirname, '..', 'templates', 'enquiry-confirm.html'),
      {
        name: value.name,
        eventType: value.eventType,
        eventDate: value.eventDate,
        guests: value.guests,
        phone: value.phone,
        email: value.email,
        message: value.message || '(none)'
      }
    );

    await transporter.sendMail({
      from: `Banquet Hall <${process.env.FROM_EMAIL}>`,
      to: value.email,
      subject: 'Your Banquet Hall Enquiry',
      html
    });

    return res.status(201).json({
      status: 'success',
      message: 'Enquiry received and email sent.'
    });
  } catch (err) {
    console.error('❗ Enquiry handling error:', err);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

module.exports = router;