"use strict";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const store = {
  get(key, fallback) { try { return JSON.parse(localStorage.getItem(`nourbest:${key}`)) ?? fallback; } catch { return fallback; } },
  set(key, value) { localStorage.setItem(`nourbest:${key}`, JSON.stringify(value)); }
};
const makeId = () => globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const APPS = [
  {id:"files",name:"الملفات",icon:"▰",color:"#2c8cff",dock:true,desktop:true},
  {id:"notes",name:"الملاحظات",icon:"✎",color:"#ffb82e",dock:true,desktop:true},
  {id:"terminal",name:"الطرفية",icon:">_",color:"#1d3d38",dock:true,desktop:true},
  {id:"calculator",name:"الحاسبة",icon:"±",color:"#ff7338",dock:true},
  {id:"gallery",name:"المعرض",icon:"◇",color:"#e450a4",dock:true},
  {id:"tasks",name:"المهام",icon:"✓",color:"#38c98f",desktop:true},
  {id:"browser",name:"Nour Web",icon:"◎",color:"#687cff",desktop:true},
  {id:"settings",name:"الإعدادات",icon:"⚙",color:"#69788e",dock:true},
  {id:"about",name:"حول النظام",icon:"ن",color:"#7a63ff"}
];

const state = {
  windows:new Map(), z:50, active:null,
  notes:store.get("notes",[{id:makeId(),title:"مرحبًا بك",body:"هذه مساحتك الخاصة في NourBest OS.\n\nتُحفظ الملاحظات محليًا على جهازك.",updated:Date.now()}]),
  tasks:store.get("tasks",[]),
  files:store.get("files",[{id:makeId(),type:"folder",name:"المستندات",updated:Date.now()},{id:makeId(),type:"text",name:"مرحبًا.txt",content:"مرحبًا بك في NourBest OS",updated:Date.now()}])
};
const system = $("#system"), windowLayer = $("#window-layer"), toast = $("#toast");

function icon(app, className="app-icon") { return `<span class="${className}" style="--icon:${app.color}">${app.icon}</span>`; }
function escapeHTML(value="") { return String(value).replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c])); }
function notify(message) { toast.textContent=message; toast.classList.add("show"); clearTimeout(notify.timer); notify.timer=setTimeout(()=>toast.classList.remove("show"),2200); }
function appById(id){ return APPS.find(app=>app.id===id); }
function isEditable(target){ return target instanceof HTMLElement && (target.matches("input,textarea,select,[contenteditable=true]") || !!target.closest("input,textarea,select,[contenteditable=true]")); }

function renderShell(){
  $("#dock").innerHTML=APPS.filter(a=>a.dock).map(a=>`<button data-open="${a.id}" aria-label="${a.name}" title="${a.name}">${icon(a)}</button>`).join("");
  $("#app-grid").innerHTML=APPS.map(a=>`<button class="app-card" data-open="${a.id}">${icon(a)}<span>${a.name}</span></button>`).join("");
  $("#desktop-icons").innerHTML=APPS.filter(a=>a.desktop).map(a=>`<button class="desktop-app" data-open="${a.id}">${icon(a)}<span>${a.name}</span></button>`).join("");
  updateSearch(""); detectDevice(); applyPreferences();
}

function detectDevice(){
  const ua=navigator.userAgent;
  const label=/iPhone|iPad/.test(ua)?"Apple / iOS":/Android/.test(ua)?"Android / Harmony":/Windows/.test(ua)?"Windows":/Linux/.test(ua)?"Linux":"منصة ويب حديثة";
  $("#device-label").textContent=label;
}

function tick(){
  const now=new Date(), time=now.toLocaleTimeString("ar-SA",{hour:"2-digit",minute:"2-digit"}), date=now.toLocaleDateString("ar-SA",{weekday:"long",day:"numeric",month:"long"});
  $("#clock").textContent=time; $("#widget-time").textContent=time; $("#widget-date").textContent=date; $("#lock-time").textContent=time; $("#lock-date").textContent=date; $("#calendar-time").textContent=time; $("#calendar-full-date").textContent=date;
  const hour=now.getHours(); $("#greeting").textContent=hour<12?"صباح النور":hour<18?"مساء الإبداع":"مساء النور";
}

