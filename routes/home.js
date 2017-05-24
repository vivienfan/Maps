'use strict';

const express = require('express');
const router  = express.Router();

module.exports = (dataHelper) => {
  router.get('/', (req, res) => {
    res.render('../views/index');
  });

  router.post('/login', (req, res) => {
    let obj = {
      email: req.body.email,
      password: req.body.password
    }
    dataHelper.logIn(obj, (err, dbObj, msg) => {
      if (err) {
        res.status(500).json({error: err.message});
        return;
      }
      if (dbObj) {
        req.session.user_id = dbObj.uid;
        req.session.username = dbObj.username;
        req.session.email = dbObj.email;
        console.log(req.session.user_id);
        res.status(200).send();
      } else {
        res.status(403).send(msg);
      }
    });
  });

  router.post('/logout', (req, res) => {
    req.session.user_id = null;
    res.status(200).send();
  });

  router.post('/register', (req, res) => {
    let obj = {
      // name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    };
    dataHelper.createNewUser(obj, (err, dbObj, msg) => {
      if (err) {
        res.status(500).json({error: err.message});
        return;
      }
      if (dbObj) {
        req.session.user_id = dbObj.uid;
        req.session.username = dbObj.username;
        req.session.email = dbObj.email;
        res.status(200).send();
      } else {
        res.status(403).send(msg);
      }
    });
  });

  return router;
}
