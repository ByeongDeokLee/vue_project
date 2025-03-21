<template>
  <teleport to="body">
    <div
      class="modal-overlay"
      @click.self="closeModal"
    >
      <div class="modal-content">
        <form
          class="post-form"
          @submit.prevent="addPost"
        >
          <select
            v-model="selected"
            required
          >
            <option
              disabled
              value=""
            >
              옵션을 선택하세요
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
            v-model="newTitle"
            type="text"
            placeholder="제목"
            required
          >

          <textarea
            v-model="newContent"
            placeholder="게시글을 작성하세요"
          />

          <!-- 작성 날짜 표시 -->
          <input
            type="text"
            :value="today"
            readonly
          >

          <!-- 이미지 업로드 -->
          <input
            type="file"
            accept="image/*"
            @change="handleImageUpload"
          >

          <!-- 이미지 미리보기 -->
          <div v-if="imagePreview">
            <p>이미지 미리보기:</p>
            <img
              :src="imagePreview"
              alt="미리보기"
              class="preview-img"
            >
          </div>

          <button type="submit">
            작성
          </button>
          <button
            type="button"
            @click="closeModal"
          >
            닫기
          </button>
        </form>
      </div>
    </div>
  </teleport>
</template>

<script setup>
/* eslint-disable no-undef */
import { usePostStore } from "@/js/postStore";
import { ref, computed } from "vue";

const store = usePostStore();
const newTitle = ref("");
const newContent = ref("");
const selected = ref("");
const selectOption = computed(() => store.CommunityOption);
const posts = computed(() => store.posts);
const imageFile = ref(null);
const imagePreview = ref("");
const emit = defineEmits(["close"]);

// 오늘 날짜 생성
const today = new Date().toLocaleDateString("ko-KR");

const addPost = () => {
  // if (!newTitle.value || !newContent.value || !imageFile.value) {
  //   alert("제목, 내용, 이미지를 모두 입력하세요.");
  //   return;
  // }

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

// 이미지 업로드 핸들러
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    imageFile.value = file;
    imagePreview.value = URL.createObjectURL(file); // 로컬 이미지 미리보기
  } else {
    alert("이미지 파일만 업로드 가능합니다.");
  }
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
.preview-img {
  width: 100px;
  height: 100px;
  object-fit: cover; /* 비율 유지하면서 영역에 맞게 잘라줌 */
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
