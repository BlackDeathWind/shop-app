import { Model, Table, Column, PrimaryKey, ForeignKey, BelongsTo, HasMany, AutoIncrement, Unique, DataType } from 'sequelize-typescript';
import { IKhachHang } from '../interfaces/models.interface';
import VaiTro from './VaiTro.model';
import HoaDon from './HoaDon.model';

@Table({
  tableName: 'KhachHang',
  timestamps: false
})
export default class KhachHang extends Model implements IKhachHang {
  @PrimaryKey
  @AutoIncrement
  @Column
  MaKhachHang!: number;

  @ForeignKey(() => VaiTro)
  @Column
  MaVaiTro!: number;

  @Column
  TenKhachHang!: string;

  @Unique
  @Column
  SoDienThoai!: string;

  @Column
  MatKhau!: string;

  @Column(DataType.STRING)
  DiaChi?: string;

  @BelongsTo(() => VaiTro)
  VaiTro?: VaiTro;

  @HasMany(() => HoaDon)
  HoaDons?: HoaDon[];
} 