import { defineStore } from "pinia";
import { ref } from "vue";

export const usePostStore = defineStore("postStore", () => {
  //게시판 배열
  const posts = ref([]);

  // function getPostById(id) {
  //   return posts.value.find((post) => post.id === id);
  // }

  //댓글 배열
  const newRePost = ref([]);

  // function getRePostById(id) {
  //   return newRePost.value.find((newRePost) => newRePost.id === id);
  // }

  //대댓글 배열
  const toggleRePost = ref({});

  // function gettogglePostById(id) {
  //   return toggleRePost.value.find((toggleRePost) => toggleRePost.id === id);
  // }

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

  // function getCommunityOptionById(id) {
  //   return CommunityOption.value.find(
  //     (CommunityOption) => CommunityOption.id === id
  //   );
  // }

  //날짜 배열
  const CalendarRePost = ref([]);

  // function getCalendarRePostById(id) {
  //   return CalendarRePost.value.find(
  //     (CalendarRePost) => CalendarRePost.id === id
  //   );
  // }
  return {
    posts,
    newRePost,
    toggleRePost,
    CommunityOption,
    CalendarRePost,
    // getCalendarRePostById,
    // getCommunityOptionById,
    // gettogglePostById,
    // getRePostById,
    // getPostById,
  };
});
