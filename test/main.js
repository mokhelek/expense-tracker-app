import assert from "assert";
import pgPromise from "pg-promise";
import "dotenv/config";
import shoesService from "../services/shoes.js";

const connection = process.env.DATABASE_URL_TEST;

const db = pgPromise()(connection);
db.connect();

let shoesServiceInstance = shoesService(db);

describe("The shoe catalogue", function () {
    this.timeout(10000);
    beforeEach(async function () {
        try {
            await db.none("DELETE FROM shopping_cart");
        } catch (err) {
            console.log(err);
        }
    });

    it("Should return a list of all shoes", async function () {
        let shoes = await shoesServiceInstance.getAllShoes();
        assert.equal(6, shoes.length);
    });

})