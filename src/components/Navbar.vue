<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

interface NavLink {
  id: string
  label: string
}

const links: NavLink[] = [
  { id: 'story', label: 'Our Story' },
  { id: 'cafe', label: 'Our Café' },
  { id: 'lineup', label: 'Lineup' },
]

const mobileLinks: NavLink[] = [...links, { id: 'reachus', label: 'Contact' }]

const isScrolled = ref<boolean>(false)
const mobileMenuOpen = ref<boolean>(false)
const activeId = ref<string>('')
const progress = ref<number>(0)

const isSolid = computed<boolean>(() => isScrolled.value || mobileMenuOpen.value)

const onScroll = (): void => {
  isScrolled.value = window.scrollY > 20
  const max = document.documentElement.scrollHeight - window.innerHeight
  progress.value = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
}

const onResize = (): void => {
  if (window.innerWidth >= 1024) mobileMenuOpen.value = false
}

const onKeydown = (e: KeyboardEvent): void => {
  if (e.key === 'Escape') mobileMenuOpen.value = false
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize)
  window.addEventListener('keydown', onKeydown)

  // Active section = whichever section crosses the middle of the viewport.
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
        }
      }
    },
    { rootMargin: '-45% 0px -54% 0px' },
  )
  const observedIds = ['welcome', 'why-us', ...mobileLinks.map((l) => l.id)]
  for (const id of observedIds) {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
  window.removeEventListener('keydown', onKeydown)
  observer?.disconnect()
  document.documentElement.style.overflow = ''
})

watch(mobileMenuOpen, (open) => {
  document.documentElement.style.overflow = open ? 'hidden' : ''
})

