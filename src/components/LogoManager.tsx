import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Lock, 
  Upload, 
  Trash2, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  FileCode, 
  Image as ImageIcon, 
  ArrowLeft, 
  Eye, 
  Sparkles,
  ShieldAlert,
  LogOut
} from "lucide-react";
import IgrisLogo, { getCustomLogo } from "./IgrisLogo";

interface LogoManagerProps {
  onBackToHome?: () => void;
}

export default function LogoManager({ onBackToHome }: LogoManagerProps) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem("brand_manager_authenticated") === "true";
    } catch {
      return false;
    }
  });

  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");

  // Brand Manager States
  const [currentCustomLogo, setCurrentCustomLogo] = useState<string | null>(getCustomLogo());
  const [uploadedPreview, setUploadedPreview] = useState<string | null>(null);
  const [uploadedFileInfo, setUploadedFileInfo] = useState<{ name: string; sizeKB: string; type: string } | null>(null);
  const [uploadError, setUploadError] = useState("");
  const [notification, setNotification] = useState<{ type: "success" | "info" | "error"; message: string } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewBg, setPreviewBg] = useState<"dark" | "light" | "grid">("dark");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state on custom logo updates
  useEffect(() => {
    const syncLogo = () => {
      setCurrentCustomLogo(getCustomLogo());
    };
    window.addEventListener("igris_logo_updated", syncLogo);
    window.addEventListener("storage", syncLogo);
    return () => {
      window.removeEventListener("igris_logo_updated", syncLogo);
      window.removeEventListener("storage", syncLogo);
    };
  }, []);

  // Password Submission Handler
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    if (passwordInput === "iamking") {
      try {
        sessionStorage.setItem("brand_manager_authenticated", "true");
      } catch (err) {
        console.error(err);
      }
      setIsAuthenticated(true);
      setPasswordInput("");
    } else {
      setAuthError("Incorrect password.");
    }
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem("brand_manager_authenticated");
    } catch (err) {
      console.error(err);
    }
    setIsAuthenticated(false);
  };

  // File Processing Handler
  const processFile = (file: File) => {
    setUploadError("");
    setNotification(null);

    // Validate size (max 5MB)
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_SIZE) {
      setUploadError("File size exceeds 5MB limit. Please upload a smaller image.");
      return;
    }

    // Validate type (SVG or PNG)
    const isValidSvg = file.type === "image/svg+xml" || file.name.endsWith(".svg");
    const isValidPng = file.type === "image/png" || file.name.endsWith(".png");

    if (!isValidSvg && !isValidPng) {
      setUploadError("Invalid file format. Only SVG (.svg) and PNG (.png) files are supported.");
      return;
    }

    // Convert file to Base64 Data URL for live preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setUploadedPreview(result);
      setUploadedFileInfo({
        name: file.name,
        sizeKB: (file.size / 1024).toFixed(1) + " KB",
        type: isValidSvg ? "SVG Vector" : "PNG Image"
      });
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  // Apply Logo Handler
  const handleApplyLogo = () => {
    if (!uploadedPreview) return;

    try {
      localStorage.setItem("igris_custom_logo", uploadedPreview);
      window.dispatchEvent(new Event("igris_logo_updated"));
      setCurrentCustomLogo(uploadedPreview);
      setUploadedPreview(null);
      setUploadedFileInfo(null);
      setNotification({
        type: "success",
        message: "Custom logo successfully applied globally across all application components!"
      });
    } catch (err) {
      console.error(err);
      setUploadError("Failed to save logo to local storage. File may be too large for browser storage.");
    }
  };

  // Reset / Remove Custom Logo Handler
  const handleResetLogo = () => {
    try {
      localStorage.removeItem("igris_custom_logo");
      window.dispatchEvent(new Event("igris_logo_updated"));
      setCurrentCustomLogo(null);
      setUploadedPreview(null);
      setUploadedFileInfo(null);
      setNotification({
        type: "info",
        message: "Custom logo removed. Restored default bundled IGRIS Tech logo globally."
      });
    } catch (err) {
      console.error(err);
    }
  };

  // -------------------------------------------------------------
  // PASSWORD SCREEN (IF NOT AUTHENTICATED)
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#02050b] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-emerald-500/20 selection:text-emerald-300">
        {/* Glow Effects */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative z-10"
        >
          {/* Header Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
              <Lock className="w-6 h-6" />
            </div>
          </div>

          <div className="text-center space-y-2 mb-8">
            <h1 className="font-display font-bold text-2xl text-white tracking-tight">
              IGRIS Tech Brand Asset Manager
            </h1>
            <p className="font-mono text-xs text-emerald-400/80 uppercase tracking-widest font-semibold">
              Developer Access Required
            </p>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-2 font-bold">
                Access Passphrase
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter password..."
                  autoFocus
                  className="w-full bg-black/60 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-zinc-600 outline-none transition-all"
                />
              </div>
            </div>

            {authError && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono"
              >
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </motion.div>
            )}

            <button
              type="submit"
              className="w-full bg-[#00FF88] hover:bg-emerald-300 text-black font-sans font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-[#00FF88]/20 flex items-center justify-center gap-2"
            >
              <span>Continue</span>
              <Sparkles className="w-4 h-4 fill-black" />
            </button>
          </form>

          {onBackToHome && (
            <div className="mt-8 pt-6 border-t border-white/5 text-center">
              <button
                type="button"
                onClick={onBackToHome}
                className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer font-mono"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Public Website</span>
              </button>
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // AUTHENTICATED BRAND MANAGER INTERFACE
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#02050b] text-white p-6 sm:p-12 relative font-sans selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-8">
        
        {/* Top Header Navigation */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="font-display font-bold text-2xl text-white tracking-tight">
                IGRIS Tech Brand Asset Manager
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                Session Active
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-mono">
              Frontend Developer Utility — Real-time Client Logo Overrides
            </p>
          </div>

          <div className="flex items-center gap-3">
            {onBackToHome && (
              <button
                type="button"
                onClick={onBackToHome}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all cursor-pointer flex items-center gap-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Website</span>
              </button>
            )}
            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-xs font-mono text-rose-400 transition-all cursor-pointer flex items-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock Session</span>
            </button>
          </div>
        </div>

        {/* Global Notifications */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`p-4 rounded-2xl border flex items-center justify-between gap-4 backdrop-blur-md ${
                notification.type === "success"
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                  : "bg-blue-500/10 border-blue-500/30 text-blue-400"
              }`}
            >
              <div className="flex items-center gap-3 text-xs font-mono">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>{notification.message}</span>
              </div>
              <button
                onClick={() => setNotification(null)}
                className="text-xs underline opacity-80 hover:opacity-100 cursor-pointer"
              >
                Dismiss
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Current Active Logo */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 backdrop-blur-xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div>
                  <h3 className="font-display font-bold text-base text-white">Current Active Logo</h3>
                  <p className="text-[11px] text-zinc-500 font-mono">System-wide active branding asset</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider ${
                  currentCustomLogo 
                    ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400" 
                    : "bg-zinc-800 border border-white/10 text-zinc-400"
                }`}>
                  {currentCustomLogo ? "Custom Override" : "Bundled Default"}
                </span>
              </div>

              {/* Display Current Logo in Large Box */}
              <div className="relative rounded-2xl bg-black border border-white/10 p-8 flex flex-col items-center justify-center min-h-[220px] overflow-hidden group">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
                
                <div className="relative z-10 flex flex-col items-center space-y-4">
                  <IgrisLogo className="w-24 h-24" />
                  <div className="text-center space-y-1">
                    <span className="font-display font-bold text-sm tracking-widest text-white uppercase block">
                      IGRIS TECH
                    </span>
                    <span className="font-mono text-[10px] text-zinc-500 block">
                      {currentCustomLogo ? "Source: Local Storage (igris_custom_logo)" : "Source: /logo.jpg"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action: Remove / Reset Custom Logo */}
              {currentCustomLogo ? (
                <button
                  type="button"
                  onClick={handleResetLogo}
                  className="w-full py-3 px-4 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Remove Custom Logo & Reset to Default</span>
                </button>
              ) : (
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center text-xs font-mono text-zinc-400">
                  Default logo is currently active globally.
                </div>
              )}
            </div>

            {/* Quick Info Box */}
            <div className="bg-[#0A0A0A]/60 border border-white/5 rounded-3xl p-6 text-xs text-zinc-400 space-y-3 font-mono">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#00FF88]" />
                <span>Global Storage Behavior</span>
              </h4>
              <p className="leading-relaxed">
                When a custom logo is applied, it is encoded as a Data URL and saved to your browser&apos;s <code className="text-emerald-400">localStorage</code> under the key <code className="text-emerald-400">igris_custom_logo</code>.
              </p>
              <p className="leading-relaxed">
                All logo instances across Navbar, Footer, and Scoper listen to custom state events and immediately update in real-time.
              </p>
            </div>
          </div>

          {/* Right Column: Upload New Logo & Live Preview */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-6">
              <div>
                <h3 className="font-display font-bold text-lg text-white">Upload New Logo</h3>
                <p className="text-xs text-zinc-400 font-mono mt-0.5">
                  Accepts vector SVG and high-resolution PNG images up to 5MB.
                </p>
              </div>

              {/* Upload Drag & Drop Area */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-4 ${
                  isDragging
                    ? "border-[#00FF88] bg-[#00FF88]/10"
                    : "border-white/15 bg-black/40 hover:border-emerald-500/50 hover:bg-black/60"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".svg, .png, image/svg+xml, image/png"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 shadow-inner">
                  <Upload className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-semibold text-white">
                    Click to browse or drag & drop logo file here
                  </p>
                  <p className="text-xs text-zinc-500 font-mono">
                    Supported formats: SVG or PNG (Max size: 5MB)
                  </p>
                </div>
              </div>

              {/* Upload Error Banner */}
              {uploadError && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono flex items-center gap-3"
                >
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <span>{uploadError}</span>
                </motion.div>
              )}

              {/* Live Preview Area */}
              {uploadedPreview && uploadedFileInfo && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="border border-white/10 rounded-2xl bg-black/60 p-6 space-y-5"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-emerald-400" />
                      <span className="font-display font-bold text-xs uppercase tracking-wider text-white">
                        Preview Area
                      </span>
                    </div>

                    {/* Background Toggle Buttons */}
                    <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 text-[10px] font-mono">
                      <button
                        type="button"
                        onClick={() => setPreviewBg("dark")}
                        className={`px-2.5 py-1 rounded-lg transition-colors ${
                          previewBg === "dark" ? "bg-emerald-500/20 text-emerald-300 font-bold" : "text-zinc-400 hover:text-white"
                        }`}
                      >
                        Dark
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewBg("light")}
                        className={`px-2.5 py-1 rounded-lg transition-colors ${
                          previewBg === "light" ? "bg-emerald-500/20 text-emerald-300 font-bold" : "text-zinc-400 hover:text-white"
                        }`}
                      >
                        Light
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewBg("grid")}
                        className={`px-2.5 py-1 rounded-lg transition-colors ${
                          previewBg === "grid" ? "bg-emerald-500/20 text-emerald-300 font-bold" : "text-zinc-400 hover:text-white"
                        }`}
                      >
                        Grid
                      </button>
                    </div>
                  </div>

                  {/* File Meta Info */}
                  <div className="grid grid-cols-3 gap-3 text-[11px] font-mono bg-white/5 p-3 rounded-xl border border-white/5">
                    <div>
                      <span className="text-zinc-500 block text-[9px] uppercase">File Name</span>
                      <span className="text-white truncate block font-medium">{uploadedFileInfo.name}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[9px] uppercase">File Type</span>
                      <span className="text-emerald-400 block font-medium">{uploadedFileInfo.type}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[9px] uppercase">File Size</span>
                      <span className="text-zinc-300 block font-medium">{uploadedFileInfo.sizeKB}</span>
                    </div>
                  </div>

                  {/* Visual Preview Box */}
                  <div className={`p-8 rounded-2xl flex items-center justify-center min-h-[180px] border transition-all ${
                    previewBg === "dark" 
                      ? "bg-black border-white/10" 
                      : previewBg === "light" 
                      ? "bg-white border-zinc-300" 
                      : "bg-[#0A0A0A] border-white/10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px]"
                  }`}>
                    <img 
                      src={uploadedPreview} 
                      alt="Uploaded Logo Preview" 
                      className="max-h-24 max-w-full object-contain"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleApplyLogo}
                      className="w-full sm:flex-1 bg-[#00FF88] hover:bg-emerald-300 text-black font-sans font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-[#00FF88]/20 flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Apply Logo</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setUploadedPreview(null);
                        setUploadedFileInfo(null);
                      }}
                      className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white font-mono text-xs py-3.5 px-5 rounded-xl transition-all cursor-pointer text-center"
                    >
                      Cancel Preview
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Reset to Default Button (Always accessible) */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-4">
                <div className="text-xs font-mono text-zinc-500">
                  Restore original bundled logo (/logo.jpg) at any time.
                </div>
                <button
                  type="button"
                  onClick={handleResetLogo}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all cursor-pointer flex items-center gap-2 shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset To Default</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
