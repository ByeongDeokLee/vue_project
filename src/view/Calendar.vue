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
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
export default {
  name: "CalendarPage",
  setup() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    const selectedDate = ref(null);
    const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const startDay = new Date(currentYear, currentMonth, 1).getDay();

    const selectDate = (day) => {
      selectedDate.value = new Date(currentYear, currentMonth, day);
    };

    const isSelected = (day) => {
      return (
        selectedDate.value &&
        selectedDate.value.getDate() === day &&
        selectedDate.value.getMonth() === currentMonth &&
        selectedDate.value.getFullYear() === currentYear
      );
    };

    const formattedSelectedDate = computed(() => {
      console.log(selectedDate.value.toLocaleDateString());
      return selectedDate.value ? selectedDate.value.toLocaleDateString() : "";
    });

    onMounted(() => {
      console.log("currentDate", selectedDate.value);
    });

    return {
      weekDays,
      daysInMonth,
      startDay,
      selectedDate,
      selectDate,
      isSelected,
      formattedSelectedDate,
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
