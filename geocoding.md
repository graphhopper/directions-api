## Geocoding API

### Endpoint

The endpoint is `https://graphhopper.com/api/[version]/geocode`

You can get an example response via:

`curl "https://graphhopper.com/api/1/geocode?q=berlin&locale=de&debug=true&key=[YOUR_KEY]"`

### Introduction

![Geocoding Example](./img/geocoding-example.png)

Geocoding describes the process of transforming an textual address representation to a coordinate (`latitude,longitude`). 
For example the conversion from `Berlin` to `52.5170365,13.3888599`.
Reverse geocoding describes the opposite, converting a coordinate to a textual address representation.
Find out more about Geocoding itself on [Wikipedia](http://en.wikipedia.org/wiki/Geocoding).

### API Clients and Examples

See the [clients](./index.md#api-clients-and-examples) section in the main document and [live examples](https://graphhopper.com/api/1/examples/#matrix).

### Parameters

Parameter   | Default   | Description
:-----------|:----------|:-----------
q           | -         | Specify an address
locale      | en        | Display the search results for the specified locale. Currently French (fr), English (en), German (de) and Italian (it) are supported. If the locale isn't found the default (en) is used.
limit       | 10        | Specify how many results you want
debug       | `false`   | If `true`, the output will be formated.
point       | -         | The location bias in the format 'latitude,longitude' e.g. `point=45.93272,11.58803`. Providing a location bias will make it more likely that results are close to the provided point.
provider    | `default` | See the [external providers](#external-providers) section below.

### Example output for the case type=json

```json
{
  "hits": [
    {
      "osm_id": 120456814,
      "osm_type": "W",
      "extent": [
        13.3906703,
        52.5200704,
        13.3948782,
        52.5174944,
      ],
      "country": "Deutschland",
      "osm_key": "amenity",
      "city": "Berlin",
      "street": "Dorotheenstraße",
      "osm_value": "university",
      "postcode": "10117",
      "name": "Humboldt-Universität zu Berlin",
      "state": "Berlin",
      "point": {
        "lng": 13.393560634296435,
        "lat": 52.51875095,
      },
    {...
    }]
}
```

The JSON result contains the following properties. Not all results necessarily contain all these properties, some may only contain a subset of these properties:

JSON path/attribute | Description
:-------------------|:------------
hits                | The list of matching locations
hits[0].point       | The position of the address (containing an object with `lat` and `lng` properties).
hits[0].name        | The name of the entity. Can be a boundary, POI, address, etc
hits[0].housenumber | The housenumber of the address
hits[0].street      | The street of the address
hits[0].city        | The city of the address
hits[0].postcode    | The postcode of the address
hits[0].state       | The state of the address
hits[0].country     | The country of the address
hits[0].osm_id      | The OSM ID of the entity
hits[0].osm_key     | The OSM key of the entity
hits[0].osm_value   | The OSM value of the entity
hits[0].osm_type    | The OSM type of the entity (`W`, `N`, or `R`).
hits[0].extent      | An array describing the bounds of the entity. Can be useful for setting the map zoom. In the format `[minLon,minLat,maxLon,maxLat]`.


## Reverse Geocoding API

The reverse geocoding has exactly the same response but requires an additional URL parameter `reverse=true`. It is required to pass a `point` for reverse geocoding requests.

### URL parameters

Parameter   | Default   | Description
:-----------|:----------|:-----------
reverse     | true      | Required for reverse geocoding
point       | -         | The location to find amenities, cities etc. In the same format as the (forward) geocoding.
locale      | en        | Display the search results for the specified locale. Currently French (fr), English (en), German (de) and Italian (it) are supported. If the locale isn't found the default (en) is used.
debug       | `false`   | If `true`, the output will be formated.
provider    | `default` | See the [external providers](#external-providers) section below.

## External Providers

The provider parameter is currently under development and can fall back to `default` at any time. 
The intend is to provide alternatives to our default geocoder.
Each provider has its own strenghts and might fit better for certain scenarios, so it's worth to compare the different providers.
To try it append the `provider`parameter to the URL like `&provider=nominatim`, 
the result structure should be identical in all cases - if not, please report this back to us.
Keep in mind that some providers do not support certain parameters or don't return some fields, for example `osm_id` and `osm_type` are not supported by every geocoding provider.
If you would like to use additional parameters of one of the providers, but it's not available for the GraphHopper Geocoding API, yet? Please contact us.

The credit costs can be different for all providers - see [here](./FAQ.md#what-is-one-credit) 
for more information about it. 

Currently, only the default provider and gisgraphy supports autocompletion of partial search strings.

All providers support normal "forward" geocoding and reverse geocoding via `reverse=true`.

### Default (`provider=default`)

This provider returns results of our internal geocoding engine, as described above.

### Nominatim (`provider=nominatim`)

The Nominatim provider uses a commercially hosted Nominatim Geocoder that does **not** fall under the [restrictions](https://operations.osmfoundation.org/policies/nominatim/) of the Nominatim instance hosted by OpeStreetMap.
You can try this provider [here](https://nominatim.openstreetmap.org/).

In addition to the above documented parameters Nominatim allows to use the following parameters, which can be used as documented [here](https://wiki.openstreetmap.org/wiki/Nominatim#Parameters):

* viewbox
* viewboxlbrt
* bounded

### OpenCage Data (`provider=opencagedata`)

This provider returns results from the OpenCageData geocoder which you can try [here](https://geocoder.opencagedata.com/demo).

In addition to the above documented parameters OpenCage Data allows to use the following parameters, which can be used as documented [here](https://geocoder.opencagedata.com/api#forward-opt):

* countrycode
* bounds

### Gisgraphy (`provider=gisgraphy`)

This provider returns results from the Gisgraphy geocoder which you can try [here](https://services.gisgraphy.com/static/leaflet/index.html). 

**Limitations:** Gisgraphy does not return tags from OSM nor an extent. The locale parameter is currently not supported for Gisgraphy.

Gisgraphy has a special autocomplete API, which you can use by adding `autocomplete=true` (does not work with `reverse=true`). The autocomplete API is optimized on predicting text input, but returns less information.

In addition to the above documented parameters Gisgraphy allows to use the following parameters, which can be used as documented [here](http://www.gisgraphy.com/documentation/user-guide.php):

* radius
* country
