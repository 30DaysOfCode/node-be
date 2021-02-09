const QuestionController = require('./questions.controller');
const { Router } = require('express');

var router = Router()

router.get('/', QuestionController.fetchQuestions)

router.get('/:id', QuestionController.fetchQuestionById)

router.post('/add', QuestionController.addQuestion)

router.patch('/edit/:id', QuestionController.editQuestion)

router.delete('/delete/:id', QuestionController.deleteQuestion)

module.exports = router
