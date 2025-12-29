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

let favorites = JSON.parse(localStorage.getItem('nourbest_favs')) || [];
let currentSelection = "";
let nourCoinBalance = parseFloat(localStorage.getItem('nour_coin_balance')) || 500.00;
let currentStep = 1;
let bookingData = { flight: 0, hotel: 0, car: 0, total: 0 };
// ================= محرك الصوت =================
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSystemSound(type) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'hover') {
        osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
    } else if (type === 'click') {
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
    } else if (type === 'success') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(800, audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.5);
    }
}

// ================= محرك Matrix Rain =================
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');
const fontSize = 16;
let columns, rainDrops;
const alphabet = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function initMatrix() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = canvas.width / fontSize;
    rainDrops = Array(Math.floor(columns)).fill(1);
}
initMatrix(); // تشغيل أولي

const drawMatrix = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0F0'; 
    ctx.font = fontSize + 'px monospace';

    for(let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i*fontSize, rainDrops[i]*fontSize);
        if(rainDrops[i]*fontSize > canvas.height && Math.random() > 0.975){
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
};
setInterval(drawMatrix, 30);

// دالة فتح وإغلاق القائمة الجانبية في الجوال
function toggleSidebar() {
    playSystemSound('click'); 
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active'); 
    
    if(sidebar.classList.contains('active')) {
        addLog("تحديث بيانات المسافر والمحفظة الرقمية.");
        }
    }
 // هنا أغلقنا القائمة لتعمل بشكل مستقل

// منطق زر العودة للأعلى عند النزول بالصفحة (خارج الدالة ليعمل دائماً)
window.onscroll = function() {
    const topBtn = document.getElementById('back-to-top');
    if (topBtn) {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            topBtn.style.display = "flex";
        } else {
            topBtn.style.display = "none";
        }
    }
};

// عند الضغط على الزر يصعد للأعلى بسلاسة
if(document.getElementById('back-to-top')) {
    document.getElementById('back-to-top').onclick = function() {
        window.scrollTo({top: 0, behavior: 'smooth'});
        playSystemSound('hover');
    };
}
// ================= المنطق الرئيسي =================
window.onload = () => {
    setTimeout(() => {
        document.getElementById('loader-screen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loader-screen').style.display = 'none';
            initLogs();
        }, 1000);
    }, 2000);

    renderGrid(destinations);
    updateFavList();
    addLog("System Initialized with Matrix Core.");
};
function switchSystem(system) {
    playSystemSound('click');
    addLog("Switching to " + system + " system...");
    // هنا يمكننا مستقبلاً ربط خرائط أو واجهات أخرى
}
function filterGrid() {
    const query = document.getElementById('search-box').value.toLowerCase();
    const sortType = document.getElementById('sort-select').value;
    playSystemSound('hover');

    let filtered = destinations.filter(d => d.name.toLowerCase().includes(query) || d.desc.toLowerCase().includes(query));

    if(sortType === 'price-asc') filtered.sort((a,b) => a.price - b.price);
    if(sortType === 'price-desc') filtered.sort((a,b) => b.price - a.price);
    if(sortType === 'risk-low') filtered.sort((a,b) => a.risk - b.risk);

    renderGrid(filtered);
}

function renderGrid(data) {
    const container = document.getElementById('grid-container');
    container.innerHTML = "";
    
    data.forEach(dest => {
        const isFav = favorites.includes(dest.id);
        const favClass = isFav ? "active" : "";
        
        container.innerHTML += `
            <div class="trip-card" onmouseenter="playSystemSound('hover')">
                <button class="fav-btn ${favClass}" onclick="toggleFav('${dest.id}')">♥</button>
                <div class="card-header">
                    <span class="card-badge">${dest.type}</span>
                    <span class="card-price">${dest.price.toLocaleString()}</span>
                </div>
                <h3 class="card-title">${dest.name}</h3>
                <p style="color:#aaa; font-size:0.9rem; flex-grow:1;">${dest.desc}</p>
                <button class="btn-select" onclick="openModal('${dest.id}')">تفاصيل المسار</button>
            </div>
        `;
    });
}

function toggleFav(id) {
    playSystemSound('click');
    if(favorites.includes(id)) {
        favorites = favorites.filter(fav => fav !== id);
    } else {
        favorites.push(id);
    }
    localStorage.setItem('nourbest_favs', JSON.stringify(favorites));
    renderGrid(destinations); 
    updateFavList();
}

