<!--components/auth/ResetPasswordForm.vue -->
<template>
  <div class="rounded-lg shadow-2xl p-8 bg-white w-full max-w-md mx-auto">
    <div class="text-center mb-8">
      <h2 class="text-3xl font-bold mb-2 text-dark-gray">Reset Password</h2>
      <p class="text-lg text-light-gray">Enter your new password below.</p>
    </div>
      
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Hidden Reset Token -->
      <input type="hidden" v-model="formData.reset_token" />

      <!-- New Password Input -->
      <div class="mb-6">
        <label for="password" class="block text-sm font-semibold mb-2 text-dark-gray">
          New Password
        </label>
        <div class="relative">
          <input
            id="password"
            v-model="formData.password"
            :type="showPassword ? 'text' : 'password'"
            required
            placeholder="Enter new password"
            class="input-field w-full px-4 py-3 rounded-lg text-base pr-12"
            :class="{ 'border-red-500': errors.password }"
            :disabled="loading"
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-600"
            :disabled="loading"
          >
            <svg
              v-if="showPassword"
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <svg
              v-else
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
              />
            </svg>
          </button>
        </div>
        <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
        <p class="text-xs text-light-gray mt-1">Must be at least 8 characters long</p>
      </div>

      <!-- Confirm Password Input -->
      <div class="mb-6">
        <label for="confirmPassword" class="block text-sm font-semibold mb-2 text-dark-gray">
          Confirm Password
        </label>
        <div class="relative">
          <input
            id="confirmPassword"
            v-model="formData.confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            required
            placeholder="Confirm new password"
            class="input-field w-full px-4 py-3 rounded-lg text-base pr-12"
            :class="{ 'border-red-500': errors.confirmPassword }"
            :disabled="loading"
          />
          <button
            type="button"
            @click="showConfirmPassword = !showConfirmPassword"
            class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-600"
            :disabled="loading"
          >
            <svg
              v-if="showConfirmPassword"
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <svg
              v-else
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
              />
            </svg>
          </button>
        </div>
        <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">{{ errors.confirmPassword }}</p>
      </div>

      <!-- Password Strength Indicator -->
      <div v-if="formData.password" class="mb-6">
        <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div 
            class="h-2 rounded-full transition-all duration-300" 
            :class="strengthClass"
            :style="{ width: strengthPercent + '%' }"
          ></div>
        </div>
        <p class="text-sm font-medium" :class="strengthTextClass">{{ strengthText }}</p>
      </div>

      <!-- Success Message -->
      <div v-if="successMessage" class="p-4 mb-4 rounded-lg bg-green-50 border border-green-200 flex items-center">
        <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="text-green-700 text-sm">{{ successMessage }}</span>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="p-4 mb-4 rounded-lg bg-red-50 border border-red-200 flex items-center">
        <svg class="h-5 w-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        <span class="text-red-700 text-sm">{{ errorMessage }}</span>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="loading"
        class="btn-primary w-full py-3 rounded-lg font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="loading" class="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
        {{ loading ? 'Resetting...' : 'Reset Password' }}
      </button>

      <!-- Back to Login -->
      <div class="text-center pt-4">
        <NuxtLink to="/auth/login" class="link-text font-bold inline-flex items-center">
          <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Login
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup>
const route = useRoute();

const formData = ref({
  reset_token: route.query.token || '',
  password: '',
  confirmPassword: ''
});

const errors = ref({});
const loading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);

// Password strength calculator
const passwordStrength = computed(() => {
  const password = formData.value.password;
  if (!password) return 0;
  
  let strength = 0;
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^a-zA-Z\d]/.test(password)) strength++;
  
  return strength;
});

const strengthPercent = computed(() => (passwordStrength.value / 5) * 100);

const strengthClass = computed(() => {
  const strength = passwordStrength.value;
  if (strength <= 1) return 'bg-red-500';
  if (strength <= 3) return 'bg-yellow-500';
  return 'bg-green-500';
});

const strengthTextClass = computed(() => {
  const strength = passwordStrength.value;
  if (strength <= 1) return 'text-red-600';
  if (strength <= 3) return 'text-yellow-600';
  return 'text-green-600';
});

const strengthText = computed(() => {
  const strength = passwordStrength.value;
  if (strength === 0) return '';
  if (strength <= 1) return 'Weak password';
  if (strength <= 3) return 'Medium password';
  return 'Strong password';
});

// Check if token exists in URL
onMounted(() => {
  if (!formData.value.reset_token) {
    errorMessage.value = 'Invalid or missing reset token. Please request a new password reset link.';
  }
});

const validateForm = () => {
  errors.value = {};

  if (!formData.value.password) {
    errors.value.password = 'Password is required';
    return false;
  }

  if (formData.value.password.length < 8) {
    errors.value.password = 'Password must be at least 8 characters long';
    return false;
  }

  if (!formData.value.confirmPassword) {
    errors.value.confirmPassword = 'Please confirm your password';
    return false;
  }

  if (formData.value.password !== formData.value.confirmPassword) {
    errors.value.confirmPassword = 'Passwords do not match';
    return false;
  }

  return true;
};

const handleSubmit = async () => {
  successMessage.value = '';
  errorMessage.value = '';

  if (!validateForm()) {
    return;
  }

  if (!formData.value.reset_token) {
    errorMessage.value = 'Invalid reset token';
    return;
  }

  loading.value = true;

  try {
    // TODO: Replace with your actual API call
    const response = await $fetch('/api/auth/reset-password', {
      method: 'POST',
      body: {
        reset_token: formData.value.reset_token,
        password: formData.value.password,
        confirm_password: formData.value.confirmPassword
      }
    });

    successMessage.value = 'Password has been reset successfully! Redirecting to login...';
    
    // Clear form
    formData.value.password = '';
    formData.value.confirmPassword = '';

    // Redirect to login after success
    setTimeout(() => {
      navigateTo('/auth/login');
    }, 2000);

  } catch (error) {
    errorMessage.value = error.data?.message || 'Failed to reset password. The link may have expired.';
  } finally {
    loading.value = false;
  }
};
</script>

