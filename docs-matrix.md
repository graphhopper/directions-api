## Matrix API Docs

The Matrix API calculates the well known distance-matrix for a set of points, i.e. it calculates all the distances between every point combination. But we do not stop there, we also offer a time-, weight- and route-matrix. The weight-matrix can be used as raw input for e.g. a vehicle routing problem ([VRP](http://en.wikipedia.org/wiki/Vehicle_routing_problem)) and is more precise than a time- or distance-matrix. E.g. for bike routes the actual weight of a route (e.g. the "beauty") is what you want and not always the taken time or distance. Also the weight is currently faster to calculate. (For cars the weight-matrix is currently identical to the time-matrix)

A simple illustration for a 3x3 matrix with identical points:

       |Point1   | Point2 | Point3
:------|:--------|:--------|:--------
Point1 |0        |1->2     | 1->3
Point2 |2->1     |0        | 2->3
Point3 |3->1     |3->2     | 0

A simple illustration for a 1x3 matrix with different start- and end-points:

       |Point1   | Point2 | Point3
:------|:--------|:--------|:--------
PointA |A->1     |A->2     |A->3


For every route 1->2, 1-3, ... or A->1,A->2,A->3 you can return only the weight, the time, the distance and even the full route. The matrix returning full routes is only suitable for a smaller matrix (or with a big matrix and a filter). This 'route-matrix' is useful if you know in advance that you need all the full routes and want to avoid a separate query to the Routing API. Useful e.g. for letting the user choosing from several routes. Routes itself can have several other parameters which are documented in our [Routing API documentation](https://github.com/graphhopper/web-api/blob/master/docs-routing.md).

## Parameters

All official parameters are shown in the following table

Parameter   | Default | Description
:-----------|:--------|:-----------
point       | -       | Specifiy multiple points for which the weight-, route-, time- or distance-matrix should be calculated. The order is important. Specify at least three points.
from_point  | -       | The starting points for the routes. E.g. if you want to calculate two routes A1-B1, A2-B1, then you have two `from_point` parameters. Specify at least one.
to_point    | -       | The destination points for the routes. Specify at least one.
out_array   | weights   | Specifies which arrays should be included in the response. Specify one or more of the following options 'weights', 'times', 'distances', 'paths'. To specify more than one array use e.g. `out_array=times&out_array=distances`
vehicle     | car     | The vehicle for which the route should be calculated. Other vehicles are foot and bike
debug              | false   | If true, the output will be formated.

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
