const db = require("../config/db");

//Create new request
const createRequest = (req, res) => {
  const { request_type, description, location, priority } = req.body;
  const user_id = req.user.id; // from JWT token

  if (!request_type || !location) {
    return res.status(400).json({ message: "Request type and location required" });
  }

  const sql = `
    INSERT INTO requests (user_id, request_type, description, location, priority)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [user_id, request_type, description, location, priority || "normal"], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    res.status(201).json({ message: "Request submitted successfully" });
  });
};

//Get all requests (Admin only)
const getAllRequests = (req, res) => {
  const sql = `
    SELECT r.*, u.name AS user_name, u.email AS user_email
    FROM requests r
    JOIN users u ON r.user_id = u.id
    ORDER BY r.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(results);
  });
};


// Update request status (Admin action)
const updateRequestStatus = (req, res) => {
  const { id } = req.params;
  const { status, assigned_worker_id } = req.body;

  const validStatuses = ["pending", "assigned", "in_progress", "completed", "rejected"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const sql = `
    UPDATE requests SET status = ?, assigned_worker_id = ?
    WHERE id = ?
  `;

  db.query(sql, [status, assigned_worker_id || null, id], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json({ message: `Request status updated to ${status}` });
  });
};

module.exports = { createRequest, getAllRequests, updateRequestStatus };
