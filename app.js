/* ================= مصفوفة الوجهات العالمية (100 وجهة احترافية) ================= */
const destinations = [
    // --- مدن ومناطق المملكة العربية السعودية (35 وجهة) ---
    { id: "NB-01", name: "الرياض", price: 450, type: "عاصمة", risk: 0, desc: "اكتشف قلب المملكة، الدرعية التاريخية، وبوليفارد وورلد." },
    { id: "NB-02", name: "جدة", price: 400, type: "ساحلية", risk: 0, desc: "عروس البحر الأحمر، جدة التاريخية، والواجهة البحرية الساحرة." },
    { id: "NB-03", name: "مكة المكرمة", price: 300, type: "دينية", risk: 0, desc: "روحانية المسجد الحرام، جبل النور، وإطلالة برج الساعة." },
    { id: "NB-04", name: "المدينة المنورة", price: 300, type: "دينية", risk: 0, desc: "السكينة في المسجد النبوي الشريف ومسجد قباء التاريخي." },
    { id: "NB-05", name: "العلا", price: 1200, type: "تاريخية", risk: 0, desc: "رحلة عبر الزمن في الحجر وصخرة الفيل ومسرح مرايا." },
    { id: "NB-06", name: "أبها", price: 550, type: "جبلية", risk: 0, desc: "عروس الضباب، منتزه السودة، وقرية الحبلة المعلقة." },
    { id: "NB-07", name: "الدمام", price: 350, type: "ساحلية", risk: 0, desc: "إطلالات جزيرة المرجان والواجهة البحرية المتطورة." },
    { id: "NB-08", name: "الخبر", price: 450, type: "ترفيهية", risk: 0, desc: "جسر الملك فهد ومنارة الإبداع الثقافي في مركز إثراء." },
    { id: "NB-09", name: "تبوك", price: 500, type: "نيوم", risk: 0, desc: "بوابة المستقبل، جبال اللوز، وآثار قلعة تبوك." },
    { id: "NB-10", name: "الطائف", price: 400, type: "مصيف", risk: 0, desc: "نسيم الهدا والشفا التاريخي وعراقة قصر شبرا." },
    { id: "NB-11", name: "حائل", price: 450, type: "تراثية", risk: 0, desc: "كرم الطائي، قلعة أعيرف، وجمال جبال أجا وسلمى." },
    { id: "NB-12", name: "نجران", price: 500, type: "تاريخية", risk: 0, desc: "حضارة الأخدود الأثري وسد وادي نجران العظيم." },
    { id: "NB-13", name: "جازان", price: 550, type: "طبيعة", risk: 0, desc: "سحر جزر فرسان وجمال جبال الفيفاء المعلقة." },
    { id: "NB-14", name: "الأحساء", price: 400, type: "واحة", risk: 0, desc: "أكبر واحة نخيل في العالم، جبل القارة، وسوق القيصرية." },
    { id: "NB-15", name: "ينبع", price: 400, type: "صناعية", risk: 0, desc: "ينبع البحر والغوص في أجمل الشعاب المرجانية." },
    { id: "NB-16", name: "الجوف", price: 500, type: "زراعية", risk: 0, desc: "موطن الزيتون، قلعة مارد، ومسجد عمر بن الخطاب." },
    { id: "NB-17", name: "عرعر", price: 600, type: "حدودية", risk: 0, desc: "بوابة الشمال والحدود السعودية العراقية." },
    { id: "NB-18", name: "الباحة", price: 500, type: "طبيعة", risk: 0, desc: "قرية ذي عين الأثرية وغابات رغدان الكثيفة." },
    { id: "NB-19", name: "بريدة", price: 350, type: "زراعية", risk: 0, desc: "سوق التمور العالمي ومنتزهات القصيم الخضراء." },
    { id: "NB-20", name: "عنيزة", price: 350, type: "تراثية", risk: 0, desc: "باريس نجد، بيت البسام التراثي، وميدان الساعة." },
    { id: "NB-21", name: "أملج", price: 800, type: "استجمام", risk: 0, desc: "مالديف السعودية والشواطئ الفيروزية البكر." },
    { id: "NB-22", name: "الجبيل", price: 450, type: "صناعية", risk: 0, desc: "شاطئ النخيل وجمال التخطيط في مدينة الجبيل." },
    { id: "NB-23", name: "الخفجي", price: 550, type: "حدودية", risk: 0, desc: "كورنيش الخفجي الهادئ والحدود الكويتية." },
    { id: "NB-24", name: "حفر الباطن", price: 450, type: "تجارية", risk: 0, desc: "عاصمة الربيع والأسواق الشعبية العريقة." },
    { id: "NB-25", name: "القريات", price: 650, type: "حدودية", risk: 0, desc: "منفذ الحديثة الدولي وأجود أنواع الزيتون." },
    { id: "NB-26", name: "الوجه", price: 700, type: "تاريخية", risk: 0, desc: "ميناء تاريخي قديم وبيوت حجازية أصيلة." },
    { id: "NB-27", name: "ضباء", price: 700, type: "بحرية", risk: 0, desc: "لؤلؤة البحر الأحمر وميناء ضباء الحيوي." },
    { id: "NB-28", name: "شرورة", price: 800, type: "صحراوية", risk: 0, desc: "عروس الربع الخالي وعراقة البادية." },
    { id: "NB-29", name: "بيشة", price: 500, type: "زراعية", risk: 0, desc: "سد وادي بيشة الضخم ومزارع النخيل." },
    { id: "NB-30", name: "الدوادمي", price: 400, type: "نجدية", risk: 0, desc: "قصر الملك عبدالعزيز التاريخي وجبال ثهلان." },
    { id: "NB-31", name: "وادي الدواسر", price: 450, type: "زراعية", risk: 0, desc: "آثار قرية الفاو الغامضة والزراعة الصحراوية." },
    { id: "NB-32", name: "رفحاء", price: 600, type: "شمالية", risk: 0, desc: "درب زبيدة التاريخي وعراقة الشمال." },
    { id: "NB-33", name: "طريف", price: 700, type: "صناعية", risk: 0, desc: "مدينة الفوسفات وأبرد مدن المملكة شتاءً." },
    { id: "NB-34", name: "سكاكا", price: 500, type: "أثرية", risk: 0, desc: "أعمدة الرجاجيل الغامضة وقلعة زعبل الشامخة." },
    { id: "NB-35", name: "القطيف", price: 400, type: "بحرية", risk: 0, desc: "قلعة تاروت التاريخية والأسواق الشعبية البحرية." },

    // --- الوجهات العالمية (65 وجهة) ---
    { id: "NB-36", name: "دبي", price: 1500, type: "عالمية", risk: 0, desc: "قمة برج خليفة، دبي مول، ورفاهية نخلة الجميرا." },
    { id: "NB-37", name: "لندن", price: 3500, type: "عالمية", risk: 1, desc: "عراقة ساعة بيج بن، عين لندن، وفخامة هارودز." },
    { id: "NB-38", name: "باريس", price: 3800, type: "رومانسية", risk: 1, desc: "برج إيفل، متحف اللوفر، وسحر شارع الشانزلزيه." },
    { id: "NB-39", name: "اسطنبول", price: 1800, type: "تاريخية", risk: 1, desc: "آيا صوفيا، الجامع الأزرق، ورحلات مضيق البوسفور." },
    { id: "NB-40", name: "نيويورك", price: 5500, type: "عالمية", risk: 2, desc: "أضواء تايمز سكوير، تمثال الحرية، وسنترال بارك." },
    { id: "NB-41", name: "طوكيو", price: 4800, type: "تقنية", risk: 0, desc: "تقاطع شيبويا، تكنولوجيا أكيهابارا، وجبل فوجي." },
    { id: "NB-42", name: "روما", price: 3200, type: "تاريخية", risk: 1, desc: "عظمة الكولوسيوم، نافورة تريفي، وساحات الفاتيكان." },
    { id: "NB-43", name: "القاهرة", price: 1200, type: "تاريخية", risk: 1, desc: "عظمة الأهرامات، المتحف المصري، وسوق خان الخليلي." },
    { id: "NB-44", name: "كوالالمبور", price: 2500, type: "آسيوية", risk: 0, desc: "برجي بتروناس التوأم، وكهوف باتو الطبيعية." },
    { id: "NB-45", name: "بانكوك", price: 2200, type: "سياحية", risk: 1, desc: "القصر الكبير، المعابد الذهبية، والأسواق العائمة." },
    { id: "NB-46", name: "سنغافورة", price: 4000, type: "تقنية", risk: 0, desc: "فندق مارينا باي ساندز، وحدائق الخليج المستقبلية." },
    { id: "NB-47", name: "مدريد", price: 3400, type: "رياضية", risk: 1, desc: "ملعب سانتياغو برنابيو، القصر الملكي، وساحة مايور." },
    { id: "NB-48", name: "برشلونة", price: 3600, type: "سياحية", risk: 1, desc: "كنيسة ساغرادا فاميليا، بارك جويل، وشارع الرامبلا." },
    { id: "NB-49", name: "فيينا", price: 3800, type: "ثقافية", risk: 0, desc: "دار الأوبرا العريقة، قصر شونبرون، وجمال نهر الدانوب." },
    { id: "NB-50", name: "جنيف", price: 4500, type: "طبيعة", risk: 0, desc: "نافورة جيت دو، بحيرة جنيف، ومنتزهات جبال الألب." },
    { id: "NB-51", name: "زيورخ", price: 4700, type: "مالية", risk: 0, desc: "بحيرة زيورخ الساحرة وفخامة شارع باهنهوف شتراسه." },
    { id: "NB-52", name: "ميونيخ", price: 3500, type: "تقنية", risk: 0, desc: "ساحة مارينا، متحف بي إم دبليو، وملاعب الأليانز أرينا." },
    { id: "NB-53", name: "أمستردام", price: 3300, type: "سياحية", risk: 1, desc: "القنوات المائية التاريخية ومتحف فان جوخ." },
    { id: "NB-54", name: "أثينا", price: 2800, type: "تاريخية", risk: 1, desc: "معبد الأكروبوليس، البارثينون، وعبق التاريخ اليوناني." },
    { id: "NB-55", name: "براغ", price: 2600, type: "تاريخية", risk: 1, desc: "جسر تشارلز، قلعة براغ، وجمال المباني المعمارية." },
    { id: "NB-56", name: "سول", price: 4200, type: "تقنية", risk: 0, desc: "برج إن سيول، قصر جيونج بوك جونج، وعالم الكيبوب." },
    { id: "NB-57", name: "هونج كونج", price: 4500, type: "عالمية", risk: 1, desc: "قمة فيكتوريا، عالم ديزني لاند، وأضواء الميناء." },
    { id: "NB-58", name: "سيدني", price: 6500, type: "عالمية", risk: 0, desc: "دار الأوبرا الشهيرة وجسر هاربور وشاطئ بوندي." },
    { id: "NB-59", name: "المالديف", price: 7000, type: "استجمام", risk: 0, desc: "منتجعات مائية فوق المحيط ورمال بيضاء ناعمة." },
    { id: "NB-60", name: "بالي", price: 3500, type: "طبيعة", risk: 1, desc: "مزارع الأرز الخضراء، معابد أوبود، وشواطئ كوتا." },
    { id: "NB-61", name: "شرم الشيخ", price: 1500, type: "بحرية", risk: 1, desc: "خليج نعمة، محمية رأس محمد، وأنشطة الغوص." },
    { id: "NB-62", name: "عمان", price: 1100, type: "تاريخية", risk: 0, desc: "المدرج الروماني، جبل القلعة، وكرم ضيافة الأردن." },
    { id: "NB-63", name: "بيروت", price: 1400, type: "ثقافية", risk: 2, desc: "صخرة الروشة، وسط بيروت، وعبق الفن اللبناني." },
    { id: "NB-64", name: "الدار البيضاء", price: 2500, type: "سياحية", risk: 1, desc: "مسجد الحسن الثاني المعلق على البحر والمدينة القديمة." },
    { id: "NB-65", name: "مراكش", price: 2700, type: "تراثية", risk: 1, desc: "ساحة جامع الفنا، قصر الباهية، وأزقة المدينة الحمراء." },
    { id: "NB-66", name: "تونس", price: 1800, type: "تاريخية", risk: 1, desc: "آثار قرطاج، سيدي بوسعيد، وجمال شواطئ المتوسط." },
    { id: "NB-67", name: "الدوحة", price: 1400, type: "عالمية", risk: 0, desc: "سوق واقف الشعبي، جزيرة اللؤلؤة، ومتحف الفن الإسلامي." },
    { id: "NB-68", name: "الكويت", price: 1300, type: "عالمية", risk: 0, desc: "أبراج الكويت، سوق المباركية، ومجمعات التسوق الحديثة." },
    { id: "NB-69", name: "المنامة", price: 1100, type: "عالمية", risk: 0, desc: "باب البحرين، متحف البحرين الوطني، وقلعة البحرين." },
    { id: "NB-70", name: "مسقط", price: 1200, type: "طبيعة", risk: 0, desc: "جامع السلطان قابوس، مطرح، وجمال الجبال العمانية." },
    { id: "NB-71", name: "أبوظبي", price: 1400, type: "عالمية", risk: 0, desc: "جامع الشيخ زايد، عالم فيراري، ومتحف اللوفر أبوظبي." },
    { id: "NB-72", name: "لوس أنجلوس", price: 5800, type: "ترفيه", risk: 2, desc: "هوليوود، رصيف سانتا مونيكا، وعالم صناعة السينما." },
    { id: "NB-73", name: "ميامي", price: 6000, type: "بحرية", risk: 2, desc: "شواطئ ساوث بيتش، فنون الميناء، والأجواء الاستوائية." },
    { id: "NB-74", name: "أورلاندو", price: 6200, type: "ترفيه", risk: 1, desc: "عالم ديزني وورلد، ويونيفرسال ستوديوز العالمية." },
    { id: "NB-75", name: "تورونتو", price: 5200, type: "عالمية", risk: 0, desc: "برج سي إن، جزر تورونتو، والتنوع الثقافي الكندي." },
    { id: "NB-76", name: "كيب تاون", price: 4500, type: "طبيعة", risk: 2, desc: "جبل الطاولة، جزيرة روبن، وجمال المحيطين." },
    { id: "NB-77", name: "موسكو", price: 3500, type: "تاريخية", risk: 2, desc: "الساحة الحمراء، الكرملين، وفن العمارة الروسية." },
    { id: "NB-78", name: "ستوكهولم", price: 4200, type: "سياحية", risk: 0, desc: "المدينة القديمة غاملا ستان، ومتحف فاسا البحري." },
    { id: "NB-79", name: "أوسلو", price: 4800, type: "طبيعة", risk: 0, desc: "متحف سفن الفايكنج، الفيوردات النرويجية الساحرة." },
    { id: "NB-80", name: "كوبنهاجن", price: 4400, type: "سياحية", risk: 0, desc: "تمثال الحورية الصغيرة، حدائق تيفولي، والبيوت الملونة." },
    { id: "NB-81", name: "لشبونة", price: 3200, type: "سياحية", risk: 1, desc: "برج بيليم، قلعة سان جورج، ومنحدرات المحيط الأطلسي." },
    { id: "NB-82", name: "نيس", price: 3800, type: "ساحلية", risk: 1, desc: "بروميناد دي أنجليه، والبلدة القديمة في ريفييرا فرنسا." },
    { id: "NB-83", name: "كان", price: 4200, type: "سينما", risk: 1, desc: "قصر المهرجانات، شاطئ الكروازيت، وفخامة اليخوت." },
    { id: "NB-84", name: "فينيسيا", price: 3500, type: "رومانسية", risk: 1, desc: "ساحة سان ماركو، رحلات الجندول، والقنوات التاريخية." },
    { id: "NB-85", name: "ميلانو", price: 3400, type: "موضة", risk: 1, desc: "كاتدرائية الدومو، غاليريا فيتوريو، وعاصمة الموضة." },
    { id: "NB-86", name: "فلورنسا", price: 3300, type: "فنون", risk: 1, desc: "جسر بونتي فيكيو، معرض يوفيزي، ومهد النهضة." },
    { id: "NB-87", name: "ميونيخ", price: 3600, type: "تقنية", risk: 0, desc: "عمارة مارينا بلاتز، وتكنولوجيا السيارات الألمانية." },
    { id: "NB-88", name: "فرانكفورت", price: 3400, type: "مالية", risk: 1, desc: "ناطحات سحاب البنوك وعراقة ميدان رومربرغ." },
    { id: "NB-89", name: "باكو", price: 2400, type: "سياحية", risk: 1, desc: "أبراج اللهب، المدينة القديمة، وإطلالة بحر قزوين." },
    { id: "NB-90", name: "تبليسي", price: 2200, type: "طبيعة", risk: 1, desc: "جسر السلام، قلعة ناريكالا، وجمال الطبيعة الجورجية." },
    { id: "NB-91", name: "يريفان", price: 2100, type: "تاريخية", risk: 1, desc: "ساحة الجمهورية، مجمع الشلال، وعراقة التاريخ الأرمني." },
    { id: "NB-92", name: "سراييفو", price: 2300, type: "طبيعة", risk: 1, desc: "سوق باششارشيا، الجسر اللاتيني، وجمال جبال البوسنة." },
    { id: "NB-93", name: "أوزبكستان", price: 2800, type: "تاريخية", risk: 1, desc: "ساحة ريجستان في سمرقند وطريق الحرير التاريخي." },
    { id: "NB-94", name: "مانيلا", price: 2900, type: "آسيوية", risk: 2, desc: "حي إنتراموروس الإسباني، خليج مانيلا، والأسواق الحيوية." },
    { id: "NB-95", name: "جاكرتا", price: 3100, type: "آسيوية", risk: 2, desc: "النصب الوطني موناس، والمدينة القديمة كوتا توا." },
    { id: "NB-96", name: "سيشل", price: 7500, type: "استجمام", risk: 0, desc: "شاطئ أنس لازيو، والمنتجعات الفاخرة وسط المحيط." },
    { id: "NB-97", name: "موريشيوس", price: 6800, type: "طبيعة", risk: 0, desc: "الأرض الملونة، الشلالات، والغابات الاستوائية الساحرة." },
    { id: "NB-98", name: "فوكيت", price: 2800, type: "بحرية", risk: 1, desc: "شاطئ باتونج، جزيرة جيمس بوند، ورحلات القوارب." },
    { id: "NB-99", name: "نيوم", price: 9000, type: "مستقبلية", risk: 0, desc: "مشروع ذا لاين، سندالة، ووجهة تروجينا الجبلية العالمية." },
    { id: "NB-100", name: "القدس", price: 1500, type: "دينية", risk: 2, desc: "المسجد الأقصى المبارك وقبة الصخرة المشرفة." }
];

