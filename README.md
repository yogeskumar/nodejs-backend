#Node.js and MongoDB API Project
This project is an API implementation using Node.js and MongoDB. The API fetches data from a third-party API and performs various operations and calculations on the data. It utilizes MongoDB atlas as the database to store and retrieve the data.

##Features
-Initialize the database with seed data from a third-party API.
-Retrieve statistics for a specific month, including the total sale amount, total number of sold items, and total number of not sold items.
-Generate a bar chart representing the price ranges and the number of items in each range for a specific month.
-Generate a pie chart representing the unique categories and the number of items in each category for a specific month.
-Fetch combined data from all the above APIs and send a response containing the combined JSON.

##Requirements
Node.js
MongoDB

##Installation
Clone the repository:
git clone https://github.com/yogeskumar/nodejs-backend

##Install the dependencies:
cd nodejs-backend
npm install

##Start the server:
node server.js

The server should now be running on http://localhost:3000.

##Usage
Initialize the database with seed data:
GET http://localhost:3000/api/

###Retrieve statistics for a specific month:
GET http://localhost:3000/api/statistics/:month
Replace :month in the URL with the desired month value (e.g., 1 for January, 2 for February, etc.).

###Generate a bar chart for a specific month:
GET http://localhost:3000/api/bar-chart/:month
Replace :month in the URL with the desired month value (e.g., 1 for January, 2 for February, etc.).

###Generate a pie chart for a specific month:
GET http://localhost:3000/api/pie-chart/:month
Replace :month in the URL with the desired month value (e.g., 1 for January, 2 for February, etc.).

###Fetch combined data from all APIs:
GET http://localhost:3000/api/combined-data/:month
Replace :month in the URL with the desired month value (e.g., 1 for January, 2 for February, etc.).

Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

License
This project is licensed under the MIT License.
