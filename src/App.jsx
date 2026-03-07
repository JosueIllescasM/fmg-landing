import { useState, useEffect, useRef } from "react";
import { logoColor, logoWhite } from "./assets/logos.js";

// ─── NOISE OVERLAY ────────────────────────────────────────────────────────────
function NoiseOverlay() {
  return (
    <svg style={{position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:9999,opacity:0.035}} xmlns="http://www.w3.org/2000/svg">
      <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
      <rect width="100%" height="100%" filter="url(#noise)"/>
    </svg>
  );
}

// ─── TYPEWRITER ───────────────────────────────────────────────────────────────
const MSGS = [
  "Analizando consumo energético del edificio…",
  "Optimizando turnos de mantenimiento preventivo…",
  "Generando reporte financiero mensual…",
  "Sincronizando módulo ERP FMG…",
  "Detectando incidencia en ascensor 3…",
  "Ajustando presupuesto operativo Q4…",
  "Verificando cumplimiento ISO 41000…",
];

function Typewriter() {
  const [mi, setMi] = useState(0);
  const [txt, setTxt] = useState("");
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = MSGS[mi];
    if (!del && ci < cur.length) {
      const t = setTimeout(() => { setTxt(cur.slice(0, ci + 1)); setCi(c => c + 1); }, 42);
      return () => clearTimeout(t);
    }
    if (!del && ci === cur.length) { const t = setTimeout(() => setDel(true), 2000); return () => clearTimeout(t); }
    if (del && ci > 0) { const t = setTimeout(() => { setTxt(cur.slice(0, ci - 1)); setCi(c => c - 1); }, 20); return () => clearTimeout(t); }
    if (del && ci === 0) { setDel(false); setMi(i => (i + 1) % MSGS.length); }
  }, [ci, del, mi]);
  return (
    <div style={{ fontFamily: "'Courier New',monospace", fontSize: "0.8rem", color: "#a8c8a0", letterSpacing: "0.03em", lineHeight: 1.5 }}>
      <span style={{ color: "#4a7c59", marginRight: "6px" }}>▶</span>{txt}
      <span style={{ display: "inline-block", width: "2px", height: "1em", background: "#c17b4e", marginLeft: "3px", verticalAlign: "middle", animation: "blink 1s step-end infinite" }} />
    </div>
  );
}

// ─── DIAGNOSTIC CARDS ─────────────────────────────────────────────────────────
const DIAG = [
  { label: "Reducción de costos", value: "23%", sub: "en el primer trimestre" },
  { label: "Respuesta a incidencias", value: "< 2h", sub: "tiempo promedio de resolución" },
  { label: "Satisfacción residentes", value: "97%", sub: "según encuesta Q3 2024" },
];
function DiagCards() {
  const [a, setA] = useState(0);
  useEffect(() => { const t = setInterval(() => setA(x => (x + 1) % 3), 3200); return () => clearInterval(t); }, []);
  return (
    <div style={{ position: "relative", height: "150px" }}>
      {DIAG.map((c, i) => {
        const n = ((i - a + 3) % 3);
        return (
          <div key={i} style={{ position: "absolute", top: 0, left: 0, right: 0, background: "#fff", borderRadius: "1.25rem", padding: "1.4rem 1.6rem", transform: `translateY(${n === 0 ? 0 : n === 1 ? -10 : -20}px) scale(${n === 0 ? 1 : n === 1 ? .96 : .92})`, opacity: n === 0 ? 1 : n === 1 ? .55 : .25, zIndex: n === 0 ? 3 : n === 1 ? 2 : 1, transition: "all 0.65s cubic-bezier(0.34,1.56,0.64,1)", boxShadow: "0 8px 28px rgba(0,0,0,0.07)" }}>
            <div style={{ fontSize: "0.66rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#4a7c59", marginBottom: "0.3rem" }}>{c.label}</div>
            <div style={{ fontSize: "2rem", fontWeight: 800, color: "#1A1A1A", lineHeight: 1 }}>{c.value}</div>
            <div style={{ fontSize: "0.73rem", color: "#999", marginTop: "0.3rem" }}>{c.sub}</div>
          </div>
        );
      })}
    </div>
  );
}

// ─── CALENDAR FEATURE ─────────────────────────────────────────────────────────
function CalFeature() {
  const days = ["L", "M", "X", "J", "V", "S", "D"];
  const [sel, setSel] = useState(null);
  const [saved, setSaved] = useState(false);
  const [cur, setCur] = useState({ x: -40, y: -40 });
  const [clicking, setClicking] = useState(false);
  useEffect(() => {
    let step = 0;
    const seq = [
      { x: 110, y: 38, ms: 900 },
      { x: 110, y: 38, ms: 350, fn: () => { setClicking(true); setTimeout(() => setClicking(false), 180); setSel(3); } },
      { x: 185, y: 105, ms: 950 },
      { x: 185, y: 105, ms: 320, fn: () => { setClicking(true); setTimeout(() => setClicking(false), 180); setSaved(true); } },
      { x: -40, y: -40, ms: 2200, fn: () => { setSel(null); setSaved(false); } },
    ];
    const go = () => {
      if (step >= seq.length) step = 0;
      const s = seq[step];
      setTimeout(() => { if (s.x !== -40) setCur({ x: s.x, y: s.y }); if (s.fn) s.fn(); step++; go(); }, s.ms);
    };
    const t = setTimeout(go, 1400);
    return () => clearTimeout(t);
  }, []);
  return (
    <div style={{ position: "relative", background: "#f5f5f2", borderRadius: "1.4rem", padding: "1.4rem", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: cur.x, top: cur.y, zIndex: 10, pointerEvents: "none", transition: "all 0.55s cubic-bezier(0.25,0.46,0.45,0.94)", transform: clicking ? "scale(0.82)" : "scale(1)" }}>
        <svg width="18" height="20" viewBox="0 0 18 20" fill="none"><path d="M1 1L17 9L9 11L7 19L1 1Z" fill="#4a7c59" stroke="white" strokeWidth="1.2" /></svg>
      </div>
      <div style={{ fontSize: "0.64rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#4a7c59", marginBottom: "0.9rem" }}>Agenda tu reunión</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "5px", marginBottom: "0.9rem" }}>
        {days.map((d, i) => (
          <div key={i} style={{ aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "0.4rem", fontSize: "0.73rem", fontWeight: 600, background: sel === i ? "#4a7c59" : "#fff", color: sel === i ? "#fff" : "#1A1A1A", transition: "all 0.2s ease" }}>{d}</div>
        ))}
      </div>
      <div style={{ padding: "0.55rem", borderRadius: "0.65rem", textAlign: "center", background: saved ? "#4a7c59" : "#1A1A1A", color: "#fff", fontSize: "0.73rem", fontWeight: 600, transition: "all 0.3s ease" }}>
        {saved ? "✓ Confirmado" : "Guardar sesión"}
      </div>
    </div>
  );
}

