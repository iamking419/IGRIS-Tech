import { motion } from "motion/react";
import { 
  Shield, 
  Sparkles, 
  Zap, 
  Eye, 
  LifeBuoy, 
  TrendingUp, 
  Rocket, 
  Target, 
  Compass, 
  CheckCircle2, 
  Code2, 
  Terminal, 
  Cpu, 
  Layers, 
  Server, 
  GitBranch, 
  Globe, 
  Container, 
  Database, 
  ArrowRight 
} from "lucide-react";

interface Benefit {
  title: string;
  desc: string;
  icon: any;
  metric: string;
}

const benefits: Benefit[] = [
  {
    title: "Quality Without Compromise",
    desc: "Every project is carefully planned, tested and refined before delivery.",
    icon: Sparkles,
    metric: "Code Quality Standards"
  },
  {
    title: "Security by Design",
    desc: "We build with secure authentication, reliable infrastructure and industry best practices from day one.",
    icon: Shield,
    metric: "Secure Development"
  },
  {
    title: "Fast Delivery",
    desc: "Efficient workflows and clear milestones help us deliver projects on schedule.",
    icon: Zap,
    metric: "On-Time Delivery"
  },
  {
    title: "Transparent Communication",
    desc: "You'll always know what we're working on through your client dashboard and regular project updates.",
    icon: Eye,
    metric: "Real-Time Progress"
  },
  {
    title: "Dedicated Support",
    desc: "We remain available after launch for maintenance, updates and future improvements.",
    icon: LifeBuoy,
    metric: "Long-Term Partnership"
  },
  {
    title: "Built to Scale",
    desc: "Whether you're launching your first website or a growing platform, we build with future expansion in mind.",
    icon: TrendingUp,
    metric: "Growth Ready"
  }
];

const workflowSteps = [
  { step: "01", name: "Discovery", desc: "Understanding your goals, target audience, and business requirements." },
  { step: "02", name: "Planning", desc: "Mapping system architecture, technology stack, and milestone schedules." },
  { step: "03", name: "Design", desc: "Crafting intuitive user interfaces, wireframes, and design systems." },
  { step: "04", name: "Development", desc: "Writing clean, efficient, and robust production-ready code." },
  { step: "05", name: "Testing", desc: "Rigorous quality assurance, security checks, and cross-device testing." },
  { step: "06", name: "Deployment & Support", desc: "Smooth production release and continuous long-term support." }
];

