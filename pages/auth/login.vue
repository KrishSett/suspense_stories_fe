<template>
  <div class="w-full max-w-md px-6">
    <AuthLoginForm></AuthLoginForm>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "auth",
  middleware: "guest"
});
</script>
