import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { orderService } from '../services/orderService';
import Loading from '../components/common/Loading';

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRewards();
  }, []);

  const fetchRewards = async () => {
    try {
      const res = await orderService.getRewards();
      setRewards(res.rewards || []);
    } catch (e) {
      console.error('Failed to fetch rewards:', e);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated()) {
    return (
      <div className="bg-cream-100 min-h-screen py-16 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow border border-amber-100">
          <h2 className="text-2xl font-bold text-brown-900 mb-2">Sign in Required</h2>
          <p className="text-xs text-brown-600 mb-6">
            Please log in to view your L'Oven loyalty points and account profile.
          </p>
          <a href="/login" className="btn btn-primary w-full py-3">
            Sign In Now
          </a>
        </div>
      </div>
    );
  }

  const loyalty = user?.loyalty || { current_points: 0, lifetime_points: 0, tier: 'bronze' };

  const tierColors = {
    bronze: 'bg-amber-700 text-white',
    silver: 'bg-slate-400 text-white',
    gold: 'bg-amber-400 text-brown-900 font-bold',
    platinum: 'bg-indigo-600 text-white font-bold',
  };

  return (
    <div className="bg-cream-100 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Profile Banner & Loyalty Card */}
        <div className="bg-white rounded-3xl p-8 shadow-md border border-amber-100 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-orange-500 text-white rounded-full flex items-center justify-center text-3xl font-display font-bold shadow-lg">
              {user?.name ? user.name[0].toUpperCase() : 'U'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-display font-bold text-brown-900">{user?.name}</h1>
                <span
                  className={`text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    tierColors[loyalty.tier] || tierColors.bronze
                  }`}
                >
                  {loyalty.tier} Member
                </span>
              </div>
              <p className="text-xs text-brown-600 mt-0.5">{user?.email}</p>
              {user?.phone && <p className="text-xs text-brown-500">{user.phone}</p>}
            </div>
          </div>

          {/* Loyalty Points Counter */}
          <div className="bg-cream-100 p-6 rounded-2xl border border-amber-200 text-center w-full md:w-auto min-w-[200px]">
            <div className="text-3xl font-display font-bold text-orange-600">
              {loyalty.current_points}
            </div>
            <div className="text-xs font-semibold text-brown-800 uppercase tracking-wider mt-1">
              Available Loyalty Points
            </div>
            <div className="text-[10px] text-brown-500 mt-1">
              Lifetime Earned: {loyalty.lifetime_points} pts
            </div>
          </div>
        </div>

        {/* Redeemable Rewards Catalog */}
        <div className="bg-white rounded-3xl p-8 shadow-md border border-amber-100">
          <h2 className="text-2xl font-display font-bold text-brown-900 mb-2">
            Redeem Loyalty Rewards
          </h2>
          <p className="text-xs text-brown-600 mb-6">
            Earn 1 point for every $1 spent. Redeem points on your next coffee or bakery order!
          </p>

          {loading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {rewards.map((reward) => {
                const canRedeem = loyalty.current_points >= reward.points_required;

                return (
                  <div
                    key={reward.id}
                    className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                      canRedeem
                        ? 'border-orange-300 bg-orange-50/40 shadow-sm'
                        : 'border-gray-200 opacity-80'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
                          {reward.points_required} Points
                        </span>
                      </div>
                      <h3 className="text-lg font-display font-bold text-brown-900 mb-1">
                        {reward.title}
                      </h3>
                      <p className="text-xs text-brown-600 line-clamp-2">{reward.description}</p>
                    </div>

                    <button
                      disabled={!canRedeem}
                      className={`w-full mt-4 btn text-xs py-2 ${
                        canRedeem ? 'btn-primary shadow' : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {canRedeem ? 'Redeem Reward' : `Need ${reward.points_required - loyalty.current_points} more pts`}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
