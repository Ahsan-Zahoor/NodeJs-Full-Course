//nodemon package helps us to render node file automatically instead we have to do node index.js again and again
//to run nodemon we have to install it globally by npm install -g nodemon
//by default if we run nodemon it will look for index.js file and run it otherwise we have to specify the file name like server.js

//if we want to add package globally then we have to use -g flag with npm install and if we want to add it in a project then we have to
//add first npm init and then install the package without -g flag
//also if we want to add it as only dev dependency then we have to use --save-dev flag with npm install shortcut is -D i,.e npm i nodemon -D

// console.log("Testing!");

const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
// other way one can do is like const uuid = require('uuid') and use it as console.log(uuid.v4())
console.log(format(new Date(), "yyyyMMdd\tHH:mm:ss"));

console.log(uuid());
