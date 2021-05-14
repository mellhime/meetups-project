<template>
  <auth-layout title="Регистрация">
    <form @submit.prevent="submitForm" class="form">
      <form-group label="Email">
        <app-input v-model="user.email" type="email" />
      </form-group>
      <form-group label="Имя">
        <app-input v-model="user.fullName" type="text" />
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
import AuthLayout from "../components/AuthLayout";
import FormGroup from "@/components/FormGroup";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import AppInput from "@/components/AppInput";

const errorTypes = {
  invalidPassword: "Требуется ввести пароль",
  invalidEmail: "Требуется ввести Email",
  invalidFullName: "Требуется ввести полное имя",
  invalidPasswordsComparison: "Пароли не совпадают",
  invalidAgreement: "Требуется согласиться с условиями",
};

export default {
  name: "RegisterPage",
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
        fullName: "",
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
      } else if (!this.user.fullName) {
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
        // this.registerUser();
      } else {
        alert(this.errorMessage);
      }
    },

    // registerUser() {
    //   register(this.user.email, this.user.fullName, this.user.password).then(
    //     (data) => {
    //       if (data.id !== undefined) {
    //         alert(data.id);
    //       } else {
    //         alert(data.message);
    //       }
    //     }
    //   );
    // },
  },
};
</script>

<style scoped></style>
