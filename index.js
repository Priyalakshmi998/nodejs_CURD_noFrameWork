// to create an HTTP server that can handle HTTP requests and responses
const http = require('http');

// used to break down a URL into its components (like protocol, hostname, pathname, query parameters, etc.).
const url = require('url');


const { handleTodoRoutes, handleTodoIdRoutes } = require('./routes/todoRoutes');


// creates a new HTTP server instance, and the function passed to it will be invoked for every incoming HTTP request
const server = http.createServer((req, res) => {
    // parsedUrl object will contain information about the URL, and you can access its properties such as pathname, query, etc
    const parsedUrl = url.parse(req.url, true);

    // Set CORS headers
    // res.setHeader(name, value)
    // method is used to set a single header in the response
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // OPTIONS method is often used for preflight requests in CORS
    // preflight request is a preliminary request sent by the browser to check whether the actual request (e.g., a POST or PUT request) is safe to send.
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    if (parsedUrl.pathname === '/todos') {
        // Handle collection-level route
        handleTodoRoutes(req, res);
    } else if (parsedUrl.pathname.match(/^\/todos\/\d+$/)) {
        // Handle item-level route
        const todoId = parsedUrl.pathname.split('/')[2];
        handleTodoIdRoutes(req, res, todoId);
    } else {
        // headers are passed as an optional third argument, and they replace any existing headers
        // res.writeHead(statusCode[, statusMessage][, headers])
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
});

//good practice to choose port numbers above 1024
const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// port numbers and their associated services:

// Port 80: Reserved for HTTP traffic.
// Port 443: Reserved for HTTPS (HTTP over TLS/SSL) traffic.
// Port 25: Reserved for Simple Mail Transfer Protocol (SMTP).
// Port 22: Reserved for Secure Shell (SSH) traffic.
// Port 21: Reserved for File Transfer Protocol (FTP).
// Port 53: Reserved for Domain Name System (DNS) traffic.
// Port 3306: Often used for MySQL database connections.
// Port 27017: Often used for MongoDB connections.
