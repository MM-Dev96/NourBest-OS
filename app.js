/* ================= بيانات الوجهات (20 وجهة كاملة) ================= */
const destinations = [
    { id: "NB-01", name: "جبال طويق", price: 3500, type: "استكشاف", risk: 1, desc: "رحلة تعانق السحاب في قلب نجد." },
    { id: "NB-02", name: "شتاء العلا", price: 4200, type: "تاريخي", risk: 2, desc: "تجربة عبر الزمن بين الآثار النبطية." },
    { id: "NB-03", name: "نيوم OXAGON", price: 8900, type: "مستقبلي", risk: 0, desc: "المدينة العائمة الصناعية الذكية." },
    { id: "NB-04", name: "المالديف الرقمية", price: 5500, type: "استجمام", risk: 1, desc: "جزر اصطناعية ذكية." },
    { id: "NB-05", name: "إيفرست (هايبرلوب)", price: 12000, type: "مغامرة", risk: 5, desc: "صعود للقمة في 10 دقائق." },
    { id: "NB-06", name: "طوكيو الجديدة", price: 6800, type: "سايبربانك", risk: 1, desc: "شوارع النيون التي لا تنام." },
    { id: "NB-07", name: "مستعمرة المريخ", price: 95000, type: "فضاء", risk: 9, desc: "تذكرة ذهاب وإياب للكوكب الأحمر." },
    { id: "NB-08", name: "سويسرا الجليدية", price: 4700, type: "طبيعة", risk: 1, desc: "تزلج على الجليد النانوي." },
    { id: "NB-09", name: "وادي رم", price: 3100, type: "فلكي", risk: 1, desc: "مراقبة المجرات من قباب شفافة." },
    { id: "NB-10", name: "أمالا البحر الأحمر", price: 7400, type: "رفاهية", risk: 0, desc: "نقاهة صحية وتجديد الخلايا." },
    { id: "NB-11", name: "دبي المستقبل", price: 5900, type: "تقني", risk: 1, desc: "التنقل بالتاكسي الطائر." },
    { id: "NB-12", name: "لندن الطائرة", price: 8200, type: "كلاسيكي", risk: 3, desc: "مدينة لندن القديمة المرفوعة." },
    { id: "NB-13", name: "بالي (الروح)", price: 4000, type: "روحاني", risk: 0, desc: "جلسات يوغا مع مدربين AI." },
    { id: "NB-14", name: "الأمازون الذكية", price: 5200, type: "بيئي", risk: 4, desc: "غابات تتحدث معك." },
    { id: "NB-15", name: "واحة النخيل", price: 2900, type: "تراثي", risk: 0, desc: "العودة للجذور في واحة محمية." },
    { id: "NB-16", name: "صير بني ياس", price: 3800, type: "سفاري", risk: 1, desc: "محمية حيوانات منقرضة." },
    { id: "NB-17", name: "جبال الألب", price: 6100, type: "رياضة", risk: 2, desc: "قمم شاهقة ومنتجعات شمسية." },
    { id: "NB-18", name: "نيويورك", price: 7700, type: "مدني", risk: 2, desc: "ناطحات السحاب العملاقة." },
    { id: "NB-19", name: "سوق الزل", price: 2500, type: "تسوق", risk: 0, desc: "مزادات البلوك تشين للتراث." },
    { id: "NB-20", name: "القطب الشمالي", price: 9300, type: "عزلة", risk: 6, desc: "فندق الجليد الأزرق." }
];

let favorites = JSON.parse(localStorage.getItem('nourbest_favs')) || [];
let currentSelection = "";
let nourCoinBalance = parseFloat(localStorage.getItem('nour_coin_balance')) || 500.00;

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
        addLog("Mobile Navigation Menu: Opened.");
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
    document.getElementById('modal-title').innerText = dest.name;
    document.getElementById('modal-title').style.color = "var(--neon-blue)";
    document.getElementById('modal-desc').innerText = dest.desc + "\n\nالسعر: " + dest.price + " ريال | الخطورة: " + dest.risk;
    document.getElementById('booking-modal').classList.add('active');
}

function closeModal() {
    document.getElementById('booking-modal').classList.remove('active');
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
    const timeString = "UTC: " + 
        now.getUTCHours().toString().padStart(2, '0') + ":" + 
        now.getUTCMinutes().toString().padStart(2, '0') + ":" + 
        now.getUTCSeconds().toString().padStart(2, '0');
    
    const clockElement = document.getElementById('universal-clock');
    if (clockElement) clockElement.innerText = timeString;
}
setInterval(updateClock, 1000);

window.onresize = () => {
    initMatrix(); // إعادة تشغيل الماتريكس بالحجم الجديد
    addLog("Matrix Recalibrated: Display adjusted."); // لمسة إضافية للسجل
};