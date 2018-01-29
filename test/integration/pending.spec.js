'use strict';

var assert = require('assert');
var run = require('./helpers').runMochaJSON;
var runMocha = require('./helpers').runMocha;
var splitRegExp = require('./helpers').splitRegExp;
var args = [];

describe('pending', function() {
  describe('pending specs', function() {
    it('should be created by omitting a function', function(done) {
      run('pending/spec.fixture.js', args, function(err, res) {
        if (err) {
          done(err);
          return;
        }
        assert.equal(res.stats.pending, 1);
        assert.equal(res.stats.passes, 0);
        assert.equal(res.stats.failures, 0);
        assert.equal(res.code, 0);
        done();
      });
    });
    it('should return the test object when used via shorthand methods', function(done) {
      run('pending/skip-shorthand.fixture.js', args, function(err, res) {
        if (err) {
          done(err);
          return;
        }
        assert.equal(res.stats.pending, 3);
        assert.equal(res.stats.passes, 0);
        assert.equal(res.stats.failures, 0);
        assert.equal(res.code, 0);
        done();
      });
    });
    it('should keep hierarchies of suites', function(done) {
      run('pending/skip-hierarchy.fixture.js', args, function(err, res) {
        if (err) {
          done(err);
          return;
        }
        assert.equal(res.stats.suites, 2);
        assert.equal(res.stats.pending, 0);
        assert.equal(res.stats.passes, 1);
        assert.equal(res.stats.failures, 0);
        assert.equal(res.code, 0);
        assert.equal(res.passes[0].fullTitle, 'a suite another suite a test');
        done();
      });
    });
  });

  describe('synchronous skip()', function() {
    describe('in spec', function() {
      it('should immediately skip the spec and run all others', function(done) {
        run('pending/skip-sync-spec.fixture.js', args, function(err, res) {
          if (err) {
            done(err);
            return;
          }
          assert.equal(res.stats.pending, 1);
          assert.equal(res.stats.passes, 1);
          assert.equal(res.stats.failures, 0);
          assert.equal(res.code, 0);
          done();
        });
      });
    });

    describe('in before', function() {
      it('should skip all suite specs', function(done) {
        run('pending/skip-sync-before.fixture.js', args, function(err, res) {
          if (err) {
            done(err);
            return;
          }
          assert.equal(res.stats.pending, 2);
          assert.equal(res.stats.passes, 2);
          assert.equal(res.stats.failures, 0);
          assert.equal(res.code, 0);
          done();
        });
      });
      it('should run before and after hooks', function(done) {
        runMocha('pending/skip-sync-before-hooks.fixture.js', args, function(
          err,
          res
        ) {
          if (err) {
            done(err);
            return;
          }
          var output = res.output.split(splitRegExp);
          assert.equal(res.pending, 2);
          assert.equal(res.passing, 2);
          assert.equal(res.failing, 0);
          assert.equal(res.code, 0);
          assert.equal(
            1,
            output.filter(function(txt) {
              return txt === 'outer before';
            }).length
          );
          assert.equal(
            1,
            output.filter(function(txt) {
              return txt === 'outer after';
            }).length
          );
          assert.equal(
            1,
            output.filter(function(txt) {
              return txt === 'inner before';
            }).length
          );
          assert.equal(
            1,
            output.filter(function(txt) {
              return txt === 'inner after';
            }).length
          );
          assert.equal(
            0,
            output.filter(function(txt) {
              return txt === 'skipped before';
            }).length
          );
          assert.equal(
            0,
            output.filter(function(txt) {
              return txt === 'skipped after';
            }).length
          );
          done();
        });
      });
    });

    describe('in before with nested describe', function() {
      it('should skip all suite specs, even if nested', function(done) {
        run('pending/skip-sync-before-nested.fixture.js', args, function(
          err,
          res
        ) {
          if (err) {
            done(err);
            return;
          }
          assert.equal(res.stats.pending, 3);
          assert.equal(res.stats.passes, 0);
          assert.equal(res.stats.failures, 0);
          assert.equal(res.code, 0);
          done();
        });
      });
    });

    describe('in beforeEach', function() {
      it('should skip all suite specs', function(done) {
        run('pending/skip-sync-beforeEach.fixture.js', args, function(
          err,
          res
        ) {
          if (err) {
            done(err);
            return;
          }
          assert.equal(res.stats.pending, 2);
          assert.equal(res.stats.passes, 0);
          assert.equal(res.stats.failures, 0);
          assert.equal(res.code, 0);
          done();
        });
      });
    });
  });

  describe('asynchronous skip()', function() {
    describe('in spec', function() {
      it('should immediately skip the spec and run all others', function(done) {
        run('pending/skip-async-spec.fixture.js', args, function(err, res) {
          if (err) {
            done(err);
            return;
          }
          assert.equal(res.stats.pending, 1);
          assert.equal(res.stats.passes, 1);
          assert.equal(res.stats.failures, 0);
          assert.equal(res.code, 0);
          done();
        });
      });
    });

    describe('in before', function() {
      it('should skip all suite specs', function(done) {
        run('pending/skip-async-before.fixture.js', args, function(err, res) {
          if (err) {
            done(err);
            return;
          }
          assert.equal(res.stats.pending, 2);
          assert.equal(res.stats.passes, 2);
          assert.equal(res.stats.failures, 0);
          assert.equal(res.code, 0, 'code');
          done();
        });
      });
      it('should run before and after hooks', function(done) {
        runMocha('pending/skip-async-before-hooks.fixture.js', args, function(
          err,
          res
        ) {
          if (err) {
            done(err);
            return;
          }
          var output = res.output.split(splitRegExp);
          assert.equal(res.pending, 2);
          assert.equal(res.passing, 2);
          assert.equal(res.failing, 0);
          assert.equal(res.code, 0);
          assert.equal(
            1,
            output.filter(function(txt) {
              return txt === 'outer before';
            }).length
          );
          assert.equal(
            1,
            output.filter(function(txt) {
              return txt === 'outer after';
            }).length
          );
          assert.equal(
            1,
            output.filter(function(txt) {
              return txt === 'inner before';
            }).length
          );
          assert.equal(
            1,
            output.filter(function(txt) {
              return txt === 'inner after';
            }).length
          );
          assert.equal(
            0,
            output.filter(function(txt) {
              return txt === 'skipped before';
            }).length
          );
          assert.equal(
            0,
            output.filter(function(txt) {
              return txt === 'skipped after';
            }).length
          );
          done();
        });
      });
    });

    describe('in before with nested describe', function() {
      it('should skip all suite specs, even if nested', function(done) {
        run('pending/skip-async-before-nested.fixture.js', args, function(
          err,
          res
        ) {
          if (err) {
            done(err);
            return;
          }
          assert.equal(res.stats.pending, 3);
          assert.equal(res.stats.passes, 0);
          assert.equal(res.stats.failures, 0);
          assert.equal(res.code, 0);
          done();
        });
      });
    });

    describe('in beforeEach', function() {
      it('should skip all suite specs', function(done) {
        run('pending/skip-async-beforeEach.fixture.js', args, function(
          err,
          res
        ) {
          if (err) {
            done(err);
            return;
          }
          assert.equal(res.stats.pending, 1);
          assert.equal(res.stats.passes, 0);
          assert.equal(res.stats.failures, 1);
          assert.equal(res.code, 1);
          done();
        });
      });
    });
  });
});
