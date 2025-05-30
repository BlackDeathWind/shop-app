export interface ILoginDto {
  SoDienThoai: string;
  MatKhau: string;
}

export interface IRegisterDto {
  TenKhachHang: string;
  TenNhanVien?: string;
  SoDienThoai: string;
  MatKhau: string;
  DiaChi?: string;
  isNhanVien?: boolean;
}

export interface ITokenData {
  id: number;
  role: number;
} 