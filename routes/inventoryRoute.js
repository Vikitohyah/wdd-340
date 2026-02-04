// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require ("../utilities")
invValidate = require("../utilities/management-validation")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build inventory by Vehicle detail view
router.get("/detail/:invId", invController.buildVehicleDetail);

// Route to test error
router.get("/error-tester", utilities.handleErrors(invController.errorTrigger));

// Route to build management
router.get("/", utilities.handleErrors(invController.buildManagement));

// Route to build Classification form
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification));

// Route to build Inventtory form
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory));

// Process the registration data
router.post(
  "/add-classification",
  invValidate.classificationRules(),
  invValidate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
)

router.post(
  "/add-inventory",
  invValidate.InventoryRules(),
  invValidate.checkInventoryData,
  utilities.handleErrors(invController.addInventory)
)

module.exports = router;