import React, { useState, useEffect } from "react";
import axios from "axios";

/* ═══════════════════════════════════════════════════════
   GLOBAL STYLES
═══════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Fredoka+One&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --pink:    #FF6B9D;
  --orange:  #FF9A3C;
  --yellow:  #FFD23F;
  --green:   #06D6A0;
  --teal:    #00B4D8;
  --blue:    #4361EE;
  --purple:  #7B2FBE;
  --red:     #EF233C;
  --white:   #FFFFFF;
  --offwhite:#FFF8F0;
  --dark:    #1A0533;
  --font:    'Nunito', sans-serif;
  --display: 'Fredoka One', cursive;
}

html, body, #root {
  height: 100%;
  font-family: var(--font);
  background: var(--offwhite);
  overflow-x: hidden;
}

/* ── Animations ──────────────────────────────── */
@keyframes pop      { 0%{transform:scale(0.5);opacity:0} 70%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
@keyframes floatUp  { from{transform:translateY(40px);opacity:0} to{transform:translateY(0);opacity:1} }
@keyframes wiggle   { 0%,100%{transform:rotate(-4deg)} 50%{transform:rotate(4deg)} }
@keyframes bounce   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
@keyframes fadeIn   { from{opacity:0} to{opacity:1} }
@keyframes slideUp  { from{transform:translateY(60px);opacity:0} to{transform:translateY(0);opacity:1} }
@keyframes confetti { 0%{transform:translateY(-10px) rotate(0deg);opacity:1} 100%{transform:translateY(100vh) rotate(720deg);opacity:0} }
@keyframes gradMove { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }

/* ── Splash Screen ───────────────────────────── */
.splash {
  position: fixed; inset: 0; z-index: 1000;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  background: linear-gradient(135deg, #FF6B9D 0%, #FF9A3C 25%, #FFD23F 50%, #06D6A0 75%, #4361EE 100%);
  background-size: 300% 300%;
  animation: gradMove 3s ease infinite;
}
.splash-emoji { font-size: 100px; animation: bounce 1s ease-in-out infinite; filter: drop-shadow(0 10px 30px rgba(0,0,0,0.3)); }
.splash-title { font-family: var(--display); font-size: 52px; color: white; text-shadow: 0 4px 20px rgba(0,0,0,0.25); margin-top: 16px; animation: pop 0.8s cubic-bezier(.175,.885,.32,1.275) 0.3s both; }
.splash-sub   { font-size: 18px; color: rgba(255,255,255,0.9); font-weight: 700; margin-top: 8px; animation: floatUp 0.6s ease 0.8s both; }
.splash-loader { margin-top: 48px; display: flex; gap: 10px; animation: floatUp 0.6s ease 1s both; }
.splash-dot { width: 14px; height: 14px; border-radius: 50%; background: rgba(255,255,255,0.9); }
.splash-dot:nth-child(1) { animation: bounce 0.7s ease-in-out 0s infinite; }
.splash-dot:nth-child(2) { animation: bounce 0.7s ease-in-out 0.15s infinite; }
.splash-dot:nth-child(3) { animation: bounce 0.7s ease-in-out 0.3s infinite; }

/* ── Welcome ─────────────────────────────────── */
.welcome {
  min-height: 100vh;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  background: linear-gradient(160deg, #FFD23F 0%, #FF9A3C 40%, #FF6B9D 100%);
  padding: 32px 24px; text-align: center; position: relative; overflow: hidden;
}
.welcome-blob { position: absolute; border-radius: 50%; filter: blur(60px); opacity: 0.4; }
.welcome-scene { font-size: 90px; animation: pop 0.7s cubic-bezier(.175,.885,.32,1.275) both; filter: drop-shadow(0 8px 24px rgba(0,0,0,0.2)); position: relative; z-index: 1; }
.welcome-title { font-family: var(--display); font-size: 44px; color: white; text-shadow: 0 3px 16px rgba(0,0,0,0.2); margin-top: 20px; animation: floatUp 0.6s ease 0.2s both; position: relative; z-index: 1; }
.welcome-sub   { font-size: 17px; font-weight: 700; color: rgba(255,255,255,0.92); max-width: 320px; line-height: 1.5; margin-top: 12px; animation: floatUp 0.6s ease 0.35s both; position: relative; z-index: 1; }
.feature-pills { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-top: 28px; animation: floatUp 0.6s ease 0.5s both; position: relative; z-index: 1; }
.feature-pill  { background: rgba(255,255,255,0.25); backdrop-filter: blur(8px); border: 2px solid rgba(255,255,255,0.5); border-radius: 50px; padding: 8px 18px; font-size: 14px; font-weight: 800; color: white; }
.big-btn { margin-top: 36px; padding: 18px 52px; border-radius: 50px; border: none; cursor: pointer; font-family: var(--display); font-size: 22px; color: var(--blue); background: white; box-shadow: 0 8px 32px rgba(0,0,0,0.2), 0 2px 0 rgba(0,0,0,0.12); transition: transform 0.15s, box-shadow 0.15s; animation: floatUp 0.6s ease 0.65s both; position: relative; z-index: 1; }
.big-btn:hover { transform: translateY(-3px) scale(1.03); box-shadow: 0 14px 40px rgba(0,0,0,0.25); }
.big-btn:active { transform: translateY(1px) scale(0.98); }

/* ── App Shell ───────────────────────────────── */
.app-shell { min-height: 100vh; background: var(--offwhite); animation: fadeIn 0.4s ease; }

.app-header {
  background: linear-gradient(90deg, var(--pink), var(--orange), var(--yellow), var(--green), var(--teal), var(--blue));
  background-size: 200% 100%;
  animation: gradMove 4s ease infinite;
  padding: 0 24px;
  display: flex; align-items: center; justify-content: space-between;
  height: 68px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  position: sticky; top: 0; z-index: 50;
}
.header-brand { display: flex; align-items: center; gap: 10px; }
.header-logo  { font-size: 30px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2)); }
.header-name  { font-family: var(--display); font-size: 26px; color: white; text-shadow: 0 2px 8px rgba(0,0,0,0.2); }
.header-tag   { background: rgba(255,255,255,0.3); border-radius: 20px; padding: 4px 12px; font-size: 12px; font-weight: 800; color: white; }

/* ── Step Nav ────────────────────────────────── */
.step-nav { display: flex; align-items: center; justify-content: center; gap: 0; padding: 24px 20px 8px; overflow-x: auto; }
.step-item { display: flex; flex-direction: column; align-items: center; gap: 6px; cursor: pointer; }
.step-circle { width: 54px; height: 54px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 22px; border: 3px solid transparent; transition: all 0.25s; box-shadow: 0 4px 14px rgba(0,0,0,0.12); }
.step-label { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: #aaa; transition: color 0.2s; white-space: nowrap; }
.step-connector { width: 48px; height: 4px; border-radius: 2px; background: #ddd; margin-bottom: 24px; transition: background 0.3s; flex-shrink: 0; }
.step-connector.done { background: linear-gradient(90deg, var(--green), var(--teal)); }
.step-item.active .step-circle { transform: scale(1.15); }
.step-item.active .step-label  { color: var(--dark); }
.step-item.done   .step-label  { color: var(--green); }

/* ── Progress ────────────────────────────────── */
.progress-bar-wrap { background: rgba(0,0,0,0.06); border-radius: 10px; height: 6px; margin: 0 20px 0; overflow: hidden; }
.progress-bar-fill { height: 100%; border-radius: 10px; transition: width 0.4s cubic-bezier(.175,.885,.32,1.275); }

/* ── Content ─────────────────────────────────── */
.step-content { max-width: 680px; margin: 0 auto; padding: 8px 20px 100px; animation: slideUp 0.4s cubic-bezier(.175,.885,.32,1.275) both; }

/* ── Color cards ─────────────────────────────── */
.color-card { border-radius: 24px; padding: 28px; margin-bottom: 20px; box-shadow: 0 8px 32px rgba(0,0,0,0.1); position: relative; overflow: hidden; }
.color-card::before { content: ''; position: absolute; top: -30px; right: -30px; width: 140px; height: 140px; border-radius: 50%; background: rgba(255,255,255,0.15); }
.color-card::after  { content: ''; position: absolute; bottom: -50px; left: -20px; width: 180px; height: 180px; border-radius: 50%; background: rgba(255,255,255,0.1); }
.card-pink   { background: linear-gradient(135deg, #FF6B9D, #c0392b); color: white; }
.card-blue   { background: linear-gradient(135deg, #4361EE, #7B2FBE); color: white; }
.card-green  { background: linear-gradient(135deg, #06D6A0, #00B4D8); color: white; }
.card-emoji  { font-size: 48px; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2)); position: relative; z-index: 1; animation: wiggle 2s ease-in-out infinite; }
.card-title-text { font-family: var(--display); font-size: 26px; margin-top: 8px; position: relative; z-index: 1; text-shadow: 0 2px 8px rgba(0,0,0,0.15); }
.card-sub-text   { font-size: 14px; font-weight: 700; opacity: 0.9; margin-top: 4px; position: relative; z-index: 1; }

/* ── Fun inputs ──────────────────────────────── */
.fun-field { background: white; border-radius: 16px; padding: 14px 18px; margin-top: 14px; box-shadow: 0 4px 14px rgba(0,0,0,0.07); border: 3px solid transparent; transition: border-color 0.2s, box-shadow 0.2s; position: relative; z-index: 1; }
.fun-field:focus-within { box-shadow: 0 4px 20px rgba(67,97,238,0.2); }
.fun-field label { display: block; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 5px; }
.fun-field input { width: 100%; border: none; outline: none; font-family: var(--font); font-size: 16px; font-weight: 700; color: var(--dark); background: transparent; }
.fun-field input::placeholder { color: #ccc; font-weight: 600; }
.fun-field input[type="date"], .fun-field input[type="time"] { color-scheme: light; cursor: pointer; }
.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

/* ── Buttons ─────────────────────────────────── */
.action-btn { display: flex; align-items: center; justify-content: center; gap: 10px; width: 100%; padding: 18px; border-radius: 18px; border: none; cursor: pointer; font-family: var(--display); font-size: 20px; color: white; margin-top: 14px; box-shadow: 0 6px 24px rgba(0,0,0,0.18), 0 2px 0 rgba(0,0,0,0.15); transition: transform 0.15s, box-shadow 0.15s; }
.action-btn:hover  { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(0,0,0,0.22); }
.action-btn:active { transform: translateY(1px); }
.btn-pink   { background: linear-gradient(135deg, #FF6B9D, #c0392b); }
.btn-blue   { background: linear-gradient(135deg, #4361EE, #7B2FBE); }
.btn-green  { background: linear-gradient(135deg, #06D6A0, #00B4D8); }
.btn-orange { background: linear-gradient(135deg, #FF9A3C, #FF6B9D); }

.dt-label { font-family: var(--display); font-size: 16px; color: white; opacity: 0.9; margin-top: 14px; margin-bottom: -4px; position: relative; z-index: 1; display: flex; align-items: center; gap: 6px; }

/* ── Booking cards ───────────────────────────── */
.booking-card { background: white; border-radius: 20px; padding: 16px 20px; margin-bottom: 14px; box-shadow: 0 4px 18px rgba(0,0,0,0.08); display: flex; align-items: center; gap: 16px; animation: slideUp 0.4s ease both; border-left: 5px solid transparent; transition: transform 0.15s; }
.booking-card:hover { transform: translateY(-2px); }
.booking-card:nth-child(5n+1) { border-color: var(--pink); }
.booking-card:nth-child(5n+2) { border-color: var(--blue); }
.booking-card:nth-child(5n+3) { border-color: var(--green); }
.booking-card:nth-child(5n+4) { border-color: var(--orange); }
.booking-card:nth-child(5n+5) { border-color: var(--teal); }
.booking-icon-wrap  { width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0; }
.booking-info       { flex: 1; min-width: 0; }
.booking-id         { font-family: var(--display); font-size: 13px; color: var(--blue); background: rgba(67,97,238,0.1); display: inline-block; padding: 1px 8px; border-radius: 8px; margin-bottom: 4px; }
.booking-resource   { font-size: 16px; font-weight: 800; color: var(--dark); }
.booking-times      { font-size: 12px; font-weight: 700; color: #888; margin-top: 2px; }
.status-tag         { padding: 5px 12px; border-radius: 12px; font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap; }
.st-confirmed { background: #d4f7ec; color: #06a07a; }
.st-pending   { background: #fff3cd; color: #d97706; }
.st-cancelled { background: #fee2e2; color: #dc2626; }
.st-default   { background: #f0f0f0; color: #888; }

/* ── Empty state ─────────────────────────────── */
.empty-wrap  { text-align: center; padding: 60px 24px; }
.empty-emoji { font-size: 80px; animation: bounce 1.5s ease infinite; }
.empty-title { font-family: var(--display); font-size: 28px; color: var(--dark); margin-top: 16px; }
.empty-sub   { font-size: 15px; font-weight: 700; color: #aaa; margin-top: 6px; }

/* ── Section heading ─────────────────────────── */
.section-heading { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
.section-heading h2 { font-family: var(--display); font-size: 28px; color: var(--dark); }

/* ── Bottom tabs ─────────────────────────────── */
.bottom-tabs { position: fixed; bottom: 0; left: 0; right: 0; display: flex; background: white; border-top: 2px solid #f0f0f0; box-shadow: 0 -4px 20px rgba(0,0,0,0.1); z-index: 50; }
.tab-item { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px 0 12px; cursor: pointer; transition: all 0.2s; }
.tab-emoji { font-size: 22px; transition: transform 0.2s; }
.tab-item.active .tab-emoji { transform: scale(1.25); }
.tab-label { font-size: 10px; font-weight: 800; margin-top: 3px; text-transform: uppercase; letter-spacing: 0.4px; }

/* ── Toast ───────────────────────────────────── */
.toast-wrap { position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%); z-index: 999; display: flex; flex-direction: column; gap: 10px; align-items: center; }
.toast { display: flex; align-items: center; gap: 10px; padding: 14px 24px; border-radius: 50px; font-size: 15px; font-weight: 800; color: white; box-shadow: 0 8px 30px rgba(0,0,0,0.2); animation: pop 0.3s cubic-bezier(.175,.885,.32,1.275) both; white-space: nowrap; }
.toast-success { background: linear-gradient(135deg, #06D6A0, #00B4D8); }
.toast-error   { background: linear-gradient(135deg, #FF6B9D, #c0392b); }

/* ── Confetti ────────────────────────────────── */
.confetti-piece { position: fixed; top: -20px; width: 10px; height: 14px; border-radius: 2px; animation: confetti linear forwards; z-index: 9999; }

@media (max-width: 480px) {
  .two-col { grid-template-columns: 1fr; }
  .splash-title { font-size: 38px; }
  .welcome-title { font-size: 34px; }
}
`;

/* ══════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════ */
function useToast() {
  const [toasts, setToasts] = useState([]);
  const show = (msg, type = "success") => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  };
  return { toasts, show };
}

const CONFETTI_COLORS = ["#FF6B9D","#FF9A3C","#FFD23F","#06D6A0","#4361EE","#7B2FBE","#00B4D8"];
const BG_ICONS = ["🏢","🎯","🚀","🌈","⚡","🎪","🎭","🎨","🌟","🎵"];

function Confetti() {
  const pieces = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    duration: 1.8 + Math.random() * 1.4,
    delay: Math.random() * 0.6,
    rotate: Math.random() * 360,
  }));
  return pieces.map(p => (
    <div key={p.id} className="confetti-piece" style={{
      left: `${p.left}%`, background: p.color,
      animationDuration: `${p.duration}s`, animationDelay: `${p.delay}s`,
      transform: `rotate(${p.rotate}deg)`,
    }} />
  ));
}

function StatusTag({ status }) {
  const s = (status || "").toLowerCase();
  const cls = s === "confirmed" ? "st-confirmed" : s === "pending" ? "st-pending" : s === "cancelled" ? "st-cancelled" : "st-default";
  const emoji = s === "confirmed" ? "✅" : s === "pending" ? "⏳" : s === "cancelled" ? "❌" : "📌";
  return <span className={`status-tag ${cls}`}>{emoji} {status || "—"}</span>;
}

/* ══════════════════════════════════════════════
   APP
══════════════════════════════════════════════ */
function App() {
  const [screen, setScreen] = useState("splash");
  const [activeTab, setActiveTab] = useState("resource");
  const [showConfetti, setShowConfetti] = useState(false);

  // 🔹 Resource state
  const [resource, setResource] = useState({ name: "", location: "", capacity: "" });

  // 🔹 Booking state (with date + time)
  const [booking, setBooking] = useState({
    resourceId: "", startDate: "", startTime: "", endDate: "", endTime: ""
  });

  // 🔹 Booking list
  const [bookings, setBookings] = useState([]);

  const { toasts, show } = useToast();

  useEffect(() => {
    const t = setTimeout(() => setScreen("welcome"), 2500);
    return () => clearTimeout(t);
  }, []);

  // ✅ Fetch bookings
  const fetchBookings = () => {
    axios.get("https://resource-booking-system-production.up.railway.app/booking/all")
      .then(res => setBookings(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    if (screen === "app") fetchBookings();
  }, [screen]);

  // ✅ Add Resource
  const handleAddResource = () => {
    axios.post("http://localhost:8081/booking/addResource", resource)
      .then(() => {
        show("🏢 Resource added!", "success");
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2400);
        setResource({ name: "", location: "", capacity: "" });
      })
      .catch(err => { console.error(err); show("Oops! Something went wrong", "error"); });
  };

  // ✅ Create Booking (combine date + time)
  const handleCreateBooking = () => {
    const finalBooking = {
      resourceId: booking.resourceId,
      startTime: booking.startDate + "T" + booking.startTime,
      endTime:   booking.endDate   + "T" + booking.endTime
    };
    axios.get("https://resource-booking-system-production.up.railway.app/booking/all", finalBooking)
      .then(() => {
        show("🎉 Booking confirmed!", "success");
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2400);
        fetchBookings();
        setActiveTab("bookings");
      })
      .catch(err => { console.error(err); show("Oops! Something went wrong", "error"); });
  };

  const TABS = [
    { key: "resource", emoji: "🏢", label: "Add Space",   color: "#FF6B9D" },
    { key: "booking",  emoji: "📅", label: "Book It",     color: "#4361EE" },
    { key: "bookings", emoji: "✨", label: "My Bookings", color: "#06D6A0" },
  ];
  const activeIdx = TABS.findIndex(t => t.key === activeTab);

  /* ── SPLASH ── */
  if (screen === "splash") return (
    <>
      <style>{CSS}</style>
      <div className="splash">
        <div className="splash-emoji">📅</div>
        <div className="splash-title">BookingDesk</div>
        <div className="splash-sub">Reserve anything, anywhere 🌈</div>
        <div className="splash-loader">
          <div className="splash-dot" /><div className="splash-dot" /><div className="splash-dot" />
        </div>
      </div>
    </>
  );

  /* ── WELCOME ── */
  if (screen === "welcome") return (
    <>
      <style>{CSS}</style>
      <div className="welcome">
        <div className="welcome-blob" style={{ width:300,height:300,background:"#FF6B9D",top:-80,left:-80 }} />
        <div className="welcome-blob" style={{ width:200,height:200,background:"#4361EE",bottom:50,right:-60 }} />
        <div className="welcome-blob" style={{ width:150,height:150,background:"#06D6A0",bottom:-40,left:40 }} />

        <div className="welcome-scene">🎪</div>
        <div className="welcome-title">Welcome to<br/>BookingDesk!</div>
        <div className="welcome-sub">Book rooms, desks & spaces in seconds. Fast, fun & colorful! 🎨</div>

        <div className="feature-pills">
          <span className="feature-pill">🏢 Add Spaces</span>
          <span className="feature-pill">📅 Book Slots</span>
          <span className="feature-pill">✨ Track It All</span>
          <span className="feature-pill">⚡ Super Fast</span>
        </div>

        <button className="big-btn" onClick={() => setScreen("app")}>
          Let's Go! 🚀
        </button>
      </div>
    </>
  );

  /* ── MAIN APP ── */
  return (
    <>
      <style>{CSS}</style>
      {showConfetti && <Confetti />}

      <div className="app-shell">

        <header className="app-header">
          <div className="header-brand">
            <div className="header-logo">📅</div>
            <div className="header-name">BookingDesk</div>
          </div>
          <div className="header-tag">✨ Live</div>
        </header>

        {/* Progress bar */}
        <div className="progress-bar-wrap">
          <div className="progress-bar-fill" style={{
            width: activeTab === "resource" ? "33%" : activeTab === "booking" ? "66%" : "100%",
            background: activeTab === "resource"
              ? "linear-gradient(90deg,#FF6B9D,#FF9A3C)"
              : activeTab === "booking"
              ? "linear-gradient(90deg,#4361EE,#7B2FBE)"
              : "linear-gradient(90deg,#06D6A0,#00B4D8)"
          }} />
        </div>

        {/* Step Nav */}
        <div className="step-nav">
          {TABS.map((tab, i) => (
            <React.Fragment key={tab.key}>
              {i > 0 && <div className={`step-connector ${i <= activeIdx ? "done" : ""}`} />}
              <div
                className={`step-item ${activeTab === tab.key ? "active" : ""} ${i < activeIdx ? "done" : ""}`}
                onClick={() => setActiveTab(tab.key)}
              >
                <div className="step-circle" style={{
                  background: activeTab === tab.key
                    ? `linear-gradient(135deg, ${tab.color}, ${tab.color}99)`
                    : i < activeIdx ? "linear-gradient(135deg,#06D6A0,#00B4D8)" : "#f0f0f0",
                  boxShadow: activeTab === tab.key ? `0 6px 20px ${tab.color}55` : "none",
                  borderColor: activeTab === tab.key ? tab.color : "transparent",
                }}>
                  {i < activeIdx ? "✅" : tab.emoji}
                </div>
                <span className="step-label">{tab.label}</span>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Content */}
        <div key={activeTab} className="step-content">

          {/* ── ADD RESOURCE ── */}
          {activeTab === "resource" && (
            <>
              <div className="section-heading">
                <span style={{ fontSize: 32 }}>🏢</span>
                <h2>Add a Space</h2>
              </div>

              <div className="color-card card-pink">
                <div className="card-emoji">🏢</div>
                <div className="card-title-text">Register Your Space</div>
                <div className="card-sub-text">Add rooms, desks, or any bookable resource</div>

                <div className="fun-field">
                  <label style={{ color: "#FF6B9D" }}>🏷️ Resource Name</label>
                  <input placeholder="e.g. Conference Room A" value={resource.name}
                    onChange={e => setResource({ ...resource, name: e.target.value })} />
                </div>
                <div className="fun-field">
                  <label style={{ color: "#FF9A3C" }}>📍 Location</label>
                  <input placeholder="e.g. Floor 3, East Wing" value={resource.location}
                    onChange={e => setResource({ ...resource, location: e.target.value })} />
                </div>
                <div className="fun-field">
                  <label style={{ color: "#7B2FBE" }}>👥 Capacity</label>
                  <input placeholder="e.g. 20 people" value={resource.capacity}
                    onChange={e => setResource({ ...resource, capacity: e.target.value })} />
                </div>
              </div>

              <button className="action-btn btn-pink" onClick={handleAddResource}>
                🚀 Add This Space!
              </button>
              <button className="action-btn btn-blue" onClick={() => setActiveTab("booking")}>
                Next: Book a Slot →
              </button>
            </>
          )}

          {/* ── CREATE BOOKING ── */}
          {activeTab === "booking" && (
            <>
              <div className="section-heading">
                <span style={{ fontSize: 32 }}>📅</span>
                <h2>Book a Slot</h2>
              </div>

              <div className="color-card card-blue">
                <div className="card-emoji">🎯</div>
                <div className="card-title-text">Pick Your Time</div>
                <div className="card-sub-text">Choose a resource and lock in your window</div>

                <div className="fun-field">
                  <label style={{ color: "#4361EE" }}>🔑 Resource ID</label>
                  <input placeholder="Enter resource ID" value={booking.resourceId}
                    onChange={e => setBooking({ ...booking, resourceId: e.target.value })} />
                </div>

                <div className="dt-label">🟢 Start Window</div>
                <div className="two-col">
                  <div className="fun-field">
                    <label style={{ color: "#06D6A0" }}>📆 Start Date</label>
                    <input type="date" value={booking.startDate}
                      onChange={e => setBooking({ ...booking, startDate: e.target.value })} />
                  </div>
                  <div className="fun-field">
                    <label style={{ color: "#00B4D8" }}>⏰ Start Time</label>
                    <input type="time" value={booking.startTime}
                      onChange={e => setBooking({ ...booking, startTime: e.target.value })} />
                  </div>
                </div>

                <div className="dt-label">🔴 End Window</div>
                <div className="two-col">
                  <div className="fun-field">
                    <label style={{ color: "#FF9A3C" }}>📆 End Date</label>
                    <input type="date" value={booking.endDate}
                      onChange={e => setBooking({ ...booking, endDate: e.target.value })} />
                  </div>
                  <div className="fun-field">
                    <label style={{ color: "#FF6B9D" }}>⏰ End Time</label>
                    <input type="time" value={booking.endTime}
                      onChange={e => setBooking({ ...booking, endTime: e.target.value })} />
                  </div>
                </div>
              </div>

              <button className="action-btn btn-green" onClick={handleCreateBooking}>
                🎉 Confirm Booking!
              </button>
              <button className="action-btn btn-orange" onClick={() => setActiveTab("bookings")}>
                View All Bookings ✨
              </button>
            </>
          )}

          {/* ── ALL BOOKINGS ── */}
          {activeTab === "bookings" && (
            <>
              <div className="section-heading">
                <span style={{ fontSize: 32 }}>✨</span>
                <h2>My Bookings</h2>
                <span style={{ marginLeft:"auto", background:"linear-gradient(135deg,#06D6A0,#00B4D8)", color:"white", borderRadius:50, padding:"4px 14px", fontSize:13, fontWeight:800 }}>
                  {bookings.length} total
                </span>
              </div>

              {bookings.length === 0 ? (
                <div className="empty-wrap">
                  <div className="empty-emoji">📭</div>
                  <div className="empty-title">No bookings yet!</div>
                  <div className="empty-sub">Go book something awesome 🚀</div>
                  <button className="action-btn btn-blue" style={{ marginTop: 24 }} onClick={() => setActiveTab("booking")}>
                    Create First Booking 🎯
                  </button>
                </div>
              ) : (
                bookings.map((b, i) => {
                  const iconBgs = ["#FF6B9D22","#4361EE22","#06D6A022","#FF9A3C22","#00B4D822"];
                  return (
                    <div className="booking-card" key={i} style={{ animationDelay: `${i * 0.05}s` }}>
                      <div className="booking-icon-wrap" style={{ background: iconBgs[i % 5] }}>
                        <span style={{ fontSize: 26 }}>{BG_ICONS[i % BG_ICONS.length]}</span>
                      </div>
                      <div className="booking-info">
                        <div className="booking-id">#{b.id}</div>
                        <div className="booking-resource">Resource {b.resourceId}</div>
                        <div className="booking-times">
                          🟢 {b.startTime.split("T")[0]} {b.startTime.split("T")[1].substring(0,5)}
                          &nbsp;→&nbsp;
                          🔴 {b.endTime.split("T")[0]} {b.endTime.split("T")[1].substring(0,5)}
                        </div>
                      </div>
                      <StatusTag status={b.status} />
                    </div>
                  );
                })
              )}
            </>
          )}
        </div>

        {/* Bottom Tabs */}
        <nav className="bottom-tabs">
          {TABS.map(tab => (
            <div key={tab.key}
              className={`tab-item ${activeTab === tab.key ? "active" : ""}`}
              onClick={() => setActiveTab(tab.key)}
              style={{ color: activeTab === tab.key ? tab.color : "#aaa" }}
            >
              <div className="tab-emoji">{tab.emoji}</div>
              <div className="tab-label" style={{ color: activeTab === tab.key ? tab.color : "#aaa" }}>
                {tab.label}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Toasts */}
      <div className="toast-wrap">
        {toasts.map(t => (
          <div key={t.id} className={`toast toast-${t.type}`}>{t.msg}</div>
        ))}
      </div>
    </>
  );
}

export default App;