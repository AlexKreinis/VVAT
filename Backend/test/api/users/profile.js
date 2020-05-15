const expect = require("chai").expect;
const request = require("supertest");

const app = require("../../../server.js");
const connectDB = require("../../../config/db");

it("OK. getUserProfile", (done) => {
  request(app)
    .get("/api/profile/finduserprofile/:t@m.com")
    .then((res) => {
      const body = res.body;
      expect(body).to.contain.property("other");
      done();
    })
    .catch((err) => done(err));
});
