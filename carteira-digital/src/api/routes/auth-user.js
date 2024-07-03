import { decrypt, encrypt } from "../config/cripto.js";
import connection from "../config/db.js";
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_CRIPTO;
const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();
router.post("/login", authUser);

async function authUser(req, res) {
  const { email, password } = req.body;
  try {
    console.log("Tentando autenticar com email:", email);

    // Criptografar o email antes da consulta
    const encryptedEmail = encrypt(email, secretKey);
    console.log("Email criptografado para a consulta:", encryptedEmail);

    const [result] = await connection.execute(
      "SELECT * FROM users WHERE email = ?",
      [encryptedEmail]
    );

    console.log("Resultado da consulta:", result);

    if (result.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "Usuário não encontrado" });
    }

    const user = result[0];
    console.log("Usuário encontrado:", user);

    const decryptedEmail = decrypt(user.email, secretKey);
    console.log("Email descriptografado:", decryptedEmail);

    if (decryptedEmail !== email) {
      return res
        .status(401)
        .json({ success: false, message: "Email ou senha inválido" });
    }

    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Email ou senha inválido" });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error("Erro na autenticação:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}

export { router as routerAuthUser };
