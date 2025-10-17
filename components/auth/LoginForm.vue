<!-- ================================ -->
<!-- components/auth/LoginForm.vue -->
<!-- ================================ -->
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
          required
          placeholder="Enter your email"
          class="input-field w-full px-4 py-3 rounded-lg text-base"
        />
      </div>

      <!-- Password Input -->
      <div class="mb-6">
        <label for="password" class="block text-sm font-semibold mb-2 text-dark-gray">
          Password
        </label>
        <input
          v-model="formData.password"
          type="password"
          id="password"
          required
          placeholder="Enter your password"
          class="input-field w-full px-4 py-3 rounded-lg text-base"
        />
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
        class="btn-primary w-full py-3 rounded-lg font-bold text-lg shadow-lg"
      >
        Sign In
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
    @close="closeModal"
  />
</template>

<script setup>
import { reactive } from "vue";

// Form data
const formData = reactive({
  email: "",
  password: "",
  rememberMe: false,
});

// Modal state
const modal = reactive({
  isOpen: false,
  title: "",
  message: "",
});

// Methods
const handleLogin = () => {
  if (formData.email && formData.password) {
    showModal(
      "Login Successful",
      `Welcome back! You are now signed in as ${formData.email}`
    );

    // Reset form
    formData.email = "";
    formData.password = "";
    formData.rememberMe = false;

    // Here you can add your actual login logic
    // Example: await $fetch('/api/auth/login', { method: 'POST', body: formData })
  }
};

const showModal = (title, message) => {
  modal.title = title;
  modal.message = message;
  modal.isOpen = true;
};

const closeModal = () => {
  modal.isOpen = false;
};
</script>
