/* ===========================
   ELIMINATOR — v27 UI + v19 CORE
   Version unifiée
=========================== */

const $ = (id)=>document.getElementById(id);
const $$ = (sel, root=document)=>Array.from(root.querySelectorAll(sel));
const clamp = (n,a,b)=>Math.max(a, Math.min(b,n));
const uid = ()=>Math.random().toString(36).slice(2,10)+"_"+Date.now().toString(36);
const nowISO = ()=>new Date().toISOString();

function safeClone(obj){
  if(typeof structuredClone === "function"){
    try{ return structuredClone(obj); }catch(_){}
  }
  return JSON.parse(JSON.stringify(obj));
}

const LS_KEY = "eliminator_v27_v19_unified";
const SEASONS = ["printemps","ete","automne","hiver","noirblanc"];

const seasonLabel = (s)=>{
  const map = {
    printemps:"Printemps",
    ete:"Été",
    automne:"Automne",
    hiver:"Hiver",
    noirblanc:"Noir & blanc"
  };
  return map[s] || "Automne";
};

const SUBLINES = [
  "Une quête après l’autre.",
  "Le chaos recule, toi tu avances.",
  "Mission : calmer le bazar. Avec panache.",
  "Le destin a peur de ta to-do.",
  "Tes étorions n’ont qu’à bien se tenir.",
  "Le réel adore les listes propres."
];

function pickSubline(){
  return SUBLINES[Math.floor(Math.random()*SUBLINES.length)];
}

function svgUrl(svg){
  const enc = encodeURIComponent(svg).replace(/'/g,"%27").replace(/"/g,"%22");
  return `url("data:image/svg+xml,${enc}")`;
}

const DOODLES = {
  printemps: svgUrl(`<svg xmlns="http://www.w3.org/2000/svg" width="520" height="520" viewBox="0 0 520 520"><g fill="none" stroke="rgba(255,120,170,0.45)" stroke-width="2" stroke-linecap="round"><path d="M90 120c30-30 65-30 95 0-30 30-65 30-95 0z"/><path d="M360 110c28-22 60-22 88 0-28 22-60 22-88 0z"/></g><g fill="none" stroke="rgba(120,207,168,0.45)" stroke-width="2" stroke-linecap="round"><path d="M120 360c28-26 58-26 86 0-28 26-58 26-86 0z"/></g></svg>`),
  ete: svgUrl(`<svg xmlns="http://www.w3.org/2000/svg" width="520" height="520" viewBox="0 0 520 520"><g fill="none" stroke="rgba(242,178,75,0.45)" stroke-width="2" stroke-linecap="round"><circle cx="120" cy="120" r="22"/><path d="M120 86v-18M120 172v18M86 120H68M172 120h18"/></g><g fill="none" stroke="rgba(90,190,200,0.38)" stroke-width="2" stroke-linecap="round"><path d="M300 120c30-20 62-20 92 0-30 20-62 20-92 0z"/></g></svg>`),
  automne: svgUrl(`<svg xmlns="http://www.w3.org/2000/svg" width="520" height="520" viewBox="0 0 520 520"><g fill="none" stroke="rgba(211,138,92,0.48)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M110 140c40-20 70-10 90 10-20 30-60 40-90 10z"/><path d="M360 140c40-20 70-10 90 10-20 30-60 40-90 10z"/></g></svg>`),
  hiver: svgUrl(`<svg xmlns="http://www.w3.org/2000/svg" width="520" height="520" viewBox="0 0 520 520"><g fill="none" stroke="rgba(120,160,200,0.46)" stroke-width="2" stroke-linecap="round"><path d="M120 120l22 22M142 120l-22 22M120 98v44M98 120h44"/><path d="M360 140l26 26M386 140l-26 26M360 112v56M332 140h56"/></g></svg>`),
  noirblanc: svgUrl(`<svg xmlns="http://www.w3.org/2000/svg" width="520" height="520" viewBox="0 0 520 520"><g fill="none" stroke="rgba(0,0,0,0.28)" stroke-width="2" stroke-linecap="round"><path d="M110 140c40-20 70-10 90 10-20 30-60 40-90 10z"/><circle cx="360" cy="380" r="18"/></g></svg>`)
};

const THEMES = {
  printemps:{
    clair:{ bg:"#F9F7EC", fg:"#15120F", muted:"#5E5A54", barFill:"#7CCFA8", barEmpty:"rgba(124,207,168,.16)", barEdge:"rgba(255,255,255,.86)", accent:"rgba(255,162,190,.14)", accent2:"rgba(124,207,168,.30)", panel:"rgba(255,255,255,.72)", line:"rgba(0,0,0,.10)", glass:"rgba(255,255,255,.60)", glass2:"rgba(255,255,255,.42)", decoA:"rgba(255,162,190,.14)", decoB:"rgba(255,220,140,.10)" },
    sombre:{ bg:"#2A3A3A", fg:"#F6F2EA", muted:"#DAD2C6", barFill:"#8FE3BC", barEmpty:"rgba(143,227,188,.12)", barEdge:"rgba(255,255,255,.20)", accent:"rgba(255,170,200,.10)", accent2:"rgba(143,227,188,.20)", panel:"rgba(54,86,82,.56)", line:"rgba(255,255,255,.14)", glass:"rgba(56,86,82,.40)", glass2:"rgba(72,110,104,.24)", decoA:"rgba(255,170,200,.08)", decoB:"rgba(255,235,180,.06)" }
  },
  ete:{
    clair:{ bg:"#FFF6DF", fg:"#16120F", muted:"#6C5E52", barFill:"#F2B24B", barEmpty:"rgba(242,178,75,.16)", barEdge:"rgba(255,255,255,.88)", accent:"rgba(90,190,200,.12)", accent2:"rgba(242,178,75,.28)", panel:"rgba(255,255,255,.70)", line:"rgba(0,0,0,.10)", glass:"rgba(255,255,255,.60)", glass2:"rgba(255,255,255,.42)", decoA:"rgba(242,178,75,.14)", decoB:"rgba(90,190,200,.10)" },
    sombre:{ bg:"#263748", fg:"#F0FAFF", muted:"#D6E2EA", barFill:"#FFD07A", barEmpty:"rgba(255,208,122,.12)", barEdge:"rgba(255,255,255,.20)", accent:"rgba(255,208,122,.10)", accent2:"rgba(134,210,220,.18)", panel:"rgba(54,86,108,.56)", line:"rgba(255,255,255,.14)", glass:"rgba(54,86,108,.38)", glass2:"rgba(72,110,136,.24)", decoA:"rgba(255,208,122,.08)", decoB:"rgba(134,210,220,.08)" }
  },
  automne:{
    clair:{ bg:"#FBF4E8", fg:"#14120F", muted:"#6A5D53", barFill:"#D38A5C", barEmpty:"rgba(211,138,92,.18)", barEdge:"rgba(255,255,255,.85)", accent:"rgba(211,138,92,.18)", accent2:"rgba(211,138,92,.36)", panel:"rgba(255,255,255,.70)", line:"rgba(0,0,0,.10)", glass:"rgba(255,255,255,.58)", glass2:"rgba(255,255,255,.40)", decoA:"rgba(211,138,92,.12)", decoB:"rgba(255,210,160,.12)" },
    sombre:{ bg:"#2E3A33", fg:"#FFF3E6", muted:"#E3D3C4", barFill:"#E0A77D", barEmpty:"rgba(224,167,125,.12)", barEdge:"rgba(255,255,255,.20)", accent:"rgba(224,167,125,.12)", accent2:"rgba(224,167,125,.22)", panel:"rgba(62,82,70,.56)", line:"rgba(255,255,255,.14)", glass:"rgba(62,82,70,.38)", glass2:"rgba(74,98,84,.24)", decoA:"rgba(224,167,125,.10)", decoB:"rgba(255,245,210,.08)" }
  },
  hiver:{
    clair:{ bg:"#F5F7FA", fg:"#141B22", muted:"#61707E", barFill:"#78A0C8", barEmpty:"rgba(120,160,200,.18)", barEdge:"rgba(255,255,255,.88)", accent:"rgba(120,160,200,.16)", accent2:"rgba(120,160,200,.30)", panel:"rgba(255,255,255,.74)", line:"rgba(0,0,0,.10)", glass:"rgba(255,255,255,.58)", glass2:"rgba(255,255,255,.40)", decoA:"rgba(120,160,200,.12)", decoB:"rgba(220,240,255,.14)" },
    sombre:{ bg:"#273244", fg:"#F0FBFF", muted:"#D0DFE5", barFill:"#9DB8D5", barEmpty:"rgba(157,184,213,.12)", barEdge:"rgba(255,255,255,.20)", accent:"rgba(157,184,213,.12)", accent2:"rgba(157,184,213,.22)", panel:"rgba(54,74,98,.56)", line:"rgba(255,255,255,.14)", glass:"rgba(54,74,98,.38)", glass2:"rgba(66,92,120,.24)", decoA:"rgba(157,184,213,.10)", decoB:"rgba(242,253,255,.08)" }
  },
  noirblanc:{
    clair:{ bg:"#F7F4EE", fg:"#121212", muted:"#595959", barFill:"#4A4A4A", barEmpty:"rgba(0,0,0,.08)", barEdge:"rgba(255,255,255,.82)", accent:"rgba(0,0,0,.06)", accent2:"rgba(0,0,0,.12)", panel:"rgba(255,255,255,.74)", line:"rgba(0,0,0,.10)", glass:"rgba(255,255,255,.58)", glass2:"rgba(255,255,255,.40)", decoA:"rgba(0,0,0,.05)", decoB:"rgba(0,0,0,.03)" },
    sombre:{ bg:"#2B2F38", fg:"#F4F4F4", muted:"#D5D5D8", barFill:"#BEBEBE", barEmpty:"rgba(255,255,255,.10)", barEdge:"rgba(255,255,255,.18)", accent:"rgba(255,255,255,.08)", accent2:"rgba(255,255,255,.14)", panel:"rgba(58,64,78,.56)", line:"rgba(255,255,255,.14)", glass:"rgba(58,64,78,.40)", glass2:"rgba(72,80,98,.26)", decoA:"rgba(255,255,255,.06)", decoB:"rgba(255,255,255,.04)" }
  }
};

const defaultState = {
  ui:{
    mode:"clair",
    season:"automne",
    serious:false,
    focus:false,
    font:"yomogi",
    baseSize:16,
    leftW:360,
    rightW:420,
    showBelowList:false,
    showSets:false,
    progressStyle:"float"
  },
  settings:{
    fatigue:2,
    motivation:2,
    celebrationChance:0.30,
    tipsChance:0.18,
    tipsMinGapMin:6,
    keepListInFocus:true,
    listSort:"roulette",
    includedCats:[],
    celebrationAutoCloseSec:8
  },
  baseline:{ totalTasks:0, totalEtorions:0 },
  tasks:[],
  currentTaskId:null,
  currentTaskStart:null,
  undo:[],
  kiffances:[
    "Respire 30 secondes comme une créature légendaire.",
    "Bois une gorgée d’eau. Oui, vraiment.",
    "Range 10 objets comme un ninja du tri.",
    "Micro-marche : 60 secondes. Retour."
  ],
  pomodoro:{
    workMin:25,
    breakMin:5,
    autoStart:"auto",
    phase:"work"
  },
  notes:{
    entries:[],
    text:"",
    reminders:"",
    typhonse:[]
  },
  habits:[],
  history:[],
  sets:{
    hospital:{
      enabled:true,
      patients:4,
      itemsPerPatient:["Voir patient","Note","Traitement","Dossier"],
      checks:{}
    },
    consult:{
      enabled:true,
      patients:6,
      itemsPerPatient:["Voir patient","Note","Ordonnance","Dossier"],
      checks:{}
    }
  },
  stats:{
    tasksCompleted:0,
    etorionsDone:0,
    sessions:0,
    taskHistory:[]
  }
};

function deepAssign(t,s){
  for(const k in s){
    if(s[k] && typeof s[k]==="object" && !Array.isArray(s[k]) && t[k]){
      deepAssign(t[k], s[k]);
    }else{
      t[k] = s[k];
    }
  }
}

function migrateState(loaded){
  const merged = safeClone(defaultState);
  deepAssign(merged, loaded || {});

  if(Array.isArray(merged.notes)){
    merged.notes = {
      entries: merged.notes,
      text:"",
      reminders:"",
      typhonse:[]
    };
  }

  if(!Array.isArray(merged.notes.entries)) merged.notes.entries = [];
  if(!Array.isArray(merged.notes.typhonse)) merged.notes.typhonse = [];
  if(!Array.isArray(merged.habits)) merged.habits = [];
  if(!Array.isArray(merged.history)) merged.history = [];
  if(!Array.isArray(merged.tasks)) merged.tasks = [];
  if(!Array.isArray(merged.kiffances)) merged.kiffances = [];
  if(!Array.isArray(merged.stats.taskHistory)) merged.stats.taskHistory = [];

  merged.tasks.forEach(t=>{
    if(typeof t.etorionsTotal !== "number") t.etorionsTotal = t.etorions || 1;
    if(typeof t.etorionsLeft !== "number") t.etorionsLeft = t.etorionsTotal;
    if(typeof t.initialEtorions !== "number") t.initialEtorions = t.etorionsTotal;
    if(typeof t.done !== "boolean") t.done = false;
    if(typeof t.pinned !== "boolean") t.pinned = false;
    if(!t.cat) t.cat = "Inbox";
    if(!t.title && t.label) t.title = t.label;
  });

  return merged;
}

function loadState(){
  try{
    const raw = localStorage.getItem(LS_KEY);
    if(!raw) return safeClone(defaultState);
    return migrateState(JSON.parse(raw));
  }catch(_){
    return safeClone(defaultState);
  }
}

let state = loadState();

function saveState(){
  try{
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  }catch(_){}
}

/* ---------- helpers ---------- */

function dayKey(d=new Date()){
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2,"0");
  const da = String(d.getDate()).padStart(2,"0");
  return `${y}-${m}-${da}`;
}

