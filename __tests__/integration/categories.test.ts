import { config, category, authToken } from '../../src/config/mongoConfig';
import request from 'supertest';
import { dbConnect, dbDisconnect ,dropCollections} from "../../src/config/db"
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
let _id_del = "";
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
    await dropCollections("categories");
    await dbDisconnect()
});

test('POST requests return status 200', async () => {
    const executed = 201;
    const { status: result, body: body_t } = await request(app)
        .post("/api/v1/categ")
        .set("Authorization", `Bearer ${token}`)
        .set("accept", "applicatioon/json")
        .send(category);
    const { _id } = body_t
    console.log("categoty >>> meth: post", body_t);
    _id_put = _id;
    expect(result).toBe(executed)
});

test('The PUT request returns status 200 if updated and returns 202 if the element exists', async () => {
    const executed = 200;
    const category = {
        categoryID: 100
    }
    const { status: result, body: body_t } = await request(app)
        .put("/api/v1/categ/" + _id_put)
        .auth(token,{ type: "bearer" })
        .set("accept", "applicatioon/json")
        .send(category);
    _id_del = body_t._id
    console.log("put >>>",body_t);
    expect(result).toBe(executed)
});


test('should status 200', async () => {
    const executed = 200;
    const { status: result, body: body_t } = await request(app)
        .get("/api/v1/categ")
        .set("accept", "applicatioon/json")
        .auth(token, { type: 'bearer' })
        .send();
    console.log(body_t);
    _id_get = body_t[0]._id;
    expect(result).toBe(executed)

});

test("should return an element and with status 200", async () => {
    const executed = 200;
    const { status: result } = await request(app)
        .get("/api/v1/categ/" + _id_get)
        .auth(token, { type: "bearer" })
        .set("accept", "applicatioon/json")
        .send();
    _id_del = _id_get;
    expect(result).toBe(executed)
});


test('should return an element delete and with status 200', async () => {
    const executed = 200;
    const { status: result, body: body_t } = await request(app)
        .delete("/api/v1/categ/" + _id_del)
        .auth(token, { type: "bearer" })
        .set("Accept", "applicatioon/json")
        .send();
    console.log(body_t)
    console.log(result);
    expect(result).toBe(executed);
});


