const issueSchema = require('../Models/issueSchema');
const projectSchema = require('../Models/projectsSchema');

module.exports.createIssue = async (request , response)=>{
    
    try {
        // check whether the project exists or not
        const project = await projectSchema.findById(request.params.projectId);

        // if project is found then create the issue and store the issue id in the project as well
        if(project)
        { 
            // creating the issue 
            const issue = await issueSchema.create({
                author: request.body.author.toLowerCase(),
                description: request.body.description,
                title: request.body.title
            });
            
            // storing the issue in the specified project 
            project.issues.push(issue);

            // saving the project
            project.save();
        }

        return response.redirect('back');

    } catch (error) {
        console.log('error in creating the issue',error);
    }
    
}

module.exports.resolveIssue = async (request , response)=>{
    try {
        // resolve issue here
    } catch (error) {
        console.log('error in resolving the issue',error);
    }
}

module.exports.filterByAuthor = async (request , response)=>{
    try {
        // checking for ajax request
        if(request.xhr){

            // creating an empty array to store new issues
            let newIssues = [];
            // converting the user input to lower case
            let author = request.body.author.toLowerCase();
            
            const project = await projectSchema
            .findById(request.body.projectId)
            .populate('issues');

            if(project){
                // filtering the issues and storing the filtered result in newIssues
                newIssues = project.issues.filter((issue)=>{
                    return issue.author == author;
                });;  
            }
          
       
            return response.status(200).json(newIssues);
        }
        else{
            // if it is not an xhr request means someone tried to forge so return back with an error status code
           return response.status(501);
        }
    } catch (error) {
        console.log('error in resolving the issue',error);
    }
}