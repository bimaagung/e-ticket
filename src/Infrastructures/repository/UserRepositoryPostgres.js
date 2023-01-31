const InvariantError = require('../../Commons/InvariantError');
const UserRepository = require('../../Domains/users/UserRepository');

class UserRepositoryPostgres extends UserRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addUser({
    name, birthdate, address, username, password,
  }) {
    const id = `user-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4, $5, $6) RETURNING id, name, username',
      values: [id, name, birthdate, address, username, password],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async verifyAvailableUser(username) {
    const query = {
      text: 'SELECT * FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (result.rowCount) {
      throw new InvariantError('username not available');
    }
  }
}

module.exports = UserRepositoryPostgres;
