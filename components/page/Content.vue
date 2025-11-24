<template>
    <div class="page-content-wrapper">
        <!-- Loading State -->
        <div v-if="loading">
            <AuthPageLoader></AuthPageLoader>
        </div>

        <!-- Page Content -->
        <div v-else-if="pageContent" class="page-content" v-html="pageContent"></div>
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
const pageContent = ref(null);

const fetchPage = async () => {
    loading.value = true;

    try {
        const response = await pageService.getPageBySlug(props.slug);
        
        if (!response.success) {
            throw new Error(response.message || 'Page not found');
        }
        
        pageContent.value = response.sanitizedContent || response.data?.page;
        
    } catch (err) {
        // Show error page for any error
        showError({
            statusCode: err.statusCode || err.status || 404,
            statusMessage: err.statusMessage || err.message || 'Page not found',
            message: 'The page you are looking for could not be found.'
        });
    } finally {
        loading.value = false;
    }
};

// Fetch page on mount
onMounted(async () => {
    await fetchPage();
});
</script>