"use client";
import { useEffect, useState } from "react";
import {
  fetchExpesens,
  fetchEarnings,
  fetchInvestiment,
} from "@/api/services/get-connect.js";

type TypeExpensesEarnings = {
  valueNumber: number;
  date: string;
  description: string;
};

type TypeInvestment = {
  valueAplication: number;
  localAplication: string;
  date: string;
  typeIncome: string;
  possibleGain?: number;
};

const getDateRange = (filter: string): [string, string] => {
  const now = new Date();
  let startDate;
  let endDate = new Date();

  switch (filter) {
    case "today":
      startDate = endDate;
      break;
    case "thisWeek":
      const firstDayOfWeek = now.getDate() - now.getDay();
      startDate = new Date(now.setDate(firstDayOfWeek));
      break;
    case "thisMonth":
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case "thisQuarter":
      const currentQuarter = Math.floor(now.getMonth() / 3);
      startDate = new Date(now.getFullYear(), currentQuarter * 3, 1);
      break;
    default:
      startDate = new Date(0); // All time
  }

  return [
    startDate.toISOString().split("T")[0],
    endDate.toISOString().split("T")[0],
  ];
};

const filterListByDate = (
  list: TypeExpensesEarnings[] | TypeInvestment[],
  filter: string
): (TypeExpensesEarnings | TypeInvestment)[] => {
  const [startDate, endDate] = getDateRange(filter);

  if (Array.isArray(list)) {
    return list.filter((item) => {
      if ("valueNumber" in item) {
        // item é do tipo TypeExpensesEarnings
        const itemDate = new Date(item.date).toISOString().split("T")[0];
        return itemDate >= startDate && itemDate <= endDate;
      } else {
        // item é do tipo TypeInvestment
        const itemDate = new Date(item.date).toISOString().split("T")[0];
        return itemDate >= startDate && itemDate <= endDate;
      }
    });
  }

  return []; // Caso a lista não seja um array, retornamos um array vazio
};

export const Lists = () => {
  const [listExpenses, setListExpenses] = useState<TypeExpensesEarnings[]>([]);
  const [listEarnings, setListEarnings] = useState<TypeExpensesEarnings[]>([]);
  const [listInvestment, setListInvestment] = useState<TypeInvestment[]>([]);

  const [filterExpenses, setFilterExpenses] = useState<string>("today");
  const [filterEarnings, setFilterEarnings] = useState<string>("today");
  const [filterInvestment, setFilterInvestment] = useState<string>("today");

  const fetchExpense = async () => {
    try {
      const response = await fetchExpesens();
      setListExpenses(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar despesas:", error);
    }
  };

  const fetchEarning = async () => {
    try {
      const response = await fetchEarnings();
      setListEarnings(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar receitas:", error);
    }
  };

  const fetchInvestments = async () => {
    try {
      const response = await fetchInvestiment();
      setListInvestment(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar investimentos:", error);
    }
  };

  useEffect(() => {
    fetchExpense();
    fetchEarning();
    fetchInvestments();
  }, []);

  const filteredExpenses: TypeExpensesEarnings[] = filterListByDate(
    listExpenses,
    filterExpenses
  ) as TypeExpensesEarnings[];

  const filteredEarnings: TypeExpensesEarnings[] = filterListByDate(
    listEarnings,
    filterEarnings
  ) as TypeExpensesEarnings[];

  const filteredInvestments: TypeInvestment[] = filterListByDate(
    listInvestment,
    filterInvestment
  ) as TypeInvestment[];

  return (
    <>
      <section className="flex flex-col md:flex-row justify-between gap-4 p-5 bg-gray-800 text-gray-300">
        <ul className="p-7 bg-gray-900 rounded-md shadow-lg flex-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-100">Despesas</h2>
            <select
              value={filterExpenses}
              onChange={(e) => setFilterExpenses(e.target.value)}
              className="text-black p-2 rounded-md"
            >
              <option value="today">Hoje</option>
              <option value="thisWeek">Essa semana</option>
              <option value="thisMonth">Esse mês</option>
              <option value="thisQuarter">Esse trimestre</option>
            </select>
          </div>
          {filteredExpenses?.map((item, index) => (
            <div key={index} className="mb-3 p-3 bg-gray-800 rounded-md">
              <li className="mb-1">Valor: {item.valueNumber}</li>
              <li className="mb-1">Descrição: {item.description}</li>
              <li className="mb-1">Data: {item.date}</li>
            </div>
          ))}
        </ul>
        <ul className="p-7 bg-gray-900 rounded-md shadow-lg flex-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-100">Receitas</h2>
            <select
              value={filterEarnings}
              onChange={(e) => setFilterEarnings(e.target.value)}
              className="text-black p-2 rounded-md"
            >
              <option value="today">Hoje</option>
              <option value="thisWeek">Essa semana</option>
              <option value="thisMonth">Esse mês</option>
              <option value="thisQuarter">Esse trimestre</option>
            </select>
          </div>
          {filteredEarnings?.map((item, index) => (
            <div key={index} className="mb-3 p-3 bg-gray-800 rounded-md">
              <li className="mb-1">Valor: {item.valueNumber}</li>
              <li className="mb-1">Descrição: {item.description}</li>
              <li className="mb-1">Data: {item.date}</li>
            </div>
          ))}
        </ul>
        <ul className="p-7 bg-gray-900 rounded-md shadow-lg flex-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-100">
              Investimentos
            </h2>
            <select
              value={filterInvestment}
              onChange={(e) => setFilterInvestment(e.target.value)}
              className="text-black p-2 rounded-md"
            >
              <option value="today">Hoje</option>
              <option value="thisWeek">Essa semana</option>
              <option value="thisMonth">Esse mês</option>
              <option value="thisQuarter">Esse trimestre</option>
            </select>
          </div>
          {filteredInvestments?.map((item, index) => (
            <div key={index} className="mb-3 p-3 bg-gray-800 rounded-md">
              <li className="mb-1">Local: {item.localAplication}</li>
              <li className="mb-1">Valor: {item.valueAplication}</li>
              <li className="mb-1">Tipo: {item.typeIncome}</li>
              {item.possibleGain && (
                <li className="mb-1">
                  Ganho em (Renda fixa): {item.possibleGain}
                </li>
              )}
              <li className="mb-1">Data: {item.date}</li>
            </div>
          ))}
        </ul>
      </section>
    </>
  );
};
