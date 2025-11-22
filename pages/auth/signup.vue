<template>
  <div class="w-half max-w-xl-md px-6">
    <AuthSignupForm></AuthSignupForm>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "auth",
  middleware: "guest"
});
</script>
