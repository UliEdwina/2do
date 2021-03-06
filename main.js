/*
# ========================================================
# = Initialization
# ========================================================
*/


// An array for our todos.
const todos = [];
// An array for our completed todos.
const completed = [];

// Tell the browser to run init when the html is loaded.
window.onload = init;

function init() {
    // Add event listener functions that get called whenever a user interacts
    // with the respective element.

    document.querySelector('#add-todo-button')
        .addEventListener('click', addTodo);
    
    document.querySelector('#remove-todo-button')
        .addEventListener('click', removeTodo);

    document.querySelector('#complete-todo-button')
        .addEventListener('click', completeTodo);

    document.querySelector('#clear-todos-button')
        .addEventListener('click', clearTodos);

    document.querySelector('#remove-completed-button')
        .addEventListener('click', removeCompleted);

    document.querySelector('#mark-uncomplete-button')
        .addEventListener('click', markUncomplete);

    document.querySelector('#clear-completed-button')
        .addEventListener('click', clearComplete);
}


/*
# ========================================================
# = List Management
# ========================================================
*/


function addTodo(event) {
    // Make sure page doesn't reload on button press.
    event.preventDefault();

    // Grab value of todo input box.
    let activity = document.querySelector('#new-todo').value
    // Put that value at the end of our list.
    todos.push(activity);
    console.log(todos);

    // Update our html.
updateTodosOl(activity); 
    // Reset all input fields.
    resetAllInputs();
}

function removeTodo(event) {
    // Make sure page doesn't reload on button press.
    event.preventDefault();

    // Grab value that's in user's removal index input box.
    const grab = document.querySelector('#todo-removal-index').value;
    let index= parseInt(grab,10);
    
    // Adjust the index down by one because we're counting from 0.
    index = index - 1;

    // Remove    at that index.
    todos.splice(index, 1);
    console.log(todos);


    
    // Update our html.
    updateTodosOl();
    // Reset all input fields.
    resetAllInputs()
}

function completeTodo(event) {
    // Make sure page doesn't reload on button press.
    event.preventDefault();

    // Grab value that's in user's todo completion index input box.
    const complete = document.querySelector('#todo-complete-index').value;
    let index = parseInt(complete, 10);
    index = index - 1;
    // Move todo at that index to the completed list.
    completed.push(todos.splice(index, 1));
    // Update our html.
    updateCompletedOl()
    updateTodosOl();
    // Reset all input fields.
    resetAllInputs()
}

function clearTodos(event) {
    // Make sure page doesn't reload on button press.
    event.preventDefault();

    // Clear all todos from the list.
    while(todos.length > 0) {
        todos.pop();
        
        
    }
    // Update our html.
    updateTodosOl() 
}

function removeCompleted(event) {
    // Make sure page doesn't reload on button press.
    event.preventDefault();
    // Grab value that's in user's removal index input box.
    const removeComp = document.querySelector('#completed-removal-index').value;
    let index = parseInt(removeComp, 10);
    index = index - 1;
    // Remove todo at that index.
    completed.pop(index, 1);
    
   

    
    // Update our html.
    updateCompletedOl()
    // Reset all input fields.
    resetAllInputs()
}

function markUncomplete(event) {
    // Make sure page doesn't reload on button press.
    event.preventDefault();

    // Grab value that's in user's todo completion index input box.
    const marking = document.querySelector('#mark-uncomplete-index').value;
    let index = parseInt(marking, 10);
    index = index - 1;
    // Move todo at that index to the completed list.
    completed.push(todos.splice(index, 1));
    // Update our html.
    updateTodosOl() ;
    updateCompletedOl();
    // Reset all input fields.
    resetAllInputs()
}

function clearComplete(event) {
    // Make sure page doesn't reload on button press.
    event.preventDefault();

    // Clear all todos from the list.
    
    while(todos.length > 0) {
        todos.pop();
    }
    // Remove todo at that index.
    completed.pop();
    // Update our html.
    updateTodosOl()
    updateCompletedOl();
}

/*
# ========================================================
# = HTML Management
# ========================================================
*/


// Use this function to reset all input fields.
function resetAllInputs() {
    // Find all input fields.
    const inputs = document.querySelectorAll('input');
    
    // For each one, set its current value to an empty string.
    for(let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
}

// Use this function to update the todos ol to reflect the state of our todos
// list.
function updateTodosOl() {
    // Grab the todos ol.
    const ol = document.querySelector('#todos-list');
    // Clear it of children nodes.
    _clearOl(ol);
    // Re-populate it with everything from the todos array.
    _addItemsToOl(todos, ol);
}

// Use this function to update the completed ol to reflect the state of our completed
// list.
function updateCompletedOl() {
    // Grab the completed ol.
    const ol = document.querySelector('#completed-list');
    // Clear it of children nodes.
    _clearOl(ol);
    // Re-populate it with everything from the completed array.
    _addItemsToOl(completed, ol);
}

// Clear all children of the given ol.
// Used INTERNALLY by the ol-updating functions above.
function _clearOl(ol) {
    // As long as our ol isn't empty, shift off the first node.
    while(ol.hasChildNodes()) {
        ol.removeChild(ol.firstChild);
    }
}

// Add all items given to the ol given.
// Used INTERNALLY by the ol-updating functions above.
function _addItemsToOl(items, ol) {
    for(let i = 0; i < items.length; i++) {
        // For every item in the list, add it to the given ol.
        _addItemToOl(items[i], ol);
    }
}

// Append any item given to the given ol.
// Used INTERNALLY by _addItemsToOl
function _addItemToOl(item, ol) {
    // Make a new li.
    const newLi = document.createElement('li');
    // Add our item to it.
    newLi.innerText = item;
    // Append it to the given ol.
    ol.appendChild(newLi);
}