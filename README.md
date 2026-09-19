### General
This is my assignment 1 project for Distrabuted and Mobile Systems with the Auckland University of Technology.

This project contains two seperate programs:  
    Webapp - Frontend  
    Server - Backend

This project has been written primarily in Typescript and uses Json to communicate via API between the two programs.  
The concurrently library is used to speed up installation and remove the need to have multiple consoles open.  
The Webapp portion was started using a template provided by Vite.  
The Server portion uses Express, Node.js, and EJS.  
There is a 'server-credentials.json' file excluded from github commits used to access this, request a copy of this if it is not supplied.  

The project will load onto a page that checks access to the API and through that the Database. If successful, the page will wait 3 seconds then move the user to the Showings List page.  
Outside of the starting API check page, all other pages are server rendered.  

This project could be developed further by using cookies and storing the identity of the person who booked the seat rather than having a temporary 'held' state and a permenant 'booked' state

### Setup
1. Place 'server-credentials.json' in 'server' folder
2. Install all dependancies using 'npm run install-all' from the main folder
3. Run both webapp and server using 'npm run dev-all' from the main folder


This will be a movie booking system:
/ getlist
/[movie id]
/[movie id]/booking
- hold seat
- release seat
- confirm seat

Database tables
- Found in schema.sql