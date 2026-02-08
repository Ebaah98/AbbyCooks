"use client";

import React, { useState, useEffect } from 'react';
import MenuPage from '../components/MenuPage';
// In Next.js, we don't need to import images like this if we use public folder, 
// but the current code uses them as variables. I'll keep them as variables but point to public paths.
// Actually, I can just use the paths directly in the code since they are in public.

const logo = "/logo.png";
const menu_flyer = "/menu_flyer.jpg";
const hero_1 = "/hero_1.jpg";
const hero_2 = "/hero_2.jpg";
const food_01 = "/food_01.jpg";
const food_16 = "/food_16.jpg";
const food_09 = "/food_09.jpg";
const food_08 = "/food_08.jpg";
const food_05 = "/food_05.jpg";
const food_06 = "/food_06.jpg";
const food_14 = "/food_14.jpg";
const food_04 = "/food_04.jpg";
const food_07 = "/food_07.jpg";
const food_11 = "/food_11.jpg";
const food_01_alt = "/food_01.jpg"; // reuse
const food_12 = "/food_12.jpg";
const food_02 = "/food_02.jpg";
const food_03 = "/food_03.jpg";
const drinks_hero = "/drinks_hero.png";

const ASSETS = {
    "./assets/logo.png": "/logo.png",
    "./assets/menu_flyer.jpg": "/menu_flyer.jpg",
    "./assets/hero_1.jpg": "/hero_1.jpg",
    "./assets/hero_2.jpg": "/hero_2.jpg",
    "./assets/food_01.jpg": "/food_01.jpg",
    "./assets/food_02.jpg": "/food_02.jpg",
    "./assets/food_03.jpg": "/food_03.jpg",
    "./assets/food_04.jpg": "/food_04.jpg",
    "./assets/food_05.jpg": "/food_05.jpg",
    "./assets/food_06.jpg": "/food_06.jpg",
    "./assets/food_07.jpg": "/food_07.jpg",
    "./assets/food_08.jpg": "/food_08.jpg",
    "./assets/food_09.jpg": "/food_09.jpg",
    "./assets/drinks_hero.png": "/drinks_hero.png",
    "./assets/food_10.jpg": "/food_10.jpg",
    "./assets/food_11.jpg": "/food_11.jpg",
    "./assets/food_12.jpg": "/food_12.jpg",
    "./assets/food_13.jpg": "/food_13.jpg",
    "./assets/food_14.jpg": "/food_14.jpg",
    "./assets/food_15.jpg": "/food_15.jpg",
    "./assets/food_16.jpg": "/food_16.jpg",
    "./assets/thumb_01.jpg": "/thumb_01.jpg",
    "./assets/thumb_02.jpg": "/thumb_02.jpg",
    "./assets/thumb_03.jpg": "/thumb_03.jpg",
    "./assets/thumb_04.jpg": "/thumb_04.jpg",
    "./assets/thumb_05.jpg": "/thumb_05.jpg",
    "./assets/thumb_06.jpg": "/thumb_06.jpg",
    "./assets/thumb_07.jpg": "/thumb_07.jpg",
    "./assets/thumb_08.jpg": "/thumb_08.jpg",
    "./assets/thumb_09.jpg": "/thumb_09.jpg",
    "./assets/thumb_10.jpg": "/thumb_10.jpg",
    "./assets/thumb_11.jpg": "/thumb_11.jpg",
    "./assets/thumb_12.jpg": "/thumb_12.jpg",
    "./assets/thumb_13.jpg": "/thumb_13.jpg",
    "./assets/thumb_14.jpg": "/thumb_14.jpg",
    "./assets/thumb_15.jpg": "/thumb_15.jpg",
    "./assets/thumb_16.jpg": "/thumb_16.jpg",
};

