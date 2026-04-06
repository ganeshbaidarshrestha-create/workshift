import { countryName, formatCountryMoney, getCountryRule } from "./country-rules.js";
import { adminTemplate, cloneTemplate, employerTemplate, householdEmployerTemplate, superAdminTemplate, workerTemplate } from "./data.js";

const SUPABASE_PENDING_SIGNUP_KEY = "workshift_supabase_pending_signup_v1";

export function getSupabaseSettings() {
  const settings = window.WORKSHIFT_SUPABASE || {};
  return {
    url: String(settings.url || "").trim(),
    anonKey: String(settings.anonKey || "").trim(),
    siteUrl: String(settings.siteUrl || window.location.origin || "").trim(),
    storageKey: String(settings.storageKey || "workshift_supabase_auth_v1").trim(),
    documentBucket: String(settings.documentBucket || "workshift-documents").trim(),
    evidenceBucket: String(settings.evidenceBucket || "workshift-evidence").trim(),
    enabled: Boolean(settings.enabled),
    demoFallback: settings.demoFallback !== false
  };
}

export function supabaseEnabled() {
  const settings = getSupabaseSettings();
  return Boolean(
    settings.enabled
    && settings.url
    && settings.anonKey
    && window.supabase
    && typeof window.supabase.createClient === "function"
  );
}

let supabaseClientInstance = null;

export function getSupabaseClient() {
  if (!supabaseEnabled()) return null;
  if (supabaseClientInstance) return supabaseClientInstance;
  const settings = getSupabaseSettings();
  supabaseClientInstance = window.supabase.createClient(settings.url, settings.anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      storageKey: settings.storageKey
    }
  });
  return supabaseClientInstance;
}

export function normalizeSupabaseContact(contact = "") {
  return String(contact).trim();
}

export function isEmailContact(contact = "") {
  return normalizeSupabaseContact(contact).includes("@");
}

export function savePendingSupabaseSignup(payload) {
  try {
    window.localStorage.setItem(SUPABASE_PENDING_SIGNUP_KEY, JSON.stringify(payload));
  } catch {
    return null;
  }
  return payload;
}

export function loadPendingSupabaseSignup() {
  try {
    const raw = window.localStorage.getItem(SUPABASE_PENDING_SIGNUP_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearPendingSupabaseSignup() {
  try {
    window.localStorage.removeItem(SUPABASE_PENDING_SIGNUP_KEY);
  } catch {
    return null;
  }
  return null;
}

export async function requestSupabaseOtp(contact, options = {}) {
  if (!supabaseEnabled()) {
    return { ok: false, error: "Supabase is not configured for this environment." };
  }

  const client = getSupabaseClient();
  const normalizedContact = normalizeSupabaseContact(contact);
  const {
    shouldCreateUser = true,
    data = {}
  } = options;

  if (!normalizedContact) {
    return { ok: false, error: "Contact is required." };
  }

  const authPayload = isEmailContact(normalizedContact)
    ? {
      email: normalizedContact,
      options: {
        shouldCreateUser,
        emailRedirectTo: getSupabaseSettings().siteUrl,
        data
      }
    }
    : {
      phone: normalizedContact,
      options: {
        shouldCreateUser,
        data
      }
    };

  const { data: response, error } = await client.auth.signInWithOtp(authPayload);
  return {
    ok: !error,
    data: response || null,
    error: error?.message || ""
  };
}

export async function getSupabaseSession() {
  const client = getSupabaseClient();
  if (!client) return { session: null, user: null };
  const { data } = await client.auth.getSession();
  return {
    session: data.session || null,
    user: data.session?.user || null
  };
}

export async function getSupabaseProfile() {
  const client = getSupabaseClient();
  const authState = await getSupabaseSession();
  if (!client || !authState.user) return null;
  const { data, error } = await client
    .from("profiles")
    .select("*")
    .eq("id", authState.user.id)
    .maybeSingle();

  if (error) return null;
  return data || null;
}

export async function getSupabaseProfileForCurrentSession() {
  const authState = await getSupabaseSession();
  if (!authState.user) {
    return { ok: false, error: "No authenticated Supabase session found.", profile: null, user: null };
  }
  const profile = await getSupabaseProfile();
  return {
    ok: Boolean(profile),
    error: profile ? "" : "No matching Supabase profile found for the current session.",
    profile,
    user: authState.user
  };
}

function supabaseAuthContact(user) {
  return String(user?.phone || user?.email || user?.user_metadata?.contact || "").trim();
}

function timezoneSafeNow() {
  return new Date().toISOString();
}

function storageSafeFileName(name = "file") {
  return String(name || "file")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "") || "file";
}

async function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("File reading failed."));
    reader.readAsDataURL(file);
  });
}

