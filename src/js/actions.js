import axios from "axios";
import common from "./common.js";

const url = {
  fetchNewUrl: "https://newsapi.org/v2/everything",
  searchDateUrl: "/naver-api/v1/search/local.json",
  getUserInfoUrl: "/naver-api/v1/nid/me",
};
export const actions = {
  fetchNews(params) {
    console.log("\n\n 안녕 들어왔다 \n\n\n", common.toQueryString(params));
    return axios
      .get(
        `${url.fetchNewUrl}?${common.toQueryString(params)}
      `
      )
      .then(({ data }) => {
        if (data.start == "ok") {
          console.log("통신 완료했다", data);
          return data;
        } else {
          return Promise.reject({
            data,
          });
        }
      })
      .catch((error) => {
        return error;
      });
  },

  getUserInfoAPI(params) {
    console.log("\n 확인 \n", params);
    const header = "Bearer" + params;
    const headers = {
      Authorization: header, // 네이버 API 클라이언트 ID
      // Accept: "application/json", // JSON 응답을 원함
    };
    return axios
      .get(url.getUserInfoUrl, { headers })
      .then(({ data }) => {
        if (data.start == "ok") {
          console.log("통신 완료했다", data);
          return data;
        } else {
          return Promise.reject({
            data,
          });
        }
      })
      .catch((error) => {
        return error;
      });
  },
};
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
    const response = await axios.get(`/naver-api/v1/search/local.json`, {
      params: {
        query: query,
        display: 5,
        start: 1,
        sort: "random",
      },
      headers: {
        "X-Naver-Client-Id": "nPQvqYv2ZtubwhQzisDn", // 네이버 API 클라이언트 ID
        "X-Naver-Client-Secret": "lVR8yLXry2", // 네이버 API 클라이언트 시크릿
        Accept: "application/json", // JSON 응답을 원함
      },
    });

    console.log("응답 ---> ", response);
    console.log("응답 ---> ", response.data.items);
    return response.data.items;
  } catch (error) {
    console.error("Error searchDate:", error);
    return [];
  }
};

export const getUserInfoAPI = async (accessToken) => {
  try {
    console.log("안녕하세여", accessToken);
    const response = await axios.get(`/naver-api/v1/nid/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // 네이버 API 클라이언트 ID
        Accept: "application/json", // JSON 응답을 원함
      },
    });

    console.log("\n\n\n 응답 \n\n\n", response.data);
    return response.data;
  } catch (error) {}
};
