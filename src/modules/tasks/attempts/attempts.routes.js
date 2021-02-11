const AttemptController = require('./attempts.controller');
const { Router } = require('express');

var router = Router()

router.get('/', AttemptController.fetchAttempts)

router.get('/:id', AttemptController.fetchAttemptById)

router.post('/create', AttemptController.addAttempt)

router.patch('/edit/:id', AttemptController.editAttempt)

router.delete('/delete/:id', AttemptController.deleteAttempt)

module.exports = router
