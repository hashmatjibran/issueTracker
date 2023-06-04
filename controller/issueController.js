const issueSchema = require('../Models/issueSchema');
const projectSchema = require('../Models/projectsSchema');

// creating a new Issue here
module.exports.createIssue = async (request , response)=>{
    try {

        // getting the entered labels
        let lableArr = request.body.labels;

        // check whether the project exists or not
        const project = await projectSchema.findById(request.params.projectId);

        // if project is found then create the issue and store the issue id in the project as well

        if(project)
        { 
            // creating the issue 
                const issue = await issueSchema.create({

                        author: request.body.author.toLowerCase(),

                        description: request.body.description,

                        title: request.body.title,

                        labels: lableArr,

                        projectId:request.params.projectId
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


// filter by Author function 
module.exports.filterByAuthor = async (request , response)=>{
    try {
        // checking for ajax request
        if(request.xhr){

            // creating an empty array to store new issues
            let newIssues = [];
            // converting the user input to lower case
            let author = request.body.author.toLowerCase();
            
            const project = await projectSchema.findById(request.body.projectId);
            

        
            if(project){

                newIssues = await issueSchema.find({ "projectId": request.body.projectId, 'author':author });

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

// function to filter the content by labels (one can use multiple labels at a time)
module.exports.filter = async (request , response)=>{

    let lableArr = [];

    lableArr =JSON.parse(request.body.newLabels);


    let newIssues = [];
        const project = await projectSchema.findById(request.body.projectId);
            
        

        
        if(project){

            newIssues = await issueSchema
                                .find({ "projectId": request.body.projectId, "labels":{ $all: lableArr} });
        }

        return response.status(200).json(newIssues);

}