const SITE_DATA = {
    "gallery": [
        { "src": "./assets/menu_flyer.jpg", "alt": "Abby Kookz Full Catering Menu" },
        { "src": "./assets/food_01.jpg", "alt": "Abby Kookz dish 1" },
        { "src": "./assets/food_02.jpg", "alt": "Abby Kookz dish 2" },
        { "src": "./assets/food_03.jpg", "alt": "Abby Kookz dish 3" },
        { "src": "./assets/food_04.jpg", "alt": "Abby Kookz dish 4" },
        { "src": "./assets/food_05.jpg", "alt": "Abby Kookz dish 5" },
        { "src": "./assets/food_06.jpg", "alt": "Abby Kookz dish 6" },
        { "src": "./assets/food_07.jpg", "alt": "Abby Kookz dish 7" },
        { "src": "./assets/food_08.jpg", "alt": "Abby Kookz dish 8" },
        { "src": "./assets/food_09.jpg", "alt": "Abby Kookz dish 9" },
        { "src": "./assets/food_10.jpg", "alt": "Abby Kookz dish 10" },
        { "src": "./assets/food_11.jpg", "alt": "Abby Kookz dish 11" },
        { "src": "./assets/food_12.jpg", "alt": "Abby Kookz dish 12" },
        { "src": "./assets/food_13.jpg", "alt": "Abby Kookz dish 13" },
        { "src": "./assets/food_14.jpg", "alt": "Abby Kookz dish 14" },
        { "src": "./assets/food_15.jpg", "alt": "Abby Kookz dish 15" },
        { "src": "./assets/food_16.jpg", "alt": "Abby Kookz dish 16" }
    ],
    "thumbs": [
        { "src": "./assets/menu_flyer.jpg", "full": "./assets/menu_flyer.jpg", "alt": "Abby Kookz Full Catering Menu" },
        { "src": "./assets/thumb_01.jpg", "full": "./assets/food_01.jpg", "alt": "Abby Kookz dish 1" },
        { "src": "./assets/thumb_02.jpg", "full": "./assets/food_02.jpg", "alt": "Abby Kookz dish 2" },
        { "src": "./assets/thumb_03.jpg", "full": "./assets/food_03.jpg", "alt": "Abby Kookz dish 3" },
        { "src": "./assets/thumb_04.jpg", "full": "./assets/food_04.jpg", "alt": "Abby Kookz dish 4" },
        { "src": "./assets/thumb_05.jpg", "full": "./assets/food_05.jpg", "alt": "Abby Kookz dish 5" },
        { "src": "./assets/thumb_06.jpg", "full": "./assets/food_06.jpg", "alt": "Abby Kookz dish 6" },
        { "src": "./assets/thumb_07.jpg", "full": "./assets/food_07.jpg", "alt": "Abby Kookz dish 7" },
        { "src": "./assets/thumb_08.jpg", "full": "./assets/food_08.jpg", "alt": "Abby Kookz dish 8" },
        { "src": "./assets/thumb_09.jpg", "full": "./assets/food_09.jpg", "alt": "Abby Kookz dish 9" },
        { "src": "./assets/thumb_10.jpg", "full": "./assets/food_10.jpg", "alt": "Abby Kookz dish 10" },
        { "src": "./assets/thumb_11.jpg", "full": "./assets/food_11.jpg", "alt": "Abby Kookz dish 11" },
        { "src": "./assets/thumb_12.jpg", "full": "./assets/food_12.jpg", "alt": "Abby Kookz dish 12" },
        { "src": "./assets/thumb_13.jpg", "full": "./assets/food_13.jpg", "alt": "Abby Kookz dish 13" },
        { "src": "./assets/thumb_14.jpg", "full": "./assets/food_14.jpg", "alt": "Abby Kookz dish 14" },
        { "src": "./assets/thumb_15.jpg", "full": "./assets/food_15.jpg", "alt": "Abby Kookz dish 15" },
        { "src": "./assets/thumb_16.jpg", "full": "./assets/food_16.jpg", "alt": "Abby Kookz dish 16" }
    ],
    "menu_sections": [
        {
            "id": "rice",
            "title": "Rice Dishes",
            "image": "./assets/food_09.jpg",
            "items": [
                { "name": "Ghana Jollof", "popular": true, "desc": "Smoky tomato rice. $18 plain / $22 with protein.", "tags": ["$18+"], "addons": ["Chicken", "Beef", "Turkey", "Goat Meat", "Big Fish"], "img": "./assets/food_09.jpg" },
                { "name": "Fried Rice", "desc": "Classic party-style. $17 plain / $21 with protein.", "tags": ["$17+"], "addons": ["Chicken", "Beef", "Turkey", "Big Fish"], "img": "./assets/food_16.jpg" },
                { "name": "Anwa Mo (Oil Rice)", "desc": "Includes eggs & pepper. $18 base / $5 extra protein.", "tags": ["$18"], "addons": ["Beef", "Goat Meat", "Big Fish"], "img": "./assets/food_07.jpg" }
            ]
        },
        {
            "id": "swallows",
            "title": "Swallows & Soups",
            "image": "./assets/food_05.jpg",
            "items": [
                { "name": "Tuo Zaafi (TZ)", "popular": true, "desc": "Served with Green Soup. Beef, Goat, Wele or Fish.", "tags": ["$20"], "addons": ["Extra soup", "Extra protein"], "img": "./assets/food_08.jpg" },
                { "name": "Banku + Okra Soup", "desc": "Rich okra soup with your choice of protein.", "tags": ["$19"], "addons": ["Extra okra", "Extra protein"], "img": "./assets/food_05.jpg" },
                { "name": "Banku + Pepper + Fish", "desc": "Soft banku with Big Fish or Tilapia.", "tags": ["$22"], "addons": ["Extra pepper", "Extra fish"], "img": "./assets/food_06.jpg" },
                { "name": "Fufu + Soup", "desc": "Choose your soup (Light, Palm, Groundnut, etc).", "tags": ["$20"], "addons": ["Extra soup", "Extra protein"], "img": "./assets/food_14.jpg" }
            ]
        },
        {
            "id": "sides",
            "title": "Proteins & Sides",
            "image": "./assets/food_03.jpg",
            "items": [
                { "name": "Fried Chicken", "popular": true, "desc": "Crispy seasoned pieces. 3, 5, or 6 pcs available.", "tags": ["$8+"], "addons": ["3 / 5 / 6 pieces"], "img": "./assets/food_04.jpg" },
                { "name": "Fried Plantains", "desc": "Sweet golden plantains. 6, 10, or 15 pcs.", "tags": ["$5+"], "addons": ["6 / 10 / 15 pieces"], "img": "./assets/food_11.jpg" },
                { "name": "Suya (Spiced Skewers)", "popular": true, "desc": "Beef or Chicken skewers with extra spice option.", "tags": ["$6"], "addons": ["Beef", "Chicken", "Extra spice"], "img": "./assets/food_01.jpg" }
            ]
        },
        {
            "id": "drinks",
            "title": "Extras & Drinks",
            "image": "./assets/drinks_hero.png",
            "items": [
                { "name": "Shito", "desc": "Signature Ghana black pepper sauce. Mild or Hot.", "tags": ["$2+"], "addons": ["S / M / L"], "img": "./assets/food_12.jpg" },
                { "name": "Ghana Salad", "desc": "Fresh mixed salad, the perfect jollof companion.", "tags": ["$4+"], "addons": ["S / L"], "img": "./assets/food_02.jpg" },
                { "name": "Mashed Kenkey (Drink)", "desc": "Refreshing chilled drink. 12oz, 16oz, or 24oz.", "tags": ["$6+"], "addons": ["Ice / No Ice"], "img": "./assets/food_03.jpg" }
            ]
        }
    ],
    "instagram": { "handle": "abbykookz_", "url": "https://www.instagram.com/abbykookz_/" }
};

