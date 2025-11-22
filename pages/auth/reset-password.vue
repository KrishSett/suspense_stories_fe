<template>
  <div class="w-half max-w-2xl px-6">
    <AuthResetPasswordForm></AuthResetPasswordForm>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "auth",
  middleware: "guest"
});
</script>