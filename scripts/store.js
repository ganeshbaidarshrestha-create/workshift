import { adminTemplate, cloneTemplate, employerTemplate, superAdminTemplate, workerTemplate } from "./data.js";

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
    ? employerTemplate
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
  return normalized;
}

function defaultAppData() {
  return {
    registeredUsers: [],
    approvalQueue: [],
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
  signupMode: savedSession.signupMode || "self",
  signupStep: savedSession.signupStep || "work",
  loginRole: savedSession.loginRole || "worker",
  activePortalView: savedSession.activePortalView || "dashboard",
  workerJobsFilter: savedSession.workerJobsFilter || "discover",
  workerJobSearchTerm: savedSession.workerJobSearchTerm || "",
  workerJobSearchLocation: savedSession.workerJobSearchLocation || "",
  workerJobSearchCountry: savedSession.workerJobSearchCountry || "Nepal",
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
  jobPostStep: savedSession.jobPostStep || 1,
  editingJobId: savedSession.editingJobId || "",
  jobPostDraft: savedSession.jobPostDraft || null,
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
      jobPostStep: session.jobPostStep,
      editingJobId: session.editingJobId,
      jobPostDraft: session.jobPostDraft
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
    session.workerJobSearchCountry = "Nepal";
    session.activePortalView = "dashboard";
    session.workerJobModalOpen = false;
  }
  if (session.currentUser?.role === "employer") {
    session.selectedEmployerJob = session.currentUser.jobs[0]?.id || "";
    session.selectedApplicant = session.currentUser.applicants[0]?.id || "";
    session.selectedSearchWorker = session.currentUser.workerPool[0]?.id || "";
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
  }
}

function defaultJobPostDraft() {
  return {
    title: "",
    category: "Agriculture",
    location: "",
    headcount: 1,
    dailyRate: 90,
    requiredSkillsText: "",
    duration: "1 day",
    shiftStart: "06:00",
    notes: "",
    urgency: "New"
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

export function getAppData() {
  return appData;
}

export function findRegisteredEmployerByCompany(company) {
  if (!company) return null;
  const normalized = company.trim().toLowerCase();
  return appData.registeredUsers.find((item) =>
    item.role === "employer" && (item.company || item.fullName || "").trim().toLowerCase() === normalized
  ) || null;
}

export function findRegisteredWorkerByReference(reference = {}) {
  const normalizedId = (reference.id || "").trim();
  const normalizedName = (reference.fullName || reference.name || "").trim().toLowerCase();
  return appData.registeredUsers.find((item) =>
    item.role === "worker" && (
      (normalizedId && item.id === normalizedId) ||
      (normalizedName && (item.fullName || "").trim().toLowerCase() === normalizedName)
    )
  ) || null;
}

export function saveRegisteredUserRecord(user) {
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

export function getMarketplaceJobs() {
  const employerJobs = appData.registeredUsers
    .filter((item) => item.role === "employer")
    .flatMap((employer) => employer.jobs
      .filter((job) => ["Open", "Draft", "Ongoing"].includes(job.status))
      .map((job) => ({
        id: job.id,
        title: job.title,
        company: employer.company || employer.fullName || "Verified Employer",
        companyLogo: employer.profile?.logoData || "",
        pay: job.dailyRate ? `$${job.dailyRate}/day` : job.spend,
        distance: employer.notes?.includes("Lalitpur") ? "4 km" : "2 km",
        status: job.status,
        applied: false,
        saved: false,
        summary: `${job.category} / ${job.location} / ${job.urgency || "Active hiring"}`,
        skills: job.requiredSkillsText || `${job.category} / Local crew`,
        location: job.location
      })));

  if (employerJobs.length) return employerJobs;

  const fallbackWorker = appData.registeredUsers.find((item) => item.role === "worker");
  if (fallbackWorker?.jobs?.length) return cloneTemplate(fallbackWorker.jobs);

  return cloneTemplate(workerTemplate.jobs);
}

export function getSession() {
  return session;
}

export function createUser(payload) {
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
      region: "Kathmandu",
      status: "Pending",
      risk: queueRiskFor(user.role),
      onboardingMode: payload.onboardingMode || "self",
      helperName: payload.assistedBy || "",
      voiceLanguage: payload.voiceLanguage || ""
    });
  } else if (payload.role === "employer") {
    const user = { ...cloneTemplate(employerTemplate), ...payload, id: `employer_${Date.now()}` };
    session.currentUser = normalizeUser(user);
    appData.registeredUsers.push(normalizeUser(cloneTemplate(user)));
    appData.approvalQueue.unshift({
      id: `queue_${Date.now()}`,
      accountId: user.id,
      name: user.company || user.fullName,
      type: queueTypeFor(user.role),
      region: "Kathmandu",
      status: "Pending",
      risk: queueRiskFor(user.role)
    });
  }

  initializeSelectionsForCurrentUser();

  persistAppData();
  persistSession();
}

