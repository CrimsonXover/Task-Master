import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'

const saltRounds = 10

export const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds)
        return await bcrypt.hash(password, salt)
    } catch (error) {
        console.error(`Error: ${error}`)
    }
}

export const comparePassword = async (plain, hashed) => {
    try {
        return await bcrypt.compare(plain, hashed)
    } catch (error) {
        console.error(`Error: ${error}`)
    }
}

export const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
}

export const handleValidationErrors = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => err.msg)
        return res.status(400).json({ msg: errorMessages })
    }
    return null
}