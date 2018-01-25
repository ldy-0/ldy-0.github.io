const http = require('http');
const fs = require('fs');

const server = http.createServer(s).listen(4000);

function s(req, res){
	if(req.url==='/'){
		fs.readFile(__dirname+'/index.html', 'utf8', function(err, result){
			if(err){ return console.log(err); }
			res.end(result);
		});
	}else if(req.url === '/register.js'){
		sendJS(res, req.url);
	}else if(req.url === '/scripts/test.js'){
		sendJS(res, req.url);
	}else if(req.url === '/test.html'){

		fs.readFile(__dirname+req.url, 'utf8', function(err, result){
			if(err){ return console.log(err); }
			res.end(result);
		});
	}else{
		let url = decodeURIComponent(req.url);
		if(!fs.existsSync(__dirname+url)){ return res.end('no found'); }

		fs.readFile(__dirname+url, function(err, result){
			if(err){return console.log(err);}
			res.end(result);
		});
	}
}

function sendJS(res, url){
	fs.readFile(__dirname+url, 'utf8', function(err, result){
		if(err){ return console.log(err); }
		res.writeHeader(200, { 'Content-Type': 'text/javascript;charset=UTF-8' });
		res.end(result);
	});
}

console.log('server start ......');
