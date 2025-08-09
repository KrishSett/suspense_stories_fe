<template>
    <div class="grid place-items-center min-h-screen">
        <div class="text-center">
            <h1 class="text-4xl font-bold text-red-600 mb-4">Error</h1>
            <p class="text-xl mb-6">{{ errorMessage }}</p>
            <NuxtLink to="/" class="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
                Return Home
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
const route        = useRoute();
const errorMessage = computed(() => route.query.message || 'An error occurred');
</script>