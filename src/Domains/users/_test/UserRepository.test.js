const UserRepository = require('../UserRepository');

describe('UserRepository', () => {
  it('should throw error when invoke abstract behaviour', async () => {
    // Arrange
    const userRepository = new UserRepository();

    // Action & Assert
    await expect(userRepository.addUser({})).rejects.toThrowError('ADD_USER.METHOD_NOT_IMPLEMENTED');
    await expect(userRepository.verifyAvailableUser({})).rejects.toThrowError('VERIFY_AVAILABLE_USER.METHOD_NOT_IMPLEMENTED');
  });
});
