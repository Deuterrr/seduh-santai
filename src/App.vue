<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'
import Home from './pages/Home/Home.vue'

let lenis: Lenis | null = null
let rafId: number | null = null

onMounted(() => {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })

  function raf(time: number) {
    lenis?.raf(time)
    rafId = requestAnimationFrame(raf)
  }

  rafId = requestAnimationFrame(raf)
})

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
  lenis?.destroy()
})
</script>

<template>
  <div class="relative min-h-screen bg-[#FBF8F3] text-[#14110F] selection:bg-[#C86D3B]/20 selection:text-[#14110F]">
    <div
      class="fixed inset-0 pointer-events-none z-[999] bg-grain opacity-30 mix-blend-overlay"
      aria-hidden="true"
    ></div>

    <Home />
  </div>
</template>
