<script>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import AppQuizItem from '../../components/quiz-item.vue';
import API from '../../api';
export default {
  components: {
    RouterLink,
    AppQuizItem,
  },
  setup() {
    const quizzes = ref([]);
    const router = useRouter();
    const remove = (quiz) => {
      quizzes.value = quizzes.value.filter((q) => q.id !== quiz.id);
      API.removeQuiz(quiz);
    };
    const edit = (quiz) => {
      router.push(`/edit-quiz/${quiz.id}`);
    };
    return {
      quizzes,
      remove,
      edit,
    };
  },
  created() {
    API.getQuizzes()
      .then((quizzes) => {
        this.quizzes.value = quizzes;
      })
      .catch((error) => {
        error.value = error.message;
      });
  },
};
</script>

<template>
  <div class="row">
    <div class="col-12 col-sm-8 order-2 order-sm-1 mb-2">
      <div class="card">
        <div class="card-body">
          <div class="card-title">Manage quizzes</div>
          <app-quiz-item v-for="quiz in quizzes.value" :key="quiz.id" :quiz="quiz" :onedit="edit" :onremove="remove" />
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
