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
      try {
        const items = JSON.parse(savedCart);
        setCartItems(items);
        calculateTotals(items);
      } catch (e) {
        console.error('Failed to parse cart:', e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    calculateTotals(cartItems);
  }, [cartItems]);

  const calculateTotals = (items) => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    setCartCount(count);
    setCartTotal(total);
  };

  const addToCart = (productOrCustomItem, quantity = 1) => {
    let newItem;

    // Check if it's already a formatted custom item from ProductModal
    if (productOrCustomItem.product) {
      const { product, variant, options, itemNotes, unitPrice } = productOrCustomItem;
      newItem = {
        cartKey: `${product.id}-${variant?.id || 'base'}-${options.map((o) => o.id).sort().join('-')}`,
        product_id: product.id,
        product_variant_id: variant?.id || null,
        name: product.name,
        variant_name: variant?.name || null,
        unitPrice: unitPrice || (product.price + (variant?.price_modifier || 0)),
        quantity: productOrCustomItem.quantity || quantity,
        options: options || [],
        item_notes: itemNotes || '',
        image_url: product.image_url,
      };
    } else {
      // Standard product without modal customization
      const product = productOrCustomItem;
      newItem = {
        cartKey: `${product.id}-base-none`,
        product_id: product.id,
        product_variant_id: null,
        name: product.name,
        variant_name: null,
        unitPrice: parseFloat(product.price),
        quantity,
        options: [],
        item_notes: '',
        image_url: product.image_url,
      };
    }

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((i) => i.cartKey === newItem.cartKey);
      if (existingIndex !== -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += newItem.quantity;
        return updated;
      } else {
        return [...prevItems, newItem];
      }
    });
  };

  const updateQuantity = (index, quantity) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }
    setCartItems((prevItems) => {
      const updated = [...prevItems];
      updated[index].quantity = quantity;
      return updated;
    });
  };

  const removeFromCart = (index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
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
