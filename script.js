const API_URL = 'https://task.farmaciaserra.pt/apais/'; // Substitua pelo domínio do seu site

// Carregar tarefas do backend
async function loadTasks() {
    const response = await fetch(`${API_URL}/tasks`);
    const tasks = await response.json();
    renderTasks(tasks);
}

// Adicionar uma nova tarefa
async function addTask(name, status = 'open') {
    await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, status })
    });
    loadTasks(); // Recarregar as tarefas
}

// Atualizar o status de uma tarefa
async function updateTaskStatus(id, status) {
    await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
    });
    loadTasks();
}

// Excluir uma tarefa
async function deleteTask(id) {
    await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });
    loadTasks();
}

// Renderizar tarefas na interface
function renderTasks(tasks) {
    const openTasks = document.getElementById('open-tasks');
    const inProgressTasks = document.getElementById('in-progress-tasks');
    const closedTasks = document.getElementById('closed-tasks');

    openTasks.innerHTML = '<h2>Aberto</h2>';
    inProgressTasks.innerHTML = '<h2>Em Processamento</h2>';
    closedTasks.innerHTML = '<h2>Fechado</h2>';

    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task';
        taskElement.innerHTML = `
            <p>${task.name}</p>
            <button onclick="updateTaskStatus(${task.id}, '${nextStatus(task.status)}')">
                Mover para ${nextStatus(task.status)}
            </button>
            <button onclick="deleteTask(${task.id})">Excluir</button>
        `;
        if (task.status === 'open') openTasks.appendChild(taskElement);
        if (task.status === 'in-progress') inProgressTasks.appendChild(taskElement);
        if (task.status === 'closed') closedTasks.appendChild(taskElement);
    });
}

// Definir próximo status
function nextStatus(current) {
    return current === 'open' ? 'in-progress' : current === 'in-progress' ? 'closed' : 'closed';
}

// Inicializar
loadTasks();
