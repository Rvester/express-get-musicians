// install dependencies
const { execSync } = require("child_process");
execSync("npm install");
execSync("npm run seed");

const request = require("supertest");
const { db } = require("./db/connection");
const { Musician } = require("./models/index");
const app = require("./src/app");
const { seedMusician } = require("./seedData");

describe("./musicians endpoint", () => {
  // Write your tests here
  test("return all musicians", async () => {
    const response = await request(app).get("/musicians");
    expect(response.data).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
