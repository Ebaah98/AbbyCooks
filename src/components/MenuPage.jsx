"use client";

import React, { useState } from 'react';
import './MenuPage.css';

const MENU_DATA = {
    riceDishes: [
        {
            id: 'jollof',
            name: 'Ghana Jollof',
            description: 'Smoky tomato rice, slow-cooked the traditional Ghanaian way',
            proteins: ['Plain', 'Chicken', 'Beef', 'Turkey', 'Goat Meat', 'Big Fish'],
            sizes: ['Standard'],
            addons: [
                { name: 'Fried Plantains', price: 5 },
                { name: 'Ghana Salad', price: 4 },
                { name: 'Shito', price: 2 }
            ],
            basePrice: { Standard: 18 },
            proteinPrice: { Plain: 0, Chicken: 4, Beef: 4, Turkey: 4, 'Goat Meat': 4, 'Big Fish': 4 },
            note: 'Plain: $18 | With Protein: $22',
            popular: true
        },
        {
            id: 'friedrice',
            name: 'Fried Rice',
            description: 'Classic Ghana-style fried rice',
            proteins: ['Plain', 'Chicken', 'Beef', 'Turkey', 'Big Fish'],
            sizes: ['Standard'],
            addons: [
                { name: 'Ghana Salad', price: 4 },
                { name: 'Shito', price: 2 }
            ],
            basePrice: { Standard: 17 },
            proteinPrice: { Plain: 0, Chicken: 4, Beef: 4, Turkey: 4, 'Big Fish': 4 },
            note: 'Plain: $17 | With Protein: $21'
        },
        {
            id: 'anwamo',
            name: 'Anwa Mo (Oil Rice)',
            description: 'Traditional style with fried eggs and pepper included',
            proteins: ['None', 'Beef', 'Goat Meat', 'Big Fish'],
            sizes: ['Standard'],
            addons: [
                { name: 'Fried Plantains', price: 5 }
            ],
            basePrice: { Standard: 18 },
            proteinPrice: { None: 0, Beef: 5, 'Goat Meat': 5, 'Big Fish': 5 },
            note: 'Includes eggs & pepper | Protein: +$5'
        }
    ],
    swallowsSoups: [
        {
            id: 'tuozaafi',
            name: 'Tuo Zaafi (TZ)',
            description: 'Served with Green Soup (Ayoyo / Abunuabunu)',
            proteins: ['Beef', 'Goat Meat', 'Wele', 'Smoked Fish'],
            sizes: ['Standard'],
            addons: [
                { name: 'Extra Soup', price: 4 },
                { name: 'Extra Protein', price: 6 }
            ],
            basePrice: { Standard: 20 },
            proteinPrice: { 'Beef': 0, 'Goat Meat': 0, 'Wele': 0, 'Smoked Fish': 0 },
            note: '$20 | Extra Protein: +$6',
            popular: true
        },
        {
            id: 'bankuokra',
            name: 'Banku + Okra Soup',
            description: 'Freshly prepared banku with rich okra soup',
            proteins: ['Beef', 'Goat Meat', 'Wele', 'Smoked Fish', 'Crab'],
            sizes: ['Standard'],
            addons: [
                { name: 'Extra Okra', price: 3 },
                { name: 'Extra Protein', price: 6 }
            ],
            basePrice: { Standard: 19 },
            proteinPrice: { Beef: 0, 'Goat Meat': 0, Wele: 0, 'Smoked Fish': 0, Crab: 0 },
            note: '$19 | Extra Protein: +$6'
        },
        {
            id: 'bankupepper',
            name: 'Banku + Pepper + Fish',
            description: 'Soft banku with spicy pepper sauce and fish',
            proteins: ['Big Fish', 'Tilapia'],
            sizes: ['Standard'],
            addons: [
                { name: 'Extra Pepper', price: 2 },
                { name: 'Extra Fish', price: 7 }
            ],
            basePrice: { Standard: 22 },
            proteinPrice: { 'Big Fish': 0, Tilapia: 0 },
            note: '$22 | Extra Fish: +$7'
        },
        {
            id: 'fufu',
            name: 'Fufu + Soup',
            description: 'Choose from our range of traditional soups',
            proteins: ['Chicken', 'Beef', 'Goat Meat', 'Wele', 'Smoked Fish'],
            soups: ['Light Soup', 'Palm Nut Soup', 'Groundnut Soup', 'Okra Soup', 'Kontomire', 'Green Soup'],
            sizes: ['Standard'],
            addons: [
                { name: 'Extra Soup', price: 4 },
                { name: 'Extra Protein', price: 6 }
            ],
            basePrice: { Standard: 20 },
            proteinPrice: { Chicken: 0, Beef: 0, 'Goat Meat': 0, Wele: 0, 'Smoked Fish': 0 },
            note: '$20 | Extra Protein: +$6'
        }
    ],
    proteinsSides: [
        {
            id: 'friedchicken',
            name: 'Fried Chicken',
            description: 'Crispy, seasoned chicken wings/pieces',
            proteins: [],
            sizes: ['3 Pieces', '5 Pieces', '6 Pieces'],
            addons: [],
            basePrice: { '3 Pieces': 8, '5 Pieces': 12, '6 Pieces': 14 },
            proteinPrice: {},
            note: '3pcs: $8 | 5pcs: $12 | 6pcs: $14',
            popular: true
        },
        {
            id: 'plantains',
            name: 'Fried Plantains',
            description: 'Golden, sweet fried plantains',
            proteins: [],
            sizes: ['6 Pieces', '10 Pieces', '15 Pieces'],
            addons: [],
            basePrice: { '6 Pieces': 5, '10 Pieces': 8, '15 Pieces': 12 },
            proteinPrice: {},
            note: '6pcs: $5 | 10pcs: $8 | 15pcs: $12'
        },
        {
            id: 'suya',
            name: 'Suya (Spiced Skewers)',
            description: 'Grilled skewers with authentic suya spice',
            proteins: ['Beef', 'Chicken'],
            sizes: ['1 Skewer'],
            addons: [
                { name: 'Extra Spice', price: 1 }
            ],
            basePrice: { '1 Skewer': 6 },
            proteinPrice: { Beef: 0, Chicken: 0 },
            note: '$6 per skewer | Beef or Chicken',
            popular: true
        }
    ],
    saucesExtras: [
        {
            id: 'shito',
            name: 'Shito',
            description: 'Available in Mild or Hot',
            proteins: [],
            heat: ['Mild', 'Hot'],
            sizes: ['Small', 'Medium', 'Large'],
            addons: [],
            basePrice: { Small: 2, Medium: 4, Large: 6 },
            proteinPrice: {},
            note: 'Small: $2 | Med: $4 | Large: $6'
        },
        {
            id: 'ghanasalad',
            name: 'Ghana Salad',
            description: 'Fresh vegetables with classic dressing',
            proteins: [],
            sizes: ['Small', 'Large'],
            addons: [],
            basePrice: { Small: 4, Large: 7 },
            proteinPrice: {},
            note: 'Small: $4 | Large: $7'
        }
    ],
    drinks: [
        {
            id: 'kenkey',
            name: 'Mashed Kenkey (Drink)',
            description: 'Refreshing chilled kenkey drink',
            proteins: [],
            heat: ['Ice', 'No Ice'],
            sizes: ['12 oz', '16 oz', '24 oz'],
            addons: [],
            basePrice: { '12 oz': 6, '16 oz': 9, '24 oz': 12 },
            proteinPrice: {},
            note: '12oz: $6 | 16oz: $9 | 24oz: $12'
        }
    ]
};

