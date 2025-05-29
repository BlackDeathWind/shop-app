import { Transaction } from 'sequelize';
import { sequelize } from '../config/db.config';
import HoaDon from '../models/HoaDon.model';
import ChiTietHoaDon from '../models/ChiTietHoaDon.model';
import SanPham from '../models/SanPham.model';
import KhachHang from '../models/KhachHang.model';
import NhanVien from '../models/NhanVien.model';
import { IHoaDon } from '../interfaces/models.interface';

interface OrderItem {
  MaSanPham: number;
  SoLuong: number;
  DonGia: number;
  ThanhTien: number;
}

interface CreateOrderData {
  MaKhachHang: number;
  MaNhanVien?: number | null;
  PhuongThucTT: string;
  DiaChi: string;
  TongTien: number;
  items: OrderItem[];
}

export default class OrderService {
  public async createOrder(orderData: CreateOrderData) {
    const t: Transaction = await sequelize.transaction();

    try {
      // Tạo hóa đơn
      const order = await HoaDon.create({
        MaKhachHang: orderData.MaKhachHang,
        MaNhanVien: orderData.MaNhanVien,
        NgayLap: new Date(),
        TongTien: orderData.TongTien,
        PhuongThucTT: orderData.PhuongThucTT,
        DiaChi: orderData.DiaChi,
        TrangThai: 'Đang xử lý'
      }, { transaction: t });

      // Tạo chi tiết hóa đơn và cập nhật số lượng sản phẩm
      for (const item of orderData.items) {
        await ChiTietHoaDon.create({
          MaHoaDon: order.MaHoaDon,
          MaSanPham: item.MaSanPham,
          SoLuong: item.SoLuong,
          DonGia: item.DonGia,
          ThanhTien: item.ThanhTien
        }, { transaction: t });

        // Cập nhật số lượng sản phẩm
        const product = await SanPham.findByPk(item.MaSanPham, { transaction: t });
        if (!product) {
          throw new Error(`Sản phẩm với mã ${item.MaSanPham} không tồn tại`);
        }

        if (product.SoLuong < item.SoLuong) {
          throw new Error(`Sản phẩm ${product.TenSanPham} không đủ số lượng`);
        }

        await product.update({
          SoLuong: product.SoLuong - item.SoLuong
        }, { transaction: t });
      }

      await t.commit();
      return order;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  public async getOrdersByCustomerId(customerId: number) {
    try {
      const orders = await HoaDon.findAll({
        where: { MaKhachHang: customerId },
        include: [
          {
            model: ChiTietHoaDon,
            as: 'ChiTietHoaDons',
            include: [{ model: SanPham, as: 'SanPham' }]
          }
        ],
        order: [['NgayLap', 'DESC']]
      });
      return orders;
    } catch (error) {
      throw error;
    }
  }

  public async getOrderById(orderId: number) {
    try {
      const order = await HoaDon.findByPk(orderId, {
        include: [
          {
            model: ChiTietHoaDon,
            as: 'ChiTietHoaDons',
            include: [{ model: SanPham, as: 'SanPham' }]
          },
          { model: KhachHang, as: 'KhachHang' },
          { model: NhanVien, as: 'NhanVien' }
        ]
      });

      if (!order) {
        throw new Error('Đơn hàng không tồn tại');
      }

      return order;
    } catch (error) {
      throw error;
    }
  }

  public async getAllOrders(page = 1, limit = 10) {
    try {
      const offset = (page - 1) * limit;
      
      const { count, rows } = await HoaDon.findAndCountAll({
        include: [
          { model: KhachHang, as: 'KhachHang' },
          { model: NhanVien, as: 'NhanVien' }
        ],
        limit,
        offset,
        order: [['NgayLap', 'DESC']]
      });

      return {
        total: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        orders: rows
      };
    } catch (error) {
      throw error;
    }
  }

  public async updateOrderStatus(orderId: number, trangThai: string) {
    try {
      const order = await HoaDon.findByPk(orderId);
      
      if (!order) {
        throw new Error('Đơn hàng không tồn tại');
      }

      await order.update({ TrangThai: trangThai });
      return order;
    } catch (error) {
      throw error;
    }
  }
} 