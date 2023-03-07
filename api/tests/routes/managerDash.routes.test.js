const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../.././index');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Archived Rewards Controller', function() {
  describe('GET /archived-rewards', function() {
    it('should return a list of up to 3 archived rewards', async function() {
      const res = await chai.request(app).get('/archived-rewards');
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.an('array').with.lengthOf.at.most(3);
      expect(res.body[0]).to.have.property('_id');
      expect(res.body[0]).to.have.property('reward_name');
      expect(res.body[0]).to.have.property('user_id');
      expect(res.body[0]).to.have.property('archived').that.is.true;
    });
  });
});
