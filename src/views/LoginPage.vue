<template>
  <auth-layout title="Вход">
    <form @submit.prevent="submitForm" class="form">
      <form-group label="Email">
        <app-input v-model="user.email" type="email" placeholder="demo@email" />
      </form-group>
      <form-group label="Пароль">
        <app-input
          v-model="user.password"
          type="password"
          placeholder="password"
        />
      </form-group>
      <div class="form__buttons">
        <primary-button block type="submit">Войти</primary-button>
      </div>
      <div class="form__append">
        Нет аккаунта?
        <secondary-button tag="router-link" :to="{ name: 'register' }">
          Зарегистрируйтесь
        </secondary-button>
      </div>
    </form>
  </auth-layout>
</template>

<script>
import FormGroup from "../components/ui/inputs/FormGroup";
import AuthLayout from "../components/layouts/AuthLayout";
import PrimaryButton from "../components/ui/buttons/PrimaryButton";
import SecondaryButton from "../components/ui/buttons/SecondaryButton";
import AppInput from "../components/ui/inputs/AppInput";
import { authApi } from "../api/authApi";
import { errorTypes } from "../services/authService";

export default {
  name: "LoginPage",
  metaInfo: {
    title: "Вход",
  },
  components: {
    AuthLayout,
    FormGroup,
    PrimaryButton,
    SecondaryButton,
    AppInput,
  },

  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      error_message: null,
    };
  },

  computed: {
    errorMessage() {
      if (!this.user.email) {
        return errorTypes["invalidEmail"];
      } else if (!this.user.password) {
        return errorTypes["invalidPassword"];
      } else {
        return "";
      }
    },
  },

  methods: {
    submitForm() {
      if (this.errorMessage.length < 1) {
        this.loginUser();
      } else {
        this.$toaster.error(this.errorMessage);
      }
    },

    loginUser() {
      authApi.login(this.user.email, this.user.password).then((data) => {
        if (data.id !== undefined) {
          this.$toaster.success(data.fullname);
        } else {
          this.$toaster.error(data.message);
        }
      });
    },
  },
};
</script>

<style scoped></style>
