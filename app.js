/* ================= مصفوفة الوجهات العالمية (100 وجهة احترافية) ================= */
const destinations = [
    // --- مدن ومناطق المملكة العربية السعودية (35 وجهة) ---
    { id: "NB-01", name: "الرياض", price: 450, type: "عاصمة", risk: 0, desc: "برج المملكة، الدرعية التاريخية، وبوليفارد وورلد." },
    { id: "NB-02", name: "جدة", price: 400, type: "ساحلية", risk: 0, desc: "نافورة الملك فهد، جدة التاريخية (البلد)، والواجهة البحرية." },
    { id: "NB-03", name: "مكة المكرمة", price: 300, type: "دينية", risk: 0, desc: "المسجد الحرام، جبل النور، وبرج الساعة." },
    { id: "NB-04", name: "المدينة المنورة", price: 300, type: "دينية", risk: 0, desc: "المسجد النبوي الشريف، ومسجد قباء." },
    { id: "NB-05", name: "العلا", price: 1200, type: "تاريخية", risk: 0, desc: "مدائن صالح (الحجر)، صخرة الفيل، ومرايا." },
    { id: "NB-06", name: "أبها", price: 550, type: "جبلية", risk: 0, desc: "الجبل الأخضر، قرية الحبلة، ومنتزه السودة." },
    { id: "NB-07", name: "الدمام", price: 350, type: "ساحلية", risk: 0, desc: "جزيرة المرجان، وواجهة الدمام البحرية." },
    { id: "NB-08", name: "الخبر", price: 450, type: "ترفيهية", risk: 0, desc: "جسر الملك فهد، ومركز إثراء الثقافي." },
    { id: "NB-09", name: "تبوك", price: 500, type: "نيوم", risk: 0, desc: "جبال اللوز، قلعة تبوك، وبوابة نيوم المستقبلية." },
    { id: "NB-10", name: "الطائف", price: 400, type: "مصيف", risk: 0, desc: "الهدا، الشفا، وقصر شبرا التاريخي." },
    { id: "NB-11", name: "حائل", price: 450, type: "تراثية", risk: 0, desc: "قلعة أعيرف، وجبال أجا وسلمى." },
    { id: "NB-12", name: "نجران", price: 500, type: "تاريخية", risk: 0, desc: "الأخدود الأثري، وسد وادي نجران." },
    { id: "NB-13", name: "جازان", price: 550, type: "طبيعة", risk: 0, desc: "جزر فرسان، وجبال الفيفاء الساحرة." },
    { id: "NB-14", name: "الأحساء", price: 400, type: "واحة", risk: 0, desc: "جبل القارة، وسوق القيصرية، وأكبر واحة نخيل." },
    { id: "NB-15", name: "ينبع", price: 400, type: "صناعية", risk: 0, desc: "ينبع البحر، وينبع النخل، والأنشطة البحرية." },
    { id: "NB-16", name: "الجوف", price: 500, type: "زراعية", risk: 0, desc: "قلعة مارد، ومسجد عمر بن الخطاب." },
    { id: "NB-17", name: "عرعر", price: 600, type: "حدودية", risk: 0, desc: "بوابة الحدود الشمالية، ومنتزهات عرعر." },
    { id: "NB-18", name: "الباحة", price: 500, type: "طبيعة", risk: 0, desc: "قرية ذي عين الأثرية، وغابة رغدان." },
    { id: "NB-19", name: "بريدة", price: 350, type: "زراعية", risk: 0, desc: "سوق التمور العالمي، ومنتزه الملك خالد." },
    { id: "NB-20", name: "عنيزة", price: 350, type: "تراثية", risk: 0, desc: "بيت البسام التراثي، وميدان الساعة." },
    { id: "NB-21", name: "أملج", price: 800, type: "استجمام", risk: 0, desc: "مالديف السعودية، والشواطئ الفيروزية." },
    { id: "NB-22", name: "الجبيل", price: 450, type: "صناعية", risk: 0, desc: "شاطئ النخيل، ومدينة الجبيل الصناعية." },
    { id: "NB-23", name: "الخفجي", price: 550, type: "حدودية", risk: 0, desc: "كورنيش الخفجي، والحدود السعودية الكويتية." },
    { id: "NB-24", name: "حفر الباطن", price: 450, type: "تجارية", risk: 0, desc: "عاصمة الربيع، والأسواق الشعبية." },
    { id: "NB-25", name: "القريات", price: 650, type: "حدودية", risk: 0, desc: "منفذ الحديثة الدولي، وزراعة الزيتون." },
    { id: "NB-26", name: "الوجه", price: 700, type: "تاريخية", risk: 0, desc: "الميناء التاريخي، والبيوت الحجازية القديمة." },
    { id: "NB-27", name: "ضباء", price: 700, type: "بحرية", risk: 0, desc: "ميناء ضباء، ونافورة ضباء." },
    { id: "NB-28", name: "شرورة", price: 800, type: "صحراوية", risk: 0, desc: "عروس الربع الخالي." },
    { id: "NB-29", name: "بيشة", price: 500, type: "زراعية", risk: 0, desc: "سد وادي بيشة، ومزارع النخيل." },
    { id: "NB-30", name: "الدوادمي", price: 400, type: "نجدية", risk: 0, desc: "قصر الملك عبدالعزيز، وجبال ثهلان." },
    { id: "NB-31", name: "وادي الدواسر", price: 450, type: "زراعية", risk: 0, desc: "آثار قرية الفاو، والزراعة الصحراوية." },
    { id: "NB-32", name: "رفحاء", price: 600, type: "شمالية", risk: 0, desc: "درب زبيدة التاريخي." },
    { id: "NB-33", name: "طريف", price: 700, type: "صناعية", risk: 0, desc: "وعد الشمال، وأبرد مدن المملكة." },
    { id: "NB-34", name: "سكاكا", price: 500, type: "أثرية", risk: 0, desc: "أعمدة الرجاجيل، وقلعة زعبل." },
    { id: "NB-35", name: "القطيف", price: 400, type: "بحرية", risk: 0, desc: "قلعة تاروت، وسوق الخميس الشعبي." },

    // --- الوجهات العالمية (65 وجهة) ---
    { id: "NB-36", name: "دبي", price: 1500, type: "عالمية", risk: 0, desc: "برج خليفة، دبي مول، ونخلة الجميرا." },
    { id: "NB-37", name: "لندن", price: 3500, type: "عالمية", risk: 1, desc: "ساعة بيج بن، عين لندن، ومتحف الشمع." },
    { id: "NB-38", name: "باريس", price: 3800, type: "رومانسية", risk: 1, desc: "برج إيفل، متحف اللوفر، وشارع الشانزلزيه." },
    { id: "NB-39", name: "اسطنبول", price: 1800, type: "تاريخية", risk: 1, desc: "آيا صوفيا، الجامع الأزرق، ومضيق البوسفور." },
    { id: "NB-40", name: "نيويورك", price: 5500, type: "عالمية", risk: 2, desc: "تايمز سكوير، تمثال الحرية، وسنترال بارك." },
    { id: "NB-41", name: "طوكيو", price: 4800, type: "تقنية", risk: 0, desc: "تقاطع شيبويا، برج طوكيو، وجبل فوجي." },
    { id: "NB-42", name: "روما", price: 3200, type: "تاريخية", risk: 1, desc: "الكولوسيوم، نافورة تريفي، والفاتيكان." },
    { id: "NB-43", name: "القاهرة", price: 1200, type: "تاريخية", risk: 1, desc: "أهرامات الجيزة، المتحف المصري، وخان الخليلي." },
    { id: "NB-44", name: "كوالالمبور", price: 2500, type: "آسيوية", risk: 0, desc: "برجي بتروناس التوأم، وكهوف باتو." },
    { id: "NB-45", name: "بانكوك", price: 2200, type: "سياحية", risk: 1, desc: "القصر الكبير، والأسواق العائمة." },
    { id: "NB-46", name: "سنغافورة", price: 4000, type: "تقنية", risk: 0, desc: "مارينا باي ساندز، وحدائق الخليج." },
    { id: "NB-47", name: "مدريد", price: 3400, type: "رياضية", risk: 1, desc: "ملعب سانتياغو برنابيو، والقصر الملكي." },
    { id: "NB-48", name: "برشلونة", price: 3600, type: "سياحية", risk: 1, desc: "كنيسة ساغرادا فاميليا، وشارع الرامبلا." },
    { id: "NB-49", name: "فيينا", price: 3800, type: "ثقافية", risk: 0, desc: "دار الأوبرا، وقصر شونبرون." },
    { id: "NB-50", name: "جنيف", price: 4500, type: "طبيعة", risk: 0, desc: "بحيرة جنيف، ونافورة جيت دو." },
    { id: "NB-51", name: "زيورخ", price: 4700, type: "مالية", risk: 0, desc: "بحيرة زيورخ، وشارع باهنهوف شتراسه." },
    { id: "NB-52", name: "ميونيخ", price: 3500, type: "تقنية", risk: 0, desc: "ساحة مارينا، ومتحف بي إم دبليو." },
    { id: "NB-53", name: "أمستردام", price: 3300, type: "سياحية", risk: 1, desc: "القنوات المائية، ومتحف فان جوخ." },
    { id: "NB-54", name: "أثينا", price: 2800, type: "تاريخية", risk: 1, desc: "معبد الأكروبوليس، والبارثينون." },
    { id: "NB-55", name: "براغ", price: 2600, type: "تاريخية", risk: 1, desc: "جسر تشارلز، وقلعة براغ." },
    { id: "NB-56", name: "سول", price: 4200, type: "تقنية", risk: 0, desc: "برج إن سيول، وقصر جيونج بوك جونج." },
    { id: "NB-57", name: "هونج كونج", price: 4500, type: "عالمية", risk: 1, desc: "قمة فيكتوريا، وديزني لاند." },
    { id: "NB-58", name: "سيدني", price: 6500, type: "عالمية", risk: 0, desc: "دار الأوبرا، وجسر هاربور." },
    { id: "NB-59", name: "المالديف", price: 7000, type: "استجمام", risk: 0, desc: "المنتجعات المائية المرجانية." },
    { id: "NB-60", name: "بالي", price: 3500, type: "طبيعة", risk: 1, desc: "شواطئ كوتا، ومعابد أوبود." },
    { id: "NB-61", name: "شرم الشيخ", price: 1500, type: "بحرية", risk: 1, desc: "خليج نعمة، ومحمية رأس محمد." },
    { id: "NB-62", name: "عمان", price: 1100, type: "تاريخية", risk: 0, desc: "المدرج الروماني، وجبل القلعة." },
    { id: "NB-63", name: "بيروت", price: 1400, type: "ثقافية", risk: 2, desc: "صخرة الروشة، ووسط بيروت." },
    { id: "NB-64", name: "الدار البيضاء", price: 2500, type: "سياحية", risk: 1, desc: "مسجد الحسن الثاني، والمدينة القديمة." },
    { id: "NB-65", name: "مراكش", price: 2700, type: "تراثية", risk: 1, desc: "ساحة جامع الفنا، وقصر الباهية." },
    { id: "NB-66", name: "تونس", price: 1800, type: "تاريخية", risk: 1, desc: "قرطاج، وسيدي بوسعيد." },
    { id: "NB-67", name: "الدوحة", price: 1400, type: "عالمية", risk: 0, desc: "سوق واقف، وجزيرة اللؤلؤة." },
    { id: "NB-68", name: "الكويت", price: 1300, type: "عالمية", risk: 0, desc: "أبراج الكويت، وسوق المباركية." },
    { id: "NB-69", name: "المنامة", price: 1100, type: "عالمية", risk: 0, desc: "باب البحرين، ومتحف البحرين الوطني." },
    { id: "NB-70", name: "مسقط", price: 1200, type: "طبيعة", risk: 0, desc: "جامع السلطان قابوس، ومطرح." },
    { id: "NB-71", name: "أبوظبي", price: 1400, type: "عالمية", risk: 0, desc: "جامع الشيخ زايد، وعالم فيراري." },
    { id: "NB-72", name: "لوس أنجلوس", price: 5800, type: "ترفيه", risk: 2, desc: "هوليوود، وسانتا مونيكا." },
    { id: "NB-73", name: "ميامي", price: 6000, type: "بحرية", risk: 2, desc: "شاطئ ساوث بيتش، وفنون الميناء." },
    { id: "NB-74", name: "أورلاندو", price: 6200, type: "ترفيه", risk: 1, desc: "ديزني وورلد، ويونيفرسال ستوديوز." },
    { id: "NB-75", name: "تورونتو", price: 5200, type: "عالمية", risk: 0, desc: "برج سي إن، وجزر تورونتو." },
    { id: "NB-76", name: "كيب تاون", price: 4500, type: "طبيعة", risk: 2, desc: "جبل الطاولة، وجزيرة روبن." },
    { id: "NB-77", name: "موسكو", price: 3500, type: "تاريخية", risk: 2, desc: "الساحة الحمراء، والكرملين." },
    { id: "NB-78", name: "ستوكهولم", price: 4200, type: "سياحية", risk: 0, desc: "المدينة القديمة، ومتحف فاسا." },
    { id: "NB-79", name: "أوسلو", price: 4800, type: "طبيعة", risk: 0, desc: "متحف سفن الفايكنج، والفيوردات." },
    { id: "NB-80", name: "كوبنهاجن", price: 4400, type: "سياحية", risk: 0, desc: "تمثال الحورية الصغيرة، وتيفولي." },
    { id: "NB-81", name: "لشبونة", price: 3200, type: "سياحية", risk: 1, desc: "برج بيليم، وقلعة سان جورج." },
    { id: "NB-82", name: "نيس", price: 3800, type: "ساحلية", risk: 1, desc: "بروميناد دي أنجليه، والبلدة القديمة." },
    { id: "NB-83", name: "كان", price: 4200, type: "سينما", risk: 1, desc: "قصر المهرجانات، وشاطئ الكروازيت." },
    { id: "NB-84", name: "فينيسيا", price: 3500, type: "رومانسية", risk: 1, desc: "ساحة سان ماركو، والجندول." },
    { id: "NB-85", name: "ميلانو", price: 3400, type: "موضة", risk: 1, desc: "كاتدرائية الدومو، وغاليريا فيتوريو." },
    { id: "NB-86", name: "فلورنسا", price: 3300, type: "فنون", risk: 1, desc: "جسر بونتي فيكيو، ومعرض يوفيزي." },
    { id: "NB-87", name: "ميونيخ", price: 3600, type: "تقنية", risk: 0, desc: "ساحة مارينا، وملاعب الأليانز أرينا." },
    { id: "NB-88", name: "فرانكفورت", price: 3400, type: "مالية", risk: 1, desc: "رومربرغ، وناطحات سحاب البنوك." },
    { id: "NB-89", name: "باكو", price: 2400, type: "سياحية", risk: 1, desc: "أبراج اللهب، والمدينة القديمة." },
    { id: "NB-90", name: "تبليسي", price: 2200, type: "طبيعة", risk: 1, desc: "جسر السلام، وقلعة ناريكالا." },
    { id: "NB-91", name: "يريفان", price: 2100, type: "تاريخية", risk: 1, desc: "ساحة الجمهورية، والشلال." },
    { id: "NB-92", name: "سراييفو", price: 2300, type: "طبيعة", risk: 1, desc: "سوق باششارشيا، والجسر اللاتيني." },
    { id: "NB-93", name: "أوزبكستان", price: 2800, type: "تاريخية", risk: 1, desc: "ساحة ريجستان في سمرقند." },
    { id: "NB-94", name: "مانيلا", price: 2900, type: "آسيوية", risk: 2, desc: "إنتراموروس، وخليج مانيلا." },
    { id: "NB-95", name: "جاكرتا", price: 3100, type: "آسيوية", risk: 2, desc: "النصب الوطني، والمدينة القديمة." },
    { id: "NB-96", name: "سيشل", price: 7500, type: "استجمام", risk: 0, desc: "شاطئ أنس لازيو، والمنتجعات الفاخرة." },
    { id: "NB-97", name: "موريشيوس", price: 6800, type: "طبيعة", risk: 0, desc: "الأرض الملونة، والمنتجعات البحرية." },
    { id: "NB-98", name: "فوكيت", price: 2800, type: "بحرية", risk: 1, desc: "شاطئ باتونج، وجزيرة جيمس بوند." },
    { id: "NB-99", name: "نيوم", price: 9000, type: "مستقبلية", risk: 0, desc: "مشروع ذا لاين، وسندالة، وتروجينا." },
    { id: "NB-100", name: "القدس", price: 1500, type: "دينية", risk: 2, desc: "المسجد الأقصى المبارك، وقبة الصخرة." }
];
/* ==================== محرك تطوير البيانات والمتغيرات الأساسية ==================== */
destinations.forEach((dest, index) => {
    // إضافة التصنيفات والتقييمات والصور الذكية آلياً لـ 100 وجهة
    dest.category = (index < 35) ? "local" : "global";
    dest.rating = (4.2 + Math.random() * 0.8).toFixed(1);
    const searchKeyword = index < 35 ? `${dest.name},Saudi Arabia` : dest.name;
    dest.image = `https://loremflickr.com/600/400/${encodeURIComponent(searchKeyword)}?lock=${index}`;
    if (dest.risk === undefined) dest.risk = 0;
});

