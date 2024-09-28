import {authToken,config,product} from '../../src/config/mongoConfig';
import request from 'supertest';
import app from '../../src/index';
import {dbConnect,dbDisconnect, dropCollections} from '../../src/config/db'

import { readFileSync } from 'fs';
import path from 'path';
let jsonData:authToken = {
    access_token:"",
    expires_in:0,
    scope:"",
    token_type:""
};
const MONGO_URI: string = `mongodb://${config.IP}:${config.Port}/test`;
let token = "";
let _id_put = "";
let _id_get = "";

const filepath = path.join(__dirname,"token.json");

beforeAll(async () => {
    await dbConnect(MONGO_URI).then(() => {
        console.log("connect...")
    });
    const data = readFileSync(filepath,'utf-8')
    jsonData = JSON.parse(data);
    token = jsonData.access_token;
})

afterAll(async () => {
  dropCollections("products");
  dbDisconnect()
});

test('POST requests return status 200 and the item was deleted', async () => {
  const executed = 201;
 
  const { status: result, body: body_t } = await request(app)
    .post("/api/v1/prod")
    .auth(token, { type: "bearer" })
    .set("Accept", "applicatioon/json")
    .send(product);
    const {_id} = body_t;
    _id_put = _id;
    console.log(body_t);
  expect(result).toBe(executed)
});

test('The PUT request returns status 200 if updated and returns 202 if the element exists', async () => {
  const executed = 200;
  const product = {
    categoryID: 10
  }
  const { status: result } = await request(app)
    .put("/api/v1/prod/" + _id_put)
    .auth(token, { type: "bearer" })
    .set("accept", "applicatioon/json")
    .send(product);
   
  expect(result).toBe(executed)
});

test('should status 200', async () => {
  const executed = 200;
  const { status: result, body: body_t } = await request(app)
    .get("/api/v1/prod/")
    .auth(token, { type: "bearer" })
    .set("Accept", "applicatioon/json")
    .send();
  const { _id } = body_t[0];
  console.log(body_t);
  _id_get = _id;
  expect(result).toBe(executed)
});

test('should return an element and with status 200', async () => {
  const executed = 200;
  const { status: result } = await request(app)
    .get("/api/v1/prod/" + _id_get)
    .auth(token, { type: "bearer" })
    .set("Accept", "applicatioon/json")
    .send();
  expect(result).toBe(executed)
});

test('should return an element delete and with status 200', async () => {
  const executed = 200;
  const {status:result,body:body_t} = await request(app)
  .delete("/api/v1/prod/"+_id_put)
  .auth(token, { type: "bearer" })
  .set("Accept", "applicatioon/json")
  .send();
  console.log(body_t)
  console.log(result);
  expect(result).toBe(executed);
});



