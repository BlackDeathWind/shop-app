import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash, PlusCircle } from 'lucide-react';
import MainLayout from '../../layouts/MainLayout';
import { getVendorProducts, vendorDeleteProduct } from '../../services/product.service';
import type { ProductResponse } from '../../services/product.service';
import { API_BASE_URL } from '../../constants/api';
import { useToast } from '../../contexts/ToastContext';

const VendorProductManagement: React.FC = () => {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getVendorProducts(1, 100);
      setProducts(res.products || []);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
    await vendorDeleteProduct(id);
      addToast('Đã xóa sản phẩm', 'success');
      fetchData();
    } catch (e: any) {
      addToast(e?.response?.data?.message || 'Không thể xóa', 'error');
    }
  };

  return (
    <MainLayout>
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Sản phẩm của tôi</h1>
            <Link to="/vendor/products/new" className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700">
              <PlusCircle size={18} /> Thêm sản phẩm
            </Link>
          </div>
          {loading ? (
            <div>Đang tải...</div>
          ) : products.length === 0 ? (
            <div>Chưa có sản phẩm nào.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map(p => (
                <div key={p.MaSanPham} className="bg-white rounded-lg shadow p-4">
                  <div className="h-40 overflow-hidden mb-3 rounded">
                    {p.HinhAnh ? (
                      <img src={p.HinhAnh.startsWith('http') ? p.HinhAnh : `${API_BASE_URL}${p.HinhAnh}`}
                           className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                        Không có ảnh
                      </div>
                    )}
                  </div>
                  <div className="font-semibold mb-1">{p.TenSanPham}</div>
                  <div className="text-pink-600 font-bold mb-3">{p.GiaSanPham?.toLocaleString('vi-VN')}₫</div>
                  <div className="flex gap-2">
                    <Link to={`/vendor/products/edit/${p.MaSanPham}`} className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-1"><Edit size={14} /> Sửa</Link>
                    <button onClick={() => handleDelete(p.MaSanPham)} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-1"><Trash size={14} /> Xóa</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default VendorProductManagement;


