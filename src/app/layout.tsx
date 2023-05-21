import "./base.scss";

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
        <Link className={style["link"]} href="/memo-sample-1">
          重いコンポーネントがある場合
        </Link>
        <Link className={style["link"]} href="/memo-sample-2">
          重いコンポーネントとのレンダリングを分けた場合
        </Link>
        <Link className={style["link"]} href="/memo-sample-3">
          重いコンポーネントとのレンダリングを分けるのが難しい場合
        </Link>
      </body>
    </html>
  );
}
