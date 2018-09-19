## Where can I get help?

Contact us [per email](https://graphhopper.com/#contact) or use [our public forum](https://discuss.graphhopper.com/c/directions-api).

## What is one credit?

You can use [the estimator in the dashboard](https://graphhopper.com/dashboard/#/pricing) to roughly estimate the necessary credits per day, but note that it can give precise results only in standard cases. 

If you need an better estimate contact us or read through the following steps:

 * one **Routing API** request costs 1 credit. Every 10 via-points cost 1 more credit. E.g. 11 via-points cost 2 credits, 21 via-points costs 3 credits and so on. And if you specify `optimize=true` the credits will be multiplied by 10 i.e. one requests costs 10 credits for 1 to 10 locations, 20 credits for 11 to 20 locations and so on.
   Changing the parameter `algorithm` costs additionally 2 credits, i.e. calculating the alternative route between two points costs 1+2=3 credits.
 * one **Geocoding API** request for the providers `default` and `gisgraphy` costs 0.3 credits. For the providers `nominatim` and `opencagedata` it costs 0.9 credits. This might change in the future if the external providers change their pricing.
 * the costs for one **Route Optimization API** request depends on the number of vehicles and unique locations and is calculated as `vehicles * locations` and is at least 10 credits. For custom packages a location independent credit calculation can be arranged. Please note that GET requests to fetch the solution have a tiny cost of 0.05 credits per request to reduce heavy polling.
 * the costs of one **Map Matching API** request costs certain credits calculated by the formula `input_locations / 100` but at least 1 credit.
 * the costs of one **Matrix API** request are calculated as follows: If either the number of `origins` or the number of `destinations` is less than 20, it costs `origins * destinations / 2` credits. For bigger matrices we use a more favourable formular: `MAX_OF(origins, destinations) * 10`. In both cases at least 1 credit is charged. For example, if you have 2 origins and 10 destinations, `2 * 10 / 2 = 10` credits will be charged. If you have 30 origins and 40 destinations, the required credits amount to `40 * 10 = 400`. If you have one-to-N matrices like 1-to-100, then always the `origins*destinations/2` formula applies.
 * the costs for one **Isochrone API** request is 5 credits for every minute it explores and at least 10 credits. E.g. if you set the `time_limit` to 20 minutes then this request will cost `5*20=100` credits.
  
## How many daily credits do I have?

The daily credit limits for the Directions API are listed in the dashboard and depend on the selected package. 

## What happens if I go over the credit limit?

Your API key will not stop working. If this happens frequently, we'll contact you to discuss
this.

## What happens if I go over the location limit?

Location limits are hard limits and you'll get an error e.g. for the Routing API (max. via points), 
the Route Optimization API (max. services/shipments), for the Matrix API (max. locations) or for the Map Matching API (max. measurements).

## What are the rate limits?

The default limits are outlined below. For different limits, please [contact us](https://graphhopper.com/#contact).

You can send up to 100 requests per minute to an end point of the GraphHopper Directions API.

The Geocoding and Routing API, as well as GET requests against the Route Optimization API 
allow an exception with up to 600 requests per minute.

The Matrix API has an additional limitation where the sum over all locations in all 
Matrix-requests over a timespan of 5 seconds cannot exceed 300.

## Why is there no Map Tiles API?

We concentrate on routing tools only and recommend the following providers for (vector) tiles: [Omniscale](https://omniscale.com/), [TileHosting](https://www.tilehosting.com/) and [Thunderforest](http://thunderforest.com/).

## Where can I find the documentation or some demos?

Our documentation is available [here](./index.md) and some demos are available for [every client](./index.md#api-clients-and-examples). Or have a look into [our references](https://graphhopper.com/#usecases) or at [GraphHopper Maps](https://graphhopper.com/maps/) for more advanced examples.

## A route is wrong or takes too long. How can I fix this?

We are using [OpenStreetMap](https://www.openstreetmap.org) data and rely on the provided information there.
The nice thing is: if there is a street missing or a barrier is passable, you can edit this data when you have local knowledge at
openstreetmap.org or put a note there so that others fix or investigate it for you.

## How long does it take after I updated the data on OpenStreetMap.org?

A change of the data at openstreetmap.org will be considered in our APIs roughly after 1 to 2
days. Except for the Geocoding API: the default provider can take up to 7
weeks and the nominatim provider should be updated within one week.

## What if the packages do not fit my needs?

For individual requirements we offer custom packages and support contracts.
For very large volume or intense calculations we also offer hardware-only
limited setups.

## Do you offer a discount for an annual contract?

Yes, please see the pricing page in the dashboard to see the different
options.

## Where can I change my credit card or payment data

This is possible in the [overview of the dashboard](https://graphhopper.com/dashboard/#/overview), then click edit data.

## Can I pay on demand?

It is possible to pay online e.g. per month for a specific amount of credits/requests. If you exceed this you currently do not 
need to pay for and the requests won't be blocked but we ask you to upgrade if that happens frequently.
Please [let us know](https://graphhopper.com/#contact) of your needs and we find a solution.


## How to cancel, upgrade or downgrade my package?

You can do this in the dashboard on the pricing page.


## Do I need to link or mention the use of the GraphHopper Directions API

Yes, please see [here](https://graphhopper.com/api/1/docs/#attribution) for more details about it. 
Of course, you can also get rid of this (but not of the OpenStreetMap attribution) if you pay for 
the extra white-label option or need to use it for an in-house application.


## What is the difference between the GraphHopper Directions API and the open source projects like the GraphHopper routing engine and the optimization engine jsprit?

The GraphHopper Directions API is a collection of routing related APIs: like the Routing API, the Matrix API, the Route Optimization API and the Geocoding API. 

See [here](https://www.graphhopper.com/open-source/) for a more detailed comparison.

E.g. the Route Optimization API is an efficient way to consume jsprit: properly configured for a lot of use cases, 
with a proper distance/time matrix calculated from GraphHopper, with a simple JSON API and some advanced featured not in jsprit.

## Is it possible to use the GraphHopper Directions API with a custom GraphHopper or jsprit version?

Yes, we host custom and recent versions, be it GraphHopper or jsprit. This way you'll be able to use our Route Optimization API and the 
Matrix API with your custom GraphHopper or jsprit version including custom vehicles, speed profiles, constraints etc.

## Can I model a specific vehicle routing problem with your API and if yes, how?

You can get yourself easily familiar with our Route Optimization API using the documentation. But of course we provide every customer 
support and help to get there vehicle routing problems modeled and solved.
