const express = require("express");
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const IngredientsController = require('../controllers/ingredients-controller');

router.get("/", IngredientsController.ingredients_get_all)

router.post("/", IngredientsController.ingredients_create)

router.get("/:id", IngredientsController.ingredients_get_ingredient)

router.delete("/:id", IngredientsController.ingredients_delete)

module.exports = router;