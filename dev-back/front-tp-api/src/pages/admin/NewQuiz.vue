<script>
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import API from '../../api';
import AppQuestion from '../../components/question.vue';
import useNotifications from '../../store/notifications';

export default {
  components: {
    AppQuestion,
  },
  setup() {
    const router = useRouter();
    const sendNotification = useNotifications();
    const questions = reactive([]);
    const label = ref('');
    const totalEarnings = computed(() => questions.reduce((acc, question) => acc + question.earnings, 0));
    const onremove = (id) => {
      const idx = questions.findIndex((question) => question.id === id);
      questions.splice(idx, 1);
    };
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
    const submit = async () => {
      if (questions.length <= 0) {
        return sendNotification('error', 'You must add at least one question.');
      }
      const allLabels = questions.every((question) => question.label.trim().length > 0);
      if (!allLabels) {
        return sendNotification('error', 'All questions must have a label.');
      }
      const allEarnings = questions.every((question) => question.earnings > 0);
      if (!allEarnings) {
        return sendNotification('error', 'All questions must have an earning.');
      }
      const allChoices = questions.every((question) => question.choices.length > 0);
      if (!allChoices) {
        return sendNotification('error', 'All questions must have at least one choice.');
      }
      const allChoicesHaveLabels = questions.every((question) =>
        question.choices.every((choice) => choice.label.trim().length > 0)
      );
      if (!allChoicesHaveLabels) {
        return sendNotification('error', 'All choices must have a label.');
      }
      const allAnswers = questions.every((question) => question.answer !== 'NONE');
      if (!allAnswers) {
        return sendNotification('error', 'All questions must have an answer. Please select one');
      }
      try {
        await API.addQuiz({
          label: label.value,
          published: false,
          questions,
        });
        sendNotification('success', 'Quiz created!');
        router.push('/admin');
      } catch (e) {
        sendNotification('error', e.message);
      }
    };
    return {
      label,
      questions,
      addQuestion,
      totalEarnings,
      submit,
      onremove,
    };
  },
};
</script>

<template>
  <div class="row mb-4">
    <div class="col">
      <div class="d-flex justify-content-between align-items-center">
        <h4>Create new quiz</h4>
        <button class="btn btn-success" @click="submit">Save</button>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <div class="form-group">
        <label>Quiz label</label>
        <input type="text" class="form-control" v-model="label" placeholder="Enter a label for the quiz" />
      </div>
    </div>
  </div>
  <div class="row mb-4">
    <div class="col">
      <div class="d-flex justify-content-between mb-4">
        <b>Number of questions: {{ questions.length }}</b>
        <b>Total earnings: {{ totalEarnings }}</b>
      </div>
      <app-question v-for="question in questions" :key="question.id" :question="question" :onremove="onremove" />
      <button class="btn btn-secondary text-center w-100" @click="addQuestion">Add a question</button>
    </div>
  </div>
</template>
