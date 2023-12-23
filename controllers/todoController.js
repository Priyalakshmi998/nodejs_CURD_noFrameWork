// controllers/todoController.js
let todos = [
    { id: 1, text: 'Learn Node.js' },
    { id: 2, text: 'Build a CRUD API' },
];

module.exports = {
    getAllTodos: (req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(todos));
    },

    getTodoById: (req, res, todoId) => {
        const id = parseInt(todoId);
        const todo = todos.find((todo) => todo.id === id);

        if (todo) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(todo));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Todo not found' }));
        }
    },

    createTodo: (req, res) => {
        let body = '';

        // Listens for data events as chunks of data arrive in the request
        req.on('data', (chunk) => {
            // concatenates each chunk to the existing value of the body string.
            //Eg: if the request sends data in three chunks like "abc", "def", and "ghi".the body variable will contain the concatenated string "abcdefghi".
            body += chunk;
        });

        req.on('end', () => {
            // parse- takes a valid JSON string as its argument and returns a JavaScript object
            // '{"name": "John", "age": 30, "city": "New York"}'; to => { name: 'John', age: 30, city: 'New York' }
            const newTodo = JSON.parse(body);
            newTodo.id = todos.length + 1;
            todos.push(newTodo);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newTodo));
        });
    },

    updateTodo: (req, res, todoId) => {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            const id = parseInt(todoId);
            const updatedTodo = JSON.parse(body);
            const todoIndex = todos.findIndex((todo) => todo.id === id);

            if (todoIndex !== -1) {
                todos[todoIndex] = { id, ...updatedTodo };
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(todos[todoIndex]));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Todo not found' }));
            }
        });
    },

    deleteTodo: (req, res, todoId) => {
        const id = parseInt(todoId);
        todos = todos.filter((todo) => todo.id !== id);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Todo deleted successfully' }));
    },
};