function pad2(n){ return String(n).padStart(2,"0"); }

function fmtMMSS(ms){
  const s = Math.max(0, Math.floor(ms/1000));
  return `${pad2(Math.floor(s/60))}:${pad2(s%60)}`;
}

function escapeHTML(s){
  return String(s || "").replace(/[&<>"']/g, c=>(
    {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]
  ));
}

/* ---------- status ---------- */

let statusTimer = null;
function status(msg, ms=4500){
  const el = $("statusSpot");
  if(!el) return;
  el.textContent = msg || "";
  if(statusTimer) clearTimeout(statusTimer);
  if(msg){
    statusTimer = setTimeout(()=>{ el.textContent = ""; }, ms);
  }
}

/* ---------- theme ---------- */

function applyTheme(){
  const season = THEMES[state.ui.season] ? state.ui.season : "automne";
  const mode = state.ui.mode === "sombre" ? "sombre" : "clair";
  const t = THEMES[season][mode];

  const setVar = (k,v)=>document.documentElement.style.setProperty(k, v);
  setVar("--bg", t.bg);
  setVar("--fg", t.fg);
  setVar("--muted", t.muted);
  setVar("--barFill", t.barFill);
  setVar("--barEmpty", t.barEmpty);
  setVar("--barEdge", t.barEdge);
  setVar("--accent", t.accent);
  setVar("--accent2", t.accent2);
  setVar("--panelBg", t.panel);
  setVar("--line", t.line);
  setVar("--glass", t.glass);
  setVar("--glass2", t.glass2);
  setVar("--decoA", t.decoA);
  setVar("--decoB", t.decoB);
  setVar("--baseSize", `${clamp(state.ui.baseSize,14,18)}px`);

  const maxPanel = Math.max(320, Math.min(window.innerWidth - 28, 520));
  setVar("--leftW", `${clamp(state.ui.leftW, 320, maxPanel)}px`);
  setVar("--rightW", `${clamp(state.ui.rightW, 320, maxPanel)}px`);

  const doodle = DOODLES[season] || DOODLES.automne;
  setVar("--doodle", doodle);
  setVar("--doodleOpacity", mode==="sombre" ? ".14" : ".20");

  document.body.setAttribute("data-font", state.ui.font);
  document.body.setAttribute("data-mode", state.ui.mode);
  document.body.classList.toggle("is-serious", !!state.ui.serious);
  document.body.classList.toggle("is-focus", !!state.ui.focus);

  if($("modeToggle")){
    $("modeToggle").textContent = state.ui.mode === "sombre" ? "Sombre" : "Clair";
    $("modeToggle").setAttribute("aria-pressed", state.ui.mode === "sombre" ? "true" : "false");
  }
  if($("seasonCycle")) $("seasonCycle").textContent = seasonLabel(state.ui.season);
  if($("seriousToggle")){
    $("seriousToggle").textContent = state.ui.serious ? "Sérieux ON" : "Sérieux";
    $("seriousToggle").setAttribute("aria-pressed", state.ui.serious ? "true" : "false");
  }
  if($("focusBtn")){
    $("focusBtn").textContent = state.ui.focus ? "Focus ON" : "Focus";
    $("focusBtn").setAttribute("aria-pressed", state.ui.focus ? "true" : "false");
  }
}

/* ---------- panel logic ---------- */

function openPanel(which){
  $("panelBack")?.classList.add("show");
  document.body.style.overflow = "hidden";
  if(which === "left"){
    $("leftPanel")?.classList.add("open");
    $("rightPanel")?.classList.remove("open");
  }else{
    $("rightPanel")?.classList.add("open");
    $("leftPanel")?.classList.remove("open");
  }
}

