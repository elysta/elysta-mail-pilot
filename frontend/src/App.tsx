import React, { useEffect, useMemo, useState } from "react";

type Urgency = "Faible" | "Moyenne" | "Haute";
type Risk = "Faible" | "Moyen" | "Élevé";

type MailItem = {
  id: number;
  from: string;
  email: string;
  subject: string;
  date: string;
  box: string;
  body: string;
  summary: string;
  category: string;
  urgency: Urgency;
  risk: Risk;
  status: string;
  value?: string;
  delay?: string;
  score?: number;
};

type Analysis = {
  summary: string;
  type: string;
  urgency: Urgency;
  risk: Risk;
  missing: string[];
  hiddenRisk: string;
  action: string;
  shortReply: string;
  fullReply: string;
  salesScore?: number;
  estimatedValue?: string;
  nextStep?: string;
};

const API = {
  health: "/health",
  testConnection: "/api/mail/test-connection",
  inbox: "/api/mail/inbox",
  analyze: "/api/mail/analyze",
  createDraft: "/api/mail/create-draft",
  sendAfterValidation: "/api/mail/send-after-validation",
  odooStatus: "/api/odoo/status",
  odooSearchPartner: "/api/odoo/search-partner",
  odooCreateLead: "/api/odoo/create-lead",
};

const SIGNATURE = `\n\n--\nErwan Morelle\n+32 495 441 448\n+32 85 55 91 20\n\nElysta Atelier\nChaussée de Ciney 372\n5300 Coutisse (Andenne)\nBelgique\n\nSEMEM Art & Design SRL\nTVA BE0695884136`;

const defaultConfig = {
  imapHost: "pro3.mail.ovh.net",
  imapPort: "993",
  smtpHost: "pro3.mail.ovh.net",
  smtpPort: "465",
  email: "",
  password: "",
  fromName: "Erwan Morelle",
};

const demoMails: MailItem[] = [
  { id: 1, from: "Architecte d’intérieur", email: "studio@example.com", subject: "Projet dressing et meuble TV sur mesure", date: "Aujourd’hui · 10:44", box: "etude@elysta-atelier.be", body: "Bonjour, nous cherchons un partenaire pour la fabrication et la pose d’un dressing et d’un meuble TV sur mesure dans une rénovation haut de gamme. Pouvez-vous nous dire comment procéder pour une première analyse ?", summary: "Projet premium dressing + meuble TV. Demande de process.", category: "Lead chaud", urgency: "Haute", risk: "Moyen", status: "Nouveau", value: "8k–15k€", delay: "Répondre aujourd’hui", score: 82 },
  { id: 2, from: "GLS Belgium", email: "claims@gls.be", subject: "Réclamation — frais d’emballage et administratif", date: "Hier · 16:42", box: "erwan@elysta.be", body: "Bonjour, merci. À combien sont estimés les frais d’emballage et administratif ? Bien à vous, Valérie.", summary: "Litige transport. Attention responsabilité écrite.", category: "Litige", urgency: "Moyenne", risk: "Élevé", status: "Nouveau", value: "0€", delay: "À cadrer", score: 12 },
  { id: 3, from: "Crèche Les Lucioles", email: "direction@creche-lucioles.be", subject: "Demande de devis — meuble de rangement", date: "Lundi · 09:12", box: "info@elysta.be", body: "Bonjour, pourriez-vous nous remettre un prix pour un meuble de rangement sur mesure pour notre section des grands ?", summary: "Demande devis crèche. Infos manquantes.", category: "Devis", urgency: "Moyenne", risk: "Moyen", status: "En retard", value: "2k–5k€", delay: "Relance à faire", score: 64 },
  { id: 4, from: "SEO Promo Agency", email: "spam@example.com", subject: "Boost your ranking fast", date: "Dimanche · 20:01", box: "info@elysta.be", body: "We can put your website on page one with backlinks and cheap traffic.", summary: "Spam marketing SEO.", category: "Spam", urgency: "Faible", risk: "Faible", status: "Spam", value: "0€", delay: "Archiver", score: 0 },
];

function withSignature(text: string) {
  if (!text) return SIGNATURE.trim();
  if (text.includes("SEMEM Art & Design") || text.includes("TVA BE0695884136")) return text;
  return `${text.trim()}${SIGNATURE}`;
}

function extractEmail(value: string) {
  const match = value.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  return match ? match[0] : value;
}

