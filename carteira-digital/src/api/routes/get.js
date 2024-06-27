import express from "express";
import connection from "../config/db.js";
import { decrypt } from "../config/cripto.js";
import "dotenv/config";

const secretKey = process.env.SECRET_CRIPTO;
const router = express.Router();

router.get("/expenses", fetchExpenses);
router.get("/earnings", fectchEarnings);
router.get("/investment", fetchInvestiment);

async function fetchExpenses(req, res) {
  try {
    const [result] = await connection.execute(
      "SELECT * FROM customer_spending"
    );

    const decryptedData = result.map((item) => {
      let decryptedValueNumber = item.valueNumber;
      let decryptedDescription = item.description;
      let decryptedDate = item.date;

      if (Buffer.isBuffer(item.valueNumber)) {
        decryptedValueNumber = decrypt(item.valueNumber.toString(), secretKey);
      } else {
        console.error(
          "Expected Buffer for valueNumber, got:",
          typeof item.valueNumber
        );
      }
      if (Buffer.isBuffer(item.description)) {
        decryptedDescription = decrypt(item.description.toString(), secretKey);
      } else {
        console.error(
          "Expected Buffer for description, got:",
          typeof item.description
        );
      }
      if (Buffer.isBuffer(item.date)) {
        decryptedDate = item.date.toString();
      } else {
        console.error("Expected Buffer for date, got:", typeof item.date);
      }

      return {
        ...item,
        valueNumber: decryptedValueNumber,
        description: decryptedDescription,
        date: decryptedDate,
      };
    });
    res.status(200).json({ success: true, data: decryptedData });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}

async function fectchEarnings(req, res) {
  try {
    const [result] = await connection.execute(
      "SELECT * FROM customer_earnings"
    );

    const decryptedData = result.map((item) => {
      let decryptedValueNumber = item.valueNumber;
      let decryptedDescription = item.description;
      let decryptedDate = item.date;

      // Convertendo Buffer para string para os campos criptografados
      if (Buffer.isBuffer(item.valueNumber)) {
        decryptedValueNumber = decrypt(item.valueNumber.toString(), secretKey);
      } else {
        console.error(
          "Expected Buffer for valueNumber, got:",
          typeof item.valueNumber
        );
      }
      if (Buffer.isBuffer(item.description)) {
        decryptedDescription = decrypt(item.description.toString(), secretKey);
      } else {
        console.error(
          "Expected Buffer for description, got:",
          typeof item.description
        );
      }
      if (Buffer.isBuffer(item.date)) {
        decryptedDate = item.date.toString();
      } else {
        console.error("Expected Buffer for date, got:", typeof item.date);
      }

      return {
        ...item,
        valueNumber: decryptedValueNumber,
        description: decryptedDescription,
        date: decryptedDate,
      };
    });
    res.status(200).json({ success: true, data: decryptedData });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}

async function fetchInvestiment(req, res) {
  try {
    const [result] = await connection.execute(
      "SELECT * FROM customer_investment"
    );

    const decryptedData = result.map((item) => {
      let decryptedValueAplication = item.valueAplication;
      let decryptedLocalAplication = item.localAplication;
      let decryptedDate = item.date;
      let decryptedTypeIncome = item.typeIncome;
      let decryptedPossibleGain = item.possibleGain;

      // Convertendo Buffer para string para os campos criptografados
      if (Buffer.isBuffer(item.valueAplication)) {
        decryptedValueAplication = decrypt(
          item.valueAplication.toString("utf-8"),
          secretKey
        );
      } else {
        console.error(
          "Expected Buffer for valueAplication, got:",
          typeof item.valueAplication
        );
      }
      if (Buffer.isBuffer(item.localAplication)) {
        decryptedLocalAplication = decrypt(
          item.localAplication.toString("utf-8"),
          secretKey
        );
      } else {
        console.error(
          "Expected Buffer for localAplication, got:",
          typeof item.localAplication
        );
      }
      if (Buffer.isBuffer(item.date)) {
        decryptedDate = item.date.toString("utf-8");
      } else {
        console.error("Expected Buffer for date, got:", typeof item.date);
      }
      if (Buffer.isBuffer(item.typeIncome)) {
        decryptedTypeIncome = decrypt(
          item.typeIncome.toString("utf-8"),
          secretKey
        );
      } else {
        console.error(
          "Expected Buffer for typeIncome, got:",
          typeof item.typeIncome
        );
      }
      if (Buffer.isBuffer(item.possibleGain)) {
        decryptedPossibleGain = decrypt(
          item.possibleGain.toString("utf-8"),
          secretKey
        );
      } else {
        console.error(
          "Expected Buffer for possibleGain, got:",
          typeof item.possibleGain
        );
      }

      return {
        ...item,
        valueAplication: decryptedValueAplication,
        localAplication: decryptedLocalAplication,
        date: decryptedDate,
        typeIncome: decryptedTypeIncome,
        possibleGain: decryptedPossibleGain,
      };
    });
    res.status(200).json({ success: true, data: decryptedData });
  } catch (error) {
    console.error("Error fetching investment:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}

export { router as routerGet };
