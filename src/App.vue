<template>
  <div>
    <router-view
      :user="user"
      @login="handleLogin"
    />
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "App",
  components: {},
  setup() {
    const user = ref(null);

    const handleLogin = (userData) => {
      console.log("App.vue에서 받은 유저 데이터:", userData);
      user.value = userData;
    };
    return { user, handleLogin };
  },
};
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #502c2c;
  margin-top: 60px;
} */
</style>
