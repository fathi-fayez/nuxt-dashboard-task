<template>
  <div v-loading="loading" class="container">
    <!-- Header -->
    <header>
      <div class="text">
        <h1>Users</h1>
        <span style="color: rgba(71, 84, 103, 1)">Users > Add user</span>
      </div>
      <div class="sub-header">
        <div class="text">
          <h4>Add user account</h4>
          <p>Add photo and personal details here</p>
        </div>
        <div class="buttons">
          <el-button><span>Reset</span></el-button>

          <el-button @click.prevent="submitForm()"> <span>Add</span></el-button>
        </div>
      </div>
    </header>
    <!-- Form -->
    <el-form
      style="max-width: 800px"
      status-icon
      label-width="300px"
      label-position="left"
      class="demo-ruleForm"
    >
      <h3>Account info</h3>
      <el-form-item label="Name">
        <el-row class="row-inputs">
          <el-col :span="12">
            <el-input placeholder="First Name" v-model="firstName"></el-input>
            <span class="error-msg">{{ errors.firstName }}</span>
          </el-col>
          <el-col :span="12">
            <el-input placeholder="Last Name" v-model="lastName"></el-input>
            <span class="error-msg">{{ errors.lastName }}</span>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="Email address">
        <el-input type="email" v-model="email" autocomplete="off" />
        <span class="error-msg">{{ errors.email }}</span>
      </el-form-item>
      <el-form-item label="password">
        <el-input type="password" v-model="password" />
        <span class="error-msg">{{ errors.password }}</span>
      </el-form-item>
      <el-form-item label="Role">
        <el-input v-model="role" />
        <span class="error-msg">{{ errors.role || gqlErrors }}</span>
      </el-form-item>
      <el-form-item label="Photo">
        <div class="upload-container">
          <div class="profile-pic">
            <img src="/assets/images/Avatar.png" />
            <el-icon class="delete-icon"><delete /></el-icon>
          </div>
          <el-upload
            class="upload-area"
            drag
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              <em>click to upload</em> or drag and drop
            </div>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item class="bottom-btns">
        <el-button> Reset </el-button>
        <el-button @click.prevent="submitForm()">Add</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as Yup from "yup";
import { graphql } from "graphql";

const router = useRouter();
const gqlErrors = ref("");
const loading = ref(false);

// Define the validation schema using Yup
const validationSchema = toTypedSchema(
  Yup.object({
    firstName: Yup.string().required("first name is required"),
    lastName: Yup.string().required("last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Your password must have at least 8 characters")
      .required("Password is required"),
    role: Yup.string()
      .required("Role is required")
      .oneOf(["admin", "user", "guest"], "Invalid role"),
  })
);

// Setup the form with the validation schema
const { values, errors, defineField, handleSubmit } = useForm({
  validationSchema,
});

// Define fields
const [firstName, firstNameProps] = defineField("firstName", {
  validateOnModelUpdate: false,
});
const [lastName, lastNameProps] = defineField("lastName", {
  validateOnModelUpdate: false,
});
const [email, emailProps] = defineField("email", {
  validateOnModelUpdate: false,
});
const [password, passwordProps] = defineField("password", {
  validateOnModelUpdate: false,
});
const [role, roleProps] = defineField("role", {
  validateOnModelUpdate: false,
});

// Form submission handler
const submitForm = handleSubmit(async (values) => {
  loading.value = true;
  gqlErrors.value = "";
  try {
    const name = `${values.firstName} ${values.lastName}`;
    const userInput = {
      ...values,
      name,
      firstName: undefined,
      lastName: undefined,
    };
    const result = await GqlSignUp(userInput);
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
.container {
  padding: 30px;
}
header {
  margin-bottom: 20px;
  .sub-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;
    border-bottom: 1px solid #e4e7ed;
    .text {
      h4 {
        margin-top: 25px;
        margin-bottom: 10px;
      }
      span {
        color: rgba(133, 133, 137, 1);
      }
    }
    .buttons {
      display: flex;
      .el-button {
        padding: 20px;
        border-radius: 8px;
        font-weight: bold;
        &:last-child {
          background: $main-gradient;
          color: rgb(255, 255, 255);
          margin-left: 15px;
        }
        @media (max-width: 768px) {
          padding: 10px !important;
        }
      }
    }
    @media (max-width: 768px) {
      flex-direction: column;
    }
  }
}

.el-form {
  h3 {
    margin: 20px 0;
  }
  .el-form-item {
    margin: 20px 0;
    .el-input {
      width: 500px;
      height: 40px;
      outline: none;
      padding: 0 15px;
      @media (max-width: 768px) {
        padding: 0;
        // width: 300px;
      }
    }
    .row-inputs {
      display: flex;
      justify-content: space-between;
      width: 100%;
      .el-input {
        width: 250px;
        @media (max-width: 768px) {
          width: 120px;
        }
      }
    }
    ::v-deep(.el-form-item__label) {
      font-weight: bold;
    }
    &.bottom-btns {
      position: absolute;
      right: 30px;
      bottom: 20px;
      display: flex;
      .el-button {
        padding: 20px;
        border-radius: 8px;
        font-weight: bold;
        &:last-child {
          background: $main-gradient;
          color: white;
          margin-left: 15px;
        }
      }
      @media (max-width: 768px) {
        display: none;
      }
    }
    .error-msg {
      color: $brand-text-color;
      margin-left: 15px;
    }
    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  .upload-container {
    background-color: white;
    border-radius: 8px;
    display: flex;
    align-items: start;
    justify-content: space-between;
    width: 100%;
    padding: 0 15px;
    .profile-pic {
      position: relative;
      display: flex;
      align-items: center;
      img {
        border-radius: 50%;
        width: 50px;
        height: 50px;
      }
      .delete-icon {
        position: absolute;
        bottom: -5px;
        right: -10px;
        background-color: white;
        border: 1px solid #ccc;
        border-radius: 50%;
        cursor: pointer;
        color: red;
        font-size: 10px;
        width: 30px;
        height: 30px;
      }
    }
    .upload-area {
      border: 1px solid rgba(221, 220, 216, 1);
      border-radius: 8px;
      ::v-deep(.el-upload-dragger) {
        padding: 0;
      }
      .el-icon--upload {
        font-size: 30px;
        margin: 0;
      }
      .el-upload__text {
        color: rgb(103, 71, 71);
        font-size: 16px;
      }
      @media (min-width: 768px) {
        width: 400px;
      }
    }
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
