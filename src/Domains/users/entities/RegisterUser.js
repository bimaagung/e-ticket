const InvariantError = require('../../../Commons/InvariantError');

class RegisterUser {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      name, birthdate, address, username, password,
    } = payload;

    this.name = name;
    this.birthdate = birthdate;
    this.address = address;
    this.username = username;
    this.password = password;
  }

  _verifyPayload({
    name, birthdate, address, username, password,
  }) {
    if (!name || !birthdate || !address || !username || !password) {
      throw new InvariantError('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof name === 'string' || typeof birthdate === 'string' || typeof address === 'string' || typeof username === 'string' || typeof password === 'string') {
      throw new InvariantError('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = RegisterUser;
