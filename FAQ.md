[Go to overview](./README.md)

## Where can I get help?

Contact us [per email](https://graphhopper.com/#contact) or use [our issue tracker](https://github.com/graphhopper/directions-api/issues).

## What is one credit?

You can use [the estimator in the dashboard](https://graphhopper.com/dashboard/#/pricing) to easily calculate the necessary credits or get more details of how credits are calculated with the following:

 * one Routing API request costs 1 credit. Every 10 via-points will cost 1 additional credit. E.g. 11 via-points cost 2 credits. And if you specify `optimize=true` the credits will be multiplied by 10.
 * one Geocoding API request costs 1 credit
 * one Matrix API request with some start locations and some destinations costs `starts * destinations / 2` credits if `starts` or `destinations` are less than 20. For bigger matrices we use the cheaper formular `MAX_OF(starts, destinations) * 10`. For example you have 2 start locations and 10 destinations the charged credits are `2 * 10 / 2 = 10` or for 30 start and 40 destinations it is `40 * 10 = 400`
 * the costs for one Optimization API request depends on the number of vehicles and activities and is calculated as `vehicles * activities` but at least 10 credits. For custom packages a location independent credit calculation can be arranged.
  
## How many credits do I have?

The API credit limits are listed in the dashboard and depend on the selected package. 

## My credits do not reset, even after 24 hours. What is wrong?

The credits are resetted after 24 hours, not on one specific 00:00 time or something. But the reset will only happen, if a new request comes in. So just ask the API or read the `X-RateLimit-Reset` header which gives you the number of seconds to wait. Also only the free package will be blocked after exceeding the limits, other packages don't have this strict policy.

## Where can I find the documentation or some demos?

Our documentation is available [here](https://github.com/graphhopper/directions-api/blob/master/README.md) and some demos are available for [every client](https://github.com/graphhopper/directions-api/blob/master/README.md#api-clients-and-examples). Or have a look into [our references](https://graphhopper.com/#usecases) or at [GraphHopper Maps](https://graphhopper.com/maps/) for more advanced examples.

## Where can I find the pricing?

You can find the detailed pricing in the dashboard. For individual requirements we offer custom packages. Additionally we offer support contracts and a completely self-hosted Directions API, see [here](https://graphhopper.com/#enterprise) for more details.


## Can I pay on demand?

It is possible to pay online e.g. per month for a specific amount of credits/requests. If you exceed this you currently do not need to pay for and the requests won't be blocked but we ask you to upgrade if that happens frequently. Please [let us know](https://graphhopper.com/#contact) of your needs and we find a solution.


## Do you offer discounts?

Yes, you get a discount if you sign up for an annually contract. Also [follow us on Twitter](https://twitter.com/graphhopper) to get the latest campaign.


## How to cancel, upgrade or downgrad my package?

Please [contact us](https://graphhopper.com/#contact)


## Do I need to link or mention the use of the GraphHopper Directions API

Yes. And we think it is fair to make this a requirement for all packages as we need to grow for a more healthy ecosystem and also have very permissive terms otherwise, please see [here](https://github.com/graphhopper/directions-api#attribution) for more details about it. Of course, you can also get rid of this (but not of the OpenStreetMap attribution) if you pay for the extra white-label option.


## Difference between the Directions API and the Open Source GraphHopper 'Core'?

The GraphHopper Directions API is a collection of routing related APIs: the Routing API, the Matrix API, the Route Optimization API and the Geocoding API. This entire set is also available for self-hosting.

The Routing API is based on the [open source GraphHopper](https://github.com/graphhopper/graphhopper/) but as this requires lots of memory for a world wide coverage we make GraphHopper easy and cost effective to use via our Directions API.
