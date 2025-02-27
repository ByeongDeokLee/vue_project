<template>
  <!-- 게시판 -->
  <div v-if="isLoggedIn" class="board">
    <h2>게시판</h2>
    <input type="text" placeholder="제목" required />
    <textarea v-model="newPost" placeholder="게시글을 작성하세요"></textarea>
    <button @click="addPost" :disabled="!newPost">작성</button>

    <ul>
      <li v-for="(post, index) in posts" :key="index">{{ post }}</li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "BoardPage",
  setup() {
    const newPost = ref("");
    const posts = ref([]);
    //게시물 추가
    const addPost = () => {
      if (newPost.value) {
        posts.value.push(newPost.value);
        newPost.value = "";
      }
    };
    return { addPost };
  },
};
</script>

<style>
.textarea {
  width: 100%;
  height: 80px;
  margin-bottom: 10px;
}

.board {
  margin-top: 20px;
}
</style>
