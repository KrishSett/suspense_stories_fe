<!-- components/auth/SignupForm.vue -->
<template>
  <div class="rounded-lg shadow-2xl p-6 bg-white">
    <!-- Header -->
    <div class="text-center mb-6">
      <h1 class="text-3xl font-bold mb-2 text-dark-gray">Create Account</h1>
      <p class="text-md text-light-gray">Sign up to get started</p>
    </div>

    <!-- Signup Form -->
    <form @submit.prevent="handleSignup">
      <!-- Row 1: First Name & Last Name -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <!-- First Name Input -->
        <div>
          <label for="firstname" class="block text-sm font-semibold mb-2 text-dark-gray">
            First Name
          </label>
          <input
            v-model="formData.firstname"
            type="text"
            id="firstname"
            required
            placeholder="Enter first name"
            class="input-field w-full px-4 py-3 rounded-lg text-base"
          />
          <div v-if="errors.firstname" class="text-red-500 text-xs mt-1">
            {{ errors.firstname }}
          </div>
        </div>

        <!-- Last Name Input -->
        <div>
          <label for="lastname" class="block text-sm font-semibold mb-2 text-dark-gray">
            Last Name
          </label>
          <input
            v-model="formData.lastname"
            type="text"
            id="lastname"
            required
            placeholder="Enter last name"
            class="input-field w-full px-4 py-3 rounded-lg text-base"
          />
          <div v-if="errors.lastname" class="text-red-500 text-xs mt-1">
            {{ errors.lastname }}
          </div>
        </div>
      </div>

      <!-- Email Input -->
      <div class="mb-4">
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
        <div v-if="errors.email" class="text-red-500 text-xs mt-1">
          {{ errors.email }}
        </div>
      </div>

      <!-- Phone Input -->
      <div class="mb-4">
        <label for="phone" class="block text-sm font-semibold mb-2 text-dark-gray">
          Phone Number
        </label>
        <div class="flex">
          <div class="flex items-center justify-center px-4 py-3 rounded-l-lg border-2 border-r-0 border-light-gray bg-gray-50 text-dark-gray text-base">
            +91
          </div>
          <input
            v-model="formData.phone"
            type="tel"
            id="phone"
            required
            placeholder="9078456121"
            pattern="[0-9]{10}"
            class="input-field w-full px-4 py-3 rounded-r-lg rounded-l-none text-base"
          />
        </div>
        <div v-if="errors.phone" class="text-red-500 text-xs mt-1">
          {{ errors.phone }}
        </div>
      </div>

      <!-- Password Input -->
      <div class="mb-4">
        <label for="password" class="block text-sm font-semibold mb-2 text-dark-gray">
          Password
        </label>
        <div class="relative">
          <input
            v-model="formData.password"
            :type="showPassword ? 'text' : 'password'"
            id="password"
            required
            minlength="6"
            placeholder="Create password"
            class="input-field w-full px-4 py-3 pr-12 rounded-lg text-base"
          />
          <button
            type="button"
            class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-600"
            @click="togglePasswordVisibility"
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
        <div v-if="errors.password" class="text-red-500 text-xs mt-1">
          {{ errors.password }}
        </div>
      </div>

      <!-- Confirm Password Input -->
      <div class="mb-4">
        <label
          for="confirmPassword"
          class="block text-sm font-semibold mb-2 text-dark-gray"
        >
          Confirm Password
        </label>
        <div class="relative">
          <input
            v-model="formData.confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            id="confirmPassword"
            required
            minlength="6"
            placeholder="Confirm password"
            class="input-field w-full px-4 py-3 pr-12 rounded-lg text-base"
          />
          <button
            type="button"
            class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-600"
            @click="toggleConfirmPasswordVisibility"
          >
            <svg
              v-if="showConfirmPassword"
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
        <div v-if="errors.confirmPassword" class="text-red-500 text-xs mt-1">
          {{ errors.confirmPassword }}
        </div>
      </div>

      <!-- Terms and Conditions -->
      <div class="mb-4">
        <label class="flex items-start cursor-pointer">
          <input
            v-model="formData.agreeToTerms"
            type="checkbox"
            required
            class="w-4 h-4 rounded border-2 cursor-pointer checkbox-custom mt-0.5"
          />
          <span class="ml-2 text-sm text-dark-gray">
            I agree to the
            <NuxtLink to="/page/terms-and-conditions" class="link-text font-semibold">Terms of Service</NuxtLink>
            and
            <NuxtLink to="/page/privacy-policy" class="link-text font-semibold">Privacy Policy</NuxtLink>
          </span>
        </label>
        <div v-if="errors.agreeToTerms" class="text-red-500 text-xs mt-1">
          {{ errors.agreeToTerms }}
        </div>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="btn-primary w-full py-3 rounded-lg font-bold text-lg shadow-lg mb-4"
      >
        Sign Up
      </button>
    </form>

    <!-- Divider -->
    <div class="flex items-center my-4">
      <div class="flex-1 h-px bg-light-gray"></div>
      <span class="px-4 text-sm text-light-gray">OR</span>
      <div class="flex-1 h-px bg-light-gray"></div>
    </div>

    <!-- Login Link -->
    <div class="text-center">
      <p class="text-base text-dark-gray">
        Already have an account?
        <NuxtLink to="/auth/login" class="link-text font-bold"> Sign In </NuxtLink>
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
import { reactive, ref } from "vue";

