#### This repo is now being used for assignment 2, see branch for Assignment 1 Final version

### Intro
This is our (Cooper Gardyne, Charles Thaugland, and Joshua Mandeno) assignment 2 group project for Distributed and Mobile Systems with the Auckland University of Technology.

This project contains multiple seperate programs:  
- Webapp - Frontend  
- Mobileapp - Frontend  
- API-Gateway - Access point from the frontend to backend services  
- Database-Service - Database connectivity and regeneration  
- Movie-Service - Gets individual movie info, deletion, and creation.  
- Showing-Service - Manages showing list and individual showings.  
- Ticket-Service - Manages tickets and seating.  
- User-Service - Manages admin access via login.  

### Software and Tools
This project has been written primarily in Typescript and uses Json to communicate via API between the front end (web or mobile app) and the gateway.  
The gateway connects to microservices via gRPC.  
The concurrently library is used to speed up installation and remove the need to have multiple consoles open.  
The Webapp was started using a template provided by Vite.  
The MobileApp was started using a template provided by Expo.  
The Gateway uses Express, Node.js, and EJS.  
The Services use gRPC to communicate with the Gateway and each other.  

### Requirements
The Server-Credentials file (Provided for marking)

### General Set Up
1. Place 'server-credentials.json' in root folder
2. Adjust the port-numbers.json file if required
3. Install all dependancies using 'npm run install-all' from the main folder

### Run the Web App
1. Run 'npm run dev-webapp' from the main folder
2. Copy the localhost url provided in the console, into a browser

The project will load onto a page that checks access to the API and through that the Database. If successful, the page will wait 3 seconds then move the user to the Showings List page.  
Outside of the starting API check page, all other pages are server rendered.  

### Setup and Run the Mobile App
- when you want to setup and run the mobile app, head over the the README inside the mobile apps folder!
- See the [mobile app README](mobileapp/README.md) for setup and run instructions.

### Useful Command List
# Note: All commands are run from the global root folder
- dev-webapp : Start Webapp + Services
- dev-mobileapp : Start Mobileapp + Services
- dev-services : Start just Services
- install-all : Install all elements

### Limitations
Minimal attempts have been make to resolve any Race Conditions (Out of scope).  
Program has been created function before form, resulting in a very basic viewing experience as a user.

### Gihub Link
https://github.com/Mandyn1/Comp713_A1
