'use strict';

const express = require('express');
const router  = express.Router();

module.exports = (dataHelper) => {
  router.get('/', (req, res) => {
    let uid = req.session.user_id;
    dataHelper.getAllContributionForUser(uid, (err, contributions) => {
      if (err) {
        res.status(500).json({error: err.message});
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
            res.status(500).send(json({error: err.message}));
          } else {
            res.status(200).json({contribution: contris, public: publics});
          }
        });
      }
    });
  });

  router.get('/:lid', (req, res) => {
    let uid = req.session.user_id;
    let lid = req.params.lid;
    dataHelper.getListInfo(lid, (err, listInfo) => {
      if (err) {
        res.status(500).json({error: err.message});
      } else {
        dataHelper.getContributorName(lid, (err, contributors) => {
          if (err) {
            res.status(500).json({error: err.message});
          } else {
            dataHelper.getMapsByListId(lid, (err, maps) => {
              if (err) {
                res.status(500).json({error: err.message});
              } else {
                res.status(200).json({
                  listInfo: listInfo,
                  contributors: contributors,
                  maps: maps
                })
              }
            });
          }
        });
      }
    });
  });

  router.delete('/:lid', (req, res) => {
    dataHelper.dropList(lid, (err) => {
      if(err) {
        res.status(500).json({error: err.message});
      } else {
        res.status(200).send();
      }
    })
  });

  router.add('/:lid/add_contributor', (req, res) => {
    let obj = {
      username: req.body.username,
      lid: req.params.lid
    }
    dataHelper.addContributor(obj, (err) => {
      if(err) {
        res.status(500).send();
      } else {
        res.status(200).send();
      }
    });
  });

  router.post('/new', (req, res) => {

  })

  return router;
}
