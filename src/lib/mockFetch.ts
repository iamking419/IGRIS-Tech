/**
 * IGRIS Technical Systems - Client-Side API Mock Interceptor
 * Intercepts all window.fetch calls to simulate a full backend completely offline.
 */

interface MockUser {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  passwordHash: string;
  salt: string;
  emailVerified: boolean;
  avatarUrl: string;
  createdAt: string;
}

interface MockMail {
  id: string;
  email: string;
  subject: string;
  type: "verification" | "reset";
  link: string;
  sentAt: string;
}

// Default Seed Data
const DEFAULT_USERS: MockUser[] = [
  {
    id: "user-michael-knight",
    name: "Michael Knight",
    company: "Knight Industries",
    phone: "+1 (415) 555-0199",
    email: "michaelkm555@gmail.com",
    passwordHash: "Password123", // Accept Password123 or dummy
    salt: "salt",
    emailVerified: true,
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop",
    createdAt: new Date().toISOString()
  }
];

const DEFAULT_PROJECTS = [
  {
    id: "hyperion-ledger",
    name: "Hyperion Auditing Ledger",
    client: "Michael Knight",
    client_id: "client-1",
    client_reference: "IGR-2026-092",
    status: "developing",
    progress: 65,
    progress_percent: 65,
    phase: "Backend Engineering",
    nextMilestone: "High-Fidelity Dashboard & Charts",
    eta: "2026-08-15",
    pm: { name: "Sarah Connor", avatar_url: "SC", role: "Principal Architect" },
    last_updated: "2 hours ago",
    cover_url: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
    details: "High-throughput real-time digital asset auditing pipeline and secure ledger reporting vault.",
    budget: "$45,000",
    timeline: "12 Weeks",
    activeBuildStatus: "passing",
    cybersecurityScore: 98,
    activeCpuUsage: 24,
    activeRamUsage: 4.2,
    stages: [
      { id: "1", title: "Discovery & Solution Blueprint", status: "completed", date: "June 20, 2026", summary: "Interactive database entity mappings, wireframes, and cybersecurity threat vectors completely approved." },
      { id: "2", title: "Backend Core API Gateway", status: "completed", date: "July 02, 2026", summary: "Secure OAuth2 controllers, gRPC microservice boundaries, and database replicas securely provisioned." },
      { id: "3", title: "High-Fidelity Dashboard & Charts", status: "active", date: "Ongoing", summary: "Polishing responsive visual animations, dashboard canvas widgets, and real-time socket integrations." },
      { id: "4", title: "QA Pen Auditing & Deployment", status: "pending", date: "Target August 15", summary: "Automated end-to-end integration tests, penetration assessments, and deployment to auto-scaling container registry." }
    ],
    messages: [
      { sender: "ai", text: "Welcome to your IGRIS Client Workspace. I am your automated Principal Dev Representative. How can I assist you with the ongoing sprint or system logs today?", time: "10:14 AM" }
    ]
  },
  {
    id: "crypto-vault",
    name: "Solana Liquid Asset Vault",
    client: "Michael Knight",
    client_id: "client-1",
    client_reference: "IGR-2026-104",
    status: "review",
    progress: 88,
    progress_percent: 88,
    phase: "Security Audit",
    nextMilestone: "Secured Frontend Interaction dApp",
    eta: "2026-07-28",
    pm: { name: "Evelyn Reed", avatar_url: "ER", role: "Security Director" },
    last_updated: "10 mins ago",
    cover_url: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=800&q=80",
    details: "Automated multi-signature liquidity protocol smart contracts and dApp client frontend interface.",
    budget: "$68,000",
    timeline: "14 Weeks",
    activeBuildStatus: "passing",
    cybersecurityScore: 97,
    activeCpuUsage: 14,
    activeRamUsage: 3.8,
    stages: [
      { id: "1", title: "Smart Contract Blueprinting", status: "completed", date: "May 15, 2026", summary: "Rust Anchor program definitions and security threat analysis completed." },
      { id: "2", title: "On-Chain Deployment & Testing", status: "completed", date: "June 10, 2026", summary: "Deployment to Solana devnet with fully simulated instruction runs." },
      { id: "3", title: "Secured Frontend Interaction dApp", status: "active", date: "Ongoing", summary: "Wallet adapter protocols, transaction simulation banners, and custom toasts awaiting review." }
    ],
    messages: [
      { sender: "ai", text: "Hello Michael, the security review of the Solana Liquid Asset Vault is complete. The dApp is fully operational on devnet. Please let us know if the wallet authorization meets your guidelines.", time: "Yesterday" }
    ]
  }
];

