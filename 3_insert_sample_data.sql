USE shop;
GO

-- Thêm dữ liệu cho bảng VaiTro
INSERT INTO VaiTro (MaVaiTro, TenVaiTro)
VALUES 
    (0, N'Quản trị viên'),
    (1, N'Nhân viên'),
    (2, N'Khách hàng');
GO

-- Thêm dữ liệu cho bảng NhanVien (Mật khẩu mặc định '123456' đã hash)
INSERT INTO NhanVien (MaVaiTro, TenNhanVien, SoDienThoai, MatKhau, DiaChi)
VALUES
    (0, N'Admin', '0901234567', '$2b$10$7JpjEVmP5uvU3JGq1WaYXO1hJj0NQ3K4rG5p.BvU5vJFRw88Yxnnq', N'123 Đường Admin, Quận 1, TP HCM'),
    (1, N'Nhân viên 1', '0912345678', '$2b$10$7JpjEVmP5uvU3JGq1WaYXO1hJj0NQ3K4rG5p.BvU5vJFRw88Yxnnq', N'456 Đường NV, Quận 2, TP HCM'),
    (1, N'Nhân viên 2', '0912345679', '$2b$10$7JpjEVmP5uvU3JGq1WaYXO1hJj0NQ3K4rG5p.BvU5vJFRw88Yxnnq', N'789 Đường NV, Quận 3, TP HCM');
GO

-- Thêm dữ liệu cho bảng KhachHang (Mật khẩu mặc định '123456' đã hash)
INSERT INTO KhachHang (MaVaiTro, TenKhachHang, SoDienThoai, MatKhau, DiaChi)
VALUES
    (2, N'Khách hàng 1', '0923456789', '$2b$10$7JpjEVmP5uvU3JGq1WaYXO1hJj0NQ3K4rG5p.BvU5vJFRw88Yxnnq', N'123 Đường KH, Quận 1, TP HCM'),
    (2, N'Khách hàng 2', '0923456780', '$2b$10$7JpjEVmP5uvU3JGq1WaYXO1hJj0NQ3K4rG5p.BvU5vJFRw88Yxnnq', N'456 Đường KH, Quận 2, TP HCM'),
    (2, N'Khách hàng 3', '0923456781', '$2b$10$7JpjEVmP5uvU3JGq1WaYXO1hJj0NQ3K4rG5p.BvU5vJFRw88Yxnnq', N'789 Đường KH, Quận 3, TP HCM');
GO

-- Thêm dữ liệu cho bảng DanhMuc
INSERT INTO DanhMuc (TenDanhMuc)
VALUES 
    (N'Hoa sinh nhật'),
    (N'Hoa khai trương'),
    (N'Hoa cưới'),
    (N'Hoa tang lễ'),
    (N'Quà tặng lưu niệm'),
    (N'Gấu bông');
GO

-- Thêm dữ liệu cho bảng SanPham
INSERT INTO SanPham (TenSanPham, MaDanhMuc, MoTa, SoLuong, GiaSanPham, HinhAnh)
VALUES
    (N'Bó hoa hồng đỏ', 1, N'Bó hoa gồm 20 bông hồng đỏ tươi thắm, tượng trưng cho tình yêu mãnh liệt', 50, 500000, 'hoahongdo.jpg'),
    (N'Lẵng hoa khai trương', 2, N'Lẵng hoa gồm các loại hoa tươi đa sắc, phù hợp tặng dịp khai trương', 30, 850000, 'hoakhaitruong.jpg'),
    (N'Hoa cầm tay cô dâu', 3, N'Bó hoa cầm tay dành cho cô dâu trong ngày cưới, gồm hoa hồng trắng và baby', 20, 650000, 'hoacuoi.jpg'),
    (N'Vòng hoa chia buồn', 4, N'Vòng hoa tang lễ thể hiện lòng thành kính với người đã khuất', 15, 750000, 'hoatangle.jpg'),
    (N'Gấu bông Teddy', 6, N'Gấu bông Teddy size lớn, chất liệu mềm mại, an toàn', 40, 350000, 'teddybear.jpg'),
    (N'Khung ảnh lưu niệm', 5, N'Khung ảnh để bàn làm từ gỗ tự nhiên, thiết kế sang trọng', 60, 180000, 'khunganhgo.jpg'),
    (N'Hoa lan hồ điệp', 1, N'Chậu hoa lan hồ điệp sang trọng, phù hợp làm quà tặng sinh nhật', 25, 1200000, 'lanhodiep.jpg'),
    (N'Gấu bông Panda', 6, N'Gấu bông hình gấu trúc Panda ngộ nghĩnh', 35, 280000, 'panda.jpg');
GO

-- Thêm dữ liệu cho bảng HoaDon
INSERT INTO HoaDon (MaKhachHang, MaNhanVien, NgayLap, TongTien, PhuongThucTT, DiaChi, TrangThai)
VALUES
    (1, 2, DATEADD(day, -5, GETDATE()), 650000, N'Tiền mặt', N'123 Đường KH, Quận 1, TP HCM', N'Đã giao hàng'),
    (2, 3, DATEADD(day, -3, GETDATE()), 850000, N'Chuyển khoản', N'456 Đường KH, Quận 2, TP HCM', N'Đang giao hàng'),
    (3, NULL, DATEADD(day, -1, GETDATE()), 1200000, N'Momo', N'789 Đường KH, Quận 3, TP HCM', N'Đang xử lý');
GO

-- Thêm dữ liệu cho bảng ChiTietHoaDon
INSERT INTO ChiTietHoaDon (MaHoaDon, MaSanPham, SoLuong, DonGia, ThanhTien)
VALUES
    (1, 3, 1, 650000, 650000),
    (2, 2, 1, 850000, 850000),
    (3, 7, 1, 1200000, 1200000);
GO 