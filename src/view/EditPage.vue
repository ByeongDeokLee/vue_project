<template>
  <div class="edit-container">
    <div class="edit-card">
      <h2>게시글 수정</h2>

      <form @submit.prevent="updatePost">
        <select
          v-model="selected"
          required
        >
          <option
            disabled
            value=""
          >
            {{ editedPost.optionText }}
          </option>
          <option
            v-for="option in selectOption.slice(1)"
            :key="option"
            :value="option"
          >
            {{ option.optionText }}
          </option>
        </select>

        <input
          v-model="editedPost.title"
          type="text"
          placeholder="제목을 입력하세요"
          required
        >
        <textarea
          v-model="editedPost.content"
          placeholder="내용을 입력하세요"
        />

        <div>
          <button type="submit">
            저장
          </button>
          <router-link
            to="/"
            class="cancel-button"
          >
            취소
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable no-undef */
import { usePostStore } from "@/js/postStore";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const editedPost = ref("");
const selected = ref("");
const selectOption = computed(() => store.CommunityOption);

const store = usePostStore();

// 오늘 날짜 생성
const today = new Date().toLocaleDateString("ko-KR");

onMounted(() => {
  //  props를 통해 데이터가 넘어왔을 경우
  if (props.user) {
    editedPost.value = { ...props.user };
  } //  데이터가 없을 경우 기본값 설정
  else {
    editedPost.value = { title: "제목 없음", content: "내용이 없습니다." };
    router.push({ path: "/" });
  }
  console.log("editPasy", editedPost.value);
  console.log("editPasy", selected.value);
});

const updatePost = () => {
  for (var i = 0; i < selectOption.value.length; i++) {
    if (selectOption.value[i].optionId != selected.value.optionId) {
      editedPost.value.optionId = selected.value.optionId;
      editedPost.value.optionText = selected.value.optionText;
    }
  }
  editedPost.value.writeDate = today; // 날짜 저장

  console.log("Updated Post:", editedPost.value);

  for (let i = 0; i < store.posts.length; i++) {
    if (editedPost.value.id === store.posts[i].id) {
      store.posts[i] = { ...editedPost.value };
    }
  }

  router.push("/"); // 수정 완료 후 메인 페이지로 이동
};
</script>

<style>
.edit-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f4f4f4;
}

.edit-card {
  width: 90%;
  max-width: 500px;
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

input,
textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #d3d3d3;
  color: black;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #d3d3d3;
}

.cancel-button {
  display: block;
  text-align: center;
  margin-top: 10px;
  color: black;
  text-decoration: none;
}

.cancel-button:hover {
  color: #222;
}
</style>
