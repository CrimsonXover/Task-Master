import passport from 'passport'
import { Strategy } from 'passport-local'
import { comparePassword } from '../utils/helpers.mjs'
import { User } from '../mongoose/schemas/user.mjs'

passport.serializeUser((user, done) => {
    const userSafeData = {
        id: user.id,
        email: user.email,
        displayName: user.displayName
    }
    done(null, userSafeData)
})

passport.deserializeUser(async (userData, done) => {
    try {
        const findUser = await User.findById(userData.id)
        if (!findUser) return done(null, false, { status: 404, msg: 'User not found' })
        const userSafeData = {
            id: findUser.id,
            email: findUser.email,
            displayName: findUser.displayName
        }
        done(null, userSafeData)
    } catch (err) {
        console.error(err)
        done(err, null)
    }
})

export default passport.use(
    new Strategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
            const findUser = await User.findOne({ email })
            if (!findUser) return done(null, false, { status: 404, msg: 'User not found' })
            const passwordIsMatch = await comparePassword(password, findUser.password)
            if (!passwordIsMatch)
                return done(null, false, { status: 401, msg: 'Invalid Credentials' })
            if (!findUser.isVerified)
                return done(null, false, { status: 403, msg: 'Account not activated. Please check your email for the activation link.' })
            return done(null, findUser)
        } catch (err) {
            console.error(err)
            return done(err)
        }
    })
)