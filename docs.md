### Routing

The JSON format of the hosted Web API is 100% identical to the [Routing API](https://github.com/graphhopper/graphhopper/blob/master/docs/web/api-doc.md) response format.

The endpoint is `http://graphhopper.com/api/[version]/route`

An example URL looks like:

`http://graphhopper.com/api/1/route?point=51.131108%2C12.414551&point=48.224673%2C3.867187&vehicle=car&locale=de&key=[your-key]`

### Geocoding

The Geocoding API is documented [here](./docs-geocode.md).

The endpoint is `http://graphhopper.com/api/[version]/geocode`

An example URL looks like:

`http://graphhopper.com/api/1/geocode?q=berlin&locale=de&key=[your-key]`

Append `&debug=true` for a formatted output.

### Isochrone

The Isochrone API is documented [here](./docs-isochrone.md).

The endpoint is `http://graphhopper.com/api/[version]/isochrone`

An example URL looks like:

`http://graphhopper.com/api/1/isochrone?q=52.511624,13.438339&time_limit=1200&vehicle=car&key=[your-key]`

Append `&debug=true` for a formatted output.

### HTTP Error codes

HTTP error code | Reason
:---------------|:------------
500             | Internal server error. It is strongely recommended to send us the message and the link to it, as it is very likely a bug in our system.
501             | Only a special list of vehicles is supported
400             | Something was wrong in your request
401             | Authentication necessary
403             | Not paid or API limit reached