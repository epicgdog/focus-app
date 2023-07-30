import { useState } from "react"
import Item from "./item.jsx"
import "./main.css"
import { useAtom, useAtomValue } from "jotai"
import { todos, mousePos } from "../index.js"
import Movable from "../movable/main.jsx"

export default function Todolist( ){
    const [input, setInput] = useState("")
    const [currentTodos, setTodos] = useAtom(todos)
    const createNewTodo = (event) => {
        setTodos( (prev) => [...prev, event.target.value] )
        event.target.value=""
    }
    return (
        <>
            <Movable className="todo" >
                <h1> To-Do </h1>
                <div className="todo-container">
                    
                    { 
                        currentTodos.map((val, index) => (
                            <Item text={val} key={index} index={index}/>
                        ))
                    }
                    <input className="todo-input"type="text"  
                        onKeyDown={ (event) => {
                            if (event.key != "Enter") { setInput(event.target.value) } else { createNewTodo(event) }
                        }} 
                        onChange={ (event) => { setInput(event.target.value) }} 
                    /> 
                </div>
            </Movable>
        </>
    )

}