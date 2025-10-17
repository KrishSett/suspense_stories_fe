<template>
  <div>
    <p>This is home page</p>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});
</script>
