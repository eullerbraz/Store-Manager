const sinon = require('sinon');
const { expect } = require('chai');
const productModel = require('../../models/productModel');
const saleModel = require('../../models/saleModel');
const productService = require('../../services/products');
const saleService = require('../../services/sales');

describe('Teste da camada de serviço dos produtos', () => {
  describe('Insere um novo produto no BD', () => {
    describe('Quando o payload informado não é válido', () => {
      const payloadProduct = {
        name: 'Product',
        quantity: 'quantity',
      };

      it('Retorna um objeto', async () => {
        const response = await productService.create(payloadProduct);

        expect(response).to.be.a('object');
      });

      it('O objeto retornado possui uma chave code com o valor invalid_data', async () => {
        const response = await productService.create(payloadProduct);

        expect(response.code).to.be.equal('invalid_data');
      });
    });
    
    describe('Quando o nome do produto já existe', () => {
      const payloadProduct = {
        name: 'Product',
        quantity: 10,
      };

      beforeEach(()=> {
        const ID_EXAMPLE = '614cb554411d68f491ba5782';
        sinon.stub(productModel, 'findByName').resolves({ ...payloadProduct, _id: ID_EXAMPLE, });
      });

      afterEach(() => {
        productModel.findByName.restore();
      });

      it('Retorna um objeto', async () => {
        const response = await productService.create(payloadProduct);

        expect(response).to.be.a('object');
      });

      it('O objeto retornado possui uma chave code com o valor invalid_data', async () => {
        const response = await productService.create(payloadProduct);

        expect(response.code).to.be.equal('invalid_data');
      });
    });
    
    describe('Quando o produto é inserido com sucesso', () => {
      const payloadProduct = {
        name: 'Product',
        quantity: 10,
      };

      beforeEach(() => {
        const ID_EXAMPLE = '614cb554411d68f491ba5782';

        sinon.stub(productModel, 'create').resolves({ ...payloadProduct, _id: ID_EXAMPLE });
        
        sinon.stub(productModel, 'findByName').resolves(false);
      });

      afterEach(() => {
        productModel.create.restore();
        productModel.findByName.restore();
      });

      it('Retorna um objeto', async () => {
        const response = await productService.create(payloadProduct);

        expect(response).to.be.a('object');
      });

      it('O objeto retornado possui a chave _id ', async () => {
        const response = await productService.create(payloadProduct);

        expect(response).to.have.property('_id');
      });
    });
    
    
  });

  describe('Busca um produto por id', () => {
    describe('Quando o id informado não é válido', () => {
      const ID_EXAMPLE = '1';

      it('Retorna um objeto', async () => {
        const response = await productService.findById(ID_EXAMPLE);

        expect(response).to.be.a('object');
      });

      it('O objeto retornado possui uma chave code com o valor invalid_data', async () => {
        const response = await productService.findById(ID_EXAMPLE);

        expect(response.code).to.be.equal('invalid_data');
      });
    });

    describe('Quando o id informado não existe', () => {
      const ID_EXAMPLE = '614cb554411d68f491ba5782';

      beforeEach(() => {
        sinon.stub(productModel, 'findById').resolves(null);
      });

      afterEach(() => {
        productModel.findById.restore();
      });

      it('Retorna um objeto', async () => {
        const response = await productService.findById(ID_EXAMPLE);

        expect(response).to.be.a('object');
      });

      it('O objeto retornado possui uma chave code com o valor invalid_data', async () => {
        const response = await productService.findById(ID_EXAMPLE);

        expect(response.code).to.be.equal('invalid_data');
      });
    });
    
    describe('Quando a busca é realizada com sucesso', () => {
      const ID_EXAMPLE = '614cb554411d68f491ba5782';
      const payloadProduct = {
        name: 'Product',
        quantity: 10,
      };

      beforeEach(() => {
        sinon.stub(productModel, 'findById').resolves({ ...payloadProduct, _id: ID_EXAMPLE });        
      });

      afterEach(() => {
        productModel.findById.restore();
      });

      it('Retorna um objeto', async () => {
        const response = await productService.findById(ID_EXAMPLE);

        expect(response).to.be.a('object');
      });

      it('O objeto retornado possui a chave _id ', async () => {
        const response = await productService.findById(ID_EXAMPLE);

        expect(response).to.have.property('_id');
      });
    });
  });

  describe('Busca todos os produtos', () => {
    describe('Quando a busca é realizada com sucesso', () => {
      const ID_EXAMPLE = '614cb554411d68f491ba5782';
      const ID_EXAMPLE2 = '614cb554411d68f491ba5785';
      const payloadProduct = {
        name: 'Product',
        quantity: 10,
      };
      const payloadProduct2 = {
        name: 'Product2',
        quantity: 15,
      };

      beforeEach(() => {
        sinon.stub(productModel, 'getAll').resolves([
          { ...payloadProduct, _id: ID_EXAMPLE },
          { ...payloadProduct2, _id: ID_EXAMPLE2 }
        ]);        
      });

      afterEach(() => {
        productModel.getAll.restore();
      });

      it('Retorna um array', async () => {
        const response = await productService.getAll();

        expect(response).to.be.a('array');
      });

      it('O array possui os produtos adicionados', async () => {
        const response = await productService.getAll();

        expect(response[0]._id).to.be.equal(ID_EXAMPLE);
      });
    });
  });

  describe('Atualiza um produto por id', () => {
    describe('Quando o id informado não é válido', () => {
      const ID_EXAMPLE = '1';
      const payloadProduct = {
        name: 'Product',
        quantity: 10,
      };

      it('Retorna um objeto', async () => {
        const response = await productService.update({ ...payloadProduct, id: ID_EXAMPLE });

        expect(response).to.be.a('object');
      });

      it('O objeto retornado possui uma chave code com o valor invalid_data', async () => {
        const response = await productService.update({ ...payloadProduct, id: ID_EXAMPLE });

        expect(response.code).to.be.equal('invalid_data');
      });
    });

    describe('Quando o produto informado não é válido', () => {
      const ID_EXAMPLE = '614cb554411d68f491ba5782';
      const payloadProduct = {
        name: 'Product',
        quantity: 'quantity',
      };

      it('Retorna um objeto', async () => {
        const response = await productService.update({ ...payloadProduct, id: ID_EXAMPLE });

        expect(response).to.be.a('object');
      });

      it('O objeto retornado possui uma chave code com o valor invalid_data', async () => {
        const response = await productService.update({ ...payloadProduct, id: ID_EXAMPLE });

        expect(response.code).to.be.equal('invalid_data');
      });
    });
    
    describe('Quando o produto é atualizado com sucesso', () => {
      const ID_EXAMPLE = '614cb554411d68f491ba5782';
      const payloadProduct = {
        name: 'Product',
        quantity: 10,
      };

      beforeEach(() => {
        sinon.stub(productModel, 'update').resolves({ ...payloadProduct, _id: ID_EXAMPLE });        
      });

      afterEach(() => {
        productModel.update.restore();
      });

      it('Retorna um objeto', async () => {
        const response = await productService.update({ ...payloadProduct, id: ID_EXAMPLE });

        expect(response).to.be.a('object');
      });

      it('O objeto retornado possui a chave _id ', async () => {
        const response = await productService.update({ ...payloadProduct, id: ID_EXAMPLE });

        expect(response).to.have.property('_id');
      });
    });
  });

  describe('Remove um produto por id', () => {
    describe('Quando o id informado não é válido', () => {
      const ID_EXAMPLE = '1';

      it('Retorna um objeto', async () => {
        const response = await productService.remove(ID_EXAMPLE);

        expect(response).to.be.a('object');
      });

      it('O objeto retornado possui uma chave code com o valor invalid_data', async () => {
        const response = await productService.remove(ID_EXAMPLE);

        expect(response.code).to.be.equal('invalid_data');
      });
    });
  
    describe('Quando o id informado não existe', () => {
      const ID_EXAMPLE = '614cb554411d68f491ba5782';

      beforeEach(() => {
        sinon.stub(productModel, 'findById').resolves(null);
      });

      afterEach(() => {
        productModel.findById.restore();
      });

      it('Retorna um objeto', async () => {
        const response = await productService.remove(ID_EXAMPLE);

        expect(response).to.be.a('object');
      });

      it('O objeto retornado possui uma chave code com o valor invalid_data', async () => {
        const response = await productService.remove(ID_EXAMPLE);

        expect(response.code).to.be.equal('invalid_data');
      });
    });
    
    describe('Quando o produto é removido com sucesso', () => {
      const ID_EXAMPLE = '614cb554411d68f491ba5782';
      const payloadProduct = {
        name: 'Product',
        quantity: 10,
      };

      beforeEach(() => {
        sinon.stub(productModel, 'remove').resolves(null);     
        sinon.stub(productModel, 'findById').resolves({ ...payloadProduct, _id: ID_EXAMPLE });      
      });

      afterEach(() => {
        productModel.remove.restore();
        productModel.findById.restore();
      });

      it('Retorna um objeto', async () => {
        const response = await productService.remove(ID_EXAMPLE);

        expect(response).to.be.a('object');
      });

      it('O objeto retornado possui a chave _id ', async () => {
        const response = await productService.remove(ID_EXAMPLE);

        expect(response).to.have.property('_id');
      });
    });
  });
});

