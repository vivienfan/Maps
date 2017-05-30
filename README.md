# MAPS

MAPS is a website where user can store and share their list of maps and each map includes map_points. The website also includes a search bar where the user can search  a location and then insert a map point.

## Final Product

1. When the guest user just visits the page, the user can browse the website and the user can only view images, lists, and maps but not able to delete or edit.

  !["Main Page"](https://github.com/vivienfan/Miterm_Map/blob/master/docs/main%20page.png)
  !["Accessing list as Guest user."](https://github.com/vivienfan/Miterm_Map/blob/master/docs/notloggedinview.png)

2. The Guest can also see other people's profiles such as bob. You can visit this page by visiting the URL link "http://localhost:8080/profiles/bob" where bob is the username. Try visiting "Top Stadiums" you will find that you cannot access the Top Stadiums list because the list is private.

  !["Visiting Bob"](https://github.com/vivienfan/Miterm_Map/blob/master/docs/visitingbobpage.png)
  !["Can't Access"](https://github.com/vivienfan/Miterm_Map/blob/master/docs/accesstohostdenied.png)

3. The user can register by clicking the register button from the nav bar.  

  !["Register"](https://github.com/vivienfan/Miterm_Map/blob/master/docs/register.png)

4. In the home page user can favorite a list and the button toggles to green and the number iterates.

  !["Favorite"](https://github.com/vivienfan/Miterm_Map/blob/master/docs/favorite.png)

5. When you click menu, you can see there is a dropdown of the two buttons for logging out and your profile.

  !["Menu Dropdown"](https://github.com/vivienfan/Miterm_Map/blob/master/docs/menu)

6. If you clicked "Your Profile" button, it will direct you to your profile page where you are able to create a new list. You can provide the title and description and you can select whether you want to publicly show the list or make it private where only its owner and its contributors can see it.

  !["Your Profile"](https://github.com/vivienfan/Miterm_Map/blob/master/docs/creatinganewlist.png)


7. When you click the button to create a new list. It will direct you to a page where you can create a map. Put the title and description and then click "add map" button.

!["Creation of list"](https://github.com/vivienfan/Miterm_Map/blob/master/docs/creatingamap.png)

8. You can use the search bar to find the location where you want to add a point.

!["Search Bar"](https://github.com/vivienfan/Miterm_Map/blob/master/docs/viewingmap.png)

9. Then you can use the cursor to click anywhere on the map where you want to put a point on. On click the modal appears and the user can insert the title, description, and a url link image and then click button 'add' to insert the point.

!["Map point"](https://github.com/vivienfan/Miterm_Map/blob/master/docs/newpointpopup.png)

10. Below the map, it should show the newly created map_points's title, description, and image.

!["Creation of the Map Point"](https://github.com/vivienfan/Miterm_Map/blob/master/docs/mappointcreation)


11. Notice at the bottom of the map_point image, there are two buttons for editing and deleting the map. When the user clicks on the edit button, the modal appears and then the user can edit the map point information.

!["Edit delete buttons"](https://github.com/vivienfan/Miterm_Map/blob/master/docs/mappointedit2.png)

12. The User can also select the point to reveal more information about that point.

!["Point Information"](https://github.com/vivienfan/Miterm_Map/blob/master/docs/clickingmappoint.png)

13. The User can also see the history by clicking the "history button" at the top right hand corner to see more information on who created the map and the activity for that particular map.

!["History Button"](https://github.com/vivienfan/Miterm_Map/blob/master/docs/history.png)

14. Suppose you want to add a contributor but you can only do that if you go back to the lists page. You can go back to the lists page by clicking "Back to list" page at the top left hand corner and it will direct you to its "lists" page. then the user can proceed to add a contributor to the list at the right pane of the page. In this screen shot, the user is adding bob as a contributor.

!["Adding contribution"](https://github.com/vivienfan/Miterm_Map/blob/master/docs/addContr.png)

15. When bob logs in and goes to his profile page. Bob can see that his "Bob's contributions" list is updated.
!["Bob Profile"](https://github.com/vivienfan/Miterm_Map/blob/master/docs/bobcontribution.png)

16. Since bob now has access to the example list, he can also create a new map point in map "example1"

!["Bob creating new map point"](https://github.com/vivienfan/Miterm_Map/blob/master/docs/bobcreatingthepoint.png)

17. And when Bob clicks on the history button, bob can see that the history is updated and view the activity for this map.

 !["Bob clicking history button"](https://github.com/vivienfan/Miterm_Map/blob/master/docs/historybob.png)

18. Bob has a private list called "top stadiums" and wants to allow example to edit the map. He can do that by adding "example" user as a contributor.

!["Private top stadium"](https://github.com/vivienfan/Miterm_Map/blob/master/docs/addedprivatecont.png)

19. When example logs in, he can go to their own profile page to see that he is now the contributor to the private list and now he can access this list.

!["exampleview"](https://github.com/vivienfan/Miterm_Map/blob/master/docs/examplecanviewprivate.png)  

## Getting Started

1. Install dependencies: `npm i`
2. Create a .env file at the root directory of this project, and define the following variables:
    DB_HOST
    DB_USER
    DB_PASS
    DB_NAME
    DB_SSL
    DB_PORT
    GOOGLE_MAP_API_KEY
3. Fix to binaries for sass: `npm rebuild node-sass`
4. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
5. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
6. Run the server: `npm run local`
7. Visit `http://localhost:8080/`
7. In order to get the google search bar working. Please add the instruction in the .env file with your own googple api key. 

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
- GOOGLE API KEY and it should be stored in the .env.
- bcrypt 1.0.2
- body-parser 1.15.2
- dotenv 2.0.0
- ejs 2.4.1
- express 4.13.4,
- knex 0.11.7
- knex-logger  0.1.0
- morgan 1.7.0
- node-sass-middleware 0.9.8
- cookie-session 2.0.0-beta.1
- pg 6.0.2
- method-override 2.3.8
