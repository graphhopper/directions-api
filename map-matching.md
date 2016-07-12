## Map Matching API

### Endpoint

The endpoint is `https://graphhopper.com/api/[version]/match`

You get an example response for a GPX via:

`curl -XPOST -H "Content-Type: application/gpx+xml" "https://graphhopper.com/api/1/match?vehicle=car&key=[YOUR_KEY]" --data @/path/to/some.gpx

### Introduction

![Map Matching Example](./img/map-matching-example.png)

The Map Matching API is part of the [GraphHopper Directions API](https://graphhopper.com/#directions-api) and 
with this API you can snap measured GPS points typically as GPX files to a digital road network to e.g. clean 
data or attach certain data to it. Read more at [Wikipedia](https://en.wikipedia.org/wiki/Map_matching).

In the example screenshot above and demo you see the Map Matching API in action where the black line is the GPS track and
the green one is matched result.

### API Clients and Examples

See the [clients](./index.md#api-clients-and-examples) section in the main document and [live examples](https://graphhopper.com/api/1/examples/#map-matching).

### Description

The Map Matching API snaps real word measurements in form of GPX tracks 
to the digital road network to clean up this data or attach data to it.

### Input format

The only support input format is currently GPX tracks (application/gpx+xml). A json format is under work.

### Parameters

All parameters are shown in the following table:

Parameter   | Default | Description
:-----------|:--------|:-----------
gps_accuracy| 50      | The precision of the GPS locations
vehicle     | car     | The vehicle for which the route should be snapped. See [here](./supported-vehicle-profiles.md) for all options.
locale      | en      | The locale of the resulting instructions
type        | json    | The output format, can be gpx or json.
debug       | false   | If true, the output will be formated.

Further parameters from the [Routing API](routing.md) do apply here too.

### Limits and Counts

The cost for one request depends on the number of GPS location and is documented [here](https://graphhopper.com/api/1/docs/FAQ/).

One request should not exceed the Map Matching API location limit depending on the package, 
see the pricing in our dashboard.

### JSON Output

Keep in mind that some attributes which are not documented here can be removed in the future - 
you should not rely on them!
The output is currently nearly identical to the [Routing API](routing.md).

## HTTP Error codes

See more details in the [overview](index.md#http-error-codes)

