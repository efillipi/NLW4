import { Router } from 'express'

const router = Router();

import AnswersController from '../controllers/AnswersController'

const answersController = new AnswersController();

router.get('/:value', answersController.execute)

export default router;


