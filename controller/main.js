import expenseTrackerService from "../services/expense_tracker.js";
import db from "../model/db.js";

let expenseTrackerServiceInstance = expenseTrackerService(db);

export default function expenseTrackerController() {

    /*
    Function that renders the home page
    Fetch the data for categories
    Fetch the data for categoryTotals
    render the data to the home template
    */
    async function homePage(req, res) {
        const categories = await expenseTrackerServiceInstance.allCategories();
        const categoryTotals = await expenseTrackerServiceInstance.categoryTotals();
        console.log("C totals ", categoryTotals);
        let totalExpenses = 0;
        for (let amount of categoryTotals) {
            totalExpenses += Number(amount.total_amount);
        }
        res.render("home", { categories, categoryTotals, totalExpenses });
    }

    /*
        function for adding a new expense
        add amount, category ID and description
        Calculate the total for each expense
    */
    async function addExpense(req, res) {
        const { amount, description, categoryId } = req.body;
        await expenseTrackerServiceInstance.addExpense(Number(amount), categoryId, description);
        res.redirect("/");
    }


      /*
        function to retrieve all the expenses
        retrieve the category details and
        expense details
        and render the data to expenses template
    */
    async function allExpenses(req, res) {
        const expenses = await expenseTrackerServiceInstance.allExpenses();
        res.render("expenses", { expenses });
    }

      /*
        function to filter the expenses based on category
        get the category details and expenses details
        SUM the totals 
        and render the data to the expenseForCategory template
    */
    async function expensesForCategory(req, res) {
        const expenses = await expenseTrackerServiceInstance.expenseForCategory(req.params.categoryId);
        res.render("expensesForCategory", { expenses });
    }

      /*
        function to delete each expense
        delete the expense based on ID number
        and re-navigate back to the expenses page
    */
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
