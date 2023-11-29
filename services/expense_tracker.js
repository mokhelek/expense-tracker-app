export default function expenseTrackerService(db) {
    async function allExpenses() {
        const expenses = await db.any(`
            SELECT
                e.id as expense_id,
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
            category.id AS category_id,
            category.category_type,
            COALESCE(SUM(expense.total), 0) AS total_amount
            FROM
                category
            LEFT JOIN
                expense ON category.id = expense.category_id
            GROUP BY
                category.id, category.category_type
            ORDER BY
                category.id;
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

    async function deleteExpense(expenseID) {
         await db.none("DELETE FROM expense WHERE id = $1",[expenseID]);
    }

    async function expenseForCategory(categoryId) {
       
        const query = `
        SELECT
            e.id as expense_id,
            e.expense,
            c.category_type,
            e.total
        FROM
            expense e
        JOIN
            category c ON e.category_id = c.id 
        WHERE
            category_id = $1
        `;

        const expenses = await db.many(query, [categoryId]);

        return expenses;

    }



    return {
        allExpenses,
        allCategories,
        addExpense,
        categoryTotals,
        deleteExpense,
        expenseForCategory
        
    };
}
