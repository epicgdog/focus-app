import { useState } from "react"
import { useAtom } from "jotai"
import { savedTodos } from "../index.js"
export default function TodoItem( { text, remove, key, index } ){
    const [todos, setTodos] = useAtom(savedTodos)
    return (
        <>
            <div>
                <label>
                    <input type="checkbox" onChange={ () => {} } />
                    {text + String(index)}
                </label>
                <button onClick={ () => {
                    setTodos( (prev) => {
                        const arr = [...prev]
                        arr.splice(index, 1)
                        return arr
                    } )
                } }> X </button>
            </div>
        </>
    )
}