/* =====================================================
   مِرشاد — قاعدة البيانات المرصودة يدويًا
   كل سعر له مصدر (sourceUrl) وتاريخ رصد (checkedAt).
   لا يُعرض أي رقم بلا مصدر حقيقي.
   تاريخ الرصد الحالي: 2026-07-24
   ===================================================== */

const DATA_CHECKED_AT = "2026-07-24";

/* ---------- المتاجر ----------
   trust: عوامل موثقة فقط (true/false/null = غير مؤكد)
   كل عامل تم التحقق منه من موقع المتجر نفسه أو مصدر معلن */
const stores = [
  {
    id: "amazon-sa",
    name: "أمازون السعودية",
    url: "https://www.amazon.sa",
    scope: "internal",
    category: "منصة تسوق شاملة",
    trust: {
      officialPlatform: true,      // منصة عالمية بكيان سعودي مرخص (سوق.كوم سابقًا)
      returnPolicy: true,          // سياسة إرجاع معلنة وموثقة
      securePayments: true,        // مدى/فيزا/ماستركارد/الدفع عند الاستلام
      establishedLong: true,       // تعمل في السعودية منذ 2017 (سوق.كوم منذ 2005)
      verifiedByMirshad: true      // تم فتح صفحات منتجاتها والتحقق منها
    },
    notes: "المنصة الأوسع للقطع البديلة والأصلية. انتبه: البائعون داخل المنصة يختلفون — تحقق من تقييم البائع نفسه قبل الشراء.",
    verifySource: "https://www.amazon.sa"
  },
  {
    id: "muhaileb",
    name: "المهيلب لقطع الغيار",
    url: "https://almuhailebautoparts.com",
    scope: "internal",
    category: "قطع غيار أصلية (تويوتا وغيرها)",
    trust: {
      officialPlatform: null,
      returnPolicy: true,          // استبدال 7 أيام / إرجاع 10 أيام (موثق من صفحة المتجر)
      securePayments: true,        // Apple Pay, مدى, فيزا, ماستركارد, تابي, تمارا
      establishedLong: true,       // يعمل منذ 1986 (معلن في الموقع)
      verifiedByMirshad: true      // فتحنا صفحات منتجاته وتحققنا من الأسعار والسياسات
    },
    notes: "متجر سعودي عريق (منذ 1986) متخصص بالقطع الأصلية. التوصيل: 3 أيام عمل للرياض، 7-14 يوم لباقي المناطق. العميل يتحمل شحن الإرجاع.",
    verifySource: "https://almuhailebautoparts.com"
  },
  {
    id: "advmotors",
    name: "مركبات إكس لقطع الغيار",
    url: "https://advmotors.sa",
    scope: "internal",
    category: "قطع غيار وأنظمة فرامل",
    trust: {
      officialPlatform: null,
      returnPolicy: true,          // سياسة إرجاع وضمان معلنة في الموقع
      securePayments: true,        // طرق دفع متعددة معلنة
      establishedLong: null,
      verifiedByMirshad: true      // فتحنا صفحة المنتج وتحققنا من السعر والتوفر
    },
    notes: "نطاق سعودي رسمي (.sa) — يتطلب سجلًا تجاريًا سعوديًا لتسجيله. شحن مجاني للطلبات فوق 399 ر.س. دعم فني 24/7: 920031515. تنبيه من المتجر نفسه: الماركات والأسعار قابلة للتغيير حسب المخزون.",
    verifySource: "https://advmotors.sa"
  },
  {
    id: "toyota-sa",
    name: "تويوتا السعودية (عبداللطيف جميل)",
    url: "https://www.toyota.com.sa",
    scope: "internal",
    category: "الوكيل الرسمي",
    trust: {
      officialPlatform: true,      // الوكيل الرسمي المعتمد لتويوتا في المملكة
      returnPolicy: true,
      securePayments: true,
      establishedLong: true,       // منذ 1955
      verifiedByMirshad: true      // تحققنا من عرض باقة الفرامل في الموقع الرسمي
    },
    notes: "الخيار الأغلى غالبًا لكنه الأضمن: قطع أصلية 100% مع أجور تركيب وضمان الوكالة. مناسب للقطع الحساسة (فرامل، أكياس هواء).",
    verifySource: "https://www.toyota.com.sa/ar/offers/gvpp"
  },
  {
    id: "remalmarb",
    name: "رمال مارب التجارية",
    url: "https://remalmarb.com/ar",
    scope: "internal",
    category: "قطع تويوتا ولكزس أصلية وبديلة",
    trust: {
      officialPlatform: null,
      returnPolicy: null,          // لم نعثر على سياسة معلنة بعد — غير مؤكد
      securePayments: null,
      establishedLong: null,
      verifiedByMirshad: true      // زرنا الموقع: يعرض ماركات Denso, KYB, Akebono, Aisin
    },
    notes: "متخصص بقطع تويوتا ولكزس بماركات معروفة (Denso، KYB، Akebono). بيانات السياسات غير مكتملة لدينا — تواصل معهم واسأل عن السياسات قبل الدفع.",
    verifySource: "https://remalmarb.com/ar"
  },
  {
    id: "vparts",
    name: "Vparts",
    url: "https://vparts.sa",
    scope: "internal",
    category: "قطع غيار متنوعة",
    trust: {
      officialPlatform: null,
      returnPolicy: null,
      securePayments: null,
      establishedLong: null,
      verifiedByMirshad: null      // الموقع يمنع الفحص الآلي — لم نُكمل التحقق
    },
    notes: "نطاق سعودي رسمي (.sa). لم نُكمل التحقق التفصيلي بعد — الموقع يمنع الفحص الآلي. تحقق بنفسك من السياسات قبل الشراء.",
    verifySource: "https://vparts.sa"
  },
  {
    id: "adwaa",
    name: "متجر أضواء",
    url: "https://adwaastore.sa",
    scope: "internal",
    category: "إنارة وصدامات وزينة",
    trust: {
      officialPlatform: null,
      returnPolicy: null,
      securePayments: null,
      establishedLong: null,
      verifiedByMirshad: null
    },
    notes: "متخصص بالشمعات والاسطبات والصدامات بماركات DEPO وTYC. نطاق .sa رسمي. التحقق التفصيلي لم يكتمل بعد.",
    verifySource: "https://adwaastore.sa"
  },
  {
    id: "medrar",
    name: "مدرار",
    url: "https://medrar.sa",
    scope: "internal",
    category: "سوق قطع غيار",
    trust: {
      officialPlatform: null,
      returnPolicy: null,
      securePayments: null,
      establishedLong: null,
      verifiedByMirshad: null
    },
    notes: "سوق إلكتروني لقطع الغيار بنطاق .sa رسمي. التحقق التفصيلي لم يكتمل بعد.",
    verifySource: "https://medrar.sa"
  },
  {
    id: "ebay",
    name: "eBay Motors",
    url: "https://www.ebay.com/b/Auto-Parts-and-Vehicles/6000/bn_1865334",
    scope: "external",
    category: "منصة عالمية — تشحن للسعودية",
    trust: {
      officialPlatform: true,      // منصة عالمية بنظام حماية مشتري موثق
      returnPolicy: true,          // eBay Money Back Guarantee
      securePayments: true,
      establishedLong: true,       // منذ 1995
      verifiedByMirshad: true
    },
    notes: "يشحن للسعودية عبر برنامج الشحن الدولي. الأسعار بالدولار — استخدم حاسبة التكلفة النهائية عندنا لمعرفة السعر الحقيقي عند الباب مع الجمارك والضريبة. مدة الشحن 2-5 أسابيع.",
    verifySource: "https://www.ebay.com"
  },
  {
    id: "aliexpress",
    name: "AliExpress",
    url: "https://www.aliexpress.com/category/34/automobiles-motorcycles.html",
    scope: "external",
    category: "منصة عالمية — تشحن للسعودية",
    trust: {
      officialPlatform: true,
      returnPolicy: true,          // نظام نزاعات وحماية مشتري
      securePayments: true,
      establishedLong: true,       // منذ 2010
      verifiedByMirshad: true
    },
    notes: "أسعار منخفضة لكن جودة القطع متفاوتة جدًا — مناسب للإكسسوارات والكماليات، ولا ننصح به للقطع الحساسة (فرامل، تعليق). راجع كاشف التقليد عندنا قبل الشراء.",
    verifySource: "https://www.aliexpress.com"
  },
  {
    id: "rockauto",
    name: "RockAuto",
    url: "https://www.rockauto.com",
    scope: "external",
    category: "كتالوج قطع أمريكي ضخم",
    trust: {
      officialPlatform: true,
      returnPolicy: true,
      securePayments: true,
      establishedLong: true,       // منذ 1999
      verifiedByMirshad: true      // تحققنا: لا يشحن للسعودية مباشرة
    },
    notes: "تنبيه مهم (تحققنا منه): لا يشحن للسعودية مباشرة ولا يقبل أغلب البطاقات الأجنبية — تحتاج وسيط شحن (مثل Ship7 أو MyMallBox أو Shop2Ship) بعنوان أمريكي. أضف تكلفة الوسيط للحسبة. الأفضل للسيارات الأمريكية.",
    verifySource: "https://www.ship7.com/shopping-directory/rock-auto"
  }
];

