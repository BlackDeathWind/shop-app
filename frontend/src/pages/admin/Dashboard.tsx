import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Users, Package, ShoppingBag } from 'lucide-react';
import AdminLayout from '../../layouts/AdminLayout';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import { API_ENDPOINTS } from '../../constants/api';

interface DashboardSummary {
  totalProducts: number;
  totalCategories: number;
  totalCustomers: number;
  totalOrders: number;
  revenue: number;
}

const Dashboard = () => {
  const [summary, setSummary] = useState<DashboardSummary>({
    totalProducts: 0,
    totalCategories: 0,
    totalCustomers: 0,
    totalOrders: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra quyền truy cập
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/admin', message: 'Vui lòng đăng nhập để truy cập trang quản trị' } });
      return;
    }

    // Kiểm tra role (chỉ admin và nhân viên mới có quyền truy cập)
    if (user && user.MaVaiTro !== 0 && user.MaVaiTro !== 1) {
      navigate('/', { state: { message: 'Bạn không có quyền truy cập trang quản trị' } });
      return;
    }

    // Lấy dữ liệu tổng quan
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await api.get(API_ENDPOINTS.ADMIN.DASHBOARD_SUMMARY);
        setSummary(response.data);
      } catch (error: any) {
        console.error('Error fetching dashboard data:', error);
        setError('Không thể tải dữ liệu tổng quan. Vui lòng thử lại sau!');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [isAuthenticated, user, navigate]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <AdminLayout>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-semibold mb-6">Tổng quan</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Thống kê sản phẩm */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Package className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-gray-500 text-sm">Sản phẩm</p>
                  <h3 className="font-semibold text-xl">{summary.totalProducts}</h3>
                </div>
              </div>
            </div>

            {/* Thống kê danh mục */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <BarChart className="h-8 w-8 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-gray-500 text-sm">Danh mục</p>
                  <h3 className="font-semibold text-xl">{summary.totalCategories}</h3>
                </div>
              </div>
            </div>

            {/* Thống kê khách hàng */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-gray-500 text-sm">Khách hàng</p>
                  <h3 className="font-semibold text-xl">{summary.totalCustomers}</h3>
                </div>
              </div>
            </div>

            {/* Thống kê đơn hàng */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-full">
                  <ShoppingBag className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-gray-500 text-sm">Đơn hàng</p>
                  <h3 className="font-semibold text-xl">{summary.totalOrders}</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Biểu đồ doanh thu */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Doanh thu</h2>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-pink-600">{formatPrice(summary.revenue)}</h3>
                <p className="text-gray-500 mt-1">Tổng doanh thu</p>
              </div>
            </div>

            {/* Vị trí đặt biểu đồ thống kê doanh thu */}
            <div className="h-64 mt-6 flex items-center justify-center">
              <p className="text-gray-500">Biểu đồ thống kê doanh thu sẽ hiển thị tại đây</p>
            </div>
          </div>

          {/* Các đơn hàng gần đây */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Đơn hàng gần đây</h2>
            <div className="flex items-center justify-center py-8">
              <p className="text-gray-500">Danh sách đơn hàng gần đây sẽ hiển thị tại đây</p>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default Dashboard; 