const expect = require("chai").expect;
const request = require("supertest");

const app = require("../../../server.js");
const connectDB = require("../../../config/db");

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

it("OK. got events", (done) => {
  request(app)
    .get("/api/maps/getevents")
    .then((res) => {
      const body = res.body;
      expect(body).to.contain.property("events");
      done();
    })
    .catch((err) => done(err));
});
//hellooo
it("OK. added events", (done) => {
  request(app)
    .post("/api/maps/addevent")
    .send({
      lat: "1.1",
      lon: "2.2",
      name: "testevent",
      start: "10:00",
      end: "12:00",
    })
    .then((res) => {
      const body = res.body;
      expect(body).to.contain.property("msg");
      done();
    })
    .catch((err) => done(err));
});
