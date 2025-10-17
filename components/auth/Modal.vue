<!-- ================================ -->
<!-- components/auth/Modal.vue -->
<!-- ================================ -->
<template>
  <div
    class="fixed inset-0 modal-overlay flex items-center justify-center z-50"
    @click="$emit('close')"
  >
    <div
      class="modal-content rounded-lg shadow-2xl p-8 max-w-md w-full mx-4 bg-white"
      @click.stop
    >
      <div class="flex justify-between items-start mb-4">
        <h2 class="text-2xl font-bold text-dark-gray">{{ title }}</h2>
        <button
          @click="$emit('close')"
          class="text-2xl font-bold hover:opacity-70 text-light-gray"
        >
          ×
        </button>
      </div>
      <p class="text-base mb-6 text-dark-gray">{{ message }}</p>
      <button
        @click="$emit('close')"
        class="btn-primary w-full py-3 rounded-lg font-bold text-base"
      >
        Close
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

defineEmits(["close"]);
</script>
