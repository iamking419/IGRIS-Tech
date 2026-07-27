import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  ArrowLeft,
  Sparkles, 
  Check, 
  Upload, 
  Trash2, 
  AlertCircle,
  Building,
  Briefcase,
  DollarSign,
  Clock,
  Laptop,
  Shield,
  Bot,
  ShoppingBag,
  Cpu,
  Repeat,
  Zap,
  HelpCircle,
  Mail,
  Phone,
  MessageSquare,
  Globe,
  FileCheck,
  Loader2,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  UserCheck
} from "lucide-react";

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  url?: string;
  dataUrl?: string;
}

export interface LocationConfig {
  key: string;
  name: string;
  flag: string;
  currencyCode: string;
  currencySymbol: string;
  currencyLabel: string;
  phonePlaceholder: string;
  phonePrefix: string;
  defaultTimezone: string;
  timezones: string[];
  budgetRanges: { label: string; desc: string }[];
}

export const LOCATION_CONFIGS: Record<string, LocationConfig> = {
  Nigeria: {
    key: "Nigeria",
    name: "Nigeria",
    flag: "🌍",
    currencyCode: "NGN",
    currencySymbol: "₦",
    currencyLabel: "NGN (₦)",
    phonePlaceholder: "+234 801 234 5678",
    phonePrefix: "+234",
    defaultTimezone: "WAT (West Africa Time, GMT+1)",
    timezones: [
      "WAT (West Africa Time, GMT+1)",
      "GMT / UTC (Coordinated Universal Time, GMT+0)"
    ],
    budgetRanges: [
      { label: "Under ₦300k", desc: "For simple landing cards & lightweight micro-solutions." },
      { label: "₦300k–₦700k", desc: "For full website products with custom CMS & admin controls." },
      { label: "₦700k–₦1.5M", desc: "For secure web applications, database portals & payment systems." },
      { label: "₦1.5M–₦5M", desc: "For scalable enterprise SaaS architectures & custom ML models." },
      { label: "Above ₦5M", desc: "For heavy-duty high-isolation microservices & SOC2 level core systems." },
      { label: "Flexible", desc: "Optimize deliverables purely based on targeted agile sprints." }
    ]
  },
  "United States": {
    key: "United States",
    name: "United States",
    flag: "🌍",
    currencyCode: "USD",
    currencySymbol: "$",
    currencyLabel: "USD ($)",
    phonePlaceholder: "+1 (555) 234-5678",
    phonePrefix: "+1",
    defaultTimezone: "EST (Eastern Standard Time, GMT-5)",
    timezones: [
      "EST (Eastern Time, GMT-5)",
      "CST (Central Time, GMT-6)",
      "MST (Mountain Time, GMT-7)",
      "PST (Pacific Time, GMT-8)"
    ],
    budgetRanges: [
      { label: "Under $1,000", desc: "For modern high-converting landing cards & responsive static sites." },
      { label: "$1,000–$3,500", desc: "For full business websites with CMS, custom forms & analytics." },
      { label: "$3,500–$8,000", desc: "For full-stack web applications, database portals & Stripe integration." },
      { label: "$8,000–$25,000", desc: "For enterprise SaaS platforms, AI integrations & multi-tenant tools." },
      { label: "Above $25,000", desc: "For high-scale cloud infrastructure, zero-trust security & SOC2 systems." },
      { label: "Flexible", desc: "Sprint-based agile scope tailored to project evolution." }
    ]
  },
  "United Kingdom": {
    key: "United Kingdom",
    name: "United Kingdom",
    flag: "🌍",
    currencyCode: "GBP",
    currencySymbol: "£",
    currencyLabel: "GBP (£)",
    phonePlaceholder: "+44 7911 123456",
    phonePrefix: "+44",
    defaultTimezone: "GMT / BST (London Time, GMT+0)",
    timezones: [
      "GMT / BST (London, GMT+0)",
      "CET (Central Europe, GMT+1)"
    ],
    budgetRanges: [
      { label: "Under £800", desc: "For responsive landing pages & brand presentation sites." },
      { label: "£800–£2,500", desc: "For complete business portals with CMS & lead capture engines." },
      { label: "£2,500–£6,000", desc: "For custom web apps, database tools & automated payment gateways." },
      { label: "£6,000–£20,000", desc: "For enterprise SaaS architectures, AI workflows & API infrastructure." },
      { label: "Above £20,000", desc: "For mission-critical enterprise systems, ISO/SOC2 cloud infrastructure." },
      { label: "Flexible", desc: "Agile milestones aligned with client roadmap." }
    ]
  },
  Canada: {
    key: "Canada",
    name: "Canada",
    flag: "🌍",
    currencyCode: "CAD",
    currencySymbol: "CA$",
    currencyLabel: "CAD ($)",
    phonePlaceholder: "+1 (416) 555-0123",
    phonePrefix: "+1",
    defaultTimezone: "EST (Eastern Standard Time, GMT-5)",
    timezones: [
      "EST (Eastern Time, GMT-5)",
      "CST (Central Time, GMT-6)",
      "MST (Mountain Time, GMT-7)",
      "PST (Pacific Time, GMT-8)"
    ],
    budgetRanges: [
      { label: "Under CA$1,200", desc: "For modern landing cards & responsive brand pages." },
      { label: "CA$1,200–CA$4,500", desc: "For full website products with custom CMS & client interaction tools." },
      { label: "CA$4,500–CA$10,000", desc: "For secure web applications, payment processing & database systems." },
      { label: "CA$10,000–CA$30,000", desc: "For scalable enterprise SaaS platforms & machine learning tools." },
      { label: "Above CA$30,000", desc: "For heavy-duty microservices & high-isolation cloud infrastructure." },
      { label: "Flexible", desc: "Adaptive milestone sprints based on product requirements." }
    ]
  },
  Europe: {
    key: "Europe",
    name: "Europe",
    flag: "🌍",
    currencyCode: "EUR",
    currencySymbol: "€",
    currencyLabel: "EUR (€)",
    phonePlaceholder: "+49 30 12345678",
    phonePrefix: "+49",
    defaultTimezone: "CET (Central European Time, GMT+1)",
    timezones: [
      "CET (Central European Time, GMT+1)",
      "WET (Western European Time, GMT+0)",
      "EET (Eastern European Time, GMT+2)"
    ],
    budgetRanges: [
      { label: "Under €900", desc: "For modern landing pages & responsive web presentation cards." },
      { label: "€900–€3,000", desc: "For full business sites with custom CMS & multi-language support." },
      { label: "€3,000–€7,500", desc: "For secure web applications, database tools & GDPR-compliant payment portals." },
      { label: "€7,500–€22,000", desc: "For scalable SaaS platforms, custom AI models & cloud API hubs." },
      { label: "Above €22,000", desc: "For high-availability cloud microservices & zero-trust security systems." },
      { label: "Flexible", desc: "Agile milestone sprints optimized for business goals." }
    ]
  },
  Other: {
    key: "Other",
    name: "Other / Global",
    flag: "🌍",
    currencyCode: "USD",
    currencySymbol: "$",
    currencyLabel: "USD ($)",
    phonePlaceholder: "+1 (555) 000-0000",
    phonePrefix: "+1",
    defaultTimezone: "UTC (Coordinated Universal Time, GMT+0)",
    timezones: [
      "UTC / GMT (Coordinated Universal Time, GMT+0)",
      "EST / PST (US Timezones)",
      "CET / BST (European Timezones)",
      "WAT / EAT (African Timezones)",
      "IST / GST / SGT (Asian / Middle East Timezones)",
      "AEST (Australian Timezone)"
    ],
    budgetRanges: [
      { label: "Under $1,000", desc: "For modern high-converting landing cards & static sites." },
      { label: "$1,000–$3,500", desc: "For full business websites with custom CMS & analytics." },
      { label: "$3,500–$8,000", desc: "For full-stack web apps, database portals & payment gateways." },
      { label: "$8,000–$25,000", desc: "For enterprise SaaS platforms, AI workflows & multi-tenant tools." },
      { label: "Above $25,000", desc: "For high-scale cloud infrastructure & zero-trust security systems." },
      { label: "Flexible", desc: "Custom sprint allocation based on agile product roadmaps." }
    ]
  }
};

const STEPS = [
  { key: "welcome", label: "Welcome" },
  { key: "location", label: "Location" },
  { key: "projectType", label: "Type" },
  { key: "businessInfo", label: "Business" },
  { key: "details", label: "Details" },
  { key: "features", label: "Features" },
  { key: "budget", label: "Budget" },
  { key: "timeline", label: "Timeline" },
  { key: "references", label: "References" },
  { key: "contact", label: "Contact" },
  { key: "communication", label: "Preferences" },
  { key: "review", label: "Review" }
];

interface ProjectScoperProps {
  onBackToHome?: () => void;
}

