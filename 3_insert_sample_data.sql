USE shop;
GO

-- Thêm dữ liệu cho bảng VaiTro
INSERT INTO VaiTro (MaVaiTro, TenVaiTro)
VALUES 
    (0, N'Quản trị viên'),
    (1, N'Nhân viên'),
    (2, N'Khách hàng');
GO

-- Thêm dữ liệu cho bảng NhanVien (Mật khẩu mặc định theo thứ tự 'Admin@1', 'Nhanvien@1', 'Nhanvien@2' đã hash)
INSERT INTO NhanVien (MaVaiTro, TenNhanVien, SoDienThoai, MatKhau, DiaChi)
VALUES
    (0, N'Admin', '0901234567', '$2a$12$Gd1DwtLpJOiVaEhLXjKwKuOL50wDb1FOtTb6AGrD8mrDCxyrmOquy', N'123 Đường Admin, Quận 1, TP HCM'),
    (1, N'Nhân viên 1', '0912345678', '$2a$12$L3un9Wg1yMnyvTKuWAxKF.nW4aV2FS6f6OauasyJ5m1Csr0ORLEZa', N'456 Đường NV, Quận 2, TP HCM'),
    (1, N'Nhân viên 2', '0912345679', '$2a$12$M9kPXni1vigAngFnz2Y7vuMRwjF1CuoAlczkXLOUrWa81O3ewtky6', N'789 Đường NV, Quận 3, TP HCM');
GO

-- Thêm dữ liệu cho bảng KhachHang (Mật khẩu mặc định 'Khachhang@1', 'Khachhang@2', 'Khachhang@3' đã hash)
INSERT INTO KhachHang (MaVaiTro, TenKhachHang, SoDienThoai, MatKhau, DiaChi)
VALUES
    (2, N'Khách hàng 1', '0923456789', '$2a$12$kDOXSl3QsobIKnqa0.7/kuJzEwQiqxQmKnoLw6HBiWsDFHeTdr55e', N'123 Đường KH, Quận 1, TP HCM'),
    (2, N'Khách hàng 2', '0923456780', '$2a$12$3WErTWo5laf8.5Ks3/OItuwAkQvRToX/hZ.cI8SxT4ywBSNWiq2DG', N'456 Đường KH, Quận 2, TP HCM'),
    (2, N'Khách hàng 3', '0923456781', '$2a$12$hHzaPBHADKEAPG5yoqrGZO2HagmBG3WRlirwx9fMWvDrV6tmJVGUK', N'789 Đường KH, Quận 3, TP HCM');
GO

