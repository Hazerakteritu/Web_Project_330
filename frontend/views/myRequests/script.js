const API_URL = "http://localhost:5000/api/requests";

loadRequests();

document
  .getElementById("statusFilter")
  .addEventListener("change", loadRequests);

async function loadRequests() {
  const status = document.getElementById("statusFilter").value;

  const url = status ? `${API_URL}?status=${status}` : API_URL;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const requests = await response.json();
  renderRequests(requests);
}

function renderRequests(requests) {
  const container = document.getElementById("requestContainer");
  container.innerHTML = "";

  if (requests.length === 0) {
    container.innerHTML = `<p>No requests found.</p>`;
    return;
  }

  requests.forEach((req) => {
    const imagePath = req.waste_image
      ? req.waste_image.replace(/\\/g, "/")
      : "no-image.jpg";

    const card = `
      <div class="request-card">

        <div class="left-info">
          <p><span><i class="fa-solid fa-location-dot" style="color:#6f42c1;"></i> Location
 Location:</span> ${req.location}</p>
          <p><span><i class="fa-solid fa-circle-dot status-icon" style="color:#4A90E2;"></i>
 Status:</span> 
            <span class="status-badge ${req.status}">
              ${req.status.replace("_", " ")}
            </span>
          </p>
          <p><span><i class="fas fa-recycle" style="color:#9b59b6;"></i>
 Type:</span> ${req.request_type}</p>
          <p><span><i class="fa-solid fa-file-alt" style="color: #3b82f6; margin-right: 6px;"></i> Description
 Description:</span> ${req.description}</p>
          <p><span><i class="fas fa-stopwatch" style="color:#ff2e2e;"></i>
 Priority:</span> ${req.priority}</p>
          <p><span><i class="fa-solid fa-calendar-days" style="color:#4A90E2;"></i>
 Date:</span> ${req.created_at.split("T")[0]}</p>
        </div>

        <div class="right-image">
          <img src="http://localhost:5000/${imagePath}">
        </div>

      </div>
    `;

    container.innerHTML += card;
  });
}
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("open");
}
async function loadNotificationCount() {
  try {
    const res = await fetch("http://localhost:5000/api/notifications/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();

    const unreadCounts = data.unreadCounts || {};

    const totalUnread =
      (unreadCounts.completed || 0) +
      (unreadCounts.assigned || 0) +
      (unreadCounts.rejected || 0);

    // dashboard sidebar count
    if (document.getElementById("notifCount")) {
      document.getElementById("notifCount").innerText = totalUnread;
    }
  } catch (err) {
    console.log("Notification Load Error", err);
  }
}
loadNotificationCount();
