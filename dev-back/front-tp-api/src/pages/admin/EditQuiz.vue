<script>
import { useRoute } from 'vue-router';
export default {
  setup() {
    const route = useRoute();
    const quiz = route.params.quizId;
    return {
      quiz,
    };
  },
};
</script>

<template>Edit Quiz Page #{{ quiz }}</template>
