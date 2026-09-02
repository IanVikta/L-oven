import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const items = JSON.parse(savedCart);
      setCartItems(items);
      calculateTotals(items);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    calculateTotals(cartItems);
  }, [cartItems]);

  const calculateTotals = (items) => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setCartCount(count);
    setCartTotal(total);
  };

  const addToCart = (product, quantity = 1, options = []) => {
    const optionsPrice = options.reduce((sum, opt) => sum + (opt.price_modifier || 0), 0);
    const itemPrice = parseFloat(product.price) + optionsPrice;
    
    const cartItem = {
      id: product.id,
      variant_id: product.variant_id || null,
      name: product.name,
      variant_name: product.variant_name || null,
      price: itemPrice,
      quantity,
      options,
      image: product.image_url || null,
    };

    // Check if item already exists with same options
    const existingItemIndex = cartItems.findIndex(
      item => 
        item.id === cartItem.id && 
        item.variant_id === cartItem.variant_id &&
        JSON.stringify(item.options) === JSON.stringify(cartItem.options)
    );

    if (existingItemIndex !== -1) {
      // Update quantity of existing item
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += quantity;
      setCartItems(updatedItems);
    } else {
      // Add new item
      setCartItems([...cartItems, cartItem]);
    }
  };

  const updateQuantity = (index, quantity) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }
    const updatedItems = [...cartItems];
    updatedItems[index].quantity = quantity;
    setCartItems(updatedItems);
  };

  const removeFromCart = (index) => {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedItems);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