function closePanels(){
  $("panelBack")?.classList.remove("show");
  $("leftPanel")?.classList.remove("open");
  $("rightPanel")?.classList.remove("open");
  document.body.style.overflow = "";
}

function initResizer(handleId, which){
  const h = $(handleId);
  if(!h) return;

  let dragging = false;
  let sx = 0;
  let sw = 0;

  const down = (x)=>{
    dragging = true;
    sx = x;
    sw = which==="left" ? state.ui.leftW : state.ui.rightW;
  };

  const move = (x)=>{
    if(!dragging) return;
    const dx = x - sx;
    if(which==="left") state.ui.leftW = clamp(sw + dx, 320, 980);
    else state.ui.rightW = clamp(sw - dx, 320, 980);
    applyTheme();
  };

  const up = ()=>{
    if(!dragging) return;
    dragging = false;
    saveState();
  };

  h.addEventListener("mousedown", (e)=>{ e.preventDefault(); down(e.clientX); });
  window.addEventListener("mousemove", (e)=>move(e.clientX));
  window.addEventListener("mouseup", up);

  h.addEventListener("touchstart", (e)=>{ e.preventDefault(); down(e.touches[0].clientX); }, {passive:false});
  window.addEventListener("touchmove", (e)=>move(e.touches[0].clientX), {passive:true});
  window.addEventListener("touchend", up);
}

/* ---------- tabs ---------- */

function bindTabs(){
  $$(".panel-left .tab-btn").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      $$(".panel-left .tab-btn").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      const key = btn.dataset.lefttab;
      $$("#leftPanel .tab-page").forEach(p=>p.classList.remove("show"));
      $(`left-${key}`)?.classList.add("show");
      if(key==="tasks") renderTasksPanel();
      if(key==="kiffance") renderKiffance();
      if(key==="prefs") syncPrefsUI();
      if(key==="export") renderExport();
    });
  });

  $$(".panel-right .tab-btn").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      $$(".panel-right .tab-btn").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      const key = btn.dataset.righttab;
      $$("#rightPanel .tab-page").forEach(p=>p.classList.remove("show"));
      $(`right-${key}`)?.classList.add("show");

      if(key==="sets") renderSetsPanel();
      if(key==="habits") renderHabitsPanel();
      if(key==="calendar") renderHistoryPanel();
      if(key==="notes") renderNotesPanel();
      if(key==="stats") renderStatsPanel();
      if(key==="mood") syncFlowPanel();
    });
  });
}

/* ---------- import / parsing ---------- */

function isAllCapsLine(line){
  const t = (line || "").trim();
  if(!t) return false;
  const hasLetters = /[A-Za-zÀ-ÖØ-öø-ÿ]/.test(t);
  if(!hasLetters) return false;
  return t === t.toUpperCase() && t.length <= 90;
}

function parseTaskLine(line){
  const raw = (line || "").trim();
  if(!raw) return null;

  const cleaned = raw.replace(/^[-*•\s]+/, "").trim();
  if(!cleaned) return null;

  let et = null;
  let title = cleaned;

  const m = cleaned.match(/^(.*?)(?:\s*[-–—]\s*|\s+)(\d+)\s*$/);
  if(m){
    title = m[1].trim();
    et = parseInt(m[2],10);
  }

  title = title.replace(/\s+/g, " ").trim();
  if(!title) return null;

  if(et!==null) et = clamp(et, 1, 99);

  return { title, etorions: et };
}

function estimateEtorions(label){
  const low = String(label || "").trim().toLowerCase();
  const matches = state.stats.taskHistory.filter(t=>String(t.label || "").toLowerCase() === low);
  if(matches.length === 0) return 3;
  const avg = matches.reduce((sum,t)=>sum + (t.etorionsUsed || 0), 0) / matches.length;
  return clamp(Math.round(avg) || 3, 1, 12);
}

function importFromInbox(text){
  const lines = String(text || "").split(/\r?\n/).map(l=>l.trim()).filter(Boolean);
  let cat = "Inbox";
  const out = [];

  for(const line of lines){
    if(isAllCapsLine(line)){
      cat = line.trim();
      continue;
    }
    const p = parseTaskLine(line);
    if(!p) continue;

    const et = p.etorions ?? estimateEtorions(p.title);

    out.push({
      id: uid(),
      title: p.title,
      label: p.title,
      cat,
      etorionsTotal: et,
      etorionsLeft: et,
      initialEtorions: et,
      pinned:false,
      done:false,
      createdAt: nowISO(),
      doneAt:null
    });
  }

  if(out.length === 0) return 0;

  pushUndo("import");
  state.tasks.push(...out);

  const totalTasks = out.length;
  const totalEtorions = out.reduce((a,t)=>a + t.etorionsTotal, 0);

  if(state.baseline.totalTasks===0 && state.baseline.totalEtorions===0){
    state.baseline.totalTasks = totalTasks;
    state.baseline.totalEtorions = totalEtorions;
  }else{
    state.baseline.totalTasks += totalTasks;
    state.baseline.totalEtorions += totalEtorions;
  }

  ensureCurrentTask();
  saveState();
  renderAll();
  return out.length;
}

/* ---------- task model ---------- */

function activeTasks(){
  const inc = state.settings.includedCats;
  return state.tasks
    .filter(t=>!t.done)
    .filter(t=>{
      if(!inc || inc.length===0) return true;
      return inc.includes(t.cat);
    });
}

function doneTasks(){
  return state.tasks.filter(t=>t.done);
}

function getTask(id){
  return state.tasks.find(t=>t.id===id) || null;
}

function sortTasks(list){
  const mode = state.settings.listSort || "roulette";

  if(mode==="alpha"){
    return [...list].sort((a,b)=>a.title.localeCompare(b.title,"fr"));
  }
  if(mode==="cat"){
    return [...list].sort((a,b)=>{
      const c = a.cat.localeCompare(b.cat,"fr");
      return c!==0 ? c : a.title.localeCompare(b.title,"fr");
    });
  }
  if(mode==="ordre"){
    return [...list].sort((a,b)=>(a.createdAt||"").localeCompare(b.createdAt||""));
  }

  return [...list].sort((a,b)=>{
    if(a.pinned && !b.pinned) return -1;
    if(!a.pinned && b.pinned) return 1;
    return (a.createdAt||"").localeCompare(b.createdAt||"");
  });
}

function ensureCurrentTask(){
  const act = activeTasks();
  if(act.length===0){
    state.currentTaskId = null;
    state.currentTaskStart = null;
    return;
  }
  const cur = getTask(state.currentTaskId);
  if(!cur || cur.done){
    const pinned = act.find(t=>t.pinned);
    state.currentTaskId = (pinned || act[0]).id;
    state.currentTaskStart = Date.now();
  }
}

function computeProgress(){
  const baseT = state.baseline.totalTasks || 0;
  const baseE = state.baseline.totalEtorions || 0;
  const rem = activeTasks();
  const remT = rem.length;
  const remE = rem.reduce((a,t)=>a + (t.etorionsLeft || 0), 0);
  const pct = baseT<=0 ? 100 : clamp(Math.round((remT/baseT)*100), 0, 100);
  return { baseT, baseE, remT, remE, pct };
}

function dopamineScore(){
  const tasks = activeTasks();
  if(tasks.length === 0) return 100;
  const totalLoad = tasks.reduce((sum,t)=>sum + (t.etorionsLeft || t.etorionsTotal || 1), 0);
  const avgLoad = totalLoad / tasks.length;
  return Math.round(Math.max(0, 100 - avgLoad * 10));
}

function roulettePick(){
  const tasks = activeTasks();
  if(tasks.length===0) return null;

  const pinned = tasks.filter(t=>t.pinned);
  let pool = pinned.length>0 ? pinned : [...tasks];

  pool.sort((a,b)=>(a.etorionsLeft || a.etorionsTotal) - (b.etorionsLeft || b.etorionsTotal));
  const sample = pool.slice(0, Math.min(3, pool.length));
  return sample[Math.floor(Math.random()*sample.length)];
}

function selectTask(id){
  const t = getTask(id);
  if(!t || t.done) return;
  state.currentTaskId = id;
  state.currentTaskStart = Date.now();
  saveState();
  renderHub();
  renderTasksPanel();
  renderBelowList();
}

function moveTask(id, delta){
  const idx = state.tasks.findIndex(t=>t.id===id);
  if(idx<0) return;
  const j = clamp(idx+delta, 0, state.tasks.length-1);
  const [it] = state.tasks.splice(idx,1);
  state.tasks.splice(j,0,it);
}

function editTaskPrompt(id){
  const t = getTask(id);
  if(!t) return;
  const nv = prompt("Éditer la tâche", t.title);
  if(nv===null) return;
  const v = nv.trim();
  if(!v) return;
  t.title = v;
  t.label = v;
  saveState();
  renderAll();
}

