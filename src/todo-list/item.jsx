import { useRef } from "react"
import { useAtom } from "jotai"
import { savedTodos } from "../index.js"
export default function TodoItem( { text, index } ){
    const [todos, setTodos] = useAtom(savedTodos)
    return (
        <>
            <div className="items">
                <label>
                    <input type="checkbox" onChange={ () => {} } />
                    <p>{text}</p>
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