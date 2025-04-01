const { Factory } = require('../../');

describe('Factory', () => {
  describe('.factories', () => {
    it('is an empty object', () => {
      expect(Factory.factories).toEqual({});
    });
  });
});
