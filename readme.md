# MapHub

MapHub es un libreria que te permite interactuar fácilmente con diversos proveedores de mapas

Actualmente tiene integracion con:
- [Leaflet (OpenStreetMap)](https://leafletjs.com/reference.html)
- [Google maps](https://developers.google.com/maps/documentation/javascript)
- [radar](https://radar.com/documentation/maps/maps)
- [map box](https://docs.mapbox.com/mapbox-gl-js/guides/install/)
- [here maps](https://www.here.com/docs/bundle/maps-api-for-javascript-developer-guide/page/topics/get-started-bundling.html)

## Instalación
### Antes de instalar
Para usar **HERE Maps** primero se deben realizar ciertos ajustes al proyecto:

Agregar configuración para el repositorio público de HERE Maps API for JavaScript con npm

```sh
npm config set @here:registry https://repo.platform.here.com/artifactory/api/npm/maps-api-for-javascript/
```
una vez agregado el repositorio público se detallan casos específicos:
#### Rollup
1. Agrega las dependencias:
    ```sh
    npm install rollup @rollup/plugin-node-resolve --save-dev
    ```
2. Crea el archivo de configuración `rollup.config.js` en el directorio del proyecto con lo siguiente:
    ```js
    import resolve from '@rollup/plugin-node-resolve';
    
    export default {
        input: 'index.js',
        output: {
            dir: './out/',
            format: 'iife'
        },
        // Desactiva el warning "Use of Eval"
        // La API de HERE Maps para JavaScript usa 'eval' para evaluar
        // functiones de filtro en la configuracion YAML para los Tiles
        onwarn: function (message) {
            if (/mapsjs.bundle.js/.test(message) && /Use of eval/.test(message)) return;
            console.error(message);
        },
        plugins: [resolve()]
    }
    ```
    La configuración anterior define la fuente de entrada y el directorio y formato de salida para el script empaquetado.
3. Rollup se instaló localmente; actualiza la sección de scripts del package.json añadiendo el atributo bundle:
    ```json
    "bundle": "rollup --config rollup.config.js"
    ```
#### Webpack
1. Agrega dependencias de desarrollo a Webpack
    ```
    npm install webpack webpack-cli --save-dev
    ```
2. Crea un archivo de configuración de Webpack en el directorio raíz del proyecto con el siguiente contenido:
    ```
    const path = require('path');
    const TerserPlugin = require('terser-webpack-plugin');

    module.exports = {
        node: { global: false },
        mode: 'production',
        entry: {
            index: './index.js'
        },
        output: {
            publicPath: './out/',
            path: path.resolve(__dirname, 'out'),
            filename: '[name].js',
            chunkFilename: '[name].bundle.js'
        },
        optimization: {
            minimizer: [new TerserPlugin({
            chunkFilter: (chunk) => {
                // Excluye el chunk mapsjs de la minificación ya que ya está minificado
                if (/mapsjs/.test(chunk.name)) return false;
                return true;
            }
            })],
        }
    };
    ```
    En la configuración anterior, el archivo mapsjs.bundle.js está excluido explícitamente del proceso de minificación. Esto es importante para evitar efectos adversos de la doble minificación. El módulo de entrada carga de manera diferida la API de HERE Maps para JavaScript para aprovechar la división de código de Webpack.

3. Con la instalación local de Webpack, actualiza la sección de scripts de package.json agregando el objetivo de bundle:
    ```
    "bundle": "webpack"
    ```
### Instalar la libreria
usando npm:
```sh
npm install -S https://github.com/ImprovingLaborCourts/mapHub
```
usando yarn
```sh
npm add -S https://github.com/ImprovingLaborCourts/mapHub
```
## Uso
1. Importar la liberia
```js
import { createMapService } from '@improvingLaborCourts/mapHub'
```
2. Crear un servicio de mapa con el tipo y la key
```js
service = createMapService(
    'hereMap', //'openStreetMap' || 'googleMap' || 'radarMap' || 'mapBox'
     key
)
```
3. Inicializar el mapa, con el contenedor donde se renderizara y el centro del mismo
```js
service.initializeMap(
    document.getElementById('mapa'), //this.$refs.mapa || mapa.value
    { lng: -102.552784, lat: 23.634501 }
)
```
4. Colocar el marcador, esto también habilita los eventos relacionados con el marcador
```js
service.placeMarker({ lng: -102.552784, lat: 23.634501 })
```