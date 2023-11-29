import express from "express";
import expenseTrackerController from "../controller/main.js";

var router = express.Router();


let trackerControllerInstance = expenseTrackerController();

router.get("/", trackerControllerInstance.homePage );
router.post("/", trackerControllerInstance.addExpense );


export default router;

