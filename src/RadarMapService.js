import { MapServiceContract } from "./MapServiceContract";
import Radar from "radar-sdk-js";
import 'radar-sdk-js/dist/radar.css';
class RadarMapService extends MapServiceContract {

  map
  marker
  latitude
  longitude
  constructor(key, refToLatitude, refToLongitude) {
    super()
    Radar.initialize(key)

    this.latitude = refToLatitude
    this.longitude = refToLongitude
  }

  async initializeMap(domElement, center) {
    this.map = new Radar.ui.map({
      container: domElement,
      style: 'radar-default-v1',
      center: [center.lng, center.lat],
      zoom: 13,
    });
  }

  async placeMarker(coordinates) {
    this.marker = Radar.ui.marker({})
      .setLngLat([coordinates.lng, coordinates.lat])
      .setDraggable(true)
      .addTo(this.map);
    this.latitude.value = coordinates.lat
    this.longitude.value = coordinates.lng
    this.map.on('click', (event) => {
      this.marker.setLngLat(event.lngLat);
      this.latitude.value = event.lngLat.lat
      this.longitude.value = event.lngLat.lng
    });
    this.marker.on("dragend", (event) => {
      this.latitude.value = event.target._lngLat.lat
      this.longitude.value = event.target._lngLat.lng
    });
  }

  moveMarker(lat, lng) {
    this.latitude.value = lat
    this.longitude.value = lng

    this.marker.setLngLat([lng, lat]);

    this.map.setCenter([lng, lat])
    this.map.setZoom(17)
  }

  setRefToLatitude(newRefToLatitude){
    this.latitude = newRefToLatitude
  }
  setRefToLongitude(newRefToLongitud){
    this.longitude = newRefToLongitud
  }
}

export default RadarMapService
