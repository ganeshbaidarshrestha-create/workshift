import { scoreWorkersForJob } from "../matching.js";
import { countryName, formatCountryMoney, getCountryRule } from "../country-rules.js";
import {
  applyToSupabaseJob,
  createSupabaseDispute,
  createSupabaseWalletEntry,
  createSupabaseJob,
  formatSupabaseApplicationStatus,
  listSupabaseAdminPayments,
  listSupabaseAdminQueue,
  listSupabaseApplicationsForJob,
  listSupabaseChatMessages,
  listSupabaseDisputes,
  listSupabaseEmployerEscrows,
  listSupabaseMyDisputes,
  listSupabaseWorkerApplicationsWithMessages,
  mapSupabaseApplicationToEmployerApplicant,
  mapSupabaseApplicationToWorkerApplication,
  mapSupabaseApplicationToWorkerJob,
  mapSupabaseDisputeToAdminItem,
  mapSupabaseEscrowToAdminPayment,
  mapSupabaseReviewToQueueItem,
  supabaseEnabled,
  sendSupabaseChatMessage,
  uploadSupabaseFile,
  updateSupabaseDisputeStatus,
  updateSupabaseApplicationStatus,
  updateSupabaseEscrowStatus,
  updateSupabaseJob,
  updateSupabaseVerificationStatus,
  upsertSupabaseEscrowTransaction,
  upsertSupabaseProfile
} from "../supabase.js";
import {
  addActivity,
  addDisputeRecord,
  addAdminAccount,
  closeDisputeModal,
  closeWorkerProfileModal,
  closeJobPostModal,
  closeWorkerJobModal,
  findRegisteredEmployerByCompany,
  findRegisteredWorkerByReference,
  getSession,
  openDisputeModal,
  openJobPostModal,
  openWorkerProfileModal,
  openWorkerJobModal,
  pushToast,
  removeAdminAccount,
  removeSavedSearch,
  saveRegisteredUserRecord,
  saveCurrentUser,
  saveDisputeDraft,
  saveJobPostDraft,
  selectedApplicant,
  selectedDisputeItem,
  selectedEmployerJob,
  selectedSearchWorker,
  selectedQueueItem,
  selectedWorkerJob,
  setEmployerSearch,
  setEmployerSort,
  setJobPostStep,
  setSelectedSearchWorker,
  toggleComparisonWorker,
  toggleEmployerQuickFilter,
  updateStoredDispute,
  updateApproval
} from "../store.js";
import { renderPortal, renderToasts } from "../renderers.js";
import { filterRankedWorkers, sortRankedWorkers } from "../renderers/shared.js";

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

export async function uploadDocumentAsset(token, file) {
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

export async function uploadDisputeEvidenceFiles(fileList) {
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

export function exportCurrentRole() {
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

export async function saveProfile() {
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

export async function updateMediaPreview(kind, file) {
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

export function markDocumentUploaded(token) {
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

export function openDisputeComposer() {
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

export async function submitDispute() {
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

export async function workerAction(action, payload = "") {
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

export async function employerAction(action, payload = "") {
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

export async function adminAction(action) {
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

export function superAdminAction(action, payload = "") {
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
