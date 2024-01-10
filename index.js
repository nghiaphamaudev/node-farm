const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./starter/Modules/replaceTemplate');
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

const tempOverview = fs.readFileSync(
  `${__dirname}/starter/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/starter/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/starter/templates/template-product.html`,
  'utf-8'
);
const data = fs.readFileSync(
  `${__dirname}/starter/dev-data/data.json`,
  'utf-8'
);
const dataObj = JSON.parse(data);
const slugs = dataObj.map(el => slugify(el.productName, { lower: true }));
console.log(slugs);
const server = http.createServer((req, res) => {
  //Overview
  //Vì url.parse(req.url, true); là 1 đối tượng nên ta phải tái cấu trúc object
  const { query, pathname } = url.parse(req.url, true);
  if (pathname === '/' || pathname === '/overview') {
    const cardHtmls = dataObj.map(el => replaceTemplate(el, tempCard)).join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardHtmls);
    res.end(output);

    //Product Page
  } else if (pathname === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    const product = dataObj[query.id];
    const output = replaceTemplate(product, tempProduct);
    res.end(output);

    //API
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end('Hello');

    //Not found
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello world',
    });
    res.end('<h1>Page not found!</h1>');
  }
});

const port = 8000;
server.listen(8000, '127.0.0.1', () => {
  console.log(`Listening to request on port ${port}`);
});
