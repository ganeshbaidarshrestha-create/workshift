import { dom } from "./dom.js";
import { getSession, selectedDisputeItem, selectedQueueItem } from "./store.js";
import { employerDashboard } from "./renderers/employer.js";
import { workerDashboard } from "./renderers/worker.js";

function adminDashboard(user) {
  const queueItems = Array.isArray(user.queue) ? user.queue : [];
  const disputes = Array.isArray(user.disputes) ? user.disputes : [];
  const analytics = Array.isArray(user.analytics) ? user.analytics : [];
  const flaggedJobs = Array.isArray(user.flaggedJobs) ? user.flaggedJobs : [];
  const abuseReports = Array.isArray(user.abuseReports) ? user.abuseReports : [];
  const payments = Array.isArray(user.payments) ? user.payments : [];
  const fraudAlerts = Array.isArray(user.fraudAlerts) ? user.fraudAlerts : [];
  const monitoring = Array.isArray(user.monitoring) ? user.monitoring : [];
  const queue = selectedQueueItem();
  const dispute = selectedDisputeItem();
  const activeView = getSession().activePortalView;
  return `
    <div class="stack">
      ${(activeView === "dashboard" || activeView === "analytics" || activeView === "verifications") ? `
          <div class="kpi-grid">
            <article class="quick-card"><strong>New Users Today</strong><p>428</p></article>
            <article class="quick-card"><strong>Pending Verifications</strong><p>${queueItems.filter((item) => item.status === "Pending").length}</p></article>
            <article class="quick-card"><strong>Open Disputes</strong><p>${disputes.filter((item) => item.status !== "Closed").length}</p></article>
            <article class="quick-card"><strong>Daily GMV</strong><p>${analytics[0]?.value || "$0"}</p></article>
          </div>
      ` : ""}

      <div class="admin-main-grid">
        <section class="verification-board">
          ${(activeView === "dashboard" || activeView === "verifications") ? `
              <div class="panel">
                <h3>Verification Queue</h3>
                <div class="verification-table">
                  ${queueItems.map((item) => `
                    <article class="table-row ${item.id === queue.id ? "selected" : ""}" data-select-queue="${item.id}">
                      <header><div><strong>${item.name}</strong><div>${item.type}</div></div><span class="status-pill ${item.status === "Approved" ? "available" : item.status === "Suspended" ? "busy" : "offline"}">${item.status}</span></header>
                      <div class="meta-row"><span>${item.region}</span><span>${item.risk} risk</span><span>${item.onboardingMode ? `Mode: ${item.onboardingMode}` : "Document preview ready"}</span></div>
                      <div class="button-row">
                        <button class="primary-button small-button" type="button" data-approve>Approve</button>
                        <button class="secondary-button small-button" type="button" data-rerequest>Reject / Re-upload</button>
                      </div>
                    </article>
                  `).join("")}
                </div>
              </div>
          ` : ""}

          ${(activeView === "dashboard" || activeView === "analytics") ? `
              <div class="panel">
                <h3>Analytics Overview</h3>
                <div class="chart-bars">
                  <div class="chart-bar" style="height:110px"><span>Mon</span></div>
                  <div class="chart-bar" style="height:135px"><span>Tue</span></div>
                  <div class="chart-bar" style="height:125px"><span>Wed</span></div>
                  <div class="chart-bar" style="height:150px"><span>Thu</span></div>
                  <div class="chart-bar" style="height:165px"><span>Fri</span></div>
                  <div class="chart-bar" style="height:145px"><span>Sat</span></div>
                  <div class="chart-bar" style="height:158px"><span>Sun</span></div>
                </div>
                <div class="meta-row"><span>Date range: Last 7 days</span><span>GA-style KPI trend view</span></div>
              </div>
          ` : ""}
        </section>

        <section class="dispute-board">
          ${(activeView === "dashboard" || activeView === "disputes") ? `
              <div class="panel">
                <h3>Dispute Inbox</h3>
                <div class="job-list">
                  ${disputes.map((item, index) => `
                    <article class="timeline-card ${item.id === dispute.id ? "selected" : ""}" data-select-dispute="${item.id}">
                      <header><div><strong>${item.title}</strong><div>${item.note}</div></div><span>${item.status}</span></header>
                      <div class="meta-row"><span>Age ${index + 1}d</span><span>Priority ${index === 0 ? "High" : "Medium"}</span></div>
                    </article>
                  `).join("")}
                </div>
                <div class="button-row">
                  <button class="primary-button small-button" type="button" data-resolve>Resolve</button>
                  <button class="secondary-button small-button" type="button" data-refund>Issue Partial Refund</button>
                </div>
              </div>
          ` : ""}

          ${(activeView === "dashboard" || activeView === "verifications") ? `
              <div class="panel">
                <h3>Selected Queue Actions</h3>
                <div class="job-card selected">
                  <header><div><strong>${queue.name}</strong><div>${queue.type}</div></div><span>${queue.status}</span></header>
                  <div class="meta-row"><span>${queue.region}</span><span>${queue.risk} risk</span><span>${queue.helperName ? `Helper: ${queue.helperName}` : queue.voiceLanguage ? `Voice: ${queue.voiceLanguage}` : "Standard review"}</span></div>
                </div>
                <div class="button-row">
                  <button class="primary-button small-button" type="button" data-approve>Approve</button>
                  <button class="secondary-button small-button" type="button" data-rerequest>Request Re-upload</button>
                  <button class="secondary-button small-button" type="button" data-suspend>Suspend</button>
                </div>
              </div>
          ` : ""}

          ${(activeView === "dashboard" || activeView === "payments" || activeView === "jobs") ? `
              <div class="panel">
                <h3>Moderation and Risk</h3>
                <div class="document-grid">
                  <article class="info-card"><strong>Worker Verification</strong><p>Approve, reject, and request re-upload on worker identity and certification docs.</p></article>
                  <article class="info-card"><strong>Employer Verification</strong><p>Review business registration and suspicious onboarding patterns.</p></article>
                  ${flaggedJobs.map((item) => `<article class="info-card"><strong>${item.title}</strong><p>${item.status}</p></article>`).join("")}
                  ${abuseReports.map((item) => `<article class="info-card"><strong>${item.issue}</strong><p>${item.source} / ${item.status}</p></article>`).join("")}
                  ${payments.map((item) => `<article class="info-card"><strong>${item.id}</strong><p>${item.amount} / ${item.status}</p></article>`).join("")}
                  ${fraudAlerts.map((item) => `<article class="info-card"><strong>${item.title}</strong><p>${item.status}</p></article>`).join("")}
                  ${monitoring.map((item) => `<article class="info-card"><strong>${item.metric}</strong><p>${item.value}</p></article>`).join("")}
                </div>
              </div>
          ` : ""}
        </section>
      </div>
    </div>
  `;
}

