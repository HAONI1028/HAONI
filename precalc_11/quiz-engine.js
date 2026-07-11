/* Pre-Calculus 11 — shared challenge-quiz engine.
   Loaded AFTER questions/<unit>.js, which defines window.UNIT.
   Edit quiz behaviour here; edit question banks in questions/*.js. */

/* =========================================================================
   QUIZ ENGINE — random draw + option shuffle + confirm-to-lock
   ========================================================================= */
const QUESTIONS = window.UNIT.questions;
const LETTERS = ["A","B","C","D"];
const TOPIC_ORDER = window.UNIT.topicOrder;
const QUIZ_SIZE = window.UNIT.meta.quizSize || 50;

let state = null;
const app = document.getElementById("app");

function shuffle(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); const t=a[i]; a[i]=a[j]; a[j]=t; }
  return a;
}

function buildDeck(){
  const pick = shuffle(QUESTIONS).slice(0, Math.min(QUIZ_SIZE, QUESTIONS.length));
  return pick.map(q=>{
    const order = shuffle(q.options.map((_,k)=>k));   // random permutation of option positions
    const options = order.map(k=>q.options[k]);
    const answer = order.indexOf(q.answer);
    return { topic:q.topic, q:q.q, options, answer, trap:q.trap, tip:q.tip };
  });
}

function renderMath(el){
  if(window.renderMathInElement){
    renderMathInElement(el,{delimiters:[{left:"\\(",right:"\\)",display:false}],throwOnError:false});
  }
}

function startScreen(){
  const counts = {};
  TOPIC_ORDER.forEach(t=>counts[t]=0);
  QUESTIONS.forEach(q=>counts[q.topic]++);
  const runCount = loadRuns().length;
  const sub = document.getElementById("subline");
  if(sub) sub.textContent = QUIZ_SIZE + " harder randomized questions each attempt · drawn from a bank of " + QUESTIONS.length;
  app.innerHTML = `
    <div class="card anim">
      <p class="lede">A fresh, shuffled set of <b>${QUIZ_SIZE}</b> harder questions is drawn from a bank of <b>${QUESTIONS.length}</b> every time you begin, and the answer choices are re-ordered too — so retaking never gives the same paper twice. Pick an option, then press <b>Confirm</b> to lock it in and see the correct answer, the common trap, and a tip.</p>
      <ul class="topics">
        ${TOPIC_ORDER.map(t=>`<li><span>${t}</span><span>${counts[t]} in bank</span></li>`).join("")}
      </ul>
      <div class="note"><b>How to use it:</b>&nbsp;These are multi-step, exam-plus questions. Read the trap on every one — those are the exact slips that cost marks. Retake as many times as you like to drill.</div>
      <div class="btn-row"><button class="btn" onclick="begin()">Begin test</button></div>
      <div class="btn-row"><button class="btn ghost" onclick="recordsScreen()">${runCount ? `View records (${runCount})` : "Records"}</button></div>
    </div>`;
}

function begin(){
  const deck = buildDeck();
  state = { i:0, deck, chosen:new Array(deck.length).fill(null), selected:new Array(deck.length).fill(null), score:0 };
  renderQuestion();
  window.scrollTo({top:0,behavior:"smooth"});
}

