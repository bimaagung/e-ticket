const RegisterUser = require('../RegisterUser');

describe('a RegisterUser entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      username: 'user',
      password: 'secret',
    };

    // Action & Assert
    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      name: 123,
      birthdate: true,
      address: 'Pati',
      username: 478,
      password: 'secret',
    };

    // Action & Assert
    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
});
