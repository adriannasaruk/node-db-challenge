const knex = require("knex")
const knexfile = require ("../knexfile.js")
const db = knex(knexfile.development)

module.exports ={
    addResource,
    addProject,
    addTask,
    getProjects,
    getTasks,
    getResources,
    addResourceToProject,
    getProRes,
    findById
}

function addResource(resourceData) {
    return db("resource").insert(resourceData)
}

function addProject(projectData) {
    return db("projects").insert(projectData)
}

function addTask(taskData) {
    return db("task").insert(taskData)
}

function findById(id){
    return db("projects").where({id}).first()
}

function getProjects(){
    return db("projects")
}

function getTasks(){
    return db.select("task.id", "task.description", "task.notes", "task.completed", "projects.name", "projects.projects_description").from("task")
    .join("projects", "projects.id","task.project_id")
}

function getResources(){
    return db("resource")
}

function getProRes(){
    return db("projects_resource")
}

function addResourceToProject (data) {
    return db("projects_resource").insert(data)
}


