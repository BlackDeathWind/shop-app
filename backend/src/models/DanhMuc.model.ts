import { Model, Table, Column, PrimaryKey, HasMany, AutoIncrement } from 'sequelize-typescript';
import { IDanhMuc } from '../interfaces/models.interface';
import SanPham from './SanPham.model';

@Table({
  tableName: 'DanhMuc',
  timestamps: false
})
export default class DanhMuc extends Model implements IDanhMuc {
  @PrimaryKey
  @AutoIncrement
  @Column
  MaDanhMuc!: number;

  @Column
  TenDanhMuc!: string;

  @HasMany(() => SanPham)
  SanPhams?: SanPham[];
} 