function superAdminDashboard(user) {
  const analytics = Array.isArray(user.analytics) ? user.analytics : [];
  const commissionSettings = Array.isArray(user.commissionSettings) ? user.commissionSettings : [];
  const featureFlags = Array.isArray(user.featureFlags) ? user.featureFlags : [];
  const admins = Array.isArray(user.admins) ? user.admins : [];
  const payoutConfig = Array.isArray(user.payoutConfig) ? user.payoutConfig : [];
  const globalSettings = Array.isArray(user.globalSettings) ? user.globalSettings : [];
  const platformConfig = Array.isArray(user.platformConfig) ? user.platformConfig : [];
  const activeView = getSession().activePortalView;
  return `
    <div class="stack">
      ${(activeView === "dashboard") ? `
      <section class="panel">
        <h3>Super Admin Dashboard</h3>
        <div class="document-grid">
          ${analytics.map((item) => `<article class="info-card"><strong>${item.label}</strong><p>${item.value}</p></article>`).join("")}
        </div>
      </section>
      ` : ""}

      ${(activeView === "dashboard" || activeView === "flags" || activeView === "settings") ? `
      <section class="panel">
        <h3>Commission and Feature Flags</h3>
        <div class="document-grid">
          ${commissionSettings.map((item) => `<article class="info-card"><strong>${item.category}</strong><p>${item.rate}</p></article>`).join("")}
          ${featureFlags.map((item) => `<article class="info-card"><strong>${item.name}</strong><p>${item.enabled ? "Enabled" : "Disabled"}</p></article>`).join("")}
        </div>
      </section>
      ` : ""}

      ${(activeView === "dashboard" || activeView === "settings" || activeView === "admins") ? `
      <section class="panel">
        <h3>Platform Configuration and Admin Management</h3>
        <div class="document-grid">
          ${admins.map((item) => `<article class="info-card"><strong>${item.name}</strong><p>${item.status} / code ${item.code || "Hidden"}</p><button class="secondary-button small-button" type="button" data-remove-admin="${item.id}">Remove Admin</button></article>`).join("")}
          ${payoutConfig.map((item) => `<article class="info-card"><strong>${item.key}</strong><p>${item.value}</p></article>`).join("")}
          ${globalSettings.map((item) => `<article class="info-card"><strong>${item.key}</strong><p>${item.value}</p></article>`).join("")}
          ${platformConfig.map((item) => `<article class="info-card"><strong>${item.key}</strong><p>${item.value}</p></article>`).join("")}
        </div>
        <div class="button-row">
          <input id="newAdminName" type="text" placeholder="New admin name">
          <button class="primary-button small-button" type="button" data-super-add-admin>Add Admin</button>
        </div>
        <div class="button-row">
          <button class="primary-button small-button" type="button" data-super-save-settings>Save Platform Settings</button>
          <button class="secondary-button small-button" type="button" data-super-toggle-flag>Toggle Selected Flag</button>
        </div>
      </section>
      ` : ""}
    </div>
  `;
}

