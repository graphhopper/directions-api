# Supported Vehicles

The Routing, Matrix and Route Optimization APIs support the following vehicles:

name       | description           | Restrictions              | Icon                                                     | Example models                | Real life image
-----------|:----------------------|:--------------------------|:---------------------------------------------------------|:------------------------------|:--------------------
car        | Car mode              | car access                | ![car image](https://graphhopper.com/maps/img/car.png)   |                               |
motorcycle | Motor bike avoiding motorways | motorcycle access | ![motorcycle image](https://graphhopper.com/maps/img/motorcycle.png) |                   |
small_truck| Small truck           | 5% slower than car, height=2.7m, width=2+0.4m, length=5.5m, weight=2080+1400 kg | ![small truck image](https://graphhopper.com/maps/img/small_truck.png)           | Mercedes Sprinter, Ford Transit, Iveco Daily | ![small truck image](./img/profile-small_truck1.jpg)
bus        | overland bus, no psv  | 10% slower than car, height=3.54m, width=2.55+0.5m, length=10.34m, weight=9600 + 6000 kg | ![bus image](https://graphhopper.com/maps/img/bus.png)                  | | [![bus](./img/profile-bus1.jpg)](https://commons.wikimedia.org/wiki/File:MAZ-251-Reisebus_in_M%C3%BCnchen_-_Seitenansicht.jpg)
truck      | Truck                 | 15% slower than car, height=3.7m, width=2.6+0.5m, length=12m, weight=13000 + 13000 kg, hgv=yes, 3 Axes | ![truck image](https://graphhopper.com/maps/img/truck.png)| MAN, Mercedes-Benz Actros | ![truck](./img/profile-truck2.jpg)
foot       | Pedestrian or walking | foot access         | ![foot image](https://graphhopper.com/maps/img/foot.png)       ||
bike       | Trekking bike avoiding hills | bike access  | ![bike image](https://graphhopper.com/maps/img/bike.png)       ||
mtb        | Mountainbike          | bike access         | ![Mountainbike image](https://graphhopper.com/maps/img/mtb.png)||
racing bike| Bike preferring roads | bike access         | ![racingbike image](https://graphhopper.com/maps/img/racingbike.png)||

<!-- MAN https://de.wikipedia.org/wiki/Datei:MAN_TGS_26.480_dump_truck.JPG -->
<!-- MAN https://de.wikipedia.org/wiki/Lastkraftwagen#/media/File:MAN_M2000_Pritschenwagen.jpg -->
**Please not that currently none of the vehicles accounts for turn restrictions.**
