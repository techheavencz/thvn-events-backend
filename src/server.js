const getFbEvents = require('./getFbEvents.js');
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8080;

app.use(cors());
app.set('trust proxy', true);

app.get('/events/:id?', async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({status: 'error', message: 'You should provide Facebook page id. Use: /event/{pageid}'});
    }
    res.json({status: 'ok', data: await getFbEvents(req.params.id)});
});

// Send API 404
app.use(function (req, res) {
    res.status(400).json({status: 'error', message: 'Endpoint not found.'});
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