/* ---------- القطع والأسعار المرصودة ----------
   كل عرض (offer): سعر حقيقي من صفحة منتج فعلية.
   priceHistory: نقاط الرصد بتواريخها — الاتجاه يُرسم عندما تتوفر نقطتان فأكثر.
   linksOnly: روابط منتجات حقيقية لم نتحقق من سعرها بعد (تُعرض بلا سعر). */
const products = [
  {
    id: "oil-filter-camry-18",
    name: "فلتر زيت أصلي — تويوتا كامري 2018-2025",
    partNumber: "90915-10009",
    section: "spare-parts",
    type: "filters",
    brands: ["toyota"],
    fits: "كامري 2018-2025 (4 سلندر) — وموديلات تويوتا أخرى بنفس الرقم",
    counterfeitRisk: "high",
    offers: [
      {
        storeId: "amazon-sa",
        price: 38.60,
        sourceUrl: "https://www.amazon.sa/dp/B0C6BHZXP2",
        checkedAt: "2026-07-24",
        priceHistory: [{ date: "2026-07-24", price: 38.60 }],
        note: "تحقق من أن البائع موثوق داخل المنصة"
      },
      {
        storeId: "muhaileb",
        price: 40.00,
        sourceUrl: "https://almuhailebautoparts.com/products/genuine-oil-filter-toyota-camry-2018-2025-90915-10009-2",
        checkedAt: "2026-07-24",
        priceHistory: [{ date: "2026-07-24", price: 40.00 }],
        note: "كان نافد المخزون وقت الرصد — تحقق من التوفر"
      }
    ],
    linksOnly: []
  },
  {
    id: "oil-filter-camry-12",
    name: "فلتر زيت أصلي — تويوتا كامري 2012-2017",
    partNumber: "04152-31090",
    section: "spare-parts",
    type: "filters",
    brands: ["toyota"],
    fits: "كامري 2012-2017 — أفالون، RAV4 (تحقق من رقم القطعة لموديلك)",
    counterfeitRisk: "high",
    offers: [
      {
        storeId: "amazon-sa",
        price: 74.63,
        sourceUrl: "https://www.amazon.sa/dp/B07V46FP19",
        checkedAt: "2026-07-24",
        priceHistory: [{ date: "2026-07-24", price: 74.63 }],
        note: ""
      }
    ],
    linksOnly: [
      {
        storeId: "muhaileb",
        sourceUrl: "https://almuhailebautoparts.com/products/genuine-oil-filter-toyota-camry-2012-2017-04152-31090",
        note: "متوفر لديهم — لم نرصد السعر بعد، افتح الرابط للتحقق"
      }
    ]
  },
  {
    id: "brake-pads-camry-18",
    name: "فحمات فرامل — تويوتا كامري 2018-2024 (4 سلندر)",
    partNumber: "طقم 000330 (مركبات إكس)",
    section: "spare-parts",
    type: "brakes",
    brands: ["toyota"],
    fits: "كامري 2018-2024 (4 سلندر)",
    counterfeitRisk: "critical",
    offers: [
      {
        storeId: "advmotors",
        price: 175.00,
        priceMax: 374.00,
        sourceUrl: "https://advmotors.sa/shop/%D9%86%D8%B8%D8%A7%D9%85-%D8%A7%D9%84%D9%81%D8%B1%D8%A7%D9%85%D9%84/%D9%81%D8%AD%D9%85%D8%A7%D8%AA-%D9%81%D8%B1%D8%A7%D9%85%D9%84/%D9%81%D8%AD%D9%85%D8%A7%D8%AA-%D9%81%D8%B1%D8%A7%D9%85%D9%84-%D8%A3%D9%85%D8%A7%D9%85%D9%8A%D8%A9-%D9%88%D8%AE%D9%84%D9%81%D9%8A%D8%A9-%D9%83%D8%A7%D9%85%D9%84%D8%A9-43/",
        checkedAt: "2026-07-24",
        priceHistory: [{ date: "2026-07-24", price: 175.00 }],
        note: "175 ر.س أمامية فقط — الطقم الكامل (أمامي+خلفي) حتى 374 ر.س شامل الضريبة. كان متوفرًا وقت الرصد"
      },
      {
        storeId: "toyota-sa",
        price: 749.00,
        sourceUrl: "https://www.toyota.com.sa/ar/offers/gvpp",
        checkedAt: "2026-07-24",
        priceHistory: [{ date: "2026-07-24", price: 749.00 }],
        note: "باقة الوكيل الرسمية: قطع أصلية + أجور عمل + خرط هوبات + ضريبة — ليست مقارنة مباشرة بسعر القطعة وحدها"
      }
    ],
    linksOnly: []
  },
  {
    id: "battery-acdelco-70",
    name: "بطارية AC Delco — 70 أمبير (NS70)",
    partNumber: "NS70 / 12V 70Ah",
    section: "spare-parts",
    type: "batteries",
    brands: ["toyota", "hyundai", "honda", "nissan"],
    fits: "أغلب السيدان والدفع الرباعي الخفيف — تحقق من مقاس صندوق البطارية وقطبيتها لسيارتك",
    counterfeitRisk: "medium",
    offers: [
      {
        storeId: "amazon-sa",
        price: 296.33,
        sourceUrl: "https://www.amazon.sa/dp/B0868P24SR",
        checkedAt: "2026-07-24",
        priceHistory: [{ date: "2026-07-24", price: 296.33 }],
        note: "رُصد أيضًا عرض آخر بـ 332.97 ر.س (قائمة 369.99) — الأسعار تتحرك، تحقق قبل الشراء"
      }
    ],
    linksOnly: []
  },
  {
    id: "mobil1-5w30",
    name: "زيت محرك موبيل 1 تخليقي كامل 5W-30 — 5 كوارت",
    partNumber: "Mobil 1 Advanced Full Synthetic 5W-30",
    section: "spare-parts",
    type: "oils",
    brands: ["toyota", "hyundai", "honda", "nissan", "ford", "chevrolet"],
    fits: "أغلب المحركات الحديثة التي توصي بلزوجة 5W-30 — راجع دليل سيارتك",
    counterfeitRisk: "high",
    offers: [
      {
        storeId: "amazon-sa",
        price: 315.85,
        sourceUrl: "https://www.amazon.sa/dp/B00I4E91GI",
        checkedAt: "2026-07-24",
        priceHistory: [{ date: "2026-07-24", price: 315.85 }],
        note: "عبوة 5 كوارت (≈4.7 لتر). رُصدت أيضًا عبوات 1 كوارت ×6 بـ 326.69 ر.س"
      }
    ],
    linksOnly: []
  },
  {
    id: "air-filter-camry-18",
    name: "فلتر هواء أصلي — تويوتا كامري 2018+",
    partNumber: "17801-25020",
    section: "spare-parts",
    type: "filters",
    brands: ["toyota"],
    fits: "كامري 2018-2025",
    counterfeitRisk: "medium",
    offers: [
      {
        storeId: "amazon-sa",
        price: 170.00,
        sourceUrl: "https://www.amazon.sa/dp/B07PF35BQF",
        checkedAt: "2026-07-24",
        priceHistory: [{ date: "2026-07-24", price: 170.00 }],
        note: "رُصد عرض آخر بـ 299.37 ر.س — فرق كبير بين البائعين لنفس القطعة، قارن قبل الشراء"
      }
    ],
    linksOnly: [
      {
        storeId: "muhaileb",
        sourceUrl: "https://almuhailebautoparts.com/products/genuine-air-filter-toyota-camry-2018-2025-17801-25020",
        note: "متوفر لديهم — لم نرصد السعر بعد"
      }
    ]
  },
  {
    id: "cabin-filter-toyota",
    name: "فلتر مكيف (كابينة) — تويوتا 2015-2018",
    partNumber: "87139-0K070",
    section: "spare-parts",
    type: "filters",
    brands: ["toyota"],
    fits: "كامري، كورولا، RAV4، فورتشنر، هايلكس، إنوفا، بريوس (2015-2018)",
    counterfeitRisk: "low",
    offers: [
      {
        storeId: "amazon-sa",
        price: 69.99,
        sourceUrl: "https://www.amazon.sa/dp/B08CSQGSBY",
        checkedAt: "2026-07-24",
        priceHistory: [{ date: "2026-07-24", price: 69.99 }],
        note: "بديل بعلامة جوديير — ليس أصلي تويوتا"
      }
    ],
    linksOnly: []
  }
];

