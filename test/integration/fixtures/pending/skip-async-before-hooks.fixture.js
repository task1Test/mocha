'use string';

describe('outer suite', function () {

  before(function () {
    console.log('outer before');
  });

  it('should run this test', function () {});

  describe('inner suite', function () {

    before(function (done) {
      console.log('inner before');
      var self = this;
      setTimeout(function () {
        self.skip();
        done();
      });
    });

    beforeEach(function () {
      throw new Error('never thrown');
    });

    afterEach(function () {
      throw new Error('never thrown');
    });

    it('should not run this test', function () {
      throw new Error('never thrown');
    });

    after(function () {
      console.log('inner after');
    });

    describe('skipped suite', function () {
      before(function () {
        console.log('skipped before');
      });

      it('should not run this test', function () {
        throw new Error('never thrown');
      });

      after(function () {
        console.log('skipped after');
      });
    });

  });

  it('should run this test', function () {});

  after(function () {
    console.log('outer after');
  });

});
