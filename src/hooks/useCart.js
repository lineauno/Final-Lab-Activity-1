import { useState, useEffect } from 'react';

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

export const useCart = () => {
    const [cartItems, setCartItems] = useState(getCartFromStorage);

    useEffect(() => {
        saveCartToStorage(cartItems);
    }, [cartItems]);

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

    return {
        cartItems, 
        cartItemCount, 
        addToCart, 
        updateCartItem,
        clearCart, 
        getCartFromStorage, 
    };
};