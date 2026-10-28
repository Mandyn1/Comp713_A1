#### This repo is now being used for assignment 2, see branch for Assignment 1 Final version

## Intro
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

## Software and Tools
This project has been written primarily in Typescript and uses Json to communicate via API between the front end (web or mobile app) and the gateway.  
The gateway connects to microservices via gRPC.  
The concurrently library is used to speed up installation and remove the need to have multiple consoles open.  
The Webapp was started using a template provided by Vite.  
The MobileApp was started using a template provided by Expo.  
The Gateway uses Express, Node.js, and EJS.  
The Services use gRPC to communicate with the Gateway and each other.  

## Requirements
The Server-Credentials file (Provided for marking)

## General Set Up
1. Place `server-credentials.json` in root folder
2. Adjust the `port-numbers.json` file if required
3. Install all dependancies using `npm run install-all` from the root folder

## Run the Web App
1. Run `npm run dev-webapp` from the root folder
2. Copy the localhost url provided in the console from thread [0], into a browser

The project will load onto a page that checks access to the API and through that the Database. If successful, the page will wait 3 seconds then move the user to the Showings List page.  
Outside of the starting API check page, all other pages are server rendered.  

## Setup and Run the Mobile App
Please note that due to restrictions within the AUT internet, a hotspot from a third device on mobile data is required to test this feature. Both the testing device and the host computer must be on this hotspot.
### Step 1: Install expo go
1. on your device, head to the respective app store and install the latest version of expo go
   - NOTE: this uses the SDK58 you NEED the latest version of expo go (version compatable with SDK58), if the latest store version does not work use the following link:
   - install apk: https://github.com/expo/expo-go-releases/releases/tag/Expo-Go-58.0.5
   - note apk only works for android, IOS install is unconfirmed, please use android emulator if need to do so
2. once compatable expo version is installed, head to next step 

### Step 2: Setup correct constraints
1. locate the `port-numbers.json` file in the global root folder
2. open file, and edit the `hostAddress` to your IPv4 address
- Windows: use command `ipconfig | findstr "IPv4"` to view host IP
- MAC: go to System Preferences, click on Network, select your network connection, IP address displayed there  

### Step 3: Start the app
1. Run `npm run dev-webapp` from the main folder

### Step 5: Run the app!
1. go on your phone and open expo go
2. press scan QR
3. scan the QR code that was generated in the terminal  
  
Note: if the QR code doesn't appear, the development server may appear within Expo Go anyway if on the same internet.

## Useful Command List
Note: All commands are run from the global root folder  
All commands are run using `npm run {command}`  

- dev-webapp : Start Webapp + Services
- dev-mobileapp : Start Mobileapp + Services
- dev-services : Start just Services
- install-all : Install all elements

## Seed Admin Account
This program has both a standard user route, and an admin route which requires a user to log in.  
The seed database contains a basic admin account for testing.  
- Username: admin
- Password: admin123

## Limitations
Minimal attempts have been make to resolve any Race Conditions (Out of scope).  
Program has been created function before form, resulting in a very basic viewing experience as a user.

## Gihub Link
https://github.com/Mandyn1/Comp713_A1
