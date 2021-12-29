const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

/**
 * ? Define Routes
 */
const router = express.Router();

const users = [
  {
    id: 1,
    name: 'Mr. Admin',
    email: 'admin@quizzy.com',
    password: 'admin',
  },
  {
    id: 2,
    name: 'Regular User',
    email: 'user@quizzy.com',
    password: 'user',
  },
];
const quizzes = [
  {
    id: 1,
    label: 'Quiz 1',
    published: false,
  },
];
const questions = [
  {
    id: 1,
    quiz_id: 1,
    label: 'Question 1',
    answer: 2,
    earnings: 10,
  },
];
const choices = [
  {
    id: 1,
    question_id: 1,
    label: 'Choice 1',
  },
  {
    id: 2,
    question_id: 1,
    label: 'Choice 2',
  },
];

let nextUserId = 3;
let nextQuizId = 2;
let nextQuestionId = 2;
let nextChoiceId = 3;

function allIn(keys, obj) {
  return keys.every((key) => obj.hasOwnProperty(key));
}

/**
 * ? Auth
 */
const auth = {};

function isAdmin(req, res, next) {
  try {
    const token = req.headers.authorization.slice('Bearer '.length);
    const userId = auth[token];
    if (userId === 1) {
      return next();
    }
  } catch (error) {}
  return res.status(401).json({
    error: 'Unauthorized',
  });
}

router.post('/auth/login', (req, res) => {
  const payload = req.body;
  if (!allIn(['email', 'password'], payload)) {
    return res.status(401).json({ status: 'Unauthorized' });
  }
  const found = users.find((user) => user.email === payload.email && user.password === payload.password);
  if (!found) {
    return res.status(401).json({
      error: 'Invalid email or password',
    });
  }
  const token = Date.now().toString();
  auth[token] = found.id;
  return res.json({
    access_token: token,
    token_type: 'bearer',
    user: { ...found, password: undefined },
  });
});

router.post('/auth/register', (req, res) => {
  const payload = req.body;
  if (!allIn(['name', 'email', 'password', 'password_confirmation'], payload)) {
    return res.status(400).json({
      error: 'Missing parameters',
    });
  }
  if (payload.password !== payload.password_confirmation) {
    return res.status(400).json({
      error: 'Passwords do not match',
    });
  }
  const found = users.find((user) => user.email === payload.email);
  if (found) {
    return res.status(400).json({
      error: 'Email already exists',
    });
  }
  const user = {
    id: nextUserId,
    name: payload.name,
    email: payload.email,
    password: payload.password,
  };
  users.push(user);
  nextUserId += 1;
  return res.json({
    message: 'User successfully registered',
    user: { ...user, password: undefined },
  });
});

/**
 * ? Quizzes
 */
router.get('/quiz', (req, res) => {
  return res.json(quizzes);
});

router.get('/quiz/:id', (req, res) => {
  const found = quizzes.find((quiz) => quiz.id === parseInt(req.params.id, 10));
  if (!found) {
    return res.status(404).json({
      error: 'Quiz not found',
    });
  }
  return res.json(found);
});

router.delete('/quiz/:id', (req, res) => {
  const foundIdx = quizzes.findIndex((quiz) => quiz.id === parseInt(req.params.id, 10));
  if (foundIdx === -1) {
    return res.status(404).json({
      error: 'Quiz not found',
    });
  }
  quizzes.splice(foundIdx, 1);
  return res.json({
    message: 'Quiz successfully deleted',
  });
});

router.post('/quiz/:id/publish', isAdmin, (req, res) => {
  const found = quizzes.find((quiz) => quiz.id === parseInt(req.params.id, 10));
  if (!found) {
    return res.status(404).json({
      error: 'Quiz not found',
    });
  }
  found.published = true;
  return res.json(found);
});

router.post('/quiz/:id/unpublish', isAdmin, (req, res) => {
  const found = quizzes.find((quiz) => quiz.id === parseInt(req.params.id, 10));
  if (!found) {
    return res.status(404).json({
      error: 'Quiz not found',
    });
  }
  found.published = false;
  return res.json(found);
});

router.post('/quiz', isAdmin, (req, res) => {
  const payload = req.body;
  if (!allIn(['label', 'questions'], payload)) {
    return res.status(400).json({
      error: 'Missing parameters',
    });
  }
  if (payload.questions.length === 0) {
    return res.status(400).json({
      error: 'Quiz must have at least one question',
    });
  }
  if (payload.questions[0].choices.length === 0) {
    return res.status(400).json({
      error: 'Quiz must have at least one choice',
    });
  }
  const quiz = {
    id: nextQuizId,
    label: payload.label,
  };
  quizzes.push(quiz);
  nextQuizId += 1;
  for (const question of payload.questions) {
    const q = {
      id: nextQuestionId,
      quiz_id: quiz.id,
      label: question.label,
      answer: question.answer,
      earnings: question.earnings,
    };
    questions.push(q);
    nextQuestionId += 1;
    for (const choice of question.choices) {
      const c = {
        id: nextChoiceId,
        question_id: q.id,
        label: choice.label,
      };
      choices.push(c);
      nextChoiceId += 1;
    }
  }
  return res.json({
    message: 'Quiz successfully created',
  });
});
/**
 * ? Start Server
 */
app.use('/api', router);
const port = 8000;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
