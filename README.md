# 遊戲中心 (Game Center)

[![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Pinia](https://img.shields.io/badge/Pinia-Latest-yellow?style=for-the-badge&logo=pinia&logoColor=white)](https://pinia.vuejs.org/)

這是一個使用 Vue 3 開發的遊戲中心專案，包含兩款經典小遊戲，展示了現代前端技術的應用。


## 📑 目錄
- [專案概述](#📋-專案概述)
- [功能特色](#✨-功能特色)
- [技術架構](#🔧-技術架構)
- [遊戲介紹](#🎮-遊戲介紹)
- [開發環境設定](#💻-開發環境設定)
- [專案結構](#📂-專案結構)
- [效能最佳化](#🚀-效能最佳化)
- [部署方式](#📤-部署方式)

## 📋 專案概述

遊戲中心是一個集成多種經典小遊戲的網頁應用程式，目標是提供簡單易用且有趣的遊戲體驗，同時展示現代前端開發技術的實作方式。專案完全使用 Vue 3 的 Composition API 開發，結合 Vite 建置工具和 Pinia 狀態管理，展現了前端工程的最佳實踐。

## ✨ 功能特色

- **響應式設計**：針對不同螢幕尺寸最佳化的遊戲介面，包含側邊欄在窄螢幕的特殊處理
- **深色/淺色模式**：內建主題切換功能，透過 CSS 變數實現全應用程式的風格轉換
- **動態側邊欄**：可收合的側邊欄設計，靈活調整遊戲區域大小
- **遊戲資訊系統**：游標懸停與點擊顯示的遊戲規則與說明對話框
- **入場動畫效果**：首次進入時的遊戲元素動態展示，提升使用者體驗
- **遊戲狀態管理**：使用 Pinia 優化遊戲流程與狀態轉換

## 🔧 技術架構

### 前端框架與工具
- **Vue 3**：使用 Composition API
- **Vite**：快速的開發伺服器和建置工具
- **Vue Router**：處理路由導航和頁面切換
- **Pinia**：Vue 3 專用的狀態管理解決方案
- **SCSS**：提升 CSS 的可維護性和開發效率
- **Boxicons**：輕量級的圖示庫，優化網頁載入效能

### 核心技術亮點
- **元件化設計**：採用高度模組化的元件架構，提升程式碼可重用性
- **Composition API**：運用 Vue 3 的 Composition API 拆分關注點，使邏輯更清晰
- **Pinia 狀態管理**：遊戲邏輯與 UI 狀態分離，提升可維護性
- **路由懶加載**：透過 Vue Router 的動態導入功能提升應用程式啟動速度
- **CSS 變數系統**：建立一致的設計系統，實現深淺色主題切換

## 🎮 遊戲介紹

### 黑傑克 (21點)
經典的撲克牌遊戲，目標是讓手牌點數接近或等於21點，同時不能超過21點。
- 支援分牌、雙倍下注等進階功能
- 動態籌碼管理系統
- 精美的結果動畫效果

### 皇后遊戲 (Queens)
益智棋盤遊戲，目標是在棋盤上放置皇后，使每行、每列和每個顏色區域都只有一個皇后。
- 三種難度等級的棋盤配置
- 即時衝突檢測
- 計時系統記錄解題時間

## 💻 開發環境設定

### 系統需求
- Node.js 16+ 
- npm 7+

### 安裝步驟

1. 複製專案
```bash
git clone https://github.com/your-username/game-center.git
cd game-center
```

2. 安裝相依套件
```bash
npm install
```

3. 啟動開發伺服器
```bash
npm run dev
```

4. 建置生產版本
```bash
npm run build
```

5. 檢查及格式化程式碼
```bash
npm run lint
npm run format
```

## 📂 專案結構

```
game-center/
├── public/              # 靜態資源
├── src/
│   ├── assets/          # 圖片、字型等資源
│   ├── components/      # 共用元件
│   │   ├── common/      # 通用元件
│   │   ├── layout/      # 布局相關元件
│   │   ├── blackjack/   # 黑傑克遊戲元件
│   │   └── queens/      # 皇后遊戲元件
│   ├── router/          # 路由配置
│   ├── stores/          # Pinia 狀態管理
│   │   ├── game/        # 遊戲狀態
│   │   │   ├── blackjack.js
│   │   │   └── queens.js
│   │   ├── sidebar.js
│   │   └── modal.js
│   ├── utils/           # 工具函式
│   │   ├── blackjack/   # 黑傑克遊戲邏輯
│   │   └── queens/      # 皇后遊戲邏輯
│   ├── views/           # 頁面元件
│   ├── App.vue          # 根元件
│   └── main.js          # 應用程式入口
├── .eslintrc.js         # ESLint 配置
├── package.json         # 專案依賴
├── vite.config.js       # Vite 配置
└── README.md            # 專案說明
```

## 🚀 效能最佳化

### 路由懶加載
實際應用 Vue Router 的動態導入功能，實現遊戲頁面的按需載入，減少初始載入時間。

```javascript
// 專案中實際的路由懶加載實現
{
  path: '/blackjack',
  name: 'blackjack',
  component: () => import('../views/BlackjackView.vue')
},
{
  path: '/queens',
  name: 'queens',
  component: () => import('../views/QueensView.vue')
}
```

### 計算屬性最佳化
大量使用 Vue 的 computed 屬性處理複雜計算，例如皇后遊戲的棋盤驗證和黑傑克的點數計算，避免不必要的重複運算。

### CSS 動畫效能
透過 CSS transition 和 animation 實現流暢過渡效果，如卡片發牌、籌碼移動、皇后檢測的視覺反饋等。

### SVG 圖形應用
遊戲中的撲克牌、圖示和遊戲結果都使用 SVG 向量圖形，確保在任何螢幕尺寸下都能清晰顯示且檔案體積小。

## 📤 部署方式

### 靜態網站部署

這個專案可以建置為靜態網站，因此可以部署到任何支援靜態網站的服務：

1. 建置專案
```bash
npm run build
```

2. 部署 `dist` 資料夾的內容到你的網站伺服器或靜態網站託管服務

### 推薦的部署平台
- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting
- AWS S3 + CloudFront


## 👨‍💻 關於作者

一位熱愛前端技術與遊戲開發的全端工程師，致力於創造有趣且技術先進的網頁應用。

---

⭐ 如果你喜歡這個專案，請給它一個星星！
