/* =====================================================
   مِرشاد — منطق التطبيق
   يعمل محليًا بالكامل: بحث ذكي، حكم السعر، ثقة المتاجر،
   مستشار الصيانة، المساعد — بدون أي API خارجي.
   ===================================================== */

"use strict";

/* ---------- حالة التطبيق ---------- */
const state = {
  view: "parts",
  query: "",
  type: "all",
  brand: "all",
  sort: "smart",
  storeScope: "all",
  myCar: localStorage.getItem("mirshad_car") || "",
  favs: JSON.parse(localStorage.getItem("mirshad_favs") || "[]"),
  compare: [],
  theme: localStorage.getItem("mirshad_theme") ||
    (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
};

const $ = (id) => document.getElementById(id);
const storeById = Object.fromEntries(stores.map((s) => [s.id, s]));

/* ---------- أدوات عامة ---------- */
function fmtSAR(n) {
  return `${n.toLocaleString("ar-SA", { maximumFractionDigits: 2 })} ر.س`;
}
function showToast(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => t.classList.remove("show"), 2400);
}
function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function debounce(fn, ms) {
  let t;
  return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
}

/* ---------- درجة الثقة (معادلة معلنة — انظر تبويب المنهجية) ---------- */
const TRUST_WEIGHTS = {
  officialPlatform: { w: 30, label: "منصة/جهة رسمية" },
  returnPolicy:     { w: 25, label: "سياسة إرجاع معلنة" },
  securePayments:   { w: 20, label: "دفع آمن متعدد" },
  establishedLong:  { w: 15, label: "تاريخ تشغيلي طويل" },
  verifiedByMirshad:{ w: 10, label: "تحقق مِرشاد المباشر" }
};
function trustScore(store) {
  let earned = 0, possible = 0, known = 0, totalFactors = 0;
  for (const [key, { w }] of Object.entries(TRUST_WEIGHTS)) {
    totalFactors++;
    const v = store.trust[key];
    if (v === null || v === undefined) continue; // غير مؤكد: لا يُحسب لا سلبًا ولا إيجابًا
    known++;
    possible += w;
    if (v === true) earned += w;
  }
  return {
    score: possible ? Math.round((earned / possible) * 100) : null,
    completeness: Math.round((known / totalFactors) * 100)
  };
}

/* ---------- حكم السعر العادل (حسابي وليس رأيًا) ---------- */
function priceVerdict(offer, product) {
  const prices = product.offers.map((o) => o.price);
  if (prices.length < 2) return { cls: "single", label: "عرض واحد مرصود — لا حكم" };
  const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
  const diff = ((offer.price - avg) / avg) * 100;
  if (diff <= -15) return { cls: "deal", label: `صفقة ممتازة (${Math.round(-diff)}٪- عن المتوسط)` };
  if (diff >= 15) return { cls: "high", label: `مبالغ فيه (${Math.round(diff)}٪+ عن المتوسط)` };
  return { cls: "fair", label: "سعر عادل" };
}

/* أفضل صفقة: أرخص عرض من متجر بثقة معروفة ومرتفعة */
function bestDeal(product) {
  const eligible = product.offers
    .filter((o) => (trustScore(storeById[o.storeId]).score ?? 0) >= 60)
    .sort((a, b) => a.price - b.price);
  return eligible[0] || null;
}

/* ---------- اتجاه السعر (sparkline صادق) ---------- */
function trendHTML(offer) {
  const h = offer.priceHistory || [];
  if (h.length < 2) return `نقطة رصد واحدة — الاتجاه يظهر مع الرصدات القادمة`;
  const min = Math.min(...h.map((p) => p.price));
  const max = Math.max(...h.map((p) => p.price));
  const range = max - min || 1;
  const pts = h.map((p, i) =>
    `${(i / (h.length - 1)) * 60},${18 - ((p.price - min) / range) * 14}`).join(" ");
  const dir = h[h.length - 1].price - h[0].price;
  const advice = dir < 0 ? "⬇️ ينخفض — يمكنك الانتظار" : dir > 0 ? "⬆️ يرتفع — الشراء الآن أفضل" : "مستقر";
  return `<svg width="64" height="20" viewBox="0 0 64 20" aria-hidden="true">
    <polyline points="${pts}" fill="none" stroke="currentColor" stroke-width="1.6"/></svg> ${advice}`;
}

