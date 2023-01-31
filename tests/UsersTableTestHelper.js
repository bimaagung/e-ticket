/* istanbul ignore file */

const pool = require('../src/Infrastructures/database/postgres/pool');

const UserTableTestHelper = {
  async addUser({
    id = 'user-123', name = 'bima agung', birthdate = '24/07/1998', address = 'Pati', username = 'bima', password = 'secret',
  }) {
    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4, $5, $6)',
      values: [id, name, birthdate, address, username, password],
    };

    await pool.query(query);
  },

  async findUserById(id) {
    const query = {
      text: 'SELECT * FROM users WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM users WHERE 1 = 1');
  },

};

module.exports = UserTableTestHelper;
