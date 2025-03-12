<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <h2>로그인</h2>
      <form @submit.prevent="login">
        <input type="text" v-model="username" placeholder="아이디" required />
        <input
          type="password"
          v-model="password"
          placeholder="비밀번호"
          required
        />
        <button type="submit">로그인</button>
      </form>
      <button @click="close" class="close-btn">닫기</button>
      <p @click="memberJoin">회원가입</p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "LoginPopupPage",
  emits: ["login"],
  setup(_, { emit }) {
    //const emit = defineEmits(["close"]);
    const username = ref("");
    const password = ref("");

    const router = useRouter();

    const login = () => {
      // 로그인 처리 로직
      const LgoinFrom = {
        username: username.value,
        password: password.value,
      };
      emit("close", LgoinFrom);
    };

    const close = () => {
      emit("close");
    };

    const memberJoin = () => {
      router.push(`/MemberJoin`);
      console.log("zzzzzzzz");
    };
    return { username, password, login, close, memberJoin };
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.close-btn {
  margin-top: 10px;
  background: #e74c3c;
  color: #fff;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
