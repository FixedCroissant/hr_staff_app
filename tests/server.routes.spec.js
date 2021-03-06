import { jsxEmptyExpression } from '@babel/types';
import regeneratorRuntime from 'regenerator-runtime';

const request = require("supertest");
const app = require("../server");


beforeEach(function () {
  jest.setTimeout(10000);
});

//Basic test...
it('Testing to see if Jest works', () => {
  expect(1).toBe(1)
})


describe("POST HR Create Endpoints", () => {
  test("should create a new HR Request", async () => {
    const res = await request(app)
      .post("/api/hr/store")
      .send({
        hrpartnername: "Housing",
        hrrequestorfirstname: "John",
        hrrequestorlastname: "Simpson"
      });
    expect(res.statusCode).toEqual(200);    
    
  });

 


//Test our standard API/blank route.
test("should see a console text.", async () => {
  const res = await request(app)
    .get("/api/")    
  

  expect(res.text).toEqual('API is working properly');
});


});

