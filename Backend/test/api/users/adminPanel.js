const expect = require("chai").expect;
const request = require("supertest");
const app = require("../../../server.js");
const connectDB = require("../../../config/db");

describe("Get maps", () => {
  before((done) => {
    connectDB();
  });
});
let adminAuthToken;

it("OK. loginuser", (done) => {
  request(app)
    .post("/api/auth/login")
    .send({ email: "admin@mail.com", password: "123456" })
    .then((res) => {
      const body = res.body;
      adminAuthToken = body.token;
      expect(body).to.contain.property("token");
      done();
    })
    .catch((err) => done(err));
});

it("OK. admin editevent", (done) => {
  request(app)
    .post("/api/admin/editevent")
    .send({
      id: "111111111111111111111111",
      start: new Date(),
      end: new Date(),
      name: "testevent",
    })
    .set({ "x-auth-token": adminAuthToken })
    .then((res) => {
      const body = res.body;
      expect(body).to.contain.property("msg");
      done();
    })
    .catch((err) => done(err));
});
