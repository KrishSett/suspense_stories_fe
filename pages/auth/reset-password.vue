<template>
  <div class="w-full max-w-xl px-6">
    <AuthResetPasswordForm></AuthResetPasswordForm>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "auth",
  middleware: "guest"
});
</script>