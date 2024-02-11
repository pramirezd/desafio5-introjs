const inputTask = document.querySelector(".taskInput");
const btnAddTask = document.querySelector(".addTask");
const listTask = document.querySelector(".tableList");
const totalTask = document.querySelector(".taskTotal");
const doneTask = document.querySelector(".taskDone");


const activities = [
    {
        id: Math.floor(Math.random() * 99),
        description: 'Hacer mercado',
        isDone: true,
    },
    {
        id: Math.floor(Math.random() * 99),
        description: 'Estudiar para la prueba',
        isDone: false,
    },
    {
        id: Math.floor(Math.random() * 99),
        description: 'Sacar a pasear a Tobby',
        isDone: false,
    },
];

renderList(activities);


btnAddTask.addEventListener("click", () => {
    const task = inputTask.value;
    if (task.trim() === '') {
        alert('No puedes ingresar tareas en blanco');
    } else {
        const tarea = {
            id: Math.floor(Math.random() * 99),
            description: task,
            isDone: false,
        };
        activities.push(tarea);
        inputTask.value = "";
        renderList(activities);
    }
    
});

function renderList(activities){
    let html = "";
    for (let act of activities) {
        html += `
        <tr>
            <td>
                <p>${act.id}</p>
            </td>
            <td>
                <p ${act.isDone ? 'class="activityColor"' : ''}>${act.description}</p>
            </td>
            <td>
                <input type="checkbox" id="${act.id}" class="${act.id}" ${act.isDone ? 'checked' : ''}>
            </td>
            <td>
                <button onclick="deleteTask(${act.id})" class="btn">X</button>
            </td>
        </tr>
        `;
    };
    listTask.innerHTML = html;
    doneValidation();
    refreshCount(activities);
    
};

function deleteTask(id){
    const index = activities.findIndex((e) => e.id === id);
    activities.splice(index, 1);
    renderList(activities);
};

function doneValidation () {
    const doneActivities = document.querySelectorAll('input[type="checkbox"]');
    doneActivities.forEach(doneAct => {
        doneAct.addEventListener("change", function () {
            const actId = Number(this.id);
            const idx = activities.findIndex(act => act.id === actId);
            activities[idx].isDone = !activities[idx].isDone;
            renderList(activities);
        });
    })      
};


function refreshCount (activities) {
    totalTask.innerHTML = `<li>Total: <b> ${activities.length} </b>`;
    const findDoneAct = activities.filter( act => act.isDone === true);
    doneTask.innerHTML = `<li>Realizadas: <b> ${findDoneAct.length} </b>`;
};
