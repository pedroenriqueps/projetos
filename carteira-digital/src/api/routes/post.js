import express from "express";
import connection from "../config/db.js";
import { encrypt } from "../config/cripto.js";
import "dotenv/config";

const secretKey = process.env.SECRET_CRIPTO;
const router = express.Router();

router.post("/expenses", createSpeding);
router.post("/earnings", createEarnings);
router.post("/investiment", createInvestiment);

async function createSpeding(req, res) {
  const { valueNumber, description, date } = req.body;

  try {
    const encryptedValueNumber = encrypt(valueNumber.toString(), secretKey);
    const encryptedDescription = encrypt(description.toString(), secretKey);

    const [result] = await connection.execute(
      "INSERT INTO customer_spending (valueNumber, description, date) VALUES (?, ?, ?)",
      [encryptedValueNumber, encryptedDescription, date]
    );
    res.status(201).json({ success: true, id: result.insertId });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

async function createEarnings(req, res) {
  const { valueNumber, description, date } = req.body;

  try {
    const encryptedValueNumber = encrypt(valueNumber.toString(), secretKey);
    const encryptedDescription = encrypt(description.toString(), secretKey);

    const [result] = await connection.execute(
      "INSERT INTO customer_earnings (valueNumber, description, date) VALUES (?, ?, ?)",
      [encryptedValueNumber, encryptedDescription, date]
    );
    res.status(201).json({ success: true, id: result.insertId });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

async function createInvestiment(req, res) {
  const { valueAplication, localAplication, date, typeIncome, possibleGain } =
    req.body;

  try {
    const encryptedValueAplication = encrypt(
      valueAplication.toString(),
      secretKey
    );
    const encryptedLocalAplication = encrypt(
      localAplication.toString(),
      secretKey
    );
    const encryptedTypeIncome = encrypt(typeIncome.toString(), secretKey);
    let encryptedPossibleGain = null;

    if (possibleGain !== undefined && possibleGain !== null) {
      encryptedPossibleGain = encrypt(possibleGain.toString(), secretKey);
    }

    const [result] = await connection.execute(
      "INSERT INTO customer_investment (valueAplication, localAplication, date, typeIncome, possibleGain) VALUES (?, ?, ?, ?, ?)",
      [
        encryptedValueAplication,
        encryptedLocalAplication,
        date,
        encryptedTypeIncome,
        encryptedPossibleGain,
      ]
    );
    res.status(201).json({ success: true, id: result.insertId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export { router as routerPost };
