<template>
  <div class="board-container">
    <h2>게시판</h2>
    <form @submit.prevent="addPost" class="post-form">
      <input v-model="newTitle" type="text" placeholder="제목" required />
      <textarea
        v-model="newContent"
        placeholder="게시글을 작성하세요"
      ></textarea>
      <button type="submit">작성</button>
    </form>

    <div class="board-container-test">
      <button @click="deleteCheckedPosts" class="delete-btn">선택 삭제</button>

      <transition-group name="fade" tag="div" class="board-list">
        <div
          v-for="post in posts"
          :key="post.id"
          class="board-item"
          @click="boardIndexPage(post)"
        >
          <h3>{{ post.title }}</h3>
          <p>{{ post.content }}</p>
          <input type="checkbox" v-model="post.checked" @click.stop />
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { usePostStore } from "@/js/postStore";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "BoardPage",
  props: ["user"],
  setup(props, { emit }) {
    const newTitle = ref("");
    const newContent = ref("");
    const router = useRouter();
    const posts = computed(() => store.posts);

    const store = usePostStore();

    // 게시물 추가
    const addPost = () => {
      if (!props.user) {
        alert("로그인 후 이용 가능합니다.");
        return;
      }
      if (!newTitle.value.trim() || !newContent.value.trim()) {
        alert("제목과 내용을 입력하세요.");
        return;
      }

      const newPost = {
        id: posts.value.length + 1,
        title: newTitle.value,
        content: newContent.value,
        checked: false, // 체크 여부 추가
      };

      // posts.value.push(newPost);
      store.posts.push(newPost);

      newTitle.value = "";
      newContent.value = "";
    };

    // 선택된 게시물 삭제
    const deleteCheckedPosts = () => {
      console.log(store.posts);
      store.posts = store.posts.filter((post) => !post.checked);
    };

    // 상세페이지 이동
    const boardIndexPage = (post) => {
      console.log("데이터 확인", posts);
      emit("login", post);
      router.push(`/board/${post.id}`);
    };

    // 초기 게시물 로딩
    onMounted(() => {
      // posts.value = store.posts;
    });

    return {
      newTitle,
      newContent,
      posts,
      addPost,
      boardIndexPage,
      deleteCheckedPosts,
    };
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
.board-container-test {
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
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
