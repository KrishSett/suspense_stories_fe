<template>
  <div class="auth-form-container">
    <div class="auth-card">
      <div class="auth-header">
        <h2 class="auth-title">Forgot Password</h2>
        <p class="auth-subtitle">Enter your email address and we'll send you a link to reset your password.</p>
      </div>
      
      <form @submit.prevent="handleSubmit" class="auth-form">
        <!-- Email Input -->
        <div class="form-group">
          <label for="email" class="form-label">Email Address</label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            required
            placeholder="Enter your email"
            class="form-input"
            :class="{ 'input-error': errors.email }"
            :disabled="loading"
          />
          <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
        </div>

        <!-- Success Message -->
        <div v-if="successMessage" class="alert alert-success">
          <svg class="alert-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          {{ successMessage }}
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="alert alert-error">
          <svg class="alert-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          {{ errorMessage }}
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="loading"
          class="btn-primary w-full py-3 rounded-lg font-bold text-lg shadow-lg"
        >
          <span v-if="loading" class="btn-spinner"></span>
          {{ loading ? 'Sending...' : 'Send Reset Link' }}
        </button>

        <!-- Back to Login -->
        <div class="auth-footer">
          <NuxtLink to="/auth/login" class="link-primary">
            <svg class="link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Login
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const formData = ref({
  email: ''
});

const errors = ref({});
const loading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const handleSubmit = async () => {
  errors.value = {};
  successMessage.value = '';
  errorMessage.value = '';

  if (!formData.value.email) {
    errors.value.email = 'Email is required';
    return;
  }

  if (!validateEmail(formData.value.email)) {
    errors.value.email = 'Please enter a valid email address';
    return;
  }

  loading.value = true;

  try {
    const response = await $fetch('/api/auth/forgot-password', {
      method: 'POST',
      body: {
        email: formData.value.email
      }
    });

    successMessage.value = 'Password reset link has been sent to your email address.';
    formData.value.email = '';

    setTimeout(() => {
      navigateTo('/auth/login');
    }, 3000);

  } catch (error) {
    errorMessage.value = error.data?.message || 'Failed to send reset link. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>
