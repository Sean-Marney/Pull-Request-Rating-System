const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../.././index');

chai.use(chaiHttp);

describe('Leaderboard API', () => {
    it('should return the leaderboard', async () => {
        const res = await chai.request(app).get('/leaderboard');
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.have.property('name');
        expect(res.body[0]).to.have.property('stars');
    });
});