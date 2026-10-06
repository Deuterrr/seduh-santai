<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Pause } from 'lucide-vue-next'
import cafeJakarta from '@/assets/cafe/cafe-jakarta.png'
import cafeBandung from '@/assets/cafe/cafe-bandung.png'
import cafeBekasi from '@/assets/cafe/cafe-bekasi.png'
import { useInView } from '@/composables/useInView'
import { useParallax } from '@/composables/useParallax'

export interface Cafe {
  id: number
  location: string
  story: string
  image: string
}

const cafes: Cafe[] = [
  {
    id: 1,
    location: 'Jakarta, Indonesia',
    story:
      'Our flagship corner built with raw brushed concrete, natural morning skylights, and warm Japanese cedar. Designed for focused morning solitude and intimate afternoon conversations.',
    image: cafeJakarta,
  },
  {
    id: 2,
    location: 'Bandung, Indonesia',
    story:
      'Perched in the cool mist of Dago highlands. An open-air glasshouse surrounded by endemic pine trees, serving limited micro-lot pourovers with crisp mountain air.',
    image: cafeBandung,
  },
  {
    id: 3,
    location: 'Bekasi, Indonesia',
    story:
      'Born from dynamic suburban energy, this sanctuary reimagines exposed red brick and lush tropical greenery as an oasis of quiet right in the urban flow.',
    image: cafeBekasi,
  },
]

const sectionRef = ref<HTMLElement | null>(null)
const { isRevealed } = useInView(sectionRef)

const parallaxWrapRef = ref<HTMLElement | null>(null)
useParallax(parallaxWrapRef, { speed: 0.1, maxOffset: 50 })

const currentIndex = ref<number>(0)
const isPaused = ref<boolean>(false)
const progress = ref<number>(0)

const INTERVAL_MS = 6000
const TICK_MS = 50

let timer: ReturnType<typeof setInterval> | null = null

const startTimer = (): void => {
  if (timer) clearInterval(timer)
  progress.value = 0

  timer = setInterval(() => {
    if (!isPaused.value) {
      progress.value += (TICK_MS / INTERVAL_MS) * 100

      if (progress.value >= 100) {
        progress.value = 0
        currentIndex.value = (currentIndex.value + 1) % cafes.length
      }
    }
  }, TICK_MS)
}

const togglePlayPause = (): void => {
  isPaused.value = !isPaused.value
}

const selectCafe = (idx: number): void => {
  currentIndex.value = idx
  progress.value = 0
}

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div
    ref="sectionRef"
    class="px-6 sm:px-10 md:px-16 lg:px-20 max-w-[1440px] mx-auto py-20 sm:py-28"
  >
    <!-- Header -->
    <div class="flex items-end justify-between pb-8">
      <div class="flex flex-col gap-2">
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-[#14110F]">
          <span class="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
            <span
              class="block transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
              :class="isRevealed ? 'translate-y-0' : 'translate-y-[115%] motion-reduce:translate-y-0'"
            >
              Our Cafés
            </span>
          </span>
        </h2>

        <button
          type="button"
          @click="togglePlayPause"
          class="flex items-center gap-2.5 cursor-pointer p-1 -m-1 group w-fit transition-opacity duration-1000 delay-200"
          :class="isRevealed ? 'opacity-100' : 'opacity-0'"
          :title="isPaused ? 'Click to resume' : 'Click to pause'"
        >
          <div class="w-20 h-1.5 bg-[#14110F]/10 rounded-full overflow-hidden">
            <div
              class="h-full bg-[#C86D3B] transition-[width] ease-linear duration-50"
              :style="{ width: `${progress}%` }"
            ></div>
          </div>
          <Pause v-if="isPaused" :size="13" class="text-[#C86D3B]" />
        </button>
      </div>

      <span
        class="font-mono text-xs text-[#756C65] uppercase transition-all duration-1000 delay-300"
        :class="isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
      >
        07:00 – 22:00 WIB
      </span>
    </div>

    <!-- Layout Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mt-8">
      <!-- Location Buttons -->
      <div class="lg:col-span-5 flex flex-col gap-3">
        <button
          v-for="(cafe, idx) in cafes"
          :key="cafe.id"
          type="button"
          @click="selectCafe(idx)"
          class="py-5 px-6 rounded-2xl text-left transition-all duration-700 flex items-center justify-between group cursor-pointer motion-reduce:transition-none"
          :style="{ transitionDelay: `${150 + idx * 100}ms` }"
          :class="[
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 motion-reduce:opacity-100 motion-reduce:translate-y-0',
            currentIndex === idx ? 'bg-[#FAF6F0]' : 'hover:bg-[#FAF6F0]/60',
          ]"
        >
          <span
            class="text-xl sm:text-2xl transition-colors"
            :class="currentIndex === idx ? 'font-bold text-[#14110F]' : 'text-[#756C65] group-hover:text-[#14110F]'"
          >
            {{ cafe.location }}
          </span>
          <span
            class="w-2 h-2 rounded-full transition-all duration-300"
            :class="currentIndex === idx ? 'bg-[#C86D3B] scale-100' : 'bg-transparent scale-0'"
          ></span>
        </button>
      </div>

      <!-- Photo Display -->
      <div
        class="lg:col-span-7 flex flex-col gap-6 transition-all duration-1000 delay-300 ease-out motion-reduce:transition-none"
        :class="isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 motion-reduce:opacity-100 motion-reduce:translate-y-0'"
      >
        <div class="relative aspect-[16/10] w-full rounded-3xl overflow-hidden shadow-[0_15px_40px_rgba(20,17,15,0.06)] bg-[#F3ECE2]">
          <div ref="parallaxWrapRef" class="w-full h-full scale-110 will-change-transform">
            <transition
              mode="out-in"
              enter-active-class="transition duration-400 ease-out"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="transition duration-200 ease-in"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <img
                :key="cafes[currentIndex].id"
                :src="cafes[currentIndex].image"
                :alt="cafes[currentIndex].location"
                class="w-full h-full object-cover"
              />
            </transition>
          </div>
        </div>

        <transition
          mode="out-in"
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div :key="cafes[currentIndex].id">
            <span class="font-mono text-xs uppercase tracking-widest text-[#C86D3B]">
              {{ cafes[currentIndex].location }}
            </span>
            <p class="text-lg text-[#756C65] mt-2 leading-relaxed">
              {{ cafes[currentIndex].story }}
            </p>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
