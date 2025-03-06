import { defineStore } from "pinia";
import { ref } from "vue";

export const usePostStore = defineStore("postStore", () => {
  const posts = ref([]);

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

  const CommunityOption = ref([
    {
      optionText: "전체",
      optionId: "1",
    },
    {
      optionText: "여행",
      optionId: "2",
    },
    {
      optionText: "자기계발",
      optionId: "3",
    },
    {
      optionText: "게임",
      optionId: "4",
    },
    {
      optionText: "자동차",
      optionId: "5",
    },
    {
      optionText: "운동",
      optionId: "6",
    },
    {
      optionText: "기타",
      optionId: "7",
    },
  ]);

  function getCommunityOptionById(id) {
    return CommunityOption.value.find(
      (CommunityOption) => CommunityOption.id === id
    );
  }

  return {
    posts,
    newRePost,
    toggleRePost,
    CommunityOption,
    getCommunityOptionById,
    gettogglePostById,
    getRePostById,
    getPostById,
  };
});
