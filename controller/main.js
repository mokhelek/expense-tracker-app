import expenseTrackerService from "../services/expense_tracker.js";
import db from "../model/db.js";

let expenseTrackerServiceInstance = expenseTrackerService(db);

export default function expenseTrackerController() {

    async function allExpenses(req, res) {
        res.render("home")
    }

    return {
        allExpenses,
    };
}