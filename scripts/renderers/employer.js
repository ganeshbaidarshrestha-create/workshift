import { scoreWorkersForJob } from "../matching.js";
import { countryName, formatCountryMoney, getCountryRule, listCountryRules } from "../country-rules.js";
import { getSession, selectedApplicant, selectedEmployerJob, selectedSearchWorker } from "../store.js";
import {
  applicantStageColumn,
  applicantStatusTone,
  chatFeed,
  comparisonTarget,
  documentList,
  disputeComposer,
  evidenceList,
  employerMapBoard,
  filterRankedWorkers,
  formatAccountId,
  identityCard,
  jobPostWizard,
  jobStatusTone,
  mapsUrl,
  reputationBadge,
  sortRankedWorkers,
  stageCount,
  workerProfileModal,
  workerStatusBadge
} from "./shared.js";

export function employerDashboard(user) {
  const profile = user.profile || {};
  const countryRule = getCountryRule(user.countryCode || "NP");
  const countryOptions = listCountryRules();
  const jobs = Array.isArray(user.jobs) ? user.jobs : [];
  const allApplicants = Array.isArray(user.applicants) ? user.applicants : [];
  const hiring = Array.isArray(user.hiring) ? user.hiring : [];
  const analytics = Array.isArray(profile.analytics) ? profile.analytics : [];
  const analyticsDashboard = Array.isArray(profile.analyticsDashboard) ? profile.analyticsDashboard : [];
  const notifications = Array.isArray(profile.notifications) ? profile.notifications : [];
  const payments = Array.isArray(profile.payments) ? profile.payments : [];
  const ratings = Array.isArray(profile.ratings) ? profile.ratings : [];
  const workerPool = Array.isArray(user.workerPool) ? user.workerPool : [];
  const session = getSession();
  const job = selectedEmployerJob() || jobs[0] || {
    id: "job_fallback",
    title: "No active job yet",
    location: "Kathmandu Valley",
    countryCode: user.countryCode || "NP",
    status: "Draft",
    headcount: 1,
    dailyRate: 0,
    shortlisted: 0,
    escrow: false,
    bidStep: 10,
    urgency: "New",
    biddingHistory: [],
    category: "General",
    applicants: 0,
    spend: "$0"
  };
  const applicants = allApplicants.filter((item) =>
    item.jobId === job.id
    || (item.jobSupabaseId && item.jobSupabaseId === job.supabaseId)
    || (!item.jobId && !item.jobSupabaseId)
  );
  const applicant = applicants.find((item) => item.id === session.selectedApplicant)
    || selectedApplicant()
    || applicants[0]
    || {
    id: "applicant_fallback",
    name: "No applicant selected",
    distance: "Waiting",
    rating: "0.0",
    status: "New",
    skills: [],
    chatThread: []
  };
  const workerSearch = user.workerSearch || {};
  const escrow = user.escrow || {};
  const account = user.account || {};
  const rankedWorkers = scoreWorkersForJob(job, workerPool);
  const filteredWorkers = filterRankedWorkers(rankedWorkers, session);
  const sortedWorkers = sortRankedWorkers(filteredWorkers, session.employerSortBy);
  const notifiedWorkers = sortedWorkers.filter((worker) => worker.notify);
  const allLocations = Array.from(new Set((rankedWorkers || []).map((worker) => worker.locationLabel).filter(Boolean)));
  const searchWorker = selectedSearchWorker(sortedWorkers.length ? sortedWorkers : rankedWorkers) || sortedWorkers[0] || rankedWorkers[0] || null;
  const savedSearches = Array.isArray(workerSearch.savedSearches) ? workerSearch.savedSearches : [];
  const quickFilters = new Set(session.employerQuickFilters || []);
  const comparisonWorkers = (session.comparisonWorkerIds || []).map((id) => rankedWorkers.find((worker) => worker.id === id)).filter(Boolean);
  const activeView = session.activePortalView;
  const applicantStatus = applicant.status || "New";
  const applicantThread = Array.isArray(applicant.chatThread) ? applicant.chatThread : [];
  const searchWorkerApplicant = searchWorker
    ? applicants.find((item) => item.id === searchWorker.id || item.name === searchWorker.name) || null
    : null;
  const searchWorkerThread = Array.isArray(searchWorkerApplicant?.chatThread) ? searchWorkerApplicant.chatThread : [];
  const hiredCount = allApplicants.filter((item) => ["Hired", "Rated"].includes(item.status)).length;
  const compareApplicant = comparisonTarget(user, applicant);
  const biddingHistory = Array.isArray(job.biddingHistory) ? job.biddingHistory : [];
  const paymentGateway = countryRule.paymentGateway || countryRule.payoutRail;
  const searchSummary = [
    session.employerSearchSkill ? `skill "${session.employerSearchSkill}"` : "",
    session.employerSearchLocation ? `location "${session.employerSearchLocation}"` : "",
    quickFilters.size ? `${quickFilters.size} quick filter${quickFilters.size > 1 ? "s" : ""}` : ""
  ].filter(Boolean).join(" / ");
  return `
    <div class="stack">
      ${identityCard(user)}
      ${jobPostWizard(user, session)}
      ${disputeComposer(user, session)}
      ${workerProfileModal(session, searchWorker)}

      ${(activeView === "dashboard") ? `
      <section class="panel">
        <div class="summary-grid">
          <article class="quick-card"><strong>Active Jobs</strong><p>${jobs.filter((item) => item.status !== "Completed").length}</p></article>
          <article class="quick-card"><strong>Pending Applications</strong><p>${jobs.reduce((sum, item) => sum + item.applicants, 0)}</p></article>
          <article class="quick-card"><strong>Total Spent</strong><p>${analytics[0]?.value || "$0"}</p></article>
          <article class="quick-card"><strong>Workers Hired</strong><p>${hiredCount}</p></article>
        </div>
      </section>
      ` : ""}

      ${(activeView === "dashboard") ? `
      <section class="panel">
        <h3>Employer Command Center</h3>
        <div class="document-grid">
          <article class="info-card"><strong>Job Lifecycle</strong><p>${job.title} is ${job.status}. Pause, reopen, or cancel directly from the controls below.</p></article>
          <article class="info-card"><strong>Hiring Pipeline</strong><p>New ${stageCount(applicants, "New")} / Shortlisted ${stageCount(applicants, "Shortlisted")} / Invited ${stageCount(applicants, "Invited")} / Hired ${stageCount(applicants, "Hired")} / Rated ${stageCount(applicants, "Rated")}</p></article>
          <article class="info-card"><strong>Applicant Chat</strong><p>${applicant.name} thread has ${applicantThread.length} messages and remains tied to the selected worker.</p></article>
          <article class="info-card"><strong>Company Assets</strong><p>Logo preview ${profile.logo || "Pending"} / verification badge ${profile.verificationBadge || "Pending"} / operating country ${countryName(user.countryCode || "NP")}</p></article>
        </div>
        <div class="button-row">
          <button class="secondary-button small-button" type="button" data-portal-view="jobs">Open Hiring Workspace</button>
          <button class="secondary-button small-button" type="button" data-portal-view="profile">Open Company Profile</button>
          <button class="secondary-button small-button" type="button" data-portal-view="documents">Open Verification Docs</button>
        </div>
      </section>
      ` : ""}

      ${(activeView === "dashboard") ? `
      <section class="panel">
        <h3>Live Hiring Workspace</h3>
        <div class="comparison-grid">
          <article class="job-card selected">
            <header><div><strong>${job.title}</strong><div>${job.location} / ${countryName(job.countryCode || user.countryCode || "NP")}</div></div><span class="status-pill ${jobStatusTone(job.status)}">${job.status}</span></header>
            <div class="meta-row"><span>${job.headcount || 1} workers</span><span>${formatCountryMoney(job.dailyRate, job.countryCode || user.countryCode || "NP")}/day</span><span>${job.shortlisted} shortlisted</span><span>${job.escrow ? "Escrow ready" : "Escrow pending"}</span></div>
            <div class="button-row">
              <button class="secondary-button small-button" type="button" data-shortlist>Shortlist</button>
              <button class="secondary-button small-button" type="button" data-invite>Invite</button>
              <button class="primary-button small-button" type="button" data-hire-worker>Hire</button>
            </div>
            <div class="button-row">
              <button class="secondary-button small-button" type="button" data-pause-job ${job.status === "Cancelled" ? "disabled" : ""}>Pause Job</button>
              <button class="secondary-button small-button" type="button" data-reopen-job ${job.status === "Open" ? "disabled" : ""}>Reopen Job</button>
              <button class="ghost-button small-button" type="button" data-cancel-job ${job.status === "Cancelled" ? "disabled" : ""}>Cancel Job</button>
            </div>
          </article>
          <article class="job-card selected">
            <header><div class="media-title">${applicant.photoData ? `<img class="mini-media" src="${applicant.photoData}" alt="${applicant.name}">` : `<div class="mini-media fallback">${(applicant.name || "WK").slice(0, 2).toUpperCase()}</div>`}<div><strong>Chat With ${applicant.name}</strong><div>${applicant.distance} / selected worker conversation</div></div></div><span class="status-pill ${applicantStatusTone(applicantStatus)}">${applicantStatus}</span></header>
            <div class="meta-row"><span>${applicant.rating} stars</span><span>${applicant.reliability || "N/A"} reliability</span><span>${applicant.chatThread?.length || 0} messages</span></div>
            ${chatFeed(applicantThread.length ? applicantThread : [{ from: "Employer", text: "Open the conversation with a shortlisted worker here.", time: "Now" }])}
            <div class="button-row">
              <input id="chatInput" type="text" placeholder="Message ${applicant.name}">
              <button class="primary-button small-button" type="button" data-employer-send-chat>Send</button>
            </div>
          </article>
        </div>
      </section>
      ` : ""}

      ${(activeView === "dashboard" || activeView === "jobs") ? `
      <section class="panel">
        <h3>Post the Workers You Need</h3>
        <div class="job-post-launcher">
          <div>
            <strong>Premium job posting wizard</strong>
            <p>Guide your hiring team through role details, pay setup, and final review before a job goes live.</p>
          </div>
          <button class="primary-button small-button" type="button" data-open-job-modal>Open Job Wizard</button>
        </div>
        <div class="button-row">
          <span class="icon-chip">Public marketplace visible after posting</span>
          <span class="icon-chip">Edit and delete controls on live jobs</span>
        </div>
      </section>
      ` : ""}

      ${(activeView === "dashboard" || activeView === "jobs") ? `
      <section class="panel">
        <h3>Employer Dashboard</h3>
        <div class="search-panel">
          <div class="search-toolbar">
            <div>
              <strong>Search nearby workers</strong>
              <p>Enter a skill or location, then press Apply Filters. The confirmation panel below will show the exact active search.</p>
            </div>
            <div class="button-row">
              <button class="secondary-button small-button" type="button" data-employer-search-location>Use Selected Job Location</button>
              <button class="primary-button small-button" type="button" data-employer-search-skill>Apply Filters</button>
              <button class="secondary-button small-button" type="button" data-save-search>Save Search</button>
              <button class="ghost-button small-button" type="button" data-clear-search>Clear</button>
            </div>
          </div>
          <div class="profile-grid">
            <label><span>Skill</span><input id="employerSearchSkill" type="text" value="${session.employerSearchSkill}" placeholder="plumbing, cleaning, harvest"></label>
            <label><span>Location</span><input id="employerSearchLocation" type="text" list="employerLocationList" value="${session.employerSearchLocation || ""}" placeholder="Kathmandu Valley, Lalitpur or All Locations"></label>
          </div>
          <datalist id="employerLocationList">
            <option value="All Locations"></option>
            ${allLocations.map((location) => `<option value="${location}"></option>`).join("")}
          </datalist>
          <div class="button-row">
            <span class="icon-chip">Showing ${sortedWorkers.length} ranked workers</span>
            <span class="icon-chip">Selected job: ${job.title}</span>
            <span class="icon-chip">Default area: ${job.location}</span>
          </div>
          <article class="info-card search-confirm-card">
            <strong>Search Confirmation</strong>
            <p>${searchSummary || "Set a skill, location, or quick filter, then press Apply Filters to confirm the search."}</p>
            <div class="meta-row"><span>${sortedWorkers.length} worker result${sortedWorkers.length === 1 ? "" : "s"}</span><span>${session.employerSortBy.replaceAll("_", " ")}</span></div>
          </article>
          <div class="button-row">
            <label class="sort-inline">
              <span>Sort by</span>
              <select data-sort-workers>
                <option value="best_match" ${session.employerSortBy === "best_match" ? "selected" : ""}>Best Match</option>
                <option value="nearest" ${session.employerSortBy === "nearest" ? "selected" : ""}>Nearest</option>
                <option value="highest_rated" ${session.employerSortBy === "highest_rated" ? "selected" : ""}>Highest Rated</option>
                <option value="most_reliable" ${session.employerSortBy === "most_reliable" ? "selected" : ""}>Most Reliable</option>
              </select>
            </label>
          </div>
          <div class="button-row">
            <button class="ghost-button small-button ${quickFilters.has("available") ? "active" : ""}" type="button" data-worker-filter="available">Available now</button>
            <button class="ghost-button small-button ${quickFilters.has("verified") ? "active" : ""}" type="button" data-worker-filter="verified">Verified</button>
            <button class="ghost-button small-button ${quickFilters.has("high_rating") ? "active" : ""}" type="button" data-worker-filter="high_rating">High rating</button>
            <button class="ghost-button small-button ${quickFilters.has("nearby") ? "active" : ""}" type="button" data-worker-filter="nearby">Nearby</button>
          </div>
          <div class="button-row saved-search-row">
            <span class="helper-text">Saved searches:</span>
            ${savedSearches.map((item) => `
              <span class="saved-search-chip">
                <button class="secondary-button small-button" type="button" data-apply-saved-search="${item.id}">${item.label}</button>
                <button class="ghost-button tiny-button" type="button" aria-label="Remove ${item.label}" data-remove-saved-search="${item.id}">x</button>
              </span>
            `).join("") || `<span class="helper-text">No saved searches yet</span>`}
          </div>
          <div class="button-row">
            <span class="helper-text">Popular areas:</span>
            <button class="ghost-button small-button" type="button" data-search-location-chip="All Locations">All</button>
            ${allLocations.slice(0, 5).map((location) => `<button class="ghost-button small-button" type="button" data-search-location-chip="${location}">${location}</button>`).join("")}
          </div>
          <section class="comparison-tray comparison-tray-sticky">
            <div class="comparison-tray-header">
              <h3>Sticky Comparison Bar</h3>
              <span class="helper-text">Selected workers stay visible while you scroll search results.</span>
            </div>
            <div class="comparison-bar">
              ${comparisonWorkers.map((worker) => `
                <article class="compare-pill">
                  <div>
                    <strong>${worker.name}</strong>
                    <div>${worker.avgRating} stars / ${worker.distanceKm} km / ${worker.matchScore}</div>
                  </div>
                  <button class="ghost-button tiny-button" type="button" data-compare-worker="${worker.id}">Remove</button>
                </article>
              `).join("") || `<span class="helper-text">Add up to three workers to keep them pinned here.</span>`}
            </div>
          </section>
          <div class="search-split-layout">
          <div class="job-list compact-search-results">
            ${(sortedWorkers.length ? sortedWorkers : []).map((worker) => `
              <article class="job-card ${searchWorker?.id === worker.id ? "selected" : ""}" data-select-search-worker="${worker.id}">
                <header>
                  <div><strong>${worker.name}</strong><div>${worker.locationLabel}</div></div>
                  <span class="status-pill ${worker.notify ? "available" : worker.available ? "busy" : "offline"}">${worker.matchScore}</span>
                </header>
                <div class="meta-row">
                  <span>${worker.skills?.slice(0, 2).join(", ") || "General labor"}</span>
                  <span>${worker.ratingNorm ? `${Math.round(worker.ratingNorm * 100)} reputation` : "New worker"}</span>
                  <span>${worker.distanceScore ? `distance ${worker.distanceScore.toFixed(2)}` : "distance n/a"}</span>
                </div>
                <div class="button-row compact-row worker-card-state-row">
                  ${workerStatusBadge(applicants, worker.id, worker.name) || `<span class="helper-text">Not yet contacted</span>`}
                  ${worker.verified ? `<span class="icon-chip">Verified</span>` : `<span class="icon-chip">Pending docs</span>`}
                  <span class="icon-chip">${worker.available ? "Available now" : "Busy"}</span>
                </div>
                <div class="button-row compact-row">
                  <button class="secondary-button small-button" type="button" data-open-worker-profile="${worker.id}">Open Profile</button>
                  <a class="ghost-button small-button" href="${mapsUrl(searchWorker ? `${worker.name} ${worker.locationLabel}` : worker.locationLabel)}" target="_blank" rel="noreferrer">Location</a>
                  <button class="secondary-button small-button" type="button" data-shortlist-search-worker="${worker.id}">Shortlist</button>
                  <button class="primary-button small-button" type="button" data-invite-search-worker="${worker.id}">Invite</button>
                  <button class="ghost-button small-button" type="button" data-compare-worker="${worker.id}">${(session.comparisonWorkerIds || []).includes(worker.id) ? "Remove Compare" : "Compare"}</button>
                </div>
              </article>
            `).join("") || `<article class="info-card"><strong>No workers match this search</strong><p>Try "All Locations", remove one filter, or search with a broader skill like labor, cleaning, warehouse, or harvest.</p></article>`}
          </div>
          <aside class="panel search-detail-pane">
            ${searchWorker ? `
              <h3>${searchWorker.name}</h3>
              <div class="document-grid">
                <article class="info-card"><strong>Location</strong><p>${searchWorker.locationLabel}</p></article>
                <article class="info-card"><strong>Availability</strong><p>${searchWorker.available ? "Available now" : "Busy"}</p></article>
                <article class="info-card"><strong>Rating</strong><p>${searchWorker.avgRating} / 5</p></article>
                <article class="info-card"><strong>Verification</strong><p>${searchWorker.verified ? "Verified" : "Pending verification"}</p></article>
              </div>
              <div class="button-row">
                <a class="secondary-button small-button" href="${mapsUrl(`${searchWorker.name} ${searchWorker.locationLabel}`)}" target="_blank" rel="noreferrer">View ${searchWorker.locationLabel} on Map</a>
              </div>
              <div class="document-grid">
              <article class="info-card"><strong>Skills</strong><p>${searchWorker.skills?.join(", ") || "General labor"}</p></article>
              <article class="info-card"><strong>Distance</strong><p>${searchWorker.distanceKm} km from site</p></article>
              <article class="info-card"><strong>Reliability</strong><p>${Math.round((searchWorker.reliability || 0) * 100)}%</p></article>
              <article class="info-card"><strong>AI Match</strong><p>${searchWorker.matchScore} / notify ${searchWorker.notify ? "yes" : "no"}</p></article>
              </div>
              <article class="info-card search-confirm-card">
                <strong>Selected Worker</strong>
                <p>${searchWorker.name} is the active worker for profile, comparison, map, and search-panel chat actions.</p>
              </article>
              <div class="badge-row">
                ${(searchWorker.documentBadges || []).map((badge) => `<span class="icon-chip">${badge}</span>`).join("")}
              </div>
              <div class="button-row">
                <button class="secondary-button small-button" type="button" data-open-worker-profile="${searchWorker.id}">Open Full Profile</button>
                <a class="ghost-button small-button" href="${mapsUrl(`${searchWorker.name} ${searchWorker.locationLabel}`)}" target="_blank" rel="noreferrer">Open Location</a>
                <button class="secondary-button small-button" type="button" data-shortlist-search-worker="${searchWorker.id}">Shortlist</button>
                <button class="primary-button small-button" type="button" data-invite-search-worker="${searchWorker.id}">Invite</button>
                <button class="ghost-button small-button" type="button" data-compare-worker="${searchWorker.id}">${(session.comparisonWorkerIds || []).includes(searchWorker.id) ? "Remove Compare" : "Add To Compare"}</button>
              </div>
              <section class="search-chat-panel">
                <h4>Chat With ${searchWorker.name}</h4>
                ${chatFeed(searchWorkerThread.length ? searchWorkerThread : [{ from: "Employer", text: "Start a direct hiring conversation from this search panel.", time: "Now" }])}
                <div class="button-row">
                  <input id="searchWorkerChatInput" type="text" placeholder="Message ${searchWorker.name}">
                  <button class="primary-button small-button" type="button" data-search-worker-chat="${searchWorker.id}">Send Message</button>
                </div>
              </section>
            ` : `<article class="info-card"><strong>No worker selected</strong><p>Pick a worker from the result list to open the detail pane.</p></article>`}
          </aside>
          </div>
          <section class="panel comparison-tray">
            <h3>Comparison Tray</h3>
            <div class="comparison-grid">
              ${comparisonWorkers.map((worker) => `
                <article class="info-card">
                  <strong>${worker.name}</strong>
                  <p>${worker.locationLabel} / ${worker.avgRating} stars</p>
                  <p>${worker.skills?.slice(0, 3).join(", ") || "General labor"}</p>
                  <p>Match ${worker.matchScore} / ${worker.available ? "Available" : "Busy"} / ${worker.verified ? "Verified" : "Pending"}</p>
                  <button class="ghost-button small-button" type="button" data-compare-worker="${worker.id}">Remove</button>
                </article>
              `).join("") || `<article class="info-card"><strong>No workers in comparison</strong><p>Add up to three workers from search results to compare side by side before inviting.</p></article>`}
            </div>
          </section>
        </div>
        <div class="kanban-grid">
          <div class="stack">
            <h4>Open</h4>
            ${jobs.filter((item) => item.status === "Open" || item.status === "Draft").map((item) => `
              <article class="kanban-card ${item.id === job.id ? "selected" : ""}" data-select-employer-job="${item.id}">
                <header><strong>${item.title}</strong><span>${item.status}</span></header>
                <div class="meta-row"><span>${item.applicants} applicants</span><span>${item.spend}</span><a href="${mapsUrl(item.location)}" target="_blank" rel="noreferrer">${item.location}</a></div>
              </article>
            `).join("")}
          </div>
          <div class="stack">
            <h4>Ongoing</h4>
            ${jobs.filter((item) => item.status === "Ongoing" || item.status === "Paused").map((item) => `
              <article class="kanban-card ${item.id === job.id ? "selected" : ""}" data-select-employer-job="${item.id}">
                <header><strong>${item.title}</strong><span>${item.status}</span></header>
                <div class="meta-row"><span>${item.applicants} applicants</span><span>${item.spend}</span><a href="${mapsUrl(item.location)}" target="_blank" rel="noreferrer">${item.location}</a></div>
              </article>
            `).join("")}
          </div>
          <div class="stack">
            <h4>Closed</h4>
            ${jobs.filter((item) => item.status === "Completed" || item.status === "Cancelled").map((item) => `
              <article class="kanban-card ${item.id === job.id ? "selected" : ""}" data-select-employer-job="${item.id}">
                <header><strong>${item.title}</strong><span>${item.status}</span></header>
                <div class="meta-row"><span>${item.applicants} applicants</span><span>${item.spend}</span><a href="${mapsUrl(item.location)}" target="_blank" rel="noreferrer">${item.location}</a></div>
              </article>
            `).join("")}
          </div>
        </div>
        <section class="panel">
          <h3>Selected Job Controls</h3>
          <div class="job-card selected">
            <header><div><strong>${job.title}</strong><div>${job.location} / ${countryName(job.countryCode || user.countryCode || "NP")}</div></div><span class="status-pill ${jobStatusTone(job.status)}">${job.status}</span></header>
            <div class="meta-row"><span>${job.headcount || 1} workers</span><span>${formatCountryMoney(job.dailyRate, job.countryCode || user.countryCode || "NP")}/day</span><span>${job.requiredSkillsText || job.category}</span><span>${job.shortlisted} shortlisted</span><span>${job.escrow ? "Escrow ready" : "Escrow pending"}</span></div>
          </div>
          <div class="button-row">
            <button class="secondary-button small-button" type="button" data-edit-job>Edit Job</button>
            <button class="ghost-button small-button" type="button" data-delete-job>Delete Job</button>
            <button class="secondary-button small-button" type="button" data-shortlist>Shortlist Applicant</button>
            <button class="secondary-button small-button" type="button" data-invite>Send Invite</button>
            <button class="primary-button small-button" type="button" data-hire-worker>Hire Worker</button>
          </div>
          <div class="button-row">
            <button class="secondary-button small-button" type="button" data-pause-job ${job.status === "Cancelled" ? "disabled" : ""}>Pause Job</button>
            <button class="secondary-button small-button" type="button" data-reopen-job ${job.status === "Open" ? "disabled" : ""}>Reopen Job</button>
            <button class="ghost-button small-button" type="button" data-cancel-job ${job.status === "Cancelled" ? "disabled" : ""}>Cancel Job</button>
          </div>
        </section>
        <section class="panel">
          <h3>Selected Applicant</h3>
          <div class="job-card selected">
            <header><div class="media-title">${applicant.photoData ? `<img class="mini-media" src="${applicant.photoData}" alt="${applicant.name}">` : `<div class="mini-media fallback">${(applicant.name || "WK").slice(0, 2).toUpperCase()}</div>`}<div><strong>${applicant.name}</strong><div>${applicant.distance}</div></div></div><span class="status-pill ${applicantStatusTone(applicantStatus)}">${applicantStatus}</span></header>
            <div class="meta-row"><span>${applicant.rating} stars</span><span>Offer ${formatCountryMoney(job.dailyRate, job.countryCode || user.countryCode || "NP")}/day</span><span>${hiring.find((item) => item.candidate === applicant.name)?.status || "Reviewing"}</span><span>${applicant.chatThread?.length || 0} messages</span></div>
          </div>
          <div class="button-row">
            <button class="secondary-button small-button" type="button" data-shortlist>Shortlist</button>
            <button class="secondary-button small-button" type="button" data-invite>Invite</button>
            <button class="primary-button small-button" type="button" data-hire-worker>Hire</button>
            <button class="secondary-button small-button" type="button" data-rate-worker>Rate</button>
          </div>
        </section>
        <section class="panel">
          <h3>Hiring Pipeline</h3>
          <div class="pipeline-board">
            ${["New", "Shortlisted", "Invited", "Hired", "Rated"].map((stage) => applicantStageColumn(applicants, stage, applicant.id)).join("")}
          </div>
        </section>
        <section class="panel">
          <h3>Applicant Comparison</h3>
          <div class="comparison-grid">
            <article class="info-card">
              <strong>${applicant.name}</strong>
              <p>Status ${applicantStatus} / Rating ${applicant.rating} / Distance ${applicant.distance}</p>
              <p>Skills ${applicant.skills?.join(", ") || "General labor"}</p>
              <p>Reliability ${applicant.reliability || "N/A"}</p>
            </article>
            <article class="info-card">
              <strong>${compareApplicant.name}</strong>
              <p>Status ${compareApplicant.status || "New"} / Rating ${compareApplicant.rating} / Distance ${compareApplicant.distance}</p>
              <p>Skills ${compareApplicant.skills?.join(", ") || "General labor"}</p>
              <p>Reliability ${compareApplicant.reliability || "N/A"}</p>
            </article>
          </div>
        </section>
        <div class="button-row">
          <button class="secondary-button small-button" type="button" data-escrow>${job.escrow ? "Escrow Funded" : "Fund Escrow"}</button>
          <button class="secondary-button small-button" type="button" data-employer-map-toggle>Switch to ${user.mapView === "map" ? "List" : "Map"} View</button>
        </div>
      </section>
      ` : ""}

      ${(activeView === "dashboard" || activeView === "jobs") ? `
      <section class="panel">
        <h3>Wage Bidding to Hire Faster</h3>
        <div class="document-grid">
          <article class="info-card"><strong>Selected Job</strong><p>${job.title} / ${job.location}</p></article>
          <article class="info-card"><strong>Current Wage Offer</strong><p>${formatCountryMoney(job.dailyRate, job.countryCode || user.countryCode || "NP")}/day</p></article>
          <article class="info-card"><strong>Suggested Raise</strong><p>$${job.bidStep}/day / urgency ${job.urgency}</p></article>
          <article class="info-card"><strong>Bidding Trail</strong><p>${biddingHistory.map((value) => `$${value}`).join(" -> ")}</p></article>
        </div>
        <div class="button-row">
          <input id="bidIncreaseAmount" type="number" min="1" step="1" value="${job.bidStep}" placeholder="Raise wage by">
          <button class="primary-button small-button" type="button" data-raise-bid>Raise Wage Bid</button>
        </div>
      </section>
      ` : ""}

      ${(activeView === "profile") ? `
      <section class="panel">
        <h3>Edit Company Profile</h3>
        <div class="profile-grid">
          <label><span>Contact Person</span><input id="profileFullName" type="text" value="${user.fullName}"></label>
          <label><span>Contact</span><input id="profileContact" type="text" value="${user.contact}"></label>
          <label><span>Company Name</span><input id="profileCompany" type="text" value="${user.company}"></label>
          <label><span>Industry</span><input id="profileSkill" type="text" value="${user.skill}"></label>
          <label><span>Operating Country</span><select id="profileCountryCode">${countryOptions.map((country) => `<option value="${country.code}" ${country.code === (user.countryCode || "NP") ? "selected" : ""}>${country.name}</option>`).join("")}</select></label>
        </div>
        <div class="document-grid">
          <article class="info-card"><strong>Company Logo</strong><p>${profile.logo || "Not uploaded yet"}</p><input type="file" accept="image/*" data-preview-upload="employer-logo"></article>
          <article class="info-card"><strong>Verification Badge</strong><p>${profile.verificationBadge || "Pending review"}</p></article>
          <article class="info-card"><strong>Phone Auth</strong><p>${countryRule.phoneAuthMode}</p></article>
          <article class="info-card"><strong>Payout Rail</strong><p>${countryRule.payoutRail}</p></article>
        </div>
        <label><span>Company Notes</span><textarea id="profileNotes">${user.notes}</textarea></label>
        <button class="primary-button small-button" type="button" data-save-profile>Save Company Profile</button>
      </section>
      ` : ""}

      ${(activeView === "profile") ? `
      <section class="panel">
        <h3>Employer Account and Hiring</h3>
        <div class="document-grid">
          <article class="info-card"><strong>Account Registration</strong><p>${account.registration || "Phone or email"} / onboarding ${account.onboarding || "Company setup"}</p></article>
          <article class="info-card"><strong>Company Profile</strong><p>Logo ${profile.logo || "Pending"} / size ${profile.size || "Team"} / badge ${profile.verificationBadge || "Pending"} / ${countryName(user.countryCode || "NP")}</p></article>
          <article class="info-card"><strong>Verification</strong><p>${user.verificationStatus}${user.approvedAt ? ` / approved ${new Date(user.approvedAt).toLocaleDateString()}` : ""} / ID ${formatAccountId(user)} / ${countryRule.verificationRule}</p></article>
          <article class="info-card"><strong>Job Posting</strong><p>Rich posting flow with title, category, location, pay, duration, and headcount.</p></article>
          <article class="info-card"><strong>Worker Search</strong><p>${workerSearch.mapMode || "Map"} / saved search: ${workerSearch.savedSearch || "None saved"}</p></article>
          <article class="info-card"><strong>Hiring</strong><p>${hiring.map((item) => `${item.candidate}: ${item.status}`).join(" | ")}</p></article>
          <article class="info-card"><strong>Job Management</strong><p>Draft / Open / Ongoing / Completed / Cancelled board.</p></article>
        </div>
      </section>
      ` : ""}

      ${(activeView === "dashboard" || activeView === "jobs") ? `
      <section class="panel">
        <h3>AI Worker-Job Matching</h3>
        <p>match_score = (skill_sim x 0.35) + (distance_score x 0.25) + (rating_norm x 0.20) + (reliability x 0.10) + (history_bonus x 0.10). Workers with score >= 0.65 are notified.</p>
        <div class="document-grid">
          <article class="info-card"><strong>Required Skills</strong><p>${rankedWorkers[0]?.requiredSkills.join(" / ") || "Not available"}</p></article>
          <article class="info-card"><strong>Filtered Matches</strong><p>${filteredWorkers.length} workers match the current search.</p></article>
          <article class="info-card"><strong>Top N Notified</strong><p>${notifiedWorkers.map((worker) => `${worker.name} (${worker.matchScore})`).join(" | ") || "No workers met threshold"}</p></article>
        </div>
        <div class="job-list">
          ${(filteredWorkers.length ? filteredWorkers : []).map((worker) => `
            <article class="job-card">
              <header>
                <div><strong>${worker.name}</strong><div>${worker.available ? "Available" : "Excluded: unavailable"}</div></div>
                <span class="status-pill ${worker.notify ? "available" : worker.available ? "busy" : "offline"}">${worker.matchScore}</span>
              </header>
              <div class="meta-row">
                <span>Skill ${worker.skillSim.toFixed(2)}</span>
                <span>Distance ${worker.distanceScore.toFixed(2)}</span>
                <span>Rating ${worker.ratingNorm.toFixed(2)}</span>
                <span>Reliability ${worker.reliability.toFixed(2)}</span>
                <span>History ${worker.historyBonus.toFixed(2)}</span>
                <a href="${mapsUrl(worker.locationLabel)}" target="_blank" rel="noreferrer">${worker.locationLabel}</a>
              </div>
            </article>
          `).join("") || `<article class="info-card"><strong>No workers found</strong><p>Try a broader skill or location filter.</p></article>`}
        </div>
      </section>
      ` : ""}

      ${(activeView === "dashboard" || activeView === "jobs") ? `
      <section class="panel">
        <h3>Map View for Worker Discovery</h3>
        ${user.mapView === "map" ? employerMapBoard(filteredWorkers) : `
          <div class="job-list">
            ${filteredWorkers.map((worker) => `<article class="job-card"><header><strong>${worker.name}</strong><span>${worker.locationLabel}</span></header><div>Reputation ${Math.round(worker.ratingNorm * 100)} / ${reputationBadge(Math.round(worker.ratingNorm * 100))}</div></article>`).join("")}
          </div>
        `}
      </section>
      ` : ""}

      ${(activeView === "dashboard" || activeView === "jobs") ? `
      <section class="panel">
        <h3>${user.countryCode === "NP" ? "eSewa + Escrow Auto-Release" : "Protected Escrow + Auto-Release"}</h3>
        <div class="document-grid">
          <article class="info-card"><strong>Escrow Status</strong><p>${escrow.status || "Pending"}</p></article>
          <article class="info-card"><strong>Auto Release</strong><p>${escrow.autoReleaseHours || 0}h / next ${escrow.nextRelease || "TBD"}</p></article>
          <article class="info-card"><strong>Payment Rail</strong><p>${user.countryCode === "NP" ? "eSewa-first Nepal payment flow with protected escrow state in the product." : `${paymentGateway} payment flow simulated for local prototype.`}</p></article>
          <article class="info-card"><strong>Selected Job Payment</strong><p>${job.title} / ${job.escrow ? "Escrow funded" : "Awaiting funding"} / ${countryRule.payoutRail}</p></article>
        </div>
        <div class="button-row">
          <button class="secondary-button small-button" type="button" data-release-escrow>Release Escrow</button>
          <button class="secondary-button small-button" type="button" data-rate-worker>Rate Selected Worker</button>
          <button class="primary-button small-button" type="button" data-open-dispute>Open Dispute</button>
        </div>
        <div class="document-grid">
          ${evidenceList((user.disputes || []).find((item) => item.id === session.selectedDispute)?.evidence || [])}
        </div>
        <div class="recent-feed">
          ${(user.disputes || []).map((item) => `
            <article class="timeline-card ${item.id === session.selectedDispute ? "selected" : ""}" data-select-dispute="${item.id}">
              <header><strong>${item.title}</strong><span>${item.status}</span></header>
              <div>${item.note || "Awaiting admin review."}</div>
            </article>
          `).join("") || `<article class="info-card"><strong>No active disputes</strong><p>Escrow, quality, timing, and conduct issues can be escalated here with evidence and payout context.</p></article>`}
        </div>
      </section>
      ` : ""}

      ${(activeView === "documents") ? `
      <section class="panel">
        <h3>Employer Verification Documents</h3>
        <div class="document-grid">${documentList(user.documents, "employer")}</div>
      </section>
      ` : ""}

      ${(activeView === "jobs") ? `
      <section class="panel">
        <h3>Applicants</h3>
        <div class="job-list">
          ${applicants.map((item) => `
            <article class="job-card ${item.id === applicant.id ? "selected" : ""}" data-select-applicant="${item.id}">
              <header><div class="media-title">${item.photoData ? `<img class="mini-media" src="${item.photoData}" alt="${item.name}">` : `<div class="mini-media fallback">${(item.name || "WK").slice(0, 2).toUpperCase()}</div>`}<div><strong>${item.name}</strong><div>${item.distance}</div></div></div><span class="status-pill ${applicantStatusTone(item.status || "New")}">${item.status || item.score}</span></header>
              <div class="meta-row"><span>${item.rating} stars</span><span>AI ranked</span><span>Offer sees ${formatCountryMoney(job.dailyRate, job.countryCode || user.countryCode || "NP")}/day</span><span>${hiring.find((entry) => entry.candidate === item.name)?.status || "Reviewing"}</span></div>
            </article>
          `).join("")}
        </div>
      </section>
      ` : ""}

      ${(activeView === "profile") ? `
      <section class="panel">
        <h3>Employer Features</h3>
        <div class="document-grid">
          ${analytics.map((item) => `<article class="info-card"><strong>${item.label}</strong><p>${item.value}</p></article>`).join("")}
          <article class="info-card"><strong>Chat</strong><p>${(Array.isArray(profile.chat) ? profile.chat : []).join(" ")}</p></article>
          <article class="info-card"><strong>Verification Badge</strong><p>${profile.verificationBadge || "Pending"}</p></article>
          <article class="info-card"><strong>Payment Processing</strong><p>${payments.map((payment) => `${payment.reference}: ${payment.status}`).join(" | ")}</p></article>
          <article class="info-card"><strong>Worker Ratings</strong><p>${ratings.map((rating) => `${rating.worker}: ${rating.score}`).join(" | ")}</p></article>
        </div>
      </section>
      ` : ""}

      ${(activeView === "dashboard" || activeView === "profile") ? `
      <section class="panel">
        <h3>Employer Analytics Dashboard</h3>
        <div class="summary-grid">
          ${analyticsDashboard.map((item) => `<article class="quick-card"><strong>${item.label}</strong><p>${item.value}</p></article>`).join("")}
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

      ${(activeView === "jobs") ? `
      <section class="panel">
        <h3>Chat With ${applicant.name}</h3>
        ${chatFeed(applicantThread.length ? applicantThread : [{ from: "Employer", text: "Open the conversation with a shortlisted worker here.", time: "Now" }])}
        <div class="button-row">
          <input id="chatInput" type="text" placeholder="Message ${applicant.name}">
          <button class="primary-button small-button" type="button" data-employer-send-chat>Send</button>
        </div>
      </section>
      ` : ""}

      ${(activeView === "dashboard") ? `
      <section class="panel">
        <h3>Recent Activity Feed</h3>
        <div class="recent-feed">
          <article class="timeline-card"><header><strong>New application</strong><span>2 min ago</span></header><div>${applicant.name} applied to ${job.title}</div></article>
          <article class="timeline-card"><header><strong>Payment update</strong><span>12 min ago</span></header><div>${job.escrow ? "Escrow funded successfully" : "Escrow awaiting funding"}</div></article>
          <article class="timeline-card"><header><strong>Completion event</strong><span>1 hr ago</span></header><div>Previous job completion confirmed and rating saved.</div></article>
        </div>
      </section>
      ` : ""}
    </div>
  `;
}
