import { Model, Table, Column, PrimaryKey, ForeignKey, BelongsTo, HasMany, AutoIncrement, Unique, DataType } from 'sequelize-typescript';
import { INhanVien } from '../interfaces/models.interface';
import VaiTro from './VaiTro.model';
import HoaDon from './HoaDon.model';

@Table({
  tableName: 'NhanVien',
  timestamps: false
})
export default class NhanVien extends Model implements INhanVien {
  @PrimaryKey
  @AutoIncrement
  @Column
  MaNhanVien!: number;

  @ForeignKey(() => VaiTro)
  @Column
  MaVaiTro!: number;

  @Column
  TenNhanVien!: string;

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