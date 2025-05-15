import { createRoute } from 'honox/factory'
import Counter from '../islands/counter'
import HolographicCard from '../islands/holographic-card'
import { Plus } from 'lucide'


export default createRoute((c) => {
  const base = import.meta.env.BASE_URL;
  return c.render(
    <div class="flex justify-center items-center h-[100dvh] overflow-hidden">
      <HolographicCard 
        frontImageUrl={`${base}images/front.webp`}
        frontTitle="カードタイトル"
        frontDescription="カードの説明文がここに入ります。このカードは特別な効果を持っています。"
        frontHasHolographic={true}
        backImageUrl={`${base}images/back.webp`}
        backHasHolographic={false}
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
