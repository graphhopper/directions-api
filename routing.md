## Routing API

### Endpoint

The endpoint is `https://graphhopper.com/api/[version]/route`

You get an example response via:

`curl "https://graphhopper.com/api/1/route?point=51.131%2C12.414&point=48.224%2C3.867&vehicle=car&locale=de&key=[YOUR_KEY]"`

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
point       | -       | Specifiy multiple points for which the route should be calculated. The order "latitude,longitude" is important. Specify at least two points. The maximum number depends on the selected package.
locale      | en      | The locale of the resulting turn instructions. E.g. `pt_PT` for Portuguese or `de` for German.
optimize    | `false` | If `false` the order of the locations will be identical to the order of the point parameters. If you have more than 2 points you can set this optimize parameter to `true` and the points will be sorted regarding the minimum overall time - e.g. suiteable for sightseeing tours or salesman. Keep in mind that the location limit of the [Route Optimization API](./route-optimization.md) applies and the [credit costs](FAQ.md#what-is-one-credit) are higher! Note to all customers with a self-hosted license: this parameter is only available if your package includes the Route Optimization API.
instructions| `true`  | If instruction should be calculated and returned
vehicle     | car     | The vehicle for which the route should be calculated. Other vehicle profiles are listed [here](./supported-vehicle-profiles.md) for the details.
elevation   | `false` | If `true` a third dimension - the elevation - is included in the polyline or in the GeoJson. IMPORTANT: If enabled you have to use a modified version of the decoding method or set points_encoded to `false`. See the points_encoded attribute for more details. Additionally a request can fail if the vehicle does not support elevation. See the features object for every vehicle.
points_encoded     | true    | If `false` the coordinates in `point` and `snapped_waypoints` are returned as array using the order [lon,lat,elevation] for every point. If `true` the coordinates will be encoded as string leading to less bandwith usage. You'll need a special handling for the decoding of this string on the client-side. We provide open source code code in Java and JavaScript, see the clients section. It is especially important to use our official client or code if you set `elevation=true`!
calc_points    | `true`  | If the points for the route should be calculated at all printing out only distance and time.
debug          | `false` | If true, the output will be formated.
type           | `json`  | Specifies the resulting format of the route, for `json` the content type will be application/json. Or use `gpx`, the content type will be application/gpx+xml, see below for more parameters.
point_hint     | -       | Optional parameter. Specifies a hint for each `point` parameter to prefer a certain street for the closest location lookup. E.g. if there is an address or house with two or more neighboring streets you can control for which street the closest location is looked up.

#### GPX

Create a GPX output via `type=gpx` and use the following additional parameters

Parameter     | Default | Description
:-------------|:--------|:-----------
gpx.track     |	`true`  | Include the `<trk>` tag in gpx result
gpx.route     | `true`  | Include the `<rte>` tag in gpx result
gpx.waypoints | `false` | Include the `<wpt>` tag in gpx result

#### Flexible

Enable turn restrictions and unlock further flexible features via `ch.disable=true`.

Please note that changing the algorithm costs more than one credit, see [the FAQ](./FAQ.md) for more details.

Furthermore `optimize=true` is not yet possible in combination with `ch.disable=true`

Parameter        | Default    | Description
:----------------|:-----------|:-----------
ch.disable       |`false`      | Always use `ch.disable=true` in combination with one or more parameters of this table
weighting        |`fastest`    | Which kind of 'best' route calculation you need. Other options are `shortest` (e.g. for `vehicle=foot` or `bike`) and `short_fastest` if not only time but also distance is expensive.
heading          | NaN         | Favour a heading direction for a certain point. Specify either one heading for the start point or as many as there are points. In this case headings are associated by their order to the specific points. Headings are given as north based clockwise angle between 0 and 360 degree.
heading_penalty  | 120         | Penalty for omitting a specified heading. The penalty corresponds to the accepted time delay in seconds in comparison to the route without a heading.
pass_through     |`false`      | If `true` u-turns are avoided at via-points with regard to the `heading_penalty`.
block_area       | -           | Block road access via a point with the format `latitude,longitude` or an area defined by a circle `lat,lon,radius` or a rectangle `lat1,lon1,lat2,lon2`. Separate multiple areas with a semicolon `;`.
round_trip.distance                 | 10000 | If `algorithm=round_trip` this parameter configures approximative length of the resulting round trip
round_trip.seed                     | 0     | If `algorithm=round_trip` this parameter introduces randomness if e.g. the first try wasn't good
alternative_route.max_paths         | 2     | If `algorithm=alternative_route` this parameter sets the number of maximum paths which should be calculated. Increasing can lead to worse alternatives.
alternative_route.max_weight_factor | 1.4   | If `algorithm=alternative_route` this parameter sets the factor by which the alternatives routes can be longer than the optimal route. Increasing can lead to worse alternatives.
alternative_route.max_share_factor  | 0.6   | If `algorithm=alternative_route` this parameter specifies how much alternatives routes can have maximum in common with the optimal route. Increasing can lead to worse alternatives.

### Output 

The JSON result contains the following structure:

JSON path/attribute        | Description
:--------------------------|:------------
paths                      | An array of possible paths
paths[0].distance          | The total distance of the route, in meter
paths[0].time              | The total time of the route, in milliseconds (ms)
paths[0].ascend            | The total ascend (uphill) of the route, in meter
paths[0].descend 	         | The total descend (downhill) of the route, in meter
paths[0].points            | This value contains the coordinates of the path. If `points_encoded=true` or no `points_encoded` specified an encoded string will be returned, otherwise an array with order [lon,lat,elevation] is returned. See the parameter `points_encoded` for more information.
paths[0].points_encoded    | Is `true` if the points are encoded. Is `false` then paths[0].points contains the geo json of the path, which is easier to handle but consumes more bandwidth compared to the encoded version
paths[0].bbox              | The bounding box of the route, format: <br> minLon, minLat, maxLon, maxLat
paths[0].snapped_waypoints | This value contains the snapped input points. If `points_encoded=true` or no `points_encoded` parameter was specified then an encoded string will be returned, otherwise an array with order [lon,lat,elevation] is returned. See the parameter `points_encoded` for more information.
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
