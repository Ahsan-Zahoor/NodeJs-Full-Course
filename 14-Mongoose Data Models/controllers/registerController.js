const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd, roles } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ username: user }).exec(); //exec() returns a promise so we can use await on it directly
  //without using .then() and .catch() to handle the promise resolution or rejection respectively, not every mongoose method require exec at end
  if (duplicate) return res.sendStatus(409); //Conflict
  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    //store the new user
    const result = await User.create({
      username: user,
      roles: roles,
      password: hashedPwd,
    });

    //other way to do it
    //const newuser = new User({
    //  username: user,
    //  roles: roles,
    //  password: hashedPwd,
    //});
    //const result = await newuser.save();

    console.log("result -> ", result);
    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
