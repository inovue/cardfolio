import { jsxRenderer } from 'hono/jsx-renderer'
import { Link, Script } from 'honox/server'

export default jsxRenderer(({ children }) => {
  const base = import.meta.env.BASE_URL;
  return (
    <html lang="ja">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="骨董エンジニ屋、イノビューのポートフォリオ。TypeScriptとPythonを主に使用し、AIと協調するコーディングスタイルを実践中。" />
        <meta name="keywords" content="イノビュー, エンジニア, TypeScript, Python, AI, コーディング, ポートフォリオ" />
        <meta name="author" content="イノビュー" />
        <meta name="robots" content="index, follow" />
        
        {/* OGP */}
        <meta property="og:title" content="骨董エンジニ屋、イノビュー" />
        <meta property="og:description" content="TypeScriptとPythonを主に使用。AIと協調するコーディングスタイルを実践中。" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={base} />
        <meta property="og:image" content={`${base}images/front.webp`} />
        <meta property="og:site_name" content="イノビューのポートフォリオ" />
        <meta property="og:locale" content="ja_JP" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="骨董エンジニ屋、イノビュー" />
        <meta name="twitter:description" content="TypeScriptとPythonを主に使用。AIと協調するコーディングスタイルを実践中。" />
        <meta name="twitter:image" content={`${base}images/front.webp`} />
        <meta name="twitter:creator" content="@inovue3" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={base} />
        
        <link rel="icon" href={`${base}favicon.ico`} />
        <Link href="/app/style.css" rel="stylesheet" />
        <Script src="/app/client.ts" async />
      </head>
      <body>{children}</body>
    </html>
  )
})
