const mongoose = require("mongoose")
const MONGO_URI = "mongodb+srv://avezGoals:avezGoals@cluster0.7tfaycz.mongodb.net/?retryWrites=true&w=majority"
const connectDB = async () => {
    try{
        const conn = await mongoose.connect(MONGO_URI)
        console.log("Mongo DB Connected")
    }catch(error){
        console.log(error);
    }
}

module.exports = connectDB