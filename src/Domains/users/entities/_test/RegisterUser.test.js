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

  it('should throw error when username contain more than 50 character', () => {
    const payload = {
      name: 'User A',
      birthdate: '18/10/1997',
      address: 'Pati',
      username: 'useruseruseruseruseruseruseruseruseruseruseruseruseruser',
      password: 'secret',
    };

    // Action & Assert
    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.USERNAME_LIMIT_CHAR');
  });

  it('should throw error when username contain restricted character', () => {
    const payload = {
      name: 'User A',
      birthdate: '18/10/1997',
      address: 'Pati',
      username: 'user1* satu',
      password: 'secret',
    };

    // Action & Assert
    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER');
  });

  it('should throw error when username contain restricted character', () => {
    const payload = {
      name: 'User A',
      birthdate: '18/10/1997',
      address: 'Pati',
      username: 'user1* satu',
      password: 'secret',
    };

    // Action & Assert
    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER');
  });

  it('should created register user object correctly', () => {
    // Arrange
    const payload = {
      name: 'User A',
      birthdate: '18/10/1997',
      address: 'Pati',
      username: 'user',
      password: 'secret',
    };

    // Action
    const registerUser = new RegisterUser(payload);

    // Assert
    expect(registerUser.name).toEqual(payload.name);
    expect(registerUser.birthdate).toEqual(payload.birthdate);
    expect(registerUser.address).toEqual(payload.address);
    expect(registerUser.username).toEqual(payload.username);
    expect(registerUser.password).toEqual(payload.password);
  });
});
