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
                src="https://images.squarespace-cdn.com/content/v1/5eac4ea3e88fff1b365dc45d/1599599381716-G6S1JK3EQVVQR1F4ZJ4S/AUGUST+pink+50x70.jpg?format=1000w" 
                alt="Flower Shop Story" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Sinh Viên Thực hiện</h2>
              <p className="text-gray-600 mb-4">
                Phạm Nguyễn Chu Nguyên - Mã số sinh viên: 21050043.
              </p>
              <p className="text-gray-600 mb-4">
                Vy Ngọc Nhân - Mã số sinh viên: 22050030.
              </p>
              <p className="text-gray-600 mb-4">
                Đặng Văn Nhật Thanh - Mã số sinh viên: 23050029.
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
                Nhóm sinh viên chúng em thực hiện dự án với sự đam mê đối với Ngành Công Nghệ Thông Tin.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Chất Lượng</h3>
              <p className="text-gray-600">
                Nhóm sinh viên chúng em  cam kết chỉ sử dụng những bông hoa tươi nhất và vật liệu chất lượng cao.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ThumbsUp className="h-8 w-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Sự Hài Lòng</h3>
              <p className="text-gray-600">
                Sự hài lòng của khách hàng là ưu tiên hàng đầu mà nhóm sinh viên chúng em làm.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Dịch Vụ</h3>
              <p className="text-gray-600">
                Trong tương lai, nhóm sinh viên chúng em có thể trở thành đối tác tin cậy cung cấp dịch vụ giao hàng nhanh chóng và uy tín.
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
                  <span>Trường đại học Bình Dương, TP. Thủ dầu Một, Bình Dương</span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-6 w-6 text-pink-500 mr-3 flex-shrink-0" />
                  <span>0938 320 498</span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-6 w-6 text-pink-500 mr-3 flex-shrink-0" />
                  <span>21050043@student.bdu.edu.vn</span>
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