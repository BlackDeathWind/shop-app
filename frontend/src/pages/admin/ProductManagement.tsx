import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Edit, Trash, Search, RefreshCw } from 'lucide-react';
import AdminLayout from '../../layouts/AdminLayout';
import {
  getAllProducts,
  deleteProduct,
} from '../../services/product.service';
import type { ProductResponse, ProductListResponse } from '../../services/product.service';
import { getAllCategories } from '../../services/category.service';
import type { CategoryResponse } from '../../services/category.service';
import { API_BASE_URL } from '../../constants/api';
import { useToast } from '../../contexts/ToastContext';

const ProductManagement = () => {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const { addToast } = useToast();
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Lấy danh sách danh mục
        const categoriesData = await getAllCategories();
        setCategories(categoriesData);

        // Lấy danh sách sản phẩm
        const productsData: ProductListResponse = await getAllProducts(currentPage, 10);
        setProducts(productsData.products);
        setTotalPages(productsData.totalPages);
        
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

  const handleDelete = async (id: number) => {
    setPendingDeleteId(id);
    addToast(
      <span>Bạn có chắc chắn muốn xóa sản phẩm này không?
        <button onClick={() => confirmDelete(id)} className="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">Xác nhận xóa</button>
        <button onClick={() => setPendingDeleteId(null)} className="ml-2 px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Hủy</button>
      </span>,
      'warning'
    );
  };

  const confirmDelete = async (id: number) => {
    try {
      await deleteProduct(id);
      addToast('Đã xóa sản phẩm thành công!', 'success');
      handleRefresh();
    } catch (error) {
      addToast('Đã xảy ra lỗi khi xóa sản phẩm. Vui lòng thử lại sau.', 'error');
    } finally {
      setPendingDeleteId(null);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Quản lý sản phẩm</h1>
          <Link
            to="/admin/products/new"
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            <PlusCircle size={18} />
            <span>Thêm sản phẩm mới</span>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tìm kiếm sản phẩm..."
                  className="pl-10 pr-4 py-2 border rounded-md w-full md:w-64"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
              <select
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : null)}
                className="border rounded-md px-3 py-2"
              >
                <option value="">Tất cả danh mục</option>
                {categories.map((category) => (
                  <option key={category.MaDanhMuc} value={category.MaDanhMuc}>
                    {category.TenDanhMuc}
                  </option>
                ))}
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
                        Hình ảnh
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                        Tên sản phẩm
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                        Danh mục
                      </th>
                      <th className="py-3 px-4 text-right text-sm font-medium text-gray-600 uppercase tracking-wider">
                        Giá
                      </th>
                      <th className="py-3 px-4 text-center text-sm font-medium text-gray-600 uppercase tracking-wider">
                        Số lượng
                      </th>
                      <th className="py-3 px-4 text-center text-sm font-medium text-gray-600 uppercase tracking-wider">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {products.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-gray-500">
                          Không có sản phẩm nào
                        </td>
                      </tr>
                    ) : (
                      products.map((product) => (
                        <tr key={product.MaSanPham} className="hover:bg-gray-50">
                          <td className="py-4 px-4 whitespace-nowrap">
                            <div className="w-16 h-16 rounded-md overflow-hidden">
                              {product.HinhAnh ? (
                                <img
                                  src={product.HinhAnh ? (product.HinhAnh.startsWith('http') ? product.HinhAnh : `${API_BASE_URL}${product.HinhAnh}`) : ''}
                                  alt={product.TenSanPham}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                  <span className="text-xs text-gray-400">Không có ảnh</span>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{product.TenSanPham}</div>
                            <div className="text-xs text-gray-500">Mã: {product.MaSanPham}</div>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-md">
                              {product.DanhMuc?.TenDanhMuc || 'Không có danh mục'}
                            </span>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-right">
                            <div className="text-sm font-medium text-gray-900">
                              {formatCurrency(product.GiaSanPham)}
                            </div>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-center">
                            <span className={`px-2 py-1 text-xs font-medium rounded-md ${
                              product.SoLuong > 10
                                ? 'bg-green-100 text-green-800'
                                : product.SoLuong > 0
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {product.SoLuong}
                            </span>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-center">
                            <div className="flex justify-center space-x-2">
                              <Link
                                to={`/admin/products/edit/${product.MaSanPham}`}
                                className="p-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                                title="Chỉnh sửa"
                              >
                                <Edit size={16} />
                              </Link>
                              <button
                                onClick={() => handleDelete(product.MaSanPham)}
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

export default ProductManagement; 