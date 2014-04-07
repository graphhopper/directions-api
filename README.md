GraphHopper Web API
=======

With [GraphHopper Web API](http://graphhopper.com/#enterprise) it is possible to get the fastest path between two or more locations. Additionally to the Open Source API it is possible to use addresses as location, not only coordinates. This process is called *Geocoding*.



## Documentation

See *subscribe* on how you get a valid license key in order to query the API.

### Routing

The JSON format of the hosted Web API is 100% identical to the [Routing API](https://github.com/graphhopper/graphhopper/blob/master/docs/web/api-doc.md) response format.

The endpoint is `http://graphhopper.com/api/[version]/route`

An example URL looks like:

`http://graphhopper.com/api/1/route?point=51.131108%2C12.414551&point=48.224673%2C3.867187&vehicle=car&locale=de&key=[your-login]`

### Geocoding

The Geocoding API is documented [here](./docs-geocode.md), and you can see it also on [GraphHopper Maps](http://graphhopper.com/maps).

The endpoint is `http://graphhopper.com/api/[version]/geocode`

An example URL looks like:

`http://graphhopper.com/api/1/geocode?q=berlin&locale=de&key=[your-login]`

Append `&debug=true` for a formatted output.

## Subscribe

To use it you need credentials, please [contact us](http://graphhopper.com/#enterprise).


## Issues

If you have problems please report them [here](https://github.com/graphhopper/web-api/issues). If you are not a customer or found a bug directly in the Open Source code please report it [here](https://github.com/graphhopper/graphhopper/issues) instead.

