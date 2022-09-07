const request = require('supertest')
const sinon = require('sinon')
const test = require('ava')

const { app } = require('./../src')
const { InventoryModel } = require('../src/components/inventory')

const data = require('./fakes/inventory.json')
const getRecords = require('./fakes/getRecords')

const sandbox = sinon.createSandbox()

test.afterEach(() => {
  // completely restore all fakes created through the sandbox
  sandbox.restore()
})

test.serial('should import articles when all record are valid', async t => {
  const buffer = Buffer.from(JSON.stringify(data))
  const expected = getRecords(data.inventory)

  sandbox.mock(InventoryModel)
    .expects('insertMany')
    .resolves(expected)

  const res = await request(app)
    .post('/inventory')
    .attach('inventory', buffer, 'inventory.json')

  t.is(res.status, 201)
  t.deepEqual(res.body, expected)
})

test.serial('should returns internal server error on import errors', async t => {
  const buffer = Buffer.from(JSON.stringify(data))

  sandbox.mock(InventoryModel)
    .expects('insertMany')
    .rejects(new Error())

  const res = await request(app)
    .post('/inventory')
    .attach('inventory', buffer, 'inventory.json')

  t.is(res.status, 500)
})

test.serial('should get all the articles in the database', async t => {
  const expected = getRecords(data.inventory)

  sandbox.mock(InventoryModel)
    .expects('find')
    .resolves(expected)

  const res = await request(app)
    .get('/inventory')

  t.is(res.status, 200)
  t.deepEqual(res.body, expected)
})

test.serial('should returns internal server error on database error', async t => {
  sandbox.mock(InventoryModel)
    .expects('find')
    .rejects(new Error())

  const res = await request(app)
    .get('/inventory')

  t.is(res.status, 500)
})
