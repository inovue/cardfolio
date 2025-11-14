import { createRoute } from 'honox/factory'
import HolographicCard from '../islands/holographic-card'
import { config } from '../config'


export default createRoute((c) => {
  const base = import.meta.env.BASE_URL;
  return c.render(
    <div class="flex justify-center items-center h-[100dvh] overflow-hidden">
      <HolographicCard 
        frontImageUrl={config.cardImage}
        frontTitle={config.title}
        frontDescription={config.description}
        frontHasHolographic={true}
        backImageUrl={config.backgroundImage}
        backHasHolographic={false}
        socialLinks={config.socialLinks}
      />
    </div>
  )
})
