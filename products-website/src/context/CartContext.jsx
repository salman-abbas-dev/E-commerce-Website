import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const [isCartOpen, setIsCartOpen] = useState(false); // Added missing state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useContext(AuthContext);

  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${user?.token}`,
  });

  // Derived state calculations
  const cartCount = cart.items?.reduce((total, item) => total + item.quantity, 0) || 0;
  const cartTotal = cart.totalPrice || 0;

  const fetchCart = async () => {
    if (!user) {
      setCart({ items: [], totalPrice: 0 });
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/cart', { headers: getAuthHeaders() });
      const data = await response.json();
      if (response.ok) setCart(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (product, quantity = 1) => {
    if (!user) return alert('Please log in to add items to your cart.');
    
    // Safely extract the ID whether it comes from MongoDB (_id) or Fakestore API (id)
    const productId = product._id || product.id;

    try {
      const response = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ productId, quantity }),
      });
      const data = await response.json();
      if (response.ok) {
        setCart(data);
        setIsCartOpen(true); // Automatically slide out the cart modal
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const response = await fetch('http://localhost:5000/api/cart/update', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ productId, quantity }),
      });
      const data = await response.json();
      if (response.ok) setCart(data);
    } catch (err) {
      console.error('Error updating cart:', err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/remove/${productId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      if (response.ok) setCart(data);
    } catch (err) {
      console.error('Error removing from cart:', err);
    }
  };

  const clearCart = () => {
    setCart({ items: [], totalPrice: 0 });
  };

  return (
    <CartContext.Provider
      value={{
        cart, loading, error, addToCart, updateQuantity, removeFromCart,
        isCartOpen, setIsCartOpen, cartCount, cartTotal, clearCart // Exported new variables
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);