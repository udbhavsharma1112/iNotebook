const mongoose= require('mongoose');
const mongoURI="mongodb+srv://udbhavsharma:MAS38JuNYw5ZhZuh@cluster0.i3gji.mongodb.net/test";
const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected");

    })
}
module.exports= connectToMongo