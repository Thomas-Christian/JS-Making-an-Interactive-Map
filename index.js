//get user coordinates
async function getUserLocation() {   
    const getLocation = await new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	});
    return [getLocation.coords.latitude, getLocation.coords.longitude]
}

//build map 
async function buildMap(userLocation) {

    var userIcon = L.icon({
        iconUrl: './assets/6888639.png',
        iconSize: [95, 95],
        popupAnchor:[0, -20]
    })

    var userMap = L.map('map', {
        center: userLocation,
        zoom: 13
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
    }).addTo(userMap);

    var userMarker = L.marker(userLocation, {icon: userIcon}).addTo(userMap);

    userMarker.bindPopup("User Location").openPopup();

}

// get businesses 
async function getBusinesses(userSelection, userLocation) {
    const options = {
		method: 'GET',
		headers: {
		Accept: 'application/json',
		Authorization: 'fsq3ATzZbmcGhdeFafr73wZcnJ+LlN6bK+4dh19a7ClS4u8='
		}
    }
    let response = await fetch(`https://api.foursquare.com/v3/places/search?query=${userSelection}&ll=${userLocation[0]}%2C${userLocation[1]}`, options)
    let data = await response.text()
    let parsedData = JSON.parse(data)
    let businesses = parsedData.results

}


document.getElementById('submit').addEventListener('click', async (event) => {
	event.preventDefault()
	let userSelection = document.getElementById('selection').value
    getBusinesses()
})










window.onload = async () => {
    const myUserLocation = await getUserLocation();
    let userLocation = myUserLocation;
    await buildMap(userLocation);
}
