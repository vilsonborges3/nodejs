const express = require('express');

const server = express();
server.use(express.json());

const projects = [{id: '0', title: 'Novo projeto', tasks: []}];
const requestNumber = 0;
server.use((req, res, next) => {
    console.time('Request');
    requestNumber++;
    console.log(`Método: ${req.method}; URL: ${req.url}; Numero de requisições feitas: ${requestNumber}`);
    next();
    console.timeEnd('Request');
});

function checkIdExists(req,res,next){
    const {id} = req.params;

    projects.map( function (item, index) {
        if(item.id === id){
            return next();
        }
        return res.json('Não existe esse id');
    })
    
}

server.post('/projects', (req, res) => {
    const {proj} = req.body;
    
    projects.push(proj);

    return res.json(projects);
});

server.post('/projects/:id/tasks',checkIdExists, (req,res) => {
    const {title} = req.body;

    const {id} = req.params;

    projects.map( function(item, index) {
        if(item.id === id){
            projects[index].tasks.push(title);
        }
    });
    return res.json(projects);
});

server.get('/projects', (req,res) => {

    return res.json(projects);
});

server.put('/projects/:id',checkIdExists, (req, res) => {
    const {id} = req.params;
    const {title} = req.body;

    projects.map(function(item,index){
        if(item.id === id){
            projects[index].title = title;
        }
    });
    return res.json(projects);
});

server.delete('/projects/:id',checkIdExists, (req, res) =>{
    const {id} = req.params;

    projects.map( function(item, index) {
        if(item.id === id){
            projects.splice(index,1);
        }
    });
    return res.json(projects);
    
});



server.listen(3000);