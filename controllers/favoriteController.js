const utilities = require("../utilities/")
const favoriteModel = require("../models/favorite-model")
require("dotenv").config()

async function buildFavoriteView(req, res, next) {
  const accountId = res.locals.accountData.account_id
  console.log("check Fav:", accountId )
  let nav = await utilities.getNav()

  if (!accountId) {
    req.flash("notice", "Please log in.");
    return res.redirect("/account/login");
  }
  const favorites = await favoriteModel.getFavoritesByAccount(accountId)
  res.render("account/favorites", {
    title: "My Favorite Cars",
    nav,
    favorites,
    errors: null
  })
  
}

async function addToFavorite(req, res, next) {
  let nav = await utilities.getNav()

  const account_id = res.locals.accountData.account_id
  console.log("check Add Fav:", account_id )
  const {inv_id} = req.body

  const exists = await favoriteModel.checkIFavoriteExists(account_id, inv_id)

  if (exists > 0) {
    req.flash("notice", "This vehicle is already in your favorites ❤️")
    res.redirect("/account/")
  }

  const result = await favoriteModel.addFavorite(account_id, inv_id)
  console.log("Addition", result )

  if (result) {
    req.flash("notice", "Item added to favorites ❤️")
    res.redirect("/account/")
  } else {
    req.flash("notice", "Sorry, Couldn't add to favorite.")
    return res.redirect("/account/", {
      title: "Add To Favorite",
      nav,
      errors: null
    })
  }
  
}

async function removeFavorites(req, res, next) {
  let nav = await utilities.getNav()

  const account_id = res.locals.accountData.account_id
  const {inv_id} = req.body

  const deleteResult = await favoriteModel.removeFromFavorite(account_id, inv_id)

  if (deleteResult) {
    req.flash("notice", "The item was successfully removed from favorites.")
    res.redirect("/account/")
    
  } else {
    req.flash("notice", "Sorry, the delete failed.")
    res.redirect("/account/favorites", {
      title: "My Favorite Cars",
      nav,
      errors: null
    })
  }
  
}

module.exports = { buildFavoriteView, addToFavorite, removeFavorites}