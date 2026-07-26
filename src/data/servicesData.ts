import { ServiceDetail } from "../types";

export const servicesData: ServiceDetail[] = [
  {
    id: "custom-software",
    title: "Custom Software Development",
    iconName: "Cpu",
    shortDesc: "Engineered specifically for complex business parameters, with deterministic runtime characteristics.",
    longDesc: "We design and build proprietary software architectures tailored to your operational bottlenecks. Our systems emphasize high-performance memory management, strict type enforcement, and low CPU cycles to deliver reliable tools that endure scaling challenges.",
    capabilities: [
      "Domain-Driven Architecture",
      "Event-Sourced Systems",
      "Custom Compiled Integrations",
      "Proprietary Business Logic Automation"
    ],
    techUsed: ["Rust", "TypeScript", "Go", "C++", "Docker"]
  },
  {
    id: "web-apps",
    title: "Enterprise Web Applications",
    iconName: "Globe",
    shortDesc: "World-class frontend execution paired with reactive data sync engines and micro-second load speeds.",
    longDesc: "We create fluid, high-performance web applications that blur the line between native client software and browser sandboxes. Every interface is crafted with precision animations, localized state layers, and advanced caching for instantaneous response times.",
    capabilities: [
      "SSR & Incremental Static Regeneration",
      "Dynamic Key-Value State Sync",
      "Optimistic UI Updates",
      "Offline-first Capability Modules"
    ],
    techUsed: ["React 19", "Next.js", "Tailwind CSS v4", "GraphQL", "WebSockets"]
  },
  {
    id: "ai-solutions",
    title: "AI Integration & LLM Systems",
    iconName: "BrainCircuit",
    shortDesc: "Deterministic integration of Large Language Models, generative AI pipelines, and smart automation workflows.",
    longDesc: "We bridge standard software systems with advanced generative AI. Our focus is on high-efficiency Retrieval-Augmented Generation (RAG) pipelines, semantic search engines, structured JSON output parsers, and custom AI agents that automate complex workflows with strict safety constraints.",
    capabilities: [
      "Custom Agent Orchestration",
      "High-Efficiency Vector Grounding",
      "Structured Output Formatting",
      "Dynamic Fine-Tuning Pipelines"
    ],
    techUsed: ["Gemini Pro", "@google/genai", "LangChain", "PgVector", "Python"]
  },
  {
    id: "backend-engineering",
    title: "Heavy-Duty Backend Engineering",
    iconName: "Layers",
    shortDesc: "High-throughput asynchronous servers, transaction integrity engines, and distributed queue setups.",
    longDesc: "The core engine of your operation. We build server architectures capable of managing tens of thousands of concurrent read/write connections with zero performance degradation, full relational isolation, and highly optimized network request payloads.",
    capabilities: [
      "Highly Isolated REST & gRPC APIs",
      "Distributed Transaction Managers",
      "High-Throughput Message Queues",
      "Microservice Boundary Engineering"
    ],
    techUsed: ["Go", "Node.js (TypeScript)", "PostgreSQL", "Apache Kafka", "Redis"]
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Consulting & Audits",
    iconName: "ShieldAlert",
    shortDesc: "Zero-trust network blueprints, continuous threat simulation, and automated vulnerability detection.",
    longDesc: "We construct secure digital perimeters around your proprietary code and transactional data. Our consulting ranges from initial codebase vulnerability audits and deep-pen testing to configuring robust cryptographic access rules.",
    capabilities: [
      "Zero-Trust Architecture Setup",
      "Penetration Testing & Auditing",
      "Cryptographic Access Management",
      "Automated Attack Vector Simulations"
    ],
    techUsed: ["Wireshark", "OWASP ZAP", "HashiCorp Vault", "JWT / OAuth2", "Google IAM"]
  },
  {
    id: "cloud-infrastructure",
    title: "Cloud Infrastructure & Platform Ops",
    iconName: "Cloud",
    shortDesc: "Declarative server systems, automatic multi-region deployment layers, and zero-downtime CI/CD pipelines.",
    longDesc: "We design highly-resilient, auto-scaling cloud landscapes. By managing infrastructure purely as declarative code, we establish highly reproducible staging and production nodes that failover automatically without data loss.",
    capabilities: [
      "Declarative Infrastructure (IaC)",
      "Zero-Downtime Multi-Region Deployments",
      "Auto-Scaling Container Ecosystems",
      "Proactive Metric Aggregators"
    ],
    techUsed: ["Kubernetes", "Terraform", "Google Cloud Platform", "AWS", "GitHub Actions"]
  }
];
