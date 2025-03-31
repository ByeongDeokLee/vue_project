<template>
  <div class="form-container">
    <h2>테스트</h2>
    <div>
      <input type="text" v-model="query" />
      <button @click="getNews" class="search-but">검색</button>
    </div>
    <p><strong>검색 지역:</strong> {{ query }}</p>
    <div v-for="(newsItem, index) in news" :key="index" class="news-item">
      <h3>{{ newsItem.title }}</h3>
      <p>{{ newsItem.address }}</p>
      <a :href="newsItem.link" target="_blank">자세히 보기</a>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { searchDate } from "../js/actions";

const news = ref([]); // 뉴스 리스트
const query = ref("서울"); // 초기 검색 키워드

const getNews = async () => {
  news.value = await searchDate(query.value); // 뉴스 API 호출
  console.log(query.value);
  console.log(news.value);
};
</script>

<style>
.form-container {
  max-width: 400px;
  margin: auto;
  text-align: center;
}

.search-but {
  width: 100px;
  height: 100px;
}
</style>
