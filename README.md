# outshade-assignment


It's a event-management backend app for assignment of outshade digital media. Postman collection is upladed in postman folder of this repo which can be used for testing all apis.

#

Steps for cloning the project 
1. Fork the repository
2. Download git from here
      - For linux run the command `apt-get install git`
      - For windows go to this link `https://git-scm.com/download/win`
3. Install the git on windows fron the file downloaded
4. Creat a folder on your desktop name it "event-management"
5. Do shift+right_click and select open git bash here
6. Run the command "git init" 
7. Now run the command `git clone http://github.com/gurav8628/outshade-assignment/`
8. You will able to see the code base in your folder

steps for running the project

1. Download vs code from here `https://code.visualstudio.com/download` open this link and select your operating system
2. Download Node.js from here `https://nodejs.org/en/download/` go to this link and select your operating system
3. Download postman from here `https://www.postman.com/downloads/` from here
4. Install and Open vscode
5. Click on File and select open folder and open the event-management folder on desktop
6. Open terminal in vs code and run command "cd event-management
7. In terminal run command `npm install`
8. Download MongoDB from MongoDB download center
9. Open Command prompt and start mongoDB server with command `mongod`
10. In terminal run command `node ./index.js`

you will see the below result as output in terminal
server is running on port 2000
Database connected

## Postman Collection

Postman collection could be imported from `postman` directory.
It contains information for the following endpoints
1. Register 
2. Login 
4. Update Password - running a pre-request for creating a user and the updating his password using api.
5. Logout user - running a pre-request for creating a user and the logging him in so that that we won't get any error when logout api runs.
6. Create events - running a pre-request for creating a user so that we won't get any error.
7. list created events - running a pre-request for creating a user so there won't be ant error whwn api runs.
8. list invited events - running a pre-request for creating a user so there won't be ant error whwn api runs. 



## Endpoints

1. localhost:2000/api/register - for registering the user
2. localhost:2000/api/login - for logging in the user return the events created and the events in which user is invited
3. localhost:2000/api/update - for updating the passowrd
4. localhost:2000/api/logout - for logging out the user
5. localhost:2000/api/create/event - for creating the event
6. localhost:2000/api/list/events/invited - for getting the list of events in which the user is invited response is sorted with respect to date and pagnation is implemented
7. localhost:2000/api/list/events/created - for getting the list of events which user have created response is sorted with respect to date and pagnation is implemented



<p align="right">(<a href="#top">back to top</a>)</p>


## Thankyou!


