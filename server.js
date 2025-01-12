const express = require('express');
const app = express();
const port = 3000;

const { open_browser, kill_browser, cleanUp, getactive } = require('./app.js');

// Home route
app.get('/', (req, res) => {
    console.log('Home page request');
    res.send('Hello World!');
});

// Start browser and open URL
app.get('/start', async (req, res) => {
    console.log('/start request');
    console.log(req.query);
    var obj = await open_browser(req.query.browser, req.query.url);
    res.send(obj.status || 'Success execution');
});

// Stop browser
app.get('/stop', async (req, res) => {
    console.log('/stop request');
    console.log(req.query);
    var obj = await kill_browser(req.query.browser);
    res.send(obj.status || 'Success execution');
});

// Clean up browser data
app.get('/cleanup', async (req, res) => {
    console.log('/cleanup request');
    console.log(req.query);
    var obj = await cleanUp(req.query.browser);
    res.send(obj.status || 'Success execution');
});

// Get active tab URL
app.get('/geturl', async (req, res) => {
    console.log('/geturl request');
    console.log(req.query);
    var obj = await getactive(req.query.browser);
    res.send(obj.activeURL || 'Error fetching active URL');
});

// Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
