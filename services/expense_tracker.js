
export default function expenseTrackerService(db) {

    async function allExpenses() {

    }
    async function allCategories() {
        const categories = await db.many("SELECT * FROM category");
        return categories ;
    }

    async function addExpense(amount, categoryId, description) {
        await db.none("INSERT INTO expense(amount, category_id, expense) VALUES($1, $2, $3)", [amount, categoryId, description]);
    }

    return {
        allExpenses,
        allCategories,
        addExpense,
    };
}