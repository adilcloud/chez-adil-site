import { useState, useEffect } from "react";

const STOPS = [
  { day: 1, label: "Lundi", place: null },
  { day: 2, label: "Mardi", place: null },
  { day: 3, label: "Mercredi", place: "Bar de l'Europe, Rue Malon, Caen" },
  { day: 4, label: "Jeudi", place: "Super U Colombelles" },
  { day: 5, label: "Vendredi", place: "20 bis Rue Pasteur, Mondeville" },
  { day: 6, label: "Samedi", place: "12 Bd des Violettes, Ifs" },
  { day: 0, label: "Dimanche", place: "Super U Colombelles" },
];

function mapsUrl(place) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`;
}

const PHONE_DISPLAY = "06 70 79 78 56";
const PHONE_TEL = "+33670797856";
const EMAIL_PRO = "chezadil.streetfood@gmail.com";

// ---- Exception ponctuelle d'emplacement ----
// Pour désactiver le popup à la main avant la date de fin, passe "active" à false.
const EXCEPTION = {
  active: true,
  date: "2026-09-05", // format AAAA-MM-JJ, jour concerné par l'exception
  place: "Église Saint-Nicolas, Caen",
  event: "Festival des Cultures Alternatives",
  detail: "Présent toute la journée — pas de service à Ifs ce jour-là.",
};

function todayLocalStr() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// Le popup reste actif (à chaque visite) jusqu'au samedi soir de la date indiquée.
function isExceptionWindowOpen() {
  if (!EXCEPTION.active) return false;
  const end = new Date(`${EXCEPTION.date}T23:59:59`);
  return new Date() <= end;
}

// Vrai uniquement le jour J de l'exception (pour l'onglet Emplacements).
function isExceptionToday() {
  return EXCEPTION.active && todayLocalStr() === EXCEPTION.date;
}

const BURGERS = [
  {
    name: "Le Classique",
    price: "10 €",
    note: "+1,50 € bacon",
    desc: "Steak, cheddar, oignons, salade, tomate, cornichons, sauce burger.",
  },
  {
    name: "Le Bacon Fusion",
    price: "13 €",
    desc: "Steak, cheddar, provolone, double bacon de bœuf et de dinde, oignons, salade, tomate, sauce douce oignons.",
  },
  {
    name: "Le Spicy Kefta Avocado",
    price: "12,90 €",
    desc: "Steak façon kefta, cheddar spicy, guacamole maison, oignons, salade, tomate, sauce toscane.",
  },
  {
    name: "Le BG d'Ambert",
    price: "12,90 €",
    desc: "Steak, bacon, fourme d'Ambert, champignons, oignons, salade, tomate, sauce burger.",
  },
  {
    name: "L'Italiano di Brooklyn",
    price: "13 €",
    desc: "Steak, cheddar, provolone, pepperoni, oignons, salade, tomate, sauce toscane.",
  },
  {
    name: "Le Chèvre et Poivron",
    price: "12 €",
    note: "9 € sans steak (végé)",
    desc: "Steak, cheddar, chèvre, poivrons et oignons grillés, tomate, salade, cream cheese.",
  },
];

const DESSERTS = [
  { name: "Tiramisu", price: "4 €" },
  { name: "Mousse au chocolat", price: "3,50 €" },
  { name: "Cheesecake", price: "4,90 €" },
];

const DRINKS = [
  { name: "Bouteille d'eau", price: "1 €" },
  { name: "Boisson 33cl", price: "1,90 €" },
];

const TABS = [
  { id: "planning", label: "Emplacements" },
  { id: "menu", label: "Carte" },
  { id: "prestations", label: "Privatisations" },
  { id: "videos", label: "Vidéos" },
  { id: "bio", label: "Bio" },
];

const INSTAGRAM_URL = "https://www.instagram.com/chezadilstreetfood/";
const YOUTUBE_URL = "https://www.youtube.com/@ChezAdil-streetfood";

const VIDEOS = [
  { title: "Short #1", url: "https://www.youtube.com/shorts/vzR4jGJwVRI", id: "vzR4jGJwVRI" },
  { title: "Short #2", url: "https://www.youtube.com/shorts/rEnj5TB_dIo", id: "rEnj5TB_dIo" },
  { title: "Short #3", url: "https://www.youtube.com/shorts/w17B8XLRtJg", id: "w17B8XLRtJg" },
];

const BIO_PARAGRAPHS = [
  "Été 2016, j'ouvre mon petit restaurant Burger Avenue à la Demi-Lune, sans aucune expérience dans le burger ni dans la restauration. J'avais juste une idée fixe : utiliser du frais, du halal, faire de bons burgers et créer un lieu convivial. Au tout début, pour me faire connaître, je devais moi-même sortir dans la rue distribuer mes burgers. C'est là que j'ai tout appris, sur le tas.",
  "Après une pause forcée de quelques années, l'envie de reprendre était trop forte, mais avec un besoin de bouger, de respirer et de sortir d'entre quatre murs. Le food truck s'est imposé comme une évidence.",
  "Aujourd'hui, l'aventure prend un nouveau virage avec de nouveaux emplacements et des privatisations. Le décor change et les défis aussi, mais l'essentiel ne bouge pas : proposer aux anciens la même qualité et le même goût qu'au premier jour, et faire découvrir l'esprit Chez Adil aux nouveaux. Merci d'être là !",
];

const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/fnm2r5Mq3Ly66z7i7";

const REVIEWS = [
  {
    author: "Morgane S.",
    rating: 5,
    text: "Très bon rapport qualité/prix ! Un burger avec un vrai pain, de vraies frites maison et surtout des ingrédients locaux. Merci à Adil pour son accueil et sa sympathie !",
  },
  {
    author: "Nathan B.",
    rating: 5,
    text: "Sans aucune hésitation, les meilleurs burgers de Caen ! Prix très abordable, produits de qualité et personnel très agréable.",
  },
  {
    author: "Jeremi M.",
    rating: 5,
    text: "Sans aucun doute le meilleur spot de burger dans l'agglomération caennaise. Pas assez connu à mon goût, foncez-y.",
  },
];

function PhoneIcon({ size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ verticalAlign: "-2px", marginRight: "5px" }}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function CarIcon({ size = 12 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ verticalAlign: "-2px", marginRight: "4px" }}
    >
      <path d="M5 11l1.4-3.6A2 2 0 0 1 8.26 6h7.48a2 2 0 0 1 1.86 1.4L19 11" />
      <rect x="3" y="11" width="18" height="5" rx="1.5" />
      <circle cx="7.5" cy="18" r="1.5" />
      <circle cx="16.5" cy="18" r="1.5" />
    </svg>
  );
}

export default function ChezAdilApp() {
  const [tab, setTab] = useState("planning");

  const currentDayNum = new Date().getDay();
  const exceptionToday = isExceptionToday();
  const todayStopBase = STOPS.find((s) => s.day === currentDayNum) || STOPS[0];
  const todayStop = exceptionToday
    ? { ...todayStopBase, place: `${EXCEPTION.place} (${EXCEPTION.event})` }
    : todayStopBase;

  const [showPopup, setShowPopup] = useState(isExceptionWindowOpen());

  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    entreprise: "",
    date: "",
    personnes: "",
    evenement: "",
  });
  const [sent, setSent] = useState(false);

  const [reviewIdx, setReviewIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setReviewIdx((i) => (i + 1) % REVIEWS.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  function updateField(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function submitRequest(e) {
    e.preventDefault();
    const subject = `Demande de privatisation – ${form.prenom} ${form.nom}`.trim();
    const lines = [
      `Nom : ${form.nom}`,
      `Prénom : ${form.prenom}`,
      form.entreprise ? `Entreprise : ${form.entreprise}` : null,
      `Date souhaitée : ${form.date}`,
      `Nombre de personnes : ${form.personnes}`,
      form.evenement ? `Détails de l'événement : ${form.evenement}` : null,
    ].filter(Boolean);
    const body = lines.join("\n");
    const mailto = `mailto:${EMAIL_PRO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSent(true);
  }

  const formValid = form.nom && form.prenom && form.date && form.personnes;

  return (
    <div className="ca-app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Work+Sans:wght@400;500;600&display=swap');

        .ca-app {
          --ca-navy: #16303F;
          --ca-navy-2: #1F425A;
          --ca-brass: #C9A24B;
          --ca-brass-light: #E4C878;
          --ca-cream: #F3EFE6;
          --ca-ink: #1A1A1A;
          --ca-steel: #5C7080;
          font-family: 'Work Sans', sans-serif;
          background: var(--ca-cream);
          color: var(--ca-ink);
          min-height: 100vh;
          border-radius: 12px;
          overflow: hidden;
          max-width: 480px;
          margin: 0 auto;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
          position: relative;
        }
        .ca-app * { box-sizing: border-box; }
        .ca-app button:focus-visible, .ca-app [role="tab"]:focus-visible {
          outline: 2px solid var(--ca-brass);
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          .ca-app * { transition: none !important; animation: none !important; }
        }

        @keyframes ca-fade-in-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ca-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes ca-pop-in {
          from { opacity: 0; transform: scale(0.94) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .ca-fade-in-section {
          animation: ca-fade-in-up 0.38s ease both;
        }
        .ca-fade-in-section > * {
          animation: ca-fade-in-up 0.4s ease both;
        }
        .ca-fade-in-section > *:nth-child(1) { animation-delay: 0.02s; }
        .ca-fade-in-section > *:nth-child(2) { animation-delay: 0.06s; }
        .ca-fade-in-section > *:nth-child(3) { animation-delay: 0.1s; }
        .ca-fade-in-section > *:nth-child(4) { animation-delay: 0.14s; }
        .ca-fade-in-section > *:nth-child(5) { animation-delay: 0.18s; }
        .ca-fade-in-section > *:nth-child(6) { animation-delay: 0.22s; }
        .ca-fade-in-section > *:nth-child(n+7) { animation-delay: 0.26s; }

        .ca-header {
          background: var(--ca-navy);
          color: var(--ca-cream);
          padding: 28px 20px 20px;
          position: relative;
        }
        .ca-rivet {
          position: absolute;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--ca-brass);
          opacity: 0.7;
        }
        .ca-logo {
          font-family: 'Oswald', sans-serif;
          font-weight: 700;
          letter-spacing: 0.06em;
          font-size: 28px;
          text-transform: uppercase;
          margin: 0;
        }
        .ca-logo span { color: var(--ca-brass-light); }
        .ca-badge-halo {
          position: absolute;
          top: 0px; right: 0px;
          width: 86px; height: 86px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(228,200,120,0.38) 0%, rgba(228,200,120,0) 72%);
          pointer-events: none;
        }
        .ca-badge-spin {
          position: absolute;
          top: 10px; right: 10px;
          animation: ca-spin 9s linear infinite;
          filter: drop-shadow(0 0 4px rgba(201,162,75,0.55));
        }
        @keyframes ca-spin { to { transform: rotate(360deg); } }

        .ca-reviews {
          background: var(--ca-navy);
          color: var(--ca-cream);
          border-radius: 10px;
          padding: 16px 18px;
          margin-bottom: 18px;
          text-align: center;
          position: relative;
        }
        .ca-reviews-fade { animation: ca-fade-in 0.4s ease both; }
        .ca-reviews-stars {
          color: var(--ca-brass-light);
          font-size: 15px;
          letter-spacing: 2px;
          margin-bottom: 8px;
        }
        .ca-reviews-text {
          font-size: 13px;
          line-height: 1.5;
          margin: 0 0 8px;
          font-style: italic;
          min-height: 54px;
        }
        .ca-reviews-author {
          font-family: 'Oswald', sans-serif;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--ca-brass-light);
          margin-bottom: 10px;
        }
        .ca-reviews-dots {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin-bottom: 10px;
        }
        .ca-reviews-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(243,239,230,0.3);
        }
        .ca-reviews-dot.active { background: var(--ca-brass-light); }
        .ca-reviews-link {
          display: inline-block;
          font-size: 11px;
          color: var(--ca-cream);
          text-decoration: none;
          border-bottom: 1px solid var(--ca-brass);
          padding-bottom: 1px;
        }
        .ca-menu-halo {
          position: relative;
          width: 100%;
          height: 0;
        }
        .ca-menu-halo::before {
          content: "";
          position: absolute;
          top: -30px; left: 50%;
          transform: translateX(-50%);
          width: 220px; height: 120px;
          background: radial-gradient(ellipse, rgba(201,162,75,0.22) 0%, rgba(201,162,75,0) 70%);
          pointer-events: none;
        }
        .ca-phone {
          display: inline-flex;
          align-items: center;
          margin-top: 4px;
          font-size: 13px;
          font-weight: 600;
          color: var(--ca-cream);
          text-decoration: none;
          border-bottom: 1px solid var(--ca-brass);
        }
        .ca-tagline {
          font-size: 13px;
          color: var(--ca-brass-light);
          margin-top: 8px;
          letter-spacing: 0.03em;
        }
        .ca-today-strip {
          margin-top: 16px;
          background: var(--ca-navy-2);
          border-left: 3px solid var(--ca-brass);
          padding: 10px 12px;
          border-radius: 4px;
          font-size: 13px;
        }
        .ca-today-strip b { color: var(--ca-brass-light); }

        /* ---- Onglets façon languettes de classeur ---- */
        .ca-tabs {
          display: flex;
          background: var(--ca-navy);
          gap: 3px;
          padding: 8px 6px 0;
        }
        .ca-tab {
          flex: 1;
          padding: 10px 3px 9px;
          text-align: center;
          background: var(--ca-navy-2);
          border: none;
          color: rgba(243,239,230,0.55);
          font-family: 'Oswald', sans-serif;
          font-size: 11px;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 9px 9px 0 0;
          position: relative;
          top: 5px;
          transition: top 0.15s ease, background 0.15s ease, color 0.15s ease;
        }
        .ca-tab:hover:not(.active) { color: rgba(243,239,230,0.85); }
        .ca-tab.active {
          background: var(--ca-cream);
          color: var(--ca-navy);
          font-weight: 600;
          top: 0;
          box-shadow: 0 -3px 6px rgba(0,0,0,0.15);
          z-index: 2;
        }

        .ca-body { padding: 18px 16px 28px; }

        .ca-eyebrow {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--ca-steel);
          margin-bottom: 4px;
        }
        .ca-h3 {
          font-family: 'Oswald', sans-serif;
          font-size: 18px;
          margin: 0 0 12px;
          color: var(--ca-navy);
        }

        .ca-stop {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 14px;
          border-radius: 8px;
          margin-bottom: 8px;
          background: white;
          border: 1px solid #E4DFD1;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .ca-stop:hover, .ca-stop:active {
          transform: translateY(-1px);
          box-shadow: 0 6px 14px rgba(22,48,63,0.08);
        }
        .ca-stop.today {
          background: var(--ca-navy);
          border-color: var(--ca-navy);
          color: var(--ca-cream);
        }
        .ca-stop.today .ca-stop-place { color: var(--ca-brass-light); }
        .ca-stop.off { opacity: 0.45; }
        .ca-stop-day { font-family: 'Oswald', sans-serif; font-size: 13px; letter-spacing: 0.03em; display: flex; align-items: center; flex-wrap: wrap; gap: 4px; }
        .ca-stop-place-link {
          display: flex;
          align-items: baseline;
          gap: 8px;
          text-decoration: none;
        }
        .ca-stop-place { font-size: 13px; font-weight: 600; color: inherit; }
        .ca-stop-gps { font-size: 11px; color: var(--ca-brass); display: inline-flex; align-items: center; }
        .ca-stop.today .ca-stop-gps { color: var(--ca-brass-light); }
        .ca-stop-time { font-size: 11px; color: var(--ca-steel); white-space: nowrap; margin-left: 8px; }
        .ca-stop.today .ca-stop-time { color: rgba(243,239,230,0.7); }
        .ca-badge-today {
          font-size: 10px;
          background: var(--ca-brass);
          color: var(--ca-navy);
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 700;
          text-transform: uppercase;
        }
        .ca-badge-exception {
          font-size: 10px;
          background: #B5482F;
          color: var(--ca-cream);
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 700;
          text-transform: uppercase;
        }
        .ca-stop-exception-note {
          font-size: 11.5px;
          margin-top: 4px;
          color: var(--ca-brass-light);
        }

        .ca-item {
          border-bottom: 1px solid #E4DFD1;
          padding: 12px 0;
          transition: transform 0.2s ease, padding-left 0.2s ease;
        }
        .ca-item:hover, .ca-item:active {
          transform: translateX(2px);
          padding-left: 4px;
        }
        .ca-item:last-child { border-bottom: none; }
        .ca-item-top {
          display: flex;
          justify-content: space-between;
          font-family: 'Oswald', sans-serif;
          font-size: 15px;
          color: var(--ca-navy);
        }
        .ca-item-price { color: var(--ca-brass); font-weight: 700; white-space: nowrap; margin-left: 8px; }
        .ca-item-note { font-size: 11px; color: var(--ca-steel); margin-top: 2px; }
        .ca-item-desc { font-size: 13px; color: var(--ca-ink); margin-top: 4px; line-height: 1.4; }

        .ca-frites-box {
          margin-top: 14px;
          background: white;
          border: 1.5px dashed var(--ca-brass);
          border-radius: 10px;
          padding: 12px 14px;
        }
        .ca-frites-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: 'Oswald', sans-serif;
          font-size: 14px;
          color: var(--ca-navy);
        }
        .ca-frites-desc { font-size: 12px; color: var(--ca-steel); margin-top: 4px; }

        .ca-section-title {
          font-family: 'Oswald', sans-serif;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--ca-steel);
          margin: 20px 0 8px;
        }

        .ca-card-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        .ca-mini-card {
          background: white;
          border: 1px solid #E4DFD1;
          border-radius: 10px;
          padding: 12px 10px;
          text-align: center;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .ca-mini-card:hover, .ca-mini-card:active {
          transform: translateY(-2px);
          box-shadow: 0 6px 14px rgba(22,48,63,0.1);
          border-color: var(--ca-brass);
        }
        .ca-mini-card-name {
          font-family: 'Oswald', sans-serif;
          font-size: 13px;
          color: var(--ca-navy);
          margin-bottom: 4px;
        }
        .ca-mini-card-price { color: var(--ca-brass); font-weight: 700; font-size: 13px; }

        .ca-card {
          background: white;
          border: 1px solid #E4DFD1;
          border-radius: 10px;
          padding: 16px;
          position: relative;
        }
        .ca-btn {
          width: 100%;
          background: var(--ca-navy);
          color: var(--ca-cream);
          border: none;
          padding: 12px;
          border-radius: 8px;
          font-family: 'Oswald', sans-serif;
          letter-spacing: 0.03em;
          font-size: 13px;
          text-transform: uppercase;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease;
        }
        .ca-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 14px rgba(22,48,63,0.18); }
        .ca-btn:active:not(:disabled) { transform: translateY(0) scale(0.98); }
        .ca-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .ca-btn-brass { background: var(--ca-brass); color: var(--ca-navy); }
        .ca-fineprint { font-size: 11px; color: var(--ca-steel); margin-top: 10px; text-align: center; }

        .ca-form { margin-bottom: 20px; }
        .ca-field { margin-bottom: 12px; }
        .ca-label {
          display: block;
          font-size: 12px;
          color: var(--ca-steel);
          margin-bottom: 4px;
        }
        .ca-input {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #D8CBA8;
          border-radius: 8px;
          background: white;
          color: var(--ca-ink);
          font-family: 'Work Sans', sans-serif;
          font-size: 14px;
        }
        .ca-input:focus {
          outline: 2px solid var(--ca-brass);
          outline-offset: 1px;
        }

        .ca-video {
          display: flex;
          gap: 10px;
          align-items: center;
          padding: 10px;
          border: 1px solid #E4DFD1;
          border-radius: 8px;
          margin-bottom: 8px;
          background: white;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .ca-video-link:hover .ca-video, .ca-video-link:active .ca-video {
          transform: translateY(-2px);
          box-shadow: 0 6px 14px rgba(22,48,63,0.1);
          border-color: var(--ca-brass);
        }
        .ca-video-thumb-img { transition: transform 0.3s ease; }
        .ca-video-link:hover .ca-video-thumb-img { transform: scale(1.04); }
        .ca-video-title { font-size: 13px; font-weight: 600; color: var(--ca-navy); }
        .ca-video-sub { font-size: 11px; color: var(--ca-steel); }
        .ca-cta-yt, .ca-cta-insta {
          display: block;
          text-align: center;
          margin-top: 14px;
          background: var(--ca-brass);
          color: var(--ca-navy);
          padding: 10px;
          border-radius: 8px;
          text-decoration: none;
          font-family: 'Oswald', sans-serif;
          font-size: 13px;
          text-transform: uppercase;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .ca-cta-yt:hover, .ca-cta-insta:hover, .ca-cta-yt:active, .ca-cta-insta:active {
          transform: translateY(-1px);
          box-shadow: 0 6px 14px rgba(22,48,63,0.16);
        }
        .ca-cta-insta { background: var(--ca-navy); color: var(--ca-cream); }
        .ca-video-thumb-img {
          width: 56px; height: 56px;
          border-radius: 6px;
          flex-shrink: 0;
          object-fit: cover;
          background: var(--ca-navy);
        }
        .ca-video-link { text-decoration: none; }

        .ca-presta-desc { font-size: 13px; color: var(--ca-ink); line-height: 1.45; }
        .ca-cta-contact {
          display: block;
          text-align: center;
          margin-top: 16px;
          background: var(--ca-navy);
          color: var(--ca-cream);
          padding: 12px;
          border-radius: 8px;
          text-decoration: none;
          font-family: 'Oswald', sans-serif;
          font-size: 13px;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .ca-cta-contact:hover, .ca-cta-contact:active {
          transform: translateY(-1px);
          box-shadow: 0 6px 14px rgba(22,48,63,0.18);
        }

        /* ---- Popup exception ---- */
        .ca-popup-overlay {
          position: absolute;
          inset: 0;
          background: rgba(10, 20, 26, 0.72);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          z-index: 50;
          animation: ca-fade-in 0.25s ease both;
        }
        .ca-popup-card {
          background: var(--ca-cream);
          border-radius: 14px;
          padding: 22px 20px;
          max-width: 340px;
          width: 100%;
          border-top: 4px solid var(--ca-brass);
          box-shadow: 0 10px 30px rgba(0,0,0,0.35);
          animation: ca-pop-in 0.32s cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }
        .ca-popup-eyebrow {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #B5482F;
          font-weight: 700;
          margin-bottom: 6px;
        }
        .ca-popup-title {
          font-family: 'Oswald', sans-serif;
          font-size: 18px;
          color: var(--ca-navy);
          margin: 0 0 10px;
        }
        .ca-popup-text {
          font-size: 14px;
          line-height: 1.5;
          color: var(--ca-ink);
          margin: 0 0 16px;
        }

        .ca-bio-duo {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin: 14px 0;
        }
        .ca-bio-duo-item {
          position: relative;
          border-radius: 10px;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .ca-bio-duo-item:hover, .ca-bio-duo-item:active {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(22,48,63,0.18);
        }
        .ca-bio-duo-item img {
          width: 100%;
          aspect-ratio: 3 / 4;
          object-fit: cover;
          display: block;
        }
        .ca-bio-duo-label {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to top, rgba(22,48,63,0.9), rgba(22,48,63,0));
          color: var(--ca-cream);
          font-family: 'Oswald', sans-serif;
          font-size: 11px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          text-align: center;
          padding: 22px 4px 8px;
        }
        .ca-bio-text {
          font-size: 13.5px;
          font-style: italic;
          color: var(--ca-ink);
          margin-top: 10px;
          line-height: 1.55;
        }
        .ca-bio-signature {
          font-family: 'Oswald', sans-serif;
          font-style: italic;
          font-size: 15px;
          letter-spacing: 0.03em;
          color: var(--ca-brass);
          text-align: right;
          margin-top: 16px;
        }
      `}</style>

      {showPopup && (
        <div className="ca-popup-overlay" role="dialog" aria-modal="true" aria-label="Info emplacement exceptionnel">
          <div className="ca-popup-card">
            <div className="ca-popup-eyebrow">Changement exceptionnel</div>
            <h3 className="ca-popup-title">On bouge samedi 5 septembre !</h3>
            <p className="ca-popup-text">
              Ce jour-là, pas de camion à Ifs : on sera au <strong>{EXCEPTION.event}</strong>,{" "}
              <strong>{EXCEPTION.place}</strong>, <strong>toute la journée</strong>.
            </p>
            <button className="ca-btn ca-btn-brass" onClick={() => setShowPopup(false)}>
              J'ai compris
            </button>
          </div>
        </div>
      )}

      <div className="ca-header">
        <div className="ca-rivet" style={{ top: 10, left: 10 }} />
        <div className="ca-badge-halo" aria-hidden="true" />
        <div className="ca-badge-spin" aria-hidden="true">
          <svg viewBox="0 0 120 120" width="64" height="64">
            <defs>
              <path
                id="ca-badge-path"
                d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0"
              />
            </defs>
            <text fontSize="9.5" letterSpacing="2" fill="var(--ca-brass-light)">
              <textPath href="#ca-badge-path">
                BURGER &amp; FRITES MAISON • BURGER &amp; FRITES MAISON •
              </textPath>
            </text>
          </svg>
        </div>
        <h1 className="ca-logo">
          Chez <span>Adil</span>
        </h1>
        <a className="ca-phone" href={`tel:${PHONE_TEL}`}>
          <PhoneIcon />
          {PHONE_DISPLAY}
        </a>
        <p className="ca-tagline">Burger premium &amp; artisanal · depuis 2016 · Caen &amp; alentours</p>
        <div className="ca-today-strip">
          {todayStop.place ? (
            <>
              Aujourd'hui : <b>{todayStop.place}</b> — {exceptionToday ? "toute la journée" : "à partir de 19h"}
            </>
          ) : (
            <>Pas de service aujourd'hui — prochaine étape dans l'onglet Emplacements</>
          )}
        </div>
      </div>

      <div className="ca-tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            className={`ca-tab ${tab === t.id ? "active" : ""}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="ca-body">
        {tab === "planning" && (
          <div className="ca-fade-in-section" key="planning">
            <div className="ca-reviews" aria-label="Avis clients">
              <div className="ca-reviews-fade" key={reviewIdx}>
                <div className="ca-reviews-stars">
                  {"★".repeat(REVIEWS[reviewIdx].rating)}
                </div>
                <p className="ca-reviews-text">« {REVIEWS[reviewIdx].text} »</p>
                <div className="ca-reviews-author">— {REVIEWS[reviewIdx].author}</div>
              </div>
              <div className="ca-reviews-dots">
                {REVIEWS.map((_, i) => (
                  <span
                    key={i}
                    className={`ca-reviews-dot ${i === reviewIdx ? "active" : ""}`}
                  />
                ))}
              </div>
              <a
                className="ca-reviews-link"
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Voir tous les avis sur Google
              </a>
            </div>

            <div className="ca-eyebrow">Semaine type</div>
            <h3 className="ca-h3">Nos emplacements</h3>
            {STOPS.map((s) => {
              const isTodayRow = s.day === currentDayNum;
              const showException = isTodayRow && exceptionToday && s.day === 6;
              const place = showException ? EXCEPTION.place : s.place;
              return (
                <div
                  key={s.day}
                  className={`ca-stop ${isTodayRow ? "today" : ""} ${!place ? "off" : ""}`}
                >
                  <div>
                    <div className="ca-stop-day">
                      {s.label}
                      {isTodayRow && <span className="ca-badge-today">Aujourd'hui</span>}
                      {showException && <span className="ca-badge-exception">Exceptionnel</span>}
                    </div>
                    {place && (
                      <a
                        className="ca-stop-place-link"
                        href={mapsUrl(place)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="ca-stop-place">{place}</span>
                        <span className="ca-stop-gps">
                          <CarIcon />
                          Itinéraire
                        </span>
                      </a>
                    )}
                    {showException && (
                      <div className="ca-stop-exception-note">{EXCEPTION.event} — {EXCEPTION.detail}</div>
                    )}
                  </div>
                  {place && (
                    <div className="ca-stop-time">
                      {showException ? "Toute la journée" : "dès 19h"}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {tab === "menu" && (
          <div className="ca-fade-in-section" key="menu">
            <div className="ca-menu-halo" aria-hidden="true" />
            <div className="ca-eyebrow">La carte</div>
            <h3 className="ca-h3">Nos burgers</h3>
            {BURGERS.map((b) => (
              <div className="ca-item" key={b.name}>
                <div className="ca-item-top">
                  <span>{b.name}</span>
                  <span className="ca-item-price">{b.price}</span>
                </div>
                {b.note && <div className="ca-item-note">{b.note}</div>}
                <div className="ca-item-desc">{b.desc}</div>
              </div>
            ))}

            <div className="ca-frites-box">
              <div className="ca-frites-top">
                <span>Frites maison</span>
                <span className="ca-item-price">+ 3,50 €</span>
              </div>
              <div className="ca-frites-desc">En supplément, avec n'importe quel burger.</div>
            </div>

            <div className="ca-section-title">Desserts</div>
            <div className="ca-card-grid">
              {DESSERTS.map((d) => (
                <div className="ca-mini-card" key={d.name}>
                  <div className="ca-mini-card-name">{d.name}</div>
                  <div className="ca-mini-card-price">{d.price}</div>
                </div>
              ))}
            </div>

            <div className="ca-section-title">Boissons</div>
            <div className="ca-card-grid">
              {DRINKS.map((d) => (
                <div className="ca-mini-card" key={d.name}>
                  <div className="ca-mini-card-name">{d.name}</div>
                  <div className="ca-mini-card-price">{d.price}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "prestations" && (
          <div className="ca-fade-in-section" key="prestations">
            <div className="ca-eyebrow">Événements privés</div>
            <h3 className="ca-h3">Demande de privatisation</h3>
            <p className="ca-item-desc" style={{ marginBottom: 14 }}>
              Entreprise, anniversaire, mariage : remplis le formulaire, ta demande part
              directement par mail au camion.
            </p>

            {sent ? (
              <div className="ca-card">
                <p className="ca-presta-desc">
                  Ta demande est prête à être envoyée par mail. Si ton application mail ne s'est pas
                  ouverte, tu peux nous écrire directement à{" "}
                  <a href={`mailto:${EMAIL_PRO}`}>{EMAIL_PRO}</a> ou appeler.
                </p>
                <a className="ca-cta-contact" href={`tel:${PHONE_TEL}`}>
                  Appeler · {PHONE_DISPLAY}
                </a>
              </div>
            ) : (
              <form className="ca-form" onSubmit={submitRequest}>
                <div className="ca-field">
                  <label className="ca-label" htmlFor="ca-nom">Nom</label>
                  <input
                    id="ca-nom"
                    className="ca-input"
                    value={form.nom}
                    onChange={(e) => updateField("nom", e.target.value)}
                    required
                  />
                </div>
                <div className="ca-field">
                  <label className="ca-label" htmlFor="ca-prenom">Prénom</label>
                  <input
                    id="ca-prenom"
                    className="ca-input"
                    value={form.prenom}
                    onChange={(e) => updateField("prenom", e.target.value)}
                    required
                  />
                </div>
                <div className="ca-field">
                  <label className="ca-label" htmlFor="ca-entreprise">Entreprise (facultatif)</label>
                  <input
                    id="ca-entreprise"
                    className="ca-input"
                    value={form.entreprise}
                    onChange={(e) => updateField("entreprise", e.target.value)}
                  />
                </div>
                <div className="ca-field">
                  <label className="ca-label" htmlFor="ca-date">Date souhaitée</label>
                  <input
                    id="ca-date"
                    type="date"
                    className="ca-input"
                    value={form.date}
                    onChange={(e) => updateField("date", e.target.value)}
                    required
                  />
                </div>
                <div className="ca-field">
                  <label className="ca-label" htmlFor="ca-personnes">Nombre de personnes</label>
                  <input
                    id="ca-personnes"
                    type="number"
                    min="1"
                    className="ca-input"
                    value={form.personnes}
                    onChange={(e) => updateField("personnes", e.target.value)}
                    required
                  />
                </div>
                <div className="ca-field">
                  <label className="ca-label" htmlFor="ca-evenement">Parle-nous de ton événement (facultatif)</label>
                  <textarea
                    id="ca-evenement"
                    className="ca-input"
                    rows={3}
                    value={form.evenement}
                    onChange={(e) => updateField("evenement", e.target.value)}
                  />
                </div>
                <button className="ca-btn ca-btn-brass" type="submit" disabled={!formValid}>
                  Envoyer la demande
                </button>
              </form>
            )}

            <div className="ca-section-title">Sur devis</div>
            <div className="ca-presta-desc">
              Chaque privatisation est chiffrée selon le nombre de couverts, le lieu et les options
              choisies (classique, bacon, végé).
            </div>
            <a className="ca-cta-contact" href={`tel:${PHONE_TEL}`}>
              Ou appeler directement · {PHONE_DISPLAY}
            </a>
          </div>
        )}

        {tab === "videos" && (
          <div className="ca-fade-in-section" key="videos">
            <div className="ca-eyebrow">Dans les coulisses</div>
            <h3 className="ca-h3">Dernières vidéos</h3>
            {VIDEOS.map((v) => (
              <a
                className="ca-video-link"
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                key={v.id}
              >
                <div className="ca-video">
                  <img
                    className="ca-video-thumb-img"
                    src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                    alt=""
                  />
                  <div>
                    <div className="ca-video-title">{v.title}</div>
                    <div className="ca-video-sub">Voir sur YouTube</div>
                  </div>
                </div>
              </a>
            ))}
            <a
              className="ca-cta-insta"
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              @chezadilstreetfood sur Instagram
            </a>
            <a
              className="ca-cta-insta"
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginTop: 8 }}
            >
              Chez Adil sur YouTube
            </a>
          </div>
        )}

        {tab === "bio" && (
          <div className="ca-fade-in-section" key="bio">
            <div className="ca-eyebrow">Notre histoire</div>
            <h3 className="ca-h3">De Burger Avenue à Chez Adil</h3>

            <p className="ca-bio-text">{BIO_PARAGRAPHS[0]}</p>

            <div className="ca-bio-duo">
              <div className="ca-bio-duo-item">
                <img src="/images/bio/burger-avenue-cuisine-menu.jpg" alt="Adil en cuisine à Burger Avenue, la Demi-Lune" />
                <span className="ca-bio-duo-label">Burger Avenue 2016</span>
              </div>
              <div className="ca-bio-duo-item">
                <img src="/images/bio/adil-food-truck.jpg" alt="Adil dans le food truck Chez Adil" />
                <span className="ca-bio-duo-label">Chez Adil 2026</span>
              </div>
            </div>

            <p className="ca-bio-text">{BIO_PARAGRAPHS[1]}</p>
            <p className="ca-bio-text">{BIO_PARAGRAPHS[2]}</p>
            <p className="ca-bio-signature">— Adil</p>
          </div>
        )}
      </div>
    </div>
  );
}
