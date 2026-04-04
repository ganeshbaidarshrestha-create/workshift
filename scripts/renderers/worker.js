import { getMarketplaceJobs, getSession, selectedWorkerJob } from "../store.js";
import {
  chatFeed,
  documentList,
  formatAccountId,
  identityCard,
  mapsUrl,
  workerJobModal,
  workerJobStatus,
  workerMapBoard
} from "./shared.js";

export function workerDashboard(user) {
  const job = selectedWorkerJob();
  const profile = user.profile || {};
  const availableJobs = Array.isArray(getMarketplaceJobs()) ? getMarketplaceJobs() : [];
  const userJobs = Array.isArray(user.jobs) ? user.jobs : [];
  const applications = Array.isArray(user.applications) ? user.applications : [];
  const notifications = Array.isArray(profile.notifications) ? profile.notifications : [];
  const invitations = Array.isArray(profile.invitations) ? profile.invitations : [];
  const skillsCatalog = Array.isArray(profile.skillsCatalog) ? profile.skillsCatalog : [];
  const reviews = Array.isArray(profile.reviews) ? profile.reviews : [];
  const chatStream = Array.isArray(user.chatStream) ? user.chatStream : [];
  const documents = Array.isArray(user.documents) ? user.documents : [];
  const shift = user.shift || {};
  const login = user.login || {};
  const withdrawal = profile.withdrawal || {};
  const reputation = user.reputation || {};
  const fallbackJob = availableJobs[0] || {
    id: "job_fallback",
    title: "No live job available",
    company: "WorkShift",
    pay: "$0/day",
    distance: "Location pending",
    skills: "No skills listed",
    summary: "Job marketplace is loading.",
    status: "Open",
    location: "Nepal"
  };
  const currentJob = userJobs.find((item) => item.applied) || job || fallbackJob;
  const currentApplication = applications.find((item) => item.title === currentJob.title) || applications[0];
  const session = getSession();
  const activeView = session.activePortalView;
  const savedJobs = userJobs.filter((item) => item.saved);
  const workerSearchTerm = String(session.workerJobSearchTerm || "").trim().toLowerCase();
  const workerSearchLocation = String(session.workerJobSearchLocation || "").trim().toLowerCase();
  const workerSearchCountry = session.workerJobSearchCountry || "Nepal";
  const allLocations = Array.from(new Set(availableJobs.map((item) => item.location || item.distance).filter(Boolean)));
  const discoverableJobs = availableJobs.filter((item) => {
    const haystack = [item.title, item.company, item.skills, item.summary].join(" ").toLowerCase();
    const itemLocation = String(item.location || item.distance || "").toLowerCase();
    const matchesTerm = !workerSearchTerm || haystack.includes(workerSearchTerm);
    const matchesLocation = !workerSearchLocation || itemLocation.includes(workerSearchLocation);
    const matchesCountry = !workerSearchCountry || workerSearchCountry === "Nepal";
    return matchesTerm && matchesLocation && matchesCountry;
  });
  const appliedJobs = availableJobs.filter((item) => {
    const status = workerJobStatus(user, item).label;
    return ["Applied", "Shortlisted", "Invited", "Hired", "Rated"].includes(status);
  });
  const activeJobs = availableJobs.filter((item) => {
    const status = workerJobStatus(user, item).label;
    return ["Hired", "Ongoing", "In Progress"].includes(status) || item.status === "Ongoing";
  });
  const completedJobs = availableJobs.filter((item) => {
    const status = workerJobStatus(user, item).label;
    return ["Completed", "Rated"].includes(status) || item.status === "Completed";
  });
  const workerJobsFilter = session.workerJobsFilter || "applied";
  const filteredJobs = workerJobsFilter === "saved"
    ? savedJobs
    : workerJobsFilter === "discover"
    ? discoverableJobs
    : workerJobsFilter === "active"
    ? activeJobs
    : workerJobsFilter === "completed"
    ? completedJobs
    : appliedJobs;
  const similarOffers = availableJobs.filter((item) =>
    item.id !== currentJob.id
    && ((item.location && item.location === currentJob.location)
      || (item.skills && currentJob.skills && item.skills.split("/")[0]?.trim() === currentJob.skills.split("/")[0]?.trim()))
  ).slice(0, 3);
  const verificationRequired = documents.filter((item) => item.required).length;
  const verificationDone = documents.filter((item) => item.required && item.status === "Uploaded").length;
  const payoutAvailable = Number(user.wallet || 0);
  const payoutPending = Math.max(0, Number(user.weeklyEarnings || 0) - payoutAvailable);
  const lastPayout = withdrawal.schedule || "On demand";
  const hiringStages = ["Applied", "Shortlisted", "Invited", "Hired", "Completed", "Paid"];
  const currentStage = currentApplication?.status || workerJobStatus(user, currentJob).label;
  return `
    <div class="stack">
      ${identityCard(user)}
      ${workerJobModal(user, session, job)}

      ${(activeView === "dashboard" || activeView === "jobs") ? `
      <section class="panel">
        <div class="dashboard-topnav">
          <div class="button-row">
            <span class="avatar-chip">${(user.fullName || "WU").slice(0, 2).toUpperCase()}</span>
            <div>
              <strong>${user.fullName || "Worker User"}</strong>
              <p>Wallet balance $${user.wallet}</p>
            </div>
          </div>
          <div class="button-row">
            <span class="icon-chip">Wallet $${user.wallet}</span>
            <span class="icon-chip">Bell 2</span>
          </div>
        </div>
      </section>
      ` : ""}

      ${(activeView === "dashboard") ? `
      <section class="panel">
        <h3>Worker Live Workspace</h3>
        <div class="comparison-grid">
          <article class="job-card selected">
            <header><div><strong>${currentJob.title}</strong><div>${currentJob.company}</div></div><span class="status-pill ${workerJobStatus(user, currentJob).tone}">${workerJobStatus(user, currentJob).label}</span></header>
            <div class="meta-row"><span>${currentJob.pay}</span><span>${currentJob.distance}</span><span>${currentJob.skills}</span></div>
            <div>${currentJob.summary || "Selected job ready for action."}</div>
            <div class="button-row">
              <button class="primary-button small-button" type="button" data-worker-open-job>Open Job</button>
              <button class="secondary-button small-button" type="button" data-worker-save>${workerJobStatus(user, currentJob).label === "Saved" ? "Unsave" : "Save"}</button>
              <button class="secondary-button small-button" type="button" data-worker-checkin>${shift.checkedIn ? "Checked In" : "Check In"}</button>
              <button class="secondary-button small-button" type="button" data-worker-proof>${shift.proofSubmitted ? "Proof Uploaded" : "Upload Proof"}</button>
            </div>
          </article>
          <article class="job-card selected">
            <header><div><strong>Chat With ${currentJob.company}</strong><div>${currentJob.title} / direct employer thread</div></div><span class="status-pill ${user.availability}">${user.availability}</span></header>
            <div class="meta-row"><span>${currentApplication?.status || "Open"}</span><span>${chatStream.length} messages</span><span>${currentJob.pay}</span></div>
            ${chatFeed(chatStream)}
            <div class="button-row">
              <input id="chatInput" type="text" placeholder="Message ${currentJob.company}">
              <button class="primary-button small-button" type="button" data-worker-send-chat>Send</button>
            </div>
          </article>
        </div>
      </section>
      ` : ""}

      ${(activeView === "dashboard") ? `
      <section class="panel">
        <h3>My Hiring Journey</h3>
        <div class="document-grid">
          <article class="info-card"><strong>Selected Job</strong><p>${currentJob.title} / ${currentJob.company}</p></article>
          <article class="info-card"><strong>Application Status</strong><p>${currentApplication?.status || workerJobStatus(user, currentJob).label}</p></article>
          <article class="info-card"><strong>Employer Thread</strong><p>${chatStream.length} visible messages with ${currentJob.company}</p></article>
          <article class="info-card"><strong>Verification</strong><p>${user.verificationStatus}${user.approvedAt ? ` / approved ${new Date(user.approvedAt).toLocaleDateString()}` : ""}</p></article>
        </div>
        <div class="worker-timeline">
          ${hiringStages.map((stage) => {
            const isActive = stage === currentStage || (stage === "Paid" && currentStage === "Rated");
            const isComplete = hiringStages.indexOf(stage) <= Math.max(0, hiringStages.indexOf(currentStage));
            return `<article class="timeline-step ${isActive ? "active" : ""} ${isComplete ? "complete" : ""}"><strong>${stage}</strong><span>${isActive ? "Current" : isComplete ? "Done" : "Pending"}</span></article>`;
          }).join("")}
        </div>
      </section>
      ` : ""}

      ${(activeView === "dashboard" || activeView === "profile") ? `
      <section class="panel">
        <h3>Availability</h3>
        <div class="button-row">
          <span class="status-pill ${user.availability}">${user.availability === "available" ? "Available" : user.availability === "busy" ? "Busy" : "Offline"}</span>
          <span class="icon-chip">Geo ${user.geoSharing}</span>
          <span class="icon-chip">${formatAccountId(user)}</span>
          <button class="secondary-button small-button" type="button" data-worker-toggle-availability>Toggle Availability</button>
        </div>
      </section>
      ` : ""}

      ${(activeView === "dashboard" || activeView === "profile") ? `
      <section class="panel">
        <h3>Wallet and Payout Breakdown</h3>
        <div class="summary-grid">
          <article class="quick-card"><strong>Available Balance</strong><p>$${payoutAvailable}</p></article>
          <article class="quick-card"><strong>Pending Payout</strong><p>$${payoutPending}</p></article>
          <article class="quick-card"><strong>Weekly Earnings</strong><p>$${user.weeklyEarnings}</p></article>
          <article class="quick-card"><strong>Last Payout Schedule</strong><p>${lastPayout}</p></article>
        </div>
      </section>
      ` : ""}

      ${(activeView === "dashboard" || activeView === "profile") ? `
      <section class="panel">
        <h3>Verification Progress</h3>
        <div class="document-grid">
          <article class="info-card"><strong>Progress</strong><p>${verificationDone}/${verificationRequired} required documents uploaded</p></article>
          <article class="info-card"><strong>Status</strong><p>${user.verificationStatus}</p></article>
          <article class="info-card"><strong>Next Missing Item</strong><p>${documents.find((item) => item.required && item.status !== "Uploaded")?.name || "All required documents uploaded"}</p></article>
          <article class="info-card"><strong>Worker ID</strong><p>${formatAccountId(user)}</p></article>
        </div>
      </section>
      ` : ""}

      ${(activeView === "dashboard" || activeView === "jobs") ? `
      <section class="panel">
        <h3>Find Available Work</h3>
        <div class="search-panel">
          <div class="search-toolbar">
            <div>
              <strong>Search jobs simply</strong>
              <p>Search by job type, employer, location, or country, then compare offers and apply fast.</p>
            </div>
            <div class="button-row">
              <button class="primary-button small-button" type="button" data-worker-job-search-apply>Search Jobs</button>
              <button class="ghost-button small-button" type="button" data-worker-job-search-clear>Clear</button>
            </div>
          </div>
          <div class="profile-grid">
            <label><span>Search Work</span><input id="workerJobSearchTerm" type="text" value="${session.workerJobSearchTerm || ""}" placeholder="cleaning, plumbing, warehouse"></label>
            <label><span>Location</span><input id="workerJobSearchLocation" type="text" value="${session.workerJobSearchLocation || ""}" placeholder="Kathmandu Valley"></label>
            <label><span>Country</span><select id="workerJobSearchCountry"><option ${workerSearchCountry === "Nepal" ? "selected" : ""}>Nepal</option><option ${workerSearchCountry === "India" ? "selected" : ""}>India</option></select></label>
          </div>
          <div class="button-row">
            <span class="icon-chip">${discoverableJobs.length} jobs found</span>
            <span class="icon-chip">${workerSearchTerm || "All job types"}</span>
            <span class="icon-chip">${workerSearchLocation || "All locations"}</span>
          </div>
          <div class="button-row">
            <span class="helper-text">Quick locations:</span>
            ${allLocations.slice(0, 5).map((location) => `<button class="ghost-button small-button" type="button" data-worker-location-chip="${location}">${location}</button>`).join("")}
          </div>
        </div>
        <div class="button-row worker-tabs">
          <button class="role-tab ${workerJobsFilter === "discover" ? "active" : ""}" type="button" data-worker-jobs-filter="discover">Available (${discoverableJobs.length})</button>
          <button class="role-tab ${workerJobsFilter === "saved" ? "active" : ""}" type="button" data-worker-jobs-filter="saved">Saved (${savedJobs.length})</button>
          <button class="role-tab ${workerJobsFilter === "applied" ? "active" : ""}" type="button" data-worker-jobs-filter="applied">Applied (${appliedJobs.length})</button>
          <button class="role-tab ${workerJobsFilter === "active" ? "active" : ""}" type="button" data-worker-jobs-filter="active">Active (${activeJobs.length})</button>
          <button class="role-tab ${workerJobsFilter === "completed" ? "active" : ""}" type="button" data-worker-jobs-filter="completed">Completed (${completedJobs.length})</button>
        </div>
        <div class="job-list">
          ${filteredJobs.map((item) => `
            ${(() => {
              const status = workerJobStatus(user, item);
              return `
              <article class="job-card ${item.id === job.id ? "selected" : ""}" data-select-worker-job="${item.id}">
                <header><div class="media-title">${item.companyLogo ? `<img class="mini-media" src="${item.companyLogo}" alt="${item.company}">` : `<div class="mini-media fallback">${(item.company || "CO").slice(0, 2).toUpperCase()}</div>`}<div><strong>${item.title}</strong><div>${item.company}</div></div></div><span class="status-pill ${status.tone}">${status.label}</span></header>
                <div>${item.summary || "Live marketplace role"}</div>
                <div class="meta-row"><span>${item.pay}</span><span>${item.distance}</span><span>${item.skills}</span><a href="${mapsUrl(`${item.company} ${item.location || item.title}`)}" target="_blank" rel="noreferrer">Map</a></div>
                <div class="button-row compact-row">
                  <button class="secondary-button small-button" type="button" data-worker-quick-open="${item.id}">View Details</button>
                  <button class="primary-button small-button" type="button" data-worker-quick-apply="${item.id}">Apply Fast</button>
                </div>
              </article>
            `;
            })()}
          `).join("") || `<article class="info-card"><strong>No jobs in this tab</strong><p>Try a different tab or search with a broader location or job type.</p></article>`}
        </div>
      </section>
      ` : ""}

      ${(activeView === "profile") ? `
      <section class="panel">
        <h3>Edit Profile</h3>
        <div class="profile-grid">
          <label><span>Full Name</span><input id="profileFullName" type="text" value="${user.fullName}"></label>
          <label><span>Contact</span><input id="profileContact" type="text" value="${user.contact}"></label>
          <label><span>Primary Skill</span><input id="profileSkill" type="text" value="${user.skill}"></label>
          <label><span>Experience</span><input id="profileExperience" type="text" value="${profile.experience || ""}"></label>
          <label><span>Availability</span><select id="profileAvailability"><option ${user.availability === "available" ? "selected" : ""}>available</option><option ${user.availability === "busy" ? "selected" : ""}>busy</option><option ${user.availability === "offline" ? "selected" : ""}>offline</option></select></label>
        </div>
        <div class="document-grid">
          <article class="info-card"><strong>Profile Photo</strong><p>${profile.photo || "Not uploaded yet"}</p><input type="file" accept="image/*" data-preview-upload="worker-photo"></article>
          <article class="info-card"><strong>Verification Status</strong><p>${user.verificationStatus}</p></article>
        </div>
        <label><span>Bio</span><textarea id="profileBio">${profile.bio || ""}</textarea></label>
        <label><span>Profile Notes</span><textarea id="profileNotes">${user.notes}</textarea></label>
        <div class="button-row">
          <button class="primary-button small-button" type="button" data-save-profile>Save Profile</button>
          <button class="secondary-button small-button" type="button" data-worker-withdraw>Withdraw Wallet</button>
        </div>
      </section>
      ` : ""}

      ${(activeView === "profile" || activeView === "jobs") ? `
      <section class="panel">
        <h3>Worker Account and Discovery</h3>
        <div class="document-grid">
          <article class="info-card"><strong>Registration and Login</strong><p>${login.method || "otp"} / ${login.social || "Google ready"} / ${login.biometric || "Mobile ready"}</p></article>
          <article class="info-card"><strong>Geo Availability</strong><p>${user.availability} / location sharing ${user.geoSharing}</p></article>
          <article class="info-card"><strong>Job Discovery</strong><p>Map and list discovery with category, distance, pay, and duration filtering.</p></article>
          <article class="info-card"><strong>Instant Acceptance</strong><p>${invitations.map((invite) => `${invite.title} - ${invite.status}`).join(" | ")}</p></article>
        </div>
      </section>
      ` : ""}

      ${(activeView === "documents") ? `
      <section class="panel">
        <h3>Worker Verification Documents</h3>
        <div class="document-grid">${documentList(documents, "worker")}</div>
      </section>
      ` : ""}

      ${(activeView === "profile") ? `
      <section class="panel">
        <h3>Worker Features</h3>
        <div class="document-grid">
          <article class="info-card"><strong>Skill Management</strong><p>${skillsCatalog.map((skill) => `${skill.name}: ${skill.level}`).join(" | ")}</p></article>
          <article class="info-card"><strong>Job Applications</strong><p>${applications.map((application) => `${application.title}: ${application.status}`).join(" | ")}</p></article>
          <article class="info-card"><strong>Saved Jobs</strong><p>${savedJobs.map((item) => item.title).join(" | ") || "No saved jobs yet"}</p></article>
          <article class="info-card"><strong>Job Completion</strong><p>Timesheet ${shift.timesheet || "Not started"} / Stage ${shift.stage || "Queued"} / Proof ${shift.proofSubmitted ? "Uploaded" : "Pending"}</p></article>
          <article class="info-card"><strong>Earnings Dashboard</strong><p>Weekly $${user.weeklyEarnings} / Monthly $${user.monthlyEarnings} / Tax export via portal export.</p></article>
          <article class="info-card"><strong>Wallet and Withdrawal</strong><p>${withdrawal.payoutMethod || "Bank transfer"} / ${withdrawal.schedule || "On demand"} / ${withdrawal.linkedAccount || "Not linked"}</p></article>
          <article class="info-card"><strong>Ratings and Reviews</strong><p>${reviews.map((review) => `${review.employer}: ${review.rating}/5`).join(" | ")}</p></article>
          <article class="info-card"><strong>Notifications</strong><p>${notifications.join(" | ")}</p></article>
          <article class="info-card"><strong>Reputation Score</strong><p>${reputation.score || 0} / 100 / ${reputation.tier || "Growing"}</p></article>
          <article class="info-card"><strong>Verification</strong><p>${user.verificationStatus}${user.approvedAt ? ` / approved ${new Date(user.approvedAt).toLocaleDateString()}` : ""}</p></article>
          <article class="info-card"><strong>Chat</strong><p>${(Array.isArray(profile.chat) ? profile.chat : []).join(" ")}</p></article>
        </div>
      </section>
      ` : ""}

      ${(activeView === "dashboard" || activeView === "profile") ? `
      <section class="panel">
        <h3>Notifications Center</h3>
        <div class="recent-feed">
          ${notifications.map((item, index) => `<article class="timeline-card"><header><strong>Notification ${index + 1}</strong><span>Live</span></header><div>${item}</div></article>`).join("")}
        </div>
      </section>
      ` : ""}

      ${(activeView === "dashboard" || activeView === "jobs") ? `
      <section class="panel">
        <h3>Compare Similar Offers</h3>
        <div class="comparison-grid">
          <article class="info-card">
            <strong>${currentJob.title}</strong>
            <p>${currentJob.company} / ${currentJob.pay}</p>
            <p>${currentJob.distance} / ${currentJob.skills}</p>
          </article>
          ${similarOffers.map((item) => `
            <article class="info-card">
              <strong>${item.title}</strong>
              <p>${item.company} / ${item.pay}</p>
              <p>${item.distance} / ${item.skills}</p>
              <div class="button-row compact-row">
                <button class="secondary-button small-button" type="button" data-worker-quick-open="${item.id}">Compare</button>
                <button class="primary-button small-button" type="button" data-worker-quick-apply="${item.id}">Apply</button>
              </div>
            </article>
          `).join("") || `<article class="info-card"><strong>No similar offers yet</strong><p>Select another live job to compare pay, location, and skills.</p></article>`}
        </div>
      </section>
      ` : ""}

      ${(activeView === "dashboard" || activeView === "jobs") ? `
      <section class="panel">
        <h3>Map View for Job Discovery</h3>
        <div class="button-row">
          <button class="secondary-button small-button" type="button" data-worker-map-toggle>Switch to ${user.mapView === "map" ? "List" : "Map"} View</button>
        </div>
        ${user.mapView === "map" ? workerMapBoard(availableJobs) : `
          <div class="job-list">
            ${availableJobs.map((item) => `<article class="job-card"><header><strong>${item.title}</strong><span>${item.distance}</span></header><div>${item.summary}</div></article>`).join("")}
          </div>
        `}
      </section>
      ` : ""}

      ${(activeView === "jobs") ? `
      <section class="panel">
        <h3>Real-Time Chat With ${currentJob.company}</h3>
        <div class="document-grid">
          <article class="info-card"><strong>Job Context</strong><p>${currentJob.title}</p></article>
          <article class="info-card"><strong>Status</strong><p>${currentApplication?.status || workerJobStatus(user, currentJob).label}</p></article>
          <article class="info-card"><strong>Employer</strong><p>${currentJob.company}</p></article>
          <article class="info-card"><strong>Messages</strong><p>${chatStream.length} in this thread</p></article>
        </div>
        ${chatFeed(chatStream)}
        <div class="button-row">
          <input id="chatInput" type="text" placeholder="Message ${currentJob.company}">
          <button class="primary-button small-button" type="button" data-worker-send-chat>Send</button>
        </div>
      </section>
      ` : ""}

      ${(activeView === "dashboard") ? `
      <section class="panel">
        <h3>Earnings This Week</h3>
        <div class="chart-bars">
          <div class="chart-bar" style="height:90px"><span>Mon</span></div>
          <div class="chart-bar" style="height:120px"><span>Tue</span></div>
          <div class="chart-bar" style="height:80px"><span>Wed</span></div>
          <div class="chart-bar" style="height:140px"><span>Thu</span></div>
          <div class="chart-bar" style="height:110px"><span>Fri</span></div>
          <div class="chart-bar" style="height:160px"><span>Sat</span></div>
          <div class="chart-bar" style="height:100px"><span>Sun</span></div>
        </div>
      </section>
      ` : ""}

      ${(activeView === "dashboard") ? `
      <section class="panel">
        <h3>Quick Actions</h3>
        <div class="button-row">
          <button class="secondary-button small-button" type="button" data-portal-view="jobs">My Applications</button>
          <button class="secondary-button small-button" type="button" data-worker-open-job>Job Details</button>
          <button class="secondary-button small-button" type="button" data-portal-view="profile">My Reviews</button>
          <button class="secondary-button small-button" type="button" data-worker-withdraw>Withdraw</button>
        </div>
      </section>
      ` : ""}
    </div>
  `;
}
