<template>
	<div class="w-half max-w-xl-md px-6">
		<PageContent :slug="slug" />
	</div>
</template>

<script setup>
const route = useRoute();
const slug = computed(() => route.params.slug);

// Set page meta
useHead({
	title: `${slug.value} | Your Site Name`,
});

definePageMeta({
	layout: "auth"
});
</script>

