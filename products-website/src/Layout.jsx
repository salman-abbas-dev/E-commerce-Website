import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import { CartProvider } from './context/CartContext'
import CartModal from './components/CartModal'

function Layout() {
    return (
        <CartProvider>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100 selection:bg-indigo-500 selection:text-white">
                <Header />
                <main className="flex-grow">
                    <Outlet />
                </main>
                <Footer />
                <CartModal />
            </div>
        </CartProvider>
    )
}

export default Layout