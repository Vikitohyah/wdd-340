const utilities = require("../utilities/")
const bcrypt = require("bcryptjs")
const accountModel = require("../models/account-model")

/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/login", {
    title: "Login",
    nav,
    errors: null,
  })
}

/* ****************************************
*  Deliver registration view
* *************************************** */
async function buildRegister(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/register", {
    title: "Register",
    nav,
    errors: null,
  })
}

/* ****************************************
*  Process Registration
* *************************************** */
async function registerAccount(req, res) {
  let nav = await utilities.getNav()
  const { account_firstname, account_lastname, account_email, account_password } = req.body

  // Hash the password before storing
  let hashedPassword
  try {
    // regular password and cost (salt is generated automatically)
    hashedPassword = bcrypt.hashSync(account_password, 10)
  } catch (error) {
    req.flash("notice", 'Sorry, there was an error processing the registration.')
    res.status(500).render("account/register", {
      title: "Registration",
      nav,
      errors: null,
    })
  }

  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    hashedPassword
  )

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'re registered ${account_firstname}. Please log in.`
    )
    res.status(201).render("account/login", {
      title: "Login",
      nav,
      errors: null,
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("account/register", {
      title: "Registration",
      nav,
      errors: null,
    })
  }
}

/* ****************************************
*  Process Login
* *************************************** */
async function logInAccount(req, res) {
  let nav = await utilities.getNav()
  const {account_email, account_password} = req.body

  const result = await accountModel.getAccountEmail(account_email)

  if (!result.rows.length) {
    req.flash("notice", `Invalid email or password`)
    return  res.status(400).render("account/login", {
        title: "Login",
        nav,
        errors: null,
    })

  } 
  const account = result.rows[0]
  const passwordMatch = await bcrypt.compare(account_password, account.account_password)
  if (!passwordMatch) {
    req.flash("notice", "Invalid password")
    res.status(400).render("account/login", {
      title: "Login",
      nav,
      errors: null,
    })
  }

  req.flash("notice, Welcome back!")
  res.redirect("/")
 
}

module.exports = { buildLogin, buildRegister, registerAccount, logInAccount}