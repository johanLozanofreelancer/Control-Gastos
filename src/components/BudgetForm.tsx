import { useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"


export default function BudgetForm() {

    const [budget, setBudget] = useState(0)
    const {dispatch} = useBudget()

    const handleChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber)
    } 
    const isValid = useMemo(() =>{
        return isNaN(budget) || budget <= 0
    }, [budget])

    const handleSubmit = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        e.preventDefault()
        dispatch({type: 'add-budget', payload: {budget}})
    }

    return (
        <form className="space-y-5">
            <div className="space-y-5 flex flex-col ">
                <label htmlFor="budget" className="text-4xl text-violet-700 font-bold text-center">
                    Definir Presupuesto
                </label>
                <input
                    id="budget"
                    type="number"
                    className="w-full text-lg bg-slate-50 rounded-lg border border-gray-200 p-2"
                    placeholder="Define tu Presupuesto"
                    name="budget"
                    value={budget}
                    onChange={handleChange}
                />
            </div>
            <input 
                type="submit"
                value='Definir Presupuesto'
                className="bg-indigo-500 hover:bg-purple-500 w-full cursor-pointer p-2 font-black rounded-lg text-lg text-white uppercase disabled:opacity-40 disabled:hover:bg-indigo-500" 
                disabled = {isValid}
                onClick = {handleSubmit}
            />
        </form>
    )
}
