import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Heart, ShoppingCart, Star } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';

// Giả lập dữ liệu cho trang chủ
const featuredProducts = [
  {
    id: 1,
    name: 'Bó hoa hồng đỏ',
    price: 500000,
    image: 'https://images.unsplash.com/photo-1561181286-d5271b221f2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    category: 'Hoa sinh nhật',
    rating: 5
  },
  {
    id: 2,
    name: 'Lẵng hoa khai trương',
    price: 850000,
    image: 'https://images.unsplash.com/photo-1589244159943-460088ed5c92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    category: 'Hoa khai trương',
    rating: 4
  },
  {
    id: 3,
    name: 'Hoa cầm tay cô dâu',
    price: 650000,
    image: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    category: 'Hoa cưới',
    rating: 5
  },
  {
    id: 4,
    name: 'Gấu bông Teddy',
    price: 350000,
    image: 'https://images.unsplash.com/photo-1559715541-5daf8a0296d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    category: 'Gấu bông',
    rating: 4
  }
];

const categories = [
  {
    id: 1,
    name: 'Hoa sinh nhật',
    image: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    name: 'Hoa khai trương',
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    name: 'Hoa cưới',
    image: 'https://images.unsplash.com/photo-1533616688419-b7a585564566?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 4,
    name: 'Hoa tang lễ',
    image: 'https://images.unsplash.com/photo-1518709414768-a88981a4515d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 5,
    name: 'Quà tặng lưu niệm',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 6,
    name: 'Gấu bông',
    image: 'https://images.unsplash.com/photo-1588156979401-db3dc31817cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  }
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const banners = [
    {
      id: 1,
      title: 'Bộ sưu tập hoa tươi mới nhất',
      description: 'Khám phá các loại hoa tươi đẹp nhất cho mọi dịp đặc biệt',
      image: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      link: '/categories/1'
    },
    {
      id: 2,
      title: 'Quà tặng cho người thân yêu',
      description: 'Những món quà ý nghĩa cho những người thân yêu của bạn',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      link: '/categories/5'
    },
    {
      id: 3,
      title: 'Gấu bông đáng yêu',
      description: 'Bộ sưu tập gấu bông đáng yêu cho mọi lứa tuổi',
      image: 'https://images.unsplash.com/photo-1559715541-5daf8a0296d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      link: '/categories/6'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <MainLayout>
      {/* Hero Banner Slider */}
      <div className="relative h-[500px] overflow-hidden">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${banner.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="max-w-lg text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{banner.title}</h1>
                <p className="text-lg mb-8">{banner.description}</p>
                <Link
                  to={banner.link}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg inline-flex items-center transition"
                >
                  Khám phá ngay
                  <ChevronRight size={20} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Slider controls */}
        <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Danh mục sản phẩm</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/categories/${category.id}`}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
              >
                <div className="h-40 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-800">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Sản phẩm nổi bật</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition">
                <div className="relative h-64 overflow-hidden group">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-2">
                      <button className="bg-white rounded-full p-2 hover:bg-pink-500 hover:text-white transition">
                        <ShoppingCart size={20} />
                      </button>
                      <button className="bg-white rounded-full p-2 hover:bg-pink-500 hover:text-white transition">
                        <Heart size={20} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center text-yellow-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < product.rating ? 'currentColor' : 'none'}
                        className={i < product.rating ? 'text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-pink-600">{formatPrice(product.price)}</span>
                    <Link
                      to={`/products/${product.id}`}
                      className="text-pink-500 hover:text-pink-700 text-sm font-medium"
                    >
                      Chi tiết
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/categories"
              className="inline-flex items-center px-6 py-3 border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white rounded-lg transition"
            >
              Xem tất cả sản phẩm
              <ChevronRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Chất lượng đảm bảo</h3>
              <p className="text-gray-600">Chúng tôi cam kết mang đến những sản phẩm chất lượng cao nhất.</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Giao hàng nhanh chóng</h3>
              <p className="text-gray-600">Giao hàng trong vòng 2 giờ nội thành và 24 giờ toàn quốc.</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Thanh toán an toàn</h3>
              <p className="text-gray-600">Nhiều phương thức thanh toán an toàn và bảo mật.</p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home; 