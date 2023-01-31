const bcrypt = require('bcrypt');
const BcryptEncryptionHelper = require('../BcryptPasswordHash');
const AuthenticationError = require('../../../Commons/AuthenticationError');

describe('BcryptEncryptionHelper', () => {
  describe('hash function', () => {
    it('should encryption password correctly', async () => {
      // Arrange
      const spyHash = jest.spyOn(bcrypt, 'hash');
      const bcryptEncryptionHelper = new BcryptEncryptionHelper(bcrypt);

      // Action
      const encryptedPassword = await bcryptEncryptionHelper.hash('plain_password');

      // Assert
      expect(spyHash).toBeCalledWith('plain_password', 10);
      expect(typeof encryptedPassword).toEqual('string');
      expect(encryptedPassword).not.toEqual('plain_password');
    });
  });

  describe('comparePassword function', () => {
    it('should throw AuthenticationError if password not match', async () => {
      // Arrange
      const bcryptEncryptionHelper = new BcryptEncryptionHelper(bcrypt);

      // Action & Assert
      await expect(bcryptEncryptionHelper.comparePassword('plain_password', 'secret')).rejects.toThrowError(AuthenticationError);
    });

    it('should not throw AuthenticationError if password match', async () => {
      // Arrange
      const bcryptEncryptionHelper = new BcryptEncryptionHelper(bcrypt);
      const plainPassword = 'plain_password';
      const encryptedPassword = await bcryptEncryptionHelper.hash(plainPassword);

      // Action & Assert
      await expect(bcryptEncryptionHelper.comparePassword(plainPassword, encryptedPassword))
        .resolves.not.toThrow(AuthenticationError);
    });
  });
});
