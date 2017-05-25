'use strict';

const express = require('express');
const router  = express.Router();

module.exports = (dataHelper) => {

  // method: get
  // URL: /maps/:mid
  // client input: req.params
  // server output: err / mapInfo = { title: str, description: str }
  //
  // retrieve map info and all points belong to the map from db
  router.get('/:mid', (req, res) => {
    let mid = req.params.mid;
    dataHelper.getMapInfoByMapId(mid, (err, mapInfo) => {
      if (err) {
        res.status(400).send(err.message);
      } else {
        res.status(200).json(mapInfo);
      }
    });
  });

  // method: post
  // URL: /maps/new
  // client input: req.body = { lid: int, title: str, description: str }
  // server output: { mid: int }
  //
  // add a new map into maps table
  router.post('/new', (req,res) => {
    let obj = {
      lid: req.body.lid,
      title: req.body.title,
      description: req.body.description
    };
    dataHelper.addMap(obj, (err, mid) => {
      if (err) {
        res.status(400).send(err.message);
      } else {
        res.status(200).json(mid);
      }
    })
  });

  // method: put
  // URL: /maps/:mid
  // client input: req.body = { mid: int, title: str, description: str }
  // server output: err / none
  //
  // update map info in maps tatble
  router.put('/:mid', (req, res) => {
    let obj = {
      mid: req.body.mid,
      title: req.body.title,
      description: req.body.description
    };
    dataHelper.updateMapByMapId(obj, (err) => {
      if(err) {
        res.status(400).send(err.message);
      } else {
        res.status(200).send();
      }
    });
  });

  // method: delete
  // URL: /maps/:mid
  // client input: req.params
  // server output: err /  none
  //
  // delete map from maps table
  router.delete('/:mid', (req, res) => {
    let mid = req.params.mid;
    dataHelper.dropMap(mid, (err) => {
      if (err) {
        res.status(400).send(err.message);
      } else {
        res.status(200).send();
      }
    });
  });

  return router;
}
