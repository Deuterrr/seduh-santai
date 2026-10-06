<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Welcome from './components/Welcome.vue'
import WhyUsHooks from './components/WhyUsHooks.vue'
import YearShowcase from './components/YearShowcase.vue'
import CafeShowcase from './components/CafeShowcase.vue'
import ProductCarousel from './components/ProductCarousel.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen bg-[#FBF8F3] text-[#14110F]">
    <!-- Full-Width Warm Coffee Brown Navigation -->
    <Navbar />

    <main class="flex flex-col">
      <!-- Welcome / Hero -->
      <section id="welcome">
        <Welcome />
      </section>

      <!-- Why Choose Us Hooks (Directly Below Hero) -->
      <section id="why-us">
        <WhyUsHooks />
      </section>

      <!-- Our Story -->
      <section id="story">
        <YearShowcase />
      </section>

      <!-- Our Café -->
      <section id="cafe">
        <CafeShowcase />
      </section>

      <!-- Our Lineup -->
      <section id="lineup">
        <ProductCarousel />
      </section>
    </main>

    <!-- Footer -->
    <section id="reachus">
      <Footer />
    </section>
  </div>
</template>
