// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require ("../utilities")
invValidate = require("../utilities/inventory-validation")
accountController = require("../controllers/accountController")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build inventory by Vehicle detail view
router.get("/detail/:invId", invController.buildVehicleDetail);

// Route to test error
router.get("/error-tester", utilities.handleErrors(invController.errorTrigger));

// Route to build management
router.get("/", utilities.handleErrors(invController.buildManagement));

// Route to build Classification form
router.get("/add-classification",
  accountController.checkAccountType,
  utilities.handleErrors(invController.buildAddClassification));

// Route to build Inventtory form
router.get("/add-inventory",
  accountController.checkAccountType,
  utilities.handleErrors(invController.buildAddInventory));

// Process adding new classification
router.post(
  "/add-classification",
  accountController.checkAccountType,
  invValidate.classificationRules(),
  invValidate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
);

// Process adding new inventory
router.post(
  "/add-inventory",
  accountController.checkAccountType,
  invValidate.InventoryRules(),
  invValidate.checkInventoryData,
  utilities.handleErrors(invController.addInventory)
);

// gets inventory items in the table
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON));

// Process to update inventory
router.get("/edit/:inventory_id", utilities.handleErrors(invController.buildEditInventory));

// Process updating inventory
router.post("/update/",
  invValidate.newInventoryRules(),
  invValidate.checkUpdateData,
  utilities.handleErrors(invController.updateInventory)
);

// Process to delete inventory
router.get("/delete/:inventory_id", utilities.handleErrors(invController.buildDeleteInventory));

// Process deleting inventory
router.post("/delete/",
  utilities.handleErrors(invController.deleteInventory)
);


module.exports = router;