## Isochrone API

*Alpha status notice*: Currently this API is available only for selected developers and the underlying API is subject to change. Watch the progress [here](https://github.com/graphhopper/directions-api/issues/4) and [ask us](https://graphhopper.com/#contact) to take part.

Calculating an isochrone of a coordinate (`latitude,longitude`) means to calculate
"a line connecting points at which a vehicle arrives at the same time", 
see [Wikipedia](http://en.wikipedia.org/wiki/Isochrone_map).

In our case the line is a polygon, the vehicle and time is configurable.

The URL path to obtain the coordinate  is `/isochrone`

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


## jQuery/Leaflet Example

```javascript
function getReach(lat, lng) {
    var buckets = 5;
    var timeLimitInSeconds = 20 * 60;
    var vehicle = "car";
    var url = "http://graphhopper.com/api/1/isochrone?"
            + "point=" + lat + "," + lng
            + "&limit=" + timeLimitInSeconds
            + "&vehicle=" + vehicle
            + "&buckets=" + buckets            
            + "&key=" + your_key;

    return $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        timeout: 5000
    }).fail(function(err) {
        console.log(err);
    }).pipe(function(json) {
        if (reachLayer)
            reachLayer.clearLayers();

        reachLayer = L.geoJson(json.polygons, {
            style: function(feature) {
                var num = feature.properties.bucket;
                var color = (num % 2 === 0) ? "#00cc33" : "blue";
                return {color: color, "weight": num + 2, "opacity": 0.6};
            }
        });
        map.addLayer(reachLayer);
    });
}
```
