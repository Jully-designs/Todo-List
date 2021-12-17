const submit = document.querySelector(".submit");
const input = document.querySelector("#input");
const deleteBtn = document.querySelector(".fas");
const listDiv = document.querySelector(".list-items");
const clearAll = document.querySelector(".clear-btn")


let todoList= [];

const addtodo = (task) => {
    const todo = {
        task,
        id: Date.now(),
    }
    todoList.push(todo);
    render(todo)
}

submit.addEventListener("click", () => {
    if(input.value !== ""){
       addtodo(input.value);
       input.value = "";
    }else{
        alert("Enter a task!");
    }
})

const render = (todo) => {
    localStorage.setItem('todoListRef', JSON.stringify(todoList));
    let list = document.createElement("li");
    const item = document.querySelector(`[data-key='${todo.id}']`);
    let times = document.createElement("i");

    if(todo.deleted){
        item.remove();
        if (todoList.length === 0) listDiv.innerHTML = '';
        return
    }

    list.setAttribute('data-key', todo.id);
    list.innerHTML += 
    `<span>${todo.task}</span> <i class="fas fa-times-circle delete-task" onClick= "deleteItem()"></i>`
    
    listDiv.append(list);
    list.append(times);
}

const deleteItem = (key) => {
    const index = todoList.findIndex(todo => todo.id === Number(key));
    const todo = {
        deleted: true,
        ...todoList[index]
    };
    todoList = todoList.filter(item => item.id !== Number(key));
    render(todo);
}

listDiv.addEventListener("click", event => {
    if(event.target.classList.contains('fas')){
        const itemKey = event.target.parentElement.dataset.key;
        deleteItem(itemKey);
    }
});

// if(listDiv.childNodes.length < 1){
//     clearAll.classList.add("shwClear")
//     alert("No Input!");
// }else {
//     alert("Input!");
//     clearAll.classList.remove("shwClear")
//     // clearAll.classList.add("shwClear")
// }
clearAll.addEventListener("click", () => {
   listDiv.innerHTML= "";
    localStorage.clear();
});


//To save other enteries to windows on reload
document.addEventListener('DOMContentLoaded', () => {
    const ref = localStorage.getItem('todoListRef');
    if (ref) {
      todoList = JSON.parse(ref);
      todoList.forEach(t => {
        render(t);
      });
    }
});


