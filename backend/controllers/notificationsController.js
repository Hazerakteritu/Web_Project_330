

const db = require("../config/db");

const getAdminNotifications = (req, res) => {
    const sql = `
        SELECT n.id, n.type, n.reference_id, n.status, n.created_at,
               f.rating, f.feedback_text,
               r.request_type, r.location,
               u.name AS citizen_name
        FROM notifications n
        LEFT JOIN feedback f ON n.type='feedback' AND n.reference_id=f.id
        LEFT JOIN requests r ON n.type IN ('request','rejected','completed') AND n.reference_id=r.id
        LEFT JOIN users u ON (r.user_id=u.id OR f.user_id=u.id)
        ORDER BY n.created_at DESC
    `;
    
    db.query(sql, [], (err, notifications) => {
        if(err) return res.status(500).json({ message: "DB error" });

        // Auto-mark read for everything except feedback
        const autoReadIds = notifications
            .filter(n => n.type !== "feedback" && n.status === "unread")
            .map(n => n.id);

        if(autoReadIds.length > 0){
            const updateSql = `UPDATE notifications SET status='read' WHERE id IN (${autoReadIds.join(',')})`;
            db.query(updateSql, (err2) => {
                if(err2) console.error("Failed to auto-mark notifications as read:", err2);
            });
        }

        // Group notifications by type
        const groupedNotifications = {};
        notifications.forEach(n => {
            if(!groupedNotifications[n.type]) groupedNotifications[n.type] = [];
            groupedNotifications[n.type].push(n);
        });

        // Get unread counts by type
        const countSql = `
            SELECT type, COUNT(*) AS unread_count
            FROM notifications
            WHERE status='unread'
            GROUP BY type
        `;
        db.query(countSql, [], (err3, counts) => {
            if(err3) return res.status(500).json({ message: "DB error on counts" });

            const unreadCounts = {};
            counts.forEach(c => {
                unreadCounts[c.type] = c.unread_count;
            });

            // Send grouped response
            res.json({
                notifications: groupedNotifications,
                unreadCounts
            });
        });
    });
};



const markNotificationRead = (req, res) => {
    const { id } = req.params;
    const sql = "UPDATE notifications SET status='read' WHERE id=? AND type='feedback'";
    db.query(sql, [id], (err, result) => {
        if(err) return res.status(500).json({message:"DB error"});
        res.json({message:"Feedback notification marked read"});
    });
};
module.exports = {
    getAdminNotifications,
    markNotificationRead
};
