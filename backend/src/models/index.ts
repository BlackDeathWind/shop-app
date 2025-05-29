import VaiTro from './VaiTro.model';
import NhanVien from './NhanVien.model';
import KhachHang from './KhachHang.model';
import DanhMuc from './DanhMuc.model';
import SanPham from './SanPham.model';
import HoaDon from './HoaDon.model';
import ChiTietHoaDon from './ChiTietHoaDon.model';
import { sequelize } from '../config/db.config';

const models = {
  VaiTro,
  NhanVien,
  KhachHang,
  DanhMuc,
  SanPham,
  HoaDon,
  ChiTietHoaDon
};

const initializeModels = async () => {
  sequelize.addModels([
    VaiTro,
    NhanVien,
    KhachHang,
    DanhMuc,
    SanPham,
    HoaDon,
    ChiTietHoaDon
  ]);

  // Force sync for development only
  if (process.env.NODE_ENV === 'development') {
    try {
      await sequelize.sync({ alter: true });
      console.log('All models were synchronized successfully.');
    } catch (error) {
      console.error('Failed to synchronize models:', error);
    }
  }
};

export { models, initializeModels }; 