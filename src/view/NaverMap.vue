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

      <!-- 네이버 지도 -->
      <naver-map
        style="width: 400px; height: 400px"
        :map-options="mapOptions"
        @click="onMapClick($event)"
      >
        <div v-if="markerref">
          <naver-marker
            v-for="marker in markerPosition"
            :key="marker"
            :latitude="marker.lat"
            :longitude="marker.lng"
            @load="onMarkerLoaded"
            @click="onMarkerClicked"
          >
          </naver-marker>
        </div>
      </naver-map>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import { NaverMap, NaverMarker } from "vue3-naver-maps";
import { ref, onMounted } from "vue";

export default {
  name: "NaverMapComponent",
  components: {
    NaverMap,
    NaverMarker,
  },
  emits: ["close"],
  setup(_, { emit }) {
    const markerref = ref(true);
    // 기본 마커 위치
    const markerPosition = ref([]);
    // const markerPosition = ref({
    //   lat: 37.3595704,
    //   lng: 127.105399,
    // });

    // 지도 옵션 설정
    const mapOptions = {
      latitude: markerPosition.value.lat, // 초기 지도 중앙 위치
      longitude: markerPosition.value.lng,
      zoom: 15,
    };

    //마커 로드
    const onMarkerLoaded = (vue) => {
      console.log("onMarkerLoaded==========>", vue);
    };

    //마커 이벤트 핸들링
    const onMarkerClicked = (event) => {
      console.log("onMarkerClicked==========>", event);
      markerref.value = false;
      // onMarkerLoaded(event);
    };

    // 지도 클릭 시 마커 위치 변경
    const onMapClick = (event) => {
      console.log("dsdasda", !markerref.value);
      if (!markerref.value) {
        console.log("마커를 보여주어");
        markerref.value = true;
      }

      if (event.latlng) {
        markerPosition.value.push({
          lat: event.latlng._lat,
          lng: event.latlng._lng,
        });
        console.log("\n\n 마커 \n\n", markerPosition.value);
      }
    };

    onMounted(() => {
      // markerPosition.value ( )
      markerref.value = false;
      markerPosition.value = [];
    });

    const NaverMapClose = () => {
      emit("close");
    };

    return {
      markerPosition,
      mapOptions,
      onMapClick,
      NaverMapClose,
      onMarkerLoaded,
      onMarkerClicked,
      markerref,
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
</style>
