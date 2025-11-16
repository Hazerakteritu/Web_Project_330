// ---------------------------------------------
// Token check — Login নেই হলে redirect
// ---------------------------------------------
const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "../login/login.html";
}

const workerName = localStorage.getItem("userName");

document.querySelector(".header h1").innerHTML = 
    `Welcome Back, ${workerName} 🤝`;

document.querySelector(".user-info").innerHTML =
    `<i class="fas fa-user-circle"></i> ${workerName}`;


// ---------------------------------------------
// Fetch Functions
// ---------------------------------------------

// 1) Get Assigned Requests Count
async function getAssignedRequests() {
  const res = await fetch("http://localhost:5000/api/requests?status=assigned", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
}

// 2) Get Completed Requests
async function getCompletedRequests() {
  const res = await fetch("http://localhost:5000/api/requests?status=completed", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
}

// 3) Get Rewards Points
async function getRewardPoints() {
  const res = await fetch("http://localhost:5000/api/user/rewards", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
}

// 4) Recent Tasks
async function getAllRequests() {
  const res = await fetch("http://localhost:5000/api/requests", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
}


// ---------------------------------------------
// Load Dashboard Data
// ---------------------------------------------
async function loadDashboard() {
  try {
    // Fetch data parallel
    const [assigned, completed, rewards, allRequests] = await Promise.all([
      getAssignedRequests(),
      getCompletedRequests(),
      getRewardPoints(),
      getAllRequests(),
    ]);

    // SET Assigned Count
    document.querySelector(".card-value.total").innerText = assigned.length;

    // SET Completed Count
    document.querySelector(".card-value.completed").innerText = completed.length;

    // SET Total Points
    const totalPoints = rewards.waste_reward_points + rewards.recycled_reward_points;
    document.querySelector(".card-value.points").innerText = totalPoints;

    // SET Recent Tasks (Latest 3)
    const latest = allRequests.slice(0, 3);

    let taskRows = "";
    latest.forEach(r => {
      taskRows += `
        <tr>
            <td>#${r.id}</td>
            <td>${r.request_type === "waste" ? "Household Waste" : "Recycling Pickup"}</td>
            <td>${r.location}</td>
            <td>${new Date(r.created_at).toLocaleString()}</td>
            <td><span class="status-tag ${r.status}">${r.status}</span></td>
        </tr>
      `;
    });

    document.querySelector("tbody").innerHTML = taskRows;

  } catch (err) {
    console.error(err);
  }
}

loadDashboard();
