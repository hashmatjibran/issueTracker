const mongoose = require('mongoose');

const issueSchema = mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    },
    resolved:{
        type:Boolean,
        default:false
    }

},
{
    timestamps:true
});

const issues = mongoose.model('issues',issueSchema);

module.exports = issues;