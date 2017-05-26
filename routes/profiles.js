'use strict';

const express = require('express');
const router  = express.Router();

module.exports = (dataHelper) => {
  // method: get
  // URL: /profiles/:username
  // client input: req.param
  // server output: none
  //
  // render to profile page
  router.get('/:username', (req, res) => {
    let username = req.params.username;
    let email = req.params.email;
    let contribution = [];
    let favourite = [];

    dataHelper.getAllFavouritesByUsername(username, (err, favs) => {
      if(err) {
        res.status(400).send(err);
        return;
      }
      favourite = favs;
    })
    .then(() => {
      console.log('get all contribution');
      return dataHelper.getContributionsByUsername(username, (err, contrs) => {
        if(err) {
          res.status(400).send(err);
          return;
        }
        contribution = contrs;
      })
    })
    .then(() => {
      console.log('render page');
      let tempVar = {
        favouriteLists: favourite,
        contributedLists: contribution
      };
      console.log(tempVar);
      res.render('../views/profile', tempVar);
    })
    .catch((err) => {
      return;
    });
  });


  return router;
}
