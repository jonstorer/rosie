const { Factory } = require('../rosie');

describe('Factory.define', () => {
  it('registers a factory in the global factory cache', () => {
    const factory = Factory.define('factory');
    expect(Factory.factories).toHaveProperty('factory', factory);
  });
});
