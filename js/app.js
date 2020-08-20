// Wait for page "load" listener
window.addEventListener('load', () => {
    document.title = 'COOL TODO LIST';
    const todoList = [];
    let isDone = false;
    // Add eventlistener on button click
    let submitButton = document.querySelector('.btn-primary');
    submitButton.addEventListener('click', (e) => {
        // Stop form from submitting and refreshing page
        e.preventDefault();
        const todoListInput = document.querySelector('#todo_input');
        // Make sure that input element is not empty
        if (todoListInput.value !== '') {
            document.querySelector('#todo_list').innerHTML ='';
            pushTodo(todoListInput.value);
            showArrInHtml(todoList);
            clearInput(todoListInput)
        }
    });
    // grab input value and push to todo list arr
    function pushTodo(todo) {
        todoList.push(todo);
        return todoList
    }
    function clearInput(input) {
        input.value = '';
    }
    // Create divs for list items and render them 
    function showArrInHtml(arr) {
        arr.map(todo => {
            const todoItem = document.createElement('div');
            todoItem.classList.add('todo_div');
            // Set div data attribute to equal the value of the list item
            todoItem.setAttribute('data-todo_id', todo);
            // Now we will create html formatting for what todo's will look like
            todoItem.innerHTML = `
            <button class="btn btn-outline-success p-0"><i class="far fa-check-square"></i></button>
            <p class="p-3" id="todo_item">${todo}</p>
            <button class="btn btn-outline-danger p-0"><i class="far fa-trash-alt"></i></button>
            `;
            document.querySelector('#todo_list').append(todoItem)
        })
    }
    $("#todo_list").on("click", ".btn-outline-danger", (e) => {
        e.target.parentElement.parentElement.remove();
        const todoId = e.target.parentElement.parentElement.getAttribute('data-todo_id');
        todoList.splice(todoList.indexOf(todoId), 1);
    });
    // Toggle the done class 
    $('#todo_list').on('click', '.btn-outline-success', (e) => {
        if(!isDone) {
            const todo_text = e.target.parentElement.nextElementSibling;
            todo_text.classList.add("done");
            e.target.parentElement.parentElement.classList.add("done-div");
            isDone = true;
        } else {
            const todo_text = e.target.parentElement.nextElementSibling;
            todo_text.classList.remove("done");
            e.target.parentElement.parentElement.classList.remove("done-div");
            isDone = false;
        }
    })
});