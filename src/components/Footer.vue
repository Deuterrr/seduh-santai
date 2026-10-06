<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Youtube, Instagram } from 'lucide-vue-next'
import photoFooter from '@/assets/cafe/cafe-outdoor.jpeg'
import { useInView } from '@/composables/useInView'
import { useParallax } from '@/composables/useParallax'

interface ContactForm {
  name: string
  email: string
  message: string
}

const form = reactive<ContactForm>({
  name: '',
  email: '',
  message: '',
})

const footerRef = ref<HTMLElement | null>(null)
const { isRevealed } = useInView(footerRef)

const footerPhotoRef = ref<HTMLElement | null>(null)
useParallax(footerPhotoRef, { speed: 0.1, maxOffset: 40 })

const status = ref<string>('')
const isSubmitting = ref<boolean>(false)

const handleSubmit = async (): Promise<void> => {
  status.value = 'Sending...'
  isSubmitting.value = true

  try {
    const res = await fetch('http://localhost:5000/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      status.value = 'Message sent successfully.'
      form.name = ''
      form.email = ''
      form.message = ''
    } else {
      status.value = 'Failed to send message.'
    }
  } catch (_err: unknown) {
    status.value = 'Error sending message.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <footer
    ref="footerRef"
    class="bg-[#FBF8F3] text-[#14110F] pt-24 pb-16 mt-16"
  >
    <div class="px-6 sm:px-10 md:px-16 lg:px-20 max-w-[1440px] mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 lg:items-end">
        <!-- Left: Brand & Info -->
        <div class="lg:col-span-5 flex flex-col justify-between gap-8">
          <div class="flex flex-col gap-4">
            <h3 class="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#14110F] leading-none">
              <span class="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                <span
                  class="block transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
                  :class="isRevealed ? 'translate-y-0' : 'translate-y-[115%] motion-reduce:translate-y-0'"
                >
                  Seduh Santai
                </span>
              </span>
            </h3>
            <p
              class="text-sm sm:text-base text-[#756C65] leading-relaxed max-w-sm transition-all duration-1000 delay-200 ease-out motion-reduce:transition-none"
              :class="isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 motion-reduce:opacity-100 motion-reduce:translate-y-0'"
            >
              One cup, countless stories. Sit back, sip, and let the moment brew.
            </p>

            <!-- Social Links -->
            <div
              class="flex items-center gap-3 pt-2 transition-all duration-1000 delay-300 ease-out motion-reduce:transition-none"
              :class="isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 motion-reduce:opacity-100 motion-reduce:translate-y-0'"
            >
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 px-4 py-2 rounded-full border border-[#14110F]/15 text-xs uppercase tracking-wider text-[#14110F] hover:bg-[#14110F] hover:text-[#FBF8F3] transition"
              >
                <Youtube :size="14" />
                <span>YouTube</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 px-4 py-2 rounded-full border border-[#14110F]/15 text-xs uppercase tracking-wider text-[#14110F] hover:bg-[#14110F] hover:text-[#FBF8F3] transition"
              >
                <Instagram :size="14" />
                <span>Instagram</span>
              </a>
            </div>
          </div>

          <!-- Cafe Photo Frame -->
          <div
            class="relative rounded-2xl overflow-hidden aspect-[16/9] max-w-md bg-[#F3ECE2] shadow-sm transition-all duration-1000 delay-250 ease-out motion-reduce:transition-none"
            :class="isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 motion-reduce:opacity-100 motion-reduce:translate-y-0'"
          >
            <div ref="footerPhotoRef" class="w-full h-full scale-110 will-change-transform">
              <img
                :src="photoFooter"
                alt="Outdoor sanctuary"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <!-- Right: Contact Form -->
        <div
          class="lg:col-span-7 flex flex-col justify-end gap-6 transition-all duration-1000 delay-200 ease-out motion-reduce:transition-none"
          :class="isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 motion-reduce:opacity-100 motion-reduce:translate-y-0'"
        >
          <h4 class="text-2xl font-bold text-[#14110F]">
            Reach Us
          </h4>

          <form @submit.prevent="handleSubmit" class="flex flex-col gap-6 max-w-lg">
            <div>
              <input
                v-model="form.name"
                type="text"
                name="name"
                placeholder="Full Name"
                required
                class="w-full pb-3 bg-transparent border-b border-[#14110F]/20 focus:border-[#C86D3B] text-sm text-[#14110F] placeholder:text-[#756C65]/60 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <input
                v-model="form.email"
                type="email"
                name="email"
                placeholder="Email Address"
                required
                class="w-full pb-3 bg-transparent border-b border-[#14110F]/20 focus:border-[#C86D3B] text-sm text-[#14110F] placeholder:text-[#756C65]/60 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <textarea
                v-model="form.message"
                name="message"
                placeholder="Your Message"
                rows="3"
                required
                class="w-full pb-3 bg-transparent border-b border-[#14110F]/20 focus:border-[#C86D3B] text-sm text-[#14110F] placeholder:text-[#756C65]/60 focus:outline-none transition-colors resize-none"
              ></textarea>
            </div>

            <div class="flex items-center gap-4 pt-2">
              <button
                type="submit"
                :disabled="isSubmitting"
                class="px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#14110F] hover:bg-[#C86D3B] text-[#FBF8F3] transition cursor-pointer disabled:opacity-50"
              >
                {{ isSubmitting ? 'Sending...' : 'Send Message' }}
              </button>

              <span v-if="status" class="text-xs text-[#756C65]">
                {{ status }}
              </span>
            </div>
          </form>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#756C65]">
        <span>© 2025 Seduh Santai. All rights reserved.</span>
        <span>Est. 2024 · Jakarta · Bandung · Bekasi</span>
      </div>
    </div>
  </footer>
</template>
