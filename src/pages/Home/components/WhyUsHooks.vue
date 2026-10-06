<script setup lang="ts">
import { ref } from 'vue'
import { useInView } from '@/composables/useInView'

interface Reason {
  number: string
  title: string
  description: string
}

const reasons: Reason[] = [
  {
    number: '01',
    title: 'Scientifically Slower',
    description:
      'Other cafés brag about 90-second service. We intentionally take our sweet time brewing every pour so you can remember what having an original thought actually feels like.',
  },
  {
    number: '02',
    title: 'Zero Wi-Fi, Zero Rush',
    description:
      'We refuse to install high-speed internet because staring blankly into a ceramic cup is a lost superpower. No barista will ever hover over your table asking if you are finished.',
  },
  {
    number: '03',
    title: 'Pretentious Beans, Humble People',
    description:
      'We reject 98% of green harvest lots that fail our dramatic cupping standards, yet our baristas will never judge you for ordering extra oat milk or lingering for three hours.',
  },
]

const sectionRef = ref<HTMLElement | null>(null)
const { isRevealed } = useInView(sectionRef)
</script>

<template>
  <div
    id="why-us"
    ref="sectionRef"
    class="px-6 sm:px-10 md:px-16 lg:px-20 max-w-[1440px] mx-auto py-16 sm:py-24"
  >
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8">
      <div class="flex flex-col gap-2">
        <h2 class="text-3xl sm:text-5xl font-bold tracking-tight text-[#14110F] leading-[1.08]">
          <span class="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
            <span
              class="block transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
              :class="isRevealed ? 'translate-y-0' : 'translate-y-[115%] motion-reduce:translate-y-0'"
            >
              Why choose us
            </span>
          </span>
          <span class="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
            <span
              class="block font-serif italic font-normal text-[#C86D3B] transition-transform duration-[1100ms] delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
              :class="isRevealed ? 'translate-y-0' : 'translate-y-[115%] motion-reduce:translate-y-0'"
            >
              over everywhere else?
            </span>
          </span>
        </h2>
      </div>

      <p
        class="text-sm text-[#756C65] max-w-xs sm:text-right transition-all duration-1000 delay-300 ease-out motion-reduce:transition-none"
        :class="isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 motion-reduce:opacity-100 motion-reduce:translate-y-0'"
      >
        Three completely honest, non-exaggerated reasons to linger here.
      </p>
    </div>

    <!-- Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
      <div
        v-for="(item, idx) in reasons"
        :key="item.number"
        class="rounded-3xl bg-[#ECE2D4] p-6 sm:p-8 flex flex-col justify-between shadow-[0_15px_40px_rgba(20,17,15,0.04)] hover:-translate-y-1 transition-all duration-1000 ease-out motion-reduce:transition-none"
        :style="{ transitionDelay: `${200 + idx * 150}ms` }"
        :class="isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 motion-reduce:opacity-100 motion-reduce:translate-y-0'"
      >
        <div>
          <span class="font-mono text-2xl font-bold text-[#14110F]/30">
            {{ item.number }}
          </span>

          <h3 class="text-2xl font-bold tracking-tight text-[#14110F] mt-4 leading-snug">
            {{ item.title }}
          </h3>

          <p class="text-sm sm:text-base text-[#756C65] mt-4 leading-relaxed">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
