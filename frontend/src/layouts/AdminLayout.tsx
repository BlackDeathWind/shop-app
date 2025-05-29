import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, Package, Users, ShoppingBag, Settings, LogOut, Menu, X, ChevronDown
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-pink-600 text-white">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden mr-2"
            >
              <Menu size={24} />
            </button>
            <Link to="/admin" className="font-semibold text-xl">
              Flower Shop Admin
            </Link>
          </div>
          <div className="flex items-center">
            <div className="mr-4">
              <div className="text-sm">Xin chào, {user?.TenKhachHang || user?.TenNhanVien}</div>
              <div className="text-xs opacity-75">
                {user?.MaVaiTro === 0 ? 'Quản trị viên' : 'Nhân viên'}
              </div>
            </div>
            <div className="h-8 w-8 bg-pink-700 rounded-full flex items-center justify-center">
              {user?.TenKhachHang?.[0] || user?.TenNhanVien?.[0] || 'A'}
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Sidebar for mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="fixed inset-0 bg-black opacity-50" onClick={() => setSidebarOpen(false)}></div>
            <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50">
              <div className="p-4 flex justify-between items-center border-b">
                <h2 className="font-semibold text-xl">Menu</h2>
                <button onClick={() => setSidebarOpen(false)}>
                  <X size={24} className="text-gray-500" />
                </button>
              </div>

              <nav className="p-4 space-y-2">
                <SidebarContent isActive={isActive} />
              </nav>
            </div>
          </div>
        )}

        {/* Sidebar for desktop */}
        <aside className="hidden lg:block w-64 bg-white shadow-md">
          <div className="p-6">
            <nav className="space-y-2">
              <SidebarContent isActive={isActive} />
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          <div className="container mx-auto">
            {children}
          </div>

          {/* Footer */}
          <footer className="mt-auto pt-8 pb-4">
            <div className="container mx-auto px-4">
              <div className="text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Flower Shop Admin. Bản quyền thuộc về Flower Shop.
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

// Component sidebar content để tái sử dụng cho cả mobile và desktop
function SidebarContent({ isActive }: { isActive: (path: string) => boolean }) {
  const { user } = useAuth();
  const isAdmin = user?.MaVaiTro === 0;
  
  const [userManagementOpen, setUserManagementOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement logout logic here
    navigate('/login');
  };

  return (
    <>
      <Link
        to="/admin"
        className={`flex items-center px-4 py-2 rounded-md ${
          isActive('/admin')
            ? 'bg-pink-100 text-pink-600'
            : 'text-gray-700 hover:bg-pink-50 hover:text-pink-600'
        }`}
      >
        <Home className="h-5 w-5 mr-3" />
        <span>Tổng quan</span>
      </Link>

      <Link
        to="/admin/products"
        className={`flex items-center px-4 py-2 rounded-md ${
          isActive('/admin/products')
            ? 'bg-pink-100 text-pink-600'
            : 'text-gray-700 hover:bg-pink-50 hover:text-pink-600'
        }`}
      >
        <Package className="h-5 w-5 mr-3" />
        <span>Sản phẩm</span>
      </Link>

      <Link
        to="/admin/orders"
        className={`flex items-center px-4 py-2 rounded-md ${
          isActive('/admin/orders')
            ? 'bg-pink-100 text-pink-600'
            : 'text-gray-700 hover:bg-pink-50 hover:text-pink-600'
        }`}
      >
        <ShoppingBag className="h-5 w-5 mr-3" />
        <span>Đơn hàng</span>
      </Link>

      {/* Quản lý người dùng - chỉ admin mới thấy */}
      {isAdmin && (
        <div>
          <button
            className={`w-full flex items-center justify-between px-4 py-2 rounded-md text-gray-700 hover:bg-pink-50 hover:text-pink-600`}
            onClick={() => setUserManagementOpen(!userManagementOpen)}
          >
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-3" />
              <span>Người dùng</span>
            </div>
            <ChevronDown 
              className={`h-5 w-5 transition-transform ${userManagementOpen ? 'transform rotate-180' : ''}`}
            />
          </button>
          
          {userManagementOpen && (
            <div className="ml-9 mt-2 space-y-1">
              <Link
                to="/admin/users/customers"
                className={`block px-4 py-2 rounded-md ${
                  isActive('/admin/users/customers')
                    ? 'bg-pink-100 text-pink-600'
                    : 'text-gray-600 hover:bg-pink-50 hover:text-pink-600'
                }`}
              >
                Khách hàng
              </Link>
              <Link
                to="/admin/users/staff"
                className={`block px-4 py-2 rounded-md ${
                  isActive('/admin/users/staff')
                    ? 'bg-pink-100 text-pink-600'
                    : 'text-gray-600 hover:bg-pink-50 hover:text-pink-600'
                }`}
              >
                Nhân viên
              </Link>
            </div>
          )}
        </div>
      )}

      <Link
        to="/admin/settings"
        className={`flex items-center px-4 py-2 rounded-md ${
          isActive('/admin/settings')
            ? 'bg-pink-100 text-pink-600'
            : 'text-gray-700 hover:bg-pink-50 hover:text-pink-600'
        }`}
      >
        <Settings className="h-5 w-5 mr-3" />
        <span>Cài đặt</span>
      </Link>

      <button
        onClick={handleLogout}
        className="w-full flex items-center px-4 py-2 rounded-md text-red-500 hover:bg-red-50"
      >
        <LogOut className="h-5 w-5 mr-3" />
        <span>Đăng xuất</span>
      </button>
    </>
  );
}

export default AdminLayout; 