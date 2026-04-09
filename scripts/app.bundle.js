// FILE: scripts/country-rules.js
const COUNTRY_RULES = {
  NP: {
    code: "NP",
    name: "Nepal",
    currencyCode: "NPR",
    currencySymbol: "Rs",
    phoneAuthMode: "Phone OTP preferred",
    payoutRail: "eSewa wallet or bank transfer",
    paymentGateway: "eSewa",
    verificationRule: "Government ID, selfie, and local address or phone proof",
    dialCode: "+977"
  },
  IN: {
    code: "IN",
    name: "India",
    currencyCode: "INR",
    currencySymbol: "Rs",
    phoneAuthMode: "Phone OTP required for worker accounts",
    payoutRail: "UPI or bank transfer",
    verificationRule: "Government ID, selfie, and business or worker identity proof",
    dialCode: "+91"
  },
  BD: {
    code: "BD",
    name: "Bangladesh",
    currencyCode: "BDT",
    currencySymbol: "Tk",
    phoneAuthMode: "Phone OTP preferred",
    payoutRail: "Mobile wallet or bank transfer",
    verificationRule: "National ID, selfie, and phone or address proof",
    dialCode: "+880"
  },
  PK: {
    code: "PK",
    name: "Pakistan",
    currencyCode: "PKR",
    currencySymbol: "Rs",
    phoneAuthMode: "Phone OTP preferred",
    payoutRail: "Bank transfer or mobile wallet",
    verificationRule: "National ID, selfie, and worker or business proof",
    dialCode: "+92"
  },
  LK: {
    code: "LK",
    name: "Sri Lanka",
    currencyCode: "LKR",
    currencySymbol: "Rs",
    phoneAuthMode: "Phone OTP or email OTP",
    payoutRail: "Bank transfer",
    verificationRule: "National ID, selfie, and address proof",
    dialCode: "+94"
  },
  AE: {
    code: "AE",
    name: "UAE",
    currencyCode: "AED",
    currencySymbol: "AED",
    phoneAuthMode: "Phone OTP plus business verification",
    payoutRail: "Bank transfer",
    verificationRule: "Emirates ID or passport and employer trade license",
    dialCode: "+971"
  },
  QA: {
    code: "QA",
    name: "Qatar",
    currencyCode: "QAR",
    currencySymbol: "QAR",
    phoneAuthMode: "Phone OTP plus employer verification",
    payoutRail: "Bank transfer",
    verificationRule: "QID or passport and employer license verification",
    dialCode: "+974"
  },
  SA: {
    code: "SA",
    name: "Saudi Arabia",
    currencyCode: "SAR",
    currencySymbol: "SAR",
    phoneAuthMode: "Phone OTP plus employer verification",
    payoutRail: "Bank transfer",
    verificationRule: "National ID or iqama and employer registration proof",
    dialCode: "+966"
  },
  MY: {
    code: "MY",
    name: "Malaysia",
    currencyCode: "MYR",
    currencySymbol: "RM",
    phoneAuthMode: "Phone or email OTP",
    payoutRail: "Bank transfer or e-wallet",
    verificationRule: "Photo ID, selfie, and employer business proof",
    dialCode: "+60"
  },
  SG: {
    code: "SG",
    name: "Singapore",
    currencyCode: "SGD",
    currencySymbol: "S$",
    phoneAuthMode: "Email or phone OTP",
    payoutRail: "FAST bank transfer",
    verificationRule: "Photo ID and company verification",
    dialCode: "+65"
  },
  TH: {
    code: "TH",
    name: "Thailand",
    currencyCode: "THB",
    currencySymbol: "฿",
    phoneAuthMode: "Phone OTP preferred",
    payoutRail: "Bank transfer",
    verificationRule: "National ID, selfie, and employer or household proof",
    dialCode: "+66"
  },
  JP: {
    code: "JP",
    name: "Japan",
    currencyCode: "JPY",
    currencySymbol: "JPY",
    phoneAuthMode: "Email or phone OTP",
    payoutRail: "Bank transfer",
    verificationRule: "Residence or photo ID and employer verification",
    dialCode: "+81"
  },
  KR: {
    code: "KR",
    name: "South Korea",
    currencyCode: "KRW",
    currencySymbol: "KRW",
    phoneAuthMode: "Phone OTP preferred",
    payoutRail: "Bank transfer",
    verificationRule: "Photo ID and local payment verification",
    dialCode: "+82"
  },
  AU: {
    code: "AU",
    name: "Australia",
    currencyCode: "AUD",
    currencySymbol: "A$",
    phoneAuthMode: "Email or phone OTP",
    payoutRail: "Bank transfer",
    verificationRule: "Photo ID, payment verification, and employer business proof",
    dialCode: "+61"
  },
  NZ: {
    code: "NZ",
    name: "New Zealand",
    currencyCode: "NZD",
    currencySymbol: "NZ$",
    phoneAuthMode: "Email or phone OTP",
    payoutRail: "Bank transfer",
    verificationRule: "Photo ID and address or business proof",
    dialCode: "+64"
  },
  GB: {
    code: "GB",
    name: "United Kingdom",
    currencyCode: "GBP",
    currencySymbol: "GBP",
    phoneAuthMode: "Email or phone OTP",
    payoutRail: "Bank transfer",
    verificationRule: "Photo ID, address proof, and employer company verification",
    dialCode: "+44"
  },
  DE: {
    code: "DE",
    name: "Germany",
    currencyCode: "EUR",
    currencySymbol: "EUR",
    phoneAuthMode: "Email or phone OTP",
    payoutRail: "SEPA bank transfer",
    verificationRule: "Photo ID and employer or contractor verification",
    dialCode: "+49"
  },
  FR: {
    code: "FR",
    name: "France",
    currencyCode: "EUR",
    currencySymbol: "EUR",
    phoneAuthMode: "Email or phone OTP",
    payoutRail: "SEPA bank transfer",
    verificationRule: "Photo ID, address proof, and company verification",
    dialCode: "+33"
  },
  CA: {
    code: "CA",
    name: "Canada",
    currencyCode: "CAD",
    currencySymbol: "C$",
    phoneAuthMode: "Email or phone OTP",
    payoutRail: "Bank transfer or Interac-linked payout",
    verificationRule: "Photo ID, payment verification, and employer business proof",
    dialCode: "+1"
  },
  US: {
    code: "US",
    name: "United States",
    currencyCode: "USD",
    currencySymbol: "$",
    phoneAuthMode: "Email or phone OTP",
    payoutRail: "ACH or card-linked payout",
    verificationRule: "Photo ID, tax or payment verification, and employer business verification",
    dialCode: "+1"
  }
};

function listCountryRules() {
  return Object.values(COUNTRY_RULES);
}

function getCountryRule(code = "NP") {
  return COUNTRY_RULES[String(code || "NP").toUpperCase()] || COUNTRY_RULES.NP;
}

function countryName(code = "NP") {
  return getCountryRule(code).name;
}

function formatCountryMoney(amount, code = "NP") {
  const numericAmount = Number(amount || 0);
  const rule = getCountryRule(code);
  if (rule.currencySymbol === "$") return `${rule.currencySymbol}${numericAmount}`;
  return `${rule.currencySymbol}${numericAmount}`;
}


// FILE: scripts/supabase.js

const SUPABASE_PENDING_SIGNUP_KEY = "workshift_supabase_pending_signup_v1";