/* ==================== محرك تطوير البيانات الذكي (Data Booster) ==================== */
destinations.forEach((dest, index) => {
    // توزيع التصنيفات
    dest.category = (index < 35) ? "local" : "global";
    
    // توليد تقييمات واقعية (من 4.4 إلى 5.0)
    dest.rating = (4.4 + Math.random() * 0.6).toFixed(1);
    
    // محرك الصور: جلب صور سفر احترافية من Unsplash بناءً على اسم الوجهة
    // تم تحسين الكلمات المفتاحية لضمان صور سياحية فخمة
    const searchKeyword = index < 35 ? `${dest.name},Saudi Arabia,cityscape` : `${dest.name},travel,landmark`;
    dest.image = `https://source.unsplash.com/600x400/?${encodeURIComponent(searchKeyword)}`;
    
    // ضمان وجود مستوى الخطر
    if (dest.risk === undefined) dest.risk = 0;
});

// إدارة حالة النظام (Modern State Management)
let favorites = JSON.parse(localStorage.getItem('nourbest_favs')) || [];
let bookings = JSON.parse(localStorage.getItem('nourbest_bookings')) || [];
let nourCoinBalance = parseFloat(localStorage.getItem('nour_coin_balance')) || 2500.00; // رصيد أولي كافٍ للتجربة
let currentSelection = null;
let currentStep = 1;
let bookingData = { flight: 0, hotel: 0, car: 0, total: 0 };
/* ==================== محرك العرض العصري (The Modern Rendering Engine) ==================== */

