import { useState } from "react";
import { motion } from "motion/react";
import { FileText, Users, Briefcase, Code, CheckSquare, Rocket, HeartHandshake } from "lucide-react";

interface ProcessStep {
  id: number;
  title: string;
  icon: any;
  desc: string;
  milestone: string;
}

const steps: ProcessStep[] = [
  {
    id: 1,
    title: "Project Request",
    icon: FileText,
    desc: "Submit your system parameters via our secure Planner tool or direct inquiry channel to declare architectural requirements.",
    milestone: "Formulation of initial scope parameters"
  },
  {
    id: 2,
    title: "Consultation",
    icon: Users,
    desc: "Join our Principal Architects on an immersive deep-dive discovery session to align technical dependencies and constraints.",
    milestone: "Technical boundary consensus"
  },
  {
    id: 3,
    title: "Proposal & Quote",
    icon: Briefcase,
    desc: "We deliver a comprehensive high-fidelity interactive scoping proposal highlighting exact tech choices, milestones, and costs.",
    milestone: "Binding agreement and SLA locks"
  },
  {
    id: 4,
    title: "Development",
    icon: Code,
    desc: "Our senior software group builds deterministic, modular code. You inspect deployment pipelines in real-time.",
    milestone: "Milestone-driven code delivery"
  },
  {
    id: 5,
    title: "Testing",
    icon: CheckSquare,
    desc: "Rigorous automation layers, fuzz testing, memory leak audits, and third-party security pen-testing validate the system.",
    milestone: "Full certification and audit signoff"
  },
  {
    id: 6,
    title: "Launch",
    icon: Rocket,
    desc: "Zero-downtime Blue/Green container deployment orchestration maps code to scalable edge Cloud Run clusters.",
    milestone: "Production deployment live"
  },
  {
    id: 7,
    title: "Ongoing Support",
    icon: HeartHandshake,
    desc: "Continuous proactive vulnerability scanning, performance optimizations, and priority SLAs keep your platforms resilient.",
    milestone: "24/7 technical operations coverage"
  }
];

export default function OurProcess() {
  const [activeStep, setActiveStep] = useState<number>(1);

  return (
    <section id="process" className="relative py-24 px-6 max-w-7xl mx-auto z-10 border-t border-white/5 scroll-mt-24">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-emerald-950/5 blur-[100px] pointer-events-none" />

      {/* Header text */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[10px] uppercase tracking-[0.2em] font-bold mb-4 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Delivery Lifecycle</span>
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight mb-3">
          Our Engineering Process
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base font-sans">
          From first request to global live operations, we engineer custom solutions with extreme transparency and predictable outcomes.
        </p>
      </motion.div>

      {/* Horizontal Timeline Layout (Desktop & Tablet) */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:block relative mb-12"
      >
        {/* Progress Line Bar */}
        <div className="absolute top-[28px] left-[5%] right-[5%] h-0.5 bg-white/5 z-0">
          <motion.div 
            initial={{ width: "0%" }}
            whileInView={{ width: `${((activeStep - 1) / (steps.length - 1)) * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 shadow-[0_0_10px_rgba(16,185,129,0.8)]"
          />
        </div>

        <div className="grid grid-cols-7 gap-4 relative z-10">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            const isCompleted = step.id < activeStep;
            const isActive = step.id === activeStep;

            return (
              <motion.div 
                key={step.id} 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="text-center group"
              >
                <button
                  onClick={() => setActiveStep(step.id)}
                  className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-300 mx-auto cursor-pointer ${
                    isActive
                      ? "bg-white border-white text-black scale-110 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                      : isCompleted
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                      : "bg-[#050505] border-white/5 text-zinc-500 hover:border-white/15 hover:text-white"
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                </button>
                <div className="mt-4">
                  <h4 className={`font-display text-xs font-bold uppercase tracking-wider ${isActive ? "text-white" : "text-zinc-500"}`}>
                    0{step.id}. {step.title.split(" ")[0]}
                  </h4>
                  <p className="text-[10px] font-mono text-zinc-600 mt-1 truncate max-w-[120px] mx-auto">
                    {step.title}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Active Step Detailed Showcase Grid */}
      <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-emerald-500/[0.01] rounded-full pointer-events-none" />
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Column: Icon & ID */}
          <div className="md:col-span-4 flex flex-row md:flex-col items-center justify-start md:justify-center text-center md:border-r border-white/5 md:pr-8 gap-4 md:gap-0">
            <span className="font-display font-extrabold text-6xl sm:text-7xl lg:text-8px text-zinc-800 tracking-tighter">
              0{steps[activeStep - 1].id}
            </span>
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center text-emerald-400 mt-2">
              {(() => {
                const ActiveIcon = steps[activeStep - 1].icon;
                return <ActiveIcon className="w-8 h-8" />;
              })()}
            </div>
            <h3 className="font-display font-bold text-lg text-white mt-4 hidden md:block">
              {steps[activeStep - 1].title}
            </h3>
          </div>

          {/* Right Column: Title, Description, and Milestone parameters */}
          <div className="md:col-span-8 flex flex-col justify-between h-full space-y-6">
            <div>
              <h3 className="font-display font-bold text-2xl text-white mb-3 md:hidden">
                {steps[activeStep - 1].title}
              </h3>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-sans">
                {steps[activeStep - 1].desc}
              </p>
            </div>

            <div className="bg-[#050505] border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-0.5">EXPECTED OUTCOME</span>
                <span className="text-xs font-sans text-white font-medium">{steps[activeStep - 1].milestone}</span>
              </div>
              <button
                onClick={() => {
                  const nextIdx = activeStep < steps.length ? activeStep + 1 : 1;
                  setActiveStep(nextIdx);
                }}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-xs font-bold text-white rounded-lg border border-white/5 transition-all self-start sm:self-auto uppercase tracking-tighter"
              >
                Next Phase
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Stacked Interactive Stepper */}
      <div className="lg:hidden grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => setActiveStep(step.id)}
            className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
              activeStep === step.id
                ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400"
                : "bg-[#0A0A0A] border-white/5 text-zinc-500"
            }`}
          >
            <span className="font-mono text-[10px] block text-zinc-600 mb-1">STEP 0{step.id}</span>
            <span className="text-xs font-bold block truncate">{step.title}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
