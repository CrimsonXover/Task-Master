import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/task-manager')
        console.log('Connected to Database')
    } catch (error) {
        console.error(`Error: ${error}`)
    }
}

export default connectDB