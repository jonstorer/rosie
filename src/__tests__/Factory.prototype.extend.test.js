const { Factory } = require('../rosie');

describe('Factory.prototype.extend', () => {
  let factoryOne, factoryTwo;
  let constructor;
  let beforeBuild, afterBuild;
  let beforeCreate, onCreate, afterCreate;

  beforeEach(() => {
    constructor = jest.fn();
    beforeBuild = jest.fn();
    afterBuild = jest.fn();
    beforeCreate = jest.fn();
    onCreate = jest.fn();
    afterCreate = jest.fn();

    factoryOne = new Factory(constructor)
      .sequence('id')
      .attr('key', 'key1')
      .option('opt', 'opt1')
      .beforeBuild(beforeBuild)
      .afterBuild(afterBuild)
      .beforeCreate(beforeCreate)
      .afterCreate(afterCreate)
      .onCreate(onCreate);

    factoryTwo = new Factory().extend(factoryOne);
  });

  it('copies the constructor', () => {
    expect(factoryTwo.construct).toEqual(constructor);
  });

  it('copies the attribute definitions', () => {
    expect(factoryTwo._attrs).toEqual(factoryOne._attrs);
  });

  it('copies the option definitions', () => {
    expect(factoryTwo.opts).toEqual(factoryOne.opts);
  });

  it('copies the beforeBuild hooks', () => {
    expect(factoryTwo.beforeBuildHooks).toEqual(factoryOne.beforeBuildHooks);
  });

  it('copies the afterBuild hooks', () => {
    expect(factoryTwo.afterBuildHooks).toEqual(factoryOne.afterBuildHooks);
  });

  it('copies the beforeCreate hooks', () => {
    expect(factoryTwo.beforeCreateHooks).toEqual(factoryOne.beforeCreateHooks);
  });

  it('copies the onCreate hook', () => {
    expect(factoryTwo.createHandler).toEqual(factoryOne.createHandler);
  });

  it('copies the afterCreate hooks', () => {
    expect(factoryTwo.afterCreateHooks).toEqual(factoryOne.afterCreateHooks);
  });
});