export function renderPublicVisibility() {
  const session = getSession();
  dom.publicShell.classList.toggle("is-hidden", Boolean(session.currentUser));
  dom.portalShell.classList.toggle("is-hidden", !session.currentUser);
}

export function renderSignupRole() {
  const session = getSession();
  dom.signupTabs.querySelectorAll("[data-signup-role]").forEach((button) => {
    button.classList.toggle("active", button.dataset.signupRole === session.signupRole);
  });
  dom.signupModeTabs?.querySelectorAll("[data-signup-mode]").forEach((button) => {
    button.classList.toggle("active", button.dataset.signupMode === session.signupMode);
  });
  dom.companyField.classList.toggle("is-hidden", session.signupRole !== "employer");

  const workerMode = session.signupRole === "worker";
  dom.signupModeTabs?.classList.toggle("is-hidden", !workerMode);
  dom.workerEasySteps?.classList.toggle("is-hidden", !workerMode);
  dom.workerSkillPicker?.classList.toggle("is-hidden", !workerMode);
  dom.assistOptions?.classList.toggle("is-hidden", !workerMode);
  dom.photoPrepTray?.classList.toggle("is-hidden", !workerMode);
  dom.onboardingGuide?.classList.toggle("is-hidden", !workerMode);
  dom.assistedField?.classList.toggle("is-hidden", !(workerMode && session.signupMode === "assisted"));
  dom.voiceField?.classList.toggle("is-hidden", !(workerMode && session.signupMode === "voice"));
  dom.workerSkillPicker?.querySelectorAll("[data-skill-choice]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.skillChoice === document.querySelector("#signupSkill")?.value);
  });
  dom.workerEasySteps?.querySelectorAll("[data-step-action]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.stepAction === session.signupStep);
  });

  if (dom.signupSectionTitle) {
    dom.signupSectionTitle.textContent = workerMode ? "Create a worker or employer account" : "Create an employer account";
  }

  if (dom.onboardingHint) {
    dom.onboardingHint.textContent = !workerMode
      ? "Employer onboarding uses standard business verification and company registration."
      : session.signupMode === "assisted"
      ? "Assisted signup lets a field agent, employer, or kiosk operator create the worker account with them."
      : session.signupMode === "voice"
      ? "Voice signup uses local-language prompts, simple answers, and photo capture instead of long typing."
      : "Self signup keeps onboarding fast with OTP, icon-friendly skill selection, and simple profile setup.";
  }

  if (dom.signupSubmitLabel) {
    dom.signupSubmitLabel.textContent = !workerMode
      ? "Create Employer Account"
      : session.signupMode === "assisted"
      ? "Create Assisted Worker Account"
      : session.signupMode === "voice"
      ? "Create Voice Signup Account"
      : "Create Worker Account";
  }

  if (dom.otpLabel) {
    dom.otpLabel.textContent = workerMode && session.signupMode === "voice" ? "Start Voice Signup" : "Send OTP";
  }

  if (workerMode) {
    const helperName = document.querySelector("#signupAssistedBy")?.value.trim() || "";
    const voiceLanguage = document.querySelector("#signupVoiceLanguage")?.value || "Nepali";
    const reviewReady = Boolean(document.querySelector("#signupName")?.value.trim() && document.querySelector("#signupContact")?.value.trim());

    if (dom.guideTitle) {
      dom.guideTitle.textContent = session.signupMode === "assisted"
        ? "Assisted worker registration"
        : session.signupMode === "voice"
        ? "Voice-led worker onboarding"
        : "Quick self-registration";
    }

    if (dom.guideModeBadge) {
      dom.guideModeBadge.textContent = session.signupMode === "assisted" ? "Assisted" : session.signupMode === "voice" ? "Voice" : "Self";
      dom.guideModeBadge.className = `status-pill ${session.signupMode === "voice" ? "busy" : session.signupMode === "assisted" ? "offline" : "available"}`;
    }

    dom.voiceGuideCard?.classList.toggle("is-hidden", session.signupMode !== "voice");
    dom.helperGuideCard?.classList.toggle("is-hidden", session.signupMode !== "assisted");

    if (dom.voiceGuideText) {
      dom.voiceGuideText.textContent = session.signupMode === "voice"
        ? "The worker hears short prompts, confirms work type, and proceeds without long written answers."
        : "Voice call guidance becomes available when voice signup is selected.";
    }
    if (dom.voiceGuideLanguage) {
      dom.voiceGuideLanguage.textContent = `Language: ${voiceLanguage}`;
    }
    if (dom.voiceGuideTimer) {
      dom.voiceGuideTimer.textContent = session.signupMode === "voice" ? "Estimated call: 01:20" : "Estimated call: standby";
    }

    if (dom.helperGuideText) {
      dom.helperGuideText.textContent = session.signupMode === "assisted"
        ? "The helper confirms the worker identity, fills account details, and prepares documents for later review."
        : "Helper verification appears when assisted signup is selected.";
    }
    if (dom.helperGuideName) {
      dom.helperGuideName.textContent = `Helper: ${helperName || "pending"}`;
    }
    if (dom.helperGuideState) {
      dom.helperGuideState.textContent = `Check: ${helperName ? "ready for assisted submission" : "waiting for helper name"}`;
    }

    if (dom.reviewGuideText) {
      dom.reviewGuideText.textContent = session.signupMode === "voice"
        ? "After the voice-led answers are captured, the account moves into admin review with ID and selfie pending."
        : session.signupMode === "assisted"
        ? "After the helper completes the worker details, admin review starts with a visible assisted-registration tag."
        : "After OTP and profile details are completed, the account moves into standard admin review.";
    }
    if (dom.reviewGuideStatus) {
      dom.reviewGuideStatus.textContent = `Status: ${reviewReady ? "ready to submit" : "complete name and contact first"}`;
    }
    if (dom.reviewGuideEta) {
      dom.reviewGuideEta.textContent = session.signupMode === "assisted"
        ? "ETA: helper review -> admin queue"
        : session.signupMode === "voice"
        ? "ETA: voice verification -> admin queue"
        : "ETA: OTP -> admin queue";
    }
  }
}