function renderCalendar(){
  const now=new Date(), year=now.getFullYear(), month=now.getMonth(), first=new Date(year,month,1).getDay(), count=new Date(year,month+1,0).getDate();
  $("#month-title").textContent=`${now.toLocaleDateString("ar-SA",{month:"long",year:"numeric"})} · ${now.toLocaleDateString("ar-SA-u-ca-islamic",{month:"long",year:"numeric"})}`;
  let cells=["أح","إث","ثل","أر","خم","جم","سب"].map(d=>`<span class="day-name">${d}</span>`).join(""); for(let i=0;i<first;i++) cells+="<span></span>"; for(let d=1;d<=count;d++) cells+=`<span class="${d===now.getDate()?"today":""}">${d.toLocaleString("ar-SA")}</span>`; $("#month-days").innerHTML=cells;
}

function closePanels(except="") { ["launcher","quick","search-panel","calendar","task-switcher"].forEach(id=>{if(id!==except) $("#"+id).hidden=true;}); }
function togglePanel(id){ const panel=$("#"+id), opening=panel.hidden; closePanels(opening?id:""); panel.hidden=!opening; if(opening) $("input",panel)?.focus(); }

function focusWindow(win,id){ state.z++; win.style.zIndex=state.z; state.active=id; $("#active-app-label").textContent=appById(id)?.name||"سطح المكتب"; $$(".dock button").forEach(b=>b.classList.toggle("running",state.windows.has(b.dataset.open))); }
function openApp(id){
  const app=appById(id); if(!app) return;
  closePanels(); let win=state.windows.get(id);
  if(win){ win.classList.remove("minimized"); focusWindow(win,id); return; }
  win=$("#window-template").content.firstElementChild.cloneNode(true); win.dataset.app=id; $(".window-title strong",win).textContent=app.name; $(".window-icon",win).textContent=app.icon; $(".window-body",win).innerHTML=renderApp(id); const layout=store.get(`window:${id}`,null);if(layout&&innerWidth>720)Object.assign(win.style,layout);windowLayer.append(win); state.windows.set(id,win); bindApp(id,win); bindWindow(win,id); focusWindow(win,id);renderTaskSwitcher();
}
function closeApp(id){ const win=state.windows.get(id); if(!win)return; win.remove(); state.windows.delete(id); const remaining=[...state.windows.entries()].filter(([,w])=>!w.classList.contains("minimized")); if(remaining.length){const [nextId,nextWin]=remaining.at(-1);focusWindow(nextWin,nextId);}else{state.active=null;$("#active-app-label").textContent="سطح المكتب";} renderTaskSwitcher(); $$(".dock button").forEach(b=>b.classList.toggle("running",state.windows.has(b.dataset.open))); }
function bindWindow(win,id){
  win.addEventListener("pointerdown",()=>focusWindow(win,id));
  $(".window-controls",win).addEventListener("click",e=>{ const action=e.target.closest("button")?.dataset.windowAction; if(action==="close")closeApp(id); if(action==="minimize")win.classList.add("minimized"); if(action==="maximize")win.classList.toggle("maximized"); });
  const bar=$(".window-bar",win); let drag=null;
  bar.addEventListener("pointerdown",e=>{if(innerWidth<721||e.target.closest("button")||win.classList.contains("maximized"))return; const r=win.getBoundingClientRect(); drag={x:e.clientX-r.left,y:e.clientY-r.top}; bar.setPointerCapture(e.pointerId);});
  bar.addEventListener("pointermove",e=>{if(!drag)return; win.style.left=Math.max(0,Math.min(innerWidth-win.offsetWidth,e.clientX-drag.x))+"px"; win.style.top=Math.max(0,Math.min(innerHeight-win.offsetHeight-48,e.clientY-drag.y-48))+"px"; win.style.transform="none";});
  bar.addEventListener("pointerup",e=>{if(drag&&innerWidth>720){if(e.clientX<28){win.style.cssText+=`;left:0;top:0;transform:none;width:50%;height:calc(100% - 82px)`;}else if(e.clientX>innerWidth-28){win.style.cssText+=`;left:50%;top:0;transform:none;width:50%;height:calc(100% - 82px)`;}else if(e.clientY<70)win.classList.add("maximized");}drag=null;storeWindowLayout(id,win);});
  const handle=$(".resize-handle",win);let resize=null;handle.addEventListener("pointerdown",e=>{const r=win.getBoundingClientRect();resize={x:e.clientX,y:e.clientY,w:r.width,h:r.height};handle.setPointerCapture(e.pointerId);});handle.addEventListener("pointermove",e=>{if(!resize)return;win.style.width=Math.max(360,resize.w+e.clientX-resize.x)+"px";win.style.height=Math.max(260,resize.h+e.clientY-resize.y)+"px";});handle.addEventListener("pointerup",()=>{resize=null;storeWindowLayout(id,win);});
}
function storeWindowLayout(id,win){store.set(`window:${id}`,{left:win.style.left,top:win.style.top,width:win.style.width,height:win.style.height});}
function renderTaskSwitcher(){const list=$("#task-switcher-list");if(!list)return;list.innerHTML=state.windows.size?[...state.windows].map(([id])=>{const app=appById(id);return `<button data-switch-window="${id}">${icon(app)}<span>${app.name}</span><small>فتح</small></button>`;}).join(""):"<p>لا توجد نوافذ مفتوحة</p>";}

