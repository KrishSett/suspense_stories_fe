<template>
  <div class="auth-form-container">
    <div class="auth-card">
      <div class="auth-header">
        <h2 class="auth-title">Reset Password</h2>
        <p class="auth-subtitle">Enter your new password below.</p>
      </div>
      
      <form @submit.prevent="handleSubmit" class="auth-form">
        <!-- Hidden Reset Token -->
        <input type="hidden" v-model="formData.reset_token" />

        <!-- New Password Input -->
        <div class="form-group">
          <label for="password" class="form-label">New Password</label>
          <div class="input-wrapper">
            <input
              id="password"
              v-model="formData.password"
              :type="showPassword ? 'text' : 'password'"
              required
              placeholder="Enter new password"
              class="form-input"
              :class="{ 'input-error': errors.password }"
              :disabled="loading"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="password-toggle"
              :disabled="loading"
            >
              <svg v-if="showPassword" class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
              <svg v-else class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
              </svg>
            </button>
          </div>
          <p v-if="errors.password" class="error-message">{{ errors.password }}</p>
          <p class="input-hint">Must be at least 8 characters long</p>
        </div>

        <!-- Confirm Password Input -->
        <div class="form-group">
          <label for="confirmPassword" class="form-label">Confirm Password</label>
          <div class="input-wrapper">
            <input
              id="confirmPassword"
              v-model="formData.confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              required
              placeholder="Confirm new password"
              class="form-input"
              :class="{ 'input-error': errors.confirmPassword }"
              :disabled="loading"
            />
            <button
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="password-toggle"
              :disabled="loading"
            >
              <svg v-if="showConfirmPassword" class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
              <svg v-else class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
              </svg>
            </button>
          </div>
          <p v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</p>
        </div>

        <!-- Password Strength Indicator -->
        <div v-if="formData.password" class="password-strength">
          <div class="strength-bar">
            <div 
              class="strength-fill" 
              :class="strengthClass"
              :style="{ width: strengthPercent + '%' }"
            ></div>
          </div>
          <p class="strength-text" :class="strengthClass">{{ strengthText }}</p>
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
          class="btn btn-primary"
        >
          <span v-if="loading" class="btn-spinner"></span>
          {{ loading ? 'Resetting...' : 'Reset Password' }}
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
  if (strength <= 1) return 'strength-weak';
  if (strength <= 3) return 'strength-medium';
  return 'strength-strong';
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