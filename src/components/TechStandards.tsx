import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Network, 
  ShieldCheck, 
  Zap, 
  Database, 
  Server, 
  Cpu, 
  Lock, 
  Search, 
  ArrowRight,
  Fingerprint,
  RefreshCw,
  Clock,
  Code
} from "lucide-react";

interface ArchitecturePreset {
  id: string;
  name: string;
  shortDesc: string;
  loadTime: string;
  securityRating: string;
  nodes: { label: string; role: string; icon: any }[];
  pipeline: string[];
}

export default function TechStandards() {
  const [activeArch, setActiveArch] = useState<string>("global-edge");
  const [defenseActive, setDefenseActive] = useState(false);
  const [handshakeStep, setHandshakeStep] = useState(0);
  const [checksumLogs, setChecksumLogs] = useState<string[]>([]);

  const architectures: ArchitecturePreset[] = [
    {
      id: "global-edge",
      name: "Global Edge Multi-Tenant Pipeline",
      shortDesc: "Optimized for sub-20ms dynamic content deliveries with persistent active replicas.",
      loadTime: "14ms Avg Edge Time",
      securityRating: "SOC2 Type II compliant",
      nodes: [
        { label: "Edge Gateway", role: "Vercel / Cloudflare CDN", icon: Zap },
        { label: "Serverless Container", role: "GCP Cloud Run (0.0.0.0:3000)", icon: Cpu },
        { label: "State Layer", role: "PostgreSQL Database Cache", icon: Database },
      ],
      pipeline: [
        "Client handshakes are terminated at closest geography edge Node.",
        "Serverless container triggers dynamic routing and renders pages instantly with lightweight TS models.",
        "PostgreSQL state sync is cached in global Redis nodes to avoid database over-queries."
      ]
    },
    {
      id: "cognitive-rag",
      name: "Enterprise AI & RAG Architecture",
      shortDesc: "Secure, non-leaking large model vector retrieval matched with strict semantic filters.",
      loadTime: "180ms Token-to-First-Byte",
      securityRating: "ISO-27001 compliant",
      nodes: [
        { label: "Semantic Guard", role: "Token Scanner & Firewall", icon: Lock },
        { label: "Vector Indexer", role: "PgVector Schema Replica", icon: Database },
        { label: "AI Core Engine", role: "Gemini Pro Server-Side", icon: Cpu },
      ],
      pipeline: [
        "Client queries are thoroughly sanitized to prevent vector injection or prompt hijacking threats.",
        "Nearest matching semantics are queried from PgVector context registries.",
        "Structured outputs are compiled securely and returned via encrypted API layers."
      ]
    },
    {
      id: "zero-trust",
      name: "Zero-Trust Relational Financial Ledger",
      shortDesc: "All transaction mutations require cryptographic validation and full cryptographic isolate blocks.",
      loadTime: "99.999% Database isolation",
      securityRating: "HIPAA & PCI-DSS Secure",
      nodes: [
        { label: "Identity Vault", role: "OAuth2 cryptographically rotated keys", icon: Fingerprint },
        { label: "Transactional Broker", role: "Go engine with strict isolated mutex", icon: Server },
        { label: "Immutable Ledger", role: "Postgres append-only log replicas", icon: Database },
      ],
      pipeline: [
        "Every operation validates against OAuth2 JSON Web Tokens with rolling encryption handshakes.",
        "Transactional broker wraps mutations in high-isolation multi-stage database locks.",
        "Full audit trails are encrypted with AES-256 and pushed to offline secure storage vaults."
      ]
    }
  ];

  const currentArch = architectures.find(a => a.id === activeArch) || architectures[0];

  const triggerSecuritySandbox = () => {
    if (defenseActive) return;
    setDefenseActive(true);
    setHandshakeStep(0);
    setChecksumLogs([]);

    const defenseLogs = [
      "► [SEC_AUDIT] Auditing port bindings for open ingress leaks...",
      "► [SANDBOX] Injecting simulated SQLi string: UNION SELECT username, password...",
      "► [WAF] SQLi detected on parameter :query. Mitigating immediately.",
      "✔ [WAF] Status: BLOCKED. IP logged and added to Cloud Armor firewall.",
      "► [SANDBOX] Injecting simulated CSS/XSS threat vector script tags...",
      "✔ [SANITIZER] Threat neutralized. Refactoring HTML input bindings.",
      "► [SEC_AUDIT] Simulating DDoS packet floods of 50,000 req/sec...",
      "✔ [RATE_LIMITER] Active throttling engaged. Main core server CPU remained < 20% Nominal.",
      "✔ [SEC_AUDIT] Sandbox Complete: 0 vulnerabilities found. Compliance standard remains: EXCELLENT."
    ];

    let logIdx = 0;
    const interval = setInterval(() => {
      if (logIdx < defenseLogs.length) {
        const logToAppend = defenseLogs[logIdx];
        setChecksumLogs((prev) => [...prev, logToAppend]);
        setHandshakeStep(logIdx + 1);
        logIdx++;
      } else {
        clearInterval(interval);
        setDefenseActive(false);
      }
    }, 700);
  };

  return (
    <section id="stack" className="relative py-24 px-6 max-w-7xl mx-auto z-10 border-t border-white/5 scroll-mt-24">
      <div className="absolute bottom-0 right-[10%] w-[350px] h-[350px] bg-emerald-500/5 blur-[100px] pointer-events-none" />

      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[10px] uppercase tracking-[0.2em] font-bold mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Engineering Principles</span>
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight mb-3">
          Architecture & Defense Sandboxes
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base font-sans">
          We construct our platforms on robust principles of isolated execution, high-concurrency routing, and absolute zero-trust cybersecurity standards.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        {/* Left Interactive Panel: Architecture Switcher (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between glass-panel border border-white/5 rounded-2xl p-6 sm:p-8">
          <div>
            <div className="flex flex-wrap gap-2 mb-8">
              {architectures.map((arch) => (
                <button
                  key={arch.id}
                  onClick={() => setActiveArch(arch.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all border cursor-pointer ${
                    activeArch === arch.id
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                      : "bg-transparent border-white/5 text-zinc-500 hover:text-white"
                  }`}
                >
                  {arch.name.split(" ")[1] || arch.name}
                </button>
              ))}
            </div>

            <h3 className="font-display font-bold text-xl text-white mb-2">
              {currentArch.name}
            </h3>
            <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
              {currentArch.shortDesc}
            </p>

            {/* Simulated Node Diagram Visualizer */}
            <div className="grid grid-cols-3 gap-3 relative mb-8">
              {/* Connecting arrow line on diagram */}
              <div className="absolute top-[28px] left-10 right-10 h-0.5 bg-gradient-to-r from-emerald-500/10 via-emerald-500/30 to-emerald-500/10" />
              
              {currentArch.nodes.map((node, nIdx) => {
                const NodeIcon = node.icon;
                return (
                  <div key={nIdx} className="relative z-10 bg-[#0A0A0A] border border-white/5 rounded-xl p-4 text-center group hover:border-emerald-500/30 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                      <NodeIcon className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-semibold text-white font-display truncate">{node.label}</div>
                    <div className="text-[10px] text-zinc-500 font-mono mt-0.5 truncate">{node.role}</div>
                  </div>
                );
              })}
            </div>

            {/* Pipeline description text details */}
            <div className="space-y-3">
              {currentArch.pipeline.map((p, pIdx) => (
                <div key={pIdx} className="flex items-start space-x-3 text-xs leading-relaxed text-zinc-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                  <p>{p}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/5 pt-5 mt-6 text-xs text-zinc-500 font-mono">
            <span className="flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>{currentArch.loadTime}</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{currentArch.securityRating}</span>
            </span>
          </div>
        </div>

        {/* Right Interactive Panel: Cyber Threat sandbox (5 cols) */}
        <div id="security" className="lg:col-span-5 flex flex-col justify-between glass-panel border border-white/5 rounded-2xl p-6 sm:p-8 scroll-mt-24">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-base text-white">Cybersecurity Threat Sandbox</h4>
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Penetration Audit simulation</p>
              </div>
            </div>

            <p className="text-zinc-400 text-xs leading-relaxed mb-6">
              Our products undergo continuous, proactive penetration testing. Use our Defense Simulator to verify how IGRIS handles real-time application attacks.
            </p>

            {/* Terminal sandbox */}
            <div className="bg-[#050505] border border-white/5 rounded-xl p-4 font-mono text-[10px] leading-relaxed min-h-[180px] max-h-[180px] overflow-y-auto text-zinc-300 mb-6 scrollbar-none">
              {checksumLogs.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-zinc-600 space-y-2 py-4">
                  <Fingerprint className="w-8 h-8 text-rose-400/20" />
                  <p>Cybersecurity sandbox idle. Press "Initiate Threat Audit" below to trigger threat response analysis.</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {checksumLogs.map((log, idx) => (
                    <div 
                      key={idx} 
                      className={log && log.startsWith("✔") ? "text-emerald-400 font-semibold" : log && log.startsWith("► [SANDBOX]") ? "text-rose-400" : "text-zinc-400"}
                    >
                      {log}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={triggerSecuritySandbox}
            disabled={defenseActive}
            className={`w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-full text-xs font-bold transition-all uppercase tracking-tighter cursor-pointer ${
              defenseActive
                ? "bg-rose-500/10 border border-rose-500/30 text-rose-400"
                : "bg-white text-black hover:bg-emerald-400 hover:text-black shadow-[0_0_15px_rgba(16,185,129,0.15)]"
            }`}
          >
            {defenseActive ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Simulating Attack vectors...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Initiate Threat Audit</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
