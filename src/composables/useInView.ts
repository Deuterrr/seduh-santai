import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function useInView(
  targetRef: Ref<HTMLElement | null>,
  options: UseInViewOptions = {}
) {
  const isRevealed = ref(false)
  let observer: IntersectionObserver | null = null

  const { threshold = 0.15, rootMargin = '0px 0px -8% 0px', once = true } = options

  onMounted(() => {
    if (!targetRef.value) return

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isRevealed.value = true
          if (once && observer && targetRef.value) {
            observer.unobserve(targetRef.value)
            observer.disconnect()
          }
        } else if (!once) {
          isRevealed.value = false
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(targetRef.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { isRevealed }
}
