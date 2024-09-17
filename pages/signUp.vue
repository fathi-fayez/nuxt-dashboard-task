<template>
  <div class="main">
    <div v-loading="loading" class="container">
      <h2>Sign Up for an Account</h2>
      <form @submit.prevent="onSubmit">
        <div class="field">
          <input
            v-model="name"
            v-bind="nameProps"
            type="text"
            required
            placeholder="Username"
          />
          <label
            ><el-icon><user /></el-icon
          ></label>
          <span class="error-msg">{{ errors.name }}</span>
        </div>
        <div class="field">
          <input
            v-model="email"
            v-bind="emailProps"
            type="email"
            required
            placeholder="Email"
          />
          <label
            ><el-icon><Message /></el-icon
          ></label>
          <span class="error-msg">{{ errors.email }}</span>
        </div>
        <div class="field">
          <input
            type="password"
            required
            placeholder="Password"
            v-model="password"
            v-bind="passwordProps"
          />
          <label class="password-label"
            ><el-icon><Lock /></el-icon>
            <el-icon><Hide /></el-icon>
          </label>
          <span class="error-msg">{{ errors.password || gqlErrors }}</span>
        </div>
        <div class="content">
          <div class="checkbox">
            <input type="checkbox" id="remember-me" />
            <label for="remember-me">
              By creating an account means you agree to the
              <span>Terms & Conditions</span> and our
              <span>Privacy Policy</span>
            </label>
          </div>
        </div>
        <input type="submit" value="Sign Up" />
        <div class="signup-link">
          Already have an account? <nuxt-link to="/signIn">Log In</nuxt-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "custom",
});

const router = useRouter();
const gqlErrors = ref("");
const loading = ref(false);

import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as Yup from "yup";

// Define the validation schema using Yup
const validationSchema = toTypedSchema(
  Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Your password must have at least 8 characters")
      .required("Password is required"),
  })
);

// Setup the form with the validation schema
const { values, errors, defineField, handleSubmit } = useForm({
  validationSchema,
});

// Define fields
const [name, nameProps] = defineField("name", {
  validateOnModelUpdate: false,
});
const [email, emailProps] = defineField("email", {
  validateOnModelUpdate: false,
});
const [password, passwordProps] = defineField("password", {
  validateOnModelUpdate: false,
});

// Form submission handler
const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  gqlErrors.value = "";
  try {
    const result = await GqlSignUp(values);
    if (result) {
      router.push("/");
    }
  } catch (error) {
    loading.value = false;
    useGqlError((gqlError) => {
      gqlError.gqlErrors.forEach((err) => {
        console.error("[GraphQL error]:", err.message);
        gqlErrors.value =
          err.message || "Something went wrong, please try again";
      });
    });
  }
});
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.container {
  height: 400px;
  width: 300px;
  @media (min-width: 768px) {
    width: 400px;
  }

  form .field {
    height: 56px;
    width: 100%;
    margin-top: 20px;
    position: relative;

    input {
      height: 100%;
      width: 100%;
      outline: none;
      font-size: 17px;
      padding-left: 55px;
      border: 1px solid lightgrey;
      transition: all 0.3s ease;
      border-radius: 4px;
    }

    ::-webkit-input-placeholder {
      color: rgba(157, 156, 153, 1);
    }

    label {
      position: absolute;
      top: 50%;
      left: 20px;
      display: flex;
      align-items: center;
      gap: 15px;
      color: #999999;
      font-weight: 400;
      font-size: 16px;
      pointer-events: none;
      transform: translateY(-50%);

      &.password-label {
        justify-content: space-between;
        width: 90%;
      }

      i {
        font-size: 24px;
      }
    }
    input:focus,
    input:valid {
      border-color: #ef3e2c;
    }
    .error-msg {
      color: $brand-text-color;
      margin: 10px;
    }
  }

  form .content {
    display: flex;
    width: 100%;
    height: 24px;
    font-size: 14px;
    font-weight: bold;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    margin-bottom: 40px;
    .checkbox {
      display: flex;
      align-items: center;
      justify-content: center;
      & input {
        width: 24px;
        height: 24px;
        accent-color: #e71f63;
      }
    }

    label {
      user-select: none;
      padding-left: 10px;
      font-size: 12px;
      color: rgba(133, 133, 137, 1);
      span {
        color: rgba(0, 0, 0, 1);
      }
    }
  }

  input[type="submit"] {
    color: #fff;
    border: none;
    font-size: 16px;
    font-family: "IBM Plex Sans", sans-serif;
    cursor: pointer;
    height: 56px;
    width: 100%;
    border-radius: 100px;
    background: rgba(204, 204, 204, 1);
    transition: 0.3s;
    &:hover {
      background: $main-gradient;
    }
  }

  form .signup-link {
    color: #262626;
    margin-top: 20px;
    text-align: center;
    font-size: 14px;

    a {
      margin-left: 10px;
      font-weight: bold;
    }
  }
  form .pass-link a,
  form .signup-link a {
    color: #e71f63;
    text-decoration: none;
  }
  form .pass-link a:hover,
  form .signup-link a:hover {
    text-decoration: underline;
  }
}
</style>