// 1. دالة عرض الوجهات بنمط البطاقات الفاخرة
function renderDestinations(list) {
    const grid = document.querySelector('.trips-grid');
    if (!grid) return;
    
    grid.innerHTML = ""; // تنظيف الشبكة

    list.forEach(dest => {
        const isFav = favorites.includes(dest.id);
        const riskClass = dest.risk === 2 ? 'emergency' : (dest.risk === 1 ? 'warning' : 'safe');
        
        const card = `
            <div class="trip-card" data-id="${dest.id}">
                ${dest.price > 4000 ? '<div class="hot-deal-tag">VIP CHOICE</div>' : ''}
                
                <div class="fav-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite('${dest.id}')">
                    <i class="fa-${isFav ? 'solid' : 'regular'} fa-heart"></i>
                </div>
                
                <div style="height: 200px; overflow:hidden; border-radius: 20px; margin-bottom: 15px;">
                    <div style="height: 100%; width: 100%; background: url('${dest.image}') center/cover; transition: 0.5s transform;" class="card-img-zoom"></div>
                </div>
                
                <div class="card-header">
                    <span class="card-badge">${dest.type}</span>
                    <span class="card-price">${dest.price.toLocaleString()} NC</span>
                </div>
                
                <h3 class="card-title">${dest.name}</h3>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 15px; line-height: 1.6;">${dest.desc}</p>
                
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <div style="color: var(--accent-gold); font-weight: 800; font-size: 0.9rem;">
                        <i class="fas fa-star"></i> ${dest.rating}
                    </div>
                    <div class="widget ${riskClass}" style="padding: 4px 10px; font-size: 0.7rem; font-weight: 700;">
                        <i class="fas fa-shield-halved"></i> مستوى الأمان: ${dest.risk === 0 ? 'مرتفع' : 'متوسط'}
                    </div>
                </div>
                
                <button class="btn-select" onclick="startBooking('${dest.id}')">
                    <i class="fas fa-paper-plane"></i> حجز الرحلة الآن
                </button>
            </div>
        `;
        grid.innerHTML += card;
    });
}

