'use strict';

const express = require('express');
const router  = express.Router();

module.exports = (dataHelper) => {

  // method: get
  // URL: /
  // client input: none
  // server output: none
  //
  // render index.ejs
  router.get('/', (req, res) => {
    res.render('../views/index');
  });

  // method: post
  // URL: /login
  // client input: req.body = { email: str, password: str }
  // server output: err / { username: str } / msg
  //
  // check if email and password matches with db
  // sets cookies if login success
  router.post('/login', (req, res) => {
    let obj = {
      email: req.body.email,
      password: req.body.password
    }
    dataHelper.logIn(obj, (err, dbObj, msg) => {
      if (err) {
        res.status(400).send(err.message);
        return;
      }
      if (dbObj) {
        req.session.user_id = dbObj.uid;
        req.session.username = dbObj.username;
        req.session.email = dbObj.email;
        console.log("-------------login: session.user_id", req.session.user_id);
        res.status(200).json({username: dbObj.username});
      } else {
        res.status(403).send(msg);
      }
    });
  });

  // method: post
  // URL: /logout
  // client input: none
  // server output: none
  //
  // clear the cookies for the user
  router.post('/logout', (req, res) => {
    req.session.user_id = null;
    req.session.username = null;
    req.session.email = null;
    res.status(200).send();
  });

  // method: post
  // URL: /register
  // client input: req.body = { username: str, email: str, password: str }
  // server output: err/none/msg
  //
  // add a new user into the db
  // sets cookies if register success
  router.post('/register', (req, res) => {
    let obj = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    };
    dataHelper.createNewUser(obj, (err, dbObj, msg) => {
      if (err) {
        res.status(403).send(err.message);
        return;
      }
      if (dbObj) {
        req.session.user_id = dbObj.uid;
        req.session.username = dbObj.username;
        req.session.email = dbObj.email;
        res.status(200).send();
      }
    });
  });

  return router;
}
