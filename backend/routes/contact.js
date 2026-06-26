const express = require('express');
const router = express.Router();
const Joi = require('joi');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const { Mutex } = require('async-mutex');
const transporter = require('../mail');
const config = require("../config");

// ---------- Validation Schema ----------
const contactSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^[0-9+\-() *]{7,20}$/).required(),
  subject: Joi.string().min(1).max(200).required(),
  message: Joi.string().allow('', null)
});

// ---------- Excel handling ----------
const excelPath = path.join(__dirname, '..', 'data', 'contacts.xlsx');
const mutex = new Mutex();

async function saveContactToExcel(contact) {
  return mutex.runExclusive(async () => {
    let workbook, sheet;
    if (fs.existsSync(excelPath)) {
      workbook = xlsx.readFile(excelPath);
      sheet = workbook.Sheets['Contacts'];
    } else {
      workbook = xlsx.utils.book_new();
      sheet = xlsx.utils.aoa_to_sheet([
        ['Timestamp', 'Name', 'Email', 'Phone', 'Subject', 'Message']
      ]);
      xlsx.utils.book_append_sheet(workbook, sheet, 'Contacts');
    }

    const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 });
    const timestamp = new Date().toISOString();
    rows.push([
      timestamp,
      contact.name,
      contact.email,
      contact.phone,
      contact.subject,
      contact.message || ''
    ]);

    const newSheet = xlsx.utils.aoa_to_sheet(rows);
    workbook.Sheets['Contacts'] = newSheet;
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
  const { error, value } = contactSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      details: error.details.map(d => d.message)
    });
  }

  try {
    await saveContactToExcel(value);

    const html = renderTemplate(
      path.join(__dirname, '..', 'templates', 'enquiry-confirm.html'),
      {
        name: value.name,
        eventType: value.subject, // Reusing eventType placeholder for subject
        eventDate: new Date().toISOString().split('T')[0], // Today's date
        guests: '', // Not applicable
        phone: value.phone,
        email: value.email,
        message: value.message || '(none)'
      }
    );

    await transporter.sendMail({
      from: `Banquet Hall <${config.FROM_EMAIL}>`,
      to: value.email,
      subject: `Contact Form Submission: ${value.subject}`,
      html
    });

    return res.status(201).json({
      status: 'success',
      message: 'Contact received and email sent.'
    });
  } catch (err) {
    console.error('❗ Contact handling error:', err);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

module.exports = router;