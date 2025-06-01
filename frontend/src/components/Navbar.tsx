import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, LogOut, Package, Home, Info, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

const Navbar = () => {
  const { isAuthenticated, isAdmin, isStaff, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { addToast } = useToast();

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
          <div className="hidden md:flex">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="px-4 py-2 rounded-l-lg text-gray-800 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="bg-pink-700 px-4 py-2 rounded-r-lg hover:bg-pink-800 transition"
              >
                <Search size={18} />
              </button>
            </form>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart" className="hover:text-pink-200 relative">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-pink-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
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
            <form onSubmit={handleSearch} className="mb-4 flex">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="px-4 py-2 rounded-l-lg text-gray-800 w-full focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="bg-pink-700 px-4 py-2 rounded-r-lg hover:bg-pink-800 transition"
              >
                <Search size={18} />
              </button>
            </form>
            
            <div className="flex flex-col space-y-3">
              <Link to="/" className="hover:text-pink-200 flex items-center gap-2">
                <Home size={18} />
                <span>Trang chủ</span>
              </Link>
              <Link to="/categories" className="hover:text-pink-200 flex items-center gap-2">
                <Package size={18} />
                <span>Danh mục</span>
              </Link>
              <Link to="/about" className="hover:text-pink-200 flex items-center gap-2">
                <Info size={18} />
                <span>Về chúng tôi</span>
              </Link>
              <Link to="/cart" className="hover:text-pink-200 flex items-center gap-2">
                <ShoppingCart size={18} />
                <span>Giỏ hàng</span>
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link to="/account" className="hover:text-pink-200 flex items-center gap-2">
                    <User size={18} />
                    <span>Tài khoản</span>
                  </Link>
                  <Link to="/orders" className="hover:text-pink-200 flex items-center gap-2">
                    <Package size={18} />
                    <span>Đơn hàng</span>
                  </Link>
                  {(isAdmin || isStaff) && (
                    <Link to="/admin" className="hover:text-pink-200 flex items-center gap-2">
                      <User size={18} />
                      <span>Quản trị</span>
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="hover:text-pink-200 flex items-center gap-2"
                  >
                    <LogOut size={18} />
                    <span>Đăng xuất</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="bg-white text-pink-600 px-4 py-2 rounded-lg hover:bg-pink-100 transition text-center"
                >
                  Đăng nhập
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 