function deleteTask(id){
  const t = getTask(id);
  if(!t) return;
  pushUndo("delete");
  state.tasks = state.tasks.filter(x=>x.id!==id);
  if(!t.done){
    state.baseline.totalTasks = Math.max(0, state.baseline.totalTasks - 1);
    state.baseline.totalEtorions = Math.max(0, state.baseline.totalEtorions - (t.etorionsTotal || 0));
  }
  if(state.currentTaskId === id){
    state.currentTaskId = null;
    state.currentTaskStart = null;
  }
  ensureCurrentTask();
  saveState();
  renderAll();
}

function completeTask(id=state.currentTaskId){
  const t = getTask(id);
  if(!t || t.done) return;
  pushUndo("complete");
  t.done = true;
  t.doneAt = nowISO();

  state.stats.tasksCompleted++;
  state.stats.taskHistory.push({
    label:t.title,
    etorionsUsed:t.initialEtorions || t.etorionsTotal || 1,
    date:t.doneAt
  });

  snapshotDay();
  ensureCurrentTask();
  saveState();
  renderAll();
  status("Tâche terminée. Le chaos prend un coup.");
}

function restoreTask(id){
  const t = getTask(id);
  if(!t || !t.done) return;
  pushUndo("restore");
  t.done = false;
  t.doneAt = null;
  ensureCurrentTask();
  saveState();
  renderAll();
}

function degommeEtorion(){
  const t = getTask(state.currentTaskId);
  if(!t || t.done) return status("Aucune tâche à traiter.");
  pushUndo("degomme");

  t.etorionsLeft = clamp((t.etorionsLeft || 1) - 1, 0, 99);
  state.stats.etorionsDone++;

  if(t.etorionsLeft <= 0){
    completeTask(t.id);
    status("Étorions à zéro. Tâche terrassée.");
    return;
  }

  maybeShowTip();
  saveState();
  renderAll();
  status("💣 Un étorion de moins.");
}

/* ---------- undo ---------- */

function pushUndo(label){
  state.undo.unshift({ label, at: Date.now(), payload: safeClone(state) });
  state.undo = state.undo.slice(0, 25);
  saveState();
}

function doUndo(){
  const snap = state.undo.shift();
  if(!snap) return status("Rien à annuler.");
  state = migrateState(snap.payload);
  saveState();
  renderAll();
  status("Retour arrière. La timeline obéit.");
}

/* ---------- HUD ---------- */

function renderProgress(){
  const p = computeProgress();
  if($("progressFill")) $("progressFill").style.width = `${p.pct}%`;
  if($("progressPctIn")) $("progressPctIn").textContent = `${p.pct}%`;
  if($("progressBar")) $("progressBar").setAttribute("aria-valuenow", String(p.pct));
}

function renderHub(){
  ensureCurrentTask();
  const act = activeTasks();
  const done = doneTasks();
  const p = computeProgress();

  if($("statActive")) $("statActive").textContent = String(act.length);
  if($("statDone")) $("statDone").textContent = String(done.length);
  if($("statEtorions")) $("statEtorions").textContent = String(p.remE);

  if($("missionLineLeft")){
    $("missionLineLeft").textContent = `Tâches en cours (${done.length} finies · ${act.length}/${p.baseT || act.length || 0})`;
  }

  if($("pillTasks")) $("pillTasks").textContent = `${p.remT}/${p.baseT || 0} tâches`;
  if($("pillEto")) $("pillEto").textContent = `${p.remE}/${p.baseE || 0} étorions`;
  if($("pillDone")) $("pillDone").textContent = `${done.length} ${done.length>1 ? "faites" : "faite"}`;
  if($("pillMode")){
    const modeText = state.ui.focus ? "focus" : state.ui.serious ? "sérieux" : "normal";
    $("pillMode").textContent = `mode: ${modeText}`;
  }
  if($("pillFlow")){
    const f = state.settings.fatigue;
    const m = state.settings.motivation;
    const flow = (m>=3 && f<=2) ? "fort" : (m<=1 && f>=3) ? "fragile" : "stable";
    $("pillFlow").textContent = `flow: ${flow}`;
  }

  const cur = getTask(state.currentTaskId);
  if(!cur){
    $("taskTitle").textContent = "Aucune tâche sélectionnée";
    $("metaCat").textContent = "—";
    $("metaEt").textContent = "—";
    $("metaTimer").textContent = "00:00";
  }else{
    $("taskTitle").textContent = cur.title;
    $("metaCat").textContent = cur.cat || "Inbox";
    $("metaEt").textContent = `${cur.etorionsLeft}/${cur.etorionsTotal}`;
  }
}

function renderSubtitle(){
  const el = $("subtitle");
  if(el) el.textContent = pickSubline();
}

function renderMetaTimer(){
  const cur = getTask(state.currentTaskId);
  if(!cur || !state.currentTaskStart){
    if($("metaTimer")) $("metaTimer").textContent = "00:00";
    return;
  }
  const ms = Date.now() - state.currentTaskStart;
  if($("metaTimer")) $("metaTimer").textContent = fmtMMSS(ms);
}

function toggleTaskMeta(){
  const m = $("taskMetaDetails");
  if(!m) return;
  m.hidden = !m.hidden;
}

/* ---------- below list ---------- */

function applyBelowListVisible(){
  const el = $("belowList");
  if(!el) return;

  const visible = state.ui.showBelowList && (!state.ui.focus || state.settings.keepListInFocus);
  el.hidden = !visible;

  if($("listToggleBtn")){
    $("listToggleBtn").setAttribute("aria-pressed", state.ui.showBelowList ? "true" : "false");
    $("listToggleBtn").classList.toggle("active", state.ui.showBelowList);
  }
}

function renderBelowList(){
  const box = $("belowTasks");
  if(!box) return;
  const list = sortTasks(activeTasks());

  if(list.length===0){
    box.innerHTML = `<div class="muted small">Aucune tâche.</div>`;
    return;
  }

  box.innerHTML = list.slice(0,30).map(t=>{
    const isCur = t.id === state.currentTaskId;
    return `
      <div class="card-row" style="${isCur ? 'outline:2px solid var(--accent2)' : ''}">
        <div class="card-left">
          <div class="card-title">${escapeHTML(t.title)}</div>
          <div class="card-sub">${escapeHTML(t.cat)} · ${t.etorionsLeft}/${t.etorionsTotal}</div>
        </div>
        <div class="card-btns">
          <button class="icon-btn" data-act="up" data-id="${t.id}" title="Monter">↑</button>
          <button class="icon-btn" data-act="down" data-id="${t.id}" title="Descendre">↓</button>
          <button class="icon-btn" data-act="pin" data-id="${t.id}" title="Épingler">${t.pinned ? "■" : "□"}</button>
          <button class="icon-btn" data-act="sel" data-id="${t.id}" title="Sélectionner">▶</button>
          <button class="icon-btn" data-act="done" data-id="${t.id}" title="Terminer">✓</button>
        </div>
      </div>
    `;
  }).join("");

  box.querySelectorAll(".icon-btn").forEach(btn=>{
    btn.onclick = ()=>{
      const id = btn.dataset.id;
      const act = btn.dataset.act;
      const t = getTask(id);
      if(!t) return;

      if(act==="up") moveTask(id,-1);
      if(act==="down") moveTask(id,1);
      if(act==="pin") t.pinned = !t.pinned;
      if(act==="sel") selectTask(id);
      if(act==="done") completeTask(id);

      saveState();
      renderAll();
    };
  });
}

/* ---------- task panel ---------- */

function categories(){
  const set = new Set(state.tasks.map(t=>t.cat || "Inbox"));
  const out = Array.from(set).sort((a,b)=>a.localeCompare(b));
  out.unshift("Toutes");
  return out;
}

function renderCatFilter(){
  const sel = $("catFilter");
  if(!sel) return;
  const prev = sel.value || "Toutes";
  sel.innerHTML = "";
  categories().forEach(c=>{
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    sel.appendChild(opt);
  });
  sel.value = categories().includes(prev) ? prev : "Toutes";
}

