<template>
    <div class="min-h-screen flex flex-col">
        <AppHeader />

        <main class="flex-grow">
            <slot />
        </main>

        <AppFooter />
    </div>
</template>

<script setup>
// Components will be auto-imported
</script>