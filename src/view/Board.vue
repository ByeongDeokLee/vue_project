<template>
  <div class="board-container">
    <h2>게시판</h2>
    <input v-model="searchKeyword" placeholder="검색어 입력" />
    <div class="board-container-test">
      <div class="option-container">
        <div v-for="option in selectOption" :value="option" :key="option">
          <button
            @click="selectOptionBut(option)"
            class="option-but"
            :class="{ selected: selectOption === option.optionId }"
          >
            {{ option.optionText }}
          </button>
        </div>
      </div>
      <button @click="boardListWrite" class="delete-btn">게시글 작성</button>
      <button @click="deleteCheckedPosts" class="delete-btn">선택 삭제</button>

      <transition-group
        v-if="!searchYn"
        name="fade"
        tag="div"
        class="board-list"
      >
        <div
          v-for="Category in CategoryList"
          :key="Category.id"
          class="board-item"
          @click="boardIndexPage(post)"
        >
          <h3>{{ Category.title }}</h3>
          <p>{{ Category.content }}</p>
          <input type="checkbox" v-model="Category.checked" @click.stop />
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { usePostStore } from "@/js/postStore";
import { onMounted, computed, ref, watch } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "BoardPage",
  props: ["user"],
  setup(props, { emit }) {
    const router = useRouter();
    const posts = computed(() => store.posts);
    const selectOption = computed(() => store.CommunityOption);
    const selCategoryBut = ref(null);

    const CategoryList = ref([]);
    const searchKeyword = ref("");
    const searchYn = ref(false);

    const store = usePostStore();

    const boardListWrite = () => {
      // if (!props.user) {
      //   alert("로그인 후 이용 가능합니다.");
      //   return;
      // }

      router.push(`/boardWrite`);
    };

    // 선택된 게시물 삭제
    const deleteCheckedPosts = () => {
      console.log(store.posts);
      CategoryList.value = CategoryList.value.filter((post) => !post.checked);
    };

    //카테고리
    const selectOptionBut = (option) => {
      if (!posts.value.length) {
        alert("게시된 게시글이 없습니다.");
        return;
      }
      //기존 데이터 초기화
      CategoryList.value = [];
      selCategoryBut.value = option.optionId;
      //카테고리 별 배열 추가
      if (option.optionId == "1") {
        CategoryList.value = posts.value;
      } else {
        CategoryList.value = CategoryList.value.concat(
          posts.value.filter((post) => post.optionId === option.optionId)
        );
      }
    };

    //검색기능(반응형 데이터 감시 기능)
    watch(searchKeyword, (newKeyword) => {
      CategoryList.value = posts.value.filter((post) =>
        post.title.includes(newKeyword)
      );
    });
    // 상세페이지 이동
    const boardIndexPage = (post) => {
      console.log("데이터 확인", posts);
      emit("login", post);
      router.push(`/board/${post.id}`);
    };

    // 초기 게시물 로딩
    onMounted(() => {
      CategoryList.value = posts.value;
    });

    return {
      posts,
      selectOption,
      CategoryList,
      searchKeyword,
      searchYn,
      selCategoryBut,
      boardIndexPage,
      deleteCheckedPosts,
      boardListWrite,
      selectOptionBut,
    };
  },
};
</script>

<style scoped>
.board-container {
  padding: 2rem;
  max-width: 700px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.board-container-test {
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
}

h2 {
  text-align: center;
  color: #333;
}

.post-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.post-form input,
.post-form textarea {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.post-form button {
  padding: 0.5rem;
  background: #d3d3d3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.post-form button:hover {
  background: #d3d3d3;
}

.board-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.board-item {
  background: linear-gradient(135deg, #d3d3d3, #f5f3f3);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s;
}

.board-item:hover {
  transform: scale(1.03);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.option-container {
  display: flex;
  gap: 25px; /* 버튼 사이 간격 설정 */
}

.option-but {
  display: inline-flex; /* 글씨 크기에 맞게 자동 조정 */
  align-items: center;
  justify-content: center;
  padding: 10px; /* 내부 여백 */
  font-size: 16px; /* 글씨 크기 */
  background-color: lightgray;
  color: black;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  white-space: nowrap; /* 글씨가 길어져도 줄바꿈 방지 */
}

.option-but:hover {
  background-color: #d3d3d3;
}

.selected {
  background-color: blue !important; /* 선택된 버튼의 배경색 */
  color: white;
}
</style>
