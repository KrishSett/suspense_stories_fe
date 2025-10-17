<!-- layouts/auth.vue -->
<template>
  <div class="min-h-screen flex flex-col bg-dark-gray">
    <!-- Auth Navbar -->
    <AuthNavbar />

    <!-- Main Content Area -->
    <main class="flex-grow flex items-center justify-center">
      <slot />
    </main>

    <!-- Optional Footer for Auth Pages -->
    <AuthFooter />
  </div>
</template>

<script setup>
// Components will be auto-imported from components/auth/
</script>

<style scoped>
.bg-dark-gray {
  background-color: #d2d6dc;
}
</style>
