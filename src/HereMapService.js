import { MapServiceContract } from "./MapServiceContract";
import H from '@here/maps-api-for-javascript';
class HereMapService extends MapServiceContract {
  platform
  map
  marker
  latitude
  longitude

  constructor(key, refToLatitude, refToLongitude) {
    super();
    this.platform = new H.service.Platform({
      apikey: key,
    });
    this.latitude = refToLatitude;
    this.longitude = refToLongitude;
  }

  async initializeMap(domElement, center) {
    var maptypes = this.platform.createDefaultLayers();

    this.map = new H.Map(domElement, maptypes.vector.normal.map, {
      zoom: 10,
      center: center,
    });

    addEventListener("resize", () => this.map.getViewPort().resize());

    this.behavior = new H.mapevents.Behavior(
      new H.mapevents.MapEvents(this.map)
    );

    H.ui.UI.createDefault(this.map, maptypes, `es-ES`);
  }

  async placeMarker(coordinates) {
    this.marker = new H.map.Marker(coordinates, {
      volatility: true,
    });
    this.marker.draggable = true;
    //this.marker.label = location.address.label;
    this.map.addObject(this.marker);

    this.map.addEventListener(
      "dragstart",
      (ev) => {
        const target = ev.target;
        const pointer = ev.currentPointer;
        if (target instanceof H.map.Marker) {
          this.behavior.disable(H.mapevents.Behavior.Feature.PANNING);

          /* var targetPosition = this.map.geoToScreen(target.getGeometry());
          target["offset"] = new H.math.Point(
            pointer.viewportX - targetPosition.x,
            pointer.viewportY - targetPosition.y
          ); */
        }
      },
      false
    );
    this.map.addEventListener(
      "drag",
      (ev) => {
        const target = ev.target;
        const pointer = ev.currentPointer;
        if (target instanceof H.map.Marker) {
          target.setGeometry(
            this.map.screenToGeo(
              pointer.viewportX - target["offset"].x,
              pointer.viewportY - target["offset"].y
            )
          );
        }
      },
      false
    );
    this.map.addEventListener(
      "dragend",
      (ev) => {
        const target = ev.target;
        if (target instanceof H.map.Marker) {
          this.behavior.enable(H.mapevents.Behavior.Feature.PANNING);
          const coords = target.getGeometry();

          this.latitude.value = coords.lat
          this.longitude.value = coords.lng
        }
      },
      false
    );

    this.map.addEventListener('tap', (event) => {
      var coord = this.map.screenToGeo(event.currentPointer.viewportX, event.currentPointer.viewportY);
      this.marker.setGeometry(coord);
      this.latitude.value = coord.lat
      this.longitude.value = coord.lng
    });
  }

  moveMarker(lat, lng) {
    this.latitude.value = lat;
    this.longitude.value = lng;

    this.marker.setGeometry(
      {lat: lat, lng: lng}
    );
    window.map = this.map
    this.map.setCenter({lng, lat});
    this.map.setZoom(17);
  }

  setRefToLatitude(newRefToLatitude){
    this.latitude = newRefToLatitude
  }
  setRefToLongitude(newRefToLongitud){
    this.longitude = newRefToLongitud
  }
}

export default HereMapService;
