const UserRepositoryPostgres = require('../UserRepositoryPostgres');
const pool = require('../../database/postgres/pool');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const InvariantError = require('../../../Commons/InvariantError');

describe('UserRepositoryPostgres', () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addUser', () => {
    it('should return register correctly ', async () => {
      // Arrange
      const registerUser = {
        id: 'user-123',
        name: 'User A',
        birthdate: '01/01/1997',
        address: 'Pati',
        username: 'user',
        password: 'secret',
      };

      const fakeIdGenerator = () => '123';
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const result = await userRepositoryPostgres.addUser(registerUser);
      // Assert
      const user = await UsersTableTestHelper.findUserById('user-123');
      expect(user).toHaveLength(1);

      expect(result).toStrictEqual({
        id: 'user-123',
        name: 'User A',
        username: 'user',
      });
    });
  });

  describe('verifyAvailableUser', () => {
    it('should return throw invariant error when username not available ', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ username: 'user' });
      const userRepositoryPostgres = new UserRepositoryPostgres(pool);

      // Action & Assert
      await expect(userRepositoryPostgres.verifyAvailableUser('user'))
        .rejects.toThrowError(InvariantError);
    });

    it('should return not throw invariant error when username available ', async () => {
      // Arrange
      const idUser = 'user-123';
      const userRepositoryPostgres = new UserRepositoryPostgres(pool);

      // Action & Assert
      await expect(userRepositoryPostgres.verifyAvailableUser(idUser))
        .resolves.not.toThrow(InvariantError);
    });
  });
});
