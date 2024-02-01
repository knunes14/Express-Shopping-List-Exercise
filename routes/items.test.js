process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");


let item = { name: "Pickles", price:100 };

beforeEach(async () => {
    items.push(item)
});

afterEach(async () => {
    items = []
});

/** GET /items - returns `{items: [item, ...]}` */

describe("GET /items", () => {
    test("Get a list of all items", async () => {
        const res = await request(app).get("/items");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ items: [item] });
    })
})

/** GET /items/[name] - return data about one item: `{item: item}` */

describe("GET /items/[name]", () => {
    test("Get item by name", async () => {
        const res = await request(app).get(`/items/${item.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ item });
    })
    test("Responds with 404 for invalid name", async () => {
        const res = await request(app).get(`/items/0`);
        expect(res.statusCode).toBe(404);
    })
})

/** POST /items - create item from data; return `{item: item}` */

describe("POST /items", () => {
    test("Create item", async () => {
        const res = await request(app).post("/items").send({
            name: "Cheese",
            price: 100
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ item: { name: "Cheese", price: 100 } });
    })
})

/** PATCH /items/[name] - update item; return `{item: item}` */

describe("PATCH /items/[name]", () => {
    test("Update item", async () => {
        const res = await request(app).patch(`/items/${item.name}`).send({
            name: "Cheese",
            price: 100
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ item: { name: "Cheese", price: 100 } });
    })
})

/** DELETE /items/[name] - delete item, */

describe("DELETE /items/[name]", () => {
    test("Delete item", async () => {
        const res = await request(app).delete(`/items/${item.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: "Deleted" });
    })
})



