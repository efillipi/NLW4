import { Router } from 'express'

const router = Router();

import NpsController from '../controllers/NpsController'

const npsController = new NpsController();

router.get('/:survey_id', npsController.execute)

export default router;