import { bindEvents } from "./actions.js";
import { dom } from "./dom.js";
import { scoreWorkersForJob } from "./matching.js";
import { getSession } from "./store.js";
import { renderLoginRole, renderPortal, renderPublicVisibility, renderSignupRole, renderToasts } from "./renderers.js";

function initTestimonials() {
  if (!dom.testimonialTrack || !dom.testimonialDots) return;

  const cards = Array.from(dom.testimonialTrack.querySelectorAll(".testimonial-card"));
  const dots = Array.from(dom.testimonialDots.querySelectorAll(".testimonial-dot"));
  if (!cards.length || !dots.length) return;

  let activeIndex = 0;
  let rotationId = null;

  const showSlide = (index) => {
    activeIndex = (index + cards.length) % cards.length;
    cards.forEach((card, cardIndex) => card.classList.toggle("is-active", cardIndex === activeIndex));
    dots.forEach((dot, dotIndex) => dot.classList.toggle("is-active", dotIndex === activeIndex));
  };

  const startRotation = () => {
    window.clearInterval(rotationId);
    rotationId = window.setInterval(() => showSlide(activeIndex + 1), 3200);
  };

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      startRotation();
    });
  });

  showSlide(0);
  startRotation();
}

function installSmokeErrorCapture() {
  const params = new URLSearchParams(window.location.search);
  if (!params.get("smoke")) return;

  const writeError = (label, detail) => {
    const existing = document.querySelector("#smokeError");
    const pre = existing || document.createElement("pre");
    pre.id = "smokeError";
    pre.style.whiteSpace = "pre-wrap";
    pre.textContent = `${label}: ${detail}`;
    if (!existing) document.body.appendChild(pre);
  };

  window.addEventListener("error", (event) => {
    writeError("ERROR", `${event.message} @ ${event.filename || "inline"}:${event.lineno || 0}`);
  });

  window.addEventListener("unhandledrejection", (event) => {
    writeError("REJECTION", event.reason?.message || String(event.reason));
  });
}

