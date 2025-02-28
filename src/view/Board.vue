<template>
  <!-- 게시판 -->
  <div class="board-container">
    <h2>게시판</h2>
    <form @submit.prevent="addPost" class="post-form">
      <input type="text" placeholder="제목" required />
      <textarea v-model="newPost" placeholder="게시글을 작성하세요"></textarea>
      <button type="submit">작성</button>
    </form>

    <transition-group name="fade" tag="div" class="board-list">
      <div v-for="post in posts" :key="post.id" class="board-item">
        <h3>{{ post.title }}</h3>
        <p>{{ post.content }}</p>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "BoardPage",
  props: ["user"],
  setup(props) {
    const newPost = ref("");
    const posts = ref([
      { id: 1, title: "첫 번째 게시글", content: "내용 1" },
      { id: 2, title: "두 번째 게시글", content: "내용 2" },
    ]);

    //게시물 추가
    const addPost = () => {
      if (!props.user) {
        alert("로그인시 이용가능합니다");
        return;
      }

      if (newPost.value) {
        posts.value.push(newPost.value);
        newPost.value = "";
      }
    };
    return { addPost };
  },
};
</script>

<style scoped>
.board-container {
  padding: 2rem;
  max-width: 700px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
}

.post-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.post-form input,
.post-form textarea {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.post-form button {
  padding: 0.5rem;
  background: #ff9a9e;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.post-form button:hover {
  background: #ff758c;
}

.board-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.board-item {
  background: linear-gradient(135deg, #ff9a9e, #fad0c4);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s;
}

.board-item:hover {
  transform: scale(1.03);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
