import OpenStreetMapService from './src/OpenStreetMapService';
import GoogleMapService from './src/GoogleMapService';
import RadarMapService from './src/RadarMapService';
import MapBoxService from './src/MapBoxService';
import HereMapService from './src/HereMapService';

const mapServices = {
  'openStreetMap': OpenStreetMapService,
  'googleMap': GoogleMapService,
  'radarMap': RadarMapService,
  'mapBox': MapBoxService,
  'hereMap': HereMapService
};

export const createMapService = (type, key='', refToLatitude = {}, refToLongitude = {}) => {
  if (!mapServices[type]) {
    throw new Error(`Servicio de mapa ${type} no soportado`);
  }
  return new mapServices[type](key, refToLatitude, refToLongitude);
}
