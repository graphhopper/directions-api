[Back to overview](./README.md#tour-optimization-api)

## Tour Optimization API

- [Clients](#clients)
- [Quick Start](#quick-start)
- [JSON Input](#json-input)
 - [Vehicles](#vehicles)
 - [Vehicle Types](#vehicle-types)
 - [Services or Shipments](#services-or-shipments)
- [JSON Output](#json-output)
- [Examples](#examples)
 - [Traveling Salesman](#traveling-salesman)
 - [Vehicle Routing Problem](#vehicle-routing-problem)

The Tour Optimization API can be used to solve traveling salesman or vehicle routing problems. These problems occur almost everywhere in the world 
of moving things and people. For example, every company dealing with last-mile deliveries faces a vehicle routing problem, i.e. it must find ways to
efficiently service its customers given a variety of requirements: customer requirements (e.g. time windows), 
the product's transport requirements (e.g. refrigerated, must be picked up first), driver skills, vehicles/capacities available etc..

Even these problems are relatively easy to understand, finding reasonable solutions is way more difficult. 
You need to calculate travel times and distances on large (road) networks, you need to formalize your vehicle routing problem and to specify
 your manifold business constraints, you need fast and efficient algorithms and quite a significant amount of computational power.
  
 This is where <b>GraphHopper Tour Optimization</b> comes into play. Just learn how to put your problem into our easy-to-understand json format, post it and <b>GraphHopper</b> will do the heavy work.
 To make it even easier for you, we provide you with the following clients.


### Clients

 * [JavaScript](https://github.com/graphhopper/directions-api-js-client/)
 * [Java](https://github.com/karussell/directions-api-vrp-java-client/)
  
Other clients can be relative easily created via [swagger-codegen](https://github.com/swagger-api/swagger-codegen) and the swagger specification for the Tour Optimization API which is located [here](https://graphhopper.com/api/1/vrp/swagger.json). Please [let us know](https://graphhopper.com/#contact) which further programming language or environment you need for your integration!

### Quick Start

The fastest way to understand the API is by looking at
 * [live examples](https://graphhopper.com/api/1/examples/#optimization)
 * [the JSON from the examples](https://github.com/graphhopper/directions-api-js-client/tree/master/tour-optimization-examples)
 * [live API docs](https://graphhopper.com/api/1/vrp/documentation/)
 * the extensive examples described below

## JSON Input

The general input structure is

```json
{
  "vehicles": [..],
  "vehicle_types": [..],
  "services": [..],
  "shipments": [..]
}
```

<table>
  <tr>
    <th>Name<br></th>
    <th>Type</th>
    <th>Required</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>vehicles<br></td>
    <td>object</td>
    <td>true<br></td>
    <td>array of the vehicles available<br></td>
  </tr>
  <tr>
    <td>vehicle_types<br></td>
    <td>object<br></td>
    <td><br></td>
    <td>array of vehicle types available<br></td>
  </tr>
  <tr>
    <td>services<br></td>
    <td>object</td>
    <td></td>
    <td>services involve one location<br></td>
  </tr>
  <tr>
    <td>shipments</td>
    <td>object</td>
    <td></td>
    <td>shipments involve two location, i.e. pickup and delivery location<br></td>
  </tr>
</table>



This specification need to be posted to:

`
"https://graphhopper.com/api/1/vrp/optimize?key=[YOUR_KEY]"
`


### Vehicles

Define one or more vehicles as described below. You can specify whether your vehicle needs to come back to its home-location or not.

If you want your vehicle to come back, specify it like this:

```json
{
    "vehicle_id": "your-vehicle-id",
    "start_address": {
        "location_id": "your-location-id",
        "lon": 11.028771,
        "lat": 50.977723
    },
    "type_id": "your-vehicle-type-id"
}
```

If you want your vehicle to end at a specified end-location which is not equal to the start-location, specify it like this:

```json
{
    "vehicle_id": "your-vehicle-id",
    "start_address": {
        "location_id": "your-start-location-id",
        "lon": 11.028771,
        "lat": 50.977723
    },
    "end_address": {
         "location_id": "your-end-location-id",
         "lon": 12.028771,
         "lat": 54.977723
    },
    "type_id": "your-vehicle-type-id"
}
```

If you want to let <b>GraphHopper</b> decide at which customer the vehicle should end, specify it like this (then the vehicle will end at one of your customer locations):

```json
{
    "vehicle_id": "your-vehicle-id",
    "start_address": {
        "location_id": "your-start-location-id",
        "lon": 11.028771,
        "lat": 50.977723
    },
    "return_to_depot": false,
    "type_id": "your-vehicle-type-id"
}
```

The ```type_id``` refers to the vehicle type of your vehicle. It is optional and only required if you need to specify your own type.

### Vehicle Types

The defaul type is 

```json
{
    "type_id": "default_type",
    "profile": "car",
    "capacity": [ 0 ]
}
```


In the vehicle type you can specify two important features of your vehicles: profile and capacity. The profile indicates whether your vehicle is actually is person moving by ```foot```, 
whether it is a ```bike``` or a vehicle that uses roads specified with ```car``` (even it does not need to be a car, but can also be a motor bike or heavy vehicle).
 The capacity indicates how much freight can be loaded into the vehicle. You can specify multiple capacity dimensions as shown below.

<!-- do you mean instead of 'to use specific roads' or possibility to pickup items? Or where is this restriction taken into account - just for the location, right? -->
If you want your vehicles to use roads with a single capacity dimension of maximum 100 units (e.g. 100 kilogram), specify it like this:

```json
{
    "type_id": "your-vehicle-type-id",
    "profile": "car",
    "capacity": [100]
}
```

If you want it to have multiple capacity dimensions, e.g. weight and volume, specify it like this:

```json
{
    "type_id": "your-vehicle-type-id",
    "profile": "car",
    "capacity": [100,1000]
}
```

### Services or Shipments

The basic difference between a Service and a Shipment is that the Service involves only one location whereas the Shipment involves two locations, i.e. a pickup and a delivery location.
A service can be specified as:

```json
{
     "id": "service-id",
     "name": "meaningful-name", 
     "address": {
       "location_id": "service-location-id",
       "lon": 9.999,
       "lat": 53.552
     },
     "duration": 3600000, 
     "size": [ 1 ], 
     "time-windows": [ 
        {
            "earliest": 0,
            "latest": 3600000
        }
     ]
}
```

A shipment can be specified as:

```json
{
    "id": "shipment-id",
    "name": "meaningful-name", 
    "pickup": {
        "address": {
            "location_id": "your-pickup-location-id",
            "lon": 12.1333333,
            "lat": 54.0833333
        },
        "duration": 1000,
        "time_windows": [ 
            {
                "earliest": 0.0,
                "latest": 1000.0
            } 
        ]
    },
    "delivery": {
        "address": {
            "location_id": "your-delivery-location-id",
            "lon": 8.3858333,
            "lat": 49.0047222
        },
        "duration": 1000,
        "time_windows": [ 
            {
                "earliest": 10000.0,
                "latest": 20000.0
            }
        ]
    },
    "size": [1] 
}
``` 

where ```name```, ```duration```, ```time_windows``` and ```size``` are optional.

Both Service and Shipment can be specified with multiple capacity dimensions as follows:

```json
"size": [1,10,150]
```

Learn more about it in the [live API docs](https://graphhopper.com/api/1/vrp/documentation/).

## JSON Output

If you post your problem, you get back a job_id such as:

```json
{ "job_id": "7ac65787-fb99-4e02-a832-2c3010c70097" }
```

With the ```job_id``` you can fetch your solution via ```"https://graphhopper.com/api/1/vrp/solution/{job_id}?key=[YOUR_KEY]``` such as
 
```
"https://graphhopper.com/api/1/vrp/solution/7ac65787-fb99-4e02-a832-2c3010c70097?key=[YOUR_KEY]"
```
 
Your job can be in three states, either your problem is still waiting in the queue then you get back this:

```json
{
  "job_id" : "7ac65787-fb99-4e02-a832-2c3010c70097",
  "status" : "waiting",
  "waiting_time_in_queue" : 1061,
  "processing_time" : 0,
  "solution" : "pending"
}
```

or your job is being processed but not yet finished then you get back this:

```json
{
  "job_id" : "7ac65787-fb99-4e02-a832-2c3010c70097",
  "status" : "processing",
  "waiting_time_in_queue" : 1061,
  "processing_time" : 50,
  "solution" : "pending"
}
```

or your job is finished and a solution is available. Then you get back this:

```json
{
  "job_id" : "7ac65787-fb99-4e02-a832-2c3010c70097",
  "status" : "finished",
  "waiting_time_in_queue" : 0,
  "processing_time" : 271,
  "solution" : {
    "costs" : 71118000,
    "distance" : 1872917,
    "time" : 71118000,
    "no_unassigned" : 0,
    "routes" : [ {
      "vehicle_id" : "my_vehicle",
      "activities" : [ {
        "type" : "start",
        "location_id" : "berlin",
        "end_time" : 0
      }, {
        "type" : "service",
        "id" : "munich",
        "location_id" : "munich",
        "arr_time" : 22066000,
        "end_time" : 22066000
      }, {
        "type" : "service",
        "id" : "frankfurt",
        "location_id" : "frankfurt",
        "arr_time" : 36986000,
        "end_time" : 36986000
      }, {
        "type" : "service",
        "id" : "cologne",
        "location_id" : "cologne",
        "arr_time" : 44195000,
        "end_time" : 44195000
      }, {
        "type" : "service",
        "id" : "hamburg",
        "location_id" : "hamburg",
        "arr_time" : 60057000,
        "end_time" : 60057000
      }, {
        "type" : "end",
        "location_id" : "berlin",
        "arr_time" : 71118000
      } ]
    } ],
    "unassigned" : {
      "services" : [ ],
      "shipments" : [ ]
    }
}
```

As you can see, you get some general indicators of your solution like ```distance``` and ```time``` which corresponds to the travelled distance and travel time,
and you get back an array of your routes with the ```vehicle_id``` and an array of ```activities``` which should be self-explanatory.
Finally, within ```unassigned``` you can find the services and shipments that could not be assigned to any route.


## Examples

### Traveling Salesman

Assume you want to find the fastest round trip through Germany's 5 biggest cities starting in Berlin:

Berlin, lon: 13.406, lat: 52.537<br>
Hamburg, lon: 9.999, lat: 53.552<br>
Munich, lon: 11.570, lat: 48.145<br>
Cologne, lon: 6.957, lat: 50.936<br>
Frankfurt, lon: 8.670, lat: 50.109<br>

First, specify your vehicle at the start location Berlin. If you do not need a special vehicle type, 
you can skip the reference to a vehicle type. This automatically triggers a default type (```profile: car```, ```capacity: [0]```).


```json
{
    "vehicles" : [
       {
         "vehicle_id": "my_vehicle",
         "start_address": {
             "location_id": "berlin",
             "lon": 13.406,
             "lat": 52.537
         }
       }
    ],
    "services" : [
       {
         "id": "hamburg",
         "name": "visit_hamburg",
         "address": {
           "location_id": "hamburg",
           "lon": 9.999,
           "lat": 53.552
         }
       },
       {
         "id": "munich",
         "name": "visit_munich",
         "address": {
           "location_id": "munich",
           "lon": 11.570,
           "lat": 48.145
         }
       },
       {
         "id": "cologne",
         "name": "visit_cologne",
         "address": {
           "location_id": "cologne",
           "lon": 6.957,
           "lat": 50.936
         }
       },
       {
         "id": "frankfurt",
         "name": "visit_frankfurt",
         "address": {
           "location_id": "frankfurt",
           "lon": 8.670,
           "lat": 50.109
         }
       }
    ]
}
```

and post it for example with ```curl``` to <b>GraphHopper</b>.
Either use a json file (thus copy the above problem into problem.json)

```
curl -H "Content-Type: application/json" --data @problem.json https://graphhopper.com/api/1/vrp/optimize?key=[YOUR_KEY]
```

or copy the problem directly into your curl statement like this


```
curl -H "Content-Type: application/json" --data '{ "vehicles" : [ ...' https://graphhopper.com/api/1/vrp/optimize?key=[YOUR_KEY]
```

As described above, <b>GraphHopper</b> responds with a ```job_id```. Use the following statement to fetch your solution:

```
curl https://graphhopper.com/api/1/vrp/solution/{job_id}?key=[YOUR_KEY]
```

If the solution is available, the response looks like this:

```json
{
  "job_id" : "7e60b8ea-8fe8-4839-8a8e-c72948e131cb",
  "status" : "finished",
  "waiting_time_in_queue" : 0,
  "processing_time" : 271,
  "solution" : {
    "costs" : 71118000,
    "distance" : 1872917,
    "time" : 71118000,
    "no_unassigned" : 0,
    "routes" : [ {
      "vehicle_id" : "my_vehicle",
      "activities" : [ {
        "type" : "start",
        "location_id" : "berlin",
        "end_time" : 0
      }, {
        "type" : "service",
        "id" : "munich",
        "location_id" : "munich",
        "arr_time" : 22066000,
        "end_time" : 22066000
      }, {
        "type" : "service",
        "id" : "frankfurt",
        "location_id" : "frankfurt",
        "arr_time" : 36986000,
        "end_time" : 36986000
      }, {
        "type" : "service",
        "id" : "cologne",
        "location_id" : "cologne",
        "arr_time" : 44195000,
        "end_time" : 44195000
      }, {
        "type" : "service",
        "id" : "hamburg",
        "location_id" : "hamburg",
        "arr_time" : 60057000,
        "end_time" : 60057000
      }, {
        "type" : "end",
        "location_id" : "berlin",
        "arr_time" : 71118000
      } ]
    } ],
    "unassigned" : {
      "services" : [ ],
      "shipments" : [ ]
    }
}
```

Let us assume you do not want your vehicle to come back to Berlin, but to stay in one of the other cities. Then add

```json
"return_to_depot": false
```

to your vehicle specification. This results in:

```json
{
  "job_id" : "2ee7c97d-f108-4c92-9a11-76bdf5b10a0b",
  "status" : "finished",
  "waiting_time_in_queue" : 0,
  "processing_time" : 242,
  "solution" : {
    "costs" : 49178000,
    "distance" : 1289793,
    "time" : 49178000,
    "no_unassigned" : 0,
    "routes" : [ {
      "vehicle_id" : "my_vehicle",
      "activities" : [ {
        "type" : "start",
        "location_id" : "berlin",
        "end_time" : 0
      }, {
        "type" : "service",
        "id" : "hamburg",
        "location_id" : "hamburg",
        "arr_time" : 11064000,
        "end_time" : 11064000
      }, {
        "type" : "service",
        "id" : "cologne",
        "location_id" : "cologne",
        "arr_time" : 26872000,
        "end_time" : 26872000
      }, {
        "type" : "service",
        "id" : "frankfurt",
        "location_id" : "frankfurt",
        "arr_time" : 34114000,
        "end_time" : 34114000
      }, {
        "type" : "service",
        "id" : "munich",
        "location_id" : "munich",
        "arr_time" : 49178000,
        "end_time" : 49178000
      } ]
    } ],
    "unassigned" : {
      "services" : [ ],
      "shipments" : [ ]
    }
  }
}
```

Thus the vehicle does not need to return to Berlin and <b>GraphHopper</b> finds that it is best to end the trip in Munich.

Let us assume you have good reasons to end your trip in Cologne, then add this

```json
"end_address": {
    "location_id" : "cologne",
    "lon": 6.957,
    "lat": 50.936
}
```

to your vehicle specification. This gives you the following solution:

```json
{
  "job_id" : "8393c909-d10e-4197-80ca-d9f165e8c737",
  "status" : "finished",
  "waiting_time_in_queue" : 0,
  "processing_time" : 209,
  "solution" : {
    "costs" : 62098000,
    "distance" : 1640436,
    "time" : 62098000,
    "no_unassigned" : 0,
    "routes" : [ {
      "vehicle_id" : "my_vehicle",
      "activities" : [ {
        "type" : "start",
        "location_id" : "berlin",
        "end_time" : 0
      }, {
        "type" : "service",
        "id" : "hamburg",
        "location_id" : "hamburg",
        "arr_time" : 11064000,
        "end_time" : 11064000
      }, {
        "type" : "service",
        "id" : "munich",
        "location_id" : "munich",
        "arr_time" : 39969000,
        "end_time" : 39969000
      }, {
        "type" : "service",
        "id" : "frankfurt",
        "location_id" : "frankfurt",
        "arr_time" : 54889000,
        "end_time" : 54889000
      }, {
        "type" : "service",
        "id" : "cologne",
        "location_id" : "cologne",
        "arr_time" : 62098000,
        "end_time" : 62098000
      }, {
        "type" : "end",
        "location_id" : "cologne",
        "arr_time" : 62098000
      } ]
    } ],
    "unassigned" : {
      "services" : [ ],
      "shipments" : [ ]
    }
  }
}
```

Now assume that you want to combine your round trip with an important date in Frankfurt where you need to be at latest 6 hours after you have started in Berlin,
then you need to assign an appropriate time window. This is as
easy as adding the ```time_windows``` attribute to your visit specification:

```json
{
    "id": "frankfurt",
    "name": "visit_frankfurt",
    "address": {
        "location_id": "frankfurt",
        "lon": 8.670,
        "lat": 50.109
    },
    "time_windows" : [ 
        {
            "earliest": 0,
            "latest": 21000000
        }
    ]
}
```

This will force your vehicle to visit Frankfurt first and result in the following overall solution:

```json
{
  "job_id" : "396b2f26-a323-44b4-8a66-484c6d43732f",
  "status" : "finished",
  "waiting_time_in_queue" : 0,
  "processing_time" : 222,
  "solution" : {
    "costs" : 84274000,
    "distance" : 2218463,
    "time" : 84274000,
    "no_unassigned" : 0,
    "routes" : [ {
      "vehicle_id" : "my_vehicle",
      "activities" : [ {
        "type" : "start",
        "location_id" : "berlin",
        "end_time" : 0
      }, {
        "type" : "service",
        "id" : "frankfurt",
        "location_id" : "frankfurt",
        "arr_time" : 20809000,
        "end_time" : 20809000
      }, {
        "type" : "service",
        "id" : "munich",
        "location_id" : "munich",
        "arr_time" : 35873000,
        "end_time" : 35873000
      }, {
        "type" : "service",
        "id" : "cologne",
        "location_id" : "cologne",
        "arr_time" : 57351000,
        "end_time" : 57351000
      }, {
        "type" : "service",
        "id" : "hamburg",
        "location_id" : "hamburg",
        "arr_time" : 73213000,
        "end_time" : 73213000
      }, {
        "type" : "end",
        "location_id" : "berlin",
        "arr_time" : 84274000
      } ]
    } ],
    "unassigned" : {
      "services" : [ ],
      "shipments" : [ ]
    }
  }
}
```

Note that when you work with time windows, infeasible problems result in unassigned services. For example, it is impossible to get from Berlin
to Frankfurt in 4 hours by car. Thus, if the latest arrival time in Frankfurt is

```json
"time_windows" : [ 
    {
        "earliest": 0,
        "latest": 14400000
    }
]
```

Frankfurt then definitely ends up in the unassigned service list:

```json
 "unassigned" : {
      "services" : [ frankfurt ],
      "shipments" : [ ]
}
```

It is quite unrealistic that if you travel all the way from Berlin to Munich that your stay in Munich takes 0 ms. Therefore, if your visit takes
for example 2 hours, just add a ```duration``` attribute to your Munich visit.

```json
{
     "id": "munich",
     "name": "visit_munich",
     "address": {
       "location_id": "munich",
       "lon": 11.570,
       "lat": 48.145
     },
     "duration": 7200000
}
```

and you get

```json
{
  "job_id" : "e527ffec-b75b-4753-ad8c-ad90f12a18ea",
  "status" : "finished",
  "waiting_time_in_queue" : 0,
  "processing_time" : 196,
  "solution" : {
    "costs" : 84274000,
    "distance" : 2218463,
    "time" : 84274000,
    "no_unassigned" : 0,
    "routes" : [ {
      "vehicle_id" : "my_vehicle",
      "activities" : [ {
        "type" : "start",
        "location_id" : "berlin",
        "end_time" : 0
      }, {
        "type" : "service",
        "id" : "frankfurt",
        "location_id" : "frankfurt",
        "arr_time" : 20809000,
        "end_time" : 20809000
      }, {
        "type" : "service",
        "id" : "munich",
        "location_id" : "munich",
        "arr_time" : 35873000,
        "end_time" : 43073000
      }, {
        "type" : "service",
        "id" : "cologne",
        "location_id" : "cologne",
        "arr_time" : 64551000,
        "end_time" : 64551000
      }, {
        "type" : "service",
        "id" : "hamburg",
        "location_id" : "hamburg",
        "arr_time" : 80413000,
        "end_time" : 80413000
      }, {
        "type" : "end",
        "location_id" : "berlin",
        "arr_time" : 91474000
      } ]
    } ],
    "unassigned" : {
      "services" : [ ],
      "shipments" : [ ]
    }
  }
}
```

Naturally the arrival time ```arr_time``` in Munich does not equal the end time ```end_time``` anymore.

Let us now assume that you want to make this round trip a bit more exciting and challenging, 
thus you decide to switch from boring car to bike (you will definitely
be a hero if you manage the round trip by bike). Here, you
cannot use the default vehicle type anymore, but you need to define your bike yourself. This requires two changes, first define 
a vehicle type in ```vehicle_types``` and second make a reference to the specified type in your vehicle with ```type_id```:

```json
"vehicles" : [
    {
        "vehicle_id": "my_vehicle",
        "start_address": {
            "location_id": "berlin",
            "lon": 13.406,
            "lat": 52.537
        },
        "type_id": "my_bike"
    }
],
"vehicle_types" : [
    {
        "type_id" : "my_bike",
        "profile" : "bike",
    }
]
```

The solution of your bike round trip indicates that it takes you almost 6 days, but only if you are strong enough to bike without rest.

```json
{
  "job_id" : "2ad116c9-afd4-4e4a-937e-af8cd3dcf168",
  "status" : "finished",
  "waiting_time_in_queue" : 0,
  "processing_time" : 418,
  "solution" : {
    "costs" : 0,
    "distance" : 2289741,
    "time" : 508077000,
    "no_unassigned" : 0,
    "routes" : [ {
      "vehicle_id" : "my_vehicle",
      "activities" : [ {
        "type" : "start",
        "location_id" : "berlin",
        "end_time" : 0
      }, {
        "type" : "service",
        "id" : "hamburg",
        "location_id" : "hamburg",
        "arr_time" : 68786000,
        "end_time" : 68786000
      }, {
        "type" : "service",
        "id" : "munich",
        "location_id" : "munich",
        "arr_time" : 242591000,
        "end_time" : 242591000
      }, {
        "type" : "service",
        "id" : "frankfurt",
        "location_id" : "frankfurt",
        "arr_time" : 328544000,
        "end_time" : 328544000
      }, {
        "type" : "service",
        "id" : "cologne",
        "location_id" : "cologne",
        "arr_time" : 374362000,
        "end_time" : 374362000
      }, {
        "type" : "end",
        "location_id" : "berlin",
        "arr_time" : 508077000
      } ]
    } ],
    "unassigned" : {
      "services" : [ ],
      "shipments" : [ ]
    }
  }
}
```

You might have numerous other requirements to the sequence of your visits. For example, you might want to visit Cologne first and Munich right after 
you have visited Cologne. This might be enforced with time windows, however sometime you need additional business constraints. If so, contact us with your requirements.


### Vehicle Routing Problem

in progress

 








