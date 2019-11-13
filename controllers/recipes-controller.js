const mongoose = require("mongoose");
const Recipe = require("../models/recipe-model");
const Ingredient = require("../models/ingredient-model");

exports.recipes_get_all = (req, res, next) => {
  Recipe.find()
    .select("name description recipeImage category isBreadMachine prepTime cookTime _id ingredients instructions")
    .exec()
    .then(docs => {
      const response = docs.map(doc => {
          return {
            name: doc.name,
            description: doc.description,
            recipeImage: doc.recipeImage,
            category: doc.category,
            isBreadMachine: doc.isBreadMachine,
            prepTime: doc.prepTime,
            cookTime: doc.cookTime,
            instructions: doc.instructions,
            ingredients: doc.ingredients,
            _id: doc._id,
          }
        })


      // const response = {
      //   count: docs.length,
      //   recipes: docs.map(doc => {
      //     return {
      //       name: doc.name,
      //       description: doc.description,
      //       recipeImage: doc.recipeImage,
      //       category: doc.category,
      //       isBreadMachine: doc.isBreadMachine,
      //       prepTime: doc.prepTime,
      //       cookTime: doc.cookTime,
      //       _id: doc._id,
      //       // request: {
      //       //   type: "GET",
      //       //   url: "http://localhost:3000/recipes/" + doc._id
      //       // }
      //     };
      //   })
      // };
      if (docs.length > 0) {
        res.status(200).json(response);
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

exports.recipes_create = (req, res, next) => {

  console.log(req.body)
  const recipe = new Recipe({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,
    // recipeImage: req.file.path,
    recipeImage: req.body.recipeImage,
    category: req.body.category,
    isBreadMachine: req.body.isBreadMachine,
    prepTime: req.body.prepTime,
    cookTime: req.body.cookTime,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions
  });
  console.log('80', recipe.ingredients)
  recipe
    .save()
    .then(result => {
    //   console.log(result);
      res.status(201).json({
        message: "Created recipe successfully",
        createdProduct: {
          name: result.name,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:3000/recipe/" + result._id
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

exports.recipes_get_recipe = (req, res, next) => {
  const id = req.params.id;
  Recipe.findById(id)
    .select("name description _id category recipeImage isBreadMachine prepTime cookTime ingredients instructions")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
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

exports.recipe_update = (req, res, next) => {
  console.log(req.body)
  const id = req.params.id;
  
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  console.log(id)
  console.log(updateOps)
  Recipe.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result)
      res.status(200).json({
        message: "Product updated",
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.recipes_delete = (req, res, next) => {
  const id = req.params.id;
  Recipe.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Recipe deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/recipes",
          body: { name: "String", description: "String" }
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

