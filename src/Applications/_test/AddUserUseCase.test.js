const UserRepository = require('../../Domains/users/UserRepository');
const PasswordHash = require('../security/PasswordHash');
const AddUserUseCase = require('../AddUserUseCase');
const RegisterUser = require('../../Domains/users/entities/RegisterUser');

describe('AddUserUseCase', () => {
  it('should orchestrating the add user action correctly', async () => {
    // Arrange
    const useCasePayload = {
      name: 'User A',
      birthdate: '01/01/1997',
      address: 'Pati',
      username: 'user',
      password: 'secret',
    };

    const expected = {
      id: 'user-123',
      name: useCasePayload.name,
      username: useCasePayload.username,
    };

    const mockUserRepository = new UserRepository();
    const mockPasswordHash = new PasswordHash();

    mockUserRepository.verifyAvailableUser = jest.fn().mockImplementation(() => Promise.resolve());
    mockPasswordHash.hash = jest.fn().mockImplementation(() => Promise.resolve());
    mockUserRepository.addUser = jest.fn().mockImplementation(() => Promise.resolve(expected));

    const addUserUseCase = new AddUserUseCase({
      userRepository: mockUserRepository,
      passwordHash: mockPasswordHash,
    });

    // Action
    const registeredUser = await addUserUseCase.execute(useCasePayload);

    // Assert
    expect(registeredUser).toStrictEqual(expected);

    expect(mockUserRepository.verifyAvailableUser).toHaveBeenCalledWith(useCasePayload.username);
    expect(mockPasswordHash.hash).toHaveBeenCalledWith(useCasePayload.password);
    expect(mockUserRepository.addUser).toHaveBeenCalledWith(new RegisterUser(useCasePayload));
  });
});