function renderApp(id){
  if(id==="files") return filesHTML(); if(id==="notes") return notesHTML(); if(id==="terminal") return terminalHTML(); if(id==="calculator")return calculatorHTML(); if(id==="gallery")return galleryHTML(); if(id==="tasks")return tasksHTML(); if(id==="browser")return browserHTML(); if(id==="settings")return settingsHTML(); return aboutHTML();
}

function filesHTML(){ return `<div class="app-shell"><aside class="app-sidebar"><h3>الملفات</h3><button class="side-button active">الرئيسية</button><button class="side-button" data-file-import>استيراد</button><button class="side-button" data-file-export>تصدير نسخة</button></aside><main class="app-content"><div class="toolbar"><h2>ملفاتي</h2><div><button data-text-new>+ ملف نصي</button> <button data-file-new>+ مجلد</button></div></div><input type="file" data-file-picker hidden multiple><div class="file-grid" data-file-grid></div><section class="file-editor" data-file-editor hidden><div class="toolbar"><input data-file-name aria-label="اسم الملف"><button data-file-save>حفظ</button></div><textarea data-file-content aria-label="محتوى الملف"></textarea></section></main></div>`; }
function renderFiles(win){const grid=$("[data-file-grid]",win);grid.innerHTML=state.files.map(f=>`<article class="file-card" data-file-id="${f.id}"><b>${f.type==="folder"?"▰":f.type==="image"?"▧":"◆"}</b><strong>${escapeHTML(f.name)}</strong><small>${new Date(f.updated).toLocaleDateString("ar-SA")}</small><div><button data-file-open="${f.id}">${f.type==="text"?"فتح":"عرض"}</button> <button data-file-download="${f.id}">تنزيل</button> <button data-file-delete="${f.id}">حذف</button></div></article>`).join("")||"<p>لا توجد ملفات</p>";}

function notesHTML(){ return `<div class="notes-layout"><aside class="notes-list"><div class="toolbar"><strong>ملاحظاتي</strong><button data-note-new>+</button></div><div data-note-list></div></aside><main class="note-editor"><div class="toolbar"><small data-note-status>محفوظ محليًا</small><button data-note-delete>حذف</button></div><input data-note-title aria-label="عنوان الملاحظة"><textarea data-note-body aria-label="نص الملاحظة" placeholder="ابدأ الكتابة…"></textarea></main></div>`; }
function renderNoteList(win,selected){ const list=$("[data-note-list]",win); list.innerHTML=state.notes.slice().sort((a,b)=>b.updated-a.updated).map(n=>`<button class="${n.id===selected?"active":""}" data-note-id="${n.id}"><strong>${escapeHTML(n.title||"بدون عنوان")}</strong><br><small>${new Date(n.updated).toLocaleDateString("ar-SA")}</small></button>`).join(""); }
function selectNote(win,id){ const note=state.notes.find(n=>n.id===id)||state.notes[0]; if(!note)return; win.dataset.note=note.id; $("[data-note-title]",win).value=note.title; $("[data-note-body]",win).value=note.body; renderNoteList(win,note.id); }

