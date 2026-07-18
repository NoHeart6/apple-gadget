"use client";

import { useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  eyebrow: string;
  tagline: string;
  price: number;
  oldPrice?: number;
  monthly: string;
  image: string;
  category: string[];
  colors: string[];
  storage: string[];
  badge?: string;
  specs: string[];
  finish: string;
  condition: "Baru" | "Certified Pre-Owned";
  rating: number;
  reviews: number;
  stock: number;
  description: string;
};

type ModelBlueprint = Omit<Product, "id" | "name" | "price" | "oldPrice" | "monthly" | "storage" | "finish" | "stock" | "reviews"> & {
  model: string;
  variants: Array<{ storage: string; price: number; finish: string }>;
};

const modelBlueprints: ModelBlueprint[] = [
  { model:"iPhone 17 Pro Max", eyebrow:"Puncak teknologi iPhone", tagline:"Layar luas. Tenaga maksimal. Tanpa kompromi.", image:"https://www.apple.com/v/iphone/home/cj/images/overview/consider/innovation__fmir5mp9zpay_large.jpg", category:["Terbaru","Pro"], colors:["#e87543","#24334b","#d8d7d3"], badge:"Flagship", specs:["Chip A19 Pro","Pro Fusion Camera","ProMotion 120Hz"], condition:"Baru", rating:4.9, description:"Untuk kamu yang menginginkan pengalaman iPhone paling lengkap—layar lega, daya tahan baterai panjang, dan kamera profesional dalam satu perangkat.", variants:[{storage:"256 GB",price:25999000,finish:"Cosmic Orange"},{storage:"512 GB",price:29999000,finish:"Deep Blue"},{storage:"1 TB",price:35999000,finish:"Silver"}] },
  { model:"iPhone 17 Pro", eyebrow:"Dibuat untuk performa", tagline:"Pro di tangan. Ringan dalam gerakan.", image:"https://www.apple.com/v/iphone/home/cj/images/overview/consider/innovation__fmir5mp9zpay_large.jpg", category:["Terbaru","Pro"], colors:["#e87543","#24334b","#d8d7d3"], badge:"Paling diminati", specs:["Chip A19 Pro","Kamera 48MP Pro","Ceramic Shield 2"], condition:"Baru", rating:4.9, description:"Performa kelas pro dalam ukuran yang nyaman. Ideal untuk kreator, profesional, dan siapa pun yang tak mau menunggu perangkatnya mengejar ritme kerja.", variants:[{storage:"256 GB",price:22999000,finish:"Deep Blue"},{storage:"512 GB",price:26999000,finish:"Cosmic Orange"},{storage:"1 TB",price:32999000,finish:"Silver"}] },
  { model:"iPhone Air", eyebrow:"Tipis yang bertenaga", tagline:"Begitu ringan. Begitu serius performanya.", image:"https://www.apple.com/v/iphone/home/cj/images/overview/consider/environment__c8tpot4ti2qa_large.jpg", category:["Terbaru"], colors:["#b9d3df","#e6d6b7","#f0f0ec","#292a2d"], badge:"Desain terbaru", specs:["Titanium tipis","Chip A19 Pro","Kamera Fusion 48MP"], condition:"Baru", rating:4.8, description:"Desain paling tipis untuk gaya hidup yang terus bergerak. Nyaman dibawa, indah dilihat, dan tetap bertenaga untuk pekerjaan harian.", variants:[{storage:"256 GB",price:18999000,finish:"Sky Blue"},{storage:"512 GB",price:22999000,finish:"Light Gold"},{storage:"1 TB",price:28999000,finish:"Space Black"}] },
  { model:"iPhone 17", eyebrow:"Warna baru. Energi baru.", tagline:"Setiap hari terasa lebih lancar dan hidup.", image:"https://www.apple.com/v/iphone/home/cj/images/overview/consider_modals/camera/modal_stunning__bywf285rkqj6_large.jpg", category:["Terbaru"], colors:["#c8b9d8","#a8b6a0","#acc8d8","#f5f3ed","#272729"], badge:"Baru", specs:["Layar 6,3 inci","Chip A19","Dual Fusion 48MP"], condition:"Baru", rating:4.8, description:"Pilihan seimbang untuk foto, hiburan, dan produktivitas. Cepat saat dibutuhkan, intuitif sejak pertama digunakan, dan menawan dari segala sisi.", variants:[{storage:"256 GB",price:14999000,finish:"Lavender"},{storage:"512 GB",price:17999000,finish:"Mist Blue"},{storage:"512 GB",price:18499000,finish:"Sage"}] },
  { model:"iPhone 17e", eyebrow:"Semua yang penting", tagline:"Kemampuan hebat dengan harga yang lebih ringan.", image:"https://www.apple.com/v/iphone/home/cj/images/overview/consider_modals/environment/modal_trade_in__c2ltl61bs2eu_large.jpg", category:["Terbaru","Hemat"], colors:["#f2d8dd","#efefed","#262628"], badge:"Harga terbaik", specs:["Chip A19","Kamera Fusion","Apple Intelligence"], condition:"Baru", rating:4.7, description:"Cara paling cerdas memasuki generasi terbaru. Cepat, aman, dan siap menemani aktivitas penting tanpa membebani anggaran.", variants:[{storage:"128 GB",price:10999000,finish:"Soft Pink"},{storage:"256 GB",price:12999000,finish:"White"},{storage:"512 GB",price:15999000,finish:"Black"}] },
  { model:"iPhone 16 Pro Max", eyebrow:"Pro yang teruji", tagline:"Ruang lebih luas untuk ide yang lebih besar.", image:"https://www.apple.com/v/iphone/home/cj/images/overview/consider/designed-to_last__f60bwgep88ya_large.jpg", category:["Pro","Promo"], colors:["#c7b8a4","#262626","#e6e2dc"], badge:"Turun harga", specs:["Chip A18 Pro","Kamera Pro","Titanium"], condition:"Baru", rating:4.9, description:"Flagship yang tetap sangat relevan, kini dengan harga lebih menarik. Cocok untuk video, gaming, dan kerja intensif sepanjang hari.", variants:[{storage:"256 GB",price:19999000,finish:"Desert Titanium"},{storage:"512 GB",price:23999000,finish:"Black Titanium"},{storage:"1 TB",price:28999000,finish:"Natural Titanium"}] },
  { model:"iPhone 16", eyebrow:"Pilihan cerdas", tagline:"Andal untuk hari ini. Siap untuk esok.", image:"https://www.apple.com/v/iphone/home/cj/images/overview/consider/designed-to_last__f60bwgep88ya_large.jpg", category:["Promo","Hemat"], colors:["#5d7eb5","#559b9a","#e7a7bb","#efefed","#28282a"], badge:"Hemat hingga 2 juta", specs:["Chip A18","Camera Control","Tahan air IP68"], condition:"Baru", rating:4.8, description:"Keseimbangan matang antara desain, kamera, dan performa. Pilihan aman bagi pengguna yang ingin iPhone modern dengan nilai pembelian kuat.", variants:[{storage:"128 GB",price:11999000,finish:"Ultramarine"},{storage:"256 GB",price:13999000,finish:"Teal"},{storage:"512 GB",price:16999000,finish:"Pink"}] },
  { model:"iPhone 15 Pro", eyebrow:"Titanium. Tetap istimewa.", tagline:"Kelas pro dengan harga yang makin bersahabat.", image:"https://www.apple.com/v/iphone/home/cj/images/overview/consider/innovation__fmir5mp9zpay_large.jpg", category:["Pro","Promo"], colors:["#b7aea0","#29313a","#ecebe7"], badge:"Stok terbatas", specs:["Chip A17 Pro","Titanium","USB-C"], condition:"Certified Pre-Owned", rating:4.7, description:"Perangkat pilihan yang telah melewati pemeriksaan menyeluruh. Memberikan pengalaman pro dan desain titanium dengan pengeluaran lebih efisien.", variants:[{storage:"128 GB",price:11999000,finish:"Natural Titanium"},{storage:"256 GB",price:13499000,finish:"Blue Titanium"},{storage:"512 GB",price:15999000,finish:"White Titanium"}] },
  { model:"iPhone 14", eyebrow:"Favorit yang bertahan", tagline:"Sederhana, cepat, dan masih sangat relevan.", image:"https://www.apple.com/v/iphone/home/cj/images/overview/consider_modals/designed-to-last/modal_new__fejznl4gwymy_large.jpg", category:["Hemat","Promo"], colors:["#bbadd1","#aad1cf","#f0e9dc","#242426"], badge:"Pilihan hemat", specs:["Chip A15 Bionic","Kamera ganda","MagSafe"], condition:"Certified Pre-Owned", rating:4.6, description:"iPhone yang mudah direkomendasikan untuk komunikasi, media sosial, dan aktivitas harian—dengan standar kualitas yang telah diperiksa kembali.", variants:[{storage:"128 GB",price:7499000,finish:"Purple"},{storage:"256 GB",price:8499000,finish:"Blue"},{storage:"512 GB",price:9999000,finish:"Midnight"}] },
  { model:"iPhone 13", eyebrow:"Nilai terbaik", tagline:"Masih cepat. Kini jauh lebih terjangkau.", image:"https://www.apple.com/v/iphone/home/cj/images/overview/consider_modals/getting-started/modal_ease__ht7w9dw2rk2m_large.jpg", category:["Hemat"], colors:["#d7c2cb","#43636a","#e8e7e2","#1f2021"], badge:"Mulai 5 jutaan", specs:["Chip A15 Bionic","Layar OLED","5G"], condition:"Certified Pre-Owned", rating:4.6, description:"Pilihan masuk akal untuk pelajar, pengguna pertama iPhone, atau perangkat kedua. Tetap responsif, aman, dan mendapat dukungan ekosistem Apple.", variants:[{storage:"128 GB",price:5499000,finish:"Midnight"},{storage:"256 GB",price:6499000,finish:"Pink"},{storage:"512 GB",price:7999000,finish:"Starlight"}] },
];

