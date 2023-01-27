const InvariantError = require('../InvariantError');
const ClientError = require('../ClientError');

describe('InvariantError', () => {
  it('should create an error correctly', () => {
    const invariantError = new InvariantError('an error occurrs');

    expect(invariantError).toBeInstanceOf(InvariantError);
    expect(invariantError).toBeInstanceOf(ClientError);
    expect(invariantError).toBeInstanceOf(Error);

    expect(invariantError.statusCode).toEqual(400);
    expect(invariantError.message).toEqual('an error occurrs');
    expect(invariantError.name).toEqual('InvariantError');
  });
});