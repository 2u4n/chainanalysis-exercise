# Chainanalysis exercise questionnairse

### 1. Are there any sub-optimal choices(or shortcuts taken due to limited time) in your implementation?
Sub-optimal choices:
* No live update of prices (prices are initialized when page loads, will be updated if users refresh the page or click the update price button)
* Only three exchanges are considered (Coinbase, Binance, Gemini)

Shortcuts taken:
* The site was built on a free template

### 2. Is any part of it over-designed?
The site is not over-designed in any part in my opinion.

### 3. If you have to scale your solution to 100 users/second traffic what changes would you make, if any?
If there are increased traffic with more users, I would add a reverse proxy server to handle the API requests. A reverse proxy server can load balance the amount of requests as well as caching data (the cryptocurrency's prices) so not as many requests need to be made. It also adds security and reliability benefits.

### 4. What are some other enhancements you would have made, if you had more time to do this implementation
If I had more time, I would add the following things: 
 * Display real time update on prices
 * Add more exchanges
 * Makes an algorithm that displays the lowest two prices as buying prices and highest two prices as selling prices
 * User authentication so that people can use the platform to trade and manage their portfolio
 * Integration with the exchanges' API to carry out buy and sell orders

### 5. How to build and run
* Fork this repository
* Clone this repository locally
* Inside the cloned directory, run `npm install --legacy-peer-deps`
* When npm finishes installing all dependencies, run `npm start` and the site will be up and running
