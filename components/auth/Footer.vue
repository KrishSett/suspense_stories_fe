<!-- ================================ -->
<!-- components/auth/Footer.vue -->
<!-- ================================ -->
<template>
  <footer class="bg-white border-t border-light-gray py-6">
    <div class="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <!-- Copyright -->
        <p class="text-sm text-light-gray mb-4 md:mb-0">
          © {{ currentYear }} {{ appTitle }}. All rights reserved.
        </p>

        <!-- Links -->
        <div class="flex space-x-6">
          <a href="#" class="footer-link text-sm">Privacy Policy</a>
          <a href="#" class="footer-link text-sm">Terms of Service</a>
          <a href="#" class="footer-link text-sm">Contact</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from "vue";
const currentYear = computed(() => new Date().getFullYear());
const { appTitle, apiBaseUrl } = useConfig();
</script>
