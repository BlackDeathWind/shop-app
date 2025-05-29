import { Model, Table, Column, PrimaryKey, ForeignKey, BelongsTo, HasMany, AutoIncrement, DataType } from 'sequelize-typescript';
import { ISanPham } from '../interfaces/models.interface';
import DanhMuc from './DanhMuc.model';
import ChiTietHoaDon from './ChiTietHoaDon.model';

@Table({
  tableName: 'SanPham',
  timestamps: false
})
export default class SanPham extends Model implements ISanPham {
  @PrimaryKey
  @AutoIncrement
  @Column
  MaSanPham!: number;

  @Column
  TenSanPham!: string;

  @ForeignKey(() => DanhMuc)
  @Column
  MaDanhMuc!: number;

  @Column(DataType.TEXT)
  MoTa?: string;

  @Column
  SoLuong!: number;

  @Column(DataType.DECIMAL(18, 2))
  GiaSanPham!: number;

  @Column(DataType.DATE)
  Ngaytao?: Date;

  @Column(DataType.DATE)
  NgayCapNhat?: Date;

  @Column
  HinhAnh?: string;

  @BelongsTo(() => DanhMuc)
  DanhMuc?: DanhMuc;

  @HasMany(() => ChiTietHoaDon)
  ChiTietHoaDons?: ChiTietHoaDon[];
} 