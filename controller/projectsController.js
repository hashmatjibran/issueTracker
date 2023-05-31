const projectsSchema = require('../Models/projectsSchema');


module.exports.showProjects= async(request , response)=>{
    console.log('inside showProjects controller');


    try {

        const projects = await projectsSchema.find();
        response.render('projects',{projects});
    } catch (error) {
        console.log('error in fetching the project',error);
    }
    




}

module.exports.createProject = async (request , response)=>{

    try {
        
        const projects = await projectsSchema.create({
            name:"new Post",
            description:"craeted a hard coded post",
            author:'hashmat jibran'
        });
        return response.render('index')



    } catch (error) {
        console.log('error in creating the project',error);
    }
}