function renderQuestion(){
  const idx = state.i, q = state.deck[idx], picked = state.chosen[idx];
  const skipped = picked === "skip";
  const answered = picked !== null && !skipped;
  const done = picked !== null;
  const pct = ((idx + (done?1:0)) / state.deck.length) * 100;

  app.innerHTML = `
    <div class="topbar">
      <div class="counter"><span class="qn">${idx+1}</span> / ${state.deck.length}</div>
      <div class="score-chip">Score ${state.score}</div>
    </div>
    <div class="track"><div class="fill" style="width:${pct}%"></div></div>
    <div class="card anim">
      <span class="tag">${q.topic}</span>
      <p class="question">${q.q}</p>
      <div class="options" id="opts">
        ${q.options.map((o,k)=>`
          <button class="opt" data-k="${k}" onclick="choose(${k})">
            <span class="letter">${LETTERS[k]}</span><span>${o}</span>
          </button>`).join("")}
      </div>
      <div id="confirmRow"></div>
      <div id="fb"></div>
      <div id="nav"></div>
    </div>`;
  renderMath(app);

  if(skipped){
    showSkipped(idx, false);
  }else if(answered){
    showFeedback(idx, picked, false);
  }else{
    const confirmBtn = `<button class="btn" id="confirmBtn" disabled onclick="confirmAnswer()">Confirm answer</button>`;
    document.getElementById("confirmRow").innerHTML =
      `<div class="confirm-hint">Select an answer, then confirm — or skip if it's too easy.</div>` +
      (idx>0
        ? `<div class="btn-row two"><button class="btn ghost" onclick="prev()">Previous</button>${confirmBtn}</div>`
        : `<div class="btn-row">${confirmBtn}</div>`) +
      `<div class="btn-row"><button class="btn subtle" onclick="skipQuestion()">Skip — too easy (doesn't count)</button></div>`;
    // restore a tentative pick if the user left this question and came back
    const sel = state.selected[idx];
    if(sel !== null && sel !== undefined){
      document.querySelectorAll("#opts .opt").forEach(btn=>btn.classList.toggle("selected", +btn.dataset.k === sel));
      const cb = document.getElementById("confirmBtn"); if(cb) cb.disabled = false;
    }
  }
}

function choose(k){
  const idx = state.i;
  if(state.chosen[idx] !== null) return;         // already locked
  state.selected[idx] = k;
  document.querySelectorAll("#opts .opt").forEach(btn=>{
    btn.classList.toggle("selected", +btn.dataset.k === k);
  });
  const cb = document.getElementById("confirmBtn");
  if(cb) cb.disabled = false;
}

function confirmAnswer(){
  const idx = state.i;
  if(state.chosen[idx] !== null) return;
  const k = state.selected[idx];
  if(k === null || k === undefined) return;
  state.chosen[idx] = k;
  if(k === state.deck[idx].answer) state.score++;
  showFeedback(idx, k, true);
}

function skipQuestion(){
  const idx = state.i;
  if(state.chosen[idx] !== null) return;   // can't skip an already-locked question
  state.chosen[idx] = "skip";              // sentinel: not scored, not counted
  showSkipped(idx, true);
}

function showSkipped(idx, animateBar){
  const q = state.deck[idx];
  const correct = q.answer;
  document.querySelectorAll("#opts .opt").forEach(btn=>{
    const bk = +btn.dataset.k;
    btn.disabled = true;
    btn.classList.remove("selected");
    if(bk === correct) btn.classList.add("correct");
  });
  const cr = document.getElementById("confirmRow"); if(cr) cr.innerHTML = "";
  if(animateBar){
    const pct = ((idx+1)/state.deck.length)*100;
    const fill = document.querySelector(".fill"); if(fill) fill.style.width = pct+"%";
  }
  document.getElementById("fb").innerHTML = `
    <div class="feedback skip">
      <div class="verdict">Skipped · not counted</div>
      <div class="explain">The answer is <strong>${LETTERS[correct]}</strong> &nbsp;${q.options[correct]}</div>
      <div class="flag tip"><span class="lbl">Tip</span>${q.tip}</div>
    </div>`;
  const last = idx === state.deck.length-1;
  const nextLabel = last ? "See results" : "Next question";
  document.getElementById("nav").innerHTML = (idx>0)
    ? `<div class="btn-row two"><button class="btn ghost" onclick="prev()">Previous</button><button class="btn" onclick="next()">${nextLabel}</button></div>`
    : `<div class="btn-row"><button class="btn" onclick="next()">${nextLabel}</button></div>`;
  renderMath(document.getElementById("fb"));
}

