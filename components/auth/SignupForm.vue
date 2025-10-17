<!-- components/auth/SignupForm.vue -->
<template>
  <div class="rounded-lg shadow-2xl p-8 bg-white">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold mb-2 text-dark-gray">Create Account</h1>
      <p class="text-lg text-light-gray">Sign up to get started</p>
    </div>

    <!-- Signup Form -->
    <form @submit.prevent="handleSignup">
      <!-- Row 1: First Name & Last Name -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
        </div>
      </div>

      <!-- Row 2: Email & Phone -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <!-- Email Input -->
        <div>
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

        <!-- Phone Input -->
        <div>
          <label for="phone" class="block text-sm font-semibold mb-2 text-dark-gray">
            Phone Number
          </label>
          <input
            v-model="formData.phone"
            type="tel"
            id="phone"
            required
            placeholder="+919078456121"
            pattern="[\+]?[0-9]{10,15}"
            class="input-field w-full px-4 py-3 rounded-lg text-base"
          />
        </div>
      </div>

      <!-- Row 3: Password & Confirm Password -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <!-- Password Input -->
        <div>
          <label for="password" class="block text-sm font-semibold mb-2 text-dark-gray">
            Password
          </label>
          <input
            v-model="formData.password"
            type="password"
            id="password"
            required
            minlength="6"
            placeholder="Create password"
            class="input-field w-full px-4 py-3 rounded-lg text-base"
          />
        </div>

        <!-- Confirm Password Input -->
        <div>
          <label
            for="confirmPassword"
            class="block text-sm font-semibold mb-2 text-dark-gray"
          >
            Confirm Password
          </label>
          <input
            v-model="formData.confirmPassword"
            type="password"
            id="confirmPassword"
            required
            minlength="6"
            placeholder="Confirm password"
            class="input-field w-full px-4 py-3 rounded-lg text-base"
          />
        </div>
      </div>

      <!-- Terms and Conditions -->
      <div class="mb-6">
        <label class="flex items-start cursor-pointer">
          <input
            v-model="formData.agreeToTerms"
            type="checkbox"
            required
            class="w-4 h-4 rounded border-2 cursor-pointer checkbox-custom mt-1"
          />
          <span class="ml-2 text-sm text-dark-gray">
            I agree to the
            <a href="#" class="link-text font-semibold">Terms of Service</a>
            and
            <a href="#" class="link-text font-semibold">Privacy Policy</a>
          </span>
        </label>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="btn-primary w-full py-3 rounded-lg font-bold text-lg shadow-lg"
      >
        Sign Up
      </button>
    </form>

    <!-- Divider -->
    <div class="flex items-center my-6">
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
import { reactive } from "vue";

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

// Modal state
const modal = reactive({
  isOpen: false,
  title: "",
  message: "",
});

// Methods
const handleSignup = async () => {
  // Validate passwords match
  if (formData.password !== formData.confirmPassword) {
    showModal(
      "Password Mismatch",
      "The passwords you entered do not match. Please try again."
    );
    return;
  }

  // Validate terms agreement
  if (!formData.agreeToTerms) {
    showModal(
      "Terms Required",
      "You must agree to the Terms of Service and Privacy Policy to continue."
    );
    return;
  }

  // Prepare data for API (exclude confirmPassword and agreeToTerms)
  const apiData = {
    firstname: formData.firstname,
    lastname: formData.lastname,
    email: formData.email,
    phone: formData.phone,
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

const showModal = (title, message) => {
  modal.title = title;
  modal.message = message;
  modal.isOpen = true;
};

const closeModal = () => {
  modal.isOpen = false;
};
</script>

<style scoped>
* {
  font-family: "Times New Roman", Times, serif;
}

.text-dark-gray {
  color: #343d46;
}

.text-light-gray {
  color: #aaaaaa;
}

.bg-light-gray {
  background-color: #aaaaaa;
}

.btn-primary {
  background-color: #cca3ff;
  color: #343d46;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: #b88fee;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(204, 163, 255, 0.4);
}

.input-field {
  background-color: #ffffff;
  border: 2px solid #aaaaaa;
  color: #343d46;
  transition: all 0.3s ease;
}

.input-field:focus {
  outline: none;
  border-color: #cca3ff;
  box-shadow: 0 0 0 3px rgba(204, 163, 255, 0.2);
}

.checkbox-custom {
  border-color: #aaaaaa;
  accent-color: #cca3ff;
}

.link-text {
  color: #cca3ff;
  transition: color 0.3s ease;
}

.link-text:hover {
  color: #b88fee;
  text-decoration: underline;
}
</style>
