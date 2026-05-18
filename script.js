const PRODUCTS = [
  {
    id: 1, name: 'Matcha Latte', category: 'Hot Drink',
    emoji: '🍵', price: 38000,
    desc: 'Perpaduan matcha ceremonial grade dengan susu oat creamy yang hangat dan menenangkan.',
    badge: 'Bestseller'
  },
  {
    id: 2, name: 'Matcha Ice Cream', category: 'Dessert',
    emoji: '🍦', price: 28000,
    desc: 'Es krim artisan dengan rasa matcha yang autentik dan intens. Creamy di setiap sendok.',
    badge: 'Popular'
  },
  {
    id: 3, name: 'Matcha Cake', category: 'Pastry',
    emoji: '🍰', price: 45000,
    desc: 'Layered cake premium dengan krim matcha ringan dan tekstur yang melembut di mulut.',
    badge: 'New'
  },
  {
    id: 4, name: 'Matcha Frappé', category: 'Cold Drink',
    emoji: '🥤', price: 42000,
    desc: 'Minuman blended matcha dengan whipped cream dan topping red bean. Refreshing!',
    badge: null
  },
  {
    id: 5, name: 'Matcha Tiramisu', category: 'Dessert',
    emoji: '🍮', price: 52000,
    desc: 'Twist klasik tiramisu dengan sentuhan matcha Jepang yang halus dan aromatik.',
    badge: 'Limited'
  },
  {
    id: 6, name: 'Matcha Affogato', category: 'Specialty',
    emoji: '☕', price: 48000,
    desc: 'Espresso shot dituang di atas matcha ice cream premium. Bold meets calm.',
    badge: null
  }
];
 
/* ====================================================
   STATE
==================================================== */
let cart   = JSON.parse(localStorage.getItem('mw_cart') || '[]');
let users  = JSON.parse(localStorage.getItem('mw_users') || '[]');
let currentUser = JSON.parse(localStorage.getItem('mw_user') || 'null');
let selectedPayment = 'cod';
 
/* ====================================================
   LOADING SCREEN
==================================================== */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loading-screen').classList.add('hidden');
    document.getElementById('loading-screen').addEventListener('transitionend', () => {
      document.getElementById('loading-screen').remove();
    }, { once: true });
    initReveal();
  }, 2000);
});
 
/* ====================================================
   DARK MODE
==================================================== */
if (localStorage.getItem('mw_dark') === 'true') document.body.classList.add('dark');
function toggleDark() {
  document.body.classList.toggle('dark');
  localStorage.setItem('mw_dark', document.body.classList.contains('dark'));
}
 
/* ====================================================
   NAVBAR SCROLL EFFECT
==================================================== */
window.addEventListener('scroll', () => {
  const nb = document.getElementById('navbar');
  nb.classList.toggle('scrolled', window.scrollY > 60);
});
 
/* ====================================================
   MOBILE MENU
==================================================== */
function openMobileMenu() { document.getElementById('mobile-menu').classList.add('open'); }
function closeMobileMenu() { document.getElementById('mobile-menu').classList.remove('open'); }
 
/* ====================================================
   SCROLL REVEAL
==================================================== */
function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}
 
/* ====================================================
   RENDER PRODUCTS
==================================================== */
function renderProducts() {
  const grid = document.getElementById('products-grid');
  grid.innerHTML = PRODUCTS.map(p => `
    <div class="product-card reveal">
      <div class="product-img-wrap">
        <div class="product-emoji">${p.emoji}</div>
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
      </div>
      <div class="product-info">
        <div class="product-category">${p.category}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-footer">
          <div class="product-price">Rp ${p.price.toLocaleString('id-ID')} <span>/ porsi</span></div>
          <button class="btn-cart" onclick="addToCart(${p.id})" title="Tambah ke keranjang">+</button>
        </div>
      </div>
    </div>
  `).join('');
  initReveal();
}
renderProducts();
 
/* ====================================================
   SCROLL TO PRODUCTS
==================================================== */
function scrollToProducts() {
  document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}
 
/* ====================================================
   CART FUNCTIONS
==================================================== */
function addToCart(productId) {
  const p = PRODUCTS.find(x => x.id === productId);
  const existing = cart.find(c => c.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...p, qty: 1 });
  }
  saveCart();
  updateCartBadge();
  showToast(`🛒 ${p.name} ditambahkan ke keranjang!`);
}
 
function saveCart() {
  localStorage.setItem('mw_cart', JSON.stringify(cart));
}
 
