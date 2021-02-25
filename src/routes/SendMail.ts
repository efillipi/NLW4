import { Router } from 'express'

const router = Router();

import SendMailController from '../controllers/SendMailController'

const surveyController = new SendMailController();

router.get('/', surveyController.getall)
router.post('/', surveyController.execute)

export default router;


