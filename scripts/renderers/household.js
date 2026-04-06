import { countryName, formatCountryMoney, getCountryRule } from "../country-rules.js";
import { getSession, selectedApplicant, selectedEmployerJob } from "../store.js";
import {
  applicantStatusTone,
  chatFeed,
  documentList,
  disputeComposer,
  evidenceList,
  formatAccountId,
  identityCard,
  jobPostWizard,
  jobStatusTone
} from "./shared.js";

export function householdDashboard(user) {
  const profile = user.profile || {};
  const countryRule = getCountryRule(user.countryCode || "NP");
  const jobs = Array.isArray(user.jobs) ? user.jobs : [];
  const allApplicants = Array.isArray(user.applicants) ? user.applicants : [];
  const notifications = Array.isArray(profile.notifications) ? profile.notifications : [];
  const payments = Array.isArray(profile.payments) ? profile.payments : [];
  const session = getSession();
  const activeView = session.activePortalView;
  const job = selectedEmployerJob() || jobs[0] || {
    id: "home-fallback",
    title: "No home service booking yet",
    category: "Home Services",
    location: user.serviceAddress || "Home address pending",
    serviceAddress: user.serviceAddress || "Home address pending",
    status: "Draft",
    dailyRate: 0,
    payUnit: "Fixed job",
    bookingMode: "Direct booking",
    duration: "Flexible",
    shiftStart: "TBD",
    shortlisted: 0,
    applicants: 0,
    countryCode: user.countryCode || "NP",
    notes: "Create your first home service request to start hiring."
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
      id: "home-applicant-fallback",
      name: "No helper selected yet",
      distance: "Nearby",
      rating: "0.0",
      status: "New",
      skills: [],
      reliability: "Pending",
      chatThread: []
    };
  const chatThread = Array.isArray(applicant.chatThread) ? applicant.chatThread : [];
  const bookedCount = jobs.filter((item) => ["Ongoing", "Completed"].includes(item.status)).length;
  const trustCategories = ["Nanny", "Elder Care", "Housekeeper", "Childcare"];
  const highTrustMode = trustCategories.includes(job.category);

  return `
    <div class="stack">
      ${identityCard(user)}
      ${jobPostWizard(user, session)}
      ${disputeComposer(user, session)}

      ${(activeView === "dashboard") ? `
      <section class="panel">
        <div class="summary-grid">
          <article class="quick-card"><strong>Open Home Requests</strong><p>${jobs.filter((item) => !["Completed", "Cancelled"].includes(item.status)).length}</p></article>
          <article class="quick-card"><strong>Trusted Favorites</strong><p>${allApplicants.filter((item) => ["Invited", "Hired", "Rated"].includes(item.status)).length}</p></article>
          <article class="quick-card"><strong>Completed Visits</strong><p>${bookedCount}</p></article>
          <article class="quick-card"><strong>Protected Spend</strong><p>${payments[0]?.amount || formatCountryMoney(0, user.countryCode || "NP")}</p></article>
        </div>
      </section>
      ` : ""}

      ${(activeView === "dashboard") ? `
      <section class="panel">
        <h3>Hire For Home</h3>
        <div class="comparison-grid">
          <article class="job-card selected">
            <header><div><strong>${job.title}</strong><div>${job.category} / ${job.serviceAddress || job.location}</div></div><span class="status-pill ${jobStatusTone(job.status)}">${job.status}</span></header>
            <div class="meta-row"><span>${formatCountryMoney(job.dailyRate || 0, job.countryCode || user.countryCode || "NP")}</span><span>${job.payUnit || "Fixed job"}</span><span>${job.bookingMode || "Direct booking"}</span></div>
            <div>${job.notes || "Post a simple home task, choose the time window, and review trusted nearby helpers."}</div>
            <div class="button-row">
              <button class="primary-button small-button" type="button" data-open-job-modal>${jobs.length ? "Post Another Home Job" : "Create Home Request"}</button>
              <button class="secondary-button small-button" type="button" data-shortlist ${!applicants.length ? "disabled" : ""}>Shortlist</button>
              <button class="secondary-button small-button" type="button" data-invite ${!applicants.length ? "disabled" : ""}>Invite</button>
              <button class="secondary-button small-button" type="button" data-escrow>${job.escrow ? "Escrow Funded" : "Fund Escrow"}</button>
            </div>
          </article>
          <article class="job-card selected">
            <header><div><strong>${applicant.name}</strong><div>${applicant.distance} / ${applicant.skills?.join(", ") || "Nearby helper"}</div></div><span class="status-pill ${applicantStatusTone(applicant.status || "New")}">${applicant.status || "New"}</span></header>
            <div class="meta-row"><span>${applicant.rating} stars</span><span>${applicant.reliability || "Verified"}</span><span>${highTrustMode ? "Safety priority" : "Quick service"}</span></div>
            ${chatFeed(chatThread.length ? chatThread : [{ from: "Employer", text: "Invite a trusted worker and continue the conversation here.", time: "Now" }])}
            <div class="button-row">
              <input id="chatInput" type="text" placeholder="Ask about timing, tools, safety, or family needs">
              <button class="primary-button small-button" type="button" data-employer-send-chat>Send</button>
            </div>
          </article>
        </div>
      </section>
      ` : ""}

      ${(activeView === "dashboard" || activeView === "jobs") ? `
      <section class="panel">
        <h3>Home Booking Board</h3>
        <div class="job-list">
          ${jobs.map((item) => `
            <article class="job-card ${item.id === job.id ? "selected" : ""}" data-select-employer-job="${item.id}">
              <header><div><strong>${item.title}</strong><div>${item.serviceAddress || item.location}</div></div><span class="status-pill ${jobStatusTone(item.status)}">${item.status}</span></header>
              <div class="meta-row"><span>${formatCountryMoney(item.dailyRate || 0, item.countryCode || user.countryCode || "NP")}</span><span>${item.payUnit || "Fixed job"}</span><span>${item.duration || "Flexible"}</span></div>
              <div>${item.notes || "Home service request"}</div>
            </article>
          `).join("") || `<article class="info-card"><strong>No home requests yet</strong><p>Create your first request for a plumber, electrician, nanny, cleaner, or painter.</p></article>`}
        </div>
      </section>
      ` : ""}

      ${(activeView === "dashboard" || activeView === "jobs") ? `
      <section class="panel">
        <h3>Trusted Helpers Nearby</h3>
        <div class="job-list">
          ${applicants.map((item) => `
            <article class="job-card ${item.id === applicant.id ? "selected" : ""}" data-select-applicant="${item.id}">
              <header><div><strong>${item.name}</strong><div>${item.distance}</div></div><span class="status-pill ${applicantStatusTone(item.status || "New")}">${item.status || "New"}</span></header>
              <div class="meta-row"><span>${item.rating} stars</span><span>${item.reliability || "Verified"}</span><span>${item.skills?.join(", ") || "General home support"}</span></div>
            </article>
          `).join("") || `<article class="info-card"><strong>No applicants yet</strong><p>Once you publish a home request, nearby verified workers will appear here.</p></article>`}
        </div>
        <div class="button-row">
          <button class="secondary-button small-button" type="button" data-shortlist ${!applicants.length ? "disabled" : ""}>Shortlist</button>
          <button class="secondary-button small-button" type="button" data-invite ${!applicants.length ? "disabled" : ""}>Invite</button>
          <button class="primary-button small-button" type="button" data-hire-worker ${!applicants.length ? "disabled" : ""}>Book Helper</button>
          <button class="secondary-button small-button" type="button" data-release-escrow ${!job.escrow ? "disabled" : ""}>Release Payment</button>
        </div>
      </section>
      ` : ""}

      ${(activeView === "profile") ? `
      <section class="panel">
        <h3>Home Hirer Profile</h3>
        <div class="profile-grid">
          <label><span>Primary Contact</span><input id="profileFullName" type="text" value="${user.fullName || ""}"></label>
          <label><span>Phone or Email</span><input id="profileContact" type="text" value="${user.contact || ""}"></label>
          <label><span>Household Name</span><input id="profileCompany" type="text" value="${user.homeLabel || user.company || ""}"></label>
          <label><span>Service Category Focus</span><input id="profileSkill" type="text" value="${user.skill || "Home Services"}"></label>
        </div>
        <label><span>Home / Service Address</span><textarea id="profileNotes">${user.serviceAddress || user.notes || ""}</textarea></label>
        <div class="document-grid">
          <article class="info-card"><strong>Verification</strong><p>${user.verificationStatus} / ${formatAccountId(user)}</p></article>
          <article class="info-card"><strong>Country</strong><p>${countryName(user.countryCode || "NP")}</p></article>
          <article class="info-card"><strong>Phone Auth</strong><p>${countryRule.phoneAuthMode}</p></article>
          <article class="info-card"><strong>Payout Rail</strong><p>${countryRule.payoutRail}</p></article>
          <article class="info-card"><strong>Safety Mode</strong><p>${highTrustMode ? "Enhanced trust checks for care work" : "Standard home service trust checks"}</p></article>
        </div>
        <div class="button-row">
          <button class="primary-button small-button" type="button" data-save-profile>Save Home Profile</button>
        </div>
      </section>
      ` : ""}

      ${(activeView === "profile" || activeView === "jobs") ? `
      <section class="panel">
        <h3>Trust, Safety, and Payment Protection</h3>
        <div class="document-grid">
          <article class="info-card"><strong>Service Address</strong><p>${job.serviceAddress || user.serviceAddress || "Add your address in the booking wizard."}</p></article>
          <article class="info-card"><strong>Booking Mode</strong><p>${job.bookingMode || "Direct booking"} / ${job.payUnit || "Fixed job"}</p></article>
          <article class="info-card"><strong>Escrow</strong><p>${user.escrow?.status || "Pending"} / auto release ${user.escrow?.autoReleaseHours || 12}h</p></article>
          <article class="info-card"><strong>High-Trust Services</strong><p>${highTrustMode ? "Background-check friendly, repeat-family preferred, emergency contact recommended." : "Photo proof, tools note, and arrival confirmation supported."}</p></article>
        </div>
        <div class="button-row">
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
          `).join("") || `<article class="info-card"><strong>No trust or payment cases yet</strong><p>Open a case here if a helper no-shows, the work is unsafe, or a payout needs review before release.</p></article>`}
        </div>
      </section>
      ` : ""}

      ${(activeView === "documents") ? `
      <section class="panel">
        <h3>Home Hirer Verification</h3>
        <div class="document-grid">${documentList(user.documents || [], "employer")}</div>
      </section>
      ` : ""}

      ${(activeView === "dashboard" || activeView === "profile") ? `
      <section class="panel">
        <h3>Home Notifications</h3>
        <div class="recent-feed">
          ${notifications.map((item, index) => `<article class="timeline-card"><header><strong>Update ${index + 1}</strong><span>Live</span></header><div>${item}</div></article>`).join("")}
        </div>
      </section>
      ` : ""}
    </div>
  `;
}
