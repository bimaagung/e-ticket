const InvariantError = require('../Commons/InvariantError');
const RegisterUser = require('../Domains/users/entities/RegisterUser');

class AddUserUseCase {
  constructor({
    userRepository,
    passwordHash,
  }) {
    this._userRepository = userRepository;
    this._passwordHash = passwordHash;
  }

  async execute(useCasePayload) {
    if (useCasePayload.password !== useCasePayload.retype) {
      throw new InvariantError('password not match');
    }

    await this._userRepository.verifyAvailableUser(registerUser.username);
    const passwordHashed = await this._passwordHash.hash(registerUser.password);

    return this._userRepository.addUser(new RegisterUser({
      name: useCasePayload.name,
      birthdate: useCasePayload.birthdate,
      address: useCasePayload.address,
      username: useCasePayload.username,
      password: passwordHashed,
    }));
  }
}

module.exports = AddUserUseCase;
