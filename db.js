const mongoose = require('mongoose');
require("dotenv").config();

const connectDB = async () => {
    const db_name = 'backendproject'
    try {
        await mongoose.connect('mongodb+srv://admin:' + process.env.MONGODB_PASS + '@cluster0.lo6yrzw.mongodb.net/' + db_name + '?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed', error);
        process.exit(1);
    }
};

module.exports = connectDB;
