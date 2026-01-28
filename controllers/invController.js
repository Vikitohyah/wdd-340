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

invCont.errorTrigger = async function (req, res, next) {
  const err = new Error("Intentional 500 error for testing")
  err.status = 500
  next(err)
  
}

module.exports = invCont