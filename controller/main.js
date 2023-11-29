import expenseTrackerService from "../services/expense_tracker.js";
import db from "../model/db.js";

let expenseTrackerServiceInstance = expenseTrackerService(db);

export default function expenseTrackerController() {
    async function homePage(req, res) {
        const categories = await expenseTrackerServiceInstance.allCategories();
        const categoryTotals =  await expenseTrackerServiceInstance.categoryTotals()
        res.render("home", { categories, categoryTotals });
    }
    async function addExpense(req, res) {
        const { amount, description, categoryId } = req.body;
        await expenseTrackerServiceInstance.addExpense(Number(amount), categoryId, description);
        res.redirect("/");
    }

    async function allExpenses(req, res) {
        const expenses = await expenseTrackerServiceInstance.allExpenses();
        res.render("expenses", {expenses});
    }

    async function deleteExpense(req, res) {
        console.log("--- ", req.params.expenseId)
        await expenseTrackerServiceInstance.deleteExpense(req.params.expenseId);
        res.redirect("/expenses")
    }

    return {
        homePage,
        addExpense,
        allExpenses,
        deleteExpense
    };
}
