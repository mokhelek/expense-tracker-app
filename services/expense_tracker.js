export default function expenseTrackerService(db) {
    async function allExpenses() {
        const expenses = await db.any(`
            SELECT
                e.expense,
                c.category_type,
                e.total
            FROM
                expense e
            JOIN
                category c ON e.category_id = c.id;
            `);

            return expenses;
    }

    async function allCategories() {
        const categories = await db.many("SELECT * FROM category");
        return categories;
    }

    async function categoryTotals() {
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

        return categoryTotals;
    }

    async function addExpense(amount, categoryId, description) {
        const categoryQuantity = {
            1: 4,
            2: 1,
            3: 5,
            4: 2,
            5: 1,
            6: 30,
        };
        await db.none("INSERT INTO expense(amount, category_id, expense, total) VALUES($1, $2, $3, $4)", [amount, categoryId, description, amount * categoryQuantity[categoryId]]);
    }

    return {
        allExpenses,
        allCategories,
        addExpense,
        categoryTotals,
    };
}
