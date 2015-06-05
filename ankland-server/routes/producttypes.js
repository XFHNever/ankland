/**
 * Created by xiefuheng on 15/6/5.
 */
var express = require('express');
var router = express.Router();

var ProductType = require('../models/producttype');

router.route('/')
    .get(function(req, res) {
        ProductType.find(null, null, {sort: {'order': 1, 'name': 1}}, function(err, productTypes) {
            if(err) {
                res.send(err);
            }

            res.json(productTypes);
        });
    })
    .post(function(req, res) {
        var productType = new ProductType();
        productType.name = req.body.name;
        productType.desc = req.body.desc;
        productType.order = req.body.order;

        productType.save(function(err, type) {
            if(err) {
                res.send(err);
            }
            res.json(type);
        });
    });

router.route('/:type_id')
    .put(function(req, res) {
        ProductType.findByIdAndUpdate(req.params.type_id, {name: req.body.name,desc: req.body.desc, order: req.body.order,
            modify_at: Date.now()}, function(err, productType) {
            if(err) {
                res.send(err);
            }
            res.json(productType);
        })
    })
    .delete(function(req, res) {  //delete a domain
        ProductType.findByIdAndRemove(req.params.type_id, function(err) {
            if(err) {
                res.send(err);
            }

            res.json({ message: 'Success'});
        });
    });


module.exports = router;

