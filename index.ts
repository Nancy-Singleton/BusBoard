import fetch from 'node-fetch';

fetch('https://api.tfl.gov.uk/StopPoint/490008660N/Arrivals')
    .then(res => res.text())
    .then(body => console.log(body));