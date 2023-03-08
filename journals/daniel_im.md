The date of the entry
A list of features/issues that you worked on and who you worked with, if applicable
A reflection on any design conversations that you had
At least one ah-ha! moment that you had during your coding, however small

board view - swim lane issue create modal - needs to work, showing up but not working
board view - issue view - update issue to other swim lanes, close issues,
board view - need to make new open close handlers for swimlane issue create modal so it doesnt stack

UNIT TESTS
DOCUMENTATION
CLEAN UP CODE - comments/prints

Week 17

3/8/23: Driver:

3/7/23: Driver: Christina. Today I was with Ian and Christina. We worked on our modals for our issues on the Board View page. We were having an issue with having them show up. We also had an issue getting them to submit the Issue Form. We fixed those issues. We also decided to only allow a user to add issues on the Backlog swimlane because react was changing over our swimlane variable asynchronously so they were all ending up in the last swimlane. We also created a FAQ page.

3/6/23: Driver: Daniel. This was a shorter work day since we had our practice assessment. I drove for myself and Ryan. We figured out modals. First we got it working on our Board Dashboard to display then I got it working in the Board View and also worked on trying to get the Issue creation. On a few points we had to help out Ian, Joe, and Christina with issues they were having. They were working on the Issues Dashboard.

Week 16

3/3/23: Driver: Ryan. We are trying to see if we can get Material UI to properly display. But all our previous tinkering was deleted so it wouldn't throw errors when compiling in Docker. If we can't figure it out we need something to show to the instructor/SEIR we will go to for help. Got it fixed not sure the reason why but Ryan reinstalled it and it now works and after pushing it all works for us too.
Driver Ryan: Split into groups. Ian, Christina, and Joe worked on the Board View. Ryan and I worked on the Board Overview/Dashboard (page that shows all the boards you are on). Then we worked on the navbar. Then we worked on the issue detail modal.

3/2/23: Driver: Daniel. We were all in one group today. We spent almost 3 hours trying to fix our connection issues. We ended up taking out our try finally on our create and then Riley noticed we were using pool.getconn instead of pool.connection. We swapped all those over and it seems to have resolved our connection issues. We got our GET request to work. We ended up solving our nesting issue, by completely ignoring our board info, hard coding in the swim lanes, and then making a GET request for our issues, but by using a for loop and if statements(hopefully we will refactor later) to sort them into different states for each swimlane. We also wrote a new get query so we can call in the assignee name and added it to our issues out so we can have the assignee name to reference (not just their id.) We then also went through the Material UI to test it. Then we made map functions for each swimlane issue template in each column. We will need to put them in cards later, they are just in table rows right now (to verify that they do indeed work and pull in the information we are looking for).

3/1/23: Driver: Christina. We tested out our issue creation form and it turned out to be an issue with the router not our JS form.
Driver: Ryan. We then went and worked on our Main Project. We
figure out which board we are on and then do a get request for the swim lanes that are on it.
figure out how to make the swimlanes show up properly. Swimlanes should have a component within it and then we should have the issues within it. Maybe do a card.

2/28/23: Driver: Ian. We split off to work on the nav bar. Originally, we were going to get the functionality in, but then as we started to work and plan things out we realized that we would have to refactor everything in Material UI. Worked a little bit before we came together and pivoted. Ian continued to drive and he, Ryan, and I worked on getting the Boards creation query to also automatically create 5 pre-set swim lanes. Break, then we came together and worked out the issue creation form that Christina and Joe were working on. We had to fix the form brackets and div setup in the JSX. We also had to resolve how we were going to call in the board id and swim lane id for the post Request URL. Got help from Candice and Justin to fix our useParams and call it in. Finally got it to go through on the front end (seemingly) but when testing in Swagger, Docker kept crashing. Will need to test tomorrow. We did our git pushes and merge requests.

2/27/23: Driver: Daniel (me). We did a stand up, fine-tuned our swim lanes and outstanding issues and their statuses. Today we are planning on testing the sign up form, and working on the log out button. We, with the help of Candice also made protected our Boards page. I am still a little unclear on it, and how exactly it works. But we got enough clarification to work it, and it should be the same duplication process to apply it to all of our pages. One thing I had not realized was the difference in protecting the back end routes, the front end pages, and the front end to back end requests.

Week 15
2/24/23: Driver: Ian. Christina, Ian, and I worked together again. We had a shorter day today because of starting late, (taking a little longer with the stand up, and the social hack hour). We continued work on the nav bar getting in the dropdown functionality. Tried to troubleshoot our Material UI but it's giving errors. We will need to ask Candice about it.

2/23/23: Driver: Christina. Christina, Ian, and I worked together. We worked on the Sign up Page we worked on the Nav Bar. Added links to all our pages (with placeholders). Used the front end cookbook from Learn as a guide/template.

2/22/23: Driver: Daniel. So we split into groups for the first time. I was with Ryan and we started off with the navbar but quickly realized that we didn't have any pages to pass in so we switched over to the login page. We installed the npm for Material UI. We added an auth.js with the cookbook functions. After going about it our own way, we realized that a lot fo the functionality we were writing was taken care of with the cookbook. We may need to redo the login page but it should make everything else afterwards much simpler.

2/21/23: Driver: Joe. We finished out a last hiccup with the post request and how we were calling in and setting up our models. Then we worked on our put requests. After some issues with and a mix up where we were actually creating and looking at the 200 response. We caught it when we getting the list and saw the multiples in there. With the put request done, our MVP is completed for the back end. We will come back for our stretch goals and complete the accounts model and add in deletes. But that will be done later.

Week 14
2/16/23: Driver: Ryan. We got to work on our Routes and Queries for our Boards, Swimlanes, and Issues. There was a good amount of thought we had to put into it as we went on since rather than duplicating over the same level, ours are nested within each other. Issues reference swim lanes which references boards. We got our post and get sorted out, we need to write out our put functions.

2/15/23: Driver: Ian. We had coded but not referenced anything against pg-admin or swagger yesterday. So we first started getting our volumes and migrations done. We then resolved some import issues and our docker-compose.yaml file. We then finished up our authentication/account testing. There were some errors, in our code that we spent a good chunk of time troubleshooting. Ended up with Riley and Sean troubleshooting. It turned out to be some errors in our code, mostly where we were referencing the wrong thing. Then we set up all of our migrations, so we would only have to migrate once. We had some troubleshooting to do again with our foreign key. Ryan had suggested what he knew from MySQL which was different from PostgreSQL just enough to be wrong. Riley helped us.

2/14/23: Driver: Daniel. Finished setting up our authentication and database today. I drove for both early afternoon and early evening sessions. Docker_compose.yaml, gitattributes, authenticator, and the accounts.py for routers and queries, and pg-admin. Still struggling to understand the authentication. We did not get to test but we should have reached a point where we can just do testing tomorrow.

2/13/23: Driver: Joe. Worked on authentication. Did not get too far, and we spent a good chunk of the time going through the Day 4 Exploration for Authentication.and troubleshooting Joe's issues on Windows.

Week 13
2/9-2/10: Presenter: Christina. Got the project. Started on documentations. First journal entry. No actual coding yet. Planned out our API Routes.
