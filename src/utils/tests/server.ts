import Koa from "koa";
import request, { SuperTest, Test } from "supertest";
import { createApp } from "../../api";
import * as db from "./db";

type SuperTestRequest = SuperTest<Test>;
const getRequest = (app?: Koa): SuperTestRequest => {
  return request(app ?? createApp().callback());
};

export { createApp, db, getRequest, SuperTestRequest };
