const InvariantError = require('../../../Commons/InvariantError');

class RegisterUser {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      name, birthdate, address, username, password, retype,
    } = payload;

    this.name = name;
    this.birthdate = birthdate;
    this.address = address;
    this.username = username;
    this.password = password;
    this.retype = retype;
  }

  _verifyPayload({
    name, birthdate, address, username, password, retype,
  }) {
    if (!name || !birthdate || !address || !username || !password || !retype) {
      throw new InvariantError('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof name !== 'string' || typeof birthdate !== 'string'
        || typeof address !== 'string' || typeof username !== 'string'
        || typeof password !== 'string' || typeof retype !== 'string') {
      throw new InvariantError('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    if (username.length > 50) {
      throw new InvariantError('REGISTER_USER.USERNAME_LIMIT_CHAR');
    }

    if (!username.match(/^[\w]+$/)) {
      throw new InvariantError('REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER');
    }
  }
}

module.exports = RegisterUser;
