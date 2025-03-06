// src/api/news.js

import axios from "axios";

const API_KEY = "46162df5a3924a9da310086e1aa6c5c0"; // News API에서 발급받은 API 키

export const fetchNews = async (query = "technology") => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/everything`, {
      params: {
        q: query, // 검색할 키워드
        apiKey: API_KEY,
        pageSize: 5, // 불러올 기사 수 (최대 100개)
      },
    });
    return response.data.articles; // 기사 리스트 반환
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};
