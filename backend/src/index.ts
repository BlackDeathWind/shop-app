import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';
import { testConnection } from './config/db.config';
import { initializeModels } from './models';

// Routes
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import categoryRoutes from './routes/category.routes';
import orderRoutes from './routes/order.routes';
import userRoutes from './routes/user.routes';
import adminRoutes from './routes/admin.routes';
import orderDetailRoutes from './routes/order-detail.routes';
import uploadRoutes from './routes/upload.routes';

// Load environment variables
dotenv.config();

// Initialize Express app
const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Đảm bảo thư mục uploads tồn tại
const uploadDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Test database connection
testConnection();

// Initialize models
initializeModels();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/order-details', orderDetailRoutes);
app.use('/api/upload', uploadRoutes);

// Home route
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Shop App API is running'
  });
});

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message: 'Không tìm thấy API endpoint'
  });
});

// Error handler middleware
app.use((err: any, _req: Request, res: Response, _next: any) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Đã xảy ra lỗi trên máy chủ'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 