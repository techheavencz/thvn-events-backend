const TEST_PAGE_ID = '1777732895836985';

const getFbEvents = require('./fb-events-fetcher.js');

async function main() {
    const events = await getFbEvents(TEST_PAGE_ID);
    console.log('events', events);
}

main();
