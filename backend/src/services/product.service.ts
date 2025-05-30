import SanPham from '../models/SanPham.model';
import DanhMuc from '../models/DanhMuc.model';
import { Op } from 'sequelize';
import { ISanPham } from '../interfaces/models.interface';

export default class ProductService {
  public async getAllProducts(page = 1, limit = 10) {
    try {
      const offset = (page - 1) * limit;
      
      const { count, rows } = await SanPham.findAndCountAll({
        include: [{ model: DanhMuc, as: 'DanhMuc' }],
        limit,
        offset,
        order: [['NgayCapNhat', 'DESC']]
      });

      return {
        total: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        products: rows
      };
    } catch (error) {
      throw error;
    }
  }

  public async getProductById(id: number) {
    try {
      const product = await SanPham.findByPk(id, {
        include: [{ model: DanhMuc, as: 'DanhMuc' }]
      });

      if (!product) {
        throw new Error('Sản phẩm không tồn tại');
      }

      return product;
    } catch (error) {
      throw error;
    }
  }

  public async getProductsByCategory(categoryId: number, page = 1, limit = 10) {
    try {
      const offset = (page - 1) * limit;
      
      const { count, rows } = await SanPham.findAndCountAll({
        where: { MaDanhMuc: categoryId },
        include: [{ model: DanhMuc, as: 'DanhMuc' }],
        limit,
        offset,
        order: [['NgayCapNhat', 'DESC']]
      });

      return {
        total: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        products: rows
      };
    } catch (error) {
      throw error;
    }
  }

  public async searchProducts(query: string, page = 1, limit = 10) {
    try {
      const offset = (page - 1) * limit;
      
      const { count, rows } = await SanPham.findAndCountAll({
        where: {
          [Op.or]: [
            { TenSanPham: { [Op.like]: `%${query}%` } },
            { MoTa: { [Op.like]: `%${query}%` } }
          ]
        },
        include: [{ model: DanhMuc, as: 'DanhMuc' }],
        limit,
        offset,
        order: [['NgayCapNhat', 'DESC']]
      });

      return {
        total: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        products: rows
      };
    } catch (error) {
      throw error;
    }
  }

  public async createProduct(productData: Partial<ISanPham>) {
    try {
      // Kiểm tra các trường bắt buộc
      if (!productData.TenSanPham || !productData.MaDanhMuc || productData.SoLuong === undefined || productData.GiaSanPham === undefined) {
        throw new Error('Thiếu thông tin sản phẩm bắt buộc');
      }
      
      const product = await SanPham.create({
        TenSanPham: productData.TenSanPham,
        MaDanhMuc: productData.MaDanhMuc,
        MoTa: productData.MoTa,
        SoLuong: productData.SoLuong,
        GiaSanPham: productData.GiaSanPham,
        HinhAnh: productData.HinhAnh
      });
      
      return product;
    } catch (error) {
      throw error;
    }
  }

  public async updateProduct(id: number, productData: Partial<ISanPham>) {
    try {
      const product = await SanPham.findByPk(id);
      
      if (!product) {
        throw new Error('Sản phẩm không tồn tại');
      }

      await product.update({
        TenSanPham: productData.TenSanPham !== undefined ? productData.TenSanPham : product.TenSanPham,
        MaDanhMuc: productData.MaDanhMuc !== undefined ? productData.MaDanhMuc : product.MaDanhMuc,
        MoTa: productData.MoTa !== undefined ? productData.MoTa : product.MoTa,
        SoLuong: productData.SoLuong !== undefined ? productData.SoLuong : product.SoLuong,
        GiaSanPham: productData.GiaSanPham !== undefined ? productData.GiaSanPham : product.GiaSanPham,
        HinhAnh: productData.HinhAnh !== undefined ? productData.HinhAnh : product.HinhAnh
      });
      
      return product;
    } catch (error) {
      throw error;
    }
  }

  public async deleteProduct(id: number) {
    try {
      const product = await SanPham.findByPk(id);
      
      if (!product) {
        throw new Error('Sản phẩm không tồn tại');
      }

      await product.destroy();
      return true;
    } catch (error) {
      throw error;
    }
  }
} 