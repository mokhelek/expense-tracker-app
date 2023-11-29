import expenseTrackerService from "../services/expense_tracker.js";
import db from "../model/db.js";

let expenseTrackerServiceInstance = expenseTrackerService(db);

export default function expenseTrackerController() {

    async function homePage(req, res) {
        const categories = await expenseTrackerServiceInstance.allCategories()
        res.render("home",{categories})
    }
    async function addExpense(req, res) {
        const { amount, description, categoryId  } = req.body;
        console.log(amount, categoryId, description);

        // const categories = await expenseTrackerServiceInstance.allCategories()
        res.redirect("/")
    }

    return {
        homePage,
        addExpense
    };
}