const DEFAULT_REQUESTS = [
  {
    id: "req-1",
    projectType: "Backend System",
    businessName: "Alpha Capital",
    industry: "Finance",
    country: "USA",
    website: "https://alphacapital.com",
    companySize: "10-49",
    details: "We require a sub-millisecond real-time ledger auditing pipeline that can parse and store 10,000 requests per second securely with AES encryption and automatic cloud backups.",
    features: ["Authentication", "Dashboard", "API Integration", "Analytics", "Security Audit"],
    budget: "$45,000",
    timeline: "Within Two Months",
    references: [],
    fullName: "Sarah Connor",
    email: "sarah@alphacapital.com",
    phone: "+1 (415) 555-4921",
    contactMethod: "Meeting",
    contactTime: "Morning",
    status: "pending",
    submittedAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    proposal: {
      title: "Project Alpha Ledger — High-Throughput Real-Time Auditing Gateway",
      overview: "An enterprise-grade high-throughput ledger audit pipeline designed specifically for Alpha Capital. Features automatic cryptographic disk storage, redundant Spanner failover clusters, and real-time Kafka messaging for seamless stream integrity.",
      techStack: {
        frontend: [{ name: "Next.js", reason: "React 19 support and fast layouts" }],
        backend: [{ name: "Rust / Actix-Web", reason: "Memory-safety, speed, and concurrency control" }],
        database: [{ name: "Google Cloud Spanner", reason: "Global scalability and ACID compliance" }],
        cloud: [{ name: "Kubernetes on GCP", reason: "Auto-scaled container isolation" }]
      },
      architectureFlow: [
        "Data packets stream from client integrations into Kafka ingress topic.",
        "Rust microservices ingest streaming records, validate signatures, and encrypt using AES-256-GCM.",
        "Auditing checks are triggered asynchronously, storing verified states in Google Cloud Spanner."
      ],
      cybersecurityAssessment: [
        { threat: "In-flight message interception", mitigation: "Enforce TLS 1.3 encryption on all connections with mandatory mTLS handshakes." }
      ],
      milestones: [
        { title: "Architecture & Schema Setup", duration: "2 Weeks", deliverables: ["Architecture Doc", "mTLS Protocol Spec"], focus: "Secure secure protocol constraints" }
      ],
      costEstimation: {
        designAndDiscovery: 4000,
        development: 12000,
        qaAndSecAudit: 3000,
        cloudDeployment: 2500,
        timelineWeeks: 6,
        totalCostEstimate: "$21,500"
      }
    }
  }
];

// Helper to load/save mock database from localStorage
const loadMockData = <T>(key: string, defaultValue: T): T => {
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return defaultValue;
  }
};

const saveMockData = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Seed LocalStorage
loadMockData("igris_mock_users", DEFAULT_USERS);
loadMockData("igris_mock_projects", DEFAULT_PROJECTS);
loadMockData("igris_mock_requests", DEFAULT_REQUESTS);
loadMockData("igris_mock_mails", [] as MockMail[]);