function renderTasksPanel(){
  renderCatFilter();
  const root = $("taskList");
  if(!root) return;

  const cat = $("catFilter")?.value || "Toutes";
  const view = $("viewFilter")?.value || "active";
  state.settings.listSort = $("sortFilter")?.value || state.settings.listSort;

  let list = state.tasks.slice();
  if(view==="active") list = list.filter(t=>!t.done);
  if(view==="done") list = list.filter(t=>t.done);
  if(cat !== "Toutes") list = list.filter(t=>(t.cat || "Inbox") === cat);

  list = sortTasks(list);

  root.innerHTML = "";
  if(list.length===0){
    root.innerHTML = `<div class="muted small">Rien ici.</div>`;
    return;
  }

  list.forEach(t=>{
    const row = document.createElement("div");
    row.className = "card-row";

    row.innerHTML = `
      <div class="card-left">
        <div class="card-title">${escapeHTML(t.title)}</div>
        <div class="card-sub">${escapeHTML(t.cat)} · ${t.etorionsLeft}/${t.etorionsTotal}${t.done ? " · Finie" : ""}</div>
      </div>
      <div class="card-btns">
        ${!t.done ? `<button class="icon-btn" data-act="sel" data-id="${t.id}" title="Sélectionner">${t.id===state.currentTaskId ? "★" : "▶"}</button>` : ""}
        ${!t.done ? `<button class="icon-btn" data-act="done" data-id="${t.id}" title="Terminer">✓</button>` : `<button class="icon-btn" data-act="restore" data-id="${t.id}" title="Restaurer">↩</button>`}
        <button class="icon-btn" data-act="edit" data-id="${t.id}" title="Éditer">≋</button>
        <button class="icon-btn" data-act="del" data-id="${t.id}" title="Supprimer">×</button>
      </div>
    `;

    root.appendChild(row);
  });

  root.querySelectorAll(".icon-btn").forEach(btn=>{
    btn.onclick = ()=>{
      const id = btn.dataset.id;
      const act = btn.dataset.act;
      if(act==="sel") selectTask(id);
      if(act==="done") completeTask(id);
      if(act==="restore") restoreTask(id);
      if(act==="edit") editTaskPrompt(id);
      if(act==="del") deleteTask(id);
    };
  });
}

/* ---------- notes ---------- */

function addNoteEntry(text){
  const t = String(text || "").trim();
  if(!t) return;
  state.notes.entries.unshift({ id: uid(), text: t, at: nowISO() });
  state.notes.entries = state.notes.entries.slice(0, 120);
  saveState();
}

let notesSaveTimer = null;
function scheduleNotesSave(){
  if(notesSaveTimer) clearTimeout(notesSaveTimer);
  notesSaveTimer = setTimeout(()=>{
    if($("notesArea")) state.notes.text = $("notesArea").value;
    if($("remindersArea")) state.notes.reminders = $("remindersArea").value;
    if($("notesAreaPanel")) state.notes.text = $("notesAreaPanel").value;
    if($("remindersAreaPanel")) state.notes.reminders = $("remindersAreaPanel").value;
    saveState();
  }, 350);
}

function renderNotesEntries(){
  const root = $("notesEntriesList");
  if(!root) return;
  root.innerHTML = "";
  const list = state.notes.entries || [];
  if(list.length===0){
    root.innerHTML = `<div class="muted small">Aucune note horodatée.</div>`;
    return;
  }
  list.slice(0, 30).forEach(n=>{
    const dt = new Date(n.at);
    const stamp = dt.toLocaleString("fr-BE", {day:"2-digit", month:"2-digit", hour:"2-digit", minute:"2-digit"});
    const row = document.createElement("div");
    row.className = "card-row";
    row.innerHTML = `
      <div class="card-left">
        <div class="card-sub">${stamp}</div>
        <div class="card-title">${escapeHTML(n.text)}</div>
      </div>
    `;
    root.appendChild(row);
  });
}

function renderNotesPanel(){
  if($("notesAreaPanel")) $("notesAreaPanel").value = state.notes.text || "";
  if($("remindersAreaPanel")) $("remindersAreaPanel").value = state.notes.reminders || "";
}

function renderNotesOverlay(){
  if($("notesArea")) $("notesArea").value = state.notes.text || "";
  if($("remindersArea")) $("remindersArea").value = state.notes.reminders || "";
  renderNotesEntries();
}

/* ---------- typhonse ---------- */

function addTyphonse(label){
  const t = String(label || "").trim();
  if(!t) return;
  state.notes.typhonse.push({
    id: uid(),
    label:t,
    done:false,
    createdAt: nowISO()
  });
  saveState();
  renderTyphonse();
}

function toggleTyphonse(id){
  const t = state.notes.typhonse.find(x=>x.id===id);
  if(!t) return;
  t.done = !t.done;
  saveState();
  renderTyphonse();
}

function renderTyphonse(){
  const root = $("typhonseList");
  if(!root) return;
  root.innerHTML = "";

  if(state.notes.typhonse.length===0){
    root.innerHTML = `<div class="muted small">Typhonse est vide. Étonnant. Suspicious.</div>`;
    return;
  }

  state.notes.typhonse.forEach(item=>{
    const row = document.createElement("div");
    row.className = "card-row";
    row.innerHTML = `
      <div class="card-left">
        <div class="card-title">${item.done ? "✓ " : ""}${escapeHTML(item.label)}</div>
        <div class="card-sub">${item.done ? "Fait" : "En attente"}</div>
      </div>
      <div class="card-btns">
        <button class="icon-btn" data-act="toggle" data-id="${item.id}" title="Cocher">${item.done ? "↩" : "✓"}</button>
        <button class="icon-btn" data-act="del" data-id="${item.id}" title="Supprimer">×</button>
      </div>
    `;
    root.appendChild(row);
  });

  root.querySelectorAll(".icon-btn").forEach(btn=>{
    btn.onclick = ()=>{
      const id = btn.dataset.id;
      const act = btn.dataset.act;
      if(act==="toggle") toggleTyphonse(id);
      if(act==="del"){
        state.notes.typhonse = state.notes.typhonse.filter(x=>x.id!==id);
        saveState();
        renderTyphonse();
      }
    };
  });
}

/* ---------- kiffance ---------- */

function pickKiffance(){
  if(!state.kiffances.length) return "Respire. Bois de l’eau. Reviens.";
  return state.kiffances[Math.floor(Math.random()*state.kiffances.length)];
}

let lastKiffSuggestion = "";

function renderKiffance(){
  const root = $("kiffList");
  if(root){
    root.innerHTML = "";
    if(state.kiffances.length===0){
      root.innerHTML = `<div class="muted small">Aucune kiffance.</div>`;
    }else{
      state.kiffances.forEach((k, idx)=>{
        const row = document.createElement("div");
        row.className = "card-row";
        row.innerHTML = `
          <div class="card-left">
            <div class="card-title">${escapeHTML(k)}</div>
            <div class="card-sub">Récompense / pause utile</div>
          </div>
          <div class="card-btns">
            <button class="icon-btn" data-id="${idx}" title="Supprimer">×</button>
          </div>
        `;
        root.appendChild(row);
      });

      root.querySelectorAll(".icon-btn").forEach(btn=>{
        btn.onclick = ()=>{
          const idx = parseInt(btn.dataset.id,10);
          pushUndo("kiffdel");
          state.kiffances.splice(idx,1);
          saveState();
          renderKiffance();
        };
      });
    }
  }

  if($("overlayKiffList")){
    $("overlayKiffList").innerHTML = state.kiffances.length
      ? state.kiffances.map(k=>`<div class="card-row"><div class="card-left"><div class="card-title">${escapeHTML(k)}</div></div></div>`).join("")
      : `<div class="muted small">Aucune kiffance enregistrée.</div>`;
  }
}

function suggestKiffance(){
  lastKiffSuggestion = pickKiffance();
  if($("kiffSuggestionBox")) $("kiffSuggestionBox").textContent = lastKiffSuggestion;
  if($("overlayKiffSuggestion")) $("overlayKiffSuggestion").textContent = lastKiffSuggestion;
}

function addKiffanceAsTask(){
  const txt = String(lastKiffSuggestion || "").trim();
  if(!txt) return;
  pushUndo("kifftask");
  state.tasks.push({
    id: uid(),
    title: txt,
    label: txt,
    cat:"KIFFANCE",
    etorionsTotal:1,
    etorionsLeft:1,
    initialEtorions:1,
    pinned:false,
    done:false,
    createdAt: nowISO(),
    doneAt:null
  });
  state.baseline.totalTasks += 1;
  state.baseline.totalEtorions += 1;
  saveState();
  ensureCurrentTask();
  renderAll();
}

/* ---------- habits ---------- */

function addHabit(name, slots){
  const nm = String(name || "").trim();
  if(!nm) return;
  const sl = clamp(parseInt(slots,10) || 8, 3, 12);
  state.habits.push({
    id: uid(),
    name:nm,
    slots:sl,
    checks:Array.from({length:sl}, ()=>false),
    createdAt: nowISO()
  });
  saveState();
  renderHabitsPanel();
  snapshotDay();
}

function toggleHabitCheck(hId, idx){
  const h = state.habits.find(x=>x.id===hId);
  if(!h) return;
  h.checks[idx] = !h.checks[idx];
  saveState();
  renderHabitsPanel();
  snapshotDay();
}

function habitProgress(h){
  const done = h.checks.filter(Boolean).length;
  const tot = h.checks.length;
  return { done, tot, pct: tot ? Math.round(done/tot*100) : 0 };
}

