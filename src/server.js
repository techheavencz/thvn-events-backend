const getFbEvents = require('./getFbEvents.js');
const express = require('express');
const app = express();
const cors = require('cors');
const port = 8080;

app.use(cors());

app.get('/events/:id?', async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({status: 'error', message: 'You should provide Facebook page id. Use: /event/{pageid}'});
    }
    res.json({status: 'ok', data: await getFbEvents(req.params.id)});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
// Send API 404
app.use(function (req, res) {
    res.status(400).json({status: 'error', message: 'Endpoint not found.'});
});
