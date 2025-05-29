import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ILoginDto, IRegisterDto, ITokenData } from '../interfaces/auth.interface';
import KhachHang from '../models/KhachHang.model';
import NhanVien from '../models/NhanVien.model';

export default class AuthService {
  public async login(loginDto: ILoginDto): Promise<{ token: string; user: any }> {
    try {
      const { SoDienThoai, MatKhau, isNhanVien = false } = loginDto;
      
      let user;
      if (isNhanVien) {
        user = await NhanVien.findOne({ 
          where: { SoDienThoai },
          include: ['VaiTro']
        });
      } else {
        user = await KhachHang.findOne({ 
          where: { SoDienThoai },
          include: ['VaiTro']
        });
      }

      if (!user) {
        throw new Error('Số điện thoại hoặc mật khẩu không đúng');
      }

      const isPasswordValid = await bcrypt.compare(MatKhau, user.MatKhau);
      if (!isPasswordValid) {
        throw new Error('Số điện thoại hoặc mật khẩu không đúng');
      }

      const tokenData: ITokenData = {
        id: isNhanVien ? (user as NhanVien).MaNhanVien : (user as KhachHang).MaKhachHang,
        role: user.MaVaiTro
      };

      const token = this.generateToken(tokenData);
      
      // Không trả về mật khẩu
      const { MatKhau: _, ...userWithoutPassword } = user.toJSON();

      return {
        token,
        user: userWithoutPassword
      };
    } catch (error) {
      throw error;
    }
  }

  public async register(registerDto: IRegisterDto): Promise<{ token: string; user: any }> {
    try {
      const { SoDienThoai, MatKhau, DiaChi, isNhanVien = false } = registerDto;

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
          TenKhachHang: registerDto.TenKhachHang,
          SoDienThoai,
          MatKhau: hashedPassword,
          DiaChi,
          MaVaiTro: 2 // Mã vai trò khách hàng
        });
      }

      const tokenData: ITokenData = {
        id: user.MaKhachHang,
        role: user.MaVaiTro
      };

      const token = this.generateToken(tokenData);

      // Không trả về mật khẩu
      const { MatKhau: _, ...userWithoutPassword } = user.toJSON();

      return {
        token,
        user: userWithoutPassword
      };
    } catch (error) {
      throw error;
    }
  }

  private generateToken(data: ITokenData): string {
    return jwt.sign(
      data,
      process.env.JWT_SECRET || 'shopapp_secret_key',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
  }
} 