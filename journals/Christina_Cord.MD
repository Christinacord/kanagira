## 03/10/2023

Today we worked together as a group and completed our documentation README file. We did a final walk through of our front and back end code. We made sure to delete any remaining dead code and unnecessary comments from the project.

## 03/09/2023

Today Joe and I spent the morning trying to get the modal on the IssuesView view to work/load. We ultimately made the IssuesView page navigate to the BoardView page that contains that particular issue after clicking the view button for that issue from the IssuesView page. All 5 of us wrote our unit tests for our routes. In the evening I went through and started to delete print and console.log statements. I also made the "please log in" message a link to the login/signup page. I went through and added the protection to all of our backend routes.

## 03/08/2023

During the morning we researched and tested trying to get drag and drop functionality to work on the BoardView page. We tried using react-dnd library and also tried the react-beautiful-dnd library. We ended up using a different approach to get the functionality to move issues across the board. We decided to circle back to the drag and drop functionality during stretch goal week since that functionality was outside of our MVP. Daniel and I worked to get the BoardView to automatically refresh and have the updated state after opening a view issue modal and incrementing or decrementing the swimlane that the issue is currently in. Joe and I worked with Ian to add in error handling for the LoginForm and SignUpForm pages.

## 03/07/2023

Today I drove. Daniel, Ian, and I completed the modals for the BoardView. We fixed the issue modal to get it to close and the new issue created will populate. We completed the FAQ page. We completed the navigate to automatically navigate where we want after completing a signup or login (we directed those to the landing page and the boards page, respectively).

## 03/06/2023

Ryan worked on some code over the weekend. Today, Daniel and Ryan figured out how to utilize Material UI for certain react components. Joe, Ian, and I worked on creating the issues component that will show all of the issues for the signed in user.

The team installed Material UI for styling. Daniel and Ryan worked on completing the Nav bar component and the issue detail component. Joe, Ian, and I worked styling the home page and the board view page using material ui.

## 02/27/2023

We were able to get params to work on createissue form. Were able to get a response for form data on the front end in browser. Checked in browser to see if issue was created but joe’s docker was not working so we couldn’t verify if it was actually created. Created createissue form. Worked together to figure out how to use useParams hook in createissue form. Ian/Daniel figured out how to get the board id on the back end. Re-worked board creation query to create 5 swim lanes automatically. Worked on nav bar a bit - still not finished.

## 02/27/2023

Daniel, Joe, Ian, and I worked together on updating our team's Jira Kanban board and adding tickets for a few things. We worked on the login, sign up, and logout buttons and functionality. We will style these pages later on toward the end of the project. We created a new component (BoardView)for boards that will show the view of a single board with swim lanes and issues on it. We discussed that our MVP should take a user immediately to the new board once they create a new board.

## 02/23/2023

Daniel, Ian, and I worked on the SignupForm page. We also worked on the Nav Bar, adding links to all of the pages that we'll have according to our wireframes. Used the front-end cookbook from Learn as a guide/template.

## 02/22/2023

Today we split into groups to start working on front-end components. Joe, Ian, and I completed the HomePage component. We did a merge request and Daniel approved. We merged our code to main. Daniel and Ryan worked on the LoginForm component and also did a merge request and merged with main.

## 02/21/2023

We completed our put routes and queries for boards, issues, and swim lanes. At this point we are done with the back end of our project. We spoke about how we'll break into groups to tackle the front-end of our project. We decided to try using Material UI for styling the front-end.

## 02/16/2023

We finished more of the queries for the back end. We added get and post queries and routers for boards, issues, and swim lanes.

## 02/15/2023

Today we fixed an issue in our docker-compose.yaml. We corrected some of our import statements. We also fixed an issue with the email attribute on the Account model. We corrected get_by_username by changing the return statement. We added all of the remaining database tables to a new migration file.

## 02/14/2023

Today we added directories for both routers and queries in order to keep our code organized. We started to write out some of our CRUD routes and some queries. We added up our PostgreSQL db as a service in our Docker-Compose.yaml and set up an admin account in order to use a web GUI to interact with the server. We started to write out some db tables. Created some functions related to creating accounts.

## 02/13/2023

Today we started to work on authentication. We presented our wireframes to the rest of our class. We decided that we'll all work together on the backend of the project and took time to make sure that we had all finished the explorations for FastAPI and Authentication. We added what we need to start in our requirements.txt file.

## 02/10/2023

Today we created our group in GitLab and forked the repo for each of us to clone. We added our wireframes .png. We wrote out each of our endpoints templates.
