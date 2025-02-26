<template>
  <div class="container">
    <h2 v-if="!isLoggedIn">사용자 입력</h2>

    <!-- 로그인 폼 -->
    <transition name="false">
      <form v-if="!isLoggedIn" @submit.prevent="handleLogin">
        <input
          v-model="formDate.name"
          placeholder="이름"
          required
          @input="validateForm"
        />
        <!-- <p v-if="ErrorCodes.name" class="error">{{ errors.name }}</p> -->

        <input
          v-model="formDate.email"
          type="email"
          placeholder="이메일"
          required
          @input="validateForm"
        />
        <!-- <p v-if="errors.email" class="error">{{ errors.email }}</p> -->
        <button type="submit" :disabled="!isValid">로그인</button>
      </form>
    </transition>

    <!-- 게시판 -->
    <div v-if="isLoggedIn" class="board">
      <h2>게시판</h2>
      <textarea v-model="newPost" placeholder="게시글을 작성하세요"></textarea>
      <button @click="addPost" :disabled="!newPost">작성</button>

      <ul>
        <li v-for="(post, index) in posts" :key="index"></li>
      </ul>
      <button @click="logout" class="logout">로그아웃</button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "LoginPage",
  setup() {
    const formDate = ref({ name: "", email: "" });
    const errors = ref({ name: "", email: "" });
    const isLoggedIn = ref(false);
    const isValid = ref(false);

    return { formDate, errors, isLoggedIn, isValid };
  },
};
</script>

<style>
.container {
  max-width: 400px;
  margin: auto;
  text-align: center;
}

.error {
  color: red;
  font-size: 12px;
}

button:disabled {
  background-color: gray;
  cursor: not-allowed;
}

textarea {
  width: 100%;
  height: 80px;
  margin-bottom: 10px;
}

.board {
  margin-top: 20px;
}

.logout {
  margin-top: 20px;
  background-color: red;
  color: white;
}
</style>