function terminalHTML(){ return `<div class="terminal"><div class="terminal-output">NourBest Shell 1.0\nاكتب help لعرض الأوامر.\n\n</div><form class="terminal-line"><span>user@nourbest:~$</span><input aria-label="أمر الطرفية" autocomplete="off" spellcheck="false"></form></div>`; }
function calculatorHTML(){ const keys=["C","⌫","%","÷","7","8","9","×","4","5","6","−","1","2","3","+","0",".","(",")","="]; return `<div class="calculator"><div class="calc-body"><input class="calc-display" value="0" readonly aria-label="شاشة الحاسبة"><div class="calc-grid">${keys.map(k=>`<button class="${"÷×−+%".includes(k)?"operator":k==="="?"equals":""}" data-calc="${k}">${k}</button>`).join("")}</div></div></div>`; }
function galleryHTML(){ return `<main class="app-content"><h2>المعرض الذكي</h2><p style="color:var(--muted)">خلفيات مولّدة داخل النظام، بلا تتبع أو رفع سحابي.</p><div class="file-grid">${[1,2,3,4,5,6].map((n,i)=>`<button class="file-card" data-wallpaper="${i}" style="height:150px;border:0;background:${["linear-gradient(135deg,#102d51,#6935b8)","linear-gradient(135deg,#004c4d,#39b88a)","linear-gradient(135deg,#51162a,#f05a7c)","linear-gradient(135deg,#0a1427,#2d7ebf)","linear-gradient(135deg,#3b215e,#f48cc9)","linear-gradient(135deg,#432d16,#e8ad4d)"][i]}"><strong>خلفية ${n}</strong></button>`).join("")}</div></main>`; }
function tasksHTML(){ return `<main class="app-content"><h2>المهام</h2><form data-task-form class="search-box"><input placeholder="أضف مهمة جديدة…" required><button class="primary">إضافة</button></form><div data-task-list></div></main>`; }
function renderTasks(win){ $("[data-task-list]",win).innerHTML=state.tasks.length?state.tasks.map(t=>`<label class="file-card" style="display:flex;grid-template-columns:auto 1fr auto;align-items:center"><input type="checkbox" data-task-toggle="${t.id}" ${t.done?"checked":""}><span style="${t.done?"text-decoration:line-through;color:var(--muted)":""}">${escapeHTML(t.text)}</span><button data-task-delete="${t.id}" aria-label="حذف">×</button></label>`).join(""):"<p style='color:var(--muted)'>لا توجد مهام. يوم جديد، بداية مرتبة.</p>"; }
function browserHTML(){ return `<main class="app-content"><div class="search-box"><span>◎</span><input data-web-query placeholder="ابحث في الويب أو اكتب عنوانًا"><button data-web-go class="primary">انتقال</button></div><div class="about-logo"><div class="brand-mark">ن</div><h2>Nour Web</h2><p>بوابة تصفح آمنة. يفتح البحث في تبويب المتصفح حتى تبقى قيود الحماية واضحة ولا ندّعي امتلاك صلاحيات غير متاحة.</p></div></main>`; }
function settingsHTML(){ const theme=store.get("theme","default"); return `<div class="app-shell"><aside class="app-sidebar"><h3>الإعدادات</h3><button class="side-button active" data-settings-target="appearance">المظهر</button><button class="side-button" data-settings-target="data">البيانات</button><button class="side-button" data-settings-target="accessibility">إمكانية الوصول</button><button class="side-button" data-settings-target="device">الجهاز</button></aside><main class="app-content"><h2>إعدادات النظام</h2><div class="settings-grid"><section id="appearance" class="setting-card"><h3>السمة</h3><div class="theme-picks"><button data-theme="default" title="فضائي" style="background:#0b1a31"></button><button data-theme="violet" title="بنفسجي" style="background:#6f4ccf"></button><button data-theme="emerald" title="زمردي" style="background:#138b6a"></button><button data-theme="light" title="فاتح" style="background:#edf3fa"></button></div><p>الحالية: <strong>${escapeHTML(theme)}</strong></p></section><section id="data" class="setting-card"><h3>البيانات المحلية</h3><p>صدّر نسخة من ملفاتك وملاحظاتك ومهامك أو امسحها.</p><button data-backup>تصدير نسخة</button> <button data-clear-local>مسح البيانات</button></section><section class="setting-card"><h3>التثبيت والتحديث</h3><p>ثبّت النظام من المتصفح وتحقق من آخر إصدار.</p><button data-install>تثبيت NourBest OS</button> <button data-check-update>فحص التحديث</button></section><section id="accessibility" class="setting-card"><h3>إمكانية الوصول</h3><label><input type="checkbox" data-large-text ${store.get("largeText",false)?"checked":""}> نص أكبر</label><br><label><input type="checkbox" data-reduce-motion> تقليل الحركة</label></section><section id="device" class="setting-card"><h3>قدرات الجهاز</h3><p data-capabilities></p></section></div></main></div>`; }
function aboutHTML(){ return `<main class="app-content"><div class="about-logo"><div class="brand-mark">ن</div><h2>NourBest OS 2.0</h2><p>مساحة عمل عربية هجينة تعمل كتطبيق PWA على المنصات المقيدة، وكواجهة محلية مستضافة داخل إصدار Nour Linux القابل للبناء للحواسيب.</p><table class="spec-table"><tr><td>الإصدار</td><td>2.0 Universal</td></tr><tr><td>الواجهة</td><td>Nour Shell</td></tr><tr><td>الملفات</td><td>محلية مع استيراد وتصدير</td></tr><tr><td>الاتصال</td><td>يعمل دون إنترنت</td></tr><tr><td>الترخيص</td><td>MIT</td></tr></table></div></main>`; }

function bindApp(id,win){
  if(id==="files") bindFiles(win);
  if(id==="notes") bindNotes(win);
  if(id==="terminal") bindTerminal(win);
  if(id==="calculator") bindCalculator(win);
  if(id==="gallery") $$('[data-wallpaper]',win).forEach(b=>b.onclick=()=>{store.set("wallpaper",b.dataset.wallpaper);document.body.dataset.wallpaper=b.dataset.wallpaper;notify("تم تغيير الخلفية فعليًا");});
  if(id==="tasks") bindTasks(win);
  if(id==="browser") { const go=()=>{const q=$("[data-web-query]",win).value.trim(); if(!q)return; const url=/^https?:\/\//i.test(q)?q:`https://www.google.com/search?q=${encodeURIComponent(q)}`; window.open(url,"_blank","noopener");}; $("[data-web-go]",win).onclick=go; $("[data-web-query]",win).onkeydown=e=>{if(e.key==="Enter")go();}; }
  if(id==="settings") bindSettings(win);
}
function bindFiles(win){
  const persist=()=>{store.set("files",state.files);renderFiles(win);updateSearch($("#global-search").value);};renderFiles(win);
  $("[data-file-new]",win).onclick=()=>{const name=prompt("اسم المجلد","مجلد جديد")?.trim();if(name){state.files.push({id:makeId(),type:"folder",name,updated:Date.now()});persist();}};
  $("[data-text-new]",win).onclick=()=>{const f={id:makeId(),type:"text",name:"ملف جديد.txt",content:"",updated:Date.now()};state.files.push(f);persist();openFileEditor(win,f);};
  $("[data-file-import]",win).onclick=()=>$("[data-file-picker]",win).click();
  $("[data-file-picker]",win).onchange=async e=>{for(const file of e.target.files){const text=file.size<1024*1024&&(/text|json|javascript/.test(file.type)||/\.(txt|md|json|js|css|html)$/i.test(file.name))?await file.text():"";state.files.push({id:makeId(),type:text!==""?"text":file.type.startsWith("image/")?"image":"binary",name:file.name,content:text,size:file.size,updated:Date.now()});}persist();notify("تم استيراد الملفات");};
  $("[data-file-export]",win).onclick=()=>downloadBlob("nourbest-backup.json",JSON.stringify({version:2,notes:state.notes,tasks:state.tasks,files:state.files},null,2),"application/json");
  $("[data-file-grid]",win).onclick=e=>{const open=e.target.closest("[data-file-open]"),del=e.target.closest("[data-file-delete]"),down=e.target.closest("[data-file-download]");if(open){const f=state.files.find(x=>x.id===open.dataset.fileOpen);if(f?.type==="text")openFileEditor(win,f);else notify(f?.type==="folder"?"المجلد جاهز لإضافة الملفات":"معاينة هذا النوع ستتوفر في التطبيق الأصلي");}if(del){state.files=state.files.filter(x=>x.id!==del.dataset.fileDelete);persist();}if(down){const f=state.files.find(x=>x.id===down.dataset.fileDownload);if(f&&f.type!=="folder")downloadBlob(f.name,f.content||"",f.type==="text"?"text/plain":"application/octet-stream");}};
}
function openFileEditor(win,file){const editor=$("[data-file-editor]",win);editor.hidden=false;editor.dataset.editing=file.id;$("[data-file-name]",editor).value=file.name;$("[data-file-content]",editor).value=file.content||"";$("[data-file-save]",editor).onclick=()=>{file.name=$("[data-file-name]",editor).value.trim()||file.name;file.content=$("[data-file-content]",editor).value;file.updated=Date.now();store.set("files",state.files);renderFiles(win);notify("تم حفظ الملف");};}
function downloadBlob(name,content,type){const url=URL.createObjectURL(new Blob([content],{type})),a=document.createElement("a");a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function bindNotes(win){
  if(!state.notes.length)state.notes.push({id:makeId(),title:"ملاحظة جديدة",body:"",updated:Date.now()}); selectNote(win,state.notes[0].id);
  $("[data-note-list]",win).onclick=e=>{const b=e.target.closest("[data-note-id]");if(b)selectNote(win,b.dataset.noteId);};
  $("[data-note-new]",win).onclick=()=>{const n={id:makeId(),title:"ملاحظة جديدة",body:"",updated:Date.now()};state.notes.push(n);store.set("notes",state.notes);selectNote(win,n.id);};
  const save=()=>{const n=state.notes.find(x=>x.id===win.dataset.note);if(!n)return;n.title=$("[data-note-title]",win).value;n.body=$("[data-note-body]",win).value;n.updated=Date.now();store.set("notes",state.notes);$("[data-note-status]",win).textContent="تم الحفظ الآن";renderNoteList(win,n.id);};
  $("[data-note-title]",win).oninput=save; $("[data-note-body]",win).oninput=save;
  $("[data-note-delete]",win).onclick=()=>{state.notes=state.notes.filter(n=>n.id!==win.dataset.note);if(!state.notes.length)state.notes.push({id:makeId(),title:"ملاحظة جديدة",body:"",updated:Date.now()});store.set("notes",state.notes);selectNote(win,state.notes[0].id);};
}
function bindTerminal(win){ const form=$("form",win),input=$("input",form),out=$(".terminal-output",win); form.onsubmit=e=>{e.preventDefault();const raw=input.value.trim(),[cmd,...args]=raw.split(/\s+/);out.textContent+=`user@nourbest:~$ ${raw}\n`;const commands={help:"الأوامر: help, date, clear, echo, apps, open, theme, about, whoami",date:()=>new Date().toString(),echo:()=>args.join(" "),apps:()=>APPS.map(a=>a.id).join("  "),open:()=>{if(appById(args[0])){openApp(args[0]);return`فتح ${args[0]}`;}return"التطبيق غير موجود";},theme:()=>{setTheme(args[0]||"default");return`theme: ${args[0]||"default"}`;},about:"NourBest OS 1.0 — Universal Arabic workspace",whoami:"nourbest-user"};let result=commands[cmd];if(typeof result==="function")result=result();if(cmd==="clear"){out.textContent="";result="";}if(result===undefined)result=`command not found: ${cmd}`;out.textContent+=result+"\n";input.value="";out.scrollTop=out.scrollHeight;}; }
function bindCalculator(win){ const display=$(".calc-display",win),press=k=>{if(k==="C")display.value="0";else if(k==="⌫")display.value=display.value.slice(0,-1)||"0";else if(k==="%")display.value=String((Number(display.value)||0)/100);else if(k==="="){try{const expr=display.value.replaceAll("×","*").replaceAll("÷","/").replaceAll("−","-");if(!/^[0-9+\-*/.() ]+$/.test(expr))throw Error();display.value=String(Function(`"use strict";return (${expr})`)());}catch{display.value="خطأ";}}else display.value=(display.value==="0"||display.value==="خطأ"?"":display.value)+k;};$(".calc-grid",win).onclick=e=>{const b=e.target.closest("[data-calc]");if(b)press(b.dataset.calc);};win.addEventListener("keydown",e=>{if(/[0-9.+\-*/()]/.test(e.key))press(e.key.replace("*","×").replace("/","÷"));if(e.key==="Enter")press("=");if(e.key==="Backspace")press("⌫");}); }
function bindTasks(win){renderTasks(win);$("[data-task-form]",win).onsubmit=e=>{e.preventDefault();const input=$("input",e.currentTarget),text=input.value.trim();if(!text)return;state.tasks.push({id:makeId(),text,done:false,created:Date.now()});store.set("tasks",state.tasks);input.value="";renderTasks(win);updateSearch($("#global-search").value);};$("[data-task-list]",win).onclick=e=>{const del=e.target.closest("[data-task-delete]"),toggle=e.target.closest("[data-task-toggle]");if(del)state.tasks=state.tasks.filter(t=>t.id!==del.dataset.taskDelete);if(toggle){const t=state.tasks.find(x=>x.id===toggle.dataset.taskToggle);if(t)t.done=toggle.checked;}store.set("tasks",state.tasks);renderTasks(win);updateSearch($("#global-search").value);}; }
let installPrompt=null;
function bindSettings(win){$$('[data-theme]',win).forEach(b=>b.onclick=()=>{setTheme(b.dataset.theme);$("#appearance strong",win).textContent=b.dataset.theme;});$$('[data-settings-target]',win).forEach(b=>b.onclick=()=>{$$(".side-button",win).forEach(x=>x.classList.toggle("active",x===b));$("#"+b.dataset.settingsTarget,win)?.scrollIntoView({behavior:"smooth"});});$("[data-backup]",win).onclick=()=>downloadBlob("nourbest-backup.json",JSON.stringify({version:2,notes:state.notes,tasks:state.tasks,files:state.files,preferences:{theme:store.get("theme","default"),wallpaper:store.get("wallpaper","0")}},null,2),"application/json");$("[data-clear-local]",win).onclick=()=>{if(confirm("مسح الملاحظات والمهام والتفضيلات المحلية؟")){Object.keys(localStorage).filter(k=>k.startsWith("nourbest:")).forEach(k=>localStorage.removeItem(k));location.reload();}};$("[data-install]",win).onclick=async()=>{if(installPrompt){installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;}else notify("في Safari: مشاركة ثم إضافة إلى الشاشة الرئيسية");};$("[data-check-update]",win).onclick=async()=>{const r=await navigator.serviceWorker?.getRegistration();await r?.update();notify(r?.waiting?"يوجد تحديث جاهز":"أنت تستخدم أحدث إصدار");};$("[data-large-text]",win).onchange=e=>{document.documentElement.style.fontSize=e.target.checked?"18px":"16px";store.set("largeText",e.target.checked);};$("[data-reduce-motion]",win).onchange=e=>document.body.classList.toggle("reduce-motion",e.target.checked);$("[data-capabilities]",win).textContent=[`المنصة: ${navigator.platform||"ويب"}`,`المعالج المنطقي: ${navigator.hardwareConcurrency||"غير معروف"}`,`الذاكرة: ${navigator.deviceMemory?`${navigator.deviceMemory} GB`:"غير متاحة"}`,`اللمس: ${navigator.maxTouchPoints||0}`].join(" · ");}
function setTheme(theme){document.body.dataset.theme=theme==="default"?"":theme;store.set("theme",theme);}
function applyPreferences(){setTheme(store.get("theme","default"));document.body.dataset.wallpaper=store.get("wallpaper","0");if(store.get("largeText",false))document.documentElement.style.fontSize="18px";}

function updateSearch(query){const q=query.trim().toLowerCase(),apps=APPS.filter(a=>!q||a.name.includes(q)||a.id.includes(q)),notes=q?state.notes.filter(n=>(n.title+" "+n.body).toLowerCase().includes(q)):[],tasks=q?state.tasks.filter(t=>t.text.toLowerCase().includes(q)):[],files=q?state.files.filter(f=>f.name.toLowerCase().includes(q)):[];const rows=[...apps.map(a=>`<button class="search-result" data-open="${a.id}">${icon(a)}<span><strong>${a.name}</strong><br><small>تطبيق</small></span></button>`),...notes.map(n=>`<button class="search-result" data-open="notes"><span class="app-icon" style="--icon:#ffb82e">✎</span><span><strong>${escapeHTML(n.title)}</strong><br><small>ملاحظة</small></span></button>`),...tasks.map(t=>`<button class="search-result" data-open="tasks"><span class="app-icon" style="--icon:#38c98f">✓</span><span><strong>${escapeHTML(t.text)}</strong><br><small>مهمة</small></span></button>`),...files.map(f=>`<button class="search-result" data-open="files"><span class="app-icon" style="--icon:#2c8cff">◆</span><span><strong>${escapeHTML(f.name)}</strong><br><small>ملف</small></span></button>`)];$("#search-results").innerHTML=rows.join("")||"<p>لا توجد نتائج</p>";}
function bindGlobal(){
  document.addEventListener("click",e=>{const open=e.target.closest("[data-open]");if(open)openApp(open.dataset.open);const switcher=e.target.closest("[data-switch-window]");if(switcher){const id=switcher.dataset.switchWindow;openApp(id);$("#task-switcher").hidden=true;}const action=e.target.closest("[data-action]")?.dataset.action;if(action==="launcher")togglePanel("launcher");if(action==="quick")togglePanel("quick");if(action==="search")togglePanel("search-panel");if(action==="taskswitcher"){renderTaskSwitcher();togglePanel("task-switcher");}if(action==="calendar"){renderCalendar();togglePanel("calendar");}if(action==="lock"){$("#lock-screen").hidden=false;closePanels();}if(action==="unlock")$("#lock-screen").hidden=true;if(action==="power")location.reload();if(action==="apply-update"){navigator.serviceWorker.getRegistration().then(r=>{r?.waiting?.postMessage({type:"SKIP_WAITING"});location.reload();});}const close=e.target.closest("[data-close]");if(close)$("#"+close.dataset.close).hidden=true;});
  document.addEventListener("pointerdown",e=>{if(e.target.closest(".panel,[data-action]"))return;closePanels();});
  $("#launcher-search").addEventListener("input",e=>{const q=e.target.value.toLowerCase();$$('.app-card').forEach(c=>c.hidden=!c.textContent.toLowerCase().includes(q));});
  $("#global-search").addEventListener("input",e=>updateSearch(e.target.value));
  $$("[data-toggle]").forEach(b=>b.onclick=()=>{const type=b.dataset.toggle;if(type==="wifi"){$("small",b).textContent=navigator.onLine?"متصل":"غير متصل";notify("إدارة شبكة الجهاز نفسها متاحة من إعدادات النظام المضيف");return;}b.classList.toggle("active");const active=b.classList.contains("active");$("small",b).textContent=active?"مفعّل":"متوقف";if(type==="focus")system.classList.toggle("focus-mode",active);if(type==="night")setTheme(active?"violet":"default");if(type==="sound")store.set("interfaceSound",active);});
  $("#brightness").oninput=e=>document.documentElement.style.setProperty("--brightness",e.target.value/100);
  window.addEventListener("keydown",e=>{if(isEditable(e.target))return;if(e.key==="Escape"){closePanels();return;}if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();togglePanel("search-panel");}});
  window.addEventListener("online",()=>{$("#network-state").textContent="متصل بالإنترنت";notify("عاد الاتصال بالإنترنت");}); window.addEventListener("offline",()=>{$("#network-state").textContent="وضع دون إنترنت";notify("النظام يعمل دون إنترنت");});
  window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();installPrompt=e;});
  window.addEventListener("resize",()=>{$$(".app-window").forEach(win=>{const r=win.getBoundingClientRect();if(r.left>innerWidth-100||r.top>innerHeight-100){win.style.left="50%";win.style.top="5%";win.style.transform="translateX(-50%)";}});});
}

async function boot(){
  renderShell();bindGlobal();tick();setInterval(tick,1000);renderCalendar();
  if("serviceWorker" in navigator){try{const registration=await navigator.serviceWorker.register("./sw.js");if(registration.waiting)$("#update-banner").hidden=false;registration.addEventListener("updatefound",()=>{const worker=registration.installing;worker?.addEventListener("statechange",()=>{if(worker.state==="installed"&&navigator.serviceWorker.controller)$("#update-banner").hidden=false;});});navigator.serviceWorker.addEventListener("controllerchange",()=>location.reload());}catch(err){console.warn("Service worker unavailable",err);}}
  if(navigator.getBattery){try{const battery=await navigator.getBattery();const updateBattery=()=>{$("#device-label").textContent+=` · ${Math.round(battery.level*100)}%${battery.charging?" ⚡":""}`;};updateBattery();battery.addEventListener("levelchange",updateBattery);}catch{}}
  const status=$("#boot-status");for(const [text,delay] of [["تحميل Nour Shell…",250],["تشغيل الخدمات المحلية…",260],["النظام جاهز",220]]){status.textContent=text;await new Promise(r=>setTimeout(r,delay));}
  $("#boot").remove();system.hidden=false;
  const requested=new URLSearchParams(location.search).get("app");if(requested)openApp(requested);
}

boot();
