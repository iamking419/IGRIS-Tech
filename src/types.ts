export interface TechStackItem {
  name: string;
  reason: string;
}

export interface TechStackGroup {
  frontend: TechStackItem[];
  backend: TechStackItem[];
  database: TechStackItem[];
  cloud: TechStackItem[];
}

export interface CybersecurityAssessmentItem {
  threat: string;
  mitigation: string;
}

export interface ProjectMilestone {
  title: string;
  duration: string;
  deliverables: string[];
  focus: string;
}

export interface CostEstimation {
  designAndDiscovery: number;
  development: number;
  qaAndSecAudit: number;
  cloudDeployment: number;
  timelineWeeks: number;
  totalCostEstimate: string;
}

export interface ScopingProposal {
  title: string;
  overview: string;
  techStack: TechStackGroup;
  architectureFlow: string[];
  cybersecurityAssessment: CybersecurityAssessmentItem[];
  milestones: ProjectMilestone[];
  costEstimation: CostEstimation;
  warning?: string;
  info?: string;
}

export interface ServiceDetail {
  id: string;
  title: string;
  iconName: string;
  shortDesc: string;
  longDesc: string;
  capabilities: string[];
  techUsed: string[];
}

export interface ProjectStage {
  id: string;
  title: string;
  status: "completed" | "active" | "pending";
  date: string;
  summary: string;
}

export interface PortalProject {
  id: string;
  name: string;
  client: string;
  status: "designing" | "developing" | "hardening" | "deployed";
  progress: number;
  nextMilestone: string;
  activeBuildStatus: "passing" | "building" | "failed";
  stages: ProjectStage[];
  cybersecurityScore: number;
  activeCpuUsage: number;
  activeRamUsage: number;
}

export interface UploadedFile {
  name: string;
  size: number;
  type: string;
  dataUrl?: string;
  url?: string;
}

export interface ProjectRequest {
  id: string;
  projectType: string;
  businessName: string;
  industry: string;
  country: string;
  website?: string;
  companySize: string;
  details: string;
  features: string[];
  budget: string;
  timeline: string;
  references: UploadedFile[];
  fullName: string;
  email: string;
  phone: string;
  contactMethod: "WhatsApp" | "Phone" | "Email" | "Meeting";
  contactTime: "Morning" | "Afternoon" | "Evening";
  status: "pending" | "approved" | "rejected" | "more_info";
  submittedAt: string;
  adminNotes?: string;
  proposal?: ScopingProposal;
}

