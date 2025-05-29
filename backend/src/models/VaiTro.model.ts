import { Model, Table, Column, PrimaryKey, HasMany } from 'sequelize-typescript';
import { IVaiTro } from '../interfaces/models.interface';
import NhanVien from './NhanVien.model';
import KhachHang from './KhachHang.model';

@Table({
  tableName: 'VaiTro',
  timestamps: false
})
export default class VaiTro extends Model implements IVaiTro {
  @PrimaryKey
  @Column
  MaVaiTro!: number;

  @Column
  TenVaiTro!: string;

  @HasMany(() => NhanVien)
  NhanViens?: NhanVien[];

  @HasMany(() => KhachHang)
  KhachHangs?: KhachHang[];
} 