<template>
  <div class="login-container">
    <!-- 로그인 폼 -->
    <button class="news-but" @click="NewPage">뉴스페이지 이동</button>
    <div id="naver_id_login"></div>
    <transition name="false">
      <form class="login-form" v-if="!isLoggedIn" @submit.prevent="handleLogin">
        <h2 class="title">로그인</h2>
        <input
          v-model="formDate.email"
          type="email"
          placeholder="이메일"
          required
          @input="validateForm"
          class="input-field"
        />
        <p v-if="errors.email" class="error">{{ errors.email }}</p>
        <input
          v-model="formDate.pwd"
          type="password"
          placeholder="비밀번호"
          required
          @input="validateForm"
          class="input-field"
        />
        <p v-if="errors.pwd" class="error">{{ errors.pwd }}</p>

        <button type="submit" class="login-button">로그인</button>
      </form>
    </transition>
    <button v-if="isLoggedIn" @click="logout" class="logout">로그아웃</button>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "LoginPage",
  emits: ["login"],
  /* setup(_, { emit }) 의미로는 props를 무시하는 의미
    해당 컴포넌트는 props를 받지만 사용하지 않는다 의미
  */
  setup(_, { emit }) {
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
      // errors.value.pwd =
      //   formDate.value.pwd.length >= 5 ? "" : "정확한 비밀번호를 입력하세요";

      isValid.value = !errors.value.email && !errors.value.pwd;
    };

    //로그인 처리
    const handleLogin = () => {
      if (!isValid.value) return;

      const email = localStorage.getItem("email");
      const pwd = localStorage.getItem("pwd");
      if (email == formDate.value.email && pwd == formDate.value.pwd) {
        isLoggedIn.value = true;
        emit("login", formDate.value);
        router.push({ path: "/board" });
      } else {
        alert("로그인 정보가 일치하지 않습니다.");
        formDate.value.email = "";
        formDate.value.pwd = "";
      }
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

    //자동 로그인 확인
    onMounted(() => {
      localStorage.setItem("email", "1@n.com");
      localStorage.setItem("pwd", "1");

      // Naver 로그인 초기화
      const clientId = "nPQvqYv2ZtubwhQzisDn"; // 여기에 네이버 개발자 센터에서 발급받은 클라이언트 ID를 넣어야 합니다.
      const naverLogin = new window.naver_id_login(
        clientId,
        "http://localhost:8080/" // 개발자센터에서 등록한 Callback URL
      );

      // 고유 상태값 설정
      const state = naverLogin.getUniqState();
      naverLogin.setButton("white", 2, 40); // 버튼설정
      naverLogin.setDomain("http://localhost:8080");
      naverLogin.setState(state);

      // 팝업 설정 (필요 시 주석 해제)
      // naverLogin.setPopup();

      // Naver 로그인 버튼 초기화
      naverLogin.init_naver_id_login();
    });
    return {
      formDate,
      errors,
      isLoggedIn,
      isValid,
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
</style>
