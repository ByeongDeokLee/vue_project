<template>
  <div class="container">
    <h2>로그인</h2>

    <!-- 로그인 폼 -->
    <transition name="false">
      <form v-if="!isLoggedIn" @submit.prevent="handleLogin">
        <input
          v-model="formDate.email"
          type="email"
          placeholder="이메일"
          required
          @input="validateForm"
        />
        <p v-if="errors.email" class="error">{{ errors.email }}</p>
        <input
          v-model="formDate.name"
          placeholder="비밀번호"
          required
          @input="validateForm"
        />
        <p v-if="errors.name" class="error">{{ errors.name }}</p>

        <button type="submit">로그인</button>
      </form>
    </transition>
    <button v-if="!isLoggedIn" @click="logout" class="logout">로그아웃</button>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
export default {
  name: "LoginPage",
  setup() {
    const formDate = ref({ name: "", email: "" });
    const errors = ref({ name: "", email: "" });
    const isLoggedIn = ref(false);
    const isValid = ref(false);

    //유효성 검사
    const validateForm = () => {
      errors.value.name =
        formDate.value.name.length >= 3 ? "" : "정확한 이름을 넣어주세요";
      errors.value.email = /\S+@\S+\.\S+/.test(formDate.value.email)
        ? ""
        : "올바른 이메일 형식을 입력하세요.";

      isValid.value = !errors.value.email && !errors.value.name;
      // isValid.value = true;
    };

    //로그인 처리
    const handleLogin = () => {
      if (!isValid.value) return;

      localStorage.setItem("name", formDate.value.name);
      localStorage.setItem("email", formDate.value.email);
      isLoggedIn.value = true;
    };

    //로그아웃
    const logout = () => {
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      isLoggedIn.value = false;
      formDate.value.name = "";
      formDate.value.email = "";
    };

    //자동 로그인 확인
    onMounted(() => {
      // const storedName = localStorage.getItem("name");
      // const storedEmail = localStorage.getItem("email");
      // if (!storedName && !storedEmail) {
      //   formDate.value.name = storedName;
      //   formDate.value.email = storedEmail;
      //   isLoggedIn.value = true;
      // }
    });
    return {
      formDate,
      errors,
      isLoggedIn,
      isValid,
      validateForm,
      handleLogin,
      logout,
    };
  },
};
</script>

<style>
.container {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 20px;
  text-align: center;
  width: 200px;
}

.error {
  color: red;
  font-size: 12px;
}

button:disabled {
  background-color: gray;
  cursor: not-allowed;
}

/* .logout {
  margin-top: 20px;
  background-color: red;
  color: white;
} */
</style>
