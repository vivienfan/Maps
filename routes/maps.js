'use strict';

const express = require('express');
const router  = express.Router();

module.exports = (dataHelper, utility) => {

  // method: get
  // URL: /maps/:mid
  // client input: req.params
  // server output: err / mapInfo = { title: str, description: str }
  //
  // retrieve map info and all points belong to the map from db
  router.get('/:mid', (req, res) => {
    let mid = req.params.mid;
    let uid = req.session.user_id;
    let canEdit = false;
    dataHelper.getMapInfoByMapId(mid, (err, mapInfo) => {
      if (err) {
        res.status(500).send(err.message);
        return;
      }
      if (!mapInfo || mapInfo.length === 0){
        res.status(404).send();
        return;
      }
      dataHelper.getListAccessByMapId(mid, (err, view) => {
        if(err) {
          res.status(500).send(err.message);
          return;
        }
        dataHelper.getContributorForMap(mid, (err, contrs) => {
          if (err) {
            res.status(500).send(err.message);
            return;
          }
          if (uid && utility.isAContributor(uid, contrs)){
            canEdit = true;
          }
          if (!(view.public || canEdit)) {
            res.status(403).send();
            return;
          }
          let tempVar = {
            lid: mapInfo.l_id,
            mid: mid,
            title: mapInfo.title,
            description: mapInfo.description,
            canEdit: canEdit
          }
          res.render("../views/maps", tempVar);
        });
      });
    });
  });

  router.get('/:mid/history', (req, res) => {
    let mid = req.params.mid;
    dataHelper.getHistoryByMapId(mid, (err, history) => {
      if (err) {
        res.status(500).send(err.message);
        return;
      }
      res.status(200).json(history);
    })
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
    let timestamp = new Date();
    dataHelper.addMap(obj, (err, mid) => {
      if (err) {
        res.status(400).send(err.message);
      } else {
        res.status(200).json({ mid: mid });
        let history = {
          timestamp: new Date(),
          username: req.session.username,
          change: "created this map",
          mid: mid
        }
        dataHelper.addHistory(history);
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
        dataHelper.dropHistory(mid);
      }
    });
  });

  return router;
}
