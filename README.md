# VideoFetcher


Full Stack Application that displays the videos fetched from youtube based on query. It has a dashboard to view the videos in a paginated manner.
Videos can be searched by using their title and description. The query based on which the fetching is done can also be changed from the dashboard.
The complete application can be run together by using docker-compose.

## Technologies Used
- React.js (Frontend) 
- Node.js (Backend server)
- Express.js (Backend server)
- MongoDB (Database)
- Docker (Containerisation)

## Features & Details

### Dashboard 
- User can see the videos as tiles with their thumbnail,title and description
- click on a video tile to open the youtube player in the new tab.
- Search a list of videos by using their title and description
- View the current Query for which the videos are being fetched.
- Change the query to start fetching videos based on the new query
- Pause or Start the fetching of videos.
  
### Backend Server
#### Fetching Videos
- Fetches youtube videos every 30 seconds based on the given query (default query used is 'cricket').
- Before starting to fetch videos the published time of the last saved video (with the same query) in the database is taken and 30 seconds are added to that time to not fetch already fetched videos from the youtube data api.
- Initially the videos taken are published after 1st January 2023.

#### Database 
- Videos are saved in the mongodb atlas database.
- Every video has these properties:
  - Title
  - Description
  - Published Time
  - Thumbnail URL
  - Youtube URL

#### Routes
- A Route to get the videos in a paginated and reverse chronological order.
- Routes to stop and restart the fetching of videos.
- Route to change the query for fetching.
- Route to get the current query.
- Route to search the videos database.

### Addition Things
- Support for using multiple API Keys (3 used here) is given by using an array of API keys and maintaining the count of requests made by each and then changing the index in the array to use a different api key.
- regex matching to search the videos using title and description.
- Individual docker containers of both the frontend and backend are made, the complete project is started by using docker-compose to use both the containers together.


## Setup Steps

- ### Install Docker
  - You can use this link for [windows](https://docs.docker.com/desktop/install/windows-install/) and this for [linux](https://docs.docker.com/engine/install/ubuntu/) to install docker and docker-compose.
  - Follow all the above steps to initialize docker on your system.

- ### Running the Project
  - Clone the repository.
     ```
     git clone <repo-url>
      ```
  - Change the current directory to the project folder.
  - Run this command to start the dashboard and the backend server.
      ```
      docker-compose up --build
      ```
    This will start the frontend dashboard at http://localhost:3001/ and backend server at http://localhost:3000/

## Note:
The Dashboard appearance is not great and is only created to be functional and to showcase the features of the backend server. Apologies..
 

