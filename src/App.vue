<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <Counter></Counter> -->
  <!-- <FormData></FormData> -->
  <!-- <Home></Home> -->
  <Login></Login>
</template>

<script>
// import Counter from "./components/Counter.vue";
// import FormData from "./components/FomeDate.vue";
// import Home from "./view/Home.vue";
import Login from "./view/Login.vue";

export default {
  name: "App",
  components: {
    // Counter,
    // FormData,
    // Home,
    Login,
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
