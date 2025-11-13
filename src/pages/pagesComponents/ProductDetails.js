import React from 'react';
import { initialProducts, BRAND_PINK_TEXT } from '../data/products';

export const ProductDetails = ({ product, navigate, onAddToCart }) => {
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