import expenseTrackerService from "../services/expense_tracker.js";
import db from "../model/db.js";

let expenseTrackerServiceInstance = expenseTrackerService(db);

export default function expenseTrackerController() {
    async function homePage(req, res) {
        const categories = await expenseTrackerServiceInstance.allCategories();
        const categoryTotals = await expenseTrackerServiceInstance.categoryTotals();
        console.log("C totals ", categoryTotals)
        let totalExpenses = 0;
        for (let amount of categoryTotals) {
            totalExpenses += Number(amount.total_amount);
        }
        res.render("home", { categories, categoryTotals, totalExpenses });
    }
    
    async function addExpense(req, res) {
        const { amount, description, categoryId } = req.body;
        await expenseTrackerServiceInstance.addExpense(Number(amount), categoryId, description);
        res.redirect("/");
    }

    async function allExpenses(req, res) {
        const expenses = await expenseTrackerServiceInstance.allExpenses();
        res.render("expenses", { expenses });
    }

    async function expensesForCategory(req, res) {
        console.log("--- ", req.params.categoryId)
        const expenses = await expenseTrackerServiceInstance.expenseForCategory(req.params.categoryId);
        res.render("expensesForCategory", { expenses });
    }

    async function deleteExpense(req, res) {
        await expenseTrackerServiceInstance.deleteExpense(req.params.expenseId);
        res.redirect("/expenses");
    }

    return {
        homePage,
        addExpense,
        allExpenses,
        expensesForCategory,
        deleteExpense,
    };
}
