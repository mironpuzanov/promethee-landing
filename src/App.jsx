import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { X, Check, ArrowRight, ArrowUpRight } from "lucide-react";

function PrometheeMark({ size = 22 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={(size * 313) / 339} viewBox="0 0 339 313" fill="currentColor">
      <path d="M169.5 0C99.9825 0 38.3365 33.5919 0 85.38C12.0778 94.9598 23.1141 105.798 32.8985 117.694C38.5969 124.618 43.8697 131.901 48.6768 139.504C57.0642 152.748 64.0495 166.961 69.4224 181.937C73.253 192.59 76.2625 203.633 78.3856 214.985C85.5011 219.074 92.3662 223.546 98.9409 228.384C105.851 233.456 112.451 238.932 118.7 244.778C138.873 263.62 155.439 286.261 167.246 311.559C167.656 312.435 168.533 313 169.5 313C170.467 313 171.344 312.435 171.754 311.559C183.561 286.261 200.127 263.62 220.3 244.778C226.549 238.932 233.149 233.456 240.059 228.384C246.634 223.546 253.499 219.074 260.614 214.985C262.738 203.633 265.747 192.59 269.578 181.937C274.951 166.961 281.936 152.748 290.323 139.504C295.13 131.901 300.403 124.618 306.101 117.694C315.886 105.798 326.922 94.9598 339 85.38C300.663 33.5919 239.018 0 169.5 0ZM169.5 264.706C158.949 249.595 146.711 235.742 133.061 223.422C133.121 223.292 133.181 223.167 133.237 223.037C135.73 217.491 137.593 211.6 138.74 205.46C139.616 200.767 140.077 195.93 140.077 190.983C140.077 182.212 138.634 173.775 135.971 165.903C135.971 165.903 135.971 165.893 135.966 165.888C135.485 164.759 135.064 163.601 134.704 162.413C134.704 162.408 134.704 162.403 134.704 162.398C134.704 162.393 134.699 162.398 134.699 162.388C133.667 159.028 133.111 155.459 133.111 151.76C133.111 131.722 149.405 115.477 169.505 115.477C189.605 115.477 205.899 131.722 205.899 151.76C205.899 155.459 205.343 159.028 204.311 162.388C204.311 162.393 204.306 162.393 204.306 162.398C204.306 162.403 204.306 162.408 204.306 162.413C203.946 163.601 203.525 164.759 203.044 165.888C203.039 165.888 203.039 165.898 203.039 165.903C200.376 173.775 198.933 182.212 198.933 190.983C198.933 195.93 199.394 200.767 200.27 205.46C201.417 211.6 203.28 217.491 205.773 223.037C205.829 223.167 205.889 223.292 205.949 223.422C192.299 235.742 180.061 249.595 169.51 264.706H169.5ZM229.679 204.537C228.737 205.186 227.806 205.844 226.88 206.518C225.367 201.606 224.556 196.389 224.556 190.983C224.556 185.282 225.458 179.801 227.13 174.659C227.13 174.659 227.135 174.634 227.14 174.624C227.521 173.441 227.946 172.278 228.412 171.134C228.417 171.134 228.417 171.119 228.422 171.114C230.435 165.029 231.521 158.519 231.521 151.76C231.521 144.217 230.164 136.988 227.681 130.304C218.933 106.731 196.184 89.9328 169.5 89.9328C142.816 89.9328 120.067 106.731 111.319 130.304C108.836 136.988 107.479 144.217 107.479 151.76C107.479 158.519 108.565 165.029 110.578 171.114C110.583 171.119 110.583 171.129 110.588 171.134C111.054 172.278 111.479 173.441 111.86 174.624C111.865 174.634 111.865 174.644 111.87 174.654C113.542 179.801 114.444 185.282 114.444 190.983C114.444 196.389 113.633 201.606 112.12 206.518C111.194 205.844 110.263 205.186 109.321 204.537C96.8879 190.464 89.3518 171.988 89.3518 151.76C89.3518 149.858 89.4169 147.971 89.5521 146.104C90.188 137.013 92.3512 128.342 95.7863 120.345C108.024 91.8348 136.421 71.8614 169.5 71.8614C202.579 71.8614 230.976 91.8348 243.214 120.345C246.649 128.342 248.812 137.013 249.448 146.104C249.583 147.971 249.648 149.858 249.648 151.76C249.648 171.988 242.112 190.464 229.679 204.537Z" />
    </svg>
  );
}

