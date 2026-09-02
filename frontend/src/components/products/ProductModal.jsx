import { useState, useEffect } from 'react';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { reviewService } from '../../services/reviewService';

const ProductModal = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [itemNotes, setItemNotes] = useState('');

  // Reviews state
  const [reviewsData, setReviewsData] = useState({ average_rating: 0, total_reviews: 0, reviews: [] });
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    // Set default variant if available
    if (product.variants && product.variants.length > 0) {
      const defaultVar = product.variants.find((v) => v.is_default) || product.variants[0];
      setSelectedVariant(defaultVar);
    } else {
      setSelectedVariant(null);
    }

    // Initialize required option groups
    const initialOptions = {};
    if (product.option_groups) {
      product.option_groups.forEach((group) => {
        if (group.is_required && group.items && group.items.length > 0) {
          initialOptions[group.id] = [group.items[0].id];
        } else {
          initialOptions[group.id] = [];
        }
      });
    }
    setSelectedOptions(initialOptions);
    setQuantity(1);
    setItemNotes('');

    // Fetch Reviews
    fetchReviews(product.id);
  }, [product]);

  const fetchReviews = async (productId) => {
    try {
      const data = await reviewService.getProductReviews(productId);
      setReviewsData(data);
    } catch (e) {
      console.error('Failed to load reviews:', e);
    }
  };

  const handleOptionToggle = (groupId, itemId, isSingleChoice) => {
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
  };

  const calculatePrice = () => {
    let price = product.price || 0;
    if (selectedVariant) {
      price += selectedVariant.price_modifier || 0;
    }

    if (product.option_groups) {
      product.option_groups.forEach((group) => {
        const selectedIds = selectedOptions[group.id] || [];
        group.items.forEach((item) => {
          if (selectedIds.includes(item.id)) {
            price += item.price_modifier || 0;
          }
        });
      });
    }

    return price * quantity;
  };

  const handleAddToCart = () => {
    const optionDetails = [];
    if (product.option_groups) {
      product.option_groups.forEach((group) => {
        const selectedIds = selectedOptions[group.id] || [];
        group.items.forEach((item) => {
          if (selectedIds.includes(item.id)) {
            optionDetails.push({
              id: item.id,
              groupName: group.name,
              name: item.name,
              priceModifier: item.price_modifier,
            });
          }
        });
      });
    }

    const cartItem = {
      product,
      variant: selectedVariant,
      options: optionDetails,
      quantity,
      itemNotes,
      unitPrice: calculatePrice() / quantity,
    };

    addToCart(cartItem);
    onClose();
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setSubmittingReview(true);
    try {
      await reviewService.submitReview(product.id, newRating, newComment);
      setNewComment('');
      fetchReviews(product.id);
    } catch (e) {
      alert('Failed to submit review. Make sure you are logged in.');
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-amber-100 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-amber-100 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-orange-600 uppercase tracking-wider">
                {product.category?.name}
              </span>
              <span className="text-xs text-amber-500 font-bold flex items-center gap-0.5">
                ★ {reviewsData.average_rating > 0 ? reviewsData.average_rating : 'New'} ({reviewsData.total_reviews})
              </span>
            </div>
            <h2 className="text-2xl font-display font-bold text-brown-900 mt-1">
              {product.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-brown-400 hover:text-brown-900 p-1 rounded-full text-xl"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          <p className="text-brown-700 text-sm">{product.description}</p>

          {/* Variants (Sizes) */}
          {product.variants && product.variants.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-brown-900 mb-3">Select Size</h4>
              <div className="grid grid-cols-2 gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`p-3 rounded-xl border text-left text-sm transition-all ${
                      selectedVariant?.id === variant.id
                        ? 'border-orange-500 bg-orange-50 text-brown-900 font-semibold shadow-sm'
                        : 'border-gray-200 text-brown-700 hover:border-amber-300'
                    }`}
                  >
                    <div>{variant.name}</div>
                    <div className="text-xs text-orange-600">
                      {variant.price_modifier > 0 ? `+$${variant.price_modifier.toFixed(2)}` : 'Standard'}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Option Groups */}
          {product.option_groups && product.option_groups.length > 0 && (
            <div className="space-y-4">
              {product.option_groups.map((group) => {
                const isSingle = group.max_selectable === 1;
                const groupSelected = selectedOptions[group.id] || [];

                return (
                  <div key={group.id} className="pt-2 border-t border-amber-50">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-bold text-brown-900">{group.name}</h4>
                      {group.is_required && (
                        <span className="text-[10px] font-semibold bg-orange-100 text-orange-700 px-2 py-0.5 rounded">
                          Required
                        </span>
                      )}
                    </div>
                    {group.description && (
                      <p className="text-xs text-brown-500 mb-2">{group.description}</p>
                    )}

                    <div className="space-y-2">
                      {group.items.map((item) => {
                        const isChecked = groupSelected.includes(item.id);
                        return (
                          <label
                            key={item.id}
                            onClick={() => handleOptionToggle(group.id, item.id, isSingle)}
                            className={`flex items-center justify-between p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                              isChecked
                                ? 'border-orange-500 bg-orange-50/50 text-brown-900 font-medium'
                                : 'border-gray-100 text-brown-700 hover:bg-gray-50'
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <input
                                type={isSingle ? 'radio' : 'checkbox'}
                                checked={isChecked}
                                onChange={() => {}}
                                className="accent-orange-500"
                              />
                              {item.name}
                            </span>
                            {item.price_modifier > 0 && (
                              <span className="text-orange-600 font-semibold">
                                +${item.price_modifier.toFixed(2)}
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

          {/* Special Instructions Note */}
          <div>
            <label className="block text-xs font-bold text-brown-800 mb-1">
              Special Instructions
            </label>
            <input
              type="text"
              placeholder="e.g. Extra hot, no lid..."
              value={itemNotes}
              onChange={(e) => setItemNotes(e.target.value)}
              className="input text-xs"
            />
          </div>

          {/* Customer Reviews Section */}
          <div className="pt-4 border-t border-amber-100">
            <h4 className="text-sm font-bold text-brown-900 mb-3">
              Customer Reviews ({reviewsData.total_reviews})
            </h4>

            {isAuthenticated ? (
              <form onSubmit={handleSubmitReview} className="mb-4 bg-cream-50 p-3 rounded-xl border border-amber-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-brown-800">Your Rating:</span>
                  <select
                    value={newRating}
                    onChange={(e) => setNewRating(parseInt(e.target.value, 10))}
                    className="text-xs p-1 border rounded"
                  >
                    <option value={5}>★★★★★ (5/5)</option>
                    <option value={4}>★★★★☆ (4/5)</option>
                    <option value={3}>★★★☆☆ (3/5)</option>
                    <option value={2}>★★☆☆☆ (2/5)</option>
                    <option value={1}>★☆☆☆☆ (1/5)</option>
                  </select>
                </div>
                <input
                  type="text"
                  placeholder="Write a quick review..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="input text-xs mb-2"
                />
                <button
                  type="submit"
                  disabled={submittingReview}
                  className="btn btn-outline text-xs py-1 px-3"
                >
                  Submit Review
                </button>
              </form>
            ) : (
              <p className="text-[11px] text-brown-500 mb-3">
                <a href="/login" className="text-orange-600 underline font-semibold">Sign in</a> to leave a rating.
              </p>
            )}

            {/* Reviews List */}
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {reviewsData.reviews && reviewsData.reviews.length > 0 ? (
                reviewsData.reviews.map((rev) => (
                  <div key={rev.id} className="text-xs p-2 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex justify-between font-semibold text-brown-900">
                      <span>{rev.user_name}</span>
                      <span className="text-amber-500">{'★'.repeat(rev.rating)}</span>
                    </div>
                    {rev.comment && <p className="text-brown-700 mt-1">{rev.comment}</p>}
                  </div>
                ))
              ) : (
                <p className="text-xs text-brown-400 italic">No reviews yet for this product.</p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-amber-100 bg-cream-50 flex items-center justify-between gap-4">
          <div className="flex items-center border border-gray-300 rounded-lg bg-white">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-1.5 text-brown-700 hover:bg-gray-100 rounded-l-lg font-bold"
            >
              -
            </button>
            <span className="px-3 py-1.5 text-sm font-bold text-brown-900">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-1.5 text-brown-700 hover:bg-gray-100 rounded-r-lg font-bold"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="flex-1 btn btn-primary py-3 text-sm font-semibold shadow-lg justify-center"
          >
            Add to Cart — ${calculatePrice().toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
