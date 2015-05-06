[Back to overview](./README.md#tour-optimization-api)

## Tour Optimization API

The Tour Optimization API is used to solve the traveling salesman or vehicle routing problem. 
For example a pizza delivery service will benefit from the API to optimize the order of the requested delivery points, 
include the available vehicles, driver skills, time windows and more. 
Also a tourism application for the shortest sightseeing tours is a possible use case.

### Clients

 * [JavaScript](https://github.com/graphhopper/directions-api-js-client/)
 * [Java](https://github.com/karussell/directions-api-vrp-java-client/)
  
Other clients can be relative easily created via [swagger-codegen](https://github.com/swagger-api/swagger-codegen) and the swagger specification for the Tour Optimization API which is located [here](https://graphhopper.com/api/1/vrp/swagger.json). Please [let us know](https://graphhopper.com/#contact) which further programming language or environment you need for your integration!

### Examples

The fastest way to understand what it does it by
 * [trying out](https://graphhopper.com/api/1/examples/#optimization) live examples
 * looking into [the JSON from the examples](https://github.com/graphhopper/directions-api-js-client/tree/master/tour-optimization-examples).

## JSON Input

The general input structure is

```json
{
  "vehicles": [..],
  "vehicle_types": [..],
  "services": [..],
  "shipments": [..]
```

Learn more about it in the [live API docs](https://graphhopper.com/api/1/vrp/documentation/).

### Vehicle

Define one or more vehicle. The start_address is optional.

Example:

```json
{
    "vehicle_id": "vehicle2",
    "start_address": {
        "location_id": "v2_erfurt",
        "lon": 11.028771,
        "lat": 50.977723
    },
    "type_id": "vehicle_type_1"
}
```

### Vehicle Type

Define your vehicle type. The capacity is optional and is used to define how many items fit into the vehicle. Use car, bike or foot as profile.

Example:

```json
{
    "type_id": "vehicle_type_1",
    "profile": "car",
    "capacity": [5],
    "distance_dependent_costs": 0.0004,
    "time_dependent_costs": 0.008
}
```

### Services or Shipments

Define your service or shipment

### Time Windows

### Driver skills
