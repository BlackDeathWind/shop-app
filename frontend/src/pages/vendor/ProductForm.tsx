import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import { getProductById, vendorCreateProduct, vendorUpdateProduct } from '../../services/product.service';
import { getAllCategories } from '../../services/category.service';
import type { CategoryResponse } from '../../services/category.service';
import { useToast } from '../../contexts/ToastContext';

const VendorProductForm: React.FC = () => {
  const { productId } = useParams();
  const isEdit = !!productId;
  const [form, setForm] = useState<any>({ TenSanPham: '', MaDanhMuc: '', GiaSanPham: '', SoLuong: '', MoTa: '' });
  const [image, setImage] = useState<File | null>(null);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const navigate = useNavigate();
  const { addToast } = useToast();

  useEffect(() => {
    (async () => {
      try {
        setCategories(await getAllCategories());
        if (isEdit && productId) {
          const p = await getProductById(Number(productId));
          setForm({
            TenSanPham: p.TenSanPham,
            MaDanhMuc: p.MaDanhMuc,
            GiaSanPham: p.GiaSanPham,
            SoLuong: p.SoLuong,
            MoTa: p.MoTa || ''
          });
        }
      } catch {}
    })();
  }, [isEdit, productId]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  const onImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));
      if (image) fd.append('image', image);
      if (isEdit && productId) {
        await vendorUpdateProduct(Number(productId), fd);
        addToast('Cập nhật sản phẩm thành công', 'success');
      } else {
        await vendorCreateProduct(fd);
        addToast('Tạo sản phẩm thành công', 'success');
      }
      navigate('/vendor/products');
    } catch (e: any) {
      addToast(e?.response?.data?.message || 'Không thể lưu sản phẩm', 'error');
    }
  };

  return (
    <MainLayout>
      <section className="py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-semibold mb-6">{isEdit ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm'}</h1>
          <form onSubmit={onSubmit} className="bg-white rounded-lg shadow p-6 space-y-4 max-w-2xl">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Tên sản phẩm</label>
              <input name="TenSanPham" value={form.TenSanPham} onChange={onChange} required className="w-full border rounded px-3 py-2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Danh mục</label>
                <select name="MaDanhMuc" value={form.MaDanhMuc} onChange={onChange} required className="w-full border rounded px-3 py-2">
                  <option value="">-- Chọn danh mục --</option>
                  {categories.map(c => (
                    <option key={c.MaDanhMuc} value={c.MaDanhMuc}>{c.TenDanhMuc}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Số lượng</label>
                <input type="number" name="SoLuong" value={form.SoLuong} onChange={onChange} required className="w-full border rounded px-3 py-2" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Giá sản phẩm (VND)</label>
                <input type="number" name="GiaSanPham" value={form.GiaSanPham} onChange={onChange} required className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Hình ảnh</label>
                <input type="file" accept="image/*" onChange={onImage} className="w-full" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Mô tả</label>
              <textarea name="MoTa" value={form.MoTa} onChange={onChange} rows={4} className="w-full border rounded px-3 py-2" />
            </div>
            <div className="flex justify-end">
              <button type="submit" className="px-6 py-2 bg-pink-600 text-white rounded hover:bg-pink-700">{isEdit ? 'Cập nhật' : 'Tạo'}</button>
            </div>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default VendorProductForm;


