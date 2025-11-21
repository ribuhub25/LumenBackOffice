import request from "supertest"
import app from "../interfaces/http/server";

const RESPONSE_JSON = [
    {
        "value": "3",
        "label": "boligrafos"
    },
    {
        "value": "6",
        "label": "repisa"
    },
    {
        "value": "7",
        "label": "portarretratos"
    }
]

describe('GET /', () => {
  it('Should return the category List', async () => {
    const res = await request(app).get('/api/categories/categorylist');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(RESPONSE_JSON);
  });
});

