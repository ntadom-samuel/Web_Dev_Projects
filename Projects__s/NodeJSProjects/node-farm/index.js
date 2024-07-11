///////////////FILES
////READING AND WRITING IN NODE.JS(Synchroniously)
///CORE MODULES
//The file system(fs) module is used to access and manipulate files
const fs = require('fs');
//The http module is used for building servers
const http = require('http');
//The url module is used to anlyse urls
const url = require('url');

///THIRD PARTY MODULES
const slugify = require('slugify');

///MANUALLY CREATED MODULES
//To import one, you use the require method, and its argument will be a string of the file path of the file exporting the module. Note: in the 'require' method, './' refers to the present working directory--starter folder
const replaceTemplate = require('./module/replaceTemplate.js'); //Note: folders have no extension

// // //1. Reading a file's content with readFileSync(). It takes in two arguments: a string of the file's path and its encoding
// const textContent = fs.readFileSync('./txt/input.txt', 'utf-8'); //where './' is the present window's directory. This operation will return the content of this file
// console.log(textContent);

// // //2. Creating and writing into a file, writeFileSync(). It is used to create and write into a new file or write into an old file.
// const text = `This is what we know bout avacados: ${textContent}.\n Created on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", text); //This also takes in two arguments: the filepath of the new file you are creating and the text intended to be written in the new file.

////READING AND WRITING IN NODE.JS(Asynchroniously)
//Note: Asynchronious coding in node.js is built around callback functions
// fs.readFile('./txt/start.txt', 'utf-8', function (error, dataOne) {
//   //   //The readFile method is used to read files asynchroniously. It takes in 3 arguments: the file path, file encoding, and a callback function. The callback function has two parameters. The first is for the error, if any, and the second is for the data retrieved from the file.

//   fs.readFile(`./txt/${dataOne}.txt`, 'utf-8', function (error, dataTwo) {
//     console.log(dataTwo);
//     //     fs.readFile("./txt/append.txt", "utf-8", function (error, dataThree) {
//     //       //   console.log(dataThree);
//     //       fs.writeFile(
//     //         //The writeFile method is used to write in files asynchroniously. It takes in 4 arguments: the file path, text to be written in the file, file encoding, and callback function. The callback function has one parameters: It's for the error.
//     //         "./txt/final.txt",
//     //         `${dataTwo}\n${dataThree}`,
//     //         "utf-8",
//     //         (err) => {
//     //           console.log("File has been created and stored!");
//     //         }
//     //       );
//     //     });
//   });
// });

// console.log("Will read file!");

//////////////////SERVERS
////CREATING A SIMPLE WEB SERVER
// const server = http.createServer((req, res) => {
//   //   //The createServer method is used to create a server
//   //   //this method takes in a callback function that is called each time a request is made to our server. The callback function has two parameters. The first is a request object, which has data about the request made to our server, and the second is a response object, which has methods that can be used to handle the request object.
//   console.log(req);
//   res.end('Hey, from the server!');
// });

// server.listen(8000, '127.0.0.1', () => {
//   ////the listen method is used to activate a server and listen for requests. It usually accepts three arguments: the server's port number, host name, and a callback function, which will run when the server is launched. The host name and callback function arguments are optional.
//   console.log('Listening to requests on port 8000');
// });
//When you run a file with the listen method in node.js, the file creates an event loop for handling requests.
//To leave that loop and go back to your main directory, use 'Ctrl + C' in your terminal

/////////////////ROUTING
////Handling URLs
// const server = http.createServer((req, res) => {
//   //console.log(req.url); //req.url returns two URLs, but only the first is important. '/favicon.ico' is the second url, and it is not too important. The url returned is only a part of the pages original url. It is the part of the url after '127.0.0.1:8000'
//   const pathname = req.url;
//   if (pathname === '/' || pathname === '/overview')
//     res.end('This is the OVERVIEW!');
//   else if (pathname === '/product') res.end('This is the PRODUCT!');
//   else {
//     res.writeHead(404, {
//       'Content-type': 'text/html',
//     }); //headers must be set before we send out a response.

//     res.end('<h1>Page not found.</h1>');
//   }
// });

// server.listen(8000, '127.0.0.1', () => {
//   console.log('Listening to requests on port 8000');
// });

//////////////////////BUILDING A VERY SIMPLE API
// Note: when writing a file path in methods of node.js, '.' refers to the directory of your computer where your are presently using node.js. For example, if you are using node.js from your desktop, './' will refer to desktop, so to access a file in your working directory, you would have to type someyhing like this, "./complete-js-course/starter/index.js"
// But node.js has a special variable for its methods, '__dirname,' which evaluates to the parent directory of the file immediately after it. '__dirname' works the same way './' works in the require method.
// const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8'); //Note: the data returned from files are strings. JSON.parse() transforms the data to objects.
// const dataObj = JSON.parse(data);

