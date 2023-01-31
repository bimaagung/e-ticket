const InvariantError = require('../../Commons/InvariantError');
const RegisterUser = require('../../Domains/users/entities/RegisterUser');

class AddUserUseCase {
  constructor({
    userRepository,
    passwordHash,
  }) {
    this._userRepository = userRepository;
    this._passwordHash = passwordHash;
  }

  async execute(useCasePayload) {
    const registerUser = new RegisterUser(useCasePayload);

    if (registerUser.password !== registerUser.retype) {
      throw new InvariantError('password not match');
    }

    await this._userRepository.verifyAvailableUser(registerUser.username);
    const passwordHashed = await this._passwordHash.hash(registerUser.password);

    return this._userRepository.addUser({
      name: registerUser.username,
      birtdate: registerUser.birtdate,
      address: registerUser.address,
      username: registerUser.username,
      password: passwordHashed,
    });
  }
}

module.exports = AddUserUseCase;
