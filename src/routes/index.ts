import { Router } from 'express'

const router = Router();

import UserRouter from './UserRouter'
import SurveysRouter from './SurveysRouter'

router.use('/users', UserRouter)
router.use('/surveys', SurveysRouter)

export default router;