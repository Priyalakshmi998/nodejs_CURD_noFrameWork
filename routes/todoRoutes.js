
const { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo } = require('../controllers/todoController');

const handleTodoRoutes = (req, res) => {
    switch (req.method) {
        case 'GET':
            getAllTodos(req, res);
            break;
        case 'POST':
            createTodo(req, res);
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Not Found' }));
    }
};

const handleTodoIdRoutes = (req, res, todoId) => {
    switch (req.method) {
        case 'GET':
            getTodoById(req, res, todoId);
            break;
        case 'PUT':
            updateTodo(req, res, todoId);
            break;
        case 'DELETE':
            deleteTodo(req, res, todoId);
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Not Found' }));
    }
};

module.exports = { handleTodoRoutes, handleTodoIdRoutes };
