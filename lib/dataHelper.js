"use strict";

const bcrypt = require('bcrypt');

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(knex) {
  return {
    logIn: function(obj, callback) {
      console.log('-------------login:',obj);
      knex
      .select('id', 'username', 'email', 'password')
      .from('users')
      .where('email', obj.email)
      .then((rows) => {
        if (rows.length !== 0
          && bcrypt.compareSync(obj.password, rows[0].password)){
          callback(null, rows[0], null);
        } else {
          callback(null, null, 'Email and Password does not match.');
        }
      })
      .catch((err) => {
        callback(err, null, null);
      });
    },

    createNewUser: function(obj, callback) {
      console.log('-------------register:', obj);
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
          callback(null, rows[0], null);
        })
      })
      .catch((err) => {
        callback({message: `This email/username has already been registered` }, null, null);
      });
    },

    getAllPublicListsExcept: function(lids, callback) {
      console.log('-------------get all public lists:', lids);
      knex
      .select('title', 'description')
      .from('lists')
      .where('public', true)
      .whereNotIn('l_id', lids)
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

      console.log('-------------get all contributions:', uid);
      knex
      .select('l_id', 'title', 'description')
      .from('lists')
      .whereIn('l_id', function() {
        this
        .distinct('l_id')
        .from('contributions')
        .where('u_id', uid)
      })
      .then((rows) => {
        callback(null, rows);
      })
      .catch((err) => {
        callback(err, null);
      })
    },

    getAllFavouritesForUser: function(uid, callback) {
      console.log('-------------get all favourites:', uid);
      knex
      .select('title', 'description')
      .from('lists')
      .whereIn('l_id', function() {
        this.distinct('l_id')
        .from('favourites')
        .where('u_id', uid);
      })
      .then((rows) => {
        callback(null, rows);
      })
      .catch((err) => {
        callback(err, null);
      })
    },

    getContributionsByListId: function(lids, callback) {
      console.log('-------------get contribution by list id:', lid);
      knex
      .select('title', 'description')
      .from('lists')
      .whereIn('l_id', lids)
      .then((rows) => {
        callback(null, rows);
      })
      .catch((err) => {
        callback(err, null);
      });
    },

    getListInfo: function(lid, callback) {
      console.log('-------------get list info by id:', lid);
      knex
      .select('title', 'description', 'public')
      .from('lists')
      .where('l_id', lid)
      .then((rows) => {
        if (rows.length === 0) {
          callback({message: `List ${lid} does not exists.`}, null)
        }
        callback(null, rows[0]);
      })
      .catch((err) => {
        callback(err, null);
      })
    },

    getContributorName: function(lid, callback) {
      console.log('-------------get contributors name:', lid);
      knex
      .select('username')
      .from('users')
      .whereIn('id', function() {
        this
        .select('u_id')
        .from('contributions')
        .where('l_id', lid)
      })
      .then((rows) => {
        callback(null, rows);
      })
      .catch((err) => {
        callback(err, null);
      });
    },

    getMapsByListId: function(lid, callback) {
      console.log('-------------get maps by list id:', lid);
      knex
      .select('m_id', 'title', 'description')
      .from('maps')
      .where('l_id', lid)
      .then((rows) => {
        callbakc(null, rows);
      })
      .catch((err) => {
        callback(err, null);
      });
    },

    dropList: function(lid, callback) {
      console.log('-------------drop list:', lid);
      knex('lists')
      .where('l_id', lid) // all foregin keys are on delete cascade
      .del()
      .then(() => {
        callback(null);
      })
      .catch((err) => {
        callback(err);
      })
    },

    addContributor: function(obj, callback) {
      console.log('-------------add contributor:', obj);
      knex
      .select('id')
      .from('users')
      .where('username', obj.username)
      .then((rows) => {
        if(rows.lentgh === 0) {
          callback({message: `User ${obj.username} does not exits` });
          return;
        }
        knex('contributions')
        .insert({u_id: rows[0].id, l_id: obj.lid})
        .then(() => {
          callback(null);
        })
        .catch((err) => {
          callback(err);
        })
      })
      .catch((err) => {
        callback(err);
      })
    },

    addList: function(obj, callback) {
      console.log('-------------add list:', obj);
      knex
      .insert({title: obj.title, description: obj.description, public: obj.public})
      .then(() => {
        knex('lists').max('l_id')
        .then((rows) => {
          callback(null, rows[0].l_id);
        })
      })
      .catch((err) => {
        callback(err, null);
      });
    }


  }
}
