const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  try{
    const classification_id = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classification_id)
    const grid = await utilities.buildClassificationGrid(data)
    let nav = await utilities.getNav()
    const className = data[0].classification_name
    res.render("./inventory/classification", {
      title: className + " vehicles",
      nav,
      grid,
    })
  } catch (err) {
    next (err)
  }
}

invCont.buildVehicleDetail = async function (req, res, next) {
  try {
    const inv_id = req.params.invId
    const vehicleData = await invModel.getItemByInventoryId(inv_id)
    const vehicleHTML = await utilities.buildVehicleDetailPage(vehicleData)
    let nav = await utilities.getNav()
    res.render("./inventory/detail", {
      title: `${vehicleData.inv_make} ${vehicleData.inv_model}`,
      nav,
      vehicleHTML,
    }) 
  } catch (err) {
    next(err)
  }
}

invCont.buildManagement = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/management", {
    title: "Management",
    nav,
    errors: null,
  })
}

/* ****************************************
*  Deliver Classification view
* *************************************** */
invCont.buildAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/add-classification", {
    title: "Add New Classification",
    nav,
    errors: null,
  })
}

invCont.addClassification= async function (req, res) {
  let nav = await utilities.getNav()
  const {classification_name} = req.body

  const result = await invModel.addToClassification(classification_name)
  
  if (result) {
    req.flash("notice", `Classification name ${classification_name} added successfully`)
    res.redirect("/inv/")

  } else {
    req.flash("notice", "Failed to add new classification")
    res.render("./inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: null,
    })
  }
}


/* ****************************************
*  Deliver Inventory view
* *************************************** */
invCont.buildAddInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  let classificationList = await utilities.buildClassificationList()

  res.render("./inventory/add-inventory", {
    title: "Add New Inventory",
    nav,
    classificationList,
    errors: null,
  })
}

invCont.addInventory = async function (req, res) {
  let nav = await utilities.getNav()
  let classificationList = await utilities.buildClassificationList(
    req.body.classification_id
  )

  try {
    const {
      classification_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color
    } = req.body

    console.log(JSON.stringify(req.body))

    const result = await invModel.addToInventory(
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id
    )

    if (result) {
      req.flash("notice", "Item added successfully")
      return res.redirect("/inv/")
    }

    throw new Error("Insert failed")

  } catch (error) {
    console.error("Controller addInventory error:", error)

    res.render("inventory/add-inventory", {
      title: "Add New Inventory",
      nav,
      classificationList,
      errors: [{ msg: "Database error. Please try again." }],
      ...req.body
    })
  }
}

invCont.errorTrigger = async function (req, res, next) {
  const err = new Error("Intentional 500 error for testing")
  err.status = 500
  next(err)
  
}

module.exports = invCont