function detectCategory(type: string) {
  if (type === "Projet Elysta Atelier") return "Lead chaud";
  if (type === "Litige / Transport") return "Litige";
  if (type === "Devis") return "Devis";
  if (type === "Comptabilité / Fournisseur") return "Compta";
  if (type === "SAV / Réclamation") return "SAV";
  if (type === "Spam") return "Spam";
  return "À qualifier";
}

function tone(category: string) {
  if (category === "Lead chaud") return { bg: "#ecfdf5", edge: "#22c55e", soft: "#dcfce7", ink: "#14532d" };
  if (category === "Devis") return { bg: "#fffbeb", edge: "#f59e0b", soft: "#fef3c7", ink: "#78350f" };
  if (category === "Litige") return { bg: "#fef2f2", edge: "#ef4444", soft: "#fee2e2", ink: "#7f1d1d" };
  if (category === "SAV") return { bg: "#fdf2f8", edge: "#ec4899", soft: "#fce7f3", ink: "#831843" };
  if (category === "Compta") return { bg: "#f5f3ff", edge: "#8b5cf6", soft: "#ede9fe", ink: "#4c1d95" };
  if (category === "Spam") return { bg: "#f1f5f9", edge: "#94a3b8", soft: "#e2e8f0", ink: "#334155" };
  return { bg: "#eff6ff", edge: "#3b82f6", soft: "#dbeafe", ink: "#1e3a8a" };
}

function riskClass(value: string) {
  if (value === "Élevé") return "riskHigh";
  if (value === "Moyen") return "riskMed";
  return "riskLow";
}

function defaultAnalysis(mail: MailItem): Analysis {
  const isLead = mail.category === "Lead chaud";
  const isLitige = mail.category === "Litige";
  const isSpam = mail.category === "Spam";
  if (isSpam) return { summary: "Spam probable. À archiver sans réponse.", type: "Spam", urgency: "Faible", risk: "Faible", missing: [], hiddenRisk: "Perte de temps.", action: "Classer spam.", shortReply: "", fullReply: "", salesScore: 0, estimatedValue: "0€", nextStep: "Archiver" };
  const baseReply = isLead
    ? `Bonjour,\n\nMerci pour votre message.\n\nVotre demande semble correspondre à un projet sur mesure Elysta Atelier. Pour pouvoir vous répondre sérieusement, pourriez-vous nous transmettre quelques photos de l’espace, les dimensions principales, les contraintes éventuelles, le type de finition souhaité ainsi que le délai idéal ?\n\nVous pouvez également centraliser les éléments sur etude@elysta-atelier.be.\n\nBien à vous,`
    : isLitige
    ? `Bonjour,\n\nMerci pour votre retour.\n\nAfin de pouvoir analyser correctement la situation, pourriez-vous nous transmettre le détail du calcul du montant demandé ainsi que les justificatifs correspondants ?\n\nNous pourrons ensuite vérifier les éléments en interne.\n\nBien à vous,`
    : `Bonjour,\n\nMerci pour votre message.\n\nAfin de pouvoir vous répondre correctement, pourriez-vous nous transmettre quelques photos, les dimensions utiles, les contraintes éventuelles et le délai souhaité ?\n\nBien à vous,`;
  return { summary: mail.summary || "Mail à qualifier.", type: isLead ? "Projet Elysta Atelier" : isLitige ? "Litige / Transport" : mail.category === "Devis" ? "Devis" : "Demande générale", urgency: mail.urgency, risk: mail.risk, missing: isLead ? ["photos", "dimensions", "finitions", "délai", "budget indicatif"] : ["contexte", "éléments utiles", "délai"], hiddenRisk: isLitige ? "Ne pas reconnaître de responsabilité par écrit." : "Risque de s’engager trop vite sans cadrage.", action: isLead ? "Répondre vite, qualifier, proposer échange si budget cohérent." : isLitige ? "Demander justificatifs et rester factuel." : "Demander infos manquantes.", shortReply: withSignature(baseReply), fullReply: withSignature(baseReply), salesScore: mail.score || 50, estimatedValue: mail.value || "À qualifier", nextStep: mail.delay || "Répondre" };
}

