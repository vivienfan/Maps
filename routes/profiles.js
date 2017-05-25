'use strict';

const express = require('express');
const router  = express.Router();

module.exports = (dataHelper) => {
  router.get('/:username', (req, res) => {
    dataHelper.getUserInfo()
  });


  return router;
}
