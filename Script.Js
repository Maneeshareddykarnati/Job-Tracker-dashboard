const jobForm = document.getElementById("jobForm");
const jobTableBody = document.getElementById("jobTableBody");
const searchInput = document.getElementById("searchInput");
const filterStatus = document.getElementById("filterStatus");

const totalApplications = document.getElementById("totalApplications");
const interviewCount = document.getElementById("interviewCount");
const offerCount = document.getElementById("offerCount");
const rejectedCount = document.getElementById("rejectedCount");

let jobs = JSON.parse(localStorage.getItem("jobs")) || [
  {
    company: "JPMorgan Chase",
    role: "Java Full Stack Developer",
    status: "Applied",
    date: "2026-05-10"
  },
  {
    company: "Fidelity Investments",
    role: "Software Engineer",
    status: "Interview",
    date: "2026-05-15"
  },
  {
    company: "Infosys",
    role: "React Developer",
    status: "Applied",
    date: "2026-05-20"
  }
];

function saveJobs() {
  localStorage.setItem("jobs", JSON.stringify(jobs));
}

function updateStats() {
  totalApplications.textContent = jobs.length;
  interviewCount.textContent = jobs.filter(job => job.status === "Interview").length;
  offerCount.textContent = jobs.filter(job => job.status === "Offer").length;
  rejectedCount.textContent = jobs.filter(job => job.status === "Rejected").length;
}

function displayJobs() {
  const searchText = searchInput.value.toLowerCase();
  const selectedStatus = filterStatus.value;

  const filteredJobs = jobs.filter(job => {
    const matchesSearch =
      job.company.toLowerCase().includes(searchText) ||
      job.role.toLowerCase().includes(searchText);

    const matchesStatus =
      selectedStatus === "All" || job.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  jobTableBody.innerHTML = "";

  if (filteredJobs.length === 0) {
    jobTableBody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align:center;">No applications found</td>
      </tr>
    `;
    return;
  }

  filteredJobs.forEach((job, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${job.company}</td>
      <td>${job.role}</td>
      <td><span class="status ${job.status}">${job.status}</span></td>
      <td>${job.date}</td>
      <td>
        <button class="delete-btn" onclick="deleteJob(${index})">Delete</button>
      </td>
    `;

    jobTableBody.appendChild(row);
  });

  updateStats();
}

function deleteJob(index) {
  jobs.splice(index, 1);
  saveJobs();
  displayJobs();
  updateStats();
}

jobForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const company = document.getElementById("company").value;
  const role = document.getElementById("role").value;
  const status = document.getElementById("status").value;
  const date = document.getElementById("date").value;

  const newJob = {
    company,
    role,
    status,
    date
  };

  jobs.push(newJob);
  saveJobs();
  displayJobs();
  updateStats();

  jobForm.reset();
});

searchInput.addEventListener("input", displayJobs);
filterStatus.addEventListener("change", displayJobs);

displayJobs();
updateStats();