export async function ensureSupabaseProfileFromAuth() {
  const authState = await getSupabaseSession();
  if (!authState.user) return null;

  const existingProfile = await getSupabaseProfile();
  if (existingProfile) return existingProfile;

  const pendingSignup = loadPendingSupabaseSignup();
  const metadata = authState.user.user_metadata || {};
  const fallbackRole = String(metadata.role || pendingSignup?.role || "worker").trim();
  const payload = {
    role: fallbackRole,
    accountType: pendingSignup?.accountType || metadata.accountType || metadata.account_type || "business",
    fullName: pendingSignup?.fullName || metadata.fullName || metadata.full_name || "",
    contact: pendingSignup?.contact || supabaseAuthContact(authState.user),
    company: pendingSignup?.company || metadata.company || metadata.company_name || "",
    homeLabel: pendingSignup?.homeLabel || metadata.homeLabel || "",
    serviceAddress: pendingSignup?.serviceAddress || metadata.serviceAddress || "",
    countryCode: pendingSignup?.countryCode || metadata.countryCode || metadata.country_code || "NP",
    notes: pendingSignup?.notes || "",
    verificationStatus: "Pending",
    onboardingMode: pendingSignup?.onboardingMode || metadata.onboardingMode || metadata.onboarding_mode || "self",
    assistedBy: pendingSignup?.assistedBy || metadata.assistedBy || "",
    voiceLanguage: pendingSignup?.voiceLanguage || metadata.voiceLanguage || ""
  };

  const result = await upsertSupabaseProfile(payload);
  if (result.ok) clearPendingSupabaseSignup();
  return result.data || null;
}

export async function upsertSupabaseProfile(profile) {
  const client = getSupabaseClient();
  const authState = await getSupabaseSession();
  if (!client || !authState.user) {
    return { ok: false, error: "No authenticated Supabase user found." };
  }
  const countryRule = getCountryRule(profile.countryCode || "NP");

  const payload = {
    id: authState.user.id,
    role: profile.role,
    account_type: profile.accountType || "business",
    full_name: profile.fullName || "",
    contact: profile.contact || "",
    company_name: profile.company || "",
    country_code: countryRule.code,
    currency_code: countryRule.currencyCode,
    phone_auth_mode: countryRule.phoneAuthMode,
    payout_rail: countryRule.payoutRail,
    verification_rule: countryRule.verificationRule,
    verification_status: profile.verificationStatus || "Pending",
    notes: profile.notes || "",
    metadata: {
      countryName: countryRule.name,
      accountType: profile.accountType || "business",
      onboardingMode: profile.onboardingMode || "self",
      assistedBy: profile.assistedBy || "",
      voiceLanguage: profile.voiceLanguage || "",
      serviceAddress: profile.serviceAddress || ""
    }
  };

  const { data, error } = await client
    .from("profiles")
    .upsert(payload)
    .select("*")
    .single();

  if (!error && data) {
    await ensureSupabaseVerificationReview(data);
  }

  return {
    ok: !error,
    data: data || null,
    error: error?.message || ""
  };
}

export function mapSupabaseProfileToPortalUser(profile) {
  if (!profile?.role) return null;
  const base = profile.role === "employer"
    ? cloneTemplate(profile.account_type === "household" ? householdEmployerTemplate : employerTemplate)
    : profile.role === "admin"
    ? cloneTemplate(adminTemplate)
    : profile.role === "super_admin"
    ? cloneTemplate(superAdminTemplate)
    : cloneTemplate(workerTemplate);
  const countryRule = getCountryRule(profile.country_code || "NP");

  base.id = profile.id || base.id;
  base.role = profile.role || base.role;
  base.accountType = profile.account_type || base.accountType || "business";
  base.fullName = profile.full_name || base.fullName;
  base.contact = profile.contact || base.contact;
  base.countryCode = countryRule.code;
  base.notes = profile.notes || base.notes;
  base.verificationStatus = profile.verification_status || base.verificationStatus;
  base.company = profile.company_name || base.company || "";
  base.homeLabel = profile.company_name || base.homeLabel || "";
  base.serviceAddress = profile.metadata?.serviceAddress || base.serviceAddress || "";
  base.approvedAt = profile.verification_status === "Approved"
    ? (profile.updated_at || profile.created_at || "")
    : base.approvedAt;

  if (base.role === "worker") {
    base.jobs = [];
    base.applications = [];
    base.chatStream = [];
    base.login.method = countryRule.phoneAuthMode;
    base.profile.withdrawal.payoutMethod = countryRule.payoutRail;
    base.profile.notifications = [
      `Verification rule: ${countryRule.verificationRule}`,
      `Payout rail: ${countryRule.payoutRail}`,
      `Phone auth: ${countryRule.phoneAuthMode}`
    ];
  }

  if (base.role === "employer") {
    base.jobs = [];
    base.applicants = [];
    base.chatStream = [];
    base.hiring = [];
    base.profile.verificationBadge = profile.verification_status === "Approved" ? "Verified" : "Pending";
    base.profile.notifications = [
      `Operating in ${countryRule.name}`,
      `Worker verification: ${countryRule.verificationRule}`,
      `Preferred payout rail: ${countryRule.payoutRail}`
    ];
  }

  if (base.role === "admin") {
    base.queue = [];
    base.disputes = [];
    base.payments = [];
    base.analytics = cloneTemplate(adminTemplate.analytics);
    base.flaggedJobs = [];
    base.abuseReports = [];
    base.fraudAlerts = [];
    base.monitoring = cloneTemplate(adminTemplate.monitoring);
  }

  if (base.role === "super_admin") {
    base.admins = cloneTemplate(superAdminTemplate.admins);
  }

  return base;
}

