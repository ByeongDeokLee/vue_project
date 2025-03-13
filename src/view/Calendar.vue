<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <div class="header">캘린더</div>
      <div class="calendar">
        <div class="week-days">
          <div v-for="day in weekDays" :key="day" class="day-name">
            {{ day }}
          </div>
        </div>
        <div class="days">
          <div
            v-for="n in startDay"
            :key="'empty-' + n"
            class="day empty"
          ></div>
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
      <div>
        <button @click="BoardBtn">게시글 이동하기</button>
        <button @click="closePopup">취소</button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { usePostStore } from "@/js/postStore";

export default {
  name: "CalendarPage",
  emits: ["login"],
  setup(_, { emit }) {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const posts = computed(() => store.CalendarRePost);

    const store = usePostStore();
    // 선택된 날짜를 배열로 관리
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

    //게시글로 이동
    const BoardBtn = () => {
      console.log(
        store.CalendarRePost.map((m) => m.toLocaleDateString("ko-KR"))
      );
      emit("close");
    };

    //팝업 종료
    const closePopup = () => {
      emit("close");
    };

    onMounted(() => {
      console.log("진입");
    });

    return {
      weekDays,
      daysInMonth,
      startDay,
      posts,
      closePopup,
      BoardBtn,
      selectDate,
      isSelected,
    };
  },
};
</script>

<style scoped>
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
