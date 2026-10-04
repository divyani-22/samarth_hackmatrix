import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Lock,
  Sparkles,
  Smartphone,
  KeyRound,
  RefreshCw,
  LogOut
} from "lucide-react";
import FinanceLogo from "../components/FinanceLogo";
import { uiTranslations } from "../data/uiTranslations";

export default function SignInPage({ lang = "en" }) {
  const navigate = useNavigate();
  const location = useLocation();

  const t = uiTranslations[lang]?.auth || uiTranslations.en.auth;

  // Auth Mode: "email" (Gmail) vs "phone" (Mobile OTP)
  const [authMethod, setAuthMethod] = useState("email"); // "email" | "phone"
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(30);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Check if already signed in
    const storedUser = localStorage.getItem("samarth_user");
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user session", e);
      }
    }
  }, []);

  // OTP Countdown timer
  useEffect(() => {
    let interval;
    if (otpSent && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, otpTimer]);

  const handleSendOtp = () => {
    if (!fullName.trim()) {
      setErrorMsg(lang === "mr" ? "कृपया आधी आपले पूर्ण नाव प्रविष्ट करा." : lang === "hi" ? "कृपया पहले अपना पूरा नाम दर्ज करें।" : "Please enter your full name first.");
      return;
    }
    if (!phoneNumber || phoneNumber.length < 10) {
      setErrorMsg(lang === "mr" ? "कृपया वैध 10-अंकी मोबाईल क्रमांक प्रविष्ट करा." : lang === "hi" ? "कृपया मान्य 10-अंकों का मोबाइल नंबर दर्ज करें।" : "Please enter a valid 10-digit Indian phone number.");
      return;
    }

    setErrorMsg("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      setOtpTimer(30);
      setOtpCode("584920"); // Simulated OTP
      setSuccessMsg(`SMS OTP sent to +91 ${phoneNumber} (Demo code: 584920)`);
    }, 800);
  };

  const handleGoogleSignIn = () => {
    if (!fullName.trim()) {
      setFullName("Divyani Papalkar");
    }
    setLoading(true);
    setErrorMsg("");

    setTimeout(() => {
      const userProfile = {
        name: fullName.trim() || "Divyani Papalkar",
        email: emailAddress || "divyanipapalkar22@gmail.com",
        method: "google",
        verified: true,
        loginAt: new Date().toISOString(),
      };
      localStorage.setItem("samarth_user", JSON.stringify(userProfile));
      setCurrentUser(userProfile);
      setLoading(false);
      setSuccessMsg(lang === "mr" ? "Google खात्याद्वारे यशस्वीरित्या साइन इन झाले!" : lang === "hi" ? "Google खाते से सफलतापूर्वक साइन इन हुआ!" : "Successfully signed in with Google Account!");
      setTimeout(() => {
        const redirectPath = location.state?.from || "/find";
        navigate(redirectPath);
      }, 1000);
    }, 900);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName.trim()) {
      setErrorMsg(lang === "mr" ? "योजना डॉसियरसाठी पूर्ण नाव आवश्यक आहे." : lang === "hi" ? "योजना डॉसियर के लिए पूरा नाम आवश्यक है।" : "Full Name is required to personalize your scheme dossier.");
      return;
    }

    if (authMethod === "email") {
      if (!emailAddress || !emailAddress.includes("@")) {
        setErrorMsg(lang === "mr" ? "कृपया वैध ईमेल पत्ता प्रविष्ट करा." : lang === "hi" ? "कृपया मान्य ईमेल पता दर्ज करें।" : "Please provide a valid Gmail or Email address.");
        return;
      }

      setLoading(true);
      setTimeout(() => {
        const userProfile = {
          name: fullName.trim(),
          email: emailAddress.trim(),
          method: "email",
          verified: true,
          loginAt: new Date().toISOString(),
        };
        if (rememberMe) {
          localStorage.setItem("samarth_user", JSON.stringify(userProfile));
        }
        setCurrentUser(userProfile);
        setLoading(false);
        setSuccessMsg(lang === "mr" ? `स्वागत आहे, ${fullName}! आपले समर्थ प्रोफाइल सक्रिय आहे.` : lang === "hi" ? `नमस्ते, ${fullName}! आपका समर्थ प्रोफाइल सक्रिय है।` : `Welcome, ${fullName}! Your Samarth profile is active.`);
        setTimeout(() => {
          const redirectPath = location.state?.from || "/find";
          navigate(redirectPath);
        }, 1000);
      }, 900);
    } else {
      // Phone Auth
      if (!otpSent) {
        handleSendOtp();
        return;
      }
      if (!otpCode || otpCode.length < 4) {
        setErrorMsg(lang === "mr" ? "कृपया मोबाईलवर आलेला 6-अंकी OTP प्रविष्ट करा." : lang === "hi" ? "कृपया मोबाइल पर प्राप्त 6-अंकों का OTP दर्ज करें।" : "Please enter the 6-digit OTP received on your mobile.");
        return;
      }

      setLoading(true);
      setTimeout(() => {
        const userProfile = {
          name: fullName.trim(),
          phone: phoneNumber.trim(),
          method: "phone",
          verified: true,
          loginAt: new Date().toISOString(),
        };
        if (rememberMe) {
          localStorage.setItem("samarth_user", JSON.stringify(userProfile));
        }
        setCurrentUser(userProfile);
        setLoading(false);
        setSuccessMsg(lang === "mr" ? `मोबाईल OTP सत्यापित! स्वागत आहे, ${fullName}.` : lang === "hi" ? `मोबाइल OTP सत्यापित! नमस्ते, ${fullName}।` : `Mobile OTP Verified! Welcome, ${fullName}.`);
        setTimeout(() => {
          const redirectPath = location.state?.from || "/find";
          navigate(redirectPath);
        }, 1000);
      }, 900);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("samarth_user");
    setCurrentUser(null);
    setSuccessMsg(t.signedOutMsg || "You have been signed out safely.");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <div className="min-h-[85vh] bg-[#F4F5F7] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Bento Feature Card (span 5) */}
        <div className="md:col-span-5 bg-[#181C24] text-white p-8 rounded-[32px] border border-white/10 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-64 h-64 bg-[#FF6B3D]/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/15 p-2 flex items-center justify-center">
                <FinanceLogo size={28} className="w-full h-full" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight font-['Urbanist',sans-serif]">Samarth</span>
                <span className="block text-[10px] text-slate-400 uppercase font-bold tracking-wider">Citizen Welfare Hub</span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug mb-3">
              {t.oneSecureAccount}
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              {t.oneSecureSub}
            </p>

            <div className="space-y-3.5 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#FF6B3D] shrink-0" />
                <span>Zero paperwork lost — auto-saved applications</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Statutory policy convergence & multi-grant stacker</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Direct SMS alerts for newly launched state schemes</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              256-Bit Data Encryption
            </span>
            <span>Free Forever</span>
          </div>
        </div>

        {/* Right Bento Form Card (span 7) */}
        <div className="md:col-span-7 bg-white p-8 sm:p-10 rounded-[32px] border border-[#E5E7EB] shadow-sm flex flex-col justify-between">
          
          {currentUser ? (
            /* Already Signed In Profile State */
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-[#FF6B3D]/10 text-[#FF6B3D] font-black text-2xl flex items-center justify-center mx-auto mb-4 border border-[#FF6B3D]/20">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {t.activeProfile}
              </div>
              <h3 className="text-2xl font-bold text-[#111827] mt-1">
                {currentUser.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {currentUser.email || currentUser.phone}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/find")}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#FF6B3D] hover:bg-[#E05326] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <span>{t.exploreEligible}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full sm:w-auto px-5 py-3 rounded-full bg-[#F4F5F7] hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-[#E5E7EB]"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{t.signOut}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Sign In / Sign Up Form */
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-black text-[#111827] font-['Urbanist',sans-serif]">
                  {t.signInTitle}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {t.signInSub}
                </p>
              </div>

              {/* Quick Google Sign In */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full py-3 px-4 rounded-full border border-[#E5E7EB] bg-white hover:bg-[#F8F9FA] text-[#111827] text-xs font-bold flex items-center justify-center gap-2.5 transition-all shadow-xs cursor-pointer mb-5"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>{t.continueWithGoogle}</span>
              </button>

              <div className="relative flex py-2 items-center mb-5">
                <div className="flex-grow border-t border-[#E5E7EB]"></div>
                <span className="flex-shrink mx-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  {t.orSignInWith}
                </span>
                <div className="flex-grow border-t border-[#E5E7EB]"></div>
              </div>

              {/* Method Toggle Pills (Gmail vs Mobile Number) */}
              <div className="p-1 bg-[#F4F5F7] rounded-full flex gap-1 mb-5 border border-[#E5E7EB]">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMethod("email");
                    setErrorMsg("");
                    setSuccessMsg("");
                  }}
                  className={`flex-1 py-2 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    authMethod === "email"
                      ? "bg-white text-[#111827] shadow-sm border border-[#E5E7EB]"
                      : "text-slate-500 hover:text-[#111827]"
                  }`}
                >
                  <Mail className="w-3.5 h-3.5 text-[#FF6B3D]" />
                  <span>{t.gmailTab}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAuthMethod("phone");
                    setErrorMsg("");
                    setSuccessMsg("");
                  }}
                  className={`flex-1 py-2 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    authMethod === "phone"
                      ? "bg-white text-[#111827] shadow-sm border border-[#E5E7EB]"
                      : "text-slate-500 hover:text-[#111827]"
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5 text-[#FF6B3D]" />
                  <span>{t.phoneTab}</span>
                </button>
              </div>

              {/* Main Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* 1. Full Name Input (Always Asked) */}
                <div>
                  <label className="block text-xs font-bold text-[#111827] mb-1.5">
                    {t.fullNameLabel} <span className="text-[#FF6B3D]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={t.fullNamePlaceholder}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#F8F9FA] border border-[#E5E7EB] text-sm text-[#111827] focus:outline-none focus:border-[#FF6B3D] focus:ring-2 focus:ring-[#FF6B3D]/20 transition-all placeholder:text-slate-400"
                    />
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* 2. Identifier: Email or Phone */}
                {authMethod === "email" ? (
                  <div>
                    <label className="block text-xs font-bold text-[#111827] mb-1.5">
                      {t.emailLabel} <span className="text-[#FF6B3D]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        placeholder={t.emailPlaceholder}
                        className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#F8F9FA] border border-[#E5E7EB] text-sm text-[#111827] focus:outline-none focus:border-[#FF6B3D] focus:ring-2 focus:ring-[#FF6B3D]/20 transition-all placeholder:text-slate-400"
                      />
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold text-[#111827] mb-1.5">
                      {t.phoneLabel} <span className="text-[#FF6B3D]">*</span>
                    </label>
                    <div className="relative flex">
                      <span className="inline-flex items-center px-3.5 rounded-l-2xl border border-r-0 border-[#E5E7EB] bg-[#F4F5F7] text-slate-600 text-xs font-bold">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                        placeholder={t.phonePlaceholder}
                        className="w-full pl-3.5 pr-4 py-3 rounded-r-2xl bg-[#F8F9FA] border border-[#E5E7EB] text-sm text-[#111827] focus:outline-none focus:border-[#FF6B3D] focus:ring-2 focus:ring-[#FF6B3D]/20 transition-all placeholder:text-slate-400"
                      />
                    </div>

                    {/* OTP Input Row */}
                    {otpSent && (
                      <div className="mt-3.5 p-4 rounded-2xl bg-[#F8F9FA] border border-[#E5E7EB] animate-in fade-in slide-in-from-top-2">
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-xs font-bold text-[#111827]">
                            {t.enterOtp}
                          </label>
                          <span className="text-[11px] text-slate-500 font-mono">
                            {otpTimer > 0 ? `${t.resendIn} ${otpTimer}s` : (
                              <button
                                type="button"
                                onClick={handleSendOtp}
                                className="text-[#FF6B3D] font-bold hover:underline"
                              >
                                {t.resendOtp}
                              </button>
                            )}
                          </span>
                        </div>
                        <div className="relative">
                          <input
                            type="text"
                            maxLength={6}
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value)}
                            placeholder="584920"
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#E5E7EB] text-sm font-mono tracking-widest text-[#111827] focus:outline-none focus:border-[#FF6B3D]"
                          />
                          <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Remember Me Toggle */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-[#FF6B3D] rounded border-[#E5E7EB] focus:ring-[#FF6B3D]"
                    />
                    <span>{t.staySignedIn}</span>
                  </label>
                  <span className="text-slate-400 text-[11px]">Instant Verification</span>
                </div>

                {/* Error Banner */}
                {errorMsg && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                    {errorMsg}
                  </div>
                )}

                {/* Success Banner */}
                {successMsg && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{successMsg}</span>
                  </div>
                )}

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-full bg-[#FF6B3D] hover:bg-[#E05326] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-60 cursor-pointer mt-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>{t.verifying}</span>
                    </>
                  ) : (
                    <>
                      <span>
                        {authMethod === "phone" && !otpSent
                          ? t.sendOtp
                          : t.submitButton}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Footer Terms Note */}
          <div className="pt-6 mt-6 border-t border-[#E5E7EB] text-center text-[11px] text-slate-400">
            By signing in, you agree to Samarth's <Link to="/privacy" className="text-slate-600 hover:underline">Privacy Policy</Link> and <Link to="/terms" className="text-slate-600 hover:underline">Terms of Service</Link>.
          </div>
        </div>
      </div>
    </div>
  );
}

