"use client";
import { useEffect, useState } from "react";
import ExpenseEarningGraphic from "./components/expense-earning-graphic";

import {
  fetchExpesens,
  fetchEarnings,
  fetchInvestiment,
} from "@/api/services/get-connect.js";
import InvestmentGraphic from "./components/investment-graphic";

interface GraphicProps {
  valueNumber: string;
  description: string;
  date: string;
}

interface GraphicInvestmentProps {
  valueAplication: string;
  localAplication: string;
  date: string;
  typeIncome: string;
  possibleGain?: string;
}

export default function Graphics() {
  const [expensesList, setExpensesList] = useState<GraphicProps[]>([]);
  const [earningList, setEarningList] = useState<GraphicProps[]>([]);
  const [investmentList, setInvestmentList] = useState<
    GraphicInvestmentProps[]
  >([]);

  const listExpenses = async () => {
    try {
      const response = await fetchExpesens();
      const result = response.data;
      setExpensesList(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const listEarnings = async () => {
    try {
      const response = await fetchEarnings();
      const result = response.data;
      setEarningList(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const listInvestiment = async () => {
    try {
      const response = await fetchInvestiment();
      const result = response.data;
      setInvestmentList(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    listExpenses();
    listEarnings();
    listInvestiment();
  }, []);

  return (
    <div className="text-slate-50 bg-gray-900 w-11/12 h-[440px] rounded-lg shadow-xl mx-auto ">
      <h3 className="text-center py-4 text-2xl font-bold">Gráficos mensais</h3>
      <div className="my-2 p-2 flex justify-between">
        <ExpenseEarningGraphic graphichName="Seus gastos" data={expensesList} />

        <ExpenseEarningGraphic graphichName="Seus Ganhos" data={earningList} />
        <InvestmentGraphic
          graphichName="Seus investimentos"
          dataInvestment={investmentList}
        />
      </div>
    </div>
  );
}
