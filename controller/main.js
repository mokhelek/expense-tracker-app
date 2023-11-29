import expenseTrackerService from "../services/expense_tracker.js";
import db from "../model/db.js";

let expenseTrackerServiceInstance = expenseTrackerService(db);

export default function expenseTrackerController() {
    async function homePage(req, res) {
        const categories = await expenseTrackerServiceInstance.allCategories();
        const categoryTotals = await db.any(`
            SELECT
                c.category_type,
                COALESCE(SUM(e.total), 0) AS total_amount
            FROM
                category c
            LEFT JOIN
                expense e ON c.id = e.category_id
            GROUP BY
                c.category_type, c.id
            ORDER BY
                c.id;
    `);
        res.render("home", { categories, categoryTotals });
    }
    async function addExpense(req, res) {
        const { amount, description, categoryId } = req.body;
        await expenseTrackerServiceInstance.addExpense(Number(amount), categoryId, description);
        res.redirect("/");
    }

    return {
        homePage,
        addExpense,
    };
}
