# 猴哥星球官网

## 本地运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

构建产物位于 `dist/`，可直接部署到 Nginx、对象存储或静态网站托管服务。

## 固定链接

- 官网：`https://www.monkeysxu.top/`
- Web 学习端：`https://study.monkeysxu.top/`
- 用户服务协议：`https://www.monkeysxu.top/agreement.html`
- 隐私政策：`https://www.monkeysxu.top/privacy.html`

Android 和微信小程序均使用以上官网协议链接。协议更新时，只需修改
`public/agreement.html` 和 `public/privacy.html` 并重新部署官网。

## 上线前配置

- 将 `index.html` 中的联系邮箱替换为正式邮箱。
- 在 `src/main.js` 中将 Android 按钮的提示逻辑替换为正式 APK 下载地址。
- 如有小程序码，可放入 `public/assets/` 并在下载区域展示。
- iOS 上线后，将“即将上线”按钮替换为 App Store 地址。
