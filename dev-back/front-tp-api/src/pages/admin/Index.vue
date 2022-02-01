<script>
import { onMounted, reactive } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import API from '../../api';
import AppQuizItem from '../../components/quiz-item.vue';
export default {
  components: {
    RouterLink,
    AppQuizItem,
  },
  setup() {
    const quizzes = reactive([]);
    const router = useRouter();
    const remove = (quiz) => {
      API.removeQuiz(quiz);
      quizzes.splice(quizzes.indexOf(quiz), 1);
    };
    const edit = (quiz) => {
      router.push(`/edit-quiz/${quiz.id}`);
    };
    onMounted(() => {
      API.getQuizzes().then((serverQuizzes) => {
        quizzes.splice(0, quizzes.length);
        quizzes.push(...serverQuizzes);
      });
    });
    return {
      quizzes,
      remove,
      edit,
    };
  },
};
</script>

<template>
  <div class="row">
    <div class="col-12 col-sm-8 order-2 order-sm-1 mb-2">
      <div class="card">
        <div class="card-body">
          <div class="card-title">Manage quizzes</div>
          <app-quiz-item v-for="quiz in quizzes" :key="quiz.id" :quiz="quiz" :onedit="edit" :onremove="remove" />
          <h3 v-if="quizzes.length <= 0">No quizzes, please create one</h3>
        </div>
      </div>
    </div>
    <div class="col-12 col-sm-4 order-1 order-sm-2 mb-2">
      <div class="card">
        <div class="card-body">
          <router-link to="/new-quiz">
            <button class="btn btn-success">Create a new quiz</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.status {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}
.status-published {
  background-color: green;
}
.status-unpublished {
  background-color: red;
}
</style>
