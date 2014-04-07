## Geocoding Web API Docs

The URL path to obtain the coordinate (`latitude,longitude`) is `/geocode`

Parameter   | Default | Description
:-----------|:--------|:-----------
q           | -       | Specify an address
locale      | en      | Improve the search for the specified locale. E.g. `pt_PT` for Portuguese or `de` for German
limit       | 10      | Specify how many results you want
debug       | `false` | If `true`, the output will be formated.
type        | json    | Specifies the resulting format of the route, for json the content type will be application/json. Or use `jsonp`, additionally you'll need to provide the callback function via the `callback` parameter. The content type will be application/javascript
