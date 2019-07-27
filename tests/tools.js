const { expect } = require('chai');
const ToolsController = require('../controllers/ToolsController');

//Testar se o create retorna 1 obj,
//Testar se o create retorna o novo ID,
//Testar se o listar retorna 1 array,
//Testar se o listar retorna 1 array filtrando por tags
//Testar se o delete daleta o item

describe('Tools Controller tests', () => {
  it('should return 1 Obj', () => {

    expect(ToolsController.create()).to.be.an('object');
  });
  it('should return the new ID', () => {});
  it('should return 1 array', () => {});
  it('should return 1 array filtering by tag', () => {});
  it('should delete an item', () => {});
});
