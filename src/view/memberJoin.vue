<template>
  <div class="signup-container">
    <h2>회원가입</h2>

    <div>
      <v-btn dark depressed @click="getCurrentPosition()">위치 좌표 확인</v-btn>
      <div>{{ isPositionReady ? "yes" : "no" }}</div>
    </div>

    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="email">이메일</label>
        <input type="email" id="email" v-model="form.email" required />
      </div>

      <div class="form-group">
        <label for="password">비밀번호</label>
        <input type="password" id="password" v-model="form.password" required />
      </div>

      <div class="form-group">
        <label for="confirmPassword">비밀번호 확인</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="form.confirmPassword"
          required
        />
      </div>

      <div class="form-group">
        <label for="username">사용자 이름</label>
        <input type="text" id="username" v-model="form.username" required />
      </div>

      <div class="form-group">
        <label for="phone">전화번호</label>
        <input type="text" id="phone" v-model="form.phone" required />
      </div>

      <button type="submit" class="signup-btn">회원가입</button>
    </form>

    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
export default {
  name: "memberJoinPage",
  setup() {
    const form = ref({
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      phone: "",
    });

    const errorMessage = ref("");

    const positionObj = reactive({ latitude: null, longitude: null });
    const isPositionReady = ref(false);

    const getCurrentPosition = () => {
      if (!navigator.geolocation) {
        setAlert("위치 정보를 찾을 수 없습니다.1");
      } else {
        navigator.geolocation.getCurrentPosition(
          getPositionValue(),
          geolocationError()
        );
      }
    };

    const getPositionValue = (val) => {
      positionObj.value.latitude = val.coords.latitude;
      positionObj.value.longitude = val.coords.longitude;
      isPositionReady.value = true;
      setAlert("주소 확인 완료");
    };

    const geolocationError = () => {
      setAlert("위치 정보를 찾을 수 없습니다.2");
    };

    const setAlert = (text) => {
      alert(text);
    };

    const handleSubmit = () => {
      if (form.value.password !== form.value.confirmPassword) {
        errorMessage.value = "비밀번호와 비밀번호 확인이 일치하지 않습니다.";
        return;
      }

      // 여기에 실제 회원가입 로직을 추가합니다.
      // 예: API 호출 등을 통해 서버로 데이터 전송

      // 회원가입 성공 후 처리를 추가할 수 있습니다.
      console.log("회원가입 성공", form.value);
      errorMessage.value = "";
    };
    return {
      form,
      positionObj,
      isPositionReady,
      getCurrentPosition,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
.signup-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 0.5rem;
}

button.signup-btn {
  width: 100%;
  padding: 0.8rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button.signup-btn:hover {
  background-color: #45a049;
}

.error-message {
  color: red;
  font-size: 14px;
  text-align: center;
}
</style>
