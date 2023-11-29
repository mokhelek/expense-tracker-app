import express from "express";
import expenseTrackerController from "../controller/main.js";

var router = express.Router();


let trackerControllerInstance = expenseTrackerController();

router.get("/", trackerControllerInstance.homePage );
router.post("/", trackerControllerInstance.addExpense );
router.get("/expenses", trackerControllerInstance.allExpenses );
router.get("/delete/:expenseId", trackerControllerInstance.deleteExpense );


export default router;

