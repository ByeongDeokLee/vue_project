<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <div>
        <h1>네이버 지도</h1>
        <img
          src="@/assets/img/close.webp"
          @click="NaverMapClose"
          class="naver_close"
        />
      </div>

      <!-- 🟢 사이드바 -->
      <div class="sidebar" :class="{ open: sidebarOpen }">
        <button class="close-btn" @click="toggleSidebar">닫기</button>
        <h2>지도 설정</h2>
        <ul>
          <li @click="setMode('all')">📌 전체 보기</li>
          <li @click="setMode('myLocation')">📍 내 위치</li>
          <li @click="setMode('favorites')">⭐ 즐겨찾기</li>
        </ul>
      </div>

      <!-- 🟢 사이드바 열기 버튼 -->
      <button class="open-btn" v-if="!sidebarOpen" @click="toggleSidebar">
        ☰
      </button>

      <!-- 네이버 지도 -->
      <naver-map
        style="width: 400px; height: 400px"
        :map-options="mapOptions"
        @click="onMapClick($event)"
      >
        <naver-marker
          v-for="marker in markerPosition"
          :key="marker"
          :latitude="marker.lat"
          :longitude="marker.lng"
          @load="onMarkerLoaded"
          @click="onMarkerClicked"
        >
        </naver-marker>
        <naver-info-window
          v-if="isInfoWindowOpen"
          :latitude="markerPosition[0].lat"
          :longitude="markerPosition[0].lng"
          :max-width="140"
          :border-width="5"
          :border-color="'#2db400'"
          :background-color="'#eee'"
          :anchor-size="anchorSize"
          :anchor-skew="true"
          :anchor-color="'#eee'"
        >
          <div class="info-window">
            <div style="font-weight: bold; margin-bottom: 5px">
              {{ mapOptions.FNAME }}
            </div>
            <div style="font-size: 13px">
              {{ mapOptions.ANAME }}
            </div>
          </div>
        </naver-info-window>
      </naver-map>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import { NaverMap, NaverMarker } from "vue3-naver-maps";
import { ref, onMounted, computed } from "vue";

export default {
  name: "NaverMapComponent",
  components: {
    NaverMap,
    NaverMarker,
  },
  emits: ["close"],
  setup(_, { emit }) {
    // 기본 마커
    const markerPosition = ref([]);
    const isInfoWindowOpen = ref(false);
    const sidebarOpen = ref(false); // 사이드바 열림/닫힘 상태
    const activeMode = ref("all"); // 현재 선택된 모드

    // 지도 옵션 설정
    const mapOptions = computed(() => ({
      position: (37.3595704, 127.105399),
      zoom: 15,
      FNAME: "화장실 이름",
      ANAME: "화장실 위치",
    }));

    //마커 로드
    const onMarkerLoaded = (vue) => {
      console.log("onMarkerLoaded==========>", vue);
    };

    //마커 이벤트 핸들링
    const onMarkerClicked = (event) => {
      console.log("onMarkerClicked==========>", event);
      isInfoWindowOpen.value = !isInfoWindowOpen.value;
    };

    // 지도 클릭 시 마커 위치 변경
    const onMapClick = (event) => {
      if (event.latlng) {
        markerPosition.value.push({
          lat: event.latlng._lat,
          lng: event.latlng._lng,
        });
      }
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
      markerPosition.value = [];
    });

    const anchorSize = ref({ width: 30, height: 30 });

    const NaverMapClose = () => {
      emit("close");
    };

    return {
      markerPosition,
      mapOptions,
      isInfoWindowOpen,
      sidebarOpen,
      activeMode,
      setMode,
      toggleSidebar,
      onMapClick,
      NaverMapClose,
      onMarkerLoaded,
      onMarkerClicked,
      anchorSize,
    };
  },
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
  padding: 10px;
  font-size: 14px;
}
</style>
