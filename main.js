
const url_string = window.location.href;
const url = new URL(url_string);
const userIp = url.searchParams.get('ipaddress');

const ipaddr = userIp ? userIp : '';

async function getData(ipaddr) {
    const URL = `https://geo.ipify.org/api/v1?apiKey=YOUR-GEO-IPIFY-API-KEY&ipAddress=${ipaddr}`;
    console.log('getting data..');
    const fetchURL = async (url) => await fetch(url).then(response => response.json());
    fetchURL(URL).then(response => resInfo(response)).catch(err => console.log(err))
};
getData(ipaddr);

function resInfo(response) {
    console.log(response);
    const ipAddress = response.ip;
    const location = `${response.location.city}, ${response.location.country} ${response.location.postalCode}`;
    const timezone = response.location.timezone;
    const isp = response.isp;
    const lat = response.location.lat;
    const lng = response.location.lng;
    //console.log(timezone)

    details(ipAddress, location, timezone, isp);   
    map(lat,lng);
}

/*  mostro le info recuperate con getData e salvate con resInfo */
function details(ipAddr, loc, time, ISP) {
    const ipaddr = document.getElementById('ip-item');
    const location = document.getElementById('location-item');
    const timezone = document.getElementById('timezone-item');
    const isp = document.getElementById('isp-item');

    ipaddr.textContent = ipAddr;
    location.textContent = loc;
    timezone.textContent = 'UTC' + time;
    isp.textContent = ISP;
}

function map(lat, lng) {
    let map = L.map('mapid').setView([lat, lng], 13);
    
    let svgMarker = L.divIcon({
        html: `<svg xmlns="http://www.w3.org/2000/svg" width="46" height="56"><path fill-rule="evenodd" d="M39.263 7.673c8.897 8.812 8.966 23.168.153 32.065l-.153.153L23 56 6.737 39.89C-2.16 31.079-2.23 16.723 6.584 7.826l.153-.152c9.007-8.922 23.52-8.922 32.526 0zM23 14.435c-5.211 0-9.436 4.185-9.436 9.347S17.79 33.128 23 33.128s9.436-4.184 9.436-9.346S28.21 14.435 23 14.435z"/></svg>`,
        className : "",
        iconSize: [24, 40],
        iconAnchor: [12, 40]
    });
    let marker = L.marker([lat,lng], {icon: svgMarker}).addTo(map);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'YOUR-MAPBOX-ACCESS-TOKEN'
    }).addTo(map);
}
