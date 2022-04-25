// https://leafletjs.com/
// https://geo.ipify.org/

const button = document.querySelector(".input-button");
const input = document.querySelector(".input-text");
const ipAddress = document.querySelector("#ipAddress");
const address = document.querySelector("#location");
const timezone = document.querySelector("#timezone");
const isp = document.querySelector("#isp");

let map = L.map("map", { zoomControl: false });
let icon = L.icon({
  iconUrl: "./images/icon-location.svg",

  iconSize: [46, 55], // size of the icon
  // shadowSize:   [50, 64], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  // shadowAnchor: [4, 62],  // the same for the shadow
  // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoiZHViZXlkaXZ5YW5rIiwiYSI6ImNsMmQ0YmV2ZzA1azgzY284M2hpaTJ4Z2QifQ.WyherYDf5o0hCU077Zn6DQ",
  }
).addTo(map);

window.addEventListener("load", () => {
  fetch("https://geo.ipify.org/api/v1?apiKey=at_iNxW19FkpU4or6bkRwz8J4PkUmIjG")
    .then((response) => response.json())
    .then((details) => {
      updateDetails(details);

      const lat = details.location.lat;
      const lng = details.location.lng;
      updateMap(lat, lng);
      // map.setView([lat, lng], 13);
      // L.marker([lat, lng], { icon: icon }).addTo(map);
    });
});

button.addEventListener("click", () => {
  const userInput = input.value;
  const getIPDetails = `https://geo.ipify.org/api/v1/?apiKey=at_JonIcgFaDGUQS7HPF6DcvJM3Bg3RK&ipAddress=${userInput}&domain=${userInput}`;

  (async function getIpDetails() {
    try {
      const response = await fetch(getIPDetails);
      const details = await response.json();
      updateDetails(details);
      const lat = details.location.lat;
      const lng = details.location.lng;
      updateMap(lat, lng);
    } catch (e) {
      alert("invalid domain/ip address");
      console.log(e);
    }

    // map.setView([lat, lng], 13);
    // L.marker([lat, lng], { icon: icon }).addTo(map);
  })();
});

function updateDetails(details) {
  ipAddress.textContent = details.ip;
  address.textContent = `${details.location.city}, ${details.location.region}, ${details.location.country} ${details.location.postalCode}`;
  timezone.textContent = "UTC" + details.location.timezone;
  isp.textContent = details.isp;
}

function updateMap(lat, lng) {
  map.setView([lat, lng], 13);
  L.marker([lat, lng], { icon: icon }).addTo(map);
}
