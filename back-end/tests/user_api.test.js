const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

//const User = require('../models/user')

describe('test for invalid user', () => {
    test('there are no username', async () => {
      const newUser = {
        "name": "Anh Ng",
        "password": "hellotest"
      }
    
      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
    })
  
    test('password to short', async () => {
      const newUser = {
        "username": "hellotest",
        "name": "Anh Ng",
        //"password": "aa"
      }
    
      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
    })
  })
  
  afterAll(async () => {
    await mongoose.connection.close()
  })