const Employee = require("../model/Employee");

const getAllEmployees = async (req, res) => {
  const employees = await Employee.find();
  if (!employees)
    return res.status(204).json({ message: "No employees found" });
  res.json(employees);
};

const createNewEmployee = async (req, res) => {
  if (!req?.body?.firstname || !req?.body?.lastname) {
    return res
      .status(400)
      .json({ message: "First and last names are required." });
  }

  try {
    const newEmployee = await Employee.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });

    //another way to do it
    //     const newEmployee = new Employee({
    //       firstname: req.body.firstname,
    //       lastname: req.body.lastname,
    //     });
    //     const result = await newEmployee.save();

    res.status(201).json(newEmployee);
  } catch (err) {
    console.log(err);
  }
};

const updateEmployee = async (req, res) => {
  if (!req?.body?.id)
    return res
      .status(400)
      .json({ message: "message: ID paramter is required." });

  const employee = await Employee.findOne({ id: req.body.id }).exec();
  if (!employee) {
    return res.status(400).json({ message: `No employee ${req.body.id} ` });
  }
  if (req.body?.firstname) employee.firstname = req.body.firstname;
  if (req.body?.lastname) employee.lastname = req.body.lastname;
  const result = await employee.save();
  res.json(result);
};

const deleteEmployee = async (req, res) => {
  if (!req?.body?._id)
    return res.status(400).json({ message: "ID parameter is required." });
  const employee = await Employee.findOne({ _id: req.body._id }).exec();
  if (!employee) {
    return res
      .status(400)
      .json({ message: `No Employee matches ID ${req.body._id}` });
  }
  const reuslt = await employee.deleteOne({ _id: req.body.id }).exec();
  res.json(reuslt);
};

const getEmployee = async (req, res) => {
  try {
    if (!req?.params?.id)
      return res.status(400).json({ message: "ID parameter is required." });

    const employee = await Employee.findOne({ _id: req.params.id }).exec();

    if (!employee) {
      return res
        .status(404)
        .json({ message: `No Employee matches ID ${req.params.id}` });
    }

    res.json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