const getFallbackProposal = (details: string, budget: string, timeline: string) => {
  return {
    title: "Project Nexus — Enterprise Architectural Solution",
    overview: `A high-performance software solution tailored to address the request: "${details}". Designed with premium cloud architecture, robust microservices, and absolute security integrity. This solution represents IGRIS Tech's commitment to delivering Vercel-grade frontends paired with heavy-duty backend infrastructure, perfect for a budget of ${budget} and a target completion of ${timeline}.`,
    techStack: {
      frontend: [
        { name: "Next.js 15 (React 19)", reason: "Enables server-side rendering, sub-millisecond page transitions, and SEO optimized layouts." },
        { name: "Tailwind CSS v4 & Motion", reason: "Guarantees premium aesthetic execution, micro-interactions, and flawless responsive sizing." }
      ],
      backend: [
        { name: "Node.js (TypeScript) & Express", reason: "Asynchronous I/O performance ideal for scale, type safety, and fast API routing." }
      ],
      database: [
        { name: "PostgreSQL with Drizzle ORM", reason: "Relational integrity, support for complex relational queries, and sub-millisecond reads." }
      ],
      cloud: [
        { name: "Google Cloud Platform (Cloud Run)", reason: "Auto-scaling dockerized container environment with serverless efficiency." }
      ]
    },
    architectureFlow: [
      "Client requests transit securely via Google Cloud Load Balancer with custom SSL termination.",
      "Static assets are delivered via global CDN, while dynamic endpoints proxy to auto-scaled container workloads.",
      "The application queries high-availability PostgreSQL for deep transaction auditing logs."
    ],
    cybersecurityAssessment: [
      { threat: "Unauthorized API Exploitation", mitigation: "OAuth2 authentication flow reinforced with JSON Web Tokens (JWT) and rolling session keys." },
      { threat: "Distributed Denial of Service (DDoS)", mitigation: "Global WAF rate-limiting matched with static asset edge-caching." }
    ],
    milestones: [
      { title: "Discovery & Solution Blueprint", duration: "1-2 Weeks", deliverables: ["Technical Architecture Specification", "Interactive Figma Wireframes"], focus: "Align engineering scope with core product goals." },
      { title: "Core Architecture & Backend", duration: "3-4 Weeks", deliverables: ["Database Deployments", "API Route Architectures"], focus: "Establish high-performance, secure server logic." },
      { title: "Premium Frontend Interface", duration: "3-4 Weeks", deliverables: ["High-fidelity Component Implementation", "Cinematic Animations"], focus: "Deliver highly polished, responsive client interfaces." },
      { title: "Security Hardening & Deployment", duration: "1-2 Weeks", deliverables: ["Penetration Auditing", "CI/CD Pipeline Configurations"], focus: "Exacting security validation and zero-downtime deployment." }
    ],
    costEstimation: {
      designAndDiscovery: 5500,
      development: 18500,
      qaAndSecAudit: 4500,
      cloudDeployment: 3500,
      timelineWeeks: 10,
      totalCostEstimate: "$32,000"
    }
  };
};

// Overwrite window.fetch
const originalFetch = window.fetch ? window.fetch.bind(window) : null;