// 2. تحديث واجهة الرصيد والمزامنة مع المحفظة
function updateBalanceUI() {
    const balances = document.querySelectorAll('.vault-balance, #nour-balance');
    balances.forEach(el => {
        el.innerText = nourCoinBalance.toFixed(2) + " NC";
    });
    localStorage.setItem('nour_coin_balance', nourCoinBalance);
}

// 3. محرك الإقلاع (System Boot Sequence) - النسخة العصرية
window.onload = () => {
    // تحديث البيانات الأولية خلف الكواليس
    renderDestinations(destinations);
    updateBalanceUI();
    if (typeof updateClock === "function") updateClock();

    // إخفاء شاشة "إقلاع الطائرة" (Splash Screen)
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        if (splash) {
            splash.style.opacity = '0';
            splash.style.transform = 'scale(1.1)'; // تأثير تمدد عند الدخول
            
            setTimeout(() => {
                splash.style.display = 'none';
                addLog("NourBest Travel: تم تأكيد إقلاع النظام بنجاح.");
            }, 1000);
        }
    }, 2200); // 2.2 ثانية لتوافق أنيميشن الطائرة
};
/* ==================== نظام التفاعل والبحث الذكي (Smart Interaction) ==================== */

// 1. إضافة/حذف من المفضلة مع تأثيرات صوتية
function toggleFavorite(id) {
    playSystemSound('hover'); // تأثير صوتي ناعم
    const index = favorites.indexOf(id);
    
    if (index > -1) {
        favorites.splice(index, 1);
        showToast("تمت إزالة الوجهة من رحلاتك المفضلة", "info");
        addLog(`Fav System: تم حذف الوجهة [${id}] من القائمة.`);
    } else {
        favorites.push(id);
        showToast("تمت إضافة الوجهة إلى قائمة رحلاتك", "success");
        playSystemSound('success'); // صوت نجاح عند الإضافة
        addLog(`Fav System: تم حفظ الوجهة [${id}] بنجاح.`);
    }
    
    localStorage.setItem('nourbest_favs', JSON.stringify(favorites));
    renderDestinations(destinations); // تحديث الواجهة فوراً
}

// 2. محرك البحث اللحظي المطور
function searchDestinations() {
    const searchInput = document.querySelector('.search-input');
    const query = searchInput.value.trim().toLowerCase();
    const suggestions = document.querySelector('.suggestions-box');
    
    // تصفية الوجهات بناءً على الاسم، النوع، أو الوصف
    const filtered = destinations.filter(dest => 
        dest.name.toLowerCase().includes(query) || 
        dest.type.toLowerCase().includes(query) ||
        dest.desc.toLowerCase().includes(query)
    );

    renderDestinations(filtered);

    // إدارة صندوق الاقتراحات الذكي
    if (query.length > 0 && filtered.length > 0) {
        suggestions.style.display = 'block';
        suggestions.innerHTML = filtered.slice(0, 4).map(f => `
            <div class="suggestion-item" onclick="quickSelect('${f.name}')">
                <div>
                    <i class="fas fa-location-dot" style="color: var(--primary-blue); margin-left: 10px;"></i>
                    <span>${f.name}</span>
                </div>
                <small>${f.type}</small>
            </div>
        `).join('');
    } else {
        suggestions.style.display = 'none';
    }
    
    if (query.length > 0) addLog(`Search Engine: جاري البحث عن "${query}"...`);
}

// 3. نظام التصفية الاحترافي (Filters)
function filterCategory(cat) {
    playSystemSound('click');
    let result = [];
    let logMsg = "";

    switch(cat) {
        case 'all':
            result = destinations;
            logMsg = "تم عرض جميع الوجهات.";
            break;
        case 'local':
            result = destinations.filter(d => d.category === 'local');
            logMsg = "تم تفعيل فلتر: الوجهات المحلية (المملكة).";
            break;
        case 'global':
            result = destinations.filter(d => d.category === 'global');
            logMsg = "تم تفعيل فلتر: الوجهات العالمية.";
            break;
        case 'cheap':
            result = destinations.filter(d => d.price < 1500); // رفع الحد ليتناسب مع الرصيد الجديد
            logMsg = "تم تفعيل فلتر: الرحلات الاقتصادية.";
            break;
    }
    
    renderDestinations(result);
    addLog(`Filter System: ${logMsg}`);
    
    // إغلاق السايدبار في الجوال بتأثير انسيابي
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    if (sidebar) sidebar.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
}

// 4. دالة الاختيار السريع والإغلاق
function quickSelect(name) {
    const searchInput = document.querySelector('.search-input');
    const suggestions = document.querySelector('.suggestions-box');
    
    searchInput.value = name;
    suggestions.style.display = 'none';
    playSystemSound('click');
    searchDestinations();
}
/* ==================== محرك الحجز الذكي (Ultimate Booking Engine v2) ==================== */

// 1. بدء عملية الحجز وتجهيز البيانات الأساسية
function startBooking(id) {
    playSystemSound('click');
    const dest = destinations.find(d => d.id === id);
    if (!dest) return;

    currentSelection = dest;
    // تجهيز بيانات الحجز: السعر الأساسي للوجهة + الخيارات الإضافية
    bookingData = { 
        basePrice: dest.price,
        flight: 0, 
        hotel: 0, 
        car: 0, 
        total: dest.price,
        flightLabel: "الاقتصادية",
        hotelLabel: "بدون إقامة",
        carLabel: "بدون سيارة"
    };
    
    currentStep = 1;
    document.querySelector('.modal-overlay').classList.add('active');
    addLog(`Booking: بدأت عملية الحجز لوجهة [${dest.name}].`);
    renderBookingStep();
}

