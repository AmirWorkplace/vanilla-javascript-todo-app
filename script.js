function createContainer(rootElement) {
    const todoBody = document.createElement('section');
    const container = document.createElement('div');
    todoBody.classList.add(
        'w-full h-auto min-h-screen flex flex-col items-center justify-center bg-slate-100 text-slate-900 dark:text-slate-100 dark:bg-slate-900 text-[18px] font-normal'
    );
    todoBody.appendChild(container);
    container.classList.add(
        'max-w-3xl w-full h-auto flex flex-col items-center justify-center ring-4 ring-slate-400 rounded-md bg-slate-300 shadow-[1px_5px_20px_5px_rgba(0,0,0,0.1)]'
    );
}

const formData = (formElement) => {
    function serializeArray(form) {
        let initialFormData = [];
        const inputFields = [
            'file',
            'reset',
            'submit',
            'text',
            'checkbox',
            'radio',
            'email',
            'password',
            'range',
        ];

        for (var i = 0; i < form.elements.length; i++) {
            let field = form.elements[i];

            if (
                field.name &&
                !field.disabled &&
                inputFields.indexOf(field.type) === -1
            ) {
                if (field.type === 'select-multiple') {
                    for (var j = 0; j < field.options.length; j++) {
                        if (field.options[j].selected) {
                            initialFormData.push({
                                name: field.name,
                                value: field.options[j].value,
                            });
                        }
                    }
                }
            } else {
                initialFormData.push({
                    name: field.name,
                    value: field.value === 'on' ? field.checked : field.value,
                });
            }
        }

        return initialFormData;
    }

    return serializeArray(formElement).reduce(
        (accumulator, currentValue) => ({
            ...accumulator,
            [currentValue.name]: currentValue.value,
        }),
        {}
    );
};

const todoForm = document.getElementById('todoForm');
const todoLists = document.getElementById('todoLists');
const taskStatus = document.getElementById('taskStatus');
const inputTodoText = document.getElementById('todoText');
const todoSubmitBtn = document.getElementById('todoSubmitBtn');
const filterBySelect = document.querySelectorAll('.filterBySelect');

let filterColor = [];
let filterState = 'all';

todoForm.addEventListener('submit', insertTodoText);

const generateNextId = (states = []) => {
    return states.reduce((maxid, state) => Math.max(state.id, maxid), -1) + 1;
};

const todo = (id, text, tags = [], isCompleted) => {
    const makeTodo = `
    <div class="todo-item todo_${id}" id="${id}">
      <div class="selected-todo-box"
      onclick="todoSelection(${id})">
        <input class="cursor-pointer" type="checkbox" />
        <svg class="${isCompleted ? 'block' : 'hidden'}" 
        viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z" /></svg>
      </div>

      <div class="todo-text ${isCompleted ? 'line-through' : 'incomplete'}">
        ${text}
      </div>

      <div class="todo-edit-btn" onclick="editTodo(${id},'${text}')">
        <i class="fa-solid fa-pen-to-square"></i>
      </div>

      <div class="todo-color-mark">
        <div class="color-green ${tags.includes('green') && 'green'}"
        onclick="colorMarkTodo('green',${parseInt(id)})"></div>

        <div class="color-yellow ${tags.includes('yellow') && 'yellow'}"
        onclick="colorMarkTodo('yellow',${parseInt(id)})"></div>

        <div class="color-red ${tags.includes('red') && 'red'}"
        onclick="colorMarkTodo('red',${parseInt(id)})"></div>
      </div>

      <div class="todo-delete-btn" onclick="deleteTodo(${id})">
        <img src="./images/cancel.png"  alt="Cancel" />
      </div>
    </div>
  `;

    const todoElement = document.createElement('div');
    todoElement.innerHTML = makeTodo;

    return todoElement;
};

const initialState = [
    {
        id: 1,
        text: 'Bangladesh is Highly Corrupted Country by their Political People!',
        tags: ['green', 'yellow', 'red'],
        isCompleted: false,
    },
    {
        id: 2,
        text: 'Bangladesh is Highly Over Populated Country!',
        tags: ['green', 'yellow'],
        isCompleted: false,
    },
    {
        id: 3,
        text: 'Bangladesh is Riverine Country!',
        tags: ['red'],
        isCompleted: true,
    },
    {
        id: 4,
        text: 'Bangladesh is Muslims Country!',
        tags: [],
        isCompleted: true,
    },
];

