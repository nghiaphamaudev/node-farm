const fs = require('fs');
const http = require('http');
const url = require('url');

////////////////////////////////////////////////
//FILES

// Blocking , synchorous way
// const textIn = fs.readFileSync('./starter/txt/input.txt', 'utf-8');
// console.log(textIn);
// const textOut = `This is what we know about the avocado : ${textIn}\n Created on ${Date.now()}`;
// fs.writeFileSync('./starter/txt/output.txt', textOut);
// const readOut = fs.readFileSync('./starter/txt/output.txt', 'utf-8');
// console.log(readOut);

//Non blocking, asynchours way
// fs.readFile('./starter/txt/start.txt', 'utf-8', (err, data1) => {
//   if (err) return console.log('ERROR 🎆');
//   fs.readFile(`./starter/txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2);
//     fs.readFile('./starter/txt/append.txt', 'utf-8', (err, data3) => {
//       console.log(data3);
//       fs.writeFile(
//         './starter/txt/final.txt',
//         `${data2}\n${data3}`,
//         'utf-8',
//         err => {
//           console.log('Your file has been written');
//         }
//       );
//     });
//   });
// });
// console.log('Wil read file!');
//////////SERVER////
const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`);
const dataProduct = JSON.parse(data);
console.log(dataProduct);
const server = http.createServer((req, res) => {
  const pathName = req.url;
  console.log(pathName);
  if (pathName === '/' || pathName === '/overview') {
    res.end('THis is OVERVIEW');
  } else if (pathName === '/product') {
    res.end('This is PRODUCT');
  } else if (pathName === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(dataProduct);
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello world',
    });
    res.end('<h1>Page not found!</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to request on port 8000');
});
