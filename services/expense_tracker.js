
export default function expenseTrackerService(db) {
 
    async function allExpenses() {

    }
    async function allCategories() {
        const categories = await db.many("SELECT * FROM category");
        return categories ;
    }

    async function addExpense(amount, categoryId, description) {
        const categoryQuantity = {
            1:4,
            2:1,
            3:5,
            4:2,
            5:1,
            6:30
        }
        await db.none("INSERT INTO expense(amount, category_id, expense, total) VALUES($1, $2, $3, $4)", [amount, categoryId, description, (amount * categoryQuantity[categoryId]) ]);
    }

    return {
        allExpenses,
        allCategories,
        addExpense,
    };
}