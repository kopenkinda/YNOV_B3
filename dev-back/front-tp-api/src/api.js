import axios from 'axios';
const BASE_URL = 'http://localhost:8000/api';
const API = {};
export default API;
import { token, loggedIn, user } from './store/auth';
import sendNotification from './store/notifications';

axios.defaults.baseURL = BASE_URL;

function authorized(reqFn) {
  return async (...parameters) => {
    let result = null;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
    try {
      result = await reqFn(...parameters);
    } catch (e) {
      if (e.response.status === 401) {
        token.value = '';
        user.value = null;
        loggedIn.value = false;
        return sendNotification('error', 'You are not logged in');
      }
      throw e;
    }

    axios.defaults.headers.common['Authorization'] = '';
    return result;
  };
}

API.login = async function (email, password) {
  const { data } = await axios.post('/auth/login', {
    email,
    password,
  });
  return {
    token: data.access_token,
    user: data.user,
  };
};

API.register = async function (email, password, password_confirmation) {
  const payload = {
    email,
    password,
    password_confirmation,
    name: `User #${Date.now().toString().slice(-6, -1)}`,
  };
  const { data } = await axios.post('/auth/register', payload);
  return data;
};

API.getQuizzes = async function () {
  const { data } = await axios.get('/quiz');
  return data;
};

API.getQuiz = async function (id) {
  const { data } = await axios.get(`/quiz/${id}`);
  return data;
};

API.addQuiz = authorized(async function (quiz) {
  const { data } = await axios.post('/quiz', quiz);
  return data;
});

API.editQuiz = authorized(async function (quizId, quiz) {
  const { data } = await axios.put(`/quiz/${quizId}`, quiz);
  return data;
});

API.removeQuiz = authorized(async function (quiz) {
  const { data } = await axios.delete(`/quiz/${quiz.id}`);
  return data;
});

API.publishQuiz = authorized(async function (quiz) {
  const { data } = await axios.post(`/quiz/${quiz.id}/publish`);
  return data;
});

API.unpublishQuiz = authorized(async function (quiz) {
  const { data } = await axios.post(`/quiz/${quiz.id}/unpublish`);
  return data;
});

API.getQuestions = async function (quizId) {
  const { data } = await axios.get(`/quiz/${quizId}/questions`);
  return data;
};

API.getChoices = async function (questionId) {
  const { data } = await axios.get(`/question/${questionId}/choices`);
  return data;
};

API.submitQuiz = authorized(async function (quizId, answers) {
  const { data } = await axios.post(`/score`, { answers, quiz_id: quizId });
  return data;
});

API.getScores = async function () {
  const { data } = await axios.get('/score');
  return data;
};

API.getUser = async function (userId) {
  const { data } = await axios.get('/user/' + userId);
  return data;
};
