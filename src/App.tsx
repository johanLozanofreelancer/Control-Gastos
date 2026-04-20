import { useMemo } from "react";
import BudgetForm from "./components/BudgetForm";
import { useBudget } from "./hooks/useBudget";
import BudgetTracker from "./components/BudgetTracker";

export default function App() {

  const  { state } = useBudget()

  const isValidBudget = useMemo (() => state.budget > 0 ,[state.budget])
  return (
    <>
      <header className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 py-8 max-h-72 ">
        <h1 className="uppercase text-white text-4xl font-black text-center ">
          Planificador de Gastos
        </h1>
      </header>

      <div className="bg-white max-w-3xl mx-auto h-60 mt-10 p-10 shadow-lg rounded-lg">
        {isValidBudget ? <BudgetTracker/> : <BudgetForm/>}
      </div>


    </>

  )
}
