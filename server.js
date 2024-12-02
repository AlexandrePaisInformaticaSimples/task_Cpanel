const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

// Configurar o servidor
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Conectar ao banco de dados no cPanel
const db = mysql.createConnection({
    host: 'localhost', // ou o host fornecido pelo cPanel
    user: 'farmacia_task_user', // Substitua pelo nome do usuário MySQL criado
    password: 'sMM-Okx*imNS', // Substitua pela senha criada
    database: 'farmacia_task_manager' // Nome do banco de dados
});

// Verificar conexão
db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        process.exit(1); // Encerrar o servidor em caso de erro
    }
    console.log('Conectado ao banco de dados!');
});

// Rotas da API
// Obter todas as tarefas
app.get('/tasks', (req, res) => {
    db.query('SELECT * FROM tasks', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Adicionar uma nova tarefa
app.post('/tasks', (req, res) => {
    const { name, status } = req.body;
    db.query('INSERT INTO tasks (name, status) VALUES (?, ?)', [name, status || 'open'], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, id: results.insertId });
    });
});

// Atualizar o status de uma tarefa
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    db.query('UPDATE tasks SET status = ? WHERE id = ?', [status, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// Excluir uma tarefa
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
