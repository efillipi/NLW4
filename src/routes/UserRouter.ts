import { Router } from 'express'

const router = Router();

import UserController from '../controllers/UserController'

const userController = new UserController();

router.get('/', userController.getall)
router.post('/', userController.create)

export default router;