function runSmokeTests() {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get("smoke");
  if (!mode) return;

  const results = [];
  const record = (name, pass) => results.push(`${pass ? "PASS" : "FAIL"}: ${name}`);
  const step = (name, fn) => {
    try {
      record(name, Boolean(fn()));
    } catch (error) {
      record(name, false);
      results.push(`ERROR: ${name} -> ${error.message}`);
    }
  };

  step("Public registration CTAs switch roles correctly", () => {
    document.querySelector("#heroEmployer").click();
    const employerTabActive = document.querySelector("[data-signup-role='employer']").classList.contains("active");
    document.querySelector("[data-cta-role='worker']").click();
    const workerTabActive = document.querySelector("[data-signup-role='worker']").classList.contains("active");
    return employerTabActive && workerTabActive;
  });

  document.querySelector("#signupName").value = "Test Worker";
  document.querySelector("#signupContact").value = "worker@example.com";
  document.querySelector("#signupForm").requestSubmit();
  step("Worker registration opens private portal", () => !dom.portalShell.classList.contains("is-hidden"));

  step("Worker apply works", () => {
    document.querySelector("[data-worker-open-job]").click();
    document.querySelector("[data-worker-apply]").click();
    return getSession().currentUser.jobs[0].applied === true;
  });

  step("Worker chat and map toggle work", () => {
    document.querySelector("[data-worker-map-toggle]").click();
    document.querySelector("#chatInput").value = "Worker live update";
    document.querySelector("[data-worker-send-chat]").click();
    return getSession().currentUser.mapView === "list" && getSession().currentUser.chatStream.at(-1).text.includes("live shift thread");
  });

  step("Worker document upload works", () => {
    document.querySelector("[data-portal-view='documents']").click();
    document.querySelector("[data-upload='worker:wid']").click();
    return getSession().currentUser.documents[0].status === "Uploaded";
  });

  step("Worker profile photo preview works", () => {
    document.querySelector("[data-portal-view='profile']").click();
    const input = document.querySelector("[data-preview-upload='worker-photo']");
    const file = new File(["x"], "worker-photo.png", { type: "image/png" });
    Object.defineProperty(input, "files", { value: [file], configurable: true });
    input.dispatchEvent(new Event("change", { bubbles: true }));
    return getSession().currentUser.profile.photo === "worker-photo.png";
  });

  step("Admin access opens separate dashboard", () => {
    document.querySelector("#logoutButton").click();
    document.querySelector("#authRoleTabs [data-auth-role='admin']").click();
    document.querySelector("#authCode").value = "ADMIN2026";
    document.querySelector("#authSubmit").click();
    return getSession().currentUser.role === "admin";
  });

  step("Admin approve works", () => {
    document.querySelector("[data-approve]").click();
    return getSession().currentUser.queue[0].status === "Approved";
  });

  step("Worker login restores approved dashboard", () => {
    document.querySelector("#logoutButton").click();
    document.querySelector("[data-login-role='worker']").click();
    document.querySelector("#loginContact").value = "worker@example.com";
    document.querySelector("#loginForm").requestSubmit();
    return getSession().currentUser.role === "worker" && getSession().currentUser.verificationStatus === "Approved";
  });

  if (mode === "2") {
    step("Employer registration works", () => {
      document.querySelector("#logoutButton").click();
      document.querySelector("[data-signup-role='employer']").click();
      document.querySelector("#signupName").value = "Owner";
      document.querySelector("#signupContact").value = "owner@example.com";
      document.querySelector("#signupCompany").value = "Builder Co";
      document.querySelector("#signupForm").requestSubmit();
      return getSession().currentUser.role === "employer";
    });

    step("Admin can approve employer and employer sees approval later", () => {
      const employerId = getSession().currentUser.id;
      document.querySelector("#logoutButton").click();
      document.querySelector("#authRoleTabs [data-auth-role='admin']").click();
      document.querySelector("#authCode").value = "ADMIN2026";
      document.querySelector("#authSubmit").click();
      const employerQueue = Array.from(document.querySelectorAll("[data-select-queue]")).find((item) => item.textContent.includes("Builder Co"));
      employerQueue?.click();
      document.querySelector("[data-approve]").click();
      document.querySelector("#logoutButton").click();
      document.querySelector("[data-login-role='employer']").click();
      document.querySelector("#loginContact").value = "owner@example.com";
      document.querySelector("#loginForm").requestSubmit();
      const user = getSession().currentUser;
      return user.role === "employer"
        && user.id === employerId
        && user.verificationStatus === "Approved"
        && user.profile.verificationBadge === "Verified";
    });

    step("Worker can apply to a real employer job", () => {
      document.querySelector("#logoutButton").click();
      document.querySelector("[data-login-role='worker']").click();
      document.querySelector("#loginContact").value = "worker@example.com";
      document.querySelector("#loginForm").requestSubmit();
      const employerCard = document.querySelector("[data-select-worker-job='e1']");
      employerCard?.click();
      document.querySelector("[data-worker-open-job]").click();
      document.querySelector("[data-worker-apply]").click();
      const user = getSession().currentUser;
      return user.role === "worker" && user.jobs.some((item) => item.id === "e1" && item.applied);
    });

    step("Employer dashboard surfaces key features visibly", () => {
      document.querySelector("#logoutButton").click();
      document.querySelector("[data-login-role='employer']").click();
      document.querySelector("#loginContact").value = "owner@example.com";
      document.querySelector("#loginForm").requestSubmit();
      const text = document.querySelector("#portalContent")?.textContent || "";
      return text.includes("Employer Command Center")
        && text.includes("Hiring Pipeline")
        && text.includes("Applicant Chat")
        && text.includes("Notifications Center");
    });

    step("Employer can open worker profile, search, and chat from search panel", () => {
      document.querySelector("#employerSearchSkill").value = "cleaning";
      document.querySelector("#employerSearchLocation").value = "Lalitpur";
      document.querySelector("[data-employer-search-skill]").click();
      const resultsText = document.querySelector(".compact-search-results")?.textContent || "";
      const firstProfileButton = document.querySelector("[data-open-worker-profile]");
      firstProfileButton?.click();
      const profileOpened = getSession().workerProfileModalOpen === true;
      document.querySelector("[data-close-worker-profile]")?.click();
      document.querySelector("[data-select-search-worker]")?.click();
      document.querySelector("#searchWorkerChatInput").value = "Can you take tomorrow's cleaning shift?";
      document.querySelector("[data-search-worker-chat]").click();
      const employerUser = getSession().currentUser;
      const applicantWithThread = employerUser.applicants.find((item) => Array.isArray(item.chatThread) && item.chatThread.some((msg) => msg.text.includes("tomorrow's cleaning shift")));
      return resultsText.includes("Mina Gurung")
        && !resultsText.includes("Aarav Tamang")
        && profileOpened
        && Boolean(applicantWithThread);
    });

    step("AI matching ranks and notifies workers", () => {
      const ranked = scoreWorkersForJob(getSession().currentUser.jobs[0], getSession().currentUser.workerPool);
      return ranked.length > 1 && ranked[0].matchScore >= ranked[1].matchScore && ranked.some((worker) => worker.notify);
    });

    step("Employer saved search remove and sorting work", () => {
      const sortSelect = document.querySelector("[data-sort-workers]");
      sortSelect.value = "nearest";
      sortSelect.dispatchEvent(new Event("change", { bubbles: true }));
      const countBefore = document.querySelectorAll("[data-apply-saved-search]").length;
      document.querySelector("[data-remove-saved-search]")?.click();
      const countAfter = document.querySelectorAll("[data-apply-saved-search]").length;
      return getSession().employerSortBy === "nearest" && countAfter === Math.max(0, countBefore - 1);
    });

    step("Employer map, chat, and escrow actions work", () => {
      document.querySelector("[data-employer-map-toggle]").click();
      document.querySelector("#chatInput").value = "Employer broadcast";
      document.querySelector("[data-employer-send-chat]").click();
      document.querySelector("[data-release-escrow]").click();
      return getSession().currentUser.mapView === "list"
        && getSession().currentUser.chatStream.at(-1).text.includes("live")
        && getSession().currentUser.escrow.status === "Released";
    });

    step("Employer wage bidding works", () => {
      document.querySelector("#bidIncreaseAmount").value = "12";
      document.querySelector("[data-raise-bid]").click();
      return getSession().currentUser.jobs[0].dailyRate >= 102 && getSession().currentUser.jobs[0].urgency === "Boosted";
    });

    step("Employer hiring pipeline and applicant chat work", () => {
      document.querySelector("[data-portal-view='jobs']").click();
      const workerApplicant = getSession().currentUser.applicants[0];
      document.querySelector(`[data-select-applicant='${workerApplicant.id}']`)?.click();
      document.querySelector("[data-shortlist]").click();
      document.querySelector("[data-invite]").click();
      document.querySelector("[data-hire-worker]").click();
      document.querySelector("#chatInput").value = "Please report to Gate 2 by 6:30 AM";
      document.querySelector("[data-employer-send-chat]").click();
      document.querySelector("[data-rate-worker]").click();
      const selected = getSession().currentUser.applicants.find((item) => item.id === workerApplicant.id);
      return selected.status === "Rated"
        && selected.chatThread.at(-1).text.includes("hiring chat")
        && getSession().currentUser.jobs[0].status === "Ongoing";
    });

    step("Worker sees employer status and mirrored chat after hiring", () => {
      document.querySelector("#logoutButton").click();
      document.querySelector("[data-login-role='worker']").click();
      document.querySelector("#loginContact").value = "worker@example.com";
      document.querySelector("#loginForm").requestSubmit();
      const user = getSession().currentUser;
      return user.role === "worker"
        && user.applications.some((item) => item.title === "50 Harvest Workers" && ["Shortlisted", "Invited", "Hired", "Rated"].includes(item.status))
        && user.chatStream.some((item) => item.from === "Employer" && item.text.includes("Please report to Gate 2"));
    });

    step("Employer job lifecycle and logo preview work", () => {
      document.querySelector("#logoutButton").click();
      document.querySelector("[data-login-role='employer']").click();
      document.querySelector("#loginContact").value = "owner@example.com";
      document.querySelector("#loginForm").requestSubmit();
      document.querySelector("[data-pause-job]").click();
      const paused = getSession().currentUser.jobs[0].status === "Paused";
      document.querySelector("[data-reopen-job]").click();
      const reopened = getSession().currentUser.jobs[0].status === "Open";
      document.querySelector("[data-portal-view='profile']").click();
      const input = document.querySelector("[data-preview-upload='employer-logo']");
      const file = new File(["x"], "builder-logo.png", { type: "image/png" });
      Object.defineProperty(input, "files", { value: [file], configurable: true });
      input.dispatchEvent(new Event("change", { bubbles: true }));
      return paused && reopened && getSession().currentUser.profile.logo === "builder-logo.png";
    });

    step("Employer profile, docs, and job draft work", () => {
      document.querySelector("[data-portal-view='documents']").click();
      document.querySelector("[data-upload='employer:ereg']").click();
      document.querySelector("[data-portal-view='jobs']").click();
      document.querySelector("[data-open-job-modal]").click();
      document.querySelector("#jobPostTitle").value = "Warehouse Night Crew";
      document.querySelector("#jobPostLocation").value = "Lalitpur";
      document.querySelector("#jobPostHeadcount").value = "6";
      document.querySelector("[data-job-modal-next]").click();
      document.querySelector("#jobPostRate").value = "110";
      document.querySelector("#jobPostSkills").value = "warehouse, loading, inventory";
      document.querySelector("[data-job-modal-next]").click();
      document.querySelector("[data-save-job-post]").click();
      return getSession().currentUser.documents[0].status === "Uploaded"
        && getSession().currentUser.jobs[0].status === "Open"
        && getSession().currentUser.jobs[0].title === "Warehouse Night Crew";
    });

    step("Employer can edit and update an existing job", () => {
      document.querySelector("[data-edit-job]").click();
      document.querySelector("#jobPostTitle").value = "Warehouse Night Crew Updated";
      document.querySelector("#jobPostLocation").value = "Bhaktapur";
      document.querySelector("[data-job-modal-next]").click();
      document.querySelector("#jobPostRate").value = "145";
      document.querySelector("#jobPostSkills").value = "warehouse, loading, dispatch";
      document.querySelector("[data-job-modal-next]").click();
      document.querySelector("[data-save-job-post]").click();
      const updatedJob = getSession().currentUser.jobs.find((item) => item.id === getSession().selectedEmployerJob);
      return updatedJob?.title === "Warehouse Night Crew Updated"
        && updatedJob?.location === "Bhaktapur"
        && updatedJob?.dailyRate === 145;
    });

    step("Super admin access and settings work", () => {
      document.querySelector("#logoutButton").click();
      document.querySelector("#authRoleTabs [data-auth-role='super_admin']").click();
      document.querySelector("#authCode").value = "ROOT2026";
      document.querySelector("#authSubmit").click();
      document.querySelector("[data-super-toggle-flag]").click();
      document.querySelector("#newAdminName").value = "QA Admin";
      document.querySelector("[data-super-add-admin]").click();
      document.querySelector("[data-remove-admin]").click();
      return getSession().currentUser.role === "super_admin" && typeof getSession().currentUser.featureFlags[0].enabled === "boolean";
    });
  }

  const report = document.createElement("pre");
  report.id = "smokeReport";
  report.textContent = results.join("\n");
  report.style.whiteSpace = "pre-wrap";
  document.body.appendChild(report);
}

function init() {
  try {
    installSmokeErrorCapture();
    bindEvents();
    initTestimonials();
    renderSignupRole();
    renderLoginRole();
    renderPublicVisibility();
    renderPortal();
    renderToasts();
    runSmokeTests();
    window.__workshiftBooted = true;
    document.body.dataset.workshiftReady = "true";
  } catch (error) {
    window.__workshiftBooted = false;
    if (typeof window.__workshiftShowIssue === "function") {
      window.__workshiftShowIssue(`Interactive startup failed: ${error.message}`);
    }
    throw error;
  }
}

init();
