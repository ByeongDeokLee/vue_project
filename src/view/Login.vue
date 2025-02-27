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
        <li v-for="(post, index) in posts" :key="index">{{ post }}</li>
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
    const newPost = ref("");
    const posts = ref([]);

    //유효성 검사
    const validateForm = () => {
      errors.value.name =
        formDate.value.name.length >= 3 ? "" : "정확한 이름을 넣어주세요";
      errors.value.email = /\S+@\S+\.\S+/.test(formDate.value.email)
        ? ""
        : "올바른 이메일 형식을 입력하세요.";

      isValid.value = !errors.value.email && !errors.value.name;
      // isValid.value = true;
    };

    //로그인 처리
    const handleLogin = () => {
      if (!isValid.value) return;

      localStorage.setItem("name", formDate.value.name);
      localStorage.setItem("email", formDate.value.email);
      isLoggedIn.value = true;
    };

    //게시물 추가
    const addPost = () => {
      if (newPost.value) {
        posts.value.push(newPost.value);
        newPost.value = "";
      }
    };

    //로그아웃
    const logout = () => {
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      isLoggedIn.value = false;
      formDate.value.name = "";
      formDate.value.email = "";
    };
    return {
      formDate,
      errors,
      isLoggedIn,
      isValid,
      newPost,
      posts,
      validateForm,
      handleLogin,
      addPost,
      logout,
    };
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
