<template>
  <div class="detail-container">
    <div class="detail-card">
      <div class="detail-header">
        <h2>📌 게시글 상세</h2>
      </div>

      <div class="detail-content">
        <h3>{{ post?.title || "제목 없음" }}</h3>
        <p>{{ post?.content || "내용이 없습니다." }}</p>

        <!-- 댓글 입력 영역 -->
        <form
          class="comment-form"
          @submit.prevent="writeBut"
        >
          <input
            v-model="newContext"
            type="text"
            placeholder="댓글을 입력하세요"
            required
            class="comment-input"
          >
          <button
            type="submit"
            class="comment-button"
          >
            작성
          </button>
        </form>

        <!-- 댓글 리스트 -->
        <div
          v-for="(comment, index) in comments"
          :key="index"
          class="comment"
        >
          <template v-if="!reModify[index]">
            <span class="comment-text">{{ comment.comment }}</span>
            <input
              v-model="comment.checked"
              type="checkbox"
              @click.stop
            >

            <button
              class="edit-button"
              @click="toggleModify(index)"
            >
              수정
            </button>
          </template>

          <!-- 댓글 수정 UI -->
          <template v-else>
            <input
              v-model="editContext[index]"
              class="edit-input"
            >
            <button
              class="save-button"
              @click="saveEdit(index)"
            >
              저장
            </button>
            <button
              class="cancel-button"
              @click="cancelEdit(index)"
            >
              취소
            </button>
          </template>

          <button
            class="reply-button"
            @click="toggleReply(index)"
          >
            답글
          </button>

          <!-- 대댓글 입력 영역 -->
          <div
            v-if="CommentsYn[index]"
            class="reply-form"
          >
            <input
              v-model="reContext[index]"
              type="text"
              placeholder="답글 입력"
              class="reply-input"
              required
            >
            <button
              class="reply-submit"
              @click="reWritBut(index)"
            >
              등록
            </button>
          </div>

          <!-- 대댓글 리스트 -->
          <div
            v-for="(reComment, reIndex) in reComments[index] || []"
            :key="reIndex"
            class="reply"
          >
            {{ reComment.comment }}
          </div>
        </div>
      </div>

      <div class="detail-footer">
        <button
          class="back-button"
          @click="BackBut"
        >
          뒤로 가기
        </button>
        <button
          class="edit-button"
          @click="EditBut(post)"
        >
          수정 하기
        </button>
        <button
          class="delete-btn"
          @click="deleteCheckedPosts"
        >
          선택 삭제
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable no-undef */
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { usePostStore } from "@/js/postStore";

const post = ref(null);
const router = useRouter();
//댓글 배열
const comments = computed(() => store.newRePost || []);
const newContext = ref("");

//대댓글 배열
const reComments = computed(() => store.toggleRePost || {});
const reContext = ref({});
const CommentsYn = ref({});

//수정
const reModify = ref({});
const editContext = ref({});

const store = usePostStore();

// 뒤로가기 버튼
const BackBut = () => {
  router.push(`/board`);
};

// 수정하기 버튼
const EditBut = () => {
  emit("borad", post.value);
  router.push(`/board/${post.value.id}/editPage`);
};

// 댓글 작성 버튼
const writeBut = () => {
  if (!newContext.value) {
    alert("댓글을 입력하세요.");
    return;
  }

  const newContentPost = {
    BoardId: props.user.id,
    commentsId: comments.value.length + 1,
    comment: newContext.value,
    checked: false,
  };

  store.newRePost.push(newContentPost);

  newContentPost.value = "";
};

// 댓글 수정 모드 토글
const toggleModify = (index) => {
  reModify.value[index] = true;
  editContext.value[index] = comments.value[index].comment;
};

// 수정 저장
const saveEdit = (index) => {
  if (!editContext.value[index]) {
    alert("내용을 입력하세요!");
    return;
  }
  comments.value[index].comment = editContext.value[index];
  reModify.value[index] = false;
};

// 수정 취소
const cancelEdit = (index) => {
  reModify.value[index] = false;
};

// 대댓글 토글
const toggleReply = (index) => {
  CommentsYn.value[index] = !CommentsYn.value[index];
};

// 대댓글 작성
const reWritBut = (index) => {
  if (!reContext.value[index]) {
    alert("답글을 입력하세요.");
    return;
  }

  if (!store.toggleRePost[index]) {
    store.toggleRePost[index] = [];
  }
  store.toggleRePost[index].push({
    comment: reContext.value[index],
    checked: false,
  });
};

onMounted(() => {
  post.value = props.user || {
    title: "제목 없음",
    content: "내용이 없습니다.",
  };
});
</script>

<style>
/* General Styles */
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 0;
}

.detail-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.detail-card {
  padding: 20px;
  border-radius: 10px;
}

.detail-header {
  text-align: center;
  margin-bottom: 20px;
}

h2 {
  font-size: 1.8em;
  color: #333;
}

h3 {
  font-size: 1.5em;
  color: #555;
}

.detail-content {
  margin-bottom: 20px;
}

.detail-footer {
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
}

button {
  background-color: #d3d3d3;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #d3d3d3;
}

.comment-form {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.comment-input {
  width: 85%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1em;
}

.comment-button {
  width: 12%;
  padding: 10px;
  border-radius: 5px;
  background-color: #d3d3d3;
  border: none;
}

.comment-button:hover {
  background-color: #d3d3d3;
}

.comment {
  padding: 15px;
  margin: 10px 0;
  background-color: #f9f9f9;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.comment-text {
  font-size: 1em;
  color: #333;
}

.delete-btn,
.edit-button,
.reply-button {
  margin-left: 10px;
  background-color: #d3d3d3;
}

.delete-btn:hover,
.edit-button:hover,
.reply-button:hover {
  background-color: #d3d3d3;
}

.edit-input {
  width: 80%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1em;
}

.save-button {
  background-color: #d3d3d3;
}

.save-button:hover {
  background-color: #d3d3d3;
}

.cancel-button {
  background-color: #d3d3d3;
}

.cancel-button:hover {
  background-color: #d3d3d3;
}

.reply-form {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.reply-input {
  width: 85%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.reply-submit {
  width: 12%;
  padding: 10px;
  border-radius: 5px;
  background-color: #d3d3d3;
}

.reply-submit:hover {
  background-color: #d3d3d3;
}

.reply {
  margin-top: 10px;
  padding-left: 20px;
  background-color: #d3d3d3;
  border-left: 5px solid #d3d3d3;
}
</style>
