GraphHopper Directions API for Business 
=======

With the [ GraphHopper Directions API for Business](http://graphhopper.com/#enterprise) it is possible to get the 
fastest path between two or more locations. 


## How to Start

 1. To use the API you need an API key, please [contact us](http://graphhopper.com/#enterprise).
 2. Read the documentation for the **Routing API**, the **Matrix API** and the **Geocoding API**, see below.

Also you can see routing and geocoding in action at [GraphHopper Maps](http://graphhopper.com/maps).

## Issues

If you have problems please report them [here](https://github.com/graphhopper/web-api/issues). 
If you are not a customer or found a bug directly in the Open Source code please report it 
[here](https://github.com/graphhopper/graphhopper/issues) instead.

## [Routing API](docs-routing.md)

![Routing Example](./img/routing-example.png)

The Routing API is documented [here](docs-routing.md).

The endpoint is `https://graphhopper.com/api/[version]/route`

An example URL looks like where you need to replace the key with your own:

`https://graphhopper.com/api/1/route?point=51.131108%2C12.414551&point=48.224673%2C3.867187&vehicle=car&locale=de&key=[your-key]`

## Matrix API

**Coming soon** ...

![Matrix Example](./img/matrix-example.png)

In the normal routing API we support multiple points, so called 'via points', which results in one route being calculated. The Matrix API results in NxM routes being calculated but is a lot faster compared to NxM single requests. The most simple example is a pizza delivery service, delivering e.g. 4 pizzas. To find the fastest tour consisting of ALL locations one needs a two step process:

 1. Find all distances (or times) between all locations using the Matrix API. For the 4 pizzas you'll need 4*4-4 routes: A-B, A-C, A-D, B-A, B-C, B-D, ... The routes A-A, B-B, C-C and D-D are 0 and therefor the "minus 4".
 2. Optimize the **order** of the locations to find the overall best tour. I.e. calculate the total time for the tour "A-B-C-D", then "A-C-B-D" and so on. This is not yet integrated into the API and has to be done with a separate optimization software, you can contact us to implement an efficient solution for you.

Some other use case scenarios for the Matrix API:

 * Logistic problems often pick up many items from and deliver them to many locations.
 * Calculating detours with many possible points in-between and selecting the best (e.g. interesting for ridesharing or taxi applications)
 * Finding the best tour for a tourist in the need to visit as many points of interests as possible.
 * ...

## [Geocoding API](./docs-geocode.md)

![Geocoding Example](./img/geocoding-example.png)

The Geocoding API is not yet production grade. Please help us improve it and give us feedback! See the documentation [here](./docs-geocode.md).

The endpoint is `https://graphhopper.com/api/[version]/geocode`

An example URL looks like:

`https://graphhopper.com/api/1/geocode?q=berlin&locale=de&key=[your-key]`

Append `&debug=true` for a formatted output.

<!--
## Isochrone API

![Isochrone Example](./img/isochrone-example.png)

The Isochrone API is documented [here](./docs-isochrone.md).

The endpoint is `https://graphhopper.com/api/[version]/isochrone`

An example URL looks like:

`https://graphhopper.com/api/1/isochrone?q=52.511624,13.438339&time_limit=1200&vehicle=car&key=[your-key]`

Append `&debug=true` for a formatted output.
-->

## Terms

In your about page or at a similar place you have to link to our <a href="https://graphhopper.com/terms.html">Terms of Services</a> as your users are agreeing to be bound by GraphHopper's Terms of Use.

## Attribution

The standard package requires a prominent attribution of GraphHopper. This means you include a link to graphhopper.com where you utilize the GraphHopper Directions API. It is important to note that the user has to see this only one time e.g. once per application start or at the first website access. The user must have the possibility and enough time to read and click on the link e.g. including it only in a short living spash screen isn't appropriate where as including this in or below a search input is appropriate. For an example you can look at [GraphHopper Maps](http://graphhopper.com/maps/)

An html snippet for this is:

```html
powered by <a href="http://graphhopper.com">GraphHopper</a>
```

For small screens (less than 190mm diagonal) it can be only the link:

```html
<a href="http://graphhopper.com">GraphHopper</a>
```

If you need a custom or white-label solution please contact us.

Regardless of the package and additionally to our attribution you need to include attribution to [OpenStreetMap](http://www.openstreetmap.org/copyright/).

## HTTP Error codes

HTTP error code | Reason
:---------------|:------------
500             | Internal server error. It is strongely recommended to send us the message and the link to it, as it is very likely a bug in our system.
501             | Only a special list of vehicles is supported
400             | Something was wrong in your request
401             | Authentication necessary
403             | Not paid or API limit reached
