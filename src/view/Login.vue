<template>
  <div class="login-container">
    <template>
      <div id="map">
        맵
      </div>
    </template>
    <!-- 로그인 폼 -->

    <!-- <div id="naver_id_login"></div> -->
    <transition name="false">
      <form
        v-if="!isLoggedIn"
        class="login-form"
        @submit.prevent="handleLogin"
      >
        <div
          class="Calendar-btn"
          @click="CalendarBtn"
        />
        <h2 class="title">
          로그인
        </h2>
        <input
          v-model="formDate.email"
          type="email"
          placeholder="이메일"
          required
          class="input-field"
          @input="validateForm"
        >
        <p
          v-if="errors.email"
          class="error"
        >
          {{ errors.email }}
        </p>
        <input
          v-model="formDate.pwd"
          type="password"
          placeholder="비밀번호"
          required
          class="input-field"
          @input="validateForm"
        >
        <p
          v-if="errors.pwd"
          class="error"
        >
          {{ errors.pwd }}
        </p>
        <button
          type="submit"
          class="login-button"
        >
          로그인
        </button>
        <button
          class="login-button"
          @click="NewPage"
        >
          뉴스페이지 이동
        </button>
        <button
          class="login-button"
          @click="naverLoginBtn"
        >
          네이버 로그인
        </button>
        <button
          class="login-button"
          @click="naverMapBtn"
        >
          네이버 지도
        </button>
        <p @click="MemberJoinBtn">
          회원가입
        </p>
      </form>
    </transition>
    <button
      v-if="isLoggedIn"
      class="logout"
      @click="logout"
    >
      로그아웃
    </button>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

// Naver 로그인 초기화
const clientId = "nPQvqYv2ZtubwhQzisDn"; // 여기에 네이버 개발자 센터에서 발급받은 클라이언트 ID를 넣어야 합니다.
const redirectUri = encodeURIComponent("http://localhost:8080/naverLogin"); // 인코딩 필수!
const state = Math.random().toString(36).substring(7);

export default {
  name: "LoginPage",
  // emits: ["login"],
  /* setup(_, { emit }) 의미로는 props를 무시하는 의미
    해당 컴포넌트는 props를 받지만 사용하지 않는다 의미
  */
  setup() {
    const formDate = ref({ pwd: "", email: "" });
    const errors = ref({ pwd: "", email: "" });
    const isLoggedIn = ref(false);
    const isValid = ref(false);
    const router = useRouter();

    //유효성 검사
    const validateForm = () => {
      errors.value.email = /\S+@\S+\.\S+/.test(formDate.value.email)
        ? ""
        : "올바른 이메일 형식을 입력하세요.";

      isValid.value = !errors.value.email && !errors.value.pwd;
    };

    //로그인 처리
    const handleLogin = () => {
      if (!isValid.value) return;

      // const email = localStorage.getItem("email");
      // const pwd = localStorage.getItem("pwd");
      // if (email == formDate.value.email && pwd == formDate.value.pwd) {
      isLoggedIn.value = true;

      localStorage.setItem("email", formDate.value.email);
      localStorage.setItem("pwd", formDate.value.pwd);

      router.push({
        path: "/board",
      });
      // } else {
      //   alert("로그인 정보가 일치하지 않습니다.");
      //   formDate.value.email = "";
      //   formDate.value.pwd = "";
      // }
    };

    //로그아웃
    const logout = () => {
      localStorage.removeItem("pwd");
      localStorage.removeItem("email");
      isLoggedIn.value = false;
      formDate.value.pwd = "";
      formDate.value.email = "";
    };

    const NewPage = () => {
      router.push({ path: "/newsPage" });
    };

    const CalendarBtn = () => {
      router.push({ path: "/Calendar" });
    };

    const naverLoginBtn = () => {
      const loginUrl = `http://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;
      window.location.href = loginUrl; // 네이버 로그인 페이지로 이동
    };

    //네이버 지도
    const naverMapBtn = () => {
      router.push({ path: "/naverMap" });
    };

    //회원가입 페이지
    const MemberJoinBtn = () => {
      router.push(`/MemberJoin`);
    };

    //자동 로그인 확인
    onMounted(() => {
      // localStorage.setItem("email", "1@n.com");
      // localStorage.setItem("pwd", "1");
    });
    return {
      formDate,
      errors,
      isLoggedIn,
      isValid,
      clientId,
      redirectUri,
      state,
      MemberJoinBtn,
      CalendarBtn,
      naverMapBtn,
      naverLoginBtn,
      NewPage,
      validateForm,
      handleLogin,
      logout,
    };
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* background: linear-gradient(135deg, #667eea, #764ba2); */
}

.login-form {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
}

.title {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #333;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
}

.input-field:focus {
  border-color: #667eea;
  box-shadow: 0 0 5px rgba(102, 126, 234, 0.5);
}

.login-button {
  width: 100%;
  padding: 10px;
  background: #d3d3d3;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.login-button:hover {
  background: #d3d3d3;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.news-but {
  width: 100px;
}
.naver_id_login {
  width: 100px;
}
.Calendar-btn {
  width: 30px;
  height: 30px;
  /* background-image: url("@/img/Calendar.webp"); */
}
</style>
