<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <div>
        <h1>네이버 지도</h1>
        <img
          src="@/assets/img/close.webp"
          class="naver_close"
          @click="NaverMapClose"
        >
      </div>

      <!-- 🟢 사이드바 -->
      <div
        class="sidebar"
        :class="{ open: sidebarOpen }"
      >
        <button
          class="close-btn"
          @click="toggleSidebar"
        >
          닫기
        </button>
        <h2>지도 설정</h2>
        <ul>
          <li @click="setMode('all')">
            📌 전체 보기
          </li>
          <li @click="setMode('myLocation')">
            📍 내 위치
          </li>
          <li @click="setMode('favorites')">
            ⭐ 즐겨찾기
          </li>
        </ul>
      </div>

      <!-- 🟢 사이드바 열기 버튼 -->
      <button
        v-if="!sidebarOpen"
        class="open-btn"
        @click="toggleSidebar"
      >
        ☰
      </button>

      <!-- 네이버 지도 -->
      <naver-map
        style="width: 400px; height: 400px"
        :map-options="mapOptions"
        @click="onMapClick($event)"
      >
        <naver-marker
          v-for="(marker, index) in markerPosition"
          :key="index"
          :latitude="markerPosition[index].latlng._lat"
          :longitude="markerPosition[index].latlng._lng"
          @onLoad="onLoadMarker($event, index)"
          @click="toggleInfoWindow(index)"
        />
        <naver-info-window
          v-for="(marker, index) in markerPosition"
          :key="index"
          :marker="markerRefs[index]"
          :open="infoWindowOpen[index]"
          @onLoad="onLoadInfoWindow($event, index)"
        >
          <div class="infowindow-style">
            click Marker!😎
          </div>
        </naver-info-window>
      </naver-map>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable no-undef */
import { NaverMap, NaverMarker, NaverInfoWindow } from "vue3-naver-maps";
import { ref, onMounted, computed } from "vue";

const emit = defineEmits(["close"]);
// 기본 마커 및 정보사항
const markerPosition = ref([]);
const markerRefs = ref([]);
const infoWindowOpen = ref([]);

const sidebarOpen = ref(false); // 사이드바 열림/닫힘 상태
const activeMode = ref("all"); // 현재 선택된 모드

// 지도 옵션 설정
const mapOptions = computed(() => ({
  position: (37.3595704, 127.105399),
  zoom: 15,
  zoomControl: false,
  zoomControlOptions: { position: "TOP_RIGHT" },
}));

/* ------------------------------------ */
//마커 로드
const onLoadMarker = (event, index) => {
  markerRefs.value[index] = event;
  infoWindowOpen.value[index] = true;
};

const toggleInfoWindow = (index) => {
  infoWindowOpen.value[index] = !infoWindowOpen.value[index];
};

//마커 정보창
const onLoadInfoWindow = (event, index) => {
  console.log(markerRefs.value[index]);
  //infoWindowOpen.value[index] = false;
};

// // 지도 클릭 시 마커 위치 변경
const onMapClick = (event) => {
  markerPosition.value.push(event);
  console.log(markerPosition.value);
};

// 모드 변경
const setMode = (mode) => {
  activeMode.value = mode;

  if (mode === "myLocation") {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      markerPosition.value.push({ lat, lng, type: "default" });
    });
  }
};

// 사이드바 열고 닫기
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

onMounted(() => {
  console.log(markerPosition.value);
});

const NaverMapClose = () => {
  emit("close");
};
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.map-container {
  width: 100%;
  height: 400px;
}

/* 사이드 바 */
.open-btn {
  position: absolute;
  top: 20px;
  left: 20px;
  background: #0070f3;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 18px;
  border-radius: 5px;
}

.close-btn {
  width: 100%;
  padding: 10px;
  background: red;
  color: white;
  border: none;
  cursor: pointer;
  margin-bottom: 10px;
}

/* 🟢 리스트 스타일 */
.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar ul li {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
}

.sidebar ul li:hover {
  background: #f5f5f5;
}

.naver_close {
  object-fit: contain;
  width: 30px;
  height: 30px;
}

.info_window {
  color: black;
  background-color: white;
  text-align: center;
  font-weight: 600;
  font-size: 20px;
  padding: 6px 8px;
}
</style>
