const { Factory } = require('../rosie');
const { randomString, randomInt } = require('./helpers');

describe('Factory.prototype.build', () => {
  let factory, key, value;

  beforeEach(() => {
    key = Math.random().toString(36).split('.')[1].slice(0, 5);
    value = Math.ceil(100 * Math.random());
  });

  describe('without a constructor', () => {
    beforeEach(() => {
      factory = new Factory().attr(key, value);
    });

    it('returns the same as attributes', () => {
      expect(factory.build()).toEqual(factory.attributes());
    });
  });

  describe('with a constructor', () => {
    let Model;
    beforeEach(() => {
      Model = class {
        constructor(options = {}) {
          Object.assign(this, options);
        }
      };
      factory = new Factory(Model);
    });

    it('returns an instance of the Model', () => {
      expect(factory.build()).toBeInstanceOf(Model);
    });
  });

  describe('beforeBuild hooks', () => {
    describe('that do not return a value', () => {
      beforeEach(() => {
        factory = new Factory()
          .attr(key, value)
          .beforeBuild((object, options) => {
            object.beforeBuild = true;
            object._options = options;
          });
      });

      it('uses the modified object', () => {
        expect(factory.build().beforeBuild).toBe(true);
      });
    });

    describe('that do return a value', () => {
      beforeEach(() => {
        factory = new Factory()
          .attr(key, value)
          .afterBuild((object, options) => {
            object.beforeBuild = true;
            object._options = options;
            return { something: 'else' };
          });
      });

      it('uses the returned value', () => {
        expect(factory.build()).toEqual({ something: 'else' });
      });

      it('can run more than once', () => {
        expect(factory.build()).toEqual({ something: 'else' });
        expect(factory.build()).toEqual({ something: 'else' });
      });
    });
  });

  describe('attributes', () => {
    beforeEach(() => {
      factory = new Factory().attr(key, value);
      jest.spyOn(factory, 'attributes');
    });

    it('calls attributes with the correct arguments (empty)', () => {
      factory.build();
      expect(factory.attributes).toHaveBeenCalledWith({}, {});
    });

    it('calls attributes with the correct arguments (non-empty)', () => {
      factory.build({ attr: 1 }, { opt: 1 });
      expect(factory.attributes).toHaveBeenCalledWith({ attr: 1 }, { opt: 1 });
    });
  });

  describe('afterBuild hooks', () => {
    it('receive the correct arguments', () => {
      const attributes = {
        [randomString()]: randomInt(),
      };
      const options = {
        [randomString()]: randomString(),
      };
      const hook = jest.fn();
      new Factory().afterBuild(hook).build(attributes, options);
      expect(hook).toHaveBeenCalledWith(attributes, options);
    });

    describe('that do not return a value', () => {
      beforeEach(() => {
        factory = new Factory().afterBuild((object, options) => {
          object.afterBuild = true;
          object._options = options;
        });
      });

      it('uses the modified object', () => {
        expect(factory.build().afterBuild).toBe(true);
      });
    });

    describe('that do return a value', () => {
      beforeEach(() => {
        factory = new Factory().afterBuild((object, options) => {
          object.afterBuild = true;
          object._options = options;
          return { something: 'else' };
        });
      });

      it('uses the returned value', () => {
        const built = factory.build();
        expect(built.something).toEqual('else');
        expect(built.afterBuild).toBeUndefined();
      });
    });
  });

  describe('sync and async build hooks', () => {
    beforeEach(() => {
      factory = new Factory().attr('firstName', 'Jon');
    });

    it('returns when hooks are all sync', () => {
      factory.beforeBuild(() => {}).afterBuild(() => {});
      expect(factory.build()).toEqual({ firstName: 'Jon' });
    });

    it('resolves when hooks are all async', async () => {
      factory.beforeBuild(async () => {}).afterBuild(async () => {});
      await expect(factory.build()).resolves.toEqual({ firstName: 'Jon' });
    });

    it('resolves when beforeBuild is sync and afterBuild is async', async () => {
      factory.beforeBuild(() => {}).afterBuild(async () => {});
      await expect(factory.build()).resolves.toEqual({ firstName: 'Jon' });
    });

    it('resolves when beforeBuild is async and afterBuild is sync', async () => {
      factory.beforeBuild(async () => {}).afterBuild(() => {});
      await expect(factory.build()).resolves.toEqual({ firstName: 'Jon' });
    });

    it('can go sync to async to sync again', async () => {
      factory
        .beforeBuild((attributes) => {
          attributes.firstCall = 'sync';
        })
        .beforeBuild(async (attributes) => {
          attributes.secondCall = 'async';
        })
        .beforeBuild((attributes) => {
          attributes.thirdCall = 'sync';
        });

      await expect(factory.build()).resolves.toEqual({
        firstName: 'Jon',
        firstCall: 'sync',
        secondCall: 'async',
        thirdCall: 'sync',
      });
    });
  });
});
