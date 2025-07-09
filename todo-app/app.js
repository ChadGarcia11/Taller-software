document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');

    // Load todos from localStorage
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    renderTodos();

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const text = input.value.trim();
        if (text) {
            todos.push(text);
            input.value = '';
            saveTodos();
            renderTodos();
        }
    });

    list.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.parentElement.getAttribute('data-index');
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        }
    });

    function renderTodos() {
        list.innerHTML = '';
        todos.forEach((todo, idx) => {
            const li = document.createElement('li');
            li.setAttribute('data-index', idx);
            li.innerHTML = `
                <span>${todo}</span>
                <button class="delete-btn">Eliminar</button>
            `;
            list.appendChild(li);
        });
    }

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }
});
