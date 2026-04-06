import { dom } from "../dom.js";
import { addActivity, getSession, loginAdmin, loginSuperAdmin, pushToast, setSignupEmployerType, setSignupRole, setSignupStep, validateAdminCode } from "../store.js";
import { getSupabaseProfileForCurrentSession, requestSupabaseOtp, supabaseEnabled } from "../supabase.js";
import { renderPortal, renderPublicVisibility, renderSignupRole, renderToasts } from "../renderers.js";

let authRole = "admin";

export function getAuthRole() {
  return authRole;
}

export function setAuthRole(role) {
  authRole = role;
}

export function openSignupRole(role, employerType = "business") {
  setSignupRole(role);
  if (role === "employer") {
    setSignupEmployerType(employerType);
  }
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
  const liveMode = supabaseEnabled();
  dom.authContactField?.classList.toggle("is-hidden", !liveMode);
  dom.authOtpRow?.classList.toggle("is-hidden", !liveMode);
  if (dom.authHelper) {
    dom.authHelper.textContent = liveMode
      ? "Use your approved admin or super-admin work contact to request OTP, then finish sign-in from the live Supabase session."
      : "This entry is hidden from public users. Use a valid internal access code to continue.";
  }
  if (dom.authContact) {
    dom.authContact.value = "";
  }
  if (dom.authCode) {
    dom.authCode.value = "";
    if (!liveMode) dom.authCode.focus();
  }
  if (liveMode) dom.authContact?.focus();
}

export function closeAuthModal() {
  dom.authModal?.classList.add("is-hidden");
  dom.authModal?.setAttribute("aria-hidden", "true");
  if (dom.authFeedback) dom.authFeedback.textContent = "";
}

export async function requestAuthOtp() {
  const contact = dom.authContact?.value.trim();
  if (!supabaseEnabled()) {
    dom.authFeedback.textContent = "Live admin OTP is only available when Supabase is configured.";
    return;
  }
  if (!contact) {
    dom.authFeedback.textContent = "Enter your approved admin work contact first.";
    return;
  }
  const result = await requestSupabaseOtp(contact, {
    shouldCreateUser: false,
    data: {
      role: authRole
    }
  });
  if (!result.ok) {
    dom.authFeedback.textContent = `Could not start admin verification: ${result.error}`;
    pushToast("Admin auth", result.error || "OTP request failed.");
    renderToasts();
    return;
  }
  dom.authFeedback.textContent = `OTP or magic link requested for ${contact}. Complete verification, then click Enter Secure Portal.`;
  pushToast("Admin auth", `Verification requested for ${contact}.`);
  renderToasts();
}

export async function submitAuth() {
  if (supabaseEnabled()) {
    const authState = await getSupabaseProfileForCurrentSession();
    if (!authState.ok || !authState.profile) {
      dom.authFeedback.textContent = authState.error || "Complete the OTP sign-in first, then try again.";
      return;
    }
    const role = String(authState.profile.role || "");
    if (role !== authRole) {
      dom.authFeedback.textContent = `Authenticated role is ${role || "unknown"}, but ${authRole} access is required.`;
      return;
    }

    if (authRole === "admin") {
      loginAdmin();
      getSession().currentUser.id = authState.profile.id;
      getSession().currentUser.fullName = authState.profile.full_name || getSession().currentUser.fullName;
      getSession().currentUser.contact = authState.profile.contact || getSession().currentUser.contact;
      addActivity("Authenticated live admin access opened.");
      pushToast("Admin access", "Live admin dashboard loaded from Supabase session.");
    } else {
      loginSuperAdmin();
      getSession().currentUser.id = authState.profile.id;
      getSession().currentUser.fullName = authState.profile.full_name || getSession().currentUser.fullName;
      getSession().currentUser.contact = authState.profile.contact || getSession().currentUser.contact;
      addActivity("Authenticated live super admin access opened.");
      pushToast("Super admin access", "Live super admin dashboard loaded from Supabase session.");
    }

    closeAuthModal();
    renderPublicVisibility();
    renderPortal();
    renderToasts();
    window.dispatchEvent(new CustomEvent("workshift:hydrate-supabase"));
    return;
  }

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

export async function sendOtpFeedback() {
  const session = getSession();
  const contact = document.querySelector("#signupContact")?.value.trim();
  if (!contact) {
    dom.signupFeedback.textContent = "Enter phone or email first to continue verification.";
    return;
  }
  setSignupStep("verify");
  if (supabaseEnabled()) {
    const result = await requestSupabaseOtp(contact, {
      shouldCreateUser: true,
      data: {
        role: session.signupRole,
        accountType: session.signupRole === "employer" ? session.signupEmployerType : "",
        onboardingMode: session.signupMode
      }
    });
    if (!result.ok) {
      dom.signupFeedback.textContent = `Supabase verification could not start: ${result.error}`;
      pushToast("Supabase auth", result.error || "Failed to start OTP.");
      renderSignupRole();
      renderToasts();
      return;
    }

    const deliveryLabel = contact.includes("@") ? "magic link / email OTP" : "phone OTP";
    dom.signupFeedback.textContent = `Supabase ${deliveryLabel} requested for ${contact}. Complete verification with the delivered code or link, then continue account setup.`;
    pushToast("Supabase auth", `Real ${deliveryLabel} request sent for ${contact}.`);
    renderSignupRole();
    renderToasts();
    return;
  }
  const modeLabel = session.signupMode === "voice" ? "Voice onboarding call initiated" : "OTP sent";
  dom.signupFeedback.textContent = session.signupMode === "voice"
    ? `Voice signup started for ${contact}. Follow the guided prompts shown on screen.`
    : `OTP sent to ${contact}. Continue registration after verification.`;
  pushToast(modeLabel, session.signupMode === "voice" ? "Local-language voice onboarding simulated successfully." : "Verification code simulated successfully.");
  renderSignupRole();
  renderToasts();
}
