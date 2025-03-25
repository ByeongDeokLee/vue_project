<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <header class="modal-header">
        <h1>네이버 지도</h1>
        <img
          src="@/assets/img/close.webp"
          class="close-btn"
          @click="NaverMapClose"
        />
      </header>

      <!--  사이드바 -->
      <aside class="sidebar" :class="{ open: sidebarOpen }">
        <button class="close-sidebar-btn" @click="toggleSidebar">닫기</button>
        <h2>지도 설정</h2>
        <ul>
          <li @click="setMode('all')">전체 보기</li>
          <li @click="setMode('myLocation')">내 위치</li>
          <li @click="setMode('favorites')">즐겨찾기</li>
        </ul>
      </aside>

      <!--  사이드바 열기 버튼 (사이드바가 닫혀 있을 때만 표시) -->
      <button
        class="open-sidebar-btn"
        @click="toggleSidebar"
        v-if="!sidebarOpen"
      >
        사이드 바 버튼
      </button>

      <!-- 네이버 지도 -->
      <naver-map
        class="map-container"
        :map-options="mapOptions"
        @click="onMapClick($event)"
      >
        <naver-marker
          v-for="(marker, index) in markerPosition"
          :key="index"
          :latitude="
            marker.type == 'default' ? marker._lat : marker.latlng._lat
          "
          :longitude="
            marker.type == 'default' ? marker._lng : marker.latlng._lng
          "
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
            클릭한 위치
            <button @click="favorites(index)">
              {{ !favoriteName[index] ? "즐겨찾기 등록" : "즐겨찾기 해제" }}
            </button>
          </div>
        </naver-info-window>
      </naver-map>
    </div>
  </div>
</template>

<script setup>
import { NaverMap, NaverMarker, NaverInfoWindow } from "vue3-naver-maps";
import { ref, onMounted, computed } from "vue";
import { usePostStore } from "@/js/postStore";

const emit = defineEmits(["close"]);
const store = usePostStore();

const markerPosition = ref([]);
const markerRefs = ref([]);
const infoWindowOpen = ref([]);
const favoriteList = computed(() => store.favoritesRePost);
const favoriteName = ref([]);

const sidebarOpen = ref(false);
const activeMode = ref("all");

const mapOptions = computed(() => ({
  position: { lat: 37.3595704, lng: 127.105399 },
  zoom: 15,
  zoomControl: true,
  zoomControlOptions: { position: "TOP_RIGHT" },
}));

const onLoadMarker = (event, index) => {
  markerRefs.value[index] = event;
  infoWindowOpen.value[index] = true;
};

const toggleInfoWindow = (index) => {
  console.log("toggleInfoWindow", index);
  infoWindowOpen.value[index] = !infoWindowOpen.value[index];
};

const onLoadInfoWindow = (event, index) => {
  console.log("onLoadInfoWindow11111111111111", index);
};

const onMapClick = (event) => {
  markerPosition.value.push(event);
  console.log(markerPosition.value);
};

const setMode = (mode) => {
  activeMode.value = mode;
  if (mode === "myLocation") {
    navigator.geolocation.getCurrentPosition((pos) => {
      const _lat = pos.coords.latitude;
      const _lng = pos.coords.longitude;
      markerPosition.value.push({ _lat, _lng, type: "default" });
    });
  } else if (mode === "favorites") {
    if (favoriteList.value.length < 0) {
      return alert("즐겨찾기에 등록된 핀이 없습니다.");
    } else {
      markerPosition.value = [];
      markerPosition.value = favoriteList.value;
    }
  }
};

const favorites = (index) => {
  if (!favoriteName.value[index]) {
    favoriteList.value.push(markerPosition.value[index]);
    favoriteName.value[index] = true;
  } else {
    favoriteName.value[index] = !favoriteName.value[index];
    favoriteList.value.splice(index, 1);
  }
};

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
/* 모달 스타일 */
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
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  position: relative;
  width: 900px;
  max-width: 90%;
}

/* 헤더 스타일 */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.close-btn {
  width: 30px;
  height: 30px;
  cursor: pointer;
}

/* 지도 스타일 */
.map-container {
  width: 100%;
  height: 600px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 2; /* 🟢 지도는 사이드바보다 앞에 위치 */
}

/* 사이드바 스타일 */
.sidebar {
  position: absolute;
  top: 0;
  left: -300px;
  width: 250px;
  height: 700px;
  border-radius: 8px;
  background: white;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
  padding: 15px;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  z-index: 1;
  transform: translateX(-100%);
  opacity: 0;
}

.sidebar.open {
  transform: translateX(0);
  opacity: 1;
}

/* 사이드바 닫기 버튼 */
.close-sidebar-btn {
  width: 100%;
  padding: 10px;
  background: e0e0e0;
  color: white;
  border: none;
  cursor: pointer;
  margin-bottom: 10px;
}

/*  사이드바 열기 버튼 */
.open-sidebar-btn {
  background: #e0e0e0;
  color: black;
  border: none;
  padding: 6px 12px;
  /* font-size: 14px; */
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
  position: absolute;
  top: 48px;
  right: 50px;
  height: 30px;
  right: 60px;
  width: 150px;
}

/* 마우스 호버 효과 */
.open-sidebar-btn:hover {
  background: #e0e0e0;
}

/* 리스트 스타일 */
.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar ul li {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
  transition: background 0.2s;
}

.sidebar ul li:hover {
  background: #f5f5f5;
}

/* 인포윈도우 스타일 */
.infowindow-style {
  color: black;
  background-color: white;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  padding: 6px 8px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
