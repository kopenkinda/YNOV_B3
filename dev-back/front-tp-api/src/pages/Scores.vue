<script>
import { onMounted, reactive } from 'vue';
import API from '../api';

export default {
  setup() {
    const scores = reactive([]);
    onMounted(async () => {
      const fetched = await API.getScores();
      scores.splice(0, scores.length, ...fetched);
      let i = 0;
      for (const score of fetched) {
        const fetchedQuiz = await API.getQuiz(score.quiz_id);
        scores[i].quiz = fetchedQuiz;
        const fetchedUser = await API.getUser(score.user_id);
        scores[i].user = fetchedUser;
        i++;
      }
    });
    return { scores };
  },
};
</script>

<template>
  <div class="row">
    <div class="col">
      <h2>Rankings</h2>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <table class="table" v-if="scores.length > 0">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Quiz</th>
            <th scope="col">User</th>
            <th scope="col">Score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="score in scores">
            <th scope="row">{{ score.id }}</th>
            <td>{{ score.quiz?.label }}</td>
            <td>{{ score.user?.name }}</td>
            <td>{{ score.score }}</td>
          </tr>
        </tbody>
      </table>
      <div v-else>No scores yet.</div>
    </div>
  </div>
</template>
