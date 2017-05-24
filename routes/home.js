'use strict';

const express = require('express');
const router  = express.Router();

module.exports = (dataHelper) => {

  router.post('/login', (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let input_password = req.body.password;
    dataHelper.logIn(username, email, password, (err, uid, msg) => {
      if (err) {
        res.status(500).json({error: err.message});
        return;
      }
      if (uid) {
        req.session.user_id = uid;
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
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    };
    dataHelper.createNewUser(obj, (err, uid, msg) => {
      if (err) {
        res.status(500).json({error: err.message});
        return;
      }
      if (uid) {
        req.session.user_id = uid;
        res.status(200).send();
      } else {
        res.status(403).send(msg);
      }
    });
  });

  return router;
}
