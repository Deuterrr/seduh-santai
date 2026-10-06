<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import team2024 from '@/assets/team-photo/team-2024.png'
import team2025 from '@/assets/team-photo/team-2025.png'
import { useInView } from '@/composables/useInView'
import { useParallax } from '@/composables/useParallax'

interface StoryChapter {
  id: number
  year: string
  headline: string
  paragraph: string
  image: string
}

const chapters: StoryChapter[] = [
  {
    id: 1,
    year: '2024',
    headline: 'Born from exhaustion with commercial noise.',
    paragraph:
      'We started in a narrow garage corner in South Jakarta not out of grand ambition, but out of frustration. We were exhausted by crowded cafés serving artificial syrups over burnt dark-roasted beans while blasting loud music. We just wanted an unhurried space: honest Indonesian micro-lots roasted with restraint, natural morning daylight, and baristas who respect the silence of someone savoring an unhurried pour.',
    image: team2024,
  },
  {
    id: 2,
    year: '2025',
    headline: 'Growing sanctuaries, stubborn commitments.',
    paragraph:
      'Today, with sanctuaries open across Bandung’s misty highlands and Bekasi’s urban rhythm, that stubborn standard has not budged. We don’t rush guests out of their seats, we don’t use artificial flavorings, and we source directly from highland families in Aceh Gayo and Toraja. One cup is never just a transaction—it is simply an invitation to pause, breathe, and let time slow down.',
    image: team2025,
  },
]

const sectionRef = ref<HTMLElement | null>(null)
const { isRevealed } = useInView(sectionRef)

const parallaxWrapRef = ref<HTMLElement | null>(null)
useParallax(parallaxWrapRef, { speed: 0.08, maxOffset: 45 })

const activeIndex = ref<number>(0)
const paragraphRefs = ref<HTMLElement[]>([])

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'))
          if (!isNaN(index)) {
            activeIndex.value = index
          }
        }
      })
    },
    {
      root: null,
      threshold: 0.6,
      rootMargin: '-10% 0px -20% 0px',
    }
  )

  paragraphRefs.value.forEach((el) => {
    if (el) observer?.observe(el)
  })
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <div
    ref="sectionRef"
    class="px-6 sm:px-10 md:px-16 lg:px-20 max-w-[1440px] mx-auto py-20 sm:py-32"
  >
    <!-- Header -->
    <div class="pb-8">
      <h2 class="text-3xl sm:text-5xl font-bold tracking-tight text-[#14110F]">
        <span class="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <span
            class="block transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
            :class="isRevealed ? 'translate-y-0' : 'translate-y-[115%] motion-reduce:translate-y-0'"
          >
            Our Story
          </span>
        </span>
      </h2>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mt-16 items-start">
      <!-- Chapters Column -->
      <div class="lg:col-span-6 flex flex-col gap-28 sm:gap-36 py-8">
        <div
          v-for="(chapter, idx) in chapters"
          :key="chapter.id"
          :ref="(el) => { if (el) paragraphRefs[idx] = el as HTMLElement }"
          :data-index="idx"
          class="flex flex-col gap-4 transition-all duration-700 ease-out motion-reduce:transition-none"
          :class="[
            isRevealed ? 'translate-y-0' : 'translate-y-6 motion-reduce:translate-y-0',
            activeIndex === idx ? 'opacity-100' : 'opacity-35',
          ]"
        >
          <span class="font-mono text-sm uppercase tracking-widest text-[#C86D3B] font-semibold">
            {{ chapter.year }}
          </span>

          <h3 class="text-2xl sm:text-3xl font-bold tracking-tight text-[#14110F]">
            {{ chapter.headline }}
          </h3>

          <p class="text-base sm:text-lg text-[#756C65] leading-relaxed">
            {{ chapter.paragraph }}
          </p>
        </div>
      </div>

      <!-- Sticky Image Frame -->
      <div class="lg:col-span-6 lg:sticky lg:top-32">
        <div
          class="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(20,17,15,0.06)] bg-[#F3ECE2] transition-all duration-1000 delay-200 ease-out motion-reduce:transition-none"
          :class="isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 motion-reduce:opacity-100 motion-reduce:translate-y-0'"
        >
          <div ref="parallaxWrapRef" class="w-full h-full scale-110 will-change-transform">
            <transition
              mode="out-in"
              enter-active-class="transition duration-500 ease-out"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="transition duration-300 ease-in"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <img
                :key="chapters[activeIndex].id"
                :src="chapters[activeIndex].image"
                :alt="chapters[activeIndex].headline"
                class="w-full h-full object-cover"
              />
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
