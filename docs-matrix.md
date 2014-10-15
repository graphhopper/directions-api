## Matrix API Docs

The Matrix API calculates the well known distance-matrix for a set of locations, i.e. it calculates all the distances between every location combination. But we do not stop there, we also offer a time-, weight- or route-matrix. The weight-matrix can be used as raw input for e.g. a vehicle routing problem ([VRP](http://en.wikipedia.org/wiki/Vehicle_routing_problem)) and is more precise than a time- or distance-matrix. E.g. for bike routes the actual weight of a route (e.g. the "beauty") is what you want and not always the taken time or distance. Also the weight is currently faster to calculate. (For cars the weight-matrix is currently identical to the time-matrix)

The route-matrix is only suitable for a smaller matrix or with a big matrix and a filter and gives you the complete routes to print them or let the user choose from. Routes itself can have several other parameters which are documented in our [Routing API documentation](https://github.com/graphhopper/web-api/blob/master/docs-routing.md).

## Parameters

All official parameters are shown in the following table

Parameter   | Default | Description
:-----------|:--------|:-----------
point       | -       | Specifiy multiple points for which the weight-, route-, time- or distance-matrix should be calculated. The order is important. Specify at least three points.
from_point  | -       | The starting points for the routes. E.g. if you want to calculate two routes A1-B1, A2-B1, then you have two `from_point` parameters. Specify at least one.
to_point    | -       | The destination points for the routes. Specify at least one.
out_array   | times   | Specifies which arrays should be included in the response. Specify one or more of the following options 'weights', 'times', 'distances', 'paths'. To specify more than one array use e.g. `out_array=times&out_array=distances`
vehicle     | car     | The vehicle for which the route should be calculated. Other vehicles are foot and bike
points_encoded     | true    | If `false` a GeoJson array in `point` is returned. If `true` the resulting route will be encoded leading to big bandwith reduction. You'll need a special handling for the decoding of this string on the client-side, see the Java or JavaScript code above. It is especially important to use our decoding methods if you set `elevation=true`!
debug              | false   | If true, the output will be formated.
type               | json    | Specifies the resulting format of the route, for json the content type will be application/json. Other possible format options: <br> jsonp you'll need to provide the callback function via the callback parameter. The content type will be application/javascript<br> gpx, the content type will be application/xml

## Description

If you need identical from and to points just use `points`.

## Example output for the case type=json

Keep in mind that some attributes which are not documented here can be removed in the future - you should not rely on them!

```json
TODO
```

The JSON result contains the following structure:

JSON path/attribute        | Description
:--------------------------|:------------
info.took                  | TODO


### Example output:
```json
TODO
```

JSON path/attribute | Description
:-------------------|:------------
version             | TODO

### Output if expected error(s) while routing:
```json
TODO
```


JSON path/attribute    | Description
:----------------------|:------------
info.errors            | TODO


### HTTP Error codes

HTTP error code | Reason
:---------------|:------------
500             | TODO
