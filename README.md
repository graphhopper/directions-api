GraphHopper Web API
=======

With [GraphHopper Web API](http://graphhopper.com/#enterprise) it is possible to get the 
fastest path between two or more locations. Additionally to the Open Source API it is 
possible to use addresses as location, not only coordinates. This process is called *Geocoding*.


## How to Start

 1. To use the API you need credentials, please [contact us](http://graphhopper.com/#enterprise).
 2. Read the documentation for **Routing** and **Geocoding**, see below.

Also you can see routing and geocoding in action at [GraphHopper Maps](http://graphhopper.com/maps).

## Issues

If you have problems please report them [here](https://github.com/graphhopper/web-api/issues). 
If you are not a customer or found a bug directly in the Open Source code please report it 
[here](https://github.com/graphhopper/graphhopper/issues) instead.

## Routing API

![Routing Example](./img/routing-example.png)

The JSON format of the hosted Web API is 100% identical to the [Routing API](https://github.com/graphhopper/graphhopper/blob/master/docs/web/api-doc.md) response format.

The endpoint is `http://graphhopper.com/api/[version]/route`

An example URL looks like:

`http://graphhopper.com/api/1/route?point=51.131108%2C12.414551&point=48.224673%2C3.867187&vehicle=car&locale=de&key=[your-key]`

## Geocoding API

![Geocoding Example](./img/geocoding-example.png)

The Geocoding API is documented [here](./docs-geocode.md).

The endpoint is `http://graphhopper.com/api/[version]/geocode`

An example URL looks like:

`http://graphhopper.com/api/1/geocode?q=berlin&locale=de&key=[your-key]`

Append `&debug=true` for a formatted output.

<!--
## Isochrone API

![Isochrone Example](./img/isochrone-example.png)

The Isochrone API is documented [here](./docs-isochrone.md).

The endpoint is `http://graphhopper.com/api/[version]/isochrone`

An example URL looks like:

`http://graphhopper.com/api/1/isochrone?q=52.511624,13.438339&time_limit=1200&vehicle=car&key=[your-key]`

Append `&debug=true` for a formatted output.
-->

## HTTP Error codes

HTTP error code | Reason
:---------------|:------------
500             | Internal server error. It is strongely recommended to send us the message and the link to it, as it is very likely a bug in our system.
501             | Only a special list of vehicles is supported
400             | Something was wrong in your request
401             | Authentication necessary
403             | Not paid or API limit reached
