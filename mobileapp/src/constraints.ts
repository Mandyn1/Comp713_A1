//CHANGE YOUR HOST IP ADDRESS FOR API CALLS HERE
//Windows: use command ipconfig /all to view host IP
//MAC: go to System Preferences, click on Network, select your network connection, IP address displayed thier 

//change this value to you addres
const address = "10.168.167.228"


//DO NOT CHANGE
export const API = `http://${address}:5000/api`;
export const headers = { "app-type": "mobile" };