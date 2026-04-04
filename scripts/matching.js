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

export function scoreWorkersForJob(job, workerPool) {
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
