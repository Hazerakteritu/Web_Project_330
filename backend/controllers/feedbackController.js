const db = require("../config/db");

const { createNotification } = require("../utils/notifications");
const { createWorkerNotification } = require("../utils/workerNotifications");

// Reward based on rating
function getRewardPoints(rating) {
  switch (rating) {
    case 5: return 10;
    case 4: return 7;
    case 3: return 5;
    case 2: return 2;
    default: return 0;
  }
}

// Citizen submits feedback
const submitFeedback = (req, res) => {
    const { request_id, rating, feedback_text } = req.body;
    const citizen_id = req.user.id;

    // Step–1: Get assigned worker from the request
    const workerQuery = `SELECT assigned_worker_id FROM requests WHERE id = ?`;

    db.query(workerQuery, [request_id], (err, workerResult) => {
        if (err) return res.status(500).json({ message: "DB error" });

        if (workerResult.length === 0)
            return res.status(404).json({ message: "Request not found" });

        const worker_id = workerResult[0].assigned_worker_id;

        // Step–2: Insert feedback
        const sql = `
            INSERT INTO feedback (request_id, user_id, rating, feedback_text)
            VALUES (?, ?, ?, ?)
        `;

        db.query(sql, [request_id, citizen_id, rating, feedback_text], (err, result) => {
            if (err) return res.status(500).json({ message: "DB error inserting feedback" });

            const feedback_id = result.insertId;

            // Step–3: Send worker notification IF worker exists
            if (worker_id) {
                createWorkerNotification(worker_id, "feedback", feedback_id);
            }

            res.json({ message: "Feedback submitted successfully" });
        });
    });
};

module.exports = { submitFeedback };