// const server = http.createServer((req, res) => {
//   const pathname = req.url;
//   if (pathname === '/' || pathname === '/overview')
//     res.end('This is the OVERVIEW!');
//   else if (pathname === '/product') res.end('This is the PRODUCT!');
//   else if (pathname === '/api') {
//     res.writeHead(200, { 'Content-type': 'application/json' });
//     res.end(data);
//     //res.end(productData); //You can't use objects as arguments in the res.end() method, only strings.
//   } else {
//     res.writeHead(404, {
//       'Content-type': 'text/html',
//     });

//     res.end('<h1>Page not found.</h1>');
//   }
// });

// server.listen(8000, '127.0.0.1', () => {
//   console.log('Listening to requests on port 8000');
// });

// ////////////////////////////HTML TEMPLATES: FILLING TEMPLATES
// const replaceTemplate = (temp, product) => {
//   let output = temp.replaceAll('{%PRODUCTNAME%}', product.productName);
//   output = output.replaceAll('{%IMAGE%}', product.image);
//   output = output.replaceAll('{%PRICE%}', product.price);
//   output = output.replaceAll('{%FROM%}', product.from);
//   output = output.replaceAll('{%NUTRIENTS%}', product.nutrients);
//   output = output.replaceAll('{%QUANTITY%}', product.quantity);
//   output = output.replaceAll('{%DESCRIPTION%}', product.description);
//   output = output.replaceAll('{%ID%}', product.id);

//   if (!product.organic)
//     output = output.replaceAll('{%NOT-ORGANIC%}', 'not-organic');
//   return output;
// };
// const templateCard = fs.readFileSync(
//   `${__dirname}/templates/template-card.html`,
//   'utf-8'
// );

// const templateProduct = fs.readFileSync(
//   `${__dirname}/templates/template-product.html`,
//   'utf-8'
// );
// const templateOverview = fs.readFileSync(
//   `${__dirname}/templates/template-overview.html`,
//   'utf-8'
// );

// const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
// const dataObj = JSON.parse(data);

// const server = http.createServer((req, res) => {
//   ///////////////////PARSING VARIABLES FROM URLS
//   // const pathname = req.url; //Returns url description
//   // console.log(url.parse(req.url, true)); //Returns an object containing the components of a url as properties
//   const { pathname, query } = url.parse(req.url, true); //url.parse is used to retrieve parts of a url as variables. It takes in two arguments

//   //Overview page
//   if (pathname === '/' || pathname === '/overview') {
//     res.writeHead(200, { 'Content-type': 'text/html' });
//     const cardsHtml = dataObj
//       .map((el) => replaceTemplate(templateCard, el))
//       .join('');
//     const output = templateOverview.replace('{%PRODUCT_CARDS %}', cardsHtml);
//     res.end(output);
//   }

//   //Product page
//   else if (pathname === '/product') {
//     res.writeHead(200, { 'Content-type': 'text/html' });
//     const product = dataObj[query.id];
//     const output = replaceTemplate(templateProduct, product);
//     res.end(output);
//   }
//   //API
//   else if (pathname === '/api') {
//     res.writeHead(200, { 'Content-type': 'application/json' });
//     res.end(data);

//     //Not found
//   } else {
//     res.writeHead(404, {
//       'Content-type': 'text/html',
//     });

//     res.end('<h1>Page not found.</h1>');
//   }
// });

// server.listen(5000, '127.0.0.1', () => {
//   console.log('Listening to requests on port 8000');
// });

////////////////////////////USING MODULES 2: Creating and Importing our own modules
//In node.js, every javaScript file is treated as a module; each js file, therefore, has access to  module object.
//Go to replaceTEmplate.js in your module.js to see how to export modules
//Go to the top of this file to see how to import manually created modules. Note: manually created modules must be placed at the top of your file, after your core modules
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);
const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);

//////////////////////////USING MODULES 3: THIRD PARTY MODULES
//A slug is the last bit of name in a url; that is, the name or symbol after the assignment operator in a URL e.g ...id='slug'
// Slugify is a module that is used to customise the slug
///CREATING SLUGS: check npm documentation to see how slug properties are set.
// const slug = slugify("FRANCIS MAR", { replacement: "----", lower: true });
// console.log(slug);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

const server = http.createServer((req, res) => {
  ///////////////////PARSING VARIABLES FROM URLS
  const { pathname, query } = url.parse(req.url, true);

  //Overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(templateCard, el))
      .join('');
    const output = templateOverview.replace('{%PRODUCT_CARDS %}', cardsHtml);
    res.end(output);
  }

  //Product page
  else if (pathname === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    const product = dataObj[query.id];
    const output = replaceTemplate(templateProduct, product);
    res.end(output);
  }
  //API
  else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);

    //Not found
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
    });

    res.end('<h1>Page not found.</h1>');
  }
});

server.listen(5000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});