export default function App() {
  const [mode, setMode] = useState<"mock" | "live">("mock");
  const [status, setStatus] = useState("Mode mock");
  const [odooStatus, setOdooStatus] = useState("Odoo non testé");
  const [configOpen, setConfigOpen] = useState(false);
  const [config, setConfig] = useState(defaultConfig);
  const [mails, setMails] = useState<MailItem[]>(demoMails);
  const [selectedId, setSelectedId] = useState(demoMails[0].id);
  const [analysisMap, setAnalysisMap] = useState<Record<number, Analysis>>({});
  const [reply, setReply] = useState("");
  const [replyMode, setReplyMode] = useState<"shortReply" | "fullReply">("fullReply");
  const [query, setQuery] = useState("");
  const [view, setView] = useState("Tous");
  const [busy, setBusy] = useState("");
  const [voicePrompt, setVoicePrompt] = useState("");
  const [odooInfo, setOdooInfo] = useState("");
  const [learning, setLearning] = useState<Record<string, number>>({});

  const selected = mails.find((m) => m.id === selectedId) || mails[0];
  const analysis = selected ? analysisMap[selected.id] : null;
  const currentTone = tone(selected?.category || "À qualifier");

  useEffect(() => {
    if (mode === "live") {
      fetch(API.health).then((r) => (r.ok ? r.json() : Promise.reject())).then(() => setStatus("Backend OK")).catch(() => setStatus("Backend KO"));
      fetch(API.odooStatus).then((r) => (r.ok ? r.json() : Promise.reject())).then((d) => setOdooStatus(d.connected ? "Odoo connecté" : "Odoo non configuré")).catch(() => setOdooStatus("Odoo KO"));
    } else setStatus("Mode mock");
  }, [mode]);

  useEffect(() => { if (selected && !analysisMap[selected.id]) analyze(selected, true); }, [selectedId]);

  const filtered = useMemo(() => mails.filter((m) => {
    const q = `${m.from} ${m.subject} ${m.summary} ${m.body}`.toLowerCase().includes(query.toLowerCase());
    const v = view === "Tous" || (view === "Retards" && (m.status === "En retard" || m.delay?.toLowerCase().includes("relance"))) || (view === "Spam" && m.category === "Spam") || m.category === view;
    return q && v;
  }), [mails, query, view]);

  async function testConnection() {
    setBusy("test");
    try { if (mode !== "live") { setStatus("Connexion simulée OK"); return; }
      const res = await fetch(API.testConnection, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(config) });
      if (!res.ok) throw new Error(); setStatus("Mail connecté");
    } catch { setStatus("Erreur connexion"); } finally { setBusy(""); }
  }

  async function loadInbox() {
    if (mode !== "live") return;
    setBusy("inbox");
    try { const res = await fetch(`${API.inbox}?limit=30`); const data = await res.json(); if (!res.ok) throw new Error();
      const imported = (data.messages || []).map((m: any, i: number): MailItem => ({ id: Number(m.id) || Date.now() + i, from: m.from || "Expéditeur inconnu", email: extractEmail(m.from || ""), subject: m.subject || "(sans objet)", date: m.date ? new Date(m.date).toLocaleString("fr-BE") : "Date inconnue", box: config.email || "boîte connectée", body: m.body || m.snippet || "", summary: (m.snippet || m.body || "").slice(0, 120), category: "À qualifier", urgency: "Moyenne", risk: "Moyen", status: "Nouveau", score: 50 }));
      setMails(imported); if (imported[0]) setSelectedId(imported[0].id); setStatus(`Inbox chargée (${imported.length})`);
    } catch { setStatus("Erreur inbox"); } finally { setBusy(""); }
  }

  async function analyze(mail: MailItem, silent = false) {
    if (!silent) setBusy("analyse");
    try { let result: Analysis;
      if (mode === "live") { const res = await fetch(API.analyze, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ subject: mail.subject, body: mail.body }) }); const data = await res.json(); if (!res.ok) throw new Error(); result = { ...data.analysis, shortReply: withSignature(data.analysis.shortReply), fullReply: withSignature(data.analysis.fullReply) }; }
      else result = defaultAnalysis(mail);
      const category = detectCategory(result.type);
      setAnalysisMap((p) => ({ ...p, [mail.id]: result }));
      setMails((prev) => prev.map((m) => m.id === mail.id ? { ...m, category, urgency: result.urgency, risk: result.risk, summary: result.summary, value: result.estimatedValue, delay: result.nextStep, score: result.salesScore || m.score, status: "Analysé" } : m));
      if (mail.id === selectedId) setReply(result[replyMode]);
    } finally { if (!silent) setBusy(""); }
  }

  function applyQuickPrompt(kind: string) {
    const base = (reply || analysis?.fullReply || "").replace(SIGNATURE, "").trim();
    const instruction = voicePrompt.trim();
    const prefix: Record<string,string> = { court: "Version plus courte :\n\n", premium: "Version plus premium / Elysta Atelier :\n\n", ferme: "Version plus ferme et cadrée :\n\n", relance: "Relance proposée :\n\n", vocal: instruction ? `Instruction rapide : ${instruction}\n\n` : "Instruction rapide :\n\n" };
    setReply(withSignature((prefix[kind] || "") + base));
  }

  async function createDraft() { setBusy("draft"); try { if (mode !== "live") { setStatus("Brouillon simulé"); return; } await fetch(API.createDraft, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ to: selected.email, subject: selected.subject, body: reply }) }); setStatus("Brouillon créé"); } finally { setBusy(""); } }
  async function sendValidated() { setBusy("send"); try { if (mode !== "live") { setStatus("Envoi simulé"); return; } await fetch(API.sendAfterValidation, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ to: selected.email, subject: selected.subject, body: reply, approved: true }) }); setMails((prev) => prev.map((m) => m.id === selected.id ? { ...m, status: "Envoyé" } : m)); setStatus("Mail envoyé"); } finally { setBusy(""); } }
  function validate() { setLearning((p) => ({ ...p, [selected.category]: (p[selected.category] || 0) + 1 })); setMails((prev) => prev.map((m) => m.id === selected.id ? { ...m, status: "Validé" } : m)); }
  function spamAction(action: "spam" | "restore") { setMails((prev) => prev.map((m) => m.id === selected.id ? { ...m, category: action === "spam" ? "Spam" : "À qualifier", status: action === "spam" ? "Spam" : "Nouveau" } : m)); }
  async function odooSearch() { if (mode !== "live") { setOdooInfo("Odoo simulé : aucun appel réel."); return; } const res = await fetch(API.odooSearchPartner, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: selected.email, name: selected.from }) }); const data = await res.json(); setOdooInfo(data.partner ? `Contact trouvé : ${data.partner.name}` : "Aucun contact trouvé"); }
  async function odooLead() { if (mode !== "live") { setOdooInfo("Lead Odoo simulé."); return; } const res = await fetch(API.odooCreateLead, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: selected.subject, email_from: selected.email, contact_name: selected.from, partner_name: selected.from, description: selected.body }) }); const data = await res.json(); setOdooInfo(data.lead?.id ? `Lead créé #${data.lead.id}` : "Erreur création lead"); }

  return <><style>{css}</style><div className="app">
    <header className="top"><div className="brand"><div className="logo">EM</div><div><h1>Elysta Mail Pilot</h1><p>V3 Premium Sales Desk</p></div></div><div className="topActions"><span className="status">{status}</span><span className="status">{odooStatus}</span><button onClick={() => setMode("mock")} className={mode === "mock" ? "primary" : ""}>Mock</button><button onClick={() => setMode("live")} className={mode === "live" ? "primary" : ""}>Live</button><button onClick={() => setConfigOpen(!configOpen)}>⚙</button><button onClick={() => setStatus("Demande d’amélioration prête pour Bub")}>Bub</button></div></header>
    {configOpen && <section className="config"><input placeholder="IMAP host" value={config.imapHost} onChange={(e)=>setConfig({...config,imapHost:e.target.value})}/><input placeholder="IMAP port" value={config.imapPort} onChange={(e)=>setConfig({...config,imapPort:e.target.value})}/><input placeholder="SMTP host" value={config.smtpHost} onChange={(e)=>setConfig({...config,smtpHost:e.target.value})}/><input placeholder="SMTP port" value={config.smtpPort} onChange={(e)=>setConfig({...config,smtpPort:e.target.value})}/><input placeholder="Email" value={config.email} onChange={(e)=>setConfig({...config,email:e.target.value})}/><input placeholder="Password" type="password" value={config.password} onChange={(e)=>setConfig({...config,password:e.target.value})}/><button onClick={testConnection}>{busy === "test" ? "Test..." : "Tester mail"}</button><button onClick={loadInbox}>{busy === "inbox" ? "Chargement..." : "Charger inbox"}</button></section>}
    <main className="desk"><aside className="left"><div className="toolbar"><input placeholder="Recherche mail..." value={query} onChange={(e)=>setQuery(e.target.value)}/><select value={view} onChange={(e)=>setView(e.target.value)}>{["Tous","Lead chaud","Devis","Retards","Litige","SAV","Compta","Spam","À qualifier"].map(v=><option key={v}>{v}</option>)}</select></div><div className="mailList">{filtered.map(mail=>{const t=tone(mail.category);return <button key={mail.id} className={`row ${selected.id===mail.id?"active":""}`} onClick={()=>setSelectedId(mail.id)} style={{borderLeftColor:t.edge}}><div className="rowTop"><strong>{mail.from}</strong><small>{mail.date}</small></div><div className="subject">{mail.subject}</div><p>{mail.summary || mail.body.slice(0,120)}</p><div className="rowMeta"><span style={{background:t.soft,color:t.ink}}>{mail.category}</span><span className={riskClass(mail.risk)}>{mail.risk}</span>{mail.status==="En retard" && <span className="late">Retard</span>}</div></button>})}</div></aside>
    <section className="center"><div className="mailHeader" style={{borderTopColor:currentTone.edge}}><div><h2>{selected.subject}</h2><p>{selected.from} · {selected.email} · {selected.box}</p></div><div className="score"><span>{selected.score || analysis?.salesScore || 50}%</span><small>chance</small></div></div><div className="original"><h3>Mail reçu</h3><p>{selected.body}</p></div><div className="composer"><div className="composerTop"><h3>Réponse</h3><div><button onClick={()=>{setReplyMode("shortReply"); if(analysis) setReply(analysis.shortReply)}}>Courte</button><button onClick={()=>{setReplyMode("fullReply"); if(analysis) setReply(analysis.fullReply)}}>Complète</button></div></div><textarea value={reply} onChange={(e)=>setReply(e.target.value)} placeholder="Réponse IA avec signature automatique..."/><div className="quick"><button onClick={()=>applyQuickPrompt("court")}>Plus court</button><button onClick={()=>applyQuickPrompt("premium")}>Plus premium</button><button onClick={()=>applyQuickPrompt("ferme")}>Plus ferme</button><button onClick={()=>applyQuickPrompt("relance")}>Relance</button><button onClick={()=>applyQuickPrompt("vocal")}>🎤 Appliquer prompt</button></div><div className="sendbar"><button onClick={validate} className="primary">Valider</button><button onClick={createDraft}>Brouillon</button><button onClick={sendValidated}>Envoyer validé</button><button onClick={()=>spamAction("spam")}>Spam</button></div></div></section>
    <aside className="right"><section className="card"><div className="cardTitle">Radar IA</div><button className="primary full" onClick={()=>analyze(selected)}>{busy === "analyse" ? "Analyse..." : "Analyser maintenant"}</button>{analysis ? <div className="analysis"><p><b>Résumé</b><br/>{analysis.summary}</p><p><b>Action</b><br/>{analysis.action}</p><p><b>Valeur</b><br/>{analysis.estimatedValue || selected.value || "À qualifier"}</p><p className="danger"><b>Risque caché</b><br/>{analysis.hiddenRisk}</p><p><b>Infos manquantes</b><br/>{analysis.missing.join(", ")}</p></div> : <p className="muted">Analyse automatique à l’ouverture.</p>}</section><section className="card"><div className="cardTitle">Prompt rapide / oral</div><input value={voicePrompt} onChange={(e)=>setVoicePrompt(e.target.value)} placeholder="Ex: plus ferme, propose rdv jeudi..."/><button onClick={()=>applyQuickPrompt("vocal")}>Appliquer au mail</button></section><section className="card"><div className="cardTitle">Retards</div>{mails.filter(m=>m.status==="En retard"||m.delay?.toLowerCase().includes("relance")).slice(0,5).map(m=><button key={m.id} className="miniRow" onClick={()=>setSelectedId(m.id)}>{m.subject}<small>{m.delay}</small></button>)}</section><section className="card"><div className="cardTitle">Spam</div><p>{mails.filter(m=>m.category==="Spam").length} mails spam</p><button onClick={()=>spamAction("spam")}>Classer spam</button><button onClick={()=>spamAction("restore")}>Restaurer</button></section><section className="card"><div className="cardTitle">Odoo</div><p className="muted">{odooInfo || odooStatus}</p><button onClick={odooSearch}>Chercher contact</button><button onClick={odooLead}>Créer opportunité</button></section><section className="card"><div className="cardTitle">Apprentissage</div>{Object.keys(learning).length===0 ? <p className="muted">Aucune validation</p> : Object.entries(learning).map(([k,v])=><p key={k}>{k}: {v}</p>)}</section></aside></main>
  </div></>;
}

