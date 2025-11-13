/* 
FOR FRONTEND & BACKEND CONNECTION

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ProductList from './ProductList';
import ProductView from './ProductView';
import ProductForm from './ProductForm';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {}
        <Route path="/product-list" element={<ProductList />} />
        
        {}
        <Route path="/product/:productId" element={<ProductView />} />
        
        {}
        <Route path="/add-product" element={<ProductForm />} />
      </Routes>
    </Router>
  </React.StrictMode>
); */

/* import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';

import Login from './Login'; 

import vintageWashiTapeImg from './integrationStyle/images/vintage-washi-tape.png';
import pastelAcrylicPaintsImg from './integrationStyle/images/pastel-acrylic-paints.png';
import a3CuttingMatImg from './integrationStyle/images/a3-cutting-mat.png';
import fineDetailBrushSetImg from './integrationStyle/images/fine-detail-brush-set.png';
import diyClayKitImg from './integrationStyle/images/diy-clay-kit.png';
import premiumSketchbookImg from './integrationStyle/images/premium-sketchbook.png';
import vibrantWatercolorSetImg from './integrationStyle/images/vibrant-watercolor-set.png';
import luxuryRollerballPenImg from './integrationStyle/images/luxury-rollerball-pen.png';

const { useState, useEffect } = React;

const initialProducts = [
    {
        id: 1,
        name: 'Vibrant Watercolor Set',
        description: '12 colors with high pigment saturation and travel brush. This is a high-quality artist-grade set for both studio and plein air painting.',
        price: 35.99,
        imageUrl: vibrantWatercolorSetImg 
    },
    {
        id: 2,
        name: 'Luxury Rollerball Pen',
        description: 'Smooth-writing pen with a sleek, metallic finish. Perfect for journaling or office use.',
        price: 12.99,
        imageUrl: luxuryRollerballPenImg
    },
    {
        id: 3,
        name: 'Premium Sketchbook',
        description: 'A professional-grade sketchbook with 80 sheets of heavyweight paper, ideal for all dry media.',
        price: 19.50,
        imageUrl: premiumSketchbookImg
    },
    {
        id: 4,
        name: 'DIY Clay Kit',
        description: 'Everything you need to sculpt and create custom figures. Includes five colored clays, tools, and a guide.',
        price: 25.00,
        imageUrl: diyClayKitImg
    },
    {
        id: 5,
        name: 'Fine Detail Brush Set',
        description: 'Set of 10 miniature brushes for precise acrylic, watercolor, and oil painting.',
        price: 15.75,
        imageUrl: fineDetailBrushSetImg
    },
    {
        id: 6,
        name: 'A3 Cutting Mat',
        description: 'Self-healing, double-sided mat with grid lines, essential for any crafter or designer.',
        price: 18.00,
        imageUrl: a3CuttingMatImg
    },
    {
        id: 7,
        name: 'Pastel Acrylic Paints',
        description: 'Set of 12 soft-hued acrylic paints, perfect for subtle artwork and background washes.',
        price: 28.99,
        imageUrl: pastelAcrylicPaintsImg
    },
    {
        id: 8,
        name: 'Vintage Washi Tape',
        description: 'Collection of 8 rolls of decorative paper tape with intricate vintage patterns.',
        price: 9.99,
        imageUrl: vintageWashiTapeImg
    },
];

const BRAND_PINK_TEXT = 'text-[#e54b67]'; 
const LIGHT_PINK_BG = 'bg-[#ffe1e8]';
const ACTIVE_BG_COLOR = 'bg-[#ff8ba7]';
const ACCENT_GREEN_BG = 'bg-[#b7e4c7]';
const HERO_BLUE_BG = 'bg-[#eaf1ff]';


const getCartFromStorage = () => {
    try {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        
        return storedCart.map(item => ({
            ...item,
            price: Number(item.price) || 0,
            quantity: Number(item.quantity) > 0 ? Number(item.quantity) : 1,
        }));
    } catch (error) {
        console.error("Error loading cart from storage:", error);
        return [];
    }
};

const saveCartToStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};


const AdminDashboard = ({ onLogout }) => (
    <div className="admin-dashboard-container">
        <div className="admin-dashboard-box">
            
            <h2 className="admin-dashboard-title">Admin Dashboard</h2>
            
            <p className="admin-welcome-text">
                Welcome, Administrator. Manage your e-commerce operations efficiently.
            </p>

            {}
            <div className="admin-action-buttons">
                
                <button className="admin-primary-btn">
                    Manage Products
                </button>
                
                <button className="admin-secondary-btn">
                    View Orders
                </button>
                
                <button onClick={onLogout} className="admin-logout-btn">
                    Logout
                </button>
            </div>
        </div>
    </div>
);


const Navbar = ({ navigate, currentPage, cartItemCount, onLogout, userRole }) => {
    
    const [localCartCount, setLocalCartCount] = useState(cartItemCount);

    useEffect(() => {
        const cart = getCartFromStorage();
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        setLocalCartCount(count);
    }, [cartItemCount]);

    let navItems = [];
    if (userRole === 'user') {
        navItems = [
            { name: 'Home', page: 'home' },
            { name: 'Products', page: 'products' },
        ];
    }

    return (
        <header className="navbar">
            <h1 className="brand" onClick={() => navigate('home')}>Crafty Corner</h1>
            
            <nav>
                <ul>
                    {userRole === 'user' && navItems.map((item) => (
                        <button
                            key={item.page}
                            onClick={() => navigate(item.page)}
                            className={`nav-link ${item.page === currentPage ? 'active' : ''}`}
                        >
                            {item.name}
                        </button>
                    ))}

                    {userRole === 'user' && (
                        <button
                            onClick={() => navigate('cart')}
                            className="cart-link"
                            aria-label="View Shopping Cart"
                        >
                            <span className="font-semibold">Cart</span>
                            {localCartCount > 0 && (
                                <span className="cart-count-badge">
                                    {localCartCount}
                                </span>
                            )}
                        </button>
                    )}

                    <button onClick={onLogout} className="nav-link logout-link">
                        Logout
                    </button>
                </ul>
            </nav>
        </header>
    );
};


const HomePage = ({ navigate }) => (
    <div className="flex flex-col">
        
        <div className="home-hero-section"> 
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-tight mb-4">
                    Unleash Your Inner Craftsperson
                </h1>
                
                
                <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
                    High-quality art supplies and kits to inspire your next creation. Find everything <br /> you need for painting, drawing, and crafting, all in one place.
                </p>
                
                
                <button
                    onClick={() => navigate('products')}
                    className="shop-now-button" 
                >
                    Shop Now
                </button>

            </div>
        </div>

        
        <div className="featured-products-container">
            <div className="max-w-7xl mx-auto">
                <h3 className={`brand text-3xl font-bold mb-10`}>Featured Products</h3>
                
                <div className="featured-grid">
                    {initialProducts.slice(0, 4).map(product => (
                        <div key={product.id} 
                            
                            className="featured-card"
                            style={{backgroundImage: `url(${product.imageUrl})`}}
                            onClick={() => navigate('details', product)}>
                            
                            <span className="text-xs font-semibold text-gray-800 absolute top-3 left-3 bg-white px-2 py-1 rounded-full shadow-sm">New</span>
                            
                            <p className="text-white text-xl font-bold bg-black bg-opacity-30 rounded-lg p-1 text-shadow-md">{product.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        
        <div className="home-info-section">
            <div className="max-w-4xl mx-auto">
                <h3 className={`brand text-2xl font-bold mb-4`}>Quality and Craftsmanship</h3>
                <p className="text-gray-700 max-w-2xl font-bold mx-auto">
                    We source only the finest materials, ensuring every product helps you create masterpieces with ease and joy.
                </p>
            </div>
        </div>
    </div>
);


const ProductCard = ({ product, navigate, onAddToCart }) => {
    const handleAddToCart = (e) => {
        e.stopPropagation();
        onAddToCart(product);
    };

    return (
        <div className="product-card" onClick={() => navigate('details', product)}>
            <div 
                className="product-img"
                style={{ backgroundImage: `url(${product.imageUrl})` }}
                onError={(e) => { e.target.onerror = null; e.target.style.backgroundImage = "url(https://placehold.co/400x300/cccccc/333333?text=Image+Unavailable)"; }}
            ></div>
            
            <div className="product-info">
                <h3 onClick={(e) => { e.stopPropagation(); navigate('details', product); }}>{product.name}</h3>
                <p>{product.description.substring(0, 70)}{product.description.length > 70 ? '...' : ''}</p>
                
                <div className="price-cart">
                    <span className="price">₱{product.price.toFixed(2)}</span>
                    
                    <button
                        onClick={handleAddToCart}
                        className="cart-btn"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};


const ProductListPage = ({ navigate, onAddToCart }) => {
    const products = initialProducts;

    return (
        <section className="products-page">
            <h2>Our Crafting Essentials</h2>
            <p>Explore our curated collection of high-quality art and craft supplies.</p>
            
            <div className="product-grid-page">
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        navigate={navigate}
                        onAddToCart={onAddToCart}
                    />
                ))}
            </div>
        </section>
    );
};


const ProductDetailsPage = ({ product, navigate, onAddToCart }) => {
    const productDetails = initialProducts.find(p => p.id === product?.id) || product;
    if (!productDetails) {
        return <div className="p-10 text-center"><h2 className={`text-3xl ${BRAND_PINK_TEXT}`}>Product not found.</h2><button onClick={() => navigate('products')} className="mt-4 nav-link">Go to Catalog</button></div>;
    }

    return (
        <div className="details-container">
            <button 
                onClick={() => navigate('products')} 
                className="back-link"
            >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                Back to Products
            </button>

            <div className="details-grid">
                
                <div className="details-image-box">
                    <img 
                        src={productDetails.imageUrl} 
                        alt={productDetails.name} 
                        className="details-product-img" 
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x450/cccccc/333333?text=Image+Unavailable"; }}
                    />
                </div>

                
                <div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3">{productDetails.name}</h1>
                    <p className="price">
                        ₱{productDetails.price.toFixed(2)}
                    </p>
                    
                    <p className="text-gray-700 leading-relaxed mb-8">
                        {productDetails.description}
                    </p>

                    <div className="details-button-group">
                        <button
                            onClick={() => onAddToCart(productDetails)}
                            className="primary-add-to-cart-btn"
                        >
                            Add to Cart
                        </button>
                        <button
                            onClick={() => navigate('cart')}
                            className="secondary-btn"
                        >
                            View Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


const CartPage = ({ navigate, updateItem, getCartItems }) => {
    
    const items = getCartFromStorage();
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const CartItem = ({ item }) => (
        
        <div className="cart-item-row">
            <div className="cart-item-details">
                
                <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="cart-item-thumbnail" 
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/64x64/cccccc/333333?text=Item"; }}
                />
                <div className='flex-grow'>
                    <p className="font-semibold text-gray-900" title={item.name}>{item.name}</p>
                    <p className="text-gray-500 text-sm">₱{item.price.toFixed(2)}</p>
                </div>
            </div>

            <div className="cart-item-controls">
                
                <div className='qty-controls'>
                    <button 
                        onClick={() => updateItem(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                    >
                        −
                    </button>
                    <span className="text-gray-800">{item.quantity}</span>
                    <button 
                        onClick={() => updateItem(item.id, item.quantity + 1)}
                    >
                        +
                    </button>
                </div>
                
                <p className="font-bold text-gray-800 w-20 text-right">₱{(item.price * item.quantity).toFixed(2)}</p>
                
                
                <button 
                    onClick={() => updateItem(item.id, 0)} 
                    className="remove-item-btn"
                    aria-label="Remove Item"
                >
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
            </div>
        </div>
    );

    return (
        <div className="checkout-page-container"> 
            <h2 
                className="cart-title-brand"
            >
                Your Shopping Cart
            </h2>

            {items.length === 0 ? (
                
                <div className="empty-cart-card">
        
                    <p style={{
                        fontSize: '1.25rem',
                        color: '#e54b67',
                        marginBottom: '1.5rem'
                    }}>
                        Your cart is empty. Time to get crafting!
                    </p>
                    
                    {}
                    <button
                        onClick={() => navigate('products')}
                        className="empty-cart-link"
                    >
                        Start Shopping
                    </button>
                </div>
            ) : (
                <div className="cart-items-box">
                    
                    <div className="divide-y divide-gray-100">
                        {items.map(item => <CartItem key={item.id} item={item} />)}
                    </div>
                    
                    
                    <div className="cart-actions-box">
                        <div className="text-xl font-bold text-gray-900">
                            Subtotal: <span className={BRAND_PINK_TEXT}>₱{total.toFixed(2)}</span>
                        </div>
                        
                        
                        <div className="cart-action-buttons">
                            <button
                                onClick={() => navigate('products')}
                                className="continue-shopping-btn"
                            >
                                Continue Shopping
                            </button>
                            <button
                                onClick={() => navigate('checkout')}
                                
                                className="primary-add-to-cart-btn"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const CheckoutPage = ({ navigate, clearCart, getCartItems }) => {
    const cartItems = getCartFromStorage();
    const [isProcessing, setIsProcessing] = useState(false);

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 0 ? 5.00 : 0.00; 
    const taxRate = 0.05; 
    const tax = subtotal * taxRate;
    const finalTotal = subtotal + shipping + tax;

    const handlePlaceOrder = (e) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            alert("Your cart is empty! Please add items before checking out.");
            navigate('products');
            return;
        }

        setIsProcessing(true);
        
        setTimeout(() => {
            clearCart(); 
            setIsProcessing(false);
            alert("✅ Order placed successfully! Thank you for shopping with Crafty Corner.");
            navigate('home'); 
        }, 2000);
    };

    return (
        <div className="checkout-page-container">
            <h1 className={`text-4xl font-bold ${BRAND_PINK_TEXT} mb-8 text-center`}>Secure Checkout</h1>
            
            <div className="checkout-grid">

                
                <form onSubmit={handlePlaceOrder} className="checkout-form-box">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">Shipping & Payment</h3>
                    
                    
                    <div className="form-field-wrapper">
                        <input type="text" placeholder="Full Name" required className="checkout-input" />
                    </div>
                    <div className="form-field-wrapper">
                        <input type="email" placeholder="Email Address" required className="checkout-input" />
                    </div>
                    <div className="form-field-wrapper">
                        <input type="text" placeholder="Address Line 1" required className="checkout-input" />

                    </div> 
                    <div className="form-field-wrapper"> 
                        <input type="text" placeholder="City" required className="checkout-input" />
                    </div>
                    
                    <div className="form-field-wrapper"> 
                        <input type="text" placeholder="Postal Code" required className="checkout-input" />
                    </div>

                    <select required className="checkout-input">
                        <option value="">Select Payment Option</option>
                        <option value="cod">Cash on Delivery</option>
                        <option value="gcash">GCash</option> 
                        <option value="card">Credit / Debit Card</option>
                    </select>

                    <button
                        type="submit"
                        disabled={cartItems.length === 0 || isProcessing}
                        
                        className="primary-checkout-btn" 
                    >
                        {isProcessing ? 'Processing Order...' : `Place Order – ₱${finalTotal.toFixed(2)}`}
                    </button>
                    
                    <p className="text-xs text-gray-500 text-center mt-3">By placing your order, you agree to the terms and conditions.</p>
                </form>

                
                
                <div className="order-summary-box">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h3>
                    
                    <div className="space-y-2 text-gray-700">
                        <div className="summary-line-item"><span>Items ({cartItems.length})</span><span>₱{subtotal.toFixed(2)}</span></div>
                        <div className="summary-line-item"><span>Shipping</span><span>₱{shipping.toFixed(2)}</span></div>
                        <div className="summary-line-item border-b border-gray-300 pb-2"><span>Tax (5%)</span><span>₱{tax.toFixed(2)}</span></div>
                        
                        <div className={`summary-line-item summary-total ${BRAND_PINK_TEXT}`}><span>Order Total</span><span>₱{finalTotal.toFixed(2)}</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
};


const Footer = () => (
    <footer className="footer">
        <p>Crafty Corner &copy; 2025. All rights reserved.</p>
        <p>Inspiring creativity, one project at a time.</p>
    </footer>
);


const App = () => {
   
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null); 
    const [currentPage, setCurrentPage] = useState('home');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cartItems, setCartItems] = useState(getCartFromStorage);

    
    useEffect(() => {
        saveCartToStorage(cartItems);
    }, [cartItems]);

    useEffect(() => {
        if (userRole) {
            localStorage.setItem('userRole', userRole);
            setCurrentPage(userRole === 'user' ? 'home' : 'adminDashboard'); 
        } else {
            localStorage.removeItem('userRole');
        }
    }, [userRole]);


    const handleLogin = (role) => {
        setUserRole(role);
    };

    const handleLogout = () => {
        setUserRole(null);
        clearCart(); 
        setCurrentPage('home'); 
    };

    const navigate = (page, product = null) => {
        if (userRole === 'admin' && page !== 'adminDashboard') return; 
        setCurrentPage(page);
        setSelectedProduct(product);
        window.scrollTo(0, 0);
    };

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { ...product, quantity: 1, imageUrl: product.imageUrl }]; 
        });
    };
    
    const updateCartItem = (id, newQuantity) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            ).filter(item => item.quantity > 0)
        );
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cart'); 
    };


    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const renderPage = () => {
        if (!userRole) {
            return <Login onLogin={handleLogin} />;
        }

        if (userRole === 'admin') {
            return <AdminDashboard onLogout={handleLogout} />;
        }

        // USER PAGES
        switch (currentPage) {
            case 'home':
                return <HomePage navigate={navigate} />;
            case 'products':
                return <ProductListPage navigate={navigate} onAddToCart={addToCart} />;
            case 'details':
                const productDetails = initialProducts.find(p => p.id === selectedProduct?.id) || selectedProduct;
                return <ProductDetailsPage product={productDetails} navigate={navigate} onAddToCart={addToCart} />;
            case 'cart':
                return <CartPage navigate={navigate} updateItem={updateCartItem} />;
            case 'checkout':
                return <CheckoutPage navigate={navigate} clearCart={clearCart} />;
            default:
                return <HomePage navigate={navigate} />;
        }
    };

    return (
        <> 
            {userRole && (userRole === 'user' ? (
                <Navbar navigate={navigate} currentPage={currentPage} cartItemCount={cartItemCount} onLogout={handleLogout} userRole={userRole} />
            ) : (
                <header className="navbar"></header> 
            ))}

            <main className="flex-grow max-w-full">
                {renderPage()}
            </main>

            {userRole && <Footer />}
        </>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
export default App; */

