const debug = require('debug')('api:test:account');
const { validateAccount } = require('../../controllers/account');

var testData = [
  {
    username: 'goodname',
    description: 'good description',
    age: 13,
  },
  {
    description: 'good description',
    age: 13,
  },
  {
    username: NULL,
    description: 'good description',
    age: 13,
  },
  {
    username: '',
    description: 'good description',
    age: 13,
  },
  {
    username: 'good name',
    description: 'good description',
    age: 13,
  },
  {
    username: 'good_name',
    description: 'good description',
    age: 13,
  },
];

describe('account validation tests', () => {
  it('should be good for proper data', async () => {
    await expect(validateAccount(testData[0])).resolves.toBeTruthy();
  });
  it('should be bad for account_id being invalid data type', async () => {
    await expect(validateAccount(testData[1])).rejects.toThrow();
  });
  it('should be bad for empty account_id', async () => {
    await expect(validateAccount(testData[2])).rejects.toThrow();
  });
  it('should be bad for null account_id', async () => {
    await expect(validateAccount(testData[3])).rejects.toThrow();
  });
  it('should be bad for account_name being invalid data type', async () => {
    await expect(validateAccount(testData[4])).rejects.toThrow();
  });
  it('should be bad for empty account_name', async () => {
    await expect(validateAccount(testData[5])).rejects.toThrow();
  });
  it('should be bad for null account_name', async () => {
    await expect(validateAccount(testData[6])).rejects.toThrow();
  });
  it('should be bad for image being invalid data type', async () => {
    await expect(validateAccount(testData[7])).rejects.toThrow();
  });
  it('should be bad for empty image', async () => {
    await expect(validateAccount(testData[8])).rejects.toThrow();
  });
  it('should be bad for null image', async () => {
    await expect(validateAccount(testData[9])).rejects.toThrow();
  });
});
