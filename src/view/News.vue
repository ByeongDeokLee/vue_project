<template>
  <div>
    <h1>뉴스 게시판</h1>

    <!-- 뉴스 검색 기능 -->
    <input v-model="query" placeholder="검색어를 입력하세요" @input="getNews" />

    <!-- 뉴스 리스트 출력 -->
    <div v-if="news.length">
      <div v-for="(article, index) in news" :key="index" class="news-item">
        <h3>{{ article.title }}</h3>
        <p>{{ article.description }}</p>
        <a :href="article.url" target="_blank">자세히 보기</a>
      </div>
    </div>

    <!-- 뉴스가 없을 때 -->
    <p v-else>뉴스를 불러오는 중입니다...</p>
  </div>
</template>

<script>
import { ref } from "vue";
import { fetchNews } from "../js/actions";

export default {
  name: "NewsPage",
  setup() {
    const news = ref([]); // 뉴스 리스트
    const query = ref("technology"); // 초기 검색 키워드

    // 뉴스 가져오기 함수
    const getNews = async () => {
      news.value = await fetchNews(query.value); // 뉴스 API 호출
    };

    // 컴포넌트가 로드되면 기본 뉴스 가져오기
    getNews();

    return {
      news,
      query,
      getNews,
    };
  },
};
</script>

<style scoped>
.news-item {
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px 0;
}
</style>
