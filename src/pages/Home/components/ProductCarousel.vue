<script setup lang="ts">
import { ref } from 'vue'
import product1 from '@/assets/products/cappuccino.png'
import product4 from '@/assets/products/latte.png'
import { useInView } from '@/composables/useInView'
import { useParallax } from '@/composables/useParallax'

interface FeaturedItem {
  id: string
  title: string
  price: string
  tag: string
  description: string
  image: string
}

interface MenuItem {
  name: string
  note: string
  price: string
}

interface MenuCategory {
  id: string
  tag: string
  title: string
  isOutline?: boolean
  items: MenuItem[]
  footerNote?: string
}

const featuredItems: FeaturedItem[] = [
  {
    id: 'cappuccino',
    title: 'Silky Cappuccino',
    price: 'Rp 42.000',
    tag: 'Signature',
    description: 'Double ristretto Gayo espresso with dense, velvety steamed milk microfoam.',
    image: product1,
  },
  {
    id: 'latte',
    title: 'Velvet Cafe Latte',
    price: 'Rp 44.000',
    tag: 'Favorite',
    description: 'Sweet whole milk or house oat milk gently infused with single-origin espresso.',
    image: product4,
  },
]

const menuCategories: MenuCategory[] = [
  {
    id: 'black-coffee',
    tag: 'Pure Extraction',
    title: 'Black Coffee',
    items: [
      { name: 'Clean Americano', note: 'Crisp bergamot & sweet finish', price: 'Rp 36k' },
      { name: 'Double Espresso', note: 'Intense cocoa & hazelnut crema', price: 'Rp 32k' },
      { name: 'V60 Hand Pour', note: 'Single-origin seasonal micro-lot', price: 'Rp 48k' },
      { name: 'Japanese Iced Drip', note: 'Flash-chilled over ice with bright floral notes', price: 'Rp 42k' },
      { name: 'Kyoto Cold Brew', note: 'Slow 12h cold extraction with dark chocolate', price: 'Rp 40k' },
      { name: 'Long Black', note: 'Double shot pulled over hot water', price: 'Rp 36k' },
    ],
  },
  {
    id: 'botanicals',
    tag: 'Non-Coffee',
    title: 'Botanicals & Cocoa',
    items: [
      { name: 'Single Estate Uji Matcha', note: 'Whisked ceremonial green tea with oat milk', price: 'Rp 46k' },
      { name: 'Raw Bali Cacao', note: 'Pure Tabanan stoneground cacao elixir', price: 'Rp 42k' },
      { name: 'Cascara Cherry Tea', note: 'Sun-dried organic fruit brew & hibiscus', price: 'Rp 34k' },
      { name: 'Roasted Hojicha Latte', note: 'Smoky Japanese roasted green tea', price: 'Rp 44k' },
      { name: 'Golden Turmeric Elixir', note: 'Fresh ginger root, turmeric & wild honey', price: 'Rp 38k' },
      { name: 'Lavender Earl Grey', note: 'Bergamot black tea with French lavender', price: 'Rp 36k' },
    ],
  },
  {
    id: 'house-specials',
    tag: 'House Specials',
    title: 'Signatures',
    isOutline: true,
    items: [
      { name: '18h Santai Cold Drip', note: 'Gravity-extracted over ice blocks', price: 'Rp 45k' },
      { name: 'Brown Sugar Piccolo', note: 'Ristretto, textured milk, palm drop', price: 'Rp 38k' },
      { name: 'Smoked Sea Salt Latte', note: 'Kusamba artisan sea salt & caramel', price: 'Rp 46k' },
      { name: 'Pandan Coconut Cloud', note: 'Cold brew capped with pandan foam', price: 'Rp 45k' },
      { name: 'Citrus Espresso Tonic', note: 'Double shot over tonic & fresh yuzu peel', price: 'Rp 42k' },
      { name: 'Cinnamon Cortado', note: 'Equal parts espresso & textured milk', price: 'Rp 38k' },
    ],
    footerNote: 'Available hot or iced. House oat milk available on request.',
  },
]

const sectionRef = ref<HTMLElement | null>(null)
const { isRevealed } = useInView(sectionRef)

const photoRefs = [ref<HTMLElement | null>(null), ref<HTMLElement | null>(null)]
photoRefs.forEach((r) => useParallax(r, { speed: 0.09, maxOffset: 40 }))
</script>

