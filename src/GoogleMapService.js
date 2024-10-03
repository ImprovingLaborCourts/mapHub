import { MapServiceContract } from './MapServiceContract.js'
import { Loader } from "@googlemaps/js-api-loader";

class GoogleMapService extends MapServiceContract {

  loader;
  map;
  marker;
  latitude;
  longitude;

  constructor(key, refToLatitude, refToLongitude) {
    super()
    this.loader = new Loader({
      apiKey: key,
      version: "weekly",
    })
    this.latitude = refToLatitude
    this.longitude = refToLongitude
  }

  async initializeMap(domElement, center) {
    this.loader.load().then(async () => {
      const { Map } = await google.maps.importLibrary("maps");

      this.map = new Map( domElement, {
        center: center,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapId: 'ILCMap'
      });
    });
  }

  async placeMarker(coordinates) {
    return this.loader.load().then(async () => {
      const { LatLng } = await google.maps.importLibrary("core");
      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

      let place = new LatLng(coordinates.lat,coordinates.lng);
      if(this.marker==null){
        this.marker = new AdvancedMarkerElement({
          draggable: true
        });
        this.map.addListener('click', (event) => {
          this.marker.position = event.latLng;
          this.latitude.value = event.latLng.lat()
          this.longitude.value = event.latLng.lng()
        });
        this.marker.addListener("dragend", (event) => {
          this.latitude.value = event.latLng.lat()
          this.longitude.value = event.latLng.lng()
        });
      }

      this.marker.position = place
      this.marker.map = this.map

      this.map.setCenter(place)
      this.map.setZoom(17)
    });
  }

  moveMarker(lat, lng) {
    return this.loader.load().then(async () => {
      const { LatLng } = await google.maps.importLibrary("core");

      let place = new LatLng(lat, lng);
      this.latitude.value = lat
      this.longitude.value = lng

      this.marker.position = place;
      this.map.setCenter(place)
      this.map.setZoom(17)
    });
  }

  setRefToLatitude(newRefToLatitude){
    this.latitude = newRefToLatitude
  }
  setRefToLongitude(newRefToLongitud){
    this.longitude = newRefToLongitud
  }
}

export default GoogleMapService