function showFeedback(idx, k, animateBar){
  const q = state.deck[idx];
  const correct = q.answer;
  const isRight = k === correct;

  document.querySelectorAll("#opts .opt").forEach(btn=>{
    const bk = +btn.dataset.k;
    btn.disabled = true;
    btn.classList.remove("selected");
    if(bk === correct) btn.classList.add("correct");
    else if(bk === k) btn.classList.add("wrong");
  });

  const cr = document.getElementById("confirmRow");
  if(cr) cr.innerHTML = "";

  if(animateBar){
    const pct = ((idx+1)/state.deck.length)*100;
    const fill = document.querySelector(".fill"); if(fill) fill.style.width = pct+"%";
    const chip = document.querySelector(".score-chip"); if(chip) chip.textContent = "Score "+state.score;
  }

  document.getElementById("fb").innerHTML = `
    <div class="feedback ${isRight?"ok":"no"}">
      <div class="verdict">${isRight?"Correct":"Not quite"}</div>
      <div class="explain">The answer is <strong>${LETTERS[correct]}</strong> &nbsp;${q.options[correct]}</div>
      <div class="flag trap"><span class="lbl">Trap</span>${q.trap}</div>
      <div class="flag tip"><span class="lbl">Tip</span>${q.tip}</div>
    </div>`;

  const last = idx === state.deck.length-1;
  const nextLabel = last ? "See results" : "Next question";
  document.getElementById("nav").innerHTML = (idx>0)
    ? `<div class="btn-row two"><button class="btn ghost" onclick="prev()">Previous</button><button class="btn" onclick="next()">${nextLabel}</button></div>`
    : `<div class="btn-row"><button class="btn" onclick="next()">${nextLabel}</button></div>`;
  renderMath(document.getElementById("fb"));
}

function next(){
  if(state.i === state.deck.length-1){ results(); return; }
  state.i++; renderQuestion();
  window.scrollTo({top:0,behavior:"smooth"});
}

function prev(){
  if(!state || state.i === 0) return;
  state.i--; renderQuestion();
  window.scrollTo({top:0,behavior:"smooth"});
}

function results(){
  // save this attempt to the records once (guard against re-entry via "Back to score")
  const counted = state.chosen.filter(c=>c!=="skip" && c!=null).length;
  const skippedN = state.chosen.filter(c=>c==="skip").length;

  if(state && !state.saved){
    const mistakes = [];
    state.deck.forEach((q,i)=>{
      const c = state.chosen[i];
      if(c !== "skip" && c != null && c !== q.answer){
        mistakes.push({ topic:q.topic, q:q.q, you:q.options[c], correct:q.options[q.answer] });
      }
    });
    const bt = {}; TOPIC_ORDER.forEach(t=>bt[t]={c:0,n:0});
    state.deck.forEach((q,i)=>{ if(state.chosen[i]!=="skip"){ bt[q.topic].n++; if(state.chosen[i]===q.answer) bt[q.topic].c++; } });
    saveRun({ ts:Date.now(), score:state.score, total:counted, skipped:skippedN,
              pct: counted>0 ? Math.round(state.score/counted*100) : 0, byTopic:bt, mistakes });
    state.saved = true;
  }

  const total = counted;
  const pct = total>0 ? Math.round((state.score/total)*100) : 0;
  const byTopic = {};
  TOPIC_ORDER.forEach(t=>byTopic[t]={c:0,n:0});
  state.deck.forEach((q,i)=>{ if(state.chosen[i]!=="skip"){ byTopic[q.topic].n++; if(state.chosen[i]===q.answer) byTopic[q.topic].c++; } });

  let msg;
  if(pct>=90) msg="Excellent — these skills are exam-ready.";
  else if(pct>=75) msg="Solid work. Review the traps you hit and you're there.";
  else if(pct>=60) msg="Good foundation. The breakdown below shows what to drill next.";
  else msg="Worth another pass — focus on the lowest bars first, then retake.";

  app.innerHTML = `
    <div class="card anim">
      <div class="score-big">${state.score}<small>/${total}</small></div>
      <div class="pct">${pct}%</div>
      <div class="verdict-line">${msg}${skippedN?` · ${skippedN} skipped (not counted)`:""}</div>
      <div class="breakdown">
        ${TOPIC_ORDER.map(t=>{
          const b=byTopic[t]; if(b.n===0) return "";
          const p=Math.round((b.c/b.n)*100);
          return `<div class="brow">
            <span class="name">${t}</span>
            <span class="bar"><i style="width:${p}%"></i></span>
            <span class="frac">${b.c}/${b.n}</span>
          </div>`;
        }).join("")}
      </div>
      <div class="btn-row">
        <button class="btn" onclick="shareScreen()">Share mistakes with Claude</button>
      </div>
      <div class="btn-row two">
        <button class="btn ghost" onclick="review()">Review answers</button>
        <button class="btn ghost" onclick="begin()">Retake (new set)</button>
      </div>
      <div class="btn-row">
        <button class="btn ghost" onclick="recordsScreen()">View records</button>
      </div>
    </div>`;
  window.scrollTo({top:0,behavior:"smooth"});
}

