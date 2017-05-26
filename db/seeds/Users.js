const bcrypt = require('bcrypt');

let users = [
  {id: 1,   name: 'Alice',    email:'alice@h.com',    password:bcrypt.hashSync('alice', 10),     username:'alice'},
  {id: 2,   name: 'Bob',      email:'bob@h.com',      password:bcrypt.hashSync('bob', 10),       username:'bob'},
  {id: 3,   name: 'Charlie',  email:'charlie@h.com',  password:bcrypt.hashSync('charlie', 10),   username:'charlie'}
];

let lists = [
  {l_id: 1,   title: 'apple',   description: 'description',   public: true},
  {l_id: 2,   title: 'orange',  description: 'description',   public: true},
  {l_id: 3,   title: 'lime',    description: 'description',   public: true}
];

let maps = [
  {m_id: 1,   l_id: 1,  title: 'map 1',   description: 'something'},
  {m_id: 2,   l_id: 1,  title: 'map 2',   description: 'something'},
  {m_id: 3,   l_id: 1,  title: 'map 3',   description: 'something'}
];

let map_points = [
  {p_id: 1,   m_id: 1,  title: 'fruits',  description: 'something',   image:'https://www.w3schools.com/css/trolltunga.jpg',  longitude: -33.3,   latitude: 33.3 },
  {p_id: 2,   m_id: 2,  title: 'the',     description: 'something',   image:'https://www.w3schools.com/css/trolltunga.jpg',  longitude: -33.3,   latitude: 33.3},
  {p_id: 3,   m_id: 3,  title: '?',       description: 'something',   image:'https://www.w3schools.com/css/trolltunga.jpg',  longitude: -33.3,   latitude: 33.3}
];

let contributions = [
  {u_id: 3,   l_id: 1},
  {u_id: 2,   l_id: 1}
];

let favourites = [
  {u_id: 1,   l_id: 1},
  {u_id: 2,   l_id: 2},
  {u_id: 3,   l_id: 2}
];

exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('users').del(),
    knex('lists').del(),
    knex('maps').del(),
    knex('map_points').del(),
    knex('contributions').del(),
    knex('favourites').del()
  ])
  .then(() => {
    return knex('users').insert(users);
  })
  .then(() => {
    return knex('lists').insert(lists);
  })
  .then(() => {
    return knex('maps').insert(maps);
  })
  .then(() => {
    return knex('map_points').insert(map_points);
  })
  .then(() => {
    return knex('contributions').insert(contributions);
  })
  .then(() => {
    return knex('favourites').insert(favourites);
  });
};
