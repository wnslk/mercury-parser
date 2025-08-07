const Mercury = require('@postlight/mercury-parser');
const http = require('http');
const url = require('url');

http.createServer(async (req, res) => {
  const { query } = url.parse(req.url, true);
  const targetUrl = query.url;

  if (!targetUrl) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'Missing "url" query param' }));
  }

  try {
    const result = await Mercury.parse(targetUrl);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result, null, 2));
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: err.message }));
  }
}).listen(3000);
