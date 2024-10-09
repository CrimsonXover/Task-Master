import session from 'express-session'
import MongoStore from 'connect-mongo'
import mongoose from 'mongoose'

const sessionConfig = () => {
    return session({
        secret: process.env.SESSION_SECRET,
        saveUninitialized: false,
        resave: true,
        rolling: true,
        httpOnly: true,
        cookie: {
            maxAge: 14 * 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === 'production',
        },
        store: MongoStore.create({
            client: mongoose.connection.getClient()
        })
    })
}

export default sessionConfig