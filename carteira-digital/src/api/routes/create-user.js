import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import express from "express";
import connection from "../config/db.js";
import { encrypt } from "../config/cripto.js";

const secretKey = process.env.SECRET_CRIPTO;
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/register", createUser);

async function createUser(req, res) {
  const { username, email, password, confirmPassword } = req.body;

  try {
    if (!username || !email || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "As senhas não coincidem" });
    }

    const [existingUser] = await connection.execute(
      "SELECT * FROM users WHERE email = ? OR username = ?",
      [email, username]
    );

    if (existingUser.length > 0) {
      return res
        .status(400)
        .json({ error: "Usuário já registrado com este email ou username" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const encryptUsername = encrypt(username.toString(), secretKey);
    const encryptEmail = encrypt(email.toString(), secretKey);

    const [result] = await connection.execute(
      "INSERT INTO users (username, email, hashedPassword) VALUES (?, ?, ?)",
      [encryptUsername, encryptEmail, hashedPassword]
    );

    const newUser = {
      id: result.insertId,
      username,
      email,
    };

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export { router as routerCreateUser };
