"use strict";

const bcrypt = require('bcrypt');

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(knex) {
  return {
    logIn: function(obj, callback) {
      console.log('login:',obj);
      knex
      .select('id', 'username', 'email', 'password')
      .from('users')
      .then((rows) => {
        if (rows.length !== 0
          && bcrypt.compareSync(obj.password, rows[0].password)){
          console.log("here");
          callback(null, rows[0], null);
        } else {
          callback(null, null, 'Username/Email and Password does not match.');
        }
      })
      .catch((err) => {
        callback(err, null, null);
      });
    },

    createNewUser: function(obj, callback) {
      console.log('register:', obj);
      knex('users')
      .insert({
        email: obj.email,
        password: bcrypt.hashSync(obj.password, 10),
        username: obj.username
      })
      .then(() => {
        knex.select('id', 'username', 'email')
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
    },

<<<<<<< HEAD
    getAllPublicListsExcept: function(lids, callback) {
      console.log('get all public lists:', lids);
      knex
      .select('title', 'description')
      .from('lists')
      .where('public', true)
      .whereNotIn(l_id, lids)
      // .orderBy('favs')
      .then((rows) => {
        callback(null, rows);
      })
      .catch((err) => {
        callback(err, null);
      });
    },

    getAllContributionForUser: function(uid, callback) {
      if(!uid) {
        callback(null, null);
      }

      console.log('get all contributions:', uid);
      knex
      .select('l_id', 'title', 'description')
      .from('lists')
      .whereIn(l_id, function() {
        this
        .distinct('l_id')
        .from('contributions')
        .where(u_id, uid)
      })
      .then((rows) => {
        callback(null, rows);
      })
      .catch((err) => {
        callback(err, null);
      })
    },

    getAllFavouritesForUser: function (uid, callback) {
      console.log('get all favourites:', uid);
      knex
      .select('title', 'description')
      .from('lists')
      .whereIn(l_id, function() {
        this.distinct('l_id')
        .from('favourites')
        .where(u_id, uid);
      })
      .then((rows) => {
        callback(null, rows);
      })
      .catch((err) => {
        callback(err, null);
      })
    },

    getContributionsByListId: function (lids, callback) {
      console.log('get contribution by list id:', lid);
      knex
      .select('title', 'description')
      .from('lists')
      .whereIn(l_id, lids)
      .then((rows) => {
        callback(null, rows);
      })
      .catch((err) => {
        callback(err, null);
      });
=======
    getAllListsForUser: function(username, callback) {
      knex('')
>>>>>>> 2e8f7b49836173513db04f26ef14a91fbb69e34c
    }
  }
}
