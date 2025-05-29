import { Model, Table, Column, PrimaryKey, ForeignKey, BelongsTo, AutoIncrement, DataType } from 'sequelize-typescript';
import { IChiTietHoaDon } from '../interfaces/models.interface';
import HoaDon from './HoaDon.model';
import SanPham from './SanPham.model';

@Table({
  tableName: 'ChiTietHoaDon',
  timestamps: false
})
export default class ChiTietHoaDon extends Model implements IChiTietHoaDon {
  @PrimaryKey
  @AutoIncrement
  @Column
  MaChiTiet!: number;

  @ForeignKey(() => HoaDon)
  @Column
  MaHoaDon!: number;

  @ForeignKey(() => SanPham)
  @Column
  MaSanPham!: number;

  @Column
  SoLuong!: number;

  @Column(DataType.DECIMAL(18, 2))
  DonGia!: number;

  @Column(DataType.DECIMAL(18, 2))
  ThanhTien!: number;

  @BelongsTo(() => HoaDon)
  HoaDon?: HoaDon;

  @BelongsTo(() => SanPham)
  SanPham?: SanPham;
} 