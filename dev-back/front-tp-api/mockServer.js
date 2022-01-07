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
const scores = [];

let nextUserId = 3;
let nextQuizId = 2;
let nextQuestionId = 2;
let nextChoiceId = 3;
let nextScoreId = 1;

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

function isLoggedIn(req, res, next) {
  try {
    const token = req.headers.authorization.slice('Bearer '.length);
    const userId = auth[token];
    if (userId) {
      req.user = users.find((user) => user.id === userId);
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
  if (!allIn(['label', 'published', 'questions'], payload)) {
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
    published: false,
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
      if (choice.id === q.answer) {
        q.answer = c.id;
      }
      choices.push(c);
      nextChoiceId += 1;
    }
  }
  return res.json({
    message: 'Quiz successfully created',
  });
});

router.put('/quiz/:id', isAdmin, (req, res) => {
  const foundIdx = quizzes.findIndex((quiz) => quiz.id === parseInt(req.params.id, 10));
  if (foundIdx === -1) {
    return res.status(404).json({
      error: 'Quiz not found',
    });
  }
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
    id: parseInt(req.params.id, 10),
    published: false,
    label: payload.label,
  };
  quizzes[foundIdx] = quiz;
  const questionsToDelete = questions.filter((question) => question.quiz_id === quiz.id);
  for (const question of payload.questions) {
    const isNewQuestion = parseInt(question.id, 10) >= nextQuestionId;
    const q = {
      id: isNewQuestion ? nextQuestionId : question.id,
      quiz_id: quiz.id,
      label: question.label,
      answer: question.answer,
      earnings: question.earnings,
    };
    if (isNewQuestion) {
      questions.push(q);
      nextQuestionId += 1;
    } else {
      const foundIdx = questions.findIndex((question) => question.id === parseInt(question.id, 10));
      const toDeleteIdx = questionsToDelete.findIndex((question) => question.id === parseInt(question.id, 10));
      questionsToDelete.splice(toDeleteIdx, 1);
      questions[foundIdx] = q;
    }
    const choicesToDelete = choices.filter((choice) => choice.question_id === question.id);
    for (const choice of question.choices) {
      const isNewChoice = parseInt(choice.id, 10) >= nextChoiceId;
      const choiceId = isNewChoice ? nextChoiceId : choice.id;
      const c = {
        id: choiceId,
        question_id: q.id,
        label: choice.label,
      };
      if (isNewChoice) {
        choices.push(c);
        nextChoiceId += 1;
      } else {
        const foundIdx = choices.findIndex((c) => c.id === choiceId);
        const toDeleteIdx = choicesToDelete.findIndex((c) => c.id === choiceId);
        choicesToDelete.splice(toDeleteIdx, 1);
        choices[foundIdx] = c;
      }
      if (choice.id === q.answer) {
        q.answer = c.id;
      }
    }
    choicesToDelete.forEach((c) => {
      choices.splice(choices.indexOf(c), 1);
    });
  }
  questionsToDelete.forEach((q) => {
    const choicesToDelete = choices.filter((choice) => choice.question_id === q.id);
    choicesToDelete.forEach((c) => {
      choices.splice(choices.indexOf(c), 1);
    });
    questions.splice(questions.indexOf(q), 1);
  });
  return res.json({
    message: 'Quiz successfully updated',
  });
});

router.get('/quiz/:id/questions', (req, res) => {
  const found = quizzes.find((quiz) => quiz.id === parseInt(req.params.id, 10));
  if (!found) {
    return res.status(404).json({
      error: 'Quiz not found',
    });
  }
  const foundQuestions = questions.filter((question) => question.quiz_id === found.id);
  return res.json(foundQuestions);
});

router.get('/question/:id/choices', (req, res) => {
  const found = questions.find((question) => question.id === parseInt(req.params.id, 10));
  if (!found) {
    return res.status(404).json({
      error: 'Question not found',
    });
  }
  const foundChoices = choices.filter((choice) => choice.question_id === found.id);
  return res.json(foundChoices);
});

/**
 * Scores
 */

router.get('/score', (req, res) => {
  return res.json(scores);
});

router.get('/score/:id', isLoggedIn, (req, res) => {
  const found = scores.find((score) => score.id === parseInt(req.params.id, 10));
  if (!found) {
    return res.status(404).json({
      error: 'Score not found',
    });
  }
  return res.json(found);
});

router.post('/score', isLoggedIn, (req, res) => {
  const payload = req.body;
  const { answers, quiz_id } = payload;
  const user = req.user;
  const foundQuiz = quizzes.find((quiz) => quiz.id === quiz_id);
  if (!foundQuiz) {
    return res.status(404).json({
      error: 'Quiz not found',
    });
  }
  const foundScore = scores.find((score) => score.user_id === user.id && score.quiz_id === quiz_id);
  if (foundScore) {
    return res.status(400).json({
      error: 'You have already taken this quiz',
    });
  }
  const foundQuestions = questions.filter((question) => question.quiz_id === quiz_id);
  if (foundQuestions.length !== answers.length) {
    return res.status(400).json({
      error: 'Answers amount must match questions amount',
    });
  }
  let finalScore = 0;
  for (const answer of answers) {
    const question = foundQuestions.find((question) => question.id === answer.question_id);
    if (!question) {
      return res.status(404).json({
        error: 'Question' + answer.question_id + ' not found',
      });
    }
    if (question.answer === answer.answer) {
      finalScore += question.earnings;
    }
  }
  const result = {
    id: nextScoreId,
    user_id: user.id,
    quiz_id: quiz_id,
    score: finalScore,
  };
  nextScoreId += 1;
  scores.push(result);
  return res.json(result);
});

router.get('/user/:userId', (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const found = users.find((user) => user.id === userId);
  if (!found) {
    return res.status(404).json({
      error: 'User not found',
    });
  }
  return res.json({ ...found, password: undefined });
});

/**
 * ? Start Server
 */
app.use('/api', router);
const port = 8000;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
