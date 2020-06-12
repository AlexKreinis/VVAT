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

it("OK. admin getallevents", (done) => {
  request(app)
    .get("/api/admin/getallevents/")
    .set({ "x-auth-token": adminAuthToken })
    .then((res) => {
      const body = res.body;
      expect(body).to.contain.property("allEvents");
      done();
    })
    .catch((err) => done(err));
});

it("OK. admin getuser", (done) => {
  request(app)
    .get("/api/admin/getuser/testuser@mail.com")
    .set({ "x-auth-token": adminAuthToken })
    .then((res) => {
      const body = res.body;
      expect(body).to.contain.property("user");
      done();
    })
    .catch((err) => done(err));
});

it("OK. admin getallusers", (done) => {
  request(app)
    .get("/api/admin/getallusers/")
    .set({ "x-auth-token": adminAuthToken })
    .then((res) => {
      const body = res.body;
      expect(body).to.contain.property("allUsers");
      done();
    })
    .catch((err) => done(err));
});

it("OK. admin banuser", (done) => {
  request(app)
    .post("/api/admin/banUser/")
    .set({ "x-auth-token": adminAuthToken })
    .send({ email: "testuser@mail.com" })
    .then((res) => {
      const body = res.body;
      expect(body).to.contain.property("msg");
      done();
    })
    .catch((err) => done(err));
});
