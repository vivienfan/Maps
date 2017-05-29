# MAPS

MAPS is a website where user can store and share their list of maps and each map includes map_points. The website also includes a search bar where the user can search  a location and then insert a map point.

## Final Product

1. When the user just visits the page and log in, the user can browse the website and the guest user can only view images, lists, and maps but not able to delete or edit.

  !["try"](https://github.com/vivienfan/Miterm_Map/blob/master/docs/main%20page.png)
  !["try"](https://github.com/vivienfan/Miterm_Map/blob/master/docs/notloggedinview.png)

2. The Guest can also see other people's profiles such as bob. You can visit this page either by visiting the URL link "http://localhost:8080/profiles/bob" where bob is the username. Try visiting "Top Stadiums" you will find that you cannot access the Top Stadiums list because it is private.

  !["try"](https://github.com/vivienfan/Miterm_Map/blob/master/docs/visitingbobpage.png)
  !["try"](https://github.com/vivienfan/Miterm_Map/blob/master/docs/accesstohostdenied.png)

2. The user can register by clicking the register button which should be in the nav bar.  

  !["try"](https://github.com/vivienfan/Miterm_Map/blob/master/docs/register.png)

3. In the home page user can favorite a list and the button toggles to green and the number iterates.

  !["try"](https://github.com/vivienfan/Miterm_Map/blob/master/docs/favorite.png)

4. When you click menu, you can see the two buttons for logging out and your profile.

  !["try"](https://github.com/vivienfan/Miterm_Map/blob/master/docs/menu)

5. If you clicked your profile button, it will direct you to your profile page where you are able to create a new list. You can provide the title and description and you can select whether you want to publicly show the list or make it private where only its owner and its contributors can see it.

  !["try"](https://github.com/vivienfan/Miterm_Map/blob/master/docs/creatinganewlist.png)


6. When you click the button to create a new list. It will direct you to a page where you can create a map. Put the title and description and then click the button to add a map.

!["try"](https://github.com/vivienfan/Miterm_Map/blob/master/docs/creatingamap.png)

7. You can use the search bar to find the location where you want to add a point.

!["try"](https://github.com/vivienfan/Miterm_Map/blob/master/docs/viewingmap.png)

8. Then you can use the cursor to click anywhere on the map where you want to put a point on. On click the modal appears and the user can insert the title, description, and a url link image and then click add to insert the point.

!["try"](https://github.com/vivienfan/Miterm_Map/blob/master/docs/newpointpopup.png)

9. Below the map, it should show the title, description, and image that you have inputed before when you were creating the map.

!["try"](https://github.com/vivienfan/Miterm_Map/blob/master/docs/mappointcreation)


10. Notice at the bottom of the map_point image, there are two buttons for editing and deleting the map. When the user clicks on the edit button, the modal should appear where the user can edit the map point information.

!["try"](https://github.com/vivienfan/Miterm_Map/blob/master/docs/mappointedit2.png)

12. The User can also select the point to reveal more information about that point.

!["try"](https://github.com/vivienfan/Miterm_Map/blob/master/docs/clickingmappoint.png)

13. The User can also select history at the top right hand corner to see more information on who created the map and what kind of modification that the particular map was made.

!["try"](https://github.com/vivienfan/Miterm_Map/blob/master/docs/history.png)

14. When, you get back to the lists page, at the right side, the 'example' user can also add a user as a contributor to the list. In this example, we are adding bob as a contributor.

!["try"](https://github.com/vivienfan/Miterm_Map/blob/master/docs/addContr.png)

15. When bob logs in and goes to his profile page. Bob can see that his contribution table is updated. and when bob checks the history, you can see that the history is updated.

!["try"](https://github.com/vivienfan/Miterm_Map/blob/master/docs/bobcontribution.png)

16. Bob has a private list called top stadiums and wants to allow example to edit the map. He can do that by adding example as a contributor.

!["try"](https://github.com/vivienfan/Miterm_Map/blob/master/docs/addedprivatecont.png)

17. When example logs in, he can go to their own profile page to see that he is now the contributor to the private list.

!["try"](https://github.com/vivienfan/Miterm_Map/blob/master/docs/creatinganewlist.png)

## Getting Started

1. Install dependencies: `npm i`
2. Fix to binaries for sass: `npm rebuild node-sass`
3. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
4. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
5. Run the server: `npm run local`
6. Visit `http://localhost:8080/`

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
