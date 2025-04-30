<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <header class="modal-header">
        <h1>네이버 지도</h1>
        <div class="search-container">
          <div v-if="formSearch">
            <input class="serach-input" type="text" v-model="query" />
            <button @click="searchDateBtn" class="search-but">검색</button>
            <!-- <button v-if="favoriteYn" @click="favoriteAll"></button> -->
          </div>

          <button class="open-sidebar-btn" @click="toggleSidebar" v-else>
            사이드 바 버튼
          </button>
        </div>
        <!-- <button @click="testFuntoin">테스트 용</button> -->
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
          <li @click="setMode('favorites')">
            {{ !favorMap ? "즐겨찾기" : "즐겨찾기 해제" }}
          </li>
          <li @click="setMode('formSearch')">검색</li>
        </ul>
      </aside>

      <!-- 네이버 지도 -->
      <naver-map
        class="map-container"
        :map-options="mapOptions"
        @click="onMapClick($event)"
      >
        <div v-if="!favorMap">
          <naver-marker
            v-for="(marker, index) in markerPosition"
            :key="index"
            :latitude="
              marker.type == 'default' ? marker._lat : marker.event.latlng._lat
            "
            :longitude="
              marker.type == 'default' ? marker._lng : marker.event.latlng._lng
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
            <div v-if="searchDateInfo" class="infowindow-style">
              클릭한 위치
              <button @click="favoritesPin($event, index)">
                {{ !favoriteName[index] ? "즐겨찾기 등록" : "즐겨찾기 해제" }}
              </button>
              <button @click="favoritesDel(index)">핀 제거</button>
            </div>
            <div v-else class="infowindow-style">
              <ul>
                <li>{{ searchDateRes.title }}</li>
                <li>{{ searchDateRes.address }}</li>
                <li>
                  <a :href="searchDateRes.link" target="_blank">{{
                    searchDateRes.link
                  }}</a>
                </li>
                <li @click="favoritesPin($event, index)">
                  {{ !favoriteName[index] ? "즐겨찾기 등록" : "즐겨찾기 해제" }}
                </li>
                <li @click="favoritesDel(index)">핀 제거</li>
              </ul>
            </div>
          </naver-info-window>
        </div>

        <div v-else>
          <naver-marker
            v-for="(marker, index) in favoriteList"
            :key="index"
            :latitude="
              marker.type == 'default' ? marker._lat : marker.event.latlng._lat
            "
            :longitude="
              marker.type == 'default' ? marker._lng : marker.event.latlng._lng
            "
            @onLoad="onLoadMarker($event, index)"
            @click="toggleInfoWindow(index)"
          />
          <naver-info-window
            v-for="(marker, index) in favoriteList"
            :key="index"
            :marker="markerRefs[index]"
            :open="infoWindowOpen[index]"
            @onLoad="onLoadInfoWindow($event, index)"
          >
            <div class="infowindow-style">
              클릭한 위치
              <button @click="favoritesPin($event, index)">
                {{ !favoriteName[index] ? "즐겨찾기 등록" : "즐겨찾기 해제" }}
              </button>
              <button @click="favoritesDel(index)">핀 제거</button>
            </div>
          </naver-info-window>
        </div>
      </naver-map>
    </div>
  </div>
</template>

<script setup>
import { NaverMap, NaverMarker, NaverInfoWindow } from "vue3-naver-maps";
import { ref, onMounted, computed, watch } from "vue";
import { usePostStore } from "@/js/postStore";
import { searchDate } from "../js/actions";

const emit = defineEmits(["close"]);
const store = usePostStore();

const markerPosition = ref([]);
const markerRefs = ref([]);
const infoWindowOpen = ref([]);

const favoriteList = computed(() => store.favoritesRePost);
const favoriteRefs = ref([]);
const favoriteName = ref([]);

const favorMap = ref(false);

const favoriteYn = ref(false);
const formSearch = ref(false);
const searchDateInfo = ref(true);
const searchDateRes = ref([]);
const query = ref("");

const sidebarOpen = ref(false);
const activeMode = ref("all");

// const testList = ref([]);

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
  if (!favoriteName[index]) {
    console.log("등록한다");
  } else {
    console.log("안한다");
  }
};

const onMapClick = (event) => {
  markerPosition.value.push({
    id: Date.now(), // 🔹 고유 ID 추가
    event: event,
  });
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
    if (favoriteList.value.length < 1) {
      return alert("즐겨찾기에 등록된 핀이 없습니다.");
    } else {
      favorMap.value = !favorMap.value;
    }
  } else if (mode === "formSearch") {
    formSearch.value = !formSearch.value;
  } else if (mode === "all") {
  }
};

const favoritesPin = (event, index) => {
  if (!favoriteName.value[index]) {
    favoriteList.value.push(
      JSON.parse(JSON.stringify(markerPosition.value[index]))
    );

    favoriteName.value[index] = true;
  } else {
    favoriteName.value[index] = !favoriteName.value[index];
    favoriteList.value.splice(index, 1);
    favoriteRefs.value.splice(index, 1);
    if (favoriteList.value.length == 0) {
      favorMap.value = !favorMap.value;
    }
  }
};

const favoritesDel = (index) => {
  favoriteList.value.splice(index, 1);
  markerPosition.value.splice(index, 1);
  markerRefs.value.splice(index, 1);
  infoWindowOpen.value.splice(index, 1);
};

const favoriteAll = () => {
  store.favoritesRePost.value = markerPosition.value;
};

const searchDateBtn = () => {
  searchDate(query.value).then((res) => {
    searchDateInfo.value = false;
    searchDateRes.value = res[0]; // 응답을 저장

    markerPosition.value = [];
    const searchLat = res[0].mapx;
    const searchLng = res[0].mapy;

    const _lat = Number(searchLng.slice(0, 2) + "." + searchLng.slice(2));
    const _lng = Number(searchLat.slice(0, 3) + "." + searchLat.slice(3));

    markerPosition.value.push({ _lat, _lng, type: "default" });
    favoriteYn.value = !favoriteYn.value;
  });
};

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

onMounted(() => {
  console.log(markerPosition.value);
});

watch(markerPosition, (newVal, oldVal) => {
  console.log("반응형 데이터 감시 기능11", newVal);
  console.log("반응형 데이터 감시 기능22", oldVal);
  // if (oldVal.length > 1) {
  //   markerPosition.value = favoriteList.value;
  // }
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
  z-index: 2; /*  지도는 사이드바보다 앞에 위치 */
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
.search-but {
  width: 75px;
  height: 35px;
}

.serach-input {
  width: auto;
}
</style>