const mockFetch = async function (input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const urlString = typeof input === "string" ? input : input instanceof URL ? input.toString() : (input as any).url || "";
  
  // Only intercept API endpoints matching our local routes
  if (!urlString.includes("/api/")) {
    if (originalFetch) {
      return originalFetch(input, init);
    }
    throw new Error("No real fetch implementation available and URL is not mocked: " + urlString);
  }

  const url = new URL(urlString, window.location.origin);
  const path = url.pathname;
  const method = init?.method?.toUpperCase() || "GET";
  
  // Parse JSON body if present
  let body: any = {};
  if (init?.body && typeof init.body === "string") {
    try {
      body = JSON.parse(init.body);
    } catch (e) {
      // not JSON
    }
  }

  // Create Response Helper
  const jsonResponse = (data: any, status = 200) => {
    return new Response(JSON.stringify(data), {
      status,
      headers: { "Content-Type": "application/json" }
    });
  };

  const dbUsers = loadMockData<MockUser[]>("igris_mock_users", DEFAULT_USERS);
  const dbProjects = loadMockData<any[]>("igris_mock_projects", DEFAULT_PROJECTS);
  const dbRequests = loadMockData<any[]>("igris_mock_requests", DEFAULT_REQUESTS);
  const dbMails = loadMockData<MockMail[]>("igris_mock_mails", []);

  // 1. Dev Mails Inbox
  if (path === "/api/auth/dev-mails" && method === "GET") {
    return jsonResponse(dbMails);
  }

  // 2. Authentication: Register
  if (path === "/api/auth/register" && method === "POST") {
    const { name, company, email, phone, password } = body;
    if (!name || !email || !password) {
      return jsonResponse({ error: "Missing required corporate identity fields." }, 400);
    }

    // Check existing
    const exists = dbUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return jsonResponse({ error: "This email address is already registered in our secure client directory." }, 409);
    }

    const newUser: MockUser = {
      id: `user-${Math.random().toString(36).substr(2, 9)}`,
      name,
      company: company || "",
      phone: phone || "",
      email: email.toLowerCase(),
      passwordHash: password,
      salt: "salt",
      emailVerified: false,
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop",
      createdAt: new Date().toISOString()
    };

    dbUsers.push(newUser);
    saveMockData("igris_mock_users", dbUsers);

    // Generate simulated verification mail
    const verifyToken = Math.random().toString(36).substr(2, 12);
    const verifyUrl = `/verify-email?token=${verifyToken}`;
    const newMail: MockMail = {
      id: Math.random().toString(36).substr(2, 9),
      email: newUser.email,
      subject: "Verify your IGRIS Tech Client Workspace",
      type: "verification",
      link: verifyUrl,
      sentAt: new Date().toISOString()
    };

    dbMails.unshift(newMail);
    saveMockData("igris_mock_mails", dbMails);

    // Store in session
    const sessionToken = `mock-session-${Math.random().toString(36).substr(2, 12)}`;
    localStorage.setItem("igris_session_token", sessionToken);
    localStorage.setItem("igris_user", JSON.stringify(newUser));

    return jsonResponse({
      token: sessionToken,
      user: newUser,
      message: "Client registry success. A secure verification link has been dispatched."
    }, 201);
  }

  // 3. Authentication: Login
  if (path === "/api/auth/login" && method === "POST") {
    const { email, password } = body;
    if (!email || !password) {
      return jsonResponse({ error: "Please satisfy both login parameters." }, 400);
    }

    const user = dbUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return jsonResponse({ error: "This email address is not registered." }, 401);
    }

    if (password && user.passwordHash !== password && user.passwordHash !== "dummy-hash") {
      return jsonResponse({ error: "Your password is incorrect." }, 401);
    }

    const sessionToken = `mock-session-${Math.random().toString(36).substr(2, 12)}`;
    localStorage.setItem("igris_session_token", sessionToken);
    localStorage.setItem("igris_user", JSON.stringify(user));

    return jsonResponse({
      token: sessionToken,
      user: user
    });
  }

  // 4. Authentication: Session Verification
  if (path === "/api/auth/session" && method === "GET") {
    const savedUser = localStorage.getItem("igris_user");
    if (savedUser) {
      return jsonResponse({ user: JSON.parse(savedUser) });
    }
    return jsonResponse({ error: "No active session detected" }, 401);
  }

  // 5. Authentication: Logout
  if (path === "/api/auth/logout" && method === "POST") {
    localStorage.removeItem("igris_session_token");
    localStorage.removeItem("igris_user");
    return jsonResponse({ success: true, message: "Session successfully invalidated." });
  }

  // 6. Resend Verification Link
  if (path === "/api/auth/resend-verification" && method === "POST") {
    const { email } = body;
    const user = dbUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return jsonResponse({ error: "This email address is not registered." }, 404);
    }

    const verifyToken = Math.random().toString(36).substr(2, 12);
    const verifyUrl = `/verify-email?token=${verifyToken}`;
    const newMail: MockMail = {
      id: Math.random().toString(36).substr(2, 9),
      email: user.email,
      subject: "Verify your IGRIS Tech Client Workspace (Resend)",
      type: "verification",
      link: verifyUrl,
      sentAt: new Date().toISOString()
    };

    dbMails.unshift(newMail);
    saveMockData("igris_mock_mails", dbMails);

    return jsonResponse({ success: true, message: "A fresh verification link has been securely dispatched." });
  }

  // 7. Verify Email Link
  if (path === "/api/auth/verify-email" && method === "POST") {
    const { token } = body;
    const mail = dbMails.find(m => m.link.includes(token));
    if (!mail) {
      return jsonResponse({ error: "The verification link is invalid or has expired." }, 400);
    }

    const user = dbUsers.find(u => u.email.toLowerCase() === mail.email.toLowerCase());
    if (user) {
      user.emailVerified = true;
      saveMockData("igris_mock_users", dbUsers);
      
      const savedUser = localStorage.getItem("igris_user");
      if (savedUser) {
        const uObj = JSON.parse(savedUser);
        if (uObj.email.toLowerCase() === user.email.toLowerCase()) {
          uObj.emailVerified = true;
          localStorage.setItem("igris_user", JSON.stringify(uObj));
        }
      }
    }

    // Filter out used mail
    const updatedMails = dbMails.filter(m => !m.link.includes(token));
    saveMockData("igris_mock_mails", updatedMails);

    return jsonResponse({ success: true, message: "Your corporate credentials have been verified. Access to vault granted." });
  }

  // 8. Forgot Password Link
  if (path === "/api/auth/forgot-password" && method === "POST") {
    const { email } = body;
    const user = dbUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return jsonResponse({ error: "This email address is not registered." }, 404);
    }

    const resetToken = Math.random().toString(36).substr(2, 12);
    const resetUrl = `/reset-password?token=${resetToken}`;
    const newMail: MockMail = {
      id: Math.random().toString(36).substr(2, 9),
      email: user.email,
      subject: "Reset your IGRIS Client Key Passphrase",
      type: "reset",
      link: resetUrl,
      sentAt: new Date().toISOString()
    };

    dbMails.unshift(newMail);
    saveMockData("igris_mock_mails", dbMails);

    return jsonResponse({ success: true, message: "A secure password reset link has been dispatched to your corporate inbox." });
  }

  // 9. Reset Password Execution
  if (path === "/api/auth/reset-password" && method === "POST") {
    const { token, password } = body;
    const mail = dbMails.find(m => m.link.includes(token));
    if (!mail) {
      return jsonResponse({ error: "Passphrase key token is invalid or has already been consumed." }, 400);
    }

    const user = dbUsers.find(u => u.email.toLowerCase() === mail.email.toLowerCase());
    if (user) {
      user.passwordHash = password;
      saveMockData("igris_mock_users", dbUsers);
    }

    const updatedMails = dbMails.filter(m => !m.link.includes(token));
    saveMockData("igris_mock_mails", updatedMails);

    return jsonResponse({ success: true, message: "Your passphrase has been updated successfully. Please authenticate with your new key." });
  }

  // 10. Google OAuth Handshakes
  if (path === "/api/auth/google/url" && method === "GET") {
    return jsonResponse({ url: "/auth/google/sandbox", sandbox: true });
  }

  if (path === "/api/auth/google/sandbox-callback" && method === "GET") {
    const customName = url.searchParams.get("name") || "Google User";
    const customEmail = url.searchParams.get("email") || "google@company.com";
    const customAvatar = url.searchParams.get("avatar") || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop";

    let user = dbUsers.find(u => u.email.toLowerCase() === customEmail.toLowerCase());
    if (!user) {
      user = {
        id: `user-${Math.random().toString(36).substr(2, 9)}`,
        name: customName,
        company: "",
        phone: "",
        email: customEmail.toLowerCase(),
        passwordHash: "Password123",
        salt: "salt",
        emailVerified: true,
        avatarUrl: customAvatar,
        createdAt: new Date().toISOString()
      };
      dbUsers.push(user);
      saveMockData("igris_mock_users", dbUsers);
    }

    const sessionToken = `mock-session-${Math.random().toString(36).substr(2, 12)}`;
    localStorage.setItem("igris_session_token", sessionToken);
    localStorage.setItem("igris_user", JSON.stringify(user));

    return jsonResponse({ token: sessionToken, user });
  }

  // 11. Projects GET
  if (path === "/api/projects" && method === "GET") {
    return jsonResponse(dbProjects);
  }

  // 12. Project Requests GET
  if (path === "/api/project-requests" && method === "GET") {
    return jsonResponse(dbRequests);
  }

  // 13. Submit Project Request (Project Planner)
  if (path === "/api/project-requests" && method === "POST") {
    const proposal = getFallbackProposal(body.details, body.budget, body.timeline);
    const newRequest = {
      id: `req-${Math.random().toString(36).substr(2, 9)}`,
      ...body,
      status: "pending",
      submittedAt: new Date().toISOString(),
      proposal
    };

    dbRequests.unshift(newRequest);
    saveMockData("igris_mock_requests", dbRequests);

    return jsonResponse(newRequest, 201);
  }

  // 14. Action on Project Request (Approve/Reject)
  if (path.startsWith("/api/project-requests/") && path.endsWith("/action") && method === "POST") {
    const id = path.split("/")[3];
    const { action, notes } = body;

    const reqIdx = dbRequests.findIndex(r => r.id === id);
    if (reqIdx === -1) {
      return jsonResponse({ error: "Project request not found" }, 404);
    }

    const request = dbRequests[reqIdx];
    request.status = action;
    request.adminNotes = notes || "";

    if (action === "approved") {
      const proposal = request.proposal || getFallbackProposal(request.details, request.budget, request.timeline);
      
      const stages = proposal.milestones.map((m: any, idx: number) => ({
        id: String(idx + 1),
        title: m.title,
        status: idx === 0 ? "active" : "pending",
        date: idx === 0 ? "Ongoing" : `Target Week ${idx * 3 + 2}`,
        summary: `Deliverables: ${m.deliverables.join(", ")}. Focus: ${m.focus}`
      }));

      const newProject = {
        id: `proj-${Math.random().toString(36).substr(2, 9)}`,
        name: proposal.title || `Project ${request.businessName || request.fullName}`,
        client: request.fullName,
        status: "designing",
        progress: 10,
        nextMilestone: proposal.milestones[0]?.title || "Discovery & Solution Blueprint",
        activeBuildStatus: "passing",
        stages,
        cybersecurityScore: 97,
        activeCpuUsage: 14,
        activeRamUsage: 3.8,
        projectType: request.projectType,
        businessName: request.businessName,
        details: request.details,
        budget: request.budget,
        timeline: request.timeline,
        features: request.features,
        proposal,
        messages: [
          { sender: "ai", text: `Welcome to the secure project workspace for ${proposal.title}! Our team is currently preparing the discovery blueprints.`, time: "Just now" }
        ]
      };

      dbProjects.push(newProject);
      saveMockData("igris_mock_projects", dbProjects);
    }

    saveMockData("igris_mock_requests", dbRequests);
    return jsonResponse(request);
  }

  // 15. Trigger Build Simulation
  if (path.startsWith("/api/projects/") && path.endsWith("/build") && method === "POST") {
    const id = path.split("/")[3];
    const project = dbProjects.find(p => p.id === id);
    if (!project) {
      return jsonResponse({ error: "Project not found" }, 404);
    }

    if (project.progress < 100) {
      project.progress = Math.min(100, project.progress + 10);
    }

    if (project.progress >= 90) {
      project.status = "deployed";
    } else if (project.progress >= 70) {
      project.status = "hardening";
    } else if (project.progress >= 40) {
      project.status = "developing";
    }

    project.activeBuildStatus = "passing";
    saveMockData("igris_mock_projects", dbProjects);

    return jsonResponse({ success: true, progress: project.progress, status: project.status });
  }

  // 16. Chat Message Submission
  if (path.startsWith("/api/projects/") && path.endsWith("/message") && method === "POST") {
    const id = path.split("/")[3];
    const { text } = body;

    const project = dbProjects.find(p => p.id === id);
    if (!project) {
      return jsonResponse({ error: "Project not found" }, 404);
    }

    if (!project.messages) project.messages = [];
    project.messages.push({
      sender: "client",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    });

    // Simulate smart AI response based on message content
    const q = text.toLowerCase();
    let replyText = `I have logged your request. Our engineering team is reviewing your message: "${text}". We will respond with details shortly.`;

    if (q.includes("hi") || q.includes("hello")) {
      replyText = `Hello! I am your IGRIS designated solutions representative. How can I assist you with your active sprint or build logs today?`;
    } else if (q.includes("status") || q.includes("progress")) {
      replyText = `The project "${project.name}" is currently ${project.progress}% completed and is in the "${project.status}" phase. The next target milestone is "${project.nextMilestone}".`;
    } else if (q.includes("bug") || q.includes("issue") || q.includes("fail")) {
      replyText = `Thank you for reporting. I have opened an internal engineering priority ticket for investigation. Our DevOps standby lead is reviewing the active container status logs immediately.`;
    } else if (q.includes("invoice") || q.includes("payment") || q.includes("billing")) {
      replyText = `I have matched your query with our billing registry. Your project fee ledger is visible in the Invoices section of the client dashboard. Any pending balance can be settled securely via Card or Bank transfer.`;
    } else if (q.includes("deploy") || q.includes("live") || q.includes("staging")) {
      replyText = `Our deployment pipelines are active. The current staging branch is compiled under v0.9-rc with a passing state. You can check the hosting cluster logs and real-time DNS status directly in the Deployment pane.`;
    }

    project.messages.push({
      sender: "ai",
      text: replyText,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    });

    saveMockData("igris_mock_projects", dbProjects);
    return jsonResponse(project.messages);
  }

  // 17. Project AI Assistant (Grounding)
  if (path.startsWith("/api/projects/") && path.endsWith("/assistant") && method === "POST") {
    const id = path.split("/")[3];
    const { question } = body;

    const project = dbProjects.find(p => p.id === id);
    const projName = project ? project.name : "Active Project";
    
    let replyText = `Hello Michael. I have reviewed the active records for "${projName}". We are currently navigating the sprint (status: ${project ? project.status : 'in progress'}, ${project ? project.progress : 65}% complete) in accordance with our planned guidelines. Please refer to your interactive Timeline tab for a chronological audit trail.`;
    
    if (question) {
      const q = question.toLowerCase();
      if (q.includes("deployed") || q.includes("website live") || q.includes("production")) {
        if (id === "crypto-vault") {
          replyText = `Your website (Solana Liquid Asset Vault) was deployed successfully to the Production Mainnet with version 1.0.0 on June 30, 2026. Subsequently, a critical wallet protocol rollout (v1.2.4) was successfully deployed on July 8, 2026, maintaining nominal cluster health.`;
        } else {
          replyText = `The Hyperion Auditing Ledger is currently in its Backend Engineering sprint and has not yet been rolled out to production. It is, however, successfully running on our Staging Cluster since July 10, 2026 under build v0.9.0-rc3.`;
        }
      } else if (q.includes("backend") && q.includes("start")) {
        if (id === "hyperion-ledger" || id === "hyperion") {
          replyText = `Backend development for your Hyperion Auditing Ledger project started officially on June 26, 2026. Our engineers successfully completed the database schema and gRPC API gateway on July 1, 2026.`;
        } else if (id === "crypto-vault") {
          replyText = `Backend indexers and Solana connection handlers for the Solana Liquid Asset Vault started development on May 20, 2026.`;
        }
      } else if (q.includes("invoice") && (q.includes("paid") || q.includes("pay"))) {
        if (id === "hyperion-ledger" || id === "hyperion") {
          replyText = `Our ledgers confirm that your initial setup invoice #INV-2026-060 of $15,000 was successfully paid on June 18, 2026. Your Sprint 2 progress payment invoice #INV-2026-081 is currently pending approval.`;
        } else if (id === "crypto-vault") {
          replyText = `Your milestone progress invoice #INV-2026-074 of $22,000 was paid successfully on May 10, 2026.`;
        }
      } else if (q.includes("this week")) {
        if (id === "hyperion-ledger" || id === "hyperion") {
          replyText = `This week, we successfully compiled staging build v0.9.0-rc3 and deployed it to our staging AWS clusters on July 10, 2026. Following deployment, we initiated comprehensive penetration testing and static container analyses on July 11, 2026.`;
        } else {
          replyText = `This week, we launched the Global Logistics Gateway project request on July 10, 2026, officially initialized the repository on July 11, 2026, and entered the discovery/blueprinting sprint.`;
        }
      } else if (q.includes("month") || q.includes("summarize")) {
        replyText = `In July 2026, we achieved key benchmarks: on July 1, we finalized the Core API Gateway handlers and issued progress invoice #INV-2026-081. On July 5, staging cluster failovers were initialized, and on July 10, build v0.9.0-rc3 was successfully deployed. Testing commenced on July 11.`;
      }
    }

    return jsonResponse({ text: replyText });
  }

  // 18. File Upload
  if (path === "/api/upload-reference" && method === "POST") {
    return jsonResponse({
      success: true,
      url: `/uploads/mock-file-${Date.now()}.pdf`,
      filename: "architectural-spec.pdf"
    });
  }

  return jsonResponse({ error: "Mock route not found: " + path }, 404);
};

try {
  Object.defineProperty(window, "fetch", {
    value: mockFetch,
    writable: true,
    configurable: true,
    enumerable: true
  });
} catch (e) {
  console.warn("Could not override window.fetch with Object.defineProperty, attempting direct assignment:", e);
  try {
    (window as any).fetch = mockFetch;
  } catch (err2) {
    console.error("Critical: Could not overwrite window.fetch:", err2);
  }
}

try {
  Object.defineProperty(globalThis, "fetch", {
    value: mockFetch,
    writable: true,
    configurable: true,
    enumerable: true
  });
} catch (e) {
  // Ignore
}
