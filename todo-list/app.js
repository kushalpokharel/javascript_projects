const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const task = document.querySelector('#task');
const clearList = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');

loadEventListeners();

function loadEventListeners(){

  document.addEventListener('DOMContentLoaded',getTasks);

  form .addEventListener('submit',addTask);

  taskList.addEventListener('click',removeTask);

  clearList.addEventListener('click',removeTasks);

  filter.addEventListener('keyup',filterTasks);

}

function getTasks()
{
  if(localStorage.getItem('tasks')===null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task){
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));
  
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
  
    li.appendChild(link);
  
    taskList.appendChild(li);
  
  })
}

function filterTasks(e)
{
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(
    function(task){
      const item = task.firstChild.textContent;
      console.log(task);
      console.log(item);
      if(item.toLowerCase().indexOf(text) != -1)
      {
        console.log('here');
        task.style.display='block';
      }
      else
      {
        console.log('none');
        task.style.display='none';
      }
    });  
}

function removeTasks(e)
{
  if(confirm('Do you want to clear all tasks?'))
  {
    while(taskList.firstChild){
      taskList.removeChild(taskList.firstChild);
    }
  }
  removeAllFromStorage();
   //taskList.removeChild();
}

function removeAllFromStorage()
{
 localStorage.clear();
}

function removeTask(e)
{
  //console.log(e.target.classList);
  if(e.target.classList.contains('fa-remove')){
    //console.log('yes');
    if(confirm('Are you sure?'))
      e.target.parentElement.parentElement.remove();
  }
  removeInLocalStorage(e.target.parentElement.parentElement);
}

function removeInLocalStorage(taskItem){
  if(localStorage.getItem('tasks')===null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  
  tasks.forEach(function(task,index ){
     if(taskItem.textContent === task){
      tasks.splice(index,1);             //delete task from that index upto 1 array element
      return;
     }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(e){

  if(task.value===''){
    alert('Add a task');
    e.preventDefault();
    return;
  }

  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(task.value));

  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';

  li.appendChild(link);

  taskList.appendChild(li);

  storeTaskInLocalStorage(task.value);

  task.value='';

  //console.log(task.value);
  e.preventDefault();
}

function storeTaskInLocalStorage(task){
  if(localStorage.getItem('tasks')===null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  tasks = JSON.stringify(tasks);

  localStorage.setItem('tasks',tasks);
}
 