import { onMounted, onUnmounted, type Ref } from 'vue'

export interface UseParallaxOptions {
  speed?: number
  maxOffset?: number
}

export function useParallax(
  targetRef: Ref<HTMLElement | null>,
  options: UseParallaxOptions = {}
) {
  const { speed = 0.1, maxOffset = 50 } = options
  let rafId: number | null = null
  let reduceMotion = false

  const update = (): void => {
    rafId = null
    const el = targetRef.value
    if (!el || reduceMotion) return

    const rect = el.getBoundingClientRect()
    const windowHeight = window.innerHeight

    if (rect.bottom < -100 || rect.top > windowHeight + 100) return

    const elementCenter = rect.top + rect.height / 2
    const viewportCenter = windowHeight / 2
    const distance = elementCenter - viewportCenter
    const rawOffset = -distance * speed
    const offset = Math.max(-maxOffset, Math.min(maxOffset, rawOffset))

    el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`
  }

  const onScroll = (): void => {
    if (rafId === null) {
      rafId = requestAnimationFrame(update)
    }
  }

  onMounted(() => {
    reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduceMotion) {
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll, { passive: true })
      update()
    }
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
    if (rafId !== null) cancelAnimationFrame(rafId)
  })
}
