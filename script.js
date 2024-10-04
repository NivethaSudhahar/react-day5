let todos = [];

document.getElementById('todoForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const taskName = document.getElementById('taskName').value;
    const taskDescription = document.getElementById('taskDescription').value;

    const newTodo = {
        id: Date.now(),
        name: taskName,
        description: taskDescription,
        status: 'not completed',
    };

    todos.push(newTodo);
    displayTodos();
    e.target.reset();
});

function displayTodos(filter = 'all') {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';

    const filteredTodos = todos.filter(todo => {
        if (filter === 'completed') return todo.status === 'completed';
        if (filter === 'not-completed') return todo.status === 'not completed';
        return true;
    });

    filteredTodos.forEach(todo => {
        const todoCard = document.createElement('div');
        todoCard.className = 'card';
        todoCard.innerHTML = `
            <div>
                <strong>${todo.name}</strong>
                <p>${todo.description}</p>
                <select onchange="changeStatus(${todo.id}, this.value)">
                    <option value="not completed" ${todo.status === 'not completed' ? 'selected' : ''}>Not Completed</option>
                    <option value="completed" ${todo.status === 'completed' ? 'selected' : ''}>Completed</option>
                </select>
            </div>
            <div>
                <button onclick="editTodo(${todo.id})">Edit</button>
                <button onclick="deleteTodo(${todo.id})">Delete</button>
            </div>
        `;
        todoList.appendChild(todoCard);
    });
}

function changeStatus(id, status) {
    todos = todos.map(todo => (todo.id === id ? { ...todo, status } : todo));
    displayTodos();
}

function editTodo(id) {
    const todo = todos.find(todo => todo.id === id);
    document.getElementById('taskName').value = todo.name;
    document.getElementById('taskDescription').value = todo.description;
    deleteTodo(id);
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    displayTodos();
}

document.getElementById('filter').addEventListener('change', function () {
    displayTodos(this.value);
});
