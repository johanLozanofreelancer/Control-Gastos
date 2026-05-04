import { useEffect, useState, type ChangeEvent } from "react";
import { categories } from "../data/categories";
import DatePicker from "react-date-picker";
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'
import type { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export default function ExpenseForm() {
    const [expense, setExpense] = useState<DraftExpense>({
        expenseName: '',
        amount: 0,
        category: '',
        date: new Date()
    })
    const [error, setError] = useState('')
    const {dispatch, state, remainingBudget} = useBudget()
    const [previousAmount, setPreviousAmount] = useState (0)

    useEffect ( () => {
        if (state.editingId){
            const editingExpense = state.expenses.filter (currentExpense => currentExpense.id === state.editingId )
            [0]
            setExpense(editingExpense)
            setPreviousAmount(editingExpense.amount)
        }
    }, [state.editingId])

    const handleChange = (e : React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target
        const isAmountField = ['amount'].includes(name)
        setExpense({
            ...expense,
            [name]: isAmountField ? +value : value
        })
    }

    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }    

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Validar
        if(Object.values(expense).includes('')) {
            setError('Todos los Campos son Obligatorios')
            return
        }

        // Validar no pasarme del limite del presupuesto
        if((expense.amount - previousAmount ) > remainingBudget) {
            setError('Limite del Presupuesto superado')
            return
        }

        // Agregar o Actualizar el gasto
        if ( state.editingId) {
            dispatch({type: "update-expense", payload: {expense: {id: state.editingId, ...expense }}})
        } else {
            dispatch({type: 'add-expense', payload: {expense}})
        }
        
        // reiniciar el State
        setExpense ({
            expenseName: '',
            amount: 0,
            category: '',
            date: new Date()
        })
        setPreviousAmount(0)
    }
        
    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend className="text-center font-black text-3xl uppercase pb-2 boder border-indigo-500 border-b-4 ">
                {state.editingId ? 'Actualizar Gasto'  : 'Nuevo Gasto'}
            </legend>
            {error && <ErrorMessage> {error}</ErrorMessage> }
            <div className="flex flex-col gap-2">
                <label 
                    htmlFor="expenseName"
                    className="text-xl font-medium "
                >
                    Nombre Gasto:
                </label>
                <input 
                    id='expenseName'
                    type="text"
                    placeholder='Añade el nombre de tu gasto'
                    className='bg-slate-100 p-2 w-full border border-slate-400 rounded-lg'
                    name='expenseName'
                    value={expense.expenseName}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label 
                    htmlFor="amount"
                    className="text-xl font-medium "
                >
                    Cantidad:
                </label>
                <input 
                    id='amount'
                    type="number"
                    placeholder='Añade cantidad del gasto Ej: 300'
                    className='bg-slate-100 p-2 w-full border border-slate-400 rounded-lg'
                    name='amount'
                    value={expense.amount}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label 
                    htmlFor="category"
                    className="text-xl font-medium "
                >
                    Categoria:
                </label>
                <select 
                    id='category'
                    className='bg-slate-100 p-2 w-full border border-slate-400 rounded-lg'
                    name='category'
                    value={expense.category}
                    onChange={handleChange}
                >    
                    <option value="">-- Seleccione --</option>
                    {categories.map (category => (
                        <option 
                            key={category.id}
                            value={category.id}
                        >{category.name}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label 
                    htmlFor="category"
                    className="text-xl font-medium "
                >
                    Fecha Gasto:
                </label>
                <DatePicker
                    className='bg-slate-100 p-2 border-0'
                    value={expense.date}
                    onChange={handleChangeDate}
                />

            </div>

            <input 
                type="submit" 
                value={state.editingId ? 'Actualizar Gasto' : 'Registrar Gasto'}
                className=" bg-indigo-500 hover:bg-violet-600 text-2xl font-medium uppercase text-center p-2 w-full rounded-lg text-white cursor-pointer"
            />

        </form>
    )
}
