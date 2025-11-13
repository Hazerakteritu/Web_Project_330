const db = require("../config/db");

// Citizen submits feedback
const createFeedback = (req, res) => {
  const { request_id, rating, feedback_text } = req.body;
  const user_id = req.user.id;

  if (!request_id || !rating || !feedback_text) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Insert feedback
  const sql = `
    INSERT INTO feedback (request_id, user_id, rating, feedback_text)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [request_id, user_id, rating, feedback_text], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });

    // Insert notification (shared for all admins)
    const notificationSql = `
      INSERT INTO notifications (feedback_id, status)
      VALUES (?, 'unread')
    `;
    db.query(notificationSql, [result.insertId], (err2) => {
      if (err2) return res.status(500).json({ message: "Notification error", error: err2 });
      res.status(201).json({ message: "Feedback submitted and notification created" });
    });
  });
};

// Admin gets notifications, optional filter by status
const getNotifications = (req, res) => {
  const { status } = req.query; // optional ?status=read or ?status=unread
  let sql = `
    SELECT n.id AS notification_id, n.status, f.feedback_text, f.rating, f.request_id, u.name AS citizen_name
    FROM notifications n
    JOIN feedback f ON n.feedback_id = f.id
    JOIN users u ON f.user_id = u.id
  `;
  const params = [];

  if (status && ["read", "unread"].includes(status)) {
    sql += " WHERE n.status = ?";
    params.push(status);
  }

  sql += " ORDER BY n.id DESC";

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    res.json(results);
  });
};

// Admin marks notification as read
const markNotificationAsRead = (req, res) => {
  const notification_id = req.params.id;

  const sql = `
    UPDATE notifications
    SET status = 'read'
    WHERE id = ?
  `;

  db.query(sql, [notification_id], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.json({ message: "Notification marked as read" });
  });
};

module.exports = { createFeedback, getNotifications, markNotificationAsRead };
