const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  roles: {
    // User: {
    //   type: Number,
    //   default: 2001,
    // }, //because its required every entry will have this value atleast so following this syntax, other single value means not required
    User: Number,
    Editor: Number,
    Admin: Number,
  },
  password: {
    type: String,
    required: true,
  },
  refreshTokens: String,
});

module.exports = mongoose.model("User", userSchema);
