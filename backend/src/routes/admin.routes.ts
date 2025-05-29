import { Router } from 'express';
import { body } from 'express-validator';
import AdminController from '../controllers/admin.controller';
import { authMiddleware, roleMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const adminController = new AdminController();

// Validation middleware cho tạo/cập nhật người dùng
const userValidation = [
  body('TenKhachHang').optional().isLength({ max: 100 }).withMessage('Tên không được vượt quá 100 ký tự'),
  body('TenNhanVien').optional().isLength({ max: 100 }).withMessage('Tên không được vượt quá 100 ký tự'),
  body('SoDienThoai')
    .notEmpty().withMessage('Số điện thoại không được để trống')
    .matches(/^[0-9]{10}$/).withMessage('Số điện thoại phải có 10 chữ số'),
  body('DiaChi')
    .notEmpty().withMessage('Địa chỉ không được để trống'),
  body('MatKhau').optional()
    .isLength({ min: 6 }).withMessage('Mật khẩu phải có ít nhất 6 ký tự'),
  body('MaVaiTro')
    .notEmpty().withMessage('Vai trò không được để trống')
    .isIn([0, 1, 2]).withMessage('Vai trò không hợp lệ')
];

const roleValidation = [
  body('newRole')
    .notEmpty().withMessage('Vai trò mới không được để trống')
    .isIn([0, 1, 2]).withMessage('Vai trò không hợp lệ')
];

const orderStatusValidation = [
  body('trangThai')
    .notEmpty().withMessage('Trạng thái không được để trống')
    .isIn(['Đang xử lý', 'Đang giao hàng', 'Đã giao hàng', 'Đã hủy'])
    .withMessage('Trạng thái không hợp lệ')
];

// Dashboard
router.get(
  '/dashboard',
  authMiddleware,
  roleMiddleware([0, 1]), // Admin và nhân viên
  adminController.getDashboardSummary
);

// User management - Chỉ admin mới được quản lý người dùng
router.get(
  '/users/customers',
  authMiddleware,
  roleMiddleware([0]),
  adminController.getAllCustomers
);

router.get(
  '/users/staff',
  authMiddleware,
  roleMiddleware([0]),
  adminController.getAllStaff
);

router.get(
  '/users/:id',
  authMiddleware,
  roleMiddleware([0]),
  adminController.getUserById
);

router.post(
  '/users',
  authMiddleware,
  roleMiddleware([0]),
  userValidation,
  adminController.createUser
);

router.put(
  '/users/:id',
  authMiddleware,
  roleMiddleware([0]),
  userValidation,
  adminController.updateUser
);

router.delete(
  '/users/:id',
  authMiddleware,
  roleMiddleware([0]),
  adminController.deleteUser
);

router.put(
  '/users/:id/role',
  authMiddleware,
  roleMiddleware([0]),
  roleValidation,
  adminController.changeUserRole
);

// Product management - Admin và nhân viên
router.get(
  '/products',
  authMiddleware,
  roleMiddleware([0, 1]),
  adminController.getAllProducts
);

router.get(
  '/products/:id',
  authMiddleware,
  roleMiddleware([0, 1]),
  adminController.getProductById
);

// Order management - Admin và nhân viên
router.get(
  '/orders',
  authMiddleware,
  roleMiddleware([0, 1]),
  adminController.getAllOrders
);

router.get(
  '/orders/:id',
  authMiddleware,
  roleMiddleware([0, 1]),
  adminController.getOrderById
);

router.put(
  '/orders/:id/status',
  authMiddleware,
  roleMiddleware([0, 1]),
  orderStatusValidation,
  adminController.updateOrderStatus
);

export default router; 