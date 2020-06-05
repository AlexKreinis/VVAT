const expect = require("chai").expect;
const request = require("supertest");
const app = require("../../../server.js");
const connectDB = require("../../../config/db");

describe("Get maps", () => {
  before((done) => {
    connectDB();
  });
});
