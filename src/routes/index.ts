import { Router } from 'express'

const router = Router();

import UserRouter from './UserRouter'
import SurveysRouter from './SurveysRouter'
import SendMail from './SendMail'

router.use('/users', UserRouter)
router.use('/surveys', SurveysRouter)
router.use('/sendMail', SendMail)

export default router;