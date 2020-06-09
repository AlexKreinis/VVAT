const expect = require("chai").expect;
const request = require("supertest");
const app = require("../../../server.js");
const connectDB = require("../../../config/db");
const authToken = require("./user_profile");

describe("Get maps", () => {
  before((done) => {
    connectDB();
  });
});

it("OK. get maps", (done) => {
  request(app)
    .get("/api/maps/getmaps")
    .then((res) => {
      const body = res.body;
      expect(body).to.contain.property("data");
      done();
    })
    .catch((err) => done(err));
});

it("OK. got schedule", (done) => {
  request(app)
    .get("/api/maps/getevents/100/200") //<--STATIC VARS
    .then((res) => {
      const body = res.body;
      expect(body).to.contain.property("events");
      done();
    })
    .catch((err) => done(err));
});

it("OK. added event", (done) => {
  request(app)
    .post("/api/maps/addevent")
    .send({
      lat: "14",
      lon: "14",
      name: "testAddevent",
      start: "12:00",
      end: "14:00",
    })
    .then((res) => {
      const body = res.body;
      expect(body).to.contain.property("msg");
      done();
    })
    .catch((err) => done(err));
});

it("OK. get rating for event", (done) => {
  console.log(authToken);
  request(app)
    .get("/api/maps/getratings/111111111111111111111111")
    .set({ "x-auth-token": authToken })
    .then((res) => {
      const body = res.body;
      expect(body).to.contain.property("rating");
      done();
    })
    .catch((err) => done(err));
});
