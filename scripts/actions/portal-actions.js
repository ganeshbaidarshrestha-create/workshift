import { scoreWorkersForJob } from "../matching.js";
import {
  addActivity,
  addAdminAccount,
  closeWorkerProfileModal,
  closeJobPostModal,
  closeWorkerJobModal,
  findRegisteredEmployerByCompany,
  findRegisteredWorkerByReference,
  getSession,
  openJobPostModal,
  openWorkerProfileModal,
  openWorkerJobModal,
  pushToast,
  removeAdminAccount,
  removeSavedSearch,
  saveRegisteredUserRecord,
  saveCurrentUser,
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
      pay: `$${job.dailyRate}/day`,
      distance: job.location || "Nearby",
      status,
      applied: true,
      saved: false,
      summary: `${job.category} / ${job.location}`,
      skills: job.requiredSkillsText || job.category,
      location: job.location
    };
    worker.jobs.unshift(workerJob);
  }

  workerJob.company = employerName;
  workerJob.status = status;
  workerJob.applied = true;
  workerJob.location = job.location;
  workerJob.pay = `$${job.dailyRate}/day`;
  workerJob.skills = job.requiredSkillsText || job.category;

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

export function saveProfile() {
  const session = getSession();
  if (!session.currentUser) return;
  session.currentUser.fullName = document.querySelector("#profileFullName")?.value || session.currentUser.fullName;
  session.currentUser.contact = document.querySelector("#profileContact")?.value || session.currentUser.contact;
  session.currentUser.skill = document.querySelector("#profileSkill")?.value || session.currentUser.skill;
  session.currentUser.notes = document.querySelector("#profileNotes")?.value || session.currentUser.notes;
  if (session.currentUser.role === "employer") {
    session.currentUser.company = document.querySelector("#profileCompany")?.value || session.currentUser.company;
  }
  if (session.currentUser.role === "worker") {
    session.currentUser.availability = document.querySelector("#profileAvailability")?.value || session.currentUser.availability;
    session.currentUser.profile.experience = document.querySelector("#profileExperience")?.value || session.currentUser.profile.experience;
    session.currentUser.profile.bio = document.querySelector("#profileBio")?.value || session.currentUser.profile.bio;
  }
  addActivity(`Saved ${session.currentUser.role} profile changes.`);
  pushToast("Profile saved", "Changes are visible in the private portal.");
  saveCurrentUser();
  renderPortal();
  renderToasts();
}

export function updateMediaPreview(kind, file) {
  const session = getSession();
  if (!session.currentUser || !file) return;
  if (kind === "worker-photo" && session.currentUser.role === "worker") {
    session.currentUser.profile.photo = file.name;
  }
  if (kind === "employer-logo" && session.currentUser.role === "employer") {
    session.currentUser.profile.logo = file.name;
  }
  const reader = new FileReader();
  reader.onload = () => {
    if (kind === "worker-photo" && session.currentUser.role === "worker") {
      session.currentUser.profile.photoData = String(reader.result || "");
    }
    if (kind === "employer-logo" && session.currentUser.role === "employer") {
      session.currentUser.profile.logoData = String(reader.result || "");
    }
    addActivity(`Updated ${kind} preview with ${file.name}.`);
    pushToast("Media ready", `${file.name} is now visible across the portal.`);
    saveCurrentUser();
    renderPortal();
    renderToasts();
  };
  reader.readAsDataURL(file);
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

export function workerAction(action, payload = "") {
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
        cover: "Applied from live marketplace board"
      });
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

