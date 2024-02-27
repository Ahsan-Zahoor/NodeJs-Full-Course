const whitelist = [
  "https://www.yoursite.com",
  "http://127.0.0.1.5500",
  "http://localhost:3500",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true); //first paramter is usally null which is error sothere's no error, and 2nd argument is origin will sent back sating roigin its allowed
    } else {
      callback(new Error("not allowed by cors"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
