import { Router } from 'express'

const router = Router();

import SurveyController from '../controllers/SurveyController'

const surveyController = new SurveyController();

router.get('/', surveyController.getall)
router.post('/', surveyController.create)

export default router;


