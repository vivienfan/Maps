'use strict';

const express = require('express');
const router  = express.Router();

module.exports = (dataHelper) => {

  // method: get
  // URL: /points/all/:mid
  // client input: req.params
  // server output: err / pointsInfo = [ {
  //        p_id: int,
  //        title: str,
  //        description: str,
  //        image: str,
  //        longitude: float,
  //        latitude: float
  //    } ]
  //
  // retrieve map info and all points belong to the map from db
  router.get('/all/:mid', (req, res) => {
    let mid = req.params.mid;
    dataHelper.getPointsByMapId(mid, (err, pointsInfo) => {
      if (err) {
        res.status(400).send(err.message);
      } else {
        res.status(200).json(pointsInfo);
      }
    });
  });

  // method: post
  // URL: /points/:mid/new
  // client input: req.params,
  //    req.body = {
  //      title: str,
  //      description: str,
  //      image: str,
  //      longitude: float,
  //      latitude: float
  //    }
  // server output: err / { p_id: int }
  //
  // add a new point into maps table
  router.post('/:mid/new', (req,res) => {
    let obj = {
       mid: req.params.mid,
       title: req.body.title,
       description: req.body.description,
       image: req.body.image,
       longitude: req.body.longitude,
       latitude: req.body.latitude
     }
    dataHelper.addPointToMap(obj, (err, pid) => {
      if (err) {
        res.status(400).send(err.message);
      } else {
        let obj = { pid: pid };
        res.status(200).json(obj);
      }
    })
  });

  // method: put
  // URL: /points/:pid
  // client input: req.params,
  //    req.body = {
  //      title: str,
  //      description: str,
  //      image: str,
  //      longtitude: float,
  //      latitude: float
  //    }
  // server output: err / none
  //
  // update points info in map_points table
  router.put('/:pid', (req, res) => {
    let obj = {
       pid: req.params.pid,
       title: req.body.title,
       description: req.body.description,
       image: req.body.image,
       longitude: req.body.longitude,
       latitude: req.body.latitude
     }
    dataHelper.updatePointByPointId(obj, (err) => {
      if(err) {
        res.status(400).send(err.message);
      } else {
        res.status(200).send();
      }
    });
  });

  // method: delete
  // URL: /points/:pid
  // client input: req.params
  // server output: err /  none
  //
  // delete points from map_points table
  router.delete('/:pid', (req, res) => {
    let pid = req.params.pid;
    dataHelper.dropPoint(pid, (err) => {
      if (err) {
        res.status(400).send(err.message);
      } else {
        res.status(200).send();
      }
    });
  });

  return router;
}
