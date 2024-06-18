export class MapServiceContract {

  /**
   * Inizializa el randerizado del mapa con el cetro proporcionado
   *
   * @param {domElement} container - Elemento del dom donde se mostrara el mapa
   * @param {Object} center - Un objeto con las propiedades `lat` (latitude) y `lng` (longitude) que representan las coordenadas geográficas del centro del mapa.
   * @return void
   * @throws {Error} Si el método no ha sido implementado por la clase que extiende este contrato.
   */
  initializeMap(container, center) {
    throw new Error('initializeMap() debe ser implementado en la clase que suscribe este contrato');
  }

  /**
   * Coloca un marcador en el mapa en las coordenadas especificadas.
   *
   * @param {Object} coordinates - Un objeto con las propiedades `latitude` y `longitude` que representan las coordenadas geográficas donde se desea colocar el marcador.
   * @throws {Error} Si el método no ha sido implementado por la clase que extiende este contrato.
   */
  placeMarker(coordinates) {
    throw new Error('placeMarker() debe ser implementado en la clase que suscribe este contrato');
  }

  /**
   * Mueve el marcador existente en el mapa a las nuevas coordenadas especificadas.
   *
   * @returns {Object} coordinates - Un objeto con las propiedades `latitude` y `longitude` que representan las nuevas coordenadas geográficas a las que el usuario movió el marcador.
   * @throws {Error} Si el método no ha sido implementado por la clase que extiende este contrato.
   */
  moveMarker() {
    throw new Error('moveMarker() debe ser implementado en la clase que suscribe este contrato');
  }
}
