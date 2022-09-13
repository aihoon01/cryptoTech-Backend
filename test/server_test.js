import {assert} from 'chai';
import request from 'supertest';
import app  from '../server.js';

describe('Server', () => {
    //Test for Various endpoints.
    describe('/', () => {
        it('Returns data for all crypto currency and returns a 200 status', async ()=> {
            //Setup
            const statusCode = 200;
            //Exercise
            const response = await request(app)
            .get('/')
            //Verify
            assert.equal(response.status, statusCode);
            assert.isNotNull(response.body.data)
            assert.isArray(response.body.data)
            // const statusCode =  request(app).get('/');
            // expect(statusCode).toBe(200)
      })
    });
    
    describe('/assert', () => {
        it('Returns the amount of crypto in USD and returns a 200 status', async ()=> {
            //Setup
            const statusCode = 200;
            //Exercise
            const response = await request(app)
            .get('/')
            //Verify
            assert.equal(response.status, statusCode)
            assert.isNotNull(response.body.data)
            assert.isArray(response.body.data)
        })
    });

    describe('/sort', () => {
        it('Returns data for sorted crypto currency and returns a 200 status', async () =>{
            //Setup
            const statusCode = 200;
            //Exercise
            const response = await request(app)
            .get('/sort')
            //Verify
            assert.equal(response.status, statusCode)
            assert.isNotNull(response.body.data)
            assert.isUndefined(response.body.data) //expecting result to be be undefined since query paramaters are not defined in the query strings. 
        })
    });
});
