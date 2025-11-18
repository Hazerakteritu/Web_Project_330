const db = require("../config/db");

// get notifications for logged in user
const getUserNotifications = (req, res) => {
    const user_id = req.user.id;

    const sql = `
        SELECT 
            n.*, 
            w.name AS worker_name,
            w.phone AS worker_phone,
            w.email AS worker_email
        FROM user_notifications n
        LEFT JOIN users w ON n.worker_id = w.id
        WHERE n.user_id = ?
        ORDER BY n.created_at DESC
    `;

    db.query(sql, [user_id], (err, results) => {
        if (err) 
            return res.status(500).json({ message: "Database error", error: err });

        const unreadCounts = {
            completed: 0,
            assigned: 0,
            rejected: 0
        };

        results.forEach(n => {
            if (n.status === "unread") {
                if (n.type === "completed") unreadCounts.completed++;
                if (n.type === "assigned") unreadCounts.assigned++;
                if (n.type === "rejected") unreadCounts.rejected++;
            }
        });

        // --- Send correct response ---
        res.json({
            notifications: results,
            unreadCounts
        });
    });
};

// mark as read
const markAsRead = (req, res) => {
    const { id } = req.params;

    const sql = `
        UPDATE user_notifications 
        SET status='read'
        WHERE id=?`;

    db.query(sql, [id], () => {
        res.json({ message: "Marked as read" });
    });
};

module.exports = { getUserNotifications, markAsRead };
