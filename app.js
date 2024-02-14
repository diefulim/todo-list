const form = document.getElementById("todoAddForm").addEventListener("submit", todoList)
const todoName = document.getElementById("todoName")
const formButton = document.getElementById("todoAddButton")
const todoAdd = document.querySelector(".list-group")
const clearButton = document.getElementById("clearButton")
const clearAllButton = document.getElementById("clearButton").addEventListener("click", clearAllTodo)
const cardBody = document.querySelectorAll(".card-body")[0]
const deleteCardBody = document.querySelectorAll(".card-body")[1].addEventListener("click", deleteTodo)
const todosearchForm = document.querySelector("#todoListForm")
const todoSearch = document.querySelector("#todoSearch").addEventListener("keyup", todoSearchFilter)

window.addEventListener("load", loadPageUI)

let todos = []
let todosLength = 0;


function todoList(e){

    const formText = todoName.value.trim()

    if(formText == null || formText == ""){

        const succesAdd = document.createElement("div")

        succesAdd.className = "alert alert-danger mt-2"
        succesAdd.role = "alert"
        succesAdd.innerHTML = "bu kısmı boş bırakamazsın!"
 
        cardBody.appendChild(succesAdd)
        formButton.disabled = true;
 
        setTimeout(() => succesAdd.remove(), 3000)
        setTimeout(() => formButton.disabled = false, 3000)

    } else {

       todoListStorageAdd(formText);
       todoListUIAdd(formText);

       const succesAdd = document.createElement("div")

       succesAdd.className = "alert alert-success mt-2"
       succesAdd.role = "alert"
       succesAdd.innerHTML = formText + " başarıyla todo listesine eklendi"

       cardBody.appendChild(succesAdd)

       setTimeout(() => succesAdd.remove(), 2000)
    }

    e.preventDefault()
}


function todoListUIAdd(newTodo){

    const newList = document.createElement("li")
    const newObject = document.createElement("a")
    const deleteObject = document.createElement("i")

   newList.className = "list-group-item d-flex justify-content-between";
   newList.innerHTML = newTodo

   newObject.className = "delete-item"
   newObject.href = "#"

   deleteObject.className = "fa fa-remove"


   todoAdd.appendChild(newList)
   newList.appendChild(newObject)
   newObject.appendChild(deleteObject)

   todosLength++;
   clearButton.innerHTML = "Tüm Todoları Temizle " + "<span class=" + `"badge badge-danger"` + ">" + todosLength + "</span>"



}

function todoListCheck(){

    if(localStorage.getItem("todos") == null){
        todos = [];
     } else {
        todos = JSON.parse(localStorage.getItem("todos"))
     }

}

function todoListStorageAdd(newTodo){

    todoListCheck()
    todos.push(newTodo)
    localStorage.setItem("todos", JSON.stringify(todos))

}

function loadPageUI(){

if(localStorage.getItem("todos")){
    for(let i = 0; i < JSON.parse(localStorage.getItem("todos")).length; i++){
        todoListUIAdd(JSON.parse(localStorage.getItem("todos"))[i])
      }
}


}

function deleteTodo(delTodo){

    if(delTodo.target.classList[0] == "fa"){

        delTodo.target.parentNode.parentNode.remove()

        let newTodo = []

        for(let a = 0; a < JSON.parse(localStorage.getItem("todos")).length; a++){

            if(JSON.parse(localStorage.getItem("todos"))[a] != delTodo.target.parentNode.parentNode.textContent){
               newTodo.push(JSON.parse(localStorage.getItem("todos"))[a])
            } else {
                console.log("silindi")
            }

        }

        todosLength--;
        clearButton.innerHTML = "Tüm Todoları Temizle " + "<span class=" + `"badge badge-danger"` + ">" + todosLength + "</span>"
       

        localStorage.removeItem("todos")
        localStorage.setItem("todos", JSON.stringify(newTodo))

    }
    
}

function clearAllTodo(delAll){


if(localStorage.getItem("todos")){
    for(let d = 0; d < JSON.parse(localStorage.getItem("todos")).length; d++){
        delAll.target.parentNode.parentNode.children[3].children[2].children[0].remove()
    }
}

    todosLength = 0;
    clearButton.innerHTML = "Tüm Todoları Temizle"

    localStorage.removeItem("todos")

}

function todoSearchFilter(filterTodoText){

    const inputFilter = filterTodoText.target.value.toLowerCase().trim()
    const todoListesi = document.querySelectorAll(".list-group-item")

    if(todoListesi.length > 0){
        todoListesi.forEach(function(todo){
            if(todo.textContent.toLowerCase().trim().includes(inputFilter)){
               todo.setAttribute("style", "display: block")
            } else {
                todo.setAttribute("style", "display: none !important")
            }
        })

    } else {
        showAlert("warning", "en az 1 tane todo olmalı!")
    }

    
    filterTodoText.preventDefault()
    
}



