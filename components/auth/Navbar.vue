<!-- ================================ -->
<!-- components/auth/Navbar.vue -->
<!-- ================================ -->
<template>
  <nav class="bg-white shadow-md">
    <div class="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo/Brand -->
        <div class="flex-shrink-0">
          <NuxtLink to="/" class="flex items-center">
            <span class="text-2xl font-bold text-dark-gray"> {{ appTitle }} </span>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-4">
          <NuxtLink
            to="/auth/login"
            class="nav-link px-4 py-2 rounded-lg text-base font-semibold"
          >
            Login
          </NuxtLink>
          <NuxtLink
            to="/auth/signup"
            class="btn-primary px-6 py-2 rounded-lg text-base font-bold"
          >
            Sign Up
          </NuxtLink>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <button
            @click="toggleMobileMenu"
            class="text-dark-gray hover:text-purple focus:outline-none"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                v-if="!isMobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="isMobileMenuOpen" class="md:hidden pb-4 mobile-menu">
        <div class="flex flex-col space-y-2">
          <NuxtLink
            to="/auth/login"
            class="nav-link px-4 py-2 rounded-lg text-base font-semibold text-center"
            @click="closeMobileMenu"
          >
            Login
          </NuxtLink>
          <NuxtLink
            to="/auth/signup"
            class="btn-primary px-6 py-2 rounded-lg text-base font-bold text-center"
            @click="closeMobileMenu"
          >
            Sign Up
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";

const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

const { appTitle, apiBaseUrl } = useConfig();
</script>
