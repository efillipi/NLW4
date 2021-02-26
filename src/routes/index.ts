import { Router } from 'express'

const router = Router();

import UserRouter from './UserRouter'
import SurveysRouter from './SurveysRouter'
import SendMail from './SendMail'
import Answers from './Answers'
import Nps from './Nps'



router.use('/users', UserRouter)
router.use('/surveys', SurveysRouter)
router.use('/sendMail', SendMail)
router.use('/answers', Answers)
router.use('/nps', Nps)

export default router;