'use strict';

const express = require('express');
const router  = express.Router();

module.exports = (dataHelper) => {
<<<<<<< HEAD
  router.get('/', (req, res) => {
    res.render('../views/index');
  });

  router.post('/login', (req, res) => {
    let obj = {
      email: req.body.email,
      password: req.body.password
    }
    dataHelper.logIn(obj, (err, dbObj, msg) => {
=======
  router.post('/login', (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let input_password = req.body.password;

    dataHelper.logIn(username, email, password, (err, uid, msg) => {
>>>>>>> 2e8f7b49836173513db04f26ef14a91fbb69e34c
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
<<<<<<< HEAD
      // name: req.body.name,
=======
>>>>>>> 2e8f7b49836173513db04f26ef14a91fbb69e34c
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    };
<<<<<<< HEAD
    dataHelper.createNewUser(obj, (err, dbObj, msg) => {
=======

    dataHelper.createNewUser(obj, (err, uid, msg) => {
>>>>>>> 2e8f7b49836173513db04f26ef14a91fbb69e34c
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
