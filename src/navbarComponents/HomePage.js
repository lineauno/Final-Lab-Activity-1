import React from 'react';
import { initialProducts } from '../data/products';

export const HomePage = ({ navigate }) => (
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