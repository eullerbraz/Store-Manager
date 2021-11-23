const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } =  require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoConnection = require('../../models/connection');
const exampleModel = (require('../../models'))('example');

const DBSERVER = new MongoMemoryServer();

const getConnection = async () => {
  const URLMOCK = await DBSERVER.getUri();
  const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  return MongoClient.connect(URLMOCK, OPTIONS);
}

describe('Inserir uma nova linha no BD', () => {
  let connectionMock;

  const payloadExample = {
    name: 'Euller',
    age: 21,
  };

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('Quando é inserido com sucesso', () => {
    it('Retorna um objeto', async () => {
      const response = await exampleModel.create(payloadExample);

      expect(response).to.a('object');
    });

    it('Objeto teve possuir um _id', async () => {
      const response = await exampleModel.create(payloadExample);

      expect(response).to.have.a.property('_id');
    });

    it('Deve existir uma nova linha cadastrada no BD', async () => {
      await exampleModel.create(payloadExample);

      const newRow = await connectionMock
        .db('StoreManager').collection('example')
        .findOne({ name: payloadExample.name });
      
      expect(newRow).to.be.not.null;
    });
  });

});

describe('Buscar pelo nome', () => {
  let connectionMock;

  const payloadExample = {
    name: 'Euller',
    age: 21,
  };

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('Quando a busca é encontrada', () => {
    beforeEach(async () => {
      await connectionMock
        .db('StoreManager').collection('example')
        .insertOne(payloadExample);
    });

    afterEach(async () => {
      await connectionMock
        .db('StoreManager').collection('example').drop();
    });

    it('Retorna um valor truthy', async () => {
      const response = await exampleModel.findByName('Euller');
      expect(response).to.be.not.null;
    });
  });

  describe('Quando a busca não é encontrada', () => {
    beforeEach(async () => {
      await connectionMock
        .db('StoreManager').collection('example')
        .insertOne(payloadExample);
    });

    afterEach(async () => {
      await connectionMock
        .db('StoreManager').collection('example').drop();
    });

    it('Retorna um valor falsy', async () => {
      const response = await exampleModel.findByName('Teste');
      expect(response).to.be.null;
    });
  });
});

describe('Buscar pelo id', () => {
  let connectionMock;

  const payloadExample = {
    name: 'Euller',
    age: 21,
  };

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('Quando a busca é encontrada', () => {
    let id;
    beforeEach(async () => {
      const { insertedId } = await connectionMock
        .db('StoreManager').collection('example')
        .insertOne(payloadExample);

      id = insertedId;
    });

    afterEach(async () => {
      await connectionMock
        .db('StoreManager').collection('example').drop();
    });

    it('Retorna um objeto', async () => {
      const response = await exampleModel.findById(id);
      expect(response).to.be.a('object');
    });
  });

  describe('Quando a busca não é encontrada', () => {
    beforeEach(async () => {
      await connectionMock
        .db('StoreManager').collection('example')
        .insertOne(payloadExample);
    });

    afterEach(async () => {
      await connectionMock
        .db('StoreManager').collection('example').drop();
    });

    it('Retorna um valor falsy', async () => {
      const response = await exampleModel.findById('54759eb3c090d83494e2d804');
      expect(response).to.be.null;
    });
  });
});

describe('Buscar todos os itens', () => {
  let connectionMock;

  const payloadExample = {
    name: 'Euller',
    age: 21,
  };

  const payloadExample2 = {
    name: 'Bruna',
    age: 21,
  };

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('Quando a busca é encontrada', () => {
    beforeEach(async () => {
      await connectionMock
        .db('StoreManager').collection('example')
        .insertOne(payloadExample);
      await connectionMock
        .db('StoreManager').collection('example')
        .insertOne(payloadExample2);

    });

    afterEach(async () => {
      await connectionMock
        .db('StoreManager').collection('example').drop();
    });

    it('Retorna array de objetos ', async () => {
      const response = await exampleModel.getAll();
      expect(response).to.be.an('array');
      expect(response[0]).to.be.a('object');
    });

    it('O array possui dois objetos ', async () => {
      const response = await exampleModel.getAll();
      expect(response.length).to.be.equal(2);
    });
  });

  describe('Quando a busca não é encontrada', () => {
    it('Retorna array vazio ', async () => {
      const response = await exampleModel.getAll();
      expect(response).to.be.an('array');
      expect(response.length).to.be.equal(0);
    });
  });
});

describe('Atualizar pelo id', () => {
  let connectionMock;

  const payloadExample = {
    name: 'Euller',
    age: 21,
  };

  const payloadExample2 = {
    name: 'Bruna',
    age: 21,
  };

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('Quando é atualizado com sucesso', () => {
    let id;
    beforeEach(async () => {
      const { insertedId } = await connectionMock
        .db('StoreManager').collection('example')
        .insertOne(payloadExample);

      id = insertedId;
    });

    afterEach(async () => {
      await connectionMock
        .db('StoreManager').collection('example').drop();
    });

    it('Retorna um objeto', async () => {
      const response = await exampleModel.update({ id, ...payloadExample2 });
      expect(response).to.be.a('object');
    });
  
    it('Objeto teve possuir um _id', async () => {
      const response = await exampleModel.update({ id, ...payloadExample2 });

      expect(response).to.have.a.property('_id');
    });

    it('O banco está com o objeto atualizado', async () => {
      await exampleModel.update({ id, ...payloadExample2 });

      const newRow = await connectionMock
        .db('StoreManager').collection('example')
        .findOne({ _id: id });
      
      expect(newRow).to.be.a('object');
      expect(newRow.name).to.be.equal(payloadExample2.name);
    });
  });
});

describe('Remover pelo id', () => {
  let connectionMock;

  const payloadExample = {
    name: 'Euller',
    age: 21,
  };

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('Quando é removido com sucesso', () => {
    let id;
    beforeEach(async () => {
      const { insertedId } = await connectionMock
        .db('StoreManager').collection('example')
        .insertOne(payloadExample);

      id = insertedId;
    });

    afterEach(async () => {
      await connectionMock
        .db('StoreManager').collection('example').drop();
    });

    it('Retorna undefined', async () => {
      const response = await exampleModel.remove(id);
      expect(response).to.be.undefined;
    });

    it('O banco está sem o objeto removido', async () => {
      await exampleModel.remove(id);

      const newRow = await connectionMock
        .db('StoreManager').collection('example')
        .findOne({ _id: id });
      
      expect(newRow).to.be.null;
    });
  });
});
