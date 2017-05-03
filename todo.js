//var completetodos = new Array;

//get todos array from localStorage object
function get_todos() {
    //create new array to hold todo items(returned array)
    var todos = new Array;
    //array to initially hold items from localStorage
    var todos_str = localStorage.getItem('todo');
    //if todos_str array not empty transfer items from todos_str array to todos array
    if (todos_str !== null) {
        todos = JSON.parse(todos_str);
    }
    console.log(todos_str);
    //return todos array
    return todos;
}

function get_complete() {
    //create new array to hold todo items(returned array)
    var completetodos = new Array;
    //array to initially hold items from localStorage
    var completetodos_str = localStorage.getItem('complete');
    //if todos_str array not empty transfer items from todos_str array to todos array
    if (completetodos_str !== null) {
        completetodos = JSON.parse(completetodos_str);
    }
    console.log("Complete: ", completetodos_str);
    //return todos array
    return completetodos;
}

//adds todo item to localStorage todo list
function add() {
    //grabs reference to element and stores value of element to task variable
    var task = document.getElementById('task').value;
    //calls get_todos function and stores returned array in todos variable
    var todos = get_todos();
    //push task to todos array
    todos.push(task);
    // set todo localStorage item to new array(todos)
    localStorage.setItem('todo', JSON.stringify(todos));
    // call show function to show updated todos list
    show();

    return false;
}

//removes it from todos list
function remove() {
    //get and store id of item
    var id = this.getAttribute('id');
    // call get_todos function
    var todos = get_todos();
    //remove item(id as reference) from todos array
    todos.splice(id, 1);

    // set todo localStorage item to new array(todos)
    localStorage.setItem('todo', JSON.stringify(todos));
    // call show function to show updated todos list
    show();

    return false;
}

function buildList(todos){
  var html = '<ul>';
  for(var i=0; i<todos.length; i++) {
      html += '<li>' + todos[i] + '<button class="remove" id="' + i  + '">x</button><button class="complete" id="'+i+'">+</button></li>';
  };
  html += '</ul>';
  return html;
}

function show() {
    var todos = get_todos();
    var completetodos = get_complete();

    document.getElementById('todos').innerHTML = buildList(todos);

    document.getElementById('completed').innerHTML = buildList(completetodos);

    var buttons = document.getElementsByClassName('remove');
    for (var i=0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', remove);
    };

    var buttonsC = document.getElementsByClassName('complete');
    for (var i=0; i < buttonsC.length; i++){
      buttonsC[i].addEventListener('click', complete);
    };
}

//removes it from todos list
function complete() {
    //get and store id of item
    var id = this.getAttribute('id');
    // call get_todos function
    var todos = get_todos();
    var completetodos = get_complete();
    //remove item(id as reference) from todos array
    completetodos.push(todos[id]);
    todos.splice(id, 1);
    localStorage.setItem('todo', JSON.stringify(todos));
    // set todo localStorage item to new array(todos)
    localStorage.setItem('complete', JSON.stringify(completetodos));
    // call show function to show updated todos list
    show();

    return false;
}


document.getElementById('add').addEventListener('click', add);
show();
