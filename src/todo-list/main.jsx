import {useState} from "react"
import Item from "./item.jsx"
import "./main.css"
import { useAtom } from "jotai"
import { savedTodos } from "../index.js"


export default function Todolist( ){
    const [input, setInput] = useState("")
    const [todos, setTodos] = useAtom(savedTodos)
    const createNewTodo = (event) => {
        setTodos( (prev) => [...prev, event.target.value] )
        event.target.value=""
    }
    return (
        <>
            <div className="todo">
            <h1> To-Do </h1>
            <div className="todo-container">
                
                { 
                    todos.map((val, index) => (
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
            </div>
        </>
    )

}