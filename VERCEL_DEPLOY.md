# 🚀 Vercelデプロイガイド

## 📋 概要

このガイドでは、NAORU整体レポートシステムをVercelにデプロイする方法を説明します。

**所要時間**: 10分

**費用**: 無料（Hobbyプラン）

---

## ✨ Vercelの利点

- ✅ **完全無料**（月50万リクエストまで）
- ✅ **自動HTTPS**
- ✅ **グローバルCDN**
- ✅ **自動デプロイ**（GitHubプッシュ時）
- ✅ **サーバーレス関数**（バックエンド不要）
- ✅ **簡単セットアップ**（5分で完了）

---

## 📦 準備

### 必要なもの

1. **GitHubアカウント**
   - まだない場合: https://github.com/signup

2. **Vercelアカウント**
   - まだない場合: https://vercel.com/signup
   - **GitHubでサインアップ推奨**

3. **プロジェクトがGitHubにプッシュ済み**
   - このプロジェクト: https://github.com/vie324/naoru_rep

---

## 🚀 デプロイ手順

### ステップ1: Vercelにログイン

1. **https://vercel.com/ にアクセス**

2. **「Sign Up」または「Log In」をクリック**

3. **「Continue with GitHub」をクリック**
   - GitHubでのサインインが推奨

4. **権限を承認**
   - Vercelがあなたのリポジトリにアクセスできるように

---

### ステップ2: 新しいプロジェクトを作成

1. **ダッシュボードで「New Project」をクリック**

2. **「Import Git Repository」セクション**

3. **リポジトリを検索**
   - 検索ボックスに「naoru_rep」と入力

4. **「Import」をクリック**

---

### ステップ3: プロジェクト設定

#### 3-1. 基本設定

- **Project Name**: `naoru-rep`（好きな名前でOK）
- **Framework Preset**: `Other` （自動検出でOK）
- **Root Directory**: `.`（変更不要）

#### 3-2. ビルド設定

**Build and Output Settings**

- **Build Command**: 空欄（静的サイトなので不要）
- **Output Directory**: `.`（変更不要）
- **Install Command**: `npm install`（自動）

#### 3-3. 環境変数（オプション）

後で設定できますが、今設定する場合：

**Environment Variables** セクションで「Add」をクリック：

| Name | Value | 説明 |
|------|-------|------|
| `USE_REAL_SCRAPING` | `false` | 実スクレイピングを有効化（後で変更可） |

---

### ステップ4: デプロイ実行

1. **「Deploy」ボタンをクリック**

2. **デプロイが開始されます**
   ```
   Building...
   ✓ Build completed
   Deploying...
   ✓ Deployment ready
   ```

3. **完了！**
   - 約1-2分で完了します

---

### ステップ5: URLを確認

デプロイが完了すると、以下が表示されます：

```
🎉 Congratulations!
Your project is live at:
https://naoru-rep-xxx.vercel.app
```

**このURLをクリックして確認！**

---

## ✅ 動作確認

### 1. フロントエンドの確認

デプロイされたURLを開く：
```
https://your-project-name.vercel.app
```

✅ ダッシュボードが表示されればOK！

---

### 2. APIの確認

#### Health Check

ブラウザで以下を開く：
```
https://your-project-name.vercel.app/api/health
```

✅ 以下が表示されればOK：
```json
{
  "status": "ok",
  "version": "vercel",
  "message": "NAORU Backend is running on Vercel (Serverless)"
}
```

---

### 3. 競合分析の確認

1. **デプロイされたサイトを開く**

2. **「競合分析」タブをクリック**

3. **エリアに「渋谷」と入力**

4. **「競合を検索」をクリック**

✅ デモデータが表示されればOK！

---

## 🔧 環境変数の設定（後から）

### ダッシュボードから設定

1. **Vercelダッシュボードを開く**
   - https://vercel.com/dashboard

2. **プロジェクトをクリック**

3. **「Settings」タブをクリック**

4. **左側のメニューから「Environment Variables」**

5. **「Add」をクリック**

#### 設定例：

| Name | Value | Environment |
|------|-------|-------------|
| `USE_REAL_SCRAPING` | `false` | Production |
| `GEMINI_API_KEY` | `your-api-key` | Production |

6. **「Save」をクリック**

7. **再デプロイ**（変更を反映するため）
   - 「Deployments」タブ → 最新のデプロイの「...」 → 「Redeploy」

---

## 🔄 自動デプロイ

### GitHubプッシュで自動更新