export function mapSupabaseJobToMarketplaceJob(job) {
  const countryCode = job.country_code || job.employer?.country_code || "NP";
  const country = countryName(countryCode);
  const payRate = Number(job.pay_rate || 0);
  const company = job.employer?.company_name || job.employer?.full_name || "Verified Employer";
  return {
    id: `sb-${job.id}`,
    supabaseId: job.id,
    title: job.title,
    company,
    companyLogo: "",
    pay: `${formatCountryMoney(payRate, countryCode)}/${job.pay_unit || "day"}`,
    distance: job.location || "Nearby",
    status: String(job.status || "open").replace(/^./, (char) => char.toUpperCase()),
    applied: false,
    saved: false,
    summary: `${job.category} / ${(job.service_address || job.location)} / ${country} / ${job.duration || "1 day"} / ${job.booking_mode || "crew hire"}`,
    skills: Array.isArray(job.required_skills) && job.required_skills.length ? job.required_skills.join(", ") : (job.category || "General labor"),
    location: job.location,
    serviceAddress: job.service_address || "",
    country,
    countryCode,
    dailyRate: payRate,
    payUnit: job.pay_unit || "day",
    bookingMode: job.booking_mode || "crew hire",
    hirerType: job.hirer_type || "business"
  };
}

export function mapSupabaseJobToEmployerJob(job) {
  const countryCode = job.country_code || "NP";
  const payRate = Number(job.pay_rate || 0);
  return {
    id: `sb-${job.id}`,
    supabaseId: job.id,
    title: job.title,
    category: job.category,
    hirerType: job.hirer_type || "business",
    countryCode,
    country: countryName(countryCode),
    location: job.location,
    serviceAddress: job.service_address || "",
    status: String(job.status || "open").replace(/^./, (char) => char.toUpperCase()),
    applicants: Number(job.application_count || 0),
    shortlisted: 0,
    escrow: false,
    spend: formatCountryMoney(payRate * Number(job.headcount || 1), countryCode),
    broadcasted: false,
    dailyRate: payRate,
    bidStep: 8,
    biddingHistory: [payRate],
    urgency: "Live",
    headcount: Number(job.headcount || 1),
    requiredSkillsText: Array.isArray(job.required_skills) ? job.required_skills.join(", ") : "",
    duration: job.duration || "1 day",
    shiftStart: "06:00",
    notes: job.notes || "",
    payUnit: job.pay_unit || "Per day",
    bookingMode: job.booking_mode || "Crew hire",
    startWindow: job.start_window || ""
  };
}

export function formatSupabaseApplicationStatus(status = "applied") {
  return String(status || "applied").replace(/^./, (char) => char.toUpperCase());
}

