"use strict";

const bcrypt = require('bcrypt');

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(knex) {
  return {
    logIn: function(obj, callback) {
      console.log('Data Helper-------------login:',obj);
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
        console.error(err);
        callback(err, null, null);
      });
    },

    createNewUser: function(obj, callback) {
      console.log('Data Helper-------------register:', obj);
      knex('users')
      .insert({
        name: obj.username,
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
        console.error(err);
        callback({message: `This email/username has already been registered` }, null, null);
      });
    },

    getUserInfo: function(username, callback) {
      console.log('Data Helper-------------get user info:', username);
      knex
      .select('email')
      .from('users')
      .where('username', username)
      .then((rows) => {
        callback(null, rows[0]);
      })
      .catch((err) => {
        console.error(err);
        callback(err, null);
      })
    },

    getImagesForMap: function(mid, callback) {
      console.log('Data Helper-------------get images for map:', mid);
      return knex
        .select('image')
        .from('map_points')
        .where('m_id', mid)
        .whereNot('image', '')
        .whereNotNull('image')
        .then((rows) => {
          return new Promise((resolve) => {
            callback(null, rows);
            resolve();
          });
        })
        .catch((err)=> {
          console.error(err);
          callback(err, null);
        });
    },

    getImagesForList: function(lid, callback) {
      console.log('Data Helper-------------get all images for list:', lid);
      return knex
        .select('image')
        .from('map_points')
        .innerJoin('maps', 'maps.m_id', 'map_points.m_id')
        .where('l_id', lid)
        .whereNot('image', '')
        .whereNotNull('image')
        .then((rows) => {
          return new Promise((resolve) => {
            callback(null, rows);
            resolve();
          });
        })
        .catch((err) => {
          console.error(err);
          callback(err, null);
        });
    },

    getAllPublicLists: function(callback) {
      console.log('Data Helper-------------get all public lists');
      return knex
        .select('title', 'description', 'count', 'lists.l_id')
        .from('lists')
        .leftJoin(function() {
          this
          .select('l_id')
          .count('u_id as count')
          .from('favourites')
          .groupBy('l_id')
          .as('sub') }, 'lists.l_id', 'sub.l_id')
        .where('public', true)
        .orderByRaw('count DESC NULLS LAST')
        .then((rows) => {
          return new Promise((resolve) => {
            callback(null, rows);
            resolve();
          });
        })
        .catch((err) => {
          console.error(err);
          callback(err, null);
        });
    },

    getAllFavListIdByUid: function(uid, callback) {
      console.log('Data Helper-------------get all fav list id:', uid);
      return knex
        .select('l_id')
        .from('favourites')
        .where('u_id', uid)
        .then((rows) => {
          return new Promise((resolve) => {
            callback(null, rows);
            resolve();
          });
        })
        .catch((err) => {
          console.error(err);
          callback(err, null);
        });
    },

    getMapIdByListId: function(lid, callback) {
      console.log("Data Helper-------------get map id for list:", lid);
      return knex
        .select('m_id')
        .from('maps')
        .where('l_id', lid)
        .then((rows) => {
          return new Promise((resolve) => {
            callback(null, rows);
            resolve();
          });
        })
        .catch((err) => {
          console.error(err);
          callback(err, null);
        });
    },

    getAllFavouritesByUsername: function(username, callback) {
      console.log('Data Helper-------------get all favourites:', username);
      return knex
      .select('title', 'description', 'l_id')
      .from('lists')
      .whereIn('l_id', function() {
        this
        .distinct('l_id')
        .from('favourites')
        .where('u_id', function() {
          this
          .select('id')
          .from('users')
          .where('username', username)
        });
      })
      .then((rows) => {
        callback(null, rows);
      })
      .catch((err) => {
        console.error(err);
        callback(err, null);
      })
    },

    getContributionsByUsername: function(username, callback) {
      console.log('Data Helper-------------get contributions:', username);
      return knex
      .select('title', 'description', 'l_id')
      .from('lists')
      .whereIn('l_id', function() {
        this
        .select('l_id')
        .from('contributions')
        .where('u_id', function() {
          this
          .select('id')
          .from('users')
          .where('username', username)
        });
      })
      .then((rows) => {
        callback(null, rows);
      })
      .catch((err) => {
        console.error(err);
        callback(err, null);
      });
    },

    getListInfo: function(lid, callback) {
      console.log('Data Helper-------------get list info by id:', lid);
      knex
      .select('title', 'description', 'public', 'l_id')
      .from('lists')
      .where('l_id', lid)
      .then((rows) => {
        if (rows.length === 0) {
          callback({message: `List ${lid} does not exists.`}, null)
        }
        callback(null, rows[0]);
      })
      .catch((err) => {
        console.error(err);
        callback(err, null);
      })
    },

    getContributorName: function(lid, callback) {
      console.log('Data Helper-------------get contributors name:', lid);
      knex
      .select('username', 'id')
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
        console.error(err);
        callback(err, null);
      });
    },

    getMapsByListId: function(lid, callback) {
      console.log('Data Helper-------------get maps by list id:', lid);
      knex
      .select('m_id', 'title', 'description')
      .from('maps')
      .where('l_id', lid)
      .then((rows) => {
        callback(null, rows);
      })
      .catch((err) => {
        console.error(err);
        callback(err, null);
      });
    },

    dropList: function(lid, callback) {
      console.log('Data Helper-------------drop list:', lid);
      knex('lists')
      .where('l_id', lid) // all foregin keys are on delete cascade
      .del()
      .then(() => {
        callback(null);
      })
      .catch((err) => {
        console.error(err);
        callback(err);
      })
    },

    addContributor: function(obj, callback) {
      console.log('Data Helper-------------add contributor:', obj);
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
        .insert({
          u_id: rows[0].id,
          l_id: obj.lid
        })
        .then(() => {
          callback(null);
        })
        .catch((err) => {
          console.error(err);
          callback(err);
        })
      })
      .catch((err) => {
        console.error(err);
        callback(err);
      })
    },

    addList: function(obj, callback) {
      console.log('Data Helper-------------add list:', obj);
      knex('lists')
      .returning('l_id')
      .insert({
        title: obj.title,
        description: obj.description,
        public: obj.public
      })
      .then((rows) => {
        knex('contributions')
        .insert({
          u_id: obj.uid,
          l_id: rows[0]
        })
        .then(() => {
          callback(null, rows[0]);
        })
      })
      .catch((err) => {
        console.error(err);
        callback(err, null);
      });
    },

    getMapInfoByMapId: function(mid, callback) {
      console.log('Data Helper-------------get map info:', mid);
      return knex
        .select('title', 'description', 'l_id')
        .from('maps')
        .where('m_id', mid)
        .then((rows) => {
          callback(null, rows[0]);
        })
        .catch((err) => {
          console.error(err);
          callback(err, null);
        });
    },

    getPointsByMapId: function(mid, callback) {
      console.log('Data Helper-------------get points:', mid);
      knex
      .select('p_id', 'title', 'description', 'image', 'longitude', 'latitude')
      .from('map_points')
      .where('m_id', mid)
      .then((rows) => {
        callback(null, rows);
      })
      .catch((err) => {
        console.error(err);
        callback(err, null);
      })
    },

    addMap: function(obj, callback) {
      console.log('Data Helper-------------add map:', obj);

      knex('maps')
      .returning('m_id')
      .insert({
        l_id: obj.lid,
        title: obj.title,
        description: obj.description
      })
      .then((rows) => {
        callback(null, rows[0]);
      })
      .catch((err) => {
        console.error(err);
        callback(err, null);
      })
    },

    updateMapByMapId: function(obj, callback) {
      console.log('Data Helper-------------update map:', obj.mid);
      knex('maps')
      .where('m_id', obj.mid)
      .update( {
        title: obj.title,
        description: obj.description
      })
      .then(() => {
        callback(null);
      })
      .catch((err) => {
        console.error(err);
        callback(err);
      });
    },

    dropMap: function(mid, callback) {
      console.log('Data Helper-------------drop map:', mid);
      knex('maps')
      .where('m_id', mid) // all foregin keys are on delete cascade
      .del()
      .then(() => {
        callback(null);
      })
      .catch((err) => {
        console.error(err);
        callback(err);
      })
    },

    addPointToMap: function(obj, callback) {
      console.log('Data Helper-------------add point:', obj);

      knex('map_points')
      .returning('p_id')
      .insert({
        m_id: obj.mid,
        longitude: obj.longitude,
        latitude: obj.latitude,
        title: obj.title,
        description: obj.description,
        image: obj.image
      })
      .then((rows) => {
        callback(null, rows[0]);
      })
      .catch((err) => {
        console.error(err);
        callback(err, null);
      });
    },

    updatePointByPointId: function(obj, callback) {
      console.log('Data Helper-------------update point:', obj);
      knex('map_points')
      .returning('m_id')
      .where('p_id', obj.pid)
      .update({
        title: obj.title,
        description: obj.description,
        image: obj.image,
        longtitude: obj.longtitude,
        latitude: obj.latitude
      })
      .then((mid) => {
        callback(null, mid[0]);
      })
      .catch((err) => {
        console.error(err);
        callback(err, null);
      });
    },

    dropPoint: function(pid, callback) {
      console.log('Data Helper-------------drop point:', pid);
      knex('map_points')
      .returning(['m_id', 'title'])
      .where('p_id', pid)
      .del()
      .then((row) => {
        callback(null, row[0]);
      })
      .catch((err) => {
        console.error(err);
        callback(err, null);
      })
    },

    getListAccessByMapId: function(mid, callback) {
      console.log('Data Helper-------------get access by mid:', mid);
      return knex
        .select('public')
        .from('lists')
        .innerJoin('maps', 'lists.l_id', 'maps.l_id')
        .where('m_id', mid)
        .then((rows) => {
          callback(null, rows[0]);
        })
        .catch((err) => {
          console.error(err);
          callback(err, null);
        })
    },

    getContributorForMap: function(mid, callback) {
      console.log('Data Helper-------------get contributors for map:', mid);
      return knex
        .distinct('u_id')
        .from('contributions')
        .innerJoin('lists', 'contributions.l_id', 'lists.l_id')
        .innerJoin('maps', 'maps.l_id', 'lists.l_id')
        .where('m_id', mid)
        .then((rows) => {
          callback(null, rows);
        })
        .catch((err) => {
          console.error(err);
          callback(err, null);
        })
    },

    addFav: function(obj, callback) {
      console.log('Data Helper-------------add fav:', obj);
      knex('favourites')
      .insert({
        u_id: obj.uid,
        l_id: obj.lid
      })
      .then(() => {
        knex
        .count('u_id')
        .from('favourites')
        .where('l_id', obj.lid)
        .groupBy('l_id')
        .then((rows) => {
          callback(null, true, rows[0].count);
        })
        .catch((err) => {
          console.error(err);
          callback(err, null);
        });
      })
      .catch((err) => {
        knex('favourites')
        .where('u_id', obj.uid)
        .where('l_id', obj.lid)
        .del()
        .then(() => {
          knex
          .count('u_id')
          .from('favourites')
          .where('l_id', obj.lid)
          .groupBy('l_id')
          .then((rows) => {
            if (rows.length === 0) {
              callback(null, false, 0);
              return;
            }
            callback(null, false, rows[0].count);
          })
          .catch((err) => {
            callback(err, null);
          });
        })
        .catch((err) => {
          console.error(err);
          callback(err, null);
        })
      });
    },

    // username, lid
    dropContributor: function(obj, callback) {
      console.log('Data Helper-------------drop contributor:', obj);
      knex('contributions')
      .where('l_id', obj.lid)
      .whereIn('u_id', function() {
        this
        .select('id')
        .from('users')
        .where('username', obj.username)
      })
      .del()
      .then(() => {
        callback(null);
      })
      .catch((err) => {
        console.error(err);
        callback(err);
      })
    },

    getHistoryByMapId: function(mid, callback) {
      console.log('Data HelperData Helper-------------get history for map:', mid);
      knex()
      .select('timestamp', 'username', 'change')
      .from('history')
      .where('m_id', mid)
      .orderBy('timestamp', 'desc')
      .then((rows) => {
        callback(null, rows);
      })
      .catch((err) => {
        console.error(err);
        callback(err, null);
      });
    },

    addHistory: function(history) {
      console.log('Data Helper-------------add history:', history);
      knex('history')
      .insert({
        timestamp: history.timestamp,
        username: history.username,
        change: history.change,
        m_id: history.mid
      })
      .then();
    },

    dropHistory: function(mid) {
      console.log('Data Helper-------------drop history for map', mid);
      knex('history')
      .where('m_id', mid)
      .del()
      .then();
    }
  }
}