function renderHabitsPanel(){
  const root = $("habitsContent");
  if(!root) return;

  root.innerHTML = "";
  if(state.habits.length===0){
    root.innerHTML = `<div class="muted small">Aucune habitude.</div>`;
    return;
  }

  state.habits.forEach(h=>{
    const p = habitProgress(h);
    const row = document.createElement("div");
    row.className = "card-block";

    row.innerHTML = `
      <div class="card-title">${escapeHTML(h.name)} (${p.done}/${p.tot})</div>
      <div class="row wrap" style="margin-top:8px;">
        ${h.checks.map((v,idx)=>`<button class="icon-btn" data-h="${h.id}" data-i="${idx}" title="Case">${v ? "✓" : "·"}</button>`).join("")}
      </div>
      <div class="row wrap">
        <button class="btn ghost" data-act="reset" data-h="${h.id}" type="button">Reset</button>
        <button class="btn ghost" data-act="del" data-h="${h.id}" type="button">Supprimer</button>
      </div>
    `;

    root.appendChild(row);
  });

  root.querySelectorAll(".icon-btn").forEach(btn=>{
    btn.onclick = ()=>{
      toggleHabitCheck(btn.dataset.h, parseInt(btn.dataset.i,10));
    };
  });

  root.querySelectorAll("button[data-act]").forEach(btn=>{
    btn.onclick = ()=>{
      const hId = btn.dataset.h;
      const act = btn.dataset.act;
      const h = state.habits.find(x=>x.id===hId);
      if(!h) return;

      if(act==="reset"){
        h.checks = h.checks.map(()=>false);
      }else if(act==="del"){
        state.habits = state.habits.filter(x=>x.id!==hId);
      }

      saveState();
      renderHabitsPanel();
      snapshotDay();
    };
  });
}

/* ---------- sets ---------- */

function initSetsChecksForToday(){
  const dk = dayKey();
  for(const key of ["hospital","consult"]){
    const s = state.sets[key];
    if(!s.checks) s.checks = {};
    if(!s.checks[dk]) s.checks[dk] = {};
  }
}

function setKeyItem(setName, pIndex, itemIndex){
  return `${setName}|p${pIndex}|i${itemIndex}`;
}

function toggleSetCheck(setName, pIndex, itemIndex){
  initSetsChecksForToday();
  const dk = dayKey();
  const set = state.sets[setName];
  const k = setKeyItem(setName, pIndex, itemIndex);
  set.checks[dk][k] = !set.checks[dk][k];
  saveState();
  renderSetsPanel();
  snapshotDay();
}

function resetSetToday(setName){
  initSetsChecksForToday();
  const dk = dayKey();
  state.sets[setName].checks[dk] = {};
  saveState();
  renderSetsPanel();
  snapshotDay();
}

function summarizeSetsToday(){
  initSetsChecksForToday();
  const dk = dayKey();
  const out = {};
  for(const key of ["hospital","consult"]){
    const set = state.sets[key];
    const checks = set.checks?.[dk] || {};
    const total = set.patients * set.itemsPerPatient.length;
    const done = Object.values(checks).filter(Boolean).length;
    out[key] = { done, total };
  }
  return out;
}

function renderSetsPanel(){
  const root = $("setsContent");
  if(!root) return;
  initSetsChecksForToday();

  const dk = dayKey();

  const buildSet = (key, title)=>{
    const set = state.sets[key];
    const checks = set.checks?.[dk] || {};
    const items = set.itemsPerPatient;

    const wrap = document.createElement("div");
    wrap.className = "card-block";

    let html = `
      <div class="card-title">${title}</div>
      <div class="card-sub">${Object.values(checks).filter(Boolean).length}/${set.patients * items.length}</div>
    `;

    for(let p=1; p<=set.patients; p++){
      html += `<div class="divider"></div><div class="card-sub">Patient ${p}</div>`;
      items.forEach((it, idx)=>{
        const k = setKeyItem(key, p, idx);
        const on = !!checks[k];
        html += `
          <div class="card-row">
            <div class="card-left">
              <div class="card-title">${escapeHTML(it)}</div>
            </div>
            <div class="card-btns">
              <button class="icon-btn" data-set="${key}" data-p="${p}" data-i="${idx}" title="Cocher">${on ? "✓" : "·"}</button>
            </div>
          </div>
        `;
      });
    }

    wrap.innerHTML = html;
    return wrap;
  };

  root.innerHTML = "";
  root.appendChild(buildSet("hospital","HOSPITALIER"));
  root.appendChild(buildSet("consult","CONSULTATION"));

  root.querySelectorAll(".icon-btn").forEach(btn=>{
    btn.onclick = ()=>{
      toggleSetCheck(btn.dataset.set, parseInt(btn.dataset.p,10), parseInt(btn.dataset.i,10));
    };
  });

  if($("setsToggleBtn")){
    $("setsToggleBtn").setAttribute("aria-pressed", state.ui.showSets ? "true" : "false");
    $("setsToggleBtn").classList.toggle("active", state.ui.showSets);
  }
}

/* ---------- history / stats ---------- */

function snapshotDay(){
  const dk = dayKey();
  const doneToday = state.tasks.filter(t=>t.done && t.doneAt && t.doneAt.startsWith(dk));
  const active = activeTasks();
  const baseE = state.baseline.totalEtorions || 0;
  const doneE = state.stats.etorionsDone || 0;

  const habitsSummary = state.habits.map(h=>{
    const p = habitProgress(h);
    return { name:h.name, done:p.done, total:p.tot };
  });

  const entry = {
    day: dk,
    doneTitles: doneToday.map(t=>t.title),
    remainingTitles: active.map(t=>t.title),
    doneTasks: doneToday.length,
    remainingTasks: active.length,
    doneEtorions: doneE,
    baselineEtorions: baseE,
    habits: habitsSummary,
    sets: summarizeSetsToday()
  };

  const idx = state.history.findIndex(x=>x.day===dk);
  if(idx>=0) state.history[idx] = entry;
  else state.history.unshift(entry);

  saveState();
}

function exportTodayText(){
  snapshotDay();
  const dk = dayKey();
  const e = state.history.find(x=>x.day===dk);
  if(!e) return "Aucune donnée.";

  const lines = [];
  lines.push(`ELIMINATOR — RAPPORT JOURNALIER — ${dk}`);
  lines.push("");
  lines.push(`TÂCHES FAITES (${e.doneTasks})`);
  if(e.doneTitles.length===0) lines.push("—");
  else e.doneTitles.forEach(t=>lines.push(`- ${t}`));
  lines.push("");
  lines.push(`TÂCHES RESTANTES (${e.remainingTasks})`);
  if(e.remainingTitles.length===0) lines.push("—");
  else e.remainingTitles.forEach(t=>lines.push(`- ${t}`));
  lines.push("");
  lines.push(`HABITUDES`);
  if(!e.habits.length) lines.push("—");
  else e.habits.forEach(h=>lines.push(`- ${h.name}: ${h.done}/${h.total}`));
  lines.push("");
  lines.push(`SETS`);
  const hs = e.sets?.hospital || {done:0,total:0};
  const cs = e.sets?.consult || {done:0,total:0};
  lines.push(`- HOSPITALIER: ${hs.done}/${hs.total}`);
  lines.push(`- CONSULTATION: ${cs.done}/${cs.total}`);
  lines.push("");
  lines.push(`STATS`);
  lines.push(`- ÉTORIONS DÉGOMMÉS: ${e.doneEtorions}`);
  lines.push(`- BASE ÉTORIONS: ${e.baselineEtorions}`);
  return lines.join("\n");
}

function renderHistoryPanel(){
  const root = $("historyContent");
  if(root){
    root.innerHTML = "";
    if(state.history.length===0){
      root.innerHTML = `<div class="muted small">Pas encore d’historique.</div>`;
    }else{
      state.history.slice(0,14).forEach(h=>{
        const row = document.createElement("div");
        row.className = "card-row";
        row.innerHTML = `
          <div class="card-left">
            <div class="card-sub">${h.day}</div>
            <div class="card-title">Faites: ${h.doneTasks} · Restantes: ${h.remainingTasks} · Étorions: ${h.doneEtorions}</div>
          </div>
        `;
        root.appendChild(row);
      });
    }
  }

  const grid = $("calendarGrid");
  if(grid){
    const days = [];
    const today = new Date();
    for(let i=29;i>=0;i--){
      const d = new Date(today);
      d.setDate(today.getDate()-i);
      days.push(dayKey(d));
    }

    const map = {};
    state.history.forEach(e=>{ map[e.day] = e.doneTasks || 0; });
    const max = Math.max(1, ...Object.values(map), 1);

    grid.innerHTML = days.map(dk=>{
      const v = map[dk] || 0;
      const intensity = clamp(v/max, 0, 1);
      const op = 0.08 + intensity * 0.40;
      const dd = new Date(dk);
      return `
        <div class="calendar-cell" title="${dk} — ${v} tâche(s)">
          <div class="calendar-cell-fill" style="opacity:${op}"></div>
          <div class="calendar-cell-label">${String(dd.getDate()).padStart(2,"0")}</div>
        </div>
      `;
    }).join("");
  }
}