/* ---------- ماركات السيارات (للفلترة واختيار سيارتك) ---------- */
const carBrands = [
  { id: "toyota", name: "تويوتا" },
  { id: "hyundai", name: "هيونداي" },
  { id: "honda", name: "هوندا" },
  { id: "nissan", name: "نيسان" },
  { id: "ford", name: "فورد" },
  { id: "chevrolet", name: "شفروليه" }
];

/* ---------- أنواع القطع ---------- */
const partTypes = [
  { id: "filters", name: "فلاتر", icon: "🌀" },
  { id: "brakes", name: "فرامل", icon: "🛑" },
  { id: "batteries", name: "بطاريات", icon: "🔋" },
  { id: "oils", name: "زيوت", icon: "🛢️" },
  { id: "tires", name: "إطارات", icon: "⭕" },
  { id: "suspension", name: "تعليق", icon: "🔩" }
];

/* ---------- قاموس المرادفات (عربي/إنجليزي/عامية) ---------- */
const synonyms = {
  "فحمات": ["بريك", "بريكات", "brake", "pads", "قماشات", "اقمشة", "فرامل", "دسك"],
  "فلتر": ["filter", "فلاتر", "مصفي", "مصفاة"],
  "زيت": ["oil", "زيوت", "دهن"],
  "بطارية": ["battery", "بطاريه", "بطاريات", "بترية"],
  "مكيف": ["كابينة", "cabin", "ac", "تكييف"],
  "هواء": ["air", "هوا"],
  "كامري": ["camry", "كمري", "كامرى"],
  "كورولا": ["corolla", "كرولا"],
  "هايلكس": ["hilux", "هيلوكس", "هايلوكس"],
  "تويوتا": ["toyota", "تيوتا"],
  "اصلي": ["أصلي", "genuine", "وكالة", "اصليه"]
};

