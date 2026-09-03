import React, { useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../Logo';
import { useCart } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';

export default function Header() {
    const { cartCount, setIsCartOpen } = useCart();
    const { user } = useContext(AuthContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const closeMenu = () => setIsMobileMenuOpen(false);

    const navLinks = [
        { path: "/", label: "Home" },
        { path: "/products", label: "Shop" },
        { path: "/about", label: "About" },
        { path: "/contact", label: "Contact Us" }
    ];

    return (
        <header className="shadow-lg sticky z-50 top-0 bg-gray-950/80 backdrop-blur-lg border-b border-gray-800">
            <nav className="px-4 lg:px-6 py-4 mx-auto max-w-screen-xl">
                <div className="flex justify-between items-center">

                    <div className="flex justify-start lg:w-1/4">
                        <Link to="/" onClick={closeMenu} className="flex items-center transition-transform hover:scale-105">
                            <Logo className="h-10 w-auto" />
                        </Link>
                    </div>

                    <div className="hidden lg:flex justify-center w-full lg:w-2/4">
                        <ul className="flex font-medium space-x-8">
                            {navLinks.map((item) => (
                                <li key={item.path}>
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `block duration-200 transition-colors ${isActive ? "text-indigo-400 font-bold" : "text-gray-400 font-semibold hover:text-indigo-300"}`
                                        }
                                    >
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex justify-end items-center gap-2 sm:gap-4 lg:w-1/4">
                        
                        {/* Profile Icon / Auth Links */}
                        <div className="hidden lg:flex items-center gap-4 mr-2 border-r border-gray-800 pr-4">
                            {user ? (
                                <>
                                    {/* Admin Button Conditionally Rendered */}
                                    {user.isAdmin && (
                                        <Link to="/admin" className="text-sm font-semibold text-white bg-emerald-600 px-3 py-1.5 rounded-lg hover:bg-emerald-500 transition-colors">
                                            Admin Panel
                                        </Link>
                                    )}
                                    <Link to="/profile" className="p-2 text-gray-300 hover:text-indigo-400 transition-colors" title="My Profile">
                                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="text-sm font-semibold text-gray-300 hover:text-indigo-400 transition-colors">Login</Link>
                                    <Link to="/register" className="text-sm font-semibold text-white bg-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-500 transition-colors">Sign Up</Link>
                                </>
                            )}
                        </div>

                        {/* Cart Icon */}
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative p-2 text-gray-300 hover:text-indigo-400 transition-colors"
                        >
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-indigo-600 rounded-full shadow-lg shadow-indigo-500/50">
                                {cartCount || 0}
                            </span>
                        </button>

                        {/* Mobile Hamburger */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 text-gray-300 hover:text-indigo-400 transition-colors focus:outline-none"
                        >
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <div className="lg:hidden pt-4 pb-2 border-t border-gray-800 mt-4 animate-in fade-in slide-in-from-top-4 duration-200">
                        <ul className="flex flex-col space-y-2 mb-4">
                            {navLinks.map((item) => (
                                <li key={item.path}>
                                    <NavLink to={item.path} onClick={closeMenu} className={({ isActive }) => `block px-4 py-3 rounded-xl duration-200 transition-colors ${isActive ? "bg-gray-900 text-indigo-400 font-bold border border-gray-800" : "text-gray-400 font-semibold hover:bg-gray-900 hover:text-indigo-300"}`}>
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                        
                        <div className="border-t border-gray-800 pt-4 flex flex-col space-y-2">
                            {user ? (
                                <>
                                    {/* Mobile Admin Button Conditionally Rendered */}
                                    {user.isAdmin && (
                                        <Link to="/admin" onClick={closeMenu} className="flex items-center gap-3 px-4 py-3 text-emerald-400 font-semibold hover:bg-gray-900 hover:text-emerald-300 rounded-xl">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            </svg>
                                            Admin Panel
                                        </Link>
                                    )}
                                    <Link to="/profile" onClick={closeMenu} className="flex items-center gap-3 px-4 py-3 text-gray-400 font-semibold hover:bg-gray-900 hover:text-indigo-300 rounded-xl">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                        My Profile
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" onClick={closeMenu} className="block px-4 py-3 text-gray-400 font-semibold hover:bg-gray-900 hover:text-indigo-300 rounded-xl">Login</Link>
                                    <Link to="/register" onClick={closeMenu} className="block px-4 py-3 text-white font-semibold bg-indigo-600 hover:bg-indigo-500 rounded-xl text-center">Sign Up</Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}