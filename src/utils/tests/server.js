const request = require("supertest");
const api = require("../../api/api");
const db = require("./db");
const req = request(api.callback());

module.exports = {
  api,
  db,
  req,
};