// ─── CANVAS ANIMATIONS ────────────────────────────────────────────────────────
function Waveform() {
  const r = useRef(null);
  useEffect(() => {
    const c = r.current; if (!c) return; const ctx = c.getContext("2d"); let f = 0;
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height); ctx.beginPath(); ctx.strokeStyle = "#4a7c59"; ctx.lineWidth = 2;
      for (let i = 0; i <= 120; i++) { const x = (i / 120) * c.width; const y = c.height / 2 + Math.sin((i / 120) * Math.PI * 6 + f * 0.06) * 16 * Math.exp(-Math.pow((i / 120 - 0.5), 2) * 4) + Math.sin((i / 120) * Math.PI * 14 + f * 0.1) * 4; i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); }
      ctx.stroke(); f++; requestAnimationFrame(draw);
    };
    draw();
  }, []);
  return <canvas ref={r} width={260} height={56} style={{ width: "100%", height: "auto" }} />;
}
function Helix() {
  const r = useRef(null);
  useEffect(() => {
    const c = r.current; const ctx = c.getContext("2d"); let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height); const cx = c.width / 2;
      ctx.strokeStyle = "#4a7c59"; ctx.lineWidth = 2; ctx.beginPath();
      for (let i = 0; i < 60; i++) { const a = (i / 60) * Math.PI * 4 + t; const x = cx + Math.cos(a) * 26, y = 10 + (i / 60) * 80; i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); }
      ctx.stroke(); ctx.strokeStyle = "rgba(74,124,89,0.3)"; ctx.lineWidth = 1; ctx.beginPath();
      for (let i = 0; i < 60; i++) { const a = (i / 60) * Math.PI * 4 + t + Math.PI; const x = cx + Math.cos(a) * 26, y = 10 + (i / 60) * 80; i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); }
      ctx.stroke(); t += 0.013; requestAnimationFrame(draw);
    };
    draw();
  }, []);
  return <canvas ref={r} width={72} height={100} style={{ width: "72px", height: "100px" }} />;
}
function LaserGrid() {
  const r = useRef(null);
  useEffect(() => {
    const c = r.current; const ctx = c.getContext("2d"); let sy = 0;
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height); const cols = 8, rows = 6, cw = c.width / cols, ch = c.height / rows;
      ctx.strokeStyle = "rgba(74,124,89,0.18)"; ctx.lineWidth = 0.5;
      for (let i = 0; i <= cols; i++) { ctx.beginPath(); ctx.moveTo(i * cw, 0); ctx.lineTo(i * cw, c.height); ctx.stroke(); }
      for (let j = 0; j <= rows; j++) { ctx.beginPath(); ctx.moveTo(0, j * ch); ctx.lineTo(c.width, j * ch); ctx.stroke(); }
      const g = ctx.createLinearGradient(0, sy - 18, 0, sy + 18);
      g.addColorStop(0, "rgba(74,124,89,0)"); g.addColorStop(0.5, "rgba(74,124,89,0.55)"); g.addColorStop(1, "rgba(74,124,89,0)");
      ctx.fillStyle = g; ctx.fillRect(0, sy - 18, c.width, 36); sy = (sy + 1.3) % c.height; requestAnimationFrame(draw);
    };
    draw();
  }, []);
  return <canvas ref={r} width={260} height={110} style={{ width: "100%", height: "auto" }} />;
}

