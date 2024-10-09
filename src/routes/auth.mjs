import { Router } from 'express'
import { checkSchema } from 'express-validator'
import { createUserValidation, emailValidation, loggingUserValidation, resetPasswordValidation, verifyUserValidation } from '../utils/validationSchemas.mjs'
import { forgotPasswordController, loginUserController, logoutUserController, registerUserController, resendVerificationController, resetPasswordController, verifyUserController } from './controllers/authController.mjs'

const router = Router()

router.post('/login',
    checkSchema(loggingUserValidation),
    loginUserController
)

router.post('/register',
    checkSchema(createUserValidation),
    registerUserController
)

router.post('/logout',
    logoutUserController
)

router.post('/verify',
    checkSchema(verifyUserValidation),
    verifyUserController
)

router.post('/forgot-password',
    checkSchema(emailValidation),
    forgotPasswordController
)

router.post('/reset-password',
    checkSchema(resetPasswordValidation),
    resetPasswordController
)

router.post('/resend-verification',
    checkSchema(emailValidation),
    resendVerificationController
)

export default router