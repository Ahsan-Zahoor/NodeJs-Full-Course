const fs = require("fs");

//if file is too large then stream by stream

const rs = fs.createReadStream("./files/lorem.txt", { encoding: "utf8" });
const ws = fs.createWriteStream("./files/new-lorem.txt");

// rs.on("data", (chunk) => {
//   ws.write(chunk);
// });

//we can also use pipe to do the same thing as above code does but in a single line instead of a listener i.e on

rs.pipe(ws);
