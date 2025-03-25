import { defineStore } from "pinia";
import { ref } from "vue";

export const usePostStore = defineStore("postStore", () => {
  //게시판 배열
  const posts = ref([]);

  //댓글 배열
  const newRePost = ref([]);

  //대댓글 배열
  const toggleRePost = ref({});

  //카테고리 배열
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

  //날짜 배열
  const CalendarRePost = ref([]);

  //지도 즐겨찾기
  const favoritesRePost = ref([]);

  return {
    posts,
    newRePost,
    toggleRePost,
    CommunityOption,
    CalendarRePost,
    favoritesRePost,
  };
});
