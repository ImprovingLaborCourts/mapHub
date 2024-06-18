import { MapServiceContract } from "./MapServiceContract";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

class MapBoxService extends MapServiceContract {

  map
  marker
  latitude
  longitude

  constructor(key, refToLatitude, refToLongitude) {
    super()
    mapboxgl.accessToken = key;
    this.latitude = refToLatitude
    this.longitude = refToLongitude
  }

  async initializeMap(domElement, center) {
    this.map = new mapboxgl.Map({
        container: domElement,
        center: [center.lng, center.lat],
        zoom: 9,
    });
    /* const scale = new mapboxgl.ScaleControl({
        maxWidth: 80,
        unit: 'imperial'
    });
    this.map.addControl(scale);

    scale.setUnit('metric'); */
    const nav = new mapboxgl.NavigationControl({
        // visualizePitch: true
    });
    this.map.addControl(nav, 'bottom-right');

    this.map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
    }));
  }

  async placeMarker(coordinates) {
    this.marker = new mapboxgl.Marker({
        draggable: true
    }).setLngLat([coordinates.lng, coordinates.lat])
    .addTo(this.map);
    this.latitude.value = coordinates.lat
    this.longitude.value = coordinates.lng
    this.map.on('click', (event) => {
        console.log(event)
      this.marker.setLngLat(event.lngLat);
      this.latitude.value = event.lngLat.lat
      this.longitude.value = event.lngLat.lng
    });
    this.marker.on("dragend", (event) => {
        console.log(event)
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

export default MapBoxService
