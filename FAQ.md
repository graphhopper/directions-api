## Where can I get help?

Contact us [per email](https://graphhopper.com/#contact) or use [our public forum](https://discuss.graphhopper.com/c/directions-api).

## What is one credit?

You can use [the estimator in the dashboard](https://graphhopper.com/dashboard/#/pricing) to roughly estimate the necessary credits per day, but note that it can give precise results only in standard cases. 

If you need an better estimate contact us or read through the following steps:

 * one **Routing API** request costs 1 credit. Every 10 via-points cost 1 more credit. E.g. 11 via-points cost 2 credits, 21 via-points costs 3 credits and so on. And if you specify `optimize=true` the credits will be multiplied by 10 i.e. one requests costs 10 credits for 1 to 10 locations, 20 credits for 11 to 20 locations and so on. Using the parameter `ch.disable=true` to unlock certain features costs additionally 2 credits, i.e. calculating the route between two points costs 1+2=3 credits.
 * Five **Geocoding API** requests for the default provider cost 1 credit. For other provider one geocoding requests costs 1.5 credits.
 * the costs of one **Matrix API** request are calculated as follows: If either the number of `origins` or the number of `destinations` is less than 20, it costs `origins * destinations / 2` credits. For bigger matrices we use a more favourable formular: `MAX_OF(origins, destinations) * 10`. For example, if you have 2 origins and 10 destinations, `2 * 10 / 2 = 10` credits will be charged. If you have 30 origins and 40 destinations, the required credits amount to `40 * 10 = 400`. If you have one-to-N matrices like 1-to-100, then always the `origins*destinations/2` formula applies.
 * the costs for one **Route Optimization API** request depends on the number of vehicles and activities and is calculated as `vehicles * activities` and at least 10 credits. For custom packages a location independent credit calculation can be arranged.
 * the costs for one **Isochrone API** requests is 5 credits for every minute it explores and at least 10 credits. E.g. if you set the `time_limit` to 20 minutes then this request will cost `5*20=100` credits.
  
## How many credits do I have?

The API credit limits are listed in the dashboard and depend on the selected package. 

## What happens if I go over the credit limit?

Your API key will not stop working. If this happens frequently, we'll contact you to discuss.

## Where can I find the documentation or some demos?

Our documentation is available [here](./index.md) and some demos are available for [every client](./index.md#api-clients-and-examples). Or have a look into [our references](https://graphhopper.com/#usecases) or at [GraphHopper Maps](https://graphhopper.com/maps/) for more advanced examples.

## Where can I find the pricing?

You can find the detailed pricing in the dashboard. For individual requirements we offer custom packages. Additionally we offer support contracts and a self-hosted Directions API, see [here](https://graphhopper.com/#enterprise) for more details.


## Can I pay on demand?

It is possible to pay online e.g. per month for a specific amount of credits/requests. If you exceed this you currently do not need to pay for and the requests won't be blocked but we ask you to upgrade if that happens frequently. Please [let us know](https://graphhopper.com/#contact) of your needs and we find a solution.


## Do you offer discounts?

Yes, you get a discount if you sign up for an annually contract. Also [follow us on Twitter](https://twitter.com/graphhopper) to get the latest campaign.


## How to cancel, upgrade or downgrad my package?

Please [contact us](https://graphhopper.com/#contact)


## Do I need to link or mention the use of the GraphHopper Directions API

Yes, please see [here](https://graphhopper.com/api/1/docs/#attribution) for more details about it. Of course, you can also get rid of this (but not of the OpenStreetMap attribution) if you pay for the extra white-label option or need to use it for an in-house application where the attribution.


## What is the difference between the GraphHopper Directions API and the open source projects like the GraphHopper routing engine and the optimization engine jsprit?

The GraphHopper Directions API is a collection of routing related APIs: the Routing API, the Matrix API, the Route Optimization API and the Geocoding API. 
This entire set is also available for self-hosting.

We use jsprit to implement our Route Optimization API, it is our open source vehicle route optimization project. 
The Route Optimization API is an efficient way to consume jsprit: properly configured for a lot of use cases, 
with a proper distance/time matrix calculated from GraphHopper, with a simple JSON API and some advanced featured not in jsprit.

The Routing API is based on the [open source GraphHopper](https://github.com/graphhopper/graphhopper/) and is nearly identical to it.

We have decided to keep the Matrix API closed source, see [graphhopper#131](https://github.com/graphhopper/graphhopper/issues/131)

See [here](https://graphhopper.com/#os-comparison) for a more detailed comparison.

## Is it possible to use the GraphHopper Directions API with a custom GraphHopper or jsprit version?

Yes, we host custom and recent versions, be it GraphHopper or jsprit. This way you'll be able to use our Route Optimization API and the 
Matrix API with your custom GraphHopper or jsprit version including custom vehicles, speed profiles, constraints etc.

## Can I model a specific vehicle routing problem with your API and if yes, how?

You can get yourself easily familiar with our Route Optimization API using the documentation. But of course we provide every customer 
support and help to get there vehicle routing problems modeled and solved.