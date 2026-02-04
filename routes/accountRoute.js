// Needed Resources 
const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const utilities = require ("../utilities")
const regValidate = require('../utilities/account-validation')

// Route to build Login page
router.get("/login", utilities.handleErrors(accountController.buildLogin))

// Route to build Registration page
router.get("/register", utilities.handleErrors(accountController.buildRegister))

// Process the registration data
router.post(
  "/register",
  regValidate.registrationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)

// Process the login attempt
router.post(
  "/login",
  regValidate.logInRules(),
  regValidate.checkLogInData,
  utilities.handleErrors(accountController.logInAccount)
)

module.exports = router;