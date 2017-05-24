"use strict";

const bcrypt = require('bcrypt');

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(knex) {
  return {
    logIn: function(username, email, password, callback) {
      knex.select('id', 'password')
      .from('users')
      .where(username, username)
      .orWhere(email, email)
      .then((rows) => {
        if (rows.length !== 0
          && bcrypt.compareSync(password, rows[0].password)){
          callback(null, rows[0], null);
        } else {
          callback(null, null, 'Username/Email and Password does not match.');
        }
      })
      .catch((err) => {
        callback(err, null, null);
      });
    },

    // violates email username not unique
    createNewUser: function(obj, callback) {
      knex('users').insert({
        name: obj.name,
        email: obj.email,
        password: bcrypt.hashSync(obj.password, 10),
        username: obj.username
      })
      .then(() => {
        knex.select('id')
        .from('users')
        .where({username: obj.username})
        .then((rows) => {
          if(rows.length !== 0) {
            callback(null, rows[0], null);
          } else {
            callback(null, null, 'did not successfully insert');
          }
        })
      })
      .catch((err) => {
        callback(err, null, null);
      });
    }
  }
}
