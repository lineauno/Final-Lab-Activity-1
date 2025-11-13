import React from 'react';
import { initialProducts } from '../data/products';

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

export const ProductList = ({ navigate, onAddToCart }) => {
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