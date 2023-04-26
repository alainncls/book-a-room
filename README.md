# Book A Room

[![Build Contracts](https://github.com/alainncls/book-a-room/actions/workflows/build-contracts.yml/badge.svg)](https://github.com/alainncls/book-a-room/actions/workflows/build-contracts.yml)
[![Build WebApp](https://github.com/alainncls/book-a-room/actions/workflows/build-webapp.yml/badge.svg)](https://github.com/alainncls/book-a-room/actions/workflows/build-webapp.yml)
[![Coverage Status](https://coveralls.io/repos/github/alainncls/book-a-room/badge.svg?branch=main)](https://coveralls.io/github/alainncls/book-a-room?branch=main)

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
5. Generate the TypeScript interfaces for the contracts with `npm run types`

### Web application part

1. Go to the `www` folder and run `npm install`
2. Test the frontend with `npm run test`
3. Launch the webapp with `npm run start`
4. The webapp is available at http://localhost:8080/

## To Do

_Nothing at the moment_