const REVIEWS_DATA = [
    { id: 1, name: "Sarah K.", rating: 5, text: "The Tuo Zaafi was incredible! Tasted just like home. Highly recommend for any Ghanaian event.", date: "Jan 2026" },
    { id: 2, name: "David O.", rating: 5, text: "Best Jollof in the Bronx. The smoky flavor is perfect. My guests couldn't stop talking about it.", date: "Dec 2025" },
    { id: 3, name: "Patricia M.", rating: 4, text: "Abby is so professional and the food arrived hot and fresh. Very happy with the service!", date: "Jan 2026" }
];

export default function Home() {
    const [lightbox, setLightbox] = useState({ open: false, src: '', alt: '' });
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'menu'
    const [reviewRating, setReviewRating] = useState(5);
    const [reviewSubmitted, setReviewSubmitted] = useState(false);
    const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
    const [customFormState, setCustomFormState] = useState({ submitting: false, success: false });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('payment') === 'success') {
            setIsPaymentSuccess(true);
            // Clean up the URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, []);

    const openLightbox = (src, alt) => {
        setLightbox({ open: true, src: ASSETS[src] || src, alt });
    };

    const closeLightbox = () => {
        setLightbox({ open: false, src: '', alt: '' });
    };

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') closeLightbox();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    const filteredMenu = SITE_DATA.menu_sections.map(section => ({
        ...section,
        items: section.items.filter(item => {
            const blob = [item.name, item.desc, ...(item.tags || []), ...(item.addons || [])].join(' ').toLowerCase();
            return searchQuery === '' || blob.includes(searchQuery.toLowerCase());
        })
    })).filter(section => section.items.length > 0);

    if (isPaymentSuccess) {
        return (
            <div className="app-root">
                <header className="nav">
                    <div className="container nav-inner">
                        <a className="brand" href="#" onClick={(e) => { e.preventDefault(); setIsPaymentSuccess(false); setCurrentPage('home'); }}>
                            <img src={logo} alt="Abby Kookz logo" />
                            <div>
                                <div className="name">Abby Kookz</div>
                                <div className="sub">Catering & Delivery • Party Trays</div>
                            </div>
                        </a>
                    </div>
                </header>

                <main className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    <div className="container" style={{ maxWidth: '600px' }}>
                        <div style={{ fontSize: '64px', marginBottom: '24px' }}>✅</div>
                        <h1 className="h2">Payment Successful</h1>
                        <p className="lead" style={{ marginBottom: '32px' }}>
                            Your order has been received and sent to Abby.<br />
                            We’ll contact you shortly to confirm pickup or delivery details.
                        </p>
                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                            <button className="btn primary" onClick={() => { setIsPaymentSuccess(false); setCurrentPage('menu'); }}>Back to Menu</button>
                            <a className="btn ghost" href="#contact" onClick={() => { setIsPaymentSuccess(false); setCurrentPage('home'); setTimeout(() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }}>Contact Abby</a>
                        </div>
                    </div>
                </main>

                <footer className="footer">
                    <div className="container">
                        <div className="footer-bottom">
                            <div>© 2026 Abby Kookz. All rights reserved.</div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }

    // Render Menu Page if currentPage is 'menu'
    if (currentPage === 'menu') {
        return (
            <div className="app-root">
                <header className="nav">
                    <div className="container nav-inner">
                        <a className="brand" href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}>
                            <img src={logo} alt="Abby Kookz logo" />
                            <div>
                                <div className="name">Abby Kookz</div>
                                <div className="sub">Catering & Delivery • Party Trays</div>
                            </div>
                        </a>

                        <nav className="nav-links">
                            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}>Home</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('menu'); }} className="active">Order Now</a>
                        </nav>

                    </div>
                </header>
                <MenuPage />
            </div>
        );
    }

    // Default: Render Home Page
    return (
        <div className="app-root">
            <header className="nav">
                <div className="container nav-inner">
                    <a className="brand" href="#top">
                        <img src={logo} alt="Abby Kookz logo" />
                        <div>
                            <div className="name">Abby Kookz</div>
                            <div className="sub">Catering & Delivery • Party Trays</div>
                        </div>
                    </a>

                    <nav className="nav-links">
                        <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('menu'); }}>Order Now</a>
                        <a href="#custom-request">Custom Request</a>
                        <a href="#contact">Contact</a>
                    </nav>

                </div>
            </header>

            <main id="top" className="hero">
                <div className="container">
                    <div className="hero-grid">
                        <section className="hero-copy animate-fade-in">
                            <span className="kicker">Modern Ghanaian Catering & Delivery</span>
                            <h1 className="h1">Freshly prepared Ghanaian meals for parties, events, and family gatherings.</h1>
                            <p className="subtext">
                                <strong>Pickup & delivery available. Party trays available on select items.</strong>
                            </p>

                            <div className="hero-ctas">
                                <button className="btn primary" onClick={() => setCurrentPage('menu')}>Order Now</button>
                                <a className="btn ghost" href="#custom-request">Custom Catering Request</a>
                            </div>

                            <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ color: '#F59E0B', fontSize: '20px' }}>★★★★★</div>
                                <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--muted)' }}>4.9/5 from 30+ Happy Clients</div>
                            </div>

                            <div className="hero-meta">
                                <span>📍 Yonkers / The Bronx</span>
                                <span>📞 <a href="tel:+19143490935" style={{ color: 'inherit', textDecoration: 'underline' }}>914-349-0935</a></span>
                            </div>
                        </section>

                        <aside className="hero-media">
                            <div className="stack">
                                <img src={hero_1} alt="Exquisite West African dish" />
                                <img src={hero_2} alt="Professional catering presentation" />
                            </div>
                        </aside>
                    </div>
                </div>
            </main>

            <section id="menu" className="section">
                <div className="container">
                    <h2>Order Now</h2>
                    <p className="lead">Order and pay instantly. We’ll confirm your pickup/delivery time right after.</p>
                    <div style={{ textAlign: 'center', marginBottom: '32px', display: 'flex', gap: '16px', justifyContent: 'center' }}>
                        <button className="btn primary" onClick={() => setCurrentPage('menu')}>Open Ordering Tool</button>
                        <button className="btn ghost" onClick={() => openLightbox("./assets/menu_flyer.jpg", "Abby Kookz Full Menu")}>View Original Menu Flyer</button>
                    </div>

                    <div className="menu-controls">
                        <input
                            className="input"
                            type="search"
                            placeholder="Search dishes (e.g. Jollof, Banku, Suya)..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="category-nav-wrap">
                        <div className="container category-nav">
                            {SITE_DATA.menu_sections.map(section => (
                                <a key={section.id} href={`#cat-${section.id}`} className="cat-link">
                                    {section.title}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="menu-wrap">
                        {filteredMenu.map((section, idx) => (
                            <div key={idx} id={`cat-${section.id}`} className="menu-section" style={{ scrollMarginTop: '140px' }}>
                                <div className="section-hero">
                                    <img src={ASSETS[section.image]} alt={section.title} />
                                    <div className="section-hero-overlay">
                                        <h3>{section.title}</h3>
                                    </div>
                                </div>
                                {section.items.map((item, i) => (
                                    <div key={i} className="menu-item">
                                        <div>
                                            <div className="item-top">
                                                <div className="item-name">
                                                    {item.name}
                                                    {item.popular && <span className="badge-popular">🔥 Popular</span>}
                                                </div>
                                                <div className="tags">
                                                    {item.tags?.map(tag => <span key={tag} className="tag">{tag}</span>)}
                                                </div>
                                            </div>
                                            <p className="item-desc">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="gallery" className="section">
                <div className="container">
                    <h2>Visualizing Flavor</h2>
                    <p className="lead">Experience the artistry and care that goes into every Abby Kookz dish.</p>

                    <div className="gallery">
                        {SITE_DATA.thumbs.map((t, i) => (
                            <div key={i} className="gitem" onClick={() => openLightbox(t.full, t.alt)}>
                                <img src={ASSETS[t.src]} alt={t.alt} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section" style={{ background: '#f8fafc', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
                        <div>
                            <h3 style={{ marginBottom: '16px' }}>📍 Delivery Areas</h3>
                            <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: '1.6' }}>
                                We currently deliver to the <strong>Bronx</strong> and <strong>Yonkers</strong>.
                                Delivery fees are calculated based on distance from our kitchen in Yonkers.
                            </p>
                        </div>
                        <div>
                            <h3 style={{ marginBottom: '16px' }}>⏰ Order Timing</h3>
                            <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: '1.6' }}>
                                For large party trays and catering, please try to order <strong>24-48 hours</strong> in advance.
                                Same-day orders depend on availability.
                            </p>
                        </div>
                        <div>
                            <h3 style={{ marginBottom: '16px' }}>🛍️ Pickup</h3>
                            <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: '1.6' }}>
                                Free pickup is available in Yonkers. We'll send the exact address as soon as your payment is confirmed.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="custom-request" className="section">
                <div className="container" style={{ maxWidth: '800px' }}>
                    <h2 style={{ textAlign: 'center' }}>Custom Catering Request</h2>
                    <p className="lead" style={{ textAlign: 'center' }}>Don't see what you want on the menu? Tell us what you need and we'll customize it.</p>

                    <form
                        className="custom-form"
                        style={{ marginTop: '40px', background: 'var(--card)', padding: '40px', borderRadius: 'var(--radius2)', boxShadow: 'var(--shadow)' }}
                        onSubmit={async (e) => {
                            e.preventDefault();
                            setCustomFormState({ submitting: true, success: false });
                            const fd = new FormData(e.target);
                            const data = Object.fromEntries(fd.entries());

                            try {
                                const response = await fetch('/api/contact', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(data)
                                });

                                if (response.ok) {
                                    setCustomFormState({ submitting: false, success: true });
                                    e.target.reset();
                                } else {
                                    alert('There was an error sending your request. Please try again.');
                                    setCustomFormState({ submitting: false, success: false });
                                }
                            } catch (error) {
                                console.error('Submission Error:', error);
                                alert('There was an error sending your request. Please try again.');
                                setCustomFormState({ submitting: false, success: false });
                            }
                        }}
                    >
                        <div style={{ display: 'grid', gap: '24px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Full Name *</label>
                                    <input name="name" type="text" className="input" required style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '15px' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Phone Number *</label>
                                    <input name="phone" type="tel" className="input" required style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '15px' }} />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Email *</label>
                                <input name="email" type="email" className="input" required style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '15px' }} />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Event Date *</label>
                                    <input name="date" type="date" className="input" required style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '15px' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Number of Guests *</label>
                                    <input name="guests" type="number" className="input" required style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '15px' }} />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Pickup or Delivery *</label>
                                <select name="service" className="input" required style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '15px' }}>
                                    <option value="">Select...</option>
                                    <option value="pickup">Pickup</option>
                                    <option value="delivery">Delivery</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Delivery Address (if delivery)</label>
                                <input name="address" type="text" className="input" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '15px' }} />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Custom Request Details *</label>
                                <textarea name="request" className="input" required rows="5" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '15px', fontFamily: 'inherit' }} placeholder="Please describe what you'd like us to prepare..."></textarea>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Budget (optional)</label>
                                <input name="budget" type="text" className="input" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '15px' }} placeholder="e.g., $200-300" />
                            </div>

                            <button type="submit" className="btn primary" disabled={customFormState.submitting} style={{ width: '100%', padding: '16px', fontSize: '16px' }}>
                                {customFormState.submitting ? 'Sending...' : 'Submit Custom Request'}
                            </button>

                            {customFormState.success && (
                                <div style={{ textAlign: 'center', color: '#065f46', background: '#ecfdf5', padding: '12px', borderRadius: '8px', border: '1px solid #10b981' }}>
                                    ✅ Request sent successfully! Abby will contact you soon.
                                </div>
                            )}

                            <div style={{ textAlign: 'center' }}>
                                <p style={{ color: 'var(--muted)', marginBottom: '4px' }}>Fastest response via Instagram DM:</p>
                                <a className="btn ghost" href="https://www.instagram.com/abbykookz_/" target="_blank" rel="noopener">@abbykookz_</a>
                            </div>
                        </div>
                    </form>
                </div>
            </section>

            <section id="testimonials" className="section" style={{ background: 'var(--card)' }}>
                <div className="container">
                    <h2 style={{ textAlign: 'center' }}>Customer Reviews</h2>
                    <p className="lead" style={{ textAlign: 'center' }}>See what others are saying about our catering.</p>

                    <div className="reviews-grid">
                        {REVIEWS_DATA.map(review => (
                            <div key={review.id} className="review-card">
                                <div className="review-stars">
                                    {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                                </div>
                                <p className="review-text">"{review.text}"</p>
                                <div className="review-author">— {review.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="leave-review" className="section">
                <div className="container">
                    <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
                        <h2>Leave a Review</h2>
                        <p className="lead">We’d love to hear from you! Share your experience to help others feel confident ordering with us.</p>
                    </div>

                    <div className="review-form-container">
                        {reviewSubmitted ? (
                            <div className="review-success-msg">
                                <h3>✅ Thank you for your feedback!</h3>
                                <p>We appreciate you taking the time to leave a review. Your feedback helps us grow!</p>
                                <button className="btn primary" style={{ marginTop: '20px' }} onClick={() => setReviewSubmitted(false)}>Submit Another</button>
                            </div>
                        ) : (
                            <form onSubmit={async (e) => {
                                e.preventDefault();
                                const fd = new FormData(e.target);
                                const data = Object.fromEntries(fd.entries());
                                const stars = "★".repeat(reviewRating);

                                try {
                                    const response = await fetch('/api/contact', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({
                                            name: data.name,
                                            email: data.email || 'N/A',
                                            request: `REVIEW SUBMISSION\nRating: ${stars} (${reviewRating}/5)\nFeedback: ${data.feedback}\nPermission to display: ${data.permission ? 'Yes' : 'No'}`,
                                            service: 'Review'
                                        })
                                    });
                                    if (response.ok) {
                                        setReviewSubmitted(true);
                                    } else {
                                        alert('Failed to submit review. Please check your connection.');
                                    }
                                } catch (error) {
                                    console.error('Review Error:', error);
                                    alert('Error submitting review.');
                                }
                            }}>
                                <div style={{ display: 'grid', gap: '20px' }}>
                                    <div className="star-rating-input">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <button
                                                key={star}
                                                type="button"
                                                className="star-btn"
                                                onClick={() => setReviewRating(star)}
                                                style={{ color: star <= reviewRating ? '#fbbf24' : '#d1d5db' }}
                                            >
                                                ★
                                            </button>
                                        ))}
                                        <span style={{ alignSelf: 'center', marginLeft: '10px', fontSize: '14px', color: 'var(--muted)' }}>({reviewRating}/5 Stars)</span>
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Full Name *</label>
                                        <input name="name" type="text" className="input" required style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--line)' }} placeholder="Your Name" />
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Email (optional)</label>
                                            <input name="email" type="email" className="input" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--line)' }} placeholder="your@email.com" />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Order Date (optional)</label>
                                            <input name="orderDate" type="date" className="input" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--line)' }} />
                                        </div>
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Your Feedback *</label>
                                        <textarea name="feedback" className="input" required rows="5" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--line)', fontFamily: 'inherit' }} placeholder="How was the food? How was the service?"></textarea>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <input type="checkbox" name="permission" id="perm" style={{ width: '18px', height: '18px' }} defaultChecked />
                                        <label htmlFor="perm" style={{ fontSize: '14px', color: 'var(--text)' }}>I agree that my review may be displayed on the website.</label>
                                    </div>

                                    <button type="submit" className="btn primary" style={{ width: '100%', padding: '16px', fontSize: '16px' }}>Submit Review</button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            <section id="contact" className="section contact-simple-section">
                <div className="container">
                    <h2 style={{ textAlign: 'left', fontFamily: 'var(--font-serif)', fontSize: '56px', marginBottom: '16px' }}>Contact</h2>
                    <p style={{ fontSize: '20px', color: 'var(--text)', marginBottom: '48px' }}>
                        Reach me anytime — fastest response is usually via Instagram DM.
                    </p>

                    <div className="contact-simple-grid">
                        <div className="contact-card-simple">
                            <div className="contact-icon-box">📞</div>
                            <div className="contact-card-content">
                                <h4>Phone</h4>
                                <a href="tel:+19143490935">914-349-0935</a>
                            </div>
                        </div>

                        <div className="contact-card-simple">
                            <div className="contact-icon-box">✉️</div>
                            <div className="contact-card-content">
                                <h4>Email</h4>
                                <a href="mailto:abbycooks21@gmail.com">abbycooks21@gmail.com</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="container">
                    <div className="footer-top">
                        <div className="brand">
                            <img src={logo} alt="Abby Kookz" />
                            <div>
                                <div className="name">Abby Kookz</div>
                                <div className="sub">Modern Ghanaian Catering & Delivery</div>
                            </div>
                        </div>
                        <div className="nav-links">
                            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('menu'); }}>Order Now</a>
                            <a href="#custom-request">Custom Request</a>
                            <a href="#leave-review">Leave a Review</a>
                            <a href="#contact">Contact</a>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <div>© 2026 Abby Kookz. All rights reserved.</div>
                        <div>10-12 Yonkers • The Bronx • Greater New York</div>
                    </div>
                </div>
            </footer>

            {
                !isPaymentSuccess && (
                    <div className="mobile-sticky-bar">
                        <div>
                            <div style={{ fontSize: '12px', opacity: 0.8 }}>Ready to eat?</div>
                            <div style={{ fontWeight: '700' }}>Order Abby Kookz</div>
                        </div>
                        <button className="btn primary" style={{ background: '#fff', color: '#000', padding: '10px 20px' }} onClick={() => setCurrentPage('menu')}>
                            Order Now
                        </button>
                    </div>
                )
            }

            {
                lightbox.open && (
                    <div className="lightbox open" onClick={closeLightbox}>
                        <div className="panel" onClick={(e) => e.stopPropagation()}>
                            <button className="close" onClick={closeLightbox}>✕</button>
                            <img src={lightbox.src} alt={lightbox.alt} />
                        </div>
                    </div>
                )
            }
        </div >
    );
}
