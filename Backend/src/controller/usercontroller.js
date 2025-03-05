const UserModel = require("../Modal/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if ((!username, !email, !password)) {
      return res.status(501).json({ message: "Fill all details" });
    }
    const existingUser = await UserModel.findOne({ email }); // Use `findOne`
    if (existingUser) {
      return res.status(409).json({ message: "User Already Exists" }); // 409 for conflict
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    return res.status(501).json({ message: "internal server error", error });
  }
};
 

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all details" });
    }

    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 📌 Remove password before sending user data
    const { password: _, ...userWithoutPassword } = existingUser.toObject();  

    return res.status(200).json({
      message: "Login successful",
      token,
      user: userWithoutPassword,  
    });
  } catch (error) {
    console.error("Login Error 😢:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
