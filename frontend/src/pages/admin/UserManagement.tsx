import { useEffect, useState } from 'react';
import { UserPlus, Edit, Trash, Search, RefreshCw } from 'lucide-react';
import AdminLayout from '../../layouts/AdminLayout';
import {
  getAllCustomers,
  getAllStaff,
  deleteUser,
  changeUserRole
} from '../../services/user.service';
import type { UserResponse } from '../../services/user.service';

const UserManagement = () => {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'customers' | 'staff'>('customers');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        let response;
        if (activeTab === 'customers') {
          response = await getAllCustomers(currentPage, 10);
        } else {
          response = await getAllStaff(currentPage, 10);
        }
        
        setUsers(response.users);
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

  const handleDelete = async (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này không?')) {
      try {
        await deleteUser(id);
        handleRefresh();
      } catch (error) {
        console.error('Lỗi khi xóa người dùng:', error);
        setError('Đã xảy ra lỗi khi xóa người dùng. Vui lòng thử lại sau.');
      }
    }
  };

  const handleChangeRole = async (id: number, roleId: number) => {
    try {
      await changeUserRole(id, roleId);
      handleRefresh();
    } catch (error) {
      console.error('Lỗi khi thay đổi vai trò:', error);
      setError('Đã xảy ra lỗi khi thay đổi vai trò. Vui lòng thử lại sau.');
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleTabChange = (tab: 'customers' | 'staff') => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Quản lý người dùng</h1>
          <button
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            <UserPlus size={18} />
            <span>Thêm người dùng mới</span>
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
                        Vai trò
                      </th>
                      <th className="py-3 px-4 text-center text-sm font-medium text-gray-600 uppercase tracking-wider">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-gray-500">
                          Không có người dùng nào
                        </td>
                      </tr>
                    ) : (
                      users.map((user) => (
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
                            <select
                              value={user.MaVaiTro}
                              onChange={(e) => handleChangeRole(
                                user.MaKhachHang || user.MaNhanVien || 0, 
                                Number(e.target.value)
                              )}
                              className="border rounded-md px-2 py-1 text-sm"
                            >
                              <option value="0">Quản trị viên</option>
                              <option value="1">Nhân viên</option>
                              <option value="2">Khách hàng</option>
                            </select>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-center">
                            <div className="flex justify-center space-x-2">
                              <button
                                className="p-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                                title="Chỉnh sửa"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete(user.MaKhachHang || user.MaNhanVien || 0)}
                                className="p-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
                                title="Xóa"
                              >
                                <Trash size={16} />
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
    </AdminLayout>
  );
};

export default UserManagement; 