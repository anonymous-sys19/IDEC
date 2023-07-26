const mongoose = require('mongoose');

const Connect = async () => {
    try{
        // mongodb clund connection
        const con = await mongoose.connect("mongodb+srv://anonimo:cyber@anonimo.d9yhmae.mongodb.net/?retryWrites=true&w=majority" , {
            useNewUrlParser : true,
            useUnifiedTopology: true,
            strictQuery: false,
            // useFindAndModify: false,
            // useCreateIndex: true
            
        })
        console.log(`MongoDB Connected`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = Connect
