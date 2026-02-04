const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}
const inventoryModel = require("../models/inventory-model")

validate.classificationRules = () => {
    return [
        body("classification_name")
        .trim()
        .isAlphanumeric()
        .withMessage("No spaces or special characters allowed.")
        .custom(async (classification_name) =>{
            const classificationExists = await inventoryModel.checkClassificationExists(classification_name)
            if (classificationExists > 0){
                throw new Error(`Classification name ${classification_name} already exists`)
            }
        })
    ]
}

validate.checkClassificationData = async (req, res, next) => {
  const {classification_name } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("inventory/add-classification", {
      errors,
      title: "Add Classification",
      nav,
      classification_name,
    })
    return
  }
  next()
}

validate.InventoryRules = () => {
  return [
    // firstname is required and must be string
    body("inv_make")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("Please provide car make."), // on error this message is sent.

    // lastname is required and must be string
    body("inv_model")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("Please provide car model."), // on error this message is sent.
    
    // lastname is required and must be string
    body("inv_year")
        .notEmpty()
        .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
        .withMessage("Please provide a valid year."),
    
        // lastname is required and must be string
    body("inv_description")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 2 })
      .withMessage("Please provide a description."), // on error this message is sent.
    
    // lastname is required and must be string
    body("inv_image")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 2 })
      .withMessage("Please provide a valid image path."), // on error this message is sent.

    body("inv_thumbnail")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 2 })
      .withMessage("Please provide a valid thumbnail path."), // on error this message is sent.
    
      // lastname is required and must be string
    body("inv_price")
        .notEmpty()
        .isFloat({ min: 0 })
        .withMessage("Please provide a valid price."),
   
    // lastname is required and must be string
    body("inv_miles")
        .notEmpty()
        .isInt({ min: 0 })
        .withMessage("Please provide valid mileage."),
    
    // lastname is required and must be string
    body("inv_color")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 2 })
      .withMessage("Please provide a valid color."), // on error this message is sent.

    body("classification_id")
        .notEmpty()
        .isInt()
        .withMessage("Please select a classification.")
   
  ]
}

validate.checkInventoryData = async (req, res, next) => {
  const {inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    let classificationList = await utilities.buildClassificationList(req.body.classification_id)
    res.render("inventory/add-inventory", {
      errors,
      title: "Add New Inventory",
      nav,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classificationList,
    })
    return
  }
  next()
}


module.exports = validate