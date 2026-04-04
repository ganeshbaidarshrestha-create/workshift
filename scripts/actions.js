import { dom } from "./dom.js";
import { createUser, getSession, loginUser, logout, setLoginRole, setPortalView, setSignupMode, setSignupRole, setSignupStep, setWorkerJobsFilter, setWorkerJobSearch } from "./store.js";
import { renderLoginRole, renderPortal, renderPublicVisibility, renderSignupRole, renderToasts } from "./renderers.js";
import { closeAuthModal, getAuthRole, openAuthModal, openSignupRole, sendOtpFeedback, setAuthRole, submitAuth } from "./actions/public-actions.js";
import { adminAction, employerAction, exportCurrentRole, markDocumentUploaded, saveProfile, superAdminAction, updateMediaPreview, workerAction } from "./actions/portal-actions.js";

function handleSignupModeClick(event) {
  const button = event.target.closest("[data-signup-mode]");
  if (!button) return;
  setSignupMode(button.dataset.signupMode);
  renderSignupRole();
}

function handleWorkerEasySteps(event) {
  const button = event.target.closest("[data-step-action]");
  if (!button) return;
  const action = button.dataset.stepAction;
  if (action === "work") {
    setSignupStep("work");
    document.querySelector("#workerSkillPicker")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
  if (action === "verify") {
    setSignupStep("verify");
    setSignupMode("voice");
    document.querySelector("#signupModeTabs")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    dom.signupFeedback.textContent = "Choose OTP, assisted signup, or voice signup to continue verification.";
  }
  if (action === "photo") {
    setSignupStep("photo");
    document.querySelector("#photoPrepTray")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    dom.signupFeedback.textContent = "Prepare ID and selfie photos here. Final verification continues after account creation.";
  }
  renderSignupRole();
}

function handlePortalClicks(event) {
  const session = getSession();
  if (!session.currentUser) return;

  const portalViewButton = event.target.closest("[data-portal-view]");
  if (portalViewButton) {
    setPortalView(portalViewButton.dataset.portalView);
    renderPortal();
    return;
  }

  const upload = event.target.closest("[data-upload]");
  if (upload) return markDocumentUploaded(upload.dataset.upload);
  if (event.target.closest("[data-save-profile]")) return saveProfile();
  if (event.target.closest("[data-worker-apply]")) return workerAction("apply");
  if (event.target.closest("[data-worker-save]")) return workerAction("save");
  if (event.target.closest("[data-worker-open-job]")) return workerAction("open-job");
  if (event.target.closest("[data-worker-close-job]")) return workerAction("close-job");
  if (event.target.closest("[data-worker-checkin]")) return workerAction("checkin");
  if (event.target.closest("[data-worker-proof]")) return workerAction("proof");
  if (event.target.closest("[data-worker-withdraw]")) return workerAction("withdraw");
  if (event.target.closest("[data-worker-toggle-availability]")) return workerAction("toggle-availability");
  if (event.target.closest("[data-worker-map-toggle]")) return workerAction("toggle-map");
  if (event.target.closest("[data-worker-send-chat]")) return workerAction("send-chat");
  const workerJobsFilter = event.target.closest("[data-worker-jobs-filter]");
  if (workerJobsFilter) {
    setWorkerJobsFilter(workerJobsFilter.dataset.workerJobsFilter);
    renderPortal();
    return;
  }
  const workerQuickApply = event.target.closest("[data-worker-quick-apply]");
  if (workerQuickApply) return workerAction("quick-apply", workerQuickApply.dataset.workerQuickApply);
  const workerQuickOpen = event.target.closest("[data-worker-quick-open]");
  if (workerQuickOpen) return workerAction("quick-open", workerQuickOpen.dataset.workerQuickOpen);
  if (event.target.closest("[data-worker-job-search-apply]")) {
    const term = document.querySelector("#workerJobSearchTerm")?.value.trim() || "";
    const location = document.querySelector("#workerJobSearchLocation")?.value.trim() || "";
    const country = document.querySelector("#workerJobSearchCountry")?.value || "Nepal";
    setWorkerJobSearch(term, location, country);
    renderPortal();
    return;
  }
  if (event.target.closest("[data-worker-job-search-clear]")) {
    const termInput = document.querySelector("#workerJobSearchTerm");
    const locationInput = document.querySelector("#workerJobSearchLocation");
    const countryInput = document.querySelector("#workerJobSearchCountry");
    if (termInput) termInput.value = "";
    if (locationInput) locationInput.value = "";
    if (countryInput) countryInput.value = "Nepal";
    setWorkerJobSearch("", "", "Nepal");
    renderPortal();
    return;
  }
  const workerLocationChip = event.target.closest("[data-worker-location-chip]");
  if (workerLocationChip) {
    const location = workerLocationChip.dataset.workerLocationChip;
    const locationInput = document.querySelector("#workerJobSearchLocation");
    if (locationInput) locationInput.value = location;
    const term = document.querySelector("#workerJobSearchTerm")?.value.trim() || "";
    const country = document.querySelector("#workerJobSearchCountry")?.value || "Nepal";
    setWorkerJobSearch(term, location, country);
    renderPortal();
    return;
  }
  if (event.target.closest("[data-shortlist]")) return employerAction("shortlist");
  if (event.target.closest("[data-invite]")) return employerAction("invite");
  if (event.target.closest("[data-escrow]")) return employerAction("escrow");
  if (event.target.closest("[data-release-escrow]")) return employerAction("release-escrow");
  if (event.target.closest("[data-employer-map-toggle]")) return employerAction("toggle-map");
  if (event.target.closest("[data-employer-send-chat]")) return employerAction("send-chat");
  if (event.target.closest("[data-rate-worker]")) return employerAction("rate-worker");
  if (event.target.closest("[data-hire-worker]")) return employerAction("hire-worker");
  if (event.target.closest("[data-open-job-modal]")) return employerAction("open-job-modal");
  if (event.target.closest("[data-edit-job]")) return employerAction("edit-job");
  if (event.target.closest("[data-delete-job]")) return employerAction("delete-job");
  if (event.target.closest("[data-job-modal-next]")) return employerAction("job-modal-next");
  if (event.target.closest("[data-job-modal-back]")) return employerAction("job-modal-back");
  if (event.target.closest("[data-job-modal-cancel]")) return employerAction("cancel-job-modal");
  if (event.target.closest("[data-save-job-post]")) return employerAction("save-job-post");
  if (event.target.closest("[data-raise-bid]")) return employerAction("raise-bid");
  if (event.target.closest("[data-employer-search-skill]")) return employerAction("search-skill");
  if (event.target.closest("[data-employer-search-location]")) return employerAction("search-location");
  if (event.target.closest("[data-save-search]")) return employerAction("save-search");
  if (event.target.closest("[data-clear-search]")) return employerAction("clear-search");
  const searchLocationChip = event.target.closest("[data-search-location-chip]");
  if (searchLocationChip) return employerAction("search-location-chip", searchLocationChip.dataset.searchLocationChip);
  const savedSearch = event.target.closest("[data-apply-saved-search]");
  if (savedSearch) return employerAction("apply-saved-search", savedSearch.dataset.applySavedSearch);
  const removeSavedSearch = event.target.closest("[data-remove-saved-search]");
  if (removeSavedSearch) return employerAction("remove-saved-search", removeSavedSearch.dataset.removeSavedSearch);
  const filterChip = event.target.closest("[data-worker-filter]");
  if (filterChip) return employerAction("toggle-worker-filter", filterChip.dataset.workerFilter);
  const compareWorker = event.target.closest("[data-compare-worker]");
  if (compareWorker) return employerAction("toggle-compare-worker", compareWorker.dataset.compareWorker);
  const openWorkerProfile = event.target.closest("[data-open-worker-profile]");
  if (openWorkerProfile) return employerAction("open-worker-profile", openWorkerProfile.dataset.openWorkerProfile);
  if (event.target.closest("[data-close-worker-profile]")) return employerAction("close-worker-profile");
  const searchWorkerChat = event.target.closest("[data-search-worker-chat]");
  if (searchWorkerChat) return employerAction("search-worker-chat", searchWorkerChat.dataset.searchWorkerChat);
  const inviteSearchWorker = event.target.closest("[data-invite-search-worker]");
  if (inviteSearchWorker) return employerAction("invite-search-worker", inviteSearchWorker.dataset.inviteSearchWorker);
  const shortlistSearchWorker = event.target.closest("[data-shortlist-search-worker]");
  if (shortlistSearchWorker) return employerAction("shortlist-search-worker", shortlistSearchWorker.dataset.shortlistSearchWorker);
  const selectWorker = event.target.closest("[data-select-search-worker]");
  if (selectWorker) return employerAction("select-search-worker", selectWorker.dataset.selectSearchWorker);
  if (event.target.closest("[data-pause-job]")) return employerAction("pause-job");
  if (event.target.closest("[data-reopen-job]")) return employerAction("reopen-job");
  if (event.target.closest("[data-cancel-job]")) return employerAction("cancel-job");
  if (event.target.closest("[data-approve]")) return adminAction("approve");
  if (event.target.closest("[data-rerequest]")) return adminAction("rerequest");
  if (event.target.closest("[data-suspend]")) return adminAction("suspend");
  if (event.target.closest("[data-resolve]")) return adminAction("resolve");
  if (event.target.closest("[data-refund]")) return adminAction("refund");
  if (event.target.closest("[data-super-save-settings]")) return superAdminAction("save-settings");
  if (event.target.closest("[data-super-toggle-flag]")) return superAdminAction("toggle-flag");
  if (event.target.closest("[data-super-add-admin]")) return superAdminAction("add-admin");

  const removeAdmin = event.target.closest("[data-remove-admin]");
  if (removeAdmin) return superAdminAction("remove-admin", removeAdmin.dataset.removeAdmin);

  const directLink = event.target.closest("a[href]");
  if (directLink) return;

  const workerJob = event.target.closest("[data-select-worker-job]");
  if (workerJob) {
    session.selectedWorkerJob = workerJob.dataset.selectWorkerJob;
    renderPortal();
    return;
  }
  const employerJob = event.target.closest("[data-select-employer-job]");
  if (employerJob) {
    session.selectedEmployerJob = employerJob.dataset.selectEmployerJob;
    renderPortal();
    return;
  }
  const applicant = event.target.closest("[data-select-applicant]");
  if (applicant) {
    session.selectedApplicant = applicant.dataset.selectApplicant;
    renderPortal();
    return;
  }
  const queue = event.target.closest("[data-select-queue]");
  if (queue) {
    session.selectedQueue = queue.dataset.selectQueue;
    renderPortal();
    return;
  }
  const dispute = event.target.closest("[data-select-dispute]");
  if (dispute) {
    session.selectedDispute = dispute.dataset.selectDispute;
    renderPortal();
  }
}

export function bindEvents() {
  dom.signupTabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-signup-role]");
    if (!button) return;
    setSignupRole(button.dataset.signupRole);
    renderSignupRole();
  });

  dom.loginTabs?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-login-role]");
    if (!button) return;
    setLoginRole(button.dataset.loginRole);
    renderLoginRole();
  });

  dom.signupModeTabs?.addEventListener("click", handleSignupModeClick);
  dom.workerEasySteps?.addEventListener("click", handleWorkerEasySteps);

  dom.signupForm.addEventListener("click", (event) => {
    const skillButton = event.target.closest("[data-skill-choice]");
    if (!skillButton) return;
    const skillSelect = document.querySelector("#signupSkill");
    skillSelect.value = skillButton.dataset.skillChoice;
    setSignupStep("work");
    renderSignupRole();
  });

  document.querySelector("#signupSkill")?.addEventListener("change", () => {
    setSignupStep("work");
    renderSignupRole();
  });

  document.querySelector("#workerIdPhoto")?.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setSignupStep("photo");
    dom.photoPrepStatus.textContent = `ID photo ready: ${file.name}`;
    renderSignupRole();
  });

  document.querySelector("#workerSelfiePhoto")?.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setSignupStep("photo");
    const current = dom.photoPrepStatus.textContent;
    dom.photoPrepStatus.textContent = current && current !== "No photos selected yet."
      ? `${current} / Selfie ready: ${file.name}`
      : `Selfie ready: ${file.name}`;
    renderSignupRole();
  });

  dom.heroWorker.addEventListener("click", () => openSignupRole("worker"));
  dom.heroEmployer.addEventListener("click", () => openSignupRole("employer"));

  ["#signupName", "#signupContact", "#signupAssistedBy", "#signupVoiceLanguage", "#signupSkill"].forEach((selector) => {
    document.querySelector(selector)?.addEventListener("input", () => renderSignupRole());
    document.querySelector(selector)?.addEventListener("change", () => renderSignupRole());
  });

  dom.publicShell?.addEventListener("click", (event) => {
    const cta = event.target.closest("[data-cta-role]");
    if (!cta) return;
    event.preventDefault();
    openSignupRole(cta.dataset.ctaRole);
  });

  dom.sendOtp.addEventListener("click", sendOtpFeedback);

  dom.signupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const session = getSession();
    const fullName = document.querySelector("#signupName").value.trim();
    const contact = document.querySelector("#signupContact").value.trim();
    const company = document.querySelector("#signupCompany").value.trim();
    const assistedBy = document.querySelector("#signupAssistedBy")?.value.trim() || "";
    const voiceLanguage = document.querySelector("#signupVoiceLanguage")?.value || "Nepali";
    const payload = {
      role: session.signupRole,
      fullName,
      contact,
      company,
      skill: document.querySelector("#signupSkill").value,
      notes: document.querySelector("#signupNotes").value.trim(),
      onboardingMode: session.signupMode,
      assistedBy,
      voiceLanguage
    };
    if (!payload.fullName || !payload.contact) {
      dom.signupFeedback.textContent = "Please complete name and contact.";
      return;
    }
    if (payload.role === "employer" && !company) {
      dom.signupFeedback.textContent = "Please enter the company name for employer registration.";
      return;
    }
    if (payload.role === "worker" && session.signupMode === "assisted" && !assistedBy) {
      dom.signupFeedback.textContent = "Enter the helper or agent name to continue assisted registration.";
      return;
    }
    createUser(payload);
    const createdUser = getSession().currentUser;
    dom.signupFeedback.textContent = payload.role === "worker" && session.signupMode === "assisted"
      ? `Assisted worker account created. ID: ${createdUser?.id || "being prepared"}. Review state: awaiting admin approval with helper verification noted.`
      : payload.role === "worker" && session.signupMode === "voice"
      ? `Voice signup account created. ID: ${createdUser?.id || "being prepared"}. Review state: queued for admin approval after guided verification.`
      : `Account created. Your ${payload.role} ID is ${createdUser?.id || "being prepared"}. Admin approval status: ${createdUser?.verificationStatus || "Pending"}.`;
    renderPublicVisibility();
    renderPortal();
    renderToasts();
    event.target.reset();
    renderSignupRole();
  });

  dom.loginForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const session = getSession();
    const contact = document.querySelector("#loginContact")?.value.trim();
    if (!contact) {
      dom.loginFeedback.textContent = "Enter your registered phone or email first.";
      return;
    }
    const user = loginUser(session.loginRole, contact);
    if (!user) {
      dom.loginFeedback.textContent = "No matching account was found for that role and contact.";
      return;
    }
    dom.loginFeedback.textContent = `${user.verificationStatus} account found. Opening dashboard for ${user.fullName || user.company}.`;
    renderPublicVisibility();
    renderPortal();
    renderToasts();
    event.target.reset();
  });

  dom.authRoleTabs?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-auth-role]");
    if (!button) return;
    setAuthRole(button.dataset.authRole);
    dom.authRoleTabs.querySelectorAll("[data-auth-role]").forEach((item) => {
      item.classList.toggle("active", item.dataset.authRole === getAuthRole());
    });
  });

  dom.authBackdrop?.addEventListener("click", closeAuthModal);
  dom.authCancel?.addEventListener("click", closeAuthModal);
  dom.authSubmit?.addEventListener("click", submitAuth);
  dom.authCode?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") submitAuth();
  });

  window.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "a") {
      event.preventDefault();
      openAuthModal("admin");
    }
    if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "s") {
      event.preventDefault();
      openAuthModal("super_admin");
    }
    if (event.key === "Escape" && !dom.authModal?.classList.contains("is-hidden")) {
      closeAuthModal();
    }
  });

  dom.portalNav.addEventListener("click", (event) => {
    const button = event.target.closest("[data-portal-view]");
    if (!button) return;
    setPortalView(button.dataset.portalView);
    renderPortal();
  });

  dom.portalContent.addEventListener("click", handlePortalClicks);

  dom.portalContent.addEventListener("change", (event) => {
    const input = event.target?.closest?.("input[type='file']");
    if (!input) return;
    const file = input.files?.[0];
    if (!file) return;
    if (input.matches("[data-preview-upload='worker-photo']")) return updateMediaPreview("worker-photo", file);
    if (input.matches("[data-preview-upload='employer-logo']")) return updateMediaPreview("employer-logo", file);
  });

  dom.portalContent.addEventListener("keydown", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;
    if (!target.matches("#employerSearchSkill, #employerSearchLocation")) return;
    if (event.key !== "Enter") return;
    event.preventDefault();
    employerAction("search-skill");
  });

  dom.portalContent.addEventListener("change", (event) => {
    const select = event.target?.closest?.("[data-sort-workers]");
    if (!select) return;
    employerAction("set-sort", select.value);
  });

  dom.portalExport.addEventListener("click", exportCurrentRole);
  dom.logoutButton.addEventListener("click", () => {
    logout();
    renderPublicVisibility();
    renderToasts();
  });

  window.addEventListener("workshift:toast-change", renderToasts);
}
