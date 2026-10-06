<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ArrowUpRight } from 'lucide-vue-next'
import coffeeImage from '@/assets/coffee/cappuccino-shoot.png'
import { useParallax } from '@/composables/useParallax'

const scrollTo = (id: string): void => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// Drives the staggered entrance reveal
const revealed = ref(false)

// Photo parallax
const photoRef = ref<HTMLElement | null>(null)
useParallax(photoRef, { speed: 0.12, maxOffset: 80 })

onMounted(() => {
  requestAnimationFrame(() => {
    revealed.value = true
  })
})
</script>

<template>
  <div class="min-h-dvh pt-32 sm:pt-36 lg:pt-40 pb-12 px-6 sm:px-10 md:px-16 lg:px-20 max-w-[1440px] mx-auto flex flex-col justify-between">
    <!-- Monumental Editorial Composition -->
    <div class="relative my-auto">
      <h1 class="relative z-10 text-[8vw] sm:text-[7vw] xl:text-[6rem] font-bold tracking-tighter text-[#14110F] leading-[0.95]">
        <span class="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <span
            class="block transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
            :class="revealed ? 'translate-y-0' : 'translate-y-[115%] motion-reduce:translate-y-0'"
          >
            One cup.
          </span>
        </span>
        <span class="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <span
            class="block font-serif italic font-normal tracking-tight text-[#C86D3B] transition-transform duration-[1100ms] delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
            :class="revealed ? 'translate-y-0' : 'translate-y-[115%] motion-reduce:translate-y-0'"
          >
            Countless stories.
          </span>
        </span>
      </h1>

      <!-- Arched Photo: tucked behind the type, drifts gently on scroll -->
      <div
        ref="photoRef"
        class="relative z-0 -mt-4 ml-auto w-[62%] sm:w-[48%] lg:mt-0 lg:absolute lg:top-2 lg:right-0 lg:w-[27%] will-change-transform"
      >
        <div
          class="aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-[#ECE2D4] transition-all duration-[1400ms] delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none group"
          :class="revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 motion-reduce:opacity-100 motion-reduce:translate-y-0'"
        >
          <img
            :src="coffeeImage"
            alt="A freshly poured cappuccino"
            class="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          />
        </div>
      </div>

      <!-- Hook & Actions -->
      <div
        class="relative z-10 mt-10 lg:mt-14 flex flex-col gap-8 max-w-md transition-all duration-1000 delay-500 ease-out motion-reduce:transition-none"
        :class="revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 motion-reduce:opacity-100 motion-reduce:translate-y-0'"
      >
        <p class="text-lg text-[#756C65] font-normal leading-relaxed">
          We roast and brew specialty coffee for people who refuse to rush their mornings.
        </p>

        <div class="flex flex-wrap items-center gap-4">
          <button
            type="button"
            @click="scrollTo('lineup')"
            class="px-8 py-4 rounded-full text-sm font-semibold tracking-wide bg-[#14110F] text-[#FBF8F3] hover:bg-[#C86D3B] transition-colors duration-300 cursor-pointer flex items-center gap-2 group"
          >
            <span>Explore Menu</span>
            <ArrowUpRight :size="16" class="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          <button
            type="button"
            @click="scrollTo('cafe')"
            class="px-8 py-4 rounded-full text-sm font-semibold tracking-wide border-2 border-[#14110F]/15 text-[#14110F] hover:border-[#14110F] transition-colors duration-300 cursor-pointer"
          >
            Our Sanctuaries
          </button>
        </div>
      </div>
    </div>

    <!-- Quiet Bottom Cue -->
    <div class="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-[#A39992]">
      <span>Est. 2024 · Jakarta · Bandung · Bekasi</span>
      <button
        type="button"
        @click="scrollTo('why-us')"
        class="hover:text-[#14110F] transition-colors cursor-pointer"
      >
        Why Seduh Santai ↓
      </button>
    </div>
  </div>
</template>