function renderStatsPanel(){
  const p = computeProgress();
  const dopamine = dopamineScore();

  const lines = [
    `Tâches complétées : ${state.stats.tasksCompleted}`,
    `Étorions dégommés : ${state.stats.etorionsDone}`,
    `Sessions : ${state.stats.sessions}`,
    `Progression restante : ${p.pct}%`,
    `Dopamine score : ${dopamine}%`,
    `Habitudes : ${state.habits.length}`,
    `Tâches actives : ${activeTasks().length}`
  ];

  if($("statsContent")){
    $("statsContent").innerHTML = lines.map(x=>`<div class="card-row"><div class="card-left"><div class="card-title">${escapeHTML(x)}</div></div></div>`).join("");
  }

  if($("statsContentPanel")){
    $("statsContentPanel").innerHTML = lines.map(x=>`<div class="card-row"><div class="card-left"><div class="card-title">${escapeHTML(x)}</div></div></div>`).join("");
  }
}

/* ---------- export ---------- */

function renderExport(){
  const out = $("exportOut");
  if(out) out.value = JSON.stringify(state, null, 2);
}

async function copyText(text){
  try{
    await navigator.clipboard.writeText(text);
    status("Copié.");
  }catch(_){
    status("Impossible de copier.");
  }
}

/* ---------- celebration / tips ---------- */

const TIPS_POOL = [
  { t:"RÈGLE DU LASER", m:"Une seule cible. Pas de multi-onglets. Pas de drame. Exécution." },
  { t:"MICRO-PAUSE", m:"Eau + 5 respirations lentes. Puis retour immédiat." },
  { t:"ANTI-FRICTION", m:"Retire un obstacle matériel maintenant. Un seul." },
  { t:"MINUTEUR MENTAL", m:"Fais juste un étorion. Après tu renégocies." }
];

function showTip(force=false){
  if(!force && Math.random() > state.settings.tipsChance) return;
  const tip = TIPS_POOL[Math.floor(Math.random()*TIPS_POOL.length)];
  status(`${tip.t} — ${tip.m}`, 7000);
}

/* ---------- pomodoro ---------- */

let pomoTimer = null;
let pomoRunning = false;
let remainingMs = 0;

function currentPhaseMinutes(){
  return state.pomodoro.phase === "break" ? state.pomodoro.breakMin : state.pomodoro.workMin;
}

function resetPhase(){
  remainingMs = clamp(currentPhaseMinutes(), 1, 120) * 60 * 1000;
  if($("pomoTime")) $("pomoTime").textContent = fmtMMSS(remainingMs);
}

function pausePomo(){
  pomoRunning = false;
  if(pomoTimer) clearInterval(pomoTimer);
  pomoTimer = null;
  $("pomoTime")?.classList.remove("running");
}

function playPomo(){
  if(pomoRunning) return;
  if(!remainingMs) resetPhase();
  pomoRunning = true;
  $("pomoTime")?.classList.add("running");

  pomoTimer = setInterval(()=>{
    remainingMs -= 250;
    if(remainingMs <= 0){
      remainingMs = 0;
      if($("pomoTime")) $("pomoTime").textContent = "00:00";
      pausePomo();

      state.pomodoro.phase = state.pomodoro.phase === "work" ? "break" : "work";
      saveState();
      status(`⏰ ${state.pomodoro.phase === "work" ? "Pomodoro" : "Pause"} prêt.`);

      resetPhase();
      if(state.pomodoro.autoStart === "auto") playPomo();
      return;
    }
    if($("pomoTime")) $("pomoTime").textContent = fmtMMSS(remainingMs);
  }, 250);
}

function togglePomo(){
  if(pomoRunning) pausePomo();
  else playPomo();
}

/* ---------- overlay ---------- */

function closeOverlay(){
  $("overlayModal").hidden = true;
  $("modalBack").hidden = true;
  $$(".overlay-page").forEach(p=>{
    p.hidden = true;
    p.classList.remove("show");
  });
}

function openOverlay(which){
  $("overlayModal").hidden = false;
  $("modalBack").hidden = false;
  $$(".overlay-page").forEach(p=>{
    p.hidden = true;
    p.classList.remove("show");
  });

  const page = $(`overlay-${which}`);
  if(page){
    page.hidden = false;
    page.classList.add("show");
  }

  const titleMap = {
    notes:"Notes",
    typhonse:"Typhonse",
    kiffance:"Kiffance",
    stats:"Stats"
  };
  if($("overlayTitle")) $("overlayTitle").textContent = titleMap[which] || "Fenêtre";

  if(which==="notes") renderNotesOverlay();
  if(which==="typhonse") renderTyphonse();
  if(which==="kiffance"){
    renderKiffance();
    suggestKiffance();
  }
  if(which==="stats") renderStatsPanel();
}

/* ---------- prefs sync ---------- */

function syncPrefsUI(){
  if($("modeSel")) $("modeSel").value = state.ui.mode;
  if($("seasonSel")) $("seasonSel").value = state.ui.season;
  if($("fontSel")) $("fontSel").value = state.ui.font;
  if($("uiScale")) $("uiScale").value = state.ui.baseSize;
  if($("seriousSel")) $("seriousSel").value = state.ui.serious ? "on" : "off";
  if($("keepListFocusSel")) $("keepListFocusSel").value = String(!!state.settings.keepListInFocus);
  if($("fatigueSel")) $("fatigueSel").value = state.settings.fatigue;
  if($("motivationSel")) $("motivationSel").value = state.settings.motivation;
  if($("workMinSel")) $("workMinSel").value = state.pomodoro.workMin;
  if($("breakMinSel")) $("breakMinSel").value = state.pomodoro.breakMin;
}

function syncFlowPanel(){
  if($("fatigueInline")) $("fatigueInline").value = state.settings.fatigue;
  if($("motivationInline")) $("motivationInline").value = state.settings.motivation;
  if($("celeChanceInline")) $("celeChanceInline").value = state.settings.celebrationChance;
  if($("tipsChanceInline")) $("tipsChanceInline").value = state.settings.tipsChance;
}

function applyPrefsFromPanel(){
  state.ui.mode = $("modeSel")?.value || state.ui.mode;
  state.ui.season = $("seasonSel")?.value || state.ui.season;
  state.ui.font = $("fontSel")?.value || state.ui.font;
  state.ui.baseSize = clamp(parseInt($("uiScale")?.value,10) || state.ui.baseSize, 14, 18);
  state.ui.serious = ($("seriousSel")?.value || "off") === "on";
  state.settings.keepListInFocus = ($("keepListFocusSel")?.value || "true") === "true";
  state.settings.fatigue = clamp(parseInt($("fatigueSel")?.value,10) || state.settings.fatigue, 0, 4);
  state.settings.motivation = clamp(parseInt($("motivationSel")?.value,10) || state.settings.motivation, 0, 4);
  state.pomodoro.workMin = clamp(parseInt($("workMinSel")?.value,10) || state.pomodoro.workMin, 5, 90);
  state.pomodoro.breakMin = clamp(parseInt($("breakMinSel")?.value,10) || state.pomodoro.breakMin, 1, 30);
  saveState();
  applyTheme();
  renderAll();
}

function resetPrefs(){
  state.ui.mode = "clair";
  state.ui.season = "automne";
  state.ui.serious = false;
  state.ui.font = "yomogi";
  state.ui.baseSize = 16;
  state.settings.keepListInFocus = true;
  state.settings.fatigue = 2;
  state.settings.motivation = 2;
  state.pomodoro.workMin = 25;
  state.pomodoro.breakMin = 5;
  saveState();
  syncPrefsUI();
  applyTheme();
  renderAll();
}

/* ---------- reset ---------- */

function resetDay(){
  pushUndo("reset");
  state.tasks = [];
  state.baseline = { totalTasks:0, totalEtorions:0 };
  state.currentTaskId = null;
  state.currentTaskStart = null;
  state.stats.sessions++;
  state.stats.tasksCompleted = 0;
  state.stats.etorionsDone = 0;
  state.undo = [];
  saveState();
  renderAll();
  status("Reset total. Le vide attend tes ordres.");
}

/* ---------- render all ---------- */

function renderAll(){
  applyTheme();
  renderSubtitle();
  renderProgress();
  renderHub();
  renderTasksPanel();
  renderBelowList();
  applyBelowListVisible();
  renderKiffance();
  renderHabitsPanel();
  renderSetsPanel();
  renderHistoryPanel();
  renderStatsPanel();
  renderNotesPanel();
  renderMetaTimer();
  renderExport();
}

/* ---------- timers ---------- */

let currentTaskTimer = null;
function startCurrentTaskTimer(){
  if(currentTaskTimer) clearInterval(currentTaskTimer);
  currentTaskTimer = setInterval(()=>{
    renderMetaTimer();
  }, 500);
}

/* ---------- binds ---------- */

