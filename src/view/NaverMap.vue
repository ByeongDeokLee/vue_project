<template>
  <div>
    <h2>네이버 지도</h2>
    <div ref="mapRef" class="map-container"></div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import { ref, onMounted } from "vue";

export default {
  name: "NaverMap",
  setup() {
    const mapRef = ref(null); // 지도 DOM 요소 참조
    const clientId = "za4sh7eidb"; // 네이버 클라이언트 ID 입력

    // 네이버 지도 API 동적 로드
    const loadNaverMap = () => {
      return new Promise((resolve) => {
        if (window.naver && window.naver.maps) {
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`;
        script.async = true;
        script.defer = true;
        script.onload = resolve();

        document.head.appendChild(script);
      });
    };

    // 지도 초기화
    const initMap = () => {
      if (!window.naver || !window.naver.maps) return;

      // new window.naver.maps.Map(mapRef.value, {
      //   center: new naver.maps.LatLng(37.5670135, 126.978374),
      //   zoom: 10,
      // });
      new window.naver.maps.Map(mapRef.value);
    };

    onMounted(async () => {
      await loadNaverMap();
      initMap();
    });

    return { mapRef };
  },
};
</script>

<style>
.map-container {
  width: 100%;
  height: 400px;
}
</style>
