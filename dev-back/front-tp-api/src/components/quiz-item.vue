<script>
import API from '../api';
import useNotifications from '../store/notifications';
const sendNotification = useNotifications();

export default {
  props: {
    quiz: {
      type: Object,
      required: true,
    },
    onremove: {
      type: Function,
      required: true,
    },
    onedit: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    async function publish() {
      try {
        await API.publishQuiz(props.quiz);
        props.quiz.published = true;
      } catch (error) {
        sendNotification('error', error.message);
      }
    }
    async function unpublish() {
      try {
        await API.unpublishQuiz(props.quiz);
        props.quiz.published = false;
      } catch (error) {
        sendNotification('error', error.message);
      }
    }
    function remove() {
      props.onremove(props.quiz);
    }
    function edit() {
      props.onedit(props.quiz);
    }
    return {
      quiz: props.quiz,
      publish,
      unpublish,
      remove,
      edit,
    };
  },
};
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="card-text d-flex align-items-center">
        <b class="me-auto">
          <span class="me-1 status" :class="quiz.published ? 'status-published' : 'status-unpublished'"></span>
          {{ quiz.label }}
        </b>
        <button v-if="!quiz.published" class="btn btn-success me-2" @click="publish">Publish</button>
        <button v-if="quiz.published" class="btn btn-warning me-2" @click="unpublish">Unpublish</button>
        <button class="btn btn-info me-2" @click="edit">Edit</button>
        <button class="btn btn-danger" @click="remove">Delete</button>
      </div>
    </div>
  </div>
</template>
