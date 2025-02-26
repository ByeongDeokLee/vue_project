<template>
  <div>
    <h2>사용자 입력</h2>
    <form @submit.prevent="handleSubmit">
      <input
        v-model="formData.name"
        placeholder="이름"
        required
        @input="validateForm"
      />
      <p v-if="errors.name" class="error">{{ errors.name }}</p>

      <input
        v-model="formData.email"
        type="email"
        placeholder="이메일"
        required
        @input="validateForm"
      />
      <p v-if="errors.email" class="error">{{ errors.email }}</p>

      <button type="submit" :disabled="!isValid">제출</button>
    </form>

    <h3>저장된 데이터</h3>
    <p>이름: {{ savedData.name }}</p>
    <p>이메일: {{ savedData.email }}</p>
    <p>테스트 : {{ testDate.testValue }}</p>
    <button @click="test">증가</button>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "homePage",
  setup() {
    const formData = ref({
      name: "",
      email: "",
    });

    const errors = ref({
      name: "",
      email: "",
    });

    const testDate = ref({ testValue: 0 });

    const savedData = ref({
      name: localStorage.getItem("name") || "",
      email: localStorage.getItem("email") || "",
    });

    const isValid = ref(false);

    // 유효성 검사 함수
    const validateForm = () => {
      errors.value.name =
        formData.value.name.length >= 2
          ? ""
          : "이름은 최소 2글자 이상 입력하세요.";
      errors.value.email = /\S+@\S+\.\S+/.test(formData.value.email)
        ? ""
        : "올바른 이메일 형식을 입력하세요.";

      isValid.value = !errors.value.name && !errors.value.email;
    };

    // 폼 제출 시 처리
    const handleSubmit = async () => {
      if (!isValid.value) return;

      // 로컬스토리지 저장
      localStorage.setItem("name", formData.value.name);
      localStorage.setItem("email", formData.value.email);

      savedData.value.name = formData.value.name;
      savedData.value.email = formData.value.email;

      // 페이지 이동
      this.$router.push(`/user/${formData.value.name}/${formData.value.email}`);
    };
    const test = async () => {
      testDate.value.testValue++;
      console.log(testDate.value.testValue);
    };

    onMounted(() => {
      validateForm(); // 초기 유효성 검사 실행
    });

    return {
      formData,
      errors,
      isValid,
      validateForm,
      handleSubmit,
      test,
      savedData,
      testDate,
    };
  },
};
</script>

<style>
.error {
  color: red;
  font-size: 12px;
}
button:disabled {
  background-color: gray;
  cursor: not-allowed;
}
</style>