/* import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
    Navigate,
    } from "react-router-dom";

    import Login from "./pages/Login";
    import AdminHome from "./pages/admin/AdminHomePage";
    import UserHomePage from "./pages/user/UserHomePage";
    import Checkout from "./pages/user/Checkout";
    import Cart from "./pages/user/Cart";
    import ProductList from "./pages/user/ProductList";
    import ProductDetails from "./pages/user/ProductDetails";

    function AppContent() {
    const navigate = useNavigate();
    const [role, setRole] = useState(null);

    // ✅ Add cart state
    const [cart, setCart] = useState([]);

    const handleNavigate = (page) => {
        if (page === "home") navigate("/user");
        else if (page === "products") navigate("/user/products");
        else if (page === "cart") navigate("/user/cart");
    };

    const handleLogin = (userRole) => {
        setRole(userRole);
        if (userRole === "admin") navigate("/admin");
        else if (userRole === "user") navigate("/user");
    };

    const handleLogout = () => {
        setRole(null);
        navigate("/login");
    };

    const handleAddToCart = (product) => {
        setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === product.id);
        if (existingItem) {
            return prevCart.map((item) =>
            item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
        } else {
            return [...prevCart, { ...product, quantity: 1 }];
        }
        });
    };

    return (
        <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {}
        <Route path="/user" element={<UserHomePage onLogout={handleLogout} />} />
        <Route path="/user/products" element={<ProductList />} />
        <Route path="/user/products/:id" element={<ProductDetails onAddToCart={handleAddToCart} />} />
        <Route path="/user/cart" element={<Cart cart={cart} setCart={setCart} onLogout={handleLogout} />} />
        <Route path="/user/checkout" element={<Checkout />} />

        {}
        <Route path="/admin" element={<AdminHome onLogout={handleLogout} />} />

        {}
        <Route path="*" element={<Login onLogin={handleLogin} />} />
        </Routes>
    );
    }

    function App() {
    return (
        <Router>
        <AppContent />
        </Router>
    );
}

export default App; */




