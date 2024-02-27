const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  const foundUser = usersDB.users.find((person) => person.username === user);
  if (!foundUser)
    return res.status(401).json({ message: "Invalid username or password." }); //unauthorized
  try {
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
      //create JWTs
      return res.status(200).json({ message: "Login successful" });
    }
    res.status(401).json({ message: "Invalid username or password." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleLogin };
