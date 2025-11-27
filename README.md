# Kobayashi Color Image Scale Visualization (小林色彩意象量表視覺化)

這是一個互動式的網頁應用程式，旨在視覺化 **1991年小林色彩意象量表 (Kobayashi Color Image Scale)**。此工具將 174 個情感關鍵詞映射到由 **Warm-Cool (溫暖-寒冷)** 和 **Soft-Hard (柔和-堅硬)** 兩個軸向定義的心理色彩空間中。

## 專案簡介

本專案透過現代化的 Web 技術，將色彩心理學數據轉化為易於探索的視覺介面。使用者可以透過座標圖或關鍵詞列表，深入了解不同情感詞彙（如「浪漫」、「現代」、「休閒」）所代表的色彩意象，以及它們在心理空間中的相對位置。這對於設計師、色彩研究者或對色彩心理學感興趣的人來說，是一個實用的參考工具。

## 功能特色

- **互動式散佈圖 (Interactive Scatter Plot)**: 在二維座標系統上探索 174 個資料點。滑鼠懸停可預覽，點擊可鎖定查看詳細資訊。
- **多樣化色彩組合 (Detailed Color Palettes)**: 支援「一對多」的資料展示。點擊任一關鍵詞，即可查看該意象對應的所有三色配色組合。
- **雙語支援 (Bilingual Support)**: 介面同時顯示英文與繁體中文關鍵詞（例如："romantic (浪漫)"），方便不同語系使用者對照。
- **標籤篩選 (Tag Filtering)**: 底部提供可捲動的標籤選單，支援點擊快速定位特定的情感意象。
- **響應式設計 (Responsive Design)**:
  - **桌面版**: 提供完整的儀表板視圖，包含散佈圖、詳細資訊面板與標籤列表。
  - **行動版**: 自動切換為優化的列表視圖，隱藏複雜的圖表，專注於色彩組合的瀏覽體驗。
- **類別分類 (Class Classification)**: 視覺化 15 個不同的情感類別（如 Romantic, Elegant, Modern），並以顏色編碼區分，附帶圖例說明。

## 資料如何處理

本專案的資料核心邏輯位於 `src/components/ColorImageScale/index.jsx` 中，處理流程如下：

1.  **資料載入與轉換**:
    - 原始資料儲存於 `src/assets/cis174_ccoms_data.json`。
    - 應用程式啟動時，使用 `useMemo` 將 JSON 物件轉換為陣列格式 (`dataPoints`)，以供 React 渲染列表。
    - 同時建立不重複的關鍵詞清單 (`uniqueImages`)，並依字母順序排序，用於生成底部的標籤選單。

2.  **座標映射 (Coordinate Mapping)**:
    - 原始數據包含 `x` (Warm-Cool) 與 `y` (Soft-Hard) 數值（範圍約 -3.0 至 3.0）。
    - 前端透過線性插值公式，將這些數值轉換為 `0%` 至 `100%` 的 CSS `left` 與 `top` 屬性，實現散佈圖的精確定位。

3.  **即時色彩篩選**:
    - 由於資料集中同一個 `image` (關鍵詞) 可能對應多組不同的色彩組合 (`clst`)。
    - 當使用者選取某個節點時，系統會即時執行篩選邏輯：找出所有同名 `image` 的資料點 -> 去除重複的色彩組合 -> 將結果傳遞給 `DetailsPanel` 進行渲染。

## 技術堆疊

- **前端框架**: [React](https://react.dev/)
- **建置工具**: [Vite](https://vitejs.dev/)
- **樣式處理**: [Tailwind CSS](https://tailwindcss.com/)
- **圖標庫**: [Lucide React](https://lucide.dev/)

## 專案結構

本專案採用元件化架構，主要程式碼位於 `src/components/ColorImageScale/` 目錄下：

```
src/
├── assets/
│   └── cis174_ccoms_data.json  # 原始數據集
├── components/
│   └── ColorImageScale/        # 主功能模組
│       ├── index.jsx           # 主容器與資料邏輯
│       ├── ScatterPlot.jsx     # 二維座標散佈圖元件
│       ├── DetailsPanel.jsx    # 詳細資訊與色票顯示面板
│       ├── TagMenu.jsx         # 底部標籤篩選選單
│       ├── ClassLegend.jsx     # 類別圖例
│       ├── Header.jsx          # 標題區塊
│       ├── Footer.jsx          # 版權宣告區塊
│       └── constants.js        # 共用常數與工具函式
```

## 版權宣告

© DCC (Digital Communication Contentia) Laboratory, Department of Graphic Arts and Communications, National Taiwan Normal University.
All Rights Reserved.
