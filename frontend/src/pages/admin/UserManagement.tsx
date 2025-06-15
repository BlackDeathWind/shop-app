import { useEffect, useState } from 'react';
import { UserPlus, Edit, Trash, Search, RefreshCw } from 'lucide-react';
import AdminLayout from '../../layouts/AdminLayout';
import {
  getAllCustomers,
  getAllStaff,
  getUserById,
  createUser
} from '../../services/user.service';
import type { UserResponse } from '../../services/user.service';
import { useToast } from '../../contexts/ToastContext';
import { useLocation } from 'react-router-dom';
import { getMyOrders, getOrdersByCustomerId } from '../../services/order.service';

const UserManagement = () => {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'customers' | 'staff'>('customers');
  const { addToast } = useToast();
  const location = useLocation();
  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [userOrders, setUserOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({
    TenNhanVien: '',
    SoDienThoai: '',
    MatKhau: '',
    MatKhauNhapLai: '',
    DiaChi: ''
  });
  const [addLoading, setAddLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab === 'staff' || tab === 'customers') {
      setActiveTab(tab);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        let response;
        if (activeTab === 'customers') {
          response = await getAllCustomers(currentPage, 10);
          setUsers(response.users || []);
        } else {
          response = await getAllStaff(currentPage, 10);
          setUsers(response.users || []);
        }
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
  }, [activeTab, currentPage, refreshTrigger]);

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleTabChange = (tab: 'customers' | 'staff') => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleShowDetail = async (user: UserResponse) => {
    setShowDetailModal(true);
    setSelectedUser(user);
    if (user.MaKhachHang) {
      setOrdersLoading(true);
      try {
        // Nếu là admin/staff, lấy đơn hàng của khách hàng này qua API mới
        const res = await getOrdersByCustomerId(user.MaKhachHang);
        setUserOrders(res);
      } catch {
        setUserOrders([]);
      } finally {
        setOrdersLoading(false);
      }
    } else {
      setUserOrders([]);
    }
  };

  const handleCloseDetail = () => {
    setShowDetailModal(false);
    setSelectedUser(null);
    setUserOrders([]);
  };

  const handleDisableUser = (user: UserResponse) => {
    addToast(
      <span>Bạn có chắc chắn muốn vô hiệu hóa tài khoản này không?
        <button onClick={() => confirmDisableUser()} className="ml-4 px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700">Xác nhận</button>
        <button onClick={() => {}} className="ml-2 px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Hủy</button>
      </span>,
      'warning'
    );
  };

  const confirmDisableUser = () => {
    addToast('Đây chỉ là thử nghiệm, tính năng vô hiệu hóa sẽ phát triển trong tương lai.', 'info');
  };

  const handleOpenAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setAddForm({ TenNhanVien: '', SoDienThoai: '', MatKhau: '', MatKhauNhapLai: '', DiaChi: '' });
  };
  const handleAddInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Kiểm tra dữ liệu đầu vào
    if (!addForm.TenNhanVien || !addForm.SoDienThoai || !addForm.MatKhau || !addForm.MatKhauNhapLai || !addForm.DiaChi) {
      addToast('Vui lòng nhập đầy đủ thông tin.', 'error');
      return;
    }
    if (!/^[0-9]{10}$/.test(addForm.SoDienThoai)) {
      addToast('Số điện thoại phải có 10 chữ số.', 'error');
      return;
    }
    if (addForm.MatKhau.length < 6) {
      addToast('Mật khẩu phải có ít nhất 6 ký tự.', 'error');
      return;
    }
    if (addForm.MatKhau !== addForm.MatKhauNhapLai) {
      addToast('Mật khẩu nhập lại không khớp.', 'error');
      return;
    }
    setAddLoading(true);
    try {
      await createUser({
        TenNhanVien: addForm.TenNhanVien,
        SoDienThoai: addForm.SoDienThoai,
        MatKhau: addForm.MatKhau,
        DiaChi: addForm.DiaChi,
        MaVaiTro: 1
      });
      addToast('Thêm tài khoản nhân viên thành công!', 'success');
      handleCloseAddModal();
      setRefreshTrigger(prev => prev + 1);
    } catch (error: any) {
      addToast(error?.response?.data?.message || 'Đã xảy ra lỗi khi thêm tài khoản.', 'error');
    } finally {
      setAddLoading(false);
    }
  };

  // Filter users theo searchTerm
  const filteredUsers = users.filter(user => {
    const search = searchTerm.trim().toLowerCase();
    if (!search) return true;
    const name = (user.TenKhachHang || user.TenNhanVien || '').toLowerCase();
    const phone = (user.SoDienThoai || '').toLowerCase();
    return name.includes(search) || phone.includes(search);
  });

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Quản lý người dùng</h1>
          <button
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            onClick={handleOpenAddModal}
          >
            <UserPlus size={18} />
            <span>Thêm tài khoản nhân viên</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="border-b mb-6">
            <div className="flex space-x-4">
              <button
                className={`pb-3 px-2 ${
                  activeTab === 'customers'
                    ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => handleTabChange('customers')}
              >
                Khách hàng
              </button>
              <button
                className={`pb-3 px-2 ${
                  activeTab === 'staff'
                    ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => handleTabChange('staff')}
              >
                Nhân viên
              </button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tìm kiếm người dùng..."
                  className="pl-10 pr-4 py-2 border rounded-md w-full md:w-64"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
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
                        Tên
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                        Số điện thoại
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                        Địa chỉ
                      </th>
                      <th className="py-3 px-4 text-center text-sm font-medium text-gray-600 uppercase tracking-wider">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-gray-500">
                          Không có người dùng nào
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((user) => (
                        <tr key={user.MaKhachHang || user.MaNhanVien} className="hover:bg-gray-50">
                          <td className="py-4 px-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {user.TenKhachHang || user.TenNhanVien}
                            </div>
                            <div className="text-xs text-gray-500">
                              ID: {user.MaKhachHang || user.MaNhanVien}
                            </div>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-900">
                            {user.SoDienThoai}
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-900">
                            {user.DiaChi || 'Không có địa chỉ'}
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-center">
                            <div className="flex justify-center space-x-2">
                              <button
                                className="p-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                                title="Xem chi tiết tài khoản"
                                onClick={() => handleShowDetail(user)}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12s3.75-7.5 9.75-7.5 9.75 7.5 9.75 7.5-3.75 7.5-9.75 7.5S2.25 12 2.25 12z" />
                                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                              </button>
                              <button
                                className="p-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
                                title="Vô hiệu hóa tài khoản"
                                onClick={() => handleDisableUser(user)}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75l10.5 10.5m0-10.5L6.75 17.25" />
                                </svg>
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
      </div>

      {/* Modal chi tiết tài khoản */}
      {showDetailModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            <button onClick={handleCloseDetail} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-xl font-bold mb-4">Chi tiết tài khoản</h2>
            <div className="mb-2"><b>Tên:</b> {selectedUser.TenKhachHang || selectedUser.TenNhanVien}</div>
            <div className="mb-2"><b>Số điện thoại:</b> {selectedUser.SoDienThoai}</div>
            <div className="mb-2"><b>Địa chỉ:</b> {selectedUser.DiaChi || 'Không có'}</div>
            <div className="mb-2"><b>Vai trò:</b> {selectedUser.VaiTro?.TenVaiTro || (selectedUser.MaVaiTro === 0 ? 'Quản trị viên' : selectedUser.MaVaiTro === 1 ? 'Nhân viên' : 'Khách hàng')}</div>
            {selectedUser.MaKhachHang && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Đơn hàng của tài khoản này:</h3>
                {ordersLoading ? (
                  <div>Đang tải đơn hàng...</div>
                ) : userOrders.length === 0 ? (
                  <div>Chưa có đơn hàng nào.</div>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {userOrders.map(order => (
                      <li key={order.MaHoaDon} className="py-2">
                        <div><b>Mã đơn hàng:</b> {order.MaHoaDon}</div>
                        <div><b>Ngày lập:</b> {order.NgayLap}</div>
                        <div><b>Tổng tiền:</b> {order.TongTien.toLocaleString('vi-VN')} VND</div>
                        <div><b>Trạng thái:</b> {order.TrangThai}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal thêm tài khoản nhân viên */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button onClick={handleCloseAddModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-xl font-bold mb-4">Thêm tài khoản nhân viên</h2>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Tên nhân viên</label>
                <input type="text" name="TenNhanVien" value={addForm.TenNhanVien} onChange={handleAddInputChange} required className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                <input type="text" name="SoDienThoai" value={addForm.SoDienThoai} onChange={handleAddInputChange} required className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mật khẩu</label>
                <input type="text" name="MatKhau" value={addForm.MatKhau} onChange={handleAddInputChange} required className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Nhập lại mật khẩu</label>
                <input type="password" name="MatKhauNhapLai" value={addForm.MatKhauNhapLai} onChange={handleAddInputChange} required className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Địa chỉ</label>
                <input type="text" name="DiaChi" value={addForm.DiaChi} onChange={handleAddInputChange} className="w-full border rounded px-3 py-2" />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={handleCloseAddModal} className="px-4 py-2 border rounded bg-gray-100 text-gray-700">Hủy</button>
                <button type="submit" disabled={addLoading} className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">
                  {addLoading ? 'Đang thêm...' : 'Thêm nhân viên'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default UserManagement; 