import mongoose from 'mongoose'

const connectToDb = async () => {
    try {
        let dbUrl = 'url link';
        await mongoose.connect(dbUrl);
        console.log('Database connected');
    } catch (error) {
        console.log(error)
    }
}
module.exports = connectToDb