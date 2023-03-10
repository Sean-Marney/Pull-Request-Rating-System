const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require("../../index");
const expect = chai.expect;

chai.use(chaiHttp);

  it('should return an error if email cannot be sent', (done) => {
    chai.request(app)
      .post('/management/ManagerHelp')
      .send({
        name: 'Jane Doe',
        email: 'janedoe@example.com',
        message: 'This is a test message'
      })
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.text).to.equal('Error sending email');
        done();
      });
  });
