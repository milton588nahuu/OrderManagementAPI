import { authToken, config, shipper } from '../../src/config/mongoConfig';
import request from 'supertest';
import { dbConnect, dbDisconnect, dropCollections } from "../../src/config/db"
import app from '../../src/index';

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
    await dropCollections("shippers");
    await dbDisconnect();
});

test('POST requests return status 200 and the item was deleted', async () => {
    const executed = 201;

    const { status: result, body: body_t } = await request(app)
        .post("/api/v1/shipp")
        .auth(token, { type: "bearer" })
        .set("Accept", "applicatioon/json")
        .send(shipper);
    const { _id } = body_t;
    _id_put = _id;
    expect(result).toBe(executed)
});

test('The PUT request returns status 200 if updated and returns 202 if the element exists', async () => {
    const executed = 200;
    const shipper = {
        ShipperID: 2
    }
    const { status: result, body: body_t } = await request(app)
        .put("/api/v1/shipp/" + _id_put)
        .auth(token, { type: "bearer" })
        .set("Accept", "applicatioon/json")
        .send(shipper);
    expect(result).toBe(executed)
});

test('should status 200', async () => {
    const executed = 200;
    const { status: result, body: body_t } = await request(app)
        .get("/api/v1/shipp")
        .auth(token, { type: "bearer" })
        .set("Accept", "applicatioon/json")
        .send();
    const { _id } = body_t[0];
    _id_get = _id;
    expect(result).toBe(executed)
});

test('should return an element and with status 200', async () => {
    const executed = 200;
    const { status: result } = await request(app)
        .get("/api/v1/shipp/" + _id_get)
        .auth(token, { type: "bearer" })
        .set("Accept", "applicatioon/json")
        .send();
    expect(result).toBe(executed)

});

test('should return an element delete and with status 200', async () => {
    const executed = 200;
    const { status: result, body: body_t } = await request(app)
        .delete("/api/v1/shipp/" + _id_put)
        .auth(token, { type: "bearer" })
        .set("Accept", "applicatioon/json")
        .send();
    console.log(body_t)
    console.log(result);
    expect(result).toBe(executed);
});