function updateCartBadge() {
  const total = cart.reduce((s, c) => s + c.qty, 0);
  const badge = document.getElementById('cart-count');
  badge.textContent = total;
  badge.classList.toggle('visible', total > 0);
}
updateCartBadge();
 
function removeFromCart(productId) {
  cart = cart.filter(c => c.id !== productId);
  saveCart();
  updateCartBadge();
  renderCart();
}
 
function changeQty(productId, delta) {
  const item = cart.find(c => c.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { removeFromCart(productId); return; }
  saveCart();
  updateCartBadge();
  renderCart();
}
 
function getCartTotal() {
  return cart.reduce((s, c) => s + c.price * c.qty, 0);
}
 
function renderCart() {
  const container = document.getElementById('cart-items-container');
  const footer = document.getElementById('cart-footer');
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <span class="empty-icon">🛒</span>
        Keranjang Anda masih kosong.<br>Yuk mulai belanja!
      </div>`;
    footer.style.display = 'none';
    return;
  }
  footer.style.display = 'block';
  container.innerHTML = `
    <div class="cart-items">
      ${cart.map(c => `
        <div class="cart-item">
          <div class="cart-item-emoji">${c.emoji}</div>
          <div class="cart-item-info">
            <div class="cart-item-name">${c.name}</div>
            <div class="cart-item-price">Rp ${c.price.toLocaleString('id-ID')}</div>
            <div class="cart-item-qty">
              <button class="qty-btn" onclick="changeQty(${c.id}, -1)">−</button>
              <span class="qty-num">${c.qty}</span>
              <button class="qty-btn" onclick="changeQty(${c.id}, 1)">+</button>
              <button class="cart-remove" onclick="removeFromCart(${c.id})" style="margin-left:8px">🗑️</button>
            </div>
          </div>
          <div style="text-align:right">
            <div style="font-weight:600;color:var(--matcha-dark);font-size:.9rem">Rp ${(c.price * c.qty).toLocaleString('id-ID')}</div>
          </div>
        </div>`).join('')}
    </div>`;
  document.getElementById('cart-total-amount').textContent = `Rp ${getCartTotal().toLocaleString('id-ID')}`;
}
 
/* ====================================================
   MODAL FUNCTIONS
==================================================== */
function openCartModal() {
  renderCart();
  openModal('cart-modal');
}
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
 
/* ====================================================
   AUTH FUNCTIONS
==================================================== */
function openAuthModal() {
  if (currentUser) {
    // Logout
    currentUser = null;
    localStorage.removeItem('mw_user');
    updateAuthUI();
    showToast('👋 Sampai jumpa!');
    return;
  }
  openModal('auth-modal');
}
 
function switchTab(tab) {
  const isLogin = tab === 'login';
  document.getElementById('form-login').style.display  = isLogin ? '' : 'none';
  document.getElementById('form-register').style.display = isLogin ? 'none' : '';
  document.getElementById('tab-login').classList.toggle('active', isLogin);
  document.getElementById('tab-register').classList.toggle('active', !isLogin);
}
 
function doLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass  = document.getElementById('login-pass').value.trim();
  if (!email || !pass) { showToast('⚠️ Email & password harus diisi!', 'error'); return; }
  const user = users.find(u => u.email === email && u.password === pass);
  if (!user) { showToast('❌ Email atau password salah!', 'error'); return; }
  currentUser = user;
  localStorage.setItem('mw_user', JSON.stringify(user));
  closeModal('auth-modal');
  updateAuthUI();
  showToast(`✨ Selamat datang, ${user.name}!`, 'gold');
}
 
function doRegister() {
  const name  = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const pass  = document.getElementById('reg-pass').value.trim();
  if (!name || !email || !pass) { showToast('⚠️ Semua field harus diisi!', 'error'); return; }
  if (pass.length < 6)  { showToast('⚠️ Password minimal 6 karakter!', 'error'); return; }
  if (users.find(u => u.email === email)) { showToast('⚠️ Email sudah terdaftar!', 'error'); return; }
  const newUser = { name, email, password: pass };
  users.push(newUser);
  localStorage.setItem('mw_users', JSON.stringify(users));
  currentUser = newUser;
  localStorage.setItem('mw_user', JSON.stringify(newUser));
  closeModal('auth-modal');
  updateAuthUI();
  showToast(`🎉 Akun berhasil dibuat! Selamat datang, ${name}!`, 'gold');
}
 
function updateAuthUI() {
  const btn  = document.getElementById('auth-btn');
  const info = document.getElementById('nav-user-info');
  if (currentUser) {
    btn.textContent = 'Logout';
    info.textContent = `👋 ${currentUser.name.split(' ')[0]}`;
    info.style.display = 'block';
  } else {
    btn.textContent = 'Login';
    info.style.display = 'none';
  }
}
updateAuthUI();
 
/* ====================================================
   CHECKOUT
==================================================== */
function openCheckout() {
  if (!currentUser) {
    closeModal('cart-modal');
    showToast('🔐 Silakan login terlebih dahulu!', 'error');
    setTimeout(() => openModal('auth-modal'), 500);
    return;
  }
  if (currentUser) {
    document.getElementById('co-name').value = currentUser.name || '';
  }
  closeModal('cart-modal');
  openModal('checkout-modal');
}
 
function selectPayment(type) {
  selectedPayment = type;
  ['cod', 'transfer', 'ewallet'].forEach(t => {
    document.getElementById(`pay-${t}`).classList.toggle('selected', t === type);
  });
}
 
function doCheckout() {
  const name    = document.getElementById('co-name').value.trim();
  const address = document.getElementById('co-address').value.trim();
  const phone   = document.getElementById('co-phone').value.trim();
  if (!name || !address || !phone) { showToast('⚠️ Semua field harus diisi!', 'error'); return; }
 
  const payLabels = { cod: 'COD (Bayar di Tempat)', transfer: 'Transfer Bank', ewallet: 'E-Wallet' };
  const orderNum = 'MW-' + Date.now().toString().slice(-6);
  const total = getCartTotal();
  const items = cart.map(c => `${c.name} x${c.qty}`).join(', ');
 
  document.getElementById('order-detail').innerHTML = `
    <strong>No. Pesanan:</strong> ${orderNum}<br>
    <strong>Nama:</strong> ${name}<br>
    <strong>Alamat:</strong> ${address}<br>
    <strong>No. HP:</strong> ${phone}<br>
    <strong>Produk:</strong> ${items}<br>
    <strong>Pembayaran:</strong> ${payLabels[selectedPayment]}<br>
    <strong>Total:</strong> Rp ${total.toLocaleString('id-ID')}
  `;
 
  cart = [];
  saveCart();
  updateCartBadge();
 
  closeModal('checkout-modal');
  openModal('success-modal');
  launchConfetti();
}
 
function closeSuccess() {
  closeModal('success-modal');
  document.getElementById('confetti-wrap').innerHTML = '';
}
 
/* ====================================================
   CONFETTI
==================================================== */
function launchConfetti() {
  const colors = ['#6BAF92','#c9a84c','#e8cc7a','#a8d5bc','#ffffff','#2d5c47'];
  const wrap = document.getElementById('confetti-wrap');
  wrap.innerHTML = '';
  for (let i = 0; i < 80; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.cssText = `
      left: ${Math.random() * 100}%;
      top: -10px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      width: ${4 + Math.random() * 8}px;
      height: ${4 + Math.random() * 8}px;
      border-radius: ${Math.random() > .5 ? '50%' : '2px'};
      animation-delay: ${Math.random() * 1.5}s;
      animation-duration: ${2 + Math.random() * 2}s;
    `;
    wrap.appendChild(piece);
  }
  setTimeout(() => { wrap.innerHTML = ''; }, 5000);
}
 
/* ====================================================
   CONTACT
==================================================== */
function submitContact() {
  const name = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const msg = document.getElementById('contact-msg').value.trim();
  if (!name || !email || !msg) { showToast('⚠️ Semua field harus diisi!', 'error'); return; }
  document.getElementById('contact-name').value = '';
  document.getElementById('contact-email').value = '';
  document.getElementById('contact-msg').value = '';
  showToast('✉️ Pesan berhasil dikirim! Kami akan segera menghubungi Anda.', 'gold');
}
 
/* ====================================================
   TOAST NOTIFICATION
==================================================== */
function showToast(msg, type = '') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icons = { '': '🍵', 'error': '⚠️', 'gold': '✨' };
  toast.innerHTML = `<span class="toast-icon">${icons[type] || '🍵'}</span>${msg}`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}
 
/* ====================================================
   CLOSE MODAL ON OVERLAY CLICK
==================================================== */
document.querySelectorAll('.modal-overlay').forEach(el => {
  el.addEventListener('click', (e) => {
    if (e.target === el) el.classList.remove('open');
  });
});
 
/* ====================================================
   INIT
==================================================== */
// Reload cart badge and auth UI on page load
updateCartBadge();
updateAuthUI();