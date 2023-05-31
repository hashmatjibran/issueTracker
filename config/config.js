const mongoose = require('mongoose');

const db = mongoose.connect('mongodb+srv://hshmtjibrn:7244542726@cluster0.zhdueue.mongodb.net/')
.then((result) => {
    console.log("connected to db successfully");
    
}).catch((err) => {
    
    console.log("error in connecting to the db", err);
});

module.exports = db;