// Form data matching your API structure
const formData = reactive({
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  agreeToTerms: false,
});

// Error messages
const errors = reactive({
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  agreeToTerms: "",
});

// Modal state
const modal = reactive({
  isOpen: false,
  title: "",
  message: "",
});

// Password visibility
const showPassword = ref(false);
const showConfirmPassword = ref(false);

// Methods
const validateForm = () => {
  let isValid = true;
  
  // Clear previous errors
  Object.keys(errors).forEach(key => errors[key] = "");
  
  // Validate first name
  if (!formData.firstname.trim()) {
    errors.firstname = "First name is required";
    isValid = false;
  }
  
  // Validate last name
  if (!formData.lastname.trim()) {
    errors.lastname = "Last name is required";
    isValid = false;
  }
  
  // Validate email
  if (!formData.email.trim()) {
    errors.email = "Email is required";
    isValid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
    errors.email = "Please enter a valid email address";
    isValid = false;
  }
  
  // Validate phone
  if (!formData.phone.trim()) {
    errors.phone = "Phone number is required";
    isValid = false;
  } else if (!/^\d{10}$/.test(formData.phone)) {
    errors.phone = "Please enter a valid 10-digit phone number";
    isValid = false;
  }
  
  // Validate password
  if (!formData.password) {
    errors.password = "Password is required";
    isValid = false;
  } else if (formData.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
    isValid = false;
  }
  
  // Validate confirm password
  if (!formData.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
    isValid = false;
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
    isValid = false;
  }
  
  // Validate terms agreement
  if (!formData.agreeToTerms) {
    errors.agreeToTerms = "You must agree to the terms and conditions";
    isValid = false;
  }
  
  return isValid;
};

const handleSignup = async () => {
  // Validate form
  if (!validateForm()) {
    return;
  }

  // Prepare data for API (exclude confirmPassword and agreeToTerms)
  const apiData = {
    firstname: formData.firstname,
    lastname: formData.lastname,
    email: formData.email,
    phone: `+91${formData.phone}`, // Add prefix for API
    password: formData.password,
  };

  try {
    // Example API call - uncomment and modify for your backend
    // const response = await $fetch('/api/auth/signup', {
    //   method: 'POST',
    //   body: apiData
    // })

    // Success message
    showModal(
      "Account Created",
      `Welcome ${formData.firstname}! Your account has been created successfully. Please check your email to verify your account.`
    );

    // Reset form
    formData.firstname = "";
    formData.lastname = "";
    formData.email = "";
    formData.phone = "";
    formData.password = "";
    formData.confirmPassword = "";
    formData.agreeToTerms = false;
  } catch (error) {
    // Handle error
    showModal("Signup Failed", "An error occurred during signup. Please try again.");
    console.error("Signup error:", error);
  }
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
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

