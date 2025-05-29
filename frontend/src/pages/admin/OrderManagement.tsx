import { useEffect, useState } from 'react';
import { Eye, Search, RefreshCw } from 'lucide-react';
import AdminLayout from '../../layouts/AdminLayout';
import { getAllOrders, updateOrderStatus } from '../../services/order.service';
import type { OrderResponse } from '../../services/order.service';

const OrderManagement = () => {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<OrderResponse | null>(null);
  const [showDetail, setShowDetail] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const response = await getAllOrders(currentPage, 10);
        setOrders(response.orders);
        setTotalPages(response.totalPages);
        setError(null);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        setError('Đã xảy ra lỗi khi lấy dữ liệu. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, refreshTrigger]);

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleShowDetail = (order: OrderResponse) => {
    setSelectedOrder(order);
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedOrder(null);
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await updateOrderStatus(id, status);
      handleRefresh();
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái:', error);
      setError('Đã xảy ra lỗi khi cập nhật trạng thái. Vui lòng thử lại sau.');
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Đã đặt hàng':
        return 'bg-yellow-100 text-yellow-800';
      case 'Đang xử lý':
        return 'bg-blue-100 text-blue-800';
      case 'Đang giao hàng':
        return 'bg-indigo-100 text-indigo-800';
      case 'Đã giao hàng':
        return 'bg-green-100 text-green-800';
      case 'Đã hủy':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = selectedStatus === 'all'
    ? orders
    : orders.filter(order => order.TrangThai === selectedStatus);

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Quản lý đơn hàng</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tìm kiếm đơn hàng..."
                  className="pl-10 pr-4 py-2 border rounded-md w-full md:w-64"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border rounded-md px-3 py-2"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="Đã đặt hàng">Đã đặt hàng</option>
                <option value="Đang xử lý">Đang xử lý</option>
                <option value="Đang giao hàng">Đang giao hàng</option>
                <option value="Đã giao hàng">Đã giao hàng</option>
                <option value="Đã hủy">Đã hủy</option>
              </select>
              <button
                onClick={handleRefresh}
                className="bg-blue-50 text-blue-600 p-2 rounded-md hover:bg-blue-100 transition-colors"
                title="Làm mới"
              >
                <RefreshCw size={18} />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                        Mã đơn
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                        Khách hàng
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                        Ngày đặt
                      </th>
                      <th className="py-3 px-4 text-right text-sm font-medium text-gray-600 uppercase tracking-wider">
                        Tổng tiền
                      </th>
                      <th className="py-3 px-4 text-center text-sm font-medium text-gray-600 uppercase tracking-wider">
                        Trạng thái
                      </th>
                      <th className="py-3 px-4 text-center text-sm font-medium text-gray-600 uppercase tracking-wider">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-gray-500">
                          Không có đơn hàng nào
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((order) => (
                        <tr key={order.MaHoaDon} className="hover:bg-gray-50">
                          <td className="py-4 px-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              #{order.MaHoaDon}
                            </div>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {order.KhachHang?.TenKhachHang || 'Không có tên'}
                            </div>
                            <div className="text-xs text-gray-500">
                              {order.KhachHang?.SoDienThoai || 'Không có SĐT'}
                            </div>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-900">
                            {order.NgayLap ? formatDate(order.NgayLap) : 'Không có'}
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-right">
                            <div className="text-sm font-medium text-gray-900">
                              {formatCurrency(order.TongTien)}
                            </div>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-center">
                            <select
                              value={order.TrangThai}
                              onChange={(e) => handleStatusChange(order.MaHoaDon, e.target.value)}
                              className={`px-2 py-1 text-xs font-medium rounded-md ${getStatusColor(order.TrangThai)}`}
                            >
                              <option value="Đã đặt hàng">Đã đặt hàng</option>
                              <option value="Đang xử lý">Đang xử lý</option>
                              <option value="Đang giao hàng">Đang giao hàng</option>
                              <option value="Đã giao hàng">Đã giao hàng</option>
                              <option value="Đã hủy">Đã hủy</option>
                            </select>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-center">
                            <div className="flex justify-center">
                              <button
                                onClick={() => handleShowDetail(order)}
                                className="p-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                                title="Xem chi tiết"
                              >
                                <Eye size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center mt-6">
                  <nav className="flex space-x-2" aria-label="Pagination">
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-2 rounded-md ${
                          currentPage === index + 1
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </nav>
                </div>
              )}
            </>
          )}
        </div>

        {/* Chi tiết đơn hàng */}
        {showDetail && selectedOrder && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Chi tiết đơn hàng #{selectedOrder.MaHoaDon}</h2>
                  <button
                    onClick={handleCloseDetail}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    &times;
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">Thông tin khách hàng</h3>
                    <p className="text-sm"><span className="font-medium">Tên:</span> {selectedOrder.KhachHang?.TenKhachHang || 'Không có'}</p>
                    <p className="text-sm"><span className="font-medium">SĐT:</span> {selectedOrder.KhachHang?.SoDienThoai || 'Không có'}</p>
                    <p className="text-sm"><span className="font-medium">Địa chỉ giao hàng:</span> {selectedOrder.DiaChi || 'Không có'}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">Thông tin đơn hàng</h3>
                    <p className="text-sm"><span className="font-medium">Mã đơn:</span> #{selectedOrder.MaHoaDon}</p>
                    <p className="text-sm"><span className="font-medium">Ngày đặt:</span> {formatDate(selectedOrder.NgayLap)}</p>
                    <p className="text-sm"><span className="font-medium">Phương thức thanh toán:</span> {selectedOrder.PhuongThucTT}</p>
                    <p className="text-sm"><span className="font-medium">Trạng thái:</span> 
                      <span className={`ml-1 px-2 py-1 text-xs font-medium rounded-md ${getStatusColor(selectedOrder.TrangThai)}`}>
                        {selectedOrder.TrangThai}
                      </span>
                    </p>
                  </div>
                </div>
                
                <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">Chi tiết sản phẩm</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sản phẩm</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Số lượng</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Đơn giá</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedOrder.ChiTietHoaDons?.map((item) => (
                        <tr key={item.MaChiTiet}>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{item.SanPham?.TenSanPham || 'Không có tên'}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-500">{item.SoLuong}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-right text-sm text-gray-500">{formatCurrency(item.DonGia)}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">{formatCurrency(item.ThanhTien)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan={3} className="px-4 py-4 text-right text-sm font-medium">Tổng tiền:</td>
                        <td className="px-4 py-4 text-right text-sm font-bold">{formatCurrency(selectedOrder.TongTien)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              <div className="p-6 border-t bg-gray-50">
                <div className="flex justify-end">
                  <button
                    onClick={handleCloseDetail}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default OrderManagement; 