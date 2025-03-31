<template>
  <div>
    <h2>Naver Login Callback</h2>
    <p v-if="email">Email: {{ email }}</p>
    <p v-if="nickname">Nickname: {{ nickname }}</p>
    <button @click="logout">로그아웃</button>
  </div>
</template>

<script>
import { onMounted, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { getUserInfoAPI } from "../js/actions";

const clientId = "nPQvqYv2ZtubwhQzisDn";
// const redirectUri = "http://localhost:8080/naverlogin"; // 콜백URL

export default {
  setup() {
    const accessToken = ref("");
    const email = ref("");
    const nickname = ref("");
    const router = useRouter();

    const naverLogin = ref(null);

    // 사용자 프로필 조회
    const getUserInfo = async () => {
      try {
        getUserInfoAPI(accessToken.value).then((res) => {
          console.log("사용자 프로필 조회", res);
        });
        // email.value = data.response.email;
        // nickname.value = data.response.nickname;
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    // 로그아웃
    const logout = () => {
      accessToken.value = "";
      email.value = "";
      nickname.value = "";
      router.push("/");
    };

    onMounted(() => {
      // 네이버 로그인 객체 생성
      naverLogin.value = new window.naver_id_login(clientId);
      accessToken.value = naverLogin.value.oauthParams.access_token;

      // getUserInfo();
      console.log("네이버 로그인 객체:", naverLogin.value);
      console.log("액세스 토큰:", accessToken.value);
    });

    watchEffect(() => {
      if (accessToken.value) {
        console.log("✅ 액세스 토큰 감지됨, getUserInfo() 호출");
        getUserInfo();
      }
    });

    return { email, nickname, logout };
  },
};
</script>
