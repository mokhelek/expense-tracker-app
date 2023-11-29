import assert from "assert";
import pgPromise from "pg-promise";
import "dotenv/config";
import expenseTrackerService from "../services/expense_tracker.js";

const connection = process.env.DATABASE_URL_TEST;
const db = pgPromise()(connection);
db.connect();

let expenseTrackerServiceInstance = expenseTrackerService(db);

describe("Unit tests for Expense Tracker ", function () {
    this.timeout(10000);
    beforeEach(async function () {
        try {
            await db.none("DELETE FROM expense");
        } catch (err) {
            console.log(err);
        }
    });

    // it('should retrieve all expenses', async () => {
    //     const expenses = await expenseTrackerServiceInstance.allExpenses();
    //     assert.equal(6, expenses.length);
    //   });

    it("should retrieve all categories", async () => {
        const categories = await expenseTrackerServiceInstance.allCategories();
        assert.equal(6, categories.length);
    });

    it("should retrieve all categories and list them", async () => {
        const categories = await expenseTrackerServiceInstance.allCategories();
        const expectedOutput = [
            { id: 1, category_type: "weekly" },
            { id: 2, category_type: "monthly" },
            { id: 3, category_type: "weekday" },
            { id: 4, category_type: "weekend" },
            { id: 5, category_type: "once-off" },
            { id: 6, category_type: "daily" },
        ];

        assert.deepEqual(expectedOutput, categories);
    });

    it("should retrieve category totals", async () => {
        const categoryTotals = await expenseTrackerServiceInstance.categoryTotals();
        const expectedOutput = [
            { category_id: 1, category_type: "weekly", total_amount: "0" },
            { category_id: 2, category_type: "monthly", total_amount: "0" },
            { category_id: 3, category_type: "weekday", total_amount: "0" },
            { category_id: 4, category_type: "weekend", total_amount: "0" },
            { category_id: 5, category_type: "once-off", total_amount: "0" },
            { category_id: 6, category_type: "daily", total_amount: "0" },
        ];

        assert.deepEqual(expectedOutput, categoryTotals);
    });

    it("should add an expense", async () => {
        await expenseTrackerServiceInstance.addExpense(100, 1, "Lunch");
        const expenses = await expenseTrackerServiceInstance.allExpenses();
        assert.equal(1, expenses.length);
    });

      it('should delete an expense', async () => {
        const service = expenseTrackerService(db);
        const expenseIdToDelete = 1; // Replace with a valid expense ID
        await service.deleteExpense(expenseIdToDelete);
        // Add your assertions here, for example, check if the expense was deleted from the database
      });

    //   it('should retrieve expenses for a category', async () => {
    //     const service = expenseTrackerService(db);
    //     const categoryId = 1; // Replace with a valid category ID
    //     const expenses = await service.expenseForCategory(categoryId);
    //     // Add your assertions here
    //     expect(expenses).to.be.an('array');
    //   });
});