// MIDTERM LAB EXAM


/* import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskEdit from './components/TaskEdit';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  
  const API_URL = 'http://localhost:8082/api/tasks';

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError("Failed to fetch tasks: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskAdded = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (response.status !== 204 && !response.ok) {
            throw new Error('Failed to delete task.');
       }
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError("Failed to delete task: " + err.message);
    }
  };

  const handleEditClick = (task) => {
    setCurrentTask(task);
    setIsEditing(true);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    setIsEditing(false);
    setCurrentTask(null);
  };

  const handleMarkCompleted = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'completed' }),
      });

      if (!response.ok) {
        throw new Error('Failed to mark task as completed.');
      }

      const completedTask = await response.json();
      handleTaskUpdated(completedTask);
    } catch (err) {
      setError("Failed to complete task: " + err.message);
    }
  };


  if (loading) return <div className="loading">Loading tasks...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="App">
      <h1>Task Management System</h1>
      <hr />
      {isEditing ? (
        <TaskEdit
          task={currentTask}
          onTaskUpdated={handleTaskUpdated}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <TaskForm onTaskAdded={handleTaskAdded} />
      )}
      <hr />
      <TaskList 
        tasks={tasks} 
        onDelete={handleDelete}
        onEditClick={handleEditClick}
        onMarkCompleted={handleMarkCompleted}
      />
    </div>
  );
}

export default App; */

