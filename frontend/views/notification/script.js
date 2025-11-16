const NOTIF_URL = "http://localhost:5000/api/notifications";

async function loadNotifications() {
  const response = await fetch(NOTIF_URL, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  });

  const result = await response.json();
  console.log(result);

  // IMPORTANT: Extract notifications array
  const data = result.notifications;
  const unreadCounts = result.unreadCounts;

  if (!Array.isArray(data)) {
    console.error("Notifications did not return an array!");
    return;
  }

  const newReq = data.filter(n => n.type === "request");
  const feedback = data.filter(n => n.type === "feedback");
  const rejected = data.filter(n => n.type === "rejected");
  const completed = data.filter(n => n.type === "completed");

  display("newRequests", newReq, "New Request");
  display("newFeedback", feedback, "Feedback");
  display("rejectedRequests", rejected, "Rejected");
  display("completedRequests", completed, "Completed");

  // Sidebar badge (unread only)
  const totalUnread =
    (unreadCounts.request || 0) +
    (unreadCounts.feedback || 0) +
    (unreadCounts.rejected || 0) +
    (unreadCounts.completed || 0);

  document.getElementById("notifCount").innerText = totalUnread;
}


function display(containerId, list, type) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  list.forEach(item => {
    const div = document.createElement("div");
    div.className = "notif-item";
    div.id = "notif-" + item.id;   // DOM থেকে remove করার জন্য ID লাগবে

    let text = "";

    if (type === "New Request")
      text = `📩 ${item.citizen_name} requested: <b>${item.request_type}</b>`;

    if (type === "Feedback")
      text = `⭐ ${item.citizen_name}: "<b>${item.feedback_text}</b>"`;

    if (type === "Rejected")
      text = `❌ ${item.citizen_name} - Reason: <b>${item.reason || "Not available"}</b>`;

    if (type === "Completed")
      text = `✅ ${item.citizen_name}'s <b>${item.request_type}</b> completed`;

    // Add delete button
    div.innerHTML = `
      <span>${text}</span>
      <button class="delete-btn" onclick="deleteNotification(${item.id})">🗑</button>
    `;

    container.appendChild(div);
  });
}
async function deleteNotification(id) {
  // 1) Backend এ read=true করে নিবে
  await fetch(`http://localhost:5000/api/notifications/${id}/read`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({ read: true })
  });

  // 2) UI থেকে রিমুভ
  const elem = document.getElementById("notif-" + id);
  if (elem) elem.remove();
}


loadNotifications();
