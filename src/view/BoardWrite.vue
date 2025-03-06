<template>
  <div>
    <form @submit.prevent="addPost" class="post-form">
      <!-- <div>선택됨: {{ selected }}</div> -->
      <select v-model="selected">
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
      <button type="submit">작성</button>
    </form>
  </div>
</template>

<script>
import { usePostStore } from "@/js/postStore";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "BoardWrite",
  setup() {
    const newTitle = ref("");
    const newContent = ref("");
    const posts = computed(() => store.posts);
    const selected = ref("");
    const router = useRouter();
    const selectOption = computed(() => store.CommunityOption);

    const store = usePostStore();
    // 게시물 추가
    const addPost = () => {
      if (!newTitle.value.trim() || !newContent.value.trim()) {
        alert("제목과 내용을 입력하세요.");
        return;
      }

      const newPost = {
        id: posts.value.length + 1,
        title: newTitle.value,
        content: newContent.value,
        checked: false, // 체크 여부 추가
        selectedText: selected.value.optionText,
        selectedId: selected.value.optionId,
      };

      store.posts.push(newPost);

      newTitle.value = "";
      newContent.value = "";
      router.push(`/board`);
    };

    return {
      posts,
      newTitle,
      newContent,
      selected,
      selectOption,
      addPost,
    };
  },
};
</script>

<style></style>