export function renderLoginRole() {
  const session = getSession();
  dom.loginTabs?.querySelectorAll("[data-login-role]").forEach((button) => {
    button.classList.toggle("active", button.dataset.loginRole === session.loginRole);
  });
}

export function renderToasts() {
  const session = getSession();
  const toasts = Array.isArray(session.toasts) ? session.toasts : [];
  dom.toastStack.innerHTML = toasts.map((toast) => `<article class="toast"><strong>${toast.title}</strong><div>${toast.message}</div></article>`).join("");
}

export function renderPortal() {
  const session = getSession();
  if (!session.currentUser) return;

  const user = session.currentUser;
  dom.portalTitle.textContent = `${user.role.charAt(0).toUpperCase() + user.role.slice(1)} Portal`;
  dom.portalRoleBadge.textContent = user.role.toUpperCase();
  dom.portalRoleBadge.className = `status-pill ${user.availability || "available"}`;
  dom.portalUserName.textContent = user.fullName || user.company || "WorkShift User";
  dom.portalSubtitle.textContent = user.role === "super_admin"
    ? "Platform configuration, commissions, feature flags, and master analytics"
    : user.role === "admin"
    ? "Verification, disputes, analytics, and risk moderation"
    : user.role === "employer"
    ? "Company, jobs, applicants, payments, and verification"
    : "Profile, jobs, wallet, reviews, notifications, and verification";

  const navItems = user.role === "super_admin"
    ? ["dashboard", "settings", "flags", "admins"]
    : user.role === "admin"
    ? ["dashboard", "verifications", "jobs", "disputes", "payments", "analytics"]
    : ["dashboard", "profile", "jobs", "documents"];

  dom.portalNav.innerHTML = navItems.map((item) => `<button class="role-tab ${session.activePortalView === item ? "active" : ""}" type="button" data-portal-view="${item}">${item.charAt(0).toUpperCase() + item.slice(1)}</button>`).join("");

  if (user.role === "worker") dom.portalContent.innerHTML = workerDashboard(user);
  if (user.role === "employer") dom.portalContent.innerHTML = employerDashboard(user);
  if (user.role === "admin") dom.portalContent.innerHTML = adminDashboard(user);
  if (user.role === "super_admin") dom.portalContent.innerHTML = superAdminDashboard(user);
}
