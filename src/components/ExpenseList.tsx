import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"


export default function ExpenseList() {
    const {state} = useBudget()
    const filteredExpenses = state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory) : state.expenses
    const isEmpty = useMemo (() => filteredExpenses.length === 0, [state.expenses])

    return (
        <div className="mt-10 bg-white shadow-lg rounded-lg p-5">
            {isEmpty ? <p className="text-gray-600 font-bold text-3xl">No Hay Gastos</p> : (
                <>
                    <div className="text-gray-600 font-bold text-3xl m-5">
                        Listado de Gastos

                        { filteredExpenses.map(expense => (
                            <ExpenseDetail
                                key={expense.id}
                                expense={expense}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}
