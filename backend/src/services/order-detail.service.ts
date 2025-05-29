import ChiTietHoaDon from '../models/ChiTietHoaDon.model';
import SanPham from '../models/SanPham.model';
import { IChiTietHoaDon } from '../interfaces/models.interface';

export default class OrderDetailService {
  /**
   * Lấy danh sách chi tiết hóa đơn theo mã hóa đơn
   */
  public async getOrderDetailsByOrderId(orderId: number) {
    try {
      const orderDetails = await ChiTietHoaDon.findAll({
        where: { MaHoaDon: orderId },
        include: [
          { model: SanPham, as: 'SanPham' }
        ]
      });

      return orderDetails;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Lấy chi tiết hóa đơn theo mã chi tiết
   */
  public async getOrderDetailById(id: number) {
    try {
      const orderDetail = await ChiTietHoaDon.findByPk(id, {
        include: [
          { model: SanPham, as: 'SanPham' }
        ]
      });

      return orderDetail;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Tạo chi tiết hóa đơn mới
   */
  public async createOrderDetail(orderDetailData: Record<string, any>) {
    try {
      // Lấy thông tin sản phẩm
      const product = await SanPham.findByPk(orderDetailData.MaSanPham);
      if (!product) {
        throw new Error('Sản phẩm không tồn tại');
      }

      // Kiểm tra số lượng tồn kho
      if (product.SoLuong < orderDetailData.SoLuong) {
        throw new Error('Số lượng sản phẩm không đủ');
      }

      // Tính thành tiền
      const thanhTien = orderDetailData.SoLuong * orderDetailData.DonGia;
      
      const newOrderDetail = await ChiTietHoaDon.create({
        ...orderDetailData,
        ThanhTien: thanhTien
      });

      // Cập nhật số lượng sản phẩm
      await product.update({
        SoLuong: product.SoLuong - orderDetailData.SoLuong
      });

      return newOrderDetail;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Cập nhật chi tiết hóa đơn
   */
  public async updateOrderDetail(id: number, orderDetailData: Record<string, any>) {
    try {
      const orderDetail = await ChiTietHoaDon.findByPk(id);
      if (!orderDetail) {
        throw new Error('Chi tiết hóa đơn không tồn tại');
      }

      // Nếu có thay đổi số lượng hoặc sản phẩm
      if (orderDetailData.SoLuong !== orderDetail.SoLuong || 
         (orderDetailData.MaSanPham && orderDetailData.MaSanPham !== orderDetail.MaSanPham)) {
        
        // Hoàn trả số lượng sản phẩm cũ
        const oldProduct = await SanPham.findByPk(orderDetail.MaSanPham);
        if (oldProduct) {
          await oldProduct.update({
            SoLuong: oldProduct.SoLuong + orderDetail.SoLuong
          });
        }

        // Lấy thông tin sản phẩm mới
        const newProductId = orderDetailData.MaSanPham || orderDetail.MaSanPham;
        const newProduct = await SanPham.findByPk(newProductId);
        
        if (!newProduct) {
          throw new Error('Sản phẩm không tồn tại');
        }

        // Kiểm tra số lượng tồn kho
        if (newProduct.SoLuong < orderDetailData.SoLuong) {
          throw new Error('Số lượng sản phẩm không đủ');
        }

        // Cập nhật số lượng sản phẩm mới
        await newProduct.update({
          SoLuong: newProduct.SoLuong - orderDetailData.SoLuong
        });
      }

      // Tính lại thành tiền nếu có thay đổi số lượng hoặc đơn giá
      if (orderDetailData.SoLuong || orderDetailData.DonGia) {
        const soLuong = orderDetailData.SoLuong || orderDetail.SoLuong;
        const donGia = orderDetailData.DonGia || orderDetail.DonGia;
        orderDetailData.ThanhTien = soLuong * donGia;
      }

      // Cập nhật chi tiết hóa đơn
      await orderDetail.update(orderDetailData);

      return await this.getOrderDetailById(id);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Xóa chi tiết hóa đơn
   */
  public async deleteOrderDetail(id: number) {
    try {
      const orderDetail = await ChiTietHoaDon.findByPk(id);
      if (!orderDetail) {
        throw new Error('Chi tiết hóa đơn không tồn tại');
      }

      // Hoàn trả số lượng sản phẩm
      const product = await SanPham.findByPk(orderDetail.MaSanPham);
      if (product) {
        await product.update({
          SoLuong: product.SoLuong + orderDetail.SoLuong
        });
      }

      await orderDetail.destroy();
      return true;
    } catch (error) {
      throw error;
    }
  }
} 