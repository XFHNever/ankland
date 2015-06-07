var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.route('/')
    .get(function(req, res) {
      User.find(null, null, {sort: {'name': 1}}, function(err, users) {
        if(err) {
          res.send(err);
        }

        res.json(users);
      });
    })
    .post(function(req, res) {
      var user = new User();
      user.name = req.body.name;
      user.password = req.body.password;
      user.role = req.body.role;

      user.save(function(err, type) {
        if(err) {
          res.send(err);
        }
        res.json(type);
      });
    });

router.route('/:user_id')
    .put(function(req, res) {
      User.findByIdAndUpdate(req.params.user_id, {name: req.body.name,password: req.body.password }, function(err, user) {
        if(err) {
          res.send(err);
        }
        res.json(user);
      })
    })
    .delete(function(req, res) {  //delete a domain
      User.findByIdAndRemove(req.params.user_id, function(err) {
        if(err) {
          res.send(err);
        }

        res.json({ message: 'Success'});
      });
    });

router.route('/login/')
    .post(function(req, res) {
        User.findOne({name: req.body.name,password: req.body.password }, function(err, user) {
            if(err) {
                res.send(err);
            }
            req.session.user = user;
            res.json(user);
        });
    });

module.exports = router;
