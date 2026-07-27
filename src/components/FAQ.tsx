import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: "Engagements & Cost",
    question: "How do you calculate scoping and project pricing?",
    answer: "Every proposal we generate is broken down to granular development, design, and integration cycles. We offer both structured fixed-scope packages (ideal for MVP and product launches with well-defined requirements) and dedicated sprint-retainer rates (perfect for evolving products with continuous iteration constraints)."
  },
  {
    category: "Engagements & Cost",
    question: "What is your typical project delivery timeline?",
    answer: "A standard web application or MVP usually takes 6 to 12 weeks from initial architectural scoper sign-off to production release. Large distributed system infrastructures or fully compliant healthcare directories with SOC2 bounds require 14 to 20 weeks."
  },
  {
    category: "Code Ownership & IP",
    question: "Do we retain absolute ownership over the custom code?",
    answer: "Absolutely. Upon completion and payment of any project phase, 100% of the intellectual property (IP), source code files, design assets, and container images are fully transferred to your corporation. We do not charge ongoing royalty fees or enforce proprietary licensing constraints."
  },
  {
    category: "Infrastructure & SLAs",
    question: "Who manages the cloud hosting and deployment charges?",
    answer: "Your custom infrastructure is built using declarative infrastructure code (Terraform/Kubernetes) and mapped to cloud environments owned directly by your firm. You manage the underlying hosting fees directly with providers (Google Cloud, AWS, etc.). We configure cost-effective scaling boundaries so you don't overpay."
  },
  {
    category: "Updates & Support",
    question: "What is your policy regarding project updates and revisions?",
    answer: "During active development, we support fluid scope revisions handled through our AI Planner or weekly architectural alignment syncs. Post-launch, each deployment is backed by a 30-day comprehensive structural guarantee block covering unexpected error patches and minor performance calibrations at zero additional cost."
  },
  {
    category: "Updates & Support",
    question: "Do you offer ongoing server maintenance and security support?",
    answer: "Yes, we offer monthly Technical Operations retainers. These SLA packages guarantee 24/7 proactive system telemetry monitoring, ongoing server framework updates, database indexing calibrations, security penetration tests, and immediate priority support response windows."
  },
  {
    category: "Discovery Phase",
    question: "How can we begin a discovery consultation?",
    answer: "Simply submit your primary parameters through our interactive AI Planner or contact form below. Our architectural group will analyze the profile and coordinate a discovery call within 24 business hours to map out your software scope."
  }
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFAQ = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="relative py-24 px-6 max-w-5xl mx-auto z-10 border-t border-white/5 scroll-mt-24">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-950/5 blur-[120px] pointer-events-none" />

      {/* Header */}
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
          <span>Knowledge Base</span>
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight mb-3">
          Frequently Answered
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base font-sans">
          Have questions about pricing models, technology governance, or code handoffs? Consult our official operational terms below.
        </p>
      </motion.div>

      {/* Accordion Stack */}
      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;

          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: idx * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`bg-[#0A0A0A] border rounded-2xl transition-all overflow-hidden ${
                isOpen ? "border-emerald-500/30 bg-[#050505] shadow-[0_0_20px_rgba(16,185,129,0.1)]" : "border-white/5 hover:border-white/10"
              }`}
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
              >
                <div>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-500 block mb-1">
                    {faq.category}
                  </span>
                  <h4 className="font-display font-bold text-sm sm:text-base text-white">
                    {faq.question}
                  </h4>
                </div>
                <div className={`p-1.5 rounded-lg border transition-colors ${
                  isOpen ? "bg-white text-black border-white" : "bg-[#050505] border-white/5 text-zinc-400"
                }`}>
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-white/5 bg-[#050505]/40 text-zinc-400 text-xs sm:text-sm font-sans leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
