const http = require('http');
const fs = require('fs');
const path = require('path');
// Create server
const server = http.createServer((req, res) => {
    const { url, method } = req;
    if (url === '/' || url === '/index') {
        // Home page with navigation links
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
        <h1>welcome to node .js server</h1>
        <p>this is a basic web server created using node.js http module</p>
        <p>current time:${new Date().toLocaleString()}</p>
            <ul>
                <li><a href="/profile">View Profile</a></li>
                <li><a href="/httptransfer">Data Transfer</a></li>
                <li><a href="/app">App Logic</a></li>
                <li><a href="/url">URL Parser</a></li>
            </ul>
        `);
    } 
    else if (url === '/profile') {
        // Serve profile.html
        const filePath = path.join(__dirname, 'profile.html');
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error loading profile.html');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        });
    } 
    else if (url === '/httptransfer') {
        // Delegate logic to httptransfer.js
        const httpTransferHandler = require('./httptransfer');
        httpTransferHandler(req, res);
    } 
     else if (url === '/url' || url.startsWith('/parse')) {
        // Delegate logic to app.js
        const urlHandler = require('./urlParser');
        urlHandler(req, res);
    }
    else if (url === '/app') {
        // Delegate logic to app.js
        const appHandler = require('./app');
        appHandler(req, res);
    }
    else {
        // 404 for unknown routes
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Page Not Found');
    }
});
// Start server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
