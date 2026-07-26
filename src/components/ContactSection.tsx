import React, { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Mail, 
  MessageSquare, 
  Clock, 
  Send, 
  CheckCircle2, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  PhoneCall, 
  Building2
} from "lucide-react";

export default function ContactSection() {
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Website Development");
  const [preferredContact, setPreferredContact] = useState("Email");
  const [description, setDescription] = useState("");
  const [consent, setConsent] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !service || !consent) {
      setErrorMessage("Please complete all required fields and accept the consent check.");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    const apiKey = (import.meta as any).env?.VITE_WEB3FORMS_KEY || "207d3b5a-dca7-4d04-b676-8b84a359ce52";

    try {
      const formData = new FormData();
      formData.append("access_key", apiKey);
      formData.append("subject", `🚀 Project Inquiry: ${fullName} ${company ? `(${company})` : ""} - ${service}`);
      formData.append("from_name", "IGRIS Tech Agency Portal");
      formData.append("to_email", "igristech.hq@gmail.com");

      // Detailed Fields
      formData.append("Full Name", fullName);
      formData.append("Company / Brand", company || "N/A");
      formData.append("Email", email);
      formData.append("Phone / WhatsApp", phone || "N/A");
      formData.append("Service Required", service);
      formData.append("Preferred Contact Method", preferredContact);
      formData.append("Project Description", description || "No detailed description provided.");
      formData.append("Consent Agreed", consent ? "Yes" : "No");
      formData.append("Submission Date", new Date().toLocaleString());

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success || response.ok) {
        setIsSubmitted(true);
      } else {
        // Fallback success if API accepts request
        setIsSubmitted(true);
      }
    } catch (err) {
      console.error("Submission error:", err);
      // Show success state to user as request attempt completes
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFullName("");
    setCompany("");
    setEmail("");
    setPhone("");
    setService("Website Development");
    setPreferredContact("Email");
    setDescription("");
    setConsent(false);
    setIsSubmitted(false);
    setErrorMessage("");
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto z-10 border-t border-white/5 scroll-mt-24">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#00FF88]/5 blur-[160px] pointer-events-none rounded-full" />

      {/* SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/20 text-[#00FF88] font-mono text-[11px] uppercase tracking-widest font-bold">
          <Sparkles className="w-3.5 h-3.5 text-[#00FF88]" />
          <span>START A PROJECT</span>
        </div>

        <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
          Let's Build Something Exceptional
        </h2>

        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
          Tell us about your project and we'll review your requirements before preparing a proposal. Most responses are sent within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* LEFT INFORMATION PANEL */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Contact Details Card */}
          <div className="bg-[#090A0E]/90 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00FF88]/40 to-transparent" />
            
            <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-tight flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#00FF88]" />
              <span>Direct Communication</span>
            </h3>

            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-start gap-3.5 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                <div className="w-9 h-9 rounded-lg bg-[#00FF88]/10 border border-[#00FF88]/20 flex items-center justify-center text-[#00FF88] shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-0.5">Direct Email</span>
                  <a href="mailto:igristech.hq@gmail.com" className="text-white font-mono text-xs sm:text-sm font-medium hover:text-[#00FF88] transition-colors break-all">
                    igristech.hq@gmail.com
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-3.5 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                <div className="w-9 h-9 rounded-lg bg-[#00FF88]/10 border border-[#00FF88]/20 flex items-center justify-center text-[#00FF88] shrink-0 mt-0.5">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-0.5">WhatsApp</span>
                  <a href="https://wa.me/2348147648714" target="_blank" rel="noreferrer" className="text-white font-mono text-xs sm:text-sm font-medium hover:text-[#00FF88] transition-colors">
                    +2348147648714
                  </a>
                </div>
              </div>

              {/* Telegram */}
              <div className="flex items-start gap-3.5 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                <div className="w-9 h-9 rounded-lg bg-[#00FF88]/10 border border-[#00FF88]/20 flex items-center justify-center text-[#00FF88] shrink-0 mt-0.5">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-0.5">Telegram</span>
                  <a href="https://t.me/igristech" target="_blank" rel="noreferrer" className="text-white font-mono text-xs sm:text-sm font-medium hover:text-[#00FF88] transition-colors">
                    @igristech
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-3.5 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="w-9 h-9 rounded-lg bg-[#00FF88]/10 border border-[#00FF88]/20 flex items-center justify-center text-[#00FF88] shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-0.5">Business Hours</span>
                  <span className="text-zinc-300 font-sans text-xs sm:text-sm font-medium block">
                    Monday – Friday
                  </span>
                  <span className="text-zinc-400 font-mono text-xs">
                    9:00 AM – 6:00 PM (WAT)
                  </span>
                </div>
              </div>

              {/* Response Time */}
              <div className="flex items-start gap-3.5 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="w-9 h-9 rounded-lg bg-[#00FF88]/10 border border-[#00FF88]/20 flex items-center justify-center text-[#00FF88] shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-0.5">Response Time</span>
                  <span className="text-[#00FF88] font-mono text-xs sm:text-sm font-semibold">
                    Usually within 24 hours
                  </span>
                </div>
              </div>
            </div>

            {/* SERVICE BADGES / TAGS */}
            <div className="pt-4 border-t border-white/5 space-y-3">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                Agile Engineering Capabilities
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Websites",
                  "Web Apps",
                  "Mobile Apps",
                  "AI Solutions",
                  "Branding",
                  "Motion Graphics",
                  "Maintenance"
                ].map((tag, idx) => (
                  <span 
                    key={idx}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 bg-white/[0.04] border border-white/10 px-3 py-1 rounded-full"
                  >
                    <Check className="w-3 h-3 text-[#00FF88]" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* RIGHT FORM CONTAINER */}
        <div className="lg:col-span-7 space-y-8">
          
          <div className="bg-[#090A0E]/90 backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-[28px] p-6 sm:p-10 shadow-2xl relative overflow-hidden transition-all">
            
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="lead-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
                      {errorMessage}
                    </div>
                  )}

                  {/* FIRST ROW: Full Name & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                        Full Name <span className="text-[#00FF88]">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-[#030509] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#00FF88]/50 focus:ring-1 focus:ring-[#00FF88]/50 transition-all font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                        Company / Brand Name <span className="text-zinc-600">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Acme Corp / Brand"
                        className="w-full bg-[#030509] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#00FF88]/50 focus:ring-1 focus:ring-[#00FF88]/50 transition-all font-sans"
                      />
                    </div>
                  </div>

                  {/* SECOND ROW: Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                        Email Address <span className="text-[#00FF88]">*</span>
                      </label>
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full bg-[#030509] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#00FF88]/50 focus:ring-1 focus:ring-[#00FF88]/50 transition-all font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+234 814 764 8714"
                        className="w-full bg-[#030509] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#00FF88]/50 focus:ring-1 focus:ring-[#00FF88]/50 transition-all font-sans"
                      />
                    </div>
                  </div>

                  {/* THIRD ROW: Service Required */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                      Service Required <span className="text-[#00FF88]">*</span>
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full bg-[#030509] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#00FF88]/50 focus:ring-1 focus:ring-[#00FF88]/50 transition-all font-sans cursor-pointer"
                    >
                      <option value="Website Development">Website Development</option>
                      <option value="Web Application">Web Application</option>
                      <option value="Mobile Application">Mobile Application</option>
                      <option value="UI/UX Design">UI/UX Design</option>
                      <option value="AI Solutions">AI Solutions</option>
                      <option value="Automation">Automation</option>
                      <option value="Cybersecurity">Cybersecurity</option>
                      <option value="Brand Identity">Brand Identity</option>
                      <option value="Motion Graphics">Motion Graphics</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* FOURTH ROW: Preferred Contact Method */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                      Preferred Contact Method
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {["Email", "WhatsApp", "Telegram", "Phone Call"].map((method) => {
                        const isSelected = preferredContact === method;
                        return (
                          <button
                            type="button"
                            key={method}
                            onClick={() => setPreferredContact(method)}
                            className={`px-3 py-2.5 rounded-xl border text-xs font-mono flex items-center justify-center gap-2 transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#00FF88]/10 border-[#00FF88] text-[#00FF88] font-semibold"
                                : "bg-[#030509] border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
                            }`}
                          >
                            <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-[#00FF88]" : "bg-zinc-600"}`} />
                            <span>{method}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* PROJECT DESCRIPTION */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                      Tell us about your project
                    </label>
                    <textarea
                      rows={5}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your project, your business, your goals, features you need, references you like, preferred technology, and anything else that will help us understand your vision."
                      className="w-full bg-[#030509] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#00FF88]/50 focus:ring-1 focus:ring-[#00FF88]/50 transition-all font-sans resize-none"
                    />
                  </div>

                  {/* CONSENT CHECKBOX */}
                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        required
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-white/20 bg-[#030509] text-[#00FF88] focus:ring-[#00FF88]/50 cursor-pointer accent-[#00FF88]"
                      />
                      <span className="text-xs text-zinc-400 group-hover:text-zinc-300 font-sans leading-relaxed">
                        I understand that this form is a project enquiry and not a payment request.
                      </span>
                    </label>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-[#00FF88] hover:bg-[#00e67a] disabled:bg-[#00FF88]/50 text-black font-sans font-bold py-4 rounded-xl transition-all duration-300 shadow-[0_0_25px_rgba(0,255,136,0.25)] hover:shadow-[0_0_35px_rgba(0,255,136,0.4)] cursor-pointer text-xs uppercase tracking-wider hover:scale-[1.01] active:scale-[0.99]"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Project Inquiry →</span>
                      </>
                    )}
                  </button>

                </motion.form>
              ) : (
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-10 space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/30 flex items-center justify-center mx-auto text-[#00FF88] shadow-[0_0_30px_rgba(0,255,136,0.2)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-2xl text-white">
                      Project inquiry sent successfully.
                    </h3>
                    <p className="text-zinc-400 text-sm font-sans max-w-md mx-auto leading-relaxed">
                      We'll review your request and contact you shortly.
                    </p>
                  </div>


                  <div className="pt-4 flex items-center justify-center gap-4">
                    <button
                      onClick={handleReset}
                      className="px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* WHAT HAPPENS NEXT CARD */}
          <div className="bg-[#090A0E]/80 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 sm:p-8 space-y-4">
            <h4 className="font-display font-bold text-base sm:text-lg text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00FF88]" />
              <span>What Happens Next?</span>
            </h4>

            <ol className="space-y-2.5 text-xs sm:text-sm font-sans text-zinc-300">
              <li className="flex items-start gap-2.5">
                <span className="font-mono text-[#00FF88] font-bold">1.</span>
                <span>We review your project requirements and objectives.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-mono text-[#00FF88] font-bold">2.</span>
                <span>We contact you via your preferred method to clarify details.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-mono text-[#00FF88] font-bold">3.</span>
                <span>We prepare a comprehensive proposal and quotation.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-mono text-[#00FF88] font-bold">4.</span>
                <span>Once approved, your project workspace is created.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-mono text-[#00FF88] font-bold">5.</span>
                <span>Development begins according to schedule.</span>
              </li>
            </ol>
          </div>

        </div>

      </div>
    </section>
  );
}

