<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="board-container">
    <h2>게시판</h2>
    <div class="button-group">
      <button class="action-btn" @click="CalendarBtn">캘린더 보기</button>
      <button class="action-btn" @click="NewPage">뉴스 페이지 이동</button>
      <div id="naver_id_login"></div>
      <!-- <button class="action-btn" @click="naverLoginBtn">네이버 로그인</button> -->
      <button class="action-btn" @click="naverMapBtn">네이버 지도</button>
      <NaverMap v-if="showMapModal" @close="handleMapClose" />
    </div>

    <Calendar v-if="showCalendarModel" @close="handleCalendarClose" />

    <input
      v-model="searchKeyword"
      placeholder="검색어를 입력하세요"
      class="search-input"
    />

    <div class="board-actions">
      <div class="option-container">
        <button
          v-for="option in selectOption"
          :key="option.optionId"
          class="option-btn"
          :class="{ selected: selCategoryBut === option.optionId }"
          @click="selectOptionBut(option)"
        >
          {{ option.optionText }}
        </button>
      </div>
    </div>
    <div class="write-actions">
      <button class="primary-btn" @click="boardListWrite">게시글 작성</button>
      <button class="danger-btn" @click="deleteCheckedPosts">선택 삭제</button>
    </div>

    <LoginPopup v-if="showLoginModal" :user="user" @close="handleLoginClose" />
    <BoardWrite v-if="showBoardWriModal" @close="handleBoardWriClose" />

    <transition-group v-if="!searchYn" name="fade" tag="div" class="board-list">
      <div
        v-for="Category in CategoryList"
        :key="Category"
        class="board-item"
        @click="boardIndexPage(Category)"
      >
        <h3>{{ Category.title }}</h3>
        <p>{{ Category.content }}</p>
        <input v-model="Category.checked" type="checkbox" @click.stop />
      </div>
    </transition-group>
  </div>
</template>

<script setup>
/* eslint-disable no-undef */
import { usePostStore } from "@/js/postStore";
import { onMounted, computed, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import LoginPopup from "@/view/LoginPopup.vue";
import BoardWrite from "@/view/BoardWrite.vue";
import Calendar from "@/view/Calendar.vue";
import NaverMap from "@/view/NaverMap.vue";

// Naver 로그인 초기화
const clientId = "nPQvqYv2ZtubwhQzisDn"; // 여기에 네이버 개발자 센터에서 발급받은 클라이언트 ID를 넣어야 합니다.
const callbackUrl = "http://localhost:8080/naverLogin"; // 인코딩 필수!
// const state = Math.random().toString(36).substring(7);

const emit = defineEmits(["close"]);

const router = useRouter();
const posts = computed(() => store.posts);
const selectOption = computed(() => store.CommunityOption);
const selCategoryBut = ref(null);

const CategoryList = ref([]);
const searchKeyword = ref("");
const searchYn = ref(false);

//페이지 노출 조건 변수
const showLoginModal = ref(false);
const showBoardWriModal = ref(false);
const showCalendarModel = ref(false);
const showMapModal = ref(false);
const LoginDataForm = ref({});

// const CalendarList = computed(() => store.CalendarRePost);

//네이버 로그인
const naverLogin = ref(null);
const route = useRoute();

const store = usePostStore();

//게시물 작성
const boardListWrite = () => {
  showBoardWriModal.value = true;
};

// 선택된 게시물 삭제
const deleteCheckedPosts = () => {
  console.log(store.posts);
  CategoryList.value = CategoryList.value.filter((post) => !post.checked);
};

//로그인 팝업 닫기
const handleLoginClose = (data) => {
  if (data) {
    LoginDataForm.value = data;
  }
  showLoginModal.value = false; // 모달 닫기
};

//게시글 작성 팝업 닫기
const handleBoardWriClose = () => {
  console.log("handleBoardWriClose");
  showBoardWriModal.value = false; // 모달 닫기
};

//캘린더 팝업 닫기
const handleCalendarClose = (data) => {
  if (data == "NO") {
    showCalendarModel.value = false;
    return;
  }

  CategoryList.value = [];

  for (let i = 0; i < store.CalendarRePost.length; i++) {
    for (let j = 0; j < posts.value.length; j++) {
      const calendarDate = store.CalendarRePost[i].toLocaleDateString("ko-KR");
      const categoryDate = posts.value[j].writeDate;

      // 날짜 비교 (year, month, day 각각 비교)
      if (calendarDate == categoryDate) {
        CategoryList.value.push(posts.value[j]);
      }
    }
  }

  showCalendarModel.value = false; // 모달 닫기
};

//네이버 지도
const handleMapClose = () => {
  showMapModal.value = false;
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

// //네이버 로그인 버튼
// const naverLoginBtn = () => {
//   const loginUrl = `http://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;
//   window.location.href = loginUrl; // 네이버 로그인 페이지로 이동
//   router.push({ path: "/home" });
// };

// 상세페이지 이동
const boardIndexPage = (post) => {
  console.log(post);
  emit("login", post);
  router.push(`/board/${post}`);
};

// 뉴스 페이지
const NewPage = () => {
  router.push({ path: "/newsPage" });
};

//캘린더
const CalendarBtn = () => {
  showCalendarModel.value = true;
};

//네이버 지도
const naverMapBtn = () => {
  // router.push({ path: "/naverMap" });
  showMapModal.value = true;
};

// 초기 게시물 로딩
onMounted(() => {
  CategoryList.value = posts.value;
  selCategoryBut.value = selectOption.value[0].optionId;
  TestMap();

  // 네이버 로그인 객체 생성
  naverLogin.value = new window.naver_id_login(clientId, callbackUrl);

  // CSRF 방지를 위한 상태값 설정
  const state = naverLogin.value.getUniqState();
  naverLogin.value.setState(state);

  // 네이버 로그인 버튼 설정
  naverLogin.value.setButton("white", 2, 40);
  naverLogin.value.setDomain("http://localhost:8080");

  // 네이버 로그인 초기화
  naverLogin.value.init_naver_id_login();

  // ✅ 네이버 로그인 후 콜백 URL에서 `access_token` 확인
  if (route.query.access_token) {
    accessToken.value = route.query.access_token;
    console.log("네이버 액세스 토큰:", accessToken.value);
  }
});

const TestMap = () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log("위도:", position.coords.latitude);
      console.log("경도:", position.coords.longitude);
    },
    (error) => {
      console.error("위치 정보를 가져올 수 없습니다:", error);
    }
  );
};
</script>

<style scoped>
.board-container {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
}

.button-group {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.action-btn {
  padding: 10px 16px;
  border: none;
  background-color: #f0f0f0;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.action-btn:hover {
  background-color: #dcdcdc;
}

.search-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.board-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.option-container {
  display: flex;
  gap: 10px;
}

.option-btn {
  padding: 8px 14px;
  background-color: #e0e0e0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.option-btn.selected {
  background-color: red;
  color: #fff;
}

.option-btn:hover {
  background-color: #bbb;
}

.write-actions {
  display: flex;
  gap: 10px;
}

.primary-btn,
.danger-btn {
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.primary-btn {
  background-color: #e0e0e0;
  color: black;
}

.primary-btn:hover {
  background-color: #e0e0e0;
}

.danger-btn {
  background-color: #e0e0e0;
  color: black;
}

.danger-btn:hover {
  background-color: #e0e0e0;
}

.board-list {
  /* display: grid; */
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.2rem;
}

.board-item {
  background: linear-gradient(135deg, #f0f0f0, #e2e2e2);
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.board-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
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
</style>
