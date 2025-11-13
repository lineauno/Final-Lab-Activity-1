import React, { useState, useEffect } from 'react';

export const Navbar = ({ navigate, currentPage, cartItemCount, onLogout }) => {
    
    const [localCartCount, setLocalCartCount] = useState(cartItemCount);

    useEffect(() => {
        setLocalCartCount(cartItemCount);
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

                    <button onClick={onLogout} className="nav-link logout-link">
                        Logout
                    </button>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;