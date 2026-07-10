"use strict";
NourPlugins.registerApp({
  id:"dashboard",name:"لوحة المعلومات",icon:"▦",color:"#6b7cff",desktop:true,
  render(){return `<main class="app-content"><h2>لوحة المعلومات</h2><div class="settings-grid" data-dashboard-stats></div><h3>آخر النشاط</h3><div data-dashboard-recent></div></main>`;},
  bind(win,context){const {state,escapeHTML}=context,activeTasks=state.tasks.filter(t=>!t.done&&!t.archived).length,used=state.files.filter(f=>!f.deleted).reduce((sum,f)=>sum+(f.size||0),0);win.querySelector("[data-dashboard-stats]").innerHTML=[["الملاحظات",state.notes.length],["المهام النشطة",activeTasks],["الملفات",state.files.filter(f=>!f.deleted).length],["حجم الملفات",context.formatBytes(used)]].map(([name,value])=>`<article class="setting-card"><small>${name}</small><h2>${value}</h2></article>`).join("");const events=[...state.notes.map(n=>({name:n.title,time:n.updated,type:"ملاحظة"})),...state.files.map(f=>({name:f.name,time:f.updated,type:"ملف"}))].sort((a,b)=>b.time-a.time).slice(0,8);win.querySelector("[data-dashboard-recent]").innerHTML=events.map(e=>`<p><strong>${escapeHTML(e.name)}</strong> · ${e.type} · ${new Date(e.time).toLocaleString("ar-SA")}</p>`).join("")||"لا يوجد نشاط";}
});
NourPlugins.registerCommand("stats",context=>`notes=${context.state.notes.length} tasks=${context.state.tasks.length} files=${context.state.files.length}`,"عرض إحصاءات النظام");
