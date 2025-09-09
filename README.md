# Weather App

# React and cypress E2E project

## Description
This is an application that lets the user enter a city in the search field and retrieves weather data from openweather API. The user can add the city to their favorite-list on the homepage, and the city will appear as a card which still is clickable. The user can from the homepage remove the city from their favorite-list as they wish. 

## Preview
https://weather-application-ebon-zeta.vercel.app/


## Installation:
Run "npm install" to receive dependencies and packages from node_modules.

## ENV Instructions

This project is built on prisma, mongodb and openweatherapi. If you´re cloning this project, you´ll need to create a .env file in the root. This file will require the following:
DATABSE_URL:
- This link is retreived from your mongodb atlas account. Use the link from a cluster and paste the string. Should look something like this:



```
 DATABASE_URL="mongodb+srv://<yourname>:<yourpassword>@cluster0.ogxi4gz.mongodb.net/<yourserver>?retryWrites=true&w=majority&appName=<yourclustername>"
```
WEATHER_API_KEY:
-This link is retrieved from openweatherapi. Create an account and generate the api-link. https://openweathermap.org/
The link should look like this:
```
WEATHER_API_KEY="(32stringkey)".
```

After this is implemented, make sure to run the script: 
"npm run push" to update the database with your connection keys.

## For testing purposes use the following scripts: 
"npm run seed" to seed and clear the database with default citites (should be 4 default cities).

In a new terminal, run:
"npm run test" to open a testing environment with cypress. (Uses port ::3100).

## Run the app
In the terminal, type "npm run dev" to open the application on port ::3000.