const scrollTo = (id: string): void => {
  mobileMenuOpen.value = false
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const setFillOrigin = (e: MouseEvent): void => {
  const target = e.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  target.style.setProperty('--x', `${e.clientX - rect.left}px`)
  target.style.setProperty('--y', `${e.clientY - rect.top}px`)
}
</script>

<template>
  <header
    class="fixed top-0 left-0 w-full z-50 py-5 sm:py-6 transition-[background-color,color,box-shadow] duration-200 ease-out"
    :class="
      isSolid
        ? 'bg-[#483227] text-[#FBF8F3] shadow-[0_6px_28px_rgba(72,50,39,0.18)]'
        : 'bg-transparent text-[#14110F]'
    "
  >
    <div
      class="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 lg:px-20 flex items-center justify-between"
    >
      <!-- Logo -->
      <button
        type="button"
        @click="scrollTo('welcome')"
        class="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight hover:text-[#C86D3B] transition-colors cursor-pointer select-none leading-none"
      >
        Seduh Santai
      </button>

      <nav class="nav-links hidden lg:flex items-center gap-10 font-serif text-xl font-semibold">
        <button
          v-for="(link, i) in links"
          :key="link.id"
          type="button"
          @click="scrollTo(link.id)"
          class="roll nav-in cursor-pointer"
          :class="{ 'is-active': activeId === link.id }"
          :style="{ '--d': `${(i + 1) * 80}ms` }"
          :aria-current="activeId === link.id ? 'true' : undefined"
        >
          <span class="roll-clip">
            <span class="roll-inner">
              <span class="roll-a">{{ link.label }}</span>
              <span class="roll-b" aria-hidden="true">{{ link.label }}</span>
            </span>
          </span>
          <span class="roll-line" aria-hidden="true"></span>
        </button>
      </nav>

      <!-- Right Action CTA -->
      <div class="hidden lg:flex items-center">
        <button
          type="button"
          @click="scrollTo('reachus')"
          @mouseenter="setFillOrigin"
          @mouseleave="setFillOrigin"
          class="cta nav-in relative overflow-hidden px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors duration-200"
          :class="isSolid ? 'bg-[#FBF8F3] text-[#483227]' : 'bg-[#14110F] text-[#FBF8F3]'"
          :style="{ '--d': `${(links.length + 1) * 80}ms` }"
        >
          <span class="cta-fill" aria-hidden="true"></span>
          <span class="cta-label relative">Contact</span>
        </button>
      </div>

      <!-- Mobile Toggle -->
      <button
        type="button"
        @click="mobileMenuOpen = !mobileMenuOpen"
        class="nav-in lg:hidden relative w-10 h-10 cursor-pointer"
        :style="{ '--d': '120ms' }"
        :aria-label="mobileMenuOpen ? 'Close menu' : 'Open menu'"
        :aria-expanded="mobileMenuOpen"
      >
        <span
          class="absolute left-2 right-2 h-[2px] rounded-full bg-current transition-transform duration-300 ease-out"
          :class="mobileMenuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-[40%] -translate-y-1/2'"
        ></span>
        <span
          class="absolute left-2 right-2 h-[2px] rounded-full bg-current transition-transform duration-300 ease-out"
          :class="mobileMenuOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'top-[62%] -translate-y-1/2'"
        ></span>
      </button>
    </div>

    <!-- Mobile - full-screen -->
    <Transition name="menu">
      <div
        v-if="mobileMenuOpen"
        class="lg:hidden fixed inset-0 z-0 bg-[#483227] text-[#FBF8F3] px-6 sm:px-10 pt-28 pb-12 flex flex-col justify-center"
        data-lenis-prevent
      >
        <nav class="flex flex-col gap-4 sm:gap-5">
          <button
            v-for="(link, i) in mobileLinks"
            :key="link.id"
            type="button"
            @click="scrollTo(link.id)"
            class="menu-link w-fit text-left font-serif text-5xl sm:text-6xl font-semibold leading-[1.05] tracking-tight cursor-pointer transition-colors duration-300 hover:text-[#C86D3B]"
            :class="activeId === link.id ? 'italic font-normal text-[#C86D3B]' : 'text-[#FBF8F3]'"
            :style="{ '--i': i }"
          >
            {{ link.label }}
          </button>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
/* ---------- Entry: staggered fade + drop-in ---------- */
.nav-in {
  animation: nav-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: var(--d, 0ms);
}
@keyframes nav-in {
  from {
    opacity: 0;
    transform: translateY(-14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ---------- Links: rolling label + drawn underline ---------- */
.roll {
  position: relative;
  display: inline-flex;
  padding-bottom: 0.3rem;
  line-height: 1.3;
  color: inherit;
  transition: opacity 0.3s ease;
}
/* Tight one-line window: nothing outside it is ever painted */
.roll-clip {
  display: block;
  overflow: hidden;
}
.roll-inner {
  position: relative;
  display: block;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.roll-a {
  display: block;
}
.roll-b {
  position: absolute;
  left: 0;
  top: 100%;
  display: block;
  white-space: nowrap;
  font-style: italic;
  font-weight: 400;
  color: #c86d3b;
}
.roll:hover .roll-inner {
  transform: translateY(-100%);
}
.roll-line {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background: #c86d3b;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}
.roll:hover .roll-line,
.roll.is-active .roll-line {
  transform: scaleX(1);
  transform-origin: left;
}

/* Hovering one link dims its siblings */
.nav-links:hover .roll:not(:hover) {
  opacity: 0.4;
}

/* ---------- Contact: fill blooms from the cursor entry point ---------- */
.cta-fill {
  position: absolute;
  left: var(--x, 50%);
  top: var(--y, 50%);
  width: 16rem;
  aspect-ratio: 1;
  border-radius: 9999px;
  background: #c86d3b;
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
}
.cta:hover .cta-fill {
  transform: translate(-50%, -50%) scale(1);
}
.cta-label {
  transition: color 0.3s ease 0.08s;
}
.cta:hover .cta-label {
  color: #fbf8f3;
}

/* ---------- Mobile overlay ---------- */
.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.35s ease;
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}
.menu-link {
  transition:
    transform 0.7s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
    color 0.3s ease;
  transition-delay: calc(var(--i) * 70ms + 120ms), calc(var(--i) * 70ms + 120ms), 0s;
}
.menu-enter-from .menu-link {
  opacity: 0;
  transform: translateY(44px);
}
.menu-leave-to .menu-link {
  transition-delay: 0s;
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .nav-in {
    animation: none;
  }
  .roll-inner,
  .roll-line,
  .cta-fill,
  .menu-link {
    transition-duration: 0.01ms;
    transition-delay: 0s;
  }
}
</style>
