const User = require("../model/User");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(204).json({ message: "No users found" });
  res.json(users);
};

const createNewUser = async (req, res) => {
  const { username, password, roles } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  const duplicate = await User.findOne({ username: username }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict
  try {
    const newUser = await User.create({
      username: username,
      roles: roles,
      password: password,
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "ID parameter is required." });
  const user = await User.findOne({ _id: req.body.id }).exec();
  if (!user) {
    return res.status(400).json({ message: `No user ${req.body.id} ` });
  }
  if (req.body?.username) user.username = req.body.username;
  if (req.body?.password) {
    const hashedPwd = await bcrypt.hash(req.body.password, 10);
    user.password = hashedPwd;
  }
  if (req.body?.roles) user.roles = req.body.roles;
  const result = await user.save();
  res.json(result);
};

const deleteUser = async (req, res) => {
  console.log("in delete user api route");
  if (!req?.body?.id)
    return res.status(400).json({ message: "ID parameter is required." });
  const user = await User.findOne({
    _id: req.body.id,
  }).exec();
  if (!user) {
    return res.status(400).json({
      message: `No user matches ID ${req.body.id}`,
    });
  }
  const result = await user
    .deleteOne({
      _id: req.body.id,
    })
    .exec();
  res.json(result);
};

const getUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "ID parameter is required." });
  const user = await User.findOne({ _id: req.params.id }).exec();
  if (!user) {
    return res
      .status(400)
      .json({ message: `No user matches ID ${req.params.id}` });
  }
  res.json(user);
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
  getUser,
};
