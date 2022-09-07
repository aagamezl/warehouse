const request = require('supertest')
const sinon = require('sinon')
const test = require('ava')

const { app } = require('../src')
const { ProductModel } = require('../src/components/product')

const data = require('./fakes/products.json')
const getRecords = require('./fakes/getRecords')

const sandbox = sinon.createSandbox()

test.afterEach(() => {
  // completely restore all fakes created through the sandbox
  sandbox.restore()
})

test.serial('should import products when all record are valid', async t => {
  const buffer = Buffer.from(JSON.stringify(data))
  const expected = getRecords(data.products)

  sandbox.mock(ProductModel)
    .expects('insertMany')
    .resolves(expected)

  const res = await request(app)
    .post('/products')
    .attach('products', buffer, 'products.json')

  t.is(res.status, 201)
  t.deepEqual(res.body, expected)
})

test.serial('should returns internal server error on import errors', async t => {
  const buffer = Buffer.from(JSON.stringify(data))

  sandbox.mock(ProductModel)
    .expects('insertMany')
    .rejects(new Error())

  const res = await request(app)
    .post('/products')
    .attach('products', buffer, 'products.json')

  t.is(res.status, 500)
})

test.serial('should get all the articles in the database', async t => {
  const expected = getRecords(data.products)

  sandbox.mock(ProductModel)
    .expects('aggregate')
    .resolves(expected)

  const res = await request(app)
    .get('/products')

  t.is(res.status, 200)
  t.deepEqual(res.body, expected)
})

test.serial('should returns internal server error on database error', async t => {
  sandbox.mock(ProductModel)
    .expects('aggregate')
    .rejects(new Error())

  const res = await request(app)
    .get('/products')

  t.is(res.status, 500)
})
