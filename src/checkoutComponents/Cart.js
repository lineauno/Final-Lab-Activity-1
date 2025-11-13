import React from 'react';
import { useCart } from '../hooks/useCart';

export const Cart = ({ navigate, updateItem }) => {
    
    const { getCartFromStorage } = useCart();
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
                            Subtotal: <span className='text-[#e54b67]'>₱{total.toFixed(2)}</span>
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