// 2. محرك رسم خطوات الحجز (Smart Step Renderer)
function renderBookingStep() {
    const modalBox = document.querySelector('.modal-box');
    const steps = [1, 2, 3, 4]; // 4 خطوات: طيران، سكن، مواصلات، ملخص
    
    let content = `
        <h2 class="brand-title" style="color: var(--primary-blue); font-size: 1.4rem;">رحلتك إلى ${currentSelection.name}</h2>
        <div class="journey-timeline">
            ${steps.map(s => `
                <div class="timeline-step ${s <= currentStep ? 'active' : ''}">
                    ${s < currentStep ? '<i class="fas fa-check"></i>' : s}
                </div>
            `).join('<div class="timeline-line"></div>')}
        </div>
    `;

    // تبديل المحتوى بناءً على الخطوة الحالية
    if (currentStep === 1) {
        content += `
            <p style="font-weight:700; color:var(--text-muted);">الخطوة 1: اختر درجة السفر</p>
            <div class="step-options">
                <button class="opt-btn" onclick="applyOption('flight', 0, 'الاقتصادية')">
                    <span>✈️ الدرجة الاقتصادية</span> <span>+0 NC</span>
                </button>
                <button class="opt-btn" onclick="applyOption('flight', 850, 'الأعمال')">
                    <span>💼 درجة الأعمال</span> <span>+850 NC</span>
                </button>
                <button class="opt-btn" onclick="applyOption('flight', 1500, 'الدرجة الأولى')">
                    <span>👑 الدرجة الأولى</span> <span>+1500 NC</span>
                </button>
            </div>`;
    } else if (currentStep === 2) {
        content += `
            <p style="font-weight:700; color:var(--text-muted);">الخطوة 2: مكان الإقامة</p>
            <div class="step-options">
                <button class="opt-btn" onclick="applyOption('hotel', 0, 'بدون إقامة')">
                    <span>🏠 إقامة خاصة</span> <span>+0 NC</span>
                </button>
                <button class="opt-btn" onclick="applyOption('hotel', 500, 'فندق 4 نجوم')">
                    <span>🏨 فندق 4 نجوم</span> <span>+500 NC</span>
                </button>
                <button class="opt-btn" onclick="applyOption('hotel', 1200, 'منتجع VIP')">
                    <span>🌟 منتجع نيون VIP</span> <span>+1200 NC</span>
                </button>
            </div>`;
    } else if (currentStep === 3) {
        content += `
            <p style="font-weight:700; color:var(--text-muted);">الخطوة 3: وسيلة التنقل</p>
            <div class="step-options">
                <button class="opt-btn" onclick="applyOption('car', 0, 'بدون سيارة')">
                    <span>🚶 لا أحتاج سيارة</span> <span>+0 NC</span>
                </button>
                <button class="opt-btn" onclick="applyOption('car', 250, 'سيارة اقتصادية')">
                    <span>🚗 سيارة اقتصادية</span> <span>+250 NC</span>
                </button>
                <button class="opt-btn" onclick="applyOption('car', 700, 'سيارة رياضية')">
                    <span>🏎️ سيارة رياضية</span> <span>+700 NC</span>
                </button>
            </div>`;
    } else if (currentStep === 4) {
        const finalTotal = bookingData.basePrice + bookingData.flight + bookingData.hotel + bookingData.car;
        content += `
            <div class="summary-box">
                <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                    <span>سعر الوجهة الأساسي:</span> <span>${bookingData.basePrice} NC</span>
                </div>
                <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                    <span>درجة السفر (${bookingData.flightLabel}):</span> <span>+${bookingData.flight} NC</span>
                </div>
                <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                    <span>السكن (${bookingData.hotelLabel}):</span> <span>+${bookingData.hotel} NC</span>
                </div>
                <div style="display:flex; justify-content:space-between; margin-bottom:20px;">
                    <span>المواصلات (${bookingData.carLabel}):</span> <span>+${bookingData.car} NC</span>
                </div>
                <div class="digital-ticket">
                    <div class="qr-placeholder"><i class="fas fa-qrcode"></i></div>
                    <div style="text-align: right;">
                        <div style="font-size: 0.7rem; color: var(--primary-blue); font-weight:800;">رقم الحجز: #NB${Math.floor(Math.random()*90000)}</div>
                        <div style="font-size: 1.2rem; font-weight: 900; color: var(--status-success);">الإجمالي: ${finalTotal} NC</div>
                    </div>
                </div>
            </div>
            <button class="btn-confirm" style="width:100%; margin-top:20px;" onclick="completeBooking(${finalTotal})">تأكيد الحجز والدفع النهائي</button>`;
    }

    modalBox.innerHTML = content + `<button class="btn-cancel" style="margin-top:15px; width:100%;" onclick="closeModal()">إلغاء العملية</button>`;
}

// 3. دالة تطبيق الخيارات والانتقال
function applyOption(type, price, label) {
    playSystemSound('hover');
    bookingData[type] = price;
    bookingData[type + 'Label'] = label;
    addLog(`Booking: تم اختيار ${label} في خطوة الـ ${type}.`);
    currentStep++;
    renderBookingStep();
}

// 4. إكمال الحجز النهائي والمزامنة
function completeBooking(finalTotal) {
    if (nourCoinBalance >= finalTotal) {
        nourCoinBalance -= finalTotal;
        
        // إنشاء سجل الحجز
        const newBooking = {
            id: "NB-" + Math.floor(Math.random() * 90000),
            city: currentSelection.name,
            total: finalTotal,
            date: new Date().toLocaleDateString('ar-SA')
        };
        
        bookings.push(newBooking);
        localStorage.setItem('nourbest_bookings', JSON.stringify(bookings));
        
        updateBalanceUI();
        playSystemSound('success');
        showToast("تم تأكيد حجزك بنجاح! رحلة سعيدة.", "success");
        closeModal();
        if (typeof renderBookings === "function") renderBookings();
        addLog(`Success: تم دفع ${finalTotal} NC لحجز رحلة ${currentSelection.name}.`);
    } else {
        playSystemSound('error');
        showToast("عذراً، رصيدك الحالي غير كافٍ لإتمام الحجز.", "error");
        addLog(`Error: فشلت عملية الحجز بسبب نقص الرصيد.`);
    }
}

function closeModal() {
    document.querySelector('.modal-overlay').classList.remove('active');
}

// 5. دالة السجلات الذكية (Terminal Logs)
function addLog(msg) {
    const terminal = document.querySelector('.terminal-window');
    if (terminal) {
        const time = new Date().toLocaleTimeString('ar-SA', {hour: '2-digit', minute:'2-digit'});
        terminal.innerHTML += `<div style="margin-bottom:5px; border-bottom:1px solid rgba(255,255,255,0.02)">> [${time}] ${msg}</div>`;
        terminal.scrollTop = terminal.scrollHeight;
    }
}

/* ==================== المحرك البصري المطور (The Sky Matrix & UI Core) ==================== */

// 1. محرك الماتريكس السماوي (Sky Matrix Rain) - تم تحديثه لنمط السفر
const canvas = document.getElementById('matrix-bg');
const ctx = canvas ? canvas.getContext('2d') : null;
const fontSize = 16;
let columns, rainDrops;

// الحروف اليابانية مع أرقام ورموز السفر
const alphabet = '✈️🌍STAYVACATION0123456789NOURBEST';

function initMatrix() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = canvas.width / fontSize;
    rainDrops = Array(Math.floor(columns)).fill(1);
}

