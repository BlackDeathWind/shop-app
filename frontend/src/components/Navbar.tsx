import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, LogOut, Package, Home, Info, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { useCart } from '../contexts/CartContext';
import { searchProducts } from '../services/product.service';

const Navbar = () => {
  const { isAuthenticated, isAdmin, isStaff, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { addToast } = useToast();
  const { itemCount } = useCart();
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchTimeout = useRef<number | null>(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Xử lý click ngoài dropdown menu để đóng nó
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Gợi ý tìm kiếm sản phẩm
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    setSearchLoading(true);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = window.setTimeout(async () => {
      try {
        const res = await searchProducts(searchQuery, 1, 5);
        setSuggestions(res.products || []);
        setShowSuggestions(true);
      } catch (e) {
        setSuggestions([]);
        setShowSuggestions(false);
      } finally {
        setSearchLoading(false);
      }
    }, 300);
    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
    };
  }, [searchQuery]);

  const handleSuggestionClick = (productId: number) => {
    setShowSuggestions(false);
    setSearchQuery('');
    navigate(`/products/${productId}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      addToast('Đăng xuất thành công!', 'success');
      // Không cần redirect vì logout đã làm điều đó
    } catch (error) {
      addToast('Có lỗi xảy ra khi đăng xuất.', 'error');
    }
  };

  return (
    <nav className="bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Package size={28} />
            <span className="text-xl font-bold">Flower Shop</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-pink-200 flex items-center gap-1">
              <Home size={18} />
              <span>Trang chủ</span>
            </Link>
            <Link to="/categories" className="hover:text-pink-200 flex items-center gap-1">
              <Package size={18} />
              <span>Danh mục</span>
            </Link>
            <Link to="/about" className="hover:text-pink-200 flex items-center gap-1">
              <Info size={18} />
              <span>Về chúng tôi</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex relative">
            <form onSubmit={handleSearch} className="flex w-72">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="px-4 py-2 rounded-l-lg text-gray-800 focus:outline-none w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery && setShowSuggestions(true)}
                autoComplete="off"
              />
              <button
                type="submit"
                className="bg-pink-700 px-4 py-2 rounded-r-lg hover:bg-pink-800 transition"
              >
                <Search size={18} />
              </button>
            </form>
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-b-lg z-30 border border-t-0 border-gray-200">
                {searchLoading ? (
                  <div className="p-4 text-center text-gray-500">Đang tìm kiếm...</div>
                ) : (
                  suggestions.map((item) => (
                    <div
                      key={item.MaSanPham}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-pink-50 cursor-pointer"
                      onMouseDown={() => handleSuggestionClick(item.MaSanPham)}
                    >
                      <img
                        src={item.HinhAnh ? (item.HinhAnh.startsWith('http') ? item.HinhAnh : `http://localhost:5000${item.HinhAnh}`) : 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=60&q=80'}
                        alt={item.TenSanPham}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <span className="text-gray-800 text-sm font-medium">{item.TenSanPham}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart" className="hover:text-pink-200 relative">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-pink-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            </Link>

            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  className="flex items-center space-x-1 hover:text-pink-200 focus:outline-none"
                  onClick={toggleDropdown}
                >
                  <User size={24} />
                  <span>{user?.TenKhachHang || user?.TenNhanVien}</span>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20">
                    <div className="py-2">
                      {(isAdmin || isStaff) && (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Quản trị
                        </Link>
                      )}
                      <Link
                        to="/account"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Tài khoản
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Đơn hàng
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-white text-pink-600 px-4 py-2 rounded-lg hover:bg-pink-100 transition"
              >
                Đăng nhập
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-pink-400">
            <form onSubmit={handleSearch} className="mb-4 flex relative">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="px-4 py-2 rounded-l-lg text-gray-800 w-full focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery && setShowSuggestions(true)}
                autoComplete="off"
              />
              <button
                type="submit"
                className="bg-pink-700 px-4 py-2 rounded-r-lg hover:bg-pink-800 transition"
              >
                <Search size={18} />
              </button>
            </form>
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-b-lg z-30 border border-t-0 border-gray-200">
                {searchLoading ? (
                  <div className="p-4 text-center text-gray-500">Đang tìm kiếm...</div>
                ) : (
                  suggestions.map((item) => (
                    <div
                      key={item.MaSanPham}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-pink-50 cursor-pointer"
                      onMouseDown={() => handleSuggestionClick(item.MaSanPham)}
                    >
                      <img
                        src={item.HinhAnh ? (item.HinhAnh.startsWith('http') ? item.HinhAnh : `http://localhost:5000${item.HinhAnh}`) : 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=60&q=80'}
                        alt={item.TenSanPham}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <span className="text-gray-800 text-sm font-medium">{item.TenSanPham}</span>
                    </div>
                  ))
              )}
            </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 