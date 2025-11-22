<template>
    <div class="page-content-wrapper">
        <!-- Loading State -->
        <div v-if="loading" class="page-loading">
            <div class="flex flex-col items-center justify-center min-h-64">
                <div class="spinner"></div>
                <p class="text-light-gray text-load mt-4">Loading Page</p>
            </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="page-error">
        <div class="alert alert-error">
            <svg class="alert-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
            ></path>
            </svg>
            {{ error }}
        </div>
        </div>

        <!-- Page Content -->
        <div v-else class="page-content" v-html="pageContent"></div>
    </div>
</template>

<script setup>
import { pageService } from '~/services/PageService';

const props = defineProps({
    slug: {
    type: String,
    required: true
    }
});

const loading = ref(true);
const error = ref(null);
const pageContent = ref(null);

const fetchPage = async () => {
    loading.value = true;
    error.value = null;

    try {
        const response = await pageService.getPageBySlug(props.slug);
        
        if (response.success) {
        pageContent.value = response.sanitizedContent || response.data?.page;
        } else {
        error.value = response.message || 'Failed to load page content';
        }
    } catch (err) {
        error.value = err.message || 'An error occurred while loading the page';
    } finally {
        loading.value = false;
    }
};

// Fetch page on mount - await the async function
onMounted(async () => {
  await fetchPage();
});

</script>