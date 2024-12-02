const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let tasks = [
    { id: 1, name: 'Revisar documentos', status: 'open' },
    { id: 2, name: 'Enviar relatório', status: 'open' },
    { id: 3, name: 'Planejar reunião', status: 'open' }
];

// Endpoint para obter tarefas
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Endpoint para adicionar uma tarefa
app.post('/tasks', (req, res) => {
    const { name } = req.body;
    const newTask = { id: tasks.length + 1, name, status: 'open' };
    tasks.push(newTask);
    res.json(newTask);
});

// Endpoint para atualizar o status de uma tarefa
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const task = tasks.find(t => t.id === parseInt(id));
    if (task) {
        task.status = status;
        res.json(task);
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
});

// Endpoint para excluir uma tarefa
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(t => t.id !== parseInt(id));
    res.json({ success: true });
});

// Inicia o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
