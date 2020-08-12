const taskList = [];

const taskInputElement = document.getElementById('taskInput');
const taskListElement = document.getElementById('taskList');

//Event listeners
taskInputElement.addEventListener('click',() => {
    addTask();
});
taskInputElement.addEventListener('keypress',(event) => {
    if(event.keyCode === 13) addTask();
});

//Add task
addTask = () => {
    const taskDescription = taskInputElement.value;
    if(taskDescription.length > 0) {
        taskList.push(taskDescription);
        taskInputElement.value = '';
        updateDOM();
    }
};

//Remove task
removeTask = (index) => {
    taskList.splice(index, 1);
    updateDOM();
};

//Update DOM
updateDOM = () => {
    //Clean taskListElement div
    taskListElement.innerHTML = '';

    taskList.forEach((task, index) => {
        const element = document.createElement('div');
        element.classList.add('task');
        element.innerHTML = `${task}<button type="button" onClick=removeTask(${index}) class="close pull-right" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>`;
        taskListElement.appendChild(element);
    });
}