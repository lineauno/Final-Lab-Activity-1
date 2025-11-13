import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
const { useState, useEffect } = React;

const mockProducts = [
    { id: 1, name: "Premium Sketchbook", price: 18.50, description: "High-GSM paper perfect for all dry mediums. Features a pink elastic band. This detailed product description is included here for the Product Details Page.", imageUrl: "https://placehold.co/400x300/fef2f2/ef4444?text=Sketchbook", category: "Paper" },
    { id: 2, name: "Vibrant Watercolor Set", price: 35.99, description: "12 colors with high pigment saturation and travel brush. This is a high-quality artist-grade set for both studio and plein air painting.", imageUrl: "https://placehold.co/400x300/f0f9ff/0f766e?text=Watercolors", category: "Art" },
    { id: 3, name: "Luxury Rollerball Pen", price: 42.00, description: "Smooth writing with a comfortable grip, available in pastel pink. Perfect for journaling and fine note-taking. It features a fast-drying, smudge-proof ink.", imageUrl: "https://placehold.co/400x300/ffe1e8/ff8ba7?text=Pen", category: "Writing" },
    { id: 4, name: "DIY Clay Kit", price: 25.00, description: "Everything needed to sculpt and paint your own miniature figures. Includes three colors of oven-bake clay, tools, and three pots of acrylic paint.", imageUrl: "https://placehold.co/400x300/b7e4c7/333333?text=Clay+Kit", category: "Kits" },
    { id: 5, name: "Fine Detail Brush Set", price: 15.99, description: "Set of 5 brushes for precise detail work.", imageUrl: "https://placehold.co/400x300/e0f2fe/075985?text=Brushes", category: "Art" },
    { id: 6, name: "A3 Cutting Mat", price: 12.00, description: "Self-healing cutting mat for craft projects.", imageUrl: "https://placehold.co/400x300/d1d5db/374151?text=Mat", category: "Tools" },
    { id: 7, name: "Pastel Acrylic Paints", price: 29.99, description: "Set of 6 creamy pastel acrylic colors.", imageUrl: "https://placehold.co/400x300/fef3c7/b45309?text=Acrylics", category: "Art" },
    { id: 8, name: "Vintage Washi Tape", price: 6.50, description: "Set of 3 decorative adhesive tapes.", imageUrl: "https://placehold.co/400x300/f3e8ff/a855f7?text=Tape", category: "Stationery" },
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

const Navbar = ({ navigate, currentPage, cartItemCount }) => {
    
    const [localCartCount, setLocalCartCount] = useState(cartItemCount);

    useEffect(() => {
        const cart = getCartFromStorage();
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        setLocalCartCount(count);
    }, [cartItemCount]);

    const navItems = [
        { name: 'Home', page: 'home' },
        { name: 'Products', page: 'products' },
    ];

    return (
        <header className="navbar">
            <h1 className="brand" onClick={() => navigate('home')}>Crafty Corner</h1>
            
            <nav>
                <ul>
                    {navItems.map((item) => (
                        <button
                            key={item.page}
                            onClick={() => navigate(item.page)}
                            className={`nav-link ${item.page === currentPage ? 'active' : ''}`}
                        >
                            {item.name}
                        </button>
                    ))}

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
                <h3 className={`text-3xl font-bold ${BRAND_PINK_TEXT} mb-10`}>Featured Products</h3>
                
                <div className="featured-grid">
                    {mockProducts.slice(0, 4).map(product => (
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
                <h3 className={`text-2xl font-bold ${BRAND_PINK_TEXT} mb-4`}>Quality and Craftsmanship</h3>
                <p className="text-gray-700 max-w-2xl mx-auto">
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
    const products = mockProducts;

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
    const productDetails = mockProducts.find(p => p.id === product?.id) || product;
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
            <h2 className={`text-4xl font-bold ${BRAND_PINK_TEXT} mb-8 text-center`}>Your Shopping Cart</h2>

            {items.length === 0 ? (
                
                <div className={`text-center p-10 ${LIGHT_PINK_BG} rounded-xl shadow-lg`}>
                    <p className="text-xl text-gray-600 mb-4">Your cart is empty. Time to get crafting!</p>
                    <button 
                        onClick={() => navigate('products')}
                        className={`${BRAND_PINK_TEXT} hover:underline font-medium`}
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
            <h2 className={`text-4xl font-bold ${BRAND_PINK_TEXT} mb-8 text-center`}>Secure Checkout</h2>
            
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
                    {}
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
    const [currentPage, setCurrentPage] = useState('home');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cartItems, setCartItems] = useState(getCartFromStorage);

    
    useEffect(() => {
        saveCartToStorage(cartItems);
    }, [cartItems]);

    const navigate = (page, product = null) => {
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
        switch (currentPage) {
            case 'home':
                return <HomePage navigate={navigate} />;
            case 'products':
                return <ProductListPage navigate={navigate} onAddToCart={addToCart} />;
            case 'details':
                const productDetails = mockProducts.find(p => p.id === selectedProduct?.id) || selectedProduct;
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
            <Navbar navigate={navigate} currentPage={currentPage} cartItemCount={cartItemCount} />

            <main className="flex-grow max-w-full">
                {renderPage()}
            </main>

            <Footer />
        </>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
export default App;