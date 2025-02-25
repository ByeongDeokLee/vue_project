<template>
  <div>
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
    <p v-if="submitted">
      제출 완료: {{ formData.name }} ({{ formData.email }})
    </p>
  </div>
</template>

<script>
export default {
  name: "FomeDate",
  data() {
    return {
      formData: {
        name: "",
        email: "",
      },
      submitted: false,
    };
  },
  methods: {
    handleSubmit() {
      if (!this.formData.name || !this.formData.email) {
        alert("이름과 이메일을 입력하세요!");
        return;
      }
      this.submitted = true;
    },
  },
};
</script>
