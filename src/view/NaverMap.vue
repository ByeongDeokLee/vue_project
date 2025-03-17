<template>
  <div>
    <h2>네이버 지도</h2>
    <div ref="mapRef" class="map-container"></div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
// import { onMounted, ref } from "vue";

// export default {
//   name: "NaverMap",
//   setup() {
//     const mapRef = ref(null); // 지도 DOM 요소 참조
//     const clientId = ""; // 네이버 클라이언트 ID 입력

//     // 네이버 지도 API 동적 로드
//     const loadNaverMap = () => {
//       return new Promise((resolve) => {
//         /*      if (window.naver && window.naver.maps) {
//           resolve();
//           return;
//         } */
//         const script = document.createElement("script");
//         script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`;
//         script.async = true;
//         script.defer = true;
//         script.onload = resolve();
//         console.log(script);
//         document.head.appendChild(script);
//       });
//     };

//     // 지도 초기화
//     const initMap = () => {
//       console.log("🗺️ mapRef.value:", mapRef.value); // mapRef가 제대로 참조되었는지 확인
//       // if (!window.naver || !window.naver.maps) return;

//       // new window.naver.maps.Map(mapRef.value, {
//       //   center: new naver.maps.LatLng(37.5670135, 126.978374),
//       //   zoom: 10,
//       // });

//       new window.naver.maps.Map(mapRef.value);
//     };

//     onMounted(async () => {
//       await loadNaverMap();
//       initMap();
//     });

//     return { mapRef };
//   },
// };
import { ref, onMounted, nextTick } from "vue";

export default {
  setup() {
    const mapRef = ref(null);
    const clientId = "za4sh7eidb";

    const loadNaverMap = () => {
      return new Promise((resolve, reject) => {
        console.log("\n\n\n1111\n\n\n", window.naver);
        console.log("\n\n\n2222\n\n\n", window.naver.maps);
        // if (window.naver && window.naver.maps) {
        //   console.log("✅ 네이버 지도 API 이미 로드됨");
        //   resolve();
        //   return;
        // }
        const script = document.createElement("script");
        script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`;
        script.async = true;
        script.defer = true;

        const timeout = setTimeout(() => {
          reject(new Error("❌ 네이버 지도 API 로드 타임아웃 (5초 초과)"));
        }, 5000); // 5초 타임아웃 설정

        script.onload = () => {
          clearTimeout(timeout); // 정상적으로 로드되면 타임아웃 해제
          console.log(script.onload);
          console.log("✅ 네이버 지도 API 스크립트 로드 완료");
          resolve();
        };
        script.onerror = (error) => {
          clearTimeout(timeout); // 정상적으로 로드되면 타임아웃 해제
          console.error("❌ 네이버 지도 API 스크립트 로드 실패", error);
          reject(error);
        };
        document.head.appendChild(script);
      });
    };

    const initMap = () => {
      console.log("🗺️ mapRef.value:", mapRef.value); // mapRef가 제대로 참조되었는지 확인
      if (window.naver && window.naver.maps && mapRef.value) {
        const map = new window.naver.maps.Map(mapRef.value, {
          center: new window.naver.maps.LatLng(37.5665, 126.978),
          zoom: 10,
        });
        console.log("✅ 네이버 지도 초기화 완료", map);
      } else {
        console.error(
          "❌ mapRef가 존재하지 않거나, 네이버 지도 API가 로드되지 않음"
        );
      }
    };

    onMounted(async () => {
      try {
        await loadNaverMap();
        await nextTick(); // DOM 렌더링 완료 후 실행
        initMap();
      } catch (error) {
        console.error("❌ 네이버 지도 로드 중 오류 발생", error);
      }
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