-- Thêm dữ liệu cho bảng DanhMuc
INSERT INTO DanhMuc (TenDanhMuc, HinhAnh)
VALUES 
    (N'Hoa sinh nhật', 'https://media.loveitopcdn.com/1219/thumb/gio-hoa-tang-chuc-mung-16.jpg'),
    (N'Hoa khai trương', 'https://hoatuoi9x.com/wp-content/uploads/2021/08/125-3.jpg'),
    (N'Hoa cưới', 'https://sansan.vn/wp-content/uploads/2020/07/hoa-baby.jpg'),
    (N'Hoa tang lễ', 'https://hoatuoidatviet.vn/upload/sanpham/ke-tang-hinh-thanh-gia-1798.jpg'),
    (N'Quà tặng lưu niệm', 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'),
    (N'Gấu bông', 'https://bizweb.dktcdn.net/thumb/1024x1024/100/450/808/products/439447444-454697126956015-2933455761937038741-n-1714744059531.jpg?v=1714744063193');
GO

-- Thêm dữ liệu cho bảng SanPham
INSERT INTO SanPham (TenSanPham, MaDanhMuc, MoTa, SoLuong, GiaSanPham, HinhAnh)
VALUES
    -- Danh mục 1: Hoa sinh nhật
    (N'Bó hoa hồng đỏ', 1, N'Bó hoa gồm 20 bông hồng đỏ tươi thắm, tượng trưng cho tình yêu mãnh liệt', 50, 500000, 'https://hoatuoihuythao.com/upload/sanpham/bohoahongdodepnhat1401.jpg'),
    (N'Hoa lan hồ điệp', 1, N'Chậu hoa lan hồ điệp sang trọng, phù hợp làm quà tặng sinh nhật', 25, 1200000, 'https://storage.googleapis.com/cdn_dlhf_vn/public/products/OWC0/OWC05HP037/IMG_8126_800x800.png'),
    (N'Giỏ hoa tulip', 1, N'Giỏ hoa tulip nhiều màu sắc tươi tắn, thích hợp tặng sinh nhật', 35, 750000, 'https://images.unsplash.com/photo-1520575839349-52ff2532d328?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'),
    (N'Bó hoa hướng dương', 1, N'Bó hoa hướng dương tràn đầy năng lượng và sự tích cực', 40, 450000, 'https://images.unsplash.com/photo-1594663653925-365bcbf7ef86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'),
    (N'Hộp hoa mix pastel', 1, N'Hộp hoa với tông màu pastel nhẹ nhàng dành tặng người yêu thương', 30, 680000, 'https://images.unsplash.com/photo-1566873535330-b9a3a954fa00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'),
    
    -- Danh mục 2: Hoa khai trương
    (N'Lẵng hoa khai trương', 2, N'Lẵng hoa gồm các loại hoa tươi đa sắc, phù hợp tặng dịp khai trương', 30, 850000, 'https://hoatuoihuythao.com/upload/sanpham/langhoakhaitruongdepgiare015.jpg'),
    (N'Kệ hoa chúc mừng', 2, N'Kệ hoa hai tầng trang trọng dành cho dịp khai trương, khánh thành', 20, 1500000, 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'),
    (N'Lẵng hoa hướng dương', 2, N'Lẵng hoa hướng dương tượng trưng cho sự thành công và thịnh vượng', 25, 920000, 'https://images.unsplash.com/photo-1593026892370-40c70be61fad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'),
    (N'Lẵng hoa lan hồ điệp', 2, N'Lẵng hoa lan hồ điệp sang trọng cho dịp khai trương cửa hàng', 15, 1800000, 'https://images.unsplash.com/photo-1612007676897-a7f2637de6f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'),
    (N'Kệ hoa tươi chúc mừng', 2, N'Kệ hoa trang trọng với tone màu đỏ - vàng, biểu tượng của sự may mắn', 20, 1350000, 'https://images.unsplash.com/photo-1595536595021-8db6c04b27c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'),
    
    -- Danh mục 3: Hoa cưới
    (N'Hoa cầm tay cô dâu', 3, N'Bó hoa cầm tay dành cho cô dâu trong ngày cưới, gồm hoa hồng trắng và baby', 20, 650000, 'https://hoatuoi360.vn/uploads/file/Baiviet2023/hoa-cuoi-cam-tay-hoa-hong-7.jpg'),
    (N'Bó hoa cưới hồng pastel', 3, N'Bó hoa cưới với tông màu hồng pastel lãng mạn', 25, 780000, 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'),
    (N'Hoa cưới cầm tay sen đá', 3, N'Bó hoa cưới từ các loại sen đá, hiện đại và độc đáo', 15, 850000, 'https://images.unsplash.com/photo-1614926037384-4159c33e196b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'),
    (N'Hoa cưới cầm tay vintage', 3, N'Bó hoa cưới phong cách vintage với các loại hoa khô', 20, 720000, 'https://images.unsplash.com/photo-1525249181835-95a4c9168268?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'),
    (N'Hoa cài áo chú rể', 3, N'Hoa cài áo vest cho chú rể đồng điệu với hoa cưới', 50, 120000, 'https://images.unsplash.com/photo-1595407753234-0882f1e77954?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'),
    
    -- Danh mục 4: Hoa tang lễ
    (N'Vòng hoa chia buồn', 4, N'Vòng hoa tang lễ thể hiện lòng thành kính với người đã khuất', 15, 750000, 'https://cdn.litiflorist.com/upload/1660277850187.png'),
    (N'Kệ hoa tang lễ', 4, N'Kệ hoa trang nghiêm với tông màu trắng, tím', 20, 950000, 'https://images.unsplash.com/photo-1621438659466-548477161666?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'),
    (N'Lẵng hoa chia buồn', 4, N'Lẵng hoa thể hiện sự chia buồn sâu sắc', 15, 820000, 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'),
    (N'Vòng hoa tang tròn', 4, N'Vòng hoa tang truyền thống với hoa cúc trắng', 20, 680000, 'https://images.unsplash.com/photo-1622006489995-e5e72eb316d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'),
    
    -- Danh mục 5: Quà tặng lưu niệm
    (N'Khung ảnh lưu niệm', 5, N'Khung ảnh để bàn làm từ gỗ tự nhiên, thiết kế sang trọng', 60, 180000, 'https://shopquatructuyen.com/wp-content/uploads/2019/05/khung-anh-co-dien-5.jpg'),
    (N'Bình hoa trang trí', 5, N'Bình hoa thủy tinh nghệ thuật đặt bàn', 40, 250000, 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'),
    (N'Đồng hồ để bàn vintage', 5, N'Đồng hồ để bàn phong cách cổ điển', 30, 320000, 'https://images.unsplash.com/photo-1574958269945-fa99b3dfcc3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'),
    (N'Mô hình trang trí', 5, N'Mô hình trang trí độc đáo handmade', 25, 280000, 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'),
    (N'Bộ ly thủy tinh cao cấp', 5, N'Bộ 6 ly thủy tinh cao cấp làm quà tặng', 20, 420000, 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'),
    
    -- Danh mục 6: Gấu bông
    (N'Gấu bông Teddy', 6, N'Gấu bông Teddy size lớn, chất liệu mềm mại, an toàn', 40, 350000, 'https://bizweb.dktcdn.net/100/459/249/products/02.jpg?v=1657252163400'),
    (N'Gấu bông Panda', 6, N'Gấu bông hình gấu trúc Panda ngộ nghĩnh', 35, 280000, 'https://salt.tikicdn.com/cache/w300/ts/product/8b/a1/1a/35be10558729eae4722a3181cca79913.jpg'),
    (N'Thú bông Totoro', 6, N'Thú bông hình nhân vật Totoro nổi tiếng', 30, 320000, 'https://images.unsplash.com/photo-1559715541-5daf8a0296d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'),
    (N'Gấu bông Unicorn', 6, N'Gấu bông hình kỳ lân nhiều màu sắc', 25, 300000, 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'),
    (N'Thú bông khủng long', 6, N'Thú bông hình khủng long dễ thương cho bé', 30, 250000, 'https://images.unsplash.com/photo-1563901935883-cb9ac2578a16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80');
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