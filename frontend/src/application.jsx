import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Bell, 
  Heart, 
  TrendingDown, 
  Smartphone, 
  Laptop, 
  Headphones,
  Monitor,
  Moon,
  Sun,
  Star,
  Users,
  Zap,
  Filter,
  BarChart3,
  ShoppingCart,
  MessageSquare,
  Target,
  Gift,
  Calculator,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Plus,
  Minus,
  ArrowUp,
  ArrowDown,
  Clock,
  CheckCircle,
  AlertTriangle,
  X,
  Check
} from 'lucide-react';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('tracker');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(3);
  const [wishlistCount, setWishlistCount] = useState(12);
  const [showNotifications, setShowNotifications] = useState(false);
  const [priceFilter, setPriceFilter] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('price-low');

  // Calculator states
  const [originalPrice, setOriginalPrice] = useState('');
  const [saleDiscount, setSaleDiscount] = useState('');
  const [studentDiscount, setStudentDiscount] = useState('');
  const [cardDiscount, setCardDiscount] = useState('');

  // Community states
  const [newTip, setNewTip] = useState('');
  const [selectedTipCategory, setSelectedTipCategory] = useState('all');
  const [showTipForm, setShowTipForm] = useState(false);

  // Wishlist states
  const [wishlistedItems, setWishlistedItems] = useState(new Set([1, 3]));

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const categories = [
    { id: 'all', name: 'All Products', icon: Target },
    { id: 'smartphones', name: 'Smartphones', icon: Smartphone },
    { id: 'laptops', name: 'Laptops', icon: Laptop },
    { id: 'audio', name: 'Audio', icon: Headphones },
    { id: 'displays', name: 'Displays', icon: Monitor }
  ];

  const allProducts = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max 256GB',
      category: 'smartphones',
      image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=400',
      currentPrice: 134900,
      originalPrice: 159900,
      discount: 16,
      priceChange: -2400,
      trend: 'down',
      stores: ['Amazon', 'Flipkart', 'Croma'],
      lowestPrice: 132500,
      alerts: 2,
      specs: {
        display: '6.7" Super Retina XDR',
        processor: 'A17 Pro',
        ram: '8GB',
        storage: '256GB',
        camera: '48MP Triple',
        battery: '4441mAh'
      }
    },
    {
      id: 2,
      name: 'MacBook Air M3 15-inch',
      category: 'laptops',
      image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400',
      currentPrice: 134900,
      originalPrice: 149900,
      discount: 10,
      priceChange: 1200,
      trend: 'up',
      stores: ['Apple Store', 'Amazon', 'Vijay Sales'],
      lowestPrice: 129900,
      alerts: 1,
      specs: {
        display: '15.3" Liquid Retina',
        processor: 'Apple M3',
        ram: '8GB',
        storage: '256GB SSD',
        camera: '1080p FaceTime HD',
        battery: '18 hours'
      }
    },
    {
      id: 3,
      name: 'Sony WH-1000XM5 Headphones',
      category: 'audio',
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
      currentPrice: 26990,
      originalPrice: 34990,
      discount: 23,
      priceChange: -800,
      trend: 'down',
      stores: ['Sony Center', 'Amazon', 'Croma'],
      lowestPrice: 25999,
      alerts: 3,
      specs: {
        display: 'N/A',
        processor: 'V1 Processor',
        ram: 'N/A',
        storage: 'N/A',
        camera: 'N/A',
        battery: '30 hours'
      }
    },
    {
      id: 4,
      name: 'Samsung Galaxy S24 Ultra',
      category: 'smartphones',
      image: 'https://images.pexels.com/photos/1616504/pexels-photo-1616504.jpeg?auto=compress&cs=tinysrgb&w=400',
      currentPrice: 129999,
      originalPrice: 139999,
      discount: 7,
      priceChange: -1000,
      trend: 'down',
      stores: ['Samsung Store', 'Amazon', 'Flipkart'],
      lowestPrice: 125999,
      alerts: 1,
      specs: {
        display: '6.8" Dynamic AMOLED 2X',
        processor: 'Snapdragon 8 Gen 3',
        ram: '12GB',
        storage: '256GB',
        camera: '200MP Quad',
        battery: '5000mAh'
      }
    },
    {
      id: 5,
      name: 'Dell XPS 13 Plus',
      category: 'laptops',
      image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400',
      currentPrice: 89999,
      originalPrice: 99999,
      discount: 10,
      priceChange: -2000,
      trend: 'down',
      stores: ['Dell Store', 'Amazon', 'Flipkart'],
      lowestPrice: 87999,
      alerts: 2,
      specs: {
        display: '13.4" InfinityEdge',
        processor: 'Intel Core i7',
        ram: '16GB',
        storage: '512GB SSD',
        camera: '720p HD',
        battery: '12 hours'
      }
    },
    {
      id: 6,
      name: 'LG UltraWide 34" Monitor',
      category: 'displays',
      image: 'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=400',
      currentPrice: 45999,
      originalPrice: 52999,
      discount: 13,
      priceChange: -1500,
      trend: 'down',
      stores: ['LG Store', 'Amazon', 'Croma'],
      lowestPrice: 44999,
      alerts: 1,
      specs: {
        display: '34" UltraWide QHD',
        processor: 'N/A',
        ram: 'N/A',
        storage: 'N/A',
        camera: 'N/A',
        battery: 'N/A'
      }
    }
  ];

  const upcomingDeals = [
    {
      id: 1,
      title: 'Amazon Great Indian Festival',
      date: '2024-10-15',
      products: ['Smartphones', 'Laptops', 'Accessories'],
      expectedDiscount: '30-70%',
      priority: 'high',
      notified: false
    },
    {
      id: 2,
      title: 'Apple Diwali Sale',
      date: '2024-10-28',
      products: ['MacBook', 'iPhone', 'iPad'],
      expectedDiscount: '10-15%',
      priority: 'medium',
      notified: false
    },
    {
      id: 3,
      title: 'Student Discount Season',
      date: '2024-11-01',
      products: ['Laptops', 'Tablets', 'Audio'],
      expectedDiscount: '15-25%',
      priority: 'medium',
      notified: true
    }
  ];

  const [communityTips, setCommunityTips] = useState([
    {
      id: 1,
      user: 'TechSavvy2024',
      tip: 'Stack SBI card discount with student discount on Apple products for max savings!',
      upvotes: 127,
      category: 'discount-stacking',
      verified: true,
      userUpvoted: false
    },
    {
      id: 2,
      user: 'DealHunter',
      tip: 'Use price tracking on Flipkart 2-3 days before sales. Prices often drop earlier.',
      upvotes: 89,
      category: 'timing',
      verified: false,
      userUpvoted: true
    },
    {
      id: 3,
      user: 'GadgetGuru',
      tip: 'Check bank EMI offers separately - sometimes better than instant discounts.',
      upvotes: 156,
      category: 'payment',
      verified: true,
      userUpvoted: false
    }
  ]);

  // Filter and search products
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.stores.some(store => store.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Price filter
    if (priceFilter.min || priceFilter.max) {
      filtered = filtered.filter(product => {
        const price = product.currentPrice;
        const min = priceFilter.min ? parseInt(priceFilter.min) : 0;
        const max = priceFilter.max ? parseInt(priceFilter.max) : Infinity;
        return price >= min && price <= max;
      });
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.currentPrice - b.currentPrice;
        case 'price-high':
          return b.currentPrice - a.currentPrice;
        case 'discount':
          return b.discount - a.discount;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [selectedCategory, searchQuery, priceFilter, sortBy]);

  // Filter community tips
  const filteredTips = useMemo(() => {
    if (selectedTipCategory === 'all') {
      return communityTips;
    }
    return communityTips.filter(tip => tip.category === selectedTipCategory);
  }, [selectedTipCategory, communityTips]);

  // Calculator logic
  const calculatedPrice = useMemo(() => {
    if (!originalPrice) return { finalPrice: 0, totalSavings: 0, totalDiscount: 0 };

    const price = parseFloat(originalPrice);
    const sale = parseFloat(saleDiscount) || 0;
    const student = parseFloat(studentDiscount) || 0;
    const card = parseFloat(cardDiscount) || 0;

    // Apply discounts sequentially (more realistic)
    let currentPrice = price;
    currentPrice = currentPrice * (1 - sale / 100);
    currentPrice = currentPrice * (1 - student / 100);
    currentPrice = currentPrice * (1 - card / 100);

    const totalSavings = price - currentPrice;
    const totalDiscount = (totalSavings / price) * 100;

    return {
      finalPrice: Math.round(currentPrice),
      totalSavings: Math.round(totalSavings),
      totalDiscount: Math.round(totalDiscount * 10) / 10
    };
  }, [originalPrice, saleDiscount, studentDiscount, cardDiscount]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const getDealPriority = (priority) => {
    const priorities = {
      high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    };
    return priorities[priority] || priorities.medium;
  };

  const toggleWishlist = (productId) => {
    const newWishlist = new Set(wishlistedItems);
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId);
      setWishlistCount(prev => prev - 1);
    } else {
      newWishlist.add(productId);
      setWishlistCount(prev => prev + 1);
    }
    setWishlistedItems(newWishlist);
  };

  const handleTipUpvote = (tipId) => {
    setCommunityTips(prev => prev.map(tip => {
      if (tip.id === tipId) {
        return {
          ...tip,
          upvotes: tip.userUpvoted ? tip.upvotes - 1 : tip.upvotes + 1,
          userUpvoted: !tip.userUpvoted
        };
      }
      return tip;
    }));
  };

  const handleAddTip = () => {
    if (!newTip.trim()) return;

    const tip = {
      id: Date.now(),
      user: 'You',
      tip: newTip,
      upvotes: 0,
      category: 'general',
      verified: false,
      userUpvoted: false
    };

    setCommunityTips(prev => [tip, ...prev]);
    setNewTip('');
    setShowTipForm(false);
  };

  const setDealAlert = (dealId) => {
    setNotifications(prev => prev + 1);
    // In a real app, this would save to backend
    alert('Deal alert set! You\'ll be notified when this sale starts.');
  };

  const clearNotifications = () => {
    setNotifications(0);
    setShowNotifications(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Tech Deal Radar
                </span>
              </div>

              {/* Navigation */}
              <nav className="hidden md:flex space-x-8">
                {[
                  { id: 'tracker', label: 'Price Tracker' },
                  { id: 'compare', label: 'Compare' },
                  { id: 'deals', label: 'Deals' },
                  { id: 'community', label: 'Community' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                        : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>

              {/* Actions */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                  >
                    <Bell className="w-5 h-5" />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {notifications}
                      </span>
                    )}
                  </button>
                  
                  {/* Notifications Dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                        <h3 className="font-semibold">Notifications</h3>
                        <button 
                          onClick={clearNotifications}
                          className="text-sm text-blue-600 hover:text-blue-700"
                        >
                          Clear all
                        </button>
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <div>
                            <p className="text-sm font-medium">Price Drop Alert</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">iPhone 15 Pro Max dropped by ₹2,400</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                          <div>
                            <p className="text-sm font-medium">Deal Alert</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Amazon Great Indian Festival starts tomorrow</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                          <div>
                            <p className="text-sm font-medium">New Community Tip</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">TechSavvy2024 shared a discount stacking tip</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <button className="relative p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                  <Heart className="w-5 h-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                      {wishlistCount > 9 ? '9+' : wishlistCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Find the Best
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {' '}Tech Deals
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Track prices, stack discounts, and never miss a deal. Powered by AI and community wisdom.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto mb-12">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search for tech products, deals, or brands..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedCategory === category.id
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{category.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg mb-4 mx-auto">
                    <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{allProducts.length}K+</h3>
                  <p className="text-gray-600 dark:text-gray-400">Products Tracked</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg mb-4 mx-auto">
                    <TrendingDown className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">₹12Cr+</h3>
                  <p className="text-gray-600 dark:text-gray-400">Savings Generated</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg mb-4 mx-auto">
                    <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">1M+</h3>
                  <p className="text-gray-600 dark:text-gray-400">Happy Users</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Price Tracker Tab */}
          {activeTab === 'tracker' && (
            <div>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Price Tracker Dashboard</h2>
                
                {/* Filters and Sort */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <input
                      type="number"
                      placeholder="Min ₹"
                      value={priceFilter.min}
                      onChange={(e) => setPriceFilter(prev => ({ ...prev, min: e.target.value }))}
                      className="w-20 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                    />
                    <input
                      type="number"
                      placeholder="Max ₹"
                      value={priceFilter.max}
                      onChange={(e) => setPriceFilter(prev => ({ ...prev, max: e.target.value }))}
                      className="w-20 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                    />
                  </div>
                  
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                  >
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="discount">Highest Discount</option>
                    <option value="name">Name A-Z</option>
                  </select>
                  
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4" />
                    <span>Track Product</span>
                  </button>
                </div>
              </div>

              {/* Results count */}
              <div className="mb-6">
                <p className="text-gray-600 dark:text-gray-400">
                  Showing {filteredProducts.length} of {allProducts.length} products
                  {searchQuery && ` for "${searchQuery}"`}
                  {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <button 
                          onClick={() => toggleWishlist(product.id)}
                          className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <Heart className={`w-4 h-4 ${wishlistedItems.has(product.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                        </button>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          product.trend === 'down' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {product.discount}% OFF
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {formatPrice(product.currentPrice)}
                          </div>
                          <div className="text-sm text-gray-500 line-through">
                            {formatPrice(product.originalPrice)}
                          </div>
                        </div>
                        <div className={`flex items-center space-x-1 ${
                          product.trend === 'down' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {product.trend === 'down' ? <ArrowDown className="w-4 h-4" /> : <ArrowUp className="w-4 h-4" />}
                          <span className="text-sm font-medium">
                            {formatPrice(Math.abs(product.priceChange))}
                          </span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Available at:</div>
                        <div className="flex flex-wrap gap-2">
                          {product.stores.map((store) => (
                            <span key={store} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                              {store}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Lowest: <span className="font-semibold">{formatPrice(product.lowestPrice)}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-orange-600">
                          <Bell className="w-4 h-4" />
                          <span className="text-sm">{product.alerts}</span>
                        </div>
                      </div>

                      <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No products found</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Compare Tab */}
          {activeTab === 'compare' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Product Comparison</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Compare specifications, prices, and features side-by-side to make the best buying decision.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Product 1 */}
                  <div className="text-center">
                    <img
                      src={allProducts[0].image}
                      alt={allProducts[0].name}
                      className="w-32 h-32 object-cover rounded-lg mx-auto mb-4"
                    />
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">{allProducts[0].name}</h3>
                    <div className="text-2xl font-bold text-blue-600 mb-4">{formatPrice(allProducts[0].currentPrice)}</div>
                  </div>

                  {/* VS */}
                  <div className="flex items-center justify-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      VS
                    </div>
                  </div>

                  {/* Product 2 */}
                  <div className="text-center">
                    <img
                      src={allProducts[3].image}
                      alt={allProducts[3].name}
                      className="w-32 h-32 object-cover rounded-lg mx-auto mb-4"
                    />
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">{allProducts[3].name}</h3>
                    <div className="text-2xl font-bold text-purple-600 mb-4">{formatPrice(allProducts[3].currentPrice)}</div>
                  </div>
                </div>

                {/* Comparison Table */}
                <div className="mt-12 overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 text-gray-900 dark:text-white font-semibold">Specification</th>
                        <th className="text-center py-3 text-blue-600 font-semibold">{allProducts[0].name}</th>
                        <th className="text-center py-3 text-purple-600 font-semibold">{allProducts[3].name}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(allProducts[0].specs).map((spec) => (
                        <tr key={spec} className="border-b border-gray-100 dark:border-gray-700">
                          <td className="py-3 text-gray-900 dark:text-white capitalize">{spec.replace('_', ' ')}</td>
                          <td className="py-3 text-center text-gray-600 dark:text-gray-400">{allProducts[0].specs[spec]}</td>
                          <td className="py-3 text-center text-gray-600 dark:text-gray-400">{allProducts[3].specs[spec]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-8 flex justify-center space-x-4">
                  <button 
                    onClick={() => toggleWishlist(allProducts[0].id)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {wishlistedItems.has(allProducts[0].id) ? 'Remove from Wishlist' : 'Add iPhone to Wishlist'}
                  </button>
                  <button 
                    onClick={() => toggleWishlist(allProducts[3].id)}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    {wishlistedItems.has(allProducts[3].id) ? 'Remove from Wishlist' : 'Add Galaxy to Wishlist'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Deals Tab */}
          {activeTab === 'deals' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Upcoming Deals & Sales</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Never miss a deal again. Get notified about upcoming sales and special offers.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {upcomingDeals.map((deal) => (
                  <div key={deal.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{deal.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDealPriority(deal.priority)}`}>
                        {deal.priority}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-3">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{new Date(deal.date).toLocaleDateString('en-IN', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}</span>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Products:</div>
                      <div className="flex flex-wrap gap-2">
                        {deal.products.map((product) => (
                          <span key={product} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Expected Discount</div>
                        <div className="font-bold text-green-600">{deal.expectedDiscount}</div>
                      </div>
                      <button 
                        onClick={() => setDealAlert(deal.id)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                          deal.notified 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {deal.notified ? <Check className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                        <span>{deal.notified ? 'Notified' : 'Set Alert'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Discount Stacking Calculator */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8">
                <div className="text-center mb-8">
                  <Calculator className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Discount Stacking Calculator</h3>
                  <p className="text-gray-600 dark:text-gray-400">Maximize your savings by combining multiple discounts</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Original Price (₹)
                    </label>
                    <input
                      type="number"
                      placeholder="50000"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Sale Discount (%)
                    </label>
                    <input
                      type="number"
                      placeholder="20"
                      value={saleDiscount}
                      onChange={(e) => setSaleDiscount(e.target.value)}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Student Discount (%)
                    </label>
                    <input
                      type="number"
                      placeholder="10"
                      value={studentDiscount}
                      onChange={(e) => setStudentDiscount(e.target.value)}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Card Discount (%)
                    </label>
                    <input
                      type="number"
                      placeholder="5"
                      value={cardDiscount}
                      onChange={(e) => setCardDiscount(e.target.value)}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Final Price</div>
                      <div className="text-3xl font-bold text-green-600">
                        {formatPrice(calculatedPrice.finalPrice)}
                      </div>
                      <div className="text-sm text-gray-500">
                        You save {formatPrice(calculatedPrice.totalSavings)} ({calculatedPrice.totalDiscount}%)
                      </div>
                    </div>
                    <div className="text-center">
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                      <div className="text-sm font-medium text-green-600">
                        {calculatedPrice.totalDiscount > 30 ? 'Maximum Savings!' : 'Great Deal!'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Community Tab */}
          {activeTab === 'community' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Community Tips & Tricks</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Learn from experienced deal hunters and share your own money-saving strategies.
                </p>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                <div className="flex flex-wrap gap-2">
                  {['all', 'discount-stacking', 'timing', 'payment', 'general'].map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedTipCategory(category)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        selectedTipCategory === category
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      {category === 'all' ? 'All Tips' : category.split('-').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => setShowTipForm(!showTipForm)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Share Tip</span>
                </button>
              </div>

              {/* Add Tip Form */}
              {showTipForm && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Share Your Deal Tip</h3>
                  <textarea
                    value={newTip}
                    onChange={(e) => setNewTip(e.target.value)}
                    placeholder="Share your money-saving tip with the community..."
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                    rows={3}
                  />
                  <div className="flex items-center justify-end space-x-3 mt-4">
                    <button
                      onClick={() => setShowTipForm(false)}
                      className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddTip}
                      disabled={!newTip.trim()}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Share Tip
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                {filteredTips.map((tip) => (
                  <div key={tip.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {tip.user.charAt(0)}
                        </div>
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-semibold text-gray-900 dark:text-white">{tip.user}</span>
                          {tip.verified && (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          )}
                          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">
                            {tip.category.split('-').map(word => 
                              word.charAt(0).toUpperCase() + word.slice(1)
                            ).join(' ')}
                          </span>
                        </div>
                        
                        <p className="text-gray-700 dark:text-gray-300 mb-4">{tip.tip}</p>
                        
                        <div className="flex items-center space-x-4">
                          <button 
                            onClick={() => handleTipUpvote(tip.id)}
                            className={`flex items-center space-x-2 transition-colors ${
                              tip.userUpvoted 
                                ? 'text-blue-600 dark:text-blue-400' 
                                : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                            }`}
                          >
                            <ArrowUp className="w-4 h-4" />
                            <span>{tip.upvotes}</span>
                          </button>
                          <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                            <MessageSquare className="w-4 h-4" />
                            <span>Reply</span>
                          </button>
                          <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                            <ExternalLink className="w-4 h-4" />
                            <span>Share</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Recommendations Section */}
              <div className="mt-16 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8">
                <div className="text-center mb-8">
                  <Sparkles className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">AI-Powered Recommendations</h3>
                  <p className="text-gray-600 dark:text-gray-400">Get personalized product suggestions based on your preferences and budget</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                        <Smartphone className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">For You: Budget Gaming Phone</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      Based on your interest in gaming and budget of ₹25K
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-purple-600">POCO X6 Pro</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <Laptop className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Trending: Student Laptop</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      Perfect for coding and design work under ₹60K
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-blue-600">MacBook Air M2</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                        <Headphones className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Deal Alert: Premium Audio</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      Price dropped 30% - limited time offer
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-green-600">Sony WH-1000XM5</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold">Tech Deal Radar</span>
                </div>
                <p className="text-gray-400 mb-6 max-w-md">
                  Empowering users to make smarter tech purchases by combining specs, price intelligence, and community wisdom into one seamless experience.
                </p>
                <div className="flex space-x-4">
                  <button className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <Users className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <MessageSquare className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <Gift className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Features</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Price Tracking</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Product Comparison</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Deal Alerts</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Discount Stacking</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">AI Recommendations</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
              <p className="text-gray-400 text-sm">
                © 2024 Tech Deal Radar. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <span className="text-gray-400 text-sm">Made with ❤️ for tech enthusiasts</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;