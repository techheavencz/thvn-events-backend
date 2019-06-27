const fetch = require('node-fetch');

const FB_GRAPH_API_URL = `https://graph.facebook.com`;
const FB_GRAPH_API_PAGE_TOKEN = `EAAJTkK7oiPABAE8nLfRqL3MhhiqSZAyaViVrXwvlJFpGxPPWYRo0DseS6uFIqiYZBWkQNgqa50XEoYZAVZCZCboC7awLvwFE7UkkrCCg1Dc4ENYrLum1oRZC07NV9J3uw36PQsW7L23v7fotG4k4ou4dOuKX0ZB05PH8SrNVapPbwZDZD`;
const FB_GRAPH_API_EVENTS_QUERY = `events{id,name,description,start_time,cover,ticket_uri,place}`;
const FB_URL = `https://www.facebook.com`;

module.exports = async function getFbEvents(eventId) {
    const url = `${FB_GRAPH_API_URL}/v3.3/TechHeavenCZ?fields=${FB_GRAPH_API_EVENTS_QUERY}&access_token=${FB_GRAPH_API_PAGE_TOKEN}`;
    const response = await fetch(url);
    const data = await response.json();

    return data.events.data.map((eventFb) => ({
        id: eventFb.id,
        title: eventFb.name,
        description: eventFb.description,
        cover_url: eventFb.cover.source,
        event_url: `${FB_URL}/${eventFb.id}`,
        date: eventFb.start_time,
        place: eventFb.place.name
    }))
};
