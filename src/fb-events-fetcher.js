const fetch = require('node-fetch');

const FB_GRAPH_API_URL = `https://graph.facebook.com`;
const FB_GRAPH_API_VERSION = `v3.3`;
const FB_GRAPH_API_PAGE_TOKEN = `EAAJTkK7oiPABAE8nLfRqL3MhhiqSZAyaViVrXwvlJFpGxPPWYRo0DseS6uFIqiYZBWkQNgqa50XEoYZAVZCZCboC7awLvwFE7UkkrCCg1Dc4ENYrLum1oRZC07NV9J3uw36PQsW7L23v7fotG4k4ou4dOuKX0ZB05PH8SrNVapPbwZDZD`;
const FB_GRAPH_API_EVENTS_QUERY = `events{id,name,description,start_time,cover,ticket_uri,place}`;
const FB_URL = `https://www.facebook.com`;
const CACHE_TTL = 3600;

let cache = {};

module.exports.getFbEvents = async function (eventId) {
    // Check cache if exists event & is not yet expired => return cached
    if (cache[eventId] && cache[eventId].expire > new Date()) {
        return cache[eventId].data;
    }

    // Fetch data from API
    const fbData = await fetchEvents(eventId);

    // Put fetched data to cache
    const expireTime = new Date(new Date().getTime() + CACHE_TTL * 1000);
    cache[eventId] = {
        data: fbData,
        expire: expireTime,
    };

    return fbData;
};

module.exports.getCache = async function () {
    return cache;
};

async function fetchEvents(eventId) {
    const url = new URL(`${FB_GRAPH_API_VERSION}/${eventId}`, FB_GRAPH_API_URL);
    const urlParams = new URLSearchParams({
        fields: FB_GRAPH_API_EVENTS_QUERY,
        access_token: FB_GRAPH_API_PAGE_TOKEN
    });
    url.search = urlParams.toString();

    const response = await fetch(url);

    if (!response.ok) {
        throw new FbFetchError(response.statusText, response.status);
    }

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
}

// Custom error to keep error statusCode
class FbFetchError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
