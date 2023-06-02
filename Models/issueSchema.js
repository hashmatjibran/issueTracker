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
    labels:[{
        type:String
    }],
    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'projects'
    }

},
{
    timestamps:true
});

const issues = mongoose.model('issues',issueSchema);

module.exports = issues;