import React, { useState } from 'react';

const MenuIcon = (props) => (
    <svg {...props} className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
);
const XIcon = (props) => (
    <svg {...props} className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const MailIcon = (props) => (
    <svg {...props} className="contact-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const CodeIcon = (props) => (
    <svg {...props} className="project-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLineline join="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
);
const BriefcaseIcon = (props) => (
    <svg {...props} className="contact-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 2a2 2 0 0 0-2 2v3h-4V4a2 2 0 0 0-2-2"/></svg>
);


const portfolioData = {
    logoName: "lineauno",
    name: "Andrea Pauline Monis",
    title: "Full Stack Developer",
    tagline: "Building clean, responsive web experiences.",
    email: "andreapaulinemonis@gmail.com",
    phone: "09123456789",
    about: "I specialize in modern JavaScript frameworks, primarily React. My goal is to create intuitive and performance-driven user interfaces. I have practical experience connecting frontend applications to Laravel.",
    skills: [
        "React", "JavaScript", "HTML5", "Standard CSS", "Git", "Laravel API Integration"
    ],
    projects: [
        { title: "Escapism Tracker", description: "A website displaying all the list of diverse media consumed by me." },
        { title: "Upcoming: Course Reviewers", description: "Responsive display of available reviewers for each course I'm taking as a BSCS student." },
    ]
};

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navItems = ["About", "Skills", "Projects", "Contact"];

    return (
        <header className="header">
            <div className="header-container">
                <a href="#about" className="logo">
                    {portfolioData.logoName}
                </a>
                
                <nav className="nav-desktop">
                    {navItems.map(item => (
                        <a key={item} href={`#${item.toLowerCase()}`} className="nav-item-link">
                            {item}
                        </a>
                    ))}
                </nav>

                <button 
                    className="menu-button"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle navigation"
                >
                    {isOpen ? <XIcon /> : <MenuIcon />}
                </button>
            </div>

            {isOpen && (
                <div className="nav-mobile-wrapper">
                    <nav className="nav-mobile">
                        {navItems.map(item => (
                            <a key={item} href={`#${item.toLowerCase()}`}
                               onClick={() => setIsOpen(false)}
                            >
                                {item}
                            </a>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};

const Section = ({ id, title, children }) => (
    <section id={id} className={`section ${id}`}>
        <div className="container">
            {title && <h2 className="section-title">{title}</h2>}
            {children}
        </div>
    </section>
);

const App = () => {
    return (
        <div className="main-app">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=IM+Fell+English+SC&display=swap');

                :root {
                    --color-parchment: #f9f4e2;
                    --color-dark-parchment: #ede4d1;
                    --color-ink: #3c2f2f;
                    --color-primary: #556b2f;
                    --color-accent: #b8860b;
                    --font-title: 'Cinzel', serif;
                    --font-body: 'IM Fell English SC', serif;
                    --box-shadow-parchment: 0 4px 6px rgba(0, 0, 0, 0.1);
                    --box-shadow-deep: 0 6px 12px rgba(0, 0, 0, 0.25);
                }

                body {
                    margin: 0;
                    padding: 0;
                    font-family: var(--font-body);
                    background-color: var(--color-parchment);
                    color: var(--color-ink);
                    line-height: 1.8;
                }

                .main-app {
                    min-height: 100vh;
                }

                .header {
                    position: sticky;
                    top: 0;
                    z-index: 50;
                    background-color: var(--color-dark-parchment);
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    border-bottom: 3px double var(--color-accent);
                }

                .header-container {
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 1rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .logo {
                    font-family: var(--font-title);
                    font-size: 1.8rem;
                    font-weight: 700;
                    color: var(--color-primary);
                    text-decoration: none;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    text-shadow: 1px 1px 0 var(--color-accent);
                }

                .nav-desktop {
                    display: none;
                    gap: 2rem;
                    
                }

                .nav-desktop a {
                    color: var(--color-ink);
                    text-decoration: none;
                    font-family: var(--font-title);
                    font-weight: 700;
                    text-transform: uppercase;
                    font-size: 0.9rem;
                    padding: 0.5rem 0;
                    transition: color 0.3s, text-shadow 0.3s;
                }

                .nav-desktop a:hover {
                    color: var(--color-primary);
                    text-shadow: 0 0 5px var(--color-accent);
                }
                
                .nav-item-link {
                    position: relative;
                }
                .nav-item-link::after {
                    content: '';
                    position: absolute;
                    width: 0;
                    height: 2px;
                    bottom: 0;
                    left: 0;
                    background-color: var(--color-accent);
                    transition: width 0.3s ease-out;
                }
                .nav-item-link:hover::after {
                    width: 100%;
                }


                .menu-button {
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 0.5rem;
                    display: block;
                    color: var(--color-primary);
                }

                .nav-mobile-wrapper {
                    position: absolute;
                    width: 100%;
                    background-color: var(--color-dark-parchment);
                    box-shadow: var(--box-shadow-deep);
                    border-top: 1px solid var(--color-accent);
                }
                
                .nav-mobile {
                    display: flex;
                    flex-direction: column;
                    padding: 1rem;
                    max-width: 900px;
                    margin: 0 auto;
                }

                .nav-mobile a {
                    padding: 0.75rem 0;
                    color: var(--color-ink);
                    text-decoration: none;
                    font-family: var(--font-body);
                    transition: background-color 0.3s, color 0.3s;
                }

                .nav-mobile a:hover {
                    background-color: rgba(85, 107, 47, 0.1);
                    color: var(--color-primary);
                    padding-left: 0.75rem;
                    border-radius: 4px;
                }


                .section {
                    padding: 5rem 0;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                }

                .container {
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 0 1rem;
                }

                .section-title {
                    font-family: var(--font-title);
                    font-size: 2.5rem;
                    font-weight: 700;
                    text-align: center;
                    color: var(--color-primary);
                    margin-bottom: 3rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    border-bottom: 2px solid var(--color-accent);
                    display: inline-block;
                    padding-bottom: 0.5rem;
                    width: fit-content;
                    margin-left: auto;
                    margin-right: auto;
                }

                .hero-content {
                    text-align: center;
                    padding-top: 2rem;
                }

                .hero-name {
                    font-family: var(--font-title);
                    font-size: 4rem;
                    font-weight: 700;
                    color: var(--color-ink);
                    margin-bottom: 0.5rem;
                    text-shadow: 2px 2px 0 var(--color-accent);
                }

                .hero-title {
                    font-family: var(--font-body);
                    font-size: 1.5rem;
                    font-weight: 400;
                    color: var(--color-primary);
                    margin-bottom: 1.5rem;
                    font-style: italic;
                }

                .hero-tagline {
                    font-size: 1.2rem;
                    color: var(--color-ink);
                    font-style: italic;
                    max-width: 700px;
                    margin: 0 auto 3rem;
                }

                .about-card {
                    background-color: var(--color-dark-parchment);
                    padding: 2.5rem;
                    border-radius: 4px;
                    box-shadow: var(--box-shadow-parchment);
                    margin-top: 3rem;
                    border: 1px solid var(--color-accent);
                }

                .about-card h3 {
                    font-family: var(--font-title);
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: var(--color-primary);
                    margin-bottom: 1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-transform: uppercase;
                }
                
                .about-card h3 svg {
                    margin-right: 0.75rem;
                    color: var(--color-accent);
                    width: 24px;
                    height: 24px;
                }


                .about-card p {
                    line-height: 1.8;
                    font-size: 1.1rem;
                }

                .skills-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1rem;
                    justify-content: center;
                }

                .skill-tag {
                    padding: 0.75rem 1.5rem;
                    background-color: var(--color-primary); 
                    color: var(--color-parchment);
                    border-radius: 4px;
                    font-weight: 700;
                    font-family: var(--font-title);
                    text-transform: uppercase;
                    box-shadow: 2px 2px 0 var(--color-accent);
                    transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
                    border: 1px solid var(--color-accent);
                }

                .skill-tag:hover {
                    background-color: #6b8849;
                    transform: translateY(-2px);
                    box-shadow: 4px 4px 0 var(--color-accent);
                }

                .projects-grid {
                    display: grid;
                    gap: 2.5rem;
                }

                .project-card {
                    background-color: var(--color-dark-parchment);
                    padding: 2rem;
                    border-radius: 4px;
                    box-shadow: var(--box-shadow-parchment);
                    border-left: 5px solid var(--color-accent);
                    transition: box-shadow 0.3s, transform 0.3s;
                    position: relative;
                }
                
                .project-card::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: -1px;
                    bottom: 0;
                    width: 5px;
                    background: repeating-linear-gradient(-45deg, var(--color-accent), var(--color-accent) 5px, var(--color-dark-parchment) 5px, var(--color-dark-parchment) 10px);
                }

                .project-card:hover {
                    box-shadow: var(--box-shadow-deep);
                    transform: translateX(0);
                }

                .project-card h3 {
                    font-family: var(--font-title);
                    font-size: 1.4rem;
                    font-weight: 700;
                    color: var(--color-ink);
                    margin-bottom: 0.75rem;
                    display: flex;
                    align-items: center;
                }

                .project-card p {
                    color: var(--color-ink);
                    font-style: italic;
                    line-height: 1.6;
                    padding-left: 2rem;
                }

                .project-icon {
                    width: 24px;
                    height: 24px;
                    color: var(--color-primary);
                    margin-right: 0.75rem;
                }
                
                .contact-card {
                    background-color: var(--color-dark-parchment);
                    padding: 3rem;
                    border-radius: 8px;
                    box-shadow: var(--box-shadow-deep);
                    text-align: center;
                    border: 3px double var(--color-primary);
                }
                
                .contact-card p {
                    font-size: 1.1rem;
                    color: var(--color-ink);
                    margin-bottom: 2rem;
                }

                .contact-info {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    justify-content: center;
                    align-items: center;
                }

                .contact-item {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--color-parchment);
                    font-weight: 700;
                    text-decoration: none;
                    padding: 0.75rem 1.5rem;
                    border: 2px solid var(--color-accent);
                    border-radius: 4px;
                    background-color: var(--color-primary);
                    transition: all 0.3s;
                    box-shadow: 2px 2px 0 var(--color-accent);
                    font-family: var(--font-body);
                    text-transform: uppercase;
                }
                
                .contact-item:last-child {
                    background-color: var(--color-accent);
                    color: var(--color-ink);
                    border-color: var(--color-primary);
                    box-shadow: 2px 2px 0 var(--color-primary);
                }
                
                .contact-item:first-child:hover {
                    background-color: #6b8849;
                    box-shadow: 4px 4px 0 var(--color-accent);
                }
                .contact-item:last-child:hover {
                    background-color: #c9a33d;
                    box-shadow: 4px 4px 0 var(--color-primary);
                }


                .contact-icon {
                    width: 20px;
                    height: 20px;
                    margin-right: 0.5rem;
                    stroke: var(--color-parchment);
                }
                
                .contact-item:last-child .contact-icon {
                    stroke: var(--color-ink);
                }


                .footer {
                    background-color: var(--color-ink);
                    color: var(--color-dark-parchment);
                    padding: 1.5rem 0;
                    text-align: center;
                    font-size: 0.9rem;
                    border-top: 3px double var(--color-accent);
                }


                @media (min-width: 768px) {
                    .nav-desktop {
                        display: flex;
                    }
                    .menu-button {
                        display: none;
                    }
                    .projects-grid {
                        grid-template-columns: 1fr 1fr;
                    }
                    .contact-info {
                        flex-direction: row;
                        gap: 2rem;
                    }
                }
            `}</style>

            <Header />
            <main>
                
                <Section id="about">
                    <div className="hero-content">
                        <h1 className="hero-name">{portfolioData.name}</h1>
                        <p className="hero-title">{portfolioData.title}</p>
                        <p className="hero-tagline">{portfolioData.tagline}</p>
                    </div>

                    <div className="about-card">
                        <h3><BriefcaseIcon />About Me</h3>
                        <p>{portfolioData.about}</p>
                    </div>
                </Section>

                
                <Section id="skills" title="Technical Skills">
                    <div className="skills-list">
                        {portfolioData.skills.map(skill => (
                            <div key={skill} className="skill-tag">
                                {skill}
                            </div>
                        ))}
                    </div>
                </Section>

                <Section id="projects" title="Featured Projects">
                    <div className="projects-grid">
                        {portfolioData.projects.map((project, index) => (
                            <div key={index} className="project-card">
                                <h3>
                                    <CodeIcon />
                                    {project.title}
                                </h3>
                                <p>{project.description}</p>
                            </div>
                        ))}
                    </div>
                </Section>

                <Section id="contact" title="Get In Touch">
                    <div className="contact-card">
                        <p className="text-lg text-gray-700 mb-6">I am currently available for new opportunities. Feel free to connect!</p>
                        <div className="contact-info">
                            <a href={`mailto:${portfolioData.email}`} className="contact-item">
                                <MailIcon />
                                {portfolioData.email}
                            </a>
                            <div className="contact-item">
                                <BriefcaseIcon />
                                {portfolioData.phone}
                            </div>
                        </div>
                    </div>
                </Section>

            </main>
            
            
            <footer className="footer">
                <div className="container">
                    &copy; {new Date().getFullYear()} {portfolioData.name}. Final Lab Activity 1 for CCS112.
                </div>
            </footer>
        </div>
    );
};

export default App;


// PR1

/* import MediaTracker from './components/MediaTracker';
import './App.css';

function App() {
  return (
    <MediaTracker />
  );
}
export default App; */