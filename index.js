const express = require('express');

const server = express();

server.use(express.json());

const projetos = [ ];
let i = 0;

server.use((req, res, next) => {
  i++;
  console.log(i);
  next();
})

function checkIdExists(req, res, next) {
  if(projetos.findIndex(f => f.id == req.params.id) == -1) {
    return res.status(400).json( { error: ' Id não existe'});
  }

  return next();
}

server.post('/projects', (req, res) => {
  const { id } = req.body;
  const { title } = req.body;

  projetos.push( { id: id, title: title, tasks: []});

  return res.json(projetos);
})

server.get('/projects', (req, res) => {
  return res.json(projetos);
})

server.put('/projects/:id', checkIdExists, (req, res) => {
  
  const { id } = req.params;
  const { title } = req.body;

  const index = projetos.findIndex(f => f.id == id);
  projetos[index].title = title;

  return res.json(projetos);
})

server.delete('/projects/:id', checkIdExists, (req, res) => {
  const { id } = req.params;
  
  const index = projetos.findIndex(f => f.id == id);
  projetos.splice(index, 1);

  return res.send();
})

server.post('/projects/:id/tasks', checkIdExists, (req, res) => {
  const { id } = req.params;
  const { tasks } = req.body;

  const index = projetos.findIndex(f => f.id == id);
  projetos[index].tasks.push(tasks);

  return res.json(projetos);
})

server.listen(4000);