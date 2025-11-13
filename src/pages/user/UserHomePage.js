import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../pagesComponents/Navbar";
import Footer from "../pagesComponents/Footer";
import { initialProducts } from "../../data/products";
import "../../App.css"; 

function UserHomePage({ onLogout }) {
    const navigate = useNavigate();
    const [cartItemCount, setCartItemCount] = useState(0);

    const handleNavigate = (page) => {
        if (page === "home") navigate("/user");
        else if (page === "products") navigate("/user/products");
        else if (page === "cart") navigate("/user/cart");
    };

    const featuredProducts = initialProducts.slice(0, 4);

    return (
        <>
            <Navbar
                navigate={handleNavigate}
                currentPage="home"
                cartItemCount={cartItemCount}
                onLogout={onLogout}
            />

            {/* Hero Section */}
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
                                onClick={() => handleNavigate('products')} 
                                className="shop-now-button" 
                            >
                                Shop Now
                            </button>
                        </div>
                    </div>
            
                    
                    <div className="featured-products-container bg-white"> 
                        <div className="max-w-7xl mx-auto">
                            <h3 className={`brand text-3xl font-bold mb-10`}>Featured Products</h3>
                            
                            <div className="featured-grid">
                                {initialProducts.slice(0, 4).map(product => (
                                    <div key={product.id} 
                                        className="featured-card"
                                        style={{backgroundImage: `url(${product.imageUrl})`}}
                                        // FIX: Navigate directly to the product details route using the product ID
                                        onClick={() => navigate(`/user/products/${product.id}`)}>
                                        
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

            <Footer />
        </>
    );
}

export default UserHomePage;
