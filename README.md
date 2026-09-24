### Intro
This is my assignment 1 project for Distrabuted and Mobile Systems with the Auckland University of Technology.

This project contains two seperate programs:  
    Webapp - Frontend  
    Server - Backend

### Software and Tools
This project has been written primarily in Typescript and uses Json to communicate via API between the two programs.  
The concurrently library is used to speed up installation and remove the need to have multiple consoles open.  
The Webapp portion was started using a template provided by Vite.  
The Server portion uses Express, Node.js, and EJS.  

### Requirements
The Server-Cridentials file (Provided for marking)

### Setup and Run
1. Place 'server-credentials.json' in 'server' folder
2. Install all dependancies using 'npm run install-all' from the main folder
3. Run both webapp and server using 'npm run dev-all' from the main folder
4. Copy the localhost url provided in the console, into a browser

The project will load onto a page that checks access to the API and through that the Database. If successful, the page will wait 3 seconds then move the user to the Showings List page.  
Outside of the starting API check page, all other pages are server rendered.  

### Limitations
Minimal attempts have been make to resolve any Race Conditions (Out of scope).  
Program has been created function before form, resulting in a very basic viewing experience as a user.

### Gihub Link
https://github.com/Mandyn1/Comp713_A1

### Assignment 2 Requirements
- Admin Pipeline (Web)
- User Pipeline (Web)
- User Pipeline (Android)
- Web socket for live updates of something
- Unit testing
- Backend 