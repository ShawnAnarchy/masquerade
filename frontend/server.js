import express from 'express';
import path from 'path';
const app = express();
let DIRNAME = path.resolve(path.dirname(''));

// app.use( '/src', express.static( DIRNAME + '/src' ));
app.get('*', (req, res) => {
  switch(req.url){
    case '/':
      res.sendFile(path.join(DIRNAME + '/index.html'));
      break;
    case '/dist/bundle.js':
      express.static.mime.define({'application/javascript': ['js']});
      res.setHeader('content-type', 'application/javascript');
      res.sendFile(path.join(DIRNAME + '/dist/bundle.js'));
      break;
  }
});


const host = '192.168.10.105';
const port = 8080;
app.listen(port, host, () => console.log(`Listening on port http://${host}:${port}!`));
