import React, { useEffect, useState } from 'react';
import { Package, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import { getVendorProducts } from '../../services/product.service';

const VendorDashboard: React.FC = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const res = await getVendorProducts(1, 1);
        setCount(res.total || 0);
      } catch {}
    })();
  }, []);

  return (
    <MainLayout>
      <section className="py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-semibold mb-6">Khu vực người bán</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="bg-pink-100 p-3 rounded-full">
                  <Package className="h-8 w-8 text-pink-600" />
                </div>
                <div className="ml-4">
                  <p className="text-gray-500 text-sm">Tổng sản phẩm</p>
                  <h3 className="font-semibold text-xl">{count}</h3>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex items-center justify-between">
              <div>
                <p className="text-gray-700">Quản lý sản phẩm của bạn</p>
                <Link to="/vendor/products" className="text-pink-600 hover:underline">Xem danh sách</Link>
              </div>
              <Link to="/vendor/products/new" className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700">
                <PlusCircle size={18} /> Thêm sản phẩm
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default VendorDashboard;


