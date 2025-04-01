const { Factory } = require('../../');

describe('Factory', () => {
  describe('.factories', () => {
    it('is an empty object', () => {
      expect(Factory.factories).toEqual({});
    });

    it('stores factories', () => {
      Factory.define('AFactory').attr('name', 'A Factory');

      expect(Factory.factories).toHaveProperty('AFactory');
      expect(Factory.factories.AFactory).toBeInstanceOf(Factory);
      expect(Factory.factories.AFactory.beforeBuildHooks).toEqual([]);
      expect(Factory.factories.AFactory.afterBuildHooks).toEqual([]);
      expect(Factory.factories.AFactory.beforeCreateHooks).toEqual([]);
      expect(Factory.factories.AFactory.afterCreateHooks).toEqual([]);
      expect(Factory.factories.AFactory.opts).toEqual({});
      expect(Factory.factories.AFactory.sequences).toEqual({});
    });
  });
});
