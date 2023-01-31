/* eslint-disable no-unused-vars */
class UserRepository {
  async addUser(registerUser) {
    throw Error('ADD_USER.METHOD_NOT_IMPLEMENTED');
  }

  async verifyAvailableUser(username) {
    throw new Error('VERIFY_AVAILABLE_USER.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = UserRepository;