/* ---------- جدول الصيانة الدورية (فترات قياسية متعارف عليها في أدلة الصيانة) ---------- */
const maintenanceSchedule = [
  { type: "oils",     label: "زيت المحرك + فلتر الزيت", intervalKm: 8000,  hint: "5,000-10,000 كم حسب نوع الزيت (تخليقي كامل يتحمل أكثر)" },
  { type: "filters",  label: "فلتر الهواء",             intervalKm: 30000, hint: "20,000-40,000 كم — أبكر في المناطق المغبرة" },
  { type: "filters",  label: "فلتر المكيف",             intervalKm: 20000, hint: "15,000-25,000 كم — مهم جدًا مع غبار السعودية" },
  { type: "brakes",   label: "فحمات الفرامل",           intervalKm: 50000, hint: "40,000-60,000 كم حسب أسلوب القيادة — افحصها كل 10,000" },
  { type: "batteries", label: "البطارية",               intervalKm: 60000, hint: "عمرها 2-4 سنوات في حرارة السعودية بغض النظر عن الممشى" }
];

/* ---------- كاشف التقليد: قوائم تحقق إرشادية لكل نوع ---------- */
const counterfeitGuide = {
  filters: {
    risk: "high",
    riskLabel: "الفلاتر من أكثر القطع المقلدة في السوق",
    checks: [
      "قارن رقم القطعة المطبوع مع الرقم في دليل الوكالة حرفًا حرفًا",
      "الفلتر الأصلي: طباعة حادة غير باهتة، ولا أخطاء إملائية في العلبة",
      "افحص جودة اللحامات وحواف المعدن — التقليد غالبًا خشن",
      "الفرق السعري الكبير جدًا عن الوكيل (أكثر من 60%) إشارة تحذير"
    ]
  },
  brakes: {
    risk: "critical",
    riskLabel: "قطعة سلامة حرجة — الغش فيها خطر على الحياة",
    checks: [
      "اشترِ الفحمات من الوكيل أو متجر موثق فقط — لا تجازف بالسعر الأرخص",
      "الفحمة الأصلية عليها علامة الماركة محفورة وليست ملصقًا",
      "تحقق من وجود شهادة مطابقة أو علامة جودة (ECE R90 للماركات العالمية)",
      "رائحة كيميائية نفاذة أو تفتت الحواف عند الحك = تقليد غالبًا"
    ]
  },
  batteries: {
    risk: "medium",
    riskLabel: "الغش الشائع: بطاريات مخزنة طويلًا تُباع كجديدة",
    checks: [
      "افحص تاريخ الإنتاج المطبوع — لا تقبل بطارية عمرها أكثر من 6 أشهر بالمخزن",
      "تأكد من وجود ضمان كتابي (سنة على الأقل) بفاتورة رسمية",
      "الوزن: البطارية الأصلية أثقل ملحوظًا من المقلدة بنفس المقاس"
    ]
  },
  oils: {
    risk: "high",
    riskLabel: "زيوت مغشوشة تُعبأ في عبوات ماركات أصلية",
    checks: [
      "اشترِ من متجر معتمد — عبوات الزيت أسهل شيء يُغَش",
      "افحص ختم الأمان على الغطاء وسلامة العبوة من إعادة التعبئة",
      "كثير من الماركات لديها رمز QR للتحقق من الأصالة — استخدمه",
      "سعر أقل من 50% من متوسط السوق = شبه مؤكد مغشوش"
    ]
  },
  tires: {
    risk: "critical",
    riskLabel: "قطعة سلامة حرجة — الإطار المخزن بشكل خاطئ قنبلة موقوتة",
    checks: [
      "اقرأ أسبوع وسنة الإنتاج (DOT) على جانب الإطار — لا تقبل أقدم من سنة",
      "تأكد من وجود علامة الجودة السعودية (SASO)",
      "افحص وجود تشققات دقيقة في الجوانب حتى لو كان جديدًا"
    ]
  },
  suspension: {
    risk: "medium",
    riskLabel: "المساعدات المقلدة تنتهي خلال أشهر",
    checks: [
      "الماركات الموثوقة: KYB، Monroe، Bilstein، أو أصلي الوكالة",
      "تحقق من الرقم التسلسلي على جسم المساعد",
      "اشترِ بالزوج دائمًا (يمين ويسار) — الفردي إشارة لمصدر غير نظامي"
    ]
  }
};

