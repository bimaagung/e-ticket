const bcrypt = require('bcrypt');
const BcryptEncryptionHelper = require('../BcryptPasswordHash');

describe('BcryptEncryptionHelper', () => {
  it('should encryption password correctly', async () => {
    // Arrange
    const spyHash = jest.spyOn(bcrypt, 'hash');
    const bcryptEncryptionHelper = new BcryptEncryptionHelper(bcrypt);

    // Action
    const encryptedPassword = await bcryptEncryptionHelper.hash('plain_password');

    // Assert
    expect(spyHash).toHaveBeenCalledWith('plain_password', 10);
    expect(typeof encryptedPassword).toEqual('string');
    expect(encryptedPassword).not.toEqual('plain_password');
  });
});
