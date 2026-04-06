const COUNTRY_RULES = {
  NP: {
    code: "NP",
    name: "Nepal",
    currencyCode: "NPR",
    currencySymbol: "Rs",
    phoneAuthMode: "Phone OTP preferred",
    payoutRail: "Mobile money or bank transfer",
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

export function listCountryRules() {
  return Object.values(COUNTRY_RULES);
}

export function getCountryRule(code = "NP") {
  return COUNTRY_RULES[String(code || "NP").toUpperCase()] || COUNTRY_RULES.NP;
}

export function countryName(code = "NP") {
  return getCountryRule(code).name;
}

export function formatCountryMoney(amount, code = "NP") {
  const numericAmount = Number(amount || 0);
  const rule = getCountryRule(code);
  if (rule.currencySymbol === "$") return `${rule.currencySymbol}${numericAmount}`;
  return `${rule.currencySymbol}${numericAmount}`;
}
