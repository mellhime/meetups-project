<template>
  <auth-layout title="Регистрация">
    <form @submit.prevent="submitForm" class="form">
      <form-group label="Email">
        <app-input v-model="user.email" type="email" />
      </form-group>
      <form-group label="Имя">
        <app-input v-model="user.fullname" type="text" />
      </form-group>
      <form-group label="Пароль">
        <app-input v-model="user.password" type="password" />
      </form-group>
      <form-group label="Повтор пароля">
        <app-input v-model="user.passwordConfirmation" type="password" />
      </form-group>
      <div class="form-group">
        <label class="checkbox"
          ><input v-model="user.agreement" type="checkbox" /> Я согласен с
          условиями <span></span
        ></label>
      </div>
      <div class="form__buttons">
        <primary-button type="submit"> Зарегистрироваться </primary-button>
      </div>
      <div class="form__append">
        Уже есть аккаунт?
        <secondary-button tag="router-link" :to="{ name: 'login' }">
          Войдите
        </secondary-button>
      </div>
    </form>
  </auth-layout>
</template>

<script>
import AuthLayout from "../components/layouts/AuthLayout";
import FormGroup from "../components/ui/inputs/FormGroup";
import PrimaryButton from "../components/ui/buttons/PrimaryButton";
import SecondaryButton from "../components/ui/buttons/SecondaryButton";
import AppInput from "../components/ui/inputs/AppInput";
import { authApi } from "../api/authApi";
import { errorTypes } from "../services/authService";
import { TopProgressBar } from "../plugins/topProgressBar/TopProgressBar";

export async function withProgress(promise) {
  // Запускаем отображение загрузки
  TopProgressBar.start();
  // Возвращаем результата без изменений
  return promise
    .catch((err) => {
      // Отображаем ошибку в прогресс баре
      TopProgressBar.fail();
      // Обработка исключения - не ответственность этой функции
      // Пробрасываем дальше
      throw err;
    })
    .finally(() => {
      // Завершаем отображение загрузки
      TopProgressBar.finish();
    });
}

export default {
  name: "RegisterPage",
  metaInfo: {
    title: "Регистрация",
  },
  components: {
    SecondaryButton,
    AuthLayout,
    FormGroup,
    PrimaryButton,
    AppInput,
  },

  data() {
    return {
      user: {
        password: "",
        email: "",
        fullname: "",
        passwordConfirmation: "",
        agreement: false,
      },
      error_message: null,
    };
  },

  computed: {
    errorMessage() {
      if (!this.user.email) {
        return errorTypes["invalidEmail"];
      } else if (!this.user.fullname) {
        return errorTypes["invalidFullName"];
      } else if (!this.user.password) {
        return errorTypes["invalidPassword"];
      } else if (this.user.password !== this.user.passwordConfirmation) {
        return errorTypes["invalidPasswordsComparison"];
      } else if (!this.user.agreement) {
        return errorTypes["invalidAgreement"];
      } else {
        return "";
      }
    },
  },

  methods: {
    submitForm() {
      if (this.errorMessage.length < 1) {
        this.registerUser();
      } else {
        this.$toaster.error(this.errorMessage);
      }
    },

    async registerUser() {
      try {
        const result = await withProgress(authApi.register(this.user));
        this.$toaster.success("Регистрация выполнена успешно");
        await this.$router.push({ name: "login" });
      } catch (err) {
        if (err.response.status >= 400 && err.response.status < 500) {
          this.$toaster.error(err.message);
        } else {
          throw err;
        }
      }
    },
  },
};
</script>

<style scoped></style>
