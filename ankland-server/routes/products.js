/**
 * Created by xiefuheng on 15/6/5.
 */
var express = require('express');
var router = express.Router();

var Product = require('../models/product');

router.route('/')
    .get(function(req, res) {
        Product.find(null, null, {sort: {'order': 1, 'name': 1}}, function(err, products) {
            if(err) {
                res.send(err);
            }

            res.json(products);
        });
    })
    .post(function(req, res) {
        var product = new Product();
        product.name = req.body.name;
        product.desc = req.body.desc;
        product.img = req.body.img;
        product.type = req.body.type;
        product.order = req.body.order;
        product.create_at = product.modify_at = Date.now();

        product.save(function(err, type) {
            if(err) {
                res.send(err);
            }
            res.json(type);
        });
    });

router.route('/:product_id')
    .get(function(req, res) {
        Product.findById(req.params.product_id, function(err, product) {
            if(err) {
                res.send(err);
            }

            res.json(product);
        });
    })
    .put(function(req, res) {
        Product.findByIdAndUpdate(req.params.product_id, {name: req.body.name,desc: req.body.desc, img: req.body.img,
            type: req.body.type, order: req.body.order, modify_at: Date.now()}, function(err, product) {
            if(err) {
                res.send(err);
            }
            res.json(product);
        })
    })
    .delete(function(req, res) {  //delete a domain
        Product.findByIdAndRemove(req.params.product_id, function(err) {
            if(err) {
                res.send(err);
            }

            res.json({ message: 'Success'});
        });
    });


module.exports = router;

