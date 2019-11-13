const mongoose = require("mongoose");
const Ingredient = require("../models/ingredient-model");


exports.ingredients_get_all = (req, res, next) => {
    Ingredient.find()
        // .select(" _id")
        .exec()
        .then(docs => {
            // const response = {
            //    ingredients: docs.map(doc => {
            //         return {
            //             name: doc.name,
            //             quantity: doc.quantity,
            //             unitType: doc.unitType,
            //             _id: doc._id,
            //         }
            //     })
            // };
            console.log(docs)
            if (docs.length > 0) {
                res.status(200).json(docs);
            } else {
                res.status(404).json({
                    message: 'No entries found'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};



exports.ingredients_create = (req, res, next) => {
  console.log(req.body)

    const ingredient = new Ingredient({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        quantity: req.body.quantity,
        unitType: req.body.unitType,
    });

    ingredient
        .save()
        .then(result => {
            res.status(201).json({
                message: "Ingredient created!",
                ingredient: {
                    name: result.name,
                    _id: result._id,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/ingredient/" + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.ingredients_get_ingredient = (req, res, next) => {
    const id = req.params.id;
    Ingredient.findById(id)
      .select("ingredient _id unitType")
      .exec()
      .then(doc => {
        if (doc) {
          res.status(200).json({
            ingredient: doc,
            request: {
              type: "GET",
              url: "http://localhost:3000/recipes"
            }
          });
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  };

  exports.ingredients_delete = (req, res, next) => {
    const id = req.params.id;
    Ingredient.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "Ingredient deleted",
          request: {
            type: "POST",
            url: "http://localhost:3000/recipes"
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };