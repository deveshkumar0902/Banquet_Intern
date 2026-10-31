/**
 * @param {{ db: import('better-sqlite3').Database, mail: ReturnType<typeof import('./mailService.js').createMailService> }} deps
 */
export function createContactService({ db, mail }) {
  const insert = db.prepare(`
    INSERT INTO contacts (name, phone, email, subject, message, ip_hash)
    VALUES (@name, @phone, @email, @subject, @message, @ipHash)
  `);
  const setStatus = db.prepare('UPDATE contacts SET email_status = ? WHERE id = ?');

  return {
    create(data, { ipHash }) {
      return Number(insert.run({ ...data, ipHash }).lastInsertRowid);
    },
    async notify(id, data) {
      setStatus.run(await mail.sendContactEmails(id, data), id);
    },
  };
}
