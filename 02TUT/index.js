 const fs = require('fs');
const path = require('path');

//  fs.readFile('./files/starter.txt','utf8',(err,data) => {
//         if(err) throw err;
//         console.log(data);
//  })
fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8', (err, data) => {
    if (err) throw err;
    console.log("read file ",data);
})

//  console.log("line no 8 ", __dirname)

//encoding like utf8 is by default in write file
 fs.writeFile(path.join(__dirname, 'files', 'reply.txt'),'Nice to meet you', (err) => {
    if (err) throw err;
    console.log("Write file completed");
    //if we want to write the file first and then append it instead of writing it once and appending it once 
    fs.appendFile(path.join(__dirname, 'files', 'reply.txt'),'\n\n\n yes its is', (err) => {
        if (err) throw err;
        console.log("append file after write completed");
        fs.rename(path.join(__dirname, 'files', 'reply.txt'),path.join(__dirname, 'files', 'newReply.txt'), (err) => {
            if (err) throw err;
            console.log("rename file completed");
        })
    })
})

//append file
// fs.appendFile(path.join(__dirname, 'files', 'test.txt'),'Testing text', (err) => {
//     if (err) throw err;
//     console.log("append file completed");
// })

 //exit on uncaught process
    process.on('uncaughtException', err => {
            console.log(`UNCAUGHT EXCEPTION! Shutting down... ${err}`)
            // console.log(err.name, err.message)
            process.exit(1)
    })