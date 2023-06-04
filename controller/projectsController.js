const projectsSchema = require('../Models/projectsSchema');
const issueSchema = require('../Models/issueSchema');


// showing multiple projects here which are displayed on the home page
module.exports.showProjects= async(request , response)=>{

    try {

        const projects = await projectsSchema.find();
       
        response.render('projects',{projects});

    } catch (error) {
        console.log('error in fetching the project',error);
    }

}


// creating a new project here
module.exports.createProject = async (request , response)=>{

    try {
        
        const projects = await projectsSchema.create( request.body);

        return response.redirect('back');

    } catch (error) {
        console.log('error in creating the project',error);
    }
}


// function to get the details of an individual project
module.exports.getProjectDescription = async (request , response)=>{

    try {
        
        // quering the db to get the necessary data
         const project = await projectsSchema.findById(request.params.id).populate('issues');

         if (project) {

            // populating the array of labels in a project
            let issuelabel = [];

                for (const issue of project.issues) {

                   issuelabel = issuelabel.concat(issue.labels); 

                  }

                //   removing duplicates from the array of issueLabel
                  let issuelabels = Array.from(new Set(issuelabel))


            return response.render('projectDescription',{'project':project,'labels':issuelabels});
         } 
         else {
            return response.redirect('back');
         }

       

    } catch (error) {
        console.log('error in creating the project',error);
    }
}