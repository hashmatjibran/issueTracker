const projectsSchema = require('../Models/projectsSchema');
const issueSchema = require('../Models/issueSchema');

module.exports.showProjects= async(request , response)=>{

    console.log('inside showProjects controller');

    try {

        const projects = await projectsSchema.find();
        console.log(projects);
        response.render('projects',{projects});
    } catch (error) {
        console.log('error in fetching the project',error);
    }

}

module.exports.createProject = async (request , response)=>{

    try {
        console.log(request.body)
        
        const projects = await projectsSchema.create( request.body);

        return response.redirect('back');

    } catch (error) {
        console.log('error in creating the project',error);
    }
}

module.exports.getProjectDescription = async (request , response)=>{

    try {
        console.log('get project description')
        
         const project = await projectsSchema.findById(request.params.id).populate('issues');
         

        return response.render('projectDescription',{project});

    } catch (error) {
        console.log('error in creating the project',error);
    }
}