'use strict';

describe('skip in before with nested describes', function () {
  before(function () {
    this.skip();
  });

  it('should never run this test', function () {});

  describe('nested describe', function () {
    before(function () {
      throw new Error('should not run');
    });

    it('should never run this test', function () {});

    after(function () {
      throw new Error('should not run');
    });

    describe('nested again', function () {
      before(function () {
        throw new Error('should not run');
      });

      it('should never run this test', function () {});

      after(function () {
        throw new Error('should not run');
      });
    });
  });
});
