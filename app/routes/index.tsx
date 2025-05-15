import { createRoute } from 'honox/factory'
import Counter from '../islands/counter'
import HolographicCard from '../islands/holographic-card'
import { Plus } from 'lucide'


export default createRoute((c) => {
  const name = c.req.query('name') ?? 'Hono'
  return c.render(
    <div class="py-8 text-center">
      <title>{name}</title>
      <h1 class="text-3xl font-bold">Hello, {name}!</h1>
      <Counter />
      <HolographicCard 
        frontImageUrl="https://placehold.jp/540x860.png"
        frontTitle="カードタイトル"
        frontDescription="カードの説明文がここに入ります。このカードは特別な効果を持っています。"
        frontHasHolographic={true}
        socialLinks={[
          {
            url: 'https://example.com',
            icon: Plus,
            label: 'Facebook'
          }
        ]}
      />
    </div>
  )
})
