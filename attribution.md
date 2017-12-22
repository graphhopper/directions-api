# Attribution

All packages require a prominent attribution of GraphHopper and a public accessible application e.g. web application or app in one of the app stores.
This means you include a link to graphhopper.com in a place where you utilize the GraphHopper Directions API. 
It is important to note that the user has to see this only one time e.g. once per application start 
or at the first website access. The user must have the possibility and enough time to read and 
click on the link at least 4 seconds. I.e. a short living splash screen isn't what we want, 
instead we ask you to place it e.g. below a search input. As a simple example have a look 
at [GraphHopper Maps](https://graphhopper.com/maps/)

An HTML snippet for this is:

```html
Powered by <a href="https://www.graphhopper.com/">GraphHopper API</a>
```

For small screens (less than 190mm diagonal) it can be only the link without 'powered by'. 
If you want to use the GraphHopper Directions API for an in-house or via a white-label solution please contact us.

Additionally to our attribution you always need to include 
attribution to [OpenStreetMap](https://www.openstreetmap.org/copyright/), regardless of e.g. white-label options.

# License Notice

## Data

The GraphHopper Directions API uses OpenStreetMap data, see the [copyright](https://www.openstreetmap.org/copyright/) with more details or [TomTom data](https://www.graphhopper.com/tomtom-end-user-license-agreement/). 

When using the OpenStreetMap road network we use [Hole-filled elevation data](http://www.cgiar-csi.org/data/srtm-90m-digital-elevation-database-v4-1) from the SRTM project and elevation data from the [U.S. Geological Survey](https://lta.cr.usgs.gov/GMTED2010).

## Open Source

The GraphHopper Directions API uses open source projects under the hood from [GraphHopper GmbH](https://github.com/graphhopper/), [komoot GmbH](https://github.com/komoot/), [OpenStreetMap](https://wiki.openstreetmap.org/wiki/Nominatim) and many more, often under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0). For example [jsprit](https://github.com/graphhopper/jsprit/blob/master/NOTICE.md) or [the routing engine](https://github.com/graphhopper/graphhopper/blob/master/NOTICE.md), that themselves uses other open source components.

Our entire infrastructure is built on top of open source using Debian linux, nginx, bash, python, swagger, git, PostgreSQL, Java and many more open source projects without GraphHopper would not be possible. Thanks a lot!
