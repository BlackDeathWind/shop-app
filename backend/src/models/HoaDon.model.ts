import { Model, Table, Column, PrimaryKey, ForeignKey, BelongsTo, HasMany, AutoIncrement, DataType } from 'sequelize-typescript';
import { IHoaDon } from '../interfaces/models.interface';
import KhachHang from './KhachHang.model';
import NhanVien from './NhanVien.model';
import ChiTietHoaDon from './ChiTietHoaDon.model';

@Table({
  tableName: 'HoaDon',
  timestamps: false
})
export default class HoaDon extends Model implements IHoaDon {
  @PrimaryKey
  @AutoIncrement
  @Column
  MaHoaDon!: number;

  @ForeignKey(() => KhachHang)
  @Column
  MaKhachHang!: number;

  @ForeignKey(() => NhanVien)
  @Column
  MaNhanVien?: number | null;

  @Column(DataType.DATE)
  NgayLap?: Date;

  @Column(DataType.DECIMAL(18, 2))
  TongTien!: number;

  @Column
  PhuongThucTT!: string;

  @Column
  DiaChi!: string;

  @Column
  TrangThai?: string;

  @BelongsTo(() => KhachHang)
  KhachHang?: KhachHang;

  @BelongsTo(() => NhanVien)
  NhanVien?: NhanVien;

  @HasMany(() => ChiTietHoaDon)
  ChiTietHoaDons?: ChiTietHoaDon[];
} 