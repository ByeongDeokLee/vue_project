<template>
  <div>
    <h2>Naver Login Callback</h2>
    <div>
      <p>email: {{ email }}</p>
      <p>nickname: {{ nickname }}</p>
    </div>
    <button type="button" @click="logout">로그아웃</button>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
const clientId = "nPQvqYv2ZtubwhQzisDn";
const clientSecret = "lVR8yLXry2";
export default {
  name: "naverLoginPage",
  setup() {
    const accessToken = ref("");
    const email = ref("");
    const nickname = ref("");
    const router = useRouter();
    let naverLogin;

    // 사용자 프로필 조회
    const userInfo = async () => {
      if (!accessToken.value) return;

      try {
        const url = `/v1/nid/me`;
        const headers = { Authorization: `Bearer ${accessToken.value}` };
        const { data } = await axios.get(url, { headers });

        console.log("userInfo: ", data);
        email.value = data.response.email;
        nickname.value = data.response.nickname;
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    // 로그아웃
    const logout = async () => {
      const url = `/oauth2.0/token?grant_type=delete&client_id=${clientId}&client_secret=${clientSecret}&access_token=${accessToken.value}&service_provider=NAVER`;

      try {
        const { data } = await axios.get(url);
        console.log("Logout response:", data);
        router.push({ path: "/login" });
      } catch (error) {
        console.error("Logout error:", error);
      }
    };

    onMounted(() => {
      naverLogin = new window.naver_id_login(clientId);
      accessToken.value = naverLogin.oauthParams.access_token;
      userInfo();
    });

    return {
      email,
      nickname,
      logout,
    };
  },
};
</script>

<style></style>
