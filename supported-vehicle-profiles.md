# Supported Vehicles

The Routing, Matrix and Route Optimization APIs support the following vehicles:

name       | description           | Restrictions              | Icon                                                     |  Real life image
-----------|:----------------------|:--------------------------|:---------------------------------------------------------|:--------------------
car        | Car mode              | car access                | ![car image](https://graphhopper.com/maps/img/car.png)   | 
small_truck| Small truck like a Mercedes Sprinter, Ford Transit or Iveco Daily | height=2.7m, width=2+0.4m, length=5.5m, weight=2080+1400 kg | ![small truck image](https://graphhopper.com/maps/img/small_truck.png)   |  ![small truck image](./img/profile-small_truck1.jpg)
truck      | Truck like a MAN or Mercedes-Benz Actros | height=3.7m, width=2.6+0.5m, length=12m, weight=13000 + 13000 kg, hgv=yes, 3 Axes | ![truck image](https://graphhopper.com/maps/img/truck.png)| ![truck](./img/profile-truck2.jpg)
foot       | Pedestrian or walking | foot access         | ![foot image](https://graphhopper.com/maps/img/foot.png)       |
hike       | Pedestrian or walking with priority for more beautiful hiking tours and potentially a bit longer than `foot`  | foot access         | ![hike image](https://graphhopper.com/maps/img/hike.png)       |
bike       | Trekking bike avoiding hills | bike access  | ![bike image](https://graphhopper.com/maps/img/bike.png)       |
mtb        | Mountainbike          | bike access         | ![Mountainbike image](https://graphhopper.com/maps/img/mtb.png)|
racing bike| Bike preferring roads | bike access         | ![racingbike image](https://graphhopper.com/maps/img/racingbike.png)|

<!-- MAN https://de.wikipedia.org/wiki/Datei:MAN_TGS_26.480_dump_truck.JPG 
     MAN https://de.wikipedia.org/wiki/Lastkraftwagen#/media/File:MAN_M2000_Pritschenwagen.jpg 
     coach https://commons.wikimedia.org/wiki/File:MAZ-251-Reisebus_in_M%C3%BCnchen_-_Seitenansicht.jpg
-->
**Please note, that currently none of the vehicles accounts for turn restrictions except for `ch.disable=true`.**

We also provide a sophisticated `motorcycle` profile powered by the API from [kurviger](https://kurviger.de/). And if you need a custom vehicle (different properties, different speed profiles, different access) for routes in a special geographic area or a dedicated setup nearly without limits [please contact us](https://www.graphhopper.com/contact-form/).

You can try the route results for every profile with [GraphHopper Maps](https://graphhopper.com/maps/)
