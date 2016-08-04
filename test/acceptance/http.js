var http = require('http');

var server = http.createServer(function(req, res){
  res.end('Hello World\n');
})

server.listen(8888);

describe('http', function(){
  this.timeout(500);
  it('should provide an example', function(done){
    http.get({ path: '/', port: 8888 }, function(res){
      expect(res).to.have.property('statusCode', 200);
      done();
    })
  })
})
