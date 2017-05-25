exports.seed = function(knex, Promise) {}
//   return
//     //Promise.all([knex('users').del().then( () => {

//   //    return knex('users').insert([
//   Promise.all([knex('users').insert([
//         {id: 1,   name: 'Alice',    email:'alice@h.com',    password:'alice',     username:'alice'},
//         {id: 2,   name: 'Bob',      email:'bob@h.com',      password:'bob',       username:'bob'},
//         {id: 3,   name: 'Charlie',  email:'charlie@h.com',  password:'charlie',   username:'charlie'}
//     ])])
//   //})
// //])
//     //   return knex('users').insert([
//     //     {id: 1,   name: 'Alice',    email:'alice@h.com',    password:'alice',     username:'alice'},
//     //     {id: 2,   name: 'Bob',      email:'bob@h.com',      password:'bob',       username:'bob'},
//     //     {id: 3,   name: 'Charlie',  email:'charlie@h.com',  password:'charlie',   username:'charlie'}
//     //   ])
//     // }).then( () => { console.log('done')})
//     .then(() => {
//       return knex('lists').del().insert([
//         {l_id: 1,   title: 'apple',   description: 'description',   public: true}
//       ]);
//     })
//     .then(() => {
//       knex('maps').del().insert([
//         {m_id: 1,   l_id: 1,  title: 'map 1',   description: 'something'},
//         {m_id: 2,   l_id: 1,  title: 'map 2',   description: 'something'},
//         {m_id: 3,   l_id: 1,  title: 'map 3',   description: 'something'}
//       ]);
//     })
//     .then(() => {
//       knex('map_points').del().insert([
//         {p_id: 1,   m_id: 1,  title: 'fruits',  description: 'something',   image:'https://www.w3schools.com/css/trolltunga.jpg',  longitude: -33.3,   latitude: 33.3 },
//         {p_id: 2,   m_id: 2,  title: 'the',     description: 'something',   image:'https://www.w3schools.com/css/trolltunga.jpg',  longitude: -33.3,   latitude: 33.3},
//         {p_id: 3,   m_id: 3,  title: '?',       description: 'something',   image:'https://www.w3schools.com/css/trolltunga.jpg',  longitude: -33.3,   latitude: 33.3}
//       ]);
//     })
//     .then(() => {
//       knex('contributions').del().insert([
//         {u_id: 1,   l_id: 1},
//         {u_id: 2,   l_id: 1}
//       ]);
//     })
//     .then(() => {
//       knex('favourites').del().insert([
//         {u_id: 3,   l_id: 1}
//       ]);
//     });
// };