// ─── STACK CARD ───────────────────────────────────────────────────────────────
function StackCard({ idx, active, children, bg, label }) {
  const past = idx < active;
  return (
    <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", zIndex: idx + 1, transform: past ? "scale(0.91)" : "scale(1)", filter: past ? "blur(2px)" : "none", opacity: past ? 0.45 : 1, transition: "all 0.55s cubic-bezier(0.25,0.46,0.45,0.94)" }}>
      <div style={{ background: bg, borderRadius: "2.5rem", width: "88%", maxWidth: "860px", padding: "3.5rem", minHeight: "58vh", boxShadow: "0 28px 70px rgba(0,0,0,0.28)" }}>
        <div style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.16em", color: "rgba(255,255,255,0.38)", marginBottom: "1rem" }}>
          {String(idx + 1).padStart(2, "0")} / 03 — {label}
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── HAPPINESS CLUB BADGE ─────────────────────────────────────────────────────
function HappinessBadge() {
  const [open, setOpen] = useState(false);
  const [pulse, setPulse] = useState(false);

  // Paleta FMG
  const GN = "#4a7c59";
  const DG = "#86BC25";
  const CB = "#1A1A1A";

  const DIMS = [
    { label: "Wellness", desc: "Bienestar integral del equipo" },
    { label: "Engagement", desc: "Compromiso y cultura" },
    { label: "Personal Worth", desc: "Valor y desarrollo personal" },
    { label: "Sustainability", desc: "Impacto sostenible" },
  ];

  useEffect(() => {
    const t = setInterval(() => { setPulse(true); setTimeout(() => setPulse(false), 700); }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {/* ── Floating badge — usa colores FMG ── */}
      <div
        onClick={() => setOpen(true)}
        style={{
          position: "fixed", bottom: "2rem", right: "2rem", zIndex: 800,
          background: CB,
          borderRadius: "1.2rem",
          padding: "0.75rem 1.1rem",
          border: `1px solid ${GN}55`,
          boxShadow: pulse
            ? `0 0 0 5px ${GN}18, 0 16px 48px rgba(0,0,0,0.35)`
            : "0 8px 32px rgba(0,0,0,0.28)",
          cursor: "pointer",
          display: "flex", alignItems: "center", gap: "0.75rem",
          transition: "all 0.3s ease",
          userSelect: "none",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 20px 48px rgba(0,0,0,0.38), 0 0 0 1px ${GN}44`; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.28)"; }}
      >
        {/* HC monogram — verde FMG */}
        <div style={{
          width: "38px", height: "38px", borderRadius: "0.65rem", flexShrink: 0,
          background: `linear-gradient(135deg,${GN},#2d5a3d)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 4px 12px ${GN}55`,
        }}>
          <span style={{ fontSize: "0.75rem", fontWeight: 900, color: "#fff", letterSpacing: "0.02em" }}>HC</span>
        </div>
        <div>
          <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>Happiness Club</div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", marginTop: "0.1rem" }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: DG, display: "inline-block" }} />
            <span style={{ fontSize: "0.6rem", fontWeight: 800, color: DG, letterSpacing: "0.1em", textTransform: "uppercase" }}>Miembro Black</span>
          </div>
        </div>
      </div>

      {/* ── Modal certificado — paleta FMG ── */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(26,26,26,0.88)", backdropFilter: "blur(14px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: "relative", width: "100%", maxWidth: "420px",
              background: "#111a14",
              borderRadius: "1.75rem", overflow: "hidden",
              border: `1px solid ${GN}40`,
              boxShadow: `0 0 0 1px ${DG}15, 0 40px 80px rgba(0,0,0,0.6)`,
            }}
          >
            {/* Barra superior verde lima */}
            <div style={{ height: "3px", background: `linear-gradient(90deg,transparent,${DG},${GN},${DG},transparent)` }} />

            <div style={{ padding: "2rem 2rem 1.75rem" }}>
              {/* Cerrar */}
              <button onClick={() => setOpen(false)} style={{ position: "absolute", top: "1rem", right: "1rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "50%", width: "28px", height: "28px", cursor: "pointer", color: "rgba(255,255,255,0.45)", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>

              {/* Header */}
              <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <div style={{ fontSize: "0.55rem", textTransform: "uppercase", letterSpacing: "0.2em", color: `${DG}88`, marginBottom: "1.1rem" }}>Certificado oficial de membresía</div>

                {/* Ícono HC grande */}
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
                  <div style={{
                    width: "72px", height: "72px", borderRadius: "1.2rem",
                    background: `linear-gradient(135deg,${GN},#2d5a3d)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: `0 8px 28px ${GN}50`,
                    border: `1px solid ${GN}60`,
                  }}>
                    <span style={{ fontSize: "1.5rem", fontWeight: 900, color: "#fff", letterSpacing: "0.02em" }}>HC</span>
                  </div>
                </div>

                <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.01em" }}>Happiness Club</div>

                {/* Pill BLACK */}
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", marginTop: "0.55rem", background: `${DG}18`, borderRadius: "100px", padding: "0.3rem 0.85rem", border: `1px solid ${DG}35` }}>
                  <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: DG, display: "inline-block" }} />
                  <span style={{ fontSize: "0.63rem", fontWeight: 800, color: DG, letterSpacing: "0.12em", textTransform: "uppercase" }}>Miembro Black</span>
                </div>
              </div>

              {/* Divisor */}
              <div style={{ height: "1px", background: `linear-gradient(90deg,transparent,${GN}50,transparent)`, marginBottom: "1.3rem" }} />

              {/* Miembro */}
              <div style={{ textAlign: "center", marginBottom: "1.3rem", background: `${GN}12`, borderRadius: "1rem", padding: "1rem", border: `1px solid ${GN}20` }}>
                <div style={{ fontSize: "0.58rem", textTransform: "uppercase", letterSpacing: "0.14em", color: `${DG}70`, marginBottom: "0.4rem" }}>Otorgado a</div>
                <div style={{ fontSize: "1rem", fontWeight: 800, color: "#fff" }}>Facilities Management</div>
                <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", marginTop: "0.1rem" }}>de Guatemala S.A.</div>
              </div>

              {/* 4 Dimensiones */}
              <div style={{ marginBottom: "1.3rem" }}>
                <div style={{ fontSize: "0.55rem", textTransform: "uppercase", letterSpacing: "0.16em", color: "rgba(255,255,255,0.3)", marginBottom: "0.65rem", textAlign: "center" }}>Certificación en 4 dimensiones</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                  {DIMS.map((d) => (
                    <div key={d.label} style={{ padding: "0.75rem 0.9rem", borderRadius: "0.75rem", background: `${GN}0f`, border: `1px solid ${GN}28`, position: "relative", overflow: "hidden" }}>
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg,${DG},${GN})` }} />
                      <div style={{ fontSize: "0.73rem", fontWeight: 700, color: "#fff", marginBottom: "0.2rem" }}>{d.label}</div>
                      <div style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.4 }}>{d.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div style={{ height: "1px", background: `linear-gradient(90deg,transparent,${GN}30,transparent)`, marginBottom: "1rem" }} />
              <div style={{ textAlign: "center", fontSize: "0.53rem", textTransform: "uppercase", letterSpacing: "0.14em", color: "rgba(255,255,255,0.2)" }}>
                Certificación vigente · Guatemala {new Date().getFullYear()}
              </div>
            </div>

            {/* Barra inferior */}
            <div style={{ height: "3px", background: `linear-gradient(90deg,transparent,${GN},${DG},${GN},transparent)` }} />
          </div>
        </div>
      )}
    </>
  );
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { building: "Edificio Azores", zone: "Zona 15", quote: "La transformación fue inmediata. FMG redujo nuestros costos de mantenimiento un 28% en el primer año. La comunicación con propietarios es ahora completamente transparente.", name: "Junta Directiva", role: "Edificio Azores" },
  { building: "Edificio Alena", zone: "Zona 15", quote: "Teníamos problemas serios con proveedores y morosidad. FMG implementó un sistema que resolvió ambos en menos de 90 días. Hoy operamos con estándares internacionales.", name: "Junta de Copropietarios", role: "Edificio Alena" },
  { building: "Viaggio Muxbal", zone: "Ctra. a El Salvador", quote: "La metodología 52WPPM nos dio visibilidad total sobre cada gasto operativo. Por primera vez en años, la asamblea aprobó el presupuesto por unanimidad.", name: "Comité Ejecutivo", role: "Viaggio Muxbal" },
  { building: "Edificio Esenta", zone: "Zona 12", quote: "FMG identificó oportunidades de eficiencia energética que no habíamos contemplado. Su asesoría estratégica va mucho más allá de la administración convencional.", name: "Junta Directiva", role: "Edificio Esenta" },
  { building: "Andares Doce", zone: "Zona 12", quote: "La aplicación del ISO 41000 nos dio confianza de que nuestro activo está gestionado con estándares de clase mundial. Los reportes son claros y accionables.", name: "Directorio Ejecutivo", role: "Andares Doce" },
  { building: "Centro Vivo", zone: "Zona 1", quote: "Administrar un edificio mixto en el centro histórico requiere experiencia y sensibilidad. FMG ha demostrado tener ambas, con resultados que superan nuestras expectativas.", name: "Comité de Administración", role: "Centro Vivo" },
  { building: "Laureles San Isidro", zone: "San Isidro", quote: "La atención es excepcional. Respuesta a cualquier incidencia en menos de 2 horas y reportes financieros mensuales que son modelos de claridad.", name: "Junta de Propietarios", role: "Laureles San Isidro" },
  { building: "Dante Kanajuyu", zone: "Kanajuyu", quote: "Desde que FMG tomó la administración, el valor de nuestras unidades aumentó. Una gestión profesional se refleja directamente en la plusvalía del inmueble.", name: "Asamblea de Propietarios", role: "Dante Kanajuyu" },
  { building: "Torre Seis", zone: "Zona 6", quote: "FMG nos asesoró en el plan operativo antes de la entrega del edificio. Esa visión de largo plazo nos permitió arrancar con sistemas sólidos desde el primer día.", name: "Desarrolladores y Junta", role: "Torre Seis" },
];

const ISO_ITEMS = [
  { code: "ISO 22301", title: "Continuidad de operaciones", desc: "Planes de continuidad operativa ante crisis. Los servicios esenciales del edificio nunca se interrumpen, sin importar el evento." },
  { code: "ISO 31000", title: "Gestión de Riesgos", desc: "Marco para identificar, evaluar y mitigar riesgos operativos, financieros y de seguridad en cada propiedad administrada." },
  { code: "ISO 41000", title: "Facilities Management", desc: "El único estándar internacional diseñado específicamente para nuestra industria. El referente global de buenas prácticas." },
  { code: "ISO 20000", title: "Gestión de Servicios", desc: "Todos los servicios operativos se entregan con niveles de disponibilidad, calidad y continuidad garantizados formalmente." },
  { code: "ISO 55000", title: "Gestión de Activos", desc: "Maximizamos el valor de los activos físicos a lo largo de todo su ciclo de vida, desde mantenimiento hasta renovación estratégica." },
];

const SERVICES = [
  { title: "Administración integral", desc: "Gestión completa de operaciones diarias, personal, proveedores y presupuesto con reporting ejecutivo y transparencia total.", accent: "#4a7c59", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg> },
  { title: "Mantenimiento preventivo", desc: "Programas estructurados que extienden la vida útil de los activos y reducen costos de emergencia hasta en un 40%.", accent: "#3a6b4a", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg> },
  { title: "Reporting ejecutivo", desc: "Informes financieros y operativos mensuales con estándares contables internacionales y dashboards en tiempo real.", accent: "#2d5c3f", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg> },
  { title: "Seguridad y protocolos", desc: "Diseño e implementación de protocolos de acceso, emergencia y seguridad perimetral para comunidades de alto nivel.", accent: "#4a7c59", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></svg> },
  { title: "Eficiencia energética", desc: "Auditorías de consumo y planes de optimización certificados que reducen el gasto en servicios hasta un 30% en el primer año.", accent: "#3a6b4a", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg> },
  { title: "Gestión de comunidades", desc: "Mediación profesional, asambleas de propietarios, gestión de conflictos y comunicación institucional oportuna.", accent: "#2d5c3f", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg> },
];

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [navScrolled, setNavScrolled] = useState(false);
  const [heroVis, setHeroVis] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const [tIdx, setTIdx] = useState(0);
  const [hovSvc, setHovSvc] = useState(null);
  const stackRef = useRef(null);
  const secServicios = useRef(null);
  const secMetodologia = useRef(null);
  const secClientes = useRef(null);
  const secContacto = useRef(null);

  const GN = "#4a7c59", DG = "#86BC25", CB = "#1A1A1A";

  useEffect(() => {
    setTimeout(() => setHeroVis(true), 120);
    const fn = () => {
      const y = window.scrollY; setScrollY(y); setNavScrolled(y > 70);
      if (stackRef.current) {
        const rect = stackRef.current.getBoundingClientRect();
        const total = stackRef.current.offsetHeight - window.innerHeight;
        const prog = Math.max(0, Math.min(1, -rect.top / total));
        setActiveCard(Math.floor(prog * 3));
      }
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { const t = setInterval(() => setTIdx(i => (i + 1) % TESTIMONIALS.length), 4800); return () => clearInterval(t); }, []);

  const go = ref => ref.current?.scrollIntoView({ behavior: "smooth" });

  const F0 = { opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(28px)", transition: "all 0.9s 0.1s cubic-bezier(0.25,0.46,0.45,0.94)" };
  const F1 = { ...F0, transition: "all 0.9s 0.3s cubic-bezier(0.25,0.46,0.45,0.94)" };
  const F2 = { ...F0, transition: "all 0.9s 0.55s cubic-bezier(0.25,0.46,0.45,0.94)" };
  const F3 = { ...F0, transition: "all 0.9s 0.8s cubic-bezier(0.25,0.46,0.45,0.94)" };

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans','Segoe UI',system-ui,sans-serif", background: "#fafaf8", color: CB, overflowX: "hidden" }}>
      <NoiseOverlay />
      <HappinessBadge goContact={() => go(secContacto)} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,600;0,700;0,800;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400;1,600&family=JetBrains+Mono:wght@400;500&display=swap');
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes pdot{0%,100%{transform:scale(1)}50%{transform:scale(1.7);opacity:0.4}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
        @keyframes kb{from{transform:scale(1)}to{transform:scale(1.065)}}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        *{box-sizing:border-box;margin:0;padding:0;}
        body{overflow-x:hidden;}
        .btn{position:relative;overflow:hidden;transition:transform 0.25s ease,box-shadow 0.25s ease;}
        .btn::after{content:'';position:absolute;inset:0;background:rgba(255,255,255,0.14);transform:translateX(-110%);transition:transform 0.4s ease;}
        .btn:hover{transform:scale(1.04);}
        .btn:hover::after{transform:translateX(0);}
        .scard{transition:transform 0.3s ease,box-shadow 0.3s ease;}
        .scard:hover{transform:translateY(-6px);box-shadow:0 24px 56px rgba(74,124,89,0.15)!important;}
        .iso-c{transition:background 0.25s,border-color 0.25s;}
        .iso-c:hover{background:#f0f8f2!important;border-color:#4a7c59!important;}
        input{outline:none;font-family:inherit;transition:border 0.2s;}
        input:focus{border-color:#4a7c59!important;}
        .erptag{background:linear-gradient(90deg,#86BC25,#4a7c59,#86BC25);background-size:200% auto;animation:shimmer 3s linear infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
      `}</style>

      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: "1.1rem", left: "50%", transform: "translateX(-50%)", zIndex: 1000, width: "min(940px,91vw)", background: navScrolled ? "rgba(255,255,255,0.92)" : "transparent", backdropFilter: navScrolled ? "blur(18px) saturate(1.6)" : "none", borderRadius: "100px", border: navScrolled ? "1px solid rgba(74,124,89,0.14)" : "1px solid transparent", boxShadow: navScrolled ? "0 6px 36px rgba(0,0,0,0.09)" : "none", transition: "all 0.45s ease", padding: "0.65rem 1.4rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={navScrolled ? logoColor : logoWhite} alt="FMG" style={{ height: "28px", width: "auto", objectFit: "contain", transition: "opacity 0.3s" }} />
        </div>
        <div style={{ display: "flex", gap: "1.6rem", alignItems: "center" }}>
          {[["Servicios", secServicios], ["Metodología", secMetodologia], ["Clientes", secClientes], ["Contacto", secContacto]].map(([l, r]) => (
            <button key={l} onClick={() => go(r)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.77rem", fontWeight: 500, color: navScrolled ? CB : "rgba(255,255,255,0.85)", transition: "color 0.3s", letterSpacing: "0.01em" }}>{l}</button>
          ))}
          <button className="btn" onClick={() => go(secContacto)} style={{ background: GN, color: "#fff", border: "none", cursor: "pointer", padding: "0.5rem 1.1rem", borderRadius: "100px", fontSize: "0.74rem", fontWeight: 600, letterSpacing: "0.02em" }}>
            Reservar reunión
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ position: "relative", height: "100vh", overflow: "hidden", display: "flex", alignItems: "flex-end", minHeight: "600px" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80')", backgroundSize: "cover", backgroundPosition: "center 30%", animation: "kb 22s ease-in-out infinite alternate" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(155deg,rgba(26,26,26,0.15) 0%,rgba(74,124,89,0.28) 35%,rgba(26,26,26,0.93) 100%)" }} />
        <div style={{ position: "relative", padding: "0 5vw 7vh", maxWidth: "860px", width: "100%" }}>
          <div style={F0}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", background: "rgba(255,255,255,0.09)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.13)", borderRadius: "100px", padding: "0.32rem 0.85rem 0.32rem 0.45rem", marginBottom: "1.8rem" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: DG, display: "inline-block", animation: "pdot 2s ease infinite" }} />
              <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.78)", letterSpacing: "0.09em", textTransform: "uppercase" }}>Facilities Management · Guatemala</span>
            </div>
          </div>
          <div style={F1}>
            <h1 style={{ color: "#fff", lineHeight: 1.04, marginBottom: "0.15rem" }}>
              <span style={{ display: "block", fontSize: "clamp(2.6rem,5.5vw,5rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>Gestión que</span>
              <span style={{ display: "block", fontSize: "clamp(3.2rem,7vw,6.5rem)", fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontWeight: 300, letterSpacing: "-0.01em", color: "rgba(255,255,255,0.93)" }}>transforma edificios</span>
              <span style={{ display: "block", fontSize: "clamp(2.6rem,5.5vw,5rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>en activos.</span>
            </h1>
          </div>
          <div style={{ ...F2, marginTop: "1.8rem", display: "flex", alignItems: "flex-start", gap: "1.5rem", flexWrap: "wrap" }}>
            <p style={{ color: "rgba(255,255,255,0.58)", fontSize: "0.92rem", maxWidth: "440px", lineHeight: 1.75 }}>Administración de edificios y condominios con estándares de consultoría internacional. Precisión operativa, transparencia total, rentabilidad medible.</p>
            <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap" }}>
              <button className="btn" onClick={() => go(secContacto)} style={{ background: GN, color: "#fff", border: "none", cursor: "pointer", padding: "0.85rem 1.9rem", borderRadius: "100px", fontSize: "0.86rem", fontWeight: 700, boxShadow: "0 8px 30px rgba(74,124,89,0.42)" }}>Reservar meet de 15 min →</button>
              <button onClick={() => go(secMetodologia)} style={{ background: "rgba(255,255,255,0.09)", color: "#fff", border: "1px solid rgba(255,255,255,0.22)", cursor: "pointer", padding: "0.85rem 1.7rem", borderRadius: "100px", fontSize: "0.86rem", fontWeight: 500, backdropFilter: "blur(8px)" }}>Ver metodología</button>
            </div>
          </div>
          <div style={{ ...F3, marginTop: "2.8rem", display: "flex", gap: "2.8rem", flexWrap: "wrap" }}>
            {[["9", "Proyectos activos"], ["15+", "Años de trayectoria"], ["Q350M+", "En activos gestionados"]].map(([v, l]) => (
              <div key={v}>
                <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>{v}</div>
                <div style={{ fontSize: "0.66rem", color: "rgba(255,255,255,0.42)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.2rem" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "2rem", right: "5vw", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.45rem", animation: "float 3s ease infinite" }}>
          <div style={{ width: "1px", height: "44px", background: "linear-gradient(to bottom,transparent,rgba(255,255,255,0.35))" }} />
          <span style={{ fontSize: "0.58rem", color: "rgba(255,255,255,0.28)", textTransform: "uppercase", letterSpacing: "0.15em", writingMode: "vertical-rl" }}>Scroll</span>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: "7rem 5vw", background: "#fafaf8" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <div style={{ marginBottom: "3.5rem" }}>
            <div style={{ fontSize: "0.66rem", textTransform: "uppercase", letterSpacing: "0.15em", color: GN, marginBottom: "0.9rem" }}>Plataforma operativa</div>
            <h2 style={{ fontSize: "clamp(1.8rem,3.8vw,3.2rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 }}>No administramos edificios.{" "}<span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontWeight: 300, fontSize: "1.06em" }}>Orquestamos sistemas.</span></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.4rem" }}>
            <div style={{ background: "#fff", borderRadius: "1.8rem", padding: "1.9rem", boxShadow: "0 4px 22px rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: "0.63rem", textTransform: "uppercase", letterSpacing: "0.12em", color: GN, marginBottom: "1.4rem" }}>01 — Diagnóstico ejecutivo</div>
              <DiagCards />
            </div>
            <div style={{ background: CB, borderRadius: "1.8rem", padding: "1.9rem", boxShadow: "0 4px 22px rgba(0,0,0,0.16)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", marginBottom: "1.3rem" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: DG, display: "inline-block", animation: "pdot 1.5s ease infinite" }} />
                <span style={{ fontSize: "0.63rem", color: "rgba(255,255,255,0.38)", textTransform: "uppercase", letterSpacing: "0.1em" }}>En vivo</span>
              </div>
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "0.9rem", padding: "1.3rem", border: "1px solid rgba(255,255,255,0.06)", minHeight: "72px", display: "flex", alignItems: "center", marginBottom: "1.3rem" }}><Typewriter /></div>
              <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap" }}>
                {["Mantenimiento", "Seguridad", "Finanzas", "ERP FMG"].map(t => (
                  <span key={t} style={{ fontSize: "0.6rem", padding: "0.28rem 0.65rem", borderRadius: "100px", background: "rgba(74,124,89,0.16)", color: "#6aaa80", fontWeight: 600 }}>{t}</span>
                ))}
              </div>
            </div>
            <div style={{ background: "#eef4ee", borderRadius: "1.8rem", padding: "1.9rem" }}>
              <div style={{ fontSize: "0.63rem", textTransform: "uppercase", letterSpacing: "0.12em", color: GN, marginBottom: "1.3rem" }}>03 — Protocolo de acceso</div>
              <CalFeature />
              <p style={{ fontSize: "0.75rem", color: "#666", marginTop: "0.9rem", lineHeight: 1.65 }}>Sesiones estratégicas de 15 min con nuestro equipo. Sin intermediarios.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICIOS ── */}
      <section ref={secServicios} style={{ padding: "7rem 5vw", background: "#f8faf8" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <div style={{ marginBottom: "3.5rem" }}>
            <div style={{ fontSize: "0.66rem", textTransform: "uppercase", letterSpacing: "0.15em", color: GN, marginBottom: "0.9rem" }}>Nuestros servicios</div>
            <h2 style={{ fontSize: "clamp(1.8rem,3.8vw,3rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 }}>Todo lo que un edificio{" "}<span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontWeight: 300 }}>necesita para prosperar.</span></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: "1.2rem" }}>
            {SERVICES.map(({ title, desc, accent, icon }, i) => (
              <div key={title} className="scard" style={{ background: "#fff", borderRadius: "1.8rem", padding: "2rem", border: "1px solid rgba(0,0,0,0.05)", cursor: "default", position: "relative", overflow: "hidden" }} onMouseEnter={() => setHovSvc(i)} onMouseLeave={() => setHovSvc(null)}>
                <div style={{ position: "absolute", top: 0, right: 0, width: "120px", height: "120px", background: `radial-gradient(circle at 75% 25%, ${accent}0a, transparent 65%)`, pointerEvents: "none" }} />
                <div style={{ width: "46px", height: "46px", borderRadius: "12px", background: `${accent}11`, border: `1px solid ${accent}1a`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.3rem", color: accent }}>{icon}</div>
                <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.6rem", letterSpacing: "-0.01em", color: CB }}>{title}</div>
                <div style={{ fontSize: "0.82rem", color: "#667", lineHeight: 1.75, marginBottom: "1.3rem" }}>{desc}</div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: accent, fontSize: "0.74rem", fontWeight: 600, cursor: "pointer" }} onClick={() => go(secContacto)}>
                  <span>Conocer más</span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MANIFIESTO ── */}
      <section style={{ padding: "9rem 5vw", background: CB, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=55')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.07, transform: `translateY(${scrollY * 0.04}px)` }} />
        <div style={{ position: "relative", maxWidth: "750px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: "0.66rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(255,255,255,0.28)", marginBottom: "2.5rem" }}>Nuestra filosofía</div>
          <p style={{ fontSize: "clamp(1.1rem,2.3vw,1.7rem)", color: "rgba(255,255,255,0.32)", lineHeight: 1.55, marginBottom: "1.4rem" }}>Lo ordinario pregunta: ¿qué está fallando?</p>
          <p style={{ fontSize: "clamp(1.7rem,3.3vw,2.7rem)", color: "#fff", fontWeight: 800, lineHeight: 1.3, letterSpacing: "-0.02em" }}>Nosotros preguntamos:{" "}<span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontWeight: 300, color: DG }}>¿qué puede ser extraordinario?</span></p>
          <div style={{ width: "52px", height: "1px", background: "rgba(134,188,37,0.38)", margin: "2.8rem auto 2.2rem" }} />
          <p style={{ color: "rgba(255,255,255,0.42)", fontSize: "0.92rem", lineHeight: 1.82, maxWidth: "490px", margin: "0 auto" }}>Aplicamos metodologías de consultoría internacional al ecosistema más exigente: el de las personas que viven y trabajan en los espacios que administramos.</p>
        </div>
      </section>

      {/* ── METODOLOGÍA ── */}
      <section ref={secMetodologia} style={{ padding: "7rem 5vw", background: "#f8faf6" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "2rem", marginBottom: "3.5rem" }}>
            <div>
              <div style={{ fontSize: "0.66rem", textTransform: "uppercase", letterSpacing: "0.15em", color: GN, marginBottom: "0.9rem" }}>Marco de gestión</div>
              <h2 style={{ fontSize: "clamp(1.8rem,3.8vw,3rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 }}>Metodología que{" "}<span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontWeight: 300 }}>define el estándar.</span></h2>
            </div>
            <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
              {/* ERP Badge */}
              <div style={{ background: "linear-gradient(135deg,#0f1a0f,#1a2e1a)", borderRadius: "1.4rem", padding: "1rem 1.6rem", border: "1px solid rgba(134,188,37,0.2)" }}>
                <div style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(134,188,37,0.6)", marginBottom: "0.2rem" }}>ERP propio</div>
                <div className="erptag" style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.02em", fontFamily: "'JetBrains Mono',monospace" }}>ERP FMG</div>
                <div style={{ fontSize: "0.68rem", color: "#888" }}>Sistema integral de gestión</div>
              </div>
              {/* 52WPPM Badge */}
              <div style={{ background: `${GN}0f`, borderRadius: "1.4rem", padding: "1rem 1.6rem", border: `1px solid ${GN}1e` }}>
                <div style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.12em", color: GN, marginBottom: "0.2rem" }}>Metodología propietaria</div>
                <div style={{ fontSize: "1.5rem", fontWeight: 800, color: GN, letterSpacing: "-0.02em", fontFamily: "'JetBrains Mono',monospace" }}>52WPPM</div>
                <div style={{ fontSize: "0.68rem", color: "#888" }}>Work Package Planning & Mgmt</div>
              </div>
            </div>
          </div>

          {/* ERP FMG card */}
          <div style={{ background: "linear-gradient(135deg,#0b160b,#141e14)", borderRadius: "2.2rem", padding: "2.5rem", marginBottom: "1.4rem", color: "#fff", position: "relative", overflow: "hidden", border: "1px solid rgba(134,188,37,0.12)" }}>
            <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "200px", height: "200px", background: "rgba(134,188,37,0.04)", borderRadius: "50%" }} />
            <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.35)", marginBottom: "0.7rem" }}>Sistema ERP propietario</div>
                <h3 style={{ fontSize: "clamp(1.5rem,2.8vw,2.1rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "1rem" }}>
                  <span className="erptag" style={{ fontFamily: "'JetBrains Mono',monospace" }}>ERP FMG</span>
                  <span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontWeight: 300, color: "rgba(255,255,255,0.75)", fontSize: "0.95em" }}>{" — el sistema nervioso central"}</span>
                </h3>
                <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.52)", lineHeight: 1.82 }}>Plataforma propia de gestión integral que conecta finanzas, mantenimiento, proveedores, comunicación y reportería en un solo sistema diseñado específicamente para la administración de propiedades en Guatemala.</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
                {[["Módulo financiero", "Contabilidad + presupuesto"], ["Mantenimiento", "Órdenes + preventivo"], ["Proveedores", "CRM + contratos"], ["Reportería", "Dashboards tiempo real"]].map(([n, d]) => (
                  <div key={n} style={{ background: "rgba(255,255,255,0.05)", borderRadius: "1rem", padding: "0.9rem 1rem", border: "1px solid rgba(134,188,37,0.1)" }}>
                    <div style={{ fontSize: "0.74rem", fontWeight: 700, color: "#86BC25", marginBottom: "0.2rem" }}>{n}</div>
                    <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.4 }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 52WPPM card */}
          <div style={{ background: `linear-gradient(135deg,${GN},#2c5a3c)`, borderRadius: "2.2rem", padding: "3rem", marginBottom: "1.8rem", color: "#fff", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "-30px", right: "-30px", width: "220px", height: "220px", background: "rgba(255,255,255,0.04)", borderRadius: "50%" }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center", position: "relative" }}>
              <div>
                <h3 style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1.3rem" }}>52 semanas.{" "}<span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontWeight: 300 }}>Cero zonas ciegas.</span></h3>
                <p style={{ fontSize: "0.87rem", color: "rgba(255,255,255,0.62)", lineHeight: 1.82 }}>Nuestro sistema 52WPPM garantiza que cada proceso operativo esté planificado, ejecutado y auditado cada semana del año. Sin excepciones.</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.9rem" }}>
                {[["52", "Semanas planificadas"], ["100%", "Cobertura operativa"], ["0", "Procesos sin dueño"], ["24/7", "Monitoreo activo"]].map(([n, l]) => (
                  <div key={n} style={{ background: "rgba(255,255,255,0.09)", borderRadius: "1.1rem", padding: "1.1rem", backdropFilter: "blur(8px)" }}>
                    <div style={{ fontSize: "1.7rem", fontWeight: 800 }}>{n}</div>
                    <div style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.52)", marginTop: "0.15rem", lineHeight: 1.4 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ISO grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: "0.9rem" }}>
            {ISO_ITEMS.map(({ code, title, desc }) => (
              <div key={code} className="iso-c" style={{ background: "#fff", borderRadius: "1.6rem", padding: "1.8rem", border: "1px solid rgba(0,0,0,0.06)", cursor: "default" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", background: `${GN}0f`, borderRadius: "100px", padding: "0.28rem 0.75rem", marginBottom: "1.1rem" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GN} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, color: GN, letterSpacing: "0.05em", fontFamily: "'JetBrains Mono',monospace" }}>{code}</span>
                </div>
                <div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.55rem", color: CB }}>{title}</div>
                <div style={{ fontSize: "0.79rem", color: "#778", lineHeight: 1.75 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STACK ── */}
      <div ref={stackRef} style={{ height: "380vh", position: "relative" }}>
        <StackCard idx={0} active={activeCard} bg={`linear-gradient(135deg,${GN},#2d4f3a)`} label="Estructura viva">
          <div style={{ display: "flex", alignItems: "center", gap: "3rem", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "200px" }}>
              <h3 style={{ fontSize: "clamp(1.7rem,2.8vw,2.4rem)", fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: "1rem" }}>Arquitectura{" "}<span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontWeight: 300 }}>operativa viva</span></h3>
              <p style={{ color: "rgba(255,255,255,0.52)", fontSize: "0.88rem", lineHeight: 1.78 }}>Cada edificio recibe un modelo operativo a medida. Planificación anual, revisiones trimestrales, reportes ejecutivos mensuales.</p>
            </div>
            <Helix />
          </div>
        </StackCard>
        <StackCard idx={1} active={activeCard} bg="linear-gradient(135deg,#1c1c1c,#282828)" label="Protocolo de datos">
          <h3 style={{ fontSize: "clamp(1.7rem,2.8vw,2.4rem)", fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: "1.4rem" }}>Telemetría de{" "}<span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontWeight: 300, color: DG }}>alto rendimiento</span></h3>
          <LaserGrid />
          <p style={{ color: "rgba(255,255,255,0.42)", fontSize: "0.85rem", marginTop: "1.3rem", lineHeight: 1.78 }}>Monitoreo continuo de HVAC, seguridad, consumos, proveedores y presupuesto en tiempo real.</p>
        </StackCard>
        <StackCard idx={2} active={activeCard} bg={`linear-gradient(135deg,#0e1d12,${GN}90)`} label="Pulso del activo">
          <h3 style={{ fontSize: "clamp(1.7rem,2.8vw,2.4rem)", fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: "1.4rem" }}>Salud del activo,{" "}<span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontWeight: 300 }}>en tiempo real</span></h3>
          <Waveform />
          <p style={{ color: "rgba(255,255,255,0.42)", fontSize: "0.85rem", marginTop: "1.3rem", lineHeight: 1.78 }}>Indicadores de desempeño actualizados permanentemente. Decisiones basadas en datos.</p>
        </StackCard>
      </div>

      {/* ── TESTIMONIOS ── */}
      <section ref={secClientes} style={{ padding: "7rem 5vw", background: CB, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 75% 55% at 50% 50%,${GN}13,transparent)` }} />
        <div style={{ position: "relative", maxWidth: "1080px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "2rem", marginBottom: "3.5rem" }}>
            <div>
              <div style={{ fontSize: "0.66rem", textTransform: "uppercase", letterSpacing: "0.15em", color: GN, marginBottom: "0.9rem" }}>Nuestros clientes</div>
              <h2 style={{ fontSize: "clamp(1.8rem,3.8vw,2.9rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.1 }}>9 propiedades.{" "}<span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontWeight: 300, color: "rgba(255,255,255,0.48)" }}>Una exigencia: la excelencia.</span></h2>
            </div>
            <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap" }}>
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setTIdx(i)} style={{ width: i === tIdx ? "22px" : "7px", height: "7px", borderRadius: "100px", background: i === tIdx ? GN : "rgba(255,255,255,0.18)", border: "none", cursor: "pointer", transition: "all 0.3s ease", padding: 0 }} />
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.8rem", alignItems: "start" }}>
            <div key={tIdx} style={{ background: "rgba(255,255,255,0.04)", borderRadius: "2.2rem", padding: "2.6rem", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ display: "flex", gap: "2px", marginBottom: "1.3rem" }}>
                {[1, 2, 3, 4, 5].map(s => (<svg key={s} width="13" height="13" viewBox="0 0 24 24" fill={DG}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>))}
              </div>
              <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.88, marginBottom: "1.8rem", fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic" }}>"{TESTIMONIALS[tIdx].quote}"</p>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.3rem", display: "flex", alignItems: "center", gap: "0.9rem" }}>
                <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: `${GN}28`, display: "flex", alignItems: "center", justifyContent: "center", color: GN, flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: "#fff", fontSize: "0.86rem" }}>{TESTIMONIALS[tIdx].name}</div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.38)" }}>{TESTIMONIALS[tIdx].role}</div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {TESTIMONIALS.map((t, i) => (
                <button key={i} onClick={() => setTIdx(i)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.7rem 1rem", borderRadius: "0.9rem", background: i === tIdx ? "rgba(74,124,89,0.2)" : "rgba(255,255,255,0.03)", border: i === tIdx ? "1px solid rgba(74,124,89,0.38)" : "1px solid transparent", cursor: "pointer", transition: "all 0.2s ease", textAlign: "left" }}>
                  <div>
                    <div style={{ fontSize: "0.8rem", fontWeight: 600, color: i === tIdx ? "#fff" : "rgba(255,255,255,0.42)" }}>{t.building}</div>
                    <div style={{ fontSize: "0.63rem", color: "rgba(255,255,255,0.24)" }}>{t.zone}</div>
                  </div>
                  {i === tIdx && (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={GN} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section style={{ padding: "7rem 5vw", background: "#f1f5f1" }}>
        <div style={{ maxWidth: "980px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div style={{ fontSize: "0.66rem", textTransform: "uppercase", letterSpacing: "0.15em", color: GN, marginBottom: "0.9rem" }}>Planes de gestión</div>
            <h2 style={{ fontSize: "clamp(1.8rem,3.8vw,2.9rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>Transparencia total en{" "}<span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontWeight: 300 }}>cada inversión.</span></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "1.4rem", alignItems: "stretch" }}>
            {[
              { name: "Esencial", desc: "Para edificios de 20–60 unidades", features: ["Administración operativa", "Reporte mensual", "Gestión de proveedores", "Atención a propietarios"], feat: false },
              { name: "Premium", desc: "Para condominios de 60–200 unidades", features: ["Todo Esencial", "Telemetría en tiempo real", "Reporting ejecutivo trimestral", "Gestor dedicado", "Auditoría anual"], feat: true },
              { name: "Empresarial", desc: "Para portfolios y desarrollos corporativos", features: ["Todo Premium", "Múltiples propiedades", "ERP FMG integrado", "Consultoría estratégica", "SLA garantizado"], feat: false },
            ].map(p => (
              <div key={p.name} style={{ background: p.feat ? GN : "#fff", borderRadius: "1.8rem", padding: "2.2rem", boxShadow: p.feat ? "0 22px 58px rgba(74,124,89,0.28)" : "0 4px 18px rgba(0,0,0,0.05)", transform: p.feat ? "scale(1.04)" : "scale(1)", position: "relative", overflow: "hidden" }}>
                {p.feat && <div style={{ position: "absolute", top: "1.3rem", right: "1.3rem", background: "#c17b4e", borderRadius: "100px", padding: "0.22rem 0.65rem", fontSize: "0.59rem", color: "#fff", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Recomendado</div>}
                <div style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.12em", color: p.feat ? "rgba(255,255,255,0.48)" : "#aaa", marginBottom: "0.45rem" }}>{p.name}</div>
                <div style={{ fontSize: "1.15rem", fontWeight: 800, color: p.feat ? "#fff" : CB, marginBottom: "0.28rem" }}>A consultar</div>
                <div style={{ fontSize: "0.76rem", color: p.feat ? "rgba(255,255,255,0.52)" : "#999", marginBottom: "1.8rem" }}>{p.desc}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem", marginBottom: "1.8rem" }}>
                  {p.features.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
                      <div style={{ width: "17px", height: "17px", borderRadius: "50%", background: p.feat ? "rgba(255,255,255,0.14)" : "rgba(74,124,89,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="9" height="7" viewBox="0 0 24 24" fill="none" stroke={p.feat ? "#fff" : GN} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      </div>
                      <span style={{ fontSize: "0.78rem", color: p.feat ? "rgba(255,255,255,0.78)" : "#555" }}>{f}</span>
                    </div>
                  ))}
                </div>
                {/* Link to contact form */}
                <button className="btn" onClick={() => go(secContacto)} style={{ width: "100%", padding: "0.8rem", borderRadius: "100px", background: p.feat ? "#c17b4e" : GN, color: "#fff", border: "none", cursor: "pointer", fontSize: "0.8rem", fontWeight: 700 }}>
                  Solicitar información →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "7rem 5vw", background: CB, position: "relative", overflow: "hidden", textAlign: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 55% 45% at 50% 100%,${GN}20,transparent)` }} />
        <div style={{ position: "relative", maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ fontSize: "0.66rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(255,255,255,0.28)", marginBottom: "1.8rem" }}>Próximo paso</div>
          <h2 style={{ fontSize: "clamp(1.9rem,3.8vw,3rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "1.3rem" }}>15 minutos que pueden{" "}<span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontWeight: 300, color: DG }}>cambiar su propiedad.</span></h2>
          <p style={{ color: "rgba(255,255,255,0.42)", fontSize: "0.92rem", lineHeight: 1.82, marginBottom: "2.6rem" }}>Una reunión breve, sin compromisos, con nuestro equipo directivo. Diagnóstico preliminar gratuito.</p>
          <button className="btn" onClick={() => go(secContacto)} style={{ background: GN, color: "#fff", border: "none", cursor: "pointer", padding: "1rem 2.5rem", borderRadius: "100px", fontSize: "0.95rem", fontWeight: 700, boxShadow: "0 14px 42px rgba(74,124,89,0.34)" }}>
            Reservar mi reunión de 15 min →
          </button>
        </div>
      </section>

      {/* ── CONTACTO ── */}
      <section ref={secContacto} style={{ padding: "7rem 5vw", background: "#fafaf8" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
          <div>
            <div style={{ fontSize: "0.66rem", textTransform: "uppercase", letterSpacing: "0.15em", color: GN, marginBottom: "0.9rem" }}>Visítenos</div>
            <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.7rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "2.2rem" }}>Nuestra oficina{" "}<span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontWeight: 300 }}>le espera.</span></h2>
            {[
              { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GN} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>, label: "Dirección", val: <>25 Avenida 1-89, Vista Hermosa 2<br />Edificio Insigne, Nivel 16, Oficina 1602<br />Guatemala, Guatemala</> },
              { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GN} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.1 6.1l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>, label: "Teléfono", val: "42109877" },
              { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GN} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>, label: "Correo", val: "info@fmg.gt" },
            ].map(({ icon, label, val }) => (
              <div key={label} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1.4rem" }}>
                <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: `${GN}11`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{icon}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.86rem", marginBottom: "0.28rem" }}>{label}</div>
                  <div style={{ fontSize: "0.81rem", color: "#667", lineHeight: 1.72 }}>{val}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
              {["ERP FMG", "52WPPM", "ISO 22301", "ISO 31000", "ISO 41000", "ISO 20000", "ISO 55000"].map(n => (
                <span key={n} style={{ fontSize: "0.6rem", fontFamily: "'JetBrains Mono',monospace", padding: "0.28rem 0.65rem", borderRadius: "100px", background: `${GN}0f`, border: `1px solid ${GN}22`, color: GN, fontWeight: 700 }}>{n}</span>
              ))}
            </div>
          </div>

          {/* FORM */}
          <div style={{ background: "#fff", borderRadius: "2.2rem", padding: "2.6rem", boxShadow: "0 8px 36px rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.04)" }}>
            <div style={{ fontSize: "0.66rem", textTransform: "uppercase", letterSpacing: "0.12em", color: GN, marginBottom: "0.45rem" }}>Formulario de contacto</div>
            <h3 style={{ fontSize: "1.35rem", fontWeight: 800, marginBottom: "1.8rem", letterSpacing: "-0.02em" }}>Solicite su diagnóstico{" "}<span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontWeight: 300 }}>gratuito hoy.</span></h3>
            {[{ l: "Nombre completo", t: "text", p: "Ing. Juan Pérez" }, { l: "Correo electrónico", t: "email", p: "juan@empresa.com" }, { l: "Edificio o proyecto", t: "text", p: "Nombre del inmueble" }, { l: "Número de unidades", t: "text", p: "Ej. 80 apartamentos" }].map(({ l, t, p }) => (
              <div key={l} style={{ marginBottom: "1rem" }}>
                <label style={{ fontSize: "0.73rem", fontWeight: 600, color: "#666", display: "block", marginBottom: "0.38rem" }}>{l}</label>
                <input type={t} placeholder={p} style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "0.85rem", border: "1px solid rgba(0,0,0,0.1)", fontSize: "0.83rem", color: CB, background: "#fafaf8" }} onFocus={e => e.target.style.borderColor = GN} onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.1)"} />
              </div>
            ))}
            <button className="btn" style={{ width: "100%", padding: "0.9rem", borderRadius: "100px", background: GN, color: "#fff", border: "none", cursor: "pointer", fontSize: "0.87rem", fontWeight: 700, marginTop: "0.4rem" }}>
              Enviar solicitud →
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: CB, borderTop: "1px solid rgba(255,255,255,0.055)", padding: "3.5rem 5vw 2rem" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "2.5rem", marginBottom: "2.5rem" }}>
            <div>
              <img src={logoWhite} alt="FMG" style={{ height: "28px", width: "auto", objectFit: "contain", marginBottom: "0.9rem", filter: "brightness(0) invert(1)" }} />
              <p style={{ fontSize: "0.76rem", color: "rgba(255,255,255,0.28)", lineHeight: 1.82, maxWidth: "230px", marginBottom: "0.9rem" }}>Facilities Management de Guatemala S.A. Gestión de edificios de alto estándar.</p>
              <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.2)", lineHeight: 1.8, marginBottom: "1.1rem" }}>
                📍 25 Av. 1-89, Vista Hermosa 2,<br />
                <span style={{ paddingLeft: "18px" }}>Edif. Insigne, Nivel 16, Of. 1602</span>
              </div>
              {/* Happiness Club footer badge */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,179,0,0.07)", borderRadius: "0.6rem", padding: "0.4rem 0.75rem", border: "1px solid rgba(255,179,0,0.14)", cursor: "pointer" }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="#FFB300"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                <img src={logoWhite} alt="Happiness Club" style={{ height: "13px", width: "auto", objectFit: "contain", opacity: 0.55 }} />
                <span style={{ fontSize: "0.57rem", color: "#FFB300", fontWeight: 700, letterSpacing: "0.1em" }}>MIEMBRO BLACK</span>
              </div>
            </div>
            {[
              { t: "Empresa", ls: ["Nosotros", "Metodología", "Certificaciones", "Equipo"] },
              { t: "Servicios", ls: ["Administración", "Mantenimiento", "Reporting", "Seguridad"] },
              { t: "Legal", ls: ["Privacidad", "Términos", "Contacto", "Blog"] },
            ].map(({ t, ls }) => (
              <div key={t}>
                <div style={{ fontSize: "0.66rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.28)", marginBottom: "1.1rem" }}>{t}</div>
                {ls.map(l => (
                  <div key={l} style={{ marginBottom: "0.62rem" }}>
                    <span style={{ fontSize: "0.76rem", color: "rgba(255,255,255,0.3)", cursor: "pointer", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.3)"}>{l}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1.6rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <span style={{ fontSize: "0.63rem", color: "rgba(255,255,255,0.16)" }}>© {new Date().getFullYear()} Facilities Management de Guatemala S.A. · Todos los derechos reservados.</span>
            <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: DG, display: "inline-block", animation: "pdot 2s ease infinite" }} />
              <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.28)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Sistema operativo · Activo</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