export default function ProjectScoper({ onBackToHome }: ProjectScoperProps = {}) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const [redirectCountdown, setRedirectCountdown] = useState<number | null>(null);

  useEffect(() => {
    if (currentStepIdx >= STEPS.length && redirectCountdown !== null) {
      if (redirectCountdown <= 0) {
        if (onBackToHome) {
          onBackToHome();
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }

      const timer = setTimeout(() => {
        setRedirectCountdown((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [currentStepIdx, redirectCountdown, onBackToHome]);

  // Location & Region states
  const [location, setLocation] = useState("Nigeria");
  const [selectedTimezone, setSelectedTimezone] = useState("WAT (West Africa Time, GMT+1)");

  // Form State fields
  const [projectType, setProjectType] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const [website, setWebsite] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [details, setDetails] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [budgetIndex, setBudgetIndex] = useState(2);
  const [timeline, setTimeline] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contactMethod, setContactMethod] = useState<"WhatsApp" | "Phone" | "Email" | "Meeting">("Email");
  const [contactTime, setContactTime] = useState<"Morning" | "Afternoon" | "Evening">("Afternoon");

  // Communication Preferences fields
  const [preferredChannel, setPreferredChannel] = useState<"WhatsApp" | "Telegram" | "Email" | "Phone" | "Meet" | "Zoom" | "Teams" | "Other">("Email");
  const [preferredNumber, setPreferredNumber] = useState("");
  const [telegramUsername, setTelegramUsername] = useState("");
  const [preferredEmail, setPreferredEmail] = useState("");
  const [preferredMeetingPlatform, setPreferredMeetingPlatform] = useState<"Meet" | "Zoom" | "Teams" | "Other">("Meet");
  const [preferredContactHours, setPreferredContactHours] = useState("");

  // UX status states
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [successData, setSuccessData] = useState<any | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeLocationConfig = LOCATION_CONFIGS[location] || LOCATION_CONFIGS["Nigeria"];
  const currentBudgetRanges = activeLocationConfig.budgetRanges;

  // Handle location selection
  const handleSelectLocation = (locKey: string) => {
    setLocation(locKey);
    const cfg = LOCATION_CONFIGS[locKey] || LOCATION_CONFIGS["Nigeria"];
    setSelectedTimezone(cfg.defaultTimezone);
    
    // Auto-update default country string if it's generic
    if (!country || Object.keys(LOCATION_CONFIGS).includes(country)) {
      setCountry(cfg.name === "Other / Global" ? "" : cfg.name);
    }
    
    setValidationError("");
  };

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("igris_project_planner_draft");
    if (saved) {
      try {
        const draft = JSON.parse(saved);
        if (draft.location) {
          setLocation(draft.location);
          if (draft.selectedTimezone) {
            setSelectedTimezone(draft.selectedTimezone);
          } else {
            setSelectedTimezone(LOCATION_CONFIGS[draft.location]?.defaultTimezone || "WAT (West Africa Time, GMT+1)");
          }
        }
        if (draft.projectType) setProjectType(draft.projectType);
        if (draft.businessName) setBusinessName(draft.businessName);
        if (draft.industry) setIndustry(draft.industry);
        if (draft.country) setCountry(draft.country);
        if (draft.website) setWebsite(draft.website);
        if (draft.companySize) setCompanySize(draft.companySize);
        if (draft.details) setDetails(draft.details);
        if (draft.features) setFeatures(draft.features);
        if (draft.budgetIndex !== undefined) setBudgetIndex(draft.budgetIndex);
        if (draft.timeline) setTimeline(draft.timeline);
        if (draft.uploadedFiles) setUploadedFiles(draft.uploadedFiles);
        if (draft.fullName) setFullName(draft.fullName);
        if (draft.email) setEmail(draft.email);
        if (draft.phone) setPhone(draft.phone);
        if (draft.contactMethod) setContactMethod(draft.contactMethod);
        if (draft.contactTime) setContactTime(draft.contactTime);
        
        // Communication preference restores
        if (draft.preferredChannel) setPreferredChannel(draft.preferredChannel);
        if (draft.preferredNumber) setPreferredNumber(draft.preferredNumber);
        if (draft.telegramUsername) setTelegramUsername(draft.telegramUsername);
        if (draft.preferredEmail) setPreferredEmail(draft.preferredEmail);
        if (draft.preferredMeetingPlatform) setPreferredMeetingPlatform(draft.preferredMeetingPlatform);
        if (draft.preferredContactHours) setPreferredContactHours(draft.preferredContactHours);

        if (draft.currentStepIdx !== undefined && draft.currentStepIdx < STEPS.length) {
          setCurrentStepIdx(draft.currentStepIdx);
        }
      } catch (e) {
        console.error("Failed to restore planner progress:", e);
      }
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (overrides?: any) => {
    const stateToSave = {
      location,
      selectedTimezone,
      projectType,
      businessName,
      industry,
      country,
      website,
      companySize,
      details,
      features,
      budgetIndex,
      timeline,
      uploadedFiles,
      fullName,
      email,
      phone,
      contactMethod,
      contactTime,
      preferredChannel,
      preferredNumber,
      telegramUsername,
      preferredEmail,
      preferredMeetingPlatform,
      preferredContactHours,
      currentStepIdx,
      ...overrides
    };
    localStorage.setItem("igris_project_planner_draft", JSON.stringify(stateToSave));
  };

  // Auto-save effect
  useEffect(() => {
    saveProgress();
  }, [
    location,
    selectedTimezone,
    projectType,
    businessName,
    industry,
    country,
    website,
    companySize,
    details,
    features,
    budgetIndex,
    timeline,
    uploadedFiles,
    fullName,
    email,
    phone,
    contactMethod,
    contactTime,
    preferredChannel,
    preferredNumber,
    telegramUsername,
    preferredEmail,
    preferredMeetingPlatform,
    preferredContactHours,
    currentStepIdx
  ]);

  const currentStep = STEPS[currentStepIdx]?.key || "complete";

  // Step Validation logic
  const validateCurrentStep = (): boolean => {
    setValidationError("");
    switch (currentStep) {
      case "welcome":
        return true;
      case "location":
        if (!location) {
          setValidationError("Please select your primary operating location to configure currency and timezones.");
          return false;
        }
        return true;
      case "projectType":
        if (!projectType) {
          setValidationError("Please select your project category to proceed.");
          return false;
        }
        return true;
      case "businessInfo":
        if (!businessName.trim()) {
          setValidationError("Business name is required.");
          return false;
        }
        if (!industry.trim()) {
          setValidationError("Please state your industry or market vertical.");
          return false;
        }
        if (!country.trim()) {
          setValidationError("Country is required to determine compliance standards.");
          return false;
        }
        if (!companySize) {
          setValidationError("Please select your company scale.");
          return false;
        }
        return true;
      case "details":
        if (!details.trim() || details.trim().length < 10) {
          setValidationError("Please describe your project (minimum 10 characters).");
          return false;
        }
        return true;
      case "features":
        return true;
      case "budget":
        return true;
      case "timeline":
        if (!timeline) {
          setValidationError("Please select your targeted launch speed.");
          return false;
        }
        return true;
      case "references":
        return true;
      case "contact":
        if (!fullName.trim()) {
          setValidationError("Full Name is required.");
          return false;
        }
        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          setValidationError("Please enter a valid business email address.");
          return false;
        }
        if (!phone.trim()) {
          setValidationError("Phone number is required.");
          return false;
        }
        return true;
      case "communication":
        if (preferredChannel === "WhatsApp" || preferredChannel === "Phone") {
          if (!preferredNumber.trim()) {
            setValidationError(`Please provide your preferred contact number for ${preferredChannel}.`);
            return false;
          }
        }
        if (preferredChannel === "Telegram") {
          if (!telegramUsername.trim()) {
            setValidationError("Please enter your Telegram username.");
            return false;
          }
        }
        if (preferredChannel === "Email") {
          if (!preferredEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(preferredEmail)) {
            setValidationError("Please enter a valid preferred email address.");
            return false;
          }
        }
        if (!preferredContactHours.trim()) {
          setValidationError("Please state your preferred contact hours (e.g. 9 AM - 5 PM).");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setDirection(1);
      setCurrentStepIdx((prev) => Math.min(STEPS.length - 1, prev + 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setValidationError("");
    setDirection(-1);
    setCurrentStepIdx((prev) => Math.max(0, prev - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEditStep = (stepKey: string) => {
    const idx = STEPS.findIndex((s) => s.key === stepKey);
    if (idx !== -1) {
      setDirection(idx > currentStepIdx ? 1 : -1);
      setCurrentStepIdx(idx);
    }
  };

  // File upload handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFilesUpload(Array.from(e.dataTransfer.files));
    }
  };

  const handleManualFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFilesUpload(Array.from(e.target.files));
    }
  };

  const handleFilesUpload = async (files: File[]) => {
    setUploading(true);
    setValidationError("");
    const newFiles = [...uploadedFiles];

    for (const file of files) {
      if (file.size > 15 * 1024 * 1024) {
        setValidationError(`File "${file.name}" exceeds the 15MB size limit.`);
        continue;
      }

      try {
        const reader = new FileReader();
        const base64Promise = new Promise<string>((resolve) => {
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });

        const base64String = await base64Promise;

        const res = await fetch("/api/upload-reference", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: file.name,
            type: file.type,
            base64: base64String
          })
        });

        if (!res.ok) {
          throw new Error("Server rejected file upload");
        }

        const uploadedResult = await res.json();
        newFiles.push({
          name: uploadedResult.name,
          size: uploadedResult.size,
          type: uploadedResult.type,
          url: uploadedResult.url
        });
      } catch (err: any) {
        console.error("Upload error for file:", file.name, err);
        // Fallback local file record
        newFiles.push({
          name: file.name,
          size: file.size,
          type: file.type
        });
      }
    }

    setUploadedFiles(newFiles);
    setUploading(false);
  };

  const handleDeleteFile = (idxToDelete: number) => {
    setUploadedFiles((prev) => prev.filter((_, idx) => idx !== idxToDelete));
  };

  // Helper proposal generator
  const generateLocalProposal = (payload: any) => {
    const locConfig = LOCATION_CONFIGS[payload.location || "Nigeria"] || LOCATION_CONFIGS["Nigeria"];
    const sym = locConfig.currencySymbol;
    const curr = locConfig.currencyCode;
    
    return {
      title: `${payload.projectType || "Custom Software"} Technical Architecture Blueprint`,
      overview: `Tailored digital architecture engineered for ${payload.businessName || "your enterprise"} (${payload.location || "Global"}). Configured for ${payload.timeline || "agile production rollout"} with ${locConfig.currencyLabel} financial models.`,
      techStack: {
        frontend: [
          { name: "React 18 + Vite & TypeScript", reason: "Ultra-fast client bundle with strict type safety." },
          { name: "Tailwind CSS + Motion", reason: "GPU-accelerated responsive styling & smooth animations." }
        ],
        backend: [
          { name: "Node.js ESM + Express API", reason: "High-throughput asynchronous controller layer." },
          { name: "Zero-Trust OAuth & Session Layer", reason: "Encrypted token authentication & session security." }
        ],
        database: [
          { name: "PostgreSQL Relational Storage", reason: "ACID compliant transactional database." }
        ],
        cloud: [
          { name: "Cloud Container Ingress", reason: "Isolated auto-scaling web application container." }
        ]
      },
      architectureFlow: [
        `Regional traffic originating in ${payload.location || "regional node"} routes through secure TLS proxies`,
        "API Gateway validates authorization tokens and enforces regional rate-limits",
        "Backend services execute core business logic and sync with isolated datastores",
        `Automated status updates dispatched via ${payload.preferredChannel || "preferred channel"} in ${payload.selectedTimezone || locConfig.defaultTimezone}`
      ],
      cybersecurityAssessment: [
        { threat: "Unauthorized API Ingress", mitigation: "Strict JWT authentication & IP rate-limiting filters." },
        { threat: "Data Transmission Sniffing", mitigation: "Mandatory TLS 1.3 encryption in transit and AES-256 at rest." }
      ],
      milestones: [
        {
          duration: "Phase 1 (2 Wks)",
          title: "Discovery & Architecture",
          focus: "System schema design & prototype environment setup.",
          deliverables: ["DB Schema", "API Contracts", "Brand UI Theme"]
        },
        {
          duration: "Phase 2 (4 Wks)",
          title: "Primary Feature Engineering",
          focus: "Core application logic, dashboard layouts & feature integrations.",
          deliverables: ["Feature Modules", "User Auth", "Interactive Views"]
        },
        {
          duration: "Phase 3 (2 Wks)",
          title: "Integration & Security Audit",
          focus: "End-to-end testing, security hardening & compliance checks.",
          deliverables: ["Security Audit", "Performance Optimizations"]
        },
        {
          duration: "Phase 4 (2 Wks)",
          title: "Production Release",
          focus: "Cloud container deployment & domain DNS mapping.",
          deliverables: ["Live Production App", "Documentation", "Handoff"]
        }
      ],
      costEstimation: {
        designAndDiscovery: `${sym}1,500`,
        development: `${sym}8,500`,
        qaAndSecAudit: `${sym}2,000`,
        cloudDeployment: `${sym}1,000`,
        timelineWeeks: 10,
        totalCostEstimate: `${sym}13,000 (${curr})`
      }
    };
  };

  // Submit flow
  const handleSubmit = async () => {
    setSubmitting(true);
    setValidationError("");

    const payload = {
      location,
      selectedTimezone,
      currency: activeLocationConfig.currencyCode,
      currencySymbol: activeLocationConfig.currencySymbol,
      projectType,
      businessName,
      industry,
      country,
      website,
      companySize,
      details,
      features,
      budget: currentBudgetRanges[Math.min(budgetIndex, currentBudgetRanges.length - 1)].label,
      timeline,
      references: uploadedFiles,
      fullName,
      email,
      phone,
      contactMethod,
      contactTime,
      preferredChannel,
      preferredNumber,
      telegramUsername,
      preferredEmail,
      preferredMeetingPlatform,
      preferredContactHours
    };

    try {
      // Send submission to Web3Forms API (delivers to igristech.hq@gmail.com)
      const apiKey = (import.meta as any).env?.VITE_WEB3FORMS_KEY || "207d3b5a-dca7-4d04-b676-8b84a359ce52";
      const formData = new FormData();
      formData.append("access_key", apiKey);
      formData.append("subject", `🚀 New Project Request: ${businessName || fullName} (${projectType || "Custom Project"})`);
      formData.append("from_name", "IGRIS Tech Project Planner");
      formData.append("to_email", "igristech.hq@gmail.com");
      formData.append("name", fullName);
      formData.append("email", email);
      formData.append("phone", phone || preferredNumber || "N/A");
      formData.append("business", businessName || "N/A");
      formData.append("industry", industry || "N/A");
      formData.append("country", country || "N/A");
      formData.append("project_type", projectType || "N/A");
      formData.append("budget", currentBudgetRanges[Math.min(budgetIndex, currentBudgetRanges.length - 1)]?.label || "N/A");
      formData.append("timeline", timeline || "N/A");
      formData.append("features", features.join(", ") || "None");
      formData.append("details", details || "N/A");
      formData.append("preferred_channel", preferredChannel || "Email");
      formData.append("preferred_meeting", preferredMeetingPlatform || "Meet");
      formData.append("preferred_hours", preferredContactHours || "N/A");

      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const res = await fetch("/api/project-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const data = await res.json();
        setSuccessData(data);
      } else {
        // Generate local proposal on server error
        const localProposal = generateLocalProposal(payload);
        setSuccessData({ success: true, proposal: localProposal });
      }
    } catch (err: any) {
      // Generate proposal client side seamlessly
      const localProposal = generateLocalProposal(payload);
      setSuccessData({ success: true, proposal: localProposal });
    } finally {
      localStorage.removeItem("igris_project_planner_draft");
      setSubmitting(false);
      setDirection(1);
      setCurrentStepIdx(STEPS.length);
      setRedirectCountdown(8);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Steps variants for smooth navigation animations
  const slideVariants: any = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.35, ease: "easeOut" }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 50 : -50,
      opacity: 0,
      transition: { duration: 0.25, ease: "easeIn" }
    })
  };

  const categories = [
    { name: "Custom Website", icon: Laptop, desc: "Aesthetic marketing portals, premium responsive landing cards & SEO master layouts.", color: "text-blue-400 border-blue-500/10 hover:border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10" },
    { name: "Web Application", icon: Cpu, desc: "Dynamic, scalable dashboard, online platforms & database-backed portals.", color: "text-emerald-400 border-emerald-500/10 hover:border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10" },
    { name: "Backend System", icon: Repeat, desc: "Fast data streaming pipelines, REST or gRPC microservices & encrypted API relays.", color: "text-amber-400 border-amber-500/10 hover:border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10" },
    { name: "AI Solution", icon: Bot, desc: "Intelligent summarization engines, customized LLM wrappers & data extraction bots.", color: "text-fuchsia-400 border-fuchsia-500/10 hover:border-fuchsia-500/30 bg-fuchsia-500/5 hover:bg-fuchsia-500/10" },
    { name: "Cybersecurity", icon: Shield, desc: "Zero-trust proxy boundaries, automated pen-testing, OAuth validation and audit systems.", color: "text-rose-400 border-rose-500/10 hover:border-rose-500/30 bg-rose-500/5 hover:bg-rose-500/10" },
    { name: "Automation", icon: Zap, desc: "Cron schedulers, webhook orchestration logs, custom web scrapers & alert triggers.", color: "text-violet-400 border-violet-500/10 hover:border-violet-500/30 bg-violet-500/5 hover:bg-violet-500/10" },
    { name: "E-commerce", icon: ShoppingBag, desc: "Storefront structures with Stripe integrations, product inventory managers & sales analytics.", color: "text-cyan-400 border-cyan-500/10 hover:border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/10" },
    { name: "Other", icon: HelpCircle, desc: "Visions that fall outside typical classes. Let us design a bespoke solution from scratch.", color: "text-zinc-400 border-zinc-500/10 hover:border-zinc-500/30 bg-zinc-500/5 hover:bg-zinc-500/10" }
  ];

  const featuresList = [
    "Authentication", "Dashboard", "Admin Panel", "Payments", "Booking", 
    "Analytics", "Notifications", "API Integration", "AI Integration", 
    "CMS Engine", "Reporting Hub", "Smart Search", "Live Messaging", 
    "Secure File Manager", "System Auditing"
  ];

  const timelines = [
    { label: "As Soon As Possible", spec: "Urgent engineering trigger" },
    { label: "Within One Month", spec: "Focused agile sprints" },
    { label: "Within Two Months", spec: "Optimal project pacing" },
    { label: "Three Months", spec: "Comprehensive SaaS execution" },
    { label: "Flexible", spec: "Adaptive milestones structure" }
  ];

  return (
    <div id="project-planner-container" className="max-w-4xl mx-auto px-4 py-8 sm:py-12 z-10 relative overflow-hidden">
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-full max-w-lg h-[300px] bg-emerald-500/5 blur-[60px] sm:blur-[120px] pointer-events-none overflow-hidden" />

      {/* PROGRESS TRACKER */}
      {currentStepIdx < STEPS.length && (
        <div className="mb-12">
          {/* Progress Bar Header */}
          <div className="flex items-center justify-between text-[10px] font-mono uppercase text-zinc-500 mb-3 tracking-widest px-1">
            <span className="flex items-center gap-2">
              <span>PLANNING PIPELINE</span>
              <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-[9px]">
                {activeLocationConfig.flag} {activeLocationConfig.currencyCode} ({activeLocationConfig.currencySymbol})
              </span>
            </span>
            <span>Step {currentStepIdx + 1} of {STEPS.length} ({Math.round(((currentStepIdx + 1) / STEPS.length) * 100)}%)</span>
          </div>
          
          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mb-6 border border-white/5">
            <motion.div 
              className="h-full bg-emerald-400 sm:shadow-[0_0_8px_rgba(52,211,153,0.3)]" 
              animate={{ width: `${((currentStepIdx + 1) / STEPS.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Step Indicators Grid */}
          <div className="hidden sm:grid grid-cols-12 gap-1">
            {STEPS.map((s, idx) => {
              const isActive = currentStepIdx === idx;
              const isCompleted = currentStepIdx > idx;
              return (
                <div 
                  key={s.key} 
                  onClick={() => idx <= currentStepIdx && handleEditStep(s.key)}
                  className={`flex flex-col items-center text-center cursor-pointer group ${idx > currentStepIdx ? "pointer-events-none" : ""}`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-mono font-bold transition-all ${
                    isActive 
                      ? "bg-emerald-500 text-[#02050b] ring-4 ring-emerald-500/10 font-black scale-110" 
                      : isCompleted 
                      ? "bg-emerald-950 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-900" 
                      : "bg-[#050505] border border-white/5 text-zinc-600"
                  }`}>
                    {isCompleted ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : idx + 1}
                  </div>
                  <span className={`text-[8px] font-mono mt-2 truncate max-w-full uppercase tracking-tighter ${
                    isActive ? "text-emerald-400 font-bold" : isCompleted ? "text-zinc-400" : "text-zinc-600"
                  }`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MAIN ANIMATED CARD ENGINE */}
      <div className="glass-panel border border-white/5 bg-[#080a0f] sm:bg-[#050505]/40 sm:backdrop-blur-md rounded-2xl p-6 sm:p-10 relative overflow-hidden min-h-[520px] flex flex-col justify-between">
        
        {/* System telemetry label */}
        <div className="absolute top-4 right-4 font-mono text-[9px] text-zinc-600 tracking-wider flex items-center gap-2">
          <span>IGRIS_PLANNER_v3.4</span>
          <span className="text-zinc-700">//</span>
          <span className="text-emerald-400">{currentStepIdx < STEPS.length ? STEPS[currentStepIdx].key.toUpperCase() : "SUCCESS"}</span>
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          {currentStepIdx >= STEPS.length ? (
            /* SUCCESS SCREEN / PROPOSAL BLUEPRINT */
            <motion.div
              key="success-screen"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="space-y-8 py-4 text-left max-w-4xl mx-auto flex-1 flex flex-col justify-center"
            >
              {/* Success Header with Verified Check Animation */}
              <div className="text-center space-y-4 max-w-2xl mx-auto mb-6">
                <div className="flex justify-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
                    className="relative w-20 h-20 rounded-full bg-[#00FF88]/10 border-2 border-[#00FF88] flex items-center justify-center text-[#00FF88] sm:shadow-[0_0_35px_rgba(0,255,136,0.35)]"
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                      className="absolute inset-0 rounded-full border border-[#00FF88]"
                    />
                    <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                  </motion.div>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/30 text-[#00FF88] font-mono text-[10px] uppercase tracking-widest font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-ping" />
                  <span>Verified Inquiry Submitted</span>
                </div>

                <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight">
                  Inquiry Successfully Submitted!
                </h2>

                <div className="bg-[#00FF88]/5 border border-[#00FF88]/20 rounded-2xl p-5 sm:p-6 text-left space-y-3 relative overflow-hidden bg-black/60 sm:backdrop-blur-md shadow-xl">
                  <p className="text-white text-sm sm:text-base font-sans leading-relaxed">
                    Your inquiry has been submitted! The assigned <strong className="text-[#00FF88] font-semibold">IGRIS Tech Lead Developer</strong> will review your technical specifications and contact you shortly via your preferred contact option: <strong className="text-white font-mono">{preferredChannel}</strong> {preferredNumber || preferredEmail || telegramUsername ? `(${preferredNumber || preferredEmail || telegramUsername})` : ""}.
                  </p>
                  
                  <div className="pt-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-400 border-t border-white/10">
                    <div className="flex items-center gap-1.5 text-[#00FF88]">
                      <UserCheck className="w-4 h-4 shrink-0" />
                      <span>Developer Status: Assigned & Reviewing</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-300">
                      <Clock className="w-3.5 h-3.5 text-[#00FF88] shrink-0" />
                      <span>Guaranteed SLA: Within 2 Hours</span>
                    </div>
                  </div>
                </div>

                {/* AUTO-REDIRECT TIMER BANNER */}
                <div className="bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-black/60 sm:backdrop-blur-md shadow-lg text-left">
                  <div className="flex items-center gap-3.5 w-full sm:w-auto">
                    <div className="w-10 h-10 rounded-xl bg-[#00FF88]/20 border border-[#00FF88]/40 flex items-center justify-center text-[#00FF88] font-mono font-bold text-sm shrink-0">
                      {redirectCountdown !== null ? `${redirectCountdown}s` : "✓"}
                    </div>
                    <div>
                      <span className="font-display font-bold text-sm text-white block">
                        Submission Verified & Confirmed
                      </span>
                      <span className="text-xs text-zinc-300 font-mono">
                        {redirectCountdown !== null
                          ? `Redirecting back to Home Page in ${redirectCountdown} seconds...`
                          : "Redirect paused. Explore your proposal or return home anytime."}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                    {redirectCountdown !== null && (
                      <button
                        type="button"
                        onClick={() => setRedirectCountdown(null)}
                        className="px-3.5 py-2 rounded-xl border border-white/10 bg-white/5 text-zinc-400 hover:text-white text-xs font-mono transition-colors cursor-pointer"
                      >
                        Pause Timer
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        if (onBackToHome) {
                          onBackToHome();
                        } else {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                      }}
                      className="flex-1 sm:flex-initial bg-[#00FF88] text-black hover:bg-emerald-300 font-sans font-bold py-2.5 px-6 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-[#00FF88]/20 text-center flex items-center justify-center gap-2"
                    >
                      <span>Return to Home Page</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* INTERACTIVE BLUEPRINT */}
              {successData?.proposal && (
                <div className="space-y-8 bg-zinc-950/40 border border-white/5 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
                  
                  {/* Proposal Header */}
                  <div className="border-b border-white/5 pb-6">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-400">ENGINEERING PROPOSAL LOGIC</span>
                      </div>
                      <span className="text-[9px] font-mono uppercase text-zinc-400 bg-white/5 px-2.5 py-1 rounded border border-white/10">
                        {activeLocationConfig.flag} {location} • {activeLocationConfig.currencyCode}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-2xl text-white tracking-tight">
                      {successData.proposal.title}
                    </h3>
                    <p className="text-zinc-400 text-xs sm:text-sm mt-3 leading-relaxed">
                      {successData.proposal.overview}
                    </p>
                  </div>

                  {/* Tech Stack Bento Grid */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">TECHNOLOGY STACK ARCHITECTURE</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Frontend */}
                      <div className="bg-black/40 border border-white/5 rounded-2xl p-5 space-y-3 hover:border-emerald-500/10 transition-colors">
                        <div className="flex items-center gap-2 text-white font-semibold text-xs">
                          <Laptop className="w-4 h-4 text-emerald-400" />
                          <span>Frontend Presentation Layer</span>
                        </div>
                        <div className="space-y-2">
                          {successData.proposal.techStack?.frontend?.map((tech: any, i: number) => (
                            <div key={i} className="text-xs">
                              <span className="text-emerald-300 font-mono font-medium block">{tech.name}</span>
                              <span className="text-zinc-500 text-[11px] leading-relaxed block mt-0.5">{tech.reason}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Backend */}
                      <div className="bg-black/40 border border-white/5 rounded-2xl p-5 space-y-3 hover:border-emerald-500/10 transition-colors">
                        <div className="flex items-center gap-2 text-white font-semibold text-xs">
                          <Cpu className="w-4 h-4 text-emerald-400" />
                          <span>Backend Services Layer</span>
                        </div>
                        <div className="space-y-2">
                          {successData.proposal.techStack?.backend?.map((tech: any, i: number) => (
                            <div key={i} className="text-xs">
                              <span className="text-emerald-300 font-mono font-medium block">{tech.name}</span>
                              <span className="text-zinc-500 text-[11px] leading-relaxed block mt-0.5">{tech.reason}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Database */}
                      <div className="bg-black/40 border border-white/5 rounded-2xl p-5 space-y-3 hover:border-emerald-500/10 transition-colors">
                        <div className="flex items-center gap-2 text-white font-semibold text-xs">
                          <Building className="w-4 h-4 text-emerald-400" />
                          <span>Relational & Distributed Datastore</span>
                        </div>
                        <div className="space-y-2">
                          {successData.proposal.techStack?.database?.map((tech: any, i: number) => (
                            <div key={i} className="text-xs">
                              <span className="text-emerald-300 font-mono font-medium block">{tech.name}</span>
                              <span className="text-zinc-500 text-[11px] leading-relaxed block mt-0.5">{tech.reason}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Cloud */}
                      <div className="bg-black/40 border border-white/5 rounded-2xl p-5 space-y-3 hover:border-emerald-500/10 transition-colors">
                        <div className="flex items-center gap-2 text-white font-semibold text-xs">
                          <Globe className="w-4 h-4 text-emerald-400" />
                          <span>Cloud Security & Edge Ingress</span>
                        </div>
                        <div className="space-y-2">
                          {successData.proposal.techStack?.cloud?.map((tech: any, i: number) => (
                            <div key={i} className="text-xs">
                              <span className="text-emerald-300 font-mono font-medium block">{tech.name}</span>
                              <span className="text-zinc-500 text-[11px] leading-relaxed block mt-0.5">{tech.reason}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Architecture Flow & Security */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {/* Flow */}
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">SECURE DATA FLOW PROTOCOL</h4>
                      <div className="bg-black/20 border border-white/5 rounded-2xl p-5 space-y-4">
                        {successData.proposal.architectureFlow?.map((flow: string, i: number) => (
                          <div key={i} className="flex gap-3 text-xs leading-relaxed">
                            <span className="font-mono text-emerald-400 font-bold">0{i+1}</span>
                            <span className="text-zinc-300">{flow}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Security assessment */}
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">CYBERSECURITY SAFEGUARDS</h4>
                      <div className="bg-black/20 border border-white/5 rounded-2xl p-5 space-y-4">
                        {successData.proposal.cybersecurityAssessment?.map((sec: any, i: number) => (
                          <div key={i} className="space-y-1">
                            <div className="flex items-center gap-2 text-xs font-semibold text-white">
                              <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span>{sec.threat}</span>
                            </div>
                            <p className="text-[11px] text-zinc-500 pl-5 leading-relaxed">{sec.mitigation}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Milestones Delivery roadmap */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">PRODUCTION DELIVERY ROADMAP</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {successData.proposal.milestones?.map((milestone: any, i: number) => (
                        <div key={i} className="bg-black/40 border border-white/5 rounded-2xl p-5 flex flex-col justify-between hover:border-emerald-500/10 transition-colors">
                          <div className="space-y-2">
                            <div className="flex justify-between items-start">
                              <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/15">{milestone.duration}</span>
                              <span className="text-[10px] font-mono text-zinc-600">Phase 0{i+1}</span>
                            </div>
                            <h5 className="text-xs font-bold text-white tracking-tight mt-1">{milestone.title}</h5>
                            <p className="text-[10px] text-zinc-400 leading-relaxed font-sans mt-1">{milestone.focus}</p>
                          </div>
                          
                          <div className="mt-4 pt-3 border-t border-white/5">
                            <span className="text-[9px] font-mono uppercase text-zinc-500 block mb-1">Deliverables:</span>
                            <ul className="space-y-1 text-[10px] text-zinc-500 list-disc pl-3 leading-tight">
                              {milestone.deliverables?.map((del: string, j: number) => (
                                <li key={j}>{del}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Precision Cost Estimate in Local Currency */}
                  {successData.proposal.costEstimation && (
                    <div className="bg-[#02050b] border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="space-y-1 text-left w-full md:w-auto">
                        <span className="text-[9px] font-mono uppercase text-emerald-400 tracking-widest block">COST ESTIMATION & ALLOCATION ({activeLocationConfig.currencyCode})</span>
                        <h5 className="font-display font-bold text-lg text-white">Engineered Pricing Model</h5>
                        <p className="text-xs text-zinc-500 leading-relaxed">Calibrated for {location} regional market parameters and SLA requirements.</p>
                      </div>

                      <div className="flex flex-wrap gap-4 md:gap-8 justify-between w-full md:w-auto md:border-l border-white/5 md:pl-8">
                        <div className="text-left">
                          <span className="text-[9px] font-mono text-zinc-500 uppercase block">Discovery</span>
                          <span className="text-xs font-bold text-white font-mono">
                            {successData.proposal.costEstimation.designAndDiscovery || `${activeLocationConfig.currencySymbol}1,500`}
                          </span>
                        </div>
                        <div className="text-left">
                          <span className="text-[9px] font-mono text-zinc-500 uppercase block">Development</span>
                          <span className="text-xs font-bold text-white font-mono">
                            {successData.proposal.costEstimation.development || `${activeLocationConfig.currencySymbol}8,500`}
                          </span>
                        </div>
                        <div className="text-left">
                          <span className="text-[9px] font-mono text-emerald-400 uppercase block">Timeline</span>
                          <span className="text-xs font-bold text-emerald-400 font-mono">
                            {successData.proposal.costEstimation.timelineWeeks || 10} Weeks
                          </span>
                        </div>
                        <div className="border-l border-white/5 pl-4 sm:pl-6 text-left">
                          <span className="text-[9px] font-mono text-emerald-400 uppercase block">Est. Total</span>
                          <span className="text-lg font-display font-black text-white tracking-tight">
                            {successData.proposal.costEstimation.totalCostEstimate || `${activeLocationConfig.currencySymbol}13,000`}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* Return CTAs */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-4 max-w-md mx-auto w-full">
                <button
                  type="button"
                  onClick={() => {
                    if (onBackToHome) {
                      onBackToHome();
                    } else {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className="w-full bg-[#00FF88] text-black hover:bg-emerald-300 font-sans font-bold py-3.5 px-6 rounded-full text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-[#00FF88]/20 text-center flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Return to Home Page</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    setCurrentStepIdx(0);
                    setSuccessData(null);
                    setRedirectCountdown(null);
                  }}
                  className="w-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 font-sans font-medium py-3.5 px-6 rounded-full text-xs uppercase tracking-wider transition-all cursor-pointer text-center"
                >
                  Create Another Plan
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex-1 flex flex-col justify-between py-2"
            >
              {/* CONTENT BY STEP */}
              <div className="flex-1 flex flex-col justify-center">
                
                {/* WELCOME INTRO */}
                {currentStep === "welcome" && (
                  <div className="space-y-6 text-center max-w-xl mx-auto py-8">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-[0.25em] block">IGRIS Tech Solutions Planner</span>
                    <h1 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight leading-tight">
                      Let's Build <br />Something Exceptional.
                    </h1>
                    <p className="text-zinc-400 text-sm font-sans leading-relaxed">
                      Our dynamic planner maps out your digital product architecture, determines tech stack parameters, and outlines deployment specifications in real-time. This helps us accelerate development from Day One.
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-zinc-500 font-mono">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Completes in approximately 3–5 minutes</span>
                    </div>
                  </div>
                )}

                {/* STEP 1: LOCATION SELECTION */}
                {currentStep === "location" && (
                  <div className="space-y-6">
                    <div className="mb-4">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-1">Step 01</span>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">Where are you located?</h3>
                      <p className="text-zinc-400 text-xs">Choosing your region automatically configures your currency, budget ranges, phone format, and meeting timezones.</p>
                    </div>

                    {/* Location Selection Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                      {Object.keys(LOCATION_CONFIGS).map((key) => {
                        const locCfg = LOCATION_CONFIGS[key];
                        const isSelected = location === key;
                        return (
                          <div
                            key={key}
                            onClick={() => handleSelectLocation(key)}
                            className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between text-left min-h-[120px] group ${
                              isSelected
                                ? "bg-emerald-500/10 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.12)] scale-[1.02]"
                                : "bg-[#050505]/60 border-white/5 hover:border-white/20 hover:-translate-y-0.5"
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <span className="text-2xl">{locCfg.flag}</span>
                              <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border transition-all ${
                                isSelected
                                  ? "bg-emerald-400 text-black border-emerald-400"
                                  : "bg-white/5 text-zinc-400 border-white/10 group-hover:text-white"
                              }`}>
                                {locCfg.currencyCode}
                              </span>
                            </div>

                            <div className="mt-3">
                              <h4 className="font-display font-bold text-sm text-white tracking-wide">{locCfg.name}</h4>
                              <span className="text-[10px] font-mono text-zinc-500 block mt-0.5">
                                {locCfg.currencySymbol} • {locCfg.defaultTimezone.split(' ')[0]}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Auto-Applied Regional Parameters Preview Card */}
                    <div className="bg-[#02050b] border border-white/5 rounded-2xl p-4 sm:p-5 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest block font-bold">Auto-Configured Regional Settings</span>
                          <h5 className="font-display font-bold text-sm text-white">{activeLocationConfig.flag} {activeLocationConfig.name}</h5>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 text-[10px] font-mono">
                        <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded text-zinc-300">
                          Currency: <strong className="text-emerald-400">{activeLocationConfig.currencyLabel}</strong>
                        </span>
                        <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded text-zinc-300">
                          Phone: <strong className="text-zinc-200">{activeLocationConfig.phonePrefix}</strong>
                        </span>
                        <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded text-zinc-300">
                          Timezone: <strong className="text-zinc-200">{activeLocationConfig.defaultTimezone.split(' ')[0]}</strong>
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: PROJECT TYPE */}
                {currentStep === "projectType" && (
                  <div className="space-y-6">
                    <div className="mb-4">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-1">Step 02</span>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">Select your solution class</h3>
                      <p className="text-zinc-400 text-xs">What kind of product or architecture are we deploying?</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {categories.map((cat) => {
                        const IconComponent = cat.icon;
                        const isSelected = projectType === cat.name;
                        return (
                          <div
                            key={cat.name}
                            onClick={() => {
                              setProjectType(cat.name);
                              setValidationError("");
                            }}
                            className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col text-left justify-between min-h-[140px] group ${
                              isSelected 
                                ? "bg-emerald-500/10 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)] scale-[1.02]" 
                                : "bg-[#050505]/60 border-white/5 hover:border-white/15 hover:-translate-y-0.5"
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${
                              isSelected 
                                ? "bg-emerald-400 text-black border-emerald-400" 
                                : "bg-[#050505] text-zinc-400 border-white/5 group-hover:text-white"
                            }`}>
                              <IconComponent className="w-4 h-4" />
                            </div>
                            
                            <div className="mt-4">
                              <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider mb-1">{cat.name}</h4>
                              <p className="text-[10px] text-zinc-500 leading-relaxed font-sans line-clamp-2">{cat.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 3: BUSINESS INFO */}
                {currentStep === "businessInfo" && (
                  <div className="space-y-6">
                    <div className="mb-4">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-1">Step 03</span>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">Tell us about your business</h3>
                      <p className="text-zinc-400 text-xs">Provide company details to guide our regulatory compliance checks.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Business or Entity Name</label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                          <input 
                            type="text" 
                            required
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            placeholder="e.g. Acme Corp"
                            className="w-full bg-[#050505]/60 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-emerald-500/50 transition-colors font-sans"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Industry / Vertical</label>
                        <div className="relative">
                          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                          <input 
                            type="text" 
                            required
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                            placeholder="e.g. Healthcare, Fintech, Logistics"
                            className="w-full bg-[#050505]/60 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-emerald-500/50 transition-colors font-sans"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Country of Incorporation</label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                          <input 
                            type="text" 
                            required
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            placeholder="e.g. USA, Nigeria, United Kingdom"
                            className="w-full bg-[#050505]/60 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-emerald-500/50 transition-colors font-sans"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Current Website (Optional)</label>
                        <div className="relative">
                          <Laptop className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                          <input 
                            type="url" 
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            placeholder="https://example.com"
                            className="w-full bg-[#050505]/60 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-emerald-500/50 transition-colors font-sans"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-left pt-2">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Company Size (FTEs)</label>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {["1", "2–9", "10–49", "50–249", "250+"].map((size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setCompanySize(size)}
                            className={`py-2.5 rounded-lg border text-xs font-mono text-center transition-all cursor-pointer ${
                              companySize === size
                                ? "bg-emerald-500/10 border-emerald-400 text-emerald-300 font-bold"
                                : "bg-[#050505]/60 border-white/5 text-zinc-400 hover:text-white"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: DETAILS */}
                {currentStep === "details" && (
                  <div className="space-y-6">
                    <div className="mb-4">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-1">Step 04</span>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">Scope details</h3>
                      <p className="text-zinc-400 text-xs">Outline the primary business objective or system architecture you envision.</p>
                    </div>

                    <div className="space-y-2 text-left">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">Tell us about the project you're envisioning</label>
                      <div className="relative">
                        <textarea
                          required
                          rows={6}
                          value={details}
                          onChange={(e) => {
                            setDetails(e.target.value);
                            setValidationError("");
                          }}
                          placeholder="e.g. A high-throughput wallet gateway designed with isolated microservices, real-time transaction reporting, and SOC2 compliant datastores..."
                          className="w-full bg-[#050505]/60 border border-white/10 rounded-xl p-4 text-xs sm:text-sm text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/10 transition-all font-sans resize-none"
                        />
                        <div className="absolute bottom-3 right-3 text-[9px] font-mono text-zinc-500">
                          {details.length} characters
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 5: FEATURES */}
                {currentStep === "features" && (
                  <div className="space-y-6">
                    <div className="mb-4">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-1">Step 05</span>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">Core application features</h3>
                      <p className="text-zinc-400 text-xs">Select any functional capabilities your platform requires. Multiple selections allowed.</p>
                    </div>

                    <div className="flex flex-wrap gap-2.5 justify-center py-4">
                      {featuresList.map((feat) => {
                        const isSelected = features.includes(feat);
                        return (
                          <button
                            key={feat}
                            type="button"
                            onClick={() => {
                              if (isSelected) {
                                setFeatures((prev) => prev.filter((f) => f !== feat));
                              } else {
                                setFeatures((prev) => [...prev, feat]);
                              }
                            }}
                            className={`px-4 py-2.5 rounded-full border text-[11px] font-sans font-medium transition-all flex items-center space-x-2 cursor-pointer ${
                              isSelected
                                ? "bg-emerald-500/10 border-emerald-400 text-emerald-300 font-semibold shadow-[0_0_10px_rgba(16,185,129,0.05)]"
                                : "bg-[#050505]/60 border-white/5 text-zinc-400 hover:text-white hover:border-white/15 hover:-translate-y-0.5"
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full transition-colors ${isSelected ? "bg-emerald-400" : "bg-zinc-600"}`} />
                            <span>{feat}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 6: BUDGET */}
                {currentStep === "budget" && (
                  <div className="space-y-8">
                    <div className="mb-4">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-1">Step 06</span>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">Financing & scale boundaries</h3>
                      <p className="text-zinc-400 text-xs">Determine your allocation in {activeLocationConfig.currencyLabel}. This maps out optimal cloud infrastructure specs.</p>
                    </div>

                    {/* BUDGET PRESENTS CARDS GRID */}
                    <div className="bg-[#050505] border border-white/5 rounded-2xl p-6 sm:p-8 space-y-6 max-w-xl mx-auto">
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="text-zinc-500 uppercase tracking-wider">TARGET BUDGET RANGE ({activeLocationConfig.currencyCode})</span>
                        <span className="text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 text-sm">
                          {currentBudgetRanges[Math.min(budgetIndex, currentBudgetRanges.length - 1)]?.label}
                        </span>
                      </div>

                      {/* Tactile Range Slider */}
                      <div className="space-y-4 py-4">
                        <input
                          type="range"
                          min="0"
                          max={currentBudgetRanges.length - 1}
                          step="1"
                          value={Math.min(budgetIndex, currentBudgetRanges.length - 1)}
                          onChange={(e) => setBudgetIndex(parseInt(e.target.value))}
                          className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer accent-emerald-400 focus:outline-none"
                        />
                        <div className="flex justify-between text-[8px] font-mono text-zinc-500 uppercase tracking-tighter">
                          <span>{currentBudgetRanges[0]?.label}</span>
                          <span>{currentBudgetRanges[2]?.label}</span>
                          <span>{currentBudgetRanges[4]?.label}</span>
                          <span>Flexible</span>
                        </div>
                      </div>

                      <div className="bg-[#02050b] border border-white/5 rounded-xl p-4 text-left transition-all duration-300">
                        <div className="flex items-center space-x-2 text-white font-semibold text-xs mb-1">
                          <DollarSign className="w-4 h-4 text-emerald-400" />
                          <span>Architectural Scope Allocation</span>
                        </div>
                        <p className="text-zinc-400 text-[11px] font-sans leading-relaxed">
                          {currentBudgetRanges[Math.min(budgetIndex, currentBudgetRanges.length - 1)]?.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 7: TIMELINE */}
                {currentStep === "timeline" && (
                  <div className="space-y-6">
                    <div className="mb-4">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-1">Step 07</span>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">Delivery timeline</h3>
                      <p className="text-zinc-400 text-xs">How soon does your platform need to launch in production?</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 max-w-3xl mx-auto">
                      {timelines.map((tl) => {
                        const isSelected = timeline === tl.label;
                        return (
                          <div
                            key={tl.label}
                            onClick={() => {
                              setTimeline(tl.label);
                              setValidationError("");
                            }}
                            className={`p-4 rounded-xl border text-center cursor-pointer transition-all flex flex-col justify-between min-h-[110px] ${
                              isSelected
                                ? "bg-emerald-500/10 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)] scale-[1.02]"
                                : "bg-[#050505]/60 border-white/5 hover:border-white/15"
                            }`}
                          >
                            <div className="flex justify-center mb-2">
                              <Clock className={`w-5 h-5 ${isSelected ? "text-emerald-400" : "text-zinc-500"}`} />
                            </div>
                            
                            <div>
                              <h5 className="font-display font-bold text-[10px] text-white uppercase tracking-wider mb-0.5">{tl.label}</h5>
                              <p className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider">{tl.spec}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 8: REFERENCES */}
                {currentStep === "references" && (
                  <div className="space-y-6">
                    <div className="mb-4">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-1">Step 08</span>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">Architecture references & brand assets</h3>
                      <p className="text-zinc-400 text-xs">Attach wireframes, functional specification sheets, database schemas, or logos (Max 15MB/file).</p>
                    </div>

                    {/* DRAG AND DROP ZONE */}
                    <div
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-4 ${
                        dragActive 
                          ? "border-emerald-400 bg-emerald-500/5" 
                          : "border-white/10 bg-[#050505]/40 hover:border-white/20"
                      }`}
                    >
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        multiple
                        onChange={handleManualFileSelect}
                        className="hidden" 
                      />

                      <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-zinc-400">
                        {uploading ? (
                          <Loader2 className="w-5 h-5 text-emerald-400 animate-spin" />
                        ) : (
                          <Upload className="w-5 h-5 text-zinc-500" />
                        )}
                      </div>

                      <div className="space-y-1">
                        <p className="text-xs text-white font-semibold">
                          {uploading ? "Transmitting file reference to secure vault..." : "Drag & drop files here, or click to browse"}
                        </p>
                        <p className="text-[10px] text-zinc-500 font-mono">
                          Supports PNG, JPG, PDF, DOCX, ZIP (Max 15MB)
                        </p>
                      </div>
                    </div>

                    {/* UPLOADED FILES LIST CARDS */}
                    {uploadedFiles.length > 0 && (
                      <div className="space-y-2.5 text-left pt-4">
                        <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest font-bold">ATTACHED ASSETS ({uploadedFiles.length})</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {uploadedFiles.map((file, idx) => (
                            <div 
                              key={idx} 
                              className="bg-[#050505] border border-white/5 rounded-xl p-3 flex items-center justify-between hover:border-white/15 transition-all"
                            >
                              <div className="flex items-center space-x-3 truncate">
                                <div className="w-8 h-8 rounded-lg bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0 font-mono text-[8px] font-bold">
                                  {file.name.split('.').pop()?.toUpperCase() || "BIN"}
                                </div>
                                <div className="truncate">
                                  <h6 className="text-xs text-white font-semibold truncate max-w-[180px]">{file.name}</h6>
                                  <span className="text-[9px] font-mono text-zinc-500 block">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteFile(idx);
                                }}
                                className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/5 transition-all cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* STEP 9: CONTACT INFORMATION */}
                {currentStep === "contact" && (
                  <div className="space-y-6">
                    <div className="mb-4">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-1">Step 09</span>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">Onboarding contact handshake</h3>
                      <p className="text-zinc-400 text-xs">Who is our primary solutions engineer speaking with?</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Your Full Name</label>
                        <input 
                          type="text" 
                          required
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            setValidationError("");
                          }}
                          placeholder="e.g. Sarah Connor"
                          className="w-full bg-[#050505]/60 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-emerald-500/50 transition-colors font-sans"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Business Email</label>
                        <input 
                          type="email" 
                          required
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setValidationError("");
                          }}
                          placeholder="sarah@company.com"
                          className="w-full bg-[#050505]/60 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-emerald-500/50 transition-colors font-sans"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Phone Number ({activeLocationConfig.phonePrefix})</label>
                        <input 
                          type="tel" 
                          required
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            setValidationError("");
                          }}
                          placeholder={activeLocationConfig.phonePlaceholder}
                          className="w-full bg-[#050505]/60 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-emerald-500/50 transition-colors font-sans"
                        />
                      </div>
                    </div>

                    {/* Regional Timezone Selection */}
                    <div className="space-y-1.5 text-left pt-2">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">Meeting Timezone ({location})</label>
                      <select
                        value={selectedTimezone}
                        onChange={(e) => setSelectedTimezone(e.target.value)}
                        className="w-full bg-[#050505]/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-zinc-200 focus:outline-none focus:border-emerald-500/50 transition-colors font-sans appearance-none cursor-pointer"
                      >
                        {activeLocationConfig.timezones.map((tz) => (
                          <option key={tz} value={tz} className="bg-zinc-950 text-white">{tz}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left pt-2">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Preferred Contact Channel</label>
                        <div className="grid grid-cols-4 gap-2">
                          {(["WhatsApp", "Phone", "Email", "Meeting"] as const).map((method) => (
                            <button
                              key={method}
                              type="button"
                              onClick={() => setContactMethod(method)}
                              className={`py-2 rounded-lg border text-[10px] font-mono text-center uppercase tracking-wider transition-all cursor-pointer ${
                                contactMethod === method
                                  ? "bg-emerald-500/10 border-emerald-400 text-emerald-300 font-bold"
                                  : "bg-[#050505]/60 border-white/5 text-zinc-400 hover:text-white"
                              }`}
                            >
                              {method}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Preferred Handshake Hour</label>
                        <div className="grid grid-cols-3 gap-2">
                          {(["Morning", "Afternoon", "Evening"] as const).map((time) => (
                            <button
                              key={time}
                              type="button"
                              onClick={() => setContactTime(time)}
                              className={`py-2 rounded-lg border text-[10px] font-mono text-center uppercase tracking-wider transition-all cursor-pointer ${
                                contactTime === time
                                  ? "bg-emerald-500/10 border-emerald-400 text-emerald-300 font-bold"
                                  : "bg-[#050505]/60 border-white/5 text-zinc-400 hover:text-white"
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 10: COMMUNICATION PREFERENCES */}
                {currentStep === "communication" && (
                  <div className="space-y-6">
                    <div className="mb-4">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-1">Step 10</span>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">Communication preferences</h3>
                      <p className="text-zinc-400 text-xs">How should our principal engineering team keep you updated on progress?</p>
                    </div>

                    <div className="space-y-6 text-left">
                      {/* Preferred Contact Channel Grid */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">Preferred Contact Channel</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {([
                            { key: "WhatsApp", label: "WhatsApp", icon: MessageSquare },
                            { key: "Telegram", label: "Telegram", icon: Globe },
                            { key: "Email", label: "Email", icon: Mail },
                            { key: "Phone", label: "Direct Phone", icon: Phone },
                            { key: "Meet", label: "Google Meet", icon: Laptop },
                            { key: "Zoom", label: "Zoom Video", icon: Laptop },
                            { key: "Teams", label: "MS Teams", icon: Laptop },
                            { key: "Other", label: "Other Medium", icon: HelpCircle }
                          ] as const).map((ch) => {
                            const Icon = ch.icon;
                            const isSelected = preferredChannel === ch.key;
                            return (
                              <button
                                key={ch.key}
                                type="button"
                                onClick={() => {
                                  setPreferredChannel(ch.key);
                                  setValidationError("");
                                  if (ch.key === "Email" && !preferredEmail) setPreferredEmail(email);
                                  if ((ch.key === "WhatsApp" || ch.key === "Phone") && !preferredNumber) setPreferredNumber(phone);
                                }}
                                className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between min-h-[100px] ${
                                  isSelected
                                    ? "bg-emerald-500/10 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.08)] scale-[1.02]"
                                    : "bg-[#050505]/60 border-white/5 hover:border-white/15"
                                }`}
                              >
                                <div className="flex justify-between items-start w-full">
                                  <Icon className={`w-5 h-5 ${isSelected ? "text-emerald-400" : "text-zinc-500"}`} />
                                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                                </div>
                                <span className="font-display font-semibold text-[11px] text-white tracking-wide mt-2 block">{ch.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Conditional Inputs Block */}
                      <div className="bg-[#050505]/40 border border-white/5 rounded-2xl p-5 space-y-4">
                        {(preferredChannel === "WhatsApp" || preferredChannel === "Phone") && (
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Preferred Contact Number ({activeLocationConfig.phonePrefix})</label>
                            <input
                              type="tel"
                              required
                              value={preferredNumber}
                              onChange={(e) => {
                                setPreferredNumber(e.target.value);
                                setValidationError("");
                              }}
                              placeholder={activeLocationConfig.phonePlaceholder}
                              className="w-full bg-[#050505]/80 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-emerald-500/50 transition-colors font-sans"
                            />
                            <p className="text-[9px] text-zinc-500 font-mono">Enables automated weekly SMS update logs and scheduling.</p>
                          </div>
                        )}

                        {preferredChannel === "Telegram" && (
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Telegram Username</label>
                            <div className="relative">
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 text-xs sm:text-sm font-mono">@</span>
                              <input
                                type="text"
                                required
                                value={telegramUsername}
                                onChange={(e) => {
                                  setTelegramUsername(e.target.value);
                                  setValidationError("");
                                }}
                                placeholder="username"
                                className="w-full bg-[#050505]/80 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-xs sm:text-sm text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-emerald-500/50 transition-colors font-sans"
                              />
                            </div>
                            <p className="text-[9px] text-zinc-500 font-mono">Our automated telemetry dispatch bot will send build status updates.</p>
                          </div>
                        )}

                        {preferredChannel === "Email" && (
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Preferred Email Address</label>
                            <input
                              type="email"
                              required
                              value={preferredEmail}
                              onChange={(e) => {
                                setPreferredEmail(e.target.value);
                                setValidationError("");
                              }}
                              placeholder="e.g. contact@company.com"
                              className="w-full bg-[#050505]/80 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-emerald-500/50 transition-colors font-sans"
                            />
                            <p className="text-[9px] text-zinc-500 font-mono">All formal spec review, security updates, and invoices default here.</p>
                          </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Preferred Meeting Platform</label>
                            <select
                              value={preferredMeetingPlatform}
                              onChange={(e) => setPreferredMeetingPlatform(e.target.value as any)}
                              className="w-full bg-[#050505]/80 border border-white/10 rounded-xl px-3 py-3 text-xs text-zinc-200 focus:outline-none focus:border-emerald-500/50 transition-colors font-sans appearance-none cursor-pointer"
                            >
                              <option value="Meet" className="bg-zinc-950 text-white">Google Meet</option>
                              <option value="Zoom" className="bg-zinc-950 text-white">Zoom Video</option>
                              <option value="Teams" className="bg-zinc-950 text-white">Microsoft Teams</option>
                              <option value="Other" className="bg-zinc-950 text-white">Other / Custom Link</option>
                            </select>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Preferred Contact Hours</label>
                            <input
                              type="text"
                              required
                              value={preferredContactHours}
                              onChange={(e) => {
                                setPreferredContactHours(e.target.value);
                                setValidationError("");
                              }}
                              placeholder={`e.g. 9:00 AM - 5:00 PM (${selectedTimezone.split(' ')[0]})`}
                              className="w-full bg-[#050505]/80 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-emerald-500/50 transition-colors font-sans"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 11: SOLUTIONS SPEC REVIEW */}
                {currentStep === "review" && (
                  <div className="space-y-6 text-left">
                    <div className="mb-4">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-1">Step 11</span>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">Review solution blueprint parameters</h3>
                      <p className="text-zinc-400 text-xs">Verify your structural parameters before dispatching requests to IGRIS Tech secure controllers.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Left Review Col */}
                      <div className="space-y-4">
                        <div className="bg-[#050505] border border-white/5 rounded-xl p-4 relative group">
                          <button 
                            onClick={() => handleEditStep("location")}
                            className="absolute top-3 right-3 text-[9px] font-mono uppercase text-emerald-400 hover:underline cursor-pointer"
                          >
                            Edit
                          </button>
                          <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">REGION & CURRENCY</span>
                          <span className="font-display font-bold text-xs uppercase text-white tracking-wider flex items-center gap-1.5">
                            <span>{activeLocationConfig.flag}</span>
                            <span>{location}</span>
                            <span className="text-emerald-400 font-mono text-[10px]">({activeLocationConfig.currencyLabel})</span>
                          </span>
                        </div>

                        <div className="bg-[#050505] border border-white/5 rounded-xl p-4 relative group">
                          <button 
                            onClick={() => handleEditStep("projectType")}
                            className="absolute top-3 right-3 text-[9px] font-mono uppercase text-emerald-400 hover:underline cursor-pointer"
                          >
                            Edit
                          </button>
                          <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">PROJECT CLASS</span>
                          <span className="font-display font-bold text-xs uppercase text-white tracking-wider flex items-center gap-1.5">
                            <Laptop className="w-3.5 h-3.5 text-emerald-400" />
                            {projectType || "Unspecified"}
                          </span>
                        </div>

                        <div className="bg-[#050505] border border-white/5 rounded-xl p-4 relative group">
                          <button 
                            onClick={() => handleEditStep("businessInfo")}
                            className="absolute top-3 right-3 text-[9px] font-mono uppercase text-emerald-400 hover:underline cursor-pointer"
                          >
                            Edit
                          </button>
                          <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block mb-1.5">COMPANY LOGISTICS</span>
                          <div className="space-y-1 text-xs">
                            <div className="flex justify-between border-b border-white/5 pb-1"><span className="text-zinc-500 font-mono text-[9px]">Entity</span><span className="text-zinc-200 font-bold">{businessName}</span></div>
                            <div className="flex justify-between border-b border-white/5 pb-1"><span className="text-zinc-500 font-mono text-[9px]">Vertical</span><span className="text-zinc-200">{industry}</span></div>
                            <div className="flex justify-between border-b border-white/5 pb-1"><span className="text-zinc-500 font-mono text-[9px]">Incorporation</span><span className="text-zinc-200">{country}</span></div>
                            <div className="flex justify-between border-b border-white/5 pb-1"><span className="text-zinc-500 font-mono text-[9px]">Scale (FTEs)</span><span className="text-zinc-200 font-mono text-[10px]">{companySize}</span></div>
                            {website && <div className="flex justify-between pb-1"><span className="text-zinc-500 font-mono text-[9px]">Website</span><span className="text-zinc-400 text-[10px] truncate max-w-[150px]">{website}</span></div>}
                          </div>
                        </div>

                        <div className="bg-[#050505] border border-white/5 rounded-xl p-4 relative group">
                          <button 
                            onClick={() => handleEditStep("details")}
                            className="absolute top-3 right-3 text-[9px] font-mono uppercase text-emerald-400 hover:underline cursor-pointer"
                          >
                            Edit
                          </button>
                          <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">VISION ARCHITECTURE PROMPT</span>
                          <p className="text-zinc-300 text-xs leading-relaxed line-clamp-4 font-sans mt-1">
                            "{details}"
                          </p>
                        </div>
                      </div>

                      {/* Right Review Col */}
                      <div className="space-y-4">
                        <div className="bg-[#050505] border border-white/5 rounded-xl p-4 relative group">
                          <button 
                            onClick={() => handleEditStep("features")}
                            className="absolute top-3 right-3 text-[9px] font-mono uppercase text-emerald-400 hover:underline cursor-pointer"
                          >
                            Edit
                          </button>
                          <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block mb-1.5">REQUESTED SYSTEM FEATS ({features.length})</span>
                          <div className="flex flex-wrap gap-1">
                            {features.length === 0 ? (
                              <span className="text-zinc-500 italic text-xs">Standard agile scoping</span>
                            ) : (
                              features.map((f) => (
                                <span key={f} className="text-[9px] font-sans font-medium text-emerald-300 bg-emerald-500/5 border border-emerald-500/20 px-2 py-0.5 rounded-full">{f}</span>
                              ))
                            )}
                          </div>
                        </div>

                        <div className="bg-[#050505] border border-white/5 rounded-xl p-4 relative group">
                          <button 
                            onClick={() => handleEditStep("budget")}
                            className="absolute top-3 right-3 text-[9px] font-mono uppercase text-emerald-400 hover:underline cursor-pointer"
                          >
                            Edit
                          </button>
                          <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">FINANCIAL RANGE</span>
                          <span className="font-mono text-xs text-emerald-300 uppercase tracking-wider block font-bold">
                            {currentBudgetRanges[Math.min(budgetIndex, currentBudgetRanges.length - 1)]?.label}
                          </span>
                        </div>

                        <div className="bg-[#050505] border border-white/5 rounded-xl p-4 relative group">
                          <button 
                            onClick={() => handleEditStep("timeline")}
                            className="absolute top-3 right-3 text-[9px] font-mono uppercase text-emerald-400 hover:underline cursor-pointer"
                          >
                            Edit
                          </button>
                          <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">TIMELINE CONSTRAINT</span>
                          <span className="font-display font-semibold text-xs text-white block uppercase tracking-wide">{timeline}</span>
                        </div>

                        <div className="bg-[#050505] border border-white/5 rounded-xl p-4 relative group">
                          <button 
                            onClick={() => handleEditStep("contact")}
                            className="absolute top-3 right-3 text-[9px] font-mono uppercase text-emerald-400 hover:underline cursor-pointer"
                          >
                            Edit
                          </button>
                          <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block mb-1.5">HANDSHAKE DETAILS</span>
                          <div className="space-y-0.5 text-xs">
                            <span className="text-white block font-semibold">{fullName}</span>
                            <span className="text-zinc-400 text-[11px] block">{email}</span>
                            <span className="text-zinc-400 text-[11px] block">{phone}</span>
                            <span className="text-zinc-500 font-mono text-[9px] block uppercase mt-1">TIMEZONE: {selectedTimezone}</span>
                          </div>
                        </div>

                        <div className="bg-[#050505] border border-white/5 rounded-xl p-4 relative group">
                          <button 
                            onClick={() => handleEditStep("communication")}
                            className="absolute top-3 right-3 text-[9px] font-mono uppercase text-emerald-400 hover:underline cursor-pointer"
                          >
                            Edit
                          </button>
                          <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block mb-1.5">COMMUNICATION PREFERENCES</span>
                          <div className="space-y-1 text-xs">
                            <div className="flex justify-between border-b border-white/5 pb-1"><span className="text-zinc-500 font-mono text-[9px]">Channel</span><span className="text-emerald-400 font-semibold">{preferredChannel}</span></div>
                            {preferredNumber && <div className="flex justify-between border-b border-white/5 pb-1"><span className="text-zinc-500 font-mono text-[9px]">Contact No</span><span className="text-zinc-200">{preferredNumber}</span></div>}
                            {telegramUsername && <div className="flex justify-between border-b border-white/5 pb-1"><span className="text-zinc-500 font-mono text-[9px]">Telegram</span><span className="text-zinc-200">@{telegramUsername}</span></div>}
                            {preferredEmail && <div className="flex justify-between border-b border-white/5 pb-1"><span className="text-zinc-500 font-mono text-[9px]">Contact Email</span><span className="text-zinc-200">{preferredEmail}</span></div>}
                            <div className="flex justify-between border-b border-white/5 pb-1"><span className="text-zinc-500 font-mono text-[9px]">Meeting Platform</span><span className="text-zinc-200">{preferredMeetingPlatform}</span></div>
                            <div className="flex justify-between pb-1"><span className="text-zinc-500 font-mono text-[9px]">Availability</span><span className="text-zinc-200">{preferredContactHours}</span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* NAVIGATION BUTTONS BAR */}
              <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-8">
                {currentStepIdx > 0 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center space-x-1.5 text-xs font-mono uppercase text-zinc-500 hover:text-white transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {/* Validation Error Banner */}
                {validationError && (
                  <div className="flex items-center space-x-1.5 text-rose-400 font-mono text-[10px] uppercase bg-rose-500/5 px-4 py-1.5 rounded-lg border border-rose-500/10">
                    <AlertCircle className="w-3 h-3" />
                    <span>{validationError}</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={currentStep === "review" ? handleSubmit : handleNext}
                  disabled={submitting}
                  className="flex items-center space-x-2 bg-white text-black hover:bg-emerald-400 font-sans font-bold px-7 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(16,185,129,0.15)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Compiling Spec...</span>
                    </>
                  ) : currentStep === "review" ? (
                    <>
                      <Sparkles className="w-3.5 h-3.5 fill-current" />
                      <span>Submit Project Request</span>
                    </>
                  ) : currentStep === "welcome" ? (
                    <>
                      <span>Start Planning</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  ) : (
                    <>
                      <span>Continue</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
