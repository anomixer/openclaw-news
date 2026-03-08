# 🦞 OpenClaw Battlefield Tools

這份目錄包含了維持「龍蝦戰地日誌」與情報網站日常運作所需的工具箱與自動化腳本。

## 🎯 核心功能與腳本使用說明

### 1. `generate_murmur.js`: 混合動力龍蝦產生器 (毒舌代筆)

負責呼叫 Google Gemini API，讓 AI 扮演毒舌戰地記者「anomixer」，自動把客觀的日常新聞轉化為充斥陰謀論、吹捧龍蝦與猛酸傳統大廠的戰況日誌。
它會自動產生中文與英文兩種版本，**並會自動插入到 `murmur.md` 和 `murmur-en.md` 裡面最新的 `### 🟢` 標題下方！**

#### 使用方式
1. 確認已經安裝完套件 (`npm install`)
2. 準備好你的 Gemini API 金鑰 (可到 Google AI Studio 免費申請)
3. 打開終端機 (PowerShell) 並執行以下指令：

```powershell
# 設定金鑰環境變數
$env:GEMINI_API_KEY="你的_金鑰_放這裡"

# 餵給它今天想紀錄的新聞 (建議濃縮過的大事件)
node generate_murmur.js "今天的新聞: Apple 準備推出自己的代理人，Anthropic 大當機被社群罵爆，但 OpenClaw 星星數突破了27萬。"
```
執行完畢後，直接使用 `git diff` 檢查 `murmur*.md` 確認內容是否滿意。

### 2. `update_stars.js`: Github Stars 自動更新器

負責透過 Github API，自動抓取並更新 OpenClaw 生態系 (以及外部如 React, Linux) 所有專案的最新 Star 數量。
它會：
- 幫整個「變體演化樹」重新整理排名 
- 擷取最新的當下時間，並自動增加最新星星總數到「里程碑表格」。
- 重新排序「當前 GitHub Stars 總榜排名」表格。

#### 使用方式
為了避免連續呼叫 Github API 觸發 rate-limit (存取限制)，強烈建議先提供 `GITHUB_TOKEN`：

```powershell
# 設定 Github Token 環境變數
$env:GITHUB_TOKEN="你的_Github_Token"

# 執行星星抓取
node update_stars.js
```

---

## 🌐 關於網站佈署 (MkDocs)

我們已經整合了 [MkDocs Material](https://squidfunk.github.io/mkdocs-material/)，能將 `murmur.md` 轉化為酷炫的情報網站。

- **設定檔**: `mkdocs.yml` (用來設定網站標題、顏色主題、以及左側菜單架構)
- **自動化佈署**: 只要你將內容 `git push` 到 GitHub 的 `main` 或 `murmur-runner` 分支，GitHub Actions (`.github/workflows/pages.yml`) 就會自動在背後將它編譯並發布至 **GitHub Pages**。

### 如何在本機預覽網站 (可選)
如果你想在推上 Github 前先看看網站長怎樣，可以使用 Python 本機運行：
```bash
pip install mkdocs-material
# 在這份 README 所在的 code/ 目錄中先將設定檔移至專案根目錄
cp mkdocs.yml ../
cd ..
mkdocs serve
```
造訪 `http://127.0.0.1:8000` 即可預覽。

---

## 📦 安裝依賴 (Setup)

所有的 Node.js 套件都安裝在 `code/node_modules` 下。如果你把這些腳本 clone 到全新的電腦上，記得要先進來這個資料夾敲：
```bash
cd code
npm install
```
這會自動根據 `package.json` 安裝像 `@google/generative-ai` 這樣的依賴工具。