/* ---------- البحث الذكي: مرادفات + تصحيح إملائي ---------- */
function normalizeAr(s) {
  return s.toLowerCase()
    .replace(/[أإآ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي")
    .replace(/[ًٌٍَُِّْ]/g, "").trim();
}
function levenshtein(a, b) {
  if (Math.abs(a.length - b.length) > 2) return 99;
  const m = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 0; j <= b.length; j++) m[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      m[i][j] = Math.min(m[i - 1][j] + 1, m[i][j - 1] + 1,
        m[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return m[a.length][b.length];
}
/* يوسّع كلمة البحث بمرادفاتها، ويصحح الأخطاء القريبة */
function expandQuery(q) {
  const words = normalizeAr(q).split(/\s+/).filter(Boolean);
  const expanded = new Set();
  let corrected = null;
  for (const w of words) {
    expanded.add(w);
    for (const [root, syns] of Object.entries(synonyms)) {
      const family = [normalizeAr(root), ...syns.map(normalizeAr)];
      if (family.includes(w)) family.forEach((f) => expanded.add(f));
      else {
        const close = family.find((f) => f.length > 2 && levenshtein(w, f) === 1);
        if (close && w.length > 2) {
          family.forEach((f) => expanded.add(f));
          corrected = root;
        }
      }
    }
  }
  return { terms: [...expanded], corrected };
}
function matchProduct(p, terms) {
  if (!terms.length) return true;
  const hay = normalizeAr(
    `${p.name} ${p.partNumber} ${p.fits} ${p.brands.join(" ")} ` +
    p.brands.map((b) => carBrands.find((c) => c.id === b)?.name || "").join(" ")
  );
  return terms.some((t) => hay.includes(t));
}
function highlight(text, terms) {
  let out = esc(text);
  for (const t of terms) {
    if (t.length < 3) continue;
    out = out.replace(new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "g"), "<mark>$1</mark>");
  }
  return out;
}

/* ---------- عرض القطع ---------- */
function visibleProducts() {
  const { terms } = expandQuery(state.query);
  let list = products.filter((p) => {
    if (state.type !== "all" && p.type !== state.type) return false;
    if (state.brand !== "all" && !p.brands.includes(state.brand)) return false;
    return matchProduct(p, terms);
  });
  const cheapest = (p) => Math.min(...p.offers.map((o) => o.price));
  const bestTrust = (p) => Math.max(...p.offers.map((o) => trustScore(storeById[o.storeId]).score ?? 0));
  if (state.sort === "cheap") list.sort((a, b) => cheapest(a) - cheapest(b));
  else if (state.sort === "trust") list.sort((a, b) => bestTrust(b) - bestTrust(a));
  else list.sort((a, b) => (cheapest(a) / (bestTrust(a) || 50)) - (cheapest(b) / (bestTrust(b) || 50)));
  // سيارتي أولًا
  if (state.myCar) {
    list = [...list.filter((p) => p.brands.includes(state.myCar)),
            ...list.filter((p) => !p.brands.includes(state.myCar))];
  }
  return list;
}

function offerRow(offer, product, isBest) {
  const store = storeById[offer.storeId];
  const v = priceVerdict(offer, product);
  const scope = store.scope === "internal" ? "🇸🇦 داخلي" : "🌍 خارجي";
  return `<tr>
    <td>
      <div class="offer-store">${esc(store.name)}</div>
      <span class="scope-badge">${scope}</span>
      ${isBest ? `<div><span class="best-tag">⭐ أفضل صفقة</span></div>` : ""}
    </td>
    <td>
      <div class="offer-price">${fmtSAR(offer.price)}${offer.priceMax ? `<small> – ${fmtSAR(offer.priceMax)}</small>` : ""}</div>
      <span class="verdict ${v.cls}">${v.label}</span>
      ${offer.note ? `<div class="offer-note">${esc(offer.note)}</div>` : ""}
    </td>
    <td>
      <div class="trend-cell">${trendHTML(offer)}</div>
      <div class="checked-at">رُصد: ${offer.checkedAt}</div>
    </td>
    <td>
      <a class="go-btn" href="${offer.sourceUrl}" target="_blank" rel="noopener noreferrer">المصدر ↗</a>
    </td>
  </tr>`;
}

function productCard(p, terms) {
  const best = bestDeal(p);
  const isFav = state.favs.includes(p.id);
  const inCmp = state.compare.includes(p.id);
  const cf = counterfeitGuide[p.type];
  const linksOnly = (p.linksOnly || []).map((l) =>
    `<div class="links-only">🔗 <a href="${l.sourceUrl}" target="_blank" rel="noopener noreferrer">${esc(storeById[l.storeId].name)}</a> — ${esc(l.note)}</div>`
  ).join("");
  return `<article class="product-card" id="p-${p.id}">
    <div class="pc-head">
      <h3>${highlight(p.name, terms)}</h3>
      <div class="pc-actions">
        <button class="mini-btn ${isFav ? "on" : ""}" data-fav="${p.id}" aria-label="مفضلة" title="أضف للمفضلة">${isFav ? "♥" : "♡"}</button>
        <button class="mini-btn ${inCmp ? "on" : ""}" data-cmp="${p.id}" aria-label="قارن" title="أضف للمقارنة">⇄</button>
        <button class="mini-btn" data-share="${p.id}" aria-label="مشاركة" title="مشاركة">↗</button>
      </div>
    </div>
    <p class="pc-meta">رقم القطعة: <code>${esc(p.partNumber)}</code> · التوافق: ${esc(p.fits)}</p>
    <table class="offers-table">
      <thead><tr><th>المتجر</th><th>السعر والحكم</th><th>الاتجاه</th><th></th></tr></thead>
      <tbody>${p.offers.map((o) => offerRow(o, p, best === o)).join("")}</tbody>
    </table>
    ${linksOnly}
    ${cf ? `<button class="cf-toggle" data-cf="${p.id}">🛡️ كاشف التقليد — <span class="risk-tag risk-${cf.risk}">${riskLabel(cf.risk)}</span></button>
    <div class="cf-panel ${cf.risk === "critical" ? "critical" : ""}" id="cf-${p.id}" hidden>
      <b>${esc(cf.riskLabel)}</b>
      <ul>${cf.checks.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
    </div>` : ""}
  </article>`;
}
function riskLabel(r) {
  return { low: "خطورة غش منخفضة", medium: "خطورة غش متوسطة", high: "خطورة غش عالية", critical: "خطورة قصوى" }[r] || r;
}

function renderProducts() {
  const { terms, corrected } = expandQuery(state.query);
  const hint = $("search-hint");
  if (corrected && state.query.trim()) {
    hint.hidden = false;
    hint.textContent = `🔎 فهمنا قصدك وبحثنا أيضًا عن: «${corrected}» ومرادفاتها`;
  } else hint.hidden = true;

  const list = visibleProducts();
  const el = $("products-list");
  if (!list.length) {
    el.innerHTML = `<div class="empty-state"><b>لا نتائج مطابقة</b>
      الدليل في بدايته ويتوسع باستمرار — كل قطعة تضاف تمر بالتحقق من مصادرها أولًا.
      جرّب «فلتر» أو «فحمات» أو «بطارية».</div>`;
    return;
  }
  el.innerHTML = list.map((p) => productCard(p, terms)).join("");
}

/* ---------- المتاجر ---------- */
function ringSVG(score) {
  if (score === null) {
    return `<div class="ring"><svg width="62" height="62"><circle cx="31" cy="31" r="26" fill="none" stroke="var(--line)" stroke-width="6"/></svg>
      <span class="ring-val">؟</span></div><div class="ring-label">غير محسوبة</div>`;
  }
  const c = 2 * Math.PI * 26;
  const col = score >= 75 ? "var(--good)" : score >= 50 ? "var(--warn)" : "var(--bad)";
  return `<div class="ring"><svg width="62" height="62">
    <circle cx="31" cy="31" r="26" fill="none" stroke="var(--line)" stroke-width="6"/>
    <circle cx="31" cy="31" r="26" fill="none" stroke="${col}" stroke-width="6"
      stroke-dasharray="${(score / 100) * c} ${c}" stroke-linecap="round"/></svg>
    <span class="ring-val">${score}</span></div><div class="ring-label">درجة الثقة</div>`;
}
function storeCard(s) {
  const { score, completeness } = trustScore(s);
  const factors = Object.entries(TRUST_WEIGHTS).map(([k, { label }]) => {
    const v = s.trust[k];
    const badge = v === true ? `<span class="tf-yes">✔ نعم</span>`
      : v === false ? `<span class="tf-no">✘ لا</span>`
      : `<span class="tf-unknown">؟ غير مؤكد</span>`;
    return `<div class="tf"><span>${label}</span>${badge}</div>`;
  }).join("");
  return `<article class="store-card">
    <div class="sc-head">
      <div><h3>${esc(s.name)}</h3><span class="sc-cat">${esc(s.category)} · ${s.scope === "internal" ? "🇸🇦 داخلي" : "🌍 خارجي"}</span></div>
      <div class="trust-ring">${ringSVG(score)}</div>
    </div>
    <div class="trust-factors">${factors}</div>
    <div class="completeness">اكتمال البيانات: ${completeness}٪<div class="bar"><i style="width:${completeness}%"></i></div></div>
    <div class="store-notes">${esc(s.notes)}</div>
    <div class="sc-foot">
      <a class="go-btn" href="${s.url}" target="_blank" rel="noopener noreferrer">زيارة المتجر ↗</a>
      <span class="verify-link">مصدر التحقق: <a href="${s.verifySource}" target="_blank" rel="noopener noreferrer">رابط</a></span>
    </div>
  </article>`;
}
function renderStores() {
  const list = stores
    .filter((s) => state.storeScope === "all" || s.scope === state.storeScope)
    .sort((a, b) => (trustScore(b).score ?? -1) - (trustScore(a).score ?? -1));
  $("stores-list").innerHTML = list.map(storeCard).join("");
}

/* ---------- الإحصائيات (محسوبة من البيانات الفعلية) ---------- */
function renderStats() {
  const offers = products.flatMap((p) => p.offers);
  const priced = offers.length;
  const internal = stores.filter((s) => s.scope === "internal").length;
  const external = stores.length - internal;
  $("hero-stats").innerHTML = `
    <div class="stat-pill"><b>${products.length}</b>قطعة موثقة</div>
    <div class="stat-pill"><b>${priced}</b>سعر مرصود بمصدره</div>
    <div class="stat-pill"><b>${internal}</b>متجر داخلي 🇸🇦</div>
    <div class="stat-pill"><b>${external}</b>منصة خارجية 🌍</div>`;
}

/* ---------- مستشار الصيانة ---------- */
function cheapestTrustedOffer(type) {
  const cands = products
    .filter((p) => p.type === type)
    .flatMap((p) => p.offers.map((o) => ({ p, o, t: trustScore(storeById[o.storeId]).score ?? 0 })))
    .filter((x) => x.t >= 60)
    .sort((a, b) => a.o.price - b.o.price);
  return cands[0] || null;
}
function runAdvisor(odometer, lastService, monthly) {
  const since = odometer - lastService;
  const out = [];
  let basket = [], basketTotal = 0;
  for (const item of maintenanceSchedule) {
    const remaining = item.intervalKm - since;
    const status = remaining <= 0 ? "overdue" : remaining <= item.intervalKm * 0.15 ? "soon" : "ok";
    const label = status === "overdue" ? `⛔ مستحقة الآن (تجاوزت بـ ${Math.abs(remaining).toLocaleString("ar-SA")} كم)`
      : status === "soon" ? `⚠️ قريبًا (باقي ${remaining.toLocaleString("ar-SA")} كم ≈ ${Math.ceil(remaining / monthly)} شهر)`
      : `✅ بخير (باقي ${remaining.toLocaleString("ar-SA")} كم ≈ ${Math.ceil(remaining / monthly)} شهر)`;
    let offerLine = "";
    if (status !== "ok") {
      const c = cheapestTrustedOffer(item.type);
      if (c) {
        offerLine = `<p class="muted">أرخص خيار موثوق مرصود: <b>${esc(c.p.name)}</b> بـ <b>${fmtSAR(c.o.price)}</b> من ${esc(storeById[c.o.storeId].name)} — <a href="${c.o.sourceUrl}" target="_blank" rel="noopener noreferrer">المصدر ↗</a></p>`;
        if (status === "overdue") { basket.push({ name: c.p.name, price: c.o.price, store: storeById[c.o.storeId].name }); basketTotal += c.o.price; }
      } else {
        offerLine = `<p class="muted">لا يوجد سعر مرصود لهذا النوع بعد — الدليل يتوسع.</p>`;
      }
    }
    out.push(`<div class="due-card ${status}">
      <div class="due-head"><span>${esc(item.label)}</span><span>${label}</span></div>
      <p class="muted">${esc(item.hint)}</p>${offerLine}</div>`);
  }
  const basketHTML = basket.length ? `<div class="basket-summary">
    <h3>🧺 سلة صيانتك المستحقة الآن</h3>
    <ul>${basket.map((b) => `<li>${esc(b.name)} — ${fmtSAR(b.price)} (${esc(b.store)})</li>`).join("")}</ul>
    <p>الإجمالي التقريبي بأسعار مرصودة حقيقية: <span class="total">${fmtSAR(basketTotal)}</span></p>
    <p style="font-size:.8rem;opacity:.85">الأسعار بتاريخ رصدها (${DATA_CHECKED_AT}) ولا تشمل أجور التركيب — تحقق من المصدر قبل الشراء.</p>
  </div>` : "";
  $("advisor-result").innerHTML = out.join("") + basketHTML;
}

/* ---------- حاسبة الاستيراد ---------- */
function runImportCalc(price, ship, fwd) {
  const sub = price + ship + fwd;
  const customs = sub > 1000 ? sub * 0.05 : 0; // رسوم جمركية تقديرية ~5% للشحنات فوق 1000 ر.س
  const vat = (sub + customs) * 0.15;          // ضريبة القيمة المضافة 15%
  const total = sub + customs + vat;
  $("calc-result").innerHTML = `<div class="calc-breakdown">
    <div class="row"><span>المنتج + الشحن + الوسيط</span><b>${fmtSAR(sub)}</b></div>
    <div class="row"><span>جمارك تقديرية ${customs ? "(~5٪ فوق 1000 ر.س)" : "(معفاة تقديريًا)"}</span><b>${fmtSAR(customs)}</b></div>
    <div class="row"><span>ضريبة القيمة المضافة 15٪</span><b>${fmtSAR(vat)}</b></div>
    <div class="row total-row"><span>السعر الحقيقي عند الباب</span><span>${fmtSAR(total)}</span></div>
    <p class="muted" style="font-size:.76rem">تقدير إرشادي وفق النسب المعلنة (ضريبة 15٪، جمارك ~5٪) — الرسوم الفعلية تحددها هيئة الزكاة والضريبة والجمارك حسب نوع السلعة.</p>
  </div>`;
}

/* ---------- المساعد «دلّيل» ---------- */
const assistantCtx = {
  cheapestAnswer() {
    const all = products
      .flatMap((p) => p.offers.map((o) => ({ p, o })))
      .sort((a, b) => a.o.price - b.o.price)
      .slice(0, 3);
    return "أرخص 3 عروض مرصودة عندنا حاليًا:\n" + all.map((x) =>
      `• ${x.p.name}: ${fmtSAR(x.o.price)} من ${storeById[x.o.storeId].name}`).join("\n") +
      `\n(بتاريخ ${DATA_CHECKED_AT} — افتح بطاقة القطعة للمصدر)`;
  },
  productAnswer(type) {
    const matches = products.filter((p) => p.type === type);
    if (!matches.length) return "لا توجد قطع مرصودة من هذا النوع بعد — الدليل يتوسع باستمرار.";
    return matches.map((p) => {
      const cheapest = [...p.offers].sort((a, b) => a.price - b.price)[0];
      return `• ${p.name}: يبدأ من ${fmtSAR(cheapest.price)} (${storeById[cheapest.storeId].name})`;
    }).join("\n") + "\nافتح تبويب قطع الغيار وابحث عنها لكل التفاصيل والمصادر.";
  }
};
function assistantReply(q) {
  const nq = normalizeAr(q);
  for (const rule of assistantKB) {
    if (rule.keys.some((k) => nq.includes(normalizeAr(k)))) return rule.answer(assistantCtx);
  }
  return "ما فهمت سؤالك تمامًا 🤔 جرّب: «وش أرخص فلتر؟» أو «هل الشراء من الخارج يستاهل؟» أو «كيف أعرف القطعة الأصلية؟» أو «متى أغير الزيت؟»";
}
function pushMsg(text, who) {
  const log = $("chat-log");
  const div = document.createElement("div");
  div.className = `msg ${who}`;
  div.textContent = text;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}

/* ---------- التنقل بين العروض ---------- */
const VIEWS = ["parts", "stores", "advisor", "tools", "method", "favs"];
function setView(v, push = true) {
  state.view = v;
  const go = () => {
    VIEWS.forEach((x) => $(`view-${x}`).hidden = x !== v);
    document.querySelectorAll(".nav-btn").forEach((b) =>
      b.classList.toggle("active", b.dataset.view === v));
    $("hero").hidden = v !== "parts";
    if (v === "stores") renderStores();
    if (v === "favs") renderFavs();
  };
  if (document.startViewTransition) document.startViewTransition(go); else go();
  if (push) history.replaceState(null, "", `#${v}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------- المفضلة والمقارنة والمشاركة ---------- */
function saveFavs() {
  localStorage.setItem("mirshad_favs", JSON.stringify(state.favs));
  const n = state.favs.length;
  $("fav-count").hidden = !n;
  $("fav-count").textContent = n;
}
function renderFavs() {
  const { terms } = expandQuery("");
  const list = products.filter((p) => state.favs.includes(p.id));
  $("favs-list").innerHTML = list.length
    ? list.map((p) => productCard(p, terms)).join("")
    : `<div class="empty-state"><b>مفضلتك فارغة</b>اضغط ♡ على أي قطعة لمتابعتها هنا.</div>`;
}
function updateCompareTray() {
  const tray = $("compare-tray");
  tray.hidden = state.compare.length === 0;
  $("compare-label").textContent = `${state.compare.length} قطعة في المقارنة (بحد أقصى 3)`;
}
function openCompare() {
  const list = products.filter((p) => state.compare.includes(p.id));
  $("compare-body").innerHTML = `<div class="compare-grid">${list.map((p) => {
    const cheapest = [...p.offers].sort((a, b) => a.price - b.price)[0];
    const best = bestDeal(p);
    return `<div class="compare-col">
      <b>${esc(p.name)}</b>
      <span class="muted">${esc(p.partNumber)}</span>
      <span class="price">${fmtSAR(cheapest.price)}</span>
      <span class="muted">أرخص عرض: ${esc(storeById[cheapest.storeId].name)}</span>
      ${best ? `<span class="muted">⭐ أفضل صفقة موثوقة: ${fmtSAR(best.price)} (${esc(storeById[best.storeId].name)})</span>` : ""}
      <span class="muted">عدد العروض المرصودة: ${p.offers.length}</span>
      <a class="go-btn" href="${cheapest.sourceUrl}" target="_blank" rel="noopener noreferrer">أرخص مصدر ↗</a>
    </div>`;
  }).join("")}</div>`;
  $("compare-dialog").showModal();
}
async function shareProduct(p) {
  const url = `${location.origin}${location.pathname}#p=${p.id}`;
  const cheapest = [...p.offers].sort((a, b) => a.price - b.price)[0];
  const text = `${p.name} — يبدأ من ${fmtSAR(cheapest.price)} | عبر دليل مِرشاد`;
  if (navigator.share) {
    try { await navigator.share({ title: "مِرشاد", text, url }); } catch { /* أُلغيت */ }
  } else {
    await navigator.clipboard.writeText(`${text}\n${url}`);
    showToast("نُسخ رابط القطعة 📋");
  }
}

/* ---------- الثيم ---------- */
function applyTheme() {
  document.documentElement.dataset.theme = state.theme;
  localStorage.setItem("mirshad_theme", state.theme);
}

/* ---------- سيارتي ---------- */
function renderMyCar() {
  const banner = $("my-car-banner");
  if (state.myCar) {
    const name = carBrands.find((c) => c.id === state.myCar)?.name || state.myCar;
    banner.hidden = false;
    banner.innerHTML = `<span>🚗 تُعرض قطع <b>${esc(name)}</b> أولًا</span><button class="ghost-btn small" id="car-unset">إلغاء</button>`;
    banner.querySelector("#car-unset").onclick = () => { state.myCar = ""; localStorage.removeItem("mirshad_car"); renderMyCar(); renderProducts(); };
  } else banner.hidden = true;
  $("my-car-brands").innerHTML = carBrands.map((c) =>
    `<button class="chip ${state.myCar === c.id ? "active" : ""}" data-car="${c.id}">${c.name}</button>`).join("");
}

/* ---------- كاشف التقليد (تبويب الأدوات) ---------- */
function renderCfTool() {
  $("cf-chips").innerHTML = partTypes.map((t) =>
    `<button class="chip" data-cftype="${t.id}">${t.icon} ${t.name}</button>`).join("");
}
function showCfType(typeId) {
  const g = counterfeitGuide[typeId];
  $("cf-result").innerHTML = g
    ? `<div class="cf-panel ${g.risk === "critical" ? "critical" : ""}" style="margin-top:.7rem">
        <b><span class="risk-tag risk-${g.risk}">${riskLabel(g.risk)}</span> — ${esc(g.riskLabel)}</b>
        <ul>${g.checks.map((c) => `<li>${esc(c)}</li>`).join("")}</ul></div>`
    : `<p class="muted" style="margin-top:.7rem">لا يوجد دليل لهذا النوع بعد.</p>`;
}

/* ---------- ربط الأحداث ---------- */
function bindEvents() {
  // تنقل
  document.querySelectorAll(".nav-btn").forEach((b) =>
    b.addEventListener("click", () => setView(b.dataset.view)));
  $("brand-home").addEventListener("click", (e) => { e.preventDefault(); setView("parts"); });
  $("fav-toggle").addEventListener("click", () => setView("favs"));
  $("theme-toggle").addEventListener("click", () => {
    state.theme = state.theme === "dark" ? "light" : "dark";
    applyTheme();
  });

  // بحث
  $("global-search").addEventListener("input", debounce((e) => {
    state.query = e.target.value;
    if (state.view !== "parts") setView("parts");
    renderProducts();
  }, 200));

  // بحث صوتي (Web Speech API — مدمجة في المتصفح)
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const vbtn = $("voice-search");
  if (SR) {
    const rec = new SR();
    rec.lang = "ar-SA";
    rec.onresult = (e) => {
      const text = e.results[0][0].transcript;
      $("global-search").value = text;
      state.query = text;
      setView("parts");
      renderProducts();
      showToast(`سمعتك: «${text}»`);
    };
    rec.onend = () => vbtn.classList.remove("listening");
    vbtn.addEventListener("click", () => { vbtn.classList.add("listening"); rec.start(); });
  } else {
    vbtn.addEventListener("click", () => showToast("البحث الصوتي غير مدعوم في متصفحك"));
  }

  // فلاتر
  $("type-chips").addEventListener("click", (e) => {
    const chip = e.target.closest("[data-type]");
    if (!chip) return;
    state.type = chip.dataset.type;
    document.querySelectorAll("#type-chips .chip").forEach((c) =>
      c.classList.toggle("active", c === chip));
    renderProducts();
  });
  $("brand-filter").addEventListener("change", (e) => { state.brand = e.target.value; renderProducts(); });
  $("sort-select").addEventListener("change", (e) => { state.sort = e.target.value; renderProducts(); });

  // تفويض أحداث بطاقات القطع (مفضلة/مقارنة/مشاركة/كاشف)
  document.body.addEventListener("click", async (e) => {
    const fav = e.target.closest("[data-fav]");
    if (fav) {
      const id = fav.dataset.fav;
      state.favs = state.favs.includes(id) ? state.favs.filter((x) => x !== id) : [...state.favs, id];
      saveFavs();
      renderProducts();
      if (state.view === "favs") renderFavs();
      showToast(state.favs.includes(id) ? "أُضيفت للمفضلة ♥" : "أُزيلت من المفضلة");
      return;
    }
    const cmp = e.target.closest("[data-cmp]");
    if (cmp) {
      const id = cmp.dataset.cmp;
      if (state.compare.includes(id)) state.compare = state.compare.filter((x) => x !== id);
      else if (state.compare.length >= 3) { showToast("الحد الأقصى 3 قطع للمقارنة"); return; }
      else state.compare.push(id);
      updateCompareTray();
      renderProducts();
      return;
    }
    const share = e.target.closest("[data-share]");
    if (share) { await shareProduct(products.find((p) => p.id === share.dataset.share)); return; }
    const cf = e.target.closest("[data-cf]");
    if (cf) { const panel = $(`cf-${cf.dataset.cf}`); panel.hidden = !panel.hidden; return; }
    const cftype = e.target.closest("[data-cftype]");
    if (cftype) {
      document.querySelectorAll("#cf-chips .chip").forEach((c) => c.classList.toggle("active", c === cftype));
      showCfType(cftype.dataset.cftype);
      return;
    }
    const car = e.target.closest("[data-car]");
    if (car) {
      state.myCar = car.dataset.car;
      localStorage.setItem("mirshad_car", state.myCar);
      $("my-car-dialog").close();
      renderMyCar();
      renderProducts();
      showToast("تم حفظ سيارتك — ستظهر قطعها أولًا 🚗");
    }
  });

  // مقارنة
  $("compare-open").addEventListener("click", openCompare);
  $("compare-clear").addEventListener("click", () => { state.compare = []; updateCompareTray(); renderProducts(); });
  $("compare-close").addEventListener("click", () => $("compare-dialog").close());

  // سيارتي
  $("my-car-btn").addEventListener("click", () => $("my-car-dialog").showModal());
  $("my-car-close").addEventListener("click", () => $("my-car-dialog").close());
  $("my-car-clear").addEventListener("click", () => {
    state.myCar = ""; localStorage.removeItem("mirshad_car");
    $("my-car-dialog").close(); renderMyCar(); renderProducts();
  });

  // متاجر: فلترة النطاق
  $("store-scope-chips").addEventListener("click", (e) => {
    const chip = e.target.closest("[data-scope]");
    if (!chip) return;
    state.storeScope = chip.dataset.scope;
    document.querySelectorAll("#store-scope-chips .chip").forEach((c) =>
      c.classList.toggle("active", c === chip));
    renderStores();
  });

  // مستشار الصيانة
  $("advisor-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const odo = +$("adv-odometer").value, last = +$("adv-last").value, monthly = +$("adv-monthly").value || 1500;
    if (last > odo) { showToast("آخر صيانة لا يمكن أن تكون أكبر من الممشى الحالي"); return; }
    runAdvisor(odo, last, monthly);
  });

  // حاسبة الاستيراد
  $("import-calc").addEventListener("submit", (e) => {
    e.preventDefault();
    runImportCalc(+$("calc-price").value || 0, +$("calc-ship").value || 0, +$("calc-fwd").value || 0);
  });

  // المساعد
  $("chat-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const q = $("chat-input").value.trim();
    if (!q) return;
    pushMsg(q, "user");
    $("chat-input").value = "";
    setTimeout(() => pushMsg(assistantReply(q), "bot"), 250);
  });
}

/* ---------- روابط عميقة ---------- */
function handleDeepLink() {
  const h = location.hash.slice(1);
  if (!h) return;
  if (h.startsWith("p=")) {
    const id = h.slice(2);
    setView("parts", false);
    requestAnimationFrame(() => {
      const el = $(`p-${id}`);
      if (el) { el.scrollIntoView({ behavior: "smooth", block: "center" }); el.style.outline = "2px solid var(--accent)"; }
    });
  } else if (VIEWS.includes(h)) setView(h, false);
}

/* ---------- الإقلاع ---------- */
function init() {
  applyTheme();
  document.querySelectorAll(".data-date, #data-date").forEach((el) => el.textContent = DATA_CHECKED_AT);

  $("type-chips").innerHTML =
    `<button class="chip active" data-type="all">الكل</button>` +
    partTypes.map((t) => `<button class="chip" data-type="${t.id}">${t.icon} ${t.name}</button>`).join("");
  $("brand-filter").innerHTML =
    `<option value="all">كل الماركات</option>` +
    carBrands.map((c) => `<option value="${c.id}">${c.name}</option>`).join("");

  renderStats();
  renderProducts();
  renderMyCar();
  renderCfTool();
  saveFavs();
  bindEvents();
  handleDeepLink();
  pushMsg("هلا! أنا «دلّيل» 👋 أشتغل من جهازك مباشرة بدون إنترنت. اسألني عن الأسعار، المتاجر الآمنة، أو الشراء من الخارج.", "bot");

  // PWA
  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
}
init();