function bindUI(){
  $("btnLeft")?.addEventListener("click", ()=>openPanel("left"));
  $("btnRight")?.addEventListener("click", ()=>openPanel("right"));
  $("leftClose")?.addEventListener("click", closePanels);
  $("rightClose")?.addEventListener("click", closePanels);
  $("panelBack")?.addEventListener("click", closePanels);

  $("modeToggle")?.addEventListener("click", ()=>{
    state.ui.mode = state.ui.mode === "sombre" ? "clair" : "sombre";
    saveState();
    applyTheme();
  });

  $("seasonCycle")?.addEventListener("click", ()=>{
    const idx = SEASONS.indexOf(state.ui.season);
    state.ui.season = SEASONS[(idx+1) % SEASONS.length];
    saveState();
    applyTheme();
  });

  $("seriousToggle")?.addEventListener("click", ()=>{
    state.ui.serious = !state.ui.serious;
    saveState();
    applyTheme();
    renderHub();
  });

  $("focusBtn")?.addEventListener("click", ()=>{
    state.ui.focus = !state.ui.focus;
    saveState();
    applyTheme();
    renderHub();
    applyBelowListVisible();
  });

  $("listToggleBtn")?.addEventListener("click", ()=>{
    state.ui.showBelowList = !state.ui.showBelowList;
    saveState();
    applyBelowListVisible();
  });

  $("setsToggleBtn")?.addEventListener("click", ()=>{
    state.ui.showSets = !state.ui.showSets;
    saveState();
    renderSetsPanel();
  });

  $("btnHideBelow")?.addEventListener("click", ()=>{
    state.ui.showBelowList = false;
    saveState();
    applyBelowListVisible();
  });

  $("undoBtn")?.addEventListener("click", doUndo);

  $("rouletteBtn")?.addEventListener("click", ()=>{
    const wheel = $("rouletteWheel");
    if(wheel){
      wheel.classList.remove("spinning");
      void wheel.offsetWidth;
      wheel.classList.add("spinning");
    }
    const pick = roulettePick();
    if(!pick) return status("Rien à tirer.");
    state.currentTaskId = pick.id;
    state.currentTaskStart = Date.now();
    saveState();
    renderHub();
    renderBelowList();
    setTimeout(()=>wheel?.classList.remove("spinning"), 900);
    showTip();
  });

  $("bombBtn")?.addEventListener("click", degommeEtorion);

  $("doneTaskBtn")?.addEventListener("click", ()=>completeTask());
  $("editTaskBtn")?.addEventListener("click", ()=>editTaskPrompt(state.currentTaskId));
  $("taskInfoBtn")?.addEventListener("click", toggleTaskMeta);

  $("openNotes")?.addEventListener("click", ()=>openOverlay("notes"));
  $("openTyphonse")?.addEventListener("click", ()=>openOverlay("typhonse"));
  $("openKiffance")?.addEventListener("click", ()=>openOverlay("kiffance"));
  $("openStats")?.addEventListener("click", ()=>openOverlay("stats"));
  $("belowListToggleBtn")?.addEventListener("click", ()=>{
    state.ui.showBelowList = !state.ui.showBelowList;
    saveState();
    applyBelowListVisible();
  });

  $("overlayClose")?.addEventListener("click", closeOverlay);
  $("modalBack")?.addEventListener("click", ()=>{
    closeOverlay();
    $("pomoModal").hidden = true;
    $("modalBack").hidden = true;
  });

  $("inboxAdd")?.addEventListener("click", ()=>{
    const n = importFromInbox($("inboxText")?.value || "");
    if(n>0){
      addNoteEntry(`Import de ${n} tâche(s).`);
      $("inboxText").value = "";
      status(`${n} tâche(s) importée(s).`);
    }else{
      status("Rien importé.");
    }
  });

  $("inboxClear")?.addEventListener("click", ()=>{ $("inboxText").value = ""; });

  $("catFilter")?.addEventListener("change", renderTasksPanel);
  $("viewFilter")?.addEventListener("change", renderTasksPanel);
  $("sortFilter")?.addEventListener("change", ()=>{
    state.settings.listSort = $("sortFilter").value;
    saveState();
    renderTasksPanel();
    renderBelowList();
  });

  $("kiffAdd")?.addEventListener("click", ()=>{
    const txt = $("kiffNew")?.value?.trim();
    if(!txt) return;
    state.kiffances.push(txt);
    $("kiffNew").value = "";
    saveState();
    renderKiffance();
  });

  $("kiffSuggest")?.addEventListener("click", suggestKiffance);
  $("kiffToTask")?.addEventListener("click", addKiffanceAsTask);
  $("overlayKiffRefresh")?.addEventListener("click", suggestKiffance);
  $("overlayKiffToTask")?.addEventListener("click", addKiffanceAsTask);

  $("prefsApply")?.addEventListener("click", applyPrefsFromPanel);
  $("prefsReset")?.addEventListener("click", resetPrefs);

  $("exportBtn")?.addEventListener("click", ()=>copyText(JSON.stringify(state, null, 2)));
  $("reportBtn")?.addEventListener("click", ()=>copyText(exportTodayText()));
  $("wipeBtn")?.addEventListener("click", resetDay);

  $("habitAddBtn")?.addEventListener("click", ()=>{
    addHabit($("habitName")?.value, $("habitSlots")?.value);
    if($("habitName")) $("habitName").value = "";
  });

  $("hospPatients")?.addEventListener("change", (e)=>{
    state.sets.hospital.patients = clamp(parseInt(e.target.value,10) || 4, 1, 20);
    saveState();
    renderSetsPanel();
  });

  $("consPatients")?.addEventListener("change", (e)=>{
    state.sets.consult.patients = clamp(parseInt(e.target.value,10) || 6, 1, 30);
    saveState();
    renderSetsPanel();
  });

  $("hospResetToday")?.addEventListener("click", ()=>resetSetToday("hospital"));
  $("consResetToday")?.addEventListener("click", ()=>resetSetToday("consult"));

  $("saveFlowBtn")?.addEventListener("click", ()=>{
    state.settings.fatigue = clamp(parseInt($("fatigueInline").value,10) || state.settings.fatigue, 0, 4);
    state.settings.motivation = clamp(parseInt($("motivationInline").value,10) || state.settings.motivation, 0, 4);
    state.settings.celebrationChance = clamp(Number($("celeChanceInline").value) || state.settings.celebrationChance, 0, 1);
    state.settings.tipsChance = clamp(Number($("tipsChanceInline").value) || state.settings.tipsChance, 0, 1);
    saveState();
    renderHub();
    renderStatsPanel();
    status("Flow sauvé.");
  });

  $("testTipBtn")?.addEventListener("click", ()=>showTip(true));
  $("testCeleBtn")?.addEventListener("click", ()=>status("Célébration test. Tu survis. C’est déjà beaucoup.", 5000));

  $("notesArea")?.addEventListener("input", scheduleNotesSave);
  $("remindersArea")?.addEventListener("input", scheduleNotesSave);
  $("notesAreaPanel")?.addEventListener("input", scheduleNotesSave);
  $("remindersAreaPanel")?.addEventListener("input", scheduleNotesSave);

  $("btnAddTyphonse")?.addEventListener("click", ()=>{
    addTyphonse($("typhonseInput")?.value);
    if($("typhonseInput")) $("typhonseInput").value = "";
  });

  $("pomoTime")?.addEventListener("click", togglePomo);
  $("pomoEdit")?.addEventListener("click", ()=>{
    $("pomoModal").hidden = false;
    $("modalBack").hidden = false;
    $("pomoMinutes").value = state.pomodoro.workMin;
    $("breakMinutes").value = state.pomodoro.breakMin;
    $("autoStartSel").value = state.pomodoro.autoStart;
  });

  $("modalClose")?.addEventListener("click", ()=>{
    $("pomoModal").hidden = true;
    $("modalBack").hidden = true;
  });

  $("pomoApply")?.addEventListener("click", ()=>{
    state.pomodoro.workMin = clamp(parseInt($("pomoMinutes").value,10) || 25, 5, 90);
    state.pomodoro.breakMin = clamp(parseInt($("breakMinutes").value,10) || 5, 1, 30);
    state.pomodoro.autoStart = $("autoStartSel").value || "auto";
    saveState();
    resetPhase();
    $("pomoModal").hidden = true;
    $("modalBack").hidden = true;
  });

  $("pomoReset")?.addEventListener("click", ()=>{
    pausePomo();
    resetPhase();
  });
}

/* ---------- init ---------- */

function init(){
  applyTheme();
  bindTabs();
  bindUI();
  initResizer("leftResizer","left");
  initResizer("rightResizer","right");
  syncPrefsUI();
  syncFlowPanel();
  renderSubtitle();
  renderNotesOverlay();
  renderTyphonse();
  renderKiffance();
  renderHabitsPanel();
  renderSetsPanel();
  renderHistoryPanel();
  renderStatsPanel();
  renderAll();
  resetPhase();
  startCurrentTaskTimer();

  if($("hospPatients")) $("hospPatients").value = state.sets.hospital.patients;
  if($("consPatients")) $("consPatients").value = state.sets.consult.patients;
}

window.addEventListener("resize", applyTheme);
document.addEventListener("DOMContentLoaded", init);
