const fetch = require('node-fetch');

const FB_GRAPH_API_URL = `https://graph.facebook.com`;
const FB_GRAPH_API_PAGE_TOKEN = `EAAJTkK7oiPABAELVMMHZAxJMzmV13hKDprxAX9EwOe8MALoJPRWgUQNmJ9fYZAqwZCcm1XJ7izItXtoPaoqgu4d1JfZBZBUfJLPG5VnIlPZA7KrzRcCf28St8F0xLDTAZBuPg5ldZCFr2M8OfVvClefCJlDZBdHie4xZC69NZByzs2wDNxUXq0coszpv5QFPGayjYEZD`;
const FB_GRAPH_API_EVENTS_QUERY = `events%7Bid%2Cname%2Cdescription%2Cstart_time%2Ccover%2Cticket_uri%2Cplace%7D`;
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
        date:  eventFb.start_time,
        place: eventFb.place.street


    }))

};