// Convert the LaTeX in a question/option into readable plain text for sharing
function toPlain(s){
  let t = s;
  const sup = {"0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹"};
  t = t.replace(/\^\{(\d+)\}/g, (m,d)=>d.split("").map(c=>sup[c]||c).join(""));
  t = t.replace(/\^(\d)/g, (m,d)=>sup[d]||("^"+d));
  const idx = {"3":"³","4":"⁴","5":"⁵","6":"⁶","12":"¹²"};
  for(let p=0;p<5;p++){
    t = t.replace(/\\sqrt\[(\d+)\]\{([^{}]*)\}/g, (m,k,x)=> (idx[k]||("["+k+"]"))+"√("+x+")");
    t = t.replace(/\\sqrt\{([^{}]*)\}/g, (m,x)=>"√("+x+")");
    t = t.replace(/\\[dt]?frac\{([^{}]*)\}\{([^{}]*)\}/g, (m,a,b)=>a+"/"+b);
  }
  t = t.replace(/\\ge/g,"≥").replace(/\\le/g,"≤").replace(/\\ne/g,"≠")
       .replace(/\\pm/g,"±").replace(/\\cdot/g,"·").replace(/\\times/g,"×").replace(/\\div/g,"÷")
       .replace(/\\Rightarrow/g,"⇒").replace(/\\pi/g,"π");
  t = t.replace(/\\[,;! ]/g," ").replace(/\\\(/g,"").replace(/\\\)/g,"");
  t = t.replace(/\\left|\\right/g,"").replace(/[{}]/g,"");
  t = t.replace(/\s+/g," ").replace(/\s+([.,;:)])/g,"$1").replace(/\(\s+/g,"(").trim();
  return t;
}

function buildReport(){
  const counted = state.chosen.filter(c=>c!=="skip" && c!=null).length;
  const skippedN = state.chosen.filter(c=>c==="skip").length;
  const total = counted;
  const pct = total>0 ? Math.round((state.score/total)*100) : 0;
  const missed = [];
  state.deck.forEach((q,i)=>{ const c=state.chosen[i]; if(c!=="skip" && c!=null && c!==q.answer) missed.push(i); });

  const byTopic = {};
  TOPIC_ORDER.forEach(t=>byTopic[t]={c:0,n:0});
  state.deck.forEach((q,i)=>{ if(state.chosen[i]!=="skip"){ byTopic[q.topic].n++; if(state.chosen[i]===q.answer) byTopic[q.topic].c++; } });

  let out = window.UNIT.meta.reportTitle + "\n";
  out += window.UNIT.meta.reportSubtitle + "\n";
  out += "Score: " + state.score + "/" + total + " (" + pct + "%)" + (skippedN? "  ·  "+skippedN+" skipped" : "") + "\n\n";

  out += "BY TOPIC:\n";
  TOPIC_ORDER.forEach(t=>{ if(byTopic[t].n>0) out += "- " + t + ": " + byTopic[t].c + "/" + byTopic[t].n + "\n"; });

  if(missed.length===0){
    out += "\nNo mistakes — I got every question right. Give me even harder practice.\n";
    return out;
  }

  out += "\nMISTAKES (" + missed.length + "):\n";
  missed.forEach(i=>{
    const q = state.deck[i], you = state.chosen[i];
    out += "\n[" + q.topic + "]\n";
    out += "Question: " + toPlain(q.q) + "\n";
    out += "My answer: " + LETTERS[you] + ") " + toPlain(q.options[you]) + "\n";
    out += "Correct:   " + LETTERS[q.answer] + ") " + toPlain(q.options[q.answer]) + "\n";
  });
  out += "\nPlease look at the pattern in these mistakes and help me stop making them.";
  return out;
}

function shareScreen(){
  const report = buildReport();
  const missedCount = state.chosen.filter((c,i)=>c!=="skip" && c!=null && c!==state.deck[i].answer).length;
  app.innerHTML = `
    <div class="card anim">
      <div class="kicker" style="margin-bottom:6px">Share with Claude</div>
      <p class="lede">${missedCount===0
        ? "Perfect score — copy this so Claude can give you tougher questions."
        : "Copy the summary below and paste it into your chat with Claude. It lists every question you missed, what you chose, and the correct answer."}</p>
      <textarea id="report" class="report" readonly>${report.replace(/</g,"&lt;")}</textarea>
      <div class="btn-row">
        <button class="btn" id="copyBtn" onclick="copyReport()">Copy summary</button>
      </div>
      <div class="btn-row two">
        <button class="btn ghost" onclick="results()">Back to score</button>
        <button class="btn ghost" onclick="review()">Review answers</button>
      </div>
    </div>`;
  window.scrollTo({top:0,behavior:"smooth"});
}

