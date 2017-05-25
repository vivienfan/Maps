'use strict';

const express = require('express');
const router  = express.Router();

module.exports = (dataHelper) => {
  // method: get
  // URL: /profiles/:username
  // client input: req.param
  // server output: err / { email: str }
  //
  // retrieve user info from db
  router.get('/:username', (req, res) => {
    let username = req.params.username;
    dataHelper.getUserInfo(username, (err, obj) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        if (obj.length === 0) {
          res.status(400).send(`User ${username} does not exists`);
        } else {
          res.status(200).json(obj);
        }
      }
    });
  });


  return router;
}
