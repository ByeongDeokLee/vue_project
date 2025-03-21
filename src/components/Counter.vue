<template>
  <div>
    <h1>카운트 : {{ count }}</h1>
    <button @click="increaseCount">
      +1 증가
    </button>
  </div>
</template>

<script>
export default {
  name: "MyCounter",
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    increaseCount() {
      this.count++;
    },
  },
};
</script>

<style>
button {
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
}
</style>
