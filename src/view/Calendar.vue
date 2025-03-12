<template>
  <div class="calendar-container">
    <div class="header">캘린더</div>
    <div class="calendar">
      <div class="week-days">
        <div v-for="day in weekDays" :key="day" class="day-name">{{ day }}</div>
      </div>
      <div class="days">
        <div v-for="n in startDay" :key="'empty-' + n" class="day empty"></div>
        <div
          v-for="day in daysInMonth"
          :key="day"
          class="day"
          :class="{ selected: isSelected(day) }"
          @click="selectDate(day)"
        >
          {{ day }}
        </div>
      </div>
    </div>
    <p v-if="selectedDate" class="selected-date">
      Selected Date: {{ formattedSelectedDate }}
    </p>
    <button @click="BoardBtn">게시글 이동하기</button>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { usePostStore } from "@/js/postStore";
import { useRouter } from "vue-router";

export default {
  name: "CalendarPage",
  setup() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const posts = computed(() => store.CalendarRePost);

    const store = usePostStore();
    const router = useRouter();
    // 선택된 날짜를 배열로 관리
    // const selectedDates = ref([]);
    const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

    // 현재 월의 총 일수
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    // 현재 월의 시작 요일
    const startDay = new Date(currentYear, currentMonth, 1).getDay();

    // 날짜 선택/해제
    const selectDate = (day) => {
      const date = new Date(currentYear, currentMonth, day);

      if (store.CalendarRePost.length === 0) {
        store.CalendarRePost.push(date);
      } else if (store.CalendarRePost.length === 1) {
        const firstDate = store.CalendarRePost[0];
        const secondDate = date;

        // 날짜 순서 정렬
        const start = firstDate < secondDate ? firstDate : secondDate;
        const end = firstDate < secondDate ? secondDate : firstDate;

        store.CalendarRePost = [];
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          store.CalendarRePost.push(new Date(d));
        }
      } else {
        store.CalendarRePost = [date];
      }
    };

    // 선택된 날짜 확인
    const isSelected = (day) => {
      return store.CalendarRePost.some(
        (d) =>
          d.getDate() === day &&
          d.getMonth() === currentMonth &&
          d.getFullYear() === currentYear
      );
    };

    // 선택된 날짜 문자열로 표시
    const formattedSelectedDates = computed(() =>
      store.CalendarRePost.map((d) => d.toLocaleDateString()).join(", ")
    );

    //게시글로 이동
    const BoardBtn = () => {
      router.push({ path: "/board" });
    };

    onMounted(() => {
      console.log("진입");
    });

    return {
      weekDays,
      daysInMonth,
      startDay,
      // selectedDates,
      posts,
      BoardBtn,
      selectDate,
      isSelected,
      formattedSelectedDates,
    };
  },
};
</script>

<style scoped>
.calendar-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 16px;
  font-weight: bold;
  color: #333;
}

.calendar {
  display: grid;
  grid-template-rows: auto 1fr;
}

.week-days,
.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.day-name {
  text-align: center;
  font-weight: bold;
  padding: 8px 0;
  background-color: #f4f4f4;
  border-radius: 4px;
}

.day {
  padding: 10px 0;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.day:hover {
  background-color: #e0e0e0;
}

.selected {
  background-color: #4f46e5;
  color: #fff;
  font-weight: bold;
}

.empty {
  visibility: hidden;
}

.selected-date {
  margin-top: 16px;
  text-align: center;
  color: #4f46e5;
  font-weight: bold;
}
</style>