const products: Product[] = modelBlueprints.flatMap((model, modelIndex) =>
  model.variants.map((variant, variantIndex) => ({
    ...model,
    id: modelIndex * 3 + variantIndex + 1,
    name: `${model.model} · ${variant.storage}`,
    price: variant.price,
    oldPrice: model.category.includes("Promo") || model.condition === "Certified Pre-Owned" ? variant.price + (model.condition === "Certified Pre-Owned" ? 1500000 : 2000000) : undefined,
    monthly: `Rp${new Intl.NumberFormat("id-ID").format(Math.ceil(variant.price / 24))}/bln`,
    storage: [variant.storage],
    finish: variant.finish,
    stock: 3 + ((modelIndex + variantIndex) % 9),
    reviews: 47 + modelIndex * 31 + variantIndex * 18,
  }))
);

const rupiah = (value: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);

export default function Home() {
  const [category, setCategory] = useState("Semua");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutDone, setCheckoutDone] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [toast, setToast] = useState("");
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  const filtered = useMemo(() => products.filter((product) => {
    const matchesCategory = category === "Semua" || product.category.includes(category);
    const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  }), [category, query]);

  const cartItems = products.filter((product) => cart[product.id]);
  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const subtotal = cartItems.reduce((sum, product) => sum + product.price * cart[product.id], 0);

  function addToCart(product: Product) {
    setCart((current) => ({ ...current, [product.id]: (current[product.id] || 0) + 1 }));
    setToast(`${product.name} ditambahkan ke tas`);
    setQuickView(null);
    window.setTimeout(() => setToast(""), 2400);
  }

  function updateQty(id: number, delta: number) {
    setCart((current) => {
      const next = Math.max(0, (current[id] || 0) + delta);
      const updated = { ...current, [id]: next };
      if (!next) delete updated[id];
      return updated;
    });
  }

  return (
    <main>
      <div className="topbar">Gratis pengiriman se-Indonesia • Garansi resmi • Cicilan hingga 24 bulan</div>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Apple Gadget beranda"><span className="brand-mark">A</span><span>apple gadget</span></a>
        <nav className="nav-links" aria-label="Navigasi utama">
          <a href="#shop">Belanja iPhone</a>
          <a href="#services">Layanan</a>
          <a href="#trade-in">Trade In</a>
          <a href="#faq">Bantuan</a>
        </nav>
        <div className="header-actions">
          <button className="icon-button" onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })} aria-label="Cari produk">⌕</button>
          <button className="cart-button" onClick={() => setCartOpen(true)} aria-label={`Tas belanja berisi ${cartCount} produk`}>
            <span>Tas</span><b>{cartCount}</b>
          </button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="kicker"><span></span> Generasi terbaru telah hadir</p>
          <h1>Temukan iPhone<br />yang terasa <em>kamu.</em></h1>
          <p className="hero-lead">Teknologi terbaik, layanan yang benar-benar personal, dan ketenangan sejak memilih hingga perangkat tiba di tanganmu.</p>
          <div className="hero-actions">
            <a className="button primary" href="#shop">Lihat koleksi <span>→</span></a>
            <button className="button secondary" onClick={() => setServiceOpen(true)}>Konsultasi gratis</button>
          </div>
          <div className="hero-trust">
            <div><b>100%</b><span>Produk original</span></div>
            <div><b>24 bln</b><span>Cicilan ringan</span></div>
            <div><b>4.9/5</b><span>Ulasan pelanggan</span></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-orb"></div>
          <img src="https://www.apple.com/v/iphone/home/cj/images/overview/guided-tour/guided_tour__e70yvshmbb2i_large.jpg" alt="iPhone 17 Pro dan iPhone Air, gambar resmi Apple" />
          <div className="floating-card floating-top"><span className="pulse"></span><div><small>Stok siap kirim</small><strong>iPhone 17 Series</strong></div></div>
          <div className="floating-card floating-bottom"><span className="mini-icon">✓</span><div><small>Jaminan kami</small><strong>Garansi resmi</strong></div></div>
        </div>
      </section>

      <section className="ticker" aria-label="Keunggulan Apple Gadget">
        <div><span>✦</span> Original & bergaransi <span>✦</span> Pengiriman aman <span>✦</span> Bantuan setup gratis <span>✦</span> Trade in mudah <span>✦</span> Cicilan 0%</div>
      </section>

      <section className="shop-section" id="shop">
        <div className="section-heading">
          <div><p className="section-label">30 pilihan. Satu standar kualitas.</p><h2>Temukan yang pas.<br /><span>Bukan sekadar yang mahal.</span></h2></div>
          <p>Dari flagship terbaru sampai perangkat certified yang terjangkau—setiap pilihan disusun untuk kebutuhan dan anggaran yang berbeda.</p>
        </div>
        <div className="shop-controls">
          <div className="filter-pills">
            {["Semua", "Terbaru", "Pro", "Promo", "Hemat"].map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}
          </div>
          <label className="search-box"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari model iPhone" aria-label="Cari model iPhone" /></label>
        </div>
        <div className="product-grid">
          {filtered.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image-wrap">
                {product.badge && <span className="product-badge">{product.badge}</span>}
                <img src={product.image} alt={`${product.name}, gambar resmi Apple`} />
                <button className="quick-button" onClick={() => setQuickView(product)} aria-label={`Lihat detail ${product.name}`}>＋</button>
              </div>
              <div className="product-body">
                <div className="product-meta"><p className="product-eyebrow">{product.eyebrow}</p><span>{product.condition}</span></div>
                <h3>{product.name}</h3>
                <p className="product-tagline">{product.tagline}</p>
                <div className="color-dots" aria-label="Pilihan warna">{product.colors.map((color, index) => <i key={color} style={{ background: color }} title={`Warna ${index + 1}`}></i>)}<small>{product.finish} · stok {product.stock}</small></div>
                <div className="price-row"><div>{product.oldPrice && <del>{rupiah(product.oldPrice)}</del>}<strong>Mulai {rupiah(product.price)}</strong><small>atau {product.monthly} selama 24 bulan</small></div><button onClick={() => addToCart(product)}>Beli</button></div>
              </div>
            </article>
          ))}
        </div>
        {!filtered.length && <div className="empty-state"><b>Produk tidak ditemukan.</b><span>Coba kata kunci atau kategori lain.</span></div>}
      </section>

      <section className="services" id="services">
        <div className="section-heading compact"><div><p className="section-label">Lebih dari sekadar toko</p><h2>Dilayani seperti<br /><span>seharusnya.</span></h2></div><p>Kami menemani dari pertanyaan pertama sampai iPhone-mu siap digunakan.</p></div>
        <div className="service-grid">
          <article className="service-card dark-card"><span className="service-number">01</span><div className="service-symbol">✦</div><h3>Konsultasi personal</h3><p>Ceritakan kebutuhanmu. Specialist kami membantu memilih model yang benar-benar pas.</p><button onClick={() => setServiceOpen(true)}>Mulai konsultasi <span>↗</span></button></article>
          <article className="service-card"><span className="service-number">02</span><div className="service-symbol">↺</div><h3>Trade In mudah</h3><p>Tukar perangkat lama, dapatkan estimasi transparan, dan bayar lebih ringan.</p><a href="#trade-in">Cek estimasi <span>↗</span></a></article>
          <article className="service-card"><span className="service-number">03</span><div className="service-symbol">◇</div><h3>Setup & transfer data</h3><p>Kami bantu aktivasi, transfer data, dan pengaturan awal tanpa biaya tambahan.</p><button onClick={() => setServiceOpen(true)}>Pesan bantuan <span>↗</span></button></article>
          <article className="service-card accent-card"><span className="service-number">04</span><div className="service-symbol">✓</div><h3>Garansi & purnajual</h3><p>Butuh bantuan setelah pembelian? Tim kami tetap ada untukmu.</p><button onClick={() => setServiceOpen(true)}>Hubungi support <span>↗</span></button></article>
        </div>
      </section>

      <section className="tradein-section" id="trade-in">
        <div className="tradein-image"><img src="https://www.apple.com/v/iphone/home/cj/images/overview/consider_modals/environment/modal_trade_in__c2ltl61bs2eu_large.jpg" alt="Program tukar tambah iPhone, gambar resmi Apple" /></div>
        <div className="tradein-copy"><p className="section-label">Apple Gadget Trade In</p><h2>iPhone lama punya<br />nilai lebih.</h2><p>Tukar perangkat lama dan gunakan nilainya untuk membeli iPhone baru. Proses sederhana, penilaian transparan, tanpa tekanan.</p><div className="steps"><div><b>1</b><span><strong>Ceritakan perangkatmu</strong><small>Model, kapasitas, dan kondisi</small></span></div><div><b>2</b><span><strong>Dapatkan estimasi</strong><small>Harga transparan dari specialist</small></span></div><div><b>3</b><span><strong>Upgrade lebih hemat</strong><small>Nilai langsung memotong total belanja</small></span></div></div><button className="button light" onClick={() => setServiceOpen(true)}>Dapatkan estimasi <span>→</span></button></div>
      </section>

      <section className="faq-section" id="faq">
        <div><p className="section-label">Ada yang ingin ditanyakan?</p><h2>Jawaban yang<br /><span>kamu butuhkan.</span></h2><p className="faq-intro">Belum menemukan jawaban? Specialist Apple Gadget siap membantu.</p><button className="button primary" onClick={() => setServiceOpen(true)}>Tanya specialist</button></div>
        <div className="faq-list">
          {[
            ["Apakah semua iPhone di Apple Gadget original?", "Ya. Setiap perangkat dijamin original, memiliki nomor seri yang dapat diverifikasi, dan dilengkapi perlindungan garansi sesuai produk."],
            ["Apakah bisa cicilan tanpa kartu kredit?", "Tersedia pilihan pembayaran bertahap melalui mitra paylater pada halaman checkout, mengikuti persetujuan dan ketentuan mitra."],
            ["Berapa lama proses pengiriman?", "Pesanan diproses maksimal 1×24 jam. Estimasi tiba 1–3 hari kerja untuk Jawa dan 2–6 hari kerja untuk wilayah lain."],
            ["Bagaimana proses klaim garansi?", "Hubungi tim purnajual dengan nomor pesanan. Kami akan membantu pengecekan awal dan mengarahkan proses layanan hingga selesai."],
          ].map(([question, answer], index) => <article className={`faq-item ${faqOpen === index ? "open" : ""}`} key={question}><button onClick={() => setFaqOpen(faqOpen === index ? null : index)}><span>{question}</span><b>{faqOpen === index ? "−" : "+"}</b></button><div><p>{answer}</p></div></article>)}
        </div>
      </section>

      <footer>
        <div className="footer-top"><div><a className="brand footer-brand" href="#top"><span className="brand-mark">A</span><span>apple gadget</span></a><p>Perangkat hebat. Pelayanan hangat.<br />Pengalaman belanja yang tenang.</p></div><div><h4>Belanja</h4><a href="#shop">Semua iPhone</a><a href="#shop">Model terbaru</a><a href="#trade-in">Trade In</a><a href="#shop">Promo</a></div><div><h4>Layanan</h4><button onClick={() => setServiceOpen(true)}>Konsultasi</button><button onClick={() => setServiceOpen(true)}>Bantuan setup</button><button onClick={() => setServiceOpen(true)}>Garansi</button><button onClick={() => setServiceOpen(true)}>Lacak pesanan</button></div><div><h4>Ikuti kabar terbaru</h4><p>Dapatkan info peluncuran, promo, dan tips pilihan.</p><form className="newsletter" onSubmit={(e) => { e.preventDefault(); setToast("Terima kasih! Kamu sudah terdaftar."); window.setTimeout(() => setToast(""), 2400); }}><input required type="email" placeholder="Alamat email" aria-label="Alamat email" /><button aria-label="Daftar newsletter">→</button></form></div></div>
        <div className="footer-bottom"><span>© 2026 Apple Gadget. All rights reserved.</span><span>Apple Gadget adalah toko independen dan bukan afiliasi Apple Inc.</span><div><a href="#">Privasi</a><a href="#">Syarat</a></div></div>
      </footer>

      {toast && <div className="toast"><span>✓</span>{toast}</div>}

      <div className={`drawer-backdrop ${cartOpen ? "show" : ""}`} onClick={() => setCartOpen(false)}></div>
      <aside className={`cart-drawer ${cartOpen ? "open" : ""}`} aria-hidden={!cartOpen}>
        <div className="drawer-head"><div><p>Tas belanja</p><h2>{cartCount ? `${cartCount} produk pilihan` : "Tasmu masih kosong"}</h2></div><button onClick={() => setCartOpen(false)} aria-label="Tutup tas">×</button></div>
        <div className="drawer-body">
          {!cartItems.length && <div className="cart-empty"><span>◇</span><h3>Temukan iPhone untukmu.</h3><p>Pilihan terbaik menunggu untuk dibawa pulang.</p><button className="button primary" onClick={() => { setCartOpen(false); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }}>Mulai belanja</button></div>}
          {cartItems.map((product) => <article className="cart-item" key={product.id}><img src={product.image} alt={product.name} /><div><h3>{product.name}</h3><p>{product.finish} • {product.condition}</p><strong>{rupiah(product.price)}</strong><div className="qty"><button onClick={() => updateQty(product.id, -1)}>−</button><span>{cart[product.id]}</span><button onClick={() => updateQty(product.id, 1)}>+</button></div></div></article>)}
        </div>
        {!!cartItems.length && <div className="drawer-foot"><div><span>Subtotal</span><strong>{rupiah(subtotal)}</strong></div><p>Gratis pengiriman. Pajak sudah termasuk.</p><button className="button primary full" onClick={() => { setCartOpen(false); setCheckoutOpen(true); }}>Lanjut checkout <span>→</span></button><button className="continue" onClick={() => setCartOpen(false)}>Lanjut belanja</button></div>}
      </aside>

      {quickView && <div className="modal-backdrop product-detail-backdrop" onClick={() => setQuickView(null)}><section className="quick-modal product-detail" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setQuickView(null)} aria-label="Tutup detail produk">×</button>
        <div className="quick-image">
          <div className="detail-breadcrumb">Koleksi / {quickView.condition} / <b>{quickView.name}</b></div>
          <img src={quickView.image} alt={quickView.name} />
          <div className="image-caption"><span>Gambar resmi Apple</span><span>Geser untuk melihat detail</span></div>
        </div>
        <div className="quick-copy">
          <div className="detail-topline"><span>{quickView.badge || "Pilihan Apple Gadget"}</span><span className="detail-rating">★ {quickView.rating} <small>({quickView.reviews} ulasan)</small></span></div>
          <p className="product-eyebrow">{quickView.eyebrow}</p>
          <h2>{quickView.name}</h2>
          <p className="detail-tagline">{quickView.tagline}</p>
          <p className="detail-description">{quickView.description}</p>
          <div className="detail-price-block">{quickView.oldPrice && <del>{rupiah(quickView.oldPrice)}</del>}<strong>{rupiah(quickView.price)}</strong><span>atau <b>{quickView.monthly}</b> selama 24 bulan</span></div>
          <div className="detail-divider"></div>
          <div className="detail-choice-head"><label>Konfigurasi pilihan</label><span>Stok tersedia: {quickView.stock} unit</span></div>
          <div className="detail-selection">
            <button className="selected-option"><small>KAPASITAS</small><b>{quickView.storage[0]}</b></button>
            <button className="selected-option"><small>WARNA</small><b>{quickView.finish}</b></button>
          </div>
          <ul className="detail-specs">{quickView.specs.map((spec) => <li key={spec}><span>✓</span><b>{spec}</b></li>)}</ul>
          <div className="purchase-perks"><div><span>◇</span><p><b>Gratis pengiriman aman</b><small>Asuransi paket sudah termasuk</small></p></div><div><span>↺</span><p><b>Bantuan setup personal</b><small>Transfer data tanpa biaya</small></p></div><div><span>✓</span><p><b>Garansi terjamin</b><small>Dibantu sampai selesai</small></p></div></div>
          <button className="detail-buy-button" onClick={() => addToCart(quickView)}><span>Tambahkan ke tas</span><b>{rupiah(quickView.price)} →</b></button>
          <p className="detail-note">Butuh kepastian sebelum membeli? <button onClick={() => { setQuickView(null); setServiceOpen(true); }}>Bicara dengan specialist</button></p>
        </div>
      </section></div>}

      {serviceOpen && <div className="modal-backdrop" onClick={() => setServiceOpen(false)}><section className="service-modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setServiceOpen(false)}>×</button><p className="section-label">Apple Gadget Specialist</p><h2>Ada yang bisa<br />kami bantu?</h2><p>Ceritakan kebutuhanmu. Kami akan menghubungi kembali dan membantu tanpa memaksa.</p><form onSubmit={(e) => { e.preventDefault(); setServiceOpen(false); setToast("Permintaanmu sudah diterima. Specialist kami akan menghubungi kamu."); window.setTimeout(() => setToast(""), 3500); }}><label>Nama lengkap<input required placeholder="Nama kamu" /></label><label>Nomor WhatsApp<input required type="tel" placeholder="08xxxxxxxxxx" /></label><label>Saya perlu bantuan<select><option>Memilih iPhone</option><option>Trade In</option><option>Setup & transfer data</option><option>Garansi dan purnajual</option><option>Lacak pesanan</option></select></label><button className="button primary full">Minta dihubungi <span>→</span></button></form><small>Dengan mengirim, kamu menyetujui dihubungi oleh tim Apple Gadget.</small></section></div>}

      {checkoutOpen && <div className="modal-backdrop checkout-layer"><section className="checkout-modal">{!checkoutDone ? <><div className="checkout-head"><a className="brand"><span className="brand-mark">A</span><span>apple gadget</span></a><button onClick={() => setCheckoutOpen(false)}>×</button></div><div className="checkout-layout"><form onSubmit={(e) => { e.preventDefault(); setOrderNumber(`AG-2026-${String(Date.now()).slice(-5)}`); setCheckoutDone(true); }}><p className="section-label">Checkout aman</p><h2>Selesaikan pesanan</h2><div className="form-grid"><label className="wide">Nama lengkap<input required placeholder="Nama penerima" /></label><label className="wide">Nomor WhatsApp<input required type="tel" placeholder="08xxxxxxxxxx" /></label><label className="wide">Alamat lengkap<textarea required placeholder="Nama jalan, nomor rumah, RT/RW" /></label><label>Kota / Kabupaten<input required placeholder="Contoh: Jepara" /></label><label>Kode pos<input required inputMode="numeric" placeholder="59400" /></label></div><h3 className="form-title">Metode pembayaran</h3><label className="payment-choice"><input required name="payment" type="radio" defaultChecked /><span><b>Transfer bank / Virtual Account</b><small>BCA, BNI, BRI, Mandiri</small></span><strong>○</strong></label><label className="payment-choice"><input name="payment" type="radio" /><span><b>E-Wallet & QRIS</b><small>GoPay, ShopeePay, DANA</small></span><strong>○</strong></label><label className="payment-choice"><input name="payment" type="radio" /><span><b>Cicilan</b><small>Hingga 24 bulan melalui mitra</small></span><strong>○</strong></label><button className="button primary full checkout-submit">Buat pesanan • {rupiah(subtotal)}</button><p className="secure-note">⌾ Transaksi dilindungi enkripsi dan verifikasi pembayaran.</p></form><aside className="order-summary"><p>Ringkasan pesanan</p>{cartItems.map((product) => <div className="summary-item" key={product.id}><img src={product.image} alt="" /><span><b>{product.name}</b><small>{product.finish} • Qty {cart[product.id]}</small></span><strong>{rupiah(product.price * cart[product.id])}</strong></div>)}<div className="summary-lines"><span>Subtotal <b>{rupiah(subtotal)}</b></span><span>Pengiriman <b>Gratis</b></span><span>Perlindungan pengiriman <b>Termasuk</b></span></div><div className="summary-total"><span>Total</span><strong>{rupiah(subtotal)}</strong></div></aside></div></> : <div className="checkout-success"><span>✓</span><p className="section-label">Pesanan berhasil dibuat</p><h2>Terima kasih.</h2><p>Nomor pesanan <b>{orderNumber}</b> sudah tercatat. Instruksi pembayaran akan dikirim ke WhatsApp.</p><button className="button primary" onClick={() => { setCheckoutOpen(false); setCheckoutDone(false); setCart({}); }}>Kembali ke beranda</button></div>}</section></div>}
    </main>
  );
}
