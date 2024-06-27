import { decrypt } from "../config/cripto.js";
import connection from "../config/db.js";
import express from "express";
import bcrypt from "bcryptjs"; // Adicione esta importação se bcrypt não estiver definido.
import jwt from "jsonwebtoken"; // Adicione esta importação se jwt não estiver definido.

const secretKey = process.env.SECRET_CRIPTO;
const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();
router.post("/login", authUser);

async function authUser(req, res) {
  const { email, password } = req.body;
  try {
    const [result] = await connection.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (result.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    const user = result[0];
    const decryptedEmail = decrypt(user.email, secretKey);

    if (decryptedEmail !== email) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export { router as routerAuthUser };
