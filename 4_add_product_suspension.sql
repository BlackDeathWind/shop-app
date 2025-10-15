USE shop;

-- Add suspension fields to SanPham table
ALTER TABLE SanPham 
ADD COLUMN TrangThaiKiemDuyet VARCHAR(20) DEFAULT 'ACTIVE' AFTER MaNguoiBan,
ADD COLUMN LyDoTamDung TEXT NULL AFTER TrangThaiKiemDuyet,
ADD COLUMN NgayTamDung DATETIME NULL AFTER LyDoTamDung,
ADD COLUMN NguoiTamDung INT NULL AFTER NgayTamDung;

-- Add constraint to ensure valid status values
ALTER TABLE SanPham 
ADD CONSTRAINT CHK_TrangThaiKiemDuyet 
CHECK (TrangThaiKiemDuyet IN ('ACTIVE', 'SUSPENDED'));

-- Add foreign key constraint for NguoiTamDung (admin/staff who suspended)
ALTER TABLE SanPham 
ADD CONSTRAINT FK_SanPham_NguoiTamDung 
FOREIGN KEY (NguoiTamDung) REFERENCES NhanVien(MaNhanVien);