function getSupabaseSettings() {
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

function supabaseEnabled() {
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

function getSupabaseClient() {
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

function normalizeSupabaseContact(contact = "") {
  return String(contact).trim();
}

function isEmailContact(contact = "") {
  return normalizeSupabaseContact(contact).includes("@");
}

function savePendingSupabaseSignup(payload) {
  try {
    window.localStorage.setItem(SUPABASE_PENDING_SIGNUP_KEY, JSON.stringify(payload));
  } catch {
    return null;
  }
  return payload;
}

function loadPendingSupabaseSignup() {
  try {
    const raw = window.localStorage.getItem(SUPABASE_PENDING_SIGNUP_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function clearPendingSupabaseSignup() {
  try {
    window.localStorage.removeItem(SUPABASE_PENDING_SIGNUP_KEY);
  } catch {
    return null;
  }
  return null;
}

async function requestSupabaseOtp(contact, options = {}) {
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

async function getSupabaseSession() {
  const client = getSupabaseClient();
  if (!client) return { session: null, user: null };
  const { data } = await client.auth.getSession();
  return {
    session: data.session || null,
    user: data.session?.user || null
  };
}

async function getSupabaseProfile() {
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

async function getSupabaseProfileForCurrentSession() {
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

async function ensureSupabaseProfileFromAuth() {
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

async function upsertSupabaseProfile(profile) {
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

function mapSupabaseProfileToPortalUser(profile) {
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

function mapSupabaseJobToMarketplaceJob(job) {
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

function mapSupabaseJobToEmployerJob(job) {
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

function formatSupabaseApplicationStatus(status = "applied") {
  return String(status || "applied").replace(/^./, (char) => char.toUpperCase());
}

function mapSupabaseMessagesToChatThread(messages = []) {
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

function mapSupabaseApplicationToEmployerApplicant(application, job, messages = []) {
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

function mapSupabaseApplicationToWorkerApplication(application, messages = []) {
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

function mapSupabaseApplicationToWorkerJob(application) {
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

async function ensureSupabaseVerificationReview(profile) {
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

function mapSupabaseReviewToQueueItem(review) {
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

function mapSupabaseDisputeToAdminItem(dispute) {
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

function mapSupabaseDisputeToPortalItem(dispute, profile) {
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

function mapSupabaseEscrowToAdminPayment(escrow) {
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

function summarizeSupabaseLedger(entries = []) {
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

async function listSupabaseJobs() {
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

async function listSupabaseEmployerJobs() {
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

async function createSupabaseJob(job) {
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

async function updateSupabaseJob(jobId, job) {
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

async function applyToSupabaseJob(jobId, coverNote = "") {
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

async function listSupabaseApplicationsForJob(jobId) {
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

async function listSupabaseEmployerPipeline() {
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

async function listSupabaseWorkerApplications() {
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

async function listSupabaseWorkerApplicationsWithMessages() {
  const applications = await listSupabaseWorkerApplications();
  const withMessages = await Promise.all(applications.map(async (application) => ({
    ...application,
    messages: await listSupabaseChatMessages(application.id)
  })));
  return withMessages;
}

async function listSupabaseAdminQueue() {
  const client = getSupabaseClient();
  if (!client) return [];
  const { data, error } = await client
    .from("verification_reviews")
    .select("id, review_type, region, risk_level, status, onboarding_mode, helper_name, voice_language, profile:profiles!verification_reviews_profile_id_fkey(id, role, full_name, company_name, country_code, verification_status)")
    .order("created_at", { ascending: false });

  if (error || !Array.isArray(data)) return [];
  return data;
}

async function updateSupabaseVerificationStatus(reviewId, profileId, status, note = "") {
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

async function listSupabaseDisputes() {
  const client = getSupabaseClient();
  if (!client) return [];
  const { data, error } = await client
    .from("disputes")
    .select("id, opened_by, against_profile_id, reason, status, resolution_note, evidence, amount, currency_code, created_at, application:job_applications!disputes_application_id_fkey(id, job:jobs!job_applications_job_id_fkey(title)), escrow:escrow_transactions!disputes_escrow_id_fkey(id, status, job:jobs!escrow_transactions_job_id_fkey(title)), opened_by_profile:profiles!disputes_opened_by_fkey(id, full_name, company_name), against_profile:profiles!disputes_against_profile_id_fkey(id, full_name, company_name)")
    .order("created_at", { ascending: false });

  if (error || !Array.isArray(data)) return [];
  return data;
}

async function listSupabaseMyDisputes() {
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

async function updateSupabaseDisputeStatus(disputeId, status, resolutionNote = "") {
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

async function listSupabaseAdminPayments() {
  const client = getSupabaseClient();
  if (!client) return [];
  const { data, error } = await client
    .from("escrow_transactions")
    .select("id, gross_amount, country_code, status, employer:profiles!escrow_transactions_employer_id_fkey(full_name, company_name), worker:profiles!escrow_transactions_worker_id_fkey(full_name), job:jobs!escrow_transactions_job_id_fkey(title)")
    .order("created_at", { ascending: false });

  if (error || !Array.isArray(data)) return [];
  return data;
}

async function listSupabaseEmployerEscrows() {
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

async function listSupabaseWorkerEscrows() {
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

async function listSupabaseWalletEntriesForCurrentProfile() {
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

async function updateSupabaseApplicationStatus(applicationId, status) {
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

async function upsertSupabaseEscrowTransaction(payload) {
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

async function updateSupabaseEscrowStatus(escrowId, status, note = "") {
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

async function createSupabaseDispute(payload) {
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

async function createSupabaseWalletEntry(payload) {
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

async function uploadSupabaseFile(file, options = {}) {
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

function subscribeToSupabaseWorkerApplications(workerId, callback) {
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

function subscribeToSupabaseEmployerJobs(employerId, callback) {
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

function subscribeToSupabaseJobApplications(jobId, callback) {
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

function unsubscribeSupabaseChannel(channel) {
  const client = getSupabaseClient();
  if (!client || !channel) return;
  client.removeChannel(channel);
}

async function sendSupabaseChatMessage(applicationId, body, senderRole) {
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

async function listSupabaseChatMessages(applicationId) {
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

function subscribeToSupabaseApplicationMessages(applicationId, callback) {
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

async function signOutSupabase() {
  const client = getSupabaseClient();
  if (!client) return { ok: true };
  const { error } = await client.auth.signOut();
  return { ok: !error, error: error?.message || "" };
}


// FILE: scripts/data.js
const workerTypeCatalog = [
  { name: "Plumbing", icon: "Pipe", blurb: "Leak repair, pipe fitting, bathroom and kitchen fixes" },
  { name: "Electrician", icon: "Volt", blurb: "Wiring, lighting, sockets, panels, and urgent electrical work" },
  { name: "Carpentry", icon: "Wood", blurb: "Furniture fitting, framing, doors, shelves, and wood repairs" },
  { name: "Painting", icon: "Paint", blurb: "Interior, exterior, touch-up, and finishing support" },
  { name: "Cleaning", icon: "Clean", blurb: "Home cleaning, hotel housekeeping, events, and sanitization" },
  { name: "Housekeeping", icon: "Home", blurb: "Daily household upkeep, room reset, and laundry support" },
  { name: "Nanny", icon: "Care", blurb: "Childcare, meal prep, family support, and repeat-family bookings" },
  { name: "Elder Care", icon: "Assist", blurb: "Companionship, routine support, and home care assistance" },
  { name: "Security", icon: "Guard", blurb: "Gate control, patrol, event safety, and property monitoring" },
  { name: "Driver", icon: "Drive", blurb: "Family driver, delivery, shuttle, and route support" },
  { name: "Cook", icon: "Cook", blurb: "Home cooking, catering prep, restaurant line support" },
  { name: "Waitstaff", icon: "Serve", blurb: "Restaurant floor service, banquet support, and hosting" },
  { name: "Bartender", icon: "Bar", blurb: "Event beverage service, bar setup, and hospitality support" },
  { name: "Warehouse", icon: "Stock", blurb: "Loading, packing, dispatch, and inventory reset" },
  { name: "Forklift", icon: "Lift", blurb: "Warehouse lifting, pallet movement, and yard operations" },
  { name: "Delivery", icon: "Move", blurb: "Last-mile drop-offs, courier work, and route fulfillment" },
  { name: "Agriculture", icon: "Farm", blurb: "Harvest, planting, sorting, packing, and seasonal farm work" },
  { name: "Construction", icon: "Build", blurb: "General labor, site prep, material movement, and crew support" },
  { name: "Masonry", icon: "Brick", blurb: "Blockwork, plaster, tile prep, and concrete support" },
  { name: "HVAC", icon: "Air", blurb: "Cooling, ventilation, maintenance, and filter servicing" },
  { name: "Appliance Repair", icon: "Fix", blurb: "Washer, fridge, oven, and home appliance troubleshooting" },
  { name: "Gardening", icon: "Leaf", blurb: "Landscape care, trimming, planting, and outdoor upkeep" },
  { name: "Hospitality", icon: "Guest", blurb: "Hotels, restaurants, catering, and front-of-house support" },
  { name: "General Help", icon: "Help", blurb: "Flexible local assistance for short jobs and urgent needs" }
];

const workerTemplate = {
  role: "worker",
  id: "",
  fullName: "",
  contact: "",
  countryCode: "NP",
  skill: "Plumbing",
  notes: "",
  onboardingMode: "self",
  assistedBy: "",
  verificationStatus: "Pending",
  approvedAt: "",
  login: {
    method: "Phone + OTP",
    social: "Google available",
    biometric: "Enabled on mobile"
  },
  wallet: 520,
  weeklyEarnings: 840,
  monthlyEarnings: 2860,
  availability: "available",
  geoSharing: "Enabled",
  mapView: "map",
  reputation: {
    score: 92,
    tier: "Trusted Pro",
    completion: 96,
    response: 94,
    reviewAverage: 4.9
  },
  documents: [
    { id: "wid", name: "Government ID", status: "Missing", required: true },
    { id: "wselfie", name: "Profile Photo / Selfie", status: "Missing", required: true },
    { id: "wproof", name: "Phone or Address Proof", status: "Missing", required: true },
    { id: "wtrade", name: "Trade Certificate", status: "Optional", required: false }
  ],
  profile: {
    photo: "Pending upload",
    bio: "",
    experience: "2 years",
    certifications: ["Trade certificate pending upload"],
    skillsCatalog: [
      { name: "Plumbing", level: "Expert" },
      { name: "Leak Repair", level: "Expert" },
      { name: "Pipe Fitting", level: "Mid" }
    ],
    reviews: [{ employer: "Riverside Bistro", rating: 5, note: "Arrived early and finished on time." }],
    notifications: ["New urgent plumbing match nearby", "Employer invite from Aurora Grand Hotel"],
    chat: ["Employer: Bring your own wrench set.", "Worker: Confirmed, arriving by 6:20 AM."],
    invitations: [
      { title: "Instant Hire: Hotel repair support", status: "Pending acceptance" }
    ],
    withdrawal: {
      payoutMethod: "eSewa wallet",
      schedule: "On demand",
      linkedAccount: "Linked"
    }
  },
  jobs: [
    { id: "w1", title: "Emergency Pipe Repair", company: "Riverside Bistro", pay: "NPR 280/day", distance: "2 km", status: "Open", applied: false, saved: false, summary: "Urgent plumbing repair before breakfast service.", skills: "Plumbing / Leak Fix / Urgent", country: "Nepal" },
    { id: "w2", title: "Hotel Deep Cleaning", company: "Aurora Grand Hotel", pay: "NPR 120/day", distance: "4 km", status: "Open", applied: false, saved: false, summary: "Conference weekend cleaning support for 2 days.", skills: "Cleaning / Hospitality / Teamwork", country: "Nepal" },
    { id: "w3", title: "Harvest Team Support", company: "Valley Orchard", pay: "NPR 95/day", distance: "11 km", status: "Open", applied: false, saved: false, summary: "Seasonal farm labor for harvest and packaging.", skills: "Agriculture / Packing / Seasonal", country: "Nepal" }
  ],
  chatStream: [
    { from: "Employer", text: "Can you reach the site before 7:00 AM?", time: "06:12" },
    { from: "Worker", text: "Yes, I am on the way with tools.", time: "06:14" }
  ],
  disputes: [],
  applications: [
    { title: "Emergency Pipe Repair", status: "Applied", cover: "Available immediately" },
    { title: "Hotel Deep Cleaning", status: "Interviewing", cover: "Experienced in hospitality shifts" }
  ],
  shift: { checkedIn: false, proofSubmitted: false, timesheet: "0h", stage: "Not started" }
};

const employerTemplate = {
  role: "employer",
  accountType: "business",
  id: "",
  fullName: "",
  contact: "",
  company: "",
  homeLabel: "",
  serviceAddress: "",
  countryCode: "NP",
  skill: "Facilities",
  notes: "",
  verificationStatus: "Pending",
  approvedAt: "",
  account: {
    registration: "Email + business verification",
    onboarding: "In progress"
  },
  availability: "available",
  mapView: "map",
  documents: [
    { id: "ereg", name: "Business Registration", status: "Missing", required: true },
    { id: "etax", name: "Tax or Company ID", status: "Missing", required: true },
    { id: "erep", name: "Authorized Representative ID", status: "Missing", required: true },
    { id: "ebilling", name: "Billing Information", status: "Missing", required: true }
  ],
  profile: {
    logo: "Pending upload",
    industry: "Facilities",
    size: "25-50 employees",
    verificationBadge: "Pending",
    notifications: [
      "3 nearby workers matched your open harvest job.",
      "Escrow release window opens after proof review.",
      "Amina from support approved one billing document."
    ],
    chat: ["Worker: Can you confirm start time?", "Employer: Please arrive by 7:00 AM at service gate."],
    analytics: [
      { label: "Total Spend", value: "$7,460" },
      { label: "Repeat Hire Rate", value: "38%" },
      { label: "Average Worker Rating", value: "4.8" }
    ],
    analyticsDashboard: [
      { label: "GMV", value: "$24.8K" },
      { label: "Avg Fill Time", value: "11 min" },
      { label: "Escrow Protected", value: "$18.2K" },
      { label: "Crew Retention", value: "61%" }
    ],
    payments: [
      { reference: "pay_001", amount: "$1,900", status: "Released" },
      { reference: "pay_002", amount: "$4,800", status: "Pending escrow" }
    ],
    ratings: [
      { worker: "Aarav Tamang", score: "5/5", note: "Strong communication" }
    ]
  },
  jobs: [
    { id: "e1", title: "50 Harvest Workers", category: "Agriculture", location: "Kathmandu Valley", status: "Open", applicants: 72, shortlisted: 4, escrow: false, spend: "Rs4800", broadcasted: false, dailyRate: 96, bidStep: 8, biddingHistory: [84, 90, 96], urgency: "High", country: "Nepal", countryCode: "NP" },
    { id: "e2", title: "Hotel Overflow Cleaning Crew", category: "Hospitality", location: "Lalitpur", status: "Ongoing", applicants: 26, shortlisted: 6, escrow: true, spend: "Rs1900", broadcasted: true, dailyRate: 120, bidStep: 10, biddingHistory: [105, 112, 120], urgency: "Medium", country: "Nepal", countryCode: "NP" },
    { id: "e3", title: "Overnight Inventory Reset", category: "Warehouse", location: "Bhaktapur", status: "Completed", applicants: 18, shortlisted: 3, escrow: true, spend: "Rs760", broadcasted: true, dailyRate: 88, bidStep: 6, biddingHistory: [76, 82, 88], urgency: "Filled", country: "Nepal", countryCode: "NP" }
  ],
  applicants: [
    {
      id: "a1",
      name: "Aarav Tamang",
      score: "96%",
      distance: "1.8 km",
      rating: "4.9",
      invited: false,
      status: "New",
      skills: ["Plumbing", "Crew lead", "Urgent repairs"],
      reliability: "95%",
      chatThread: [
        { from: "Worker", text: "I can start before sunrise if tools are ready on site.", time: "06:03" },
        { from: "Employer", text: "Good. We may need you to lead the first crew.", time: "06:08" }
      ]
    },
    {
      id: "a2",
      name: "Mina Gurung",
      score: "93%",
      distance: "2.4 km",
      rating: "4.8",
      invited: true,
      status: "Invited",
      skills: ["Cleaning", "Hospitality", "Sanitization"],
      reliability: "92%",
      chatThread: [
        { from: "Employer", text: "Can you cover a two-day hotel overflow shift?", time: "08:10" },
        { from: "Worker", text: "Yes, I can confirm after I finish my current shift.", time: "08:17" }
      ]
    },
    {
      id: "a3",
      name: "Rakesh Shahi",
      score: "89%",
      distance: "3.1 km",
      rating: "4.7",
      invited: false,
      status: "Shortlisted",
      skills: ["Warehouse", "Inventory", "Night shift"],
      reliability: "88%",
      chatThread: [
        { from: "Employer", text: "Your warehouse experience looks strong for the night reset.", time: "10:04" }
      ]
    }
  ],
  workerPool: [
    {
      id: "pool-1",
      name: "Aarav Tamang",
      skills: ["plumbing", "leak fix", "pipe fitting"],
      locationLabel: "Kathmandu Valley",
      distanceKm: 1.8,
      avgRating: 4.9,
      verified: true,
      completionRate: 0.97,
      responseRate: 0.95,
      availability: "available",
      historyCategories: ["facilities", "plumbing", "hospitality"],
      experienceSummary: "6 years across restaurants, hotels, and emergency repair crews.",
      documentBadges: ["ID Verified", "Trade Certificate", "Background Checked"],
      workHistory: [
        { role: "Lead Plumbing Technician", company: "Riverside Bistro", location: "Kathmandu", period: "2024-2026", result: "98% on-time completion" },
        { role: "Maintenance Crew", company: "Aurora Grand Hotel", location: "Lalitpur", period: "2022-2024", result: "Trusted for urgent night repairs" }
      ],
      reviews: [
        { author: "Riverside Bistro", rating: 5, note: "Solved an urgent pipe burst before opening and kept the crew calm." },
        { author: "Aurora Grand Hotel", rating: 5, note: "Reliable under pressure and communicates clearly with supervisors." }
      ]
    },
    {
      id: "pool-2",
      name: "Mina Gurung",
      skills: ["cleaning", "hospitality", "sanitization"],
      locationLabel: "Lalitpur",
      distanceKm: 2.4,
      avgRating: 4.8,
      verified: true,
      completionRate: 0.94,
      responseRate: 0.91,
      availability: "available",
      historyCategories: ["hospitality", "cleaning"],
      experienceSummary: "4 years managing hotel deep-cleaning and event turnover teams.",
      documentBadges: ["ID Verified", "Hospitality Certified"],
      workHistory: [
        { role: "Senior Housekeeping Crew", company: "Aurora Grand Hotel", location: "Lalitpur", period: "2023-2026", result: "Handled peak conference turnovers" },
        { role: "Sanitization Support", company: "Metro Events", location: "Kathmandu", period: "2021-2023", result: "Consistent 4.8+ employer scores" }
      ],
      reviews: [
        { author: "Aurora Grand Hotel", rating: 5, note: "Fast, organized, and trusted with VIP room prep." },
        { author: "Metro Events", rating: 4.8, note: "Great team player for high-volume cleaning shifts." }
      ]
    },
    {
      id: "pool-3",
      name: "Rakesh Shahi",
      skills: ["warehouse", "inventory", "loading"],
      locationLabel: "Bhaktapur",
      distanceKm: 3.1,
      avgRating: 4.7,
      verified: false,
      completionRate: 0.9,
      responseRate: 0.86,
      availability: "busy",
      historyCategories: ["warehouse", "logistics"],
      experienceSummary: "Night-shift warehouse specialist with inventory and loading experience.",
      documentBadges: ["ID Submitted", "Verification Pending"],
      workHistory: [
        { role: "Inventory Reset Crew", company: "North Yard Logistics", location: "Bhaktapur", period: "2024-2026", result: "High accuracy on overnight resets" },
        { role: "Loading Assistant", company: "Cargo Link", location: "Bhaktapur", period: "2022-2024", result: "Strong attendance record" }
      ],
      reviews: [
        { author: "North Yard Logistics", rating: 4.7, note: "Dependable for night inventory work and fast under deadlines." }
      ]
    },
    {
      id: "pool-4",
      name: "Sita Karki",
      skills: ["agriculture", "packing", "harvest"],
      locationLabel: "Kathmandu Valley",
      distanceKm: 4.6,
      avgRating: 4.6,
      verified: true,
      completionRate: 0.92,
      responseRate: 0.9,
      availability: "available",
      historyCategories: ["agriculture"],
      experienceSummary: "Seasonal harvest and packing worker with orchard and produce-line experience.",
      documentBadges: ["ID Verified", "Rural Work Permit"],
      workHistory: [
        { role: "Harvest Crew", company: "Valley Orchard", location: "Kathmandu Valley", period: "2023-2026", result: "Exceeded daily picking targets" },
        { role: "Packing Line Support", company: "Fresh Route", location: "Kathmandu", period: "2022-2023", result: "Known for careful produce handling" }
      ],
      reviews: [
        { author: "Valley Orchard", rating: 4.8, note: "Consistent output and strong stamina during peak season." }
      ]
    },
    {
      id: "pool-5",
      name: "Prakash Lama",
      skills: ["electrician", "wiring", "lighting"],
      locationLabel: "Kathmandu",
      distanceKm: 2.1,
      avgRating: 4.8,
      verified: true,
      completionRate: 0.95,
      responseRate: 0.93,
      availability: "available",
      historyCategories: ["facilities", "electrical"],
      experienceSummary: "Licensed electrician for home maintenance, hotels, and retail fit-outs.",
      documentBadges: ["ID Verified", "Electrical License", "Background Checked"],
      workHistory: [
        { role: "Electrical Technician", company: "Metro Maintenance", location: "Kathmandu", period: "2023-2026", result: "Trusted for urgent call-outs" }
      ],
      reviews: [
        { author: "Metro Maintenance", rating: 4.9, note: "Fast troubleshooting and clean handover." }
      ]
    },
    {
      id: "pool-6",
      name: "Rina Tamang",
      skills: ["nanny", "childcare", "meal prep"],
      locationLabel: "Lalitpur",
      distanceKm: 3.4,
      avgRating: 4.9,
      verified: true,
      completionRate: 0.98,
      responseRate: 0.94,
      availability: "available",
      historyCategories: ["childcare", "household"],
      experienceSummary: "Repeat-family nanny with early learning and evening support experience.",
      documentBadges: ["ID Verified", "Family References", "Childcare Experience"],
      workHistory: [
        { role: "Family Nanny", company: "Private Households", location: "Lalitpur", period: "2022-2026", result: "High repeat-booking rate" }
      ],
      reviews: [
        { author: "Karki Residence", rating: 5, note: "Reliable, calm, and great with children." }
      ]
    },
    {
      id: "pool-7",
      name: "Dinesh Shrestha",
      skills: ["driver", "delivery", "route planning"],
      locationLabel: "Bhaktapur",
      distanceKm: 5.2,
      avgRating: 4.7,
      verified: true,
      completionRate: 0.93,
      responseRate: 0.9,
      availability: "available",
      historyCategories: ["driver", "delivery"],
      experienceSummary: "Licensed commercial and family driver with strong local route knowledge.",
      documentBadges: ["ID Verified", "Driver License", "Vehicle Verified"],
      workHistory: [
        { role: "Route Driver", company: "City Drop", location: "Bhaktapur", period: "2021-2026", result: "Consistent on-time delivery" }
      ],
      reviews: [
        { author: "City Drop", rating: 4.8, note: "Safe driving and dependable communication." }
      ]
    },
    {
      id: "pool-8",
      name: "Kamal BK",
      skills: ["painting", "surface prep", "finishing"],
      locationLabel: "Kathmandu Valley",
      distanceKm: 4.1,
      avgRating: 4.6,
      verified: true,
      completionRate: 0.91,
      responseRate: 0.88,
      availability: "available",
      historyCategories: ["painting", "construction"],
      experienceSummary: "Interior and exterior painter for homes, shops, and refresh work.",
      documentBadges: ["ID Verified", "Trade Certificate"],
      workHistory: [
        { role: "Painting Contractor", company: "Fresh Coat Nepal", location: "Kathmandu", period: "2022-2026", result: "Known for quick turnarounds" }
      ],
      reviews: [
        { author: "Fresh Coat Nepal", rating: 4.7, note: "Consistent finish quality and punctuality." }
      ]
    },
    {
      id: "pool-9",
      name: "Sujan Rai",
      skills: ["security", "gate control", "event patrol"],
      locationLabel: "Kathmandu",
      distanceKm: 3.7,
      avgRating: 4.7,
      verified: true,
      completionRate: 0.94,
      responseRate: 0.92,
      availability: "available",
      historyCategories: ["security", "events"],
      experienceSummary: "Security guard for gated properties, hotels, and event access control.",
      documentBadges: ["ID Verified", "Security Clearance"],
      workHistory: [
        { role: "Event Security", company: "SafeLine Events", location: "Kathmandu", period: "2023-2026", result: "Strong incident prevention record" }
      ],
      reviews: [
        { author: "SafeLine Events", rating: 4.8, note: "Professional and attentive throughout long shifts." }
      ]
    },
    {
      id: "pool-10",
      name: "Maya Ale",
      skills: ["cook", "hospitality", "prep kitchen"],
      locationLabel: "Lalitpur",
      distanceKm: 2.9,
      avgRating: 4.8,
      verified: true,
      completionRate: 0.95,
      responseRate: 0.93,
      availability: "available",
      historyCategories: ["cook", "hospitality"],
      experienceSummary: "Home and commercial cook for short events, meal prep, and overflow service.",
      documentBadges: ["ID Verified", "Food Handling"],
      workHistory: [
        { role: "Prep Cook", company: "Garden Banquet", location: "Lalitpur", period: "2022-2026", result: "Trusted for event-day execution" }
      ],
      reviews: [
        { author: "Garden Banquet", rating: 4.9, note: "Great prep discipline and food safety habits." }
      ]
    }
  ],
  workerSearch: {
    mapMode: "Enabled",
    savedSearch: "Plumbers within 5 km rated 4.7+",
    savedSearches: [
      { id: "ss1", label: "Plumber Crew", skill: "plumbing", location: "Kathmandu Valley" },
      { id: "ss2", label: "Cleaning Team", skill: "cleaning", location: "Lalitpur" },
      { id: "ss3", label: "Warehouse Crew", skill: "warehouse", location: "Bhaktapur" }
    ]
  },
  escrow: {
    funded: true,
    status: "Awaiting completion",
    autoReleaseHours: 24,
    nextRelease: "2026-03-28 09:00"
  },
  disputes: [],
  chatStream: [
    { from: "Employer", text: "Crew check-in starts at service gate.", time: "06:10" },
    { from: "Worker", text: "Received. Two workers are already nearby.", time: "06:13" }
  ],
  hiring: [
    { candidate: "Aarav Tamang", status: "New" },
    { candidate: "Mina Gurung", status: "Invited" },
    { candidate: "Rakesh Shahi", status: "Shortlisted" }
  ]
};

const householdEmployerTemplate = {
  ...cloneTemplate(employerTemplate),
  accountType: "household",
  company: "",
  homeLabel: "Sharma Family Home",
  serviceAddress: "Jawalakhel, Lalitpur",
  skill: "Home Services",
  account: {
    registration: "Phone or email + household verification",
    onboarding: "Home hirer setup"
  },
  documents: [
    { id: "hproof", name: "Home Address Proof", status: "Missing", required: true },
    { id: "hid", name: "Primary Contact ID", status: "Missing", required: true },
    { id: "hbill", name: "Payment Method", status: "Missing", required: true },
    { id: "hsafety", name: "Emergency Contact", status: "Optional", required: false }
  ],
  profile: {
    ...cloneTemplate(employerTemplate.profile),
    logo: "Home badge pending",
    industry: "Household Services",
    size: "Family / individual",
    verificationBadge: "Pending",
    notifications: [
      "Two verified plumbers are available nearby this afternoon.",
      "Your nanny booking can require repeat-family preference and emergency contact.",
      "Escrow protects the worker payout until the home service is confirmed."
    ],
    analytics: [
      { label: "Home bookings", value: "12" },
      { label: "Repeat helpers", value: "4" },
      { label: "Average response", value: "6 min" }
    ],
    analyticsDashboard: [
      { label: "Completed Services", value: "28" },
      { label: "Trusted Favorites", value: "9" },
      { label: "Escrow Protected", value: "$1.9K" },
      { label: "Safety Notes", value: "2 active" }
    ],
    payments: [
      { reference: "home_pay_001", amount: "$90", status: "Released" },
      { reference: "home_pay_002", amount: "$120", status: "Escrow funded" }
    ]
  },
  jobs: [
    {
      id: "h1",
      title: "Kitchen Sink Plumbing Fix",
      category: "Plumbing",
      location: "Jawalakhel, Lalitpur",
      serviceAddress: "Sharma Family Home, Jawalakhel",
      status: "Open",
      applicants: 5,
      shortlisted: 1,
      escrow: false,
      spend: "Rs3500",
      broadcasted: false,
      dailyRate: 3500,
      bidStep: 300,
      biddingHistory: [3000, 3200, 3500],
      urgency: "Today",
      country: "Nepal",
      countryCode: "NP",
      payUnit: "Fixed job",
      bookingMode: "Direct booking",
      duration: "2-3 hours",
      shiftStart: "14:00",
      requiredSkillsText: "plumbing, leak repair, sink fitting",
      notes: "Please bring basic repair tools. Parking available near the gate."
    },
    {
      id: "h2",
      title: "Evening Childcare Support",
      category: "Nanny",
      location: "Bhanimandal, Lalitpur",
      serviceAddress: "Karki Residence, Bhanimandal",
      status: "Ongoing",
      applicants: 3,
      shortlisted: 1,
      escrow: true,
      spend: "Rs2400",
      broadcasted: true,
      dailyRate: 300,
      bidStep: 50,
      biddingHistory: [250, 280, 300],
      urgency: "Repeat booking",
      country: "Nepal",
      countryCode: "NP",
      payUnit: "Hourly",
      bookingMode: "Request quotes",
      duration: "4 hours",
      shiftStart: "17:30",
      requiredSkillsText: "childcare, feeding, evening routine",
      notes: "Prior family experience preferred. Emergency contact is shared after booking."
    }
  ],
  applicants: [
    {
      id: "ha1",
      name: "Aarav Tamang",
      score: "96%",
      distance: "1.6 km",
      rating: "4.9",
      invited: false,
      status: "New",
      skills: ["Plumbing", "Leak repair", "Home maintenance"],
      reliability: "95%",
      jobId: "h1",
      chatThread: [
        { from: "Worker", text: "I can inspect the sink after 2 PM and bring the usual plumbing tools.", time: "11:04" }
      ]
    },
    {
      id: "ha2",
      name: "Mina Gurung",
      score: "93%",
      distance: "2.2 km",
      rating: "4.8",
      invited: true,
      status: "Invited",
      skills: ["Nanny", "Meal prep", "Hospitality"],
      reliability: "92%",
      jobId: "h2",
      chatThread: [
        { from: "Employer", text: "This is a family booking from 5:30 PM to 9:30 PM. Are you comfortable with evening childcare?", time: "09:20" },
        { from: "Worker", text: "Yes, I have repeat-family childcare experience and can arrive by 5:15 PM.", time: "09:28" }
      ]
    }
  ],
  escrow: {
    funded: true,
    status: "Awaiting home service confirmation",
    autoReleaseHours: 12,
    nextRelease: "2026-03-28 21:30"
  },
  disputes: []
};

const adminTemplate = {
  role: "admin",
  fullName: "Regional Admin",
  contact: "admin@workshift.io",
  availability: "available",
  queue: [
    { id: "q1", name: "Amina Yusuf", type: "Worker ID", region: "Lagos", status: "Pending", risk: "Low" },
    { id: "q2", name: "Skyline Repairs Ltd.", type: "Employer Registration", region: "Delhi", status: "Pending", risk: "Medium" },
    { id: "q3", name: "Carlos Mendes", type: "Worker Certification", region: "Sao Paulo", status: "Pending", risk: "High" }
  ],
  disputes: [
    { id: "d1", title: "Late arrival claim", status: "Open", note: "Waiting for timesheet evidence" },
    { id: "d2", title: "Payment mismatch", status: "Reviewing", note: "Admin comparing job proof and escrow release" }
  ],
  analytics: [
    { label: "Daily GMV", value: "$18.4K" },
    { label: "Pending Reviews", value: "3" },
    { label: "Fraud Alerts", value: "2" }
  ],
  flaggedJobs: [
    { id: "fj1", title: "Cash-only night labor", status: "Flagged" },
    { id: "fj2", title: "Unclear work description", status: "Under review" }
  ],
  abuseReports: [
    { id: "ab1", source: "Worker", issue: "Harassment in chat", status: "Open" },
    { id: "ab2", source: "Employer", issue: "Fake availability", status: "Reviewing" }
  ],
  payments: [
    { id: "txn1", amount: "$1,900", status: "Released" },
    { id: "txn2", amount: "$620", status: "Flagged" }
  ],
  fraudAlerts: [
    { id: "fr1", title: "Rapid withdrawal velocity", status: "Queued" },
    { id: "fr2", title: "Device duplication detected", status: "Open" }
  ],
  monitoring: [
    { metric: "API latency", value: "182 ms" },
    { metric: "Queue depth", value: "12 jobs" },
    { metric: "Server health", value: "Healthy" }
  ]
};

const superAdminTemplate = {
  role: "super_admin",
  fullName: "Platform Super Admin",
  contact: "root@workshift.io",
  availability: "available",
  analytics: [
    { label: "Master GMV", value: "$2.4M" },
    { label: "Platform Revenue", value: "$288K" },
    { label: "Admin Accounts", value: "12" }
  ],
  featureFlags: [
    { id: "ff1", name: "Instant Hire", enabled: true },
    { id: "ff2", name: "Background Checks", enabled: false },
    { id: "ff3", name: "Regional Surge Pricing", enabled: true }
  ],
  commissionSettings: [
    { category: "Construction", rate: "12%" },
    { category: "Hospitality", rate: "10%" },
    { category: "Agriculture", rate: "9%" }
  ],
  admins: [
    { id: "sa1", name: "Regional Admin APAC", status: "Active", code: "ADMIN2026" },
    { id: "sa2", name: "Risk Admin Africa", status: "Suspended", code: "RISK2026" }
  ],
  payoutConfig: [
    { key: "Default Payout", value: "24 hours" },
    { key: "Gateway", value: "eSewa first in Nepal + expandable local rails" }
  ],
  globalSettings: [
    { key: "Default Currency", value: "USD" },
    { key: "Supported Countries", value: "8" },
    { key: "Languages", value: "EN, HI, NP" }
  ],
  platformConfig: [
    { key: "API Gateway", value: "Configured" },
    { key: "Maintenance Mode", value: "Off" }
  ]
};

function cloneTemplate(template) {
  return JSON.parse(JSON.stringify(template));
}


// FILE: scripts/matching.js
function toSet(values) {
  return new Set((values || []).filter(Boolean).map((value) => String(value).toLowerCase()));
}

function jaccardSimilarity(a, b) {
  const setA = toSet(a);
  const setB = toSet(b);
  const union = new Set([...setA, ...setB]);
  let intersectionCount = 0;
  setA.forEach((value) => {
    if (setB.has(value)) intersectionCount += 1;
  });
  return union.size ? intersectionCount / union.size : 0;
}

function distanceScore(distanceKm) {
  if (distanceKm <= 2) return 1;
  if (distanceKm >= 20) return 0;
  return (20 - distanceKm) / 18;
}

function normalizedRating(avgRating) {
  return Math.max(0, Math.min(1, avgRating / 5));
}

function reliabilityScore(completionRate, responseRate) {
  return completionRate * responseRate;
}

function historyBonus(historyCategories, category) {
  const normalizedCategory = String(category || "").toLowerCase();
  return (historyCategories || []).map((item) => String(item).toLowerCase()).includes(normalizedCategory) ? 1 : 0;
}

function requiredSkillsForJob(job) {
  const title = String(job?.title || "").toLowerCase();
  const category = String(job?.category || job?.requiredSkillsText || "general").toLowerCase();

  if (title.includes("plumb")) return ["plumbing", "leak fix", "pipe fitting"];
  if (category.includes("hospitality")) return ["cleaning", "hospitality", "sanitization"];
  if (category.includes("agriculture")) return ["agriculture", "harvest", "packing"];
  if (category.includes("warehouse")) return ["warehouse", "inventory", "loading"];
  return [category];
}

function scoreWorkersForJob(job, workerPool) {
  const requiredSkills = requiredSkillsForJob(job);

  return (workerPool || []).map((worker) => {
    const skillSim = jaccardSimilarity(requiredSkills, worker.skills);
    const proximity = distanceScore(worker.distanceKm);
    const ratingNorm = normalizedRating(worker.avgRating);
    const reliability = reliabilityScore(worker.completionRate, worker.responseRate);
    const history = historyBonus(worker.historyCategories, job.category);
    const available = worker.availability === "available";
    const rawScore = available
      ? (skillSim * 0.35) + (proximity * 0.25) + (ratingNorm * 0.2) + (reliability * 0.1) + (history * 0.1)
      : 0;

    return {
      ...worker,
      requiredSkills,
      skillSim,
      distanceScore: proximity,
      ratingNorm,
      reliability,
      historyBonus: history,
      available,
      matchScore: Number(rawScore.toFixed(3)),
      notify: available && rawScore >= 0.65
    };
  }).sort((left, right) => right.matchScore - left.matchScore);
}


// FILE: scripts/store.js

const APP_STORAGE_KEY = "workshift_app_data_v1";
const SESSION_STORAGE_KEY = "workshift_session_v1";
let storageWarningShown = false;

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function mergeWithTemplate(template, value) {
  if (Array.isArray(template)) {
    return Array.isArray(value) ? cloneTemplate(value) : cloneTemplate(template);
  }
  if (isPlainObject(template)) {
    const source = isPlainObject(value) ? value : {};
    const merged = {};
    Object.keys(template).forEach((key) => {
      merged[key] = mergeWithTemplate(template[key], source[key]);
    });
    Object.keys(source).forEach((key) => {
      if (!(key in merged)) merged[key] = cloneTemplate(source[key]);
    });
    return merged;
  }
  return value === undefined ? template : value;
}

function normalizeUser(user) {
  if (!user?.role) return user;
  const template = user.role === "worker"
    ? workerTemplate
    : user.role === "employer"
    ? user.accountType === "household"
      ? householdEmployerTemplate
      : employerTemplate
    : user.role === "admin"
    ? adminTemplate
    : user.role === "super_admin"
    ? superAdminTemplate
    : null;
  return template ? mergeWithTemplate(template, user) : user;
}

function normalizeAppData(data) {
  const normalized = { ...defaultAppData(), ...(data || {}) };
  normalized.registeredUsers = (normalized.registeredUsers || []).map((user) => normalizeUser(user));
  normalized.adminAccounts = Array.isArray(normalized.adminAccounts) ? normalized.adminAccounts : cloneTemplate(superAdminTemplate.admins);
  normalized.approvalQueue = Array.isArray(normalized.approvalQueue) ? normalized.approvalQueue : [];
  normalized.disputes = Array.isArray(normalized.disputes) ? normalized.disputes : cloneTemplate(adminTemplate.disputes);
  return normalized;
}

function defaultAppData() {
  return {
    registeredUsers: [],
    approvalQueue: [],
    disputes: cloneTemplate(adminTemplate.disputes),
    adminAccounts: cloneTemplate(superAdminTemplate.admins),
    superAdminCode: "ROOT2026"
  };
}

function loadAppData() {
  try {
    const saved = window.localStorage.getItem(APP_STORAGE_KEY);
    if (!saved) return defaultAppData();
    return normalizeAppData(JSON.parse(saved));
  } catch {
    return defaultAppData();
  }
}

function loadSessionState() {
  try {
    const saved = window.localStorage.getItem(SESSION_STORAGE_KEY);
    if (!saved) return {};
    return JSON.parse(saved);
  } catch {
    return {};
  }
}

const appData = loadAppData();
const savedSession = loadSessionState();

const session = {
  currentUser: savedSession.currentUser ? normalizeUser(savedSession.currentUser) : null,
  signupRole: savedSession.signupRole || "worker",
  signupEmployerType: savedSession.signupEmployerType || "business",
  signupMode: savedSession.signupMode || "self",
  signupStep: savedSession.signupStep || "work",
  loginRole: savedSession.loginRole || "worker",
  activePortalView: savedSession.activePortalView || "dashboard",
  workerJobsFilter: savedSession.workerJobsFilter || "discover",
  workerJobSearchTerm: savedSession.workerJobSearchTerm || "",
  workerJobSearchLocation: savedSession.workerJobSearchLocation || "",
  workerJobSearchCountry: savedSession.workerJobSearchCountry || "All Countries",
  selectedWorkerJob: savedSession.selectedWorkerJob || "w1",
  selectedEmployerJob: savedSession.selectedEmployerJob || "e1",
  selectedApplicant: savedSession.selectedApplicant || "a1",
  selectedSearchWorker: savedSession.selectedSearchWorker || "",
  selectedQueue: savedSession.selectedQueue || "q1",
  selectedDispute: savedSession.selectedDispute || "d1",
  employerSearchSkill: savedSession.employerSearchSkill || "",
  employerSearchLocation: savedSession.employerSearchLocation || "",
  employerSortBy: savedSession.employerSortBy || "best_match",
  employerQuickFilters: Array.isArray(savedSession.employerQuickFilters) ? savedSession.employerQuickFilters : [],
  comparisonWorkerIds: Array.isArray(savedSession.comparisonWorkerIds) ? savedSession.comparisonWorkerIds : [],
  workerProfileModalOpen: savedSession.workerProfileModalOpen || false,
  workerJobModalOpen: savedSession.workerJobModalOpen || false,
  jobPostModalOpen: savedSession.jobPostModalOpen || false,
  disputeModalOpen: savedSession.disputeModalOpen || false,
  jobPostStep: savedSession.jobPostStep || 1,
  editingJobId: savedSession.editingJobId || "",
  jobPostDraft: savedSession.jobPostDraft || null,
  disputeDraft: savedSession.disputeDraft || null,
  supabaseMarketplaceJobs: Array.isArray(savedSession.supabaseMarketplaceJobs) ? savedSession.supabaseMarketplaceJobs : [],
  toasts: [],
  activityLog: [
    "UI refactored into reusable modules.",
    "Private dashboards are now separated by role."
  ]
};

function persistAppData() {
  try {
    window.localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(appData));
  } catch {
    if (!storageWarningShown) {
      storageWarningShown = true;
      session.toasts.push({
        id: `storage-${Date.now()}`,
        title: "Limited local save",
        message: "This browser blocked local saving. The page still works, but refresh may reset recent changes."
      });
    }
  }
}

function persistSession() {
  try {
    window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({
      currentUser: session.currentUser,
      signupRole: session.signupRole,
      signupEmployerType: session.signupEmployerType,
      signupMode: session.signupMode,
      signupStep: session.signupStep,
      loginRole: session.loginRole,
      activePortalView: session.activePortalView,
      workerJobsFilter: session.workerJobsFilter,
      workerJobSearchTerm: session.workerJobSearchTerm,
      workerJobSearchLocation: session.workerJobSearchLocation,
      workerJobSearchCountry: session.workerJobSearchCountry,
      selectedWorkerJob: session.selectedWorkerJob,
      selectedEmployerJob: session.selectedEmployerJob,
      selectedApplicant: session.selectedApplicant,
      selectedSearchWorker: session.selectedSearchWorker,
      selectedQueue: session.selectedQueue,
      selectedDispute: session.selectedDispute,
      employerSearchSkill: session.employerSearchSkill,
      employerSearchLocation: session.employerSearchLocation,
      employerSortBy: session.employerSortBy,
      employerQuickFilters: session.employerQuickFilters,
      comparisonWorkerIds: session.comparisonWorkerIds,
      workerProfileModalOpen: session.workerProfileModalOpen,
      workerJobModalOpen: session.workerJobModalOpen,
      jobPostModalOpen: session.jobPostModalOpen,
      disputeModalOpen: session.disputeModalOpen,
      jobPostStep: session.jobPostStep,
      editingJobId: session.editingJobId,
      jobPostDraft: session.jobPostDraft,
      disputeDraft: session.disputeDraft,
      supabaseMarketplaceJobs: session.supabaseMarketplaceJobs
    }));
  } catch {
    if (!storageWarningShown) {
      storageWarningShown = true;
      session.toasts.push({
        id: `storage-${Date.now()}`,
        title: "Limited local save",
        message: "This browser blocked local saving. The page still works, but refresh may reset recent changes."
      });
    }
  }
}

function queueTypeFor(role) {
  return role === "employer" ? "Employer Registration" : "Worker Identity";
}

function queueRiskFor(role) {
  return role === "employer" ? "Medium" : "Low";
}

function initializeSelectionsForCurrentUser() {
  if (session.currentUser?.role === "worker") {
    const marketplaceJobs = getMarketplaceJobs();
    const appliedJob = session.currentUser.jobs.find((item) => item.applied);
    const liveMarketplaceJob = marketplaceJobs.find((item) => !item.applied);
    session.selectedWorkerJob = liveMarketplaceJob?.id || appliedJob?.id || marketplaceJobs[0]?.id || session.currentUser.jobs[0]?.id || "";
    session.workerJobsFilter = marketplaceJobs.length ? "discover" : "applied";
    session.workerJobSearchTerm = "";
    session.workerJobSearchLocation = "";
    session.workerJobSearchCountry = "All Countries";
    session.selectedDispute = session.currentUser.disputes?.[0]?.id || "";
    session.activePortalView = "dashboard";
    session.workerJobModalOpen = false;
  }
  if (session.currentUser?.role === "employer") {
    session.selectedEmployerJob = session.currentUser.jobs[0]?.id || "";
    session.selectedApplicant = session.currentUser.applicants[0]?.id || "";
    session.selectedSearchWorker = session.currentUser.workerPool[0]?.id || "";
    session.selectedDispute = session.currentUser.disputes?.[0]?.id || "";
    session.employerSearchSkill = "";
    session.employerSearchLocation = "";
    session.employerSortBy = "best_match";
    session.employerQuickFilters = [];
    session.comparisonWorkerIds = [];
    session.workerProfileModalOpen = false;
    session.activePortalView = "dashboard";
    if (!session.jobPostDraft) {
      session.jobPostDraft = defaultJobPostDraft();
    }
    if (!session.disputeDraft) {
      session.disputeDraft = defaultDisputeDraft();
    }
  }
  if (session.currentUser?.role === "worker" && !session.disputeDraft) {
    session.disputeDraft = defaultDisputeDraft();
  }
}

function defaultJobPostDraft() {
  return {
    title: "",
    category: "Agriculture",
    countryCode: "NP",
    location: "",
    serviceAddress: "",
    headcount: 1,
    dailyRate: 90,
    payUnit: "Per day",
    bookingMode: "Crew hire",
    requiredSkillsText: "",
    duration: "1 day",
    shiftStart: "06:00",
    startWindow: "",
    safetyNotes: "",
    notes: "",
    urgency: "New"
  };
}

function defaultDisputeDraft() {
  return {
    jobId: "",
    jobSupabaseId: "",
    applicationId: "",
    applicationSupabaseId: "",
    escrowId: "",
    againstProfileId: "",
    againstName: "",
    title: "",
    reason: "Payment issue",
    summary: "",
    requestedResolution: "Review and mediate",
    amount: 0,
    currencyCode: "",
    evidenceNotes: "",
    evidenceLinks: "",
    evidence: []
  };
}

function syncCurrentUserToRegistry() {
  if (!session.currentUser || !["worker", "employer"].includes(session.currentUser.role)) return;
  const index = appData.registeredUsers.findIndex((item) => item.id === session.currentUser.id);
  if (index >= 0) {
    appData.registeredUsers[index] = cloneTemplate(session.currentUser);
    persistAppData();
    persistSession();
  }
}

function hydrateAdmin() {
  const adminUser = normalizeUser(cloneTemplate(adminTemplate));
  adminUser.queue = appData.approvalQueue.length ? cloneTemplate(appData.approvalQueue) : cloneTemplate(adminTemplate.queue);
  adminUser.disputes = appData.disputes.length ? cloneTemplate(appData.disputes) : cloneTemplate(adminTemplate.disputes);
  return adminUser;
}

function hydrateSuperAdmin() {
  const superUser = normalizeUser(cloneTemplate(superAdminTemplate));
  superUser.admins = cloneTemplate(appData.adminAccounts);
  return superUser;
}

function ensureRestoredUser() {
  if (!session.currentUser || !session.currentUser.id || !["worker", "employer"].includes(session.currentUser.role)) return;
  const restored = appData.registeredUsers.find((item) => item.id === session.currentUser.id);
  if (restored) {
    session.currentUser = normalizeUser(cloneTemplate(restored));
  }
}

ensureRestoredUser();

function getAppData() {
  return appData;
}

function findRegisteredEmployerByCompany(company) {
  if (!company) return null;
  const normalized = company.trim().toLowerCase();
  return appData.registeredUsers.find((item) =>
    item.role === "employer" && (item.company || item.fullName || "").trim().toLowerCase() === normalized
  ) || null;
}

function findRegisteredWorkerByReference(reference = {}) {
  const normalizedId = (reference.id || "").trim();
  const normalizedName = (reference.fullName || reference.name || "").trim().toLowerCase();
  return appData.registeredUsers.find((item) =>
    item.role === "worker" && (
      (normalizedId && item.id === normalizedId) ||
      (normalizedName && (item.fullName || "").trim().toLowerCase() === normalizedName)
    )
  ) || null;
}

function saveRegisteredUserRecord(user) {
  if (!user?.id) return;
  const index = appData.registeredUsers.findIndex((item) => item.id === user.id);
  if (index >= 0) {
    appData.registeredUsers[index] = normalizeUser(cloneTemplate(user));
  } else {
    appData.registeredUsers.push(normalizeUser(cloneTemplate(user)));
  }
  persistAppData();
  if (session.currentUser?.id === user.id) {
    session.currentUser = cloneTemplate(user);
    persistSession();
  }
}

function getMarketplaceJobs() {
  const supabaseJobs = Array.isArray(session.supabaseMarketplaceJobs) ? session.supabaseMarketplaceJobs : [];
  const employerJobs = appData.registeredUsers
    .filter((item) => item.role === "employer")
    .flatMap((employer) => employer.jobs
      .filter((job) => ["Open", "Draft", "Ongoing"].includes(job.status))
      .map((job) => ({
        id: job.id,
        title: job.title,
        company: employer.accountType === "household"
          ? (employer.homeLabel || employer.fullName || "Verified Home Client")
          : (employer.company || employer.fullName || "Verified Employer"),
        companyLogo: employer.profile?.logoData || "",
        pay: job.dailyRate ? `${formatCountryMoney(job.dailyRate, job.countryCode || employer.countryCode || "NP")}/${job.payUnit || "day"}` : job.spend,
        distance: employer.notes?.includes("Lalitpur") ? "4 km" : "2 km",
        status: job.status,
        applied: false,
        saved: false,
        summary: `${job.category} / ${(job.serviceAddress || job.location)} / ${countryName(job.countryCode || employer.countryCode || "NP")} / ${job.bookingMode || job.urgency || "Active hiring"}`,
        skills: job.requiredSkillsText || `${job.category} / Local crew`,
        location: job.location,
        serviceAddress: job.serviceAddress || "",
        country: job.country || countryName(job.countryCode || employer.countryCode || "NP"),
        countryCode: job.countryCode || employer.countryCode || "NP",
        payUnit: job.payUnit || "day",
        bookingMode: job.bookingMode || "Crew hire",
        hirerType: job.hirerType || employer.accountType || "business"
      })));

  if (supabaseJobs.length || employerJobs.length) {
    const merged = [...supabaseJobs];
    employerJobs.forEach((job) => {
      if (!merged.some((item) => item.id === job.id || (item.supabaseId && item.supabaseId === job.supabaseId))) {
        merged.push(job);
      }
    });
    return merged;
  }

  const fallbackWorker = appData.registeredUsers.find((item) => item.role === "worker");
  if (fallbackWorker?.jobs?.length) return cloneTemplate(fallbackWorker.jobs);

  return cloneTemplate(workerTemplate.jobs);
}

function getSession() {
  return session;
}

function createUser(payload) {
  const existing = appData.registeredUsers.find((item) => item.role === payload.role && item.contact === payload.contact);
  if (existing) {
    session.currentUser = cloneTemplate(existing);
  } else if (payload.role === "worker") {
    const user = { ...cloneTemplate(workerTemplate), ...payload, id: `worker_${Date.now()}` };
    session.currentUser = normalizeUser(user);
    appData.registeredUsers.push(normalizeUser(cloneTemplate(user)));
    appData.approvalQueue.unshift({
      id: `queue_${Date.now()}`,
      accountId: user.id,
      name: user.fullName,
      type: payload.onboardingMode === "voice" ? "Worker Voice Onboarding" : payload.onboardingMode === "assisted" ? "Worker Assisted Registration" : queueTypeFor(user.role),
      region: countryName(user.countryCode || "NP"),
      status: "Pending",
      risk: queueRiskFor(user.role),
      onboardingMode: payload.onboardingMode || "self",
      helperName: payload.assistedBy || "",
      voiceLanguage: payload.voiceLanguage || ""
    });
  } else if (payload.role === "employer") {
    const template = payload.accountType === "household" ? householdEmployerTemplate : employerTemplate;
    const user = { ...cloneTemplate(template), ...payload, id: `employer_${Date.now()}` };
    session.currentUser = normalizeUser(user);
    appData.registeredUsers.push(normalizeUser(cloneTemplate(user)));
    appData.approvalQueue.unshift({
      id: `queue_${Date.now()}`,
      accountId: user.id,
      name: user.accountType === "household" ? (user.homeLabel || user.fullName) : (user.company || user.fullName),
      type: user.accountType === "household" ? "Home Hirer Verification" : queueTypeFor(user.role),
      region: countryName(user.countryCode || "NP"),
      status: "Pending",
      risk: queueRiskFor(user.role)
    });
  }

  initializeSelectionsForCurrentUser();

  persistAppData();
  persistSession();
}

function loginUser(role, contact) {
  const user = appData.registeredUsers.find((item) => item.role === role && item.contact.toLowerCase() === contact.toLowerCase());
  if (!user) return null;
  session.currentUser = normalizeUser(cloneTemplate(user));
  initializeSelectionsForCurrentUser();
  persistSession();
  return session.currentUser;
}

function loginAdmin() {
  session.currentUser = hydrateAdmin();
  session.selectedQueue = session.currentUser.queue[0]?.id || "";
  session.selectedDispute = session.currentUser.disputes[0]?.id || "";
  session.disputeDraft = defaultDisputeDraft();
  persistSession();
}

function loginSuperAdmin() {
  session.currentUser = hydrateSuperAdmin();
  persistSession();
}

function validateAdminCode(role, code) {
  if (role === "super_admin") return code === appData.superAdminCode;
  return appData.adminAccounts.some((item) => item.status === "Active" && item.code === code);
}

function updateApproval(accountId, status) {
  const queueItem = appData.approvalQueue.find((item) => item.accountId === accountId);
  if (queueItem) queueItem.status = status;

  const user = appData.registeredUsers.find((item) => item.id === accountId);
  if (user) {
    user.verificationStatus = status;
    user.approvedAt = status === "Approved" ? new Date().toISOString() : user.approvedAt;
    if (user.role === "employer") {
      user.profile.verificationBadge = status === "Approved" ? "Verified" : "Pending";
    }
    if (session.currentUser?.id === user.id) {
      session.currentUser = normalizeUser(cloneTemplate(user));
    }
  }

  if (session.currentUser?.role === "admin") {
    session.currentUser.queue = appData.approvalQueue.length ? cloneTemplate(appData.approvalQueue) : [];
  }
  persistAppData();
  persistSession();
}

function addAdminAccount(name) {
  const code = `ADM${Math.floor(1000 + Math.random() * 9000)}`;
  const record = {
    id: `admin_${Date.now()}`,
    name,
    status: "Active",
    code
  };
  appData.adminAccounts.unshift(record);
  persistAppData();
  return record;
}

function removeAdminAccount(adminId) {
  appData.adminAccounts = appData.adminAccounts.filter((item) => item.id !== adminId);
  persistAppData();
}

function logout() {
  session.currentUser = null;
  session.activePortalView = "dashboard";
  session.workerJobsFilter = "discover";
  session.workerJobSearchTerm = "";
  session.workerJobSearchLocation = "";
  session.workerJobSearchCountry = "All Countries";
  session.employerSearchSkill = "";
  session.employerSearchLocation = "";
  session.employerSortBy = "best_match";
  session.selectedSearchWorker = "";
  session.employerQuickFilters = [];
  session.comparisonWorkerIds = [];
  session.workerProfileModalOpen = false;
  session.workerJobModalOpen = false;
  session.jobPostModalOpen = false;
  session.disputeModalOpen = false;
  session.jobPostStep = 1;
  session.editingJobId = "";
  session.jobPostDraft = null;
  session.disputeDraft = null;
  session.supabaseMarketplaceJobs = [];
  persistSession();
}

function setSignupRole(role) {
  session.signupRole = role;
  if (role === "employer") {
    session.signupMode = "self";
  }
  if (role === "worker") {
    session.signupEmployerType = "business";
  }
  persistSession();
}

function setSignupEmployerType(accountType) {
  session.signupEmployerType = accountType === "household" ? "household" : "business";
  persistSession();
}

function setSignupMode(mode) {
  session.signupMode = mode;
  session.signupStep = mode === "voice" || mode === "assisted" ? "verify" : session.signupStep;
  persistSession();
}

function setSignupStep(step) {
  session.signupStep = step;
  persistSession();
}

function setLoginRole(role) {
  session.loginRole = role;
  persistSession();
}

function setPortalView(view) {
  session.activePortalView = view;
  persistSession();
}

function setWorkerJobsFilter(filter) {
  session.workerJobsFilter = filter;
  persistSession();
}

function setWorkerJobSearch(term, location, country) {
  session.workerJobSearchTerm = term;
  session.workerJobSearchLocation = location;
  session.workerJobSearchCountry = country;
  persistSession();
}

function setEmployerSearch(skill, location) {
  session.employerSearchSkill = skill;
  session.employerSearchLocation = location;
  persistSession();
}

function setEmployerSort(sortBy) {
  session.employerSortBy = sortBy;
  persistSession();
}

function setSelectedSearchWorker(workerId) {
  session.selectedSearchWorker = workerId;
  persistSession();
}

function openWorkerProfileModal(workerId = "") {
  if (workerId) session.selectedSearchWorker = workerId;
  session.workerProfileModalOpen = true;
  persistSession();
}

function closeWorkerProfileModal() {
  session.workerProfileModalOpen = false;
  persistSession();
}

function toggleEmployerQuickFilter(filter) {
  const current = new Set(session.employerQuickFilters || []);
  if (current.has(filter)) current.delete(filter);
  else current.add(filter);
  session.employerQuickFilters = [...current];
  persistSession();
}

function toggleComparisonWorker(workerId) {
  const current = [...(session.comparisonWorkerIds || [])];
  const index = current.indexOf(workerId);
  if (index >= 0) current.splice(index, 1);
  else {
    if (current.length >= 3) current.shift();
    current.push(workerId);
  }
  session.comparisonWorkerIds = current;
  persistSession();
}

function removeSavedSearch(searchId) {
  if (session.currentUser?.role !== "employer") return;
  const searches = Array.isArray(session.currentUser.workerSearch?.savedSearches)
    ? session.currentUser.workerSearch.savedSearches
    : [];
  session.currentUser.workerSearch.savedSearches = searches.filter((item) => item.id !== searchId);
  if (session.currentUser.workerSearch.savedSearch && !session.currentUser.workerSearch.savedSearches.some((item) => item.label === session.currentUser.workerSearch.savedSearch)) {
    session.currentUser.workerSearch.savedSearch = "";
  }
  persistSession();
}

function openWorkerJobModal(jobId = "") {
  if (jobId) session.selectedWorkerJob = jobId;
  session.workerJobModalOpen = true;
  persistSession();
}

function closeWorkerJobModal() {
  session.workerJobModalOpen = false;
  persistSession();
}

function openJobPostModal(jobId = "") {
  session.jobPostModalOpen = true;
  session.jobPostStep = 1;
  session.editingJobId = jobId;
  if (jobId && session.currentUser?.role === "employer") {
    const job = session.currentUser.jobs.find((item) => item.id === jobId);
    session.jobPostDraft = job ? {
      title: job.title || "",
      category: job.category || "Facilities",
      countryCode: job.countryCode || session.currentUser.countryCode || "NP",
      location: job.location || "",
      serviceAddress: job.serviceAddress || "",
      headcount: job.headcount || 1,
      dailyRate: job.dailyRate || 90,
      payUnit: job.payUnit || "Per day",
      bookingMode: job.bookingMode || "Crew hire",
      requiredSkillsText: job.requiredSkillsText || "",
      duration: job.duration || "1 day",
      shiftStart: job.shiftStart || "06:00",
      startWindow: job.startWindow || "",
      safetyNotes: job.safetyNotes || "",
      notes: job.notes || "",
      urgency: job.urgency || "New"
    } : defaultJobPostDraft();
  } else {
    session.jobPostDraft = {
      ...defaultJobPostDraft(),
      countryCode: session.currentUser?.countryCode || "NP"
    };
  }
  persistSession();
}

function closeJobPostModal() {
  session.jobPostModalOpen = false;
  session.jobPostStep = 1;
  session.editingJobId = "";
  session.jobPostDraft = {
    ...defaultJobPostDraft(),
    countryCode: session.currentUser?.countryCode || "NP"
  };
  persistSession();
}

function openDisputeModal(patch = {}) {
  session.disputeModalOpen = true;
  session.disputeDraft = {
    ...defaultDisputeDraft(),
    ...(session.disputeDraft || {}),
    ...patch
  };
  persistSession();
}

function closeDisputeModal() {
  session.disputeModalOpen = false;
  session.disputeDraft = defaultDisputeDraft();
  persistSession();
}

function saveDisputeDraft(patch) {
  session.disputeDraft = {
    ...defaultDisputeDraft(),
    ...(session.disputeDraft || {}),
    ...patch
  };
  persistSession();
}

function setJobPostStep(step) {
  session.jobPostStep = Math.max(1, Math.min(3, step));
  persistSession();
}

function saveJobPostDraft(patch) {
  session.jobPostDraft = {
    ...(session.jobPostDraft || defaultJobPostDraft()),
    ...patch
  };
  persistSession();
}

function addActivity(message) {
  session.activityLog.push(message);
}

function pushToast(title, message) {
  const id = `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
  session.toasts.push({ id, title, message });
  window.setTimeout(() => {
    session.toasts = session.toasts.filter((toast) => toast.id !== id);
    window.dispatchEvent(new CustomEvent("workshift:toast-change"));
  }, 3000);
}

function hydrateCurrentUser(user) {
  session.currentUser = normalizeUser(cloneTemplate(user));
  initializeSelectionsForCurrentUser();
  persistSession();
}

function setSupabaseMarketplaceJobs(jobs) {
  session.supabaseMarketplaceJobs = Array.isArray(jobs) ? cloneTemplate(jobs) : [];
  persistSession();
}

function saveCurrentUser() {
  syncCurrentUserToRegistry();
}

function addDisputeRecord(record) {
  appData.disputes.unshift(cloneTemplate(record));
  persistAppData();
}

function updateStoredDispute(disputeId, patch) {
  if (!disputeId) return;
  appData.disputes = (appData.disputes || []).map((item) => item.id === disputeId ? { ...item, ...cloneTemplate(patch) } : item);
  appData.registeredUsers = (appData.registeredUsers || []).map((user) => ({
    ...user,
    disputes: Array.isArray(user.disputes)
      ? user.disputes.map((item) => item.id === disputeId ? { ...item, ...cloneTemplate(patch) } : item)
      : user.disputes
  }));
  if (session.currentUser?.id && Array.isArray(session.currentUser.disputes)) {
    session.currentUser.disputes = session.currentUser.disputes.map((item) => item.id === disputeId ? { ...item, ...cloneTemplate(patch) } : item);
  }
  persistAppData();
  persistSession();
}

function selectedWorkerJob() {
  const workerJobs = session.currentUser?.jobs || [];
  const marketplaceJobs = getMarketplaceJobs();
  return workerJobs.find((job) => job.id === session.selectedWorkerJob)
    || marketplaceJobs.find((job) => job.id === session.selectedWorkerJob)
    || workerJobs[0]
    || marketplaceJobs[0];
}

function selectedEmployerJob() {
  const jobs = session.currentUser?.jobs || [];
  const fallbackTemplate = session.currentUser?.accountType === "household" ? householdEmployerTemplate : employerTemplate;
  return jobs.find((job) => job.id === session.selectedEmployerJob)
    || jobs[0]
    || cloneTemplate(fallbackTemplate.jobs[0]);
}

function selectedApplicant() {
  const applicants = session.currentUser?.applicants || [];
  return applicants.find((item) => item.id === session.selectedApplicant) || applicants[0] || {
    id: "placeholder-applicant",
    name: "No applicant selected",
    status: "New",
    distance: "N/A",
    rating: "0",
    reliability: "N/A",
    skills: [],
    chatThread: []
  };
}

function selectedSearchWorker(workerList = []) {
  const workers = Array.isArray(workerList) ? workerList : [];
  return workers.find((item) => item.id === session.selectedSearchWorker) || workers[0] || null;
}

function selectedQueueItem() {
  return session.currentUser?.queue?.find((item) => item.id === session.selectedQueue) || session.currentUser?.queue?.[0] || {
    id: "queue_empty",
    name: "No pending verification",
    type: "Verification Queue",
    region: "Global",
    status: "Empty",
    risk: "Low"
  };
}

function selectedDisputeItem() {
  return session.currentUser?.disputes?.find((item) => item.id === session.selectedDispute) || session.currentUser?.disputes?.[0] || {
    id: "dispute_empty",
    title: "No active dispute",
    status: "Closed",
    note: "No dispute is currently selected."
  };
}


// FILE: scripts/dom.js
const dom = {
  publicShell: document.querySelector("#publicShell"),
  portalShell: document.querySelector("#portalShell"),
  signupTabs: document.querySelector("#signupTabs"),
  signupEmployerTypeTabs: document.querySelector("#signupEmployerTypeTabs"),
  signupModeTabs: document.querySelector("#signupModeTabs"),
  signupForm: document.querySelector("#signupForm"),
  signupFeedback: document.querySelector("#signupFeedback"),
  loginTabs: document.querySelector("#loginTabs"),
  loginForm: document.querySelector("#loginForm"),
  loginFeedback: document.querySelector("#loginFeedback"),
  companyField: document.querySelector("#companyField"),
  companyFieldLabel: document.querySelector("#companyFieldLabel"),
  homeAddressField: document.querySelector("#homeAddressField"),
  assistedField: document.querySelector("#assistedField"),
  voiceField: document.querySelector("#voiceField"),
  workerEasySteps: document.querySelector("#workerEasySteps"),
  workerSkillPicker: document.querySelector("#workerSkillPicker"),
  assistOptions: document.querySelector("#assistOptions"),
  photoPrepTray: document.querySelector("#photoPrepTray"),
  photoPrepStatus: document.querySelector("#photoPrepStatus"),
  onboardingHint: document.querySelector("#onboardingHint"),
  onboardingGuide: document.querySelector("#onboardingGuide"),
  guideTitle: document.querySelector("#guideTitle"),
  guideModeBadge: document.querySelector("#guideModeBadge"),
  voiceGuideCard: document.querySelector("#voiceGuideCard"),
  voiceGuideText: document.querySelector("#voiceGuideText"),
  voiceGuideLanguage: document.querySelector("#voiceGuideLanguage"),
  voiceGuideTimer: document.querySelector("#voiceGuideTimer"),
  helperGuideCard: document.querySelector("#helperGuideCard"),
  helperGuideText: document.querySelector("#helperGuideText"),
  helperGuideName: document.querySelector("#helperGuideName"),
  helperGuideState: document.querySelector("#helperGuideState"),
  reviewGuideCard: document.querySelector("#reviewGuideCard"),
  reviewGuideText: document.querySelector("#reviewGuideText"),
  reviewGuideStatus: document.querySelector("#reviewGuideStatus"),
  reviewGuideEta: document.querySelector("#reviewGuideEta"),
  signupSectionTitle: document.querySelector("#signupSectionTitle"),
  signupSubmitLabel: document.querySelector("#signupSubmitLabel"),
  otpLabel: document.querySelector("#otpLabel"),
  heroWorker: document.querySelector("#heroWorker"),
  heroEmployer: document.querySelector("#heroEmployer"),
  sendOtp: document.querySelector("#sendOtp"),
  authModal: document.querySelector("#authModal"),
  authBackdrop: document.querySelector("#authBackdrop"),
  authRoleTabs: document.querySelector("#authRoleTabs"),
  authHelper: document.querySelector("#authHelper"),
  authContactField: document.querySelector("#authContactField"),
  authContact: document.querySelector("#authContact"),
  authOtpRow: document.querySelector("#authOtpRow"),
  authRequestOtp: document.querySelector("#authRequestOtp"),
  authCode: document.querySelector("#authCode"),
  authCancel: document.querySelector("#authCancel"),
  authSubmit: document.querySelector("#authSubmit"),
  authFeedback: document.querySelector("#authFeedback"),
  testimonialTrack: document.querySelector("#testimonialTrack"),
  testimonialDots: document.querySelector("#testimonialDots"),
  portalTitle: document.querySelector("#portalTitle"),
  portalRoleBadge: document.querySelector("#portalRoleBadge"),
  portalUserName: document.querySelector("#portalUserName"),
  portalSubtitle: document.querySelector("#portalSubtitle"),
  portalNav: document.querySelector("#portalNav"),
  portalContent: document.querySelector("#portalContent"),
  portalExport: document.querySelector("#portalExport"),
  logoutButton: document.querySelector("#logoutButton"),
  toastStack: document.querySelector("#toastStack")
};


// FILE: scripts/actions/public-actions.js

let authRole = "admin";

function getAuthRole() {
  return authRole;
}

function setAuthRole(role) {
  authRole = role;
}

function openSignupRole(role, employerType = "business") {
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

function openAuthModal(role = "admin") {
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

function closeAuthModal() {
  dom.authModal?.classList.add("is-hidden");
  dom.authModal?.setAttribute("aria-hidden", "true");
  if (dom.authFeedback) dom.authFeedback.textContent = "";
}

async function requestAuthOtp() {
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

async function submitAuth() {
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

async function sendOtpFeedback() {
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


// FILE: scripts/actions/portal-actions.js

function syncVisibleSearchSelection(session, job) {
  const rankedWorkers = scoreWorkersForJob(job, session.currentUser?.workerPool || []);
  const filteredWorkers = filterRankedWorkers(rankedWorkers, session);
  const sortedWorkers = sortRankedWorkers(filteredWorkers, session.employerSortBy);
  const nextWorker = sortedWorkers[0] || rankedWorkers[0] || null;
  if (nextWorker?.id) {
    setSelectedSearchWorker(nextWorker.id);
  } else {
    setSelectedSearchWorker("");
  }
}

async function syncEmployerPipelineFromSupabase(session, jobId = "") {
  if (!supabaseEnabled() || session.currentUser?.role !== "employer") return;
  const targetJobId = jobId || session.selectedEmployerJob;
  const targetJob = (session.currentUser.jobs || []).find((item) => item.id === targetJobId);
  if (!targetJob?.supabaseId) return;

  const liveApplications = await listSupabaseApplicationsForJob(targetJob.supabaseId);
  const liveApplicants = await Promise.all(liveApplications.map(async (application) => {
    const messages = await listSupabaseChatMessages(application.id);
    return mapSupabaseApplicationToEmployerApplicant(application, {
      id: targetJob.supabaseId,
      title: targetJob.title,
      category: targetJob.category,
      location: targetJob.location,
      required_skills: String(targetJob.requiredSkillsText || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    }, messages);
  }));

  session.currentUser.applicants = [
    ...(session.currentUser.applicants || []).filter((item) => item.jobId !== targetJob.id && item.jobSupabaseId !== targetJob.supabaseId),
    ...liveApplicants
  ];
  session.currentUser.hiring = [
    ...(session.currentUser.hiring || []).filter((item) => !liveApplicants.some((applicant) => applicant.name === item.candidate)),
    ...liveApplicants.map((applicant) => ({ candidate: applicant.name, status: applicant.status }))
  ];
  targetJob.applicants = liveApplicants.length;
  targetJob.shortlisted = liveApplicants.filter((applicant) => ["Shortlisted", "Invited", "Hired", "Rated"].includes(applicant.status)).length;
  if (!liveApplicants.some((applicant) => applicant.id === session.selectedApplicant)) {
    session.selectedApplicant = liveApplicants[0]?.id || "";
  }
}

async function syncWorkerPipelineFromSupabase(session) {
  if (!supabaseEnabled() || session.currentUser?.role !== "worker") return;
  const applications = await listSupabaseWorkerApplicationsWithMessages();
  const mappedApplications = applications.map((application) => mapSupabaseApplicationToWorkerApplication(application, application.messages));
  const mappedJobs = applications.map((application) => mapSupabaseApplicationToWorkerJob(application));
  session.currentUser.applications = mappedApplications;
  session.currentUser.jobs = mappedJobs;
  const selectedJob = mappedJobs.find((job) => job.id === session.selectedWorkerJob) || mappedJobs[0] || null;
  const selectedApplication = mappedApplications.find((item) => item.supabaseApplicationId === selectedJob?.supabaseApplicationId)
    || mappedApplications[0]
    || null;
  session.currentUser.chatStream = selectedApplication?.chatThread || [];
  if (selectedJob?.id) session.selectedWorkerJob = selectedJob.id;
  await syncCurrentUserDisputesFromSupabase(session);
  window.dispatchEvent(new CustomEvent("workshift:worker-live-sync"));
}

async function syncEmployerEscrowsFromSupabase(session) {
  if (!supabaseEnabled() || session.currentUser?.role !== "employer") return;
  const escrows = await listSupabaseEmployerEscrows();
  const latestEscrow = escrows[0] || null;
  session.currentUser.profile.payments = escrows.slice(0, 6).map((escrow) => mapSupabaseEscrowToAdminPayment(escrow));
  session.currentUser.escrow = latestEscrow ? {
    funded: ["funded", "released"].includes(String(latestEscrow.status || "").toLowerCase()),
    status: formatSupabaseApplicationStatus(latestEscrow.status || "draft"),
    autoReleaseHours: 24,
    nextRelease: latestEscrow.released_at || latestEscrow.refunded_at || "Pending release",
    escrowId: latestEscrow.id
  } : session.currentUser.escrow;

  const escrowByJobId = new Map(escrows.map((escrow) => [escrow.job_id, escrow]));
  (session.currentUser.jobs || []).forEach((item) => {
    const matched = escrowByJobId.get(item.supabaseId || item.jobSupabaseId || "");
    if (!matched) return;
    item.escrow = ["funded", "released"].includes(String(matched.status || "").toLowerCase());
    item.escrowId = matched.id;
  });
  await syncCurrentUserDisputesFromSupabase(session);
}

async function syncAdminStateFromSupabase(session) {
  if (!supabaseEnabled() || session.currentUser?.role !== "admin") return;
  const [queueRecords, disputeRecords, paymentRecords] = await Promise.all([
    listSupabaseAdminQueue(),
    listSupabaseDisputes(),
    listSupabaseAdminPayments()
  ]);
  session.currentUser.queue = queueRecords.map((item) => mapSupabaseReviewToQueueItem(item));
  session.currentUser.disputes = disputeRecords.map((item) => mapSupabaseDisputeToAdminItem(item));
  session.currentUser.payments = paymentRecords.map((item) => mapSupabaseEscrowToAdminPayment(item));
  if (!session.currentUser.queue.some((item) => item.id === session.selectedQueue)) {
    session.selectedQueue = session.currentUser.queue[0]?.id || "";
  }
  if (!session.currentUser.disputes.some((item) => item.id === session.selectedDispute)) {
    session.selectedDispute = session.currentUser.disputes[0]?.id || "";
  }
}

async function syncCurrentUserDisputesFromSupabase(session) {
  if (!supabaseEnabled() || !["worker", "employer"].includes(session.currentUser?.role || "")) return;
  const disputes = await listSupabaseMyDisputes();
  session.currentUser.disputes = disputes;
  if (!session.currentUser.disputes.some((item) => item.id === session.selectedDispute)) {
    session.selectedDispute = session.currentUser.disputes[0]?.id || "";
  }
}

function buildEvidenceItems(notes = "", links = "") {
  const noteItems = String(notes || "")
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean)
    .map((value, index) => ({ label: `Note ${index + 1}`, value }));
  const linkItems = String(links || "")
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean)
    .map((value, index) => ({ label: `Link ${index + 1}`, value }));
  return [...noteItems, ...linkItems];
}

function buildDisputeContext(session) {
  if (!session.currentUser || !["worker", "employer"].includes(session.currentUser.role)) return null;

  if (session.currentUser.role === "worker") {
    const job = selectedWorkerJob();
    const application = (session.currentUser.applications || []).find((item) => item.supabaseApplicationId === job?.supabaseApplicationId)
      || (session.currentUser.applications || []).find((item) => item.title === job?.title)
      || null;
    return {
      jobId: job?.id || "",
      jobSupabaseId: job?.supabaseId || "",
      applicationId: application?.supabaseApplicationId ? `sbapp-${application.supabaseApplicationId}` : application?.id || "",
      applicationSupabaseId: application?.supabaseApplicationId || "",
      escrowId: job?.escrowId || session.currentUser.escrow?.escrowId || "",
      againstProfileId: application?.employerId || job?.employerId || "",
      againstName: job?.company || "Employer",
      title: job?.title || "Current shift",
      amount: Number(String(job?.pay || "").replace(/[^\d.]/g, "")) || Number(job?.dailyRate || 0) || 0,
      currencyCode: getCountryRule(job?.countryCode || session.currentUser.countryCode || "NP").currencyCode
    };
  }

  const job = selectedEmployerJob();
  const applicant = selectedApplicant();
  return {
    jobId: job?.id || "",
    jobSupabaseId: job?.supabaseId || "",
    applicationId: applicant?.supabaseApplicationId ? `sbapp-${applicant.supabaseApplicationId}` : applicant?.id || "",
    applicationSupabaseId: applicant?.supabaseApplicationId || "",
    escrowId: job?.escrowId || session.currentUser.escrow?.escrowId || "",
    againstProfileId: applicant?.workerId || "",
    againstName: applicant?.name || "Worker",
    title: job?.title || "Current booking",
    amount: Number(job?.dailyRate || 0) * Math.max(1, Number(job?.headcount || 1)),
    currencyCode: getCountryRule(job?.countryCode || session.currentUser.countryCode || "NP").currencyCode
  };
}

function createLocalDisputeRecord(session, draft, evidence) {
  const recordId = `disp_${Date.now()}`;
  const amount = Number(draft.amount || 0);
  const title = `${draft.title || "WorkShift case"}: ${draft.reason || "Dispute opened"}`;
  const note = `${draft.requestedResolution || "Review and mediate"} / Amount ${formatCountryMoney(amount, draft.currencyCode || session.currentUser.countryCode || "NP")}`;
  const record = {
    id: recordId,
    disputeId: "",
    escrowId: draft.escrowId || "",
    title,
    status: "Open",
    note,
    amount,
    currencyCode: draft.currencyCode || getCountryRule(session.currentUser.countryCode || "NP").currencyCode,
    jobTitle: draft.title || "Work item",
    againstName: draft.againstName || "Counterparty",
    requestedResolution: draft.requestedResolution || "Review and mediate",
    summary: draft.summary || "",
    evidence,
    openedByRole: session.currentUser.role,
    openedByName: session.currentUser.accountType === "household"
      ? (session.currentUser.homeLabel || session.currentUser.fullName)
      : (session.currentUser.company || session.currentUser.fullName),
    createdAt: new Date().toISOString()
  };
  return record;
}

function ensureApplicantForWorker(employer, worker, job) {
  if (!employer || !worker) return null;
  if (!Array.isArray(employer.applicants)) employer.applicants = [];
  if (!Array.isArray(employer.hiring)) employer.hiring = [];

  let applicant = employer.applicants.find((item) => item.id === worker.id)
    || employer.applicants.find((item) => item.name === worker.fullName);

  if (!applicant) {
    applicant = {
      id: worker.id,
      name: worker.fullName,
      score: `${Math.max(65, Math.min(99, Math.round(worker.reputation?.score || 80)))}%`,
      distance: job.distance || "Nearby",
      rating: String(worker.reputation?.reviewAverage || "4.8"),
      invited: false,
      status: "New",
      photoData: worker.profile?.photoData || "",
      skills: (worker.profile?.skillsCatalog || []).map((skill) => skill.name),
      reliability: `${Math.round((((worker.reputation?.completion || 90) + (worker.reputation?.response || 90)) / 2))}%`,
      chatThread: [
        { from: "Worker", text: `Application opened for ${job.title}.`, time: "Now" }
      ]
    };
    employer.applicants.unshift(applicant);
  }

  applicant.photoData = worker.profile?.photoData || applicant.photoData || "";

  const hiringEntry = employer.hiring.find((item) => item.candidate === applicant.name);
  if (!hiringEntry) {
    employer.hiring.unshift({ candidate: applicant.name, status: applicant.status || "New" });
  }

  return applicant;
}

function ensureApplicantForPoolWorker(employer, candidate, job) {
  if (!employer || !candidate) return null;
  if (!Array.isArray(employer.applicants)) employer.applicants = [];
  if (!Array.isArray(employer.hiring)) employer.hiring = [];

  let applicant = employer.applicants.find((item) => item.id === candidate.id)
    || employer.applicants.find((item) => item.name === candidate.name);

  if (!applicant) {
    applicant = {
      id: candidate.id,
      name: candidate.name,
      score: `${Math.round((candidate.matchScore || 0.75) * 100)}%`,
      distance: `${candidate.distanceKm || "?"} km`,
      rating: String(candidate.avgRating || "4.7"),
      invited: false,
      status: "New",
      photoData: candidate.photoData || "",
      skills: candidate.skills || [],
      reliability: `${Math.round((candidate.reliability || 0.9) * 100)}%`,
      chatThread: [
        { from: "Employer", text: `Profile opened for ${job.title}.`, time: "Now" }
      ]
    };
    employer.applicants.unshift(applicant);
  }

  const hiringEntry = employer.hiring.find((item) => item.candidate === applicant.name);
  if (!hiringEntry) employer.hiring.unshift({ candidate: applicant.name, status: applicant.status || "New" });
  return applicant;
}

async function uploadDocumentAsset(token, file) {
  const session = getSession();
  if (!session.currentUser || !file) return;
  const [, docId] = token.split(":");
  const documentItem = session.currentUser.documents.find((item) => item.id === docId);
  if (!documentItem) return;

  documentItem.status = "Uploading";
  documentItem.fileName = file.name;

  const folder = `documents/${session.currentUser.role}/${session.currentUser.id || "local-user"}/${docId}`;
  const result = await uploadSupabaseFile(file, { folder });
  if (!result.ok) {
    documentItem.status = "Missing";
    pushToast("Upload issue", result.error || "The document could not be uploaded.");
    renderToasts();
    return;
  }

  documentItem.status = "Uploaded";
  documentItem.fileName = result.data?.fileName || file.name;
  documentItem.url = result.data?.url || "";
  documentItem.storagePath = result.data?.path || "";
  documentItem.storageBucket = result.data?.bucket || "";
  documentItem.storageProvider = result.data?.provider || "local-demo";
  addActivity(`Uploaded document ${documentItem.name}.`);
  pushToast("Document uploaded", `${documentItem.name} is now attached and ready for review.`);
  saveCurrentUser();
  renderPortal();
  renderToasts();
}

async function uploadDisputeEvidenceFiles(fileList) {
  const session = getSession();
  if (!session.currentUser || !fileList?.length) return;
  const files = Array.from(fileList);
  const existingDraft = session.disputeDraft || {};
  const evidence = Array.isArray(existingDraft.evidence) ? [...existingDraft.evidence] : [];

  for (const file of files) {
    const folder = `evidence/${session.currentUser.role}/${session.currentUser.id || "local-user"}`;
    const result = await uploadSupabaseFile(file, { bucket: "workshift-evidence", folder });
    if (!result.ok) {
      pushToast("Evidence upload issue", result.error || `Could not upload ${file.name}.`);
      continue;
    }
    evidence.push({
      label: `File: ${result.data?.fileName || file.name}`,
      value: result.data?.url || result.data?.path || file.name,
      fileName: result.data?.fileName || file.name,
      url: result.data?.url || "",
      path: result.data?.path || "",
      bucket: result.data?.bucket || "",
      provider: result.data?.provider || "local-demo"
    });
  }

  saveDisputeDraft({ evidence });
  pushToast("Evidence ready", `${files.length} evidence file${files.length === 1 ? "" : "s"} attached to the dispute draft.`);
  renderPortal();
  renderToasts();
}

function appendWorkerChat(worker, from, text) {
  if (!Array.isArray(worker.chatStream)) worker.chatStream = [];
  if (!worker.profile) worker.profile = {};
  if (!Array.isArray(worker.profile.chat)) worker.profile.chat = [];
  worker.chatStream.push({ from, text, time: "Now" });
  worker.profile.chat.push(`${from}: ${text}`);
}

function appendEmployerApplicantChat(employer, applicant, from, text) {
  if (!applicant) return;
  if (!Array.isArray(applicant.chatThread)) applicant.chatThread = [];
  if (!employer.profile) employer.profile = {};
  if (!Array.isArray(employer.profile.chat)) employer.profile.chat = [];
  applicant.chatThread.push({ from, text, time: "Now" });
  employer.profile.chat.push(`${from}: ${text}`);
}

function ensureWorkerNotification(worker, message) {
  if (!worker.profile) worker.profile = {};
  if (!Array.isArray(worker.profile.notifications)) worker.profile.notifications = [];
  worker.profile.notifications.unshift(message);
}

function syncWorkerJobState(worker, job, employerName, status, note) {
  if (!worker || !job) return;
  if (!Array.isArray(worker.jobs)) worker.jobs = [];
  if (!Array.isArray(worker.applications)) worker.applications = [];

  let workerJob = worker.jobs.find((item) => item.title === job.title)
    || worker.jobs.find((item) => item.id === job.id);

  if (!workerJob) {
    workerJob = {
      id: job.id,
      title: job.title,
      company: employerName,
      pay: `${formatCountryMoney(job.dailyRate, job.countryCode || "NP")}/${job.payUnit || "day"}`,
      distance: job.location || "Nearby",
      status,
      applied: true,
      saved: false,
      summary: `${job.category} / ${(job.serviceAddress || job.location)} / ${countryName(job.countryCode || "NP")} / ${job.bookingMode || "direct booking"}`,
      skills: job.requiredSkillsText || job.category,
      location: job.location,
      country: job.country || countryName(job.countryCode || "NP"),
      countryCode: job.countryCode || "NP"
    };
    worker.jobs.unshift(workerJob);
  }

  workerJob.company = employerName;
  workerJob.status = status;
  workerJob.applied = true;
  workerJob.location = job.location;
  workerJob.serviceAddress = job.serviceAddress || workerJob.serviceAddress || "";
  workerJob.pay = `${formatCountryMoney(job.dailyRate, job.countryCode || "NP")}/${job.payUnit || "day"}`;
  workerJob.skills = job.requiredSkillsText || job.category;
  workerJob.country = job.country || countryName(job.countryCode || "NP");
  workerJob.countryCode = job.countryCode || "NP";

  let application = worker.applications.find((item) => item.title === job.title);
  if (!application) {
    application = { title: job.title, status, cover: "Linked from employer workflow" };
    worker.applications.unshift(application);
  }
  application.status = status;

  ensureWorkerNotification(worker, note);
}

function exportCurrentRole() {
  const session = getSession();
  if (!session.currentUser) return;
  const payload = JSON.stringify(session.currentUser, null, 2);
  const blob = new Blob([payload], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `workshift-${session.currentUser.role}-export.json`;
  link.click();
  URL.revokeObjectURL(url);
  addActivity(`Exported ${session.currentUser.role} portal data.`);
  pushToast("Export complete", `${session.currentUser.role} data downloaded.`);
  renderToasts();
}

async function saveProfile() {
  const session = getSession();
  if (!session.currentUser) return;
  session.currentUser.fullName = document.querySelector("#profileFullName")?.value || session.currentUser.fullName;
  session.currentUser.contact = document.querySelector("#profileContact")?.value || session.currentUser.contact;
  session.currentUser.skill = document.querySelector("#profileSkill")?.value || session.currentUser.skill;
  session.currentUser.notes = document.querySelector("#profileNotes")?.value || session.currentUser.notes;
  if (session.currentUser.role === "employer") {
    session.currentUser.company = document.querySelector("#profileCompany")?.value || session.currentUser.company;
    if (session.currentUser.accountType === "household") {
      session.currentUser.homeLabel = document.querySelector("#profileCompany")?.value || session.currentUser.homeLabel;
      session.currentUser.serviceAddress = document.querySelector("#profileNotes")?.value || session.currentUser.serviceAddress;
    }
    session.currentUser.countryCode = document.querySelector("#profileCountryCode")?.value || session.currentUser.countryCode || "NP";
  }
  if (session.currentUser.role === "worker") {
    session.currentUser.countryCode = document.querySelector("#profileCountryCode")?.value || session.currentUser.countryCode || "NP";
    session.currentUser.availability = document.querySelector("#profileAvailability")?.value || session.currentUser.availability;
    session.currentUser.profile.experience = document.querySelector("#profileExperience")?.value || session.currentUser.profile.experience;
    session.currentUser.profile.bio = document.querySelector("#profileBio")?.value || session.currentUser.profile.bio;
  }
  addActivity(`Saved ${session.currentUser.role} profile changes.`);
  pushToast("Profile saved", "Changes are visible in the private portal.");
  saveCurrentUser();
  if (supabaseEnabled() && ["worker", "employer"].includes(session.currentUser.role)) {
    const result = await upsertSupabaseProfile(session.currentUser);
    if (result.ok) {
      pushToast("Supabase synced", "Profile changes were saved to the live backend.");
    } else {
      pushToast("Supabase sync issue", result.error || "Profile stayed local because the backend save failed.");
    }
  }
  renderPortal();
  renderToasts();
}

async function updateMediaPreview(kind, file) {
  const session = getSession();
  if (!session.currentUser || !file) return;
  if (kind === "worker-photo" && session.currentUser.role === "worker") {
    session.currentUser.profile.photo = file.name;
  }
  if (kind === "employer-logo" && session.currentUser.role === "employer") {
    session.currentUser.profile.logo = file.name;
  }
  const folder = `media/${session.currentUser.role}/${session.currentUser.id || "local-user"}/${kind}`;
  const result = await uploadSupabaseFile(file, { folder });
  if (!result.ok) {
    pushToast("Media issue", result.error || "The media preview could not be updated.");
    renderToasts();
    return;
  }
  if (kind === "worker-photo" && session.currentUser.role === "worker") {
    session.currentUser.profile.photoData = result.data?.url || "";
  }
  if (kind === "employer-logo" && session.currentUser.role === "employer") {
    session.currentUser.profile.logoData = result.data?.url || "";
  }
  addActivity(`Updated ${kind} preview with ${file.name}.`);
  pushToast("Media ready", `${file.name} is now visible across the portal.`);
  saveCurrentUser();
  renderPortal();
  renderToasts();
}

function markDocumentUploaded(token) {
  const session = getSession();
  const [, docId] = token.split(":");
  const documentItem = session.currentUser.documents.find((item) => item.id === docId);
  if (!documentItem) return;
  documentItem.status = "Uploaded";
  addActivity(`Uploaded document ${documentItem.name}.`);
  pushToast("Document uploaded", `${documentItem.name} marked ready for admin review.`);
  saveCurrentUser();
  renderPortal();
  renderToasts();
}

function openDisputeComposer() {
  const session = getSession();
  const context = buildDisputeContext(session);
  if (!context) return;
  openDisputeModal({
    ...context,
    reason: "Payment issue",
    requestedResolution: "Review and mediate",
    summary: "",
    evidenceNotes: "",
    evidenceLinks: ""
  });
  renderPortal();
  renderToasts();
}

async function submitDispute() {
  const session = getSession();
  if (!session.currentUser || !["worker", "employer"].includes(session.currentUser.role)) return;

  const existingDraft = session.disputeDraft || {};
  const draft = {
    ...existingDraft,
    reason: document.querySelector("#disputeReason")?.value || existingDraft.reason || "Payment issue",
    requestedResolution: document.querySelector("#disputeResolution")?.value || existingDraft.requestedResolution || "Review and mediate",
    amount: Number(document.querySelector("#disputeAmount")?.value || existingDraft.amount || 0),
    summary: document.querySelector("#disputeSummary")?.value.trim() || existingDraft.summary || "",
    evidenceNotes: document.querySelector("#disputeEvidenceNotes")?.value.trim() || existingDraft.evidenceNotes || "",
    evidenceLinks: document.querySelector("#disputeEvidenceLinks")?.value.trim() || existingDraft.evidenceLinks || ""
  };
  saveDisputeDraft(draft);

  if (!draft.summary) {
    pushToast("Dispute details", "Explain what happened before submitting the dispute.");
    renderToasts();
    return;
  }

  const evidence = [
    ...(Array.isArray(draft.evidence) ? draft.evidence : []),
    ...buildEvidenceItems(draft.evidenceNotes, draft.evidenceLinks)
  ];
  if (!evidence.length) {
    pushToast("Evidence needed", "Add at least one evidence note or reference link so admin can review the case.");
    renderToasts();
    return;
  }

  const localRecord = createLocalDisputeRecord(session, draft, evidence);
  session.currentUser.disputes = [localRecord, ...(session.currentUser.disputes || [])];
  session.selectedDispute = localRecord.id;
  addDisputeRecord(localRecord);
  if (session.currentUser.escrow?.status) {
    session.currentUser.escrow.status = "Disputed";
  }
  if (session.currentUser.role === "worker") {
    const job = selectedWorkerJob();
    const linkedEmployer = findRegisteredEmployerByCompany(job?.company || "");
    if (linkedEmployer) {
      linkedEmployer.disputes = [localRecord, ...(linkedEmployer.disputes || [])];
      saveRegisteredUserRecord(linkedEmployer);
    }
  } else {
    const applicant = selectedApplicant();
    const linkedWorker = findRegisteredWorkerByReference({ id: applicant?.id, name: applicant?.name });
    if (linkedWorker) {
      linkedWorker.disputes = [localRecord, ...(linkedWorker.disputes || [])];
      saveRegisteredUserRecord(linkedWorker);
    }
  }

  if (supabaseEnabled()) {
    const result = await createSupabaseDispute({
      applicationId: draft.applicationSupabaseId || null,
      escrowId: draft.escrowId || null,
      againstProfileId: draft.againstProfileId || null,
      reason: draft.reason,
      resolutionNote: `${draft.requestedResolution}: ${draft.summary}`,
      amount: draft.amount,
      currencyCode: draft.currencyCode || getCountryRule(session.currentUser.countryCode || "NP").currencyCode,
      evidence
    });
    if (result.ok) {
      updateStoredDispute(localRecord.id, { disputeId: result.data?.id || "" });
      if (draft.escrowId) {
        await updateSupabaseEscrowStatus(draft.escrowId, "disputed", `${draft.reason}: ${draft.summary}`);
      }
      await syncCurrentUserDisputesFromSupabase(session);
      if (session.currentUser.role === "admin") {
        await syncAdminStateFromSupabase(session);
      }
      pushToast("Supabase synced", `${draft.title || "Dispute"} was submitted to the live dispute queue.`);
    } else {
      pushToast("Supabase dispute issue", result.error || "The dispute stayed local because backend sync failed.");
    }
  }

  closeDisputeModal();
  addActivity(`Dispute opened for ${draft.title || "current job"}.`);
  pushToast("Dispute opened", `${draft.reason} was submitted with ${evidence.length} evidence item${evidence.length === 1 ? "" : "s"}.`);
  saveCurrentUser();
  renderPortal();
  renderToasts();
}

async function workerAction(action, payload = "") {
  const session = getSession();
  if ((action === "quick-open" || action === "quick-apply") && payload) {
    session.selectedWorkerJob = payload;
  }
  const job = selectedWorkerJob();
  if (action === "open-job") openWorkerJobModal(job.id);
  if (action === "quick-open") openWorkerJobModal(job.id);
  if (action === "close-job") closeWorkerJobModal();
  if (action === "apply" || action === "quick-apply") {
    const existingJob = session.currentUser.jobs.find((item) => item.id === job.id);
    if (existingJob) {
      existingJob.applied = true;
    } else {
      session.currentUser.jobs.unshift({ ...job, applied: true });
    }
    const hasApplication = session.currentUser.applications.some((item) => item.title === job.title);
    if (!hasApplication) {
      session.currentUser.applications.unshift({
        title: job.title,
        status: "Applied",
        cover: "Applied from live marketplace board",
        countryCode: job.countryCode || session.currentUser.countryCode || "NP"
      });
    }
    if (supabaseEnabled() && job.supabaseId) {
      const result = await applyToSupabaseJob(job.supabaseId, `Worker applied from ${job.country || countryName(job.countryCode || "NP")} marketplace flow.`);
      if (result.ok) {
        const application = session.currentUser.applications.find((item) => item.title === job.title);
        if (application) application.supabaseApplicationId = result.data?.id || "";
        await syncWorkerPipelineFromSupabase(session);
        pushToast("Live application", `${job.title} was submitted to the Supabase backend.`);
      } else if (!String(result.error || "").toLowerCase().includes("duplicate")) {
        pushToast("Application sync issue", result.error || "The application was saved locally only.");
      }
    }
    const linkedEmployer = findRegisteredEmployerByCompany(job.company);
    if (linkedEmployer) {
      const linkedApplicant = ensureApplicantForWorker(linkedEmployer, session.currentUser, job);
      const linkedJob = linkedEmployer.jobs.find((item) => item.title === job.title)
        || linkedEmployer.jobs.find((item) => item.location === job.location)
        || linkedEmployer.jobs[0];
      if (linkedJob) {
        linkedJob.applicants = Math.max(Number(linkedJob.applicants || 0), 0) + 1;
      }
      appendEmployerApplicantChat(linkedEmployer, linkedApplicant, "Worker", `I applied for ${job.title} and I am ready to discuss the shift details.`);
      saveRegisteredUserRecord(linkedEmployer);
    }
    closeWorkerJobModal();
  }
  if (action === "save") {
    const existingJob = session.currentUser.jobs.find((item) => item.id === job.id);
    if (existingJob) {
      existingJob.saved = !existingJob.saved;
    } else {
      session.currentUser.jobs.unshift({ ...job, saved: true, applied: false });
    }
  }
  if (action === "checkin") session.currentUser.shift.checkedIn = true;
  if (action === "proof") session.currentUser.shift.proofSubmitted = true;
  if (action === "withdraw") session.currentUser.wallet = 0;
  if (action === "toggle-availability") {
    session.currentUser.availability = session.currentUser.availability === "available" ? "offline" : "available";
  }
  if (action === "toggle-map") {
    session.currentUser.mapView = session.currentUser.mapView === "map" ? "list" : "map";
  }
  if (action === "send-chat") {
    const input = document.querySelector("#chatInput");
    const text = input?.value.trim();
    if (!text) return;
    appendWorkerChat(session.currentUser, "Worker", text);
    appendWorkerChat(session.currentUser, "Employer", "Received. Your update is visible on the live shift thread.");
    const linkedEmployer = findRegisteredEmployerByCompany(job.company);
    if (linkedEmployer) {
      const linkedApplicant = ensureApplicantForWorker(linkedEmployer, session.currentUser, job);
      appendEmployerApplicantChat(linkedEmployer, linkedApplicant, "Worker", text);
      appendEmployerApplicantChat(linkedEmployer, linkedApplicant, "Employer", "Received. Your update is visible inside the employer hiring workspace.");
      saveRegisteredUserRecord(linkedEmployer);
    }
    const currentApplication = (session.currentUser.applications || []).find((item) => item.title === job.title);
    if (supabaseEnabled() && currentApplication?.supabaseApplicationId) {
      const result = await sendSupabaseChatMessage(currentApplication.supabaseApplicationId, text, "worker");
      if (result.ok) {
        await syncWorkerPipelineFromSupabase(session);
        pushToast("Supabase synced", `Message saved to the live thread for ${job.title}.`);
      } else {
        pushToast("Supabase chat issue", result.error || "The message stayed local because backend sync failed.");
      }
    }
    input.value = "";
  }
  addActivity(`Worker action completed: ${action}.`);
  if (!["open-job", "close-job"].includes(action)) {
    pushToast("Worker update", `${action} action processed successfully.`);
  }
  saveCurrentUser();
  renderPortal();
  renderToasts();
}

async function employerAction(action, payload = "") {
  const session = getSession();
  const job = selectedEmployerJob();
  const applicant = selectedApplicant();
  const searchWorker = selectedSearchWorker(session.currentUser?.workerPool || []);
  const setHiringStatus = (name, status) => {
    const hiringItem = session.currentUser.hiring.find((item) => item.candidate === name);
    if (hiringItem) {
      hiringItem.status = status;
    } else {
      session.currentUser.hiring.unshift({ candidate: name, status });
    }
  };
  const setApplicantStatus = (status) => {
    if (!applicant) return;
    applicant.status = status;
    if (status === "Invited" || status === "Hired" || status === "Rated") {
      applicant.invited = true;
    }
    setHiringStatus(applicant.name, status);
  };
  const syncJobIfNeeded = async (message) => {
    if (supabaseEnabled() && job?.supabaseId) {
      const result = await updateSupabaseJob(job.supabaseId, job);
      if (result.ok) {
        if (message) pushToast("Supabase synced", message);
      } else {
        pushToast("Supabase sync issue", result.error || "The job update stayed local because backend sync failed.");
      }
    }
  };
  const persistApplicantStatus = async (status) => {
    const formattedStatus = formatSupabaseApplicationStatus(status);
    setApplicantStatus(formattedStatus);
    if (supabaseEnabled() && applicant?.supabaseApplicationId) {
      const result = await updateSupabaseApplicationStatus(applicant.supabaseApplicationId, status);
      if (result.ok) {
        if (status === "hired" && job?.supabaseId) {
          await updateSupabaseJob(job.supabaseId, { ...job, status: "Ongoing" });
        }
        await syncEmployerPipelineFromSupabase(session, job.id);
        pushToast("Supabase synced", `${applicant.name} is now ${formattedStatus.toLowerCase()} in the live hiring pipeline.`);
      } else {
        pushToast("Supabase sync issue", result.error || "The applicant status stayed local because backend sync failed.");
      }
    }
  };
  const syncEscrowIfNeeded = async (status, note) => {
    if (!supabaseEnabled() || !job?.supabaseId) return null;
    const workerId = applicant?.workerId || "";
    const result = await upsertSupabaseEscrowTransaction({
      applicationId: applicant?.supabaseApplicationId || null,
      jobId: job.supabaseId,
      workerId: workerId || null,
      countryCode: job.countryCode || session.currentUser.countryCode || "NP",
      grossAmount: Number(job.dailyRate || 0) * Math.max(1, Number(job.headcount || 1)),
      status,
      note
    });
    if (!result.ok) {
      pushToast("Supabase escrow issue", result.error || "Escrow stayed local because backend sync failed.");
      return null;
    }
    await syncEmployerEscrowsFromSupabase(session);
    return result.data || null;
  };

  if (action === "select-job") {
    session.selectedEmployerJob = payload;
    await syncEmployerPipelineFromSupabase(session, payload);
    await syncEmployerEscrowsFromSupabase(session);
    renderPortal();
    renderToasts();
    return;
  }

  if (action === "select-applicant") {
    session.selectedApplicant = payload;
    renderPortal();
    renderToasts();
    return;
  }

  if (action === "open-job-modal") openJobPostModal();
  if (action === "edit-job") openJobPostModal(job.id);
  if (action === "cancel-job-modal") closeJobPostModal();

  if (action === "job-modal-next" || action === "job-modal-back" || action === "save-job-post") {
    const existingDraft = session.jobPostDraft || {};
    const isHousehold = session.currentUser.accountType === "household";
    const draftPatch = {
      title: document.querySelector("#jobPostTitle") ? document.querySelector("#jobPostTitle").value.trim() : (existingDraft.title || ""),
      category: document.querySelector("#jobPostCategory") ? document.querySelector("#jobPostCategory").value : (existingDraft.category || (isHousehold ? "General Help" : "Facilities")),
      countryCode: document.querySelector("#jobPostCountry") ? document.querySelector("#jobPostCountry").value : (existingDraft.countryCode || session.currentUser.countryCode || "NP"),
      location: document.querySelector("#jobPostLocation") ? document.querySelector("#jobPostLocation").value.trim() : (existingDraft.location || ""),
      serviceAddress: document.querySelector("#jobPostServiceAddress") ? document.querySelector("#jobPostServiceAddress").value.trim() : (existingDraft.serviceAddress || ""),
      headcount: document.querySelector("#jobPostHeadcount") ? Number(document.querySelector("#jobPostHeadcount").value || 1) : Number(existingDraft.headcount || 1),
      dailyRate: document.querySelector("#jobPostRate") ? Number(document.querySelector("#jobPostRate").value || 90) : Number(existingDraft.dailyRate || 90),
      payUnit: document.querySelector("#jobPostPayUnit") ? document.querySelector("#jobPostPayUnit").value : (existingDraft.payUnit || "Per day"),
      bookingMode: document.querySelector("#jobPostBookingMode") ? document.querySelector("#jobPostBookingMode").value : (existingDraft.bookingMode || "Crew hire"),
      requiredSkillsText: document.querySelector("#jobPostSkills") ? document.querySelector("#jobPostSkills").value.trim() : (existingDraft.requiredSkillsText || ""),
      duration: document.querySelector("#jobPostDuration") ? document.querySelector("#jobPostDuration").value : (existingDraft.duration || "1 day"),
      shiftStart: document.querySelector("#jobPostShiftStart") ? document.querySelector("#jobPostShiftStart").value : (existingDraft.shiftStart || "06:00"),
      startWindow: document.querySelector("#jobPostStartWindow") ? document.querySelector("#jobPostStartWindow").value.trim() : (existingDraft.startWindow || ""),
      safetyNotes: document.querySelector("#jobPostSafetyNotes") ? document.querySelector("#jobPostSafetyNotes").value.trim() : (existingDraft.safetyNotes || ""),
      notes: document.querySelector("#jobPostNotes") ? document.querySelector("#jobPostNotes").value.trim() : (existingDraft.notes || ""),
      urgency: document.querySelector("#jobPostUrgency") ? document.querySelector("#jobPostUrgency").value : (existingDraft.urgency || "New")
    };
    saveJobPostDraft(draftPatch);
  }
  if (action === "job-modal-next") setJobPostStep(getSession().jobPostStep + 1);
  if (action === "job-modal-back") setJobPostStep(getSession().jobPostStep - 1);

  if (action === "save-job-post") {
    const draft = getSession().jobPostDraft;
    if (!draft.title || !draft.location || !draft.requiredSkillsText) {
      pushToast("Job posting", "Add title, location, and required skills before publishing.");
      renderToasts();
      return;
    }
    if (session.currentUser.accountType === "household" && !draft.serviceAddress) {
      pushToast("Home booking", "Add the home or service address before publishing the request.");
      renderToasts();
      return;
    }
    const countryRule = getCountryRule(draft.countryCode || session.currentUser.countryCode || "NP");
    if (getSession().editingJobId) {
      const existingJob = session.currentUser.jobs.find((item) => item.id === getSession().editingJobId);
      if (!existingJob) {
        pushToast("Job update", "The selected job could not be found. Please reopen the job and try again.");
        renderToasts();
        return;
      }
      Object.assign(existingJob, {
        title: draft.title,
        category: draft.category,
        hirerType: session.currentUser.accountType || "business",
        countryCode: draft.countryCode,
        country: countryRule.name,
        location: draft.location,
        serviceAddress: draft.serviceAddress,
        status: existingJob.status === "Completed" ? "Completed" : existingJob.status === "Cancelled" ? "Cancelled" : existingJob.status === "Paused" ? "Paused" : "Open",
        spend: formatCountryMoney(draft.dailyRate * draft.headcount, draft.countryCode),
        dailyRate: draft.dailyRate,
        payUnit: draft.payUnit,
        bookingMode: draft.bookingMode,
        urgency: draft.urgency,
        headcount: draft.headcount,
        requiredSkillsText: draft.requiredSkillsText,
        duration: draft.duration,
        shiftStart: draft.shiftStart,
        startWindow: draft.startWindow,
        safetyNotes: draft.safetyNotes,
        notes: draft.notes,
        biddingHistory: [...(existingJob.biddingHistory || [existingJob.dailyRate || draft.dailyRate]), draft.dailyRate]
      });
      session.selectedEmployerJob = existingJob.id;
      addActivity(`Employer updated job post ${draft.title}.`);
      pushToast("Job updated", `${draft.title} has been refreshed and republished.`);
      if (supabaseEnabled() && existingJob.supabaseId) {
        const result = await updateSupabaseJob(existingJob.supabaseId, existingJob);
        if (result.ok) {
          pushToast("Supabase synced", `${draft.title} was updated in the live backend.`);
        } else {
          pushToast("Supabase sync issue", result.error || "The job update stayed local because backend sync failed.");
        }
      }
    } else {
      const newJob = {
        id: `e${Date.now()}`,
        title: draft.title,
        category: draft.category,
        hirerType: session.currentUser.accountType || "business",
        countryCode: draft.countryCode,
        country: countryRule.name,
        location: draft.location,
        serviceAddress: draft.serviceAddress,
        status: "Open",
        applicants: 0,
        shortlisted: 0,
        escrow: false,
        spend: formatCountryMoney(draft.dailyRate * draft.headcount, draft.countryCode),
        broadcasted: false,
        dailyRate: draft.dailyRate,
        payUnit: draft.payUnit,
        bookingMode: draft.bookingMode,
        bidStep: 8,
        biddingHistory: [draft.dailyRate],
        urgency: draft.urgency,
        headcount: draft.headcount,
        requiredSkillsText: draft.requiredSkillsText,
        duration: draft.duration,
        shiftStart: draft.shiftStart,
        startWindow: draft.startWindow,
        safetyNotes: draft.safetyNotes,
        notes: draft.notes
      };
      session.currentUser.jobs.unshift(newJob);
      session.selectedEmployerJob = newJob.id;
      addActivity(`Employer created job post ${draft.title}.`);
      pushToast("Job posted", `${draft.title} is now visible in the marketplace for ${countryRule.name}.`);
      if (supabaseEnabled()) {
        const result = await createSupabaseJob(newJob);
        if (result.ok) {
          newJob.supabaseId = result.data?.id || "";
          newJob.id = newJob.supabaseId ? `sb-${newJob.supabaseId}` : newJob.id;
          session.selectedEmployerJob = newJob.id;
          pushToast("Supabase synced", `${draft.title} was published to the live backend.`);
        } else {
          pushToast("Supabase sync issue", result.error || "The job was created locally because backend publishing failed.");
        }
      }
    }
    closeJobPostModal();
  }

  if (action === "delete-job") {
    session.currentUser.jobs = session.currentUser.jobs.filter((item) => item.id !== job.id);
    session.selectedEmployerJob = session.currentUser.jobs[0]?.id || "";
    addActivity(`Employer removed job ${job.title}.`);
    pushToast("Job removed", `${job.title} was deleted from the job board.`);
  }
  if (action === "shortlist") {
    if (applicant.status === "New") job.shortlisted += 1;
    if (supabaseEnabled() && applicant?.supabaseApplicationId) await persistApplicantStatus("shortlisted");
    else setApplicantStatus("Shortlisted");
    applicant.score = "Shortlisted";
    const linkedWorker = findRegisteredWorkerByReference({ id: applicant.id, name: applicant.name });
    if (linkedWorker) {
      syncWorkerJobState(linkedWorker, job, session.currentUser.company || session.currentUser.fullName, "Shortlisted", `${session.currentUser.company || "Employer"} shortlisted you for ${job.title}.`);
      saveRegisteredUserRecord(linkedWorker);
    }
  }
  if (action === "invite") {
    if (supabaseEnabled() && applicant?.supabaseApplicationId) await persistApplicantStatus("invited");
    else setApplicantStatus("Invited");
    const linkedWorker = findRegisteredWorkerByReference({ id: applicant.id, name: applicant.name });
    if (linkedWorker) {
      syncWorkerJobState(linkedWorker, job, session.currentUser.company || session.currentUser.fullName, "Invited", `${session.currentUser.company || "Employer"} invited you to ${job.title}.`);
      saveRegisteredUserRecord(linkedWorker);
    }
  }
  if (action === "hire-worker") {
    if (supabaseEnabled() && applicant?.supabaseApplicationId) await persistApplicantStatus("hired");
    else setApplicantStatus("Hired");
    job.status = "Ongoing";
    if (!job.escrow) {
      job.escrow = true;
      session.currentUser.escrow.status = "Funded";
      const fundedEscrow = await syncEscrowIfNeeded("funded", `${job.title} escrow funded during hire.`);
      if (fundedEscrow?.id) {
        job.escrowId = fundedEscrow.id;
        session.currentUser.escrow.escrowId = fundedEscrow.id;
      }
    }
    const linkedWorker = findRegisteredWorkerByReference({ id: applicant.id, name: applicant.name });
    if (linkedWorker) {
      syncWorkerJobState(linkedWorker, job, session.currentUser.company || session.currentUser.fullName, "Hired", `${session.currentUser.company || "Employer"} hired you for ${job.title}.`);
      linkedWorker.shift.stage = "Hired";
      saveRegisteredUserRecord(linkedWorker);
    }
    pushToast("Worker hired", `${applicant.name} has been moved into an active job for ${job.title}.`);
  }
  if (action === "escrow") {
    job.escrow = true;
    session.currentUser.escrow.status = "Funded";
    if (session.currentUser.profile?.payments?.[1]) session.currentUser.profile.payments[1].status = "Escrow funded";
    const fundedEscrow = await syncEscrowIfNeeded("funded", `${job.title} escrow funded from employer workspace.`);
    if (fundedEscrow?.id) {
      job.escrowId = fundedEscrow.id;
      session.currentUser.escrow.escrowId = fundedEscrow.id;
      pushToast("Supabase synced", `${job.title} escrow funding was saved to the live backend.`);
    }
  }
  if (action === "release-escrow") {
    session.currentUser.escrow.status = "Released";
    if (session.currentUser.profile?.payments?.[1]) session.currentUser.profile.payments[1].status = "Released";
    job.escrow = true;
    if (supabaseEnabled() && (job.escrowId || session.currentUser.escrow?.escrowId)) {
      const escrowId = job.escrowId || session.currentUser.escrow?.escrowId;
      const releaseResult = await updateSupabaseEscrowStatus(escrowId, "released", `${job.title} escrow released to worker.`);
      if (releaseResult.ok) {
        const currencyCode = getCountryRule(job.countryCode || session.currentUser.countryCode || "NP").currencyCode;
        const grossAmount = Number(job.dailyRate || 0) * Math.max(1, Number(job.headcount || 1));
        const netAmount = Math.max(0, grossAmount - (grossAmount * 0.1));
        await createSupabaseWalletEntry({
          profileId: session.currentUser.id,
          escrowId,
          entryKey: `${escrowId}:employer:release`,
          direction: "debit",
          amount: grossAmount,
          currencyCode,
          status: "completed",
          note: `${job.title} employer payout released`
        });
        if (applicant?.workerId) {
          await createSupabaseWalletEntry({
            profileId: applicant.workerId,
            escrowId,
            entryKey: `${escrowId}:worker:release`,
            direction: "credit",
            amount: netAmount,
            currencyCode,
            status: "completed",
            note: `${job.title} worker payout received`
          });
        }
        await syncEmployerEscrowsFromSupabase(session);
        pushToast("Supabase synced", `${job.title} escrow release and wallet ledger updates were saved.`);
      } else {
        pushToast("Supabase escrow issue", releaseResult.error || "Escrow release stayed local because backend sync failed.");
      }
    }
  }
  if (action === "toggle-map") {
    session.currentUser.mapView = session.currentUser.mapView === "map" ? "list" : "map";
  }
  if (action === "send-chat") {
    const input = document.querySelector("#chatInput");
    const text = input?.value.trim();
    if (!text) return;
    session.currentUser.chatStream.push({ from: "Employer", text, time: "Now" });
    session.currentUser.chatStream.push({ from: "Worker", text: "Seen. Crew members received the update instantly in the live crew thread.", time: "Now" });
    if (!applicant.chatThread) applicant.chatThread = [];
    applicant.chatThread.push({ from: "Employer", text, time: "Now" });
    applicant.chatThread.push({ from: "Worker", text: "Received. I can see the update in my hiring chat.", time: "Now" });
    const linkedWorker = findRegisteredWorkerByReference({ id: applicant.id, name: applicant.name });
    if (linkedWorker) {
      appendWorkerChat(linkedWorker, "Employer", text);
      appendWorkerChat(linkedWorker, "Worker", "Received. I can see the update in my hiring chat.");
      saveRegisteredUserRecord(linkedWorker);
    }
    if (supabaseEnabled() && applicant?.supabaseApplicationId) {
      const result = await sendSupabaseChatMessage(applicant.supabaseApplicationId, text, "employer");
      if (result.ok) {
        await syncEmployerPipelineFromSupabase(session, job.id);
        pushToast("Supabase synced", `Message saved to the live thread for ${applicant.name}.`);
      } else {
        pushToast("Supabase chat issue", result.error || "The message stayed local because backend sync failed.");
      }
    }
    input.value = "";
  }
  if (action === "rate-worker") {
    session.currentUser.profile.ratings.unshift({ worker: applicant.name, score: "5/5", note: "Rated after completion" });
    if (supabaseEnabled() && applicant?.supabaseApplicationId) await persistApplicantStatus("rated");
    else setApplicantStatus("Rated");
    const linkedWorker = findRegisteredWorkerByReference({ id: applicant.id, name: applicant.name });
    if (linkedWorker) {
      syncWorkerJobState(linkedWorker, job, session.currentUser.company || session.currentUser.fullName, "Rated", `${session.currentUser.company || "Employer"} rated your work on ${job.title}.`);
      saveRegisteredUserRecord(linkedWorker);
    }
  }
  if (action === "raise-bid") {
    const input = document.querySelector("#bidIncreaseAmount");
    const raiseBy = Number(input?.value || job.bidStep || 0);
    if (!raiseBy || raiseBy < 1) {
      pushToast("Bid update", "Enter a valid wage increase first.");
      renderToasts();
      return;
    }
    job.dailyRate = Number(job.dailyRate || 0) + raiseBy;
    job.bidStep = raiseBy;
    job.biddingHistory = [...(job.biddingHistory || []), job.dailyRate];
    job.applicants += Math.max(1, Math.round(raiseBy / 4));
    job.urgency = "Boosted";
    const spendAmount = Number(String(job.spend).replace(/[^0-9.]/g, "")) || 0;
    const projectedSpend = spendAmount + (raiseBy * Math.max(1, job.shortlisted || 1));
    job.spend = formatCountryMoney(projectedSpend.toLocaleString().replace(/,/g, ""), job.countryCode || session.currentUser.countryCode || "NP");
    addActivity(`Employer raised wage bid for ${job.title} by ${formatCountryMoney(raiseBy, job.countryCode || session.currentUser.countryCode || "NP")}/day.`);
    pushToast("Wage bid raised", `${job.title} now offers ${formatCountryMoney(job.dailyRate, job.countryCode || session.currentUser.countryCode || "NP")}/day and is attracting more workers.`);
    await syncJobIfNeeded(`${job.title} wage changes were saved to the live backend.`);
  }
  if (action === "pause-job") {
    job.status = "Paused";
    addActivity(`Employer paused job ${job.title}.`);
    pushToast("Job paused", `${job.title} is hidden from active recruiting until reopened.`);
    await syncJobIfNeeded(`${job.title} was paused in the live backend.`);
  }
  if (action === "reopen-job") {
    job.status = "Open";
    addActivity(`Employer reopened job ${job.title}.`);
    pushToast("Job reopened", `${job.title} is live in the marketplace again.`);
    await syncJobIfNeeded(`${job.title} was reopened in the live backend.`);
  }
  if (action === "cancel-job") {
    job.status = "Cancelled";
    addActivity(`Employer cancelled job ${job.title}.`);
    pushToast("Job cancelled", `${job.title} was moved out of the active hiring pipeline.`);
    await syncJobIfNeeded(`${job.title} was cancelled in the live backend.`);
  }
  if (action === "search-skill") {
    const skill = document.querySelector("#employerSearchSkill")?.value.trim() || "";
    const location = document.querySelector("#employerSearchLocation")?.value.trim() || "";
    setEmployerSearch(skill, location);
    syncVisibleSearchSelection(session, job);
    addActivity(`Employer filtered worker pool by skill "${skill || "any"}" and location "${location || "any"}".`);
    pushToast("Worker search", `Updated results for ${skill || "all skills"} in ${location || "all locations"}.`);
  }
  if (action === "search-location") {
    const skill = document.querySelector("#employerSearchSkill")?.value.trim() || "";
    const locationInput = document.querySelector("#employerSearchLocation");
    const location = locationInput?.value.trim() || job.location || "";
    if (locationInput && !locationInput.value.trim() && location) {
      locationInput.value = location;
    }
    setEmployerSearch(skill, location);
    syncVisibleSearchSelection(session, job);
    addActivity(`Employer focused worker pool around "${location || "selected location"}".`);
    pushToast("Location search", `Focused the worker pool around ${location || "the selected job location"}.`);
  }
  if (action === "search-location-chip") {
    const locationInput = document.querySelector("#employerSearchLocation");
    const skill = document.querySelector("#employerSearchSkill")?.value.trim() || "";
    const location = String(payload || "").trim();
    if (locationInput) locationInput.value = location;
    setEmployerSearch(skill, location);
    syncVisibleSearchSelection(session, job);
    addActivity(`Employer selected location chip "${location || "all"}".`);
    pushToast("Location selected", `Showing workers for ${location || "all locations"}.`);
  }
  if (action === "save-search") {
    const skill = document.querySelector("#employerSearchSkill")?.value.trim() || "";
    const location = document.querySelector("#employerSearchLocation")?.value.trim() || "All Locations";
    if (!skill && !location) {
      pushToast("Saved search", "Add a skill or location before saving a search.");
      renderToasts();
      return;
    }
    if (!session.currentUser.workerSearch.savedSearches) session.currentUser.workerSearch.savedSearches = [];
    const label = `${skill || "All skills"} / ${location}`;
    session.currentUser.workerSearch.savedSearches.unshift({ id: `ss_${Date.now()}`, label, skill, location });
    session.currentUser.workerSearch.savedSearch = label;
    pushToast("Saved search", `${label} was added to saved searches.`);
  }
  if (action === "remove-saved-search") {
    removeSavedSearch(payload);
    pushToast("Saved search removed", "The saved search was removed from this employer account.");
  }
  if (action === "apply-saved-search") {
    const item = (session.currentUser.workerSearch.savedSearches || []).find((entry) => entry.id === payload);
    if (!item) return;
    const skillInput = document.querySelector("#employerSearchSkill");
    const locationInput = document.querySelector("#employerSearchLocation");
    if (skillInput) skillInput.value = item.skill || "";
    if (locationInput) locationInput.value = item.location || "";
    setEmployerSearch(item.skill || "", item.location || "");
    syncVisibleSearchSelection(session, job);
    session.currentUser.workerSearch.savedSearch = item.label;
    pushToast("Saved search", `Applied ${item.label}.`);
  }
  if (action === "set-sort") {
    setEmployerSort(payload || "best_match");
    syncVisibleSearchSelection(session, job);
    pushToast("Sort updated", "Worker results were reordered.");
  }
  if (action === "toggle-worker-filter") {
    toggleEmployerQuickFilter(payload);
    syncVisibleSearchSelection(session, job);
    pushToast("Search filter", "Worker filter updated.");
  }
  if (action === "select-search-worker") {
    setSelectedSearchWorker(payload);
  }
  if (action === "toggle-compare-worker") {
    toggleComparisonWorker(payload);
    pushToast("Comparison tray", "Worker comparison tray updated.");
  }
  if (action === "open-worker-profile") {
    const candidate = (session.currentUser.workerPool || []).find((item) => item.id === payload) || searchWorker;
    if (!candidate) return;
    openWorkerProfileModal(candidate.id);
    pushToast("Worker profile", `Opened ${candidate.name}'s hiring profile.`);
  }
  if (action === "close-worker-profile") {
    closeWorkerProfileModal();
  }
  if (action === "search-worker-chat") {
    const candidate = (session.currentUser.workerPool || []).find((item) => item.id === payload) || searchWorker;
    if (!candidate) return;
    const input = document.querySelector("#searchWorkerChatInput");
    const text = input?.value.trim();
    if (!text) {
      pushToast("Chat", "Type a message before sending.");
      renderToasts();
      return;
    }
    const linkedApplicant = ensureApplicantForPoolWorker(session.currentUser, candidate, job);
    session.selectedApplicant = linkedApplicant.id;
    appendEmployerApplicantChat(session.currentUser, linkedApplicant, "Employer", text);
    appendEmployerApplicantChat(session.currentUser, linkedApplicant, "Worker", "Received. I can see your message from the hiring search panel.");
    const linkedWorker = findRegisteredWorkerByReference({ id: linkedApplicant.id, name: linkedApplicant.name });
    if (linkedWorker) {
      appendWorkerChat(linkedWorker, "Employer", text);
      appendWorkerChat(linkedWorker, "Worker", "Received. I can see your message from the employer hiring search.");
      saveRegisteredUserRecord(linkedWorker);
    }
    input.value = "";
    pushToast("Chat sent", `Message sent to ${linkedApplicant.name}.`);
  }
  if (action === "invite-search-worker" || action === "shortlist-search-worker") {
    const candidate = (session.currentUser.workerPool || []).find((item) => item.id === payload) || searchWorker;
    if (!candidate) return;
    const linkedApplicant = ensureApplicantForPoolWorker(session.currentUser, candidate, job);
    session.selectedApplicant = linkedApplicant.id;
    setSelectedSearchWorker(candidate.id);
    const linkedWorker = findRegisteredWorkerByReference({ id: linkedApplicant.id, name: linkedApplicant.name });
    if (action === "invite-search-worker") {
      linkedApplicant.status = "Invited";
      linkedApplicant.invited = true;
      setHiringStatus(linkedApplicant.name, "Invited");
      if (linkedWorker) {
        syncWorkerJobState(linkedWorker, job, session.currentUser.company || session.currentUser.fullName, "Invited", `${session.currentUser.company || "Employer"} invited you to ${job.title}.`);
        saveRegisteredUserRecord(linkedWorker);
      }
      pushToast("Invite sent", `${linkedApplicant.name} was invited from search results.`);
    } else {
      if (linkedApplicant.status === "New") job.shortlisted += 1;
      linkedApplicant.status = "Shortlisted";
      linkedApplicant.score = "Shortlisted";
      setHiringStatus(linkedApplicant.name, "Shortlisted");
      if (linkedWorker) {
        syncWorkerJobState(linkedWorker, job, session.currentUser.company || session.currentUser.fullName, "Shortlisted", `${session.currentUser.company || "Employer"} shortlisted you for ${job.title}.`);
        saveRegisteredUserRecord(linkedWorker);
      }
      pushToast("Shortlisted", `${linkedApplicant.name} was added to the hiring shortlist.`);
    }
  }
  if (action === "clear-search") {
    const locationInput = document.querySelector("#employerSearchLocation");
    const skillInput = document.querySelector("#employerSearchSkill");
    if (skillInput) skillInput.value = "";
    if (locationInput) locationInput.value = "";
    setEmployerSearch("", "");
    syncVisibleSearchSelection(session, job);
    addActivity("Employer cleared worker search filters.");
    pushToast("Search cleared", "Worker filters were reset.");
  }

  addActivity(`Employer action completed: ${action}.`);
  if (!["search-skill", "search-location", "search-location-chip", "save-search", "remove-saved-search", "apply-saved-search", "set-sort", "toggle-worker-filter", "select-search-worker", "toggle-compare-worker", "open-worker-profile", "close-worker-profile", "search-worker-chat", "invite-search-worker", "shortlist-search-worker", "clear-search", "raise-bid", "open-job-modal", "edit-job", "cancel-job-modal", "job-modal-next", "job-modal-back", "save-job-post", "delete-job"].includes(action)) {
    pushToast("Employer update", `${action} action processed successfully.`);
  }
  saveCurrentUser();
  renderPortal();
  renderToasts();
}

async function adminAction(action) {
  const session = getSession();
  const queue = selectedQueueItem();
  const dispute = selectedDisputeItem();
  if (!queue && (action === "approve" || action === "rerequest" || action === "suspend")) return;
  if (!dispute && (action === "resolve" || action === "refund")) return;
  if (action === "approve") {
    queue.status = "Approved";
    updateApproval(queue.accountId, "Approved");
    if (supabaseEnabled() && queue.reviewId && queue.accountId) {
      const result = await updateSupabaseVerificationStatus(queue.reviewId, queue.accountId, "Approved", "Approved by admin dashboard.");
      if (result.ok) {
        await syncAdminStateFromSupabase(session);
        pushToast("Supabase synced", `${queue.name} was approved in the live verification queue.`);
      } else {
        pushToast("Supabase admin issue", result.error || "Verification stayed local because backend sync failed.");
      }
    }
  }
  if (action === "rerequest") {
    queue.status = "Re-upload requested";
    updateApproval(queue.accountId, "Re-upload requested");
    if (supabaseEnabled() && queue.reviewId && queue.accountId) {
      const result = await updateSupabaseVerificationStatus(queue.reviewId, queue.accountId, "Re-upload requested", "Admin requested another document upload.");
      if (result.ok) {
        await syncAdminStateFromSupabase(session);
        pushToast("Supabase synced", `${queue.name} was moved to re-upload requested in the live queue.`);
      } else {
        pushToast("Supabase admin issue", result.error || "Verification stayed local because backend sync failed.");
      }
    }
  }
  if (action === "suspend") {
    queue.status = "Suspended";
    updateApproval(queue.accountId, "Suspended");
    if (supabaseEnabled() && queue.reviewId && queue.accountId) {
      const result = await updateSupabaseVerificationStatus(queue.reviewId, queue.accountId, "Suspended", "Admin suspended the account during verification review.");
      if (result.ok) {
        await syncAdminStateFromSupabase(session);
        pushToast("Supabase synced", `${queue.name} was suspended in the live queue.`);
      } else {
        pushToast("Supabase admin issue", result.error || "Verification stayed local because backend sync failed.");
      }
    }
  }
  if (action === "resolve") {
    dispute.status = "Closed";
    dispute.note = "Closed by admin review.";
    updateStoredDispute(dispute.id, { status: "Closed", note: "Closed by admin review." });
    if (supabaseEnabled() && dispute.disputeId) {
      const result = await updateSupabaseDisputeStatus(dispute.disputeId, "Closed", "Closed by admin review.");
      if (result.ok) {
        await syncAdminStateFromSupabase(session);
        pushToast("Supabase synced", `${dispute.title} was closed in the live dispute inbox.`);
      } else {
        pushToast("Supabase admin issue", result.error || "Dispute stayed local because backend sync failed.");
      }
    }
  }
  if (action === "refund") {
    dispute.status = "Refund issued";
    dispute.note = "Admin issued a partial refund.";
    updateStoredDispute(dispute.id, { status: "Refund issued", note: "Admin issued a partial refund." });
    if (supabaseEnabled() && dispute.disputeId) {
      const result = await updateSupabaseDisputeStatus(dispute.disputeId, "Refund issued", "Admin issued a partial refund.");
      if (result.ok) {
        await syncAdminStateFromSupabase(session);
        const latestEscrow = (session.currentUser.payments || []).find((item) => item.id === dispute.escrowId);
        if (latestEscrow?.id) {
          await updateSupabaseEscrowStatus(latestEscrow.id, "refunded", "Refund issued by admin dispute workflow.");
        }
        pushToast("Supabase synced", `${dispute.title} refund was saved to the live backend.`);
      } else {
        pushToast("Supabase admin issue", result.error || "Refund stayed local because backend sync failed.");
      }
    } else if (supabaseEnabled()) {
      const payment = session.currentUser.payments?.[0];
      if (payment?.id) {
        await updateSupabaseEscrowStatus(payment.id, "refunded", "Refund issued from admin dashboard.");
      }
    }
  }
  addActivity(`Admin action completed: ${action}.`);
  pushToast("Admin update", `${action} action processed successfully.`);
  renderPortal();
  renderToasts();
}

function superAdminAction(action, payload = "") {
  const session = getSession();
  if (action === "save-settings") {
    addActivity("Super admin saved platform settings.");
    pushToast("Platform settings", "Commission and payout settings saved.");
  }
  if (action === "toggle-flag") {
    session.currentUser.featureFlags[0].enabled = !session.currentUser.featureFlags[0].enabled;
    addActivity(`Super admin toggled ${session.currentUser.featureFlags[0].name}.`);
    pushToast("Feature flag updated", `${session.currentUser.featureFlags[0].name} changed state.`);
  }
  if (action === "add-admin") {
    const name = document.querySelector("#newAdminName")?.value.trim();
    if (!name) {
      pushToast("Admin management", "Enter an admin name first.");
      renderToasts();
      return;
    }
    const record = addAdminAccount(name);
    session.currentUser.admins.unshift(record);
    document.querySelector("#newAdminName").value = "";
    addActivity(`Super admin created admin ${name}.`);
    pushToast("Admin created", `${name} was added as a platform admin with code ${record.code}.`);
  }
  if (action === "remove-admin") {
    session.currentUser.admins = session.currentUser.admins.filter((item) => item.id !== payload);
    removeAdminAccount(payload);
    addActivity("Super admin removed an admin account.");
    pushToast("Admin removed", "Selected admin account removed.");
  }
  renderPortal();
  renderToasts();
}


// FILE: scripts/renderers/shared.js

function mapsUrl(label) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(label)}`;
}

function formatAccountId(user) {
  if (!user?.id) return "Pending generation";
  const prefix = user.role === "employer"
    ? user.accountType === "household"
      ? "WS-HME"
      : "WS-EMP"
    : "WS-WKR";
  const suffix = user.id.split("_").at(-1)?.slice(-6) || "000000";
  return `${prefix}-${suffix.toUpperCase()}`;
}

function identityCard(user) {
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

function filterRankedWorkers(rankedWorkers, session) {
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

function sortRankedWorkers(workers, sortBy = "best_match") {
  const list = Array.isArray(workers) ? [...workers] : [];
  const byNumberDesc = (getter) => list.sort((a, b) => getter(b) - getter(a));
  const byNumberAsc = (getter) => list.sort((a, b) => getter(a) - getter(b));
  if (sortBy === "nearest") return byNumberAsc((worker) => Number(worker.distanceKm || 999));
  if (sortBy === "highest_rated") return byNumberDesc((worker) => Number(worker.avgRating || 0));
  if (sortBy === "most_reliable") return byNumberDesc((worker) => Number(worker.reliability || 0));
  return byNumberDesc((worker) => Number(worker.matchScore || 0));
}

function workerStatusBadge(applicants, workerId, workerName) {
  const applicant = (applicants || []).find((item) => item.id === workerId || item.name === workerName);
  if (!applicant) return "";
  const status = applicant.status || "New";
  const tone = applicantStatusTone(status);
  return `<span class="status-pill ${tone} worker-state-pill">${status}</span>`;
}

function workerProfileModal(session, worker) {
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

function reputationBadge(score) {
  if (score >= 90) return "Elite";
  if (score >= 80) return "Trusted";
  return "Growing";
}

function applicantStatusTone(status = "New") {
  if (status === "Rated" || status === "Hired" || status === "Invited") return "available";
  if (status === "Shortlisted") return "busy";
  return "offline";
}

function applicantStageColumn(applicants, stage, selectedId) {
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

function jobStatusTone(status = "Open") {
  if (status === "Open" || status === "Ongoing") return "available";
  if (status === "Paused") return "busy";
  return "offline";
}

function comparisonTarget(user, applicant) {
  const applicants = user.applicants || [];
  return applicants.find((item) => item.id !== applicant.id && (item.status === "Invited" || item.status === "Shortlisted"))
    || applicants.find((item) => item.id !== applicant.id)
    || applicant;
}

function stageCount(applicants, stage) {
  return (applicants || []).filter((item) => (item.status || "New") === stage).length;
}

function chatFeed(messages) {
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

function evidenceList(evidence = []) {
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

function disputeComposer(user, session) {
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

function workerMapBoard(jobs) {
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

function employerMapBoard(workers) {
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

function documentList(documents, prefix) {
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

function workerJobStatus(user, job) {
  const matched = (user.jobs || []).find((item) => item.id === job.id);
  if (matched?.applied) return { label: "Applied", tone: "available" };
  if (matched?.saved) return { label: "Saved", tone: "busy" };
  return { label: job.status || "Open", tone: job.status === "Ongoing" ? "busy" : "offline" };
}

function workerJobModal(user, session, job) {
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

function jobPostWizard(user, session) {
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


// FILE: scripts/renderers/worker.js

function workerDashboard(user) {
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
  const countryRule = getCountryRule(user.countryCode || "NP");
  const countryOptions = listCountryRules();
  const fallbackJob = availableJobs[0] || {
    id: "job_fallback",
    title: "No live job available",
    company: "WorkShift",
    pay: `${formatCountryMoney(0, user.countryCode || "NP")}/day`,
    distance: "Location pending",
    skills: "No skills listed",
    summary: "Job marketplace is loading.",
    status: "Open",
    location: "Kathmandu Valley",
    country: "Nepal"
  };
  const currentJob = userJobs.find((item) => item.applied) || job || fallbackJob;
  const currentApplication = applications.find((item) => item.title === currentJob.title) || applications[0];
  const currentChatStream = Array.isArray(currentApplication?.chatThread) && currentApplication.chatThread.length
    ? currentApplication.chatThread
    : chatStream;
  const session = getSession();
  const activeView = session.activePortalView;
  const savedJobs = userJobs.filter((item) => item.saved);
  const workerSearchTerm = String(session.workerJobSearchTerm || "").trim().toLowerCase();
  const workerSearchLocation = String(session.workerJobSearchLocation || "").trim().toLowerCase();
  const workerSearchCountry = session.workerJobSearchCountry || "All Countries";
  const allLocations = Array.from(new Set(availableJobs.map((item) => item.location || item.distance).filter(Boolean)));
  const discoverableJobs = availableJobs.filter((item) => {
    const haystack = [item.title, item.company, item.skills, item.summary].join(" ").toLowerCase();
    const itemLocation = String(item.location || item.distance || "").toLowerCase();
    const matchesTerm = !workerSearchTerm || haystack.includes(workerSearchTerm);
    const matchesLocation = !workerSearchLocation || itemLocation.includes(workerSearchLocation);
    const itemCountry = String(item.country || "Nepal").toLowerCase();
    const normalizedCountryFilter = String(workerSearchCountry || "").trim().toLowerCase();
    const matchesCountry = !normalizedCountryFilter
      || normalizedCountryFilter === "all countries"
      || itemCountry === normalizedCountryFilter;
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
  const paymentGateway = countryRule.paymentGateway || countryRule.payoutRail;
  const hiringStages = ["Applied", "Shortlisted", "Invited", "Hired", "Completed", "Paid"];
  const currentStage = currentApplication?.status || workerJobStatus(user, currentJob).label;
  return `
    <div class="stack">
      ${identityCard(user)}
      ${workerJobModal(user, session, job)}
      ${disputeComposer(user, session)}

      ${(activeView === "dashboard" || activeView === "jobs") ? `
      <section class="panel">
        <div class="dashboard-topnav">
          <div class="button-row">
            <span class="avatar-chip">${(user.fullName || "WU").slice(0, 2).toUpperCase()}</span>
            <div>
              <strong>${user.fullName || "Worker User"}</strong>
              <p>Wallet balance ${formatCountryMoney(user.wallet, user.countryCode || "NP")}</p>
            </div>
          </div>
          <div class="button-row">
            <span class="icon-chip">Wallet ${formatCountryMoney(user.wallet, user.countryCode || "NP")}</span>
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
            <div class="meta-row"><span>${currentApplication?.status || "Open"}</span><span>${currentChatStream.length} messages</span><span>${currentJob.pay}</span></div>
            ${chatFeed(currentChatStream)}
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
          <article class="info-card"><strong>Employer Thread</strong><p>${currentChatStream.length} visible messages with ${currentJob.company}</p></article>
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
          <article class="quick-card"><strong>Available Balance</strong><p>${formatCountryMoney(payoutAvailable, user.countryCode || "NP")}</p></article>
          <article class="quick-card"><strong>Pending Payout</strong><p>${formatCountryMoney(payoutPending, user.countryCode || "NP")}</p></article>
          <article class="quick-card"><strong>Weekly Earnings</strong><p>${formatCountryMoney(user.weeklyEarnings, user.countryCode || "NP")}</p></article>
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
            <label><span>Country</span><select id="workerJobSearchCountry"><option ${workerSearchCountry === "All Countries" ? "selected" : ""}>All Countries</option>${countryOptions.map((country) => `<option ${workerSearchCountry === country.name ? "selected" : ""}>${country.name}</option>`).join("")}</select></label>
          </div>
          <div class="button-row">
            <span class="icon-chip">${discoverableJobs.length} jobs found</span>
            <span class="icon-chip">${workerSearchTerm || "All job types"}</span>
            <span class="icon-chip">${workerSearchLocation || "All locations"}</span>
            <span class="icon-chip">${workerSearchCountry}</span>
          </div>
          <div class="helper-text">Current product model supports ${countryOptions.length} countries. Countries without live jobs will simply show zero matches until employers post there.</div>
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
          <label><span>Country</span><select id="profileCountryCode">${countryOptions.map((country) => `<option value="${country.code}" ${country.code === (user.countryCode || "NP") ? "selected" : ""}>${country.name}</option>`).join("")}</select></label>
          <label><span>Experience</span><input id="profileExperience" type="text" value="${profile.experience || ""}"></label>
          <label><span>Availability</span><select id="profileAvailability"><option ${user.availability === "available" ? "selected" : ""}>available</option><option ${user.availability === "busy" ? "selected" : ""}>busy</option><option ${user.availability === "offline" ? "selected" : ""}>offline</option></select></label>
        </div>
        <div class="document-grid">
          <article class="info-card"><strong>Profile Photo</strong><p>${profile.photo || "Not uploaded yet"}</p><input type="file" accept="image/*" data-preview-upload="worker-photo"></article>
          <article class="info-card"><strong>Verification Status</strong><p>${user.verificationStatus}</p></article>
          <article class="info-card"><strong>Phone Auth</strong><p>${countryRule.phoneAuthMode}</p></article>
          <article class="info-card"><strong>Payout Rail</strong><p>${countryRule.payoutRail}</p></article>
          <article class="info-card"><strong>Verification Rule</strong><p>${countryRule.verificationRule}</p></article>
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
          <article class="info-card"><strong>Country Rules</strong><p>${countryName(user.countryCode || "NP")} / ${countryRule.phoneAuthMode}</p></article>
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
          <article class="info-card"><strong>Earnings Dashboard</strong><p>Weekly ${formatCountryMoney(user.weeklyEarnings, user.countryCode || "NP")} / Monthly ${formatCountryMoney(user.monthlyEarnings, user.countryCode || "NP")} / Tax via portal export.</p></article>
          <article class="info-card"><strong>Wallet and Withdrawal</strong><p>${withdrawal.payoutMethod || countryRule.payoutRail} / ${withdrawal.schedule || "On demand"} / ${withdrawal.linkedAccount || "Not linked"}</p></article>
          <article class="info-card"><strong>Local Payment System</strong><p>${paymentGateway}${user.countryCode === "NP" ? " / Nepal-first wallet and payout path" : ""}</p></article>
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
        <h3>Disputes And Payment Safety</h3>
        <div class="document-grid">
          <article class="info-card"><strong>Current Job</strong><p>${currentJob.title} / ${currentApplication?.status || workerJobStatus(user, currentJob).label}</p></article>
          <article class="info-card"><strong>Wallet Protection</strong><p>${formatCountryMoney(user.wallet, user.countryCode || "NP")} visible / ${currentJob.status === "Rated" ? "Ready for payout review" : "Escrow and dispute trail available"}</p></article>
          <article class="info-card"><strong>Open Cases</strong><p>${(user.disputes || []).filter((item) => item.status !== "Closed").length}</p></article>
          <article class="info-card"><strong>Counterparty</strong><p>${currentJob.company}</p></article>
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
          `).join("") || `<article class="info-card"><strong>No disputes opened</strong><p>If pay, safety, timing, or service quality goes wrong, open a case here with notes and evidence.</p></article>`}
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
          <article class="info-card"><strong>Messages</strong><p>${currentChatStream.length} in this thread</p></article>
        </div>
        ${chatFeed(currentChatStream)}
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


// FILE: scripts/renderers/employer.js

function employerDashboard(user) {
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


// FILE: scripts/renderers/household.js

function householdDashboard(user) {
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
  const paymentGateway = countryRule.paymentGateway || countryRule.payoutRail;

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
          <article class="info-card"><strong>Payment Method</strong><p>${user.countryCode === "NP" ? `eSewa-first household payment flow / ${countryRule.payoutRail}` : paymentGateway}</p></article>
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


// FILE: scripts/renderers.js

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
                <div class="document-grid">
                  <article class="info-card"><strong>Opened By</strong><p>${dispute.openedByName || "Participant"}</p></article>
                  <article class="info-card"><strong>Against</strong><p>${dispute.againstName || "Counterparty"}</p></article>
                  <article class="info-card"><strong>Escrow</strong><p>${dispute.escrowId || "Not linked"}</p></article>
                  <article class="info-card"><strong>Evidence Items</strong><p>${Array.isArray(dispute.evidence) ? dispute.evidence.length : 0}</p></article>
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

function renderPublicVisibility() {
  const session = getSession();
  dom.publicShell.classList.toggle("is-hidden", Boolean(session.currentUser));
  dom.portalShell.classList.toggle("is-hidden", !session.currentUser);
}

function renderSignupRole() {
  const session = getSession();
  const selectedSkill = document.querySelector("#signupSkill")?.value || session.currentUser?.skill || "Plumbing";
  const selectedCountry = document.querySelector("#signupCountry")?.value || session.currentUser?.countryCode || "NP";
  const countryOptions = listCountryRules();
  const featuredWorkerTypes = workerTypeCatalog.slice(0, 12);

  const signupSkillSelect = document.querySelector("#signupSkill");
  if (signupSkillSelect) {
    signupSkillSelect.innerHTML = workerTypeCatalog.map((type) => `<option ${type.name === selectedSkill ? "selected" : ""}>${type.name}</option>`).join("");
  }

  const signupCountrySelect = document.querySelector("#signupCountry");
  if (signupCountrySelect) {
    signupCountrySelect.innerHTML = countryOptions.map((country) => `<option value="${country.code}" ${country.code === selectedCountry ? "selected" : ""}>${country.name}</option>`).join("");
  }

  if (dom.workerSkillPicker) {
    dom.workerSkillPicker.innerHTML = featuredWorkerTypes.map((type, index) => `
      <button class="skill-card ${type.name === selectedSkill || (!selectedSkill && index === 0) ? "is-active" : ""}" type="button" data-skill-choice="${type.name}">
        <span class="skill-icon">${type.icon}</span>
        <strong>${type.name}</strong>
        <small>${type.blurb}</small>
      </button>
    `).join("");
  }

  const globalCountryList = document.querySelector("#globalCountryList");
  if (globalCountryList) {
    globalCountryList.innerHTML = countryOptions.map((country) => `<span class="icon-chip">${country.name} (${country.currencyCode})</span>`).join("");
  }

  const workerTypeBoard = document.querySelector("#workerTypeBoard");
  if (workerTypeBoard) {
    workerTypeBoard.innerHTML = workerTypeCatalog.map((type) => `
      <article class="info-card">
        <strong>${type.name}</strong>
        <p>${type.blurb}</p>
      </article>
    `).join("");
  }

  const employerMode = session.signupRole === "employer";
  const householdEmployerMode = employerMode && session.signupEmployerType === "household";
  dom.signupTabs.querySelectorAll("[data-signup-role]").forEach((button) => {
    button.classList.toggle("active", button.dataset.signupRole === session.signupRole);
  });
  dom.signupEmployerTypeTabs?.querySelectorAll("[data-signup-employer-type]").forEach((button) => {
    button.classList.toggle("active", employerMode && button.dataset.signupEmployerType === session.signupEmployerType);
  });
  dom.signupModeTabs?.querySelectorAll("[data-signup-mode]").forEach((button) => {
    button.classList.toggle("active", button.dataset.signupMode === session.signupMode);
  });
  dom.companyField.classList.toggle("is-hidden", !employerMode);
  dom.homeAddressField?.classList.toggle("is-hidden", !householdEmployerMode);
  dom.signupEmployerTypeTabs?.classList.toggle("is-hidden", !employerMode);
  if (dom.companyFieldLabel) {
    dom.companyFieldLabel.textContent = householdEmployerMode ? "Household or Family Name" : "Company Name";
  }

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
    dom.signupSectionTitle.textContent = workerMode
      ? "Create a worker or hirer account"
      : householdEmployerMode
      ? "Create a home hirer account"
      : "Create an employer account";
  }

  if (dom.onboardingHint) {
    dom.onboardingHint.textContent = !workerMode
      ? householdEmployerMode
        ? "Home hirers use a lighter trust flow with address confirmation, payment setup, and safer short-term booking."
        : "Employer onboarding uses standard business verification and company registration."
      : session.signupMode === "assisted"
      ? "Assisted signup lets a field agent, employer, or kiosk operator create the worker account with them."
      : session.signupMode === "voice"
      ? "Voice signup uses local-language prompts, simple answers, and photo capture instead of long typing."
      : "Self signup keeps onboarding fast with OTP, icon-friendly skill selection, and simple profile setup.";
  }

  if (dom.signupSubmitLabel) {
    dom.signupSubmitLabel.textContent = !workerMode
      ? householdEmployerMode
        ? "Create Home Hirer Account"
        : "Create Employer Account"
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

function renderLoginRole() {
  const session = getSession();
  dom.loginTabs?.querySelectorAll("[data-login-role]").forEach((button) => {
    button.classList.toggle("active", button.dataset.loginRole === session.loginRole);
  });
}

function renderToasts() {
  const session = getSession();
  const toasts = Array.isArray(session.toasts) ? session.toasts : [];
  dom.toastStack.innerHTML = toasts.map((toast) => `<article class="toast"><strong>${toast.title}</strong><div>${toast.message}</div></article>`).join("");
}

function renderPortal() {
  const session = getSession();
  if (!session.currentUser) return;

  const user = session.currentUser;
  dom.portalTitle.textContent = user.role === "employer" && user.accountType === "household"
    ? "Home Hirer Portal"
    : `${user.role.charAt(0).toUpperCase() + user.role.slice(1)} Portal`;
  dom.portalRoleBadge.textContent = user.role === "employer" && user.accountType === "household" ? "HOME HIRER" : user.role.toUpperCase();
  dom.portalRoleBadge.className = `status-pill ${user.availability || "available"}`;
  dom.portalUserName.textContent = user.fullName || user.homeLabel || user.company || "WorkShift User";
  dom.portalSubtitle.textContent = user.role === "super_admin"
    ? "Platform configuration, commissions, feature flags, and master analytics"
    : user.role === "admin"
    ? "Verification, disputes, analytics, and risk moderation"
    : user.role === "employer"
    ? user.accountType === "household"
      ? "Home requests, trusted helpers, protected payments, and safer short-term bookings"
      : "Company, jobs, applicants, payments, and verification"
    : "Profile, jobs, wallet, reviews, notifications, and verification";

  const navItems = user.role === "super_admin"
    ? ["dashboard", "settings", "flags", "admins"]
    : user.role === "admin"
    ? ["dashboard", "verifications", "jobs", "disputes", "payments", "analytics"]
    : ["dashboard", "profile", "jobs", "documents"];

  dom.portalNav.innerHTML = navItems.map((item) => {
    const label = user.role === "employer" && user.accountType === "household" && item === "jobs"
      ? "Bookings"
      : item.charAt(0).toUpperCase() + item.slice(1);
    return `<button class="role-tab ${session.activePortalView === item ? "active" : ""}" type="button" data-portal-view="${item}">${label}</button>`;
  }).join("");

  if (user.role === "worker") dom.portalContent.innerHTML = workerDashboard(user);
  if (user.role === "employer") dom.portalContent.innerHTML = user.accountType === "household" ? householdDashboard(user) : employerDashboard(user);
  if (user.role === "admin") dom.portalContent.innerHTML = adminDashboard(user);
  if (user.role === "super_admin") dom.portalContent.innerHTML = superAdminDashboard(user);
}


// FILE: scripts/actions.js

function handleSignupModeClick(event) {
  const button = event.target.closest("[data-signup-mode]");
  if (!button) return;
  setSignupMode(button.dataset.signupMode);
  renderSignupRole();
}

function handleEmployerTypeClick(event) {
  const button = event.target.closest("[data-signup-employer-type]");
  if (!button) return;
  setSignupRole("employer");
  setSignupEmployerType(button.dataset.signupEmployerType);
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
  if (event.target.closest("[data-open-dispute]")) return openDisputeComposer();
  if (event.target.closest("[data-close-dispute]")) {
    closeDisputeModal();
    renderPortal();
    return;
  }
  if (event.target.closest("[data-submit-dispute]")) return submitDispute();
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
    const country = document.querySelector("#workerJobSearchCountry")?.value || "All Countries";
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
    if (countryInput) countryInput.value = "All Countries";
    setWorkerJobSearch("", "", "All Countries");
    renderPortal();
    return;
  }
  const workerLocationChip = event.target.closest("[data-worker-location-chip]");
  if (workerLocationChip) {
    const location = workerLocationChip.dataset.workerLocationChip;
    const locationInput = document.querySelector("#workerJobSearchLocation");
    if (locationInput) locationInput.value = location;
    const term = document.querySelector("#workerJobSearchTerm")?.value.trim() || "";
    const country = document.querySelector("#workerJobSearchCountry")?.value || "All Countries";
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
    const selectedApplication = (session.currentUser?.applications || []).find((item) =>
      item.supabaseApplicationId && (session.currentUser?.jobs || []).some((job) =>
        job.id === session.selectedWorkerJob && job.supabaseApplicationId === item.supabaseApplicationId
      )
    ) || (session.currentUser?.applications || []).find((item) => item.title === (session.currentUser?.jobs || []).find((job) => job.id === session.selectedWorkerJob)?.title);
    if (selectedApplication?.chatThread) {
      session.currentUser.chatStream = selectedApplication.chatThread;
    }
    renderPortal();
    return;
  }
  const employerJob = event.target.closest("[data-select-employer-job]");
  if (employerJob) {
    return employerAction("select-job", employerJob.dataset.selectEmployerJob);
  }
  const applicant = event.target.closest("[data-select-applicant]");
  if (applicant) {
    return employerAction("select-applicant", applicant.dataset.selectApplicant);
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
    return;
  }
}

function bindEvents() {
  dom.signupTabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-signup-role]");
    if (!button) return;
    setSignupRole(button.dataset.signupRole);
    renderSignupRole();
  });

  dom.signupEmployerTypeTabs?.addEventListener("click", handleEmployerTypeClick);

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
  dom.heroEmployer.addEventListener("click", () => openSignupRole("employer", "business"));
  document.querySelector("#heroHome")?.addEventListener("click", () => openSignupRole("employer", "household"));

  ["#signupName", "#signupContact", "#signupAssistedBy", "#signupVoiceLanguage", "#signupSkill", "#signupCompany", "#signupHomeAddress"].forEach((selector) => {
    document.querySelector(selector)?.addEventListener("input", () => renderSignupRole());
    document.querySelector(selector)?.addEventListener("change", () => renderSignupRole());
  });

  ["#signupCountry"].forEach((selector) => {
    document.querySelector(selector)?.addEventListener("input", () => renderSignupRole());
    document.querySelector(selector)?.addEventListener("change", () => renderSignupRole());
  });

  dom.publicShell?.addEventListener("click", (event) => {
    const cta = event.target.closest("[data-cta-role]");
    if (!cta) return;
    event.preventDefault();
    openSignupRole(cta.dataset.ctaRole, cta.dataset.signupEmployerType || "business");
  });

  dom.sendOtp.addEventListener("click", sendOtpFeedback);

  dom.signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const session = getSession();
    const fullName = document.querySelector("#signupName").value.trim();
    const contact = document.querySelector("#signupContact").value.trim();
    const company = document.querySelector("#signupCompany").value.trim();
    const assistedBy = document.querySelector("#signupAssistedBy")?.value.trim() || "";
    const voiceLanguage = document.querySelector("#signupVoiceLanguage")?.value || "Nepali";
    const payload = {
      role: session.signupRole,
      accountType: session.signupRole === "employer" ? session.signupEmployerType : "",
      fullName,
      contact,
      company,
      homeLabel: session.signupRole === "employer" && session.signupEmployerType === "household" ? company : "",
      serviceAddress: document.querySelector("#signupHomeAddress")?.value.trim() || "",
      countryCode: document.querySelector("#signupCountry")?.value || "NP",
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
    if (payload.role === "employer" && session.signupEmployerType !== "household" && !company) {
      dom.signupFeedback.textContent = "Please enter the company name for employer registration.";
      return;
    }
    if (payload.role === "employer" && session.signupEmployerType === "household" && !payload.serviceAddress) {
      dom.signupFeedback.textContent = "Please enter the home or service address for household hiring.";
      return;
    }
    if (payload.role === "worker" && session.signupMode === "assisted" && !assistedBy) {
      dom.signupFeedback.textContent = "Enter the helper or agent name to continue assisted registration.";
      return;
    }
    if (supabaseEnabled()) {
      savePendingSupabaseSignup(payload);
      const result = await requestSupabaseOtp(payload.contact, {
        shouldCreateUser: true,
        data: {
          role: payload.role,
          accountType: payload.accountType,
          fullName: payload.fullName,
          company: payload.company || "",
          serviceAddress: payload.serviceAddress || "",
          countryCode: payload.countryCode,
          onboardingMode: payload.onboardingMode || "self"
        }
      });
      dom.signupFeedback.textContent = result.ok
        ? `Supabase verification started for ${payload.contact}. Complete the delivered OTP or magic link, then return to finalize the ${payload.role} account in the real backend.`
        : `Supabase signup request failed: ${result.error}`;
      if (result.ok) {
        pushToast("Supabase signup", `Verification sent for ${payload.contact}.`);
      }
      renderToasts();
      renderSignupRole();
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

  dom.loginForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const session = getSession();
    const contact = document.querySelector("#loginContact")?.value.trim();
    if (!contact) {
      dom.loginFeedback.textContent = "Enter your registered phone or email first.";
      return;
    }
    if (supabaseEnabled()) {
      const result = await requestSupabaseOtp(contact, {
        shouldCreateUser: false,
        data: {
          intent: "login",
          role: session.loginRole
        }
      });
      dom.loginFeedback.textContent = result.ok
        ? `Supabase login verification sent to ${contact}. Complete the delivered OTP or magic link to sign in with the real backend.`
        : `Supabase login failed: ${result.error}`;
      if (result.ok) {
        pushToast("Supabase login", `Verification sent for ${contact}.`);
        renderToasts();
      }
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
  dom.authSubmit?.addEventListener("click", () => { void submitAuth(); });
  dom.authRequestOtp?.addEventListener("click", () => { void requestAuthOtp(); });
  dom.authCode?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") void submitAuth();
  });
  dom.authContact?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      void requestAuthOtp();
    }
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
    if (input.matches("[data-dispute-file-upload]")) {
      if (!input.files?.length) return;
      void uploadDisputeEvidenceFiles(input.files);
      input.value = "";
      return;
    }
    if (input.matches("[data-document-file-upload]")) {
      if (!file) return;
      void uploadDocumentAsset(input.dataset.documentFileUpload, file);
      input.value = "";
      return;
    }
    if (!file) return;
    if (input.matches("[data-preview-upload='worker-photo']")) {
      void updateMediaPreview("worker-photo", file);
      input.value = "";
      return;
    }
    if (input.matches("[data-preview-upload='employer-logo']")) {
      void updateMediaPreview("employer-logo", file);
      input.value = "";
    }
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
    window.dispatchEvent(new CustomEvent("workshift:logout"));
    renderPublicVisibility();
    renderToasts();
  });

  window.addEventListener("workshift:toast-change", renderToasts);
}


// FILE: scripts/main.js

let workerApplicationsChannel = null;
let workerMessageChannels = [];
let employerJobsChannel = null;
let employerApplicationsChannels = [];
let employerMessageChannels = [];

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
    const input = document.querySelector("[data-document-file-upload='worker:wid']");
    const file = new File(["worker id"], "worker-id.png", { type: "image/png" });
    Object.defineProperty(input, "files", { value: [file], configurable: true });
    input.dispatchEvent(new Event("change", { bubbles: true }));
    return ["Uploading", "Uploaded"].includes(getSession().currentUser.documents[0].status)
      && getSession().currentUser.documents[0].fileName === "worker-id.png";
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

    step("Employer can open a dispute with evidence", () => {
      document.querySelector("[data-portal-view='jobs']").click();
      document.querySelector("[data-select-applicant]")?.click();
      document.querySelector("[data-open-dispute]").click();
      document.querySelector("#disputeReason").value = "Payment issue";
      document.querySelector("#disputeResolution").value = "Partial refund";
      document.querySelector("#disputeAmount").value = "145";
      document.querySelector("#disputeSummary").value = "Worker completed only part of the shift and requested full payout.";
      document.querySelector("#disputeEvidenceNotes").value = "Timesheet shows 3 hours only\nChat confirms early departure";
      document.querySelector("#disputeEvidenceLinks").value = "payment-ref-001";
      document.querySelector("[data-submit-dispute]").click();
      return Array.isArray(getSession().currentUser.disputes)
        && getSession().currentUser.disputes[0]?.status === "Open"
        && Array.isArray(getSession().currentUser.disputes[0]?.evidence)
        && getSession().currentUser.disputes[0].evidence.length >= 2;
    });

    step("Admin sees and can resolve a submitted dispute", () => {
      document.querySelector("#logoutButton").click();
      document.querySelector("#authRoleTabs [data-auth-role='admin']").click();
      document.querySelector("#authCode").value = "ADMIN2026";
      document.querySelector("#authSubmit").click();
      document.querySelector("[data-select-dispute]")?.click();
      const before = getSession().currentUser.disputes[0]?.status;
      document.querySelector("[data-resolve]").click();
      return before && getSession().currentUser.disputes[0]?.status === "Closed";
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

async function hydrateSupabaseRuntime() {
  if (!supabaseEnabled()) return;

  const liveJobs = await listSupabaseJobs();
  setSupabaseMarketplaceJobs(liveJobs.map((job) => mapSupabaseJobToMarketplaceJob(job)));

  const liveProfile = await ensureSupabaseProfileFromAuth();
  if (!liveProfile) {
    renderPortal();
    return;
  }

  const user = mapSupabaseProfileToPortalUser(liveProfile);
  if (!user) return;

  if (user.role === "employer") {
    const [employerPipeline, employerEscrows, disputes] = await Promise.all([
      listSupabaseEmployerPipeline(),
      listSupabaseEmployerEscrows(),
      listSupabaseMyDisputes()
    ]);
    user.jobs = employerPipeline.map(({ job, applications }) => {
      const mapped = mapSupabaseJobToEmployerJob({
        ...job,
        application_count: applications.length
      });
      mapped.shortlisted = applications.filter((application) => ["shortlisted", "invited", "hired", "rated"].includes(String(application.status || "").toLowerCase())).length;
      const matchedEscrow = employerEscrows.find((escrow) => escrow.job_id === job.id);
      if (matchedEscrow) {
        mapped.escrow = ["funded", "released"].includes(String(matchedEscrow.status || "").toLowerCase());
        mapped.escrowId = matchedEscrow.id;
      }
      return mapped;
    });
    user.applicants = employerPipeline.flatMap(({ job, applications }) =>
      applications.map((application) => mapSupabaseApplicationToEmployerApplicant(application, job, application.messages))
    );
    user.hiring = user.applicants.map((application) => ({
      candidate: application.name,
      status: application.status
    }));
    user.profile.payments = employerEscrows.slice(0, 6).map((escrow) => mapSupabaseEscrowToAdminPayment(escrow));
    const latestEscrow = employerEscrows[0] || null;
    if (latestEscrow) {
      user.escrow = {
        funded: ["funded", "released"].includes(String(latestEscrow.status || "").toLowerCase()),
        status: latestEscrow.status,
        autoReleaseHours: 24,
        nextRelease: latestEscrow.released_at || latestEscrow.refunded_at || "Pending release",
        escrowId: latestEscrow.id
      };
    }
    user.disputes = disputes;
  }

  if (user.role === "worker") {
    const [workerApplications, workerEscrows, walletEntries, disputes] = await Promise.all([
      listSupabaseWorkerApplicationsWithMessages(),
      listSupabaseWorkerEscrows(),
      listSupabaseWalletEntriesForCurrentProfile(),
      listSupabaseMyDisputes()
    ]);
    user.applications = workerApplications.map((application) => mapSupabaseApplicationToWorkerApplication(application, application.messages));
    user.jobs = workerApplications.map((application) => mapSupabaseApplicationToWorkerJob(application));
    user.chatStream = user.applications[0]?.chatThread || [];
    user.wallet = Math.max(0, summarizeSupabaseLedger(walletEntries));
    user.weeklyEarnings = workerEscrows
      .filter((escrow) => String(escrow.status || "").toLowerCase() === "released")
      .reduce((sum, escrow) => sum + Number(escrow.net_amount || 0), 0);
    user.monthlyEarnings = user.weeklyEarnings;
    user.disputes = disputes;
  }

  if (user.role === "admin") {
    const [queueRecords, disputeRecords, paymentRecords] = await Promise.all([
      listSupabaseAdminQueue(),
      listSupabaseDisputes(),
      listSupabaseAdminPayments()
    ]);
    user.queue = queueRecords.map((item) => mapSupabaseReviewToQueueItem(item));
    user.disputes = disputeRecords.map((item) => mapSupabaseDisputeToAdminItem(item));
    user.payments = paymentRecords.map((item) => mapSupabaseEscrowToAdminPayment(item));
  }

  hydrateCurrentUser(user);
  renderPublicVisibility();
  renderPortal();
  renderToasts();
  await setupSupabaseLiveSubscriptions();
}

async function refreshEmployerSupabaseState() {
  const session = getSession();
  if (!supabaseEnabled() || session.currentUser?.role !== "employer") return;
  const [employerPipeline, employerEscrows, disputes] = await Promise.all([
    listSupabaseEmployerPipeline(),
    listSupabaseEmployerEscrows(),
    listSupabaseMyDisputes()
  ]);
  const jobs = employerPipeline.map(({ job, applications }) => {
    const mapped = mapSupabaseJobToEmployerJob({
      ...job,
      application_count: applications.length
    });
    mapped.shortlisted = applications.filter((application) => ["shortlisted", "invited", "hired", "rated"].includes(String(application.status || "").toLowerCase())).length;
    const matchedEscrow = employerEscrows.find((escrow) => escrow.job_id === job.id);
    if (matchedEscrow) {
      mapped.escrow = ["funded", "released"].includes(String(matchedEscrow.status || "").toLowerCase());
      mapped.escrowId = matchedEscrow.id;
    }
    return mapped;
  });
  const applicants = employerPipeline.flatMap(({ job, applications }) =>
    applications.map((application) => mapSupabaseApplicationToEmployerApplicant(application, job, application.messages))
  );
  const selectedJob = jobs.find((job) => job.id === session.selectedEmployerJob) || jobs[0] || null;
  const selectedApplicant = applicants.find((applicant) =>
    applicant.id === session.selectedApplicant
    && (
      applicant.jobId === selectedJob?.id
      || applicant.jobSupabaseId === selectedJob?.supabaseId
    )
  ) || applicants.find((applicant) =>
    applicant.jobId === selectedJob?.id
    || applicant.jobSupabaseId === selectedJob?.supabaseId
  ) || null;

  hydrateCurrentUser({
    ...session.currentUser,
    jobs,
    applicants,
    hiring: applicants.map((application) => ({
      candidate: application.name,
      status: application.status
    })),
    profile: {
      ...(session.currentUser.profile || {}),
      payments: employerEscrows.slice(0, 6).map((escrow) => mapSupabaseEscrowToAdminPayment(escrow))
    },
    escrow: employerEscrows[0] ? {
      funded: ["funded", "released"].includes(String(employerEscrows[0].status || "").toLowerCase()),
      status: employerEscrows[0].status,
      autoReleaseHours: 24,
      nextRelease: employerEscrows[0].released_at || employerEscrows[0].refunded_at || "Pending release",
      escrowId: employerEscrows[0].id
    } : session.currentUser.escrow,
    disputes,
    chatStream: selectedApplicant?.chatThread || session.currentUser.chatStream || []
  });

  if (selectedJob?.id) session.selectedEmployerJob = selectedJob.id;
  if (selectedApplicant?.id) session.selectedApplicant = selectedApplicant.id;
  await setupSupabaseLiveSubscriptions();
  renderPortal();
  renderToasts();
}

async function refreshWorkerSupabaseState() {
  const session = getSession();
  if (!supabaseEnabled() || session.currentUser?.role !== "worker") return;
  const [workerApplications, workerEscrows, walletEntries, disputes] = await Promise.all([
    listSupabaseWorkerApplicationsWithMessages(),
    listSupabaseWorkerEscrows(),
    listSupabaseWalletEntriesForCurrentProfile(),
    listSupabaseMyDisputes()
  ]);
  const jobs = workerApplications.map((application) => mapSupabaseApplicationToWorkerJob(application));
  const applications = workerApplications.map((application) => mapSupabaseApplicationToWorkerApplication(application, application.messages));
  const selectedJob = jobs.find((job) => job.id === session.selectedWorkerJob) || jobs[0] || null;
  const selectedApplication = applications.find((application) => application.supabaseApplicationId === selectedJob?.supabaseApplicationId)
    || applications[0]
    || null;
  hydrateCurrentUser({
    ...session.currentUser,
    jobs,
    applications,
    wallet: Math.max(0, summarizeSupabaseLedger(walletEntries)),
    weeklyEarnings: workerEscrows
      .filter((escrow) => String(escrow.status || "").toLowerCase() === "released")
      .reduce((sum, escrow) => sum + Number(escrow.net_amount || 0), 0),
    monthlyEarnings: workerEscrows
      .filter((escrow) => String(escrow.status || "").toLowerCase() === "released")
      .reduce((sum, escrow) => sum + Number(escrow.net_amount || 0), 0),
    disputes,
    chatStream: selectedApplication?.chatThread || session.currentUser.chatStream || []
  });
  await setupSupabaseLiveSubscriptions();
  renderPortal();
  renderToasts();
}

function clearWorkerLiveSubscriptions() {
  if (workerApplicationsChannel) {
    unsubscribeSupabaseChannel(workerApplicationsChannel);
    workerApplicationsChannel = null;
  }
  workerMessageChannels.forEach((channel) => unsubscribeSupabaseChannel(channel));
  workerMessageChannels = [];
}

function clearEmployerLiveSubscriptions() {
  if (employerJobsChannel) {
    unsubscribeSupabaseChannel(employerJobsChannel);
    employerJobsChannel = null;
  }
  employerApplicationsChannels.forEach((channel) => unsubscribeSupabaseChannel(channel));
  employerApplicationsChannels = [];
  employerMessageChannels.forEach((channel) => unsubscribeSupabaseChannel(channel));
  employerMessageChannels = [];
}

async function setupSupabaseLiveSubscriptions() {
  const session = getSession();
  clearWorkerLiveSubscriptions();
  clearEmployerLiveSubscriptions();
  if (!supabaseEnabled() || !session.currentUser?.id) return;

  if (session.currentUser.role === "worker") {
    workerApplicationsChannel = subscribeToSupabaseWorkerApplications(session.currentUser.id, () => {
      void refreshWorkerSupabaseState();
    });

    const applications = Array.isArray(session.currentUser.applications) ? session.currentUser.applications : [];
    workerMessageChannels = applications
      .filter((application) => application.supabaseApplicationId)
      .map((application) => subscribeToSupabaseApplicationMessages(application.supabaseApplicationId, () => {
        void refreshWorkerSupabaseState();
      }))
      .filter(Boolean);
    return;
  }

  if (session.currentUser.role !== "employer") return;

  employerJobsChannel = subscribeToSupabaseEmployerJobs(session.currentUser.id, () => {
    void refreshEmployerSupabaseState();
  });

  const jobs = Array.isArray(session.currentUser.jobs) ? session.currentUser.jobs : [];
  employerApplicationsChannels = jobs
    .filter((job) => job.supabaseId)
    .map((job) => subscribeToSupabaseJobApplications(job.supabaseId, () => {
      void refreshEmployerSupabaseState();
    }))
    .filter(Boolean);

  const applicants = Array.isArray(session.currentUser.applicants) ? session.currentUser.applicants : [];
  employerMessageChannels = applicants
    .filter((application) => application.supabaseApplicationId)
    .map((application) => subscribeToSupabaseApplicationMessages(application.supabaseApplicationId, () => {
      void refreshEmployerSupabaseState();
    }))
    .filter(Boolean);
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
    void hydrateSupabaseRuntime();
    window.__workshiftBooted = true;
    document.body.dataset.workshiftReady = "true";
    window.addEventListener("workshift:logout", () => {
      clearWorkerLiveSubscriptions();
      clearEmployerLiveSubscriptions();
    });
    window.addEventListener("workshift:worker-live-sync", () => {
      void setupSupabaseLiveSubscriptions();
    });
    window.addEventListener("workshift:hydrate-supabase", () => {
      void hydrateSupabaseRuntime();
    });
  } catch (error) {
    window.__workshiftBooted = false;
    if (typeof window.__workshiftShowIssue === "function") {
      window.__workshiftShowIssue(`Interactive startup failed: ${error.message}`);
    }
    throw error;
  }
}

init();
