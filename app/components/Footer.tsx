// instruction_freenough_footer_unification.md で確定した4段構成。lifecompass-next側の
// Footer.tsx（src/components/layout/Footer.tsx）とクラス名・構造を完全一致させ、見た目を揃える。
// freenough-mainにはbasePathの制約がないため全リンク相対パスで統一できる。「資産管理ツール」の
// 行き先はlifecompass-next側のASSET_MANAGEMENT_PATH定数と同じ値をリポジトリを跨いで共有できない
// ため、ここでは値のみ複製してハードコードする（変更時は両リポジトリを揃えて更新すること）。
const HITORI_HOJIN_URL = "/hitori-hojin";
const ASSET_MANAGEMENT_URL = "/asset-simulator/assets";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50 pt-8 pb-6 text-xs text-slate-500 sm:pt-10 sm:pb-8 sm:text-sm">
      <div className="mx-auto max-w-7xl px-4">
        {/* ①2カラムのコンテンツ列。モバイルでも2カラムのまま、フォント・余白のみ圧縮する */}
        <div className="grid grid-cols-2 gap-4 border-b border-slate-200 pb-5 sm:gap-16 sm:pb-8">
          <div>
            <p className="mb-2 text-[11px] font-semibold text-slate-400 sm:mb-3 sm:text-xs">FIREを考える</p>
            <ul className="space-y-1.5 sm:space-y-2">
              <li><a href="/asset-simulator" className="hover:text-slate-700">資産シミュレーター</a></li>
              <li><a href="/asset-simulator/tools" className="hover:text-slate-700">ツール</a></li>
              <li><a href="/asset-simulator/concerns" className="hover:text-slate-700">お悩み</a></li>
              <li><a href="/asset-simulator/blog" className="hover:text-slate-700">ブログ</a></li>
            </ul>
          </div>
          <div>
            <p className="mb-2 text-[11px] font-semibold text-slate-400 sm:mb-3 sm:text-xs">一人法人を考える</p>
            <ul className="space-y-1.5 sm:space-y-2">
              <li><a href={HITORI_HOJIN_URL} className="hover:text-slate-700">一人法人トップ</a></li>
              <li><a href={`${HITORI_HOJIN_URL}/blog`} className="hover:text-slate-700">一人法人ブログ</a></li>
            </ul>
          </div>
        </div>

        {/* ②共有機能行 */}
        <nav className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 border-b border-slate-200 py-4 sm:gap-4 sm:py-6">
          <a href="/asset-simulator/app" className="hover:text-slate-700">シミュレーター</a>
          <a href={ASSET_MANAGEMENT_URL} className="hover:text-slate-700">資産管理ツール</a>
          <a href="/asset-simulator/guide" className="hover:text-slate-700">使い方ガイド</a>
          <a href="/asset-simulator/methodology" className="hover:text-slate-700">計算ロジック</a>
          <a href="https://note.com/freenough" target="_blank" rel="noopener noreferrer" className="hover:text-slate-700">Note</a>
        </nav>

        {/* ③ポリシー等の行 */}
        <nav className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 border-b border-slate-200 py-4 sm:gap-4 sm:py-6">
          <a href="/" className="hover:text-slate-700">Freenoughについて</a>
          <a href="/asset-simulator/disclosure" className="hover:text-slate-700">広告開示</a>
          <a href="/asset-simulator/privacy-policy" className="hover:text-slate-700">プライバシーポリシー</a>
          <a href="/asset-simulator/disclaimer" className="hover:text-slate-700">免責事項</a>
          <a href="/asset-simulator/about" className="hover:text-slate-700">運営者情報</a>
        </nav>

        {/* ④コピーライト */}
        <div className="flex flex-col items-center gap-1.5 pt-4 text-center sm:gap-2 sm:pt-6">
          <p>© {new Date().getFullYear()} FREENOUGH</p>
          <p className="text-[11px] text-slate-400 sm:text-xs">本サービスは情報提供を目的としており、投資助言ではありません。</p>
        </div>
      </div>
    </footer>
  );
}
