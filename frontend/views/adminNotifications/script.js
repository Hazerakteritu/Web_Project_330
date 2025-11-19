const NOTIF_URL = "http://localhost:5000/api/notifications";
let notifications = []; 
async function loadNotifications() {
  const response = await fetch(NOTIF_URL, {
    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
  });

  const result = await response.json();

  // Store all notifications
  notifications = result.notifications || [];

  // Unread counter object
  const unreadCounts = result.unreadCounts || {};

  // Set category counters
  document.getElementById("newReqCount").innerText = unreadCounts.request || 0;
  document.getElementById("feedbackCount").innerText = unreadCounts.feedback || 0;
  document.getElementById("rejectedCount").innerText = unreadCounts.rejected || 0;
  document.getElementById("completedCount").innerText = unreadCounts.completed || 0;

  // Total sidebar count
  const totalUnread =
    (unreadCounts.request || 0) +
    (unreadCounts.feedback || 0) +
    (unreadCounts.rejected || 0) +
    (unreadCounts.completed || 0);

  document.getElementById("notifCount").innerText = totalUnread;
}


function displayCategory(type, containerId, countId) {

  const container = document.getElementById(containerId);
  container.innerHTML = "";

  const unreadList = notifications.filter(n => n.type === type && n.status === "unread");

  if (unreadList.length === 0) {
    container.style.display = "none";
    return;
  }

  unreadList.forEach(item => {
    const div = document.createElement("div");
    div.className = "notif-item";

    let text = "";

    switch (type) {
      case "request":
        text = `📩 ${item.citizen_name} requested: <b>${item.request_type}</b>`;
        break;

      case "feedback":
        text = `⭐ ${item.citizen_name}: "<b>${item.feedback_text}</b>"`;
        break;

      case "rejected":
        text = `❌ ${item.citizen_name} - Reason: <b>${item.reason || "Not provided"}</b>`;
        break;

      case "completed":
        text = `✅ ${item.citizen_name}'s <b>${item.request_type}</b> completed`;
        break;
    }

    div.innerHTML = text;
    container.appendChild(div);

    fetch(`${NOTIF_URL}/${item.id}/read`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });

    item.status = "read";
  });

  container.style.display = "block";

  document.getElementById(countId).innerText = "0";

  const oldTotal = Number(document.getElementById("notifCount").innerText);
  const newTotal = oldTotal - unreadList.length;
  document.getElementById("notifCount").innerText = newTotal >= 0 ? newTotal : 0;
}

document.querySelectorAll(".notif-toggle").forEach(h => {
  h.addEventListener("click", () => {
    const type = h.dataset.type;
    const containerId = h.dataset.container;
    const countId = h.dataset.count;

    displayCategory(type, containerId, countId);
  });
});


loadNotifications();
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("open");
}