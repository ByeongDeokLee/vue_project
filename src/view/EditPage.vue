<template>
  <div class="edit-container">
    <div class="edit-card">
      <h2>게시글 수정</h2>

      <form @submit.prevent="updatePost">
        <input
          v-model="editedPost.title"
          type="text"
          placeholder="제목을 입력하세요"
          required
        />
        <textarea
          v-model="editedPost.content"
          placeholder="내용을 입력하세요"
        ></textarea>

        <div>
          <button type="submit">저장</button>
          <router-link to="/board" class="cancel-button">취소</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { usePostStore } from "@/js/postStore";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "EditPage",
  props: ["user"],
  setup(props) {
    const router = useRouter();
    const editedPost = ref({ title: "", content: "" });

    const store = usePostStore();

    onMounted(() => {
      //  props를 통해 데이터가 넘어왔을 경우
      if (props.user) {
        editedPost.value = { ...props.user };
      } //  데이터가 없을 경우 기본값 설정
      else {
        editedPost.value = { title: "제목 없음", content: "내용이 없습니다." };
      }
      console.log("editPasy", editedPost.value);
    });

    const updatePost = () => {
      for (var i = 0; i < store.posts.length; i++) {
        if (editedPost.value.id == store.posts[i].id) {
          store.posts[i] = { ...editedPost.value };
        }
      }
      router.push("/board");
    };

    return { editedPost, updatePost };
  },
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
