const { Factory } = require('../rosie');
const { randomString, randomInt } = require('./helpers');

describe('Factory.prototype.sequence', () => {
  let factory;
  beforeEach(() => {
    factory = new Factory();
  });

  describe('no builder', () => {
    let field;
    beforeEach(() => {
      field = randomString();
      factory.sequence(field);
    });

    it('increments numbers', () => {
      expect(factory._attrs[field].builder()).toEqual(1);
      expect(factory._attrs[field].builder()).toEqual(2);
    });

    it('has no dependencies', () => {
      expect(factory._attrs[field].dependencies).toEqual([]);
    });
  });

  describe('with a builder', () => {
    let field;
    beforeEach(() => {
      field = randomString();
      factory.sequence(field, (n) => `id-${n}`);
    });

    it('increments numbers', () => {
      expect(factory._attrs[field].builder()).toEqual('id-1');
      expect(factory._attrs[field].builder()).toEqual('id-2');
    });
  });

  describe('with dependencies', () => {
    let fieldOne, valueOne, fieldTwo;
    beforeEach(() => {
      fieldOne = randomString();
      valueOne = randomInt();
      fieldTwo = randomString();

      factory
        .option(fieldOne, valueOne)
        .sequence(fieldTwo, [fieldOne], (id, valueOne) => `${valueOne}-${id}`);
    });

    it('knows the required dependencies', () => {
      expect(factory._attrs[fieldTwo].dependencies).toContain(fieldOne);
    });
  });
});
