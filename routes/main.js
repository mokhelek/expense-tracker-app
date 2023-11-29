import express from "express";
import expenseTrackerController from "../controller/main.js";

var router = express.Router();


let trackerControllerInstance = expenseTrackerController();

/*
    Bellow are the routes for navigating to the different pages and
    performing different requests
*/

router.get("/", trackerControllerInstance.homePage );
router.post("/", trackerControllerInstance.addExpense );
router.get("/expenses", trackerControllerInstance.allExpenses );
router.get("/expenses/:categoryId", trackerControllerInstance.expensesForCategory );
router.get("/delete/:expenseId", trackerControllerInstance.deleteExpense );


export default router;