// إدارة حالة النظام (State Management) - نسخة موحدة ومحمية
let favorites = JSON.parse(localStorage.getItem('nourbest_favs')) || [];
let bookings = JSON.parse(localStorage.getItem('nourbest_bookings')) || [];
let nourCoinBalance = parseFloat(localStorage.getItem('nour_coin_balance')) || 500.00;
let currentSelection = null; // جعلناه Null بدلاً من نص فارغ لضمان دقة محرك الحجز
let currentStep = 1;
let bookingData = { flight: 0, hotel: 0, car: 0, total: 0 };
/* ==================== محرك العرض الأساسي (Rendering Engine) ==================== */

// 1. دالة عرض الوجهات في الشبكة (Grid)
function renderDestinations(list) {
    const grid = document.querySelector('.trips-grid');
    if (!grid) return;
    
    grid.innerHTML = ""; // تنظيف الشبكة قبل العرض

    list.forEach(dest => {
        const isFav = favorites.includes(dest.id);
        const riskClass = dest.risk === 2 ? 'emergency' : (dest.risk === 1 ? 'warning' : 'safe');
        
        const card = `
            <div class="trip-card" data-id="${dest.id}">
                ${dest.price > 4000 ? '<div class="hot-deal-tag">VIP Choice</div>' : ''}
                <div class="fav-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite('${dest.id}')">
                    <i class="fa-${isFav ? 'solid' : 'regular'} fa-heart"></i>
                </div>
                
                <div style="height: 180px; background: url('${dest.image}') center/cover; border-radius: 15px; margin-bottom: 15px;"></div>
                
                <div class="card-header">
                    <span class="card-badge">${dest.type}</span>
                    <span class="card-price">${dest.price} NC</span>
                </div>
                
                <h3 class="card-title">${dest.name}</h3>
                <p style="font-size: 0.8rem; color: #888; margin-bottom: 15px;">${dest.desc}</p>
                
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <div style="color: var(--neon-gold); font-size: 0.85rem;">
                        <i class="fas fa-star"></i> ${dest.rating}
                    </div>
                    <div class="widget ${riskClass}" style="padding: 2px 8px; font-size: 0.6rem;">
                        <i class="fas fa-shield-halved"></i> Risk Lvl: ${dest.risk}
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

// 2. تحديث واجهة الرصيد (Nour Coin)
function updateBalanceUI() {
    const balanceElements = document.querySelectorAll('.vault-balance');
    balanceElements.forEach(el => {
        el.innerText = nourCoinBalance.toFixed(2) + " NC";
    });
    localStorage.setItem('nour_coin_balance', nourCoinBalance);
}

// 3. تشغيل النظام عند التحميل
window.onload = () => {
    renderDestinations(destinations);
    updateBalanceUI();
    
    // إخفاء شاشة التحميل بعد ثانية واحدة
    setTimeout(() => {
        const loader = document.getElementById('loader-screen');
        if (loader) loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 1000);
    }, 1500);
};
/* ==================== نظام التفاعل والبحث (Interaction & Search) ==================== */

// 1. إضافة/حذف من المفضلة
function toggleFavorite(id) {
    const index = favorites.indexOf(id);
    if (index > -1) {
        favorites.splice(index, 1); // حذف إذا كانت موجودة
        showToast("تم الحذف من المفضلة", "info");
    } else {
        favorites.push(id); // إضافة إذا لم تكن موجودة
        showToast("تمت الإضافة للمفضلة", "success");
    }
    
    localStorage.setItem('nourbest_favs', JSON.stringify(favorites));
    renderDestinations(destinations); // إعادة الرسم لتحديث شكل القلب
}

// 2. نظام البحث الذكي (Real-time Search)
function searchDestinations() {
    const query = document.querySelector('.search-input').value.toLowerCase();
    const suggestions = document.querySelector('.suggestions-box');
    
    const filtered = destinations.filter(dest => 
        dest.name.toLowerCase().includes(query) || 
        dest.type.toLowerCase().includes(query)
    );

    renderDestinations(filtered);

    // إظهار صندوق الاقتراحات الذكي
    if (query.length > 0 && filtered.length > 0) {
        suggestions.style.display = 'block';
        suggestions.innerHTML = filtered.slice(0, 5).map(f => `
            <div class="suggestion-item" onclick="quickSelect('${f.name}')">
                <span>${f.name}</span>
                <small>${f.type}</small>
            </div>
        `).join('');
    } else {
        suggestions.style.display = 'none';
    }
}

// 3. نظام التصفية (Filters: Local / Global / Cheap)
function filterCategory(cat) {
    let result = [];
    if (cat === 'all') result = destinations;
    else if (cat === 'local') result = destinations.filter(d => d.category === 'local');
    else if (cat === 'global') result = destinations.filter(d => d.category === 'global');
    else if (cat === 'cheap') result = destinations.filter(d => d.price < 1000);
    
    renderDestinations(result);
    
    // إغلاق السايدبار تلقائياً في الجوال بعد الاختيار
    document.querySelector('.sidebar').classList.remove('active');
}

// 4. دالة الاختيار السريع من البحث
function quickSelect(name) {
    document.querySelector('.search-input').value = name;
    searchDestinations();
}
/* ==================== محرك الحجز المطور (Ultimate Booking System) ==================== */

// 1. دالة بدء الحجز وتجهيز البيانات
function startBooking(id) {
    playSystemSound('click');
    const dest = destinations.find(d => d.id === id);
    if (!dest) return;

    currentSelection = dest;
    bookingData = { flight: 0, hotel: 0, car: 0, total: dest.price };
    currentStep = 1;
    
    document.querySelector('.modal-overlay').classList.add('active');
    renderBookingStep();
}

// 2. محرك رسم خطوات الحجز (Step Renderer)
function renderBookingStep() {
    const modalBox = document.querySelector('.modal-box');
    const steps = [1, 2, 3];
    
    let content = `
        <h2 class="brand-title" style="font-size: 1.5rem;">رحلة إلى: ${currentSelection.name}</h2>
        <div class="journey-timeline">
            ${steps.map(s => `<div class="timeline-step ${s <= currentStep ? 'active' : ''}">${s}</div>`).join('<div class="timeline-line"></div>')}
        </div>
    `;

    if (currentStep === 1) {
        content += `
            <p>اختر درجة السفر:</p>
            <div class="step-options">
                <button class="opt-btn" onclick="applyOption('flight', 0, 'الاقتصادية')">✈️ الدرجة الاقتصادية (+0 NC)</button>
                <button class="opt-btn" onclick="applyOption('flight', 800, 'الأعمال')">💼 درجة الأعمال (+800 NC)</button>
            </div>`;
    } else if (currentStep === 2) {
        content += `
            <p>اختر مكان الإقامة:</p>
            <div class="step-options">
                <button class="opt-btn" onclick="applyOption('hotel', 400, 'فندق 5 نجوم')">🏨 فندق نيون VIP (+400 NC)</button>
                <button class="opt-btn" onclick="applyOption('hotel', 0, 'بدون إقامة')">🏠 إقامة خاصة (+0 NC)</button>
            </div>`;
    } else if (currentStep === 3) {
        const finalTotal = bookingData.total + bookingData.flight + bookingData.hotel;
        content += `
            <div class="digital-ticket">
                <div class="qr-placeholder"><i class="fas fa-qrcode"></i></div>
                <div style="text-align: right;">
                    <div style="font-size: 0.7rem; color: var(--neon-blue);">رقم الحجز: #NB${Math.floor(Math.random()*9000)}</div>
                    <div style="font-weight: bold;">المجموع: ${finalTotal} NC</div>
                </div>
            </div>
            <button class="btn-confirm" style="width:100%; margin-top:20px;" onclick="completeBooking(${finalTotal})">تأكيد الحجز والدفع</button>`;
    }

    modalBox.innerHTML = content + `<button class="btn-cancel" style="margin-top:15px; width:100%;" onclick="closeModal()">إلغاء</button>`;
}

// 3. تطبيق الاختيارات
function applyOption(type, price, label) {
    playSystemSound('hover');
    bookingData[type] = price;
    addLog(`تم إضافة: ${label}`);
    currentStep++;
    renderBookingStep();
}

// 4. إكمال الحجز وخصم الرصيد
function completeBooking(finalTotal) {
    if (nourCoinBalance >= finalTotal) {
        nourCoinBalance -= finalTotal;
        updateBalanceUI();
        playSystemSound('success');
        showToast("تم تأكيد الحجز بنجاح!", "success");
        closeModal();
        addLog(`تم حجز رحلة ${currentSelection.name} بنجاح.`);
    } else {
        showToast("رصيد Nour Coin غير كافٍ!", "error");
    }
}

function closeModal() {
    document.querySelector('.modal-overlay').classList.remove('active');
}

// 5. دالة السجلات (Terminal Logs)
function addLog(msg) {
    const terminal = document.querySelector('.terminal-window');
    if (terminal) {
        terminal.innerHTML += `<div>> [${new Date().toLocaleTimeString()}] ${msg}</div>`;
        terminal.scrollTop = terminal.scrollHeight;
    }
}

/* ==================== المحرك البصري وتفاعل الواجهة (Visual & UI Core) ==================== */

// 1. محرك مطر الماتريكس (Matrix Rain)
const canvas = document.getElementById('matrix-bg');
const ctx = canvas ? canvas.getContext('2d') : null;
const fontSize = 16;
let columns, rainDrops;
const alphabet = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function initMatrix() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = canvas.width / fontSize;
    rainDrops = Array(Math.floor(columns)).fill(1);
}

const drawMatrix = () => {
    if (!ctx) return;
    // تأثير التلاشي التدريجي
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#0F0'; // اللون الأخضر التقليدي
    ctx.font = fontSize + 'px monospace';

    for(let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
        
        if(rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
};

// تشغيل الماتريكس وتحديث الحجم تلقائياً
if (canvas) {
    initMatrix();
    setInterval(drawMatrix, 35);
    window.addEventListener('resize', initMatrix); // تحديث عند تغيير حجم النافذة
}

// 2. التحكم في القائمة الجانبية (Sidebar Master)
function toggleSidebar() {
    playSystemSound('click'); 
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    const wrapper = document.querySelector('.main-wrapper');

    if (sidebar && overlay) {
        const isActive = sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('sidebar-open');
        
        // إزاحة ذكية للمحتوى في الشاشات الكبيرة
        if(window.innerWidth > 1100 && wrapper) {
            wrapper.style.transform = isActive ? "translateX(-30px)" : "translateX(0)";
        }
        
        addLog(isActive ? "تم تفعيل واجهة التحكم الجانبية." : "تم إغلاق واجهة التحكم.");
    }
}

// 3. محرك التمرير وزر العودة (Scroll Engine)
window.addEventListener('scroll', () => {
    const topBtn = document.getElementById('back-to-top');
    if (topBtn) {
        // إظهار الزر عند النزول أكثر من 400 بكسل
        topBtn.style.display = (window.scrollY > 400) ? "flex" : "none";
    }
});

function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
    playSystemSound('hover');
}
/* ==================== محرك الإقلاع الرئيسي (System Boot Sequence) ==================== */

window.onload = () => {
    // 1. تشغيل المحرك البصري للماتريكس
    if (typeof initMatrix === "function") initMatrix();
    
    // 2. عرض الوجهات وتحديث الرصيد
    renderDestinations(destinations);
    updateBalanceUI();
    
    // 3. تسلسل رسائل التيرمينال عند التشغيل
// تحديد وقت الدخول لإعطاء تحية ذكية
    const hours = new Date().getHours();
    const greeting = hours < 12 ? "صباح الخير أيها القائد" : "طاب مساؤك أيها القائد";

    const bootMsgs = [
        "Initializing NourBest OS Core...",
        "Connecting to Global Satellite Grid...",
        "Loading 100 Destination Nodes...",
        "Matrix Encryption Active.",
        `[CONFIRMED] ${greeting}. النظام جاهز للعمل.`
    ];
    
    let i = 0;
    const bootInterval = setInterval(() => {
        if (i < bootMsgs.length) {
            addLog(bootMsgs[i++]);
        } else {
            clearInterval(bootInterval);
        }
    }, 500);

    // 4. إخفاء شاشة التحميل
    setTimeout(() => {
        const loader = document.getElementById('loader-screen');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 1000);
        }
    }, 2500);
};

/* ==================== نظام البحث والتصفية المطور (Advanced Search) ==================== */

function searchDestinations() {
    // نستخدم الكلاسات الموحدة التي وضعناها في الـ CSS
    const query = document.querySelector('.search-input').value.trim().toLowerCase();
    const suggestionsBox = document.querySelector('.suggestions-box');
    
    if (query.length < 1) {
        if (suggestionsBox) suggestionsBox.style.display = 'none';
        renderDestinations(destinations);
        return;
    }

    const filtered = destinations.filter(d => 
        d.name.toLowerCase().includes(query) || 
        d.type.toLowerCase().includes(query) ||
        d.desc.toLowerCase().includes(query)
    );

    renderDestinations(filtered);

    // تحديث صندوق الاقتراحات الذكي
    if (suggestionsBox && filtered.length > 0) {
        suggestionsBox.style.display = 'block';
        suggestionsBox.innerHTML = filtered.slice(0, 5).map(d => `
            <div class="suggestion-item" onclick="quickSelect('${d.name}')">
                <span>📍 ${d.name}</span>
                <small>${d.type}</small>
            </div>
        `).join('');
    } else {
        if (suggestionsBox) suggestionsBox.style.display = 'none';
    }
}

function quickSelect(name) {
    playSystemSound('click');
    document.querySelector('.search-input').value = name;
    document.querySelector('.suggestions-box').style.display = 'none';
    searchDestinations();
}

/* ================= محرك التصفية المطور (Advanced Filtering) ================= */
function filterCategory(cat) {
    playSystemSound('click');
    const filtered = cat === 'all' ? destinations : destinations.filter(d => d.category === cat);
    renderDestinations(filtered);
    addLog(`تم تفعيل فلتر: ${cat}`);
}

/* ================= تحديث واجهة الرصيد والمحفظة ================= */
function updateVaultUI() {
    // حفظ الرصيد الجديد في ذاكرة المتصفح لضمان عدم ضياعه بعد التحديث
    localStorage.setItem('nour_coin_balance', nourCoinBalance.toFixed(2));
    
    // تحديث الأرقام الظاهرة في كل مكان (القائمة الجانبية + المحفظة الرقمية)
    const balances = document.querySelectorAll('.vault-balance, #nour-balance');
    balances.forEach(el => {
        el.innerText = nourCoinBalance.toFixed(2) + " NC";
    });

    // سطر الإضافة: إظهار العملية في نافذة الأوامر (Terminal)
    if (typeof addLog === 'function') {
        addLog("Vault Synced: تم مزامنة الرصيد وتحديث المحفظة.");
    }
}

function addLog(msg) {
    const t = document.getElementById('terminal');
    t.innerHTML += `<div>> ${msg}</div>`;
    t.scrollTop = t.scrollHeight;
}

function initLogs() {
    const msgs = ["System Booting...", "Loading Neural Network...", "Connecting Satellites...", "20 Nodes Found.", "Ready."];
    let i = 0;
    const interval = setInterval(() => {
        if(i >= msgs.length) clearInterval(interval);
        else addLog(msgs[i++]);
    }, 600);
}

function openModal(id) {
    playSystemSound('click');
    const dest = destinations.find(d => d.id === id);
    currentSelection = dest.name;
    bookingData.flight = dest.price; // السعر الأساسي للوجهة المختارة
    currentStep = 1; 
    renderStep();
    document.getElementById('booking-modal').classList.add('active');
}

function closeModal() {
    document.getElementById('booking-modal').classList.remove('active');
}

function renderStep() {
    const desc = document.getElementById('modal-desc');
    const title = document.getElementById('modal-title');
    const steps = document.querySelectorAll('.timeline-step');
    const actionBtn = document.querySelector('.btn-confirm');

    // تحديث مؤشر الخطوات العلوي
    steps.forEach((s, idx) => {
        s.classList.toggle('active', idx + 1 <= currentStep);
    });

    if (currentStep === 1) {
        title.innerText = `الخطوة 1: درجة السفر إلى ${currentSelection}`;
        desc.innerHTML = `
            <div class="step-options">
                <button class="opt-btn" onclick="selectOption('flight', 0, 'السياحية')">✈️ الدرجة الاقتصادية (+0 ر.س)</button>
                <button class="opt-btn" onclick="selectOption('flight', 550, 'الأعمال')">💼 درجة الأعمال (+550 ر.س)</button>
                <button class="opt-btn" onclick="selectOption('flight', 1300, 'الأولى')">👑 الدرجة الأولى (+1300 ر.س)</button>
            </div>`;
        actionBtn.style.display = "none"; 
    } else if (currentStep === 2) {
        title.innerText = `الخطوة 2: السكن في ${currentSelection}`;
        desc.innerHTML = `
            <div class="step-options">
                <button class="opt-btn" onclick="selectOption('hotel', 300, 'فندق 3 نجوم')">🏨 فندق اقتصادي (+300 ر.س/ليلة)</button>
                <button class="opt-btn" onclick="selectOption('hotel', 750, 'فندق 5 نجوم')">⭐ فندق 5 نجوم (+750 ر.س/ليلة)</button>
                <button class="opt-btn" onclick="selectOption('hotel', 0, 'بدون سكن')">🏠 لدي سكن خاص (+0 ر.س)</button>
            </div>`;
    } else if (currentStep === 3) {
        title.innerText = `الخطوة 3: وسيلة التنقل في ${currentSelection}`;
        desc.innerHTML = `
            <div class="step-options">
                <button class="opt-btn" onclick="selectOption('car', 180, 'سيارة اقتصادية')">🚗 سيارة اقتصادية (+180 ر.س/يوم)</button>
                <button class="opt-btn" onclick="selectOption('car', 500, 'سيارة VIP')">🏎️ سيارة فارهة (+500 ر.س/يوم)</button>
                <button class="opt-btn" onclick="selectOption('car', 0, 'بدون سيارة')">🚶 لا أحتاج سيارة (+0 ر.س)</button>
            </div>`;
    } else {
        showFinalSummary();
    }
}

function selectOption(type, price, label) {
    playSystemSound('hover');
    if (type === 'flight') bookingData.flight += price;
    else bookingData[type] = price;
    addLog(`تم اختيار: ${label}`);
    currentStep++;
    renderStep();
}

function showFinalSummary() {
    const total = bookingData.flight + bookingData.hotel + bookingData.car;
    bookingData.total = total;
    const actionBtn = document.querySelector('.btn-confirm');
    
    document.getElementById('modal-title').innerText = "ملخص رحلتك المكتملة";
    document.getElementById('modal-desc').innerHTML = `
        <div class="summary-box">
            <div style="display:flex; justify-content:space-between;"><span>✈️ تذكرة الطيران:</span> <span>${bookingData.flight} ر.س</span></div>
            <div style="display:flex; justify-content:space-between;"><span>🏨 الإقامة والفنادق:</span> <span>${bookingData.hotel} ر.س</span></div>
            <div style="display:flex; justify-content:space-between;"><span>🚗 خدمات التنقل:</span> <span>${bookingData.car} ر.س</span></div>
            <hr style="border:0.5px solid #333; margin:10px 0;">
            <div style="display:flex; justify-content:space-between; color:var(--neon-gold); font-weight:bold;">
                <span>السعر الإجمالي النهائي:</span> <span>${total} ريال سعودي</span>
            </div>
        </div>`;
    
    actionBtn.style.display = "block";
    actionBtn.innerText = "تأكيد الحجز والدفع النهائي";
    actionBtn.onclick = () => finalConfirm();
}

function finalConfirm() {
    playSystemSound('success');
    closeModal();
    
    // تسجيل بيانات الحجز الجديد
    const newBooking = {
        id: "NB-" + Math.floor(Math.random() * 90000 + 10000),
        city: currentSelection,
        total: bookingData.total,
        date: new Date().toLocaleDateString('ar-SA')
    };
    
    bookings.push(newBooking);
    localStorage.setItem('nourbest_bookings', JSON.stringify(bookings));
    
    // تحديث الرصيد والمكافأة
    nourCoinBalance += 50.75;
    localStorage.setItem('nour_coin_balance', nourCoinBalance.toFixed(2));
    updateVaultUI(); 
    renderBookings(); // تحديث القائمة في السايدبار

    const msg = `تم تأكيد حجزك إلى ${currentSelection}. رقم الحجز: ${newBooking.id}`;
    addLog(msg);
    alert(msg);
}

function renderBookings() {
    const list = document.getElementById('bookings-list');
    if (!list) return;
    list.innerHTML = "";

    if (bookings.length === 0) {
        list.innerHTML = '<div style="text-align:center; color:#555; margin-top:10px;">لا توجد حجوزات نشطة</div>';
        return;
    }

    bookings.forEach(b => {
        list.innerHTML += `
            <div class="booking-card">
                <div class="booking-id">رقم الحجز: ${b.id}</div>
                <div class="booking-city">📍 ${b.city}</div>
                <div class="booking-footer">
                    <span>📅 ${b.date}</span>
                    <span style="color:var(--neon-green)">${b.total} ر.س</span>
                </div>
            </div>`;
    });
}

// دالة تحديث واجهة المحفظة
function updateVaultUI() {
    const vaultElement = document.getElementById('nour-balance');
    if(vaultElement) {
        vaultElement.innerText = nourCoinBalance.toFixed(2);
    }
}

/* ================= وظائف النظام الذكية (OS Core Utils) ================= */

// 1. تحديث الساعة والطقس بشكل متوافق
function updateClock() {
    const el = document.getElementById('universal-clock');
    if (el) el.innerText = new Date().toLocaleTimeString('ar-SA', { hour12: true });
}
setInterval(updateClock, 1000);

async function updateWeather() {
    const cities = ["الرياض", "لندن", "باريس", "طوكيو"];
    const temp = Math.floor(Math.random() * 30) + 10;
    const el = document.getElementById('weather-widget');
    if (el) el.innerHTML = `<i class="fas fa-sun"></i> ${temp}°C - ${cities[0]}`;
}
setInterval(updateWeather, 60000);

// 2. ربط الطبقة الشفافة (Overlay) لإغلاق القائمة
const sidebarOverlay = document.querySelector('.sidebar-overlay');
if (sidebarOverlay) sidebarOverlay.onclick = () => toggleSidebar();

// 3. تحديث حجم الماتريكس عند تغيير حجم الشاشة
window.onresize = () => { if (typeof initMatrix === "function") initMatrix(); };