import rateLimit from 'express-rate-limit'

export const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 15,
    message: {
        message: 'Too many login attempts from this IP, please try again later.'
    },
})

export const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next()

    return res.status(401).json({ msg: 'Unauthorized' })
}