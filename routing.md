## Routing API

### Endpoint

The endpoint is `https://graphhopper.com/api/[version]/route`

You get an example response via:

`curl "https://graphhopper.com/api/1/route?point=51.131108%2C12.414551&point=48.224673%2C3.867187&vehicle=car&locale=de&debug=true&points_encoded=false&key=[YOUR_KEY]"`

Where you need to replace the key with your own

### Introduction

![Routing API](./img/routing-example.png)

The Routing API is part of the [GraphHopper Directions API](https://graphhopper.com/#directions-api). Routing is the process of finding the 'best' path(s) between two or more points, where best depends on the vehicle and use case. With our API you have a fast and solid way to find this best path.

### API Clients and Examples

See the [clients](./index.md#api-clients-and-examples) section in the main document and [live examples](https://graphhopper.com/api/1/examples/#routing).

### Parameters

All official parameters are shown in the following table

Parameter   | Default | Description
:-----------|:--------|:-----------
point       | -       | Specifiy multiple points for which the route should be calculated. The order is important. Specify at least two points. The maximum number depends on the selected package.
locale      | en      | The locale of the result. E.g. `pt_PT` for Portuguese or `de` for German
optimize    | false   | If `false` the order of the locations will be identical to the order of the point parameters. If you have more than 2 points you can set this optimize parameter to `true` and the points will be sorted regarding the minimum overall time - e.g. suiteable for sightseeing tours or salesman. Keep in mind that the location limit of the [Route Optimization API](./route-optimization.md) applies and the [credit costs](FAQ.md#what-is-one-credit) are higher! Note to all customers with a self-hosted license: this parameter is only available if your package includes the Route Optimization API.
instructions| true    | If instruction should be calculated and returned
vehicle     | car     | The vehicle for which the route should be calculated. Other vehicles are foot, bike, mtb, racingbike, motorcycle, small_truck, bus and truck. See [here](./supported-vehicle-profiles.md) for the details.
elevation   | false   | If `true` a third dimension - the elevation - is included in the polyline or in the GeoJson. IMPORTANT: If enabled you have to use a modified version of the decoding method or set points_encoded to `false`. See the points_encoded attribute for more details. Additionally a request can fail if the vehicle does not support elevation. See the features object for every vehicle.
points_encoded     | true    | If `false` a GeoJson array in `point` is returned. If `true` the resulting route will be encoded leading to big bandwith reduction. You'll need a special handling for the decoding of this string on the client-side, see the Java or JavaScript code above. It is especially important to use our decoding methods if you set `elevation=true`!
calc_points        | true    | If the points for the route should be calculated at all. Sometimes only the distance and time is necessary.
debug              | false   | If true, the output will be formated.
type               | json    | Specifies the resulting format of the route, for json the content type will be application/json. Other possible format options: <br> jsonp you'll need to provide the callback function via the callback parameter. The content type will be application/javascript<br> gpx, the content type will be application/xml
min_path_precision | 1       | Not recommended to change. Increase this number if you want to further reduce bandwith.
gpx.track     |	  true  |   	Include <trk> tag in gpx result. Only applicable if type=gpx is specified.
gpx.route     | 	true 	| Include <rte> tag in gpx result. Only applicable if type=gpx is specified.
gpx.waypoints | 	false | 	Include <wpt> tag in gpx result. Only applicable if type=gpx is specified.

### Output 

The JSON result contains the following structure:

JSON path/attribute        | Description
:--------------------------|:------------
paths                      | An array of possible paths
paths[0].distance          | The overall distance of the route, in meter
paths[0].time              | The overall time of the route, in ms
paths[0].points_encoded    | Is true if the points are encoded, if not paths[0].points contains the geo json of the path (then order is lon,lat,elevation), which is easier to handle but consumes more bandwidth compared to encoded version
paths[0].bbox              | The bounding box of the route, format: <br> minLon, minLat, maxLon, maxLat
paths[0].instructions      | Contains information about the instructions for this route. The last instruction is always the Finish instruction and takes 0ms and 0meter. Keep in mind that instructions are currently under active development and can sometimes contain misleading information, so, make sure you always show an image of the map at the same time when navigating your users!
paths[0].instructions[0].text                 | A description what the user has to do in order to follow the route. The language depends on the locale parameter.
paths[0].instructions[0].distance             | The distance for this instruction, in meter
paths[0].instructions[0].time                 | The duration for this instruction, in ms
paths[0].instructions[0].interval             | An array containing the first and the last index (relative to paths[0].points) of the points for this instruction. This is useful to know for which part of the route the instructions are valid.
paths[0].instructions[0].sign                 | A number which specifies the sign to show e.g. for right turn etc <br>TURN_SHARP_LEFT = -3<br>TURN_LEFT = -2<br>TURN_SLIGHT_LEFT = -1<br>CONTINUE_ON_STREET = 0<br>TURN_SLIGHT_RIGHT = 1<br>TURN_RIGHT = 2<br>TURN_SHARP_RIGHT = 3<br>FINISH = 4<br>VIA_REACHED = 5<br>USE_ROUNDABOUT = 6
paths[0].instructions[0].exit_number          | [optional] Only available for USE_ROUNDABOUT instructions. The count of exits at which the route leaves the roundabout.
paths[0].instructions[0].turn_angle           | [optional] Only available for USE_ROUNDABOUT instructions. The radian of the route within the roundabout: 0<r<2*PI for clockwise and -2PI<r<0 for counterclockwise transit. Is null the direction of rotation is undefined.
paths[0].points_order     | This zero-based array is only returned if the `optimize` parameter is specified and contains the used order of the input `point` parameters i.e. the start, via and end points.

### Example output for the case type=json

Keep in mind that some attributes which are not documented here can be removed in the future - you should not rely on them!

```json
{
  "info": {"took": 4},
  "paths": [{
    "bbox": [
      13.362853824187303,
      52.469481955531585,
      13.385836736460217,
      52.473849308838446
    ],
    "distance": 2138.3027624572337,
    "instructions": [
      {
        "distance": 1268.519329705091,
        "interval": [
          0,
          10
        ],
        "sign": 0,
        "text": "Geradeaus auf A 100",
        "time": 65237
      },
      {
        "distance": 379.74399999999997,
        "interval": [
          10,
          11
        ],
        "sign": 0,
        "text": "Geradeaus auf Strasse",
        "time": 24855
      },
      {
        "distance": 16.451,
        "interval": [
          11,
          11
        ],
        "sign": 0,
        "text": "Geradeaus auf Tempelhofer Damm",
        "time": 1316
      },
      {
        "distance": 473.58843275214315,
        "interval": [
          11,
          12
        ],
        "sign": -2,
        "text": "Links abbiegen auf Tempelhofer Damm, B 96",
        "time": 37882
      },
      {
        "distance": 0,
        "interval": [
          12,
          12
        ],
        "sign": 4,
        "text": "Ziel erreicht!",
        "time": 0
      }
    ],
    "points": "oxg_Iy|ppAl@wCdE}LfFsN|@_Ej@eEtAaMh@sGVuDNcDb@{PFyGdAi]FoC?q@sXQ_@?",
    "points_encoded": true,
    "time": 129290
  }]
}
```

### Output for the case type=gpx

For GPX the [1.1 schema](http://www.topografix.com/gpx/1/1/) is used, with minor extensions to include turn signs.

### HTTP Error codes

See the error codes and JSON structure on the [overview page](https://graphhopper.com/api/1/docs/#http-error-codes)

### Area information

If you need to find out details about the supported features e.g. which profiles and if foot supports elevation or you need to ping the routing service then use '/api/1/route/info'


### Example output:
```json
{ "build_date":"2014-02-21T16:52",
  "bbox":[13.072624,52.333508,13.763972,52.679616],
  "version":"0.4",
  "features": { "foot" : { "elevation" : true  }, 
                "car"  : { "elevation" : false } }
}
```

JSON path/attribute | Description
:-------------------|:------------
version             | The GraphHopper version
bbox                | The maximum bounding box of the area, format: <br> minLon, minLat, maxLon, maxLat
features            | A json object per supported vehicles with name and supported features like elevation
build_date          | [optional] The GraphHopper build date
import_date         | [optional] The date time at which the OSM import was done
prepare_date        | [optional] The date time at which the preparation (contraction hierarchies) was done. If nothing was done this is empty
supported_vehicles  | [deprecated] An array of strings for all supported vehicles
