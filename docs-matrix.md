[Back to overview](./README.md#matrix-api)

## Matrix API Docs

The Matrix API is part of the [GraphHopper Directions API](https://graphhopper.com/#directions-api) and with this API you can calculate many-to-many routes a lot more efficient.

## API Clients and Examples

See the [clients](./README.md) section in the main document.

### Introduction

In the [Routing API](docs-routing.md) we support multiple points, so called 'via points', which results in one route being calculated. The Matrix API results in NxM routes being calculated but is a lot faster compared to NxM single requests. The most simple example is a pizza delivery service, delivering e.g. 4 pizzas. To find the fastest tour consisting of ALL locations one needs a two step process:

 1. Find all distances (or times) between all locations using the Matrix API. For the 4 pizzas you'll need 4*4-4 routes: A-B, A-C, A-D, B-A, B-C, B-D, ... The routes A-A, B-B, C-C and D-D are 0 and therefor the "minus 4".
 2. Optimize the **order** of the locations to find the overall best tour. I.e. calculate the total time for the tour "A-B-C-D", then "A-C-B-D" and so on. This can be done with an external software or our Route Optimization API.

Some other use case scenarios for the Matrix API:

 * Logistic problems often pick up many items from and deliver them to many locations.
 * Calculating detours with many possible points in-between and selecting the best e.g. interesting for ridesharing or taxi applications. For this 1-to-many requests are necessary.
 * Finding the best tour for a tourist in the need to visit as many points of interests as possible.
 * ...

### Description

The Matrix API calculates the well known distance-matrix for a set of points, i.e. it calculates all the distances between every point combination. But we do not stop there, we also offer a time-, weight- and route-matrix. The weight-matrix can be used as raw input for e.g. a vehicle routing problem ([VRP](http://en.wikipedia.org/wiki/Vehicle_routing_problem)) and is more precise than a time- or distance-matrix. E.g. for bike routes the actual weight of a route (e.g. the "beauty") is what you want to decide if a route is 'better' and not always the taken time or distance. Also the weight alone is currently faster to calculate.

A simple illustration for a 3x3 matrix with identical from and to points:

            |to_point1|to_point2|to_point3
:-----------|:--------|:--------|:--------
from_point1 |0        |1->2     | 1->3
from_point2 |2->1     |0        | 2->3
from_point3 |3->1     |3->2     | 0

A simple illustration for a 1x3 matrix with different start- and end-points:

            |to_point1   | to_point2 | t_point3
:-----------|:-----------|:----------|:--------
from_pointA |A->1        |A->2       |A->3


For every route 1->2, 1-3, ... or A->1,A->2,A->3 you can return only the weight, the time, the distance and even the full route. The matrix returning full routes is only suitable for a smaller matrix (or with a big matrix and a filter). This 'route-matrix' is useful if you know in advance that you need all the full routes and want to avoid a separate query to the Routing API. Useful e.g. for letting the user choosing from several routes. Routes itself can have several other parameters which are documented in our [Routing API documentation](https://github.com/graphhopper/web-api/blob/master/docs-routing.md).

## Parameters

All official parameters are shown in the following table

Parameter   | Default | Description
:-----------|:--------|:-----------
point       | -       | Specifiy multiple points for which the weight-, route-, time- or distance-matrix should be calculated. In this case the starts are identical to the destinations. If there are N points, then NxN entries will be calculated. The order of the point parameter is important. Specify at least three points. Cannot be used together with `from_point` or `to_point.` Is a string with the format `latitude,longitude`.
from_point  | -       | The starting points for the routes. E.g. if you want to calculate the three routes A->1, A->2, A->3 then you have one `from_point` parameter and three `to_point` parameters. Is a string with the format `latitude,longitude`.
to_point    | -       | The destination points for the routes. Is a string with the format `latitude,longitude`.
out_array   | weights   | Specifies which arrays should be included in the response. Specify one or more of the following options 'weights', 'times', 'distances', 'paths'. To specify more than one array use e.g. `out_array=times&out_array=distances`. The units of the entries of `distances` are meters, of `times` are seconds and of `weights` is arbitrary and it can differ for different vehicles or versions of this API.
vehicle     | car     | The vehicle for which the route should be calculated. Other vehicles are foot and bike
debug       | false   | If true, the output will be formated.

## Limits and Counts

The cost for one request depends on the number of locations and is documented [here](https://github.com/graphhopper/directions-api/blob/master/FAQ.md).

One request should not exceed the Matrix API location limit depending on the package, see the pricing in our dashboard. If you include out_array=paths the Matrix API location limit is currently 10 regardless of the package.

## Matrix API

Keep in mind that some attributes which are not documented here can be removed in the future - you should not rely on them! In the following example 4 points were specified and `out_array=distances&out_array=times&out_array=weights&debug=true`:

```json
{
  "weights" : [ [ 0.0, 449.753, 298.715, 664.113 ], [ 447.935, 0.0, 290.489, 543.242 ], [ 293.111, 283.954, 0.0, 452.725 ], [ 658.792, 537.769, 451.928, 0.0 ] ],
  "times" : [ [ 0, 5831, 3873, 8610 ], [ 5808, 0, 3766, 7043 ], [ 3800, 3681, 0, 5869 ], [ 8541, 6972, 5859, 0 ] ],
  "distances" : [ [ 0, 119124, 79156, 199907 ], [ 108691, 0, 63641, 142487 ], [ 79044, 71409, 0, 132215 ], [ 198852, 141322, 131953, 0 ] ],
  "info" : {
    "copyrights" : [ "GraphHopper", "OpenStreetMap contributors" ],
    "took" : 0.024203006
  }
}
```

The JSON result contains the following structure:

JSON path/attribute        | Description
:--------------------------|:------------
times                      | The time matrix for the specified points in the order [[from1->to1, from1->to2, ...], [from2->to1, from2->to2, ...], ...]. The times are in seconds.
distances                  | The distance matrix for the specified points in the same order as the time matrix. The distances are in meters.
weights                    | The weight matrix for the specified points in the same order as the time matrix. The weights for different vehicles can have a different unit but the weights array is perfectly suited as input for [Vehicle Routing Problems](http://en.wikipedia.org/wiki/Vehicle_routing_problem) as it is currently faster to calculate.
info.took                  | The taken time in seconds
info.copyrights            | Attribution according to [our documentation](https://github.com/graphhopper/web-api/#attribution) is necessary if no white-label option included.

## HTTP POST request

The GET request has an URL length limitation, which hurts for many locations per request. In those cases use a HTTP POST request with JSON data as input. The only parameter in the URL will be the key which stays in the URL. Both request scenarios are identically except that all singular parameter names are named as their plural for a POST request. For example `point=10,11&point=20,22` will be converted to the following JSON `points` array:
```json
{ "points": [[11,10], [22,20]] }
```
Note that also the order changes to `[longitude,latitude]` similar to a [GeoJson](http://geojson.org/geojson-spec.html#examples). All effected parameters are: `points`, `from_points` and `to_points`. 

Also `out_array` has to be named `out_arrays` in a POST request.

curl example with a JSON as input:
```bash
curl -X POST -H "Content-Type: application/json" "https://graphhopper.com/api/1/matrix?key=[YOUR_KEY]" -d '{"elevation":false,"out_arrays":["weights"],"from_points":[[-0.087891,51.534377],[-0.090637,51.467697],[-0.171833,51.521241],[-0.211487,51.473685]],"to_points":[[-0.087891,51.534377],[-0.090637,51.467697],[-0.171833,51.521241],[-0.211487,51.473685]],"vehicle":"car"}'
```

JSON response:
```json
{
"weights":[
    [0.0,886.302,605.321,1130.814],
    [847.615,0.0,807.13,927.05],
    [561.073,777.362,0.0,660.521],
    [1102.726,905.626,662.717,0.0]],
"info":{"took":0.056749515,"copyrights":["GraphHopper","OpenStreetMap contributors"]}
}
```

## Batch Matrix API

The Batch Matrix API allows using matrices with more locations and works asynchronously - similar to our Route Optimization API:
 * Create a HTTP POST request against `/matrix/calculate` and add the key in the URL: `/matrix/calculate?key=[YOUR_KEY]`. This will give you the `job_id` from the response json like `{ "job_id": "7ac65787-fb99-4e02-a832-2c3010c70097" }`
 * Poll via HTTP GET requests every second against `/matrix/solution/[job_id]`

Here are some full examples via curl:
```bash
$ curl -X POST -H "Content-Type: application/json" "https://graphhopper.com/api/1/matrix/calculate?key=[YOUR_KEY]" -d '{"points":[[13.29895,52.48696],[13.370876,52.489575],[13.439026,52.511206]]}'
{"job_id":"7ac65787-fb99-4e02-a832-2c3010c70097"}
```

Pick the returned `job_id` and use it in the next GET requests:
```bash
$ curl -X GET "https://graphhopper.com/api/1/matrix/solution/7ac65787-fb99-4e02-a832-2c3010c70097?key=[YOUR_KEY]"
{"status":"waiting"}
```

When the calculation is finished (`status:finished`) the JSON response will contain the full matrix JSON under `solution`:
```bash
$ curl -X GET "https://graphhopper.com/api/1/matrix/solution/7ac65787-fb99-4e02-a832-2c3010c70097?key=[YOUR_KEY]"
{"solution":{"weights":[[0.0,470.453,945.414],[503.793,0.0,580.871],[970.49,569.511,0.0]],"info":{"copyrights":["GraphHopper","OpenStreetMap contributors"]}},"status":"finished"}
```

If an error occured while calculation the JSON will contain directly the error message e.g.:
```json
{"message":"Cannot find from_points: 1","hints":[{...}]}
```

## HTTP Error codes

See more details in the [overview](README.md#http-error-codes)

