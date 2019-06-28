const fbEventsFetcher = require('./fb-events-fetcher.js');
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8080;

app.use(cors());
app.set('trust proxy', true);

// Handle event request
app.get('/events/:id?', async (req, res) => {
    // Handle missing pageId in URL
    if (!req.params.id) {
        return res.status(400).json({status: 'error', message: 'You should provide Facebook page id. Use: /event/{pageid}'});
    }
    
    try {
        const data = await fbEventsFetcher.getFbEvents(req.params.id);
        res.set('Cache-Control', 'public, max-age=3600');
        res.json({status: 'ok', data: data});
    }catch (e) {
        res.status(404).json({status: 'error', message: `This page does not exists (${e.message})`});
    }
});

// Handle dev request to cache content
app.get('/__cache/', async (req, res) => {
        const data = await fbEventsFetcher.getCache();
        res.json({status: 'ok', data: data});
});

//Start server
app.listen(port, () => console.log(`Server listening on http://localhost:${port}/`));
