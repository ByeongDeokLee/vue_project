<template>
  <div>
    <h2>사용자 입력</h2>
    <form @submit.prevent="handleSubmit">
      <input v-model="formData.name" placeholder="이름" required />
      <input
        v-model="formData.email"
        type="email"
        placeholder="이메일"
        required
      />
      <button type="submit">제출</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      formData: {
        name: "",
        email: "",
      },
    };
  },
  methods: {
    handleSubmit() {
      if (!this.formData.name || !this.formData.email) {
        alert("이름과 이메일을 입력하세요.!");
        return;
      }
      //   console.log(this.$router);
      this.$router.push(`/user/${this.formData.name}/${this.formData.email}`);
    },
  },
};
</script>

<style></style>