function copyReport(){
  const ta = document.getElementById("report");
  if(!ta) return;
  ta.focus(); ta.select();
  try{ ta.setSelectionRange(0, ta.value.length); }catch(e){}
  try{ document.execCommand("copy"); }catch(e){}
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(ta.value).then(()=>{},()=>{});
  }
  const b = document.getElementById("copyBtn");
  if(b){
    const prev = b.textContent;
    b.textContent = "Copied — now paste it into the chat";
    setTimeout(()=>{ b.textContent = prev; }, 2400);
  }
}

function review(){
  const rows = state.deck.map((q,i)=>{
    const you = state.chosen[i];
    const right = q.answer;
    const isSkip = you === "skip";
    const gotIt = !isSkip && you === right;
    const yourLine = isSkip
      ? `<div class="rev-a" style="background:var(--paper);color:var(--muted)"><span class="mk">–</span><span>Skipped (not counted)</span></div>`
      : (you!==null && !gotIt)
        ? `<div class="rev-a you-wrong"><span class="mk">${LETTERS[you]}</span><span>Your answer: ${q.options[you]}</span></div>` : "";
    return `<div class="rev-item">
      <div class="rev-q"><span class="qnum">Q${i+1}</span>${q.q}</div>
      ${yourLine}
      <div class="rev-a correct"><span class="mk">${LETTERS[right]}</span><span>${gotIt?"Correct — ":""}${q.options[right]}</span></div>
      <div class="rev-flags">
        <div class="flag trap"><span class="lbl">Trap</span>${q.trap}</div>
        <div class="flag tip"><span class="lbl">Tip</span>${q.tip}</div>
      </div>
    </div>`;
  }).join("");
  app.innerHTML = `<div class="anim">${rows}
    <div class="btn-row two">
      <button class="btn ghost" onclick="results()">Back to score</button>
      <button class="btn" onclick="begin()">Retake (new set)</button>
    </div></div>`;
  renderMath(app);
  window.scrollTo({top:0,behavior:"smooth"});
}

/* =========================================================================
   RECORDS — persist runs to this browser's local storage (works on the file
   you open locally). Stores score, per-topic breakdown, and every mistake.
   ========================================================================= */
const STORE_KEY = window.UNIT.meta.storeKey;

function storageOK(){
  try{ const k="__pc11_test"; localStorage.setItem(k,"1"); localStorage.removeItem(k); return true; }
  catch(e){ return false; }
}
function loadRuns(){
  try{ const raw = localStorage.getItem(STORE_KEY); const a = raw ? JSON.parse(raw) : []; return Array.isArray(a)?a:[]; }
  catch(e){ return []; }
}
function saveRun(rec){
  try{ const a = loadRuns(); a.push(rec); while(a.length>100) a.shift(); localStorage.setItem(STORE_KEY, JSON.stringify(a)); return true; }
  catch(e){ return false; }
}
function clearRuns(){ try{ localStorage.removeItem(STORE_KEY); }catch(e){} recordsScreen(); }

function fmtDate(ts){
  const d = new Date(ts);
  return d.toLocaleDateString(undefined,{month:"short",day:"numeric",year:"numeric"})
       + " · " + d.toLocaleTimeString(undefined,{hour:"numeric",minute:"2-digit"});
}

function missHTML(m){
  return `<div class="miss">
    <div class="mtop">${m.topic}</div>
    <div>${m.q}</div>
    <div class="ml bad"><b>You:</b><span>${m.you}</span></div>
    <div class="ml good"><b>Correct:</b><span>${m.correct}</span></div>
  </div>`;
}

