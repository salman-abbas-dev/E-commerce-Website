import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function CartModal() {
    const { cart, isCartOpen, setIsCartOpen, clearCart, cartTotal, removeFromCart, updateQuantity } = useCart();
    const [orderPlaced, setOrderPlaced] = useState(false);

    if (!isCartOpen) return null;

    const handleCheckout = (e) => {
        e.preventDefault();
        setOrderPlaced(true);
        setTimeout(() => {
            clearCart();
            setOrderPlaced(false);
            setIsCartOpen(false);
        }, 4000);
    };

    // Calculate new absolute quantity 
    const handleUpdateQty = (productId, currentQty, change) => {
        const newQty = currentQty + change;
        if (newQty <= 0) {
            removeFromCart(productId);
        } else {
            updateQuantity(productId, newQty);
        }
    };

    const cartItems = cart?.items || [];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-gray-900 w-full max-w-2xl rounded-3xl shadow-2xl border border-gray-800 overflow-hidden flex flex-col max-h-[90vh]">
                <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center bg-gray-950/50">
                    <h2 className="text-xl font-bold text-white">Your Cart</h2>
                    <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                <div className="overflow-y-auto p-6 flex-grow">
                    {orderPlaced ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <h3 className="text-3xl font-extrabold text-white mb-2">Order Placed!</h3>
                            <p className="text-gray-400 text-lg">Thank you for shopping at Zenith.</p>
                        </div>
                    ) : cartItems.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">Your cart is currently empty.</div>
                    ) : (
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="md:w-1/2 space-y-4">
                                <h3 className="font-semibold text-white mb-4 border-b border-gray-800 pb-2">Order Summary</h3>
                                {cartItems.map((item) => {
                                    const p = item.product;
                                    if (!p) return null; // Safety check
                                    return (
                                        <div key={p._id} className="flex gap-4 items-center border-b border-gray-800 pb-4">
                                            <img src={p.imageUrls[0]} alt={p.name} className="w-16 h-16 object-contain bg-white rounded-lg p-1 border border-gray-200" />
                                            <div className="flex-1">
                                                <h4 className="text-sm font-medium text-gray-200 line-clamp-1">{p.name}</h4>
                                                <p className="text-sm font-bold text-indigo-400 mb-2">${(p.price * item.quantity).toFixed(2)}</p>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center border border-gray-700 rounded-lg bg-gray-800">
                                                        <button onClick={() => handleUpdateQty(p._id, item.quantity, -1)} className="px-2.5 py-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded-l-lg">−</button>
                                                        <span className="px-3 py-1 text-sm font-semibold text-white bg-gray-900 border-x border-gray-700">{item.quantity}</span>
                                                        <button onClick={() => handleUpdateQty(p._id, item.quantity, 1)} className="px-2.5 py-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded-r-lg">+</button>
                                                    </div>
                                                    <button onClick={() => removeFromCart(p._id)} className="text-gray-500 hover:text-red-400 p-1">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div className="pt-2 flex justify-between items-center text-lg font-black text-white">
                                    <span>Total:</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                            </div>
                            <form onSubmit={handleCheckout} className="md:w-1/2 bg-gray-950/50 p-6 rounded-2xl border border-gray-800">
                                <h3 className="font-semibold text-white mb-4">Contact & Delivery</h3>
                                <div className="space-y-4">
                                    <input type="text" required placeholder="Full Name" className="w-full px-4 py-2 bg-gray-900 rounded-xl border border-gray-700 text-white outline-none" />
                                    <input type="email" required placeholder="Email Address" className="w-full px-4 py-2 bg-gray-900 rounded-xl border border-gray-700 text-white outline-none" />
                                    <textarea required rows="2" placeholder="Shipping Address" className="w-full px-4 py-2 bg-gray-900 rounded-xl border border-gray-700 text-white outline-none resize-none"></textarea>
                                    <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg mt-4">Place Your Order</button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}