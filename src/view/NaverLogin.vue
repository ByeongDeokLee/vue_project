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
// const redirectUri = "http://localhost:8080/naverlogin"; // 콜백URL

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
    // URL에서 'state' 추출
    const getAuthStateFromUrl = () => {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get("state"); // 로그인 성공 시 네이버가 넘겨주는 인증 코드
    };

    // Access Token 요청
    const getAccessToken = async (code, state) => {
      try {
        const url =
          "/api/oauth2.0/token?" +
          "grant_type=code" +
          "&client_id=" +
          clientId +
          "&client_secret=" +
          clientSecret +
          "&code=" +
          code +
          "&state=" +
          state;
        // const url = `/oauth2.0/token?grant_type=authorization_code&client_id=${clientId}&client_secret=${clientSecret}&code=${code}&state=${state}`;

        let config = {
          headers: {
            Host: "openapi.naver.com",
            "User-Agent": "curl/7.49.1",
            Accept: "*/*",
            "X-Naver-Client-Id": "7ra3GJA-------ivYe9F",
            "X-Naver-Client-Secret": "4yq-------3W",
          },
        };

        console.log(url);

        const { data } = await axios.get(url, config).then((response) => {
          console.log(response);
        });
        // const { data } = await axios.get(url);
        accessToken.value = data.access_token;

        // accessToken.value = response.access_token;
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
      router.push("/");
    };

    // 최초 실행 시 Access Token 요청
    onMounted(() => {
      const code = getAuthCodeFromUrl();
      const start = getAuthStateFromUrl();
      if (code) {
        getAccessToken(code, start);
      } else {
        console.error("Authorization code not found in URL");
      }
      // getUserInfo();
    });

    return { email, nickname, logout };
  },
};
</script>