function updateFavList() {
    const list = document.getElementById('fav-list');
    const count = document.getElementById('fav-count');
    list.innerHTML = "";
    count.innerText = favorites.length;

    if(favorites.length === 0) {
        list.innerHTML = '<div style="text-align:center; color:#555; margin-top:20px;">المحفظة فارغة</div>';
        return;
    }

    favorites.forEach(id => {
        const item = destinations.find(d => d.id === id);
        list.innerHTML += `
            <div class="fav-item">
                <span>${item.name}</span>
                <span class="fav-remove" onclick="toggleFav('${id}')">×</span>
            </div>
        `;
    });
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

// استبدل دالة finalConfirm القديمة بهذا الكود:
function finalConfirm() {
    playSystemSound('success');
    closeModal();
    
    // إضافة مكافأة الحجز (50.75 عملة)
    nourCoinBalance += 50.75;
    localStorage.setItem('nour_coin_balance', nourCoinBalance.toFixed(2));
    updateVaultUI(); 

    const msg = `تم حجز رحلة إلى ${currentSelection}. حصلت على مكافأة نيونية: 50.75 NC`;
    alert(msg);
    addLog(msg);
    
    const u = new SpeechSynthesisUtterance(msg);
    window.speechSynthesis.speak(u);
}

// دالة تحديث واجهة المحفظة
function updateVaultUI() {
    const vaultElement = document.getElementById('nour-balance');
    if(vaultElement) {
        vaultElement.innerText = nourCoinBalance.toFixed(2);
    }
}

// ================= تهيئة محرك الترجمة (100 لغة) =================
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'ar',
        includedLanguages: 'en,zh-CN,es,fr,de,ja,ru,pt,it,ko,tr,hi,bn,te,mr,ta,ur,gu,kn,ml,pa,th,id,nl,el,pl,sv,no,da,fi,he,cs,hu,ro,uk,bg,hr,sk,sl,et,lt,lv,ms,sq,bs,mk,sr,hy,ka,az,uz,kk,tk,ky,tg,mn,km,lo,my,ne,si,am,sw,zu,xh,yo,ig,ha,af,is,ga,mt,cy,gd,gl,eu,ca,fy,lb,eo,la',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
    }, 'google_translate_element');
}
// ================= دالة الفلاتر السريعة (طيران، فنادق، سيارات) =================
function filterType(category) {
    playSystemSound('click'); // تشغيل صوت النيون عند الضغط
    addLog("Filtering System: " + category.toUpperCase() + " Mode Active.");

    let filtered;

    if (category === 'flight') {
        // يعرض كل الوجهات التي فيها طيران أو استكشاف وفضاء
        filtered = destinations.filter(d => 
            d.type === "فضاء" || d.type === "مغامرة" || d.desc.includes("طيران") || d.desc.includes("صعود")
        );
    } else if (category === 'hotel') {
        // يبحث عن الكلمات المتعلقة بالسكن والرفاهية
        filtered = destinations.filter(d => 
            d.desc.includes("فندق") || d.desc.includes("إقامة") || d.type === "رفاهية" || d.type === "استجمام"
        );
    } else if (category === 'car') {
        // يبحث عن وسائل التنقل والسيارات
        filtered = destinations.filter(d => 
            d.desc.includes("تاكسي") || d.desc.includes("تنقل") || d.desc.includes("هايبرلوب")
        );
    }

    // إذا كانت القائمة فارغة، يعرض كل شيء كافتراضي
    if (filtered.length === 0) {
        renderGrid(destinations);
        addLog("No specific matches found. Showing all nodes.");
    } else {
        renderGrid(filtered);
        addLog(filtered.length + " destinations matched your criteria.");
    }
}

// ================= دالة الساعة العالمية (لتعمل الساعة في شريط الحالة) =================

// دالة مسح نص البحث وإعادة عرض كل الوجهات
function clearFilters() {
    playSystemSound('click');
    document.getElementById('search-box').value = ""; 
    document.getElementById('sort-select').value = "default"; 
    renderGrid(destinations); 
    addLog("Search Cleared: All nodes restored.");
}
// ================= وظائف النظام الموحدة =================

function updateClock() {
    const now = new Date();
    // استخدام التوقيت المحلي للمستخدم
    const timeString = now.toLocaleTimeString('ar-SA', { hour12: true });
    const clockElement = document.getElementById('universal-clock');
    if (clockElement) clockElement.innerText = timeString;
}

setInterval(updateClock, 1000);

window.onresize = () => initMatrix();