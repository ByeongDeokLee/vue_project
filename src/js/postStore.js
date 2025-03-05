import { defineStore } from "pinia";
import { ref } from "vue";

export const usePostStore = defineStore("postStore", () => {
  const posts = ref([
    { id: 1, title: "첫 번째 게시글", content: "내용1" },
    { id: 2, title: "두 번째 게시글", content: "내용2" },
  ]);

  function getPostById(id) {
    return posts.value.find((post) => post.id === id);
  }
  const newRePost = ref([]);

  function getRePostById(id) {
    return newRePost.value.find((newRePost) => newRePost.id === id);
  }

  const toggleRePost = ref({});

  function gettogglePostById(id) {
    return toggleRePost.value.find((toggleRePost) => toggleRePost.id === id);
  }

  return {
    posts,
    newRePost,
    toggleRePost,
    gettogglePostById,
    getRePostById,
    getPostById,
  };
});
