'use strict';

const express = require('express');
const router  = express.Router();

module.exports = (dataHelper, utility) => {

  // method: get
  // URL: /lists
  // client input: none
  // server output: err / { publics:[], favs: [] }
  //  publics = [{ l_id: int, title: str, description: str, img: [ { src: str } ] }]
  //  favs = [ {l_id: int }]
  //
  // main page, get all public lists ordered by number of favourites
  router.get('/', (req, res) => {
    let promises = [];
    let uid = req.session.user_id;
    let resObj = {
      publics: null,
      favs: null
    };

    dataHelper.getAllPublicLists((err, publics) => {
      if (err) {
        res.status(500).send(err.message);
        return;
      }
      resObj.publics = publics;
      publics.forEach((element) => {
        promises.push(dataHelper.getImagesForList(element.l_id, (err, imgs) =>{
          if (err) {
            res.status(500).send(err.message);
            return;
          }
          element.img = imgs;
        }));
      });
      if (uid) {
        promises.push(dataHelper.getAllFavListIdByUid(uid, (err, favs) => {
          if (err) {
            res.status(500).send(err.message);
            return;
          }
          resObj.favs = favs;
        }))
      }
      Promise.all(promises)
      .then(() => {
        console.log(resObj);
        res.status(200).json(resObj);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(err.message);
      })
    });
  });

  // method: get
  // URL: /lists/fav/:uid
  // client input: res.params
  // server output: err / [{ l_id: int, title: str, description: str }]
  //
  // profile page, get all favourited lists belong to user
  router.get('/fav/:uid', (req, res) => {
    let uid = req.params.uid;
    dataHelper.getAllFavouritesForUser(uid, (err, favs) => {
      if (err) {
        res.status(400).send(err.message);
        return;
      }
      res.status(200).json(favs);
    });
  });

  // progile page contribution_list (list object)
  // method: get
  // URL: /lists/contributions/:uid
  // client input: res.params
  // server output: err / [{l_id: int, title: str, description: str }]
  //
  // profile page, get all contribution lists belong to user
  router.get('/contributions/:uid', (req, res) => {
    let uid = req.params.uid;
    dataHelper.getContributionsByUserId(uid, (err, contrs) => {
      if (err) {
        res.status(400).send(err.message);
        return;
      }
      res.status(200).json(contrs);
    });
  })

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
        res.status(400).send(err.message);
        return;
      }
      dataHelper.getContributorName(lid, (err, contributors) => {
        if (err) {
          res.status(400).send(err.message);
          return;
        }
        let isContributor = utility.isAContributor(uid, contributors);
        console.log(isContributor);
        if (listInfo.public || isContributor) {
          dataHelper.getMapsByListId(lid, (err, maps) => {
            if (err) {
              res.status(400).send(err.message);
              return;
            }
            var tempVar = {
              maps: maps,
              listInfo: listInfo,
              contributors: contributors,
              canEdit: isContributor
            }
            res.render("../views/lists", tempVar);
            return;
          });
        } else {
          res.status(403).send();
        }
      });
    });
  });

  // method: get
  // URL: /lists/:lid/get-img
  // client input: req.params
  // server output: [ { m_id: int, img: [ { image: str } ] } ]
  //
  // lists page, get all the images of each map
  router.get('/:lid/get-img', (req, res) => {
    let lid = req.params.lid;
    let promises = [];
    dataHelper.getMapIdByListId(lid, (err, maps) => {
      if (err) {
        res.status(500).send(err.message);
        return;
      }
      maps.forEach((element) => {
        promises.push(dataHelper.getImagesForMap(element.m_id, (err, imgs) => {
          if (err) {
            res.status(500).send(err.message);
            return;
          }
          element.img = imgs;
        }));
      });
      Promise.all(promises)
      .then(() => {
        console.log(maps);
        res.status(200).json(maps);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      })
    })
  })


  // method: post
  // URL: /lists/add-fav
  // client input: { lid: int }
  // server output: err / { action: bool, count: int }
  //
  // store favourites
  router.post('/add-fav', (req, res) => {
    let obj = {
      lid: req.body.lid,
      uid: req.session.user_id
    };
    dataHelper.addFav(obj, (err, toFav, counts) => {
      if (err) {
        res.status(500).send(err.message);
        return;
      }
      let resObj = {
        toFav: toFav,
        counts: counts
      }
      res.status(200).json(resObj);
    });
  })

  // method: delete
  // URL: /lists/:lid
  // client input: req.param
  // server output: err / none
  //
  // deletes the list from database
  router.delete('/:lid', (req, res) => {
    let lid = req.params.lid;
    dataHelper.dropList(lid, (err) => {
      if(err) {
        res.status(400).send(err.message);
        return;
      }
      res.status(200).send();
    })
  });

  // URL: /lists/:lid/dropContributor
  router.delete('/:lid/dropContributor', (req, res) => {
    let obj = {
      username: req.body.username,
      lid: req.params.lid
    }
    console.log(obj);
      dataHelper.dropContributor(obj, (err) => {
      if (err) {
        res.status(400).send(err.message);
        return;
      }
      res.status(200).send();
    })
  });

  // method: post
  // URL: /lists/:lid/addContributor
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
        res.status(400).send(err.message);
        return;
      }
      res.status(200).send();
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
      public: req.body.public,
      uid: req.session.user_id
    };
    dataHelper.addList(obj, (err, lid) => {
      if (err) {
        res.status(400).send(err.message);
        return;
      }
      res.status(200).json({ lid: lid });
    });
  })

  return router;
}
