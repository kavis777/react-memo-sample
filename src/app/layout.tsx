import Link from "next/link";

import style from "./layout.module.scss";

export const metadata = {
  title: "React memoのサンプルコード",
  description: "React memoについてのサンプルコードです。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        {children}
        <Link className={style["link"]} href="/">
          デフォルトの状態
        </Link>
        <Link className={style["link"]} href="/no-memo">
          重いコンポーネントがある場合
        </Link>
      </body>
    </html>
  );
}