function loadedTodos() {
    if (initialState.length !== 0) {
        initialState
            .filter((state) =>
                filterColor.every((color) => state.tags.includes(color))
            )
            .filter((state) => {
                switch (filterState) {
                    case 'all':
                        return state;
                    case 'incomplete':
                        return !state.isCompleted;
                    case 'complete':
                        return state.isCompleted;
                    default:
                        return state;
                }
            })
            .map((state) =>
                todoLists.appendChild(
                    todo(state.id, state.text, state.tags, state.isCompleted)
                )
            );
    } else {
        todoLists.innerHTML = '<p class="text-center">No task found!</p>';
    }

    const incomplete = todoLists.querySelectorAll('.incomplete').length;

    if (incomplete <= 0) {
        taskStatus.textContent = 'done all tasks!';
    } else if (incomplete <= 1) {
        taskStatus.textContent = `a task left...`;
    } else {
        taskStatus.innerHTML = `<span>${incomplete}</span> tasks left...`;
    }
}

loadedTodos();

function colorMarkTodo(color, id) {
    todoLists.innerHTML = '';

    initialState.map((state) => {
        if (state.id === id) {
            if (state.tags.includes(color)) {
                const tagIndex = state.tags.indexOf(color);
                if (tagIndex !== -1) {
                    state.tags.splice(tagIndex, 1);
                }
            } else {
                state.tags.push(color);
            }
        }
    });

    loadedTodos();
}

function todoSelection(id) {
    todoLists.innerHTML = '';

    initialState.map((state) => {
        if (state.id === id) {
            if (state.isCompleted) {
                state.isCompleted = false;
            } else {
                state.isCompleted = true;
            }
        }
    });

    loadedTodos();
}

function insertTodoText(event) {
    event.preventDefault();
    todoLists.innerHTML = '';

    const submitStatus = todoSubmitBtn.getAttribute('actionType');

    if (submitStatus === 'update_todo') {
        const editTodoId = parseInt(todoForm.getAttribute('actionId'));
        initialState.map((state) => {
            if (state.id === editTodoId) {
                const stateIndex = initialState.indexOf(state);
                initialState[stateIndex].text = inputTodoText.value;
            }
        });
    } else {
        if (inputTodoText.value !== '') {
            initialState.push({
                id: generateNextId(initialState),
                text: inputTodoText.value,
                isCompleted: false,
                tags: [],
            });
        }
    }

    inputTodoText.value = '';
    loadedTodos();
    todoSubmitBtn.classList.replace('fa-circle-question', 'fa-circle-check');
    todoSubmitBtn.setAttribute('actionType', 'insert_todo');
}

function deleteTodo(id) {
    todoLists.innerHTML = '';

    const findElement = initialState.find((state) => state.id === id);
    const deleTodoIndex = initialState.indexOf(findElement);
    initialState.splice(deleTodoIndex, 1);

    loadedTodos();
}

function editTodo(id, text) {
    todoSubmitBtn.setAttribute('actionType', 'update_todo');
    todoForm.setAttribute('actionId', id);
    todoSubmitBtn.classList.replace('fa-circle-check', 'fa-circle-question');
    inputTodoText.value = text;
}

function filterByColorTodos(event, color) {
    todoLists.innerHTML = '';
    event.target.classList.toggle(color);

    if (filterColor.includes(color)) {
        const colorIndex = filterColor.indexOf(color);
        filterColor.splice(colorIndex, 1);
    } else {
        filterColor.push(color);
    }

    loadedTodos();
}

function filterByMarks(event, action) {
    todoLists.innerHTML = '';
    filterState = action;
    filterBySelect.forEach((item) => item.classList.remove('selected'));
    event.target.classList.add('selected');
    loadedTodos();
}

function allCompleteTasks() {
    todoLists.innerHTML = '';

    for (var i = 0; i < initialState.length; i++) {
        initialState[i].isCompleted = true;
    }

    loadedTodos();
}

function clearCompleteTasks() {
    todoLists.innerHTML = '';

    for (var i = 0; i < initialState.length; i++) {
        initialState[i].isCompleted = false;
    }

    loadedTodos();
}
