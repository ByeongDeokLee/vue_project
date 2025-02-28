<template>
  <div>
    <router-view />
  </div>
</template>

<script>
// import { ref } from "vue";
export default {
  name: "App",
  components: {},
  setup() {
    // const user = ref(null);
    // const loginRef = ref(null);
    // const handleLogin = (userInfo) => {
    //   user.value = userInfo;
    // };
    // return { user, loginRef, handleLogin };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
