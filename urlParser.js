module.exports = (req, res) => {
    if (req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const requestUrl = new URL(req.url, `http://${req.headers.host}`);
        console.log(requestUrl);
        if (requestUrl.pathname === '/parse' && requestUrl.searchParams.has('url')) {
            const urlToParse = requestUrl.searchParams.get('url');

            try {
                const parsedUrl = new URL(urlToParse);

                res.end(`
                    <h1>Parsed URL Components</h1>
                    <p><strong>Original URL:</strong> ${urlToParse}</p>
                    <hr>
                    <p><strong>Protocol:</strong> ${parsedUrl.protocol}</p>
                    <p><strong>Full URL:</strong> ${parsedUrl.href}</p>
                    <p><strong>Host:</strong> ${parsedUrl.host}</p>
                    <p><strong>Hostname:</strong> ${parsedUrl.hostname}</p>
                    <p><strong>Port:</strong> ${parsedUrl.port || '(none)'}</p>
                    <p><strong>Path:</strong> ${parsedUrl.pathname}</p>
                    <p><strong>Search:</strong> ${parsedUrl.search}</p>
                    <p><strong>Search Params:</strong> <pre>${JSON.stringify(
                        Object.fromEntries(parsedUrl.searchParams.entries()), null, 2)}</pre></p>
                    <p><strong>Hash:</strong> ${parsedUrl.hash}</p>
                    <p><a href="/">Back to Home</a></p>
                `);
            } catch (error) {
                res.end(`
                    <h1>Error Parsing URL</h1>
                    <p>Could not parse the provided URL: <strong>${urlToParse || 'No URL provided'}</strong></p>
                    <p>Error: ${error.message}</p>
                    <p>Try: <a href="/parse?url=https://www.example.com:8080/path?user=john&age=25#section1">
                    /parse?url=https://www.example.com:8080/path?user=john&age=25#section1</a></p>
                    <p><a href="/">Back to Home</a></p>
                `);
            }

        } else {
            res.end(`
                <h1>Welcome to the Node.js URL Parser</h1>
                <p>Use the URL query format: <code>/parse?url=https://example.com</code></p>
                <p>Example: <a href="/parse?url=https://www.example.com:8080/path?user=john&age=25#section1">
                /parse?url=https://www.example.com:8080/path?user=john&age=25#section1</a></p>
                <p><a href="/">Back to Home</a></p>
            `);
        }
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('405 - Method Not Allowed');
    }
};
