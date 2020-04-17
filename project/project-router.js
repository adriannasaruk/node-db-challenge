const express = require("express")
const Project = require("./project-model.js")
const router = express.Router()

router.post("/", (req,res) => {
    const projectData = req.body
    
    Project.addProject(projectData)
    .then(project => {
        console.log(project)
        res.status(201).json(project)
    })
    .catch(err => {
        res.status(500).json({message: "Failed to create project"})
    })
})

// router.get('/:id', (req, res) => {
//     const { id } = req.params;
  
//     Project.findById(id)
//     .then(item => {
//       if (item.length) {
//         res.json(item);
//       } else {
//       res.status(404).json({message: "Can not find the given id"})
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ message: 'Failed to get data' });
//     });
//   });

router.post("/resources", (req,res) => {
    const resourceData = req.body
    
    Project.addResource(resourceData)
    .then(resource => {
        console.log(resource)
        res.status(201).json(resource)  
    })
    .catch(err => {
        res.status(500).json({message: "Failed to create resource"})
    })
})

router.post('/:id/tasks', (req, res) => {
    const taskData = req.body;
    const { id } = req.params; 
  
    Project.findById(id)
    .then(item => {
      if (item.length) {
        Project.addTask(taskData, id)
        .then(task => {
          res.status(201).json(task);
        })
      } else {
        res.status(404).json({ message: 'Could not find project with given id.' })
      }
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to create new task' });
    });
  });

router.post("/proresources", (req,res) => {
    const data = req.body
    
    Project.addResourceToProject(data)
    .then(item => {
        console.log(item)
        res.status(201).json(item)  
    })
    .catch(err => {
        res.status(500).json({message: "Failed to add resource to project"})
    })
})

router.get("/proresources", (req,res)=> {
    Project.getProRes()
    .then(task => {
        res.status(200).json(task)
    })
    .catch(err => {
        res.status(500).json({message: "Error retrieving tasks"})
    })
})

router.get("/tasks", (req,res)=> {
    Project.getTasks()
    .then(task => {
        res.status(200).json(task)
    })
    .catch(err => {
        res.status(500).json({message: "Error retrieving tasks"})
    })
})
router.get("/", (req,res)=> {
    Project.getProjects()
    .then(task => {
        res.status(200).json(task)
    })
    .catch(err => {
        res.status(500).json({message: "Error retrieving projects"})
    })
})
router.get("/resources", (req,res)=> {
    Project.getResources()
    .then(task => {
        res.status(200).json(task)
    })
    .catch(err => {
        res.status(500).json({message: "Error retrieving resources"})
    })
})

module.exports = router