export function employerAction(action, payload = "") {
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

  if (action === "open-job-modal") openJobPostModal();
  if (action === "edit-job") openJobPostModal(job.id);
  if (action === "cancel-job-modal") closeJobPostModal();

  if (action === "job-modal-next" || action === "job-modal-back" || action === "save-job-post") {
    const existingDraft = session.jobPostDraft || {};
    const draftPatch = {
      title: document.querySelector("#jobPostTitle") ? document.querySelector("#jobPostTitle").value.trim() : (existingDraft.title || ""),
      category: document.querySelector("#jobPostCategory") ? document.querySelector("#jobPostCategory").value : (existingDraft.category || "Facilities"),
      location: document.querySelector("#jobPostLocation") ? document.querySelector("#jobPostLocation").value.trim() : (existingDraft.location || ""),
      headcount: document.querySelector("#jobPostHeadcount") ? Number(document.querySelector("#jobPostHeadcount").value || 1) : Number(existingDraft.headcount || 1),
      dailyRate: document.querySelector("#jobPostRate") ? Number(document.querySelector("#jobPostRate").value || 90) : Number(existingDraft.dailyRate || 90),
      requiredSkillsText: document.querySelector("#jobPostSkills") ? document.querySelector("#jobPostSkills").value.trim() : (existingDraft.requiredSkillsText || ""),
      duration: document.querySelector("#jobPostDuration") ? document.querySelector("#jobPostDuration").value : (existingDraft.duration || "1 day"),
      shiftStart: document.querySelector("#jobPostShiftStart") ? document.querySelector("#jobPostShiftStart").value : (existingDraft.shiftStart || "06:00"),
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
        location: draft.location,
        status: existingJob.status === "Completed" ? "Completed" : existingJob.status === "Cancelled" ? "Cancelled" : existingJob.status === "Paused" ? "Paused" : "Open",
        spend: `$${draft.dailyRate * draft.headcount}`,
        dailyRate: draft.dailyRate,
        urgency: draft.urgency,
        headcount: draft.headcount,
        requiredSkillsText: draft.requiredSkillsText,
        duration: draft.duration,
        shiftStart: draft.shiftStart,
        notes: draft.notes,
        biddingHistory: [...(existingJob.biddingHistory || [existingJob.dailyRate || draft.dailyRate]), draft.dailyRate]
      });
      session.selectedEmployerJob = existingJob.id;
      addActivity(`Employer updated job post ${draft.title}.`);
      pushToast("Job updated", `${draft.title} has been refreshed and republished.`);
    } else {
      const newJob = {
        id: `e${Date.now()}`,
        title: draft.title,
        category: draft.category,
        location: draft.location,
        status: "Open",
        applicants: 0,
        shortlisted: 0,
        escrow: false,
        spend: `$${draft.dailyRate * draft.headcount}`,
        broadcasted: false,
        dailyRate: draft.dailyRate,
        bidStep: 8,
        biddingHistory: [draft.dailyRate],
        urgency: draft.urgency,
        headcount: draft.headcount,
        requiredSkillsText: draft.requiredSkillsText,
        duration: draft.duration,
        shiftStart: draft.shiftStart,
        notes: draft.notes
      };
      session.currentUser.jobs.unshift(newJob);
      session.selectedEmployerJob = newJob.id;
      addActivity(`Employer created job post ${draft.title}.`);
      pushToast("Job posted", `${draft.title} is now visible in the marketplace.`);
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
    setApplicantStatus("Shortlisted");
    applicant.score = "Shortlisted";
    const linkedWorker = findRegisteredWorkerByReference({ id: applicant.id, name: applicant.name });
    if (linkedWorker) {
      syncWorkerJobState(linkedWorker, job, session.currentUser.company || session.currentUser.fullName, "Shortlisted", `${session.currentUser.company || "Employer"} shortlisted you for ${job.title}.`);
      saveRegisteredUserRecord(linkedWorker);
    }
  }
  if (action === "invite") {
    setApplicantStatus("Invited");
    const linkedWorker = findRegisteredWorkerByReference({ id: applicant.id, name: applicant.name });
    if (linkedWorker) {
      syncWorkerJobState(linkedWorker, job, session.currentUser.company || session.currentUser.fullName, "Invited", `${session.currentUser.company || "Employer"} invited you to ${job.title}.`);
      saveRegisteredUserRecord(linkedWorker);
    }
  }
  if (action === "hire-worker") {
    setApplicantStatus("Hired");
    job.status = "Ongoing";
    if (!job.escrow) {
      job.escrow = true;
      session.currentUser.escrow.status = "Funded";
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
    session.currentUser.profile.payments[1].status = "Escrow funded";
  }
  if (action === "release-escrow") {
    session.currentUser.escrow.status = "Released";
    session.currentUser.profile.payments[1].status = "Released";
    job.escrow = true;
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
    input.value = "";
  }
  if (action === "rate-worker") {
    session.currentUser.profile.ratings.unshift({ worker: applicant.name, score: "5/5", note: "Rated after completion" });
    setApplicantStatus("Rated");
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
    job.spend = `$${projectedSpend.toLocaleString()}`;
    addActivity(`Employer raised wage bid for ${job.title} by $${raiseBy}/day.`);
    pushToast("Wage bid raised", `${job.title} now offers $${job.dailyRate}/day and is attracting more workers.`);
  }
  if (action === "pause-job") {
    job.status = "Paused";
    addActivity(`Employer paused job ${job.title}.`);
    pushToast("Job paused", `${job.title} is hidden from active recruiting until reopened.`);
  }
  if (action === "reopen-job") {
    job.status = "Open";
    addActivity(`Employer reopened job ${job.title}.`);
    pushToast("Job reopened", `${job.title} is live in the marketplace again.`);
  }
  if (action === "cancel-job") {
    job.status = "Cancelled";
    addActivity(`Employer cancelled job ${job.title}.`);
    pushToast("Job cancelled", `${job.title} was moved out of the active hiring pipeline.`);
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

export function adminAction(action) {
  const queue = selectedQueueItem();
  const dispute = selectedDisputeItem();
  if (!queue && (action === "approve" || action === "rerequest" || action === "suspend")) return;
  if (!dispute && (action === "resolve" || action === "refund")) return;
  if (action === "approve") {
    queue.status = "Approved";
    updateApproval(queue.accountId, "Approved");
  }
  if (action === "rerequest") {
    queue.status = "Re-upload requested";
    updateApproval(queue.accountId, "Re-upload requested");
  }
  if (action === "suspend") {
    queue.status = "Suspended";
    updateApproval(queue.accountId, "Suspended");
  }
  if (action === "resolve") dispute.status = "Closed";
  if (action === "refund") dispute.status = "Refund issued";
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
