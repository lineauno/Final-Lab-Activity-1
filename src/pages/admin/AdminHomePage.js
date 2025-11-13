import React from "react";
import Navbar from "../pagesComponents/Navbar";

export default function AdminHomePage({ onLogout }) {
    const navigate = (page) => {
        console.log("Navigating to:", page);
    };

    return (
        <>
        <Navbar
            navigate={navigate}
            currentPage="home"
            cartItemCount={0}   
            onLogout={onLogout} 
        />

        <div className="admin-dashboard">
            <h2>Welcome to Admin Dashboard</h2>
            {}
        </div>
        </>
    );
}