/* ---------- قاعدة معرفة المساعد "دلّيل" ---------- */
const assistantKB = [
  {
    keys: ["ارخص", "أرخص", "اوفر", "وفر", "سعر"],
    answer: (ctx) => ctx.cheapestAnswer()
  },
  {
    keys: ["امان", "أمان", "موثوق", "ثقة", "امن", "آمن", "نصب", "احتيال"],
    answer: () => "أكثر المتاجر اكتمالًا في بيانات الثقة عندنا: أمازون السعودية، المهيلب (منذ 1986)، مركبات إكس، وتويوتا السعودية. القاعدة الذهبية: ادفع دائمًا بوسيلة قابلة للاسترداد (مدى/بطاقة/تابي) ولا تحوّل بنكيًا لمتجر لم تجربه، وتأكد من وجود سياسة إرجاع معلنة قبل الدفع."
  },
  {
    keys: ["تقليد", "مقلد", "اصلي", "أصلي", "غش", "مغشوش"],
    answer: () => "افتح تبويب أي قطعة واضغط «كاشف التقليد» — ستجد قائمة تحقق مخصصة لنوعها. أخطر الأنواع غشًا: الفرامل والإطارات (خطر على الحياة)، ثم الزيوت والفلاتر (الأكثر انتشارًا في الغش). الفرق السعري الكبير جدًا هو أقوى إشارة تحذير."
  },
  {
    keys: ["خارج", "خارجي", "ايباي", "ebay", "علي", "aliexpress", "rockauto", "روك", "شحن دولي", "جمارك"],
    answer: () => "المتاجر الخارجية: eBay وAliExpress يشحنان للسعودية مباشرة، أما RockAuto فلا يشحن مباشرة وتحتاج وسيط شحن (Ship7 أو MyMallBox). مهم: استخدم «حاسبة التكلفة النهائية» عندنا — السعر الظاهر يضاف له الشحن + ضريبة 15% + جمارك محتملة، وغالبًا يأكل فرق التوفير. القطع الحساسة (فرامل) اشترها محليًا."
  },
  {
    keys: ["صيانة", "ممشى", "كيلو", "متى اغير", "متى أغير", "جدول"],
    answer: () => "افتح تبويب «مستشار الصيانة» وأدخل ممشى سيارتك وآخر صيانة — سيحسب لك القطع المستحقة الآن ويبني سلة بأسعار حقيقية من أرخص المتاجر الموثوقة، ويعطيك موعد صيانتك القادم."
  },
  {
    keys: ["بطاريه", "بطارية", "بطاريات"],
    answer: (ctx) => ctx.productAnswer("batteries")
  },
  {
    keys: ["زيت", "زيوت"],
    answer: (ctx) => ctx.productAnswer("oils")
  },
  {
    keys: ["فحمات", "فرامل", "بريك"],
    answer: (ctx) => ctx.productAnswer("brakes")
  },
  {
    keys: ["فلتر", "فلاتر"],
    answer: (ctx) => ctx.productAnswer("filters")
  },
  {
    keys: ["مرشاد", "الدليل", "وش انت", "من انت", "مين انت"],
    answer: () => "أنا «دلّيل» — مساعد مِرشاد. أشتغل محليًا في متصفحك بدون إنترنت وبدون أي ذكاء اصطناعي خارجي: أجيبك من بيانات مرصودة يدويًا من مصادر حقيقية. اسألني عن: أرخص قطعة، أأمن متجر، الشراء من الخارج، كشف التقليد، أو جدول الصيانة."
  }
];
