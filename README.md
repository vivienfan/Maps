# MAPS

MAPS is a website where user can store and share their list of maps and each map includes map_points. The website also includes a search bar where the user can search  a location and then insert a map point.

## Final Product

1. When the user just visits the page, the user can just view images, lists, and maps but not able to delete or edit.

2. Register page

3. User can favorite the page and the button turns to green and the number iterates to 1.

4. When you click menu, you can see the two options for logging out or seeing your profile.

5. In your profile, you can create a new list while you provide the title and description and you can select whether you want to publicly show it or not. If it is private then no one can see it other than the contributor.

6. When you click the button to create a new list. It will direct you to a page where you can create a map. Put the title and description and then click the button to add a map.

7. You can search from the search bar to find the location where you want to add a point.

8. Then you can use the cursor to click anywhere on the map where you want to put a point on.

9. When the user clicks, the pop up appears and the user can insert the title, description, and a url link image and then click add to insert the point.

10. The user can either delete or edit the map point but clicking either the edit or delete button.

11. Clicking the edit button will give a popup.

12. The User can also select the point to reveal more information about that point.

13. The User can also select history at the top right hand corner to see more information on who created the map and what kind of modification that the particular map was made.

14. When, you get back to the lists page, at the right side, the 'example' user can also add a user as a contributor to the list. In this example, we are adding bob as a contributor.

15. When bob logs in and goes to his profile page. Bob can see that his contribution table is updated. and when bob checks the history, you can see that the history is updated.

16. Bob has a private list called top stadiums and wants to allow example to edit the map. He can do that by adding example as a contributor.

17. When example logs in, he can go to their own profile page to see that he is now the contributor to the private list.

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
