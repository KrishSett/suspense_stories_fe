<template>
  <div class="grid place-items-center min-h-screen bg-dark-gray">
    <div class="text-center">
      <h1 class="text-3xl font-bold text-error mb-4">
        Oops! Could Not Find What You're Looking For
      </h1>
      <p class="text-2xl mb-6 text-dark-gray">{{ errorMessage }}</p>
      <NuxtLink
        to="/"
        class="btn-primary px-6 py-3 rounded-lg font-bold text-base shadow-lg"
      >
        Go Home
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const error = useError();

const errorMessage = computed(() => {
  if (!error.value) return "An error occurred";
  
  const statusCode = error.value.statusCode;
  const message = error.value.message;
  
  if (statusCode === 404) {
    return "The page you're looking for doesn't exist.";
  }
  
  return message || "An unexpected error occurred";
});
</script>

<style scoped>
.bg-dark-gray {
  background-color: #d2d6dc;
}
</style>
