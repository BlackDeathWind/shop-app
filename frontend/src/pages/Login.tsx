import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import MainLayout from '../layouts/MainLayout';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isStaff, setIsStaff] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login({
        SoDienThoai: phoneNumber,
        MatKhau: password,
        isNhanVien: isStaff
      });
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="bg-gray-100 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-8 text-white text-center">
              <h1 className="text-3xl font-bold mb-2">Đăng nhập</h1>
              <p>Đăng nhập để tiếp tục mua sắm</p>
            </div>

            <div className="p-6">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                    Số điện thoại
                  </label>
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <div className="bg-gray-100 px-3 py-2 text-gray-400">
                      <User size={20} />
                    </div>
                    <input
                      id="phone"
                      type="tel"
                      className="w-full px-4 py-2 focus:outline-none"
                      placeholder="Nhập số điện thoại"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Mật khẩu
                  </label>
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <div className="bg-gray-100 px-3 py-2 text-gray-400">
                      <Lock size={20} />
                    </div>
                    <input
                      id="password"
                      type="password"
                      className="w-full px-4 py-2 focus:outline-none"
                      placeholder="Nhập mật khẩu"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-pink-500"
                      checked={isStaff}
                      onChange={() => setIsStaff(!isStaff)}
                    />
                    <span className="ml-2 text-gray-700">Đăng nhập với tư cách nhân viên</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-2 px-4 rounded-lg hover:from-pink-600 hover:to-rose-600 transition flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    'Đang xử lý...'
                  ) : (
                    <>
                      <LogIn size={20} className="mr-2" />
                      Đăng nhập
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Chưa có tài khoản?{' '}
                  <Link to="/register" className="text-pink-500 hover:text-pink-700">
                    Đăng ký ngay
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login; 