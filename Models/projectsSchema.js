const mongoose = require('mongoose');
const projectsSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    description:{
        type :String,
        required:true
    },
    author :{
        required:true,
        type:String
    }
});

const projects = mongoose.model('projects',projectsSchema);

module.exports = projects;