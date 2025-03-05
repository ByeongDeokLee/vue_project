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
        <form @submit.prevent="writeBut" class="comment-form">
          <input
            v-model="newContext"
            type="text"
            placeholder="댓글을 입력하세요"
            required
            class="comment-input"
          />
          <button type="submit" class="comment-button">작성</button>
        </form>

        <!-- 댓글 리스트 -->
        <div v-for="(comment, index) in comments" :key="index" class="comment">
          <template v-if="!reModify[index]">
            <span class="comment-text">{{ comment.comment }}</span>
            <button @click="toggleModify(index)" class="edit-button">
              수정
            </button>
          </template>

          <!-- 댓글 수정 UI -->
          <template v-else>
            <input v-model="editContext[index]" class="edit-input" />
            <button @click="saveEdit(index)" class="save-button">저장</button>
            <button @click="cancelEdit(index)" class="cancel-button">
              취소
            </button>
          </template>

          <button @click="toggleReply(index)" class="reply-button">답글</button>

          <!-- 대댓글 입력 영역 -->
          <div v-if="CommentsYn[index]" class="reply-form">
            <input
              v-model="reContext[index]"
              type="text"
              placeholder="답글 입력"
              class="reply-input"
              required
            />
            <button @click="reWritBut(index)" class="reply-submit">등록</button>
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
        <button @click="BackBut" class="back-button">뒤로 가기</button>
        <button @click="EditBut(post)" class="edit-button">수정 하기</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { usePostStore } from "@/js/postStore";

export default {
  name: "DetailPage",
  props: ["user"],
  setup(props, { emit }) {
    const post = ref(null);
    const router = useRouter();
    const comments = ref([]);
    const newContext = ref("");
    const reComments = ref({});
    const reContext = ref({});
    const CommentsYn = ref({});
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
      comments.value.push({
        BoardId: props.user.id,
        commentsId: comments.value.length + 1,
        comment: newContext.value,
      });
      newContext.value = "";
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
      if (!reComments.value[index]) {
        reComments.value[index] = [];
      }
      reComments.value[index].push({ comment: reContext.value[index] });
      reContext.value[index] = "";
    };

    onMounted(() => {
      post.value = props.user || {
        title: "제목 없음",
        content: "내용이 없습니다.",
      };

      for (var i = 0; i < store.newRePost.length; i++) {
        if (store.newRePost[i].BoardId == props.user.id) {
          comments.value = store.newRePost;
        }
      }
    });

    return {
      post,
      newContext,
      comments,
      reComments,
      reContext,
      CommentsYn,
      reModify,
      editContext,
      BackBut,
      EditBut,
      writeBut,
      toggleReply,
      toggleModify,
      saveEdit,
      cancelEdit,
      reWritBut,
    };
  },
};
</script>

<style>
/* 배경 스타일 */
.detail-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to bottom, #f0f4f8, #d9e2ec);
}

/* 카드 스타일 */
.detail-card {
  width: 90%;
  max-width: 600px;
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

/* 댓글 입력 영역 */
.comment-form {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
}

.comment-input {
  flex: 1;
  width: 80%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
}

.comment-button {
  width: 60px;
  padding: 8px;
  font-size: 14px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.comment-button:hover {
  background-color: #217dbb;
}

/* 댓글 스타일 */
.comment {
  background: #f9f9f9;
  padding: 8px 12px;
  border-radius: 8px;
  margin-top: 10px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
}

/*  input */
.edit-input {
  width: 80%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

/* .save-button,
.cancel-button {
  padding: 6px 10px;
  margin-left: 5px;
  font-size: 13px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.save-button {
  background-color: #2ecc71;
  color: white;
}

.cancel-button {
  background-color: #e74c3c;
  color: white;
}

.save-button:hover {
  background-color: #27ae60;
}

.cancel-button:hover {
  background-color: #c0392b;
}

.reply-button {
  background: none;
  border: none;
  color: #3498db;
  cursor: pointer;
  font-size: 13px;
}

.reply-button:hover {
  text-decoration: underline;
} */

/* 게시글 수정 버튼 (보라색) */
.edit-button {
  background-color: #636e72;
  color: white;
}

.edit-button:hover {
  background-color: #636e72;
}

/* 댓글 수정 버튼 (초록색) */
.save-button {
  background-color: #636e72;
  color: white;
}

.save-button:hover {
  background-color: #636e72;
}

/* 취소 버튼 (빨간색) */
.cancel-button {
  background-color: #636e72;
  color: white;
}

.cancel-button:hover {
  background-color: #636e72;
}

/* 뒤로가기 버튼 (회색) */
.back-button {
  background-color: #636e72;
  color: white;
}

.back-button:hover {
  background-color: #636e72;
}

/* 답글 버튼 (하늘색) */
.reply-button {
  background: none;
  color: #3e3f44;
  font-size: 12px;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.2s;
}

.reply-button:hover {
  color: #3e3f44;

  text-decoration: underline;
}
</style>
