// https://leafletjs.com/
// https://geo.ipify.org/

const form = document.querySelector(".form");
const input = document.querySelector(".input-text");
const ipAddress = document.querySelector("#ipAddress");
const address = document.querySelector("#location");
const timezone = document.querySelector("#timezone");
const isp = document.querySelector("#isp");

let map = L.map("map", { zoomControl: false });
let icon = L.icon({
  iconUrl: "./images/icon-location.svg",
  iconSize: [46, 55], // size of the icon
  iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
});

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoiZHViZXlkaXZ5YW5rIiwiYSI6ImNsMmQ0YmV2ZzA1azgzY284M2hpaTJ4Z2QifQ.WyherYDf5o0hCU077Zn6DQ",
  }
).addTo(map);

window.addEventListener("load", getUserIPDetails());

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const userInput = input.value;
  const getIPDetails_URL = `https://geo.ipify.org/api/v1/?apiKey=at_JonIcgFaDGUQS7HPF6DcvJM3Bg3RK&ipAddress=${userInput}&domain=${userInput}`;

  (async function getIpDetails() {
    try {
      const response = await fetch(getIPDetails_URL);
      const details = await response.json();
      const lat = details.location.lat;
      const lng = details.location.lng;
      updateDetails(details);
      updateMap(lat, lng);
    } catch (e) {
      alert("invalid domain/ip address");
      console.log(e);
    }
  })();
});

function getUserIPDetails(event) {
  fetch("https://geo.ipify.org/api/v1?apiKey=at_JonIcgFaDGUQS7HPF6DcvJM3Bg3RK")
    .then((response) => response.json())
    .then((details) => {
      const lat = details.location.lat;
      const lng = details.location.lng;
      updateDetails(details);
      updateMap(lat, lng);
    });
}

function updateDetails(details) {
  ipAddress.textContent = details.ip;
  address.textContent = `${details.location.city}, ${details.location.country} ${details.location.postalCode}`;
  timezone.textContent = "UTC" + details.location.timezone;
  isp.textContent = details.isp;
}

function updateMap(lat, lng) {
  map.setView([lat, lng], 15);
  L.marker([lat, lng], { icon: icon }).addTo(map);
}
