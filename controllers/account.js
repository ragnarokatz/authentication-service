const debug = require('debug')('api:controllers:account');
const Joi = require('joi');
const pool = require('../database/pool');

const accountSchema = Joi.object({
  username: Joi.string().required().min(8).max(12).alphanum(),
  description: Joi.string()
    .required()
    .min(2)
    .max(30)
    .regex(/^[a-zA-Z0-9,. ]*$/),
  age: Joi.number().required().min(1).max(120),
});

module.exports.getAllAccounts = function () {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await pool.connect();
      let accounts = await db.query('SELECT * FROM accounts');
      resolve(accounts.rows);
    } catch (err) {
      debug(err);
      reject(err);
    }
  });
};

module.exports.validateAccount = function (account) {
  return new Promise((resolve, reject) => {
    try {
      result = Joi.attempt(account, accountSchema);
      resolve(result);
    } catch (err) {
      debug(err);
      reject(err);
    }
  });
};

module.exports.addAccount = function (item) {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await pool.connect();
      var sql = `INSERT INTO accounts (username, description, age) VALUES ('${item.username}', '${item.description}', ${item.age});`;
      let result = await db.query(sql_insert);
      resolve(result);
    } catch (err) {
      debug(err);
      reject(err);
    }
  });
};

module.exports.getAccount = function (accountId) {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await pool.connect();
      let accounts = await db.query(`SELECT * FROM accounts WHERE id = '${accountId}';`);
      if (accounts.rowCount == 0) {
        let err = 'account id does not exist!';
        reject(err);
      }
      if (accounts.rowCount > 1) {
        let err = 'account id should be unique';
        reject(err);
      }
      resolve(accounts.rows[0]);
    } catch (err) {
      debug(err);
      reject(err);
    }
  });
};

module.exports.updateAccount = function (accountId, item) {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await pool.connect();
      if (accountId != item.account_id) {
        let err = 'account id does not match';
        reject(err);
      }
      var sql_update = `UPDATE accounts SET username = '${item.username}', description = '${item.description}',  age= ${item.age} WHERE id = '${accountId}';`;
      let result = await db.query(sql_update);
      resolve(result);
    } catch (err) {
      debug(err);
      reject(err);
    }
  });
};

module.exports.deleteAccount = function (accountId) {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await pool.connect();
      var sql_delete = `DELETE FROM accounts WHERE id = '${accountId}';`;
      let result = await db.query(sql_delete);
      resolve(result);
    } catch (err) {
      debug(err);
      reject(err);
    }
  });
};