function WaitlistDrawer({ open, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const firstFieldRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => firstFieldRef.current?.focus(), 350);
    return () => { window.removeEventListener("keydown", onKey); clearTimeout(t); };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => setSubmitted(false), 400);
      return () => clearTimeout(t);
    }
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <React.Fragment key="drawer-root">
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50"
            style={{ backdropFilter: "blur(2px)" }}
          />
          <motion.aside
            key="panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="drawer-glass fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[460px] flex flex-col"
            style={{ borderLeft: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-center justify-between px-8 pt-8 pb-6">
              <div className="flex items-center gap-2.5 text-white">
                <PrometheeMark size={20} />
                <span className="text-[11px] uppercase tracking-[0.3em] text-white/60">Promethee</span>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 px-8 pb-10 flex flex-col">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                    className="flex flex-col h-full"
                  >
                    <div className="mt-6">
                      <h2 className="text-white text-3xl md:text-4xl font-medium tracking-tight leading-[1.05]">
                        Join the<br />waitlist.
                      </h2>
                      <p className="text-white/55 text-sm mt-4 leading-relaxed max-w-sm">
                        Be among the first to step into the new era. We'll reach out when your seat is ready.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] uppercase tracking-[0.25em] text-white/40 ml-1">Name</label>
                        <input
                          ref={firstFieldRef}
                          className="field"
                          type="text"
                          placeholder="Ada Lovelace"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] uppercase tracking-[0.25em] text-white/40 ml-1">Email</label>
                        <input
                          className="field"
                          type="email"
                          placeholder="ada@notes.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="mt-4 group relative overflow-hidden rounded-full bg-white text-black h-14 flex items-center justify-center gap-2 text-sm font-medium tracking-wide transition-transform active:scale-[0.99]"
                      >
                        <span className="uppercase tracking-[0.18em] text-xs">Request access</span>
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                      </button>

                      <p className="text-[10px] uppercase tracking-[0.22em] text-white/30 mt-3 text-center">
                        No spam. One email when we open.
                      </p>
                    </form>

                    <div className="mt-auto pt-8 border-t border-white/8 text-[10px] uppercase tracking-[0.25em] text-white/30 flex items-center justify-between">
                      <span>v 0.1 · Private alpha</span>
                      <span>Spring 2026</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="flex-1 flex flex-col justify-center items-start"
                  >
                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center">
                      <Check size={20} strokeWidth={2.25} />
                    </div>
                    <h2 className="text-white text-3xl md:text-4xl font-medium tracking-tight leading-[1.05] mt-6">
                      You're on the list.
                    </h2>
                    <p className="text-white/55 text-sm mt-4 leading-relaxed max-w-sm">
                      Thank you, {name.split(" ")[0] || "friend"}. We'll send a single, quiet email to <span className="text-white/80">{email}</span> when it's time.
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-10 text-[11px] uppercase tracking-[0.25em] text-white/50 hover:text-white transition-colors"
                    >
                      ← Return
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.aside>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}

