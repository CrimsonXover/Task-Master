import { Router } from 'express'
import { checkSchema, matchedData, validationResult } from 'express-validator'
import { User } from '../mongoose/schemas/user.mjs'
import { changePasswordValidation, updateUserValidation } from '../utils/validationSchemas.mjs'
import { comparePassword, hashPassword } from '../utils/helpers.mjs'

const router = Router()

const getUserProfile = (req, res) => {
    return res.status(200).send(req.user)
}

export const updateUserProfile = async (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        const errorMessages = result.array().map(err => err.msg)
        return res.status(400).json({ msg: errorMessages })
    }

    try {
        const userData = matchedData(req)
        const userId = req.user.id

        const findUser = await User.findById(userId)

        if (!findUser) return res.status(404).json({ msg: 'User not found' })

        Object.assign(findUser, userData)

        await findUser.save()

        res.status(200).json({ msg: 'Profile updated successfully'})
    } catch (error) {
        console.error(`Error: ${error}`)
        res.sendStatus(500)
    }
}

export const changeUserPassword = async (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        const errorMessages = result.array().map(err => err.msg)
        return res.status(400).json({ msg: errorMessages })
    }

    try {
        const { oldPassword, newPassword } = matchedData(req)
        const userId = req.user.id

        const findUser = await User.findById(userId)

        if (!findUser) return res.status(404).json({ msg: 'User not found' })

        if(!comparePassword(oldPassword, findUser.password)) return res.status(401).json({msg: 'Invalid Credentials'})

        findUser.password = hashPassword(newPassword)

        await findUser.save()

        res.status(200).json({ msg: 'Password changed successfully'})
    } catch (error) {
        console.error(`Error: ${error}`)
        res.sendStatus(500)
    }
}

router.get('/me',
    getUserProfile
)

router.patch('/me',
    checkSchema(updateUserValidation),
    updateUserProfile
)

router.patch('/me/password',
    checkSchema(changePasswordValidation),
    changeUserPassword
)

export default router