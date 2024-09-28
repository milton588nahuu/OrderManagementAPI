
import request from 'supertest';
import {config,authToken,} from '../../src/config/mongoConfig';
import {dbConnect,dbDisconnect} from '../../src/config/db'
import app from '../../src/index';
import path from 'path';
import { readFileSync } from 'fs';

const MONGO_URI: string = `mongodb://${config.IP}:${config.Port}/test`;
let jsonData:authToken;
let token ="";
const filepath = path.join(__dirname,"token.json");
beforeAll(async () => {
    await dbConnect(MONGO_URI).then(() => {
        console.log("connect...")
    });
    const data = readFileSync(filepath,'utf-8');
    jsonData = JSON.parse(data);
    token = jsonData.access_token;
});

afterAll(async () => {
    await dbDisconnect();
});


test("NotFound",async () => {
    const expected = 200;
    const {status:response,body:body_t} = await request(app)
        .get('/api/v1/categ')
        .auth(token,{type:'bearer'})
        .set("Content-type","application/json")
        .send();
    console.log("categories >>>",body_t);
    expect(response).toBe(expected);
})