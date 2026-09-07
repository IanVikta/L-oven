import { useState, useEffect, useRef, useCallback } from 'react';
import { useCart } from '../../hooks/useCart';
import {
  isPricingFinalized,
  formatCurrency,
  formatModifierPrice,
} from '../../utils/currency';
import { getProductImage } from '../../utils/productImages';

const getDefaultVariant = (prod) => {
  if (prod?.variants && prod.variants.length > 0) {
    return prod.variants.find((v) => v.is_default) || prod.variants[0];
  }
  return null;
};

const getInitialOptions = (prod) => {
  const initial = {};
  if (prod?.option_groups) {
    prod.option_groups.forEach((group) => {
      if (group.is_required && group.items && group.items.length > 0) {
        initial[group.id] = [group.items[0].id];
      } else {
        initial[group.id] = [];
      }
    });
  }
  return initial;
};

const ProductModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();

  // Initial state derived directly on mount
  const [selectedVariant, setSelectedVariant] = useState(() => getDefaultVariant(product));
  const [selectedOptions, setSelectedOptions] = useState(() => getInitialOptions(product));
  const [quantity, setQuantity] = useState(1);
  const [itemNotes, setItemNotes] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  // Safe React state synchronization when product changes between opens
  const [prevProductId, setPrevProductId] = useState(product?.id);
  if (product && product.id !== prevProductId) {
    setPrevProductId(product.id);
    setSelectedVariant(getDefaultVariant(product));
    setSelectedOptions(getInitialOptions(product));
    setQuantity(1);
    setItemNotes('');
    setIsAdded(false);
  }

  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (isOpen && product) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen, product]);

  // Handle keyboard events (Escape key closes modal)
  useEffect(() => {
    if (!isOpen || !product) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, product, onClose]);

  // Handle outside click on backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleOptionToggle = useCallback((groupId, itemId, isSingleChoice) => {
    setSelectedOptions((prev) => {
      const currentGroup = prev[groupId] || [];
      if (isSingleChoice) {
        return { ...prev, [groupId]: [itemId] };
      } else {
        if (currentGroup.includes(itemId)) {
          return { ...prev, [groupId]: currentGroup.filter((id) => id !== itemId) };
        } else {
          return { ...prev, [groupId]: [...currentGroup, itemId] };
        }
      }
    });
  }, []);

  const calculateUnitPrice = useCallback(() => {
    let price = parseFloat(product?.price) || 0;
    if (selectedVariant && selectedVariant.price_modifier) {
      price += parseFloat(selectedVariant.price_modifier) || 0;
    }

    if (product?.option_groups) {
      product.option_groups.forEach((group) => {
        const selectedIds = selectedOptions[group.id] || [];
        group.items.forEach((item) => {
          if (selectedIds.includes(item.id) && item.price_modifier) {
            price += parseFloat(item.price_modifier) || 0;
          }
        });
      });
    }

    return price;
  }, [product, selectedVariant, selectedOptions]);

  const calculateTotalPrice = useCallback(() => {
    return calculateUnitPrice() * quantity;
  }, [calculateUnitPrice, quantity]);

  const formatDisplayPrice = (amount) => {
    if (isPricingFinalized()) {
      return formatCurrency(amount, { allowUnfinalized: false });
    }
    return 'Price to be confirmed';
  };

  const formatDisplayModifier = (modifier) => {
    return formatModifierPrice(modifier);
  };

  const handleAddToCart = () => {
    if (isAdded) return;

    const optionDetails = [];
    if (product?.option_groups) {
      product.option_groups.forEach((group) => {
        const selectedIds = selectedOptions[group.id] || [];
        group.items.forEach((item) => {
          if (selectedIds.includes(item.id)) {
            optionDetails.push({
              id: item.id,
              groupName: group.name,
              name: item.name,
              priceModifier: parseFloat(item.price_modifier) || 0,
            });
          }
        });
      });
    }

    const unitPrice = calculateUnitPrice();

    const cartItem = {
      product,
      variant: selectedVariant,
      options: optionDetails,
      quantity,
      itemNotes,
      unitPrice,
    };

    addToCart(cartItem);
    setIsAdded(true);

    // Subtle confirmation pause before clean modal close
    setTimeout(() => {
      onClose();
    }, 350);
  };

  // Safe early return AFTER all hooks have executed
  if (!isOpen || !product) {
    return null;
  }

  const productImage = getProductImage(product);

  return (
    <div
      role="presentation"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 bg-[#2B1B12]/60 backdrop-blur-sm transition-opacity duration-300 selection:bg-[#F28C13] selection:text-white"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        aria-describedby="product-modal-description"
        className="relative w-full max-w-4xl max-h-[92vh] sm:max-h-[88vh] bg-[#FFF4E6] text-[#2B1B12] rounded-t-2xl sm:rounded-2xl shadow-2xl border-t sm:border border-[#2B1B12]/10 overflow-hidden flex flex-col md:grid md:grid-cols-12 focus:outline-none"
      >
        {/* Close Button (Accessible across mobile and desktop) */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close product modal"
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full border border-[#2B1B12]/15 bg-[#FFF4E6]/90 hover:bg-[#2B1B12] text-[#2B1B12] hover:text-[#FFF4E6] transition-colors duration-150 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28C13]"
        >
          <svg
            className="w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* LEFT COLUMN: Hero Product Photography (~42% desktop, top on mobile) */}
        <div className="md:col-span-5 relative bg-[#F4ECE1] overflow-hidden min-h-[220px] sm:min-h-[280px] md:min-h-full flex items-center justify-center border-b md:border-b-0 md:border-r border-[#2B1B12]/10">
          <img
            src={productImage}
            alt={`${product.name} — fresh specialty item at L'Oven`}
            className="w-full h-full object-cover object-center max-h-[260px] sm:max-h-[320px] md:max-h-none"
          />
        </div>

        {/* RIGHT COLUMN: Product Details, Customization & Add to Cart (~58% desktop) */}
        <div className="md:col-span-7 flex flex-col max-h-[65vh] sm:max-h-[70vh] md:max-h-[88vh] overflow-hidden bg-[#FFF4E6]">
          {/* Scrollable Content Area */}
          <div className="overflow-y-auto px-6 py-6 sm:px-8 sm:py-8 space-y-6 flex-1 text-left">
            {/* Header: Eyebrow + Name + Description + Price */}
            <div>
              <span className="block font-sans text-xs font-semibold tracking-[0.2em] text-[#F28C13] uppercase mb-1.5">
                {product.category?.name || "L'OVEN SPECIALTY"}
              </span>

              <h2
                id="product-modal-title"
                className="font-['Playfair_Display',Georgia,serif] text-2xl sm:text-3xl font-normal text-[#2B1B12] tracking-tight leading-tight"
              >
                {product.name}
              </h2>

              {product.description && (
                <p
                  id="product-modal-description"
                  className="font-sans text-xs sm:text-sm text-[#2B1B12]/75 leading-relaxed mt-2"
                >
                  {product.description}
                </p>
              )}

              <div className="font-sans text-sm sm:text-base font-semibold text-[#2B1B12] tracking-wide mt-3">
                {formatDisplayPrice(calculateUnitPrice())}
              </div>
            </div>

            {/* VARIANTS (e.g., Size Selection) */}
            {product.variants && product.variants.length > 0 && (
              <div className="border-t border-[#2B1B12]/10 pt-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-sans text-xs font-semibold tracking-[0.18em] text-[#F28C13] uppercase">
                    SELECT SIZE
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {product.variants.map((variant) => {
                    const isSelected = selectedVariant?.id === variant.id;
                    const modifier = parseFloat(variant.price_modifier) || 0;
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => setSelectedVariant(variant)}
                        className={`p-3 rounded-sm border text-left transition-all duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F28C13] ${
                          isSelected
                            ? 'border-[#F28C13] bg-white text-[#2B1B12] ring-1 ring-[#F28C13]'
                            : 'border-[#2B1B12]/15 hover:border-[#2B1B12]/30 text-[#2B1B12]/75 bg-transparent'
                        }`}
                      >
                        <div className="font-sans text-xs font-semibold tracking-wide uppercase">
                          {variant.name}
                        </div>
                        {isPricingFinalized() && (
                          <div className="font-sans text-[11px] text-[#F28C13] font-medium mt-0.5">
                            {modifier > 0 ? formatDisplayModifier(modifier) : 'Standard'}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* OPTION GROUPS (Customization) */}
            {product.option_groups && product.option_groups.length > 0 && (
              <div className="space-y-5 border-t border-[#2B1B12]/10 pt-5">
                {product.option_groups.map((group) => {
                  const isSingle = group.max_selectable === 1;
                  const groupSelected = selectedOptions[group.id] || [];

                  return (
                    <div key={group.id} className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <h4 className="font-sans text-xs font-semibold tracking-[0.16em] text-[#2B1B12] uppercase">
                          {group.name}
                        </h4>
                        {group.is_required && (
                          <span className="font-sans text-[10px] font-semibold text-[#F28C13] uppercase tracking-wider">
                            Required
                          </span>
                        )}
                      </div>

                      {group.description && (
                        <p className="font-sans text-[11px] text-[#2B1B12]/60">
                          {group.description}
                        </p>
                      )}

                      <div className="space-y-2">
                        {group.items?.map((item) => {
                          const isChecked = groupSelected.includes(item.id);
                          const modifier = parseFloat(item.price_modifier) || 0;

                          return (
                            <label
                              key={item.id}
                              className={`flex items-center justify-between p-2.5 rounded-sm border cursor-pointer transition-colors duration-150 ${
                                isChecked
                                  ? 'border-[#F28C13] bg-white text-[#2B1B12]'
                                  : 'border-[#2B1B12]/15 hover:border-[#2B1B12]/30 text-[#2B1B12]/75 bg-transparent'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <input
                                  type={isSingle ? 'radio' : 'checkbox'}
                                  name={`group-${group.id}`}
                                  checked={isChecked}
                                  onChange={() => handleOptionToggle(group.id, item.id, isSingle)}
                                  className="accent-[#F28C13] w-3.5 h-3.5"
                                />
                                <span className="font-sans text-xs font-medium">{item.name}</span>
                              </div>

                              {isPricingFinalized() && modifier > 0 && (
                                <span className="font-sans text-xs font-semibold text-[#F28C13]">
                                  {formatDisplayModifier(modifier)}
                                </span>
                              )}
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* SPECIAL INSTRUCTIONS (Notes for Barista) */}
            <div className="border-t border-[#2B1B12]/10 pt-5">
              <label
                htmlFor="barista-notes"
                className="block font-sans text-xs font-semibold tracking-[0.16em] text-[#2B1B12] uppercase mb-1.5"
              >
                NOTE FOR THE BARISTA
              </label>
              <input
                id="barista-notes"
                type="text"
                placeholder="e.g. Extra hot, oat milk on the side..."
                value={itemNotes}
                onChange={(e) => setItemNotes(e.target.value)}
                className="w-full bg-white border border-[#2B1B12]/15 rounded-sm px-3.5 py-2.5 font-sans text-xs text-[#2B1B12] placeholder-[#2B1B12]/40 focus:outline-none focus:border-[#F28C13] transition-colors"
              />
            </div>
          </div>

          {/* STICKY BOTTOM BAR: Quantity & Add to Cart */}
          <div className="p-4 sm:p-6 border-t border-[#2B1B12]/10 bg-[#FFF4E6] flex items-center justify-between gap-3 sm:gap-4 sticky bottom-0 z-10">
            {/* Quantity Selector */}
            <div className="flex items-center border border-[#2B1B12]/20 rounded-sm bg-white">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
                className="w-9 h-9 sm:w-10 sm:h-10 text-[#2B1B12] hover:bg-[#2B1B12]/5 transition-colors font-medium text-base flex items-center justify-center focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F28C13]"
              >
                −
              </button>
              <span className="w-8 sm:w-10 text-center font-sans text-sm font-semibold text-[#2B1B12]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Increase quantity"
                className="w-9 h-9 sm:w-10 sm:h-10 text-[#2B1B12] hover:bg-[#2B1B12]/5 transition-colors font-medium text-base flex items-center justify-center focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F28C13]"
              >
                +
              </button>
            </div>

            {/* Add to Cart CTA */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`flex-1 py-3 px-4 sm:px-6 rounded-sm font-sans text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase transition-colors duration-150 flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28C13] ${
                isAdded
                  ? 'bg-[#2B1B12] text-[#FFF4E6]'
                  : 'bg-[#F28C13] hover:bg-[#d97706] text-white shadow-none'
              }`}
            >
              {isAdded ? (
                <span>ADDED TO CART ✓</span>
              ) : isPricingFinalized() ? (
                <>
                  <span>ADD TO CART</span>
                  <span className="opacity-75">·</span>
                  <span>{formatCurrency(calculateTotalPrice(), { allowUnfinalized: false })}</span>
                </>
              ) : (
                <span>ADD TO ORDER</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
