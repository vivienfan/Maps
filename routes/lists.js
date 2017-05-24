'use strict';

const express = require('express');
const router  = express.Router();

module.exports = (dataHelper) => {
  router.get('/', (req, res) => {
    let username = req.body.username;

    dataHelper.getAllLists(username, (err, obj) => {
      if (err) {
        res.status(500).send();
      } else {
        res.status(200).json(obj);
      }
    });
  });

  return router;
}
