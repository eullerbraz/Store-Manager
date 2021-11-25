const sinon = require('sinon');
const { expect } = require('chai');

const productService = require('../../services/products');
const saleService = require('../../services/sales');
const productController = require('../../controllers/products');
const saleController = require('../../controllers/sales');
const productRouter = require('../../controllers/routerProduct');
const saleRouter = require('../../controllers/routerSale');
const error = require('../../middlewares/error');

describe('Teste da camada de controller dos produtos', () => {
  describe('Testa existencia do router', () => {
    expect(productRouter).exist;
  });

  describe('Insere um novo produto', () => {
    describe('Quando retorna algum erro', () => {
      const response = {};
      const request = {};
      const next = (err) => error(err, request, response, next);
      const ERROR_OBJ = { code: 'invalid_data', message: 'Message' };

      before(() => {

        request.body = {};

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        
        sinon.stub(productService, 'create').resolves(ERROR_OBJ);
      });

      after(() => {
        productService.create.restore();
      });

      it('É chamado status com o código 422', async () => {
        await productController.create(request, response, next);

        expect(response.status.calledWith(422)).to.be.true;
      });

      it('É chamado json com a mensagem de erro', async () => {
        await productController.create(request, response, next);

        expect(response.json.calledWith({ err: ERROR_OBJ })).to.be.true;
      });
    });
  
    describe('Quando insere com sucesso', () => {
      const response = {};
      const request = {};
      const next = (err) => error(err, request, response, next);
      const ID_EXAMPLE = '614cb554411d68f491ba5782';
      const payloadProduct = {
        _id: ID_EXAMPLE,
        name: 'Product',
        quantity: 10,
      };

      before(() => {
        request.body = { ...payloadProduct };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        
        sinon.stub(productService, 'create').resolves(payloadProduct);
      });

      after(() => {
        productService.create.restore();
      });

      it('É chamado status com o código 201', async () => {
        await productController.create(request, response, next);

        expect(response.status.calledWith(201)).to.be.true;
      });

      it('É chamado json com o produto criado', async () => {
        await productController.create(request, response, next);

        expect(response.json.calledWith(payloadProduct)).to.be.true;
      });
    });
  });

  describe('Busca um produto por id', () => {
    describe('Quando retorna algum erro', () => {
      const response = {};
      const request = {};
      const next = (err) => error(err, request, response, next);
      const ERROR_OBJ = { code: 'invalid_data', message: 'Message' };
      const ID_EXAMPLE = '614cb554411d68f491ba5782';

      before(() => {
        request.params = { id: ID_EXAMPLE };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        
        sinon.stub(productService, 'findById').resolves(ERROR_OBJ);
      });

      after(() => {
        productService.findById.restore();
      });

      it('É chamado status com o código 422', async () => {
        await productController.findById(request, response, next);

        expect(response.status.calledWith(422)).to.be.true;
      });

      it('É chamado json com a mensagem de erro', async () => {
        await productController.findById(request, response, next);

        expect(response.json.calledWith({ err: ERROR_OBJ })).to.be.true;
      });
    });
  
    describe('Quando busca com sucesso', () => {
      const response = {};
      const request = {};
      const next = (err) => error(err, request, response, next);
      const ID_EXAMPLE = '614cb554411d68f491ba5782';
      const payloadProduct = {
        _id: ID_EXAMPLE,
        name: 'Product',
        quantity: 10,
      };

      before(() => {
        request.params = { id: ID_EXAMPLE };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        
        sinon.stub(productService, 'findById').resolves(payloadProduct);
      });

      after(() => {
        productService.findById.restore();
      });

      it('É chamado status com o código 200', async () => {
        await productController.findById(request, response, next);

        expect(response.status.calledWith(200)).to.be.true;
      });

      it('É chamado json com o produto criado', async () => {
        await productController.findById(request, response, next);

        expect(response.json.calledWith(payloadProduct)).to.be.true;
      });
    });
  });

  describe('Busca todos os produtos', () => {
    describe('Quando busca com sucesso', () => {
      const response = {};
      const request = {};
      const next = (err) => error(err, request, response, next);
      const ID_EXAMPLE = '614cb554411d68f491ba5782';
      const ID_EXAMPLE2 = '614cb554411d68f491ba5783';
      const payloadProduct = {
        _id: ID_EXAMPLE,
        name: 'Product',
        quantity: 10,
      };
      const payloadProduct2 = {
        _id: ID_EXAMPLE2,
        name: 'Product2',
        quantity: 15,
      };

      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        
        sinon.stub(productService, 'getAll').resolves([payloadProduct, payloadProduct2]);
      });

      after(() => {
        productService.getAll.restore();
      });

      it('É chamado status com o código 200', async () => {
        await productController.getAll(request, response, next);

        expect(response.status.calledWith(200)).to.be.true;
      });

      it('É chamado json com o produto criado', async () => {
        await productController.getAll(request, response, next);

        expect(response.json.calledWith({ products: [payloadProduct, payloadProduct2] })).to.be.true;
      });
    });
  });

  describe('Atualiza um produto por id', () => {
    describe('Quando retorna algum erro', () => {
      const response = {};
      const request = {};
      const next = (err) => error(err, request, response, next);
      const ERROR_OBJ = { code: 'invalid_data', message: 'Message' };
      const ID_EXAMPLE = '614cb554411d68f491ba5782';

      before(() => {
        request.params = { id: ID_EXAMPLE };
        request.body = {};

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        
        sinon.stub(productService, 'update').resolves(ERROR_OBJ);
      });

      after(() => {
        productService.update.restore();
      });

      it('É chamado status com o código 422', async () => {
        await productController.update(request, response, next);

        expect(response.status.calledWith(422)).to.be.true;
      });

      it('É chamado json com a mensagem de erro', async () => {
        await productController.update(request, response, next);

        expect(response.json.calledWith({ err: ERROR_OBJ })).to.be.true;
      });
    });
  
    describe('Quando atualiza com sucesso', () => {
      const response = {};
      const request = {};
      const next = (err) => error(err, request, response, next);
      const ID_EXAMPLE = '614cb554411d68f491ba5782';
      const payloadProduct = {
        _id: ID_EXAMPLE,
        name: 'Product',
        quantity: 10,
      };

      before(() => {
        request.params = { id: ID_EXAMPLE };
        request.body = { ...payloadProduct };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        
        sinon.stub(productService, 'update').resolves(payloadProduct);
      });

      after(() => {
        productService.update.restore();
      });

      it('É chamado status com o código 200', async () => {
        await productController.update(request, response, next);

        expect(response.status.calledWith(200)).to.be.true;
      });

      it('É chamado json com o produto criado', async () => {
        await productController.update(request, response, next);

        expect(response.json.calledWith(payloadProduct)).to.be.true;
      });
    });
  });

  describe('Remove um produto por id', () => {
    describe('Quando retorna algum erro', () => {
      const response = {};
      const request = {};
      const next = (err) => error(err, request, response, next);
      const ERROR_OBJ = { code: 'invalid_data', message: 'Message' };
      const ID_EXAMPLE = '614cb554411d68f491ba5782';

      before(() => {
        request.params = { id: ID_EXAMPLE };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        
        sinon.stub(productService, 'remove').resolves(ERROR_OBJ);
      });

      after(() => {
        productService.remove.restore();
      });

      it('É chamado status com o código 422', async () => {
        await productController.remove(request, response, next);

        expect(response.status.calledWith(422)).to.be.true;
      });

      it('É chamado json com a mensagem de erro', async () => {
        await productController.remove(request, response, next);

        expect(response.json.calledWith({ err: ERROR_OBJ })).to.be.true;
      });
    });
  
    describe('Quando remove com sucesso', () => {
      const response = {};
      const request = {};
      const next = (err) => error(err, request, response, next);
      const ID_EXAMPLE = '614cb554411d68f491ba5782';
      const payloadProduct = {
        _id: ID_EXAMPLE,
        name: 'Product',
        quantity: 10,
      };

      before(() => {
        request.params = { id: ID_EXAMPLE };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        
        sinon.stub(productService, 'remove').resolves(payloadProduct);
      });

      after(() => {
        productService.remove.restore();
      });

      it('É chamado status com o código 200', async () => {
        await productController.remove(request, response, next);

        expect(response.status.calledWith(200)).to.be.true;
      });

      it('É chamado json com o produto criado', async () => {
        await productController.remove(request, response, next);

        expect(response.json.calledWith(payloadProduct)).to.be.true;
      });
    });
  });
});

