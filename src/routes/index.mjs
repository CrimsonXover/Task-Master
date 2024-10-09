import { Router } from 'express'
import authRouter from './auth.mjs'
import usersRouter from './users.mjs'
import { isAuthenticated, rateLimiter } from '../utils/middlewares.mjs'

const router = Router(authRouter)

router.use('/auth', rateLimiter, authRouter)
router.use('/users', isAuthenticated, usersRouter)

export default router