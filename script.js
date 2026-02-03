const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('inp');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('toDoTask')) || [];

const getSortedTasks = () => {
    return [...tasks].sort((a, b) => a.completed - b.completed);
};

const checkEmpty = () => {
    if (tasks.length === 0) {
        taskList.innerHTML = `
      <div class="empty-message" style="text-align:center; color: var(--text-dim); margin-top: 20px;">
        <i class="fa-solid fa-clipboard-list" style="font-size: 24px; opacity: 0.5;"></i>
        <br>No tasks yet.
      </div>`;
    } else {
        const emptyMsg = document.querySelector('.empty-message');
        if (emptyMsg) emptyMsg.remove();
    }
};

const saveLocal = () => {
    localStorage.setItem('toDoTask', JSON.stringify(tasks));
};

const vibrate = () => {
  if (!navigator.vibrate) {
    return;
  }

  const success = navigator.vibrate([40, 20, 40]);
};

const createTaskElement = (task) => {
    const li = document.createElement('li');
    li.dataset.id = task.id;
    if (task.completed) li.classList.add('completed');

    li.innerHTML = `
    <span class="task-text">${task.data}</span>
    <div class="btns">
      <i class="fa-solid fa-pen-to-square btn-edit" title="Edit"></i>
      <i class="fa-solid fa-trash btn-delete" title="Delete"></i>
    </div>
  `;
    return li;
};

const renderTasks = () => {
    taskList.innerHTML = '';
    const sorted = getSortedTasks();
    sorted.forEach(task => taskList.appendChild(createTaskElement(task)));
    checkEmpty();
};

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = taskInput.value.trim();

    if (!value) {
        vibrate();
        taskInput.classList.add('error');
        setTimeout(() => taskInput.classList.remove('error'), 1000);
        return;
    }

    const newTask = { id: Date.now(), data: value, completed: false };
    tasks.push(newTask);
    saveLocal();
    vibrate();

    renderTasks();
    taskInput.value = '';
    taskInput.focus();
});

taskList.addEventListener('click', (e) => {
    const target = e.target;
    const li = target.closest('li');
    if (!li) return;
    const id = parseInt(li.dataset.id);

        if (target.classList.contains('btn-delete')) {
        vibrate();
        li.style.transform = 'translateX(50px)';
        li.style.opacity = '0';
        setTimeout(() => {
            tasks = tasks.filter(t => t.id !== id);
            saveLocal();
            renderTasks();
        }, 300);
        return;
    }

        if (target.classList.contains('task-text')) {
        vibrate();
        tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
        saveLocal();

        if (li.classList.contains('completed')) {
            renderTasks();
        } else {
            li.classList.add('shock-effect');
            setTimeout(() => renderTasks(), 500);
        }
        return;
    }

    if (target.classList.contains('btn-edit') || target.classList.contains('fa-check')) {
        const textSpan = li.querySelector('.task-text');
        const input = li.querySelector('.edit-input');
        if (input) {
            finishEditing(li, input, target, id);
        } else {
            const currentText = textSpan.textContent;
            const newInput = document.createElement('input');
            newInput.className = 'edit-input';
            newInput.value = currentText;

            textSpan.replaceWith(newInput);
            newInput.focus();

            target.className = 'fa-solid fa-check btn-save';
            target.style.color = 'var(--success)';

            newInput.onkeydown = (ev) => {
                if (ev.key === 'Enter') finishEditing(li, newInput, target, id);
                if (ev.key === 'Escape') renderTasks();
            };
        }
    }
});

const finishEditing = (li, input, icon, id) => {
    const newValue = input.value.trim() || 'Untitled Task';
    tasks = tasks.map(t => t.id === id ? { ...t, data: newValue } : t);
    saveLocal();
    vibrate();
    renderTasks();
};

renderTasks();
