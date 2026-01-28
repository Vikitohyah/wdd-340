// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require ("../utilities")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build inventory by Vehicle detail view
router.get("/detail/:invId", invController.buildVehicleDetail);

// Route to test error
router.get("/error-tester", utilities.handleErrors(invController.errorTrigger)
);

module.exports = router;