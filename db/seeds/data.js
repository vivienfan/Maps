exports.seed = function(knex, Promise) {
  return
  knex('users').del().insert([
      {id: 1, name: 'Alice', email:'alice@h.com', password:'alice', username:'alice'},
      {id: 2, name: 'Bob', email:'bob@h.com', password:'bob', username:'bob'},
      {id: 3, name: 'Charlie', email:'charlie@h.com', password:'charlie', username:'charlie'}
    ])
  .then(function() {
    knex('lists').del().insert({l_id: 1, title: 'apple', description: 'description', public: true});
  })
  .then(function() {
    knex('maps').del().insert([
      {m_id: 1, l_id: 1},
      {m_id: 2, l_id: 1},
      {m_id: 3, l_id: 1}
    ]);
  })
  .then(function() {
    knex('map_points').del().insert([
      {p_id: 1, m_id: 1, title: 'fruits', description: 'something', image:'image', longitude: -33.3, latitude:33.3 },
      {p_id: 2, m_id: 2, title: 'the', description: 'something', image:'image', longitude: -33.3, latitude: 33.3},
      {p_id: 3, m_id: 3, title: '?', description: 'something', image:'image', longitude: -33.3, latitude: 33.3}
    ]);
  })
  .then(function() {
    knex('contributions').del().insert([
      {u_id: 1, l_id: 1},
      {u_id: 2, l_id: 1}
    ]);
  })
  .then(function() {
    knex('favourites').del().insert([
      {u_id: 3, l_id: 1}
    ]);
  });

  // Promise.all([
  //   knex('users').del().then( function() {
  //     return knex('users').insert([
  //       {id: 1, name: 'Alice', email:'alice@h.com', password:'alice', username:'alice'},
  //       {id: 2, name: 'Bob', email:'bob@h.com', password:'bob', username:'bob'},
  //       {id: 3, name: 'Charlie', email:'charlie@h.com', password:'charlie', username:'charlie'}
  //     ]);
  //   }),
  //   knex('lists').del().then( function() {
  //     return knex('lists').insert([
  //       {l_id: 1, title: 'apple', description: 'description', public: true}
  //     ]);
  //   }),
  //  knex('maps').del().then( function() {
  //     return knex('maps').insert([
  //       {m_id: 1, l_id: 1},
  //       {m_id: 2, l_id: 1},
  //       {m_id: 3, l_id: 1}
  //     ]);
  //   }),
   // knex('map_points').del().insert([
   //      {p_id: 1, m_id: 1, title: 'fruits', description: 'something', image:'image', longitude: -33.3, latitude:33.3 },
   //      {p_id: 2, m_id: 2, title: 'the', description: 'something', image:'image', longitude: -33.3, latitude: 33.3},
   //      {p_id: 3, m_id: 3, title: '?', description: 'something', image:'image', longitude: -33.3, latitude: 33.3}
   //    ]);
   //  })
      // knex('contributions').del().then( function() {
      //   return knex('contributions').insert([
      //   {p_id: 1, m_id: 1, title: 'fruits', description: 'something', image:'image', longitude: -33.3, latitude:33.3 },
      //   {p_id: 2, m_id: 2, title: 'the', description: 'something', image:'image', longitude: -33.3, latitude: 33.3},
      //   {p_id: 3, m_id: 3, title: '?', description: 'something', image:'image', longitude: -33.3, latitude: 33.3}
      //     ]);
      // }),

      // knex('favourites').del().then( function() {
      //   return knex('favourites').insert([
      //   {p_id: 1, m_id: 1, title: 'fruits', description: 'something', image:'image', longitude: -33.3, latitude:33.3 },
      //   {p_id: 2, m_id: 2, title: 'the', description: 'something', image:'image', longitude: -33.3, latitude: 33.3},
      //   {p_id: 3, m_id: 3, title: '?', description: 'something', image:'image', longitude: -33.3, latitude: 33.3}
      //     ]);
      // }),



  // ]);
};
