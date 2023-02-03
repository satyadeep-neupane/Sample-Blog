const mongoose = require('mongoose');

async function connectDB()
{
    try{
        mongoose.set('strictQuery', true);
        await mongoose.connect('mongodb://localhost:27017/blog');
        console.log('DB is connected');
    }catch(err)
    {
        console.log(err.message);
    }
}

connectDB();