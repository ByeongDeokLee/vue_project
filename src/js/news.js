// src/api/news.js

import axios from "axios";

export const fetchNews = async (query = "technology") => {
  try {
    const API_KEY = "46162df5a3924a9da310086e1aa6c5c0"; // News API에서 발급받은 API 키
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

export const searchDate = async (query) => {
  try {
    const API_ID = "nPQvqYv2ZtubwhQzisDn"; // 네이버 API에서 발급받은 API 키
    const API_PWD = "lVR8yLXry2"; // 네이버 API에서 발급받은 API 키
    console.log("\n\n  여기 들어옴? \n\n\n");
    const response = await axios.get(`/naver-api/v1/search/local.json`, {
      params: {
        q: query,
        display: 5,
        start: 1,
        sort: "random",
      },
      headers: {
        "X-Naver-Client-Id": API_ID, // 네이버 API 클라이언트 ID
        "X-Naver-Client-Secret": API_PWD, // 네이버 API 클라이언트 시크릿
        Accept: "application/json", // JSON 응답을 원함
      },
    });

    console.log("응답 ---> ", response);
    console.log("응답 ---> ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error searchDate:", error);
    return [];
  }
};
