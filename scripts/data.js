export const workerTypeCatalog = [
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

export const workerTemplate = {
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

export const employerTemplate = {
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

export const householdEmployerTemplate = {
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

export const adminTemplate = {
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

export const superAdminTemplate = {
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

export function cloneTemplate(template) {
  return JSON.parse(JSON.stringify(template));
}
