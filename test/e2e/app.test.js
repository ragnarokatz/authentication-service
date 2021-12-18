const debug = require('debug')('api:test:server');
const request = require('supertest');
const app = require('../../app');
const pool = require('../../database/pool');

var testData = {
  username: 'goodname',
  description: 'good description',
  age: 13,
};

var badData = {
  username: 'goodname',
  description: 'good description_nope',
  age: 13,
};

beforeAll(async () => {
  try {
    const db = await pool.connect();
    await db.query(`CREATE TABLE IF NOT EXISTS accounts (
    id serial PRIMARY KEY,
    username varchar(12) NOT NULL,
    description varchar(30) NOT NULL,
    age int NOT NULL
);`);
  } catch (err) {
    debug(err);
  }
});

afterAll(async () => {
  try {
    await pool.close();
  } catch (err) {
    debug(err);
  }
});

describe('api endpoint testing', () => {
  it('visiting root', () => {
    return request(app).get('/').expect(200);
  });
  it('visiting undefined route', () => {
    return request(app).get('/undefined').expect(404);
  });

  it('adding account', () => {
    return request(app).post('/accounts/add').send(testData).expect(200);
  });

  it('adding account with bad data', () => {
    return request(app).post('/accounts/add').send(badData).expect(404);
  });

  it('getting account', (done) => {
    request(app)
      .get('/accounts/4')
      .expect(200)
      .end((err, res) => {
        expect(res.body).toMatchObject(testData);
        done();
      });
  });

  it('getting account that does not exist', () => {
    return request(app).get('/accounts/9574').expect(404);
  });

  it('getting all accounts', () => {
    return request(app).get('/accounts').expect(200);
  });

  it('updating account', () => {
    return request(app).put('/accounts/4').send(testData).expect(200);
  });

  it('updating account with bad data', () => {
    return request(app).post('/accounts/9574').send(badData).expect(404);
  });

  it('updating account with non matching id', () => {
    return request(app).put('/accounts/9574').send(testData).expect(404);
  });

  it('deleting account', () => {
    return request(app).delete('/accounts/4').expect(200);
  });
});
