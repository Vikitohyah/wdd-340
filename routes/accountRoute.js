// Needed Resources 
const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const utilities = require ("../utilities")
const Validate = require('../utilities/account-validation')

// Route to build Login page
router.get("/login", utilities.handleErrors(accountController.buildLogin))

// Route to build Registration page
router.get("/register", utilities.handleErrors(accountController.buildRegister))

// Route to build Account Mangement View
router.get("/",
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildManagement))


// Process the registration data
router.post(
  "/register",
  Validate.registrationRules(),
  Validate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)

// Process the login attempt
router.post(
  "/login",
  Validate.logInRules(),
  Validate.checkLogInData,
  utilities.handleErrors(accountController.logInAccount)
)

// Process to build update Account
router.get("/update-account",
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildUpdateAccount));

// Process updating account
router.post("/update-info/",
  Validate.accountUpdateRules(),
  Validate.checkAccountUpdate,
  utilities.handleErrors(accountController.updateAccountProcess)
);

// Process updating password
router.post("/update-password/",
  Validate.newPasswordRules(),
  Validate.checkNewPassword,
  utilities.handleErrors(accountController.updatePassword)
);

router.get("/logOut", utilities.handleErrors(accountController.buildLogOutView));

router.post("/logOut", utilities.handleErrors(accountController.logOut));

module.exports = router;