const css = `
*{box-sizing:border-box} body{margin:0;background:#f3f4f6;color:#111827;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif} button,input,select,textarea{font:inherit} button{cursor:pointer} .app{height:100vh;display:flex;flex-direction:column}.top{height:72px;background:#fff;border-bottom:1px solid #d1d5db;display:flex;align-items:center;justify-content:space-between;padding:0 18px}.brand{display:flex;align-items:center;gap:12px}.logo{width:44px;height:44px;background:#111827;color:#fff;display:grid;place-items:center;font-weight:800}.brand h1{margin:0;font-size:22px}.brand p{margin:2px 0 0;color:#6b7280;font-size:13px}.topActions{display:flex;gap:8px;align-items:center}.status{font-size:12px;background:#f3f4f6;border:1px solid #d1d5db;padding:7px 10px}button{border:1px solid #cbd5e1;background:#fff;padding:8px 11px}.primary,button.primary{background:#111827;color:white;border-color:#111827}.config{background:#fff;border-bottom:1px solid #d1d5db;padding:12px 18px;display:grid;grid-template-columns:repeat(8,1fr);gap:8px}.config input,.toolbar input,.toolbar select,.card input{border:1px solid #cbd5e1;padding:9px;background:white}.desk{flex:1;display:grid;grid-template-columns:360px minmax(520px,1fr) 340px;min-height:0}.left,.center,.right{min-height:0;overflow:auto}.left{background:#fff;border-right:1px solid #d1d5db}.toolbar{padding:12px;display:grid;grid-template-columns:1fr 130px;gap:8px;border-bottom:1px solid #e5e7eb}.mailList{display:flex;flex-direction:column}.row{border:0;border-bottom:1px solid #e5e7eb;border-left:5px solid #94a3b8;background:#fff;text-align:left;padding:12px}.row:hover,.row.active{background:#f8fafc}.row.active{outline:2px solid #111827;outline-offset:-2px}.rowTop{display:flex;justify-content:space-between;gap:8px}.rowTop strong{font-size:14px}.rowTop small,.muted{color:#6b7280}.subject{font-weight:650;margin-top:4px}.row p{font-size:13px;color:#4b5563;margin:6px 0;line-height:1.35}.rowMeta{display:flex;gap:5px;flex-wrap:wrap}.rowMeta span,.riskHigh,.riskMed,.riskLow,.late{font-size:11px;padding:3px 6px;border:1px solid #d1d5db}.riskHigh{background:#fee2e2;color:#991b1b}.riskMed{background:#fef3c7;color:#92400e}.riskLow{background:#dcfce7;color:#166534}.late{background:#ffedd5;color:#9a3412}.center{padding:16px;background:#f9fafb}.mailHeader{background:#fff;border:1px solid #d1d5db;border-top:5px solid #111827;padding:16px;display:flex;justify-content:space-between}.mailHeader h2{margin:0}.mailHeader p{margin:6px 0 0;color:#6b7280}.score{width:70px;height:70px;background:#111827;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center}.score span{font-size:22px;font-weight:800}.score small{font-size:11px}.original,.composer{background:#fff;border:1px solid #d1d5db;margin-top:12px;padding:14px}.original h3,.composer h3,.cardTitle{margin:0 0 10px;font-size:15px;text-transform:uppercase;letter-spacing:.04em;color:#374151}.original p{white-space:pre-wrap;line-height:1.45}.composerTop{display:flex;align-items:center;justify-content:space-between}.composer textarea{width:100%;min-height:270px;border:1px solid #cbd5e1;padding:12px;line-height:1.45;resize:vertical}.quick,.sendbar{display:flex;gap:7px;flex-wrap:wrap;margin-top:10px}.right{background:#fff;border-left:1px solid #d1d5db;padding:12px}.card{border:1px solid #d1d5db;background:#fff;padding:12px;margin-bottom:10px}.card button{width:100%;margin-top:7px}.full{width:100%}.analysis p{font-size:13px;line-height:1.4}.danger{color:#b91c1c}.miniRow{display:block;text-align:left;width:100%;border:1px solid #e5e7eb;background:#f9fafb;margin-top:6px}.miniRow small{display:block;color:#6b7280;margin-top:3px}@media(max-width:1200px){.desk{grid-template-columns:1fr}.left,.center,.right{height:auto}.config{grid-template-columns:1fr 1fr}.top{height:auto;align-items:flex-start;flex-direction:column;padding:12px}.topActions{flex-wrap:wrap}}
`;