const drawMatrix = () => {
    if (!ctx) return;
    
    // خلفية فاتحة جداً لراحة العين (تأثير التلاشي)
    ctx.fillStyle = 'rgba(244, 247, 254, 0.1)'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // أزرق سماوي ناعم للرموز المتساقطة
    ctx.fillStyle = 'rgba(0, 82, 212, 0.15)'; 
    ctx.font = fontSize + 'px monospace';

    for(let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
        
        // إعادة التعيين العشوائي لخلق حركة انسيابية
        if(rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
};

// تشغيل الماتريكس وتحديث الحجم تلقائياً
if (canvas) {
    initMatrix();
    setInterval(drawMatrix, 50); // إبطاء الحركة قليلاً لتكون أكثر راحة
    window.addEventListener('resize', initMatrix);
}

// 2. محرك التحكم في القائمة الجانبية (Sidebar Master)
function toggleSidebar() {
    playSystemSound('click'); 
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    const wrapper = document.querySelector('.main-wrapper');

    if (sidebar && overlay) {
        const isActive = sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('sidebar-open');
        
        // إزاحة ذكية للمحتوى تعطي شعوراً بالعمق (Parallax Effect)
        if(window.innerWidth > 1100 && wrapper) {
            wrapper.style.transform = isActive ? "translateX(-20px)" : "translateX(0)";
        }
        
        addLog(isActive ? "UI Master: تم فتح لوحة التحكم الجانبية." : "UI Master: تم إغلاق لوحة التحكم.");
    }
}

// 3. محرك التمرير الذكي (Smooth Scroll Engine)
window.addEventListener('scroll', () => {
    const topBtn = document.querySelector('.back-to-top'); // استخدام الكلاس الجديد
    if (topBtn) {
        // إظهار الزر بنعومة عند النزول أكثر من 500 بكسل
        if (window.scrollY > 500) {
            topBtn.style.display = "flex";
            setTimeout(() => topBtn.style.opacity = "1", 10);
        } else {
            topBtn.style.opacity = "0";
            setTimeout(() => topBtn.style.display = "none", 400);
        }
    }
});

function scrollToTop() {
    playSystemSound('hover');
    window.scrollTo({top: 0, behavior: 'smooth'});
}
/* ==================== محرك الإقلاع والتشغيل الذكي (System Boot Sequence) ==================== */

window.onload = () => {
    // 1. تشغيل المحرك البصري للماتريكس السماوي
    if (typeof initMatrix === "function") initMatrix();
    
    // 2. تجهيز البيانات خلف الكواليس (لضمان سرعة الظهور)
    renderDestinations(destinations);
    updateBalanceUI();
    if (typeof renderBookings === "function") renderBookings();

    // 3. تسلسل رسائل "برج المراقبة" عند التشغيل
    const hours = new Date().getHours();
    const greeting = hours < 12 ? "صباح الخير أيها القائد" : "طاب مساؤك أيها القائد";

    const bootMsgs = [
        "System: Initializing Global Flight Grid...",
        "Network: Connecting to 100 Destination Nodes...",
        "Vault: Nour Coin Balance Secured.",
        "Security: System Encryption [ACTIVE].",
        `Welcome: ${greeting}. جاري تجهيز قمرة القيادة...`
    ];
    
    let i = 0;
    const bootInterval = setInterval(() => {
        if (i < bootMsgs.length) {
            addLog(bootMsgs[i++]);
            playSystemSound('hover'); // صوت "تك" خفيف مع كل رسالة
        } else {
            clearInterval(bootInterval);
        }
    }, 450); // سرعة تتابع الرسائل

    // 4. محرك إنهاء الإقلاع (إخفاء شاشة الـ Splash)
    setTimeout(() => {
        // نبحث عن الشاشة بالاسم الجديد أو القديم لضمان عدم حدوث خطأ
        const splash = document.getElementById('splash-screen') || document.getElementById('loader-screen');
        
        if (splash) {
            playSystemSound('success'); // صوت "تنبيه" نجاح الإقلاع
            
            // إضافة تأثيرات بصرية عند الخروج
            splash.style.transition = "all 1s cubic-bezier(0.65, 0, 0.35, 1)";
            splash.style.opacity = '0';
            splash.style.transform = 'scale(1.1) perspective(1000px) rotateX(5deg)';
            
            setTimeout(() => {
                splash.style.display = 'none';
                addLog(`[READY] NourBest OS: Flight Confirmed. Enjoy your trip.`);
            }, 1000);
        }
    }, 2800); // 2.8 ثانية هي المدة المثالية لتزامن الطائرة مع الرسائل
};
/* ==================== نظام البحث والتصفية الذكي (Smart Search & Filter) ==================== */

// 1. محرك البحث اللحظي مع اقتراحات بصرية
function searchDestinations() {
    const searchInput = document.querySelector('.search-input');
    const query = searchInput.value.trim().toLowerCase();
    const suggestionsBox = document.querySelector('.suggestions-box');
    
    // إذا كان الحقل فارغاً، نعرض كل الوجهات ونخفي الاقتراحات
    if (query.length < 1) {
        if (suggestionsBox) suggestionsBox.style.display = 'none';
        renderDestinations(destinations);
        return;
    }

    // تصفية ذكية تشمل الاسم، النوع، والوصف
    const filtered = destinations.filter(d => 
        d.name.toLowerCase().includes(query) || 
        d.type.toLowerCase().includes(query) ||
        d.desc.toLowerCase().includes(query)
    );

    renderDestinations(filtered);
    addLog(`البحث: تم العثور على ${filtered.length} وجهة لـ "${query}"`);

    // تحديث صندوق الاقتراحات بنمط الـ Premium
    if (suggestionsBox && filtered.length > 0) {
        suggestionsBox.style.display = 'block';
        suggestionsBox.innerHTML = filtered.slice(0, 5).map(d => `
            <div class="suggestion-item" onclick="quickSelect('${d.name}')">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <i class="fas fa-map-marker-alt" style="color: var(--primary-blue);"></i>
                    <span>${d.name}</span>
                </div>
                <small style="background: #eef2ff; color: var(--primary-blue); padding: 2px 8px; border-radius: 6px; font-size: 0.7rem;">
                    ${d.type}
                </small>
            </div>
        `).join('');
    } else {
        if (suggestionsBox) suggestionsBox.style.display = 'none';
    }
}

// 2. دالة الاختيار السريع والإغلاق
function quickSelect(name) {
    playSystemSound('click');
    const input = document.querySelector('.search-input');
    const box = document.querySelector('.suggestions-box');
    
    if (input) input.value = name;
    if (box) box.style.display = 'none';
    
    searchDestinations(); // لتحديث الشبكة بالوجهة المختارة فقط
    addLog(`نظام البحث: تم اختيار [${name}] بسرعة.`);
}

// 3. محرك التصفية المطور (Advanced Filtering)
function filterCategory(cat) {
    playSystemSound('hover');
    let filtered;
    let categoryName = "";

    // منطق التصفية بناءً على التصنيف الموحد
    if (cat === 'all') {
        filtered = destinations;
        categoryName = "كل الوجهات";
    } else {
        filtered = destinations.filter(d => d.category === cat);
        categoryName = cat === 'local' ? "الوجهات المحلية" : "الوجهات العالمية";
    }
    
    renderDestinations(filtered);
    addLog(`الفلاتر: تم عرض ${categoryName} (${filtered.length} وجهة).`);

    // إغلاق السايدبار تلقائياً في الجوال بعد اختيار التصنيف
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (sidebar && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.classList.remove('sidebar-open');
    }
}
/* ==================== محرك العمليات والمحفظة الرقمية ==================== */

// 1. تحديث واجهة المحفظة والرصيد (Global Sync)
function updateVaultUI() {
    // حفظ الرصيد لضمان عدم الضياع عند التحديث
    localStorage.setItem('nour_coin_balance', nourCoinBalance.toFixed(2));
    
    // تحديث كافة عناصر الرصيد في الصفحة (السايدبار، الهيدر، المحفظة)
    const balances = document.querySelectorAll('.vault-balance, #nour-balance, #vault-balance-display');
    balances.forEach(el => {
        el.innerText = nourCoinBalance.toFixed(2) + " NC";
    });

    if (typeof addLog === 'function') {
        addLog(`Vault: تم مزامنة المحفظة الرقمية. الرصيد الحالي: ${nourCoinBalance.toFixed(2)} NC`);
    }
}

// 2. نظام السجلات (Terminal Logs) المطور
function addLog(msg) {
    const terminal = document.getElementById('terminal') || document.querySelector('.terminal-window');
    if (terminal) {
        const time = new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        terminal.innerHTML += `<div style="margin-bottom: 4px; border-bottom: 1px solid rgba(255,255,255,0.02)">> [${time}] ${msg}</div>`;
        terminal.scrollTop = terminal.scrollHeight;
    }
}

// 3. تسلسل تشغيل الأنظمة عند الإقلاع
function initLogs() {
    const msgs = [
        "System: Initializing Premium Core...",
        "Network: Satellite Connection Established.",
        "Database: 100 Nodes Verified.",
        "Security: Encryption Protocols Active.",
        "Ready: Welcome back, Commander."
    ];
    let i = 0;
    const interval = setInterval(() => {
        if(i >= msgs.length) {
            clearInterval(interval);
        } else {
            addLog(msgs[i++]);
            if(typeof playSystemSound === 'function') playSystemSound('hover');
        }
    }, 500);
}

/* ==================== محرك الحجز المتسلسل (Multi-Step Booking) ==================== */

// 1. فتح نافذة الحجز وتجهيز البيانات
function openModal(id) {
    if(typeof playSystemSound === 'function') playSystemSound('click');
    const dest = destinations.find(d => d.id === id);
    if (!dest) return;

    currentSelection = dest;
    // تجهيز بيانات الحجز (السعر الأساسي للوجهة)
    bookingData = { 
        flight: dest.price, 
        hotel: 0, 
        car: 0, 
        total: dest.price,
        flightLabel: "الأساسية",
        hotelLabel: "لم يتم الاختيار",
        carLabel: "لم يتم الاختيار"
    };
    
    currentStep = 1; 
    renderStep();
    
    const modal = document.getElementById('booking-modal') || document.querySelector('.modal-overlay');
    if (modal) modal.classList.add('active');
}

// 2. إغلاق نافذة الحجز
function closeModal() {
    const modal = document.getElementById('booking-modal') || document.querySelector('.modal-overlay');
    if (modal) modal.classList.remove('active');
}

// 3. رسم خطوات الحجز بنمط عصري
function renderStep() {
    const desc = document.getElementById('modal-desc');
    const title = document.getElementById('modal-title');
    const steps = document.querySelectorAll('.timeline-step');
    const actionBtn = document.querySelector('.btn-confirm');

    // تحديث شريط التقدم العلوي
    
    steps.forEach((s, idx) => {
        s.classList.toggle('active', idx + 1 <= currentStep);
    });

    if (currentStep === 1) {
        title.innerText = `الخطوة 1: درجة السفر إلى ${currentSelection.name}`;
        desc.innerHTML = `
            <div class="step-options">
                <button class="opt-btn" onclick="selectOption('flight', 0, 'الاقتصادية')"><span>✈️ الدرجة الاقتصادية</span> <span>+0 NC</span></button>
                <button class="opt-btn" onclick="selectOption('flight', 550, 'درجة الأعمال')"><span>💼 درجة الأعمال</span> <span>+550 NC</span></button>
                <button class="opt-btn" onclick="selectOption('flight', 1200, 'الدرجة الأولى')"><span>👑 الدرجة الأولى</span> <span>+1200 NC</span></button>
            </div>`;
        if(actionBtn) actionBtn.style.display = "none"; 
    } else if (currentStep === 2) {
        title.innerText = `الخطوة 2: الإقامة في ${currentSelection.name}`;
        desc.innerHTML = `
            <div class="step-options">
                <button class="opt-btn" onclick="selectOption('hotel', 300, 'فندق 3 نجوم')"><span>🏨 فندق اقتصادي</span> <span>+300 NC</span></button>
                <button class="opt-btn" onclick="selectOption('hotel', 750, 'فندق 5 نجوم')"><span>⭐ فندق 5 نجوم</span> <span>+750 NC</span></button>
                <button class="opt-btn" onclick="selectOption('hotel', 0, 'بدون سكن')"><span>🏠 لدي سكن خاص</span> <span>+0 NC</span></button>
            </div>`;
    } else if (currentStep === 3) {
        title.innerText = `الخطوة 3: التنقل في ${currentSelection.name}`;
        desc.innerHTML = `
            <div class="step-options">
                <button class="opt-btn" onclick="selectOption('car', 150, 'سيارة اقتصادية')"><span>🚗 سيارة اقتصادية</span> <span>+150 NC</span></button>
                <button class="opt-btn" onclick="selectOption('car', 450, 'سيارة فارهة')"><span>🏎️ سيارة VIP</span> <span>+450 NC</span></button>
                <button class="opt-btn" onclick="selectOption('car', 0, 'بدون سيارة')"><span>🚶 لا أحتاج سيارة</span> <span>+0 NC</span></button>
            </div>`;
    } else {
        showFinalSummary();
    }
}

// 4. تطبيق الاختيارات والانتقال للخطوة التالية
function selectOption(type, price, label) {
    if(typeof playSystemSound === 'function') playSystemSound('hover');
    
    if (type === 'flight') {
        bookingData.flight += price;
        bookingData.flightLabel = label;
    } else {
        bookingData[type] = price;
        bookingData[type + 'Label'] = label;
    }
    
    addLog(`Booking: تم اختيار ${label}`);
    currentStep++;
    renderStep();
}

// 5. عرض ملخص الحجز بنمط تذكرة رقمية
function showFinalSummary() {
    const total = bookingData.flight + bookingData.hotel + bookingData.car;
    bookingData.total = total;
    const actionBtn = document.querySelector('.btn-confirm');
    
    document.getElementById('modal-title').innerText = "ملخص رحلتك";
    document.getElementById('modal-desc').innerHTML = `
        <div class="summary-box" style="background: #f8fafc; border-radius: 20px; padding: 20px; text-align: right;">
            <div style="display:flex; justify-content:space-between; margin-bottom:10px;"><span>✈️ تذكرة الطيران:</span> <span>${bookingData.flight} NC</span></div>
            <div style="display:flex; justify-content:space-between; margin-bottom:10px;"><span>🏨 الإقامة والفنادق:</span> <span>${bookingData.hotel} NC</span></div>
            <div style="display:flex; justify-content:space-between; margin-bottom:10px;"><span>🚗 خدمات التنقل:</span> <span>${bookingData.car} NC</span></div>
            <hr style="border:0.5px solid #e2e8f0; margin:15px 0;">
            <div style="display:flex; justify-content:space-between; color:var(--primary-blue); font-weight:900; font-size: 1.2rem;">
                <span>الإجمالي النهائي:</span> <span>${total} NC</span>
            </div>
        </div>`;
    
if(actionBtn) {
        actionBtn.style.display = "flex";
        actionBtn.style.gap = "12px";
        actionBtn.innerHTML = `
            <button onclick="finalConfirm()" style="flex:2; padding:15px; background:var(--primary-blue); color:white; border:none; border-radius:14px; font-weight:900; cursor:pointer; font-family:var(--font-main);">تأكيد والدفع</button>
            <button onclick="downloadTicket()" style="flex:1; padding:15px; background:var(--status-success); color:white; border:none; border-radius:14px; cursor:pointer; font-size:1.2rem;"><i class="fas fa-file-download"></i></button>
        `;
    }
}

// 6. التأكيد النهائي وخصم الرصيد
function finalConfirm() {
    const total = bookingData.total;
    
    if (nourCoinBalance >= total) {
        nourCoinBalance -= total;
        if(typeof playSystemSound === 'function') playSystemSound('success');
        closeModal();
        
        // تسجيل بيانات الحجز الجديد
        const newBooking = {
            id: "NB-" + Math.floor(Math.random() * 90000 + 10000),
            city: currentSelection.name,
            total: total,
            date: new Date().toLocaleDateString('ar-SA')
        };
        
        bookings.push(newBooking);
        localStorage.setItem('nourbest_bookings', JSON.stringify(bookings));
        
        // تحديث الواجهة
        updateVaultUI(); 
        if(typeof renderBookings === 'function') renderBookings();

        const msg = `برافو! تم حجز رحلتك إلى ${currentSelection.name}. رقم الحجز: ${newBooking.id}`;
        addLog(`Success: ${msg}`);
        
        if(typeof showToast === 'function') {
            showToast("تم تأكيد الحجز بنجاح!", "success");
        } else {
            alert(msg);
        }
    } else {
        if(typeof playSystemSound === 'function') playSystemSound('error');
        if(typeof showToast === 'function') {
            showToast("عذراً، الرصيد غير كافٍ!", "error");
        } else {
            alert("رصيد Nour Coin الخاص بك لا يكفي لهذه الرحلة.");
        }
    }
}

// 7. عرض قائمة الحجوزات في السايدبار
function renderBookings() {
    const list = document.getElementById('bookings-list') || document.getElementById('fav-list');
    if (!list) return;
    list.innerHTML = "";

    if (bookings.length === 0) {
        list.innerHTML = '<div style="text-align:center; color:#94a3b8; padding: 20px;">لا توجد حجوزات نشطة</div>';
        return;
    }

    bookings.forEach(b => {
        list.innerHTML += `
            <div class="booking-card" style="border-right: 4px solid var(--primary-blue);">
                <div class="booking-id" style="font-size: 0.6rem; color: #94a3b8;">رقم الحجز: ${b.id}</div>
                <div class="booking-city" style="font-weight: 800; color: var(--text-dark);">📍 ${b.city}</div>
                <div class="booking-footer" style="display: flex; justify-content: space-between; margin-top: 10px; font-size: 0.75rem;">
                    <span>📅 ${b.date}</span>
                    <span style="color:var(--status-success); font-weight: 800;">${b.total} NC</span>
                </div>
            </div>`;
    });
}
/* ==================== وظائف النظام الذكية (Premium OS Core) ==================== */

// 1. محرك الساعة العالمية والتقويم
function updateClock() {
    const clockEl = document.getElementById('universal-clock');
    const now = new Date();
    
    if (clockEl) {
        // عرض الوقت بنمط 12 ساعة مع الثواني
        clockEl.innerText = now.toLocaleTimeString('ar-SA', { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            hour12: true 
        });
    }
}
setInterval(updateClock, 1000);

// 2. محرك الطقس الديناميكي (تغيير الثيم بناءً على الجو)
async function updateWeather() {
    const weatherEl = document.getElementById('weather-widget');
    if (!weatherEl) return;

    const cities = ["الرياض", "لندن", "باريس", "طوكيو", "نيويورك"];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const temp = Math.floor(Math.random() * 35) + 5; // درجة حرارة بين 5 و 40
    
    // تحديث المحتوى البصري
    weatherEl.innerHTML = `
        <i class="fas fa-temperature-high" style="color: var(--primary-blue);"></i>
        <span>${temp}°C - ${randomCity}</span>
    `;

    // ذكاء النظام: تغيير ألوان الواجهة بناءً على حالة الطقس
    if (temp > 30) {
        // نمط الصيف: لمسات ذهبية دافئة
        document.documentElement.style.setProperty('--primary-blue', '#f59e0b');
        addLog(`Weather Engine: الجو حار في ${randomCity}، تم تحويل النظام للنمط الصيفي.`);
    } else if (temp < 15) {
        // نمط الشتاء: لمسات زرقاء سماوية باردة
        document.documentElement.style.setProperty('--primary-blue', '#0052D4');
        addLog(`Weather Engine: الأجواء باردة في ${randomCity}، تم تفعيل النمط الشتوي.`);
    }
}
// تحديث الطقس كل دقيقتين لضمان استقرار الأداء
setInterval(updateWeather, 120000);
updateWeather(); // تشغيل أولي

// 3. إدارة الطبقة الشفافة (Overlay Manager)
const sidebarOverlay = document.querySelector('.sidebar-overlay');
if (sidebarOverlay) {
    sidebarOverlay.onclick = () => {
        if (typeof toggleSidebar === "function") toggleSidebar();
    };
}

// 4. معالج تغيير حجم الشاشة (Responsive Handler)
window.onresize = () => {
    // إعادة تهيئة الماتريكس عند تغيير حجم النافذة لضمان عدم حدوث تشوه
    if (typeof initMatrix === "function") initMatrix();
    
    // إغلاق السايدبار تلقائياً إذا كبرت الشاشة فجأة (للديسكتوب)
    if (window.innerWidth > 1100) {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar && sidebar.classList.contains('active')) toggleSidebar();
    }
};
/* ==================== محرك استخراج التذكرة الرقمية ==================== */
function downloadTicket() {
    if (!currentSelection) return;
    
    const ticketID = "NB-" + Math.floor(Math.random() * 90000);
    const total = bookingData.total;
    
    const ticketContent = `
    ==========================================
              NOURBEST TRAVEL OS
    ==========================================
    رقم الحجز الرسمي: ${ticketID}
    الوجهة: ${currentSelection.name}
    التاريخ: ${new Date().toLocaleDateString('ar-SA')}
    ------------------------------------------
    تفاصيل الرحلة:
    - درجة السفر: ${bookingData.flightLabel}
    - نوع الإقامة: ${bookingData.hotelLabel}
    - وسيلة النقل: ${bookingData.carLabel}
    ------------------------------------------
    إجمالي المبلغ المدفوع: ${total} NC
    ==========================================
    نتمنى لكم رحلة سعيدة - طيران نور بيست
    ==========================================
    `;

    const element = document.createElement('a');
    const file = new Blob([ticketContent], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `Ticket_${currentSelection.name}.txt`;
    document.body.appendChild(element);
    element.click();
    addLog(`System: تم تصدير التذكرة الرقمية لرحلة [${currentSelection.name}].`);
}
/* ==================== نهاية كود NourBest Travel OS ==================== */