**設定不要！** すでに有効化されています。

#### 動作：

1. **ローカルでコードを編集**

2. **GitHubにプッシュ**
   ```bash
   git add .
   git commit -m "Update features"
   git push origin claude/enhance-beauty-analysis-NVLrz
   ```

3. **Vercelが自動的にデプロイ**
   - 約1-2分で完了
   - メールで通知が来ます

#### デプロイ状況の確認：

- Vercelダッシュボード → 「Deployments」タブ

---

## 🌐 カスタムドメインの設定（オプション）

### 独自ドメインを使いたい場合

1. **Vercelダッシュボード → プロジェクト → 「Settings」 → 「Domains」**

2. **「Add」をクリック**

3. **ドメイン名を入力**
   - 例: `naoru-report.com`

4. **DNSレコードを設定**
   - Vercelが指示を表示します

5. **数分で有効化**

---

## 🐛 トラブルシューティング

### Q1: デプロイに失敗する

**A**: ビルドログを確認してください。

1. Vercelダッシュボード → 「Deployments」
2. 失敗したデプロイをクリック
3. 「Building」セクションでエラーを確認

**よくあるエラー：**
- `node_modules` が大きすぎる → `.vercelignore` に追加
- ビルドコマンドエラー → `vercel.json` の設定確認

---

### Q2: APIが動作しない

**A**: エンドポイントを確認してください。

- ✅ 正しい: `/api/health`
- ❌ 間違い: `/api/health/`（最後のスラッシュ不要）

**デバッグ方法：**

1. Vercelダッシュボード → プロジェクト → 「Deployments」
2. 最新のデプロイ → 「Functions」タブ
3. 各関数のログを確認

---

### Q3: ローカルで動作するがVercelで動かない

**A**: 環境の違いを確認してください。

**チェックリスト：**
- [ ] 環境変数は設定されているか
- [ ] APIパスは正しいか（ハイフン `-` 形式）
- [ ] CORS設定は含まれているか

---

### Q4: 「Function Timeout」エラー

**A**: 関数のタイムアウト時間を延長してください。

`vercel.json` を編集：

```json
{
  "functions": {
    "api/**/*.js": {
      "maxDuration": 30
    }
  }
}
```

**注意**: 無料プランは最大10秒です。Pro以上で30秒まで可能。

---

## 📊 使用状況の確認

### アクセス数・帯域幅の確認

1. **Vercelダッシュボード → プロジェクト → 「Analytics」**

2. **確認できる情報：**
   - ページビュー数
   - ユニークビジター数
   - 帯域幅使用量
   - 関数実行回数

### 無料プランの制限：

- **リクエスト**: 50万/月
- **帯域幅**: 100GB/月
- **関数実行**: 100GB-時間/月
- **ビルド時間**: 6,000分/月

**通常の使用では制限に達することはありません。**

---

## 🔒 セキュリティ

### 環境変数の管理

**重要：**
- ✅ APIキーは**必ず**環境変数に設定
- ❌ コードに直接書かない
- ❌ GitHubにプッシュしない

### 例：

```javascript
// ❌ 悪い例
const API_KEY = "sk-abc123...";

// ✅ 良い例
const API_KEY = process.env.GEMINI_API_KEY;
```

---

## 🎉 完了チェックリスト

デプロイが成功したか確認：

- [ ] Vercelダッシュボードでデプロイが「Ready」
- [ ] `https://your-project.vercel.app` が開ける
- [ ] `/api/health` が `{"status":"ok"}` を返す
- [ ] 競合分析タブでデータが表示される
- [ ] GitHubプッシュで自動デプロイされる

**すべてチェックできたら完璧です！** 🎊

---

## 📱 次のステップ

### 1. カスタマイズ

- 環境変数を追加
- カスタムドメインを設定
- アナリティクスを確認

### 2. 実スクレイピングを有効化（上級）

`USE_REAL_SCRAPING` 環境変数を `true` に設定

**注意**: Puppeteerの設定が必要です。

### 3. チームメンバーを招待

- Vercelダッシュボード → 「Settings」 → 「Members」

---

## 🆘 サポート

### 公式ドキュメント

- Vercel公式: https://vercel.com/docs
- Serverless Functions: https://vercel.com/docs/functions

### トラブル時

1. ビルドログを確認
2. 関数ログを確認
3. 公式ドキュメントを検索
4. Vercelサポートに問い合わせ

---

**これでVercelへのデプロイは完璧です！** 🚀

何か問題があれば、ビルドログを共有してください。
