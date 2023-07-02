import { useState } from "react"
export default function TodoItem( { text, remove, key, index } ){
    return (
        <>
            <div>
                <label>
                    <input type="checkbox" onChange={ () => {} } />
                    {text + String(index)}
                </label>
                <button onClick={ () => remove(index)}> X </button>
            </div>
        </>
    )
}