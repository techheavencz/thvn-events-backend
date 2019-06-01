const fetch = require('node-fetch');

const FB_GRAPH_API_URL = `https://graph.facebook.com`;
const FB_GRAPH_API_PAGE_TOKEN = `EAAJTkK7oiPABAOgBbWESzudAs6tp7uOVrXdG0PZAWQeTQ9930m4BHzVWMjKjwaRKqy9ZBQh0mNEZC5XucOZCOZCbPqYmZAumZAc6myfZB13XleQhSAmGZADO7BydrFVbIsT0tWGTZCjs4Tt0FJ58y2VII9RM72NySPdZAlZCzMIx69gE9XnwMQJsHx71yR8HYZAg7mk1vBfHDKzT2qgZDZD`;
const FB_GRAPH_API_EVENTS_QUERY = `events{id,name,description,start_time,cover,ticket_uri}`;
const FB_URL = `https://www.facebook.com`;

module.exports = async function getFbEvents(eventId){

    const url  = `${FB_GRAPH_API_URL}/v3.3/${eventId}?fields=${FB_GRAPH_API_EVENTS_QUERY}&access_token=${FB_GRAPH_API_PAGE_TOKEN}`;
    const response = await fetch(url);
    const data = await response.json();


    return data.events.data.map((eventFb)=>({

        id: eventFb.id,
        title: eventFb.name,
        description: eventFb.description,
        cover_url: eventFb.cover.source,
        event_url:`${FB_URL}/${eventFb.id}`,
        date:  eventFb.start_time


    }))

};
