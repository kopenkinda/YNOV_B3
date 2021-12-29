import axios from 'axios';
const BASE_URL = 'http://localhost:8000/api';
const API = {};
export default API;
import { token, loggedIn, user } from './store/auth';

axios.defaults.baseURL = BASE_URL;

function withAuthHeaders() {
  return {
    headers: {
      authorization: `Bearer ${token.value}`,
    },
  };
}

function authorized(reqFn) {
  return async (...parameters) => {
    let result = null;
    try {
      result = await reqFn(...parameters);
      return result;
    } catch (e) {
      if (e.response.status === 401) {
        token.value = '';
        user.value = null;
        loggedIn.value = false;
        throw e;
      }
      return result;
    }
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
  console.log(data, payload);
  return data;
};

API.getQuizzes = async function () {
  const { data } = await axios.get('/quiz');
  return data;
};

API.publishQuiz = authorized(async function (quiz) {
  const { data } = await axios.post(`/quiz/${quiz.id}/publish`, null, withAuthHeaders());
  return data;
});

API.unpublishQuiz = authorized(async function (quiz) {
  const { data } = await axios.post(`/quiz/${quiz.id}/unpublish`, null, withAuthHeaders());
  return data;
});

API.removeQuiz = authorized(async function (quiz) {
  const { data } = await axios.delete(`/quiz/${quiz.id}`, withAuthHeaders());
  return data;
});