describe('Teste da camada de controller das vendas', () => {
  describe('Testa existencia do router', () => {
    expect(saleRouter).exist;
  });

  describe('Insere uma nova venda', () => {
    describe('Quando retorna algum erro', () => {
      const response = {};
      const request = {};
      const next = (err) => error(err, request, response, next);
      const ERROR_OBJ = { code: 'invalid_data', message: 'Message' };

      before(() => {
        request.body = {};

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        
        sinon.stub(saleService, 'create').resolves(ERROR_OBJ);
      });

      after(() => {
        saleService.create.restore();
      });

      it('É chamado status com o código 422', async () => {
        await saleController.create(request, response, next);

        expect(response.status.calledWith(422)).to.be.true;
      });

      it('É chamado json com a mensagem de erro', async () => {
        await saleController.create(request, response, next);

        expect(response.json.calledWith({ err: ERROR_OBJ })).to.be.true;
      });
    });
  
    describe('Quando insere com sucesso', () => {
      const response = {};
      const request = {};
      const next = (err) => error(err, request, response, next);
      const ID_EXAMPLE = '614cb554411d68f491ba5782';
      const ID_EXAMPLE_SALE = '614cb554411d68f491ba5787';
      const payloadSale = {
        _id: ID_EXAMPLE_SALE,
        itensSold: {
          productId: ID_EXAMPLE,
          quantity: 10,
        }
      };

      before(() => {
        request.body = { ...payloadSale };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        
        sinon.stub(saleService, 'create').resolves(payloadSale);
      });

      after(() => {
        saleService.create.restore();
      });

      it('É chamado status com o código 200', async () => {
        await saleController.create(request, response, next);

        expect(response.status.calledWith(200)).to.be.true;
      });

      it('É chamado json com a venda criada', async () => {
        await saleController.create(request, response, next);

        expect(response.json.calledWith(payloadSale)).to.be.true;
      });
    });
  });

  describe('Busca uma venda por id', () => {
    describe('Quando retorna algum erro', () => {
      const response = {};
      const request = {};
      const next = (err) => error(err, request, response, next);
      const ERROR_OBJ = { code: 'invalid_data', message: 'Message' };
      const ID_EXAMPLE_SALE = '614cb554411d68f491ba5787';

      before(() => {
        request.params = { id: ID_EXAMPLE_SALE };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        
        sinon.stub(saleService, 'findById').resolves(ERROR_OBJ);
      });

      after(() => {
        saleService.findById.restore();
      });

      it('É chamado status com o código 422', async () => {
        await saleController.findById(request, response, next);

        expect(response.status.calledWith(422)).to.be.true;
      });

      it('É chamado json com a mensagem de erro', async () => {
        await saleController.findById(request, response, next);

        expect(response.json.calledWith({ err: ERROR_OBJ })).to.be.true;
      });
    });
  
    describe('Quando busca com sucesso', () => {
      const response = {};
      const request = {};
      const next = (err) => error(err, request, response, next);
      const ID_EXAMPLE = '614cb554411d68f491ba5782';
      const ID_EXAMPLE_SALE = '614cb554411d68f491ba5787';
      const payloadSale = {
        _id: ID_EXAMPLE_SALE,
        itensSold: {
          productId: ID_EXAMPLE,
          quantity: 10,
        }
      };

      before(() => {
        request.params = { id: ID_EXAMPLE_SALE };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        
        sinon.stub(saleService, 'findById').resolves(payloadSale);
      });

      after(() => {
        saleService.findById.restore();
      });

      it('É chamado status com o código 200', async () => {
        await saleController.findById(request, response, next);

        expect(response.status.calledWith(200)).to.be.true;
      });

      it('É chamado json com a venda criada', async () => {
        await saleController.findById(request, response, next);

        expect(response.json.calledWith(payloadSale)).to.be.true;
      });
    });
  });

  describe('Busca todas as vendas', () => {
    describe('Quando busca com sucesso', () => {
      const response = {};
      const request = {};
      const next = (err) => error(err, request, response, next);
      const ID_EXAMPLE = '614cb554411d68f491ba5782';
      const ID_EXAMPLE2 = '614cb554411d68f491ba5783';
      const ID_EXAMPLE_SALE = '614cb554411d68f491ba5787';
      const ID_EXAMPLE_SALE2 = '614cb554411d68f491ba5788';
      const payloadSale = {
        _id: ID_EXAMPLE_SALE,
        itensSold: {
          productId: ID_EXAMPLE,
          quantity: 10,
        }
      };
      const payloadSale2 = {
        _id: ID_EXAMPLE_SALE2,
        itensSold: {
          productId: ID_EXAMPLE2,
          quantity: 15,
        }
      };

      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        
        sinon.stub(saleService, 'getAll').resolves([payloadSale, payloadSale2]);
      });

      after(() => {
        saleService.getAll.restore();
      });

      it('É chamado status com o código 200', async () => {
        await saleController.getAll(request, response, next);

        expect(response.status.calledWith(200)).to.be.true;
      });

      it('É chamado json com a venda criada', async () => {
        await saleController.getAll(request, response, next);

        expect(response.json.calledWith({ sales: [payloadSale, payloadSale2] })).to.be.true;
      });
    });
  });

  describe('Atualiza uma venda por id', () => {
    describe('Quando retorna algum erro', () => {
      const response = {};
      const request = {};
      const next = (err) => error(err, request, response, next);
      const ERROR_OBJ = { code: 'invalid_data', message: 'Message' };
      const ID_EXAMPLE_SALE = '614cb554411d68f491ba5782';

      before(() => {
        request.params = { id: ID_EXAMPLE_SALE };
        request.body = {};

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        
        sinon.stub(saleService, 'update').resolves(ERROR_OBJ);
      });

      after(() => {
        saleService.update.restore();
      });

      it('É chamado status com o código 422', async () => {
        await saleController.update(request, response, next);

        expect(response.status.calledWith(422)).to.be.true;
      });

      it('É chamado json com a mensagem de erro', async () => {
        await saleController.update(request, response, next);

        expect(response.json.calledWith({ err: ERROR_OBJ })).to.be.true;
      });
    });
  
    describe('Quando atualiza com sucesso', () => {
      const response = {};
      const request = {};
      const next = (err) => error(err, request, response, next);
      const ID_EXAMPLE = '614cb554411d68f491ba5782';
      const ID_EXAMPLE_SALE = '614cb554411d68f491ba5787';
      const payloadSale = {
        _id: ID_EXAMPLE_SALE,
        itensSold: {
          productId: ID_EXAMPLE,
          quantity: 10,
        }
      };

      before(() => {
        request.params = { id: ID_EXAMPLE_SALE };
        request.body = { ...payloadSale };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        
        sinon.stub(saleService, 'update').resolves(payloadSale);
      });

      after(() => {
        saleService.update.restore();
      });

      it('É chamado status com o código 200', async () => {
        await saleController.update(request, response, next);

        expect(response.status.calledWith(200)).to.be.true;
      });

      it('É chamado json com a venda criada', async () => {
        await saleController.update(request, response, next);

        expect(response.json.calledWith(payloadSale)).to.be.true;
      });
    });
  });

  describe('Remove uma venda por id', () => {
    describe('Quando retorna algum erro', () => {
      const response = {};
      const request = {};
      const next = (err) => error(err, request, response, next);
      const ERROR_OBJ = { code: 'invalid_data', message: 'Message' };
      const ID_EXAMPLE_SALE = '614cb554411d68f491ba5782';

      before(() => {
        request.params = { id: ID_EXAMPLE_SALE };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        
        sinon.stub(saleService, 'remove').resolves(ERROR_OBJ);
      });

      after(() => {
        saleService.remove.restore();
      });

      it('É chamado status com o código 422', async () => {
        await saleController.remove(request, response, next);

        expect(response.status.calledWith(422)).to.be.true;
      });

      it('É chamado json com a mensagem de erro', async () => {
        await saleController.remove(request, response, next);

        expect(response.json.calledWith({ err: ERROR_OBJ })).to.be.true;
      });
    });
  
    describe('Quando remove com sucesso', () => {
      const response = {};
      const request = {};
      const next = (err) => error(err, request, response, next);
      const ID_EXAMPLE = '614cb554411d68f491ba5782';
      const ID_EXAMPLE_SALE = '614cb554411d68f491ba5787';
      const payloadSale = {
        _id: ID_EXAMPLE_SALE,
        itensSold: {
          productId: ID_EXAMPLE,
          quantity: 10,
        }
      };

      before(() => {
        request.params = { id: ID_EXAMPLE_SALE };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        
        sinon.stub(saleService, 'remove').resolves(payloadSale);
      });

      after(() => {
        saleService.remove.restore();
      });

      it('É chamado status com o código 200', async () => {
        await saleController.remove(request, response, next);

        expect(response.status.calledWith(200)).to.be.true;
      });

      it('É chamado json com a venda criada', async () => {
        await saleController.remove(request, response, next);

        expect(response.json.calledWith(payloadSale)).to.be.true;
      });
    });
  });
});
