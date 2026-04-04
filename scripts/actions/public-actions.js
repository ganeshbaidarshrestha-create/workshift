import { dom } from "../dom.js";
import { addActivity, getSession, loginAdmin, loginSuperAdmin, pushToast, setSignupRole, setSignupStep, validateAdminCode } from "../store.js";
import { renderPortal, renderPublicVisibility, renderSignupRole, renderToasts } from "../renderers.js";

let authRole = "admin";

export function getAuthRole() {
  return authRole;
}

export function setAuthRole(role) {
  authRole = role;
}

export function openSignupRole(role) {
  setSignupRole(role);
  renderSignupRole();
  const section = document.querySelector("#signup");
  section?.scrollIntoView({ behavior: "smooth" });
  window.setTimeout(() => {
    document.querySelector("#signupName")?.focus();
  }, 120);
}

export function openAuthModal(role = "admin") {
  authRole = role;
  dom.authModal?.classList.remove("is-hidden");
  dom.authModal?.setAttribute("aria-hidden", "false");
  dom.authRoleTabs?.querySelectorAll("[data-auth-role]").forEach((button) => {
    button.classList.toggle("active", button.dataset.authRole === authRole);
  });
  if (dom.authFeedback) dom.authFeedback.textContent = "";
  if (dom.authCode) {
    dom.authCode.value = "";
    dom.authCode.focus();
  }
}

export function closeAuthModal() {
  dom.authModal?.classList.add("is-hidden");
  dom.authModal?.setAttribute("aria-hidden", "true");
  if (dom.authFeedback) dom.authFeedback.textContent = "";
}

export function submitAuth() {
  const code = dom.authCode?.value.trim();
  const validAdmin = authRole === "admin" && validateAdminCode("admin", code);
  const validSuper = authRole === "super_admin" && validateAdminCode("super_admin", code);

  if (!validAdmin && !validSuper) {
    dom.authFeedback.textContent = "Authorization failed. Use a valid internal access code.";
    return;
  }

  if (authRole === "admin") {
    loginAdmin();
    addActivity("Authorized admin access opened.");
    pushToast("Admin access", "Secure admin dashboard loaded.");
  } else {
    loginSuperAdmin();
    addActivity("Authorized super admin access opened.");
    pushToast("Super admin access", "Secure platform control dashboard loaded.");
  }

  closeAuthModal();
  renderPublicVisibility();
  renderPortal();
  renderToasts();
}

export function sendOtpFeedback() {
  const session = getSession();
  const contact = document.querySelector("#signupContact")?.value.trim();
  if (!contact) {
    dom.signupFeedback.textContent = "Enter phone or email first to continue verification.";
    return;
  }
  setSignupStep("verify");
  const modeLabel = session.signupMode === "voice" ? "Voice onboarding call initiated" : "OTP sent";
  dom.signupFeedback.textContent = session.signupMode === "voice"
    ? `Voice signup started for ${contact}. Follow the guided prompts shown on screen.`
    : `OTP sent to ${contact}. Continue registration after verification.`;
  pushToast(modeLabel, session.signupMode === "voice" ? "Local-language voice onboarding simulated successfully." : "Verification code simulated successfully.");
  renderSignupRole();
  renderToasts();
}
