import { useState, useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { ChevronRight, ChevronLeft, ChevronDown, Star, Filter, ShoppingCart, Search, Loader } from 'lucide-react';
import api from '../services/api';
import { API_ENDPOINTS } from '../constants/api';
import { useToast } from '../contexts/ToastContext';

interface Product {
  MaSanPham: number;
  TenSanPham: string;
  GiaSanPham: number;
  HinhAnh: string;
  SoLuong: number;
  DanhMuc: {
    MaDanhMuc: number;
    TenDanhMuc: string;
  };
}

interface Category {
  MaDanhMuc: number;
  TenDanhMuc: string;
}

const ProductsByCategory = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number | null }>({ min: 0, max: null });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { addToast } = useToast();

  // Giả lập dữ liệu đánh giá sản phẩm
  const getRandomRating = () => {
    return Math.floor(Math.random() * 2) + 4; // Rating từ 4-5 sao
  };

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1');
    setCurrentPage(page);

    const fetchCategoryAndProducts = async () => {
      try {
        setLoading(true);
        // Fetch category info
        const categoryResponse = await api.get(API_ENDPOINTS.CATEGORY.GET_BY_ID(parseInt(categoryId || '0')));
        setCategory(categoryResponse.data);

        // Fetch products by category
        const productsResponse = await api.get(API_ENDPOINTS.PRODUCT.GET_BY_CATEGORY(parseInt(categoryId || '0')), {
          params: {
            page,
            limit: 12,
            min_price: priceRange.min > 0 ? priceRange.min : undefined,
            max_price: priceRange.max ? priceRange.max : undefined
          }
        });

        setProducts(productsResponse.data.products);
        setTotalPages(productsResponse.data.totalPages);
      } catch (err) {
        setError('Không thể tải danh sách sản phẩm. Vui lòng thử lại sau!');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryAndProducts();
  }, [categoryId, searchParams, priceRange]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setSearchParams({ page: newPage.toString() });
  };

  const applyFilters = () => {
    setSearchParams({ page: '1' });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const addToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Thêm logic giỏ hàng
    let cart: any[] = JSON.parse(localStorage.getItem('cart') || '[]');
    
    const existingItemIndex = cart.findIndex(item => item.productId === product.MaSanPham);
    
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      
      if (updatedCart[existingItemIndex].quantity > product.SoLuong) {
        updatedCart[existingItemIndex].quantity = product.SoLuong;
        addToast(`Chỉ còn ${product.SoLuong} sản phẩm trong kho!`, 'warning');
      }
      
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      const newItem = {
        productId: product.MaSanPham,
        name: product.TenSanPham,
        price: product.GiaSanPham,
        quantity: 1,
        image: product.HinhAnh || ''
      };
      
      cart.push(newItem);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    addToast(`Đã thêm ${product.TenSanPham} vào giỏ hàng!`, 'success');
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-500 to-rose-500 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4 text-center">
              {loading ? 'Đang tải...' : category?.TenDanhMuc || 'Danh mục sản phẩm'}
            </h1>
            <div className="flex items-center text-sm">
              <Link to="/" className="hover:underline">Trang Chủ</Link>
              <ChevronRight className="mx-2 h-4 w-4" />
              <Link to="/categories" className="hover:underline">Danh Mục</Link>
              <ChevronRight className="mx-2 h-4 w-4" />
              <span>{category?.TenDanhMuc || 'Sản phẩm'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar Filters */}
            <div className="md:w-1/4 lg:w-1/5">
              <div className="bg-white p-5 rounded-lg shadow mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Tìm kiếm</h3>
                </div>
                <form onSubmit={handleSearch} className="flex mb-4">
                  <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    className="px-4 py-2 border rounded-l-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="bg-pink-500 px-4 py-2 rounded-r-lg hover:bg-pink-600 transition"
                  >
                    <Search size={18} className="text-white" />
                  </button>
                </form>
              </div>

              {/* Price Filter */}
              <div className="bg-white p-5 rounded-lg shadow mb-6">
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <h3 className="font-semibold text-lg">Lọc theo giá</h3>
                  <ChevronDown 
                    className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} 
                    size={20} 
                  />
                </div>
                
                {showFilters && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block mb-2 text-sm">Từ giá:</label>
                      <input
                        type="number"
                        min="0"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm">Đến giá:</label>
                      <input
                        type="number"
                        min="0"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                        value={priceRange.max || ''}
                        onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value ? parseInt(e.target.value) : null })}
                      />
                    </div>
                    <button
                      onClick={applyFilters}
                      className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition flex items-center justify-center"
                    >
                      <Filter size={16} className="mr-2" />
                      Áp dụng
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Products Grid */}
            <div className="md:w-3/4 lg:w-4/5">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader className="animate-spin h-8 w-8 text-pink-500" />
                  <span className="ml-2">Đang tải sản phẩm...</span>
                </div>
              ) : error ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center">
                  <span className="block sm:inline">{error}</span>
                </div>
              ) : products.length === 0 ? (
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative text-center">
                  <span className="block sm:inline">Không có sản phẩm nào trong danh mục này.</span>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => {
                      const rating = getRandomRating();
                      return (
                        <div key={product.MaSanPham} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition">
                          <Link to={`/products/${product.MaSanPham}`} className="block">
                            <div className="relative h-64 overflow-hidden group">
                              <img
                                src={product.HinhAnh ? (product.HinhAnh.startsWith('http') ? product.HinhAnh : `http://localhost:5000${product.HinhAnh}`) : 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'}
                                alt={product.TenSanPham}
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                          </Link>
                          <Link to={`/products/${product.MaSanPham}`} className="block p-4">
                            <div className="flex items-center text-yellow-400 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={16}
                                  fill={i < rating ? 'currentColor' : 'none'}
                                  className={i < rating ? 'text-yellow-400' : 'text-gray-300'}
                                />
                              ))}
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-1 hover:text-pink-600 transition-colors">
                              {product.TenSanPham}
                            </h3>
                            <p className="text-sm text-gray-500 mb-2">{product.DanhMuc?.TenDanhMuc}</p>
                            <div className="flex justify-between items-center">
                              <span className="text-lg font-bold text-pink-600">
                                {formatPrice(product.GiaSanPham)}
                              </span>
                              <button 
                                className="bg-pink-500 hover:bg-pink-600 text-white text-sm px-3 py-1 rounded-full transition-colors"
                                onClick={(e) => addToCart(e, product)}
                              >
                                <ShoppingCart size={16} />
                              </button>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center mt-10">
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className={`px-4 py-2 rounded-md ${
                            currentPage === 1
                              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                              : 'bg-white text-gray-700 hover:bg-pink-500 hover:text-white'
                          }`}
                        >
                          <ChevronLeft size={20} />
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-4 py-2 rounded-md ${
                              currentPage === page
                                ? 'bg-pink-500 text-white'
                                : 'bg-white text-gray-700 hover:bg-pink-500 hover:text-white'
                            }`}
                          >
                            {page}
                          </button>
                        ))}

                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className={`px-4 py-2 rounded-md ${
                            currentPage === totalPages
                              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                              : 'bg-white text-gray-700 hover:bg-pink-500 hover:text-white'
                          }`}
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ProductsByCategory; 