<template>
  <div>
    <h2>입력한 정보</h2>
    <p>이름 : {{ userName }}</p>
    <p>이메일 : {{ userEmail }}</p>
    <router-link to="/">홈으로</router-link>
  </div>
</template>

<script>
export default {
  name: "UserDetail",
  computed: {
    userName() {
      return this.$route.params.name;
    },
    userEmail() {
      return this.$route.params.email;
    },
  },
};
</script>

<style></style>
