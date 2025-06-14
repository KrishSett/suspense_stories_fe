<template>
    <header class="bg-white dark:bg-gray-900 shadow-sm">
        <div class="mx-auto px-4 py-3 flex justify-between items-center">
            <!-- Left side - Title/Logo -->
            <div class="flex items-center space-x-2">
                <h1 class="text-xl font-bold text-gray-800 dark:text-white">
                    My Awesome Site
                </h1>
            </div>

            <!-- Right side - Navigation -->
            <nav class="hidden md:block">
                <ul class="flex space-x-6">
                    <li v-for="(item, index) in navItems" :key="index" class="relative group">
                        <NuxtLink :to="item.path"
                            class="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                            {{ item.label }}
                        </NuxtLink>

                        <!-- Dropdown menu -->
                        <div v-if="item.children"
                            class="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                            <NuxtLink v-for="(child, childIndex) in item.children" :key="childIndex" :to="child.path"
                                class="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                                {{ child.label }}
                            </NuxtLink>
                        </div>
                    </li>
                </ul>
            </nav>

            <!-- Mobile menu button -->
            <button class="md:hidden text-gray-600 dark:text-gray-300">
                <UIcon name="i-heroicons-bars-3" class="w-6 h-6" />
            </button>
        </div>
    </header>
</template>

<script setup>
const navItems = [
    {
        label: 'Home',
        path: '/'
    },
    {
        label: 'Products',
        path: '/products',
        children: [
            { label: 'All Products', path: '/products' },
            { label: 'Featured', path: '/products/featured' }
        ]
    },
    {
        label: 'About',
        path: '/page/about'
    },
    {
        label: 'Contact',
        path: '/page/contact'
    }
]
</script>