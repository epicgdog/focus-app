
import { useAtom } from "jotai"
import { todos } from "../index.js"
export default function TodoItem( { text, index } ){
    const [t, setT] = useAtom(todos)
    return (
        <>
            <div className="items">
                <label>
                    <input type="checkbox" onChange={ () => {} } />
                    {text}
                </label>
                <button onClick={ () => {
                    setT( (prev) => prev.filter((_, i) => i !== index) )
                } }> X </button>
            </div>
        </>
    )
}