function recordsScreen(){
  const runs = loadRuns();

  if(runs.length === 0){
    app.innerHTML = `
      <div class="card anim">
        <div class="kicker" style="margin-bottom:8px">Your records</div>
        <p class="lede">${storageOK()
          ? "No attempts saved yet. Finish a test and your score, topic breakdown, and every mistake will appear here automatically — saved in this browser on this computer."
          : "This browser is blocking local storage (often private/incognito mode), so attempts can't be saved on this device. Try opening the file in a normal window."}</p>
        <div class="btn-row"><button class="btn" onclick="startScreen()">Back to start</button></div>
      </div>`;
    window.scrollTo({top:0,behavior:"smooth"});
    return;
  }

  const list  = runs.slice().reverse();                 // newest first
  const pcts  = runs.map(r=>r.pct);
  const best  = Math.max(...pcts);
  const avg   = Math.round(pcts.reduce((a,b)=>a+b,0)/pcts.length);
  const lastP = list[0].pct;
  const recent = runs.slice(-14);
  const maxBar = Math.max(100, ...recent.map(r=>r.pct));

  // aggregate most-missed questions across all runs (keyed by question text)
  const agg = {};
  runs.forEach(r=> (r.mistakes||[]).forEach(m=>{
    if(!agg[m.q]) agg[m.q] = {count:0, topic:m.topic, q:m.q, correct:m.correct};
    agg[m.q].count++;
  }));
  const top = Object.values(agg).sort((a,b)=>b.count-a.count).slice(0,10);

  app.innerHTML = `
    <div class="anim">
    <div class="card">
      <div class="kicker" style="margin-bottom:10px">Your records</div>

      <div class="stat-grid">
        <div class="stat"><div class="v">${runs.length}</div><div class="k">Attempts</div></div>
        <div class="stat"><div class="v">${best}%</div><div class="k">Best</div></div>
        <div class="stat"><div class="v">${avg}%</div><div class="k">Average</div></div>
        <div class="stat"><div class="v">${lastP}%</div><div class="k">Last</div></div>
      </div>

      <div class="spark">
        ${recent.map(r=>`<div class="b" style="height:${Math.max(3,Math.round(r.pct/maxBar*100))}%"><span>${r.pct}</span></div>`).join("")}
      </div>
      <div class="spark-cap">Last ${recent.length} attempt${recent.length>1?"s":""} (% score)</div>

      <div class="sec-h">Attempts</div>
      ${list.map(r=>`
        <details class="run">
          <summary>
            <span class="rdate">${fmtDate(r.ts)}${r.skipped?` · ${r.skipped} skipped`:""}</span>
            <span class="score-chip">${r.score}/${r.total} · ${r.pct}%</span>
          </summary>
          ${ (r.mistakes && r.mistakes.length)
             ? `<div class="rbody">${r.mistakes.map(missHTML).join("")}</div>`
             : `<div class="rnone">Perfect run — no mistakes. 🎯</div>` }
        </details>`).join("")}

      ${ top.length ? `<div class="sec-h">Most-missed questions</div>
        ${top.map(a=>`<div class="miss">
          <div class="mtop">${a.topic} &nbsp;·&nbsp; missed ${a.count}×</div>
          <div>${a.q}</div>
          <div class="ml good"><b>Correct:</b><span>${a.correct}</span></div>
        </div>`).join("")}` : "" }

      <div class="btn-row two">
        <button class="btn ghost" onclick="if(confirm('Delete all saved attempts? This cannot be undone.')) clearRuns();">Clear all records</button>
        <button class="btn" onclick="startScreen()">Back to start</button>
      </div>
    </div></div>`;
  renderMath(app);
  window.scrollTo({top:0,behavior:"smooth"});
}

function initHeader(){
  const m = window.UNIT.meta;
  document.title = m.crumb + " — Challenge Test · " + m.course;
  const cr = document.getElementById("crumbs");
  if(cr) cr.innerHTML = '<a href="../index.html">Courses</a><span class="sep">/</span>'
    + '<a href="index.html">' + m.course + '</a><span class="sep">/</span>' + m.crumb;
  const k = document.getElementById("kicker"); if(k) k.textContent = m.course + " · " + m.kicker;
  const t = document.getElementById("title"); if(t) t.innerHTML = m.title + ' <span class="rad">Challenge Test</span>';
}
window.addEventListener("DOMContentLoaded",()=>{
  initHeader();
  if(window.renderMathInElement){ startScreen(); }
  else { window.addEventListener("load", startScreen); setTimeout(startScreen,400); }
});
