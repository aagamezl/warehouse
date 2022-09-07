const test = require('ava')
const request = require('supertest')

const { app } = require('./../src')

test('should returns the server status', async t => {
  const expected = { status: 'ok' }
  const res = await request(app)
    .get('/status')

  t.true(/json/.test(res.headers['content-type']))
  t.regex(res.headers['content-type'], /json/)
  t.is(res.status, 200)
  t.deepEqual(res.body, expected)
})

// test('should returns the swagger JSON', async t => {
//   const res = await request(app)
//     .get('/api-docs/swagger.json')

//   t.true(/json/.test(res.headers['content-type']))
//   t.regex(res.headers['content-type'], /json/)
//   t.is(res.status, 200)
// })
