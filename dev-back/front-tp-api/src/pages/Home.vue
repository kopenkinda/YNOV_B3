<script>
import { onMounted, reactive } from 'vue';
import API from '../api';
import useAuth from '../store/auth';

export default {
  setup() {
    const quizzes = reactive([]);
    const { loggedIn } = useAuth();
    onMounted(async () => {
      const fetched = await API.getQuizzes();
      quizzes.splice(0, quizzes.length, ...fetched.filter((quiz) => quiz.published));
    });
    return {
      quizzes,
      loggedIn,
    };
  },
};
</script>

<template>
  <div class="row mb-4">
    <div class="col">
      <h1>Quizzes</h1>
    </div>
  </div>
  <div class="row">
    <div class="col-12 col-md-4" v-for="quiz in quizzes">
      <div class="card mb-2">
        <div class="card-body">
          <div class="card-title">{{ quiz.label }}</div>
          <div class="card-text">
            <router-link :to="`/take-quiz/${quiz.id}`" class="btn btn-primary">Take Quiz</router-link>
          </div>
        </div>
      </div>
    </div>
    <div v-if="quizzes.length <= 0">
      <p>No quizzes yet.</p>
    </div>
  </div>
</template>
