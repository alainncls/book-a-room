# Book A Room

Two companies, COKE and PEPSI, are sharing an office building but as they are competitors, they don’t trust each other.

Tomorrow is COLA day (for one day), that the two companies are celebrating. They are gathering a number of business partners in the building.

In order to optimize space utilization, they have decided to set up a joint booking system where any user can book one of the 20 meeting rooms available, 10 from each company (C01, C02, …, C10 and P01, P02, …., P10).

The booking system has the following functionalities:

* Users can see meeting rooms availability
* Users can book meeting rooms by the hour (first come, first served)
* Users can cancel their own reservations

## How to launch

This DApp is composed of 2 main folders:

* `blockchain` for the smart contracts
* `www` for the web application

### Blockchain part

1. Go to the `blockchain` folder and run `npm install`
2. Start Ganache
3. Test the contracts with `truffle test`
4. Deploy the contract via `truffle migrate`

### Web application part

1. Go to the `www` folder and run `npm install`
2. Test the frontend with `npm run test`
3. Launch the webapp with `npm run start`
4. The webapp is available at http://localhost:8080/

## To Do

* Tests frontend
* Reload after booking is confirmed
* Display a notification when a transaction is confirmed
* Name the rooms
* Create rooms on migration
* Add a "back office page to administrate the rooms