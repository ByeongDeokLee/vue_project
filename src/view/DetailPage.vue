<template>
  <div class="detail-container">
    <div class="detail-card">
      <div class="detail-header">
        <h2>📌 게시글 상세</h2>
      </div>

      <div class="detail-content">
        <h3>{{ post?.title || "제목 없음" }}</h3>
        <p>{{ post?.content || "내용이 없습니다." }}</p>
      </div>

      <div class="detail-footer">
        <router-link to="/board" class="back-button">🔙 뒤로 가기</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "DetailPage",
  props: ["user"],
  setup(props) {
    const post = ref(null);

    onMounted(() => {
      if (history.state.post) {
        post.value = history.state.post;
      } else if (props.user) {
        post.value = props.user;
      } else {
        post.value = { title: "제목 없음", content: "내용이 없습니다." };
      }
    });

    return { post };
  },
};
</script>

<style>
/* 🔵 배경 스타일 */
.detail-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to bottom, #f0f4f8, #d9e2ec);
}

/* 📌 카드 스타일 */
.detail-card {
  width: 90%;
  max-width: 600px;
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

/* 🏷️ 제목 스타일 */
.detail-header h2 {
  font-size: 24px;
  font-weight: bold;
  color: #1f2937;
  border-bottom: 4px solid #3498db;
  padding-bottom: 8px;
  margin-bottom: 16px;
}

/* 📝 본문 스타일 */
.detail-content h3 {
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
}

.detail-content p {
  font-size: 16px;
  line-height: 1.6;
  color: #4a5568;
}

/* 🔙 버튼 스타일 */
.detail-footer {
  margin-top: 24px;
  text-align: right;
}

.back-button {
  display: inline-block;
  padding: 10px 16px;
  background-color: #3498db;
  color: white;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.3s;
}

.back-button:hover {
  background-color: #217dbb;
}
</style>
