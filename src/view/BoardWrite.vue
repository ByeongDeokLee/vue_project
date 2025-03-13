<template>
  <teleport to="body">
    <div class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <form @submit.prevent="addPost" class="post-form">
          <select v-model="selected" required>
            <option disabled value="">옵션을 선택하세요</option>
            <option
              v-for="option in selectOption.slice(1)"
              :value="option"
              :key="option"
            >
              {{ option.optionText }}
            </option>
          </select>

          <input v-model="newTitle" type="text" placeholder="제목" required />

          <textarea
            v-model="newContent"
            placeholder="게시글을 작성하세요"
          ></textarea>

          <!-- 작성 날짜 표시 -->
          <input type="text" :value="today" readonly />

          <button type="submit">작성</button>
          <button type="button" @click="closeModal">닫기</button>
        </form>
      </div>
    </div>
  </teleport>
</template>

<script>
import { usePostStore } from "@/js/postStore";
import { ref, computed } from "vue";

export default {
  name: "BoardWriteModal",
  emits: ["close"],
  setup(_, { emit }) {
    const store = usePostStore();
    const newTitle = ref("");
    const newContent = ref("");
    const selected = ref("");
    const selectOption = computed(() => store.CommunityOption);
    const posts = computed(() => store.posts);

    // 오늘 날짜 생성
    const today = new Date().toLocaleDateString("ko-KR");

    const addPost = () => {
      if (!newTitle.value.trim() || !newContent.value.trim()) {
        alert("제목과 내용을 입력하세요.");
        return;
      }

      if (!selected.value) {
        alert("옵션을 선택하세요");
        return;
      }

      const newPost = {
        id: posts.value.length + 1,
        title: newTitle.value,
        content: newContent.value,
        checked: false,
        optionText: selected.value.optionText,
        optionId: selected.value.optionId,
        writeDate: today, // 작성 날짜 저장
      };

      store.posts.push(newPost);

      emit("close"); // 모달 닫기
    };

    const closeModal = () => {
      emit("close");
    };

    return {
      newTitle,
      newContent,
      selected,
      selectOption,
      today,
      addPost,
      closeModal,
    };
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
}

button {
  margin-top: 10px;
}
</style>
