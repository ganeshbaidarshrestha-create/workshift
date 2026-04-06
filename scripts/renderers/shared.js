import { getCountryRule, listCountryRules, countryName, formatCountryMoney } from "../country-rules.js";

export function mapsUrl(label) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(label)}`;
}

export function formatAccountId(user) {
  if (!user?.id) return "Pending generation";
  const prefix = user.role === "employer"
    ? user.accountType === "household"
      ? "WS-HME"
      : "WS-EMP"
    : "WS-WKR";
  const suffix = user.id.split("_").at(-1)?.slice(-6) || "000000";
  return `${prefix}-${suffix.toUpperCase()}`;
}

export function identityCard(user) {
  const statusTone = user.verificationStatus === "Approved" ? "available" : user.verificationStatus === "Suspended" ? "busy" : "offline";
  const approvedText = user.approvedAt ? `Approved on ${new Date(user.approvedAt).toLocaleDateString()}` : "Visible after admin approval";
  const mediaLabel = user.role === "employer" ? (user.company || user.fullName || "Employer") : (user.fullName || "Worker");
  const mediaSrc = user.role === "employer" ? user.profile?.logoData : user.profile?.photoData;
  return `
    <section class="panel account-identity-card">
      <div class="identity-main">
        ${mediaSrc ? `<img class="identity-media" src="${mediaSrc}" alt="${mediaLabel}">` : `<div class="identity-media identity-fallback">${mediaLabel.slice(0, 2).toUpperCase()}</div>`}
        <div>
        <p class="eyebrow">Verified Identity</p>
        <h3>${user.role === "employer" ? user.accountType === "household" ? "Home Hirer" : "Employer" : "Worker"} ID ${formatAccountId(user)}</h3>
        <p>${approvedText}</p>
        </div>
      </div>
      <div class="button-row">
        <span class="status-pill ${statusTone}">${user.verificationStatus}</span>
        <span class="icon-chip">${user.role === "employer" ? user.accountType === "household" ? "Home booking access" : "Portal access" : "Ready for shifts"}</span>
      </div>
    </section>
  `;
}

export function filterRankedWorkers(rankedWorkers, session) {
  const skillFilter = String(session.employerSearchSkill || "").trim().toLowerCase();
  const locationFilter = String(session.employerSearchLocation || "").trim().toLowerCase();
  const normalizedLocationFilter = ["all", "all locations", "anywhere"].includes(locationFilter) ? "" : locationFilter;
  const quickFilters = new Set(session.employerQuickFilters || []);

  return (rankedWorkers || []).filter((worker) => {
    const skillHaystack = [...(worker.skills || []), worker.name || "", worker.locationLabel || ""]
      .map((value) => String(value).toLowerCase());
    const matchesSkill = !skillFilter || skillHaystack.some((value) => value.includes(skillFilter));
    const matchesLocation = !normalizedLocationFilter || String(worker.locationLabel || "").toLowerCase().includes(normalizedLocationFilter);
    const matchesAvailable = !quickFilters.has("available") || worker.available;
    const matchesVerified = !quickFilters.has("verified") || Boolean(worker.verified);
    const matchesHighRating = !quickFilters.has("high_rating") || Number(worker.avgRating || 0) >= 4.7;
    const matchesNearby = !quickFilters.has("nearby") || Number(worker.distanceKm || 99) <= 5;
    return matchesSkill && matchesLocation && matchesAvailable && matchesVerified && matchesHighRating && matchesNearby;
  });
}

export function sortRankedWorkers(workers, sortBy = "best_match") {
  const list = Array.isArray(workers) ? [...workers] : [];
  const byNumberDesc = (getter) => list.sort((a, b) => getter(b) - getter(a));
  const byNumberAsc = (getter) => list.sort((a, b) => getter(a) - getter(b));
  if (sortBy === "nearest") return byNumberAsc((worker) => Number(worker.distanceKm || 999));
  if (sortBy === "highest_rated") return byNumberDesc((worker) => Number(worker.avgRating || 0));
  if (sortBy === "most_reliable") return byNumberDesc((worker) => Number(worker.reliability || 0));
  return byNumberDesc((worker) => Number(worker.matchScore || 0));
}

export function workerStatusBadge(applicants, workerId, workerName) {
  const applicant = (applicants || []).find((item) => item.id === workerId || item.name === workerName);
  if (!applicant) return "";
  const status = applicant.status || "New";
  const tone = applicantStatusTone(status);
  return `<span class="status-pill ${tone} worker-state-pill">${status}</span>`;
}

export function workerProfileModal(session, worker) {
  if (!session.workerProfileModalOpen) return "";
  if (!worker) {
    return `
      <div class="job-post-modal">
        <div class="job-post-backdrop" data-close-worker-profile></div>
        <div class="job-post-panel">
          <div class="job-post-header">
            <div><p class="eyebrow">Worker Profile</p><h3>No worker selected</h3></div>
            <button class="ghost-button small-button" type="button" data-close-worker-profile>Close</button>
          </div>
        </div>
      </div>
    `;
  }
  const history = Array.isArray(worker.workHistory) ? worker.workHistory : [];
  const reviews = Array.isArray(worker.reviews) ? worker.reviews : [];
  const badges = Array.isArray(worker.documentBadges) ? worker.documentBadges : [];
  return `
    <div class="job-post-modal">
      <div class="job-post-backdrop" data-close-worker-profile></div>
      <div class="job-post-panel">
        <div class="job-post-header">
          <div>
            <p class="eyebrow">Worker Profile</p>
            <h3>${worker.name}</h3>
            <p>${worker.locationLabel || "Location pending"} / ${worker.avgRating || "0"} stars / ${worker.available ? "Available now" : "Busy"}</p>
          </div>
          <button class="ghost-button small-button" type="button" data-close-worker-profile>Close</button>
        </div>
        <div class="document-grid">
          <article class="info-card"><strong>Skills</strong><p>${worker.skills?.join(", ") || "General labor"}</p></article>
          <article class="info-card"><strong>Experience</strong><p>${worker.experienceSummary || "Experienced field worker ready for local shifts."}</p></article>
          <article class="info-card"><strong>Reliability</strong><p>${Math.round((worker.reliability || 0) * 100)}%</p></article>
          <article class="info-card"><strong>Distance</strong><p>${worker.distanceKm || "?"} km from job site</p></article>
        </div>
        <section class="stack">
          <h3>Document Badges</h3>
          <div class="badge-row">
            ${badges.map((badge) => `<span class="icon-chip">${badge}</span>`).join("") || `<span class="helper-text">No document badges yet</span>`}
          </div>
        </section>
        <section class="stack">
          <h3>Work History</h3>
          <div class="recent-feed">
            ${history.map((item) => `
              <article class="timeline-card">
                <header><strong>${item.role}</strong><span>${item.period}</span></header>
                <div>${item.company} / ${item.location}</div>
                <div class="meta-row"><span>${item.result}</span></div>
              </article>
            `).join("") || `<article class="info-card"><strong>No work history added</strong><p>This worker has not added past projects yet.</p></article>`}
          </div>
        </section>
        <section class="stack">
          <h3>Reviews</h3>
          <div class="recent-feed">
            ${reviews.map((item) => `
              <article class="timeline-card">
                <header><strong>${item.author}</strong><span>${item.rating}/5</span></header>
                <div>${item.note}</div>
              </article>
            `).join("") || `<article class="info-card"><strong>No reviews yet</strong><p>Reviews will appear here after completed jobs.</p></article>`}
          </div>
        </section>
      </div>
    </div>
  `;
}

export function reputationBadge(score) {
  if (score >= 90) return "Elite";
  if (score >= 80) return "Trusted";
  return "Growing";
}

export function applicantStatusTone(status = "New") {
  if (status === "Rated" || status === "Hired" || status === "Invited") return "available";
  if (status === "Shortlisted") return "busy";
  return "offline";
}

export function applicantStageColumn(applicants, stage, selectedId) {
  const stageApplicants = (applicants || []).filter((item) => (item.status || "New") === stage);
  return `
    <div class="pipeline-column">
      <header>
        <strong>${stage}</strong>
        <span>${stageApplicants.length}</span>
      </header>
      <div class="pipeline-list">
        ${stageApplicants.map((item) => `
          <button class="pipeline-chip ${item.id === selectedId ? "selected" : ""}" type="button" data-select-applicant="${item.id}">
            <strong>${item.name}</strong>
            <span>${item.distance}</span>
          </button>
        `).join("") || `<div class="pipeline-empty">No candidates yet</div>`}
      </div>
    </div>
  `;
}

export function jobStatusTone(status = "Open") {
  if (status === "Open" || status === "Ongoing") return "available";
  if (status === "Paused") return "busy";
  return "offline";
}

export function comparisonTarget(user, applicant) {
  const applicants = user.applicants || [];
  return applicants.find((item) => item.id !== applicant.id && (item.status === "Invited" || item.status === "Shortlisted"))
    || applicants.find((item) => item.id !== applicant.id)
    || applicant;
}

export function stageCount(applicants, stage) {
  return (applicants || []).filter((item) => (item.status || "New") === stage).length;
}

export function chatFeed(messages) {
  return `
    <div class="chat-feed">
      ${(messages || []).map((message) => `
        <article class="chat-bubble ${message.from === "Worker" ? "outgoing" : message.from === "Employer" ? "incoming" : "incoming"}">
          <strong>${message.from}</strong>
          <p>${message.text}</p>
          <span>${message.time}</span>
        </article>
      `).join("")}
    </div>
  `;
}

export function evidenceList(evidence = []) {
  const items = Array.isArray(evidence) ? evidence.filter((item) => item?.label || item?.value) : [];
  if (!items.length) {
    return `<article class="info-card"><strong>No evidence attached yet</strong><p>Add notes, links, screenshots, or job proof references when opening a dispute.</p></article>`;
  }
  return items.map((item) => `
    <article class="info-card">
      <strong>${item.label || "Evidence item"}</strong>
      <p>${item.value || ""}</p>
    </article>
  `).join("");
}

export function disputeComposer(user, session) {
  if (!["worker", "employer"].includes(user?.role || "")) return "";
  const draft = session.disputeDraft || {};
  const currencyRule = getCountryRule(draft.currencyCode || user.countryCode || "NP");
  const accountLabel = user.accountType === "household" ? "home hirer" : user.role;
  return `
    <div class="job-post-modal ${session.disputeModalOpen ? "" : "is-hidden"}">
      <div class="job-post-backdrop" data-close-dispute></div>
      <div class="job-post-panel">
        <div class="job-post-header">
          <div>
            <p class="eyebrow">Safety And Payments</p>
            <h3>Open Dispute</h3>
            <p>Flag payment, service, safety, or quality issues for admin review. This creates a real case record for the ${accountLabel} side and the admin inbox.</p>
          </div>
          <button class="ghost-button small-button" type="button" data-close-dispute>Close</button>
        </div>
        <div class="document-grid">
          <article class="info-card"><strong>Job</strong><p>${draft.title || "Current booking or shift"}</p></article>
          <article class="info-card"><strong>Against</strong><p>${draft.againstName || "Counterparty will be attached automatically"}</p></article>
          <article class="info-card"><strong>Escrow</strong><p>${draft.escrowId || "No escrow linked yet"}</p></article>
          <article class="info-card"><strong>Currency</strong><p>${currencyRule.currencyCode}</p></article>
        </div>
        <div class="profile-grid">
          <label><span>Issue Type</span><select id="disputeReason"><option ${draft.reason === "Payment issue" ? "selected" : ""}>Payment issue</option><option ${draft.reason === "No-show or late arrival" ? "selected" : ""}>No-show or late arrival</option><option ${draft.reason === "Quality issue" ? "selected" : ""}>Quality issue</option><option ${draft.reason === "Scope mismatch" ? "selected" : ""}>Scope mismatch</option><option ${draft.reason === "Safety concern" ? "selected" : ""}>Safety concern</option><option ${draft.reason === "Damage claim" ? "selected" : ""}>Damage claim</option><option ${draft.reason === "Harassment or misconduct" ? "selected" : ""}>Harassment or misconduct</option></select></label>
          <label><span>Requested Resolution</span><select id="disputeResolution"><option ${draft.requestedResolution === "Review and mediate" ? "selected" : ""}>Review and mediate</option><option ${draft.requestedResolution === "Partial refund" ? "selected" : ""}>Partial refund</option><option ${draft.requestedResolution === "Full refund" ? "selected" : ""}>Full refund</option><option ${draft.requestedResolution === "Release held payment" ? "selected" : ""}>Release held payment</option><option ${draft.requestedResolution === "Safety review" ? "selected" : ""}>Safety review</option></select></label>
          <label><span>Amount In Question (${currencyRule.currencyCode})</span><input id="disputeAmount" type="number" min="0" value="${Number(draft.amount || 0)}"></label>
        </div>
        <label><span>What happened?</span><textarea id="disputeSummary" placeholder="Explain the issue, what was agreed, what happened instead, and what outcome you are requesting.">${draft.summary || ""}</textarea></label>
        <label><span>Evidence Notes</span><textarea id="disputeEvidenceNotes" placeholder="One line per item. Example: Before photo at 10:12 AM&#10;Chat promise to arrive by 6:30 AM&#10;Completion proof missing">${draft.evidenceNotes || ""}</textarea></label>
        <label><span>Evidence Links Or References</span><textarea id="disputeEvidenceLinks" placeholder="Paste storage links, screenshot URLs, payment references, or external ticket IDs on separate lines.">${draft.evidenceLinks || ""}</textarea></label>
        <label><span>Upload Evidence Files</span><input id="disputeEvidenceFiles" type="file" accept="image/*,.pdf,.doc,.docx" multiple data-dispute-file-upload></label>
        <div class="document-grid">
          ${evidenceList(draft.evidence || [])}
        </div>
        <div class="button-row">
          <button class="secondary-button small-button" type="button" data-close-dispute>Cancel</button>
          <button class="primary-button small-button" type="button" data-submit-dispute>Submit Dispute</button>
        </div>
      </div>
    </div>
  `;
}

export function workerMapBoard(jobs) {
  return `
    <div class="map-board">
      ${(jobs || []).map((item, index) => `
        <button class="map-pin map-pin-${(index % 4) + 1}" type="button" data-select-worker-job="${item.id}">
          <strong>${item.title}</strong>
          <span>${item.distance}</span>
        </button>
      `).join("")}
    </div>
  `;
}

export function employerMapBoard(workers) {
  return `
    <div class="map-board employer-map">
      ${(workers || []).map((worker, index) => `
        <article class="map-pin map-pin-${(index % 4) + 1}">
          <strong>${worker.name}</strong>
          <span>${worker.locationLabel}</span>
        </article>
      `).join("")}
    </div>
  `;
}

export function documentList(documents, prefix) {
  return (documents || []).map((doc) => `
    <article class="info-card">
      <strong>${doc.name}</strong>
      <p>Status: ${doc.status}${doc.required ? " / Required" : " / Optional"}</p>
      <p>${doc.fileName ? `File: ${doc.fileName}` : "No file selected yet."}</p>
      ${doc.url ? `<p><a href="${doc.url}" target="_blank" rel="noreferrer">Open uploaded file</a></p>` : ""}
      <input type="file" accept="image/*,.pdf,.doc,.docx" data-document-file-upload="${prefix}:${doc.id}">
      <button class="secondary-button small-button" type="button" data-upload="${prefix}:${doc.id}">${doc.status === "Uploaded" ? "Mark Reviewed Locally" : "Use Local Mark Uploaded"}</button>
    </article>
  `).join("");
}

export function workerJobStatus(user, job) {
  const matched = (user.jobs || []).find((item) => item.id === job.id);
  if (matched?.applied) return { label: "Applied", tone: "available" };
  if (matched?.saved) return { label: "Saved", tone: "busy" };
  return { label: job.status || "Open", tone: job.status === "Ongoing" ? "busy" : "offline" };
}

export function workerJobModal(user, session, job) {
  const status = workerJobStatus(user, job);
  return `
    <div class="job-post-modal ${session.workerJobModalOpen ? "" : "is-hidden"}">
      <div class="job-post-backdrop" data-worker-close-job></div>
      <div class="job-post-panel">
        <div class="job-post-header">
          <div>
            <p class="eyebrow">Job Details</p>
            <h3>${job.title}</h3>
            <p>${job.company} / ${job.location || job.distance}</p>
          </div>
          <button class="ghost-button small-button" type="button" data-worker-close-job>Close</button>
        </div>
        <div class="document-grid">
          <article class="info-card"><strong>Status</strong><p>${status.label}</p></article>
          <article class="info-card"><strong>Pay</strong><p>${job.pay}</p></article>
          <article class="info-card"><strong>Distance</strong><p>${job.distance}</p></article>
          <article class="info-card"><strong>Skills Needed</strong><p>${job.skills}</p></article>
          <article class="info-card"><strong>Summary</strong><p>${job.summary || "Live marketplace role"}</p></article>
          <article class="info-card"><strong>Map</strong><p><a href="${mapsUrl(`${job.company} ${job.location || job.title}`)}" target="_blank" rel="noreferrer">Open work location</a></p></article>
        </div>
        <div class="button-row">
          <button class="secondary-button small-button" type="button" data-worker-save>${status.label === "Saved" ? "Unsave Job" : "Save Job"}</button>
          <button class="primary-button small-button" type="button" data-worker-apply ${status.label === "Applied" ? "disabled" : ""}>${status.label === "Applied" ? "Already Applied" : "Apply Now"}</button>
        </div>
      </div>
    </div>
  `;
}

export function jobPostWizard(user, session) {
  const draft = session.jobPostDraft || {};
  const isEditing = Boolean(session.editingJobId);
  const isHousehold = user.accountType === "household";
  const countryOptions = listCountryRules();
  const countryRule = getCountryRule(draft.countryCode || user.countryCode || "NP");
  return `
    <div class="job-post-modal ${session.jobPostModalOpen ? "" : "is-hidden"}">
      <div class="job-post-backdrop" data-job-modal-cancel></div>
      <div class="job-post-panel">
        <div class="job-post-header">
          <div>
            <p class="eyebrow">${isHousehold ? "Home Booking Wizard" : "Hiring Wizard"}</p>
            <h3>${isEditing ? (isHousehold ? "Edit Home Request" : "Edit Job Post") : (isHousehold ? "Post Home Service Request" : "Post New Job")}</h3>
            <p>${isEditing ? "Refine the role, pay, timing, and trust details before republishing." : isHousehold ? "Keep it simple: describe the home task, time window, and budget, then review trusted nearby helpers." : "Build a strong job post with the details workers care about most."}</p>
          </div>
          <button class="ghost-button small-button" type="button" data-job-modal-cancel>Close</button>
        </div>
        <div class="wizard-steps">
          <span class="wizard-step ${session.jobPostStep === 1 ? "active" : ""}">${isHousehold ? "Service" : "Role"}</span>
          <span class="wizard-step ${session.jobPostStep === 2 ? "active" : ""}">${isHousehold ? "Budget" : "Pay"}</span>
          <span class="wizard-step ${session.jobPostStep === 3 ? "active" : ""}">Review</span>
        </div>

        ${session.jobPostStep === 1 ? `
        <div class="profile-grid">
          <label><span>${isHousehold ? "Service title" : "Job title"}</span><input id="jobPostTitle" type="text" value="${draft.title || ""}" placeholder="${isHousehold ? "Fix kitchen sink leak" : "50 harvest workers"}"></label>
          <label><span>Category</span><select id="jobPostCategory">${isHousehold
            ? `<option ${draft.category === "Plumbing" ? "selected" : ""}>Plumbing</option><option ${draft.category === "Electrician" ? "selected" : ""}>Electrician</option><option ${draft.category === "Painter" ? "selected" : ""}>Painter</option><option ${draft.category === "Cleaner" ? "selected" : ""}>Cleaner</option><option ${draft.category === "Nanny" ? "selected" : ""}>Nanny</option><option ${draft.category === "Elder Care" ? "selected" : ""}>Elder Care</option><option ${draft.category === "General Help" ? "selected" : ""}>General Help</option>`
            : `<option ${draft.category === "Agriculture" ? "selected" : ""}>Agriculture</option><option ${draft.category === "Hospitality" ? "selected" : ""}>Hospitality</option><option ${draft.category === "Warehouse" ? "selected" : ""}>Warehouse</option><option ${draft.category === "Construction" ? "selected" : ""}>Construction</option><option ${draft.category === "Facilities" ? "selected" : ""}>Facilities</option>`}</select></label>
          <label><span>Country</span><select id="jobPostCountry">${countryOptions.map((country) => `<option value="${country.code}" ${country.code === (draft.countryCode || user.countryCode || "NP") ? "selected" : ""}>${country.name}</option>`).join("")}</select></label>
          <label><span>${isHousehold ? "Neighborhood / Area" : "Location"}</span><input id="jobPostLocation" type="text" value="${draft.location || ""}" placeholder="${isHousehold ? "Jawalakhel, Lalitpur" : "Kathmandu Valley"}"></label>
          <label><span>${isHousehold ? "Home / Service Address" : "Headcount"}</span>${isHousehold
            ? `<input id="jobPostServiceAddress" type="text" value="${draft.serviceAddress || ""}" placeholder="Street, area, apartment, or home address">`
            : `<input id="jobPostHeadcount" type="number" min="1" value="${draft.headcount || 1}">`}</label>
          <label><span>${isHousehold ? "Preferred Start Time" : "Shift start"}</span><input id="jobPostShiftStart" type="time" value="${draft.shiftStart || "06:00"}"></label>
          <label><span>${isHousehold ? "Duration" : "Duration"}</span><select id="jobPostDuration">${isHousehold
            ? `<option ${draft.duration === "1-2 hours" ? "selected" : ""}>1-2 hours</option><option ${draft.duration === "Half day" ? "selected" : ""}>Half day</option><option ${draft.duration === "Full day" ? "selected" : ""}>Full day</option><option ${draft.duration === "Repeat booking" ? "selected" : ""}>Repeat booking</option>`
            : `<option ${draft.duration === "1 day" ? "selected" : ""}>1 day</option><option ${draft.duration === "2-3 days" ? "selected" : ""}>2-3 days</option><option ${draft.duration === "1 week" ? "selected" : ""}>1 week</option><option ${draft.duration === "Project based" ? "selected" : ""}>Project based</option>`}</select></label>
          ${isHousehold ? `<label><span>Booking Mode</span><select id="jobPostBookingMode"><option ${draft.bookingMode === "Direct booking" ? "selected" : ""}>Direct booking</option><option ${draft.bookingMode === "Request quotes" ? "selected" : ""}>Request quotes</option><option ${draft.bookingMode === "Repeat family" ? "selected" : ""}>Repeat family</option></select></label>` : ""}
          ${isHousehold ? `<label><span>Arrival Window</span><input id="jobPostStartWindow" type="text" value="${draft.startWindow || ""}" placeholder="Today 2 PM - 4 PM"></label>` : ""}
        </div>
        ` : ""}

        ${session.jobPostStep === 2 ? `
        <div class="profile-grid">
          <label><span>${isHousehold ? "Budget" : "Daily pay"} (${countryRule.currencyCode})</span><input id="jobPostRate" type="number" min="1" value="${draft.dailyRate || 90}"></label>
          <label><span>${isHousehold ? "Pay Unit" : "Urgency"}</span>${isHousehold
            ? `<select id="jobPostPayUnit"><option ${draft.payUnit === "Fixed job" ? "selected" : ""}>Fixed job</option><option ${draft.payUnit === "Hourly" ? "selected" : ""}>Hourly</option><option ${draft.payUnit === "Half day" ? "selected" : ""}>Half day</option><option ${draft.payUnit === "Full day" ? "selected" : ""}>Full day</option></select>`
            : `<select id="jobPostUrgency"><option ${draft.urgency === "New" ? "selected" : ""}>New</option><option ${draft.urgency === "High" ? "selected" : ""}>High</option><option ${draft.urgency === "Urgent" ? "selected" : ""}>Urgent</option></select>`}</label>
          ${isHousehold ? `<label><span>Helpers Needed</span><input id="jobPostHeadcount" type="number" min="1" value="${draft.headcount || 1}"></label>` : ""}
          <label class="job-post-wide"><span>${isHousehold ? "Skills or service details" : "Skills needed"}</span><input id="jobPostSkills" type="text" value="${draft.requiredSkillsText || ""}" placeholder="${isHousehold ? "leak repair, bring tools, child care experience" : "harvest, packing, punctual crew"}"></label>
          <label class="job-post-wide"><span>${isHousehold ? "Home notes and instructions" : "Notes for workers"}</span><textarea id="jobPostNotes" placeholder="${isHousehold ? "Parking, pet in house, tools provided, repeat family preference" : "What should workers know before arriving?"}">${draft.notes || ""}</textarea></label>
          ${isHousehold ? `<label class="job-post-wide"><span>Safety and trust notes</span><textarea id="jobPostSafetyNotes" placeholder="Emergency contact, child or elder care notes, background-check preference">${draft.safetyNotes || ""}</textarea></label>` : ""}
        </div>
        <div class="quick-card premium-callout">
          <strong>Projected spend</strong>
          <p>${formatCountryMoney((draft.dailyRate || 90) * (draft.headcount || 1), draft.countryCode || user.countryCode || "NP")} for ${draft.headcount || 1} worker(s)${isHousehold ? ` / ${draft.payUnit || "Fixed job"}` : ""}</p>
        </div>
        <div class="document-grid">
          <article class="info-card"><strong>Phone Auth</strong><p>${countryRule.phoneAuthMode}</p></article>
          <article class="info-card"><strong>Payout Rail</strong><p>${countryRule.payoutRail}</p></article>
          <article class="info-card"><strong>Verification Rule</strong><p>${isHousehold ? `${countryRule.verificationRule} / plus home-address confirmation for trust-sensitive bookings.` : countryRule.verificationRule}</p></article>
          <article class="info-card"><strong>Dial Code</strong><p>${countryRule.dialCode}</p></article>
        </div>
        ` : ""}

        ${session.jobPostStep === 3 ? `
        <div class="document-grid">
          <article class="info-card"><strong>${isHousehold ? "Service" : "Role"}</strong><p>${draft.title || "Untitled role"} / ${draft.category || "No category"} / ${countryName(draft.countryCode || user.countryCode || "NP")} / ${draft.location || "No location"}</p></article>
          <article class="info-card"><strong>${isHousehold ? "Visit Window" : "Shift"}</strong><p>${draft.shiftStart || "06:00"} / ${draft.duration || "1 day"} / ${draft.headcount || 1} worker(s)${draft.startWindow ? ` / ${draft.startWindow}` : ""}</p></article>
          <article class="info-card"><strong>${isHousehold ? "Budget" : "Offer"}</strong><p>${formatCountryMoney(draft.dailyRate || 90, draft.countryCode || user.countryCode || "NP")}/${isHousehold ? (draft.payUnit || "Fixed job") : "day"} / urgency ${draft.urgency || "New"}</p></article>
          <article class="info-card"><strong>Skills</strong><p>${draft.requiredSkillsText || "No skills entered yet"}</p></article>
          <article class="info-card"><strong>${isHousehold ? "Home Hirer" : "Employer"}</strong><p>${user.homeLabel || user.company || user.fullName}</p></article>
          <article class="info-card"><strong>${isHousehold ? "Home Address" : "Worker notes"}</strong><p>${isHousehold ? (draft.serviceAddress || "No service address added.") : (draft.notes || "No extra notes added.")}</p></article>
          ${isHousehold ? `<article class="info-card"><strong>Trust Notes</strong><p>${draft.safetyNotes || "Standard home booking trust rules apply."}</p></article>` : ""}
          <article class="info-card"><strong>Verification Rule</strong><p>${countryRule.verificationRule}</p></article>
        </div>
      ` : ""}

        <div class="button-row">
          ${session.jobPostStep > 1 ? `<button class="secondary-button small-button" type="button" data-job-modal-back>Back</button>` : ""}
          ${session.jobPostStep < 3 ? `<button class="primary-button small-button" type="button" data-job-modal-next>Continue</button>` : `<button class="primary-button small-button" type="button" data-save-job-post>${isEditing ? "Update Job" : "Publish Job"}</button>`}
        </div>
      </div>
    </div>
  `;
}
