import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import AuthService from '../services/auth.service';

export default class AuthController {
  private authService = new AuthService();

  public login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const loginData = req.body;
      const result = await this.authService.login(loginData);

      return res.status(200).json({
        message: 'Đăng nhập thành công',
        ...result
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || 'Đăng nhập thất bại'
      });
    }
  };

  public register = async (req: Request, res: Response): Promise<Response> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const registerData = req.body;
      const result = await this.authService.register(registerData);

      return res.status(201).json({
        message: 'Đăng ký thành công',
        ...result
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || 'Đăng ký thất bại'
      });
    }
  };
} 