<template>
  <div>
    <h2>Naver Login Callback</h2>
    <p v-if="email">Email: {{ email }}</p>
    <p v-if="nickname">Nickname: {{ nickname }}</p>
    <button @click="logout">로그아웃</button>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const clientId = "nPQvqYv2ZtubwhQzisDn";
const clientSecret = "lVR8yLXry2";
const redirectUri = "http://localhost:8080/naverlogin"; // 콜백 URL

export default {
  setup() {
    const accessToken = ref("");
    const email = ref("");
    const nickname = ref("");
    const router = useRouter();

    // URL에서 'code' 추출
    const getAuthCodeFromUrl = () => {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get("code"); // 로그인 성공 시 네이버가 넘겨주는 인증 코드
    };

    // Access Token 요청
    const getAccessToken = async (code) => {
      try {
        /*       const url = `http://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${encodeURIComponent(
          redirectUri
        )}&code=${code}&state=RANDOM_STRING`;

        const { data } = await axios.get(url);
        accessToken.value = data.access_token; */

        const response = await axios.post(
          "http://localhost:8080/api/naver/token",
          {
            grant_type: "authorization_code",
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri,
            code: code,
          }
        );

        accessToken.value = response.access_token;
        getUserInfo();
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };

    // 사용자 프로필 조회
    const getUserInfo = async () => {
      try {
        const url = "https://openapi.naver.com/v1/nid/me";
        const headers = { Authorization: `Bearer ${accessToken.value}` };
        const { data } = await axios.get(url, { headers });

        email.value = data.response.email;
        nickname.value = data.response.nickname;
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    // 로그아웃
    const logout = () => {
      accessToken.value = "";
      email.value = "";
      nickname.value = "";
      router.push("/board");
    };

    // 최초 실행 시 Access Token 요청
    onMounted(() => {
      const code = getAuthCodeFromUrl();
      if (code) {
        getAccessToken(code);
      } else {
        console.error("Authorization code not found in URL");
      }
    });

    return { email, nickname, logout };
  },
};
</script>
