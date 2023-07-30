import { useRef } from "react"
import { useAtom } from "jotai"
import { todos } from "../index.js"
export default function TodoItem( { text, index } ){
    const [t, setT] = useAtom(todos)
    return (
        <>
            <div className="items">
                <label>
                    <input type="checkbox" onChange={ () => {} } />
                    <p>{text}</p>
                </label>
                <button onClick={ () => {
                    setT( (prev) => {
                        prev.splice(index, 1)
                        return prev
                    } )
                } }> X </button>
            </div>
        </>
    )
}