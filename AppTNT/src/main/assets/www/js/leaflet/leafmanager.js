function onBodyLoad() {
	findPetrolStationClicked();
}

// global variables
var marker;
var marker1;

function onGeolocationError(e) {
	alert("Geolocation error: #" + e.code + "\n" + e.message);
	lc.innerHTML = "<b>Currently no Geolocation information is available"
			+ " for your device, Try again later!</b>";
}

function initmap() {
	map = new L.Map('map');
	var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmAttrib = 'Map data de OpenStreetMap';
	var osm = new L.TileLayer(osmUrl, {
		minZoom : 2,
		maxZoom : 18,
		attribution : osmAttrib
	});
	map.setView(new L.LatLng(53.34, -6.26), 6);
	map.addLayer(osm);
}

function findMeClicked() {
		var locOptions = {
			timeout : 20000,
			enableHighAccuracy : true
		};
		// get the current location
		navigator.geolocation.getCurrentPosition(onGeolocationSuccessMapFindMe,
				onGeolocationError, locOptions);
}

function onGeolocationSuccessMapFindMe(loc) {
	var pointA = new L.LatLng(loc.coords.latitude, loc.coords.longitude);
	if (marker != null) {
		map.removeLayer(marker);
	}
	map.setView(pointA, 18);
	marker = L.marker([ loc.coords.latitude, loc.coords.longitude ]);
	marker.bindPopup("<b>You're here!</b>").openPopup();
	map.addLayer(marker);
}

function findPetrolStationClicked() {

	var int = 3;
	var tab = new Array;

	tab[0] = new L.LatLng(53.333774, -6.246557, 17);
	tab[1] = new L.LatLng(53.3120661, -6.2016933, 21);
	tab[2] = new L.LatLng(53.3295964, -6.3978179, 21);

	for (var i = 0; i < int; i++) {
		marker1 = L.marker([ tab[i].lat, tab[i].lng ]);
		marker1.bindPopup("<b>Petrol Station</b>").openPopup();
		map.addLayer(marker1);
	}
		var locOptions = {
			timeout : 20000,
			enableHighAccuracy : true
		};
		// get the current location
		navigator.geolocation.getCurrentPosition(
				onGeolocationSuccessMapFindPetrolStation, onGeolocationError,
				locOptions);
}

function onGeolocationSuccessMapFindPetrolStation(loc) {
	var pointA = new L.LatLng(loc.coords.latitude, loc.coords.longitude);
	if (marker != null) {
		map.removeLayer(marker);
	}
	map.setView(pointA, 14);
	marker = L.marker([ loc.coords.latitude, loc.coords.longitude ]);
	marker.bindPopup("<b>You're here!</b>").openPopup();
	map.addLayer(marker);


}
