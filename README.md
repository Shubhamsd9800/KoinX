# KoinX API

## Overview

KoinX API is a cryptocurrency data fetching and analysis service built using Node.js and Express.js. It allows users to:
1. Implement a background job that will fetch the current price in USD, market cap in USD and 24 hour change of 3 cryptocurrencies: Bitcoin, Matic, and Ethereum and store it in a database. This job should run once every 2 hours.

2. Implement an API api/stats, that will return the latest data about the requested cryptocurrency.
3. Implement an API, /deviation, that will return the standard deviation of the price of the requested cryptocurrency for the last 100 records stored by the background service in the database.

The API has three main routes:
- `/api/fetch`: Fetches cryptocurrency data for Bitcoin, Ethereum, and Matic.
- `/api/stats?coin=coinName`: Fetches the stats (price, market cap, 24-hour change) of a specified coin.
- `/api/deviation?coin=coinName`: Calculates and returns the standard deviation of the price for a specified coin.

Additionally, the root route `/` displays a welcome message.

## Routes

- `GET /`: Returns a welcome message for the KoinX API.
  
- `POST /api/fetch`: Fetches the current price, market cap, and 24-hour price change for Bitcoin, Ethereum, and Matic and stores the data in the database.

- `GET /api/stats?coin=coinName`: Retrieves the most recent price, market cap, and 24-hour price change for a specific coin (`coinName` should be `bitcoin`, `ethereum`, or `matic-network`).

- `GET /api/deviation?coin=coinName`: Calculates the standard deviation of the price of the specific coin over the last 100 records in the database.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- Axios (for API requests)
- CoinGecko API
- node-cron (for scheduling periodic tasks)
  
## How to Run the Project

1. Clone the repository:
    ```
    git clone <repo-url>
    ```

2. Install dependencies:
    ```
    npm install
    ```

3. Create a `.env` file at the root level and set the environment variables:
    ```
    PORT=3000
    MONGO_URL=<your-mongodb-url>
    ```

4. Start the server:
    ```
    npm start
    ```

## Example API Requests
- Fetch Data:
    ```
    POST http://localhost:3000/api/fetch
    ```

- Get Stats:
    ```
    GET http://localhost:3000/api/stats?coin=bitcoin
    ```

- Get Deviation:
    ```
    GET http://localhost:3000/api/deviation?coin=bitcoin
    ```
