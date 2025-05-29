import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { MapPin, Phone, Mail, Clock, Truck, Award, ThumbsUp, Heart } from 'lucide-react';

const About = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center h-80"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1458682625221-3a45f8a844c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80)' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Về Chúng Tôi</h1>
            <p className="text-lg text-white max-w-2xl mx-auto">
              Chuyên cung cấp các loại hoa tươi và quà tặng chất lượng với dịch vụ chuyên nghiệp
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1521543832500-49e528178874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                alt="Flower Shop Story" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Câu Chuyện Của Chúng Tôi</h2>
              <p className="text-gray-600 mb-4">
                Flower Shop được thành lập vào năm 2015 với mong muốn mang đến những bó hoa tươi đẹp nhất và những món quà ý nghĩa đến với mọi người. Chúng tôi bắt đầu từ một cửa hàng nhỏ và dần phát triển thành một trong những thương hiệu hàng đầu trong lĩnh vực hoa và quà tặng.
              </p>
              <p className="text-gray-600 mb-4">
                Với đội ngũ nhân viên giàu kinh nghiệm và đam mê, chúng tôi cam kết mang đến những sản phẩm chất lượng cao nhất với giá cả phải chăng. Mỗi bó hoa, mỗi món quà đều được chúng tôi chăm chút tỉ mỉ để đảm bảo sự hài lòng của khách hàng.
              </p>
              <p className="text-gray-600 mb-4">
                Flower Shop tự hào là đối tác tin cậy trong những dịp đặc biệt của khách hàng, từ sinh nhật, khai trương đến đám cưới và các sự kiện quan trọng khác. Chúng tôi luôn nỗ lực không ngừng để cải tiến và nâng cao chất lượng dịch vụ.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Giá Trị Cốt Lõi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Đam Mê</h3>
              <p className="text-gray-600">
                Chúng tôi làm việc với tình yêu và đam mê đối với hoa và nghệ thuật cắm hoa.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Chất Lượng</h3>
              <p className="text-gray-600">
                Chúng tôi cam kết chỉ sử dụng những bông hoa tươi nhất và vật liệu chất lượng cao.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ThumbsUp className="h-8 w-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Sự Hài Lòng</h3>
              <p className="text-gray-600">
                Sự hài lòng của khách hàng là ưu tiên hàng đầu trong mọi việc chúng tôi làm.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Dịch Vụ</h3>
              <p className="text-gray-600">
                Chúng tôi cung cấp dịch vụ giao hàng nhanh chóng và đáng tin cậy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Liên Hệ Với Chúng Tôi</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Thông Tin Liên Hệ</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <MapPin className="h-6 w-6 text-pink-500 mr-3 flex-shrink-0 mt-1" />
                  <span>123 Đường Hoa, Quận 1, TP. Hồ Chí Minh</span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-6 w-6 text-pink-500 mr-3 flex-shrink-0" />
                  <span>0123 456 789</span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-6 w-6 text-pink-500 mr-3 flex-shrink-0" />
                  <span>info@flowershop.com</span>
                </li>
                <li className="flex items-center">
                  <Clock className="h-6 w-6 text-pink-500 mr-3 flex-shrink-0" />
                  <div>
                    <p>Thứ Hai - Thứ Bảy: 8:00 - 20:00</p>
                    <p>Chủ Nhật: 9:00 - 18:00</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <form className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Gửi Tin Nhắn</h3>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 mb-2">Họ và tên</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Nhập họ và tên"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Nhập địa chỉ email"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-gray-700 mb-2">Tin nhắn</label>
                  <textarea 
                    id="message" 
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Nhập nội dung tin nhắn"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="bg-gradient-to-r from-pink-500 to-rose-500 text-white py-2 px-6 rounded-md hover:from-pink-600 hover:to-rose-600 transition"
                >
                  Gửi tin nhắn
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default About; 