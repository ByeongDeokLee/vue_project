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
      <naver-map style="width: 400px; height: 400px" :map-options="mapOptions">
        <naver-marker>
          <div class="marker">
            <!-- <img :src="clinic.imageUrl" /> -->
          </div>
        </naver-marker>
      </naver-map>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import { NaverMap, NaverMarker } from "vue3-naver-maps";
import { onMounted } from "vue";

export default {
  name: "NaverMapComponent",
  components: {
    NaverMap,
    NaverMarker,
  },
  emits: ["close"],
  setup(_, { emit }) {
    onMounted(() => {
      // 지도, 마커, 인포윈도우 초기화
      const cityhall = new naver.maps.LatLng(37.5666805, 126.9784147);
      const map = new naver.maps.Map("map", {
        center: cityhall.destinationPoint(0, 500),
        zoom: 15,
      });

      const marker = new naver.maps.Marker({
        map: map,
        position: cityhall,
      });

      const contentString = `
        <div class="iw_inner">
          <h3>서울특별시청</h3>
          <p>서울특별시 중구 태평로1가 31 | 서울특별시 중구 세종대로 110 서울특별시청<br />
             <img src="/img/example/hi-seoul.jpg" width="55" height="55" alt="서울시청" class="thumb" /><br />
             02-120 | 공공,사회기관 &gt; 특별,광역시청<br />
             <a href="http://www.seoul.go.kr" target="_blank">www.seoul.go.kr/</a>
          </p>
        </div>
      `;

      const infowindow = new naver.maps.InfoWindow({
        content: contentString,
      });

      naver.maps.Event.addListener(marker, "click", function () {
        if (infowindow.getMap()) {
          infowindow.close();
        } else {
          infowindow.open(map, marker);
        }
      });

      infowindow.open(map, marker);
    });

    const NaverMapClose = () => {
      emit("close");
    };

    const mapOptions = {
      latitude: 37.51347, // 지도 중앙 위도
      longitude: 127.041722, // 지도 중앙 경도
      zoom: 13,
    };
    /*  const props = defineProps({
      id: {
        type: String,
        required: true,
      },
      imageUrl: {
        type: String,
        required: true,
      },
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    });

    const marker = ref(null);

    watch(
      () => [marker.value],
      () => {
        if (!marker.value) return;

        marker.value.setIcon({
          content: `<div class="marker">
        <img src="${props.imageUrl}" />
      </div>`,
        });
      }
    );
    const mapOptions = {
      latitude: 37.51347, // 지도 중앙 위도
      longitude: 127.041722, // 지도 중앙 경도
      zoom: 13,
    };

    const NaverMapClose = () => {
      emit("close");
    }; */
    return { mapOptions, NaverMapClose };
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
  width: 300px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.map-container {
  width: 100%;
  height: 400px;
}
.naver_close {
  object-fit: contain;
  width: 30px;
  height: 30px;
}
</style>
