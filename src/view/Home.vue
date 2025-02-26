<template>
  <div class="form-container">
    <h2>사용자 입력</h2>

    <!-- 입력 폼 -->
    <transition name="fade">
      <form v-if="showForm" @submit.prevent="handleSubmit">
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

        <!-- 버튼 애니메이션 -->
        <button
          type="submit"
          :disabled="!isValid"
          @mouseover="hover = true"
          @mouseleave="hover = false"
          :class="{ 'hover-effect': hover }"
          v-motion
          :initial="{ scale: 0.9, opacity: 0 }"
          :enter="{ scale: 1, opacity: 1, transition: { duration: 0.3 } }"
          :leave="{ scale: 0.8, opacity: 0, transition: { duration: 0.2 } }"
        >
          제출
        </button>
      </form>
    </transition>

    <h3>저장된 데이터</h3>
    <p>이름: {{ savedData.name }}</p>
    <p>이메일: {{ savedData.email }}</p>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useMotion } from "@vueuse/motion"; // 애니메이션 라이브러리 추가

export default {
  name: "homePage",
  setup() {
    const router = useRouter();
    const formData = ref({
      name: "",
      email: "",
    });

    const errors = ref({
      name: "",
      email: "",
    });

    const savedData = ref({
      name: localStorage.getItem("name") || "",
      email: localStorage.getItem("email") || "",
    });

    const isValid = ref(false);
    const showForm = ref(false); // 폼이 천천히 나타나도록 설정
    const hover = ref(false); // 버튼 호버 효과

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

      // 버튼 애니메이션 (살짝 줄어들었다가 페이지 이동)
      useMotion(
        document.querySelector("button"),
        { scale: 0.8 },
        { duration: 0.2 }
      );

      setTimeout(() => {
        // 로컬스토리지 저장
        localStorage.setItem("name", formData.value.name);
        localStorage.setItem("email", formData.value.email);

        savedData.value.name = formData.value.name;
        savedData.value.email = formData.value.email;

        // 페이지 이동
        router.push(`/user/${formData.value.name}/${formData.value.email}`);
      }, 200);
    };

    onMounted(() => {
      validateForm(); // 초기 유효성 검사 실행
      setTimeout(() => {
        showForm.value = true; // 페이지 로드 시 폼이 부드럽게 나타남
      }, 300);
    });

    return {
      formData,
      errors,
      isValid,
      validateForm,
      handleSubmit,
      savedData,
      showForm,
      hover,
    };
  },
};
</script>

<style>
/* 입력 폼이 부드럽게 나타나는 효과 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 버튼 호버 효과 */
.hover-effect {
  transform: scale(1.05);
  transition: transform 0.2s ease-in-out;
}

.error {
  color: red;
  font-size: 12px;
}

button:disabled {
  background-color: gray;
  cursor: not-allowed;
}

.form-container {
  max-width: 400px;
  margin: auto;
  text-align: center;
}
</style>
