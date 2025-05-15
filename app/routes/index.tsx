import { createRoute } from 'honox/factory'
import HolographicCard from '../islands/holographic-card'


export default createRoute((c) => {
  const base = import.meta.env.BASE_URL;
  return c.render(
    <div class="flex justify-center items-center h-[100dvh] overflow-hidden">
      <HolographicCard 
        frontImageUrl={`${base}images/front.webp`}
        frontTitle="DXエンジニア、イノビュー"
        frontDescription={
`[Language]
TypeScriptとPythonを主に使用。静的型と柔軟性のバランスを活かした開発を好みます。

[Editor]
CursorとCodexを使い、AIと協調するコーディングスタイルを実践中。

[Tools]
Bun、Vite、Hono、Tailwind CSSを組み合わせた高速な開発環境を好みます。`
}
        frontHasHolographic={true}
        backImageUrl={`${base}images/back.webp`}
        backHasHolographic={false}
        socialLinks={[
          {
            url: 'https://example.com',
            label: 'Facebook'
          }
        ]}
      />
    </div>
  )
})
