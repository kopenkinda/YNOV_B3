<script>
import { computed, reactive } from 'vue';
import AppNewQuestion from '../../components/new-question.vue';

export default {
  components: {
    AppNewQuestion,
  },
  setup() {
    const questions = reactive([]);
    const totalEarnings = computed(() => questions.reduce((acc, question) => acc + question.earnings, 0));
    const addQuestion = () => {
      const id = Date.now().toString() + Math.random().toString();
      questions.push({
        id,
        label: '',
        earnings: 0,
        answer: 'NONE',
        choices: [],
      });
    };
    window.xd = () => console.log(questions);
    return {
      questions,
      addQuestion,
      totalEarnings,
    };
  },
};
</script>

<template>
  <div class="row mb-4">
    <div class="col">
      <div class="d-flex justify-content-between align-items-center">
        <h4>Create new quiz</h4>
        <button class="btn btn-success">Save</button>
      </div>
    </div>
  </div>
  <div class="row mb-4">
    <div class="col">
      <div class="d-flex justify-content-between mb-4">
        <b>Number of questions: {{ questions.length }}</b>
        <b>Total earnings: {{ totalEarnings }}</b>
      </div>
      <app-new-question v-for="question in questions" :key="question.id" :question="question" />
      <button class="btn btn-secondary text-center w-100" @click="addQuestion">Add a question</button>
    </div>
  </div>
</template>
