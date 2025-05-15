import { jsxRenderer } from 'hono/jsx-renderer'
import { Link, Script } from 'honox/server'

export default jsxRenderer(({ children }) => {
  const base = import.meta.env.BASE_URL;
  return (
    <html lang="ja">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={`${base}favicon.ico`} />
        <Link href={`${base}app/style.css`} rel="stylesheet" />
        <Script src={`${base}app/client.ts`} async />
      </head>
      <body>{children}</body>
    </html>
  )
})