const techStack = [
  { name: "Python", category: "Language", icon: Code2 },
  { name: "FastAPI", category: "Backend Framework", icon: Server },
  { name: "React", category: "Frontend Library", icon: Code2 },
  { name: "Docker", category: "Containerization", icon: Container },
  { name: "PostgreSQL", category: "Relational DB", icon: Database },
  { name: "Linux", category: "Operating System", icon: Terminal },
  { name: "Git", category: "Version Control", icon: GitBranch },
  { name: "Flask", category: "Web Framework", icon: Server },
  { name: "Tailwind CSS", category: "Styling Framework", icon: Layers },
  { name: "Node.js", category: "Runtime Environment", icon: Cpu },
  { name: "TypeScript", category: "Typed Language", icon: Code2 },
  { name: "Cloudflare", category: "CDN & Edge Security", icon: Globe }
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="relative py-24 px-6 max-w-7xl mx-auto z-10 border-t border-white/5 scroll-mt-24 space-y-28">
      <div className="absolute bottom-0 right-[10%] w-[350px] h-[350px] bg-emerald-500/5 blur-[120px] pointer-events-none" />

      {/* ----------------------------------------------------------------- */}
      {/* 1. HERO & BENEFITS BENTO GRID */}
      {/* ----------------------------------------------------------------- */}
      <div className="space-y-16">
        {/* Header and intro */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[10px] uppercase tracking-[0.2em] font-bold mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Why Choose Us</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              Why Businesses <br />Choose IGRIS Tech
            </h2>
          </div>
          <p className="text-zinc-400 text-sm sm:text-base font-sans max-w-md leading-relaxed">
            We partner with businesses to design, build, deploy and maintain reliable software. Our goal isn&apos;t just to launch projects—it&apos;s to help them grow over time.
          </p>
        </div>

        {/* Benefits Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, idx) => {
            const IconComponent = benefit.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
                className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-emerald-500/20 transition-all group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/5 border border-emerald-500/15 flex items-center justify-center text-emerald-400 mb-6 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-all">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <h3 className="font-display font-bold text-base text-white mb-2">
                    {benefit.title}
                  </h3>

                  <p className="text-zinc-400 text-xs sm:text-sm font-sans leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-4 mt-6 flex items-center justify-between font-mono text-[9px] text-zinc-500 uppercase tracking-wider">
                  <span>BENCHMARK</span>
                  <span className="text-emerald-400 font-semibold">{benefit.metric}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* 2. OUR STORY SECTION */}
      {/* ----------------------------------------------------------------- */}
      <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 sm:p-12 relative overflow-hidden backdrop-blur-xl">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-widest">
            <Rocket className="w-3.5 h-3.5" />
            <span>Our Story</span>
          </div>

          <h2 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight">
            Building Meaningful Digital Products That Scale
          </h2>

          <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed font-sans">
            <p>
              IGRIS Tech was founded with a singular purpose: to bridge the gap between high-level software engineering and real business goals. We recognized that too many organizations struggle with fragmented technical partners, hidden costs, and software that degrades over time.
            </p>
            <p>
              From day one, we set out to build a modern technical consultancy focused on clarity, performance, and long-term partnership. Whether collaborating with startups launching their first digital product or established enterprises scaling complex systems, our approach remains grounded in precision craftsmanship and reliable execution.
            </p>
            <p>
              Today, IGRIS Tech continues to empower businesses across industries with clean code, secure architectures, and continuous technical stewardship—ensuring every product we deliver creates lasting value.
            </p>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* 3. MISSION & VISION SECTION */}
      {/* ----------------------------------------------------------------- */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
            Our Core Purpose
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-mono mt-1">
            Driven by engineering excellence and client success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 backdrop-blur-xl flex flex-col justify-between space-y-6 hover:border-emerald-500/30 transition-all group"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-white">Our Mission</h3>
              <p className="text-zinc-300 text-sm leading-relaxed font-sans">
                To empower businesses by delivering robust, scalable, and beautifully engineered software solutions with complete transparency, on-time execution, and unwavering technical quality.
              </p>
            </div>
            <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Purpose-Driven Engineering</span>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 backdrop-blur-xl flex flex-col justify-between space-y-6 hover:border-emerald-500/30 transition-all group"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-white">Our Vision</h3>
              <p className="text-zinc-300 text-sm leading-relaxed font-sans">
                To be the world&apos;s most trusted technical partner for ambitious companies, setting the global benchmark for developer efficiency, software reliability, and client collaboration.
              </p>
            </div>
            <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Long-Term Technical Stewardship</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* 4. HOW WE WORK (SIX-STEP WORKFLOW) */}
      {/* ----------------------------------------------------------------- */}
      <div className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-widest">
            <span>⚙️ Structured Execution</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight">
            How We Work
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm font-mono">
            A proven six-step roadmap from initial concept to long-term scale
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflowSteps.map((stepItem, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 relative flex flex-col justify-between hover:border-emerald-500/30 transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs text-emerald-400 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    STEP {stepItem.step}
                  </span>
                  {idx < workflowSteps.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-zinc-600 hidden lg:block group-hover:text-emerald-400 transition-colors" />
                  )}
                </div>

                <h3 className="font-display font-bold text-lg text-white">
                  {stepItem.name}
                </h3>

                <p className="text-zinc-400 text-xs sm:text-sm font-sans leading-relaxed">
                  {stepItem.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* 5. TECHNOLOGIES WE USE GRID */}
      {/* ----------------------------------------------------------------- */}
      <div className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-widest">
            <span>🛠 Stack & Infrastructure</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight">
            Technologies We Use
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm font-mono">
            Modern, tested toolchains built for performance, security, and developer velocity
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {techStack.map((tech, idx) => {
            const IconComp = tech.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.03 }}
                className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-4 flex items-center gap-3.5 hover:border-emerald-500/40 hover:bg-white/[0.02] transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-all shrink-0">
                  <IconComp className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <h4 className="font-display font-bold text-sm text-white truncate">
                    {tech.name}
                  </h4>
                  <p className="font-mono text-[10px] text-zinc-500 truncate">
                    {tech.category}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

    </section>
  );
}

