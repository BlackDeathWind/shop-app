# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

# Shop App Frontend

## Cập nhật mới

### Cải tiến hệ thống xác thực và bảo mật

Hệ thống đã được cập nhật với các tính năng sau:

1. **Protected Routes**: Đã thêm component ProtectedRoute để bảo vệ các trang yêu cầu đăng nhập.
2. **Tự động làm mới token**: Token sẽ tự động được làm mới trong nền, tránh việc phiên làm việc hết hạn khi đang sử dụng.
3. **Quay lại trang trước đó sau khi đăng nhập**: Khi người dùng truy cập vào trang yêu cầu đăng nhập, sau khi đăng nhập thành công, hệ thống sẽ tự động chuyển hướng về trang mà người dùng muốn truy cập ban đầu.
4. **Tránh chuyển hướng liên tục khi F5**: Đã khắc phục vấn đề người dùng bị chuyển hướng về trang đăng nhập khi nhấn F5 sau khi đã đăng nhập.

## Hướng dẫn sử dụng

### Cài đặt

```bash
npm install
```

### Chạy môi trường phát triển

```bash
npm run dev
```

### Build

```bash
npm run build
```
