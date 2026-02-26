const products = [
  { id: 1, name: "عباية كلاسيك سوداء", category: "daily", size: "S-XXL", price: 219, image: "https://images.unsplash.com/photo-1618375531912-867984bdfd87?auto=format&fit=crop&w=600&q=80" },
  { id: 2, name: "عباية قماش كريب فاخر", category: "formal", size: "M-XXL", price: 489, image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80" },
  { id: 3, name: "عباية بيج أنيقة", category: "colored", size: "S-XL", price: 329, image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80" },
  { id: 4, name: "عباية عملية بسحاب مخفي", category: "daily", size: "M-XXL", price: 259, image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80" },
  { id: 5, name: "عباية مناسبات بتطريز يدوي", category: "formal", size: "S-XL", price: 599, image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80" },
  { id: 6, name: "عباية رمادية خفيفة", category: "colored", size: "S-XXL", price: 279, image: "https://images.unsplash.com/photo-1464863979621-258859e62245?auto=format&fit=crop&w=600&q=80" }
];

const state = {
  cart: JSON.parse(localStorage.getItem("abaya_cart") || "[]")
};

const productsGrid = document.getElementById("products-grid");
const searchInput = document.getElementById("search");
const categoryFilter = document.getElementById("category-filter");
const priceFilter = document.getElementById("price-filter");
const resetFiltersBtn = document.getElementById("reset-filters");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const cartItems = document.getElementById("cart-items");
const cartDrawer = document.getElementById("cart-drawer");
const cartOverlay = document.getElementById("cart-overlay");
const openCartBtn = document.getElementById("open-cart");
const closeCartBtn = document.getElementById("close-cart");
const checkoutBtn = document.getElementById("checkout-btn");
const whatsappCheckout = document.getElementById("whatsapp-checkout");
const contactForm = document.getElementById("contact-form");
const toast = document.getElementById("toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

function formatSAR(price) {
  return `${price.toLocaleString("ar-SA")} ر.س`;
}

function saveCart() {
  localStorage.setItem("abaya_cart", JSON.stringify(state.cart));
}

function getPriceMatch(product, filter) {
  if (filter === "low") return product.price < 250;
  if (filter === "mid") return product.price >= 250 && product.price <= 450;
  if (filter === "high") return product.price > 450;
  return true;
}

function getCategoryLabel(category) {
  if (category === "daily") return "عباية يومية";
  if (category === "formal") return "عباية مناسبات";
  if (category === "colored") return "عباية ملونة";
  return "عباية";
}

function renderProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;
  const price = priceFilter.value;

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(query);
    const matchesCategory = category === "all" || p.category === category;
    const matchesPrice = getPriceMatch(p, price);
    return matchesSearch && matchesCategory && matchesPrice;
  });

  if (!filtered.length) {
    productsGrid.innerHTML = `<p>لا توجد نتائج مطابقة. جربي خيارات بحث أخرى.</p>`;
    return;
  }

  productsGrid.innerHTML = filtered.map((product) => `
    <article class="product-card">
      <img class="product-image" src="${product.image}" alt="${product.name}" loading="lazy" />
      <div class="product-content">
        <h3>${product.name}</h3>
        <p class="meta">${getCategoryLabel(product.category)} • المقاسات: ${product.size}</p>
        <p class="price">${formatSAR(product.price)}</p>
        <button class="add-btn" data-id="${product.id}">أضيفي للسلة</button>
      </div>
    </article>
  `).join("");
}

function buildWhatsappMessage(total) {
  if (!state.cart.length) {
    whatsappCheckout.removeAttribute("href");
    return;
  }

  const list = state.cart.map((item) => `- ${item.name} × ${item.qty} (${formatSAR(item.price * item.qty)})`).join("%0A");
  const text = `مرحباً، أرغب بتأكيد الطلب:%0A${list}%0Aالإجمالي: ${formatSAR(total)}`;
  whatsappCheckout.href = `https://wa.me/966500000000?text=${text}`;
}

function renderCart() {
  const count = state.cart.reduce((sum, item) => sum + item.qty, 0);
  const total = state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  cartCount.textContent = count;
  cartTotal.textContent = formatSAR(total);
  buildWhatsappMessage(total);

  if (!state.cart.length) {
    cartItems.innerHTML = "<p>السلة فارغة حالياً.</p>";
    return;
  }

  cartItems.innerHTML = state.cart.map((item) => `
    <div class="cart-item">
      <div class="cart-row">
        <strong>${item.name}</strong>
        <button class="remove-btn" data-remove="${item.id}">حذف</button>
      </div>
      <div class="cart-row">
        <small>${formatSAR(item.price)} للوحدة</small>
        <div class="qty-controls">
          <button data-qty-minus="${item.id}" aria-label="تقليل الكمية">-</button>
          <span>${item.qty}</span>
          <button data-qty-plus="${item.id}" aria-label="زيادة الكمية">+</button>
        </div>
      </div>
    </div>
  `).join("");
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const existing = state.cart.find((item) => item.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
  }

  saveCart();
  renderCart();
  showToast("تمت إضافة المنتج إلى السلة ✅");
}

function changeQty(productId, delta) {
  const item = state.cart.find((entry) => entry.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    state.cart = state.cart.filter((entry) => entry.id !== productId);
  }

  saveCart();
  renderCart();
}

function removeFromCart(productId) {
  state.cart = state.cart.filter((item) => item.id !== productId);
  saveCart();
  renderCart();
  showToast("تم حذف المنتج من السلة");
}

function toggleCart(open) {
  cartDrawer.classList.toggle("open", open);
  cartDrawer.setAttribute("aria-hidden", String(!open));
  cartOverlay.hidden = !open;
}

productsGrid.addEventListener("click", (event) => {
  const addBtn = event.target.closest("[data-id]");
  if (!addBtn) return;
  addToCart(Number(addBtn.dataset.id));
});

cartItems.addEventListener("click", (event) => {
  const removeBtn = event.target.closest("[data-remove]");
  if (removeBtn) {
    removeFromCart(Number(removeBtn.dataset.remove));
    return;
  }

  const plusBtn = event.target.closest("[data-qty-plus]");
  if (plusBtn) {
    changeQty(Number(plusBtn.dataset.qtyPlus), 1);
    return;
  }

  const minusBtn = event.target.closest("[data-qty-minus]");
  if (minusBtn) {
    changeQty(Number(minusBtn.dataset.qtyMinus), -1);
  }
});

[searchInput, categoryFilter, priceFilter].forEach((el) => {
  el.addEventListener("input", renderProducts);
  el.addEventListener("change", renderProducts);
});

resetFiltersBtn.addEventListener("click", () => {
  searchInput.value = "";
  categoryFilter.value = "all";
  priceFilter.value = "all";
  renderProducts();
  showToast("تمت إعادة ضبط الفلاتر");
});

openCartBtn.addEventListener("click", () => toggleCart(true));
closeCartBtn.addEventListener("click", () => toggleCart(false));
cartOverlay.addEventListener("click", () => toggleCart(false));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") toggleCart(false);
});

checkoutBtn.addEventListener("click", () => {
  if (!state.cart.length) {
    showToast("السلة فارغة، أضيفي منتج أولاً");
    return;
  }
  showToast("تم استلام طلبك بنجاح، سيتم التواصل معك قريباً.");
  state.cart = [];
  saveCart();
  renderCart();
  toggleCart(false);
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = document.getElementById("contact-message").value.trim();
  if (message.length < 10) {
    showToast("الرسالة قصيرة جداً، الرجاء كتابة تفاصيل أكثر.");
    return;
  }

  contactForm.reset();
  showToast("تم إرسال رسالتك، شكراً لتواصلك 🌸");
});

renderProducts();
renderCart();
