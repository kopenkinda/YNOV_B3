<script>
import { computed, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import API from '../api';
import useNotifications from '../store/notifications';

export default {
  setup() {
    const { params } = useRoute();
    const id = params.quizId;
    const router = useRouter();
    const sendNotification = useNotifications();
    const quiz = reactive({});
    console.log(quiz);
    onMounted(async () => {
      API.getQuiz(id).then((fetched) => {
        Object.assign(quiz, fetched);
        if (!quiz.published) {
          sendNotification('error', 'Quiz is not published yet.');
          return router.push('/');
        }
        API.getQuestions(id).then((fetchedQuestions) => {
          quiz.questions = fetchedQuestions;
          quiz.questions.forEach((question) => {
            API.getChoices(question.id).then((fetchedAnswers) => {
              question.choices = fetchedAnswers;
              question.selected = '';
            });
          });
        });
      });
    });
    const totalEarnings = computed(() => {
      return quiz.questions.reduce((acc, question) => acc + question.earnings, 0);
    });
    const done = computed(() => {
      let res = true;
      for (let q of quiz?.questions || []) {
        if (q.selected === '') {
          res = false;
          break;
        }
      }
      return res;
    });
    const submit = async () => {
      const answers = quiz.questions.map((question) => ({ answer: question.selected, question_id: question.id }));
      try {
        await API.submitQuiz(quiz.id, answers);
        sendNotification('success', 'Quiz submitted successfully.');
        router.push('/');
      } catch (e) {
        if (e.response.status === 400) {
          sendNotification('error', "You've already completed the quiz");
          return router.push('/');
        }
        sendNotification('error', e.message);
      }
    };
    return {
      quiz,
      totalEarnings,
      submit,
      done,
    };
  },
};
</script>

<template>
  <div class="row mb-4">
    <div class="col">
      <h3>{{ quiz.label }}</h3>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <div class="card mb-2" v-for="question in quiz.questions">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start">
            <div class="card-title">
              {{ question.label }}
            </div>
            <span>
              {{ question.earnings }}
              /
              <b>{{ totalEarnings }}</b>
            </span>
          </div>
          <div class="form-check" v-for="choice in question.choices">
            <input
              class="form-check-input"
              type="radio"
              :name="`q-${question.id}`"
              :id="`choice-${choice.id}`"
              :value="choice.id"
              v-model="question.selected"
            />
            <label class="form-check-label" :for="`choice-${choice.id}`">{{ choice.label }}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <button class="btn btn-success w-100" :disabled="!done" @click="submit">Finish</button>
    </div>
  </div>
</template>
