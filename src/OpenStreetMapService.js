import { MapServiceContract } from './MapServiceContract.js';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";

class OpenStreetMapServiceContract extends MapServiceContract {

  map
  marker
  latitude
  longitude

  constructor(refToLatitude, refToLongitude) {
    super()
    this.latitude = refToLatitude
    this.longitude = refToLongitude
  }

  initializeMap(container, center) {
    if(this.map == null){
      try{
        this.map = L.map(container, {
          scrollWheelZoom: false,
          center: [center.lat, center.lng],
          zoom: 10
        })
        // Agrega una capa de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
        }).addTo(this.map);
      } catch(e){
        console.log(e)
      }
    }
  }

  placeMarker(coordinates) {
    if(this.marker == null){
      try{
        this.marker = L.marker(
          [coordinates.lat, coordinates.lng],
          {
            draggable: true,
            icon: new L.icon({
              iconUrl: 'https://siedel.lxl.mx/marker-icon.png',
              shadowUrl: 'https://siedel.lxl.mx/marker-shadow.png',
              iconSize: [25, 41],
              iconShadowSize: [41, 41],
              iconAnchor: [15, 41],
              shadowAnchor: [15, 41]
            })
          }
        ).addTo(this.map);
        this.marker.on("dragend", (event) => {
          this.latitude.value = event.target._latlng.lat
          this.longitude.value = event.target._latlng.lng
        });
        this.map.on('click', (event) => {
          this.latitude.value = event.latlng.lat
          this.longitude.value = event.latlng.lng
          this.marker.setLatLng(event.latlng)
        })
      } catch(e){}
    }

    this.map.setView([coordinates.lat, coordinates.lng], 16)
  }

  moveMarker(lat, lng) {
    this.latitude.value = lat
    this.longitude.value = lng
    this.marker.setLatLng([lat, lng])
    this.map.setView([lat, lng], 16)
  }

  setRefToLatitude(newRefToLatitude){
    this.latitude = newRefToLatitude
  }
  setRefToLongitude(newRefToLongitud){
    this.longitude = newRefToLongitud
  }
}

export default OpenStreetMapServiceContract
