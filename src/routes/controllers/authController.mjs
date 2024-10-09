import { matchedData } from 'express-validator'
import passport from 'passport'
import { sendEmail } from '../../configs/mailer.mjs'
import { User } from '../../mongoose/schemas/user.mjs'
import { generateVerificationCode, handleValidationErrors, hashPassword } from '../../utils/helpers.mjs'

const registerUser = async (req, res) => {
    const validationError = handleValidationErrors(req, res)
    if (validationError) return validationError

    const verificationCode = generateVerificationCode()

    const data = matchedData(req)

    const { email } = data

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ msg: 'User already exists with this email address.' })
    }

    data.verificationCode = verificationCode
    data.password = await hashPassword(data.password)

    const newUser = new User(data)

    try {
        await newUser.save()

        await sendEmail(data.email, 'Welcome to Task-Master', verificationCode)

        return res.status(201).json({ msg: 'User registered. Please check your email for verification code' })
    } catch (error) {
        console.error(`Error: ${error}`)
        return res.sendStatus(400)
    }
}

const loginUser = (req, res, next) => {
    const validationError = handleValidationErrors(req, res)
    if (validationError) return validationError

    const data = matchedData(req)
    req.body = { ...data}

    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ msg: 'Internal server error' })
        }
        if (!user) {
            console.log(info.status)
            return res.status(info.status).json({ msg: info.msg })
        }

        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ msg: 'Login failed' })
            }
            return res.status(200).json({ msg: 'Login successful' })
        })
    })(req, res, next)
}

const logoutUser = (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(400).json({ msg: 'No active session to log out' })
    }

    req.logout((err) => {
        if (err) {
            return res.status(500).json({ msg: 'Logout failed' })
        }
        return res.status(200).json({ msg: 'Logout successful' })
    })
}

const verifyUser = async (req, res) => {
    const validationError = handleValidationErrors(req, res)
    if (validationError) return validationError

    const { email, verificationCode } = matchedData(req)

    const findUser = await User.findOne({ email })

    if (!findUser) return res.status(404).json({ msg: 'User not found' })

    if (findUser.isVerified) return res.status(400).json({ msg: 'User already verified' })

    if (findUser.verificationCode !== verificationCode) return res.status(400).json({ msg: 'Invalid verification code' })

    findUser.isVerified = true
    findUser.verificationCode = undefined

    try {
        await findUser.save()

        return res.status(200).json({ msg: 'User verified successfully' })
    } catch (error) {
        console.error(`Error: ${error}`)
        return res.sendStatus(400)
    }
}

const resendVerification = async (req, res) => {
    const validationError = handleValidationErrors(req, res)
    if (validationError) return validationError

    const { email } = matchedData(req)

    const findUser = await User.findOne({ email })
    
    if (!findUser) return res.status(404).json({ msg: 'User not found' })

    if (findUser.isVerified) return res.status(400).json({ msg: 'User already verified' })

    const now = new Date()
    const timeSinceLastSent = now - findUser.lastVerificationSent
    const timeLimit = 30 * 1000

    if (timeSinceLastSent < timeLimit) {
        const remainingTime = Math.ceil((timeLimit - timeSinceLastSent) / 1000)
        return res.status(429).json({ msg: `Please wait ${remainingTime} seconds before requesting a new code.` })
    }

    const newVerificationCode = generateVerificationCode()
    findUser.verificationCode = newVerificationCode
    findUser.lastVerificationSent = now

    try {
        await findUser.save()

        await sendEmail(email, 'Verify Your Email Address', newVerificationCode)

        return res.status(200).json({ msg: 'New verification code sent. Please check your email.' })
    } catch (error) {
        console.error(`Error: ${error}`)
        return res.sendStatus(400)
    }
}

const forgotPassword = async (req, res) => {
    const validationError = handleValidationErrors(req, res)
    if (validationError) return validationError

    const { email } = matchedData(req)

    const findUser = await User.findOne({ email })
    if (!findUser) return res.status(404).json({ msg: 'User not found' })

    const resetCode = generateVerificationCode()
    findUser.resetPasswordCode = resetCode
    findUser.resetPasswordExpires = Date.now() + 3600000

    try {
        await findUser.save()

        await sendEmail(email, 'Reset Password', resetCode)

        return res.status(200).json({ msg: 'Password reset code sent to your email.' })
    } catch (error) {
        console.error(`Error: ${error}`)
        return res.sendStatus(400)
    }
}

const resetPassword = async (req, res) => {
    const validationError = handleValidationErrors(req, res)
    if (validationError) return validationError

    const { email, resetCode, newPassword } = matchedData(req)

    const findUser = await User.findOne({ email })
    if (!findUser) return res.status(404).json({ msg: 'User not found' })

    const now = new Date()
    const timeUntilExpiration = findUser.resetPasswordExpires - now
    // be sure to check for 
    // when they are undefind fix it
    if (timeUntilExpiration <= 0 || findUser.resetPasswordCode !== resetCode) {
        return res.status(400).json({ msg: 'Invalid or expired reset code' })
    }

    findUser.password = await hashPassword(newPassword)
    findUser.resetPasswordCode = undefined
    findUser.resetPasswordExpires = undefined

    try {
        await findUser.save()

        return res.status(200).json({ msg: 'Password has been reset successfully' })
    } catch (error) {
        console.error(`Error: ${error}`)
        return res.sendStatus(400)
    }
}


export {
    forgotPassword as forgotPasswordController, loginUser as loginUserController, logoutUser as logoutUserController, registerUser as registerUserController, resendVerification as resendVerificationController, resetPassword as resetPasswordController, verifyUser as verifyUserController
}

