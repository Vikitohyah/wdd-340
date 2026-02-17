const express = require("express")
const router = new express.Router() 
const favoriteController = require("../controllers/favoriteController")
const utilities = require ("../utilities")


// Process to build favorite
router.get("/", 
    utilities.checkLogin,
    utilities.handleErrors(favoriteController.buildFavoriteView)
);

router.post("/add",
    utilities.checkLogin,
    utilities.handleErrors(favoriteController.addToFavorite))

router.post("/remove",
    utilities.checkLogin,
    utilities.handleErrors(favoriteController.removeFavorites)
) 
module.exports = router;