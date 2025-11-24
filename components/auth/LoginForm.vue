<template>
  <div class="rounded-lg shadow-2xl p-8 bg-white">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold mb-2 text-dark-gray">Welcome Back</h1>
      <p class="text-lg text-light-gray">Sign in to your account</p>
    </div>

    <!-- Login Form -->
    <form @submit.prevent="handleLogin">
      <!-- Email Input -->
      <div class="mb-6">
        <label for="email" class="block text-sm font-semibold mb-2 text-dark-gray">
          Email Address
        </label>
        <input
          v-model="formData.email"
          type="email"
          id="email"
          placeholder="Enter your email"
          class="input-field w-full px-4 py-3 rounded-lg text-base"
        />
      </div>

      <!-- Password Input -->
      <div class="mb-6">
        <label for="password" class="block text-sm font-semibold mb-2 text-dark-gray">
          Password
        </label>
        <div class="relative">
          <input
            v-model="formData.password"
            :type="showPassword ? 'text' : 'password'"
            id="password"
            placeholder="Enter your password"
            class="input-field w-full px-4 py-3 pr-12 rounded-lg text-base"
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-600"
          >
            <svg
              v-if="showPassword"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="p-4 mb-4 rounded-lg bg-red-50 border border-red-200 flex items-center">
        <svg class="h-5 w-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        <span class="text-red-700 text-sm">{{ errorMessage }}</span>
      </div>

      <!-- Remember Me & Forgot Password -->
      <div class="flex items-center justify-between mb-6">
        <label class="flex items-center cursor-pointer">
          <input
            v-model="formData.rememberMe"
            type="checkbox"
            class="w-4 h-4 rounded border-2 cursor-pointer checkbox-custom"
          />
          <span class="ml-2 text-sm text-dark-gray">Remember me</span>
        </label>
        <NuxtLink to="/auth/forgot-password" class="text-sm link-text font-semibold">
          Forgot Password?
        </NuxtLink>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="btn-primary w-full py-3 rounded-lg font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        :disabled="isSigning"
      >
        {{ isSigning ? 'Signing In...' : 'Sign In' }}
      </button>
    </form>

    <!-- Divider -->
    <div class="flex items-center my-6">
      <div class="flex-1 h-px bg-light-gray"></div>
      <span class="px-4 text-sm text-light-gray">OR</span>
      <div class="flex-1 h-px bg-light-gray"></div>
    </div>

    <!-- Sign Up Link -->
    <div class="text-center">
      <p class="text-base text-dark-gray">
        Don't have an account?
        <NuxtLink to="/auth/signup" class="link-text font-bold"> Sign Up </NuxtLink>
      </p>
    </div>
  </div>

  <!-- Modal Popup -->
  <AuthModal
    v-if="modal.isOpen"
    :title="modal.title"
    :message="modal.message"
    :type="modal.type"
    @close="closeModal"
  />
</template>

<script setup>
// Import of auth service file
import { authService } from '~/services/AuthService';
// Use the modal composable
const { modal, showSuccess, showError, closeModal } = useModal();

// Form data
const formData = reactive({
  type: "user",
  email: "",
  password: "",
  rememberMe: false,
});

// Password visibility
const showPassword = ref(false);

// Error message
const errorMessage = ref('');

// Singin flag
const isSigning = ref(false);

// Add this validation function
const validateForm = () => {
  if (!formData.email.trim()) {
    return "Email is required";
  }
  
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    return "Please enter a valid email address";
  }
  
  if (!formData.password) {
    return "Password is required";
  }
  
  return null;
};

// Methods
  const handleLogin = async () => {
    // Clear previous errors
    errorMessage.value = '';
    isSigning.value = true;
  
    // Basic validation
    const validationError  = validateForm()
    if (validationError) {
      errorMessage.value = validationError || 'Form data is not valid';
      isSigning.value = false;
      return;
    }

    try {
      const response = await authService.login(formData);
    
      if (!response.success) {
        throw new Error(response.message || 'Login failed');
      }
    
      // Add slight delay for better UX
      setTimeout(() => {
        navigateTo("/");
      }, 1000);
    
    } catch (err) {
      errorMessage.value = err.message || "Login failed, please try again";
    
      // Clear password from form
      formData.password = "";
    } finally {
      isSigning.value = false;
    }
  };
</script>