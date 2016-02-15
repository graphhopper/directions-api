## Isochrone API

*Alpha status notice*: Currently this API is available only for selected developers and the underlying API is subject to change. Watch the progress [here](https://github.com/graphhopper/directions-api/issues/4) and [ask us](https://graphhopper.com/#contact) to take part.

### Endpoint

The endpoint is `https://graphhopper.com/api/[version]/isochrone`

You get an example response via:

`curl "https://graphhopper.com/api/1/isochrone?point=51.131108%2C12.414551&key=[YOUR_KEY]"`

Where you need to replace the key with your own

### Introduction

Calculating an isochrone of a coordinate (`latitude,longitude`) means to calculate
"a line connecting points at which a vehicle arrives at the same time", 
see [Wikipedia](http://en.wikipedia.org/wiki/Isochrone_map).

### API Clients and Examples

See the [clients](./index.md) section in the main document.

### Parameters

All official parameters are shown in the following table

Parameter   | Default | Description
:-----------|:--------|:-----------
point       | -       | Specify the start coordinate
limit       | 600     | Specify which time the vehicle should travel. In seconds. The maximum depends on the subscribed package.
vehicle     | car     | Other possible vehicles are: bike, car, foot and [more](./supported-vehicle-profiles.md)
buckets     | 1       | For how many sub intervals an additional polygon should be calculated.
type        | json    | Specifies the resulting format of the route, for json the content type will be application/json. Or use `jsonp`, additionally you'll need to provide the callback function via the `callback` parameter. The content type will be application/javascript
debug       | `false` | If `true`, the output will be formated.

## Example output for the case type=json

```json
{
  "polygons" : [ {
    "properties" : {
      "bucket" : 0
    },
    "type" : "Feature",
    "geometry" : {
      "type" : "Polygon",
      "coordinates" : [ [ 13.351851, 52.513450], [ 13.350402, 52.516949], [ 13.352598, 52.522252], ... ]
    }
  }, {...}]
}
```


The JSON result contains the following structure:

JSON path/attribute | Description
:-------------------|:------------
polygons             | The list of polygons
polygons[0]          | One polygon in [GeoJson format](http://en.wikipedia.org/wiki/GeoJSON) can be directly used e.g. in JavaScript framework Leaflet via `L.geoJson(json.polygons).addTo(map)`
polygons[n - 1]      | The number of polygon is identical to the specified buckets in the query. Every polygon contains the bucket number in the properties section of the GeoJson.