export function loginUser(role, contact) {
  const user = appData.registeredUsers.find((item) => item.role === role && item.contact.toLowerCase() === contact.toLowerCase());
  if (!user) return null;
  session.currentUser = normalizeUser(cloneTemplate(user));
  initializeSelectionsForCurrentUser();
  persistSession();
  return session.currentUser;
}

export function loginAdmin() {
  session.currentUser = hydrateAdmin();
  session.selectedQueue = session.currentUser.queue[0]?.id || "";
  session.selectedDispute = session.currentUser.disputes[0]?.id || "";
  persistSession();
}

export function loginSuperAdmin() {
  session.currentUser = hydrateSuperAdmin();
  persistSession();
}

export function validateAdminCode(role, code) {
  if (role === "super_admin") return code === appData.superAdminCode;
  return appData.adminAccounts.some((item) => item.status === "Active" && item.code === code);
}

export function updateApproval(accountId, status) {
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

export function addAdminAccount(name) {
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

export function removeAdminAccount(adminId) {
  appData.adminAccounts = appData.adminAccounts.filter((item) => item.id !== adminId);
  persistAppData();
}

export function logout() {
  session.currentUser = null;
  session.activePortalView = "dashboard";
  session.workerJobsFilter = "discover";
  session.workerJobSearchTerm = "";
  session.workerJobSearchLocation = "";
  session.workerJobSearchCountry = "Nepal";
  session.employerSearchSkill = "";
  session.employerSearchLocation = "";
  session.employerSortBy = "best_match";
  session.selectedSearchWorker = "";
  session.employerQuickFilters = [];
  session.comparisonWorkerIds = [];
  session.workerProfileModalOpen = false;
  session.workerJobModalOpen = false;
  session.jobPostModalOpen = false;
  session.jobPostStep = 1;
  session.editingJobId = "";
  session.jobPostDraft = null;
  persistSession();
}

export function setSignupRole(role) {
  session.signupRole = role;
  if (role === "employer") {
    session.signupMode = "self";
  }
  persistSession();
}

export function setSignupMode(mode) {
  session.signupMode = mode;
  session.signupStep = mode === "voice" || mode === "assisted" ? "verify" : session.signupStep;
  persistSession();
}

export function setSignupStep(step) {
  session.signupStep = step;
  persistSession();
}

export function setLoginRole(role) {
  session.loginRole = role;
  persistSession();
}

export function setPortalView(view) {
  session.activePortalView = view;
  persistSession();
}

export function setWorkerJobsFilter(filter) {
  session.workerJobsFilter = filter;
  persistSession();
}

export function setWorkerJobSearch(term, location, country) {
  session.workerJobSearchTerm = term;
  session.workerJobSearchLocation = location;
  session.workerJobSearchCountry = country;
  persistSession();
}

export function setEmployerSearch(skill, location) {
  session.employerSearchSkill = skill;
  session.employerSearchLocation = location;
  persistSession();
}

export function setEmployerSort(sortBy) {
  session.employerSortBy = sortBy;
  persistSession();
}

export function setSelectedSearchWorker(workerId) {
  session.selectedSearchWorker = workerId;
  persistSession();
}

export function openWorkerProfileModal(workerId = "") {
  if (workerId) session.selectedSearchWorker = workerId;
  session.workerProfileModalOpen = true;
  persistSession();
}

export function closeWorkerProfileModal() {
  session.workerProfileModalOpen = false;
  persistSession();
}

export function toggleEmployerQuickFilter(filter) {
  const current = new Set(session.employerQuickFilters || []);
  if (current.has(filter)) current.delete(filter);
  else current.add(filter);
  session.employerQuickFilters = [...current];
  persistSession();
}

export function toggleComparisonWorker(workerId) {
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

export function removeSavedSearch(searchId) {
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

export function openWorkerJobModal(jobId = "") {
  if (jobId) session.selectedWorkerJob = jobId;
  session.workerJobModalOpen = true;
  persistSession();
}

export function closeWorkerJobModal() {
  session.workerJobModalOpen = false;
  persistSession();
}

export function openJobPostModal(jobId = "") {
  session.jobPostModalOpen = true;
  session.jobPostStep = 1;
  session.editingJobId = jobId;
  if (jobId && session.currentUser?.role === "employer") {
    const job = session.currentUser.jobs.find((item) => item.id === jobId);
    session.jobPostDraft = job ? {
      title: job.title || "",
      category: job.category || "Facilities",
      location: job.location || "",
      headcount: job.headcount || 1,
      dailyRate: job.dailyRate || 90,
      requiredSkillsText: job.requiredSkillsText || "",
      duration: job.duration || "1 day",
      shiftStart: job.shiftStart || "06:00",
      notes: job.notes || "",
      urgency: job.urgency || "New"
    } : defaultJobPostDraft();
  } else {
    session.jobPostDraft = defaultJobPostDraft();
  }
  persistSession();
}

export function closeJobPostModal() {
  session.jobPostModalOpen = false;
  session.jobPostStep = 1;
  session.editingJobId = "";
  session.jobPostDraft = defaultJobPostDraft();
  persistSession();
}

export function setJobPostStep(step) {
  session.jobPostStep = Math.max(1, Math.min(3, step));
  persistSession();
}

export function saveJobPostDraft(patch) {
  session.jobPostDraft = {
    ...(session.jobPostDraft || defaultJobPostDraft()),
    ...patch
  };
  persistSession();
}

export function addActivity(message) {
  session.activityLog.push(message);
}

export function pushToast(title, message) {
  const id = `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
  session.toasts.push({ id, title, message });
  window.setTimeout(() => {
    session.toasts = session.toasts.filter((toast) => toast.id !== id);
    window.dispatchEvent(new CustomEvent("workshift:toast-change"));
  }, 3000);
}

export function saveCurrentUser() {
  syncCurrentUserToRegistry();
}

export function selectedWorkerJob() {
  const workerJobs = session.currentUser?.jobs || [];
  const marketplaceJobs = getMarketplaceJobs();
  return workerJobs.find((job) => job.id === session.selectedWorkerJob)
    || marketplaceJobs.find((job) => job.id === session.selectedWorkerJob)
    || workerJobs[0]
    || marketplaceJobs[0];
}

export function selectedEmployerJob() {
  const jobs = session.currentUser?.jobs || [];
  return jobs.find((job) => job.id === session.selectedEmployerJob)
    || jobs[0]
    || cloneTemplate(employerTemplate.jobs[0]);
}

export function selectedApplicant() {
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

export function selectedSearchWorker(workerList = []) {
  const workers = Array.isArray(workerList) ? workerList : [];
  return workers.find((item) => item.id === session.selectedSearchWorker) || workers[0] || null;
}

export function selectedQueueItem() {
  return session.currentUser.queue.find((item) => item.id === session.selectedQueue) || session.currentUser.queue[0];
}

export function selectedDisputeItem() {
  return session.currentUser.disputes.find((item) => item.id === session.selectedDispute) || session.currentUser.disputes[0];
}
