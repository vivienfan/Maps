'use strict';

const express = require('express');
const router  = express.Router();

module.exports = (dataHelper) => {

  // method: get
  // URL: /lists
  // client input: none
  // server output: err / { contribution: [], public: [] }
  // contribution, public = { l_id: int, title: str, description: str }
  //
  // main page, render all contributions
  // and all the rest public lists ordered by number of favourites
  router.get('/', (req, res) => {
    let uid = req.session.user_id;
    dataHelper.getAllContributionForUser(uid, (err, contributions) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        let arr = [];
        let contris = [];
        if (contributions) {
          contributions.forEach((element) => {
            arr.push(element.l_id);
            contris.push({title: element.title, descritpion:element.description});
          });
        }
        dataHelper.getAllPublicListsExcept(arr, (err, publics) => {
          if (err) {
            res.status(500).send(err.message);
          } else {
            res.status(200).json({contribution: contris, public: publics});
          }
        });
      }
    });
    // res.status(200);
  });


  // method: get
  // URL: /lists/:lid
  // client input: req.params
  // server output: err /
  //  {
  //    listInfo:     { title: str, description: str, public: bool },
  //    contributors: [ { username: str } ],
  //    maps:         [ { m_id: int, title: str, description: str } ]
  //  }
  //
  // list page, get the list info(title, description, access)
  // contributors and maps that belongs to the list
  router.get('/:lid', (req, res) => {
    let uid = req.session.user_id;
    let lid = req.params.lid;
    dataHelper.getListInfo(lid, (err, listInfo) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        dataHelper.getContributorName(lid, (err, contributors) => {
          if (err) {
            res.status(500).send(err.message);
          } else {
            dataHelper.getMapsByListId(lid, (err, maps) => {
              if (err) {
                res.status(500).send(err.message);
              } else {
                res.status(200).json({ listInfo: listInfo, contributors: contributors, maps: maps });
              }
            });
          }
        });
      }
    });
  });

  // method: delete
  // URL: /lists/:lid
  // client input: req.param
  // server output: err / none
  //
  // deletes the list from database
  // TODO: redirect?
  router.delete('/:lid', (req, res) => {
    dataHelper.dropList(lid, (err) => {
      if(err) {
        res.status(500).send(err.message);
      } else {
        res.status(200).send();
      }
    })
  });

  // method: post
  // URL: /lists/:id/addContributor
  // client input: req.param, req.body = { username: str }
  // server output: none
  //
  // add a new contributor into the contributions table
  router.post('/:lid/addContributor', (req, res) => {
    let obj = {
      username: req.body.username,
      lid: req.params.lid
    }
    dataHelper.addContributor(obj, (err) => {
      if(err) {
        res.status(500).send(err.message);
      } else {
        res.status(200).send();
      }
    });
  });

  // method: post
  // URL: /lists/new
  // client iput: req.body = { title: str, description: str, public: bool }
  // server output: { lid: int }
  //
  // add a new list into the lists table
  router.post('/new', (req, res) => {
    let obj = {
      title: req.body.title,
      description: req.body.description,
      public: req.body.public
    };
    dataHelper.addList(obj, (err, lid) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(200).json({ lid: lid });
      }
    });
  })

  return router;
}
