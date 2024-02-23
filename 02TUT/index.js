const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

//  fs.readFile('./files/starter.txt','utf8',(err,data) => {
//         if(err) throw err;
//         console.log(data);
//  })

//by using path
// fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log("read file ",data);
// })

//  console.log("line no 8 ", __dirname)

//append file
// fs.appendFile(path.join(__dirname, 'files', 'test.txt'),'Testing text', (err) => {
//     if (err) throw err;
//     console.log("append file completed");
// })

//encoding like utf8 is by default in write file
//  fs.writeFile(path.join(__dirname, 'files', 'reply.txt'),'Nice to meet you', (err) => {
//     if (err) throw err;
//     console.log("Write file completed");
//     //if we want to write the file first and then append it instead of writing it once and appending it once
//     fs.appendFile(path.join(__dirname, 'files', 'reply.txt'),'\n\n\n yes its is', (err) => {
//         if (err) throw err;
//         console.log("append file after write completed");
//         fs.rename(path.join(__dirname, 'files', 'reply.txt'),path.join(__dirname, 'files', 'newReply.txt'), (err) => {
//             if (err) throw err;
//             console.log("rename file completed");
//         })
//     })
// })

//this has made call back hell see first write, append then inside rename so we are going for async await and promises

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "starter.txt"),
      "utf8"
    );
    console.log("read async file ", data);
    //to delete file use unlink
    await fsPromises.unlink(path.join(__dirname, "files", "starter.txt"));
    await fsPromises.writeFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      data
    );
    await fsPromises.appendFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      "\n\n\n Nice to meet you"
    );
    await fsPromises.rename(
      path.join(__dirname, "files", "promiseWrite.txt"),
      path.join(__dirname, "files", "promiseRename.txt")
    );

    const newData = await fsPromises.readFile(
      path.join(__dirname, "files", "promiseRename.txt"),
      "utf8"
    );
    console.log("read async file ", newData);
  } catch (error) {
    console.log(error);
  }
};

fileOps();

//exit on uncaught process
process.on("uncaughtException", (err) => {
  console.log(`UNCAUGHT EXCEPTION! Shutting down... ${err}`);
  // console.log(err.name, err.message)
  process.exit(1);
});