describe('Teste da camada de serviço das vendas', () => {
  describe('Insere uma novo venda no BD', () => {
    describe('Quando o payload informado não é válido', () => {
      const ID_EXAMPLE = '614cb554411d68f491ba5782';

      const payloadSale = [
        {
          productId: ID_EXAMPLE,
          quantity: "quantity",
        },
      ];

      beforeEach(() => {
        
        sinon.stub(productModel, 'findById').resolves(null);

      });

      afterEach(() => {
        productModel.findById.restore();
      });

      it('Retorna um objeto', async () => {
        const response = await saleService.create(payloadSale);

        expect(response).to.be.a('object');
      });

      it('O objeto retornado possui uma chave code com o valor invalid_data', async () => {
        const response = await saleService.create(payloadSale);

        expect(response.code).to.be.equal('invalid_data');
      });
    });
    
    describe('Quando a quantidade de produtos é invalida', () => {
      const ID_EXAMPLE = '614cb554411d68f491ba5782';
      const payloadProduct = {
        name: 'Product',
        quantity: 10,
      };
      const payloadSale = [
        {
          productId: ID_EXAMPLE,
          quantity: 15,
        },
      ];

      beforeEach(() => {        
        sinon.stub(productModel, 'findById').resolves({ ...payloadProduct, _id: ID_EXAMPLE });
      });

      afterEach(() => {
        productModel.findById.restore();
      });

      it('Retorna um objeto', async () => {
        const response = await saleService.create(payloadSale);

        expect(response).to.be.a('object');
      });

      it('O objeto retornado possui uma chave code com o valor stock_problem', async () => {
        const response = await saleService.create(payloadSale);

        expect(response.code).to.be.equal('stock_problem');
      });
    });
    
    describe('Quando a venda é inserida com sucesso', () => {
      const ID_EXAMPLE = '614cb554411d68f491ba5782';
      const payloadProduct = {
        name: 'Product',
        quantity: 10,
      };
      const payloadSale = [
        {
          productId: ID_EXAMPLE,
          quantity: 5,
        },
      ];

      beforeEach(() => {
        const ID_EXAMPLE = '614cb554411d68f491ba5782';
        const ID_EXAMPLE_SALE = '614cb554411d68f491ba5757';

        sinon.stub(saleModel, 'create').resolves({ itensSold: payloadSale, _id: ID_EXAMPLE_SALE });
        
        sinon.stub(productModel, 'findById').resolves({ ...payloadProduct, _id: ID_EXAMPLE });

        sinon.stub(productModel, 'update').calledOnce;
      });

      afterEach(() => {
        saleModel.create.restore();
        productModel.findById.restore();
        productModel.update.restore();
      });

      it('Retorna um objeto', async () => {
        const response = await saleService.create(payloadSale);

        expect(response).to.be.a('object');
      });

      it('O objeto retornado possui a chave _id ', async () => {
        const response = await saleService.create(payloadSale);

        expect(response).to.have.property('_id');
      });
    });
  });

  describe('Busca uma venda por id', () => {
    describe('Quando o id informado não é válido', () => {
      const ID_EXAMPLE_SALE = '1';

      it('Retorna um objeto', async () => {
        const response = await saleService.findById(ID_EXAMPLE_SALE);

        expect(response).to.be.a('object');
      });

      it('O objeto retornado possui uma chave code com o valor invalid_data', async () => {
        const response = await saleService.findById(ID_EXAMPLE_SALE);

        expect(response.code).to.be.equal('not_found');
      });
    });

    describe('Quando o id informado não existe', () => {
      const ID_EXAMPLE_SALE = '614cb554411d68f491ba5782';

      beforeEach(() => {
        sinon.stub(saleModel, 'findById').resolves(null);
      });

      afterEach(() => {
        saleModel.findById.restore();
      });

      it('Retorna um objeto', async () => {
        const response = await saleService.findById(ID_EXAMPLE_SALE);

        expect(response).to.be.a('object');
      });

      it('O objeto retornado possui uma chave code com o valor not_found', async () => {
        const response = await saleService.findById(ID_EXAMPLE_SALE);

        expect(response.code).to.be.equal('not_found');
      });
    });
    
    describe('Quando a busca é realizada com sucesso', () => {
      const ID_EXAMPLE = '614cb554411d68f491ba5782';
      const ID_EXAMPLE_SALE = '614cb554411d68f491ba5757';

      const payloadSale = [
        {
          productId: ID_EXAMPLE,
          quantity: 5,
        },
      ];

      beforeEach(() => {
        sinon.stub(saleModel, 'findById').resolves({ itensSold: payloadSale, _id: ID_EXAMPLE_SALE });        
      });

      afterEach(() => {
        saleModel.findById.restore();
      });

      it('Retorna um objeto', async () => {
        const response = await saleService.findById(ID_EXAMPLE_SALE);

        expect(response).to.be.a('object');
      });

      it('O objeto retornado possui a chave _id ', async () => {
        const response = await saleService.findById(ID_EXAMPLE_SALE);

        expect(response).to.have.property('_id');
      });
    });
  });

  describe('Busca todas as vendas', () => {
    describe('Quando a busca é realizada com sucesso', () => {
      const ID_EXAMPLE = '614cb554411d68f491ba5782';
      const ID_EXAMPLE2 = '614cb554411d68f491ba5783';
      const ID_EXAMPLE_SALE = '614cb554411d68f491ba5757';
      const ID_EXAMPLE_SALE2 = '614cb554411d68f491ba5758';

      const payloadSale = [
        {
          productId: ID_EXAMPLE,
          quantity: 5,
        },
      ];
      const payloadSale2 = [
        {
          productId: ID_EXAMPLE,
          quantity: 5,
        },
        {
          productId: ID_EXAMPLE2,
          quantity: 10,
        },
      ];

      beforeEach(() => {
        sinon.stub(saleModel, 'getAll').resolves([
          { itensSold: payloadSale, _id: ID_EXAMPLE_SALE },
          { itensSold: payloadSale2, _id: ID_EXAMPLE_SALE2 },
        ]);        
      });

      afterEach(() => {
        saleModel.getAll.restore();
      });

      it('Retorna um array', async () => {
        const response = await saleService.getAll();

        expect(response).to.be.a('array');
      });

      it('O array possui as vendas adicionadas', async () => {
        const response = await saleService.getAll();

        expect(response[0]._id).to.be.equal(ID_EXAMPLE_SALE);
      });
    });
  });

  describe('Atualiza uma venda por id', () => {
    describe('Quando o id informado não é válido', () => {
      const ID_EXAMPLE_SALE = '1';
      const ID_EXAMPLE = '614cb554411d68f491ba5782';

      const payloadSale = [
        {
          productId: ID_EXAMPLE,
          quantity: "quantity",
        },
      ];

      const payloadProduct = {
        name: 'Product',
        quantity: 10,
      };

      beforeEach(() => {
        
        sinon.stub(productModel, 'findById').resolves({ ...payloadProduct, _id: ID_EXAMPLE });

      });

      afterEach(() => {
        productModel.findById.restore();
      });

      it('Retorna um objeto', async () => {
        const response = await saleService.update({ itensSold: payloadSale, id: ID_EXAMPLE_SALE });

        expect(response).to.be.a('object');
      });

      it('O objeto retornado possui uma chave code com o valor not_found', async () => {
        const response = await saleService.update({ itensSold: payloadSale, id: ID_EXAMPLE_SALE });

        expect(response.code).to.be.equal('not_found');
      });
    });

    describe('Quando a venda informada não é válida', () => {
      const ID_EXAMPLE_SALE = '614cb554411d68f491ba5787';
      const ID_EXAMPLE = '614cb554411d68f491ba5782';

      const payloadSale = [
        {
          productId: ID_EXAMPLE,
          quantity: "quantity",
        },
      ];

      const payloadProduct = {
        name: 'Product',
        quantity: 10,
      };

      beforeEach(() => {
        
        sinon.stub(productModel, 'findById').resolves({ ...payloadProduct, _id: ID_EXAMPLE });

      });

      afterEach(() => {
        productModel.findById.restore();
      });

      it('Retorna um objeto', async () => {
        const response = await saleService.update({ itensSold: payloadSale, id: ID_EXAMPLE_SALE });

        expect(response).to.be.a('object');
      });

      it('O objeto retornado possui uma chave code com o valor invalid_data', async () => {
        const response = await saleService.update({ itensSold: payloadSale, id: ID_EXAMPLE_SALE });

        expect(response.code).to.be.equal('invalid_data');
      });
    });
    
    describe('Quando a quantidade de produtos é invalida', () => {
      const ID_EXAMPLE_SALE = '614cb554411d68f491ba5787';
      const ID_EXAMPLE = '614cb554411d68f491ba5782';

      const payloadSale = [
        {
          productId: ID_EXAMPLE,
          quantity: 5,
        },
      ];

      const payloadSaleUpdated = [
        {
          productId: ID_EXAMPLE,
          quantity: 15,
        },
      ];

      const payloadProduct = {
        name: 'Product',
        quantity: 10,
      };

      beforeEach(() => {        
        sinon.stub(saleModel, 'findById').resolves({ itensSold: payloadSale, _id: ID_EXAMPLE_SALE });
        sinon.stub(productModel, 'findById').resolves({ ...payloadProduct, _id: ID_EXAMPLE });
      });

      afterEach(() => {
        productModel.findById.restore();
        saleModel.findById.restore();
      });

      it('Retorna um objeto', async () => {
        const response = await saleService.update({ itensSold: payloadSaleUpdated, id: ID_EXAMPLE_SALE });

        expect(response).to.be.a('object');
      });

      it('O objeto retornado possui uma chave code com o valor stock_problem', async () => {
        const response = await saleService.update({ itensSold: payloadSaleUpdated, id: ID_EXAMPLE_SALE });

        expect(response.code).to.be.equal('stock_problem');
      });
    });

    describe('Quando a venda é atualizada com sucesso', () => {
      const ID_EXAMPLE_SALE = '614cb554411d68f491ba5787';
      const ID_EXAMPLE = '614cb554411d68f491ba5782';

      const payloadSale = [
        {
          productId: ID_EXAMPLE,
          quantity: 6,
        },
      ];

      const payloadSaleUpdated = [
        {
          productId: ID_EXAMPLE,
          quantity: 3,
        },
      ];

      const payloadProduct = {
        name: 'Product',
        quantity: 10,
      };

      beforeEach(() => {
        sinon.stub(productModel, 'findById').resolves({ ...payloadProduct, _id: ID_EXAMPLE });
        sinon.stub(saleModel, 'findById').resolves({ itensSold: payloadSale, _id: ID_EXAMPLE_SALE });
        sinon.stub(saleModel, 'update').resolves({ itensSold: payloadSaleUpdated, _id: ID_EXAMPLE_SALE });

      });

      afterEach(() => {
        productModel.findById.restore();
        saleModel.findById.restore();
        saleModel.update.restore();
      });

      it('Retorna um objeto', async () => {
        const response = await saleService.update({ itensSold: payloadSaleUpdated, id: ID_EXAMPLE_SALE });

        expect(response).to.be.a('object');
      });

      it('O objeto retornado possui a chave _id ', async () => {
        const response = await saleService.update({ itensSold: payloadSaleUpdated, id: ID_EXAMPLE_SALE });

        expect(response).to.have.property('_id');
      });
    });
  });

  describe('Remove um produto por id', () => {
    describe('Quando o id informado não é válido', () => {
      const ID_EXAMPLE_SALE = '1';

      it('Retorna um objeto', async () => {
        const response = await saleService.remove(ID_EXAMPLE_SALE);

        expect(response).to.be.a('object');
      });

      it('O objeto retornado possui uma chave code com o valor invalid_data', async () => {
        const response = await saleService.remove(ID_EXAMPLE_SALE);

        expect(response.code).to.be.equal('invalid_data');
      });
    });

    describe('Quando o id informado não existe', () => {
      const ID_EXAMPLE_SALE = '614cb554411d68f491ba5782';

      beforeEach(() => {
        sinon.stub(saleModel, 'findById').resolves(null);
      });

      afterEach(() => {
        saleModel.findById.restore();
      });

      it('Retorna um objeto', async () => {
        const response = await saleService.remove(ID_EXAMPLE_SALE);

        expect(response).to.be.a('object');
      });

      it('O objeto retornado possui uma chave code com o valor not_found', async () => {
        const response = await saleService.remove(ID_EXAMPLE_SALE);

        expect(response.code).to.be.equal('not_found');
      });
    });
    
    describe('Quando a venda é removida com sucesso', () => {
      const ID_EXAMPLE_SALE = '614cb554411d68f491ba5787';
      const ID_EXAMPLE = '614cb554411d68f491ba5782';

      const payloadSale = [
        {
          productId: ID_EXAMPLE,
          quantity: 6,
        },
      ];

      const payloadProduct = {
        name: 'Product',
        quantity: 10,
      };

      beforeEach(() => {
        sinon.stub(productModel, 'findById').resolves({ ...payloadProduct, _id: ID_EXAMPLE });
        sinon.stub(saleModel, 'findById').resolves({ itensSold: payloadSale, _id: ID_EXAMPLE_SALE });        
        sinon.stub(saleModel, 'remove').resolves(null);        
      });

      afterEach(() => {
        productModel.findById.restore();
        saleModel.findById.restore();
        saleModel.remove.restore();
      });

      it('Retorna um objeto', async () => {
        const response = await saleService.remove(ID_EXAMPLE_SALE);

        expect(response).to.be.a('object');
      });

      it('O objeto retornado possui a chave _id ', async () => {
        const response = await saleService.remove(ID_EXAMPLE_SALE);

        expect(response).to.have.property('_id');
      });
    });
  });
});
