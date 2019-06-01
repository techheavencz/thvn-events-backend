
const getFbEvents = require('./getFbEvents.js')
const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

app.use(cors())

app.get('/events/:id', async (req, res) => {

    if(!req.params.id){
         return res.status(400).json({status:'error',message:'You should provide page id.'})
    }

    res.json({status: 'ok', data: await getFbEvents(req.params.id)});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))