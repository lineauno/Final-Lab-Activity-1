import React, { useState } from 'react';
import { BRAND_PINK_TEXT } from '../../data/products';
import { useCart } from '../hooks/useCart';

export const Checkout = ({ navigate, clearCart }) => {
    const { getCartFromStorage } = useCart();
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
        
        // Simulate an API call delay
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

export default Checkout;