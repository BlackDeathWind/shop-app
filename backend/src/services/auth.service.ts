import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ILoginDto, IRegisterDto, ITokenData } from '../interfaces/auth.interface';
import KhachHang from '../models/KhachHang.model';
import NhanVien from '../models/NhanVien.model';

export default class AuthService {
  public async login(loginDto: ILoginDto): Promise<{ token: string; user: any }> {
    try {
      const { SoDienThoai, MatKhau } = loginDto;
      
      // Kiểm tra số điện thoại trong cả hai bảng NhanVien và KhachHang
      let nhanVienUser = await NhanVien.findOne({ 
        where: { SoDienThoai },
        include: ['VaiTro']
      });

      // Nếu tìm thấy trong bảng NhanVien
      if (nhanVienUser) {
        const isPasswordValid = await bcrypt.compare(MatKhau, nhanVienUser.MatKhau);
        if (!isPasswordValid) {
          throw new Error('Số điện thoại hoặc mật khẩu không đúng');
        }

        const tokenData: ITokenData = {
          id: nhanVienUser.MaNhanVien,
          role: nhanVienUser.MaVaiTro
        };

        const token = this.generateToken(tokenData);
        
        const userObject: any = nhanVienUser.get({ plain: true });
        delete userObject.MatKhau;

        return {
          token,
          user: userObject
        };
      }
      
      // Nếu không tìm thấy trong bảng NhanVien, tìm trong bảng KhachHang
      const khachHangUser = await KhachHang.findOne({ 
        where: { SoDienThoai },
        include: ['VaiTro']
      });

      if (!khachHangUser) {
        throw new Error('Số điện thoại hoặc mật khẩu không đúng');
      }

      const isPasswordValid = await bcrypt.compare(MatKhau, khachHangUser.MatKhau);
      if (!isPasswordValid) {
        throw new Error('Số điện thoại hoặc mật khẩu không đúng');
      }

      const tokenData: ITokenData = {
        id: khachHangUser.MaKhachHang,
        role: khachHangUser.MaVaiTro
      };

      const token = this.generateToken(tokenData);
      
      const userObject: any = khachHangUser.get({ plain: true });
      delete userObject.MatKhau;

      return {
        token,
        user: userObject
      };
    } catch (error) {
      throw error;
    }
  }

  public async register(registerDto: IRegisterDto): Promise<{ token: string; user: any }> {
    try {
      const { SoDienThoai, MatKhau, DiaChi, TenKhachHang, isNhanVien = false } = registerDto;

      // Kiểm tra số điện thoại đã tồn tại chưa
      const existingUser = isNhanVien
        ? await NhanVien.findOne({ where: { SoDienThoai } })
        : await KhachHang.findOne({ where: { SoDienThoai } });

      if (existingUser) {
        throw new Error('Số điện thoại đã được sử dụng');
      }

      // Hash mật khẩu
      const hashedPassword = await bcrypt.hash(MatKhau, 10);

      let user;
      if (isNhanVien) {
        // Chỉ admin mới có thể tạo nhân viên, nên không cho phép đăng ký nhân viên
        throw new Error('Không thể đăng ký tài khoản nhân viên');
      } else {
        // Đăng ký khách hàng
        user = await KhachHang.create({
          TenKhachHang,
          SoDienThoai,
          MatKhau: hashedPassword,
          DiaChi: DiaChi || '',
          MaVaiTro: 2 // Mã vai trò khách hàng
        });
      }

      const tokenData: ITokenData = {
        id: user.MaKhachHang,
        role: user.MaVaiTro
      };

      const token = this.generateToken(tokenData);

      // Tạo đối tượng mới từ user và loại bỏ thuộc tính MatKhau
      const userObject: any = user.get({ plain: true });
      delete userObject.MatKhau;

      return {
        token,
        user: userObject
      };
    } catch (error) {
      throw error;
    }
  }

  private generateToken(data: ITokenData): string {
    const secret = process.env.JWT_SECRET || 'shopapp_secret_key';
    const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
    
    return jwt.sign(data, secret, { expiresIn } as any);
  }
} 