const CATEGORIES = [
    { id: 'riceDishes', label: 'Rice Dishes', icon: '🍚' },
    { id: 'swallowsSoups', label: 'Swallows & Soups', icon: '🥘' },
    { id: 'proteinsSides', label: 'Proteins & Sides', icon: '🍖' },
    { id: 'saucesExtras', label: 'Sauces & Extras', icon: '🌶️' },
    { id: 'drinks', label: 'Drinks', icon: '🥤' }
];

function MenuPage() {
    const [activeCategory, setActiveCategory] = useState('riceDishes');
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [customizing, setCustomizing] = useState(null);
    const [isPaying, setIsPaying] = useState(false);

    const [currentCustomization, setCurrentCustomization] = useState({
        size: '',
        protein: '',
        soup: '',
        heat: '',
        addons: []
    });

    const openCustomizer = (item) => {
        setCustomizing(item);
        setCurrentCustomization({
            size: item.sizes?.[0] || '',
            protein: item.proteins?.[0] || '',
            soup: item.soups?.[0] || '',
            heat: item.heat?.[0] || '',
            addons: []
        });
    };

    const closeCustomizer = () => {
        setCustomizing(null);
        setCurrentCustomization({
            size: '',
            protein: '',
            soup: '',
            heat: '',
            addons: []
        });
    };

    const calculateItemPrice = (item, customization) => {
        let price = item.basePrice[customization.size] || 0;
        if (customization.protein && item.proteinPrice) {
            price += item.proteinPrice[customization.protein] || 0;
        }
        customization.addons.forEach(addon => {
            price += addon.price;
        });
        return price;
    };

    const addToCart = () => {
        if (!customizing) return;

        const cartItem = {
            id: Date.now(),
            item: customizing,
            customization: { ...currentCustomization },
            price: calculateItemPrice(customizing, currentCustomization)
        };

        setCart([...cart, cartItem]);
        closeCustomizer();
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const getCartTotal = () => {
        return cart.reduce((sum, item) => sum + item.price, 0);
    };

    const toggleAddon = (addon) => {
        const existing = currentCustomization.addons.find(a => a.name === addon.name);
        if (existing) {
            setCurrentCustomization({
                ...currentCustomization,
                addons: currentCustomization.addons.filter(a => a.name !== addon.name)
            });
        } else {
            setCurrentCustomization({
                ...currentCustomization,
                addons: [...currentCustomization.addons, addon]
            });
        }
    };

    return (
        <div className="menu-page">
            {/* Order Summary Button */}
            <button
                className="cart-float-btn"
                onClick={() => setShowCart(!showCart)}
            >
                📋 Order Summary ({cart.length})
            </button>

            {/* Category Navigation */}
            <div className="category-nav">
                <div className="container">
                    <h1 className="menu-page-title">Order Now</h1>
                    <p className="menu-page-subtitle">Select your items and pay securely. We’ll confirm your pickup/delivery time right after payment.</p>

                    <div className="category-pills">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                className={`category-pill ${activeCategory === cat.id ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat.id)}
                            >
                                <span className="cat-icon">{cat.icon}</span>
                                <span>{cat.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Menu Items Grid */}
            <div className="container menu-items-section">
                <div className="menu-items-grid">
                    {MENU_DATA[activeCategory]?.map(item => (
                        <div key={item.id} className="menu-card">
                            <div className="menu-card-header">
                                <h3>
                                    {item.popular && <span className="badge-popular" style={{ margin: '0 8px 0 0', verticalAlign: 'middle' }}>🔥 Popular</span>}
                                    {item.name}
                                </h3>
                            </div>

                            <p className="menu-card-desc">{item.description}</p>

                            {item.note && (
                                <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '8px', fontStyle: 'italic' }}>
                                    {item.note}
                                </p>
                            )}

                            <div className="menu-card-details">
                                {item.sizes && (
                                    <div className="detail-row">
                                        <span className="detail-label">Sizes:</span>
                                        <span className="detail-value">{item.sizes.join(' • ')}</span>
                                    </div>
                                )}

                                {item.proteins && item.proteins.length > 0 && (
                                    <div className="detail-row">
                                        <span className="detail-label">Proteins:</span>
                                        <span className="detail-value">{item.proteins.join(' • ')}</span>
                                    </div>
                                )}

                                {item.soups && item.soups.length > 0 && (
                                    <div className="detail-row">
                                        <span className="detail-label">Soups:</span>
                                        <span className="detail-value">{item.soups.join(' • ')}</span>
                                    </div>
                                )}

                                {item.heat && (
                                    <div className="detail-row">
                                        <span className="detail-label">Heat:</span>
                                        <span className="detail-value">{item.heat.join(' • ')}</span>
                                    </div>
                                )}

                                {item.addons && item.addons.length > 0 && (
                                    <div className="detail-row">
                                        <span className="detail-label">Add-ons:</span>
                                        <span className="detail-value">{item.addons.map(a => a.name).join(' • ')}</span>
                                    </div>
                                )}
                            </div>

                            <div className="menu-card-footer">
                                <button
                                    className="btn-customize"
                                    onClick={() => openCustomizer(item)}
                                >
                                    Add to Order
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Customization Modal */}
            {customizing && (
                <div className="modal-overlay" onClick={closeCustomizer}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeCustomizer}>✕</button>

                        <h2>{customizing.name}</h2>
                        <p className="modal-desc">{customizing.description}</p>

                        {/* Size Selection */}
                        {customizing.sizes && customizing.sizes.length > 0 && (
                            <div className="customization-section">
                                <h4>Select Size <span className="required">*</span></h4>
                                <div className="option-grid">
                                    {customizing.sizes.map(size => (
                                        <button
                                            key={size}
                                            className={`option-btn ${currentCustomization.size === size ? 'selected' : ''}`}
                                            onClick={() => setCurrentCustomization({ ...currentCustomization, size })}
                                        >
                                            {size}
                                            <span className="option-price">${customizing.basePrice[size]}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Protein Selection */}
                        {customizing.proteins && customizing.proteins.length > 0 && (
                            <div className="customization-section">
                                <h4>Select Protein {customizing.proteins.includes('Plain') ? '' : <span className="required">*</span>}</h4>
                                <div className="option-grid">
                                    {customizing.proteins.map(protein => (
                                        <button
                                            key={protein}
                                            className={`option-btn ${currentCustomization.protein === protein ? 'selected' : ''}`}
                                            onClick={() => setCurrentCustomization({ ...currentCustomization, protein })}
                                        >
                                            {protein}
                                            {customizing.proteinPrice[protein] > 0 && (
                                                <span className="option-price">+${customizing.proteinPrice[protein]}</span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Soup Selection */}
                        {customizing.soups && customizing.soups.length > 0 && (
                            <div className="customization-section">
                                <h4>Select Soup <span className="required">*</span></h4>
                                <div className="option-grid">
                                    {customizing.soups.map(soup => (
                                        <button
                                            key={soup}
                                            className={`option-btn ${currentCustomization.soup === soup ? 'selected' : ''}`}
                                            onClick={() => setCurrentCustomization({ ...currentCustomization, soup })}
                                        >
                                            {soup}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Heat Selection */}
                        {customizing.heat && customizing.heat.length > 0 && (
                            <div className="customization-section">
                                <h4>Select Heat Level <span className="required">*</span></h4>
                                <div className="option-grid">
                                    {customizing.heat.map(heat => (
                                        <button
                                            key={heat}
                                            className={`option-btn ${currentCustomization.heat === heat ? 'selected' : ''}`}
                                            onClick={() => setCurrentCustomization({ ...currentCustomization, heat })}
                                        >
                                            {heat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Add-ons */}
                        {customizing.addons && customizing.addons.length > 0 && (
                            <div className="customization-section">
                                <h4>Add-ons (Optional)</h4>
                                <div className="addon-list">
                                    {customizing.addons.map(addon => {
                                        const isSelected = currentCustomization.addons.find(a => a.name === addon.name);
                                        return (
                                            <button
                                                key={addon.name}
                                                className={`addon-item ${isSelected ? 'selected' : ''}`}
                                                onClick={() => toggleAddon(addon)}
                                            >
                                                <span className="addon-checkbox">{isSelected ? '☑' : '☐'}</span>
                                                <span className="addon-name">{addon.name}</span>
                                                <span className="addon-price">+${addon.price}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        <div className="modal-footer">
                            <button
                                className="btn-add-to-cart"
                                onClick={addToCart}
                                disabled={!currentCustomization.size}
                            >
                                Add to Summary
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Cart Sidebar */}
            <div className={`cart-sidebar ${showCart ? 'open' : ''}`}>
                <div className="cart-header">
                    <h3>Order Summary</h3>
                    <button className="cart-close" onClick={() => setShowCart(false)}>✕</button>
                </div>

                <div className="cart-items">
                    {cart.length === 0 ? (
                        <div className="cart-empty">
                            <div className="empty-icon">📂</div>
                            <p>No items added yet</p>
                        </div>
                    ) : (
                        cart.map(cartItem => (
                            <div key={cartItem.id} className="cart-item">
                                <div className="cart-item-details">
                                    <h4>{cartItem.item.name}</h4>
                                    <div className="cart-item-specs">
                                        {cartItem.customization.size && <span>Size: {cartItem.customization.size}</span>}
                                        {cartItem.customization.protein && <span>• {cartItem.customization.protein}</span>}
                                        {cartItem.customization.soup && <span>• {cartItem.customization.soup}</span>}
                                        {cartItem.customization.heat && <span>• {cartItem.customization.heat}</span>}
                                    </div>
                                    {cartItem.customization.addons.length > 0 && (
                                        <div className="cart-item-addons">
                                            Add-ons: {cartItem.customization.addons.map(a => a.name).join(', ')}
                                        </div>
                                    )}
                                </div>
                                <div className="cart-item-actions">
                                    <button
                                        className="btn-remove"
                                        onClick={() => removeFromCart(cartItem.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-total-row">
                            <span>Total</span>
                            <span className="cart-total-price">${getCartTotal()}</span>
                        </div>
                        <button
                            className="btn-checkout"
                            disabled={isPaying}
                            onClick={async () => {
                                setIsPaying(true);
                                try {
                                    const orderDetails = cart.map(item => {
                                        let details = `- ${item.item.name} (${item.customization.size})`;
                                        if (item.customization.protein) details += `, Protein: ${item.customization.protein}`;
                                        if (item.customization.soup) details += `, Soup: ${item.customization.soup}`;
                                        if (item.customization.heat) details += `, Heat: ${item.customization.heat}`;
                                        if (item.customization.addons.length > 0) details += `, Add-ons: ${item.customization.addons.map(a => a.name).join(', ')}`;
                                        return details;
                                    }).join('\n');

                                    const response = await fetch('/api/checkout', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ cart, orderDetails })
                                    });

                                    const data = await response.json();
                                    if (data.url) {
                                        window.location.href = data.url;
                                    } else {
                                        alert('Error creating checkout session. Please try again.');
                                        setIsPaying(false);
                                    }
                                } catch (error) {
                                    console.error('Payment Error:', error);
                                    alert('Payment failed to initialize. Please try again.');
                                    setIsPaying(false);
                                }
                            }}
                        >
                            {isPaying ? 'Processing...' : 'Pay Now'}
                        </button>
                        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ fontSize: '13px', color: '#666' }}>✅ Step 1: Pay for your order</div>
                            <div style={{ fontSize: '13px', color: '#666' }}>✅ Step 2: Order sent + Confirmation & Pickup/Delivery</div>
                        </div>
                    </div>
                )}
            </div>

            {/* Overlay for cart */}
            {showCart && <div className="cart-overlay" onClick={() => setShowCart(false)}></div>}
        </div>
    );
}

export default MenuPage;
