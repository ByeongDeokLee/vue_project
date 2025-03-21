<template>
  <div class="form-container">
    <h2>테스트</h2>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { searchDate } from "../js/news";

const news = ref([]); // 뉴스 리스트
const query = ref("서울"); // 초기 검색 키워드

const getNews = async () => {
  news.value = await searchDate(query.value); // 뉴스 API 호출
  console.log(news.value);
};

onMounted(() => {
  getNews();
});
</script>

<style>
.form-container {
  max-width: 400px;
  margin: auto;
  text-align: center;
}
</style>
