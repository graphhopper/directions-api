## Where can I get help?

Contact us [per email](https://graphhopper.com/#contact) or use [our public forum](https://discuss.graphhopper.com/c/directions-api).

## What is one credit?

You can use [the estimator in the dashboard](https://graphhopper.com/dashboard/#/pricing) to roughly estimate the necessary credits per day, but note that it can give precise results only in standard cases. 

If you need an better estimate contact us or read through the following steps:

 * one Routing API request costs 1 credit. Every 10 via-points cost 1 more credit. E.g. 11 via-points cost 2 credits, 21 via-points costs 3 credits and so on. And if you specify `optimize=true` the credits will be multiplied by 10 i.e. one requests costs 10 credits for 1 to 10 locations, 20 credits for 11 to 20 locations and so on.
 * 5 Geocoding API requests cost 1 credit
 * one Matrix API request with some start locations and some destinations costs `starts * destinations / 2` credits if `starts` or `destinations` are less than 20. For bigger matrices we use the cheaper formular `MAX_OF(starts, destinations) * 10`. For example you have 2 start locations and 10 destinations the charged credits are `2 * 10 / 2 = 10`. If you have 30 start and 40 destinations it is `40 * 10 = 400`. If you have one-to-N matrices like 1-to-100 then always the `starts*destinations/2` formula applies.
 * the costs for one Optimization API request depends on the number of vehicles and activities and is calculated as `vehicles * activities` but at least 10 credits. For custom packages a location independent credit calculation can be arranged.
 * the costs for one Isochrone API requests is one 1 credit multiplied for every minute it explores.
  
## How many credits do I have?

The API credit limits are listed in the dashboard and depend on the selected package. 

## What happens if I go over the credit limit?

Your API key will not stop working. If this happens frequently, we'll contact you to discuss.

## My credits do not reset, even after 24 hours. What is wrong?

The credits are resetted after 24 hours, not on one specific 00:00 time or something. But the reset will only happen, if a new request comes in. So just ask the API or read the `X-RateLimit-Reset` header which gives you the number of seconds to wait. Also only the free package will be blocked after exceeding the limits, other packages don't have this strict policy.

## Where can I find the documentation or some demos?

Our documentation is available [here](./index.md) and some demos are available for [every client](./index.md#api-clients-and-examples). Or have a look into [our references](https://graphhopper.com/#usecases) or at [GraphHopper Maps](https://graphhopper.com/maps/) for more advanced examples.

## Where can I find the pricing?

You can find the detailed pricing in the dashboard. For individual requirements we offer custom packages. Additionally we offer support contracts and a completely self-hosted Directions API, see [here](https://graphhopper.com/#enterprise) for more details.


## Can I pay on demand?

It is possible to pay online e.g. per month for a specific amount of credits/requests. If you exceed this you currently do not need to pay for and the requests won't be blocked but we ask you to upgrade if that happens frequently. Please [let us know](https://graphhopper.com/#contact) of your needs and we find a solution.


## Do you offer discounts?

Yes, you get a discount if you sign up for an annually contract. Also [follow us on Twitter](https://twitter.com/graphhopper) to get the latest campaign.


## How to cancel, upgrade or downgrad my package?

Please [contact us](https://graphhopper.com/#contact)


## Do I need to link or mention the use of the GraphHopper Directions API

Yes. And we think it is fair to make this a requirement for all packages as we need to grow for a more healthy ecosystem and also have very permissive terms otherwise, please see [here](https://graphhopper.com/api/1/docs/#attribution) for more details about it. Of course, you can also get rid of this (but not of the OpenStreetMap attribution) if you pay for the extra white-label option.


## What is the difference between the Directions API and the Open Source GraphHopper 'Core'?

The GraphHopper Directions API is a collection of routing related APIs: the Routing API, the Matrix API, the Route Optimization API and the Geocoding API. This entire set is also available for self-hosting.

The Routing API is based on the [open source GraphHopper](https://github.com/graphhopper/graphhopper/) and is nearly 100% identical to it, e.g. currently only the optimize=true parameter is not supported in the open source package.

Also the hosted Routing API is very easy to use, no configuration hassle, maintenance or even buying hardware is necessary.

## What is the difference between the Route Optimization API and jsprit?

We use jsprit to implement our Route Optimization API, it is our open source vehicle route optimization project. The Route Optimization API is an efficient way to consume jsprit: properly configured for a lot of use cases, with a proper distance/time matrix calculated from GraphHopper, with a simple JSON API and more.

## Is the Matrix API available as open source?

We have released nearly all of our code as open source and strongly support a prosper community around each of our projects. But we have decided to keep the Matrix API closed source, see [graphhopper#131](https://github.com/graphhopper/graphhopper/issues/131)

## Is it possible to use the GraphHopper Directions API with a custom GraphHopper or jsprit version?

Yes, we host custom and recent GraphHopper and jsprit versions. This way you'll be able to use our Route Optimization API and the Matrix API with your custom GraphHopper version including custom vehicles, speed profiles etc. Or you can modify jsprit and change how the route optimization behaves.
