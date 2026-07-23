# 指示書: metadataBase・html lang属性の修正

作成日: 2026-07-23
対象: `freenough-main`の`app/layout.tsx`
種別: バグ修正

---

## 1. metadataBaseの修正

現状、`metadataBase`が`https://freenough-main.vercel.app`という、ドメイン接続前の仮URLのままになっている。ドメイン接続(`freenough.com`)は完了済みのため、以下に修正する:

```ts
metadataBase: new URL("https://freenough.com"),
```

## 2. html lang属性の修正

現状、`<html lang="en">`となっているが、サイトの中身は日本語のため、以下に修正する:

```tsx
<html lang="ja" ...>
```

`className`等、他の属性はそのまま維持すること。

---

## 3. 確認

- `npm run build`が型エラーなしで通ること
- 修正後、ページのソースを確認し、`<html lang="ja">`になっていること、OGP等の絶対URLが`https://freenough.com/...`になっていることを確認すること

---

## 受け入れ基準

- [ ] `metadataBase`が`https://freenough.com`になっている
- [ ] `<html lang="ja">`になっている
- [ ] `npm run build`が型エラーなしで通る

---

## 完了報告フォーマット

```
## 完了報告: metadataBase・html lang属性の修正

### 変更したファイル
- (概要)

### 確認事項
- npm run build: PASS/FAIL
- 実機確認: 確認済み/未確認

### 不明点・確認が必要な事項
- (あれば記載)
```