export function mapSupabaseMessagesToChatThread(messages = []) {
  return (messages || []).map((message) => ({
    from: message.sender_role === "employer"
      ? "Employer"
      : message.sender_role === "worker"
      ? "Worker"
      : "Admin",
    text: message.body || "",
    time: message.created_at ? new Date(message.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "Now"
  }));
}

export function mapSupabaseApplicationToEmployerApplicant(application, job, messages = []) {
  const status = formatSupabaseApplicationStatus(application.status);
  const verification = application.worker?.verification_status || "Pending";
  return {
    id: `sbapp-${application.id}`,
    supabaseApplicationId: application.id,
    workerId: application.worker?.id || "",
    jobId: `sb-${job.id}`,
    jobSupabaseId: job.id,
    name: application.worker?.full_name || "Worker",
    distance: job.location || "Location pending",
    rating: verification === "Approved" ? "Verified" : "Pending",
    invited: ["Invited", "Hired", "Rated"].includes(status),
    status,
    skills: Array.isArray(job.required_skills) ? job.required_skills : [job.category || "General labor"],
    reliability: verification === "Approved" ? "Verified worker" : "Verification pending",
    contact: application.worker?.contact || "",
    coverNote: application.cover_note || "",
    chatThread: mapSupabaseMessagesToChatThread(messages)
  };
}

export function mapSupabaseApplicationToWorkerApplication(application, messages = []) {
  return {
    title: application.job?.title || "Untitled job",
    status: formatSupabaseApplicationStatus(application.status),
    cover: application.cover_note || "",
    supabaseApplicationId: application.id,
    employerId: application.job?.employer?.id || "",
    countryCode: application.job?.country_code || "NP",
    chatThread: mapSupabaseMessagesToChatThread(messages)
  };
}

export function mapSupabaseApplicationToWorkerJob(application) {
  const job = application.job || {};
  const mappedJob = mapSupabaseJobToMarketplaceJob({
    ...job,
    employer: job.employer || {}
  });
  return {
    ...mappedJob,
    applied: true,
    status: formatSupabaseApplicationStatus(application.status),
    employerId: job.employer?.id || "",
    supabaseApplicationId: application.id
  };
}

function deriveReviewType(profile) {
  if (!profile?.role) return "Worker Identity";
  if (profile.role === "employer" && profile.account_type === "household") return "Home Hirer Verification";
  return profile.role === "employer"
    ? "Employer Registration"
    : profile.metadata?.onboardingMode === "voice"
    ? "Worker Voice Onboarding"
    : profile.metadata?.onboardingMode === "assisted"
    ? "Worker Assisted Registration"
    : "Worker Identity";
}

function deriveReviewRisk(profile) {
  if (profile?.role === "employer") return "Medium";
  const onboardingMode = String(profile?.metadata?.onboardingMode || "self").toLowerCase();
  if (onboardingMode === "voice") return "Medium";
  return "Low";
}

export async function ensureSupabaseVerificationReview(profile) {
  const client = getSupabaseClient();
  if (!client || !profile?.id) return { ok: false, error: "Profile is required." };

  const payload = {
    profile_id: profile.id,
    review_type: deriveReviewType(profile),
    region: countryName(profile.country_code || "NP"),
    risk_level: deriveReviewRisk(profile),
    status: profile.verification_status || "Pending",
    onboarding_mode: profile.metadata?.onboardingMode || "self",
    helper_name: profile.metadata?.assistedBy || "",
    voice_language: profile.metadata?.voiceLanguage || ""
  };

  const { data, error } = await client
    .from("verification_reviews")
    .upsert(payload, { onConflict: "profile_id" })
    .select("*")
    .single();

  return {
    ok: !error,
    data: data || null,
    error: error?.message || ""
  };
}

export function mapSupabaseReviewToQueueItem(review) {
  const profile = review.profile || {};
  return {
    id: review.id,
    reviewId: review.id,
    accountId: profile.id || "",
    name: profile.company_name || profile.full_name || "Pending account",
    type: review.review_type || "Verification Review",
    region: review.region || countryName(profile.country_code || "NP"),
    status: review.status || "Pending",
    risk: review.risk_level || "Low",
    onboardingMode: review.onboarding_mode || "self",
    helperName: review.helper_name || "",
    voiceLanguage: review.voice_language || ""
  };
}

export function mapSupabaseDisputeToAdminItem(dispute) {
  const jobTitle = dispute.application?.job?.title || dispute.escrow?.job?.title || "Marketplace case";
  const evidence = Array.isArray(dispute.evidence) ? dispute.evidence : [];
  return {
    id: dispute.id,
    disputeId: dispute.id,
    escrowId: dispute.escrow?.id || "",
    title: `${jobTitle}: ${dispute.reason || "Dispute opened"}`,
    status: dispute.status || "Open",
    note: dispute.resolution_note || `Amount ${formatCountryMoney(Number(dispute.amount || 0), dispute.currency_code || "NPR")}`,
    evidence,
    openedByName: dispute.opened_by_profile?.company_name || dispute.opened_by_profile?.full_name || "Participant",
    againstName: dispute.against_profile?.company_name || dispute.against_profile?.full_name || "Counterparty",
    createdAt: dispute.created_at || ""
  };
}

export function mapSupabaseDisputeToPortalItem(dispute, profile) {
  const jobTitle = dispute.application?.job?.title || dispute.escrow?.job?.title || "Marketplace case";
  const evidence = Array.isArray(dispute.evidence) ? dispute.evidence : [];
  const openedById = dispute.opened_by || dispute.opened_by_profile?.id || "";
  const againstId = dispute.against_profile_id || dispute.against_profile?.id || "";
  const counterparty = openedById === profile?.id
    ? (dispute.against_profile?.company_name || dispute.against_profile?.full_name || "Counterparty")
    : (dispute.opened_by_profile?.company_name || dispute.opened_by_profile?.full_name || "Counterparty");
  return {
    id: dispute.id,
    disputeId: dispute.id,
    escrowId: dispute.escrow?.id || dispute.escrow_id || "",
    title: `${jobTitle}: ${dispute.reason || "Dispute opened"}`,
    status: dispute.status || "Open",
    note: dispute.resolution_note || `Requested review for ${counterparty}`,
    amount: Number(dispute.amount || 0),
    currencyCode: dispute.currency_code || "NPR",
    jobTitle,
    againstName: counterparty,
    openedByRole: openedById === profile?.id ? profile?.role || "" : "counterparty",
    summary: dispute.resolution_note || "",
    evidence,
    createdAt: dispute.created_at || "",
    againstProfileId: againstId
  };
}

export function mapSupabaseEscrowToAdminPayment(escrow) {
  const reference = escrow.id ? `esc_${escrow.id.slice(0, 8)}` : "escrow";
  return {
    id: escrow.id,
    reference,
    amount: formatCountryMoney(Number(escrow.gross_amount || 0), escrow.country_code || "NP"),
    status: String(escrow.status || "draft").replace(/^./, (char) => char.toUpperCase()),
    worker: escrow.worker?.full_name || "Unassigned",
    employer: escrow.employer?.company_name || escrow.employer?.full_name || "Employer",
    title: escrow.job?.title || "Job payout"
  };
}

export function summarizeSupabaseLedger(entries = []) {
  return (entries || []).reduce((sum, entry) => {
    if (entry.status && entry.status !== "completed") return sum;
    if (["credit", "refund", "release"].includes(entry.direction)) {
      return sum + Number(entry.amount || 0);
    }
    if (["debit", "hold"].includes(entry.direction)) {
      return sum - Number(entry.amount || 0);
    }
    return sum;
  }, 0);
}

export async function listSupabaseJobs() {
  const client = getSupabaseClient();
  if (!client) return [];
  const { data, error } = await client
    .from("jobs")
    .select("id, title, category, hirer_type, booking_mode, pay_unit, country_code, currency_code, payout_rail, verification_rule, location, service_address, start_window, required_skills, duration, pay_rate, headcount, status, notes, employer:profiles!jobs_employer_id_fkey(full_name, company_name, country_code)")
    .in("status", ["open", "ongoing"])
    .order("created_at", { ascending: false });

  if (error || !Array.isArray(data)) return [];
  return data;
}

export async function listSupabaseEmployerJobs() {
  const client = getSupabaseClient();
  const profile = await getSupabaseProfile();
  if (!client || !profile) return [];
  const { data, error } = await client
    .from("jobs")
    .select("id, title, category, hirer_type, booking_mode, pay_unit, country_code, currency_code, payout_rail, verification_rule, location, service_address, start_window, required_skills, duration, pay_rate, headcount, status, notes")
    .eq("employer_id", profile.id)
    .order("created_at", { ascending: false });

  if (error || !Array.isArray(data)) return [];
  return data;
}

export async function createSupabaseJob(job) {
  const client = getSupabaseClient();
  const profile = await getSupabaseProfile();
  if (!client || !profile) {
    return { ok: false, error: "Authenticated employer profile is required." };
  }
  const countryRule = getCountryRule(job.countryCode || profile.country_code || "NP");

  const payload = {
    employer_id: profile.id,
    title: job.title,
    category: job.category,
    hirer_type: job.hirerType || profile.account_type || "business",
    booking_mode: job.bookingMode || "crew",
    pay_unit: job.payUnit || "daily",
    country_code: countryRule.code,
    currency_code: countryRule.currencyCode,
    payout_rail: countryRule.payoutRail,
    verification_rule: countryRule.verificationRule,
    location: job.location,
    service_address: job.serviceAddress || "",
    start_window: job.startWindow || "",
    required_skills: Array.isArray(job.requiredSkills)
      ? job.requiredSkills
      : String(job.requiredSkillsText || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    duration: job.duration || "1 day",
    pay_rate: Number(job.dailyRate || 0),
    headcount: Number(job.headcount || 1),
    status: String(job.status || "open").toLowerCase(),
    notes: job.notes || ""
  };

  const { data, error } = await client
    .from("jobs")
    .insert(payload)
    .select("*")
    .single();

  return {
    ok: !error,
    data: data || null,
    error: error?.message || ""
  };
}

export async function updateSupabaseJob(jobId, job) {
  const client = getSupabaseClient();
  const profile = await getSupabaseProfile();
  if (!client || !profile || !jobId) {
    return { ok: false, error: "Authenticated employer profile is required." };
  }
  const countryRule = getCountryRule(job.countryCode || profile.country_code || "NP");
  const payload = {
    title: job.title,
    category: job.category,
    hirer_type: job.hirerType || profile.account_type || "business",
    booking_mode: job.bookingMode || "crew",
    pay_unit: job.payUnit || "daily",
    country_code: countryRule.code,
    currency_code: countryRule.currencyCode,
    payout_rail: countryRule.payoutRail,
    verification_rule: countryRule.verificationRule,
    location: job.location,
    service_address: job.serviceAddress || "",
    start_window: job.startWindow || "",
    required_skills: Array.isArray(job.requiredSkills)
      ? job.requiredSkills
      : String(job.requiredSkillsText || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    duration: job.duration || "1 day",
    pay_rate: Number(job.dailyRate || 0),
    headcount: Number(job.headcount || 1),
    status: String(job.status || "open").toLowerCase(),
    notes: job.notes || ""
  };

  const { data, error } = await client
    .from("jobs")
    .update(payload)
    .eq("id", jobId)
    .select("*")
    .single();

  return {
    ok: !error,
    data: data || null,
    error: error?.message || ""
  };
}

export async function applyToSupabaseJob(jobId, coverNote = "") {
  const client = getSupabaseClient();
  const profile = await getSupabaseProfile();
  if (!client || !profile) {
    return { ok: false, error: "Authenticated worker profile is required." };
  }

  const { data, error } = await client
    .from("job_applications")
    .insert({
      job_id: jobId,
      worker_id: profile.id,
      cover_note: coverNote,
      status: "applied"
    })
    .select("*")
    .single();

  return {
    ok: !error,
    data: data || null,
    error: error?.message || ""
  };
}

export async function listSupabaseApplicationsForJob(jobId) {
  const client = getSupabaseClient();
  if (!client) return [];
  const { data, error } = await client
    .from("job_applications")
    .select("id, status, cover_note, applied_at, worker:profiles!job_applications_worker_id_fkey(id, full_name, contact, country_code, verification_status)")
    .eq("job_id", jobId)
    .order("applied_at", { ascending: false });

  if (error || !Array.isArray(data)) return [];
  return data;
}

export async function listSupabaseEmployerPipeline() {
  const jobs = await listSupabaseEmployerJobs();
  if (!jobs.length) return [];

  const pipeline = await Promise.all(jobs.map(async (job) => {
    const applications = await listSupabaseApplicationsForJob(job.id);
    const applicationThreads = await Promise.all(applications.map(async (application) => {
      const messages = await listSupabaseChatMessages(application.id);
      return {
        ...application,
        messages
      };
    }));
    return {
      job,
      applications: applicationThreads
    };
  }));

  return pipeline;
}

export async function listSupabaseWorkerApplications() {
  const client = getSupabaseClient();
  const profile = await getSupabaseProfile();
  if (!client || !profile) return [];
  const { data, error } = await client
    .from("job_applications")
    .select("id, status, cover_note, applied_at, job:jobs!job_applications_job_id_fkey(id, title, category, hirer_type, booking_mode, pay_unit, country_code, location, service_address, start_window, pay_rate, duration, required_skills, employer:profiles!jobs_employer_id_fkey(id, full_name, company_name, country_code))")
    .eq("worker_id", profile.id)
    .order("applied_at", { ascending: false });

  if (error || !Array.isArray(data)) return [];
  return data;
}

export async function listSupabaseWorkerApplicationsWithMessages() {
  const applications = await listSupabaseWorkerApplications();
  const withMessages = await Promise.all(applications.map(async (application) => ({
    ...application,
    messages: await listSupabaseChatMessages(application.id)
  })));
  return withMessages;
}

export async function listSupabaseAdminQueue() {
  const client = getSupabaseClient();
  if (!client) return [];
  const { data, error } = await client
    .from("verification_reviews")
    .select("id, review_type, region, risk_level, status, onboarding_mode, helper_name, voice_language, profile:profiles!verification_reviews_profile_id_fkey(id, role, full_name, company_name, country_code, verification_status)")
    .order("created_at", { ascending: false });

  if (error || !Array.isArray(data)) return [];
  return data;
}

export async function updateSupabaseVerificationStatus(reviewId, profileId, status, note = "") {
  const client = getSupabaseClient();
  if (!client || !reviewId || !profileId) {
    return { ok: false, error: "Review and profile ids are required." };
  }

  const { data, error } = await client
    .from("verification_reviews")
    .update({
      status,
      review_note: note,
      reviewer_id: (await getSupabaseSession()).user?.id || null,
      reviewed_at: timezoneSafeNow()
    })
    .eq("id", reviewId)
    .select("*")
    .single();

  if (error) {
    return { ok: false, error: error.message || "" };
  }

  await client
    .from("profiles")
    .update({ verification_status: status })
    .eq("id", profileId);

  return {
    ok: true,
    data: data || null,
    error: ""
  };
}

export async function listSupabaseDisputes() {
  const client = getSupabaseClient();
  if (!client) return [];
  const { data, error } = await client
    .from("disputes")
    .select("id, opened_by, against_profile_id, reason, status, resolution_note, evidence, amount, currency_code, created_at, application:job_applications!disputes_application_id_fkey(id, job:jobs!job_applications_job_id_fkey(title)), escrow:escrow_transactions!disputes_escrow_id_fkey(id, status, job:jobs!escrow_transactions_job_id_fkey(title)), opened_by_profile:profiles!disputes_opened_by_fkey(id, full_name, company_name), against_profile:profiles!disputes_against_profile_id_fkey(id, full_name, company_name)")
    .order("created_at", { ascending: false });

  if (error || !Array.isArray(data)) return [];
  return data;
}

export async function listSupabaseMyDisputes() {
  const client = getSupabaseClient();
  const profile = await getSupabaseProfile();
  if (!client || !profile) return [];
  const { data, error } = await client
    .from("disputes")
    .select("id, opened_by, against_profile_id, reason, status, resolution_note, evidence, amount, currency_code, created_at, escrow_id, application:job_applications!disputes_application_id_fkey(id, job:jobs!job_applications_job_id_fkey(title)), escrow:escrow_transactions!disputes_escrow_id_fkey(id, status, job:jobs!escrow_transactions_job_id_fkey(title)), opened_by_profile:profiles!disputes_opened_by_fkey(id, full_name, company_name), against_profile:profiles!disputes_against_profile_id_fkey(id, full_name, company_name)")
    .or(`opened_by.eq.${profile.id},against_profile_id.eq.${profile.id}`)
    .order("created_at", { ascending: false });

  if (error || !Array.isArray(data)) return [];
  return data.map((item) => mapSupabaseDisputeToPortalItem(item, profile));
}

export async function updateSupabaseDisputeStatus(disputeId, status, resolutionNote = "") {
  const client = getSupabaseClient();
  if (!client || !disputeId) {
    return { ok: false, error: "Dispute id is required." };
  }

  const payload = {
    status,
    resolution_note: resolutionNote,
    resolved_at: ["Refund issued", "Resolved", "Closed"].includes(status) ? timezoneSafeNow() : null
  };

  const { data, error } = await client
    .from("disputes")
    .update(payload)
    .eq("id", disputeId)
    .select("*")
    .single();

  return {
    ok: !error,
    data: data || null,
    error: error?.message || ""
  };
}

export async function listSupabaseAdminPayments() {
  const client = getSupabaseClient();
  if (!client) return [];
  const { data, error } = await client
    .from("escrow_transactions")
    .select("id, gross_amount, country_code, status, employer:profiles!escrow_transactions_employer_id_fkey(full_name, company_name), worker:profiles!escrow_transactions_worker_id_fkey(full_name), job:jobs!escrow_transactions_job_id_fkey(title)")
    .order("created_at", { ascending: false });

  if (error || !Array.isArray(data)) return [];
  return data;
}

export async function listSupabaseEmployerEscrows() {
  const client = getSupabaseClient();
  const profile = await getSupabaseProfile();
  if (!client || !profile) return [];
  const { data, error } = await client
    .from("escrow_transactions")
    .select("id, application_id, job_id, worker_id, gross_amount, platform_fee, net_amount, country_code, currency_code, payout_rail, status, note, released_at, refunded_at, worker:profiles!escrow_transactions_worker_id_fkey(full_name), job:jobs!escrow_transactions_job_id_fkey(title)")
    .eq("employer_id", profile.id)
    .order("created_at", { ascending: false });

  if (error || !Array.isArray(data)) return [];
  return data;
}

export async function listSupabaseWorkerEscrows() {
  const client = getSupabaseClient();
  const profile = await getSupabaseProfile();
  if (!client || !profile) return [];
  const { data, error } = await client
    .from("escrow_transactions")
    .select("id, application_id, job_id, worker_id, gross_amount, platform_fee, net_amount, country_code, currency_code, payout_rail, status, note, released_at, refunded_at, employer:profiles!escrow_transactions_employer_id_fkey(full_name, company_name), job:jobs!escrow_transactions_job_id_fkey(title)")
    .eq("worker_id", profile.id)
    .order("created_at", { ascending: false });

  if (error || !Array.isArray(data)) return [];
  return data;
}

export async function listSupabaseWalletEntriesForCurrentProfile() {
  const client = getSupabaseClient();
  const profile = await getSupabaseProfile();
  if (!client || !profile) return [];
  const { data, error } = await client
    .from("wallet_ledger_entries")
    .select("id, escrow_id, entry_key, direction, amount, currency_code, status, note, created_at")
    .eq("profile_id", profile.id)
    .order("created_at", { ascending: false });

  if (error || !Array.isArray(data)) return [];
  return data;
}

export async function updateSupabaseApplicationStatus(applicationId, status) {
  const client = getSupabaseClient();
  if (!client || !applicationId) {
    return { ok: false, error: "Application id is required." };
  }

  const payload = {
    status: String(status || "applied").toLowerCase()
  };

  const { data, error } = await client
    .from("job_applications")
    .update(payload)
    .eq("id", applicationId)
    .select("*")
    .single();

  return {
    ok: !error,
    data: data || null,
    error: error?.message || ""
  };
}

export async function upsertSupabaseEscrowTransaction(payload) {
  const client = getSupabaseClient();
  const profile = await getSupabaseProfile();
  if (!client || !profile) {
    return { ok: false, error: "Authenticated profile is required." };
  }

  const countryRule = getCountryRule(payload.countryCode || profile.country_code || "NP");
  const grossAmount = Number(payload.grossAmount || 0);
  const platformFee = Number(payload.platformFee ?? (grossAmount * 0.1));
  const netAmount = Number(payload.netAmount ?? Math.max(0, grossAmount - platformFee));
  const upsertPayload = {
    application_id: payload.applicationId || null,
    job_id: payload.jobId,
    employer_id: payload.employerId || profile.id,
    worker_id: payload.workerId || null,
    country_code: countryRule.code,
    currency_code: countryRule.currencyCode,
    payout_rail: countryRule.payoutRail,
    gross_amount: grossAmount,
    platform_fee: platformFee,
    net_amount: netAmount,
    status: String(payload.status || "draft").toLowerCase(),
    note: payload.note || ""
  };

  const query = client
    .from("escrow_transactions")
    .upsert(upsertPayload, payload.applicationId ? { onConflict: "application_id" } : undefined)
    .select("*")
    .single();
  const { data, error } = await query;

  return {
    ok: !error,
    data: data || null,
    error: error?.message || ""
  };
}

export async function updateSupabaseEscrowStatus(escrowId, status, note = "") {
  const client = getSupabaseClient();
  if (!client || !escrowId) {
    return { ok: false, error: "Escrow id is required." };
  }
  const normalizedStatus = String(status || "draft").toLowerCase();
  const payload = {
    status: normalizedStatus,
    note,
    released_at: normalizedStatus === "released" ? timezoneSafeNow() : null,
    refunded_at: normalizedStatus === "refunded" ? timezoneSafeNow() : null
  };
  const { data, error } = await client
    .from("escrow_transactions")
    .update(payload)
    .eq("id", escrowId)
    .select("*")
    .single();

  return {
    ok: !error,
    data: data || null,
    error: error?.message || ""
  };
}

export async function createSupabaseDispute(payload) {
  const client = getSupabaseClient();
  const profile = await getSupabaseProfile();
  if (!client || !profile) {
    return { ok: false, error: "Authenticated profile is required." };
  }

  const { data, error } = await client
    .from("disputes")
    .insert({
      application_id: payload.applicationId || null,
      escrow_id: payload.escrowId || null,
      opened_by: payload.openedBy || profile.id,
      against_profile_id: payload.againstProfileId || null,
      reason: payload.reason || "Manual review requested",
      status: payload.status || "Open",
      resolution_note: payload.resolutionNote || "",
      evidence: Array.isArray(payload.evidence) ? payload.evidence : [],
      amount: Number(payload.amount || 0),
      currency_code: payload.currencyCode || "NPR"
    })
    .select("*")
    .single();

  return {
    ok: !error,
    data: data || null,
    error: error?.message || ""
  };
}

export async function createSupabaseWalletEntry(payload) {
  const client = getSupabaseClient();
  if (!client || !payload.profileId || !payload.entryKey) {
    return { ok: false, error: "Wallet entry profile and key are required." };
  }

  const { data, error } = await client
    .from("wallet_ledger_entries")
    .upsert({
      profile_id: payload.profileId,
      escrow_id: payload.escrowId || null,
      entry_key: payload.entryKey,
      direction: payload.direction || "credit",
      amount: Number(payload.amount || 0),
      currency_code: payload.currencyCode || "NPR",
      status: payload.status || "completed",
      note: payload.note || ""
    }, { onConflict: "entry_key" })
    .select("*")
    .single();

  return {
    ok: !error,
    data: data || null,
    error: error?.message || ""
  };
}

export async function uploadSupabaseFile(file, options = {}) {
  if (!file) {
    return { ok: false, error: "A file is required.", data: null };
  }

  const settings = getSupabaseSettings();
  const bucket = options.bucket || settings.documentBucket;
  const folder = String(options.folder || "uploads").trim().replace(/^\/+|\/+$/g, "");
  const pathName = `${folder}/${Date.now()}-${storageSafeFileName(file.name)}`;

  if (!supabaseEnabled()) {
    try {
      const dataUrl = await readFileAsDataUrl(file);
      return {
        ok: true,
        data: {
          path: pathName,
          url: dataUrl,
          bucket,
          provider: "local-demo",
          fileName: file.name,
          mimeType: file.type || "application/octet-stream",
          size: Number(file.size || 0)
        },
        error: ""
      };
    } catch (error) {
      return { ok: false, error: error.message || "File reading failed.", data: null };
    }
  }

  const client = getSupabaseClient();
  const profile = await getSupabaseProfile();
  if (!client || !profile) {
    return { ok: false, error: "Authenticated Supabase profile is required for upload.", data: null };
  }

  const { error: uploadError } = await client.storage
    .from(bucket)
    .upload(pathName, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type || undefined
    });

  if (uploadError) {
    return { ok: false, error: uploadError.message || "Upload failed.", data: null };
  }

  const { data: publicData } = client.storage.from(bucket).getPublicUrl(pathName);
  return {
    ok: true,
    data: {
      path: pathName,
      url: publicData?.publicUrl || "",
      bucket,
      provider: "supabase-storage",
      fileName: file.name,
      mimeType: file.type || "application/octet-stream",
      size: Number(file.size || 0)
    },
    error: ""
  };
}

export function subscribeToSupabaseWorkerApplications(workerId, callback) {
  const client = getSupabaseClient();
  if (!client || !workerId || typeof callback !== "function") return null;

  const channel = client
    .channel(`worker-applications-${workerId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "job_applications",
        filter: `worker_id=eq.${workerId}`
      },
      callback
    )
    .subscribe();

  return channel;
}

export function subscribeToSupabaseEmployerJobs(employerId, callback) {
  const client = getSupabaseClient();
  if (!client || !employerId || typeof callback !== "function") return null;

  const channel = client
    .channel(`employer-jobs-${employerId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "jobs",
        filter: `employer_id=eq.${employerId}`
      },
      callback
    )
    .subscribe();

  return channel;
}

export function subscribeToSupabaseJobApplications(jobId, callback) {
  const client = getSupabaseClient();
  if (!client || !jobId || typeof callback !== "function") return null;

  const channel = client
    .channel(`job-applications-${jobId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "job_applications",
        filter: `job_id=eq.${jobId}`
      },
      callback
    )
    .subscribe();

  return channel;
}

export function unsubscribeSupabaseChannel(channel) {
  const client = getSupabaseClient();
  if (!client || !channel) return;
  client.removeChannel(channel);
}

export async function sendSupabaseChatMessage(applicationId, body, senderRole) {
  const client = getSupabaseClient();
  const profile = await getSupabaseProfile();
  if (!client || !profile) {
    return { ok: false, error: "Authenticated profile is required." };
  }

  const { data, error } = await client
    .from("job_messages")
    .insert({
      application_id: applicationId,
      sender_id: profile.id,
      sender_role: senderRole,
      body
    })
    .select("*")
    .single();

  return {
    ok: !error,
    data: data || null,
    error: error?.message || ""
  };
}

export async function listSupabaseChatMessages(applicationId) {
  const client = getSupabaseClient();
  if (!client) return [];
  const { data, error } = await client
    .from("job_messages")
    .select("id, body, sender_role, created_at, sender:profiles!job_messages_sender_id_fkey(full_name)")
    .eq("application_id", applicationId)
    .order("created_at", { ascending: true });

  if (error || !Array.isArray(data)) return [];
  return data;
}

export function subscribeToSupabaseApplicationMessages(applicationId, callback) {
  const client = getSupabaseClient();
  if (!client || !applicationId || typeof callback !== "function") return null;

  const channel = client
    .channel(`job-messages-${applicationId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "job_messages",
        filter: `application_id=eq.${applicationId}`
      },
      callback
    )
    .subscribe();

  return channel;
}

export async function signOutSupabase() {
  const client = getSupabaseClient();
  if (!client) return { ok: true };
  const { error } = await client.auth.signOut();
  return { ok: !error, error: error?.message || "" };
}
