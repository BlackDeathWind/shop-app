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

  public async createProduct(productData: Record<string, any>) {
    try {
      const product = await SanPham.create(productData);
      return product;
    } catch (error) {
      throw error;
    }
  }

  public async updateProduct(id: number, productData: Record<string, any>) {
    try {
      const product = await SanPham.findByPk(id);
      
      if (!product) {
        throw new Error('Sản phẩm không tồn tại');
      }

      await product.update(productData);
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