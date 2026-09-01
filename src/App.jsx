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
const PHONE_WA = "33670797856";

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

const BIO_TEXT = `À compléter : raconte ici ton histoire, depuis tes débuts chez Burger Avenue jusqu'à la création de Chez Adil.`;

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

export default function ChezAdilApp() {
  const [tab, setTab] = useState("planning");
  
  const currentDayNum = new Date().getDay();
  const todayStop = STOPS.find((s) => s.day === currentDayNum) || STOPS[0];

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
    const lines = [
      "Demande de privatisation Chez Adil",
      `Nom : ${form.nom}`,
      `Prénom : ${form.prenom}`,
      form.entreprise ? `Entreprise : ${form.entreprise}` : null,
      `Date souhaitée : ${form.date}`,
      `Nombre de personnes : ${form.personnes}`,
      form.evenement ? `Détails de l'événement : ${form.evenement}` : null,
    ].filter(Boolean);
    const message = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${PHONE_WA}?text=${message}`, "_blank");
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
        }
        .ca-app * { box-sizing: border-box; }
        .ca-app button:focus-visible, .ca-app [role="tab"]:focus-visible {
          outline: 2px solid var(--ca-brass);
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          .ca-app * { transition: none !important; animation: none !important; }
        }

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
          display: inline-block;
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

        .ca-tabs {
          display: flex;
          background: var(--ca-navy-2);
        }
        .ca-tab {
          flex: 1;
          padding: 12px 4px;
          text-align: center;
          background: none;
          border: none;
          color: rgba(243,239,230,0.55);
          font-family: 'Oswald', sans-serif;
          font-size: 12px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          cursor: pointer;
          border-bottom: 3px solid transparent;
        }
        .ca-tab.active {
          color: var(--ca-cream);
          border-bottom: 3px solid var(--ca-brass);
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
        }
        .ca-stop.today {
          background: var(--ca-navy);
          border-color: var(--ca-navy);
          color: var(--ca-cream);
        }
        .ca-stop.today .ca-stop-place { color: var(--ca-brass-light); }
        .ca-stop.off { opacity: 0.45; }
        .ca-stop-day { font-family: 'Oswald', sans-serif; font-size: 13px; letter-spacing: 0.03em; }
        .ca-stop-place-link {
          display: flex;
          align-items: baseline;
          gap: 8px;
          text-decoration: none;
        }
        .ca-stop-place { font-size: 13px; font-weight: 600; color: inherit; }
        .ca-stop-gps { font-size: 11px; color: var(--ca-brass); }
        .ca-stop.today .ca-stop-gps { color: var(--ca-brass-light); }
        .ca-stop-time { font-size: 11px; color: var(--ca-steel); }
        .ca-stop.today .ca-stop-time { color: rgba(243,239,230,0.7); }
        .ca-badge-today {
          font-size: 10px;
          background: var(--ca-brass);
          color: var(--ca-navy);
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 700;
          text-transform: uppercase;
          margin-left: 6px;
        }

        .ca-item {
          border-bottom: 1px solid #E4DFD1;
          padding: 12px 0;
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

        .ca-section-title {
          font-family: 'Oswald', sans-serif;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--ca-steel);
          margin: 20px 0 6px;
        }

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
        }
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
        }
        .ca-video-thumb {
          width: 56px; height: 56px;
          background: var(--ca-navy);
          border-radius: 6px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--ca-brass-light);
          font-size: 18px;
        }
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

        .ca-presta-item {
          padding: 12px 0;
          border-bottom: 1px solid #E4DFD1;
        }
        .ca-presta-item:last-child { border-bottom: none; }
        .ca-presta-title {
          font-family: 'Oswald', sans-serif;
          font-size: 15px;
          color: var(--ca-navy);
          margin-bottom: 4px;
        }
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
        }
      `}</style>

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
        <p className="ca-logo">
          Chez <span>Adil</span>
        </p>
        <a className="ca-phone" href={`tel:${PHONE_TEL}`}>
          {PHONE_DISPLAY}
        </a>
        <p className="ca-tagline">Burger premium &amp; artisanal · depuis 2016 · Caen &amp; alentours</p>
        <div className="ca-today-strip">
          {todayStop.place ? (
            <>
              Aujourd'hui : <b>{todayStop.place}</b> — à partir de 19h
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
          <div>
            <div className="ca-reviews" aria-label="Avis clients">
              <div className="ca-reviews-stars">
                {"★".repeat(REVIEWS[reviewIdx].rating)}
              </div>
              <p className="ca-reviews-text">« {REVIEWS[reviewIdx].text} »</p>
              <div className="ca-reviews-author">— {REVIEWS[reviewIdx].author}</div>
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
            {STOPS.map((s) => (
              <div
                key={s.day}
                className={`ca-stop ${s.day === currentDayNum ? "today" : ""} ${!s.place ? "off" : ""}`}
              >
                <div>
                  <div className="ca-stop-day">
                    {s.label}
                    {s.day === currentDayNum && <span className="ca-badge-today">Aujourd'hui</span>}
                  </div>
                  {s.place && (
                    <a
                      className="ca-stop-place-link"
                      href={mapsUrl(s.place)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="ca-stop-place">{s.place}</span>
                      <span className="ca-stop-gps">📍 Itinéraire</span>
                    </a>
                  )}
                </div>
                {s.place && <div className="ca-stop-time">dès 19h</div>}
              </div>
            ))}
          </div>
        )}

        {tab === "menu" && (
          <div>
            <div className="ca-menu-halo" aria-hidden="true" />
            <div className="ca-eyebrow">La carte</div>
            <h3 className="ca-h3">Nos burgers</h3>
            <div className="ca-item-top" style={{ marginBottom: 12 }}>
              <span>Frites maison</span>
              <span className="ca-item-price" style={{ fontSize: 18 }}>+ 3,50 €</span>
            </div>
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

            <div className="ca-section-title">Desserts</div>
            {DESSERTS.map((d) => (
              <div className="ca-item" key={d.name}>
                <div className="ca-item-top">
                  <span>{d.name}</span>
                  <span className="ca-item-price">{d.price}</span>
                </div>
              </div>
            ))}

            <div className="ca-section-title">Boissons</div>
            {DRINKS.map((d) => (
              <div className="ca-item" key={d.name}>
                <div className="ca-item-top">
                  <span>{d.name}</span>
                  <span className="ca-item-price">{d.price}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "prestations" && (
          <div>
            <div className="ca-eyebrow">Événements privés</div>
            <h3 className="ca-h3">Demande de privatisation</h3>
            <p className="ca-item-desc" style={{ marginBottom: 14 }}>
              Entreprise, anniversaire, mariage : remplis le formulaire, ta demande part
              directement au camion.
            </p>

            {sent ? (
              <div className="ca-card">
                <p className="ca-presta-desc">
                  Ta demande est prête à être envoyée. Si l'appli ne s'est pas
                  ouverte, tu peux aussi appeler directement.
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
          <div>
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
          <div>
            <div className="ca-eyebrow">Notre histoire</div>
            <h3 className="ca-h3">De Burger Avenue à Chez Adil</h3>
            <p className="ca-item-desc">{BIO_TEXT}</p>
          </div>
        )}
      </div>
    </div>
  );
}