<template>
  <div
    ref="sectionRef"
    class="px-6 sm:px-10 md:px-16 lg:px-20 max-w-[1440px] mx-auto py-20 sm:py-28"
  >
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8">
      <div class="flex flex-col gap-2">
        <h2 class="text-3xl sm:text-5xl font-bold tracking-tight text-[#14110F]">
          <span class="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
            <span
              class="block transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
              :class="isRevealed ? 'translate-y-0' : 'translate-y-[115%] motion-reduce:translate-y-0'"
            >
              Our Lineup
            </span>
          </span>
        </h2>
        <p
          class="text-base sm:text-lg text-[#756C65] transition-all duration-1000 delay-200 ease-out motion-reduce:transition-none"
          :class="isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 motion-reduce:opacity-100 motion-reduce:translate-y-0'"
        >
          Curated coffee extractions, single-origin beans, and botanical infusions.
        </p>
      </div>

      <div
        class="font-mono text-xs text-[#756C65] uppercase transition-all duration-1000 delay-300"
        :class="isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
      >
        Freshly Roasted Weekly
      </div>
    </div>

    <!-- Bento Grid -->
    <div class="mt-8 flex flex-col gap-8">
      <!-- Featured 2-Card Row -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          v-for="(item, idx) in featuredItems"
          :key="item.id"
          class="relative group rounded-3xl bg-[#ECE2D4] overflow-hidden p-6 sm:p-8 flex flex-col justify-between shadow-[0_15px_40px_rgba(20,17,15,0.04)] transition-all duration-1000 ease-out motion-reduce:transition-none"
          :style="{ transitionDelay: `${150 + idx * 150}ms` }"
          :class="isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 motion-reduce:opacity-100 motion-reduce:translate-y-0'"
        >
          <div class="absolute top-6 right-6 bg-[#C86D3B] text-white font-mono text-xs uppercase tracking-wider font-semibold px-3.5 py-1 rounded-full shadow-sm z-10">
            {{ item.tag }}
          </div>

          <!-- Title & Price -->
          <div class="flex items-start justify-between pr-24">
            <div>
              <h3 class="text-2xl sm:text-3xl font-bold tracking-tight text-[#14110F]">
                {{ item.title }}
              </h3>
              <p class="font-mono text-lg font-bold text-[#14110F] mt-1">
                {{ item.price }}
              </p>
            </div>
          </div>

          <!-- Photo Container with Parallax -->
          <div class="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#E2D5C4] my-6">
            <div
              :ref="(el) => { if (el) photoRefs[idx].value = el as HTMLElement }"
              class="w-full h-full scale-110 will-change-transform"
            >
              <img
                :src="item.image"
                :alt="item.title"
                class="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
              />
            </div>
          </div>

          <p class="text-sm text-[#756C65] leading-relaxed">
            {{ item.description }}
          </p>
        </div>
      </div>

      <!-- 3 Bento Category Boxes -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(category, idx) in menuCategories"
          :key="category.id"
          class="rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-1000 ease-out motion-reduce:transition-none"
          :style="{ transitionDelay: `${200 + idx * 150}ms` }"
          :class="[
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 motion-reduce:opacity-100 motion-reduce:translate-y-0',
            category.isOutline
              ? 'border-2 border-[#14110F]/20 bg-transparent'
              : 'bg-[#ECE2D4] shadow-[0_15px_40px_rgba(20,17,15,0.04)]',
          ]"
        >
          <div>
            <div class="pb-4">
              <span class="font-mono text-xs uppercase tracking-widest text-[#C86D3B]">
                {{ category.tag }}
              </span>
              <h4 class="font-bold text-2xl text-[#14110F] mt-1">
                {{ category.title }}
              </h4>
            </div>

            <div class="flex flex-col divide-y divide-[#14110F]/8 mt-2">
              <div
                v-for="menuItem in category.items"
                :key="menuItem.name"
                class="py-3 flex items-center justify-between"
              >
                <div>
                  <p class="font-bold text-sm text-[#14110F]">{{ menuItem.name }}</p>
                  <p class="text-xs text-[#756C65]">{{ menuItem.note }}</p>
                </div>
                <span class="font-mono text-xs font-semibold text-[#14110F]">{{ menuItem.price }}</span>
              </div>
            </div>
          </div>

          <div v-if="category.footerNote" class="pt-4 border-t border-[#14110F]/8">
            <p class="text-xs text-[#756C65]">
              {{ category.footerNote }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