function BentoCard({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      className={"relative rounded-3xl p-7 md:p-8 flex flex-col justify-between min-h-[300px] overflow-hidden " + className}
      style={{
        background: "rgba(14, 14, 16, 0.55)",
        backdropFilter: "blur(20px) saturate(140%)",
        WebkitBackdropFilter: "blur(20px) saturate(140%)",
        border: "1px solid rgba(255, 255, 255, 0.07)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {children}
    </motion.div>
  );
}

function BentoEyebrow({ children }) {
  return <span className="text-[10px] uppercase tracking-[0.3em] text-white/35 font-medium">{children}</span>;
}
function BentoTitle({ children }) {
  return <h4 className="text-white text-xl md:text-[22px] font-medium tracking-tight leading-tight mt-3">{children}</h4>;
}

function AmbientPill() {
  return (
    <div className="relative w-full max-w-[420px] mx-auto">
      <div className="absolute inset-x-6 -bottom-2 h-6 rounded-full blur-2xl opacity-50"
        style={{ background: "radial-gradient(ellipse at center, rgba(255,90,60,0.55) 0%, rgba(0,0,0,0) 70%)" }} />

      <div
        className="relative rounded-2xl pl-3 pr-2 py-2 flex items-center gap-3 overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #1a1a1d 0%, #0d0d10 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        <button
          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.06)" }}
          aria-label="Dismiss"
          tabIndex={-1}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1 1l8 8M9 1l-8 8" stroke="rgba(255,255,255,0.6)" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>

        <div className="flex-1 min-w-0 leading-tight">
          <div className="text-white text-[13px] font-semibold tracking-tight flex items-center gap-2">
            <span>Working detected</span>
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-400" />
            </span>
          </div>
          <div className="text-white/45 text-[11px] -mt-0.5">Cursor</div>
        </div>

        <button
          tabIndex={-1}
          className="shrink-0 rounded-full px-4 py-2 text-white text-[12px] font-semibold tracking-tight"
          style={{
            background: "linear-gradient(180deg, #ff6a4a 0%, #f04826 100%)",
            boxShadow: "0 4px 14px rgba(240,72,38,0.4), inset 0 1px 0 rgba(255,255,255,0.25)",
          }}
        >
          Start session
        </button>

        <div className="absolute left-0 right-0 bottom-0 h-[2px] overflow-hidden rounded-b-2xl">
          <div className="absolute inset-y-0 left-0 ambient-progress" style={{
            background: "linear-gradient(90deg, transparent 0%, #f04826 50%, transparent 100%)"
          }} />
        </div>
      </div>
    </div>
  );
}

function ProgressionWidget() {
  return (
    <div className="relative w-full max-w-[420px] mx-auto flex flex-col gap-3">
      <div className="px-1 flex items-center gap-3">
        <span className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-medium tabular-nums">Lv 23</span>
        <div className="flex-1 h-1 rounded-full overflow-hidden relative" style={{ background: "rgba(255,255,255,0.06)" }}>
          <div className="absolute inset-y-0 left-0 rounded-full" style={{
            width: "62%",
            background: "linear-gradient(90deg, #ff7a5a 0%, #f04826 100%)",
            boxShadow: "0 0 10px rgba(240,72,38,0.55)",
          }} />
        </div>
        <span className="text-[10px] uppercase tracking-[0.18em] text-white/30 font-medium tabular-nums">Lv 24</span>
      </div>

      <div
        className="rounded-2xl px-4 py-3 flex items-center gap-3"
        style={{
          background: "linear-gradient(180deg, #18181c 0%, #0e0e11 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        <span className="text-white/40 text-[12px] font-semibold tabular-nums w-7">#14</span>

        <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 relative" style={{ background: "linear-gradient(135deg,#3a3a40,#1a1a1d)" }}>
          <svg viewBox="0 0 28 28" className="absolute inset-0 w-full h-full">
            <circle cx="14" cy="11" r="4.5" fill="rgba(255,255,255,0.55)" />
            <ellipse cx="14" cy="24" rx="9" ry="6" fill="rgba(255,255,255,0.45)" />
          </svg>
        </div>

        <div className="flex-1 min-w-0 text-white text-[13px] font-semibold tracking-tight truncate">You</div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="inline-flex items-center gap-1 text-[12px] font-semibold tabular-nums" style={{ color: "#ff7a5a" }}>
            <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor"><path d="M6 0L0 7h3l-1 5 6-7H5l1-5z" /></svg>
            4,710
            <span className="text-[10px] font-medium opacity-80">XP</span>
          </span>
          <span className="inline-flex items-center gap-1 text-white/55 text-[11px] tabular-nums">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <circle cx="5" cy="5" r="4.2" stroke="currentColor" strokeWidth="1" />
              <path d="M5 2.6V5l1.6 1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </svg>
            6.3h
          </span>
        </div>
      </div>
    </div>
  );
}

function CoPresenceWidget() {
  const people = [
    { name: "K", img: null, active: true, tone: "mono" },
    { name: "Miron", img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&h=120&fit=crop&crop=faces", active: true },
    { name: "Lina",  img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces", active: true },
    { name: "Theo",  img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=120&h=120&fit=crop&crop=faces", active: true },
  ];

  return (
    <div className="relative w-full max-w-[420px] mx-auto">
      <div
        className="rounded-2xl px-4 py-3 flex items-center gap-3"
        style={{
          background: "linear-gradient(180deg, #18181c 0%, #0e0e11 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        <div className="flex -space-x-2 shrink-0">
          {people.map((p, i) => (
            <div
              key={i}
              className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-[#0e0e11]"
              style={{
                background: p.tone === "mono"
                  ? "linear-gradient(135deg,#2c2c30,#16161a)"
                  : "linear-gradient(135deg,#3a3a40,#1a1a1d)",
                zIndex: 10 - i,
              }}
            >
              {p.tone === "mono" ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 339 313" width="14" height="14" fill="rgba(255,255,255,0.7)">
                    <path d="M169.5 0C99.98 0 38.34 33.59 0 85.38c12.08 9.58 23.11 20.42 32.9 32.31 5.7 6.92 10.97 14.21 15.78 21.81 8.39 13.24 15.37 27.46 20.74 42.43 3.83 10.65 6.84 21.7 8.97 33.05 7.11 4.09 13.98 8.56 20.55 13.4 6.91 5.07 13.51 10.55 19.76 16.4 20.17 18.84 36.74 41.48 48.55 66.78.41.88 1.29 1.44 2.25 1.44s1.84-.56 2.25-1.44c11.81-25.3 28.38-47.94 48.55-66.78 6.25-5.85 12.85-11.33 19.76-16.4 6.57-4.84 13.44-9.31 20.55-13.4 2.13-11.35 5.14-22.4 8.97-33.05 5.37-14.97 12.36-29.19 20.74-42.43 4.81-7.6 10.08-14.89 15.78-21.81 9.79-11.89 20.83-22.73 32.9-32.31C300.66 33.59 239.02 0 169.5 0zm0 264.71c-10.55-15.11-22.79-28.96-36.44-41.28.06-.13.12-.26.18-.39 2.49-5.55 4.36-11.44 5.5-17.58.88-4.69 1.34-9.53 1.34-14.48 0-8.77-1.44-17.21-4.11-25.08l-.01-.02c-.48-1.13-.9-2.29-1.26-3.48 0-.01-.01-.02-.01-.03-1.03-3.36-1.59-6.93-1.59-10.62 0-20.04 16.29-36.28 36.39-36.28s36.4 16.24 36.4 36.28c0 3.7-.56 7.27-1.59 10.62v.04c-.36 1.19-.78 2.35-1.26 3.48v.01c-2.66 7.87-4.11 16.31-4.11 25.08 0 4.95.46 9.79 1.34 14.48 1.15 6.14 3.01 12.03 5.5 17.58.06.13.12.26.18.39-13.65 12.32-25.89 26.17-36.44 41.28zm60.18-60.17c-.94.65-1.87 1.31-2.8 1.98-1.51-4.91-2.32-10.13-2.32-15.54 0-5.7.9-11.18 2.57-16.32v-.04c.38-1.18.81-2.35 1.27-3.49v-.02c2.01-6.08 3.1-12.59 3.1-19.35 0-7.54-1.36-14.77-3.84-21.46-8.75-23.57-31.5-40.37-58.18-40.37s-49.43 16.8-58.18 40.37c-2.48 6.68-3.84 13.91-3.84 21.46 0 6.76 1.09 13.27 3.1 19.35v.02c.47 1.14.89 2.31 1.27 3.49v.04c1.67 5.15 2.57 10.62 2.57 16.32 0 5.41-.81 10.62-2.32 15.54-.93-.67-1.86-1.33-2.8-1.98-12.43-14.07-19.97-32.55-19.97-52.78 0-1.9.07-3.79.2-5.66.64-9.09 2.8-17.76 6.24-25.76 12.24-28.51 40.64-48.48 73.72-48.48s61.48 19.97 73.72 48.48c3.43 8 5.6 16.67 6.23 25.76.14 1.87.2 3.76.2 5.66 0 20.23-7.54 38.71-19.97 52.78z"/>
                  </svg>
                </div>
              ) : (
                <div className="absolute inset-0" style={{
                  backgroundImage: `url('${p.img}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "saturate(0.9) brightness(0.95)"
                }} />
              )}
            </div>
          ))}
          <div
            className="relative w-8 h-8 rounded-full ring-2 ring-[#0e0e11] flex items-center justify-center text-[10px] font-semibold text-white/55 tracking-tight"
            style={{ background: "rgba(255,255,255,0.05)", zIndex: 1 }}
          >
            +12
          </div>
        </div>

        <div className="flex items-center gap-2 ml-1">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full opacity-70 animate-ping"
              style={{ background: "#22c55e" }} />
            <span className="relative inline-flex rounded-full h-2 w-2"
              style={{ background: "#22c55e", boxShadow: "0 0 8px rgba(34,197,94,0.8)" }} />
          </span>
          <span className="text-white text-[13px] font-semibold tracking-tight leading-tight">
            16 people<br />
            <span className="text-white/45 font-medium">working now</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function HeatmapWidget() {
  const weeks = 14, days = 7;
  let s = 17;
  const next = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };

  const cells = [];
  for (let w = 0; w < weeks; w++) {
    const col = [];
    for (let d = 0; d < days; d++) {
      const r = next();
      const weight = (d === 5 || d === 6) ? r * 0.7 : r;
      let lvl = 0;
      if (weight > 0.85) lvl = 4;
      else if (weight > 0.65) lvl = 3;
      else if (weight > 0.4) lvl = 2;
      else if (weight > 0.18) lvl = 1;
      col.push(lvl);
    }
    cells.push(col);
  }

  const colors = [
    "rgba(255,255,255,0.05)",
    "rgba(240,72,38,0.22)",
    "rgba(240,72,38,0.45)",
    "rgba(240,72,38,0.72)",
    "rgba(255,122,90,1)",
  ];
  const dayLabels = ["M", "", "W", "", "F", "", ""];

  return (
    <div className="relative w-full max-w-[300px] mx-auto">
      <div
        className="rounded-2xl px-3 py-3"
        style={{
          background: "linear-gradient(180deg, #18181c 0%, #0e0e11 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[10px] uppercase tracking-[0.22em] text-white/45 font-semibold">Focus</span>
          <span className="text-[11px] tabular-nums text-white/45">25h 36m · this year</span>
        </div>

        <div className="flex gap-2.5">
          <div className="flex flex-col justify-between py-[1px]">
            {dayLabels.map((l, i) => (
              <span key={i} className="text-[8px] uppercase text-white/30 leading-none h-[10px] flex items-center">{l}</span>
            ))}
          </div>

          <div className="flex-1 flex gap-[3px]">
            {cells.map((col, w) => (
              <div key={w} className="flex flex-col gap-[3px] flex-1">
                {col.map((lvl, d) => (
                  <div
                    key={d}
                    className="flex-1 rounded-[2px] aspect-square"
                    style={{
                      background: colors[lvl],
                      boxShadow: lvl === 4 ? "0 0 6px rgba(240,72,38,0.6)" : "none",
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-tight" style={{ color: "#ff7a5a" }}>
            <svg width="9" height="11" viewBox="0 0 9 11" fill="currentColor"><path d="M4.5 0C4 2 2 3 2 5.2 2 7 3 8 4.5 8S7 7 7 5.2c-.5.6-1 .8-1.3.4C5 4.8 5.5 3 4.5 0z M2.5 7C1 8 .5 8.8.5 9.7.5 10.4 2 11 4.5 11S8.5 10.4 8.5 9.7c0-.9-.5-1.7-2-2.7.3 1-.5 1.8-2 1.8s-2.3-.8-2-1.8z"/></svg>
            <span className="tabular-nums">19d</span>
            <span className="text-white/35 font-medium">streak</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[8px] uppercase tracking-[0.18em] text-white/30">Less</span>
            {colors.map((c, i) => (
              <span key={i} className="w-2 h-2 rounded-[2px]" style={{ background: c }} />
            ))}
            <span className="text-[8px] uppercase tracking-[0.18em] text-white/30">More</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SessionHUD() {
  return (
    <div className="relative w-full max-w-[360px] mx-auto">
      <div className="absolute inset-x-8 -bottom-3 h-8 rounded-full blur-2xl opacity-60"
        style={{ background: "radial-gradient(ellipse at center, rgba(255,90,60,0.6) 0%, rgba(0,0,0,0) 70%)" }} />

      <div
        className="relative rounded-2xl px-3 py-2.5 flex items-center gap-3 overflow-hidden"
        style={{
          background: "linear-gradient(180deg, rgba(20,20,24,0.92) 0%, rgba(8,8,11,0.92) 100%)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: "1px solid rgba(255,255,255,0.09)",
          boxShadow: "0 14px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        <div className="relative shrink-0 w-7 h-7 flex items-center justify-center">
          <span className="absolute inset-0 rounded-full animate-ping opacity-60"
            style={{ border: "2px solid #f04826" }} />
          <span className="relative w-5 h-5 rounded-full"
            style={{ border: "2px solid #f04826", boxShadow: "0 0 10px rgba(240,72,38,0.6)" }} />
        </div>

        <span className="text-white text-[15px] font-semibold tracking-tight tabular-nums">19:55</span>
        <span className="w-px h-4 bg-white/10" />
        <span className="inline-flex items-baseline gap-1 text-[13px] font-semibold tabular-nums">
          <span className="text-white">+190</span>
          <span style={{ color: "#ff5a3a" }} className="text-[11px]">XP</span>
        </span>
        <span className="w-px h-4 bg-white/10" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">Lv 23</span>
        <span className="flex-1" />

        <button
          tabIndex={-1}
          aria-label="End session"
          className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
          style={{
            background: "linear-gradient(180deg, #ff6a4a 0%, #f04826 100%)",
            boxShadow: "0 4px 12px rgba(240,72,38,0.4), inset 0 1px 0 rgba(255,255,255,0.25)",
          }}
        >
          <span className="w-2.5 h-2.5 rounded-[2px] bg-white" />
        </button>
      </div>
    </div>
  );
}

function BentoFeatureCard({ delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-3xl overflow-hidden md:row-span-2 min-h-[440px] md:min-h-[540px] flex flex-col"
      style={{
        background: "linear-gradient(180deg, #0c0c0f 0%, #050507 100%)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 70% 50% at 50% 45%, rgba(240,72,38,0.10) 0%, rgba(0,0,0,0) 70%)"
      }} />
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
      }} />

      <div className="relative z-10 flex-1 flex items-center justify-center px-7 pt-10">
        <SessionHUD />
      </div>

      <div className="relative z-10 px-7 md:px-8 pb-8 text-center">
        <h4 className="text-white text-2xl md:text-3xl font-medium tracking-tight leading-tight">
          A new kind of software.
        </h4>
        <p className="text-white/55 text-sm mt-3 max-w-[34ch] mx-auto">
          Always-on. Quiet. Built for the augmented human.
        </p>
      </div>
    </motion.div>
  );
}

function HeroBackground() {
  const { scrollY } = useScroll();
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const scale  = useTransform(scrollY, [0, vh * 2], [1, 1.25]);
  const blur   = useTransform(scrollY, [0, vh * 0.3, vh * 1.6], [0, 0, 36]);
  const filter = useTransform(blur, (b) => `blur(${b}px) saturate(1.12)`);
  const y      = useTransform(scrollY, [0, vh * 2], [0, -140]);

  return (
    <div className="fixed inset-0 z-[0] overflow-hidden">
      <motion.div
        className="absolute -inset-20"
        style={{
          backgroundImage: "url('assets/landing_background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          scale,
          filter,
          y,
          transform: "translateZ(0)",
          willChange: "transform, filter",
          backfaceVisibility: "hidden",
        }}
      />
    </div>
  );
}

function openWebflowWaitlist() {
  if (typeof window === "undefined") return;
  const selectors = [
    ".hero__btn",
    ".hero__btn .btn_wrap",
    "[data-modal-open]",
    ".sticky_btn",
    ".sticky_btn .btn_wrap",
  ];
  for (const sel of selectors) {
    const el = window.parent?.document?.querySelector?.(sel) || document.querySelector(sel);
    if (el) {
      el.click();
      return;
    }
  }
  console.warn("[promethee] No Webflow waitlist trigger found.");
}

export default function App() {
  const [open, setOpen] = useState(false);
  const handleWaitlistClick = () => {
    openWebflowWaitlist();
    setOpen(true);
  };

  return (
    <main className="relative w-full min-h-screen overflow-x-hidden flex flex-col font-sans selection:bg-white/20 selection:text-white">
      <HeroBackground />
      <div className="fixed inset-0 z-[1] pointer-events-none" style={{
        background: "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)"
      }} />

      <div className="relative z-10 w-full flex flex-col">
        <div className="snap-section min-h-screen w-full flex flex-col px-6 md:px-10 pt-8 md:pt-10 pb-10">
          <header className="flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <PrometheeMark size={26} />
              <span className="text-[13px] tracking-[0.28em] uppercase font-medium">Promethee</span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">Spring 2026</span>
          </header>

          <section className="flex-1 flex flex-col items-center justify-center text-center relative">
            <motion.span
              key="eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[10px] uppercase tracking-[0.4em] text-white/45 mb-8 inline-flex items-center gap-2"
            >
              <span className="inline-flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-white/60" />
                <span>Coming soon</span>
                <span className="w-1 h-1 rounded-full bg-white/60" />
              </span>
            </motion.span>

            <motion.h1
              key="headline"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-white text-5xl sm:text-6xl md:text-7xl font-medium leading-[1.02] tracking-tight max-w-4xl"
            >
              The new era begins.
            </motion.h1>

            <motion.p
              key="lede"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/55 text-base md:text-lg mt-6 max-w-md leading-relaxed"
            >
              Promethee is almost here.
            </motion.p>

            <motion.div
              key="cta"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9"
            >
              <button
                onClick={handleWaitlistClick}
                className="liquid-glass rounded-full pl-7 pr-2 py-2 inline-flex items-center gap-4 text-white text-sm group hover:scale-[1.02] transition-transform duration-300"
              >
                <span className="uppercase tracking-[0.22em] text-xs">Join waitlist</span>
                <span className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={15} />
                </span>
              </button>
            </motion.div>

            <motion.div
              key="scroll-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.2 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/35"
            >
              <span className="text-[9px] uppercase tracking-[0.4em]">Scroll</span>
              <span className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
            </motion.div>
          </section>
        </div>

        <div
          className="relative w-full h-72 -mt-10 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.55) 100%)" }}
        />

        <section
          className="snap-section relative w-full px-6 md:px-10 pb-32"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.78) 100%)" }}
        >
          <div className="max-w-6xl mx-auto pt-40 md:pt-56">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-center mb-16 md:mb-20"
            >
              <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05]">
                Work is invisible.
              </h2>
              <h3 className="text-white/40 text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05] mt-1">
                We make it count.
              </h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 auto-rows-[minmax(220px,auto)]">
              <BentoCard delay={0.05}>
                <div className="flex flex-col h-full">
                  <div className="flex-1 flex items-center justify-center pb-4">
                    <AmbientPill />
                  </div>
                  <div className="border-t border-white/5 pt-5">
                    <BentoEyebrow>01</BentoEyebrow>
                    <BentoTitle>Ambient by design</BentoTitle>
                    <p className="text-white/55 text-sm leading-relaxed mt-3 max-w-[28ch]">
                      No start button. The moment you sit down, your work is recorded.
                    </p>
                  </div>
                </div>
              </BentoCard>

              <BentoFeatureCard delay={0.15} />

              <BentoCard delay={0.25}>
                <div className="flex flex-col h-full">
                  <div className="flex-1 flex items-center justify-center pb-4">
                    <ProgressionWidget />
                  </div>
                  <div className="border-t border-white/5 pt-5">
                    <BentoEyebrow>02</BentoEyebrow>
                    <BentoTitle>Visible progression</BentoTitle>
                    <p className="text-white/55 text-sm leading-relaxed mt-3 max-w-[28ch]">
                      Hours, levels, skills — stacked up so you can see who you are becoming.
                    </p>
                  </div>
                </div>
              </BentoCard>

              <BentoCard delay={0.35}>
                <div className="flex flex-col h-full">
                  <div className="flex-1 flex items-center justify-center pb-4">
                    <CoPresenceWidget />
                  </div>
                  <div className="border-t border-white/5 pt-5">
                    <BentoEyebrow>03</BentoEyebrow>
                    <BentoTitle>Silent co-presence</BentoTitle>
                    <p className="text-white/55 text-sm leading-relaxed mt-3 max-w-[28ch]">
                      Others working in silence, alongside you. The accountability of a gym, for the work that matters.
                    </p>
                  </div>
                </div>
              </BentoCard>

              <BentoCard delay={0.55}>
                <div className="flex flex-col h-full">
                  <div className="flex-1 flex items-center justify-center pb-4">
                    <HeatmapWidget />
                  </div>
                  <div className="border-t border-white/5 pt-5">
                    <BentoEyebrow>04</BentoEyebrow>
                    <BentoTitle>Yours, recorded</BentoTitle>
                    <p className="text-white/55 text-sm leading-relaxed mt-3 max-w-[28ch]">
                      Every focus block, every habit, every streak — proof that you showed up.
                    </p>
                  </div>
                </div>
              </BentoCard>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center mt-20 md:mt-28 text-center"
            >
              <p className="text-white/55 text-sm md:text-base max-w-md mb-8 leading-relaxed">
                Built for the augmented human. Step inside before the doors widen.
              </p>
              <button
                onClick={handleWaitlistClick}
                className="liquid-glass rounded-full pl-7 pr-2 py-2 inline-flex items-center gap-4 text-white text-sm group hover:scale-[1.02] transition-transform duration-300"
              >
                <span className="uppercase tracking-[0.22em] text-xs">Request access</span>
                <span className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={15} />
                </span>
              </button>
              <span className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.3em] text-white/30">
                <span>© Promethee · Spring 2026</span>
                <span className="text-white/15">·</span>
                <a href="#" className="hover:text-white/70 transition-colors">Privacy</a>
                <a href="#" className="hover:text-white/70 transition-colors">Terms</a>
              </span>
            </motion.div>
          </div>
        </section>
      </div>

      <WaitlistDrawer open={open} onClose={() => setOpen(false)} />
    </main>
  );
}
