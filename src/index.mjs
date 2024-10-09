import './configs/dotenv.mjs'
import './strategies/local-strategy.mjs'
// import crypto from 'crypto'
import express from 'express'
import morgan from 'morgan'
import sessionConfig from './configs/session.mjs'
import routes from './routes/index.mjs'
import connectDB from './configs/db.mjs'
import passport from 'passport'

await connectDB()

const app = express()
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
app.use(express.json())
app.use(sessionConfig())
app.use(passport.initialize())
app.use(passport.session())
app.use('/api', routes)

const PORT = process.env.PORT || 3000

app.listen(PORT, async () => {
    console.clear()
    console.log(`Running On Port ${PORT}`)
    // console.log(crypto.randomBytes(16).toString('hex'))
})